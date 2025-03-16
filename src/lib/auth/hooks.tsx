import { useState, useEffect, createContext, useContext, useCallback, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { getBrowserSupabaseClient } from './supabase';
import { AuthContextType, type AuthProvider as AuthProviderType, ExtendedUser } from './types';

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider component to wrap your app and provide authentication state
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<ExtendedUser | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = getBrowserSupabaseClient();

    // Convert User to ExtendedUser with additional fields
    const extendUser = (user: User | null): ExtendedUser | null => {
        if (!user) return null;

        return {
            ...user,
            fullName: user.user_metadata?.full_name || user.user_metadata?.name,
            avatarUrl: user.user_metadata?.avatar_url,
            role: user.user_metadata?.role || 'user',
            isAdmin: user.user_metadata?.role === 'admin',
        };
    };

    // Refresh session
    const refreshSession = useCallback(async () => {
        try {
            // Get the session first
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) throw sessionError;

            // Then get the authenticated user data
            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;

            setSession(sessionData.session);
            setUser(extendUser(userData.user || null));
        } catch (error) {
            console.error('Error refreshing session:', error);
            setSession(null);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, [supabase]);

    // Sign in with provider
    const signIn = useCallback(async (provider: AuthProviderType, options?: any) => {
        setIsLoading(true);
        try {
            if (provider === 'email') {
                if (!options?.email || !options?.password) {
                    throw new Error('Email and password required for email sign in');
                }
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: options.email,
                    password: options.password,
                });

                if (error) throw error;

                // Email sign-in provides session immediately
                if (data?.session) {
                    setSession(data.session);
                    setUser(extendUser(data.session.user));
                }
            } else {
                // OAuth provider sign-in redirects to provider
                const { error } = await supabase.auth.signInWithOAuth({
                    provider: provider as any,
                    options: options?.redirectTo ? { redirectTo: options.redirectTo } : undefined,
                });

                if (error) throw error;
                // No session update here as user will be redirected
            }
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [supabase]);

    // Sign out
    const signOut = useCallback(async () => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            setSession(null);
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
        } finally {
            setIsLoading(false);
        }
    }, [supabase]);

    // Set up auth listener
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);

            // When auth state changes, get authenticated user data
            if (session) {
                const { data: userData, error } = await supabase.auth.getUser();
                if (!error && userData) {
                    setUser(extendUser(userData.user));
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
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook to access authentication state and methods
 */
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
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
 * Hook to check if the user is an admin
 */
export function useIsAdmin(): boolean {
    const user = useUser();
    return user?.isAdmin || false;
} 