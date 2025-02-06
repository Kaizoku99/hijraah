"use client";

import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { DashboardLayout } from '@/app/_components/layout/DashboardLayout';
import {
  Activity,
  FileText,
  MessageSquare,
  Clock,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Active Cases',
      value: '3',
      icon: Activity,
      description: 'Cases in progress',
    },
    {
      name: 'Documents',
      value: '12',
      icon: FileText,
      description: 'Uploaded documents',
    },
    {
      name: 'Chat Sessions',
      value: '24',
      icon: MessageSquare,
      description: 'AI conversations',
    },
    {
      name: 'Hours Saved',
      value: '48',
      icon: Clock,
      description: 'Time saved with AI',
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.email?.split('@')[0]}
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your immigration journey
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add more dashboard content here */}
      </div>
    </DashboardLayout>
  );
}