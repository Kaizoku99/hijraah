import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Session, AuthResponse, User } from '@supabase/supabase-js';
import type { CookieOptions } from '@supabase/ssr';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export type AuthError = {
  message: string;
  status?: number;
};

const createClient = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookieStore = await cookies();
          return cookieStore.get(name)?.value;
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            const cookieStore = await cookies();
            cookieStore.set({ 
              name, 
              value, 
              ...options as Omit<ResponseCookie, 'name' | 'value'> 
            });
          } catch (error) {
            console.error('Error setting cookie:', error);
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            const cookieStore = await cookies();
            cookieStore.set({ 
              name, 
              value: '', 
              expires: new Date(0),
              ...options as Omit<ResponseCookie, 'name' | 'value'> 
            });
          } catch (error) {
            console.error('Error removing cookie:', error);
          }
        },
      },
    }
  );
};

export const getSession = async (): Promise<Session | null> => {
  try {
    const supabase = await createClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      throw new Error(`Authentication error: ${error.message}`);
    }

    return session;
  } catch (error) {
    console.error('Failed to get auth session:', error);
    throw error;
  }
};

/**
 * Signs up a new user with email and password
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<AuthResponse>} Authentication response containing user data
 * @throws {Error} If signup fails
 */
export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
      }
    });

    if (error) throw error;
    return { data, error };
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};

/**
 * Signs in a user with email and password
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<AuthResponse>} Authentication response containing user data
 * @throws {Error} If signin fails
 */
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error };
  } catch (error) {
    console.error('Sign in failed:', error);
    throw error;
  }
};

/**
 * Signs out the current user
 * 
 * @returns {Promise<void>}
 * @throws {Error} If signout fails
 */
export const signOut = async (): Promise<void> => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Sign out failed:', error);
    throw error;
  }
};

/**
 * Retrieves the current user
 * 
 * @returns {Promise<User | null>} The current user or null if not authenticated
 * @throws {Error} If getting user fails
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Failed to get current user:', error);
    throw error;
  }
}; 