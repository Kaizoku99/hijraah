'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TimelineView } from './TimelineView'
import { CredibilityView } from './CredibilityView'
import { CrossReferenceView } from './CrossReferenceView'
import { SearchResults } from './SearchResults'
import { useSearch } from '@/hooks/useSearch'
import { useAnalysis } from '@/hooks/useAnalysis'
import { AIModelSelector } from './AIModelSelector'

export function ResearchInterface() {
    const t = useTranslations('research.interface')
    const [query, setQuery] = useState('')
    const [selectedModel, setSelectedModel] = useState('gpt-4')

    const {
        results,
        isSearching,
        error: searchError,
        search
    } = useSearch()

    const {
        timeline,
        credibility,
        crossReferences,
        isAnalyzing,
        error: analysisError,
        analyze
    } = useAnalysis()

    const handleSearch = async () => {
        if (!query.trim()) return

        await search({
            query,
            model: selectedModel,
            options: {
                searchMode: 'hybrid',
                rerank: true
            }
        })
    }

    const handleAnalyze = async () => {
        if (results.length === 0) return

        await analyze({
            sources: results,
            model: selectedModel,
            options: {
                timeline: {
                    granularity: 'month',
                    includeTrends: true
                },
                credibility: {
                    minConfidence: 0.5
                },
                crossReference: {
                    minSimilarity: 0.3,
                    maxConnections: 5
                }
            }
        })
    }

    return (
        <div className="container mx-auto p-4 space-y-4">
            <div className="flex gap-4">
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('search.placeholder')}
                    className="flex-1"
                />
                <AIModelSelector
                    value={selectedModel}
                    onChange={setSelectedModel}
                />
                <Button
                    onClick={handleSearch}
                    disabled={isSearching || !query.trim()}
                >
                    {isSearching ? t('search.searching') : t('search.button')}
                </Button>
            </div>

            {results.length > 0 && (
                <>
                    <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="w-full"
                    >
                        {isAnalyzing ? t('search.analyzing') : t('search.analyze')}
                    </Button>

                    <Tabs defaultValue="results">
                        <TabsList>
                            <TabsTrigger value="results">{t('tabs.results')}</TabsTrigger>
                            <TabsTrigger value="timeline">{t('tabs.timeline')}</TabsTrigger>
                            <TabsTrigger value="credibility">{t('tabs.credibility')}</TabsTrigger>
                            <TabsTrigger value="connections">{t('tabs.connections')}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="results">
                            <Card className="p-4">
                                <ScrollArea className="h-[600px]">
                                    <SearchResults
                                        results={results}
                                        isLoading={isSearching}
                                        error={searchError}
                                    />
                                </ScrollArea>
                            </Card>
                        </TabsContent>

                        <TabsContent value="timeline">
                            <Card className="p-4">
                                <ScrollArea className="h-[600px]">
                                    <TimelineView
                                        data={timeline}
                                        isLoading={isAnalyzing && !timeline.length}
                                        error={analysisError}
                                    />
                                </ScrollArea>
                            </Card>
                        </TabsContent>

                        <TabsContent value="credibility">
                            <Card className="p-4">
                                <ScrollArea className="h-[600px]">
                                    <CredibilityView
                                        data={credibility}
                                        isLoading={isAnalyzing && !credibility.length}
                                        error={analysisError}
                                    />
                                </ScrollArea>
                            </Card>
                        </TabsContent>

                        <TabsContent value="connections">
                            <Card className="p-4">
                                <ScrollArea className="h-[600px]">
                                    <CrossReferenceView
                                        data={crossReferences}
                                        isLoading={isAnalyzing && !crossReferences.length}
                                        error={analysisError}
                                    />
                                </ScrollArea>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </>
            )}
        </div>
    )
}