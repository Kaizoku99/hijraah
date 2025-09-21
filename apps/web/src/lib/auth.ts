/**
 * Auth module facade - redirects to the proper Supabase auth implementation
 * This file exists to maintain backward compatibility with any code still using the old path.
 */
import { createClient } from "@supabase/supabase-js";
import { createExtendedUser } from "@/types/auth";

import {
  getAuthUser,
  getAuthUserOrRedirect,
  createServerClient,
  getUser as getAuthUserFromServer,
} from "./auth/index";

import {
  getSession,
  getCurrentUser,
  isAuthenticated,
  signOut,
  protect,
  protectRole,
  protectAdmin,
} from "./auth/actions";

import { AuthError } from "./auth/errors";
import { useAuth, useUser, useIsAuthenticated, useHasRole } from "./auth/hooks";

/**
 * Get the current authenticated user on the server
 * @returns The current user's session or null if not authenticated
 */
export async function auth() {
  const result = await getAuthUser();
  return result.session;
}

/**
 * Get the current user on the server
 * @returns The current user or null if not authenticated
 */
export const getUser = async () => {
  return getAuthUserFromServer();
};

/**
 * Check if the current user is authenticated
 * @returns True if the user is authenticated, false otherwise
 */
export { isAuthenticated };

/**
 * Securely get the authenticated session by first verifying the user
 * This is the recommended approach to avoid security issues with direct session access
 * @returns The authenticated session or null if not authenticated
 */
export async function getAuthenticatedSession() {
  const result = await getAuthUser();
  return result.session;
}

/**
 * Get the server user
 */
export async function getServerUser() {
  try {
    const { user } = await getAuthUser();
    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
}

/**
 * Get the server session
 */
export async function getServerSession() {
  try {
    const { user } = await getAuthUser();
    return { session: user ? { user } : null, error: null };
  } catch (error) {
    return { session: null, error };
  }
}

// Export main auth functionality from the designated modules
export {
  getAuthUser,
  getAuthUserOrRedirect,
  createServerClient,
  protect,
  protectRole,
  protectAdmin,
  signOut,
  useAuth,
  useUser,
  useIsAuthenticated,
  useHasRole,
  AuthError,
  createExtendedUser,
};
