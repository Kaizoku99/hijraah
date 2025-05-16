'use client'

import { useState, useEffect } from 'react'
import { Message } from 'ai'
import { InfoIcon, ExternalLink, FileText, BookOpen, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UnifiedMarkdown } from './UnifiedMarkdown'

// Types for research data
interface SourceData {
    url: string
    title: string
    description: string
    type: 'web' | 'pdf' | 'document' | 'database'
    relevance: number
}

interface ActivityData {
    type: 'search' | 'extract' | 'analyze' | 'reasoning' | 'synthesis' | 'thought'
    message: string
    status: 'pending' | 'complete' | 'error'
    depth: number
    timestamp: number
}

interface ResearchDepth {
    current: number
    max: number
}

interface ResearchProgress {
    completedSteps: number
    totalSteps: number
}

interface FindingData {
    content: string
    confidence: number
    sources: string[]
    timestamp: number
}

interface UnifiedResearchContainerProps {
    chatId: string
    messages: Message[]
    append: (message: Message | Message[]) => Promise<void>
    isLoading: boolean
    isVisible: boolean
    className?: string
}

export function UnifiedResearchContainer({
    chatId,
    messages,
    append,
    isLoading,
    isVisible,
    className
}: UnifiedResearchContainerProps) {
    const [sources, setSources] = useState<SourceData[]>([])
    const [activities, setActivities] = useState<ActivityData[]>([])
    const [findings, setFindings] = useState<FindingData[]>([])
    const [depth, setDepth] = useState<ResearchDepth>({ current: 0, max: 3 })
    const [progress, setProgress] = useState<ResearchProgress>({
        completedSteps: 0,
        totalSteps: 0
    })
    const [activeTab, setActiveTab] = useState('sources')
    const [isResearching, setIsResearching] = useState(false)

    // Load data from sessionStorage on initial render
    useEffect(() => {
        if (!chatId) return

        const storedSources = sessionStorage.getItem(`sources-${chatId}`)
        const storedActivities = sessionStorage.getItem(`activities-${chatId}`)
        const storedDepth = sessionStorage.getItem(`depth-${chatId}`)
        const storedProgress = sessionStorage.getItem(`progress-${chatId}`)
        const storedFindings = sessionStorage.getItem(`findings-${chatId}`)

        if (storedSources) setSources(JSON.parse(storedSources))
        if (storedActivities) setActivities(JSON.parse(storedActivities))
        if (storedDepth) setDepth(JSON.parse(storedDepth))
        if (storedProgress) setProgress(JSON.parse(storedProgress))
        if (storedFindings) setFindings(JSON.parse(storedFindings))
    }, [chatId])

    // Save data to sessionStorage when it changes
    useEffect(() => {
        if (!chatId) return

        sessionStorage.setItem(`sources-${chatId}`, JSON.stringify(sources))
        sessionStorage.setItem(`activities-${chatId}`, JSON.stringify(activities))
        sessionStorage.setItem(`depth-${chatId}`, JSON.stringify(depth))
        sessionStorage.setItem(`progress-${chatId}`, JSON.stringify(progress))
        sessionStorage.setItem(`findings-${chatId}`, JSON.stringify(findings))
    }, [chatId, sources, activities, depth, progress, findings])

    // Calculate progress percentage
    const progressPercentage = progress.totalSteps > 0
        ? Math.round((progress.completedSteps / progress.totalSteps) * 100)
        : 0

    // Start research based on the current chat messages
    const startResearch = async () => {
        if (isResearching || isLoading) return

        setIsResearching(true)

        // Reset research state
        const newActivities: ActivityData[] = [
            {
                type: 'search',
                message: 'Starting research based on chat conversation',
                status: 'pending',
                depth: 1,
                timestamp: Date.now()
            }
        ]

        setActivities(newActivities)
        setProgress({ completedSteps: 0, totalSteps: 5 })
        setDepth({ current: 1, max: 3 })

        // Extract research query from messages
        const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
        const researchQuery = lastUserMessage?.content || 'Research this topic'

        // Create a system message to instruct AI to perform research
        const systemMessage = {
            id: Date.now().toString(),
            role: 'system' as const,
            content: `Perform deep research on: ${researchQuery}. 
      Format your response as a JSON object with the following keys:
      - sources: array of source objects {url, title, description, type, relevance}
      - activities: array of research activity objects {type, message, status, depth}
      - findings: array of finding objects {content, confidence, sources}`
        }

        // Append system message requesting research
        await append(systemMessage)

        // After AI response, update research data
        // This would be handled by a real API in production
        // For demo, we'll add some mock data with timeouts
        simulateResearchProgress()
    }

    // Simulate research progress with timeouts
    const simulateResearchProgress = () => {
        // Mark first activity as complete
        setTimeout(() => {
            setActivities(prev => [
                { ...prev[0], status: 'complete' },
                {
                    type: 'search',
                    message: 'Searching for relevant immigration resources',
                    status: 'pending',
                    depth: 1,
                    timestamp: Date.now()
                }
            ])
            setProgress(prev => ({ ...prev, completedSteps: 1 }))

            // Add a mock source
            setSources([
                {
                    url: 'https://travel.state.gov/content/travel/en/us-visas.html',
                    title: 'U.S. Visas - United States Department of State',
                    description: 'Official U.S. visa information from the Department of State',
                    type: 'web',
                    relevance: 0.95
                }
            ])
        }, 2000)

        // Continue adding activities and sources
        setTimeout(() => {
            setActivities(prev => [
                ...prev.slice(0, 1),
                { ...prev[1], status: 'complete' },
                {
                    type: 'extract',
                    message: 'Extracting key information from visa resources',
                    status: 'pending',
                    depth: 1,
                    timestamp: Date.now()
                }
            ])
            setProgress(prev => ({ ...prev, completedSteps: 2 }))

            // Add more sources
            setSources(prev => [
                ...prev,
                {
                    url: 'https://www.uscis.gov/green-card',
                    title: 'Green Card Eligibility Categories',
                    description: 'Information about permanent residence eligibility',
                    type: 'web',
                    relevance: 0.9
                }
            ])
        }, 4000)

        // Add synthesis and findings
        setTimeout(() => {
            setActivities(prev => [
                ...prev.slice(0, 2),
                { ...prev[2], status: 'complete' },
                {
                    type: 'synthesis',
                    message: 'Synthesizing immigration pathway information',
                    status: 'pending',
                    depth: 2,
                    timestamp: Date.now()
                }
            ])
            setProgress(prev => ({ ...prev, completedSteps: 3 }))
            setDepth(prev => ({ ...prev, current: 2 }))

            // Add a finding
            setFindings([
                {
                    content: 'There are multiple pathways to immigrate to the United States, including family-sponsored, employment-based, and humanitarian programs.',
                    confidence: 0.9,
                    sources: ['U.S. Visas - United States Department of State'],
                    timestamp: Date.now()
                }
            ])
        }, 6000)

        // Complete research
        setTimeout(() => {
            setActivities(prev => [
                ...prev.slice(0, 3),
                { ...prev[3], status: 'complete' }
            ])
            setProgress(prev => ({ ...prev, completedSteps: 4 }))

            // Add more findings
            setFindings(prev => [
                ...prev,
                {
                    content: 'Employment-based immigration typically requires employer sponsorship and may involve labor certification.',
                    confidence: 0.85,
                    sources: ['Green Card Eligibility Categories'],
                    timestamp: Date.now()
                }
            ])

            setIsResearching(false)
        }, 8000)
    }

    if (!isVisible) return null

    // If no data is available yet, show a start screen
    if (sources.length === 0 && activities.length === 0) {
        return (
            <div className="flex flex-col gap-4 p-4">
                <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Research Assistant</AlertTitle>
                    <AlertDescription>
                        Start a deep research session based on your chat conversation.
                    </AlertDescription>
                </Alert>

                <Button
                    onClick={startResearch}
                    disabled={isResearching || isLoading}
                    className="w-full"
                >
                    {isResearching ? 'Researching...' : 'Start Research'}
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <Progress value={progressPercentage} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                    {progress.completedSteps} / {progress.totalSteps} steps
                </div>
            </div>

            {depth.max > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Research depth:</span>
                    <div className="flex-1">
                        <Progress value={(depth.current / depth.max) * 100} className="h-1" />
                    </div>
                    <span>{depth.current} / {depth.max}</span>
                </div>
            )}

            <Tabs defaultValue="sources" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="sources">Sources ({sources.length})</TabsTrigger>
                    <TabsTrigger value="activities">Activities ({activities.length})</TabsTrigger>
                    <TabsTrigger value="findings">Findings ({findings.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="sources" className="mt-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Research Sources</CardTitle>
                            <CardDescription>
                                Web pages and documents used in this research
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px] pr-4">
                                <div className="space-y-4">
                                    {sources.map((source, index) => (
                                        <div key={index} className="flex flex-col space-y-1">
                                            <div className="flex items-start">
                                                <div className="mr-2 mt-0.5">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                                                        {source.title}
                                                        <ExternalLink className="ml-1 h-3 w-3" />
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{source.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="activities" className="mt-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Research Activities</CardTitle>
                            <CardDescription>
                                Steps taken during the research process
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px] pr-4">
                                <div className="space-y-4">
                                    {activities.map((activity, index) => (
                                        <div key={index} className="flex items-start pb-2 border-b border-muted last:border-0">
                                            <div className="mr-2 mt-1">
                                                {activity.type === 'search' && <Search className="h-4 w-4 text-blue-500" />}
                                                {activity.type === 'extract' && <FileText className="h-4 w-4 text-green-500" />}
                                                {activity.type === 'analyze' && <BookOpen className="h-4 w-4 text-amber-500" />}
                                                {activity.type === 'reasoning' && <InfoIcon className="h-4 w-4 text-indigo-500" />}
                                                {(activity.type === 'synthesis' || activity.type === 'thought') && (
                                                    <BookOpen className="h-4 w-4 text-purple-500" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant={activity.status === 'complete' ? 'default' :
                                                        activity.status === 'pending' ? 'outline' : 'destructive'}
                                                        className="text-xs font-normal">
                                                        {activity.status}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        Depth: {activity.depth}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-sm">{activity.message}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="findings" className="mt-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Research Findings</CardTitle>
                            <CardDescription>
                                Key insights discovered during research
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px] pr-4">
                                {findings.length > 0 ? (
                                    <div className="space-y-4">
                                        {findings.map((finding, index) => (
                                            <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                                                <p className="text-sm mb-2">{finding.content}</p>
                                                <div className="flex text-xs text-muted-foreground gap-2">
                                                    <span>Confidence: {(finding.confidence * 100).toFixed(0)}%</span>
                                                    <span>Sources: {finding.sources.join(', ')}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        Research findings will appear here when completed.
                                    </div>
                                )}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {isResearching && (
                <div className="text-center text-sm text-muted-foreground">
                    AI is performing deep research...
                </div>
            )}
        </div>
    )
} 