import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

import { FormOption, ProfileSetupConfig } from '@/_shared/constants/onboarding-steps';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';

// Define the part of the schema relevant to this form section
export const immigrationStatusSchema = z.object({
    destinationCountry: z.string().min(1, { message: 'Destination country is required' }),
    visaType: z.string().optional(),
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

interface ImmigrationStatusFormProps {
    form: UseFormReturn<ProfileFormValues>;
    destinations: FormOption[];
}

export const ImmigrationStatusForm: React.FC<ImmigrationStatusFormProps> = ({ form, destinations }) => {
    return (
        <div className="space-y-4">
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
                                    {destinations.map(option => (
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
                <FormField
                    control={form.control}
                    name="visaType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current/Target Visa Type (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Student, Work Permit, Tourist" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}; 