'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { InfoIcon, ExternalLink, FileText, BookOpen, Search } from 'lucide-react';
import { SourceData, ActivityData } from '@/components/chat/data-stream-handler';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DeepResearchProps {
    sessionId: string;
}

export function DeepResearch({ sessionId }: DeepResearchProps) {
    const [sources, setSources] = useState<SourceData[]>([]);
    const [activities, setActivities] = useState<ActivityData[]>([]);
    const [depth, setDepth] = useState<{ current: number; max: number }>({ current: 0, max: 0 });
    const [progress, setProgress] = useState<{ completedSteps: number; totalSteps: number }>({
        completedSteps: 0,
        totalSteps: 0
    });
    const [activeTab, setActiveTab] = useState('sources');

    // Load data from sessionStorage on initial render
    useEffect(() => {
        const storedSources = sessionStorage.getItem(`sources-${sessionId}`);
        const storedActivities = sessionStorage.getItem(`activities-${sessionId}`);
        const storedDepth = sessionStorage.getItem(`depth-${sessionId}`);
        const storedProgress = sessionStorage.getItem(`progress-${sessionId}`);

        if (storedSources) {
            setSources(JSON.parse(storedSources));
        }
        if (storedActivities) {
            setActivities(JSON.parse(storedActivities));
        }
        if (storedDepth) {
            setDepth(JSON.parse(storedDepth));
        }
        if (storedProgress) {
            setProgress(JSON.parse(storedProgress));
        }
    }, [sessionId]);

    // Calculate progress percentage
    const progressPercentage = progress.totalSteps > 0
        ? Math.round((progress.completedSteps / progress.totalSteps) * 100)
        : 0;

    // Group activities by type
    const activityGroups = activities.reduce((acc: Record<string, ActivityData[]>, activity) => {
        const type = activity.type;
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(activity);
        return acc;
    }, {});

    // If no data is available yet, show a message
    if (sources.length === 0 && activities.length === 0) {
        return (
            <Alert className="my-4">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>No research data available</AlertTitle>
                <AlertDescription>
                    Research data will appear here once the AI begins gathering information.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="mt-4 space-y-4">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <Progress value={progressPercentage} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                    {progress.completedSteps} / {progress.totalSteps} steps
                </div>
            </div>

            {depth.max > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Research depth:</span>
                    <div className="flex-1">
                        <Progress value={(depth.current / depth.max) * 100} className="h-1" />
                    </div>
                    <span>{depth.current} / {depth.max}</span>
                </div>
            )}

            <Tabs defaultValue="sources" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-3">
                    <TabsTrigger value="sources">Sources ({sources.length})</TabsTrigger>
                    <TabsTrigger value="activities">Activities ({activities.length})</TabsTrigger>
                    <TabsTrigger value="findings" className="hidden lg:inline-flex">Findings</TabsTrigger>
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
                                    {sources.map((source, index) => (
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
                                                    >
                                                        {source.title}
                                                        <ExternalLink className="ml-1 h-3 w-3" />
                                                    </Link>
                                                    <p className="text-sm text-muted-foreground">{source.description}</p>
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
                                    {activities.map((activity, index) => (
                                        <div key={index} className="flex items-start pb-2 border-b border-muted last:border-0">
                                            <div className="mr-2 mt-1">
                                                {activity.type === 'search' && <Search className="h-4 w-4 text-blue-500" />}
                                                {activity.type === 'extract' && <FileText className="h-4 w-4 text-green-500" />}
                                                {activity.type === 'analyze' && <BookOpen className="h-4 w-4 text-amber-500" />}
                                                {activity.type === 'reasoning' && <InfoIcon className="h-4 w-4 text-indigo-500" />}
                                                {(activity.type === 'synthesis' || activity.type === 'thought') && (
                                                    <BookOpen className="h-4 w-4 text-purple-500" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant={activity.status === 'complete' ? 'default' :
                                                        activity.status === 'pending' ? 'outline' : 'destructive'}
                                                        className="text-xs font-normal">
                                                        {activity.status}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        Depth: {activity.depth}
                                                    </span>
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
                                {activities.filter(a => a.type === 'synthesis' && a.status === 'complete').length > 0 ? (
                                    <div className="space-y-4">
                                        {activities.filter(a => a.type === 'synthesis' && a.status === 'complete')
                                            .map((activity, index) => (
                                                <div key={index} className="text-sm">
                                                    {activity.message}
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        Research synthesis will appear here when completed.
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