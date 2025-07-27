"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Loader2,
  GalleryVerticalEnd,
  ArrowRight,
  Mail,
  KeyRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { AuthRedirector } from "@/components/ui/auth/AuthRedirector";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth/hooks";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth";
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

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user, session } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectedFrom") || "/dashboard";

  // Form validation with react-hook-form and zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Check if user is authenticated
  useEffect(() => {
    if (user && session) {
      router.push(redirectTo);
    }
  }, [user, session, router, redirectTo]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      await signIn(data.email, data.password);

      // Initialize onboarding if needed
      try {
        await fetch("/api/onboarding/init", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (err) {
        console.error("Error initializing onboarding:", err);
      }

      toast({
        title: "Login",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
            legacyBehavior
          >
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md shadow-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="font-semibold text-xl tracking-tight">
              Hijraah
            </span>
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
                  Login to your account
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <Button
                        variant="outline"
                        className="w-full shadow-sm hover:shadow-md transition-all px-4 py-2 flex items-center text-sm"
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
                        Sign in with Apple
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full shadow-sm hover:shadow-md transition-all px-4 py-2 flex items-center text-sm"
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
                        Sign in with Google
                      </Button>
                    </div>

                    <div className="relative flex items-center gap-2 py-2">
                      <Separator className="flex-1" />
                      <span className="text-xs text-muted-foreground font-medium bg-card px-2">
                        Or continue with
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
                            className="pl-10"
                            aria-invalid={!!errors.email}
                            aria-describedby={
                              errors.email ? "email-error" : undefined
                            }
                            disabled={isLoading}
                            {...register("email")}
                          />
                        </div>
                        {errors.email && (
                          <FormError
                            message={errors.email.message}
                            id="email-error"
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="password"
                            className="text-sm font-medium"
                          >
                            Password
                          </Label>
                          <Link
                            href="/auth/forgot-password"
                            className="text-xs text-primary hover:underline underline-offset-4 transition-colors"
                            aria-label="Forgot Password"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            className="pl-10"
                            aria-invalid={!!errors.password}
                            aria-describedby={
                              errors.password ? "password-error" : undefined
                            }
                            disabled={isLoading}
                            {...register("password")}
                          />
                        </div>
                        {errors.password && (
                          <FormError
                            message={errors.password.message}
                            id="password-error"
                          />
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t bg-muted/30 p-4">
                <p className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="text-primary font-medium hover:underline underline-offset-4"
                  >
                    Create an account
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </motion.div>

          <p className="text-muted-foreground text-center text-xs max-w-xs">
            By clicking Sign In, you agree to our{" "}
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
