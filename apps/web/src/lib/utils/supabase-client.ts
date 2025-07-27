import {
  createClient as createSupabaseJsClient,
  SupabaseClient,
} from "@supabase/supabase-js";

// Type definition for the possible roles a job might need
export type SupabaseRole = "anon" | "service";

/**
 * Creates a Supabase client using environment variables.
 *
 * Usage in jobs:
 *   const supabase = createSupabaseClient(); // anon by default
 *   const admin = createSupabaseClient("service");
 */
export function createSupabaseClient(
  role: SupabaseRole = "anon",
): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  if (!url) {
    throw new Error(
      "Supabase URL is missing. Set NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL.",
    );
  }

  const key =
    role === "service"
      ? process.env.SUPABASE_SERVICE_KEY ||
        process.env.SUPABASE_SERVICE_ROLE_KEY
      : process.env.SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!key) {
    throw new Error(
      `Supabase ${role} key is missing. Check environment variables.`,
    );
  }

  return createSupabaseJsClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
