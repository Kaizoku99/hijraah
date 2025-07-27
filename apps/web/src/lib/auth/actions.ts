"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { verifyUserIsAdmin } from "@/lib/actions/admin";
import { createSupabaseServiceClient } from "@/lib/supabase/client";
import { createClient } from "@/lib/supabase/server";

import { ExtendedUser, createExtendedUser } from "@/types/auth";
import { Database } from "@/types/database.types";

type UserRole = Database["public"]["Enums"]["user_role"];

/**
 * Get the current authenticated session
 * @returns The current session or null if not authenticated
 */
export async function getSession() {
  const supabase = await createClient();

  // First verify the user exists using getUser (more secure)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  // Then get the session
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session:", error);
    return null;
  }

  return session;
}

/**
 * Get the current authenticated user
 * @returns The current user or null if not authenticated
 */
export async function getCurrentUser(): Promise<ExtendedUser | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return createExtendedUser(user);
}

/**
 * Check if the current user is authenticated
 * @returns True if authenticated, false otherwise
 */
export async function isAuthenticated() {
  const session = await getSession();
  return !!session;
}

/**
 * Check if the current user has a specific role
 * @param role The role to check
 * @returns True if user has the role, false otherwise
 */
export async function hasRole(role: UserRole) {
  const user = await getCurrentUser();
  return user?.role === role;
}

/**
 * Sign out the current user
 * @param redirectTo Optional path to redirect to after sign out
 */
export async function signOut(redirectTo: string = "/login") {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");

  if (redirectTo) {
    redirect(redirectTo);
  }
}

/**
 * Create a new user with email and password (admin only)
 * @param email User email
 * @param password User password
 * @param userData Additional user data
 * @returns The created user or null if failed
 */
export async function createUser(
  email: string,
  password: string,
  userData?: {
    fullName?: string;
    role?: string;
    avatarUrl?: string;
    settings?: Record<string, any>;
  },
) {
  const supabase = createSupabaseServiceClient();

  // Prepare user metadata
  const userMetadata: Record<string, any> = {
    full_name: userData?.fullName,
    role: userData?.role || "user",
    avatar_url: userData?.avatarUrl,
  };

  // Add settings if provided
  if (userData?.settings) {
    Object.entries(userData.settings).forEach(([key, value]) => {
      userMetadata[`settings_${key}`] = value;
    });
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: userMetadata,
  });

  if (error) {
    console.error("Error creating user:", error);
    return null;
  }

  return createExtendedUser(data.user);
}

/**
 * Update a user's role (admin only)
 * @param userId The user ID to update
 * @param role The new role
 * @returns True if successful, false otherwise
 */
export async function updateUserRole(userId: string, role: UserRole) {
  const supabase = createSupabaseServiceClient();

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      role,
    },
  });

  if (error) {
    console.error("Error updating user role:", error);
    return false;
  }

  return true;
}

/**
 * Update a user's settings (admin or self)
 * @param userId The user ID to update
 * @param settings The settings to update
 * @returns True if successful, false otherwise
 */
export async function updateUserSettings(
  userId: string,
  settings: Record<string, any>,
) {
  const supabase = createSupabaseServiceClient();

  // Format settings for metadata storage
  const formattedSettings: Record<string, any> = {};
  Object.entries(settings).forEach(([key, value]) => {
    formattedSettings[`settings_${key}`] = value;
  });

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: formattedSettings,
  });

  if (error) {
    console.error("Error updating user settings:", error);
    return false;
  }

  return true;
}

/**
 * Protect server components or routes from unauthorized access
 * @param redirectTo Path to redirect to if not authenticated
 */
export async function protect(redirectTo = "/login") {
  const session = await getSession();

  if (!session) {
    redirect(redirectTo);
  }
}

/**
 * Protect routes that require specific role
 * @param role Required role
 * @param redirectTo Path to redirect to if not authorized
 */
export async function protectRole(role: string, redirectTo = "/unauthorized") {
  await protect();

  const hasUserRole = await hasRole(role as UserRole);

  if (!hasUserRole) {
    redirect(redirectTo);
  }
}

/**
 * Protect routes that require admin access
 * @param redirectTo Path to redirect to if not authorized
 */
export async function protectAdmin(redirectTo = "/unauthorized") {
  const user = await getCurrentUser();

  if (!user || !user.isAdmin) {
    redirect(redirectTo);
  }
}
