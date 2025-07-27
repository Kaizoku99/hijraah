"use client";

import { createClient } from "@/lib/supabase/client";
import { format, parseISO } from "date-fns";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Calendar,
} from "lucide-react";
import React, { useState, useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
} from "@/components/ui/timeline";
import { useToast } from "@/components/ui/use-toast";

type RoadmapViewProps = {
  roadmapId: string;
  userId: string;
};

type MilestoneType = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "not_started" | "in_progress" | "completed" | "blocked" | "overdue";
  completionPercentage: number;
  requiredDocuments: string[];
  dependsOn: string[];
  isCritical: boolean;
  notes?: string;
  metadata?: Record<string, any>;
};

type PhaseType = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "not_started" | "in_progress" | "completed" | "blocked" | "overdue";
  completionPercentage: number;
  milestones: MilestoneType[];
  metadata?: Record<string, any>;
};

type RoadmapType = {
  id: string;
  title: string;
  description: string;
  case_id: string;
  case_type: string;
  user_id: string;
  phases: PhaseType[];
  start_date: string;
  target_end_date: string;
  estimated_end_date: string;
  completion_percentage: number;
  last_updated: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
};

export default function RoadmapView({ roadmapId, userId }: RoadmapViewProps) {
  const [roadmap, setRoadmap] = useState<RoadmapType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedPhases, setExpandedPhases] = useState<string[]>([]);
  const { toast } = useToast();

  const supabase = createClient();

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("roadmaps")
          .select("*")
          .eq("id", roadmapId)
          .single();

        if (error) {
          setError("Failed to load roadmap data");
          return;
        }

        setRoadmap(data);

        // Expand the current phase by default
        if (data.phases) {
          const currentPhase = data.phases.find(
            (phase) => phase.status === "in_progress"
          );

          if (currentPhase) {
            setExpandedPhases([currentPhase.id]);
          } else if (data.phases.length > 0) {
            setExpandedPhases([data.phases[0].id]);
          }
        }
      } catch (err) {
        setError("An error occurred while fetching roadmap data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [roadmapId, supabase]);

  const updateMilestoneStatus = async (
    milestoneId: string,
    status: "not_started" | "in_progress" | "completed" | "blocked" | "overdue",
    completionPercentage: number
  ) => {
    try {
      const { data, error } = await fetch("/api/roadmap/milestone", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roadmapId,
          milestoneId,
          status,
          completionPercentage,
        }),
      }).then((res) => res.json());

      if (error) {
        toast({
          title: "Error",
          description: `Failed to update milestone: ${error}`,
          variant: "destructive",
        });
        return;
      }

      // Update the local state with the updated roadmap
      setRoadmap(data);

      toast({
        title: "Success",
        description: "Milestone status updated successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update milestone status",
        variant: "destructive",
      });
      console.error(err);
    }
  };

  const handleAccordionChange = (value: string) => {
    setExpandedPhases((prev) => {
      if (prev.includes(value)) {
        return prev.filter((id) => id !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "blocked":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Completed
          </Badge>
        );
      case "in_progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300"
          >
            In Progress
          </Badge>
        );
      case "blocked":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-300"
          >
            Blocked
          </Badge>
        );
      case "overdue":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            Overdue
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 border-gray-300"
          >
            Not Started
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Loading Roadmap...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !roadmap) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg text-red-600">
            Error Loading Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error || "Failed to load roadmap"}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">
              {roadmap.title}
            </CardTitle>
            <CardDescription className="mt-2">
              {roadmap.description}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <Badge className="mb-2" variant="outline">
              {roadmap.case_type.replace("_", " ")}
            </Badge>
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Last updated:{" "}
              {format(parseISO(roadmap.last_updated), "MMM d, yyyy")}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Overall Progress: {roadmap.completion_percentage}%
            </span>
          </div>
          <Progress value={roadmap.completion_percentage} className="h-2" />
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">Start Date</div>
            <div className="font-medium">
              {format(parseISO(roadmap.start_date), "MMMM d, yyyy")}
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">Target End Date</div>
            <div className="font-medium">
              {format(parseISO(roadmap.target_end_date), "MMMM d, yyyy")}
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">Estimated Completion</div>
            <div className="font-medium">
              {format(parseISO(roadmap.estimated_end_date), "MMMM d, yyyy")}
            </div>
          </div>
        </div>

        <Accordion
          type="multiple"
          value={expandedPhases}
          onValueChange={setExpandedPhases}
          className="border rounded-md"
        >
          {roadmap.phases.map((phase, phaseIndex) => (
            <AccordionItem key={phase.id} value={phase.id}>
              <AccordionTrigger className="px-4">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="mr-2">{getStatusIcon(phase.status)}</div>
                    <div className="text-left">
                      <span className="font-medium">{phase.title}</span>
                      <div className="flex items-center mt-1">
                        <Progress
                          value={phase.completionPercentage}
                          className="w-24 h-1.5 mr-2"
                        />
                        <span className="text-xs text-gray-500">
                          {phase.completionPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getStatusBadge(phase.status)}
                    <span className="text-xs text-gray-500 ml-2">
                      {format(parseISO(phase.startDate), "MMM d")} -{" "}
                      {format(parseISO(phase.endDate), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pt-2 pb-4">
                <p className="text-gray-600 mb-4">{phase.description}</p>

                <Timeline>
                  {phase.milestones.map((milestone, milestoneIndex) => (
                    <TimelineItem key={milestone.id}>
                      {milestoneIndex < phase.milestones.length - 1 && (
                        <TimelineConnector />
                      )}
                      <TimelineHeader>
                        <TimelineIcon>
                          {getStatusIcon(milestone.status)}
                        </TimelineIcon>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
                          <div>
                            <h4 className="font-medium text-lg">
                              {milestone.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {format(parseISO(milestone.startDate), "MMM d")} -{" "}
                              {format(
                                parseISO(milestone.endDate),
                                "MMM d, yyyy"
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(milestone.status)}
                            {milestone.isCritical && (
                              <Badge
                                variant="outline"
                                className="bg-purple-100 text-purple-800 border-purple-300"
                              >
                                Critical
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TimelineHeader>

                      <TimelineBody className="mt-2">
                        <div className="pl-6">
                          <p className="text-gray-600 mb-3">
                            {milestone.description}
                          </p>

                          {milestone.requiredDocuments &&
                            milestone.requiredDocuments.length > 0 && (
                              <div className="mb-4">
                                <h5 className="font-medium text-sm mb-2">
                                  Required Documents:
                                </h5>
                                <ul className="list-disc list-inside">
                                  {milestone.requiredDocuments.map(
                                    (doc, index) => (
                                      <li
                                        key={index}
                                        className="text-sm text-gray-600"
                                      >
                                        {doc}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium">
                                Progress: {milestone.completionPercentage}%
                              </span>
                            </div>
                            <Progress
                              value={milestone.completionPercentage}
                              className="h-1.5"
                            />
                          </div>

                          {roadmap.user_id === userId && (
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Select
                                onValueChange={(value) =>
                                  updateMilestoneStatus(
                                    milestone.id,
                                    value as any,
                                    value === "completed"
                                      ? 100
                                      : value === "in_progress"
                                        ? 50
                                        : value === "not_started"
                                          ? 0
                                          : milestone.completionPercentage
                                  )
                                }
                                defaultValue={milestone.status}
                              >
                                <SelectTrigger className="w-full sm:w-[180px]">
                                  <SelectValue placeholder="Update status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="not_started">
                                    Not Started
                                  </SelectItem>
                                  <SelectItem value="in_progress">
                                    In Progress
                                  </SelectItem>
                                  <SelectItem value="completed">
                                    Completed
                                  </SelectItem>
                                  <SelectItem value="blocked">
                                    Blocked
                                  </SelectItem>
                                  <SelectItem value="overdue">
                                    Overdue
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      </TimelineBody>
                    </TimelineItem>
                  ))}
                </Timeline>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 mt-4">
        <div className="text-sm text-gray-500">Case ID: {roadmap.case_id}</div>
        <Button variant="outline">Export Roadmap</Button>
      </CardFooter>
    </Card>
  );
}
