import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'en', 'pt', 'es'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  // 1. Try to get locale from cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Try to get locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocales = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().split('-')[0].toLowerCase());

    for (const lang of preferredLocales) {
      if (locales.includes(lang)) {
        return lang;
      }
    }
  }

  // 3. Fallback
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ignore internal Next.js files and static assets FIRST
  // This avoids hitting expensive dynamic routes for non-existent files requested by bots
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.') || // matches files like .png, .jpg, .svg, .json, .php, .env
    pathname.endsWith('.php') ||
    pathname.includes('/wp-')
  ) {
    return;
  }

  // 2. Check if pathname starts with any locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 3. Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // Response with redirect
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|images|favicon.ico).*)',
  ],
};
