import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

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

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

export async function middleware(request: NextRequest) {
  try {
    // Create Supabase client
    const response = NextResponse.next();
    const supabase = createMiddlewareClient({ req: request, res: response });

    // Refresh session if needed
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Session error:', sessionError);
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
    if (session && PUBLIC_ROUTES.some(route => requestPath.startsWith('/auth/'))) {
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

    // Add auth status to cache key if needed
    if (session) {
      cacheKey.searchParams.set('auth', 'true');
    }

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

    return responseClone;
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