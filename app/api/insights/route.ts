import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const file = path.join(process.cwd(), 'data', 'insights.json');

export async function GET() {
  const json = await fs.readFile(file, 'utf-8');
  const data = JSON.parse(json);
  return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(req: Request) {
  const body = await req.json();
  const json = await fs.readFile(file, 'utf-8');
  const data = JSON.parse(json);

  const item = {
    id: body.id ?? String(Date.now()),
    kind: body.kind ?? 'article',
    title: body.title ?? 'Untitled',
    excerpt: body.excerpt ?? '',
    date: body.date ?? '',
    cta: body.cta ?? 'Read',
    href: body.href ?? '#'
  };

  data.items = [item, ...(data.items ?? [])];
  await fs.writeFile(file, JSON.stringify(data, null, 2));

  revalidateTag('insights'); // pages/components that fetched with this tag will update
  return NextResponse.json({ ok: true, inserted: item });
}
