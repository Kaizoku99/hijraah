import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { type TypedSupabaseClient } from './types';
import { Database } from '@/types/database';
import { cache } from 'react';

// Environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ======================================
// CLIENT-SIDE SUPABASE CLIENT UTILITIES
// ======================================

/**
 * Creates a Supabase client for browser contexts
 */
export const createBrowserSupabaseClient = (): TypedSupabaseClient => {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
};

// Singleton for client-side
let browserClientSingleton: TypedSupabaseClient | null = null;

/**
 * Returns a singleton Supabase client for browser contexts
 */
export const getBrowserSupabaseClient = (): TypedSupabaseClient => {
  if (!browserClientSingleton) {
    browserClientSingleton = createBrowserSupabaseClient();
  }
  return browserClientSingleton;
};

// ======================================
// SERVER-SIDE SUPABASE CLIENT UTILITIES
// ======================================

/**
 * Creates a Supabase client for server components
 */
export const createServerSupabaseClient = (): TypedSupabaseClient => {
  const cookieStore = cookies();
  
  return createServerClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: { path?: string; maxAge?: number; domain?: string; secure?: boolean; sameSite?: 'strict' | 'lax' | 'none' }) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // Handle errors in development mode
            console.error(`Error setting cookie ${name}:`, error);
          }
        },
        remove(name: string, options: { path?: string; maxAge?: number; domain?: string; secure?: boolean; sameSite?: 'strict' | 'lax' | 'none' }) {
          try {
            cookieStore.set(name, '', { ...options, maxAge: 0 });
          } catch (error) {
            console.error(`Error removing cookie ${name}:`, error);
          }
        },
      },
    }
  );
};

/**
 * Creates a cached Supabase client for server components (React cache)
 * Use this to avoid creating multiple clients in the same render
 */
export const getServerSupabaseClient = cache((): TypedSupabaseClient => {
  return createServerSupabaseClient();
});

/**
 * Creates a Supabase client with admin privileges (service role)
 * ⚠️ WARNING: This bypasses Row Level Security and should only be used in secure server contexts
 */
export const createAdminSupabaseClient = (): TypedSupabaseClient => {
  if (!SUPABASE_SERVICE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin client');
  }
  
  const cookieStore = cookies();
  
  return createServerClient<Database>(
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: { path?: string; maxAge?: number; domain?: string; secure?: boolean; sameSite?: 'strict' | 'lax' | 'none' }) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            console.error(`Error setting cookie ${name}:`, error);
          }
        },
        remove(name: string, options: { path?: string; maxAge?: number; domain?: string; secure?: boolean; sameSite?: 'strict' | 'lax' | 'none' }) {
          try {
            cookieStore.set(name, '', { ...options, maxAge: 0 });
          } catch (error) {
            console.error(`Error removing cookie ${name}:`, error);
          }
        },
      },
    }
  );
};

// For backwards compatibility
export const getSupabaseServerClient = createServerSupabaseClient;
export const getSupabaseClient = getBrowserSupabaseClient;
export const supabase = getBrowserSupabaseClient();

// For edge runtime
export const createEdgeSupabaseClient = (request: Request): TypedSupabaseClient => {
  const cookieHeader = request.headers.get('cookie') || '';
  
  return createServerClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          const value = cookieHeader
            .split(';')
            .find(c => c.trim().startsWith(`${name}=`));
          if (!value) return undefined;
          const parts = value.split('=');
          return parts.slice(1).join('=');
        },
        set(name: string, value: string, options: { path?: string; maxAge?: number; domain?: string; secure?: boolean; sameSite?: 'strict' | 'lax' | 'none' }) {
          // Edge functions can't set cookies directly
          // This would need to be implemented by the caller
        },
        remove(name: string, options: { path?: string; maxAge?: number; domain?: string; secure?: boolean; sameSite?: 'strict' | 'lax' | 'none' }) {
          // Edge functions can't set cookies directly
          // This would need to be implemented by the caller
        },
      }
    }
  );
}; 