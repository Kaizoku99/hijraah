import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

import { type Database } from "@/types/database.types";

import { ExtendedUser } from "./types";

import type { User } from "@supabase/supabase-js";

/**
 * Get the authenticated user from the request
 * For Next.js API routes
 */
export async function getAuthenticatedUser(
  request: Request,
): Promise<ExtendedUser | null> {
  const supabase = createServerSupabaseClientForApiRoute();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    if (userError) {
      console.error("Error fetching user in getAuthenticatedUser (API route):");
    }
    return null;
  }

  const extendedUser: ExtendedUser = {
    ...user,
    fullName: user.user_metadata?.full_name || user.user_metadata?.name,
    avatarUrl: user.user_metadata?.avatar_url,
    role:
      user.user_metadata?.role === "admin" ||
      user.user_metadata?.role === "user"
        ? user.user_metadata.role
        : "user",
  };

  return extendedUser;
}

/**
 * Create a Supabase client using @supabase/ssr for server-side API routes.
 * NOTE: Provides only the `get` cookie method due to limitations in API routes.
 * This client might not handle token refreshes automatically.
 */
function createServerSupabaseClientForApiRoute() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
}
