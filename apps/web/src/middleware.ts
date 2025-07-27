/**
 * Root middleware
 */

import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

import { locales, defaultLocale } from "@/i18n/i18n";
import { updateSession } from "@/lib/supabase/middleware";

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
const AUTH_ROUTES = ["/login", "/register", "/auth"];
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
const LEGACY_ROUTE_MAPPINGS = {
  "/api/chat": "/api/(ai-unified)/api/chat",
  "/chat": "/ai-unified/chat",
  "/chat/new": "/ai-unified/chat/new",
  "/artifacts": "/ai-unified/chat", // Artifacts are part of unified chat
};

// Context7 - Observability: Request tracking interface
interface MiddlewareContext {
  pathname: string;
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

  return {
    pathname,
    isAuthRoute: AUTH_ROUTES.some((route) => pathname.startsWith(route)),
    isProtectedRoute: PROTECTED_ROUTES.some((route) =>
      pathname.startsWith(route),
    ),
    isPublicRoute: PUBLIC_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route),
    ),
    isGuestAllowedRoute: GUEST_ALLOWED_ROUTES.some((route) =>
      pathname.startsWith(route),
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
 * Create Supabase client for middleware
 * Context7 - Provider Isolation: Middleware-specific client
 */
function createMiddlewareSupabaseClient(
  request: NextRequest,
  response: NextResponse,
) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          response.cookies.set(name, value, options);
        },
        remove(name: string, options: any) {
          response.cookies.set(name, "", { ...options, maxAge: 0 });
        },
      },
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    },
  );
}

/**
 * Handle guest user redirect
 * Context7 - Modularity: Dedicated guest handling
 */
async function handleGuestUser(
  request: NextRequest,
  context: MiddlewareContext,
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
  user: any,
): Promise<NextResponse | null> {
  // Redirect authenticated users away from auth routes
  if (context.isAuthRoute) {
    console.log("Authenticated user redirected from auth route:", {
      userId: user.id,
      pathname: context.pathname,
    });

    const redirectUrl = new URL("/dashboard", request.url);
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

  // Check for legacy route mappings
  for (const [legacyPath, unifiedPath] of Object.entries(
    LEGACY_ROUTE_MAPPINGS,
  )) {
    if (pathname === legacyPath || pathname.startsWith(legacyPath + "/")) {
      const newPathname = pathname.replace(legacyPath, unifiedPath);
      const redirectUrl = new URL(newPathname, request.url);

      // Preserve query parameters
      request.nextUrl.searchParams.forEach((value, key) => {
        redirectUrl.searchParams.set(key, value);
      });

      console.log("Route migration redirect:", {
        from: pathname,
        to: newPathname,
        preservedParams: Array.from(request.nextUrl.searchParams.keys()),
      });

      return NextResponse.redirect(redirectUrl, { status: 308 }); // Permanent redirect
    }
  }

  return null;
}

/**
 * Handle unauthenticated user
 * Context7 - Modularity: Unauthenticated user routing with unified endpoints
 */
async function handleUnauthenticatedUser(
  request: NextRequest,
  context: MiddlewareContext,
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
    console.log("Unauthenticated user redirected to login:", {
      pathname: context.pathname,
      ip: context.ipAddress,
    });

    const redirectUrl = new URL("/login", request.url);
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

    // Skip middleware for static files and API routes (except auth)
    if (
      context.pathname.startsWith("/_next") ||
      context.pathname.startsWith("/static") ||
      context.pathname.includes(".") ||
      (context.pathname.startsWith("/api") &&
        !context.pathname.startsWith("/api/auth") &&
        !context.pathname.startsWith("/api/(ai-unified)"))
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

      // Check regular Supabase authentication
      const supabase = createMiddlewareSupabaseClient(request, response);

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user) {
        // Handle authenticated user
        authResponse = await handleAuthenticatedUser(request, context, user);
      } else {
        // Handle unauthenticated user
        authResponse = await handleUnauthenticatedUser(request, context);
      }

      // Update session for Supabase
      if (!authResponse) {
        authResponse = await updateSession(request);
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

    // Apply i18n middleware for routes that don't need auth redirects
    return intlMiddleware(request);
  } catch (error) {
    // Context7 - Observability: Error tracking
    console.error("Middleware error:", error);

    // In case of auth errors, apply i18n middleware
    return intlMiddleware(request);
  }
}

// Context7 - Configuration: Middleware matcher
export const config = {
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
