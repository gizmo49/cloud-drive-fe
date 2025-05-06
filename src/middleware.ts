import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './constants/routes';
import { COOKIE_KEYS } from './services/cookie';

export function middleware(request: NextRequest) {
  const protectedPaths = ['/drive'];
  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    const token = request.cookies.get(COOKIE_KEYS.AUTH_TOKEN);

    if (!token?.value) {
      const signInUrl = new URL(ROUTES.AUTH.SIGN_IN, request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

// Configure the paths that should be protected
export const config = {
  matcher: ['/(privateRoutes)/:path*', '/drive/:path*']
};