// app/layout.tsx
import type { Metadata } from 'next';
import { libreFranklin, gtSuper } from './fonts';
import './globals.scss';

export const metadata: Metadata = { title: 'LABQS – Quality Solutions', description: '…' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${libreFranklin.variable} ${gtSuper.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
