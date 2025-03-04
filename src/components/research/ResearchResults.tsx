'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Loader2 } from 'lucide-react'

interface Source {
    url: string
    title: string
    description?: string
    relevance?: number
}

interface ResearchResult {
    summary?: string
    keyFindings?: string[]
    sources?: Source[]
}

interface ResearchResultsProps {
    result: ResearchResult
    isLoading?: boolean
    progress?: {
        current: number
        total: number
    }
}

export function ResearchResults({ result, isLoading, progress }: ResearchResultsProps) {
    if (isLoading) {
        return (
            <Card className="p-4">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="text-sm text-muted-foreground">Analyzing data...</p>
                    {progress && (
                        <div className="w-full space-y-2">
                            <Progress value={(progress.current / progress.total) * 100} />
                            <p className="text-xs text-muted-foreground text-center">
                                {progress.current} of {progress.total} steps completed
                            </p>
                        </div>
                    )}
                </div>
            </Card>
        )
    }

    if (!result.summary && !result.keyFindings && !result.sources?.length) {
        return null
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
        >
            {result.summary && (
                <Card className="p-4">
                    <h3 className="mb-2 font-semibold">Summary</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {result.summary}
                    </p>
                </Card>
            )}

            {result.keyFindings && result.keyFindings.length > 0 && (
                <Card className="p-4">
                    <h3 className="mb-2 font-semibold">Key Findings</h3>
                    <ScrollArea className="h-[200px]">
                        <ul className="space-y-2">
                            {result.keyFindings.map((finding, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-2 text-sm"
                                >
                                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    <span className="text-muted-foreground">{finding}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </ScrollArea>
                </Card>
            )}

            {result.sources && result.sources.length > 0 && (
                <Card className="p-4">
                    <h3 className="mb-2 font-semibold">Sources</h3>
                    <ScrollArea className="h-[200px]">
                        <div className="space-y-3">
                            {result.sources.map((source, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="space-y-1"
                                >
                                    <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-primary hover:underline"
                                    >
                                        {source.title}
                                    </a>
                                    {source.description && (
                                        <p className="text-xs text-muted-foreground">{source.description}</p>
                                    )}
                                    {source.relevance && (
                                        <div className="flex items-center gap-2">
                                            <Progress
                                                value={source.relevance * 100}
                                                className="h-1.5 w-24"
                                            />
                                            <span className="text-xs text-muted-foreground">
                                                {Math.round(source.relevance * 100)}% relevant
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </ScrollArea>
                </Card>
            )}
        </motion.div>
    )
}