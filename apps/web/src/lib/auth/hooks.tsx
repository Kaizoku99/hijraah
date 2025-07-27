"use client";

import { Session, User } from "@supabase/supabase-js";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from "react";

import { createClient } from "@/lib/supabase/client";

import { hasPermission } from "./rbac";
import {
  AuthContextType,
  type AuthProvider,
  ExtendedUser,
  createExtendedUser,
} from "@/types/auth";

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider component to wrap your app and provide authentication state
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  // Refresh session
  const refreshSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      if (session) {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        setSession(session);
        setUser(createExtendedUser(user));
      } else {
        setSession(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Error refreshing session:", error);
      setSession(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  // Sign in with provider
  const signIn = useCallback(
    async (provider: AuthProvider, options?: any) => {
      setIsLoading(true);
      try {
        if (provider === "email") {
          if (!options?.email || !options?.password) {
            throw new Error("Email and password required for email sign in");
          }
          const { data, error } = await supabase.auth.signInWithPassword({
            email: options.email,
            password: options.password,
          });

          if (error) throw error;

          // Email sign-in provides session immediately
          if (data?.session) {
            setSession(data.session);
            setUser(createExtendedUser(data.session.user));
          }
        } else {
          // OAuth provider sign-in redirects to provider
          const { error } = await supabase.auth.signInWithOAuth({
            provider: provider as any,
            options: options?.redirectTo
              ? { redirectTo: options.redirectTo }
              : undefined,
          });

          if (error) throw error;
          // No session update here as user will be redirected
        }
      } catch (error) {
        console.error("Error signing in:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [supabase]
  );

  // Sign out
  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setSession(null);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  // Sign up with email/password
  const signUp = useCallback(
    async (options: {
      email: string;
      password: string;
      fullName?: string;
      redirectTo?: string;
    }) => {
      setIsLoading(true);
      try {
        if (!options.email || !options.password) {
          throw new Error("Email and password required for sign up");
        }

        const { data, error } = await supabase.auth.signUp({
          email: options.email,
          password: options.password,
          options: {
            data: {
              full_name: options.fullName || "",
            },
            emailRedirectTo:
              options.redirectTo || `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error signing up:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [supabase]
  );

  // Reset password
  const resetPassword = useCallback(
    async (email: string, redirectTo?: string) => {
      setIsLoading(true);
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo:
            redirectTo || `${window.location.origin}/auth/reset-password`,
        });

        if (error) throw error;
        return true;
      } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [supabase]
  );

  // Update password
  const updatePassword = useCallback(
    async (password: string) => {
      setIsLoading(true);
      try {
        const { error } = await supabase.auth.updateUser({
          password,
        });

        if (error) throw error;
        return true;
      } catch (error) {
        console.error("Error updating password:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [supabase]
  );

  // Set up auth listener
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      // When auth state changes, get authenticated user data
      if (session) {
        const { data: userData, error } = await supabase.auth.getUser();
        if (!error && userData) {
          setUser(createExtendedUser(userData.user));
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    // Get initial session
    refreshSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, refreshSession]);

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: !!session,
    signIn,
    signOut,
    refreshSession,
    // Add these new functions
    signUp,
    resetPassword,
    updatePassword,
    error: null, // For backwards compatibility
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access authentication state and methods
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

/**
 * Hook to get the current user
 */
export function useUser(): ExtendedUser | null {
  const { user } = useAuth();
  return user;
}

/**
 * Hook to check if the user is authenticated
 */
export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

/**
 * Hook to check if the user has a specific role
 */
export function useHasRole(role: string): boolean {
  const user = useUser();
  return user?.role === role;
}

/**
 * Hook to check if the user has a specific permission
 */
export function useHasPermission(permission: string): boolean {
  const user = useUser();
  return hasPermission(user, permission);
}

/**
 * Hook to access the current session - for compatibility with next-auth style
 */
export function useSession() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  // Simplified return for direct session access if preferred elsewhere,
  // but useAuth provides more comprehensive state.
  return {
    session: context.session,
    user: context.user,
    isLoading: context.isLoading,
    error: null, // Assuming errors are handled and reported differently, or add context.error
    refreshSession: context.refreshSession, // Expose refreshSession
  };
}
