// RootLayout.tsx
import { Metadata } from 'next';

import './globals.css';

import { Inter } from 'next/font/google';

import AdSense from '@/components/AdSense';
import Providers from '@/provider';
import { AuthProvider } from '@/provider/Auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blind Lover',
  description: 'Match with your soulmate',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <AdSense pId={'6764792523122888'} />
        {/* <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" /> */}
      </head>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
