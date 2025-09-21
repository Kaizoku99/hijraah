/**
 * Root Middleware - Unified Authentication & Routing
 * Context7 - Single Responsibility: Consolidated middleware following latest Supabase SSR patterns
 *
 * This file consolidates:
 * - Supabase authentication (latest SSR patterns from v2.56.0+)
 * - i18n routing
 * - Guest sessions
 * - Route protection
 * - Legacy route migration
 *
 * Runtime: Edge (default for Next.js 15+ middleware, recommended for optimal performance)
 * Benefits: Fast cold starts, global distribution, Web API compatibility, low latency
 * Performance monitoring using Date.now() for Edge Runtime native compatibility
 *
 * Consolidated from:
 * - /lib/middleware/supabase-middleware-v2.ts
 * - /utils/supabase/middleware.ts
 * - /lib/auth/middleware.ts
 */

import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { Database } from "@/types/database.types";
import { locales, defaultLocale } from "@/i18n/i18n";
import {
  updateSession as supabaseUpdateSession,
  isPublicPath,
  isProtectedPath,
} from "@/lib/supabase/middleware";

// Create i18n middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // Set the locale prefix strategy: 'always' adds locale prefixes for all routes
  localePrefix: "always",
});

// Context7 - Provider Isolation: Middleware configuration with (ai-unified) routes
const AUTH_ROUTES = [
  "/register",
  "/auth",
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify",
];
const PROTECTED_ROUTES = ["/dashboard", "/admin", "/profile"];
const PUBLIC_ROUTES = ["/", "/about", "/contact", "/api/auth/guest"];
const GUEST_ALLOWED_ROUTES = [
  "/chat",
  "/ai-unified/chat",
  "/artifacts",
  "/ai-unified/ocr",
  "/api/chat",
  "/api/(ai-unified)",
  "/api/artifacts",
  "/api/document",
  "/api/suggestions",
  "/api/vote",
];

// Context7 - Data-as-Code: Route mapping for legacy to unified migration
// Note: Our app uses localePrefix: "always" so user-facing routes are /[locale]/...
// Map locale-prefixed legacy paths to the unified group equivalents. The (ai-unified)
// segment is a route group and should NOT appear in the URL, so we keep the same
// external URL structure while reusing the unified pages under the hood.
const LEGACY_ROUTE_MAPPINGS: Record<string, string> = {
  // Non-localized fallbacks (in case of direct access without locale)
  "/chat": "/chat",
  "/chat/new": "/chat/new",
  "/artifacts": "/chat", // Artifacts entry redirects to chat
  // Locale-aware mappings handled dynamically in handleRouteMigration
};

// Context7 - Observability: Request tracking interface
interface MiddlewareContext {
  pathname: string;
  locale: string;
  isAuthRoute: boolean;
  isProtectedRoute: boolean;
  isPublicRoute: boolean;
  isGuestAllowedRoute: boolean;
  userAgent: string;
  ipAddress: string;
}

/**
 * Create middleware context for observability
 * Context7 - Data-as-Code: Structured context creation
 */
function createMiddlewareContext(request: NextRequest): MiddlewareContext {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") || "";
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const realIp = request.headers.get("x-real-ip") || "";
  const ipAddress = forwardedFor.split(",")[0] || realIp || "unknown";

  // Extract locale from pathname (e.g., /en/dashboard -> en)
  const localeMatch = pathname.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);
  const locale = localeMatch?.[1] || defaultLocale;

  // Strip locale from pathname for route checking
  const pathWithoutLocale =
    pathname.replace(/^\/[a-z]{2}(?:-[A-Z]{2})?/, "") || "/";

  return {
    pathname,
    locale,
    isAuthRoute: AUTH_ROUTES.some((route) =>
      pathWithoutLocale.startsWith(route)
    ),
    isProtectedRoute: PROTECTED_ROUTES.some((route) =>
      pathWithoutLocale.startsWith(route)
    ),
    isPublicRoute: PUBLIC_ROUTES.some(
      (route) =>
        pathWithoutLocale === route || pathWithoutLocale.startsWith(route)
    ),
    isGuestAllowedRoute: GUEST_ALLOWED_ROUTES.some((route) =>
      pathWithoutLocale.startsWith(route)
    ),
    userAgent: userAgent.substring(0, 100), // Truncate for logs
    ipAddress,
  };
}

/**
 * Check if user has guest session
 * Context7 - Provider Isolation: Guest session validation
 */
function hasGuestSession(request: NextRequest): boolean {
  const isGuest = request.cookies.get("is_guest_user")?.value === "true";
  const guestData = request.cookies.get("guest_data")?.value;
  return isGuest && !!guestData;
}

/**
 * Updates the user session using the latest Supabase SSR patterns for Edge Runtime
 * Context7 - Provider Isolation: Latest Supabase SSR middleware patterns optimized for Edge Runtime
 * Consolidated from supabase-middleware-v2.ts with enhanced error handling
 * Edge Runtime native performance monitoring using Date.now()
 */

async function updateSession(
  request: NextRequest
): Promise<NextResponse & { user?: any }> {
  // Edge Runtime native performance monitoring
  const startTime = Date.now();

  // IMPORTANT: Follow official Supabase SSR pattern for Next.js 15 middleware
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Debug: Check Supabase configuration
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("🚨 Supabase config missing in middleware:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      path: request.nextUrl.pathname,
    });
    return NextResponse.next();
  }

  // Production: Remove debug logging for cleaner output

  const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: Array<{
          name: string;
          value: string;
          options?: CookieOptions;
        }>
      ) {
        // Official Supabase SSR pattern for Next.js middleware
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );

        supabaseResponse = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
    global: {
      // Add timeout to prevent hanging requests
      fetch: (url, options = {}) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        return fetch(url, {
          ...options,
          signal: controller.signal,
        }).finally(() => clearTimeout(timeoutId));
      },
    },
  });

  // SECURITY: Authentication bypass removed - no development bypasses for production safety
  // All authentication must go through proper Supabase SSR flow

  // CRITICAL: Avoid writing any logic between createServerClient and supabase.auth.getUser()
  // This prevents difficult-to-debug random logout issues (official Supabase guidance)
  let user: any = null;
  let authError: any = null;

  try {
    const { data, error } = await supabase.auth.getUser();
    user = data?.user;
    authError = error;
  } catch (error: any) {
    authError = error;
    console.error("Supabase auth error in middleware:", {
      error: error?.message || error,
      errorType: error?.name || 'Unknown',
      isAbortError: error?.name === 'AbortError',
      isNetworkError: error?.message?.includes('fetch failed'),
      path: request.nextUrl.pathname,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent")?.substring(0, 100),
    });
    
    // If it's a timeout or network error, treat as unauthenticated
    if (error?.name === 'AbortError' || error?.message?.includes('fetch failed')) {
      console.warn("Network/timeout error in auth, treating as unauthenticated");
      user = null;
      authError = { message: 'Authentication service unavailable' };
    }
  }

  // Performance monitoring with Edge Runtime native timing
  const endTime = Date.now();
  const duration = endTime - startTime; // Duration in milliseconds

  // Development logging for debugging (minimal)
  if (process.env.NODE_ENV === "development" && authError) {
    console.log("[Supabase updateSession - Edge Runtime]", {
      path: request.nextUrl.pathname,
      hasUser: !!user,
      error: authError?.message,
      duration: `${duration}ms`,
    });
  }

  // Enhanced API route header injection for better performance
  if (user && request.nextUrl.pathname.startsWith("/api/")) {
    // IMPORTANT: Route handlers read request headers, not response headers.
    // Build new request headers that include our auth context and pass them downstream.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-supabase-user-id", user.id);
    requestHeaders.set("x-supabase-user-email", user.email || "");
    requestHeaders.set(
      "x-supabase-user-role",
      user.user_metadata?.role || "user"
    );
    requestHeaders.set("x-supabase-authenticated", "true");
    requestHeaders.set("x-supabase-aud", user.aud || "");
    if (user.app_metadata) {
      requestHeaders.set(
        "x-supabase-provider",
        user.app_metadata.provider || ""
      );
    }

    // Create next response that forwards modified request headers
    const apiResponse = NextResponse.next({
      request: { headers: requestHeaders },
    });

    // Copy cookies from supabase response so the client keeps the session fresh
    const cookies = supabaseResponse.cookies.getAll();
    cookies.forEach((cookie) => {
      apiResponse.cookies.set(cookie.name, cookie.value, cookie);
    });

    // Debug logging for API routes
    if (process.env.NODE_ENV === "development") {
      console.log("[Middleware API Headers]", {
        path: request.nextUrl.pathname,
        userId: user.id?.substring(0, 8) + "...",
        forwarded: {
          "x-supabase-user-id": requestHeaders.get("x-supabase-user-id"),
          "x-supabase-authenticated": requestHeaders.get(
            "x-supabase-authenticated"
          ),
        },
      });
    }

    // Attach user to response for middleware logic
    (apiResponse as any).user = user;

    return apiResponse;
  }

  // CRITICAL: Return the supabaseResponse object exactly as is
  // Modifying this response incorrectly can cause session desynchronization
  // Attach user to response for middleware logic
  (supabaseResponse as any).user = user;

  return supabaseResponse as NextResponse & { user?: any };
}

/**
 * Handle guest user redirect
 * Context7 - Modularity: Dedicated guest handling
 */
async function handleGuestUser(
  request: NextRequest,
  context: MiddlewareContext
): Promise<NextResponse | null> {
  // Allow guest users on guest-allowed routes
  if (context.isGuestAllowedRoute || context.isPublicRoute) {
    // Context7 - Observability: Log guest access
    console.log("Guest access granted:", {
      pathname: context.pathname,
      ip: context.ipAddress,
    });
    return null; // Continue processing
  }

  // Redirect guest users to guest signup for protected routes
  if (context.isProtectedRoute) {
    console.log("Guest redirected from protected route:", {
      pathname: context.pathname,
      ip: context.ipAddress,
    });

    const redirectUrl = new URL("/guest-signup", request.url);
    redirectUrl.searchParams.set("redirect", context.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return null; // Continue processing
}

/**
 * Handle authenticated user
 * Context7 - Modularity: Authenticated user routing
 */
async function handleAuthenticatedUser(
  request: NextRequest,
  context: MiddlewareContext,
  user: any
): Promise<NextResponse | null> {
  // Redirect authenticated users away from auth routes
  if (context.isAuthRoute) {
    console.log("Authenticated user redirected from auth route:", {
      userId: user.id,
      pathname: context.pathname,
    });

    // Get locale from the current path or use default
    const currentLocale = context.locale;
    const redirectUrl = new URL(`/${currentLocale}/dashboard`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Check role-based access for admin routes
  if (context.pathname.startsWith("/admin")) {
    const userRole = user.user_metadata?.role || "client";
    if (userRole !== "admin") {
      console.warn("Unauthorized admin access attempt:", {
        userId: user.id,
        role: userRole,
        pathname: context.pathname,
      });

      const redirectUrl = new URL("/unauthorized", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return null; // Continue processing
}

/**
 * Handle route mapping for legacy to unified migration
 * Context7 - Provider Isolation: Route migration strategy
 */
function handleRouteMigration(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;

  // 1) Handle explicit static mappings first
  for (const [legacyPath, unifiedPath] of Object.entries(
    LEGACY_ROUTE_MAPPINGS
  )) {
    if (pathname === legacyPath || pathname.startsWith(legacyPath + "/")) {
      const newPathname = pathname.replace(legacyPath, unifiedPath);
      const redirectUrl = new URL(newPathname, request.url);
      request.nextUrl.searchParams.forEach((value, key) =>
        redirectUrl.searchParams.set(key, value)
      );
      if (process.env.NODE_ENV === "development") {
        console.log("Route migration redirect (static):", {
          from: pathname,
          to: newPathname,
        });
      }
      return NextResponse.redirect(redirectUrl, { status: 308 });
    }
  }

  // 2) Handle locale-prefixed legacy routes dynamically: /:locale/chat(/new)
  // Keep the same visible URL; no need to add (ai-unified) in path.
  const localeChatMatch = pathname.match(
    /^\/(\w{2})(?:-[A-Z]{2})?\/(chat)(?:\/(new))?\/?$/
  );
  if (localeChatMatch) {
    // We currently keep URLs unchanged, so no redirect is necessary.
    // This block is here for future transformations if needed.
    return null;
  }

  return null;
}

/**
 * Handle unauthenticated user
 * Context7 - Modularity: Unauthenticated user routing with unified endpoints
 */
async function handleUnauthenticatedUser(
  request: NextRequest,
  context: MiddlewareContext
): Promise<NextResponse | null> {
  // Allow access to public and auth routes
  if (context.isPublicRoute || context.isAuthRoute) {
    return null; // Continue processing
  }

  // Check if guest authentication is enabled for protected routes
  const guestAuthEnabled =
    process.env.NEXT_PUBLIC_GUEST_AUTH_ENABLED === "true";

  if (guestAuthEnabled && context.isGuestAllowedRoute) {
    // Automatically create guest session for allowed routes
    console.log("Creating guest session for unauthenticated user:", {
      pathname: context.pathname,
      ip: context.ipAddress,
    });

    const redirectUrl = new URL("/api/auth/guest", request.url);
    redirectUrl.searchParams.set("action", "create");
    redirectUrl.searchParams.set("redirect", context.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to login for protected routes
  if (context.isProtectedRoute) {
    // If the request is for an API route, return a JSON 401 response instead of redirecting
    if (context.pathname.startsWith("/api/")) {
      console.log("Unauthenticated API request, returning 401:", {
        pathname: context.pathname,
        ip: context.ipAddress,
      });
      return new NextResponse(
        JSON.stringify({
          error: "Authentication required",
          message: "Please log in to access this resource.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Unauthenticated user redirected to login:", {
      pathname: context.pathname,
      ip: context.ipAddress,
    });

    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("redirect", context.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return null; // Continue processing
}

/**
 * Main middleware function
 * Context7 - Unified authentication flow with observability
 */
export async function middleware(request: NextRequest) {
  try {
    // Context7 - Data-as-Code: Create structured context
    const context = createMiddlewareContext(request);

    // Fast-path: API routes should not be processed by i18n or legacy route migration.
    // We only need to refresh Supabase session and pass user headers through.
    if (context.pathname.startsWith("/api")) {
      if (process.env.NODE_ENV === "development") {
        console.log(
          "[middleware] API path detected, running updateSession only:",
          context.pathname
        );
      }
      return await updateSession(request);
    }

    // Skip middleware for static files, but PROCESS all API routes for authentication
    if (
      context.pathname.startsWith("/_next") ||
      context.pathname.startsWith("/static") ||
      (context.pathname.includes(".") && !context.pathname.startsWith("/api"))
    ) {
      return NextResponse.next();
    }

    // Context7 - Provider Isolation: Handle route migration first
    const migrationResponse = handleRouteMigration(request);
    if (migrationResponse) {
      return migrationResponse;
    }

    // Then handle authentication logic
    let authResponse: NextResponse | null = null;

    // Context7 - Provider Isolation: Check guest session first
    if (hasGuestSession(request)) {
      authResponse = await handleGuestUser(request, context);
    } else {
      // Create response for Supabase operations
      const response = NextResponse.next();

      // Check regular Supabase authentication using consolidated updateSession
      try {
        // First, update the session and get the response with user data
        const sessionResponse = await updateSession(request);

        // Get user from the response (now attached by updateSession)
        const user = (sessionResponse as any).user;
        const isAuthenticated = !!user;

        // Cleaned up verbose logging for production

        if (isAuthenticated && user) {
          // Handle authenticated user
          authResponse = await handleAuthenticatedUser(request, context, user);
        } else {
          // Handle unauthenticated user
          authResponse = await handleUnauthenticatedUser(request, context);
        }

        // If no auth redirect needed, use the session response
        if (!authResponse) {
          authResponse = sessionResponse;
        }

        return authResponse;
      } catch (error) {
        console.error("Middleware authentication error:", error);
        // Handle unauthenticated user on error
        authResponse = await handleUnauthenticatedUser(request, context);

        // Still call updateSession for API routes even on error to set proper headers
        if (!authResponse || request.nextUrl.pathname.startsWith("/api/")) {
          authResponse = await updateSession(request);
        }
      }
    }

    // If auth handling returned a response (redirect), use it
    if (authResponse) {
      return authResponse;
    }

    // Context7 - Observability: Log successful requests
    if (process.env.NODE_ENV === "development") {
      console.log("Middleware completed:", {
        pathname: context.pathname,
        ip: context.ipAddress,
        hasGuest: hasGuestSession(request),
      });
    }

    // Apply i18n middleware for non-API routes that don't need auth redirects
    return intlMiddleware(request);
  } catch (error) {
    // Context7 - Observability: Error tracking
    console.error("Middleware error:", error);

    // In case of auth errors, apply i18n middleware
    return intlMiddleware(request);
  }
}

// Context7 - Configuration: Middleware matcher with Node.js Runtime for Supabase compatibility
export const config = {
  // Switch to Node.js Runtime to resolve Supabase auth networking issues
  // Edge Runtime has networking limitations that cause "fetch failed" errors
  // when connecting to Supabase authentication servers
  runtime: 'nodejs',
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$).*)",
  ],
};
