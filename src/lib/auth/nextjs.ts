import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { type Database } from '@/types/database';
import { ExtendedUser } from './types';

/**
 * Get the authenticated user from the request
 * For Next.js API routes
 */
export async function getAuthenticatedUser(request: Request): Promise<ExtendedUser | null> {
  const supabase = await createServerSupabaseClient();
  
  // Get the session from the cookies
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return null;
  }
  
  const user = session.user;
  
  // Create an extended user with additional metadata
  const extendedUser: ExtendedUser = {
    ...user,
    fullName: user.user_metadata?.full_name || user.user_metadata?.name,
    avatarUrl: user.user_metadata?.avatar_url,
    role: user.user_metadata?.role || 'user',
    isAdmin: user.user_metadata?.role === 'admin',
  };
  
  return extendedUser;
}

/**
 * Create a Supabase client for server-side API routes
 */
async function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  // Get cookies to handle session
  const cookieStore = await cookies();
  
  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
      autoRefreshToken: false,
      storage: {
        getItem: (key) => {
          const value = cookieStore.get(key)?.value;
          return value || null;
        },
        setItem: (key, value) => {
          cookieStore.set(key, value);
        },
        removeItem: (key) => {
          cookieStore.set(key, '', { maxAge: 0 });
        }
      }
    },
    global: {
      headers: {
        'X-Client-Info': 'nextjs-api-routes',
      },
    },
  });
} 