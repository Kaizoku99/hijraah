'use client';

import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronLeft, ChevronRight, CircleDashed, Loader2 } from 'lucide-react';

export interface Step {
    id: string;
    title: string;
    description?: string;
    isOptional?: boolean;
}

export interface MultiStepFormProps {
    steps: Step[];
    currentStepIndex: number;
    onStepChange: (stepIndex: number) => void;
    onComplete?: () => void;
    isCompleting?: boolean;
    isLoading?: boolean;
    children: React.ReactNode;
    className?: string;
    showStepIndicator?: boolean;
    allowSkipToStep?: boolean;
    completedSteps?: string[];
}

export function MultiStepForm({
    steps,
    currentStepIndex,
    onStepChange,
    onComplete,
    isCompleting = false,
    isLoading = false,
    children,
    className,
    showStepIndicator = true,
    allowSkipToStep = false,
    completedSteps = [],
}: MultiStepFormProps) {
    const t = useTranslations('forms');
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

    const currentStep = steps[currentStepIndex];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    const handleNext = useCallback(() => {
        if (!isLastStep) {
            setDirection('forward');
            onStepChange(currentStepIndex + 1);
        }
    }, [currentStepIndex, isLastStep, onStepChange]);

    const handleBack = useCallback(() => {
        if (!isFirstStep) {
            setDirection('backward');
            onStepChange(currentStepIndex - 1);
        }
    }, [currentStepIndex, isFirstStep, onStepChange]);

    const handleStepClick = useCallback((index: number) => {
        if (allowSkipToStep) {
            setDirection(index > currentStepIndex ? 'forward' : 'backward');
            onStepChange(index);
        }
    }, [allowSkipToStep, currentStepIndex, onStepChange]);

    const progressPercentage = useMemo(() => {
        return ((currentStepIndex + 1) / steps.length) * 100;
    }, [currentStepIndex, steps.length]);

    const getStepStatus = useCallback((step: Step, index: number) => {
        if (completedSteps.includes(step.id)) return 'completed';
        if (index === currentStepIndex) return 'current';
        if (index < currentStepIndex) return 'previous';
        return 'upcoming';
    }, [completedSteps, currentStepIndex]);

    return (
        <Card className={cn('w-full', className)}>
            {showStepIndicator && (
                <CardHeader className="pb-0">
                    <div className="mb-2">
                        <div className="flex justify-between mb-1 text-sm font-medium">
                            <span>
                                {t('step')} {currentStepIndex + 1} {t('of')} {steps.length}
                            </span>
                            <span>{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <div
                                className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        {steps.map((step, index) => {
                            const status = getStepStatus(step, index);
                            const isClickable = allowSkipToStep && (status === 'completed' || status === 'previous');

                            return (
                                <div
                                    key={step.id}
                                    className={cn(
                                        'flex flex-col items-center space-y-2',
                                        index < steps.length - 1 && 'relative',
                                        isClickable && 'cursor-pointer'
                                    )}
                                    onClick={isClickable ? () => handleStepClick(index) : undefined}
                                >
                                    {index < steps.length - 1 && (
                                        <div
                                            className={cn(
                                                'absolute top-3 left-7 w-full h-px bg-gray-200',
                                                status === 'completed' && 'bg-primary'
                                            )}
                                        />
                                    )}

                                    <div
                                        className={cn(
                                            'w-6 h-6 flex items-center justify-center rounded-full z-10 border transition-colors',
                                            status === 'completed' && 'bg-primary text-primary-foreground border-primary',
                                            status === 'current' && 'border-primary text-primary',
                                            status === 'upcoming' && 'border-gray-300 text-gray-400',
                                            status === 'previous' && 'border-primary/50 text-primary/70'
                                        )}
                                    >
                                        {status === 'completed' ? (
                                            <CheckCircle2 className="h-4 w-4" />
                                        ) : status === 'current' ? (
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                        ) : (
                                            <CircleDashed className="h-4 w-4" />
                                        )}
                                    </div>

                                    <div
                                        className={cn(
                                            'text-xs text-center max-w-[70px] truncate',
                                            status === 'completed' && 'text-primary font-medium',
                                            status === 'current' && 'text-primary font-medium',
                                            status === 'upcoming' && 'text-gray-400',
                                            status === 'previous' && 'text-gray-500'
                                        )}
                                    >
                                        {step.title}
                                        {step.isOptional && (
                                            <span className="block text-[10px] opacity-70">
                                                {t('optional')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardHeader>
            )}

            <CardContent className="mt-4">
                <CardTitle className="text-xl font-semibold mb-4">
                    {currentStep.title}
                </CardTitle>

                <div
                    className={cn(
                        'transition-opacity duration-300',
                        isLoading && 'opacity-50 pointer-events-none'
                    )}
                >
                    {children}
                </div>

                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex justify-between pt-2">
                <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={isFirstStep || isLoading || isCompleting}
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    {t('back')}
                </Button>

                <div className="flex gap-2">
                    {currentStep.isOptional && !isLastStep && (
                        <Button
                            variant="ghost"
                            onClick={handleNext}
                            disabled={isLoading || isCompleting}
                        >
                            {t('skip')}
                        </Button>
                    )}

                    {isLastStep ? (
                        <Button
                            onClick={onComplete}
                            disabled={isLoading || isCompleting}
                            className="min-w-[100px]"
                        >
                            {isCompleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t('submitting')}
                                </>
                            ) : (
                                t('complete')
                            )}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            disabled={isLoading || isCompleting}
                        >
                            {t('next')}
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
} 