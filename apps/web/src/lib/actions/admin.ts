"use server";

import { cookies } from "next/headers";

import { createSupabaseServiceClient } from "@/lib/supabase/client";
import { createClient } from "@/lib/supabase/server";

/**
 * Server action to check if a user is an admin by querying the admin_users table.
 * This uses the service role key (only on server) to securely check the user's role.
 */
export async function verifyUserIsAdmin(
  userId: string | undefined
): Promise<boolean> {
  if (!userId) {
    return false;
  }

  try {
    // Create a Supabase client using the service role for admin access
    const supabase = createSupabaseServiceClient();

    // Query the admin_users table to check admin status
    const { data, error } = await supabase
      .from("admin_users")
      .select("is_admin")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error(
        `Error checking admin_users table for user ${userId}:`,
        error.message
      );
      return false;
    }

    return !!data?.is_admin;
  } catch (error: any) {
    console.error(
      `Exception during admin status check for user ${userId}:`,
      error.message
    );
    return false;
  }
}
