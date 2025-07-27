'use client'

import { format } from 'date-fns'
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import type { Database } from '@/types/supabase'

import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

interface TimelineEvent {
    id: string
    case_id: string
    status: 'pending' | 'in_progress' | 'completed' | 'rejected'
    message: string
    created_at: string
    updated_at: string
    metadata?: Record<string, any>
}

type DatabaseChangesPayload = RealtimePostgresChangesPayload<{
    [key: string]: any
}>

interface CaseTimelineProps {
    caseId: string
    className?: string
}

const statusIcons = {
    pending: Clock,
    in_progress: AlertCircle,
    completed: CheckCircle2,
    rejected: XCircle,
}

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
}

export const CaseTimeline = ({ caseId, className }: CaseTimelineProps) => {
    const t = useTranslations('cases')
    const [events, setEvents] = useState<TimelineEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data, error } = await supabase
                    .from('case_events')
                    .select('*')
                    .eq('case_id', caseId)
                    .order('created_at', { ascending: false })

                if (error) throw error
                setEvents(data || [])
            } catch (err) {
                console.error('Error fetching timeline events:', err)
                setError(t('timeline.fetchError'))
            } finally {
                setIsLoading(false)
            }
        }

        // Subscribe to real-time updates
        const channel = supabase
            .channel(`case_events:${caseId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'case_events',
                    filter: `case_id=eq.${caseId}`,
                },
                (payload: DatabaseChangesPayload) => {
                    if (payload.eventType === 'INSERT') {
                        setEvents((prev) => [payload.new as TimelineEvent, ...prev])
                    } else if (payload.eventType === 'UPDATE') {
                        setEvents((prev) =>
                            prev.map((event) =>
                                event.id === (payload.new as TimelineEvent).id
                                    ? (payload.new as TimelineEvent)
                                    : event
                            )
                        )
                    } else if (payload.eventType === 'DELETE') {
                        setEvents((prev) =>
                            prev.filter((event) => event.id !== (payload.old as TimelineEvent).id)
                        )
                    }
                }
            )
            .subscribe()

        fetchEvents()

        return () => {
            channel.unsubscribe()
        }
    }, [caseId, supabase, t])

    if (error) {
        return (
            <Card className={cn('w-full', className)}>
                <CardContent className="p-6">
                    <div className="flex items-center justify-center text-red-500">
                        <AlertCircle className="mr-2 h-5 w-5" />
                        <span>{error}</span>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className={cn('w-full', className)}>
            <CardHeader>
                <CardTitle>{t('timeline.title')}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                        {t('timeline.noEvents')}
                    </div>
                ) : (
                    <div className="relative space-y-8">
                        {events.map((event, index) => {
                            const StatusIcon = statusIcons[event.status]
                            return (
                                <div
                                    key={event.id}
                                    className={cn(
                                        'flex gap-4',
                                        index !== events.length - 1 &&
                                        'pb-8 relative before:absolute before:left-6 before:top-12 before:h-full before:w-px before:bg-border'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'relative z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-background',
                                            statusColors[event.status]
                                        )}
                                    >
                                        <StatusIcon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline">{t(`status.${event.status}`)}</Badge>
                                            <time className="text-sm text-muted-foreground">
                                                {format(new Date(event.created_at), 'PPp')}
                                            </time>
                                        </div>
                                        <p className="text-sm">{event.message}</p>
                                        {event.metadata && Object.keys(event.metadata).length > 0 && (
                                            <div className="mt-2 text-sm text-muted-foreground">
                                                {Object.entries(event.metadata).map(([key, value]) => (
                                                    <div key={key} className="flex items-center gap-2">
                                                        <span className="font-medium">{key}:</span>
                                                        <span>{String(value)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default CaseTimeline 