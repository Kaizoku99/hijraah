'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDeepResearch } from '@/lib/deep-research-context';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { X, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DeepResearchComponentProps {
    isFloating?: boolean;
    onClose?: () => void;
}

export function DeepResearchComponent({
    isFloating = true,
    onClose
}: DeepResearchComponentProps) {
    const { state, setActive } = useDeepResearch();

    if (!state.isActive || (state.activity.length === 0 && state.sources.length === 0)) {
        return null;
    }

    const progressPercentage = Math.round(
        (state.completedSteps / state.totalExpectedSteps) * 100
    );

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            setActive(false);
        }
    };

    const containerClassName = cn(
        isFloating
            ? "fixed right-4 top-20 z-50 w-80 bg-background border rounded-lg shadow-lg max-h-[80vh]"
            : "w-full bg-background border rounded-lg",
        "flex flex-col overflow-hidden"
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={containerClassName}
        >
            <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium">Deep Research</h3>
                    {state.currentDepth > 0 && (
                        <Badge variant="outline">
                            Depth: {state.currentDepth}/{state.maxDepth}
                        </Badge>
                    )}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="h-8 w-8"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {state.completedSteps > 0 && state.totalExpectedSteps > 0 && (
                <div className="px-4 py-2">
                    <div className="flex justify-between text-xs mb-1">
                        <span>Research progress</span>
                        <span>{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                </div>
            )}

            <Tabs defaultValue="activity" className="flex-1">
                <TabsList className="w-full rounded-none px-3 pt-2">
                    <TabsTrigger value="activity" className="flex-1">
                        Activity
                    </TabsTrigger>
                    <TabsTrigger value="sources" className="flex-1">
                        Sources ({state.sources.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="activity" className="mt-0 flex-1 p-0">
                    <ScrollArea className="h-[50vh]">
                        <div className="space-y-3 p-3">
                            {[...state.activity].reverse().map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-start gap-3"
                                >
                                    <div
                                        className={cn(
                                            'size-2 rounded-full shrink-0 mt-1.5',
                                            item.status === 'pending' && 'bg-yellow-500',
                                            item.status === 'complete' && 'bg-green-500',
                                            item.status === 'error' && 'bg-red-500',
                                        )}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm break-words whitespace-pre-wrap">
                                            {item.message}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(item.timestamp).toLocaleTimeString()}
                                            </p>
                                            {item.depth && (
                                                <Badge variant="outline" className="text-xs h-5">
                                                    Depth {item.depth}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="sources" className="mt-0 flex-1 p-0">
                    <ScrollArea className="h-[50vh]">
                        <div className="space-y-4 p-3">
                            {state.sources.map((source, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col gap-1"
                                >
                                    <div className="flex items-start gap-2">
                                        <FileText className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
                                        <div className="flex-1 min-w-0">
                                            <a
                                                href={source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium hover:underline break-words flex items-center gap-1"
                                            >
                                                {source.title}
                                                <ExternalLink className="h-3 w-3 inline shrink-0" />
                                            </a>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="text-xs text-muted-foreground truncate">
                                                    {new URL(source.url).hostname}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Relevance: {Math.round(source.relevance * 100)}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {state.sources.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    No sources found yet...
                                </p>
                            )}
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </motion.div>
    );
} 