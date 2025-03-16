'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, createClient } from '@/lib/supabase/client';
import { withCircuitBreaker } from '@/lib/circuit-breaker';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const client = createClient();

    // Get initial authenticated user data
    async function setupAuth() {
      // Get session first
      const { data: sessionData } = await client.auth.getSession();
      setSession(sessionData.session);

      // Then get authenticated user data - this contacts Supabase Auth server to verify
      if (sessionData.session) {
        const { data: userData } = await client.auth.getUser();
        setUser(userData.user);
      } else {
        setUser(null);
      }

      setLoading(false);
    }

    setupAuth();

    // Listen for auth changes
    const { data: { subscription } } = client.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      setSession(session);

      if (session) {
        // Get authenticated user data when session changes
        const { data: userData } = await client.auth.getUser();
        setUser(userData.user);

        // Handle different auth events
        switch (event) {
          case 'SIGNED_IN':
            // Initialize onboarding for new sign-ins
            try {
              await fetch('/api/onboarding/init', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                }
              });
            } catch (err) {
              console.error('Error initializing onboarding during auth state change:', err);
            }
            break;

          case 'USER_UPDATED':
            // This happens when a user confirms their email
            try {
              await fetch('/api/onboarding/confirm-user', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                }
              });
            } catch (err) {
              console.error('Error initializing onboarding for confirmed user:', err);
            }
            break;
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = withCircuitBreaker(
    'auth.signIn',
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    }
  );

  const signUp = withCircuitBreaker(
    'auth.signUp',
    async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // If user was created and not in auto-confirm mode, we need to initialize onboarding
      // even though the user needs to confirm email first
      if (data.user) {
        try {
          // Pre-initialize the onboarding data in the database
          // This will be used when the user confirms their email
          const response = await fetch('/api/onboarding/init', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (!response.ok) {
            console.error('Error initializing onboarding during signup');
          }
        } catch (err) {
          console.error('Failed to initialize onboarding during signup:', err);
        }
      }

      toast.success('Check your email for the confirmation link');
    }
  );

  const signOut = withCircuitBreaker(
    'auth.signOut',
    async () => {
      try {
        console.log('Attempting to sign out...');
        const { error } = await supabase.auth.signOut();

        if (error) {
          console.error('Error during sign out:', error);
          throw error;
        }

        console.log('Sign out successful');

        // Clear local state
        setUser(null);
        setSession(null);

        // Redirect to home page after logout
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 100);
      } catch (error) {
        console.error('Sign out failed:', error);
        throw error;
      }
    }
  );

  const resetPassword = withCircuitBreaker(
    'auth.resetPassword',
    async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      toast.success('Check your email for the password reset link');
    }
  );

  const updatePassword = withCircuitBreaker(
    'auth.updatePassword',
    async (password: string) => {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      if (error) throw error;
      toast.success('Password updated successfully');
    }
  );

  const value = {
    user,
    session,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  };

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
