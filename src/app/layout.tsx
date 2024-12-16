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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <AdSense pId={'6764792523122888'} />
      </head>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
