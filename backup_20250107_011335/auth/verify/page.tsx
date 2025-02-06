'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const supabase = createClient();

  const verifyEmail = useCallback(async () => {
    try {
      const token = searchParams.get('token');
      const type = searchParams.get('type');

      if (!token || type !== 'email') {
        throw new Error('Invalid verification link');
      }

      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      });

      if (error) throw error;

      setIsVerified(true);
      toast({
        title: 'Success',
        description: 'Your email has been verified',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to verify email',
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, supabase.auth, toast]);

  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  if (isLoading) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Verifying your email
            </h1>
            <p className="text-sm text-muted-foreground">
              Please wait while we verify your email address
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isVerified ? 'Email verified' : 'Verification failed'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isVerified
              ? 'You can now sign in to your account'
              : 'Please try again or contact support'}
          </p>
        </div>

        <Button
          onClick={() => router.push('/auth/login')}
          className="w-full"
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
} 