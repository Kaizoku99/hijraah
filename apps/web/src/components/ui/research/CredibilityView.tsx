'use client'

import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/shared/ui/atoms/progress'

interface CredibilityFactor {
    id: string
    name: string
    score: number
    description: string
    tags: string[]
}

interface CredibilitySource {
    id: string
    url: string
    title: string
    factors: CredibilityFactor[]
    overallScore: number
}

interface CredibilityViewProps {
    data?: CredibilitySource[]
    isLoading?: boolean
    error?: Error
}

export function CredibilityView({ data, isLoading, error }: CredibilityViewProps) {
    if (error) {
        return (
            <div className="p-4 text-red-500" role="alert">
                <h3 className="font-bold">Error loading credibility data</h3>
                <p>{error.message}</p>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i} className="p-4">
                        <Skeleton className="h-4 w-1/2 mb-4" />
                        <div className="space-y-2">
                            <Skeleton className="h-2 w-full" />
                            <Skeleton className="h-2 w-3/4" />
                        </div>
                    </Card>
                ))}
            </div>
        )
    }

    if (!data?.length) {
        return (
            <div className="text-center p-4 text-muted-foreground">
                No credibility data available
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {data.map((source) => (
                <Card key={source.id} className="p-4">
                    <div className="mb-4">
                        <h3 className="font-medium">
                            <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                {source.title}
                            </a>
                        </h3>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                Overall Credibility:
                            </span>
                            <Progress
                                value={source.overallScore * 100}
                                className="w-32"
                                aria-label="Overall credibility score"
                            />
                            <span className="text-sm font-medium">
                                {Math.round(source.overallScore * 100)}%
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {source.factors.map((factor) => (
                            <div key={factor.id} className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{factor.name}</span>
                                    <span className="text-sm text-muted-foreground">
                                        {Math.round(factor.score * 100)}%
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {factor.description}
                                </p>
                                <div className="flex gap-1 flex-wrap">
                                    {factor.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            ))}
        </div>
    )
}