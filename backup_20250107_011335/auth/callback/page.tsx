'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const error_description = searchParams.get('error_description');
      
      if (error || error_description) {
        toast({
          variant: 'destructive',
          title: 'Authentication Error',
          description: error_description || 'Failed to authenticate',
        });
        router.push('/auth/login');
        return;
      }

      if (!code) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No authentication code found',
        });
        router.push('/auth/login');
        return;
      }

      try {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (error) {
          throw error;
        }

        // Get the redirect URL from local storage if it exists
        const redirectTo = localStorage.getItem('redirectTo') || '/dashboard';
        localStorage.removeItem('redirectTo'); // Clean up

        toast({
          title: 'Success',
          description: 'Successfully authenticated',
        });
        
        router.push(redirectTo);
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message || 'Failed to authenticate',
        });
        router.push('/auth/login');
      }
    };

    handleCallback();
  }, [searchParams, router, toast, supabase.auth]);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Authenticating
          </h1>
          <p className="text-sm text-muted-foreground">
            Please wait while we complete the authentication process
          </p>
          <div className="flex justify-center pt-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
} 