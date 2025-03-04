import { Context, Next } from 'hono';
import { createClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client for Hono API routes
 * This function creates a client with the service role key for full database access
 */
export function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

/**
 * Middleware to add Supabase client to the context
 */
export async function supabaseMiddleware(c: Context, next: Next) {
  const supabase = createSupabaseClient();
  c.set('supabase', supabase);
  await next();
}

/**
 * Middleware to require authentication for protected routes
 * Extracts bearer token from Authorization header
 */
export async function requireAuth(c: Context, next: Next) {
  const supabase = c.get('supabase');
  if (!supabase) {
    c.set('supabase', createSupabaseClient());
  }

  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or missing authorization token'
    }, 401);
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await c.get('supabase').auth.getUser(token);
  
  if (error || !user) {
    return c.json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid authorization token'
    }, 401);
  }
  
  // Add user to context for route handlers
  c.set('user', user);
  await next();
} 