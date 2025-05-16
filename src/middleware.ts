import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
// @ts-ignore: Allow synthetic default import
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, Locale, localeConfigs } from '@/i18n';
import { detectLocaleFromHeader } from './lib/i18n/helpers';

// Cache configuration
const CACHE_REVALIDATE = 60; // 1 minute
const CACHE_STALE = 600; // 10 minutes

// Routes that should be cached
const CACHEABLE_ROUTES = [
  '/api/immigration',
  '/api/countries',
  '/api/requirements',
];

// Routes that require authentication
const AUTH_REQUIRED_ROUTES = [
  '/api/chat',
  '/api/user',
  '/api/documents',
  '/dashboard',
  '/profile',
  '/settings',
];

// Public routes that don't need auth
const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/reset-password',
  '/about',
  '/contact',
];

// Types of sources for language detection
type DetectionSource = 'path' | 'cookie' | 'header' | 'searchParams' | 'default';

// Configuration for language detection
const DETECTION_CONFIG = {
  // Order of detection sources
  order: ['path', 'cookie', 'searchParams', 'header'] as DetectionSource[],
  // Cookie name for language preference
  cookieName: 'NEXT_LOCALE',
  // Query parameter name for language
  searchParamName: 'locale',
  // Cache detected language in cookie
  cacheInCookie: true,
  // Cookie options for caching
  cookieOptions: {
    path: '/',
    maxAge: 365 * 24 * 60 * 60, // 1 year
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  },
  // Routes that should be excluded from locale prefix
  unprefixedRoutes: [
    '/api',
    '/_next',
    '/public',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
  ],
  // Debug mode
  debug: process.env.NODE_ENV === 'development',
};

const intlMiddleware = createIntlMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};

// Helper function to log and handle missing environment variables
function validateEnvVariables() {
  const missingVars = [];
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
  }
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  
  return missingVars;
}

// Create the internationalization middleware
const i18nMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

/**
 * Detect locale from various sources in the specified order
 */
function detectLocale(req: NextRequest): Locale {
  let detectedLocale: Locale | null = null;
  let detectedSource: DetectionSource | null = null;

  // Check each source in order
  for (const source of DETECTION_CONFIG.order) {
    switch (source) {
      case 'path': {
        // Check URL path for locale
        const pathname = req.nextUrl.pathname;
        const pathnameSegments = pathname.split('/').filter(Boolean);
        const firstSegment = pathnameSegments[0];
        
        if (firstSegment && locales.includes(firstSegment as Locale)) {
          detectedLocale = firstSegment as Locale;
          detectedSource = 'path';
        }
        break;
      }
      
      case 'cookie': {
        // Check cookie for locale
        const cookieLocale = req.cookies.get(DETECTION_CONFIG.cookieName)?.value;
        if (cookieLocale && locales.includes(cookieLocale as Locale)) {
          detectedLocale = cookieLocale as Locale;
          detectedSource = 'cookie';
        }
        break;
      }
      
      case 'searchParams': {
        // Check search params for locale
        const paramLocale = req.nextUrl.searchParams.get(DETECTION_CONFIG.searchParamName);
        if (paramLocale && locales.includes(paramLocale as Locale)) {
          detectedLocale = paramLocale as Locale;
          detectedSource = 'searchParams';
        }
        break;
      }
      
      case 'header': {
        // Check Accept-Language header
        const acceptLanguage = req.headers.get('Accept-Language');
        const headerLocale = detectLocaleFromHeader(acceptLanguage);
        if (headerLocale) {
          detectedLocale = headerLocale;
          detectedSource = 'header';
        }
        break;
      }
    }
    
    // Stop checking if we found a locale
    if (detectedLocale) break;
  }
  
  // Use fallback if no locale detected
  if (!detectedLocale) {
    detectedLocale = defaultLocale;
    detectedSource = 'default';
  }
  
  if (DETECTION_CONFIG.debug) {
    console.log(`[middleware] Detected locale: ${detectedLocale} from ${detectedSource}`);
  }
  
  return detectedLocale;
}

/**
 * Check if a path should be excluded from locale prefix
 */
function shouldExcludePath(pathname: string): boolean {
  return DETECTION_CONFIG.unprefixedRoutes.some(route => pathname.startsWith(route));
}

export async function middleware(request: NextRequest) {
  try {
    // Check for missing environment variables
    const missingVars = validateEnvVariables();
    
    if (missingVars.length > 0) {
      console.error(`⚠️ Missing environment variables: ${missingVars.join(', ')}`);
      console.error('Please check your .env.local file.');
      
      // Skip Supabase client creation for public routes to avoid errors
      const requestPath = request.nextUrl.pathname;
      if (PUBLIC_ROUTES.some(route => requestPath.startsWith(route))) {
        return NextResponse.next();
      }
      
      // For API routes or protected routes, return 500 error
      if (requestPath.startsWith('/api/') || AUTH_REQUIRED_ROUTES.some(route => requestPath.startsWith(route))) {
        return NextResponse.json(
          { error: 'Server misconfiguration. Please check server logs.' },
          { status: 500 }
        );
      }
      
      // For other routes, redirect to homepage
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
    
    // Create a Supabase client configured to use cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: any) {
            response.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );

    // First verify the user with getUser which is more secure
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      // No authenticated user
      return response;
    }
    
    // Get session only after verifying the user
    const { data: { session }, error } = await supabase.auth.getSession();

    // Handle session refresh
    if (session?.expires_at && session.expires_at < Date.now() / 1000) {
      const { data: { session: newSession }, error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) {
        // Clear session if refresh fails
        await supabase.auth.signOut();
      }
    }

    // Add user session to request header for server components
    if (session) {
      response.headers.set('x-user-id', session.user.id);
      response.headers.set('x-user-role', session.user.role || 'user');
    }

    const requestPath = request.nextUrl.pathname;

    // Check if route requires authentication
    if (AUTH_REQUIRED_ROUTES.some(route => requestPath.startsWith(route))) {
      if (!session) {
        // Redirect to login for HTML requests
        if (request.headers.get('accept')?.includes('text/html')) {
          const redirectUrl = new URL('/auth/login', request.url);
          redirectUrl.searchParams.set('redirect', requestPath);
          return NextResponse.redirect(redirectUrl);
        }

        // Return 401 for API requests
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    // Redirect logged-in users away from auth pages
    if (session && (
      requestPath.startsWith('/auth/login') || 
      requestPath.startsWith('/auth/register')
    )) {
      // Redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Check if route should be cached
    const shouldCache = CACHEABLE_ROUTES.some(route =>
      requestPath.startsWith(route)
    );

    if (!shouldCache) {
      return response;
    }

    // Generate cache key
    const cacheKey = new URL(request.url);

    // Get response
    const cacheResponse = await fetch(cacheKey.toString(), {
      headers: request.headers,
    });

    // Clone the response so we can modify headers
    const responseClone = new NextResponse(cacheResponse.body, cacheResponse);

    // Add cache control headers
    responseClone.headers.set(
      'Cache-Control',
      `s-maxage=${CACHE_REVALIDATE}, stale-while-revalidate=${CACHE_STALE}`
    );

    // Add Vercel edge caching headers
    responseClone.headers.set(
      'Vercel-CDN-Cache-Control',
      `s-maxage=${CACHE_REVALIDATE}, stale-while-revalidate=${CACHE_STALE}`
    );

    // Add debug headers
    responseClone.headers.set('X-Cache-Status', 'MISS');
    responseClone.headers.set('X-Cache-Key', cacheKey.toString());

    // Skip language detection for excluded paths
    if (shouldExcludePath(requestPath)) {
      return responseClone;
    }

    // Detect the locale from various sources
    const detectedLocale = detectLocale(request);
    
    // Check if the URL already has a locale prefix
    const hasLocalePrefix = locales.some(locale => 
      requestPath === `/${locale}` || requestPath.startsWith(`/${locale}/`)
    );
    
    // If URL doesn't have locale prefix and detected locale is not default,
    // redirect to add locale prefix
    if (!hasLocalePrefix && detectedLocale !== defaultLocale) {
      const url = new URL(request.url);
      url.pathname = `/${detectedLocale}${requestPath}`;
      
      // Create response with redirect
      const redirectResponse = NextResponse.redirect(url);
      
      // Cache the detected locale in cookie if enabled
      if (DETECTION_CONFIG.cacheInCookie) {
        redirectResponse.cookies.set(
          DETECTION_CONFIG.cookieName, 
          detectedLocale,
          DETECTION_CONFIG.cookieOptions
        );
      }
      
      return redirectResponse;
    }

    // Step 1: Run the internationalization middleware
    const intlResponse = i18nMiddleware(request);

    // Step 2: Add security headers
    if (intlResponse) {
      // Security headers
      intlResponse.headers.set('X-Content-Type-Options', 'nosniff');
      intlResponse.headers.set('X-Frame-Options', 'DENY');
      intlResponse.headers.set('X-XSS-Protection', '1; mode=block');
      intlResponse.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://*.supabase.co;"
      );
    }

    // Set HTML direction based on locale
    if (intlResponse && 'headers' in intlResponse) {
      const direction = localeConfigs[detectedLocale]?.direction || 'ltr';
      intlResponse.headers.set('Content-Language', detectedLocale);
      
      // Add custom header to tell client-side code about the language direction
      intlResponse.headers.set('X-Language-Direction', direction);
    }

    return intlResponse || responseClone;
  } catch (error) {
    console.error('Middleware error:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Helper function to check if request should bypass cache
function shouldBypassCache(request: NextRequest): boolean {
  // Bypass cache for non-GET requests
  if (request.method !== 'GET') {
    return true;
  }

  // Bypass cache for authenticated requests
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    return true;
  }

  // Bypass cache for specific query parameters
  const url = new URL(request.url);
  if (url.searchParams.has('nocache')) {
    return true;
  }

  return false;
}