import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProcessingProgressProps {
    documentId: string;
    onComplete?: (success: boolean) => void;
    pollInterval?: number; // in milliseconds
    showDetails?: boolean;
}

type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed';

interface ProcessingState {
    status: ProcessingStatus;
    progress: number;
    error?: string;
    lastUpdated: Date;
}

export function ProcessingProgress({
    documentId,
    onComplete,
    pollInterval = 2000, // default: poll every 2 seconds
    showDetails = false
}: ProcessingProgressProps) {
    const [processingState, setProcessingState] = useState<ProcessingState>({
        status: 'pending',
        progress: 0,
        lastUpdated: new Date()
    });

    // Fetch processing status from the API
    const fetchProcessingStatus = async () => {
        try {
            const response = await fetch(`/api/ocr/status/${documentId}`);

            if (!response.ok) {
                throw new Error(`Error fetching processing status: ${response.statusText}`);
            }

            const data = await response.json();

            setProcessingState({
                status: data.status,
                progress: data.progress || 0,
                error: data.error,
                lastUpdated: new Date()
            });

            // Call onComplete if processing is completed or failed
            if (data.status === 'completed' && onComplete) {
                onComplete(true);
            } else if (data.status === 'failed' && onComplete) {
                onComplete(false);
            }

            return data.status;
        } catch (error) {
            console.error('Error fetching processing status:', error);

            setProcessingState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Unknown error',
                lastUpdated: new Date()
            }));

            return 'error';
        }
    };

    // Set up polling to fetch status updates
    useEffect(() => {
        // Only poll if processing is pending or in progress
        if (processingState.status !== 'completed' && processingState.status !== 'failed') {
            const intervalId = setInterval(async () => {
                const status = await fetchProcessingStatus();

                // Stop polling if processing is completed or failed
                if (status === 'completed' || status === 'failed') {
                    clearInterval(intervalId);
                }
            }, pollInterval);

            // Initial fetch
            fetchProcessingStatus();

            // Clean up the interval when the component unmounts
            return () => clearInterval(intervalId);
        }
    }, [documentId, pollInterval, processingState.status]);

    // Format the time elapsed
    const formatTimeElapsed = () => {
        const elapsed = new Date().getTime() - processingState.lastUpdated.getTime();
        const seconds = Math.floor(elapsed / 1000);

        if (seconds < 60) {
            return `${seconds}s ago`;
        } else if (seconds < 3600) {
            return `${Math.floor(seconds / 60)}m ${seconds % 60}s ago`;
        } else {
            return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m ago`;
        }
    };

    // Render different content based on processing status
    const renderStatusContent = () => {
        switch (processingState.status) {
            case 'pending':
                return (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Waiting to start processing...</span>
                    </div>
                );

            case 'processing':
                return (
                    <div className="flex items-center space-x-2 text-primary">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Processing document... ({processingState.progress}%)</span>
                    </div>
                );

            case 'completed':
                return (
                    <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Processing completed successfully</span>
                    </div>
                );

            case 'failed':
                return (
                    <div className="flex items-center space-x-2 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span>Processing failed: {processingState.error || 'Unknown error'}</span>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Card className="mb-4">
            <CardContent className="py-4">
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="font-medium">Document Processing</div>
                        {showDetails && (
                            <div className="text-xs text-muted-foreground">
                                Last updated: {formatTimeElapsed()}
                            </div>
                        )}
                    </div>

                    <Progress
                        value={processingState.progress}
                        className="h-2"
                        color={
                            processingState.status === 'failed'
                                ? 'bg-red-600'
                                : processingState.status === 'completed'
                                    ? 'bg-green-600'
                                    : undefined
                        }
                    />

                    <div className="text-sm">
                        {renderStatusContent()}
                    </div>

                    {showDetails && processingState.status === 'processing' && (
                        <div className="text-xs text-muted-foreground">
                            <p>Processing large documents may take several minutes.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
} 