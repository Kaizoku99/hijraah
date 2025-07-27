import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

import { FormOption, ProfileSetupConfig } from '@/_shared/constants/onboarding-steps';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Textarea } from '@/ui/textarea';

// Define the part of the schema relevant to this form section
export const preferencesSchema = z.object({
    goals: z.string().optional(),
    preferredLanguage: z.string().default('en'),
});

// Define the full form values schema again for type consistency
const fullProfileSchema = z.object({
    fullName: z.string().min(2, { message: 'Full name is required' }),
    country: z.string().min(1, { message: 'Country of origin is required' }),
    destinationCountry: z.string().min(1, { message: 'Destination country is required' }),
    visaType: z.string().optional(),
    goals: z.string().optional(),
    preferredLanguage: z.string().default('en'),
});
type ProfileFormValues = z.infer<typeof fullProfileSchema>;

interface PreferencesFormProps {
    form: UseFormReturn<ProfileFormValues>;
    languages: FormOption[];
}

export const PreferencesForm: React.FC<PreferencesFormProps> = ({ form, languages }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">
                Goals & Preferences
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
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
                                    {languages.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Goals field spans full width potentially */}
                <div className="md:col-span-2">
                    <FormField
                        control={form.control}
                        name="goals"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Immigration Goals (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Briefly describe your main immigration goals (e.g., permanent residency, studying abroad, joining family)..."
                                        className="resize-none"
                                        rows={3}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}; 