import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

import type { Database } from "@/types/database.types";

import type { NextRequest } from "next/server";

/**
 * Updates the Supabase auth session by refreshing the user's token if needed
 * Used by Next.js middleware
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          // This will set a cookie on the response
          request.cookies.set(name, value);
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set(name, value, options);
        },
        remove(name, options) {
          // This will remove a cookie from the response
          request.cookies.set(name, "");
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );

  // This will refresh the user's session if needed
  await supabase.auth.getUser();

  return response;
}
