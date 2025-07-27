import { createBrowserClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

import {
  OnboardingStepId,
  ONBOARDING_STEPS_CONFIG,
} from "@/_shared/constants/onboarding-steps";
import { useSupabaseBrowser } from "@/lib/supabase/client";

// Interface matching the structure in Supabase table (assuming snake_case)
interface UserOnboardingRecord {
  user_id: string;
  current_step: OnboardingStepId;
  progress: number;
  is_completed: boolean;
  updated_at?: string;
}

// Local state shape (camelCase)
export interface OnboardingState {
  currentStep: OnboardingStepId;
  progress: number;
  isCompleted: boolean;
  isActive: boolean;
  hideForSession: boolean;
}

const defaultOnboardingState: OnboardingState = {
  currentStep: "welcome",
  progress: 0,
  isCompleted: false,
  isActive: false, // Initialize as inactive until user/state is loaded
  hideForSession: false,
};

/**
 * Hook to manage the persistence of onboarding state with Supabase.
 */
export function useOnboardingPersistence(user: User | null) {
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(
    defaultOnboardingState
  );
  const [isLoading, setIsLoading] = useState(true);

  const supabase = useSupabaseBrowser();

  // Fetch initial state
  useEffect(() => {
    if (!user) {
      // If there's no user, reset to default and stop loading
      setOnboardingState(defaultOnboardingState);
      setIsLoading(false);
      return;
    }

    const fetchState = async () => {
      console.log(
        "[OnboardingPersistence] fetchState: START. Setting isLoading=true."
      );
      setIsLoading(true);
      console.log("[OnboardingPersistence] Checking state for user:", user.id);
      try {
        const { data, error, status } = await supabase
          .from("user_onboarding")
          .select("*")
          .eq("user_id", user.id)
          .single<UserOnboardingRecord>();

        if (error && status !== 406) {
          // 406 means no rows found, which is expected for new users
          console.error(
            "[OnboardingPersistence] Error fetching state (raw):",
            error,
            "Error fetching state (JSON):",
            JSON.stringify(error, Object.getOwnPropertyNames(error))
          );
          toast.error("Failed to load onboarding progress.");
          // Keep default state but indicate loading finished
          setOnboardingState((prev) => ({ ...prev, isActive: false }));
        } else if (!data) {
          console.log("[OnboardingPersistence] No record found, initializing.");
          // Initialize for a new user
          const initialState: OnboardingState = {
            ...defaultOnboardingState,
            isActive: true, // Start onboarding for new users
            currentStep: ONBOARDING_STEPS_CONFIG[0].id, // Ensure starting step from config
          };
          setOnboardingState(initialState);
          // Save the initial state to the database
          await supabase.from("user_onboarding").insert({
            user_id: user.id,
            current_step: initialState.currentStep,
            progress: initialState.progress,
            is_completed: initialState.isCompleted,
            updated_at: new Date().toISOString(),
          });
          console.log("[OnboardingPersistence] Initial state saved.");
        } else {
          console.log("[OnboardingPersistence] Existing record found:", data);
          // Load existing state
          setOnboardingState({
            currentStep: data.current_step,
            progress: data.progress,
            isCompleted: data.is_completed,
            // Only set isActive if not completed, allow provider to handle hiding
            isActive: !data.is_completed,
            hideForSession: false, // Reset hideForSession on load
          });
        }
      } catch (err) {
        console.error(
          "[OnboardingPersistence] Unexpected error fetching state (raw):",
          err,
          "Unexpected error fetching state (JSON):",
          JSON.stringify(err, Object.getOwnPropertyNames(err))
        );
        toast.error("An error occurred while loading onboarding progress.");
        setOnboardingState((prev) => ({ ...prev, isActive: false }));
      } finally {
        console.log(
          "[OnboardingPersistence] fetchState: FINALLY. Setting isLoading=false."
        );
        setIsLoading(false);
      }
    };

    fetchState();
  }, [user, supabase]); // Dependency on user and supabase client

  // Update state and persist to Supabase
  const updateOnboardingState = useCallback(
    async (newState: Partial<OnboardingState>) => {
      if (!user) return;

      const updatedLocalState: OnboardingState = {
        ...onboardingState,
        ...newState,
      };
      console.log(
        "[OnboardingPersistence] updateOnboardingState: START. Applying local state:",
        updatedLocalState
      );

      // Update local state immediately
      setOnboardingState(updatedLocalState);

      if (updatedLocalState.isActive) {
        try {
          console.log(
            "[OnboardingPersistence] updateOnboardingState: BEFORE upsert for user:",
            user.id,
            { ...newState }
          );
          const { error } = await supabase.from("user_onboarding").upsert({
            user_id: user.id,
            current_step: updatedLocalState.currentStep,
            progress: updatedLocalState.progress,
            is_completed: updatedLocalState.isCompleted,
            updated_at: new Date().toISOString(),
          });

          if (error) {
            console.error(
              "[OnboardingPersistence] updateOnboardingState: Upsert error:",
              error
            );
            toast.error("Failed to save onboarding progress.");
            // Optionally revert local state or handle error
          } else {
            console.log(
              "[OnboardingPersistence] updateOnboardingState: Upsert SUCCESSFUL."
            );
          }
        } catch (err) {
          console.error(
            "[OnboardingPersistence] updateOnboardingState: Unexpected upsert error:",
            err
          );
          toast.error("An error occurred while saving onboarding progress.");
        }
      } else {
        console.log(
          "[OnboardingPersistence] updateOnboardingState: Onboarding not active, skipping upsert."
        );
      }
    },
    [user, supabase, onboardingState]
  ); // Include onboardingState in dependencies

  return { onboardingState, updateOnboardingState, isLoading };
}
