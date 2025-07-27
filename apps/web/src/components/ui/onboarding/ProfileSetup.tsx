import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserClient } from "@supabase/ssr"; // Keep for user fetching
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  ONBOARDING_STEPS_CONFIG,
  getStepById,
  OnboardingStepId,
} from "@/_shared/constants/onboarding-steps";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Form } from "@/ui/form";

import { useOnboarding } from "./OnboardingProvider";
import { ImmigrationStatusForm } from "./ProfileSetup/ImmigrationStatusForm";
import { PersonalInformationForm } from "./ProfileSetup/PersonalInformationForm";
import { PreferencesForm } from "./ProfileSetup/PreferencesForm";

// Define the full Zod schema for validation
const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  country: z
    .string()
    .min(1, { message: "Please select your country of origin." }),
  destinationCountry: z
    .string()
    .min(1, { message: "Please select your destination country." }),
  visaType: z.string().optional(),
  goals: z
    .string()
    .max(500, { message: "Goals description must be 500 characters or less." })
    .optional(),
  preferredLanguage: z.string().default("en"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const ProfileSetup: React.FC = () => {
  const { onboarding, completeStep, user } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompletedUI, setIsCompletedUI] = useState(false); // Separate UI state for completion animation

  // --- Get Current Step Configuration --- //
  const stepConfig = getStepById("profile-setup");
  const profileConfig = stepConfig?.profileSetupConfig;

  // Initialize Supabase client for user fetching within the component
  // Alternatively, pass the user object via context if already available
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      country: "",
      destinationCountry: "",
      visaType: "",
      goals: "",
      preferredLanguage:
        profileConfig?.languages.find((lang) => lang.value === "en")?.value ||
        "en", // Default to 'en'
    },
  });

  // Determine if this step is active
  const isActive =
    onboarding.isActive &&
    onboarding.currentStep === "profile-setup" &&
    !onboarding.hideForSession &&
    !onboarding.isCompleted;

  if (!isActive || !stepConfig || !profileConfig) return null; // Don't render if not active or config missing

  const onSubmit = async (data: ProfileFormValues) => {
    console.log(
      "[ProfileSetup] onSubmit: Triggered. Current context user state:",
      user,
    );

    if (!user) {
      toast.error("User not authenticated. Please log in again.");
      console.log(
        "[ProfileSetup] onSubmit: Failing because user from context is null/undefined.",
      );
      return;
    }
    if (!profileConfig.actionKey) {
      toast.error("Configuration error: Missing action key for profile setup.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Update user profile in Supabase
      const { error } = await supabase
        .from("profiles") // Corrected table name
        .upsert(
          {
            id: user.id,
            first_name: data.fullName.split(" ")[0],
            last_name: data.fullName.split(" ").slice(1).join(" "),
            country_of_residence: data.country,
            country_of_interest: data.destinationCountry,
            visa_type: data.visaType,
            immigration_goals: data.goals,
            language: data.preferredLanguage,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }, // Use 'id' for conflict resolution
        );

      if (error) {
        console.error("Error saving profile:", error);
        toast.error(`Failed to save profile: ${error.message}`);
        setIsSubmitting(false);
        return;
      }

      // Mark action as completed via API (Fire and Forget)
      fetch("/api/onboarding/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actionKey: profileConfig.actionKey,
          isCompleted: true,
        }),
      }).catch((err) => {
        console.error("Failed to report profile setup completion:", err);
        // Don't block UI for this, but log it.
      });

      setIsCompletedUI(true); // Trigger UI completion state
      toast.success("Profile information saved!");

      // Move to next step after a delay
      setTimeout(() => {
        completeStep(stepConfig.id as OnboardingStepId);
      }, 1500);
    } catch (error: any) {
      console.error("Error in profile setup submission:", error);
      toast.error(
        `An unexpected error occurred: ${error.message || "Unknown error"}`,
      );
    } finally {
      // Ensure isSubmitting is reset even if completion timeout hasn't finished
      // Wait slightly longer than the success animation might take
      setTimeout(() => setIsSubmitting(false), 1600);
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4">
          <motion.div
            key="profile-setup-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-card border rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col"
          >
            <CardHeader>
              <CardTitle className="text-2xl">{stepConfig.title}</CardTitle>
              <CardDescription className="text-base">
                {stepConfig.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow overflow-y-auto pr-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Render Sub-forms */}
                  <PersonalInformationForm
                    form={form}
                    countries={profileConfig.countries}
                  />
                  <ImmigrationStatusForm
                    form={form}
                    destinations={profileConfig.destinations}
                  />
                  <PreferencesForm
                    form={form}
                    languages={profileConfig.languages}
                  />

                  {/* Submit button moved to CardFooter */}
                </form>
              </Form>
            </CardContent>

            <CardFooter className="flex justify-end border-t pt-6">
              <AnimatePresence mode="wait">
                {isCompletedUI ? (
                  <motion.div
                    key="completed-indicator"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-primary font-medium"
                  >
                    <CheckCircle2 size={18} /> Saved!
                  </motion.div>
                ) : (
                  <Button
                    key="submit-button"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={form.handleSubmit(onSubmit)} // Trigger submit via button click
                    form="profile-setup-form" // Associate button with form if needed, though onClick handles it
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Save and Continue
                  </Button>
                )}
              </AnimatePresence>
            </CardFooter>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
