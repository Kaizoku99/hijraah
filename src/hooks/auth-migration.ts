/**
 * Authentication Migration Adapter
 * 
 * This file provides compatibility hooks and utilities to help migrate
 * from the original authentication implementation to the new unified auth helper.
 * This adapter layer allows for a gradual migration process without breaking existing code.
 */

import { useAuth as useOldAuth } from '@/contexts/auth';
import { useAuth as useNewAuth, useUser, useIsAuthenticated } from '@/lib/auth/hooks';
import { hasPermission } from '@/lib/auth/rbac';
import { useSession } from '@/components/session-provider';

/**
 * Compatibility layer for the current useAuth hook
 * This provides the same interface as the old useAuth hook but uses
 * the new implementation underneath
 */
export const useAuthCompat = () => {
  // Use the new auth system
  const newAuth = useNewAuth();
  const user = useUser();
  const isAuth = useIsAuthenticated();
  
  // Return an object matching the shape of the old useAuth hook
  return {
    user: user,
    isAuthenticated: isAuth,
    isLoading: newAuth.isLoading,
    error: newAuth.error,
    signIn: newAuth.signIn,
    signUp: newAuth.signUp,
    signOut: newAuth.signOut,
    resetPassword: newAuth.resetPassword,
    updatePassword: newAuth.updatePassword,
  };
};

/**
 * Compatibility layer for the current useSession hook
 * Provides the same interface as the old useSession hook
 * but uses the new implementation underneath
 */
export const useSessionCompat = () => {
  const { session } = useNewAuth();
  const isAuth = useIsAuthenticated();
  
  return {
    session,
    status: isAuth ? 'authenticated' : session === undefined ? 'loading' : 'unauthenticated',
    update: async () => {
      // Handled automatically by the new auth system
      return null;
    },
  };
};

/**
 * Checks if the user has the given role compatibility wrapper
 */
export const useHasRoleCompat = (role: string) => {
  const user = useUser();
  return !!user && (
    user.user_metadata?.role === role || 
    (Array.isArray(user.app_metadata?.roles) && user.app_metadata?.roles.includes(role))
  );
};

/**
 * Checks if the user has the given permission compatibility wrapper
 */
export const useHasPermissionCompat = (permission: string) => {
  const user = useUser();
  return hasPermission(user, permission);
};

/**
 * Hybrid hook that tries to use the new auth system first, and falls back to the old one if needed
 * This is useful during the migration period when both systems might be active at the same time
 */
export const useAuthHybrid = () => {
  const oldAuth = useOldAuth();
  const oldSession = useSession();
  const newAuth = useAuthCompat();
  
  // Use new auth if available, otherwise fall back to old auth
  const user = newAuth.user || oldAuth.user;
  const isAuthenticated = newAuth.isAuthenticated || oldAuth.isAuthenticated;
  const session = newAuth.user?.session || oldSession?.session;
  
  return {
    // Prefer new auth implementation
    ...newAuth,
    // But fall back to old auth if needed
    user: user,
    isAuthenticated: isAuthenticated,
    session: session,
    // Always use the new implementation for these methods
    signIn: newAuth.signIn,
    signUp: newAuth.signUp,
    signOut: newAuth.signOut,
    resetPassword: newAuth.resetPassword,
    updatePassword: newAuth.updatePassword,
  };
};

export default {
  useAuthCompat,
  useSessionCompat,
  useHasRoleCompat,
  useHasPermissionCompat,
  useAuthHybrid,
}; 