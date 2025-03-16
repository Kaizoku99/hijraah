import React from 'react';
import { OnboardingProvider } from './OnboardingProvider';
import { WelcomeModal } from './WelcomeModal';
import { FeatureTour } from './FeatureTour';
import { FirstTask } from './FirstTask';
import { ProfileSetup } from './ProfileSetup';
import { Resources } from './Resources';
import { OnboardingProgress } from './OnboardingProgress';
import { OnboardingDebug } from './OnboardingDebug';

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

            {/* Onboarding components */}
            <WelcomeModal />
            <ProfileSetup />
            <FeatureTour />
            <FirstTask />
            <Resources />

            {/* Progress indicator */}
            <OnboardingProgress />

            {/* Debug tool */}
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
    children
}: {
    id: string;
    children: React.ReactNode;
}) {
    return (
        <div data-tour={id}>
            {children}
        </div>
    );
}