"use client";

import { format } from "date-fns";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Info,
  CalendarClock,
  CircleDashed,
  FileText,
  Users,
  Building,
} from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type TimelineEventStatus =
  | "completed"
  | "pending"
  | "in-progress"
  | "rejected"
  | "upcoming"
  | "warning";

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  status: TimelineEventStatus;
  date?: Date;
  estimatedCompletionDate?: Date;
  icon?: React.ReactNode;
  subEvents?: Array<Omit<TimelineEvent, "subEvents">>;
  metadata?: Record<string, any>;
}

export interface ApplicationTimelineProps {
  events: TimelineEvent[];
  className?: string;
  currentStage?: string;
  showExpectedDates?: boolean;
  showSubEvents?: boolean;
  title?: string;
}

export function ApplicationTimeline({
  events,
  className,
  currentStage,
  showExpectedDates = true,
  showSubEvents = true,
  title = "Application Progress",
}: ApplicationTimelineProps) {
  const t = useTranslations("applications");

  // Calculate the percentage of completed steps
  const completedCount = events.filter(
    (event) => event.status === "completed",
  ).length;
  const totalEvents = events.length;
  const progressPercentage = Math.round((completedCount / totalEvents) * 100);

  const getStatusIcon = (
    status: TimelineEventStatus,
    customIcon?: React.ReactNode,
  ) => {
    if (customIcon) return customIcon;

    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />;
      case "pending":
        return <CircleDashed className="h-5 w-5 text-gray-400" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TimelineEventStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-gray-100 text-gray-600 border-gray-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "warning":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getEventIcon = (event: TimelineEvent) => {
    if (event.icon) return event.icon;

    // Provide default icons based on event title
    if (event.title.toLowerCase().includes("document")) {
      return <FileText className="h-5 w-5" />;
    } else if (
      event.title.toLowerCase().includes("interview") ||
      event.title.toLowerCase().includes("appointment")
    ) {
      return <Users className="h-5 w-5" />;
    } else if (
      event.title.toLowerCase().includes("processing") ||
      event.title.toLowerCase().includes("review")
    ) {
      return <Building className="h-5 w-5" />;
    }

    return null;
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <Badge variant="outline" className="bg-primary/10">
            {progressPercentage}% {t("completed")}
          </Badge>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-2 dark:bg-gray-700">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-6">
          {events.map((event, index) => {
            const isLast = index === events.length - 1;
            const isCurrent = event.id === currentStage;

            return (
              <div key={event.id} className="relative">
                <div
                  className={cn(
                    "flex items-start gap-4",
                    isCurrent && "bg-muted rounded-lg p-3 -ml-3 -mr-3",
                  )}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center border-2",
                        event.status === "completed" &&
                          "border-green-500 bg-green-50",
                        event.status === "in-progress" &&
                          "border-blue-500 bg-blue-50",
                        event.status === "pending" &&
                          "border-gray-300 bg-gray-50",
                        event.status === "rejected" &&
                          "border-red-500 bg-red-50",
                        event.status === "warning" &&
                          "border-amber-500 bg-amber-50",
                        event.status === "upcoming" &&
                          "border-gray-200 bg-gray-50",
                        isCurrent && "ring-2 ring-primary ring-offset-2",
                      )}
                    >
                      {getStatusIcon(event.status, getEventIcon(event))}
                    </div>

                    {!isLast && (
                      <div
                        className={cn(
                          "w-0.5 h-full min-h-[40px] relative -z-10",
                          event.status === "completed"
                            ? "bg-green-200"
                            : "bg-gray-200",
                          showSubEvents &&
                            event.subEvents?.length &&
                            "min-h-[80px]",
                        )}
                      />
                    )}
                  </div>

                  <div className="flex-1 pt-1 pb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className={cn(
                            "font-medium text-base",
                            isCurrent && "text-primary font-semibold",
                            event.status === "completed" && "text-green-700",
                            event.status === "rejected" && "text-red-700",
                          )}
                        >
                          {event.title}
                        </h3>

                        {event.description && (
                          <p className="text-sm text-gray-500 mt-1">
                            {event.description}
                          </p>
                        )}
                      </div>

                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs whitespace-nowrap",
                          getStatusColor(event.status),
                        )}
                      >
                        {t(`status.${event.status}`)}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                      {event.date && (
                        <div className="flex items-center">
                          <CalendarClock className="h-3.5 w-3.5 mr-1.5" />
                          <span>
                            {event.status === "completed"
                              ? t("completedOn")
                              : event.status === "in-progress"
                                ? t("startedOn")
                                : t("scheduledFor")}
                            : {format(event.date, "PPP")}
                          </span>
                        </div>
                      )}

                      {showExpectedDates &&
                        event.estimatedCompletionDate &&
                        event.status !== "completed" && (
                          <div className="flex items-center">
                            <Tooltip>
                              <TooltipTrigger className="flex items-center cursor-help">
                                <CalendarClock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                <span>
                                  {t("estimatedCompletion")}:{" "}
                                  {format(event.estimatedCompletionDate, "PPP")}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                {t("estimatedTimelineNote")}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        )}
                    </div>

                    {/* Sub-events */}
                    {showSubEvents &&
                      event.subEvents &&
                      event.subEvents.length > 0 && (
                        <div className="mt-4 pl-3 border-l-2 border-dashed border-gray-200">
                          <div className="space-y-3">
                            {event.subEvents.map((subEvent) => (
                              <div
                                key={subEvent.id}
                                className="flex items-start gap-3"
                              >
                                <div className="w-5 h-5 rounded-full flex items-center justify-center">
                                  {getStatusIcon(
                                    subEvent.status,
                                    subEvent.icon,
                                  )}
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <h4 className="text-sm font-medium">
                                      {subEvent.title}
                                    </h4>

                                    {subEvent.status && (
                                      <Badge
                                        variant="outline"
                                        className={cn(
                                          "text-xs px-1.5 py-0 h-5",
                                          getStatusColor(subEvent.status),
                                        )}
                                      >
                                        {t(`status.${subEvent.status}`)}
                                      </Badge>
                                    )}
                                  </div>

                                  {subEvent.description && (
                                    <p className="text-xs text-gray-500 mt-0.5">
                                      {subEvent.description}
                                    </p>
                                  )}

                                  {subEvent.date && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      {format(subEvent.date, "PPP")}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                {!isLast && <Separator className="my-2" />}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
