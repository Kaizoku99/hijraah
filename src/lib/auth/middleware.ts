import { Context, Next } from 'hono';
import { MiddlewareHandler } from 'hono/types';
import { AuthMiddlewareContext, ExtendedUser } from './types';
import { createEdgeSupabaseClient } from './supabase';

/**
 * Authentication middleware for Hono API routes
 * Adds user, session, and supabase client to context
 */
export const authMiddleware = (): MiddlewareHandler => {
  return async (c: Context, next: Next) => {
    const request = c.req;
    const supabase = createEdgeSupabaseClient(request.raw);
    
    // Get session from cookie
    const { data: { session } } = await supabase.auth.getSession();
    
    // Get user from session
    const user = session?.user || null;
    
    // Create an extended user with additional metadata
    const extendedUser: ExtendedUser | null = user 
      ? {
          ...user,
          fullName: user.user_metadata?.full_name || user.user_metadata?.name,
          avatarUrl: user.user_metadata?.avatar_url,
          role: user.user_metadata?.role || 'user',
          isAdmin: user.user_metadata?.role === 'admin',
        }
      : null;
    
    // Add auth to context
    c.set('auth', {
      user: extendedUser,
      session,
      isAuthenticated: !!session,
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
    const auth = c.get('auth') as AuthMiddlewareContext | undefined;
    
    if (!auth?.isAuthenticated) {
      return c.json(
        { 
          message: 'Unauthorized: Authentication required',
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
    const auth = c.get('auth') as AuthMiddlewareContext | undefined;
    
    if (!auth?.isAuthenticated) {
      return c.json(
        { 
          message: 'Unauthorized: Authentication required',
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
    const auth = c.get('auth') as AuthMiddlewareContext | undefined;
    
    if (!auth?.isAuthenticated) {
      return c.json(
        { 
          message: 'Unauthorized: Authentication required',
          status: 401,
        },
        401
      );
    }
    
    if (!auth.user?.isAdmin) {
      return c.json(
        { 
          message: 'Forbidden: Admin privileges required',
          status: 403,
        },
        403
      );
    }
    
    await next();
  };
}; 