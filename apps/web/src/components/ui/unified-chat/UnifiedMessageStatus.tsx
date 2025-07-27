'use client'

import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

interface UnifiedMessageStatusProps {
    messageCount: number
    isLoading: boolean
    className?: string
}

export function UnifiedMessageStatus({
    messageCount,
    isLoading,
    className
}: UnifiedMessageStatusProps) {
    return (
        <div className={cn('text-xs text-muted-foreground mt-2 flex items-center justify-between', className)}>
            <span>
                {messageCount} {messageCount === 1 ? 'message' : 'messages'}
            </span>
            {isLoading && (
                <div className="flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Generating...</span>
                </div>
            )}
        </div>
    )
} 