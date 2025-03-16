import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useOnboarding } from './OnboardingProvider';
import { CheckCircle2 } from 'lucide-react';

export const WelcomeModal: React.FC = () => {
    const { onboarding, nextStep, skipOnboarding } = useOnboarding();

    const isOpen = onboarding.isActive &&
        onboarding.currentStep === 'welcome' &&
        !onboarding.hideForSession &&
        !onboarding.isCompleted;

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
                            Welcome to Hijraah
                        </DialogTitle>
                    </motion.div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <DialogDescription className="text-center pt-2">
                            Your immigration journey made simple
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
                        {/* Features section */}
                        {['feature1', 'feature2', 'feature3', 'feature4'].map((feature, i) => (
                            <div key={feature} className="flex items-start space-x-3">
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                                    className="mt-0.5"
                                >
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                </motion.div>
                                <div>
                                    <h3 className="font-medium">Feature {i + 1}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Description for feature {i + 1}
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