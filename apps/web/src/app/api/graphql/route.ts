import { readFileSync } from "fs";
import { join } from "path";

// Use the standard createClient for manual token handling
import { createServerClient as _createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
// Keep ssr client for potential use outside context if needed, but alias it
import { createYoga, createSchema } from "graphql-yoga";

import { resolvers } from "@/graphql/resolvers";

import type { User } from "@supabase/supabase-js";

// TODO: Verify that the @/types/database path is correct and the file exists.
// import type { Database } from '@/types/database';
type Database = any;

type GraphQLContext = {
  user: User | null;
  // Include standard client in context if needed by resolvers
  supabase?: ReturnType<typeof createSupabaseClient<Database>>;
  request: Request;
  params: Promise<{ [key: string]: string | string[] }>;
};

const typeDefs = readFileSync(
  join(process.cwd(), "graphql/schema/schema.graphql"),
  "utf-8",
);

const schema = createSchema<GraphQLContext>({
  typeDefs,
  resolvers,
});

const { handleRequest } = createYoga<GraphQLContext>({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
  context: async ({ request }) => {
    let user: User | null = null;
    let supabaseClient:
      | ReturnType<typeof createSupabaseClient<Database>>
      | undefined = undefined;

    try {
      // Create a standard Supabase client
      supabaseClient = createSupabaseClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );

      // Attempt to get user using JWT from Authorization header
      const authHeader = request.headers.get("Authorization");
      let jwt: string | undefined = undefined;
      if (authHeader?.startsWith("Bearer ")) {
        jwt = authHeader.split(" ")[1];
      }

      if (jwt) {
        const { data: userData, error: userError } =
          await supabaseClient.auth.getUser(jwt);
        if (userError) {
          console.error("Auth user error (JWT) in GraphQL context:", userError);
        } else {
          user = userData.user;
        }
      } else {
        // Optional: Could try getUser() without JWT to rely on cookies,
        // but this is less reliable in API routes without proper cookie handling.
        // const { data: cookieUserData, error: cookieUserError } = await supabaseClient.auth.getUser();
        // if (!cookieUserError) user = cookieUserData.user;
        console.log(
          "No JWT found in Authorization header for GraphQL request.",
        );
      }

      return {
        user,
        supabase: supabaseClient, // Pass client to resolvers if needed
        request,
        params: Promise.resolve({}),
      };
    } catch (error) {
      console.error("Context creation error:", error);
      return {
        user: null,
        supabase: supabaseClient, // Still pass client if initialized
        request,
        params: Promise.resolve({}),
      };
    }
  },
  maskedErrors: {
    maskError: (error: any, message: string) => {
      console.error("GraphQL Error:", {
        message: error.message,
        path: error.path,
        stack: error.stack,
      });
      return new Error(message);
    },
  },
});

export { handleRequest as GET, handleRequest as POST };

export type RouteHandlerResponse = Response;
