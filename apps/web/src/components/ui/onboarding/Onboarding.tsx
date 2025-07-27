import React, { Suspense, lazy } from "react";

import {
  ONBOARDING_STEPS_CONFIG,
  OnboardingStepConfig,
} from "@/_shared/constants/onboarding-steps";

import { OnboardingDebug } from "./OnboardingDebug";
import { OnboardingProgress } from "./OnboardingProgress";
import { OnboardingProvider, useOnboarding } from "./OnboardingProvider";


// Lazy load step components
const WelcomeModal = lazy(() =>
  import("./WelcomeModal").then((module) => ({ default: module.WelcomeModal }))
);
const ProfileSetup = lazy(() =>
  import("./ProfileSetup").then((module) => ({ default: module.ProfileSetup }))
);
const FeatureTour = lazy(() =>
  import("./FeatureTour").then((module) => ({ default: module.FeatureTour }))
);
const FirstTask = lazy(() =>
  import("./FirstTask").then((module) => ({ default: module.FirstTask }))
);
const Resources = lazy(() =>
  import("./Resources").then((module) => ({ default: module.Resources }))
);

// Map step IDs to components
const componentMap: Record<string, React.LazyExoticComponent<React.FC<any>>> = {
  welcome: WelcomeModal,
  "profile-setup": ProfileSetup,
  "feature-tour": FeatureTour,
  "first-task": FirstTask,
  resources: Resources,
};

/**
 * Renders the active onboarding step component.
 */
const ActiveOnboardingStep: React.FC = () => {
  const { onboarding, isLoading } = useOnboarding();

  // Log the state received
  console.log("[ActiveOnboardingStep] Rendering. State:", {
    isLoading: isLoading,
    isCompleted: onboarding.isCompleted,
    hideForSession: onboarding.hideForSession,
    isActive: onboarding.isActive,
    currentStep: onboarding.currentStep,
  });

  // Don't render anything if completed, hidden, or inactive
  if (
    onboarding.isCompleted ||
    onboarding.hideForSession ||
    !onboarding.isActive
  ) {
    console.log("[ActiveOnboardingStep] Conditions met to NOT render.", {
      isCompleted: onboarding.isCompleted,
      hideForSession: onboarding.hideForSession,
      isActive: onboarding.isActive,
    });
    return null;
  }

  const currentStepId = onboarding.currentStep;
  const ActiveComponent = componentMap[currentStepId];

  if (!ActiveComponent) {
    console.warn(
      `[Onboarding] No component mapped for step ID: ${currentStepId}`
    );
    return null; // Or render a fallback/error state
  }

  // Find the config for the current step to pass props if needed (optional for now)
  const currentStepConfig = ONBOARDING_STEPS_CONFIG.find(
    (step) => step.id === currentStepId
  );

  return (
    <Suspense fallback={<div>Loading onboarding step...</div>}>
      {/* Pass relevant config props if components expect them */}
      {/* Example: <ActiveComponent config={currentStepConfig} /> */}
      <ActiveComponent />
    </Suspense>
  );
};

/**
 * Main Onboarding component that orchestrates the entire onboarding experience.
 * This component should be placed high in the component tree, typically in _app.tsx
 * or a layout component, to ensure the onboarding experience is available throughout
 * the application.
 */
export function Onboarding({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      {children}

      {/* Conditionally rendered active step component */}
      <ActiveOnboardingStep />

      {/* Progress indicator - Rendered independently */}
      <OnboardingProgress />

      {/* Debug tool - Rendered independently */}
      <OnboardingDebug />
    </OnboardingProvider>
  );
}

/**
 * Tag component to mark elements as part of the feature tour.
 * Use this component to wrap elements that should be highlighted during the tour.
 */
export function TourTarget({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  // Ensure the data-tour attribute matches the format expected by the tour configuration
  // Example: if config uses `[data-tour="dashboard"]`, id should be `dashboard`.
  return <div data-tour={id}>{children}</div>;
}
