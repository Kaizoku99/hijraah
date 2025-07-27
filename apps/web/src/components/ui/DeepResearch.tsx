"use client";

import { motion } from "framer-motion";
import {
  X,
  ExternalLink,
  FileText,
  ChevronRight,
  Info,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Search as SearchIconLucide,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { useDeepResearch } from "@/lib/contexts/deep-research-context";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/ui/alert";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { ModelSelector } from "@/ui/model-selector";
import { Progress } from "@/ui/progress";
import { ScrollArea } from "@/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

interface DeepResearchDisplayProps {
  isFloating?: boolean;
  displayMode?: "panel" | "tabs";
}

export function DeepResearchDisplay({
  isFloating = false,
  displayMode = "panel",
}: DeepResearchDisplayProps) {
  const { state } = useDeepResearch();
  const [expanded, setExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("sources");

  const progressPanel =
    state.totalExpectedSteps > 0
      ? Math.floor((state.completedSteps / state.totalExpectedSteps) * 100)
      : 0;

  const sortedSourcesPanel = [...state.sources].sort(
    (a, b) => (b.relevance || 0) - (a.relevance || 0),
  );

  const latestActivityPanel = state.activity[state.activity.length - 1];

  const progressTabsPercentage =
    state.totalExpectedSteps > 0
      ? Math.round((state.completedSteps / state.totalExpectedSteps) * 100)
      : 0;

  useEffect(() => {
    if (
      displayMode === "panel" &&
      isFloating &&
      !state.activity.length &&
      !state.sources.length &&
      !state.isActive
    ) {
      setExpanded(false);
    }
  }, [
    displayMode,
    isFloating,
    state.activity.length,
    state.sources.length,
    state.isActive,
  ]);

  if (displayMode === "panel") {
    if (!expanded && isFloating) {
      return (
        <Button
          className="fixed bottom-20 right-4 z-50 shadow-lg"
          onClick={() => setExpanded(true)}
        >
          Show Research
        </Button>
      );
    }

    return (
      <Card
        className={
          isFloating
            ? "fixed bottom-20 right-4 z-50 w-96 shadow-lg max-h-[70vh] flex flex-col"
            : "w-full max-h-[600px] flex flex-col"
        }
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Deep Research</CardTitle>
            {isFloating && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setExpanded(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CardDescription>
            {state.isActive ? "Researching..." : "Web research results"}
          </CardDescription>

          {state.totalExpectedSteps > 0 && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{progressPanel}%</span>
              </div>
              <Progress value={progressPanel} />
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full px-4">
            {latestActivityPanel && (
              <div className="mb-4 p-3 bg-muted rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  {latestActivityPanel.status === "complete" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : latestActivityPanel.status === "error" ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <Info className="h-4 w-4 text-blue-500" />
                  )}
                  <span className="font-medium text-sm">
                    {latestActivityPanel.type === "search" && "Search"}
                    {latestActivityPanel.type === "extract" && "Extract"}
                    {latestActivityPanel.type === "analyze" && "Analysis"}
                    {(latestActivityPanel.type === "reasoning" ||
                      latestActivityPanel.type === "synthesis" ||
                      latestActivityPanel.type === "thought") &&
                      "Analysis"}
                    {latestActivityPanel.type === "error" && "Error"}
                  </span>
                </div>
                <p className="text-sm">{latestActivityPanel.message}</p>
              </div>
            )}

            {sortedSourcesPanel.length > 0 && (
              <>
                <h3 className="text-sm font-medium mb-2">Sources</h3>
                <Accordion type="multiple" className="w-full mb-4">
                  {sortedSourcesPanel.map((source, index) => (
                    <AccordionItem key={index} value={`source-${index}`}>
                      <AccordionTrigger className="py-2 text-sm">
                        <div className="flex items-center gap-2 text-left">
                          <span className="truncate">{source.title}</span>
                          {source.relevance !== undefined && (
                            <Badge variant="secondary" className="ml-auto">
                              {Math.round(source.relevance * 100)}%
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {typeof source.description === "string" && (
                          <p className="text-sm mb-2">{source.description}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground truncate">
                            {source.url}
                          </span>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary"
                          >
                            Visit <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </>
            )}

            {state.activity.length > 1 && (
              <>
                <h3 className="text-sm font-medium mb-2">Activity Log</h3>
                <div className="space-y-2 mb-4">
                  {state.activity
                    .slice(0, -1)
                    .reverse()
                    .map((activity, index) => (
                      <div key={index} className="text-sm p-2 rounded border">
                        <div className="flex items-center gap-2">
                          {activity.status === "complete" ? (
                            <CheckCircle className="h-3 w-3 text-green-500 shrink-0" />
                          ) : activity.status === "error" ? (
                            <AlertCircle className="h-3 w-3 text-red-500 shrink-0" />
                          ) : (
                            <Info className="h-3 w-3 text-blue-500 shrink-0" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="mt-1 text-xs">{activity.message}</p>
                      </div>
                    ))}
                </div>
              </>
            )}
            {state.activity.length === 0 &&
              state.sources.length === 0 &&
              !state.isActive && (
                <div className="text-center text-muted-foreground p-4">
                  No research data available.
                </div>
              )}
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex justify-end pt-2 pb-3">
          <Button
            variant="secondary"
            size="sm"
            className="text-xs"
            onClick={() => {
              toast.info(
                "Save as Document functionality is not yet implemented.",
              );
            }}
          >
            Save as Document <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    );
  } else if (displayMode === "tabs") {
    if (
      state.sources.length === 0 &&
      state.activity.length === 0 &&
      !state.isActive
    ) {
      return (
        <Alert className="my-4">
          <Info className="h-4 w-4" />
          <AlertTitle>No research data available</AlertTitle>
          <AlertDescription className="flex flex-col gap-3">
            <p>
              Research data will appear here once the AI begins gathering
              information.
            </p>
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="px-3">
              <BookOpen className="mr-1 h-3 w-3" />
              Deep Research Session
            </Badge>
            <Badge variant="outline" className="px-3">
              <SearchIconLucide className="mr-1 h-3 w-3" />
              AI-Powered
            </Badge>
          </div>
          <div>
            <ModelSelector types={["reasoning"]} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Progress value={progressTabsPercentage} className="h-2" />
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {state.completedSteps} / {state.totalExpectedSteps} steps
          </div>
        </div>
        {state.maxDepth > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Research depth:</span>
            <div className="flex-1">
              <Progress
                value={(state.currentDepth / state.maxDepth) * 100}
                className="h-1"
              />
            </div>
            <span>
              {state.currentDepth} / {state.maxDepth}
            </span>
          </div>
        )}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="sources">
              Sources ({state.sources.length})
            </TabsTrigger>
            <TabsTrigger value="activities">
              Activities ({state.activity.length})
            </TabsTrigger>
            <TabsTrigger value="findings" className="hidden lg:inline-flex">
              Findings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="mt-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Research Sources</CardTitle>
                <CardDescription>
                  Web pages and documents used in this research
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {state.sources.map((source, index) => (
                      <div key={index} className="flex flex-col space-y-1">
                        <div className="flex items-start">
                          <div className="mr-2 mt-0.5">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <Link
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                              legacyBehavior
                            >
                              {source.title}
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </Link>
                            {source.description && (
                              <p className="text-sm text-muted-foreground">
                                {source.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="mt-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Research Activities</CardTitle>
                <CardDescription>
                  Steps taken during the research process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {state.activity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start pb-2 border-b border-muted last:border-0"
                      >
                        <div className="mr-2 mt-1">
                          {activity.type === "search" && (
                            <SearchIconLucide className="h-4 w-4 text-blue-500" />
                          )}
                          {activity.type === "extract" && (
                            <FileText className="h-4 w-4 text-green-500" />
                          )}
                          {activity.type === "analyze" && (
                            <BookOpen className="h-4 w-4 text-amber-500" />
                          )}
                          {activity.type === "reasoning" && (
                            <Info className="h-4 w-4 text-indigo-500" />
                          )}
                          {activity.type === "error" && (
                            <Info className="h-4 w-4 text-red-500" />
                          )}
                          {(activity.type === "synthesis" ||
                            activity.type === "thought") && (
                            <BookOpen className="h-4 w-4 text-purple-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                activity.status === "complete"
                                  ? "default"
                                  : activity.status === "pending"
                                    ? "outline"
                                    : "destructive"
                              }
                              className="text-xs font-normal"
                            >
                              {activity.status}
                            </Badge>
                            {activity.depth && (
                              <span className="text-xs text-muted-foreground">
                                Depth: {activity.depth}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm">{activity.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="findings" className="mt-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Research Findings</CardTitle>
                <CardDescription>
                  Key insights discovered during research
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  {state.activity.filter(
                    (a) => a.type === "synthesis" && a.status === "complete",
                  ).length > 0 ? (
                    <div className="space-y-4">
                      {state.activity
                        .filter(
                          (a) =>
                            a.type === "synthesis" && a.status === "complete",
                        )
                        .map((activity, index) => (
                          <div key={index} className="text-sm">
                            {activity.message}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground p-4">
                      No findings available yet. Findings will appear once the
                      research is complete.
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
  return null;
}
