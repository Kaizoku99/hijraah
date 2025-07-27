import { X, ChevronRight } from "lucide-react";
import React from "react";

import {
  getStepById,
  getStepIndex,
  getTotalSteps,
  getStepByIndex,
} from "@/_shared/constants/onboarding-steps";
import type { OnboardingStepConfig } from "@/_shared/constants/onboarding-steps";
import { Button } from "@/ui/button";
import { Progress } from "@/ui/progress";

import { useOnboarding } from "./OnboardingProvider";

export const OnboardingProgress: React.FC = () => {
  const { onboarding, hideOnboardingForSession, resetOnboarding, nextStep } =
    useOnboarding();

  // Don't show if onboarding is not active or is hidden or completed
  if (
    !onboarding.isActive ||
    onboarding.hideForSession ||
    onboarding.isCompleted
  ) {
    return null;
  }

  const currentStep = getStepById(onboarding.currentStep);
  const currentStepIndex = getStepIndex(onboarding.currentStep);
  const totalSteps = getTotalSteps();

  // Generate the steps array using helper functions
  const allSteps: (OnboardingStepConfig | undefined)[] = Array.from(
    { length: totalSteps },
    (_, i) => getStepByIndex(i)
  );
  // Filter out undefined steps just in case getStepByIndex returns undefined for some index
  const validSteps = allSteps.filter(
    (step): step is OnboardingStepConfig => step !== undefined
  );

  if (!currentStep) return null;

  // Check if we're in a modal step (like profile-setup)
  const isModalStep = onboarding.currentStep === "profile-setup";

  // Adjust positioning based on current step
  const positionClasses = isModalStep
    ? "fixed bottom-4 right-4 z-30" // Position in bottom-right when profile setup is active
    : "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30"; // Default centered position

  return (
    <div
      className={`${positionClasses} bg-card shadow-lg rounded-lg p-4 w-full max-w-md border flex flex-col gap-3`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Your Onboarding Progress</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={hideOnboardingForSession}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <p>{onboarding.progress}% Completed</p>
          <p>
            {currentStepIndex + 1}/{totalSteps}
          </p>
        </div>

        <Progress value={onboarding.progress} className="h-2" />

        <div className="flex flex-wrap gap-2">
          {validSteps.map((step, index) => (
            <div
              key={step.id}
              className={`
                                px-3 py-1 text-xs rounded-full border 
                                ${
                                  index < currentStepIndex
                                    ? "bg-primary/20 border-primary/30 text-primary-foreground"
                                    : index === currentStepIndex
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                }
                            `}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      {/* Feature details for current step */}
      {currentStep.features && currentStep.features.length > 0 && (
        <div className="mt-2 space-y-2">
          <h4 className="text-sm font-medium">{currentStep.title} Features:</h4>
          <ul className="space-y-1">
            {currentStep.features.map((feature) => (
              <li key={feature.id} className="text-xs flex items-start gap-2">
                <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary" />
                <span className="flex-1">{feature.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between mt-2">
        <Button variant="outline" size="sm" onClick={resetOnboarding}>
          Restart
        </Button>
        <Button variant="default" size="sm" onClick={nextStep}>
          Continue
        </Button>
      </div>
    </div>
  );
};
