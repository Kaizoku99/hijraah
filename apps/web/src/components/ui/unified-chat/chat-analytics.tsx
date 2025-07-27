"use client";

import { BarChart, Clock, MessageSquare, Users, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChatAnalyticsProps {
  chatId?: string;
  className?: string;
}

interface AnalyticItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

export function ChatAnalytics({ chatId, className }: ChatAnalyticsProps) {
  const [analytics, setAnalytics] = React.useState<AnalyticItem[]>([
    {
      label: "Total Messages",
      value: 0,
      icon: <MessageSquare className="h-4 w-4" />,
      description: "Messages in this session",
    },
    {
      label: "Active Users",
      value: 0,
      icon: <Users className="h-4 w-4" />,
      description: "Currently active users",
    },
    {
      label: "Session Duration",
      value: "0m",
      icon: <Clock className="h-4 w-4" />,
      description: "Time since session start",
    },
    {
      label: "Response Rate",
      value: "0%",
      icon: <BarChart className="h-4 w-4" />,
      description: "Average response time",
    },
  ]);

  // TODO: Implement analytics data fetching
  React.useEffect(() => {
    if (!chatId) return;

    const fetchAnalytics = async () => {
      try {
        // Fetch analytics data using chatId
        // console.log(`Fetching analytics for chatId: ${chatId}`);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, [chatId]);

  return (
    <div
      className={cn("h-full border-l bg-background overflow-auto", className)}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <BarChart className="h-5 w-5 mr-2" />
          <h3 className="font-semibold">Analytics</h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() =>
            document.dispatchEvent(new CustomEvent("toggle-analytics"))
          }
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="p-4">
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="grid gap-4">
            {analytics.map((item, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-muted p-2">{item.icon}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold">{item.value}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
