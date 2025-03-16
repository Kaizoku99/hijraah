import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useOnboarding } from './OnboardingProvider';
import { createClient } from '@supabase/supabase-js';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { getStepById } from '@/constants/onboardingSteps';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// Define form schema with Zod
const profileSchema = z.object({
    fullName: z.string().min(2, { message: 'Full name is required' }),
    country: z.string().min(1, { message: 'Country of origin is required' }),
    destinationCountry: z.string().min(1, { message: 'Destination country is required' }),
    visaType: z.string().optional(),
    goals: z.string().optional(),
    preferredLanguage: z.string().default('en'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const ProfileSetup: React.FC = () => {
    const { onboarding, completeStep } = useOnboarding();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const isActive = onboarding.isActive &&
        onboarding.currentStep === 'profile-setup' &&
        !onboarding.hideForSession &&
        !onboarding.isCompleted;

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: '',
            country: '',
            destinationCountry: '',
            visaType: '',
            goals: '',
            preferredLanguage: 'en',
        },
    });

    if (!isActive) return null;

    // Get the step details from our constants
    const profileStep = getStepById('profile-setup');

    const onSubmit = async (data: ProfileFormValues) => {
        setIsSubmitting(true);
        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                toast.error('User not authenticated');
                setIsSubmitting(false);
                return;
            }

            // Update user profile in Supabase
            const { error } = await supabase
                .from('user_profiles')
                .upsert({
                    user_id: user.id,
                    full_name: data.fullName,
                    country_of_origin: data.country,
                    destination_country: data.destinationCountry,
                    visa_type: data.visaType,
                    immigration_goals: data.goals,
                    preferred_language: data.preferredLanguage,
                    updated_at: new Date().toISOString()
                });

            if (error) {
                console.error('Error saving profile:', error);
                toast.error('Failed to save profile information');
                setIsSubmitting(false);
                return;
            }

            // Mark action as completed
            await fetch('/api/onboarding/actions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    actionKey: 'profile_setup_completed',
                    isCompleted: true,
                }),
            });

            setIsCompleted(true);
            toast.success('Profile information saved successfully!');

            // Move to next step after a delay
            setTimeout(() => {
                completeStep('profile-setup');
            }, 1500);
        } catch (error) {
            console.error('Error in profile setup:', error);
            toast.error('An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-card border rounded-xl shadow-lg max-w-2xl w-full"
            >
                <CardHeader>
                    <CardTitle className="text-2xl">{profileStep?.title || 'Profile Setup'}</CardTitle>
                    <CardDescription className="text-base">
                        {profileStep?.description || 'Describe your immigration goals and preferences'}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-foreground">
                                    Personal Information
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your full name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country of Origin</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select country" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="us">United States</SelectItem>
                                                        <SelectItem value="ca">Canada</SelectItem>
                                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                                        <SelectItem value="in">India</SelectItem>
                                                        <SelectItem value="ng">Nigeria</SelectItem>
                                                        <SelectItem value="cn">China</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <h3 className="text-sm font-medium text-foreground">
                                    Immigration Status
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="destinationCountry"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Destination Country</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select destination" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="us">United States</SelectItem>
                                                        <SelectItem value="ca">Canada</SelectItem>
                                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                                        <SelectItem value="au">Australia</SelectItem>
                                                        <SelectItem value="nz">New Zealand</SelectItem>
                                                        <SelectItem value="de">Germany</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="visaType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Visa Type (if applicable)</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select visa type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="work">Work Visa</SelectItem>
                                                        <SelectItem value="student">Student Visa</SelectItem>
                                                        <SelectItem value="family">Family Visa</SelectItem>
                                                        <SelectItem value="tourist">Tourist Visa</SelectItem>
                                                        <SelectItem value="business">Business Visa</SelectItem>
                                                        <SelectItem value="permanent">Permanent Residency</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <h3 className="text-sm font-medium text-foreground mt-2">
                                    Preferences
                                </h3>
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="goals"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Immigration Goals</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Briefly describe your immigration goals..."
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <p className="text-sm text-muted-foreground">
                                                    This helps us customize your experience.
                                                </p>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="preferredLanguage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Preferred Language</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select language" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="en">English</SelectItem>
                                                        <SelectItem value="es">Spanish</SelectItem>
                                                        <SelectItem value="fr">French</SelectItem>
                                                        <SelectItem value="ar">Arabic</SelectItem>
                                                        <SelectItem value="zh">Chinese</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="text-xs text-muted-foreground">
                                Privacy Policy
                            </div>

                            <CardFooter className="flex justify-between px-0 pt-4">
                                <Button
                                    variant="ghost"
                                    type="button"
                                    onClick={() => completeStep('profile-setup')}
                                >
                                    Skip
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || isCompleted}
                                    className="gap-2"
                                >
                                    {isSubmitting ? (
                                        'Saving...'
                                    ) : isCompleted ? (
                                        <>
                                            <CheckCircle2 className="h-4 w-4" />
                                            Completed
                                        </>
                                    ) : (
                                        'Continue'
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </motion.div>
        </div>
    );
}; 