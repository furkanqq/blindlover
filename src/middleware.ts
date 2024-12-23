// middleware.ts
import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse } from 'next/server';

import { Base } from '@/constants/Base';
import { PageLink } from '@/constants/PageLink';

import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const url: NextURL = req.nextUrl.clone();

  const authToken = req.cookies.get(Base.Key.AuthToken)?.value;

  // if (url.pathname.startsWith(PageLink.Profile) && !authToken) {
  //   return NextResponse.redirect(new URL(PageLink.Login, req.url));
  // }
  // if (url.pathname.startsWith(PageLink.Panel) && !authToken) {
  //   return NextResponse.redirect(new URL(PageLink.Login, req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // Tüm rotalar
};
