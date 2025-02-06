"use client";

import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Session } from '@supabase/supabase-js';

export default function AuthButton({ session }: { session: Session | null }) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return session ? (
    <Button variant="outline" onClick={handleSignOut}>
      Sign Out
    </Button>
  ) : (
    <Button variant="outline" onClick={() => router.push('/login')}>
      Sign In
    </Button>
  );
}