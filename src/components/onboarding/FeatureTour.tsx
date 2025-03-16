import React, { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useOnboarding } from './OnboardingProvider';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Define tour steps for different features
const TOUR_STEPS = [
    {
        target: '[data-tour="dashboard"]',
        placement: 'bottom',
        title: 'dashboard.title',
        content: 'dashboard.content',
    },
    {
        target: '[data-tour="profile"]',
        placement: 'right',
        title: 'profile.title',
        content: 'profile.content',
    },
    {
        target: '[data-tour="documents"]',
        placement: 'left',
        title: 'documents.title',
        content: 'documents.content',
    },
    {
        target: '[data-tour="applications"]',
        placement: 'top',
        title: 'applications.title',
        content: 'applications.content',
    },
    {
        target: '[data-tour="help"]',
        placement: 'bottom',
        title: 'help.title',
        content: 'help.content',
    },
];

type Placement = 'top' | 'right' | 'bottom' | 'left';

const getTooltipPosition = (
    targetElement: HTMLElement | null,
    tooltipElement: HTMLElement | null,
    placement: Placement
): { top: number; left: number } => {
    if (!targetElement || !tooltipElement) {
        return { top: 0, left: 0 };
    }

    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const gap = 12; // Gap between target and tooltip

    switch (placement) {
        case 'top':
            return {
                left: targetRect.left + targetRect.width / 2 - tooltipRect.width / 2,
                top: targetRect.top - tooltipRect.height - gap,
            };
        case 'right':
            return {
                left: targetRect.right + gap,
                top: targetRect.top + targetRect.height / 2 - tooltipRect.height / 2,
            };
        case 'bottom':
            return {
                left: targetRect.left + targetRect.width / 2 - tooltipRect.width / 2,
                top: targetRect.bottom + gap,
            };
        case 'left':
            return {
                left: targetRect.left - tooltipRect.width - gap,
                top: targetRect.top + targetRect.height / 2 - tooltipRect.height / 2,
            };
        default:
            return { top: 0, left: 0 };
    }
};

export const FeatureTour: React.FC = () => {
    const { onboarding, nextStep, previousStep, skipOnboarding, completeStep } = useOnboarding();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);

    const isActive = onboarding.isActive &&
        onboarding.currentStep === 'feature-tour' &&
        !onboarding.hideForSession &&
        !onboarding.isCompleted;

    const currentTourStep = TOUR_STEPS[currentStepIndex];

    useEffect(() => {
        if (!isActive || !currentTourStep) return;

        const updatePosition = () => {
            const targetElement = document.querySelector(currentTourStep.target) as HTMLElement;
            if (targetElement && tooltipRef.current) {
                const newPosition = getTooltipPosition(
                    targetElement,
                    tooltipRef.current,
                    currentTourStep.placement as Placement
                );
                setPosition(newPosition);

                // Highlight the target element
                targetElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
            }
        };

        // Initial position
        updatePosition();

        // Update position on resize and scroll
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);

        // Clean up
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);

            // Remove highlight from all elements
            document.querySelectorAll('[data-tour]').forEach((element) => {
                element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
            });
        };
    }, [isActive, currentStepIndex, currentTourStep]);

    const handleNext = () => {
        if (currentStepIndex < TOUR_STEPS.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            completeStep('feature-tour');
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    const handleSkip = () => {
        skipOnboarding();
    };

    if (!isActive) return null;

    return createPortal(
        <AnimatePresence>
            {isActive && (
                <motion.div
                    ref={tooltipRef}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: 'fixed',
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        zIndex: 9999,
                    }}
                    className="bg-card border shadow-lg rounded-lg p-4 w-[320px]"
                >
                    <div className="absolute right-2 top-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={handleSkip}
                        >
                            <X size={16} />
                        </Button>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold text-lg">
                            {currentTourStep.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            {currentTourStep.content}
                        </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                            {Array.from({ length: TOUR_STEPS.length }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${i === currentStepIndex ? 'bg-primary' : 'bg-muted'
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handlePrevious}
                                disabled={currentStepIndex === 0}
                                className="h-8"
                            >
                                <ChevronLeft size={16} className="mr-1" />
                                Previous
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={handleNext}
                                className="h-8"
                            >
                                {currentStepIndex === TOUR_STEPS.length - 1
                                    ? "Finish"
                                    : "Next"}
                                {currentStepIndex < TOUR_STEPS.length - 1 && (
                                    <ChevronRight size={16} className="ml-1" />
                                )}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}; 