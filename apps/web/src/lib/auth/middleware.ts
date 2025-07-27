import { Session } from "@supabase/supabase-js";
import { Context, Next } from "hono";
import { MiddlewareHandler } from "hono/types";

import { createEdgeSupabaseClient } from "./client";
import { AuthMiddlewareContext, ExtendedUser } from "./types";

/**
 * Authentication middleware for Hono API routes
 * Adds user, session, and supabase client to context
 */
export const authMiddleware = (): MiddlewareHandler => {
  return async (c: Context, next: Next) => {
    const request = c.req;
    const supabase = createEdgeSupabaseClient(request.raw);

    // First, verify the user with the server
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    let session: Session | null = null;
    let extendedUser: ExtendedUser | null = null;
    let isAuthenticated = false;

    // If user is verified, get the session and prepare extended user info
    if (user && !userError) {
      const { data: sessionData } = await supabase.auth.getUser();
      session = sessionData.session;
      isAuthenticated = !!session;

      if (session) {
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
    } else {
      // Log if there was an error fetching the user, but don't block the request
      // unless specific routes require authentication (handled by requireAuth middleware)
      if (userError) {
        console.error(
          "Auth middleware: Error fetching user:",
          userError.message
        );
      }
      // Proceed with null user/session if getUser failed or returned no user
    }

    // Add auth info (potentially null) to context
    c.set("auth", {
      user: extendedUser,
      session,
      isAuthenticated,
      supabase,
    } as AuthMiddlewareContext);

    await next();
  };
};

/**
 * Require authentication middleware for Hono API routes
 * Requires user to be authenticated, otherwise returns 401
 */
export const requireAuth = (): MiddlewareHandler => {
  return async (c: Context, next: Next) => {
    const auth = c.get("auth") as AuthMiddlewareContext | undefined;

    if (!auth?.isAuthenticated) {
      return c.json(
        {
          message: "Unauthorized: Authentication required",
          status: 401,
        },
        401
      );
    }

    await next();
  };
};

/**
 * Require specific role middleware for Hono API routes
 * Requires user to have specific role, otherwise returns 403
 */
export const requireRole = (role: string): MiddlewareHandler => {
  return async (c: Context, next: Next) => {
    const auth = c.get("auth") as AuthMiddlewareContext | undefined;

    if (!auth?.isAuthenticated) {
      return c.json(
        {
          message: "Unauthorized: Authentication required",
          status: 401,
        },
        401
      );
    }

    if (auth.user?.role !== role) {
      return c.json(
        {
          message: `Forbidden: Role '${role}' required`,
          status: 403,
        },
        403
      );
    }

    await next();
  };
};

/**
 * Require admin role middleware for Hono API routes
 * Requires user to be an admin, otherwise returns 403
 */
export const requireAdmin = (): MiddlewareHandler => {
  return async (c: Context, next: Next) => {
    const auth = c.get("auth") as AuthMiddlewareContext | undefined;

    if (!auth?.isAuthenticated) {
      return c.json(
        {
          message: "Unauthorized: Authentication required",
          status: 401,
        },
        401
      );
    }

    if (!auth.user?.isAdmin) {
      return c.json(
        {
          message: "Forbidden: Admin privileges required",
          status: 403,
        },
        403
      );
    }

    await next();
  };
};
