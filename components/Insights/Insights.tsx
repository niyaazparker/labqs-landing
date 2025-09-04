// SERVER component – no 'use client'
import ClientInsights, { Card } from './InsightsClient';

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

/** Robust base URL builder for server-side fetches */
function getBaseUrl() {
  // Prefer explicit override if you add one
  const explicit = process.env.NEXT_PUBLIC_BASE_URL;
  if (explicit) return explicit; // e.g. 'https://labqs.com' or 'http://localhost:3000'

  // On Vercel, VERCEL_URL is like 'my-app-abc.vercel.app' (no protocol)
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  // Local dev default
  return 'http://localhost:3000';
}

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
