// app/fonts.ts
import localFont from 'next/font/local';

export const libreFranklin = localFont({
  variable: '--ff-sans',
  display: 'swap',
  src: [
    { path: './fonts/LibreFranklin-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/LibreFranklin-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/LibreFranklin-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
});

export const gtSuper = localFont({
  variable: '--ff-alt',
  display: 'swap',
  src: [
    { path: './fonts/GT-Super-Text-Book.woff2', weight: '400', style: 'normal' },
    { path: './fonts/GT-Super-Text-Book.woff',  weight: '400', style: 'normal' }, // fallback
  ],
});
