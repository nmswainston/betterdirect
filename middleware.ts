import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/dashboard', '/orders', '/tracking'];
const AUTH_COOKIE_NAME = 'bd_auth';

function isProtectedPath(pathname: string) {
  return PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuth = Boolean(request.cookies.get(AUTH_COOKIE_NAME));

  if (pathname === '/login' && hasAuth) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isProtectedPath(pathname) && !hasAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/orders/:path*', '/tracking/:path*', '/login'],
};
