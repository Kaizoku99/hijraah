import { getSupabaseServerClient } from '@/lib/supabase/server';
import type { Session, User } from '@supabase/supabase-js';
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "./supabase/server";

/**
 * Get the current authenticated user on the server
 * @returns The current user's session or null if not authenticated
 */
export async function auth(): Promise<Session | null> {
  const supabase = await getSupabaseServerClient();
  
  // Use getUser which is more secure than getSession
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }
  
  // Get the session only after verifying the user
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/**
 * Get the current user on the server
 * @returns The current user or null if not authenticated
 */
export async function getUser(): Promise<User | null> {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return null;
  }
  return data.user;
}

/**
 * Check if the current user is authenticated
 * @returns True if the user is authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await auth();
  return !!session;
}

/**
 * Securely get the authenticated session by first verifying the user
 * This is the recommended approach to avoid security issues with direct session access
 * @returns The authenticated session or null if not authenticated
 */
export async function getAuthenticatedSession(): Promise<Session | null> {
  const supabase = await getSupabaseServerClient();
  
  // First verify user exists using getUser
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return null;
  }
  
  // Only then get the session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session) {
    return null;
  }
  
  return session;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const supabase = await createClient();
          
          // Authenticate user with Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error || !data.user) {
            return null;
          }

          // Return user data for session
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0],
            image: data.user.user_metadata?.avatar_url,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

// Augment next-auth types
declare module "next-auth" {
  interface User {
    id: string;
  }
  
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export async function getServerUser() {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  } catch (error) {
    console.error('Error getting server user:', error);
    return { user: null, error };
  }
}

export async function getServerSession() {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (user) {
      return { session: { user }, error: null };
    }
    return { session: null, error };
  } catch (error) {
    console.error('Error getting server session:', error);
    return { session: null, error };
  }
} 