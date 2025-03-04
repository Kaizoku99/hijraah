import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '../../types/supabase';

/**
 * Creates a Supabase client for use in Server Components and Route Handlers
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },
        set(name: string, value: string, options: { path?: string; maxAge?: number; domain?: string; secure?: boolean }) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: { path?: string }) {
          cookieStore.delete(name);
        },
      },
    }
  );
}

/**
 * Creates a Supabase admin client with service role permissions
 * WARNING: Only use in secure server contexts
 */
export async function createServiceClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing environment variable: SUPABASE_SERVICE_ROLE_KEY');
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },
        set(name: string, value: string, options: { path?: string; maxAge?: number; domain?: string; secure?: boolean }) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: { path?: string }) {
          cookieStore.delete(name);
        },
      },
    }
  );
} 