"use client";

import { Loader2, Mail, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { useAuth } from "@/lib/auth/hooks";
import { getSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";

const VERIFICATION_PAGE_REFRESH_INTERVAL_SECONDS = 60;
const RESEND_EMAIL_COOLDOWN_SECONDS = 60;
const RESEND_EMAIL_ERROR_COOLDOWN_SECONDS = 30;

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isResending, setIsResending] = React.useState(false);
  const [pageRefreshCountdown, setPageRefreshCountdown] = React.useState(
    VERIFICATION_PAGE_REFRESH_INTERVAL_SECONDS
  );
  const [resendCooldown, setResendCooldown] = React.useState(
    RESEND_EMAIL_COOLDOWN_SECONDS
  ); // Cooldown for the resend button
  const resendButtonRef = React.useRef<HTMLButtonElement>(null);

  // Auto refresh countdown for page verification check
  React.useEffect(() => {
    if (pageRefreshCountdown > 0) {
      const timer = setTimeout(
        () => setPageRefreshCountdown(pageRefreshCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [pageRefreshCountdown]);

  // Cooldown for resend button
  React.useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Focus resend button when it becomes available
  React.useEffect(() => {
    if (resendCooldown === 0 && !isResending && resendButtonRef.current) {
      resendButtonRef.current.focus();
    }
  }, [resendCooldown, isResending]);

  // Check verification status when pageRefreshCountdown hits 0
  React.useEffect(() => {
    const checkVerification = async () => {
      try {
        const supabase = await getSupabaseClient();
        const {
          data: { user: currentUser },
          error,
        } = await supabase.auth.getUser();

        if (error) throw error;

        if (currentUser?.email_confirmed_at) {
          toast.success("Email verified successfully!");
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error checking verification:", error);
        toast.error(
          "Failed to check email verification status. Please check your internet connection."
        );
      }
    };

    if (pageRefreshCountdown === 0) {
      checkVerification();
      setPageRefreshCountdown(VERIFICATION_PAGE_REFRESH_INTERVAL_SECONDS); // Reset auto-refresh countdown
    }
  }, [pageRefreshCountdown, router]);

  const handleResendEmail = async () => {
    try {
      if (!user?.email) {
        toast.error("Email address not found");
        return;
      }

      setIsResending(true);
      const supabase = await getSupabaseClient();
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: user.email,
      });

      if (error) throw error;

      toast.success("Verification email resent successfully");
      setResendCooldown(RESEND_EMAIL_COOLDOWN_SECONDS); // Reset resend cooldown
      setPageRefreshCountdown(VERIFICATION_PAGE_REFRESH_INTERVAL_SECONDS); // Also reset page refresh timer
    } catch (error) {
      console.error("Error resending verification:", error);
      toast.error("Failed to resend verification email");
      setResendCooldown(RESEND_EMAIL_ERROR_COOLDOWN_SECONDS); // Shorter cooldown on error
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
                We&apos;ve sent a verification email to{" "}
                <span className="font-medium">{user.email}</span>
              </>
            ) : (
              "Please check your email for verification instructions"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>
              Please check your email and click the verification link to
              continue.
            </p>
            <p className="mt-2">
              The page will automatically refresh in{" "}
              <span className="font-medium">{pageRefreshCountdown}</span>{" "}
              seconds.
            </p>
          </div>
          <div className="flex items-center justify-center">
            {pageRefreshCountdown === 0 && (
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            ref={resendButtonRef}
            variant="outline"
            className="w-full"
            onClick={handleResendEmail}
            disabled={isResending || resendCooldown > 0}
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
                {resendCooldown > 0 && ` (${resendCooldown}s)`}
              </>
            )}
          </Button>
          <div className="text-center text-sm">
            <Button
              variant="link"
              className="text-muted-foreground"
              onClick={() => router.push("/auth/login")}
            >
              Back to Sign In
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
