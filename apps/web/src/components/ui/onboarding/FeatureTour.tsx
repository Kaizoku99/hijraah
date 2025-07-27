import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    arrow,
    Placement,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ONBOARDING_STEPS_CONFIG, TourStop } from '@/_shared/constants/onboarding-steps';
import { Button } from '@/ui/button';

import { useOnboarding } from './OnboardingProvider';



// Helper to get current step config
const getCurrentStepConfig = () => {
    return ONBOARDING_STEPS_CONFIG.find(step => step.id === 'feature-tour');
}

export const FeatureTour: React.FC = () => {
    const { onboarding, completeStep, skipOnboarding } = useOnboarding();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
    const arrowRef = useRef<SVGSVGElement>(null);

    // --- Get Tour Configuration --- //
    const stepConfig = getCurrentStepConfig();
    const tourStops = stepConfig?.tourStops;

    const isActive = onboarding.isActive &&
        onboarding.currentStep === 'feature-tour' &&
        !onboarding.hideForSession &&
        !onboarding.isCompleted;

    const currentTourStop = tourStops ? tourStops[currentStepIndex] : undefined;

    // --- Floating UI Setup --- //
    const { refs, floatingStyles, placement, middlewareData } = useFloating<HTMLElement>({
        placement: currentTourStop?.placement || 'bottom',
        open: isActive && !!targetElement,
        middleware: [
            offset(10), // Gap between target and tooltip
            flip(),
            shift({ padding: 8 }),
            arrow({ element: arrowRef }),
        ],
        whileElementsMounted: (reference, floating, update) =>
            autoUpdate(reference, floating, update, {
                ancestorScroll: true,
                ancestorResize: true,
                elementResize: true,
            }),
    });

    // --- Target Element Logic --- //
    useEffect(() => {
        if (!isActive || !currentTourStop) {
            setTargetElement(null);
            return;
        }

        const element = document.querySelector(currentTourStop.target) as HTMLElement | null;
        setTargetElement(element);

        if (element) {
            // Temporarily add highlight - consider a more robust solution if needed
            element.style.outline = '2px solid var(--primary)';
            element.style.outlineOffset = '2px';
            element.style.borderRadius = '4px'; // Optional visual enhancement
            element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }

        // Cleanup highlight
        return () => {
            if (element) {
                element.style.outline = '';
                element.style.outlineOffset = '';
                element.style.borderRadius = '';
            }
            // Clear highlights from previous steps
            tourStops?.forEach(stop => {
                const el = document.querySelector(stop.target) as HTMLElement | null;
                if (el) {
                    el.style.outline = '';
                    el.style.outlineOffset = '';
                    el.style.borderRadius = '';
                }
            });
        };
    }, [isActive, currentTourStop, tourStops]);

    // Update Floating UI reference when target changes
    useEffect(() => {
        refs.setReference(targetElement);
    }, [targetElement, refs]);

    // --- Actions --- //
    const handleNext = () => {
        if (tourStops && currentStepIndex < tourStops.length - 1) {
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
        skipOnboarding(); // Use the skip function from context
    };

    // --- Render Logic --- //
    if (!isActive || !currentTourStop || !targetElement) return null;

    // Arrow positioning
    const { x: arrowX, y: arrowY } = middlewareData.arrow || {};
    const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
    }[placement.split('-')[0]] || 'bottom';


    return createPortal(
        <AnimatePresence>
            {isActive && (
                <motion.div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="bg-card border shadow-lg rounded-lg p-4 w-[320px] z-[9999]"
                >
                    {/* Arrow */}
                    <svg
                        ref={arrowRef}
                        width="16"
                        height="8"
                        viewBox="0 0 16 8"
                        style={{
                            position: 'absolute',
                            left: arrowX != null ? `${arrowX}px` : '',
                            top: arrowY != null ? `${arrowY}px` : '',
                            [staticSide]: '-8px',
                        }}
                        className="fill-current text-card block"
                    >
                        <path d="M0 8 L8 0 L16 8 Z" />
                    </svg>

                    {/* Close Button */}
                    <div className="absolute right-2 top-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={handleSkip}
                            aria-label="Skip Tour"
                        >
                            <X size={16} />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="mb-4 pr-6"> {/* Add padding-right to avoid overlap with close button */}
                        <h3 className="font-semibold text-lg">
                            {currentTourStop.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            {currentTourStop.content}
                        </p>
                    </div>

                    {/* Footer Controls */}
                    <div className="flex items-center justify-between mt-4">
                        {/* Progress Dots */}
                        <div className="flex items-center space-x-2">
                            {tourStops && Array.from({ length: tourStops.length }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${i === currentStepIndex ? 'bg-primary' : 'bg-muted'
                                        }`}
                                />
                            ))}
                        </div>
                        {/* Navigation Buttons */}
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
                                {tourStops && currentStepIndex === tourStops.length - 1
                                    ? "Finish"
                                    : "Next"}
                                {tourStops && currentStepIndex < tourStops.length - 1 && (
                                    <ChevronRight size={16} className="ml-1" />
                                )}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body // Render in the body
    );
}; 