import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import React, { useState, useCallback, useEffect, useMemo } from "react";

import {
  getStepById,
  OnboardingTask,
  OnboardingStepId,
} from "@/_shared/constants/onboarding-steps";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

import { useOnboarding } from "./OnboardingProvider";

interface TaskDisplayProps {
  task: OnboardingTask;
  onComplete: (taskId: string, actionKey: string) => void;
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ task, onComplete }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClick = useCallback(() => {
    setIsCompleting(true);
    // Simulate task completion action (e.g., API call or navigation)
    setTimeout(() => {
      setIsCompleted(true);
      setIsCompleting(false);
      // Wait a bit before triggering the onComplete callback from the parent
      setTimeout(() => onComplete(task.id, task.actionKey), 1000);
    }, 1000);
  }, [task.id, task.actionKey, onComplete]);

  const IconComponent = task.icon;

  return (
    <Card className="border border-muted relative overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <IconComponent className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription className="mt-1">
              {task.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <Button
              key="cta-button"
              onClick={handleClick}
              disabled={isCompleting}
              className="gap-2"
            >
              {isCompleting ? "Processing..." : task.cta}
              {!isCompleting && <ArrowRight size={16} />}
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
  const { onboarding, completeStep } = useOnboarding();
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [taskCompleted, setTaskCompleted] = useState(false);

  // --- Get Current Step Configuration --- //
  const stepConfig = getStepById("first-task");
  const availableTasks = useMemo(() => stepConfig?.tasks || [], [stepConfig]);

  // Initialize activeTabId to the first task's ID if available
  useEffect(() => {
    if (availableTasks.length > 0 && !activeTabId) {
      setActiveTabId(availableTasks[0].id);
    }
  }, [availableTasks, activeTabId]);

  const handleTaskComplete = useCallback(
    async (taskId: string, actionKey: string) => {
      console.log(`Task ${taskId} completed, actionKey: ${actionKey}`);
      setTaskCompleted(true);

      // Mark the specific task action as completed via API
      try {
        await fetch("/api/onboarding/actions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            actionKey: actionKey, // Use the specific actionKey from the task config
            isCompleted: true,
          }),
        });
      } catch (error) {
        console.error(
          `Failed to mark action ${actionKey} as completed:`,
          error,
        );
      }

      // After a delay, complete the *overall* 'first-task' step
      setTimeout(() => completeStep("first-task" as OnboardingStepId), 1500);
    },
    [completeStep],
  );

  const isActive =
    onboarding.isActive &&
    onboarding.currentStep === "first-task" &&
    !onboarding.hideForSession &&
    !onboarding.isCompleted;

  if (!isActive || !stepConfig || availableTasks.length === 0) return null;

  const handleTabChange = (value: string) => {
    setActiveTabId(value);
  };

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4">
          <motion.div
            key="first-task-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-card border rounded-xl shadow-lg max-w-2xl w-full flex flex-col max-h-[90vh]"
          >
            <CardHeader>
              <CardTitle className="text-2xl">{stepConfig.title}</CardTitle>
              <CardDescription className="text-base">
                {stepConfig.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto">
              <Tabs
                value={activeTabId ?? ""}
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList
                  className={`grid w-full grid-cols-${availableTasks.length} mb-6`}
                >
                  {availableTasks.map((task) => (
                    <TabsTrigger key={task.id} value={task.id}>
                      {/* Simplified tab title, maybe use task.cta or a short version? */}
                      {task.title.split(" ")[0]} {/* Example: Use first word */}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {availableTasks.map((task) => (
                  <TabsContent key={task.id} value={task.id} className="mt-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={task.id} // Animate based on task ID change
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TaskDisplay
                          task={task}
                          onComplete={handleTaskComplete}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6 mt-auto">
              <Button
                variant="ghost"
                onClick={() => completeStep("first-task" as OnboardingStepId)}
              >
                Skip This Step
              </Button>
              {taskCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-primary flex items-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  <span>Task Completed! Moving on...</span>
                </motion.div>
              )}
            </CardFooter>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
