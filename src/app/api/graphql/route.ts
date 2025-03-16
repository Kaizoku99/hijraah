import { createYoga, createSchema } from 'graphql-yoga';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resolvers } from '../../../../graphql/resolvers';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';
import type { User } from '@supabase/supabase-js';

type GraphQLContext = {
  user: User | null;
  supabase?: ReturnType<typeof createServerClient<Database>>;
  request: Request;
  params: Promise<{ [key: string]: string | string[] }>;
};

const typeDefs = readFileSync(
  join(process.cwd(), 'graphql/schema/schema.graphql'),
  'utf-8'
);

const schema = createSchema<GraphQLContext>({
  typeDefs,
  resolvers,
});

const { handleRequest } = createYoga<GraphQLContext>({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Request, Response },
  context: async ({ request }) => {
    try {
      const cookieStore = cookies();
      const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            }
          }
        }
      );

      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth session error:', error);
      }

      return {
        user: session?.user,
        supabase,
        request,
        params: Promise.resolve({}),
      };
    } catch (error) {
      console.error('Context creation error:', error);
      return {
        user: null,
        request,
        params: Promise.resolve({}),
      };
    }
  },
  maskedErrors: {
    maskError: (error: any, message: string) => {
      console.error('GraphQL Error:', {
        message: error.message,
        path: error.path,
        stack: error.stack
      });
      return new Error(message);
    }
  },
});

export { handleRequest as GET, handleRequest as POST };

export type RouteHandlerResponse = Response;