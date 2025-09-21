"use client";

import { motion } from "framer-motion";
import {
  Mail,
  CheckCircle,
  ArrowRight,
  GalleryVerticalEnd,
  Loader2,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/ui/card";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const email = searchParams.get("email") || "your email";
  const supabase = createClient();

  // Check if we have a valid email
  const isValidEmail =
    email && email !== "your email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Countdown timer for resend button
  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const handleResendEmail = async () => {
    const targetEmail = showEmailInput ? emailInput : email;

    if (
      !targetEmail ||
      targetEmail === "your email" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)
    ) {
      toast.error("Email Error", {
        description:
          "Please provide a valid email address to resend verification.",
      });
      return;
    }

    setIsResending(true);

    try {
      console.log(
        "🔄 Attempting to resend verification email to:",
        targetEmail
      );

      const { error } = await supabase.auth.resend({
        type: "signup",
        email: targetEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/en/auth/callback?type=email`,
        },
      });

      if (error) {
        console.error("❌ Resend verification error:", error);

        // Handle specific error cases
        if (error.message.includes("already confirmed")) {
          toast.success("Email Already Verified", {
            description: "Your email is already verified. You can sign in now.",
          });
          router.push("/auth/login");
          return;
        } else if (error.message.includes("too many requests")) {
          toast.error("Too Many Attempts", {
            description:
              "Please wait a few minutes before requesting another email.",
          });
        } else {
          throw error;
        }
      } else {
        console.log("✅ Verification email resent successfully");
        toast.success("Email Sent", {
          description: "A new verification email has been sent to your inbox.",
        });

        // Reset the countdown timer
        setTimeLeft(60);
        setCanResend(false);
      }
    } catch (error) {
      console.error("❌ Failed to resend verification email:", error);
      toast.error("Resend Failed", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to send verification email. Please try again.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-background to-muted flex min-h-svh flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md px-4 py-8 flex flex-col items-center gap-8"
      >
        <Link
          href="/"
          className="flex items-center gap-3 self-center transition-transform hover:scale-105"
        >
          <>
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md shadow-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="font-semibold text-xl tracking-tight">
              Hijraah
            </span>
          </>
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="w-full"
        >
          <Card className="border-border/30 shadow-lg">
            <CardHeader className="space-y-2 text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Check your email
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {isValidEmail ? (
                  <>
                    We've sent a verification link to{" "}
                    <span className="font-medium text-foreground">{email}</span>
                  </>
                ) : (
                  "Please provide your email address to receive a verification link"
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                {isValidEmail && (
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Verification email sent</span>
                  </div>
                )}

                <div className="space-y-3">
                  {isValidEmail ? (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Click the verification link in your email to activate
                        your account.
                      </p>

                      <div className="bg-muted/50 rounded-md p-3 space-y-2">
                        <p className="text-xs text-muted-foreground font-medium">
                          Can't find the email?
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Check your spam/junk folder</li>
                          <li>• Make sure {email} is correct</li>
                          <li>• Wait a few minutes for delivery</li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Enter your email address below to receive a verification
                      link.
                    </p>
                  )}

                  {/* Email Input Section */}
                  {(!isValidEmail || showEmailInput) && (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label
                          htmlFor="email-input"
                          className="text-sm font-medium"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email-input"
                          type="email"
                          placeholder="Enter your email address"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      {isValidEmail && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowEmailInput(false)}
                          className="text-xs"
                        >
                          Use original email ({email})
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Option to change email if we have a valid one */}
                  {isValidEmail && !showEmailInput && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowEmailInput(true);
                        setEmailInput(email);
                      }}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Use a different email address
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleResendEmail}
                  variant="outline"
                  className="w-full"
                  disabled={(!canResend || isResending) && isValidEmail}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending email...
                    </>
                  ) : isValidEmail && !canResend ? (
                    `Resend in ${timeLeft}s`
                  ) : (
                    <>
                      {isValidEmail || showEmailInput
                        ? "Resend verification email"
                        : "Send verification email"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <Link href="/auth/login" className="w-full">
                  <Button className="w-full">
                    Continue to login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t bg-muted/30 p-4">
              <p className="text-center text-sm text-muted-foreground">
                Need help?{" "}
                <Link
                  href="/support"
                  className="text-primary font-medium hover:underline underline-offset-4"
                >
                  Contact Support
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
