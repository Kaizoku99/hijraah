"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Loader2,
  GalleryVerticalEnd,
  ArrowRight,
  Mail,
  KeyRound,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthRedirector } from "@/components/ui/auth/AuthRedirector";
import { Label } from "@/components/ui/label";
import {
  PasswordStrengthMeter,
  getPasswordStrength,
} from "@/components/ui/password-strength";
import { useAuth } from "@/lib/auth/hooks";
import { registerSchema, RegisterFormValues } from "@/lib/validations/auth";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/ui/card";
import { FormError } from "@/ui/form-error";
import { Input } from "@/ui/input";
import { Separator } from "@/ui/separator";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp, user, session } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectedFrom") || "/dashboard";

  // Form validation with react-hook-form and zod
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    trigger,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // Real-time validation for better UX
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password changes for strength meter
  const watchedPassword = watch("password", "");

  // Update password state when form password changes
  useEffect(() => {
    setPassword(watchedPassword);
  }, [watchedPassword]);

  // Check if user is authenticated
  useEffect(() => {
    if (user && session) {
      router.push(redirectTo);
    }
  }, [user, session, router, redirectTo]);

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("🔍 Form submission started:", {
      data,
      isValid,
      isDirty,
      errors,
      isSubmitting,
      isLoading,
      formState: { isValid, isDirty, errors },
    });

    // Guard: Prevent double submission
    if (isSubmitting || isLoading) {
      console.log("❌ Already submitting - ignoring duplicate submission");
      toast.error("Please wait", {
        description: "Form is already being submitted.",
      });
      return;
    }

    setIsSubmitting(true);

    // First layer: Check React Hook Form validation state
    if (!isValid) {
      console.log("❌ Form invalid - preventing submission");
      setIsSubmitting(false);
      await trigger();
      toast.error("Please fix the errors", {
        description: "Complete all required fields with valid information.",
      });
      return;
    }

    // Second layer: Manual validation as backup
    if (!data.email || !data.password || !data.confirmPassword) {
      console.log("❌ Empty fields detected:", {
        email: !!data.email,
        password: !!data.password,
        confirmPassword: !!data.confirmPassword,
      });
      setIsSubmitting(false);
      toast.error("Validation Error", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    // Third layer: Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.log("❌ Invalid email format:", data.email);
      setIsSubmitting(false);
      toast.error("Invalid Email", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    // Fourth layer: Enhanced password validation
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      console.log("❌ Password validation failed:", passwordValidation);
      setIsSubmitting(false);
      toast.error("Password Error", {
        description: passwordValidation.errors.join(", "),
      });
      return;
    }

    // Fifth layer: Password confirmation
    if (data.password !== data.confirmPassword) {
      console.log("❌ Passwords don't match");
      setIsSubmitting(false);
      toast.error("Password Mismatch", {
        description: "Passwords do not match.",
      });
      return;
    }

    // Final validation summary
    const finalValidation = {
      email: {
        hasValue: !!data.email,
        isValidFormat: emailRegex.test(data.email),
        value: data.email,
      },
      password: validatePassword(data.password),
      confirmation: {
        hasValue: !!data.confirmPassword,
        matches: data.password === data.confirmPassword,
        value: data.confirmPassword,
      },
    };

    console.log("🔍 Final validation summary:", finalValidation);

    // Last safety check - ensure everything is really valid
    if (
      !finalValidation.email.hasValue ||
      !finalValidation.email.isValidFormat ||
      !finalValidation.password.isValid ||
      !finalValidation.confirmation.hasValue ||
      !finalValidation.confirmation.matches
    ) {
      console.log("❌ Final validation failed - this should never happen");
      setIsSubmitting(false);
      toast.error("Validation Error", {
        description: "Please check all fields and try again.",
      });
      return;
    }

    console.log("✅ All validation passed - proceeding with registration");
    setIsLoading(true);

    try {
      await signUp({
        email: data.email,
        password: data.password,
        redirectTo: `${window.location.origin}/en/auth/callback?type=email`,
      });

      toast.success("Registration successful", {
        description: "Please check your email to verify your account.",
      });

      // Redirect to verification page with email parameter
      router.push(`/auth/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific Supabase errors
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during registration.";

      // Provide specific feedback for common errors
      if (errorMessage.includes("email")) {
        toast.error("Email Error", {
          description: "This email is already registered or invalid.",
        });
      } else if (errorMessage.includes("password")) {
        toast.error("Password Error", {
          description: "Password doesn't meet requirements.",
        });
      } else {
        toast.error("Registration failed", {
          description: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
      console.log("🏁 Form submission completed");
    }
  };

  // Add additional validation check for better debugging
  const validateForm = useCallback(() => {
    const currentErrors = Object.keys(errors).length;
    console.log("📊 Form validation status:", {
      isValid,
      isDirty,
      errorCount: currentErrors,
      errors,
      formValues: {
        email: watch("email"),
        password: watchedPassword,
        confirmPassword: watch("confirmPassword"),
      },
    });
  }, [isValid, isDirty, errors, watch, watchedPassword]);

  // Debug form state changes
  useEffect(() => {
    if (isDirty) {
      validateForm();
    }
  }, [isDirty, validateForm]);

  // Comprehensive password validation function
  const validatePassword = (password: string) => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    return {
      isValid: errors.length === 0,
      errors,
      strength: getPasswordStrength(password),
    };
  };

  // Enhanced form submission handler with additional safety checks
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🎯 Form submit event triggered");

    // Pre-submit validation check
    if (isSubmitting || isLoading) {
      console.log("❌ Blocking form submission - already processing");
      e.stopPropagation();
      return false;
    }

    // Additional form state validation
    const formData = new FormData(e.target as HTMLFormElement);
    const emailValue = formData.get("email") as string;
    const passwordValue = formData.get("password") as string;
    const confirmPasswordValue = formData.get("confirmPassword") as string;

    console.log("📝 Raw form data:", {
      email: emailValue,
      passwordLength: passwordValue?.length || 0,
      confirmPasswordLength: confirmPasswordValue?.length || 0,
      hasAllFields: !!(emailValue && passwordValue && confirmPasswordValue),
    });

    // If form data looks empty, prevent submission
    if (!emailValue || !passwordValue || !confirmPasswordValue) {
      console.log("❌ Blocking submission - empty form data detected");
      toast.error("Form Error", {
        description: "Please fill in all fields before submitting.",
      });
      e.stopPropagation();
      return false;
    }

    // Let React Hook Form handle the rest
    return handleSubmit(onSubmit)(e);
  };

  return (
    <>
      <AuthRedirector />
      <div className="bg-gradient-to-br from-background to-muted flex min-h-svh flex-col items-center justify-center p-4 md:p-8">
        <div className="absolute top-4 right-4 flex items-center gap-2"></div>

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
                <CardTitle className="text-2xl font-bold">
                  Create your account
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enter your details to create a new account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <Button
                        variant="outline"
                        className="w-full shadow-sm hover:shadow-md transition-all px-4 py-2 flex items-center text-sm"
                        disabled
                        onClick={() =>
                          toast.info("Coming Soon", {
                            description:
                              "Apple Sign-in will be available soon.",
                          })
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="flex-shrink-0 size-4 mr-2"
                        >
                          <path
                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                            fill="currentColor"
                          />
                        </svg>
                        Sign up with Apple
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full shadow-sm hover:shadow-md transition-all px-4 py-2 flex items-center text-sm"
                        disabled
                        onClick={() =>
                          toast.info("Coming Soon", {
                            description:
                              "Google Sign-in will be available soon.",
                          })
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="flex-shrink-0 size-4 mr-2"
                        >
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 3.36 2.16 2.16 2.84 5.213 2.84 7.667 0 .76-.053 1.467-.173 2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                        Sign up with Google
                      </Button>
                    </div>

                    <div className="relative flex items-center gap-2 py-2">
                      <Separator className="flex-1" />
                      <span className="text-xs text-muted-foreground font-medium bg-card px-2">
                        Or continue with email
                      </span>
                      <Separator className="flex-1" />
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className={`pl-10 pr-10 ${
                              errors.email
                                ? "border-destructive focus-visible:ring-destructive"
                                : isDirty && watch("email") && !errors.email
                                  ? "border-green-500 focus-visible:ring-green-500"
                                  : ""
                            }`}
                            aria-invalid={!!errors.email}
                            aria-describedby={
                              errors.email ? "email-error" : undefined
                            }
                            disabled={isLoading}
                            {...register("email")}
                          />
                          {/* Validation Icon */}
                          {isDirty && watch("email") && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              {errors.email ? (
                                <AlertCircle className="h-4 w-4 text-destructive" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          )}
                        </div>
                        {errors.email && (
                          <FormError
                            message={errors.email.message}
                            id="email-error"
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="password"
                          className="text-sm font-medium"
                        >
                          Password
                        </Label>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            className={`pl-10 pr-10 ${
                              errors.password
                                ? "border-destructive focus-visible:ring-destructive"
                                : isDirty && watchedPassword && !errors.password
                                  ? "border-green-500 focus-visible:ring-green-500"
                                  : ""
                            }`}
                            aria-invalid={!!errors.password}
                            aria-describedby={
                              errors.password ? "password-error" : undefined
                            }
                            disabled={isLoading}
                            {...register("password")}
                          />
                          {/* Validation Icon */}
                          {isDirty && watchedPassword && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              {errors.password ? (
                                <AlertCircle className="h-4 w-4 text-destructive" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          )}
                        </div>
                        {errors.password && (
                          <FormError
                            message={errors.password.message}
                            id="password-error"
                          />
                        )}

                        {/* Password Strength Meter */}
                        {watchedPassword && (
                          <div className="mt-2">
                            <PasswordStrengthMeter password={watchedPassword} />
                          </div>
                        )}

                        {/* Password Requirements */}
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Password must contain:</p>
                          <ul className="list-disc list-inside space-y-0.5 ml-2">
                            <li>At least 8 characters</li>
                            <li>One uppercase letter</li>
                            <li>One lowercase letter</li>
                            <li>One number</li>
                            <li>One special character</li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium"
                        >
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className={`pl-10 pr-10 ${
                              errors.confirmPassword
                                ? "border-destructive focus-visible:ring-destructive"
                                : isDirty &&
                                    watch("confirmPassword") &&
                                    !errors.confirmPassword &&
                                    watch("confirmPassword") === watchedPassword
                                  ? "border-green-500 focus-visible:ring-green-500"
                                  : ""
                            }`}
                            aria-invalid={!!errors.confirmPassword}
                            aria-describedby={
                              errors.confirmPassword
                                ? "confirm-password-error"
                                : undefined
                            }
                            disabled={isLoading}
                            {...register("confirmPassword")}
                          />
                          {/* Validation Icon */}
                          {isDirty && watch("confirmPassword") && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              {errors.confirmPassword ? (
                                <AlertCircle className="h-4 w-4 text-destructive" />
                              ) : watch("confirmPassword") ===
                                watchedPassword ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                              )}
                            </div>
                          )}
                        </div>
                        {errors.confirmPassword && (
                          <FormError
                            message={errors.confirmPassword.message}
                            id="confirm-password-error"
                          />
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full font-medium"
                      disabled={
                        isLoading || isSubmitting || !isValid || !isDirty
                      }
                    >
                      {isLoading || isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {isSubmitting
                            ? "Validating..."
                            : "Creating account..."}
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {/* Form Status Indicators */}
                    {isDirty && !isValid && (
                      <div className="text-xs text-muted-foreground text-center mt-2">
                        Please complete all fields correctly to continue
                      </div>
                    )}

                    {(isSubmitting || isLoading) && (
                      <div className="text-xs text-blue-600 text-center mt-2">
                        {isSubmitting
                          ? "Checking form data..."
                          : "Creating your account..."}
                      </div>
                    )}

                    {/* Debug Form State - Remove in production */}
                    {process.env.NODE_ENV === "development" && (
                      <div className="text-xs text-gray-500 text-center mt-2 space-y-1">
                        <div>
                          Valid: {isValid ? "✅" : "❌"} | Dirty:{" "}
                          {isDirty ? "✅" : "❌"} | Errors:{" "}
                          {Object.keys(errors).length}
                        </div>
                        <div>
                          Submitting: {isSubmitting ? "🔄" : "⏸️"} | Loading:{" "}
                          {isLoading ? "🔄" : "⏸️"}
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t bg-muted/30 p-4">
                <p className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-primary font-medium hover:underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </motion.div>

          <p className="text-muted-foreground text-center text-xs max-w-xs">
            By clicking Create Account, you agree to our{" "}
            <Link
              href="/terms"
              className="text-primary hover:underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-primary hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </>
  );
}
