// RootLayout.tsx
import { Metadata } from 'next';

import './globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import AdSense from '@/components/AdSense';
import { Locale, routing } from '@/i18n/routing';
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <AdSense pId={'9281616897705500'} />
        <meta name="google-site-verification" content="a51BCfh96cOiDsgfL5PGNg3GiiodbnrXK8-h35NcTns" />
        <meta name="google-adsense-account" content="ca-pub-9281616897705500" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9281616897705500"
          crossOrigin="anonymous"
        ></Script>
        {/* Google Analytics */}
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=G-RVT4BMK62W`} />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RVT4BMK62W');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
