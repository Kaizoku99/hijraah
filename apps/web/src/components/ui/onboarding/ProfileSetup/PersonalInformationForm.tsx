import React from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

import {
  FormOption,
  ProfileSetupConfig,
} from "@/_shared/constants/onboarding-steps";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

// Define the part of the schema relevant to this form section
export const personalInfoSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  country: z.string().min(1, { message: "Country of origin is required" }),
});

// Define the full form values schema again for type consistency in the hook form return type
// Consider moving this schema definition to a shared location if reused elsewhere
const fullProfileSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  country: z.string().min(1, { message: "Country of origin is required" }),
  destinationCountry: z
    .string()
    .min(1, { message: "Destination country is required" }),
  visaType: z.string().optional(),
  goals: z.string().optional(),
  preferredLanguage: z.string().default("en"),
});
type ProfileFormValues = z.infer<typeof fullProfileSchema>;

interface PersonalInformationFormProps {
  form: UseFormReturn<ProfileFormValues>;
  countries: FormOption[];
}

export const PersonalInformationForm: React.FC<
  PersonalInformationFormProps
> = ({ form, countries }) => {
  return (
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((option) => (
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
      </div>
    </div>
  );
};
