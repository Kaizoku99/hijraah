'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useDeepResearch } from '@/hooks/useDeepResearch';
import { DeepResearchComponent } from '@/components/DeepResearch';

export default function ResearchTestPage() {
    const [query, setQuery] = useState('');
    const { startResearch, addSampleData, isLoading, error, state } = useDeepResearch();

    const handleStartResearch = async () => {
        if (!query.trim()) return;

        await startResearch({
            query: query.trim(),
            maxDepth: 3
        });
    };

    const handleAddSampleData = () => {
        addSampleData(query || 'Immigration requirements for Canada');
    };

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">Deep Research Test Page</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Start Deep Research</CardTitle>
                        <CardDescription>
                            Test the Deep Research functionality by entering a query
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <Input
                                placeholder="Enter research query..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />

                            {error && (
                                <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={handleAddSampleData}
                        >
                            Add Sample Data
                        </Button>
                        <Button
                            onClick={handleStartResearch}
                            disabled={isLoading || !query.trim()}
                        >
                            {isLoading ? 'Loading...' : 'Start Research'}
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Research State</CardTitle>
                        <CardDescription>
                            Current state of the deep research
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm">
                            <div>
                                <span className="font-medium">Active:</span> {state.isActive ? 'Yes' : 'No'}
                            </div>
                            <div>
                                <span className="font-medium">Current Depth:</span> {state.currentDepth}
                            </div>
                            <div>
                                <span className="font-medium">Max Depth:</span> {state.maxDepth}
                            </div>
                            <div>
                                <span className="font-medium">Progress:</span> {state.completedSteps}/{state.totalExpectedSteps}
                            </div>
                            <div>
                                <span className="font-medium">Sources:</span> {state.sources.length}
                            </div>
                            <div>
                                <span className="font-medium">Activities:</span> {state.activity.length}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Render Deep Research component embedded in page */}
            <div className="mt-8">
                {state.isActive ? (
                    <DeepResearchComponent isFloating={false} />
                ) : (
                    <Card className="bg-muted p-6 text-center text-muted-foreground">
                        Deep Research is not active. Start a research query to see results.
                    </Card>
                )}
            </div>
        </div>
    );
} 