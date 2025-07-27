import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { locales, defaultLocale, Locale } from '@/lib/i18n';

import type { NextRequest } from 'next/server';

// Create the internationalization middleware
const i18nMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

/**
 * This middleware handles:
 * 1. Language detection from URL path, cookie, and Accept-Language header
 * 2. Redirection to localized routes
 * 3. HTML dir attribute setting for RTL languages
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle Next.js internal paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||  // API routes don't need i18n
    pathname.startsWith('/public') ||
    pathname.includes('.')  // Skip files with extensions
  ) {
    return NextResponse.next();
  }

  // Get cookie with previously set language
  const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;

  // Helper function to detect locale from URL path
  const getLocaleFromPath = (path: string): Locale | null => {
    // Check for language code at the beginning of the path
    const pathSegments = path.split('/').filter(Boolean);
    const firstSegment = pathSegments[0];
    
    if (firstSegment && locales.includes(firstSegment as Locale)) {
      return firstSegment as Locale;
    }
    
    return null;
  };

  // Helper function to normalize language code
  const normalizeLocale = (locale: string): string => {
    return locale.toLowerCase().replace('_', '-');
  };

  // Helper function to extract locale from Accept-Language header
  const getLocaleFromHeader = (header: string | null): Locale | null => {
    if (!header) return null;

    // Parse Accept-Language header
    const acceptedLocales = header
      .split(',')
      .map(locale => {
        const [code, q = '1'] = locale.trim().split(';q=');
        return {
          code: normalizeLocale(code),
          q: parseFloat(q)
        };
      })
      .sort((a, b) => b.q - a.q);

    // Find the first matching locale
    for (const { code } of acceptedLocales) {
      // Exact match
      if (locales.includes(code as Locale)) {
        return code as Locale;
      }

      // Language match without region
      const language = code.split('-')[0];
      const match = locales.find(l => l.startsWith(language));
      if (match) {
        return match as Locale;
      }
    }

    return null;
  };

  // Detect locale in this order: URL path > cookie > Accept-Language header > default
  let locale = getLocaleFromPath(pathname) || 
               (savedLocale as Locale) || 
               getLocaleFromHeader(request.headers.get('Accept-Language')) || 
               defaultLocale;

  // If the URL doesn't have a locale and we detected one different from default,
  // redirect to the localized URL
  if (!getLocaleFromPath(pathname) && locale !== defaultLocale) {
    const url = new URL(request.url);
    url.pathname = `/${locale}${pathname}`;
    
    // Create response with redirect
    const response = NextResponse.redirect(url);
    
    // Set cookie with the detected locale
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
    
    return response;
  }

  // Let next-intl middleware handle the request
  return i18nMiddleware(request);
}

export const config = {
  // Skip all paths except the ones starting with a locale
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
}; 