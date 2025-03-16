import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOnboarding } from './OnboardingProvider';
import { Upload, Calendar, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskProps {
    title: string;
    description: string;
    cta: string;
    icon: React.ReactNode;
    onComplete: () => void;
}

const Task: React.FC<TaskProps> = ({ title, description, cta, icon, onComplete }) => {
    const [isCompleted, setIsCompleted] = useState(false);

    const handleClick = () => {
        // Simulate task completion
        setTimeout(() => {
            setIsCompleted(true);
            // Wait a bit before triggering the onComplete callback
            setTimeout(onComplete, 1500);
        }, 1000);
    };

    return (
        <Card className="border border-muted relative overflow-hidden">
            <CardHeader>
                <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {icon}
                    </div>
                    <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription className="mt-1">{description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="flex justify-end">
                <AnimatePresence mode="wait">
                    {!isCompleted ? (
                        <Button
                            key="cta-button"
                            onClick={handleClick}
                            className="gap-2"
                        >
                            {cta} <ArrowRight size={16} />
                        </Button>
                    ) : (
                        <motion.div
                            key="completed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-primary font-medium"
                        >
                            <CheckCircle2 size={18} /> Completed
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardFooter>
            {isCompleted && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-primary/5 pointer-events-none"
                />
            )}
        </Card>
    );
};

export const FirstTask: React.FC = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const [taskCompleted, setTaskCompleted] = useState(false);
    const { onboarding, completeStep } = useOnboarding();

    const isActive = onboarding.isActive &&
        onboarding.currentStep === 'first-task' &&
        !onboarding.hideForSession &&
        !onboarding.isCompleted;

    if (!isActive) return null;

    const handleTaskComplete = async () => {
        setTaskCompleted(true);

        // Mark the action as completed via API
        try {
            await fetch('/api/onboarding/actions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    actionKey: `first_task_${activeTab}`,
                    isCompleted: true,
                }),
            });
        } catch (error) {
            console.error('Failed to mark action as completed:', error);
        }

        // After a delay, move to the next step
        setTimeout(() => completeStep('first-task'), 2000);
    };

    const TaskCards = {
        upload: (
            <Task
                title="Upload Your First Document"
                description="Start by uploading an important immigration document to keep it secure and accessible."
                cta="Upload Document"
                icon={<Upload className="h-5 w-5 text-primary" />}
                onComplete={handleTaskComplete}
            />
        ),
        consult: (
            <Task
                title="Schedule a Consultation"
                description="Book a session with an immigration expert to discuss your specific situation."
                cta="Book Consultation"
                icon={<Calendar className="h-5 w-5 text-primary" />}
                onComplete={handleTaskComplete}
            />
        ),
        application: (
            <Task
                title="Start an Application"
                description="Begin your first immigration application with our guided process."
                cta="Start Application"
                icon={<FileText className="h-5 w-5 text-primary" />}
                onComplete={handleTaskComplete}
            />
        ),
    };

    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-card border rounded-xl shadow-lg max-w-2xl w-full"
            >
                <CardHeader>
                    <CardTitle className="text-2xl">Complete Your First Task</CardTitle>
                    <CardDescription className="text-base">Choose one task to get started with your immigration journey</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue={activeTab} className="w-full">
                        <TabsList className="grid grid-cols-3 mb-6">
                            <TabsTrigger value="upload" onClick={() => handleTabChange('upload')}>Document</TabsTrigger>
                            <TabsTrigger value="consult" onClick={() => handleTabChange('consult')}>Consultation</TabsTrigger>
                            <TabsTrigger value="application" onClick={() => handleTabChange('application')}>Application</TabsTrigger>
                        </TabsList>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <TabsContent value="upload" className="mt-0">
                                    {TaskCards.upload}
                                </TabsContent>
                                <TabsContent value="consult" className="mt-0">
                                    {TaskCards.consult}
                                </TabsContent>
                                <TabsContent value="application" className="mt-0">
                                    {TaskCards.application}
                                </TabsContent>
                            </motion.div>
                        </AnimatePresence>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-6">
                    <Button variant="ghost" onClick={() => completeStep('first-task')}>
                        Skip
                    </Button>
                    {taskCompleted && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-primary flex items-center gap-2"
                        >
                            <CheckCircle2 size={16} />
                            <span>Task Completed!</span>
                        </motion.div>
                    )}
                </CardFooter>
            </motion.div>
        </div>
    );
}; 