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
  title: 'Blind Lover | AI-Powered Relationship Compatibility Analysis',
  description:
    'Blind Lover analyzes your relationship compatibility with a 50-question AI-generated test and provides a personalized evaluation.',
  keywords:
    'blind lover, relationship test, compatibility analysis, AI, love test, couple test, relationship evaluation, blindlover, blind lover, Blind Lover Test, blind lover ai',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Blind Lover | Relationship Compatibility Test',
    description:
      'Blind Lover analyzes your relationship compatibility with a 50-question AI-generated test and provides a personalized evaluation.',
    type: 'website',
    url: 'https://blindlover.com',
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
        <meta name="google-site-verification" content="d6IQFMe5paQrbgxb2ue5kUcGypBWSMkEleWjoTAqnbc" />
        <meta name="google-adsense-account" content="ca-pub-9281616897705500" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Google Analytics */}
        <Script strategy="beforeInteractive" async src={`https://www.googletagmanager.com/gtag/js?id=G-RVT4BMK62W`} />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RVT4BMK62W');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9281616897705500"
          crossOrigin="anonymous"
        ></Script>
        {/* TikTok Pixel */}
        <Script async id="tiktok-pixel" strategy="afterInteractive">
          {`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
            var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
            ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
          
            ttq.load('CUJ03RJC77UE7K4EKC30');
            ttq.page();
          }(window, document, 'ttq');
          `}
        </Script>

        {/* Snap Pixel */}
        <Script id="snap-pixel" strategy="afterInteractive">
          {`
          (function(e,t,n){
            if(e.snaptr)return;
            var a=e.snaptr=function(){
              a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)
            };
            a.queue=[];
            var s='script';
            r=t.createElement(s);
            r.async=!0;
            r.src=n;
            var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);
          })(window,document,'https://sc-static.net/scevent.min.js');

          snaptr('init', 'fe66a5eb-e801-4aec-9efd-8a8b3e951afe', {});
          snaptr('track', 'PAGE_VIEW');
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
