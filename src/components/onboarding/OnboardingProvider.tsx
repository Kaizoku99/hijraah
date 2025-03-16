import React, { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { User } from '@supabase/supabase-js';

type OnboardingStep =
    | 'welcome'
    | 'profile-setup'
    | 'feature-tour'
    | 'first-task'
    | 'resources'
    | 'completed';

interface OnboardingState {
    currentStep: OnboardingStep;
    progress: number;
    isCompleted: boolean;
    isActive: boolean;
    hideForSession: boolean;
}

interface OnboardingContextType {
    onboarding: OnboardingState;
    nextStep: () => void;
    previousStep: () => void;
    skipOnboarding: () => void;
    hideOnboardingForSession: () => void;
    resetOnboarding: () => void;
    completeStep: (step: OnboardingStep) => void;
}

const defaultOnboardingState: OnboardingState = {
    currentStep: 'welcome',
    progress: 0,
    isCompleted: false,
    isActive: false,
    hideForSession: false,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
};

const STEPS_ORDER: OnboardingStep[] = [
    'welcome',
    'profile-setup',
    'feature-tour',
    'first-task',
    'resources',
    'completed',
];

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [onboarding, setOnboarding] = useState<OnboardingState>(defaultOnboardingState);
    const [user, setUser] = useState<User | null>(null);
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    // Listen for auth state changes
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth state changed:', event);
                const currentUser = session?.user;
                setUser(currentUser || null);

                // When a user signs in
                if (event === 'SIGNED_IN') {
                    console.log('User signed in:', currentUser?.id);
                    // Will initialize onboarding in the user effect
                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [supabase]);

    // Fetch the current user
    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        getUser();
    }, [supabase]);

    useEffect(() => {
        // Skip if no user or onboarding already initialized
        if (!user) return;

        const fetchOnboardingState = async () => {
            // Add debug logging
            console.log('Checking onboarding state for user:', user.id);

            const { data, error } = await supabase
                .from('user_onboarding')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (error || !data) {
                console.log('No onboarding record found - initializing for first-time user');
                // Initialize new onboarding state for the user
                const newState = {
                    ...defaultOnboardingState,
                    isActive: true,
                };
                setOnboarding(newState);

                // Save initial state to database
                await supabase.from('user_onboarding').insert({
                    user_id: user.id,
                    current_step: newState.currentStep,
                    progress: newState.progress,
                    is_completed: newState.isCompleted,
                });
            } else {
                console.log('Existing onboarding record found:', data);
                // Load existing onboarding state
                setOnboarding({
                    currentStep: data.current_step,
                    progress: data.progress,
                    isCompleted: data.is_completed,
                    isActive: true,
                    hideForSession: false,
                });
            }
        };

        fetchOnboardingState();
    }, [user, supabase]);

    const updateOnboardingState = async (newState: Partial<OnboardingState>) => {
        if (!user) return;

        const updatedState = { ...onboarding, ...newState };
        setOnboarding(updatedState);

        // Only update database if onboarding is active and not temporarily hidden
        if (updatedState.isActive && !updatedState.hideForSession) {
            await supabase.from('user_onboarding').upsert({
                user_id: user.id,
                current_step: updatedState.currentStep,
                progress: updatedState.progress,
                is_completed: updatedState.isCompleted,
                updated_at: new Date().toISOString(),
            });
        }
    };

    const nextStep = () => {
        const currentIndex = STEPS_ORDER.indexOf(onboarding.currentStep);
        if (currentIndex < STEPS_ORDER.length - 1) {
            const nextStep = STEPS_ORDER[currentIndex + 1];
            const isCompleted = nextStep === 'completed';
            const progress = ((currentIndex + 1) / (STEPS_ORDER.length - 1)) * 100;

            updateOnboardingState({
                currentStep: nextStep,
                progress,
                isCompleted,
            });
        }
    };

    const previousStep = () => {
        const currentIndex = STEPS_ORDER.indexOf(onboarding.currentStep);
        if (currentIndex > 0) {
            const prevStep = STEPS_ORDER[currentIndex - 1];
            const progress = ((currentIndex - 1) / (STEPS_ORDER.length - 1)) * 100;

            updateOnboardingState({
                currentStep: prevStep,
                progress,
                isCompleted: false,
            });
        }
    };

    const skipOnboarding = () => {
        updateOnboardingState({
            currentStep: 'completed',
            progress: 100,
            isCompleted: true,
        });
    };

    const hideOnboardingForSession = () => {
        setOnboarding({
            ...onboarding,
            hideForSession: true,
        });
    };

    const resetOnboarding = () => {
        updateOnboardingState({
            ...defaultOnboardingState,
            isActive: true,
            hideForSession: false,
        });
    };

    const completeStep = (step: OnboardingStep) => {
        if (onboarding.currentStep === step) {
            nextStep();
        }
    };

    return (
        <OnboardingContext.Provider
            value={{
                onboarding,
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