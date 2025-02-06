'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getSupabaseClient } from '@/lib/supabase/client';

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isResending, setIsResending] = React.useState(false);
  const [countdown, setCountdown] = React.useState(60);

  // Auto refresh countdown
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Check verification status
  React.useEffect(() => {
    const checkVerification = async () => {
      try {
        const supabase = await getSupabaseClient();
        const { data: { user: currentUser }, error } = await supabase.auth.getUser();
        
        if (error) throw error;

        if (currentUser?.email_confirmed_at) {
          toast.success('Email verified successfully!');
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error checking verification:', error);
      }
    };

    // Check every 5 seconds when countdown is 0
    if (countdown === 0) {
      checkVerification();
      setCountdown(60); // Reset countdown
    }
  }, [countdown, router]);

  const handleResendEmail = async () => {
    try {
      if (!user?.email) {
        toast.error('Email address not found');
        return;
      }

      setIsResending(true);
      const supabase = await getSupabaseClient();
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });

      if (error) throw error;

      toast.success('Verification email resent successfully');
      setCountdown(60); // Reset countdown
    } catch (error) {
      console.error('Error resending verification:', error);
      toast.error('Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Verify Your Email
          </CardTitle>
          <CardDescription>
            {user?.email ? (
              <>
                We&apos;ve sent a verification email to{' '}
                <span className="font-medium">{user.email}</span>
              </>
            ) : (
              'Please check your email for verification instructions'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>Please check your email and click the verification link to continue.</p>
            <p className="mt-2">
              The page will automatically refresh in{' '}
              <span className="font-medium">{countdown}</span> seconds.
            </p>
          </div>
          <div className="flex items-center justify-center">
            {countdown === 0 && (
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleResendEmail}
            disabled={isResending || countdown > 0}
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Resend Verification Email
                {countdown > 0 && ` (${countdown}s)`}
              </>
            )}
          </Button>
          <div className="text-center text-sm">
            <Button
              variant="link"
              className="text-muted-foreground"
              onClick={() => router.push('/auth/login')}
            >
              Back to Sign In
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 