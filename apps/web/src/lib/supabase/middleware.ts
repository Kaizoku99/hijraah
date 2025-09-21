/**
 * Supabase Middleware Utility - Following Context7/Official Supabase SSR Patterns
 *
 * This utility implements the official Supabase SSR middleware pattern for Next.js 15+
 * ensuring proper session management, cookie handling, and security.
 *
 * Based on official documentation:
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database.types";

/**
 * Updates the user session by creating a Supabase server client and validating auth.
 *
 * IMPORTANT: This function follows the official Supabase SSR pattern exactly:
 * 1. Creates NextResponse first
 * 2. Creates Supabase client with proper cookie handling
 * 3. Calls getUser() without any logic in between
 * 4. Returns the supabaseResponse object unchanged
 *
 * @param request - The incoming NextRequest
 * @returns Promise<NextResponse> - Response with updated session cookies
 */
export async function updateSession(
  request: NextRequest
): Promise<NextResponse> {
  // Step 1: Create the response object that will be returned
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Step 2: Create Supabase server client with proper cookie handling
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
          // Update request cookies for downstream handlers
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          // Create new response with updated request
          supabaseResponse = NextResponse.next({
            request,
          });

          // Set cookies on the response
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Step 3: Get user session - CRITICAL: No logic between createServerClient and getUser()
  // This prevents difficult-to-debug random logout issues (official Supabase guidance)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Step 4: Handle authentication logic
  if (error) {
    console.error("Supabase auth error in middleware:", {
      error: error.message,
      path: request.nextUrl.pathname,
      timestamp: new Date().toISOString(),
    });
  }

  // Handle unauthenticated users trying to access protected routes
  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth") &&
    !request.nextUrl.pathname.startsWith("/register") &&
    !request.nextUrl.pathname.startsWith("/") && // Allow home page
    !request.nextUrl.pathname.startsWith("/api/auth") && // Allow auth endpoints
    !request.nextUrl.pathname.startsWith("/_next") && // Allow static files
    !request.nextUrl.pathname.includes(".") // Allow assets
  ) {
    // Redirect to login page
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirected_from", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Step 5: Add user headers for API routes if authenticated
  if (user && request.nextUrl.pathname.startsWith("/api/")) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-supabase-user-id", user.id);
    requestHeaders.set("x-supabase-user-email", user.email || "");
    requestHeaders.set("x-supabase-authenticated", "true");
    requestHeaders.set("x-supabase-aud", user.aud || "");

    // Create API response with user headers
    const apiResponse = NextResponse.next({
      request: { headers: requestHeaders },
    });

    // Copy cookies from supabase response
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      apiResponse.cookies.set(cookie.name, cookie.value, cookie);
    });

    return apiResponse;
  }

  // Step 6: CRITICAL - Return supabaseResponse object unchanged
  // Modifying this response incorrectly can cause session desynchronization
  return supabaseResponse;
}

/**
 * Check if a request path should be excluded from auth checks
 */
export function isPublicPath(pathname: string): boolean {
  const publicPaths = [
    "/",
    "/about",
    "/contact",
    "/login",
    "/register",
    "/auth",
    "/api/auth",
    "/_next",
    "/favicon.ico",
  ];

  return (
    publicPaths.some((path) => pathname.startsWith(path)) ||
    pathname.includes(".")
  ); // Static assets
}

/**
 * Check if a request path requires authentication
 */
export function isProtectedPath(pathname: string): boolean {
  const protectedPaths = [
    "/dashboard",
    "/profile",
    "/admin",
    "/chat",
    "/documents",
  ];

  return protectedPaths.some((path) => pathname.startsWith(path));
}
