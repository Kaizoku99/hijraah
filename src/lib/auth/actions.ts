'use server';

import { getServerSupabaseClient, createAdminSupabaseClient } from './supabase';
import { redirect } from 'next/navigation';
import { ExtendedUser } from './types';
import { revalidatePath } from 'next/cache';

/**
 * Get the current authenticated session
 * @returns The current session or null if not authenticated
 */
export async function getSession() {
  const supabase = await getServerSupabaseClient();
  
  // First verify the user exists using getUser (more secure)
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return null;
  }
  
  // Then get the session
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  
  return session;
}

/**
 * Get the current authenticated user
 * @returns The current user or null if not authenticated
 */
export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.user) return null;
  
  const user = session.user;
  
  // Return extended user with additional fields
  const extendedUser: ExtendedUser = {
    ...user,
    fullName: user.user_metadata?.full_name || user.user_metadata?.name,
    avatarUrl: user.user_metadata?.avatar_url,
    role: user.user_metadata?.role || 'user',
    isAdmin: user.user_metadata?.role === 'admin',
  };
  
  return extendedUser;
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
export async function hasRole(role: string) {
  const user = await getCurrentUser();
  return user?.role === role;
}

/**
 * Check if the current user is an admin
 * @returns True if admin, false otherwise
 */
export async function isAdmin() {
  try {
    // Get the current authenticated user
    const supabase = await getServerSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return false;
    }
    
    // Use the admin service to check admin status
    const adminClient = await createAdminSupabaseClient();
    const { data, error: adminError } = await adminClient
      .from('admin_users')
      .select('is_admin')
      .eq('user_id', user.id)
      .single();
    
    if (adminError) {
      console.error('Error checking admin status:', adminError);
      return false;
    }
    
    return !!data?.is_admin;
  } catch (error) {
    console.error('Exception checking admin status:', error);
    return false;
  }
}

/**
 * Sign out the current user
 * @param redirectTo Optional path to redirect to after sign out
 */
export async function signOut(redirectTo?: string) {
  const supabase = await getServerSupabaseClient();
  await supabase.auth.signOut();
  
  revalidatePath('/', 'layout');
  
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
  }
) {
  const supabase = await createAdminSupabaseClient();
  
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: userData?.fullName,
      role: userData?.role || 'user',
      avatar_url: userData?.avatarUrl,
    },
  });
  
  if (error) {
    console.error('Error creating user:', error);
    return null;
  }
  
  return data.user;
}

/**
 * Update a user's role (admin only)
 * @param userId The user ID to update
 * @param role The new role
 * @returns True if successful, false otherwise
 */
export async function updateUserRole(userId: string, role: string) {
  const supabase = await createAdminSupabaseClient();
  
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      role,
    },
  });
  
  if (error) {
    console.error('Error updating user role:', error);
    return false;
  }
  
  return true;
}

/**
 * Protect server components or routes from unauthorized access
 * @param redirectTo Path to redirect to if not authenticated
 */
export async function protect(redirectTo = '/auth/signin') {
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
export async function protectRole(role: string, redirectTo = '/auth/unauthorized') {
  await protect(redirectTo);
  
  const hasUserRole = await hasRole(role);
  
  if (!hasUserRole) {
    redirect(redirectTo);
  }
}

/**
 * Protect routes that require admin access
 * @param redirectTo Path to redirect to if not authorized
 */
export async function protectAdmin(redirectTo = '/auth/unauthorized') {
  await protect(redirectTo);
  
  const userIsAdmin = await isAdmin();
  
  if (!userIsAdmin) {
    redirect(redirectTo);
  }
} 