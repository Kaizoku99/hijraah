'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface SourceData {
    url: string;
    title: string;
    description: string;
}

interface ActivityData {
    type: 'search' | 'extract' | 'analyze' | 'reasoning' | 'synthesis' | 'thought';
    status: 'pending' | 'complete' | 'error';
    message: string;
    timestamp: string;
    depth: number;
    completedSteps: number;
    totalSteps: number;
}

/**
 * Component that handles data streams from the AI, such as research activities,
 * sources, and other streaming updates
 */
export function DataStreamHandler({ id }: { id: string }) {
    const router = useRouter();
    const { toast } = useToast();
    const eventSourceRef = useRef<EventSource | null>(null);
    const [sources, setSources] = useState<SourceData[]>([]);
    const [activities, setActivities] = useState<ActivityData[]>([]);
    const [depth, setDepth] = useState<{
        current: number;
        max: number;
    }>({ current: 0, max: 0 });
    const [progress, setProgress] = useState<{
        completedSteps: number;
        totalSteps: number;
    }>({ completedSteps: 0, totalSteps: 0 });

    // Store the data for consumption by other components
    useEffect(() => {
        // Store data in sessionStorage for persistence across page refreshes
        if (sources.length > 0) {
            sessionStorage.setItem(`sources-${id}`, JSON.stringify(sources));
        }
        if (activities.length > 0) {
            sessionStorage.setItem(`activities-${id}`, JSON.stringify(activities));
        }
        if (depth.max > 0) {
            sessionStorage.setItem(`depth-${id}`, JSON.stringify(depth));
        }
        if (progress.totalSteps > 0) {
            sessionStorage.setItem(`progress-${id}`, JSON.stringify(progress));
        }
    }, [id, sources, activities, depth, progress]);

    // Load data from sessionStorage on initial render
    useEffect(() => {
        const storedSources = sessionStorage.getItem(`sources-${id}`);
        const storedActivities = sessionStorage.getItem(`activities-${id}`);
        const storedDepth = sessionStorage.getItem(`depth-${id}`);
        const storedProgress = sessionStorage.getItem(`progress-${id}`);

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
    }, [id]);

    useEffect(() => {
        // Don't create a new EventSource if one already exists
        if (eventSourceRef.current) return;

        // Create an EventSource connection to the server
        const eventSource = new EventSource(`/api/data-stream?id=${id}`);
        eventSourceRef.current = eventSource;

        // Handle different event types
        eventSource.addEventListener('message', (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received data:', data);

                switch (data.type) {
                    case 'source-delta':
                        setSources((prev) => [...prev, data.content]);
                        break;

                    case 'activity-delta':
                        setActivities((prev) => [...prev, data.content]);
                        // Update progress from activities
                        if (data.content.completedSteps && data.content.totalSteps) {
                            setProgress({
                                completedSteps: data.content.completedSteps,
                                totalSteps: data.content.totalSteps,
                            });
                        }
                        break;

                    case 'depth-delta':
                        setDepth({
                            current: data.content.current,
                            max: data.content.max,
                        });
                        // Update progress from depth data if available
                        if (data.content.completedSteps && data.content.totalSteps) {
                            setProgress({
                                completedSteps: data.content.completedSteps,
                                totalSteps: data.content.totalSteps,
                            });
                        }
                        break;

                    case 'progress-init':
                        setProgress({
                            completedSteps: 0,
                            totalSteps: data.content.totalSteps,
                        });
                        break;

                    case 'error':
                        toast({
                            title: 'Error',
                            description: data.content?.error || 'An error occurred',
                            variant: 'destructive',
                        });
                        break;

                    case 'finish':
                        // Research completed, could trigger some UI feedback
                        toast({
                            title: 'Research completed',
                            description: 'Analysis has been completed successfully',
                        });
                        break;
                }
            } catch (error) {
                console.error('Failed to parse SSE data:', error);
            }
        });

        eventSource.addEventListener('error', () => {
            console.error('SSE connection error');
            eventSource.close();
            eventSourceRef.current = null;

            toast({
                title: 'Connection lost',
                description: 'The connection to the AI service was lost',
                variant: 'destructive',
            });
        });

        return () => {
            eventSource.close();
            eventSourceRef.current = null;
        };
    }, [id, router, toast]);

    return null; // This component doesn't render anything visible
}

// Export the types for use in other components
export type { SourceData, ActivityData }; 