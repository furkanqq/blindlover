import { Suspense } from 'react';

import './globals.css';

import Script from 'next/script';

// Since we have a root `not-found.tsx` page, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={'en'} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="a51BCfh96cOiDsgfL5PGNg3GiiodbnrXK8-h35NcTns" />{' '}
        <meta name="google-adsense-account" content="ca-pub-9281616897705500" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
      <body>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  );
}
