import { createBrowserClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { toast } from "sonner";

import {
  useOnboardingPersistence,
  OnboardingState as PersistenceState,
} from "@/_core/onboarding/hooks/useOnboardingPersistence";
import {
  OnboardingStepId,
  ONBOARDING_STEPS_ORDER,
  getTotalSteps,
  getStepIndex,
  ONBOARDING_STEPS_CONFIG,
} from "@/_shared/constants/onboarding-steps";

// Extend the persistence state for local UI needs
interface LocalOnboardingState extends PersistenceState {
  // Add any purely local state if needed, e.g., temporary flags
  // isLoading is now handled by the persistence hook
}

interface OnboardingContextType {
  onboarding: LocalOnboardingState;
  isLoading: boolean; // Expose loading state
  user: User | null;
  nextStep: () => void;
  previousStep: () => void;
  skipOnboarding: () => void;
  hideOnboardingForSession: () => void;
  resetOnboarding: () => void;
  completeStep: (stepId: OnboardingStepId) => void; // Renamed param for clarity
  // Expose the config for the current step?
  // currentStepConfig: OnboardingStepConfig | undefined;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [localState, setLocalState] = useState<
    Omit<
      LocalOnboardingState,
      "currentStep" | "progress" | "isCompleted" | "isActive"
    >
  >({ hideForSession: false });
  const [user, setUser] = useState<User | null>(null);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  );

  // Fetch the current user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    // Listen for auth state changes to update user state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("[OnboardingProvider] Auth state changed:", event);
        setUser(session?.user ?? null);
        // Reset local hideForSession if user logs out/in
        if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
          setLocalState((prev) => ({ ...prev, hideForSession: false }));
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  // Use the persistence hook
  const {
    onboardingState: persistentState,
    updateOnboardingState,
    isLoading,
  } = useOnboardingPersistence(user);

  // Combine persistent state with local UI state
  const combinedState: LocalOnboardingState = useMemo(
    () => ({
      ...persistentState,
      hideForSession: localState.hideForSession,
    }),
    [persistentState, localState.hideForSession],
  );

  // --- Actions --- //

  const calculateProgress = (stepIndex: number): number => {
    const totalSteps = getTotalSteps();
    if (totalSteps <= 1) return 100; // Avoid division by zero if only one step
    // Progress should be based on *completed* steps. Reaching step index 1 means 1 step is done.
    // If index is 0, progress is 0. If index is totalSteps - 1, progress is 100 after completion.
    return Math.round((stepIndex / (totalSteps - 1)) * 100);
  };

  const nextStep = useCallback(() => {
    const currentIndex = getStepIndex(combinedState.currentStep);
    const totalSteps = getTotalSteps();

    if (currentIndex < totalSteps - 1) {
      const nextIndex = currentIndex + 1;
      const nextStepId = ONBOARDING_STEPS_ORDER[nextIndex];
      const progress = calculateProgress(nextIndex); // Calculate progress based on the *new* index

      updateOnboardingState({
        currentStep: nextStepId,
        progress: progress,
        isCompleted: false, // Not completed yet, just moved to next step
      });
    } else if (currentIndex === totalSteps - 1) {
      // Already on the last step, moving next means completing
      updateOnboardingState({
        // Optionally move to a dedicated 'completed' state if defined
        // currentStep: 'completed', // If a 'completed' step exists
        progress: 100,
        isCompleted: true,
        isActive: false, // Onboarding is no longer active
      });
      toast.success("Onboarding complete! You're all set.");
    }
  }, [combinedState.currentStep, updateOnboardingState]);

  const previousStep = useCallback(() => {
    const currentIndex = getStepIndex(combinedState.currentStep);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevStepId = ONBOARDING_STEPS_ORDER[prevIndex];
      const progress = calculateProgress(prevIndex); // Recalculate progress

      updateOnboardingState({
        currentStep: prevStepId,
        progress,
        isCompleted: false, // Moving back means not completed
      });
    }
  }, [combinedState.currentStep, updateOnboardingState]);

  const skipOnboarding = useCallback(() => {
    updateOnboardingState({
      // currentStep: 'completed', // Consider if skipping should mark last step or a special state
      progress: 100,
      isCompleted: true,
      isActive: false,
    });
    toast.info("Onboarding skipped.");
  }, [updateOnboardingState]);

  const hideOnboardingForSession = useCallback(() => {
    setLocalState((prev) => ({ ...prev, hideForSession: true }));
    // No need to call updateOnboardingState as this is local session state
  }, []);

  const resetOnboarding = useCallback(() => {
    console.log(
      "[OnboardingProvider] Resetting onboarding. Current state:",
      combinedState,
    );
    const firstStepId = ONBOARDING_STEPS_ORDER[0];
    const newState = {
      currentStep: firstStepId,
      progress: 0,
      isCompleted: false,
      isActive: true,
      hideForSession: false,
    };
    console.log("[OnboardingProvider] New state to apply:", newState);
    updateOnboardingState(newState);
    // Ensure local state is also reset
    setLocalState({ hideForSession: false });
    toast.info("Onboarding restarted.");
  }, [combinedState, updateOnboardingState]);

  const completeStep = useCallback(
    (stepId: OnboardingStepId) => {
      console.log(
        `[OnboardingProvider] completeStep called with stepId: ${stepId}. Current state:`,
        combinedState,
      );

      // This function is primarily for step components to signal completion
      // and trigger moving to the next step.
      if (combinedState.currentStep === stepId && !combinedState.isCompleted) {
        console.log(
          `[OnboardingProvider] Completing step: ${stepId}, moving to next.`,
        );
        // Check if there's a specific action key for this step completion
        const stepConfig = ONBOARDING_STEPS_CONFIG.find((s) => s.id === stepId);
        if (stepConfig?.actionKey) {
          // Call the API to mark step completion (fire and forget for now)
          fetch("/api/onboarding/actions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              actionKey: stepConfig.actionKey,
              isCompleted: true,
            }),
          }).catch((error) => {
            console.error(
              `Failed to mark step ${stepId} action ${stepConfig.actionKey} as completed:`,
              error,
            );
            // Don't block UI flow for this
          });
        }
        nextStep();
      }
    },
    [combinedState.currentStep, combinedState.isCompleted, nextStep],
  );

  return (
    <OnboardingContext.Provider
      value={{
        onboarding: combinedState,
        isLoading,
        user,
        nextStep,
        previousStep,
        skipOnboarding,
        hideOnboardingForSession,
        resetOnboarding,
        completeStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
