import { Context, Next } from 'hono';
import { createClient } from '@supabase/supabase-js';
import { HTTPException } from 'hono/http-exception';
import { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  role: 'user' | 'admin';
}

declare module 'hono' {
  interface ContextVariableMap {
    authUser: AuthUser | null;
  }
}

/**
 * Middleware to require authentication
 * Ensures the user is authenticated before proceeding
 */
export const requireAuth = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({
      success: false,
      error: 'Unauthorized',
      message: 'Missing or invalid authorization token'
    }, 401);
  }

  try {
    // Get token from header
    const token = authHeader.split(' ')[1];
    
    // Verify token and get user (implementation depends on your auth system)
    const user = await verifyAuthToken(token);
    
    if (!user) {
      throw new Error('Invalid token');
    }

    // Add user to context
    c.set('authUser', user);
    
    await next();
  } catch (error) {
    return c.json({
      success: false,
      error: 'Unauthorized',
      message: error instanceof Error ? error.message : 'Authentication failed'
    }, 401);
  }
};

/**
 * Middleware to require admin role
 * Ensures the user is authenticated and has admin privileges
 */
export const requireAdmin = async (c: Context, next: Next) => {
  const user = c.get('authUser');
  
  if (!user) {
    return c.json({
      success: false,
      error: 'Unauthorized',
      message: 'Authentication required'
    }, 401);
  }

  if (user.role !== 'admin') {
    return c.json({
      success: false,
      error: 'Forbidden',
      message: 'Admin access required'
    }, 403);
  }

  await next();
};

/**
 * Get the current user's session
 */
export async function getUserSession(c: Context) {
  const supabase = c.get('supabase');
  
  if (!supabase) {
    throw new Error('Supabase client not found in context');
  }
  
  // First verify the user exists using getUser (more secure)
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return null;
  }
  
  // Get session from supabase
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  
  return session;
}

/**
 * Validate a JWT token
 * Returns the user if valid, null otherwise
 */
export async function validateToken(token: string) {
  if (!token) return null;
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not configured');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Verify the JWT token
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) {
      console.error('Token validation error:', error);
      return null;
    }
    
    return user;
  } catch (err) {
    console.error('Token validation exception:', err);
    return null;
  }
}

async function verifyAuthToken(token: string): Promise<AuthUser | null> {
  // Implement your token verification logic here
  // This is just a placeholder implementation
  try {
    // Verify token using your auth system (e.g. JWT, Supabase, etc.)
    // Return user data if valid
    return {
      id: 'user_id',
      email: 'user@example.com',
      role: 'admin',
      aud: 'authenticated',
      app_metadata: {},
      user_metadata: {},
      created_at: new Date().toISOString()
    };
  } catch (error) {
    return null;
  }
} 