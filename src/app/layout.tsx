import { Suspense } from 'react';

import './globals.css';

// Since we have a root `not-found.tsx` page, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={'en'} suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-9281616897705500" />
        <meta name="facebook-domain-verification" content="ovrp4r1fo4tr92nupgyk3u0nzzppia" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  );
}
