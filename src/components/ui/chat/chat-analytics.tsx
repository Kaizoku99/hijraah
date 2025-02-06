'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart, Clock, MessageSquare, Users } from 'lucide-react';

interface ChatAnalyticsProps {
  sessionId?: string;
  className?: string;
}

interface AnalyticItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

export function ChatAnalytics({ sessionId, className }: ChatAnalyticsProps) {
  const [analytics, setAnalytics] = React.useState<AnalyticItem[]>([
    {
      label: 'Total Messages',
      value: 0,
      icon: <MessageSquare className="h-4 w-4" />,
      description: 'Messages in this session'
    },
    {
      label: 'Active Users',
      value: 0,
      icon: <Users className="h-4 w-4" />,
      description: 'Currently active users'
    },
    {
      label: 'Session Duration',
      value: '0m',
      icon: <Clock className="h-4 w-4" />,
      description: 'Time since session start'
    },
    {
      label: 'Response Rate',
      value: '0%',
      icon: <BarChart className="h-4 w-4" />,
      description: 'Average response time'
    }
  ]);

  // TODO: Implement analytics data fetching
  React.useEffect(() => {
    if (!sessionId) return;

    const fetchAnalytics = async () => {
      try {
        // Fetch analytics data
        // Update setAnalytics with real data
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, [sessionId]);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <h2 className="text-lg font-semibold">Analytics</h2>
      <ScrollArea className="h-[200px]">
        <div className="grid gap-4">
          {analytics.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-muted p-2">
                  {item.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold">
                    {item.value}
                  </p>
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
  );
} 