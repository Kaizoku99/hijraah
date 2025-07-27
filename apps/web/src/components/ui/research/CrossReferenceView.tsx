'use client'

import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface CrossReference {
    id: string
    sourceTitle: string
    sourceUrl: string
    targetTitle: string
    targetUrl: string
    similarity: number
    matchingConcepts: string[]
    context: string
}

interface CrossReferenceViewProps {
    data?: CrossReference[]
    isLoading?: boolean
    error?: Error
}

export function CrossReferenceView({ data, isLoading, error }: CrossReferenceViewProps) {
    if (error) {
        return (
            <div className="p-4 text-red-500" role="alert">
                <h3 className="font-bold">Error loading cross references</h3>
                <p>{error.message}</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="p-4">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-4" />
                        <div className="flex gap-2">
                            {Array.from({ length: 3 }).map((_, j) => (
                                <Skeleton key={j} className="h-6 w-16" />
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        )
    }

    if (!data?.length) {
        return (
            <div className="text-center p-4 text-muted-foreground">
                No cross references available
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {data.map((reference) => (
                <Card key={reference.id} className="p-4">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="font-medium">
                                <a
                                    href={reference.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    {reference.sourceTitle}
                                </a>
                            </h3>
                            <div className="flex items-center mt-1">
                                <span className="text-sm text-muted-foreground">References:</span>
                                <a
                                    href={reference.targetUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm ml-1 hover:underline"
                                >
                                    {reference.targetTitle}
                                </a>
                            </div>
                        </div>
                        <Badge variant="outline">
                            {Math.round(reference.similarity * 100)}% Match
                        </Badge>
                    </div>

                    <div className="space-y-2">
                        <div>
                            <h4 className="text-sm font-medium mb-1">Matching Concepts</h4>
                            <div className="flex flex-wrap gap-1">
                                {reference.matchingConcepts.map((concept) => (
                                    <Badge key={concept} variant="secondary">
                                        {concept}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mb-1">Context</h4>
                            <p className="text-sm text-muted-foreground">
                                {reference.context}
                            </p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}