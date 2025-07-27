"use client";

import React from "react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/shared/ui/ui/scroll-area";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  source: string;
  confidence: number;
}

interface TimelineViewProps {
  data?: TimelineEvent[];
  isLoading?: boolean;
  error?: Error;
}

export function TimelineView({ data, isLoading, error }: TimelineViewProps) {
  if (error) {
    return (
      <div className="p-4 text-red-500" role="alert">
        <h3 className="font-bold">Error loading timeline</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </Card>
        ))}
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No timeline data available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((event) => (
        <Card key={event.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <time
                dateTime={event.date}
                className="text-sm text-muted-foreground"
              >
                {new Date(event.date).toLocaleDateString()}
              </time>
              <h3 className="font-medium mt-1">{event.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {event.description}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Source: {event.source}
              </p>
            </div>
            <div
              className="ml-4 flex-shrink-0"
              title={`Confidence: ${Math.round(event.confidence * 100)}%`}
            >
              <div className="h-2 w-16 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${event.confidence * 100}%` }}
                  role="progressbar"
                  aria-valuenow={event.confidence * 100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
