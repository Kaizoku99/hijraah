import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
// @ts-ignore: Allow synthetic default import
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '../i18n';

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

const intlMiddleware = createIntlMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  localePrefix: 'always'
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api/public (public API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/public).*)',
  ],
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
    if (request.cookies.get('supabase-auth-token')) {
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

    // Step 1: Run the internationalization middleware
    const intlResponse = intlMiddleware(request);

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