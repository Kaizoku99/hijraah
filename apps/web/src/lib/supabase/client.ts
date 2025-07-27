import {
  createBrowserClient as _createBrowserClient,
  createServerClient as _createServerClient,
} from "@supabase/ssr";
import {
  createClient as createSupabaseClient,
  SupabaseClient,
  type SupabaseClient as CoreSupabaseClient,
} from "@supabase/supabase-js";
import fetchPonyfill from "fetch-ponyfill";
import { useMemo } from "react";

import type { Database } from "@/types/database.types";

import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

// Get fetch from ponyfill to avoid undici issues like 'Failed to execute 'fetch' on 'Window': Invalid name'
// See: https://github.com/vercel/next.js/issues/54827
const { fetch: ponyfetch } = fetchPonyfill();

// Environment variables for Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Type alias for clarity
export type TypedSupabaseClient = SupabaseClient<Database>;
export type TypedSSRSupabaseClient = CoreSupabaseClient<Database>;

// --------------------------------------
// Shared header builders
// --------------------------------------

/**
 * Default headers that must accompany every request made via a browser or server client
 * which authenticates with the anonymous public key.  This prevents 401 responses from
 * PostgREST that indicate the `apikey` header is missing.
 */
const anonymousHeaders: Record<string, string> | undefined = supabaseAnonKey
  ? { apikey: supabaseAnonKey }
  : undefined;

/**
 * Default headers for the service-role client.  These include the service key as both the
 * `apikey` header and (where relevant) the `Authorization` header is still injected by the
 * libraryʼs internal `fetchWithAuth` helper.
 */
const serviceHeaders: Record<string, string> | undefined = serviceRoleKey
  ? { apikey: serviceRoleKey }
  : undefined;

// Helper function to check essential env vars
function checkPublicEnvVars() {
  if (process.env.NODE_ENV === "development") {
    console.debug(
      "[Supabase Env] NEXT_PUBLIC_SUPABASE_URL present?",
      !!supabaseUrl,
    );
    console.debug(
      "[Supabase Env] NEXT_PUBLIC_SUPABASE_ANON_KEY present?",
      !!supabaseAnonKey,
    );
    console.debug(
      "[Supabase Env] SUPABASE_SERVICE_ROLE_KEY present?",
      !!serviceRoleKey,
    );
  }
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      "Missing environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
    throw new Error("Supabase URL or Anon Key is missing.");
  }
}

// --------------------------------------
// Patch global `fetch` on the **server** to use `ponyfetch`.
// This avoids the infamous Undici "Socket closed unexpectedly" bug on
// Windows/Node 18-20 without relying on fragile Undici internals.
// The patch is idempotent and NO-OPs in the browser.

if (typeof window === "undefined") {
  const g = globalThis as any;
  if (!g.__USING_PONYFETCH__) {
    g.fetch = ponyfetch as unknown as typeof fetch;
    g.__USING_PONYFETCH__ = true;
    console.info("[Supabase] Server fetch patched to use ponyfetch ✅");
  }
}

// --- Browser Client (Singleton with Hook) ---
let browserClientInstance: TypedSSRSupabaseClient | undefined;

function getSupabaseBrowserClient(): TypedSSRSupabaseClient {
  checkPublicEnvVars();
  if (browserClientInstance) {
    return browserClientInstance;
  }

  // In the browser we rely on the native `fetch` implementation to ensure that
  // request headers (apikey/Authorization) are preserved. Injecting a ponyfill
  // here has proven to strip custom headers in certain edge-cases, leading to
  // 401 "No API key found" responses. Therefore we only attach the required
  // headers and leave `fetch` undefined so @supabase/ssr uses the global one.

  browserClientInstance = _createBrowserClient<Database>(
    supabaseUrl!,
    supabaseAnonKey!,
    {
      global: {
        headers: anonymousHeaders,
      },
    },
  );

  if (typeof window !== "undefined") {
    console.debug("[Supabase] anon key present?", !!supabaseAnonKey);
  }

  return browserClientInstance;
}

/**
 * Hook to get a Supabase client instance suitable for Browser/Client Components.
 * Uses a singleton pattern to ensure only one client instance is created.
 * Leverages @supabase/ssr for proper session handling with Next.js App Router.
 * @returns Memoized Supabase client instance for browser usage.
 */
export function useSupabaseBrowser(): TypedSSRSupabaseClient {
  return useMemo(getSupabaseBrowserClient, []);
}

// This is the primary export for creating a browser client directly
export function createClient(): TypedSSRSupabaseClient {
  checkPublicEnvVars();
  return _createBrowserClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    global: {
      headers: anonymousHeaders,
    },
  });
}

// --- Server Client (For Server Components, Route Handlers, Server Actions) ---

/**
 * Creates a Supabase client suitable for use in Server Components, Server Actions,
 * and Route Handlers that require access to cookies.
 * @param cookieStore A ReadonlyRequestCookies instance (e.g., from `next/headers`).
 * @returns Supabase client instance for server-side usage with cookie handling.
 */
export function createSupabaseServerClient(
  cookieStore: ReadonlyRequestCookies,
): TypedSSRSupabaseClient {
  checkPublicEnvVars();
  return _createServerClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options) {
        try {
          cookieStore.set(name, value, options);
        } catch (error) {
          console.warn(`Failed to set cookie '${name}':`, error);
        }
      },
      remove(name: string, options) {
        try {
          cookieStore.set(name, "", options);
        } catch (error) {
          console.warn(`Failed to remove cookie '${name}':`, error);
        }
      },
    },
    global: {
      fetch: ponyfetch,
      headers: anonymousHeaders,
    },
  });
}

// --- Service Role Client (Admin Operations) ---

/**
 * Creates a Supabase client with the service role key for admin operations.
 * WARNING: This client bypasses RLS. Use only in trusted server-side environments
 * with proper authorization checks. NEVER expose the service role key to the browser.
 * @returns Supabase client instance with service_role privileges.
 */
export function createSupabaseServiceClient(): TypedSupabaseClient {
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Supabase URL or Service Role Key is missing");
    throw new Error("Supabase service client configuration is incomplete.");
  }

  return createSupabaseClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      fetch: ponyfetch,
      headers: serviceHeaders,
    },
  });
}

// --- Client with Custom Auth Token ---

/**
 * Creates a Supabase client authenticated with a custom JWT token.
 * Useful for scenarios like testing or specific server-to-server interactions.
 * @param authToken JWT token for authentication.
 * @returns Authenticated Supabase client instance.
 */
export function createClientWithAuth(authToken: string): TypedSupabaseClient {
  checkPublicEnvVars();
  return createSupabaseClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: ponyfetch,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...(anonymousHeaders ?? {}),
      },
    },
  });
}

// ======================================
// EDGE RUNTIME CLIENT
// ======================================

/**
 * Creates a Supabase client suitable for Edge Runtime environments (e.g., Edge Functions, Middleware).
 * Reads cookies from the Request headers. Requires manual handling for setting/removing cookies
 * via Response headers in the calling Edge function.
 * @param request The Request object from the Edge Function context.
 */
export const createEdgeClient = (request: Request): TypedSSRSupabaseClient => {
  checkPublicEnvVars();
  const cookieHeader = request.headers.get("cookie") ?? "";

  return _createServerClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      get(name: string) {
        const match = cookieHeader.match(new RegExp(`(^|;)\s*${name}=([^;]+)`));
        return match?.[2];
      },
      set(name: string, value: string, options) {
        console.warn(
          `Attempted to set cookie '${name}' in createEdgeClient. This must be handled by the caller via Response headers.`,
        );
      },
      remove(name: string, options) {
        console.warn(
          `Attempted to remove cookie '${name}' in createEdgeClient. This must be handled by the caller via Response headers.`,
        );
      },
    },
    global: {
      fetch: ponyfetch,
      headers: anonymousHeaders,
    },
  });
};

// --- Remove Deprecated Compatibility Exports ---

/**
 * @deprecated Use `useSupabaseBrowser` in Client Components or `createSupabaseServerClient` in Server Components/Actions/Routes.
 */
export const getSupabaseClient = getSupabaseBrowserClient;

/**
 * @deprecated Use `createSupabaseServiceClient` for elevated privilege operations.
 */
export const createServiceClient = createSupabaseServiceClient;

/**
 * @deprecated Prefer specific client creation (`useSupabaseBrowser`, `createSupabaseServerClient`, `createSupabaseServiceClient`). Avoid direct default export usage.
 */
export const supabase = getSupabaseBrowserClient();
