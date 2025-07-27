import { User, Session } from "@supabase/supabase-js";

import {
  getCurrentUser,
  getAuthSession,
  isAuthenticated,
} from "@/infrastructure/auth/utils";
import { verifyUserIsAdmin } from "@/lib/actions/admin";
import { getSupabaseClient } from "@/lib/supabase/client";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Service to handle authentication-related operations
 */
export class AuthService {
  /**
   * Get the current user from the authenticated session
   */
  static async getCurrentUser(): Promise<User | null> {
    return getCurrentUser();
  }

  /**
   * Check if the current user is authenticated
   */
  static async isAuthenticated(): Promise<boolean> {
    return isAuthenticated();
  }

  /**
   * Get the current session for the authenticated user
   */
  static async getSession(): Promise<Session | null> {
    return getAuthSession();
  }

  /**
   * Sign in a user with email and password
   */
  static async signInWithPassword(email: string, password: string) {
    const supabase = getSupabaseClient();
    return supabase.auth.signInWithPassword({ email, password });
  }

  /**
   * Sign in a user with OAuth provider
   */
  static async signInWithOAuth(provider: "google" | "github" | "facebook") {
    const supabase = getSupabaseClient();
    return supabase.auth.signInWithOAuth({ provider });
  }

  /**
   * Sign up a new user
   */
  static async signUp(email: string, password: string, metadata?: object) {
    const supabase = getSupabaseClient();
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
  }

  /**
   * Sign out the current user
   */
  static async signOut() {
    const supabase = getSupabaseClient();
    return supabase.auth.signOut();
  }

  /**
   * Reset a user's password
   */
  static async resetPassword(email: string) {
    const supabase = getSupabaseClient();
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
  }

  /**
   * Update a user's password
   */
  static async updatePassword(password: string) {
    const supabase = getSupabaseClient();
    return supabase.auth.updateUser({ password });
  }

  /**
   * Update a user's email
   */
  static async updateEmail(email: string) {
    const supabase = getSupabaseClient();
    return supabase.auth.updateUser({ email });
  }

  /**
   * Update a user's profile
   */
  static async updateProfile(data: object) {
    const supabase = getSupabaseClient();
    return supabase.auth.updateUser({ data });
  }

  /**
   * Check if user has admin role.
   * This method should ideally be used server-side as it calls a server action.
   */
  static async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser();
    if (!user || !user.id) {
      console.log("AuthService.isAdmin: No user or user ID found.");
      return false;
    }

    try {
      // Call the authoritative server action
      return await verifyUserIsAdmin(user.id);
    } catch (error: any) {
      console.error(
        `AuthService.isAdmin: Error calling verifyUserIsAdmin for user ${user.id}:`,
        error.message
      );
      return false;
    }
  }
}
