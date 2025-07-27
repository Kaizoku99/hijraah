'use client'

import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface SearchResult {
    id: string
    title: string
    url: string
    snippet: string
    relevanceScore: number
    categories: string[]
    datePublished?: string
    author?: string
}

interface SearchResultsProps {
    results?: SearchResult[]
    isLoading?: boolean
    error?: Error
    onAnalyze?: (result: SearchResult) => void
}

export function SearchResults({
    results,
    isLoading,
    error,
    onAnalyze
}: SearchResultsProps) {
    if (error) {
        return (
            <div className="p-4 text-red-500" role="alert">
                <h3 className="font-bold">Error loading search results</h3>
                <p>{error.message}</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="p-4">
                        <Skeleton className="h-5 w-2/3 mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                        <div className="flex gap-2 mt-3">
                            {Array.from({ length: 2 }).map((_, j) => (
                                <Skeleton key={j} className="h-6 w-16" />
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        )
    }

    if (!results?.length) {
        return (
            <div className="text-center p-4 text-muted-foreground">
                No search results found
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {results.map((result) => (
                <Card key={result.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                        <div className="space-y-1">
                            <h3 className="font-medium">
                                <a
                                    href={result.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    {result.title}
                                </a>
                            </h3>
                            {(result.author || result.datePublished) && (
                                <p className="text-sm text-muted-foreground">
                                    {result.author && `By ${result.author}`}
                                    {result.author && result.datePublished && ' • '}
                                    {result.datePublished && new Date(result.datePublished).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                        <Badge variant="outline">
                            {Math.round(result.relevanceScore * 100)}% Relevant
                        </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                        {result.snippet}
                    </p>

                    <div className="flex items-center gap-3">
                        <div className="flex flex-wrap gap-1">
                            {result.categories.map((category) => (
                                <Badge key={category} variant="secondary">
                                    {category}
                                </Badge>
                            ))}
                        </div>
                        {onAnalyze && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onAnalyze(result)}
                                className="ml-auto"
                            >
                                Analyze
                            </Button>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    )
}