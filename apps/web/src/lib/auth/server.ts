"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { ExtendedUser, createExtendedUser } from "@/types/auth";

/**
 * Get the current authenticated user for server components
 */
export async function getUser(): Promise<ExtendedUser | null> {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    // Use the shared utility to create an extended user
    return createExtendedUser(user);
  } catch (error) {
    console.error("Error getting user in server component:", error);
    return null;
  }
}

/**
 * Check if a user is authenticated in server components
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser();
  return !!user;
}

/**
 * Protect a route - redirect to login if not authenticated
 */
export async function protectRoute(
  redirectTo: string = "/login",
): Promise<ExtendedUser> {
  const user = await getUser();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}

/**
 * Protect a route requiring a specific role
 */
export async function protectRoleRoute(
  role: string,
  redirectTo: string = "/unauthorized",
): Promise<ExtendedUser> {
  const user = await protectRoute();

  if (user.role !== role && user.role !== "admin") {
    redirect(redirectTo);
  }

  return user;
}

/**
 * Protect a route requiring admin role
 */
export async function protectAdminRoute(
  redirectTo: string = "/unauthorized",
): Promise<ExtendedUser> {
  const user = await protectRoute();

  if (!user.isAdmin) {
    redirect(redirectTo);
  }

  return user;
}
