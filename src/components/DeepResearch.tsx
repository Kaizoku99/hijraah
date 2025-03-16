'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDeepResearch } from '@/hooks/useDeepResearch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { X, ExternalLink, FileText, ChevronRight, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';

interface DeepResearchComponentProps {
    isFloating?: boolean;
}

export function DeepResearchComponent({ isFloating = false }: DeepResearchComponentProps) {
    const { state, isLoading } = useDeepResearch();
    const [expanded, setExpanded] = useState(true);

    const progress = state.totalExpectedSteps > 0
        ? Math.floor((state.completedSteps / state.totalExpectedSteps) * 100)
        : 0;

    const sortedSources = [...state.sources].sort((a, b) =>
        (b.relevance || 0) - (a.relevance || 0)
    );

    const latestActivity = state.activity[state.activity.length - 1];

    // Auto-collapse floating panel when inactive
    useEffect(() => {
        if (isFloating && !state.activity.length && !state.sources.length) {
            setExpanded(false);
        }
    }, [isFloating, state.activity.length, state.sources.length]);

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
        <Card className={isFloating
            ? "fixed bottom-20 right-4 z-50 w-96 shadow-lg max-h-[70vh] flex flex-col"
            : "w-full max-h-[600px] flex flex-col"
        }>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Deep Research</CardTitle>
                    {isFloating && (
                        <Button variant="ghost" size="icon" onClick={() => setExpanded(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <CardDescription>
                    {isLoading ? 'Researching...' : 'Web research results'}
                </CardDescription>

                {state.totalExpectedSteps > 0 && (
                    <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <Progress value={progress} />
                    </div>
                )}
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full px-4">
                    {latestActivity && (
                        <div className="mb-4 p-3 bg-muted rounded-md">
                            <div className="flex items-center gap-2 mb-2">
                                {latestActivity.status === 'complete' ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : latestActivity.status === 'error' ? (
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                ) : (
                                    <Info className="h-4 w-4 text-blue-500" />
                                )}
                                <span className="font-medium text-sm">
                                    {latestActivity.type === 'search' && 'Search'}
                                    {latestActivity.type === 'extract' && 'Extract'}
                                    {latestActivity.type === 'analyze' && 'Analysis'}
                                    {(latestActivity.type === 'reasoning' ||
                                        latestActivity.type === 'synthesis' ||
                                        latestActivity.type === 'thought') && 'Analysis'}
                                </span>
                            </div>
                            <p className="text-sm">{latestActivity.message}</p>
                        </div>
                    )}

                    {sortedSources.length > 0 && (
                        <>
                            <h3 className="text-sm font-medium mb-2">Sources</h3>
                            <Accordion type="multiple" className="w-full mb-4">
                                {sortedSources.map((source, index) => (
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
                                            {typeof source === 'object' &&
                                                source !== null &&
                                                'description' in source &&
                                                typeof source.description === 'string' && (
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
                                {state.activity.slice(0, -1).reverse().map((activity, index) => (
                                    <div
                                        key={index}
                                        className="text-sm p-2 rounded border"
                                    >
                                        <div className="flex items-center gap-2">
                                            {activity.status === 'complete' ? (
                                                <CheckCircle className="h-3 w-3 text-green-500 shrink-0" />
                                            ) : activity.status === 'error' ? (
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
                </ScrollArea>
            </CardContent>

            <CardFooter className="flex justify-end pt-2 pb-3">
                <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                        // Convert research to document
                    }}
                >
                    Save as Document <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
            </CardFooter>
        </Card>
    );
} 