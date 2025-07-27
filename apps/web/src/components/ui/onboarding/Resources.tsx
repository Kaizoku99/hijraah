import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import React, { useState, useCallback } from "react";

import {
  getStepById,
  ResourceCategory,
  ResourceLink,
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

// Reusable Resource Card component (slightly adapted from original)
interface ResourceDisplayCardProps {
  resource: ResourceLink;
}

const ResourceDisplayCard: React.FC<ResourceDisplayCardProps> = ({
  resource,
}) => {
  const IconComponent = resource.icon;
  return (
    <Card className="transition-all hover:border-primary/50 hover:shadow-md flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10 text-primary">
            <IconComponent className="h-4 w-4" />
          </div>
          <CardTitle className="text-base">{resource.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <CardDescription>{resource.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          size="sm"
          className="gap-1 text-xs px-0 h-auto py-1 text-primary"
          asChild
        >
          <a href={resource.link} target="_blank" rel="noopener noreferrer">
            View Resource <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export const Resources: React.FC = () => {
  const { onboarding, completeStep } = useOnboarding();
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  // --- Get Current Step Configuration --- //
  const stepConfig = getStepById("resources");
  const resourceCategories = stepConfig?.resourceCategories || [];

  // Initialize activeTabId
  useState(() => {
    if (resourceCategories.length > 0 && !activeTabId) {
      setActiveTabId(resourceCategories[0].id);
    }
  });

  const isActive =
    onboarding.isActive &&
    onboarding.currentStep === "resources" &&
    !onboarding.hideForSession &&
    !onboarding.isCompleted;

  // Renamed from handleFinish to be more specific
  const handleCompleteResourcesStep = useCallback(async () => {
    // No specific action needed *before* completing, just trigger step completion
    // The actionKey 'resources_viewed' is handled by completeStep in the provider
    completeStep("resources" as OnboardingStepId);
  }, [completeStep]);

  if (!isActive || !stepConfig || resourceCategories.length === 0) return null;

  const handleTabChange = (value: string) => {
    setActiveTabId(value);
  };

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4">
          <motion.div
            key="resources-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-card border rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            <CardHeader>
              <CardTitle className="text-2xl">{stepConfig.title}</CardTitle>
              <CardDescription className="text-base">
                {stepConfig.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow overflow-y-auto">
              <Tabs
                defaultValue={activeTabId ?? resourceCategories[0]?.id ?? ""}
                value={activeTabId ?? ""}
                onValueChange={handleTabChange}
              >
                <TabsList
                  className={`grid w-full grid-cols-${resourceCategories.length} mb-6`}
                >
                  {resourceCategories.map((category) => {
                    const CategoryIcon = category.icon;
                    return (
                      <TabsTrigger key={category.id} value={category.id}>
                        <CategoryIcon className="h-4 w-4 mr-2" />
                        {category.title}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {resourceCategories.map((category) => (
                  <TabsContent
                    key={category.id}
                    value={category.id}
                    className="mt-0"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={category.id} // Animate based on category change
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                      >
                        {category.resources.map((resource) => (
                          <ResourceDisplayCard
                            key={resource.link}
                            resource={resource}
                          />
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>

            <CardFooter className="flex justify-end border-t p-6 mt-auto">
              {/* Changed Skip to Done/Finish, as viewing resources is the action */}
              <Button variant="default" onClick={handleCompleteResourcesStep}>
                Done Exploring
              </Button>
            </CardFooter>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
