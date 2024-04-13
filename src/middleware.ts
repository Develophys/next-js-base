import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers';

import jwt, { JwtPayload } from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const cookie = cookies().get("token");

  const tokenDecoded = cookie && jwt.decode(cookie.value) as JwtPayload;

  if (tokenDecoded && request.nextUrl.pathname.startsWith('/products')) {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (tokenDecoded.exp && tokenDecoded.exp < currentTimestamp && !request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (!tokenDecoded && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      has: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    },
  ],
}