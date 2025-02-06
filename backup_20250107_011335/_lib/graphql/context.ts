import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { YogaInitialContext } from 'graphql-yoga';

export async function createContext({ request }: YogaInitialContext) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data: { session }, error } = await supabase.auth.getSession();

  return {
    user: session?.user,
    request,
  };
} 