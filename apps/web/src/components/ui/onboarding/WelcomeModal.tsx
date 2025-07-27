import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import React from 'react';

import { getStepById } from '@/_shared/constants/onboarding-steps';
import { Button } from '@/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/ui/dialog';

import { useOnboarding } from './OnboardingProvider';



export const WelcomeModal: React.FC = () => {
    const { onboarding, nextStep, skipOnboarding } = useOnboarding();

    // --- Get Current Step Configuration --- //
    const stepConfig = getStepById('welcome');

    const isOpen = onboarding.isActive &&
        onboarding.currentStep === 'welcome' &&
        !onboarding.hideForSession &&
        !onboarding.isCompleted;

    if (!isOpen || !stepConfig) return null; // Ensure config is loaded

    const features = stepConfig.features || []; // Use features from config

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && skipOnboarding()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <DialogTitle className="text-2xl font-bold text-center">
                            {stepConfig.title} {/* Use title from config */}
                        </DialogTitle>
                    </motion.div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <DialogDescription className="text-center pt-2">
                            {stepConfig.description} {/* Use description from config */}
                        </DialogDescription>
                    </motion.div>
                </DialogHeader>

                <div className="py-6">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="space-y-4"
                    >
                        {/* Features section - Use features from config */}
                        {features.map((feature, i) => (
                            <div key={feature.id} className="flex items-start space-x-3">
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                                    className="mt-0.5"
                                >
                                    {/* Use a generic icon or map based on feature ID if needed */}
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                </motion.div>
                                <div>
                                    <h3 className="font-medium">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={skipOnboarding}
                        className="w-full sm:w-auto"
                    >
                        Skip Tour
                    </Button>
                    <Button
                        onClick={nextStep}
                        className="w-full sm:w-auto"
                    >
                        Get Started
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}; 