import createMiddleware from 'next-intl/middleware';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse } from 'next/server';

import { Base } from '@/constants/Base';
import { PageLink } from '@/constants/PageLink';
import { routing } from './i18n/routing';

import type { NextRequest } from 'next/server';

// Middleware'i birleştiriyoruz
export async function middleware(req: NextRequest) {
  // İlk middleware: routing (i18n)
  const intlMiddleware = createMiddleware(routing);

  // Next.js routing middleware'i çalıştır
  const response = await intlMiddleware(req);

  // İkinci middleware: Auth kontrolü
  const url: NextURL = req.nextUrl.clone();
  const authToken = req.cookies.get(Base.Key.AuthToken)?.value;

  if (url.pathname.startsWith(PageLink.Profile) && !authToken) {
    return NextResponse.redirect(new URL(PageLink.Login, req.url));
  }
  if (url.pathname.startsWith(PageLink.Panel) && !authToken) {
    return NextResponse.redirect(new URL(PageLink.Login, req.url));
  }

  // Eğer bir redirect yapılmazsa, intl middleware'in yanıtını döndürüyoruz
  return response || NextResponse.next();
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(tr|en|es|ru|fr|pt)/:path*'],
};
