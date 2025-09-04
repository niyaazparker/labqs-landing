// no 'use client' here — this is a SERVER component
import ClientInsights, { Card } from './InsightsClient';
import { headers } from 'next/headers';

function getBaseUrl() {
  const h = headers();
  const proto = h.get('x-forwarded-proto') ?? 'http';
  const host  = h.get('x-forwarded-host') ?? h.get('host');
  return `${proto}://${host}`;
}

const FALLBACK: Card[] = [
  {
    kind: 'article',
    title: 'LAB QS nears portable alpha fund debut',
    excerpt: 'The $1.8bn+ file to launch is next in the coming months.',
    date: 'Jan 2025',
    cta: 'Read here',
    href: '/media/portable-alpha-debut',
  },
];

async function getInsights(): Promise<Card[]> {
  try {
    const base = getBaseUrl();
    const res = await fetch(`${base}/api/insights`, {
      next: { tags: ['insights'], revalidate: 60 },
    });
    if (!res.ok) return FALLBACK;
    const data = await res.json();
    const items = (data?.items ?? []) as Card[];
    return items.length ? items : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export default async function Insights({ className = '' }: { className?: string }) {
  const cards = await getInsights();
  return <ClientInsights cards={cards} className={className} />;
}
