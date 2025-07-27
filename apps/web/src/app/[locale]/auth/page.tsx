'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from "framer-motion";
import { Loader2, GalleryVerticalEnd, ArrowRight, Mail, KeyRound, UserPlus, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { AuthRedirector } from '@/components/ui/auth/AuthRedirector';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth/hooks';
import { registerSchema, RegisterFormValues } from '@/lib/validations/auth';
import { Button } from '@/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/ui/card';
import { FormError } from '@/ui/form-error';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { PasswordStrengthMeter } from '@/ui/password-strength';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  // Watch password for strength indicator
  const password = watch('password', '');

  // Requirements that we'll check
  const requirements = [
    {
      id: 'length',
      label: 'Must be at least 8 characters',
      isValid: password.length >= 8
    },
    {
      id: 'uppercase',
      label: 'Contains uppercase letter',
      isValid: /[A-Z]/.test(password)
    },
    {
      id: 'lowercase',
      label: 'Contains lowercase letter',
      isValid: /[a-z]/.test(password)
    },
    {
      id: 'number',
      label: 'Contains number',
      isValid: /[0-9]/.test(password)
    },
    {
      id: 'special',
      label: 'Contains special character',
      isValid: /[^A-Za-z0-9]/.test(password)
    },
  ];

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);

    try {
      await signUp(data.email, data.password);

      // Initialize onboarding if needed
      try {
        await fetch('/api/onboarding/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
      } catch (err) {
        console.error('Error initializing onboarding:', err);
      }

      toast({
        title: 'Register',
        description: 'Registration successful! Please check your email to verify your account.',
      });
      router.push('/auth/login');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-background to-muted flex min-h-svh flex-col items-center justify-center p-4 md:p-8">
      <AuthRedirector />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md px-4 py-8 flex flex-col items-center gap-8"
      >
        <Link
          href="/"
          className="flex items-center gap-3 self-center transition-transform hover:scale-105"
          legacyBehavior>
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md shadow-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span className="font-semibold text-xl tracking-tight">Hijraah</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="w-full"
        >
          <Card className="border-border/30 shadow-lg">
            <CardHeader className="space-y-2 text-center pb-6">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your details below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        placeholder="name@example.com"
                        className="pl-10"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        disabled={isLoading}
                        {...register('email')}
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
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-10"
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? "password-error" : undefined}
                        disabled={isLoading}
                        {...register('password')}
                      />
                    </div>
                    {errors.password && (
                      <FormError
                        message={errors.password.message}
                        id="password-error"
                      />
                    )}

                    {/* Password strength indicator */}
                    {password && (
                      <PasswordStrengthMeter
                        password={password}
                        className="mt-3"
                      />
                    )}

                    {/* Password requirements */}
                    {password && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                        {requirements.map(({ id, label, isValid }) => (
                          <div
                            key={id}
                            className="flex items-center gap-2 text-xs"
                          >
                            {isValid ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                            <span className={isValid ? "text-emerald-500" : "text-muted-foreground"}>
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        className="pl-10"
                        aria-invalid={!!errors.confirmPassword}
                        aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                        disabled={isLoading}
                        {...register('confirmPassword')}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <FormError
                        message={errors.confirmPassword.message}
                        id="confirm-password-error"
                      />
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-medium mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <UserPlus className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t bg-muted/30 p-4">
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary font-medium hover:underline underline-offset-4">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>

        <p className="text-muted-foreground text-center text-xs max-w-xs">
          By clicking Create Account, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline underline-offset-4">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline underline-offset-4">
            Privacy Policy
          </Link>.
        </p>
      </motion.div>
    </div>
  );
}