'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Locale } from '@/emails/i18n/translations';

// Form validation schema
const formSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    locale: z.enum(['en', 'es', 'fr', 'ar']).default('en'),
});

type FormValues = z.infer<typeof formSchema>;

interface ResetPasswordFormProps {
    redirectTo?: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export function ResetPasswordForm({
    redirectTo,
    onSuccess,
    onError
}: ResetPasswordFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    // Initialize form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            locale: 'en',
        },
    });

    const onSubmit = async (values: FormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'passwordReset',
                    email: values.email,
                    locale: values.locale,
                    redirectTo,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send password reset email');
            }

            setSuccess(true);
            onSuccess?.();
        } catch (err) {
            const error = err instanceof Error ? err : new Error('An unexpected error occurred');
            setError(error.message);
            onError?.(error);
            console.error('Password reset request failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Reset Your Password</CardTitle>
                <CardDescription>
                    Enter your email address and we&apos;ll send you a link to reset your password.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {success ? (
                    <Alert variant="default" className="mb-4 bg-green-50 text-green-800 border-green-200">
                        <AlertDescription>
                            We&apos;ve sent a password reset link to your email address.
                            Please check your inbox and follow the instructions to reset your password.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="name@example.com"
                                                type="email"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="locale"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Language</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isLoading}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a language" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="es">Spanish (Español)</SelectItem>
                                                <SelectItem value="fr">French (Français)</SelectItem>
                                                <SelectItem value="ar">Arabic (العربية)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </form>
                    </Form>
                )}
            </CardContent>

            <CardFooter className="flex justify-center">
                <Button
                    variant="link"
                    onClick={() => router.push('/login')}
                    className="p-0"
                >
                    Back to login
                </Button>
            </CardFooter>
        </Card>
    );
} 