/**
 * @deprecated This module is deprecated. Please import from '@/_infrastructure/supabase/server' instead.
 */

import "server-only"; // Ensure this module only runs on the server

import { cookies } from "next/headers";

import {
  createSupabaseServerClient as _createServerClient, // Renamed import
  createSupabaseServiceClient, // Direct import
  type TypedSSRSupabaseClient, // Import the type
  type TypedSupabaseClient, // Import the base client type if needed elsewhere
} from "./client";

import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"; // Import the specific type

/**
 * Get a Supabase client for server-side operations (Server Components, Route Handlers, Server Actions)
 * This client uses cookies for authentication.
 * @returns Supabase client instance for server-side usage.
 */
export async function getSupabaseServerClient(): Promise<TypedSSRSupabaseClient> {
  const cookieStore = await cookies();
  return _createServerClient(cookieStore);
}

/**
 * Alias for getSupabaseServerClient for convenience.
 * @returns Supabase client instance for server-side usage.
 */
export const createClient = getSupabaseServerClient;

// Export the specific client creation functions as well
export {
  _createServerClient as createServerSupabaseClient, // Keep original export name if needed elsewhere
  createSupabaseServiceClient, // Export service client
};

// Optional: Export the type if needed by consumers
export type { TypedSSRSupabaseClient };
