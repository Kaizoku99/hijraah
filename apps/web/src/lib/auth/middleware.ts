import { Session } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

import { createEdgeClient } from "@/lib/supabase/client";
import { AuthMiddlewareContext, ExtendedUser } from "./types";

/**
 * Authentication utility for Next.js API routes
 * Updated to follow latest Supabase SSR patterns
 * Returns user, session, and supabase client from request
 */
export const getAuthContext = async (
  request: NextRequest,
): Promise<AuthMiddlewareContext> => {
  const supabase = createEdgeClient(request);

  try {
    // IMPORTANT: Use getUser() instead of getSession() for better reliability
    // getUser() revalidates the token, while getSession() trusts existing tokens
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    let session: Session | null = null;
    let extendedUser: ExtendedUser | null = null;
    let isAuthenticated = false;

    // If user is verified, get the session and prepare extended user info
    if (user && !userError) {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionData.session && !sessionError) {
        session = sessionData.session;
        isAuthenticated = true;

        extendedUser = {
          ...user,
          fullName: user.user_metadata?.full_name || user.user_metadata?.name,
          avatarUrl: user.user_metadata?.avatar_url,
          // Ensure role defaults to 'user' if not present or invalid
          role:
            user.user_metadata?.role === "admin" ||
            user.user_metadata?.role === "user"
              ? user.user_metadata.role
              : "user",
          isAdmin: user.user_metadata?.role === "admin",
        };
      }
    } else if (userError) {
      // Enhanced error logging for debugging
      console.error(
        "Auth middleware: Error fetching user:",
        userError.message,
        { 
          status: userError.status,
          code: userError.code 
        }
      );
    }

    return {
      user: extendedUser,
      session,
      isAuthenticated,
      supabase,
    };
  } catch (error) {
    // Handle unexpected errors
    console.error("Auth middleware: Unexpected error:", error);
    
    return {
      user: null,
      session: null,
      isAuthenticated: false,
      supabase,
    };
  }
};

/**
 * Authentication wrapper for Next.js API routes
 * Use this to wrap your API route handlers that need authentication
 */
export const withAuth = (
  handler: (
    req: NextRequest,
    context: { params?: any; auth: AuthMiddlewareContext },
  ) => Promise<Response>,
) => {
  return async (req: NextRequest, context: { params?: any }) => {
    const auth = await getAuthContext(req);

    if (!auth.isAuthenticated) {
      return NextResponse.json(
        {
          message: "Unauthorized: Authentication required",
          status: 401,
        },
        { status: 401 },
      );
    }

    return handler(req, { ...context, auth });
  };
};

/**
 * Role-based authentication wrapper for Next.js API routes
 * Use this to wrap your API route handlers that need specific roles
 */
export const withRole = (
  role: string,
  handler: (
    req: NextRequest,
    context: { params?: any; auth: AuthMiddlewareContext },
  ) => Promise<Response>,
) => {
  return async (req: NextRequest, context: { params?: any }) => {
    const auth = await getAuthContext(req);

    if (!auth.isAuthenticated) {
      return NextResponse.json(
        {
          message: "Unauthorized: Authentication required",
          status: 401,
        },
        { status: 401 },
      );
    }

    if (auth.user?.role !== role) {
      return NextResponse.json(
        {
          message: `Forbidden: Role '${role}' required`,
          status: 403,
        },
        { status: 403 },
      );
    }

    return handler(req, { ...context, auth });
  };
};

/**
 * Admin authentication wrapper for Next.js API routes
 * Use this to wrap your API route handlers that need admin privileges
 */
export const withAdmin = (
  handler: (
    req: NextRequest,
    context: { params?: any; auth: AuthMiddlewareContext },
  ) => Promise<Response>,
) => {
  return async (req: NextRequest, context: { params?: any }) => {
    const auth = await getAuthContext(req);

    if (!auth.isAuthenticated) {
      return NextResponse.json(
        {
          message: "Unauthorized: Authentication required",
          status: 401,
        },
        { status: 401 },
      );
    }

    if (!auth.user?.isAdmin) {
      return NextResponse.json(
        {
          message: "Forbidden: Admin privileges required",
          status: 403,
        },
        { status: 403 },
      );
    }

    return handler(req, { ...context, auth });
  };
};
