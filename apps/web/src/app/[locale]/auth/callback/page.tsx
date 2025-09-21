"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient();

      try {
        console.log("🔄 Processing auth callback...");

        // Get URL search parameters
        const code = searchParams.get("code");
        const error = searchParams.get("error");
        const errorCode = searchParams.get("error_code");
        const errorDescription = searchParams.get("error_description");

        // Handle error cases first
        if (error) {
          console.error("❌ Auth callback error:", {
            error,
            errorCode,
            errorDescription,
          });

          let userMessage = "Authentication failed";
          let description = "Please try again.";

          if (errorCode === "otp_expired") {
            userMessage = "Verification link expired";
            description = "Please request a new verification email.";
          } else if (errorCode === "signup_disabled") {
            userMessage = "Sign up disabled";
            description = "Please contact support.";
          }

          toast.error(userMessage, { description });
          router.push("/auth/login");
          return;
        }

        // Handle code exchange for email verification
        if (code) {
          console.log("🔑 Exchanging verification code for session...");

          const { data, error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            console.error("❌ Code exchange error:", exchangeError);

            if (exchangeError.message.includes("expired")) {
              toast.error("Verification link expired", {
                description: "Please request a new verification email.",
              });
              router.push("/auth/verify-email");
            } else {
              toast.error("Verification failed", {
                description: exchangeError.message || "Please try again.",
              });
              router.push("/auth/login");
            }
            return;
          }

          if (data.session && data.user) {
            console.log("✅ Email verification successful:", {
              userId: data.user.id,
              email: data.user.email,
              confirmed: data.user.email_confirmed_at,
            });

            toast.success("Email verified successfully!", {
              description:
                "Your account has been activated. Welcome to Hijraah!",
            });

            // Trigger intelligent onboarding analysis
            try {
              console.log("🚀 Triggering intelligent onboarding analysis...");
              const response = await fetch("/api/onboarding/analyze", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: data.user.email,
                  userId: data.user.id,
                }),
              });

              if (response.ok) {
                const result = await response.json();
                console.log("✅ Intelligent onboarding initiated:", result);

                if (!result.cached) {
                  toast.success("Personalizing your experience!", {
                    description:
                      "We're analyzing your company profile to customize your experience.",
                  });
                }
              } else {
                console.warn(
                  "⚠️ Intelligent onboarding failed:",
                  response.status
                );
                // Don't show error to user as this is non-critical
              }
            } catch (error) {
              console.warn(
                "⚠️ Error triggering intelligent onboarding:",
                error
              );
              // Don't show error to user as this is non-critical
            }

            // Redirect to dashboard
            const redirectTo = searchParams.get("redirectTo") || "/dashboard";
            router.push(redirectTo);
            return;
          }
        }

        // Fallback: Check current session
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          console.error("❌ Session check error:", sessionError);
          toast.error("Authentication failed", {
            description: sessionError.message || "Please try again.",
          });
          router.push("/auth/login");
          return;
        }

        if (sessionData.session) {
          console.log("✅ Active session found");
          toast.success("Welcome back to Hijraah!", {
            description: "You have been successfully authenticated.",
          });

          const redirectTo = searchParams.get("redirectTo") || "/dashboard";
          router.push(redirectTo);
        } else {
          console.log("❌ No active session, redirecting to login");
          toast.error("Authentication incomplete", {
            description: "Please sign in to continue.",
          });
          router.push("/auth/login");
        }
      } catch (err) {
        console.error("❌ Unexpected error during auth callback:", err);
        toast.error("Something went wrong", {
          description: "Please try again.",
        });
        router.push("/auth/login");
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center space-y-4">
        <Loader2 className="mx-auto h-8 w-8 animate-spin" />
        <h1 className="text-xl font-medium">Completing authentication...</h1>
        <p className="text-muted-foreground">
          Please wait while we verify your credentials.
        </p>
      </div>
    </div>
  );
}
