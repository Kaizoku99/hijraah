'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

export default function AIChatPage() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to the new chat page
        router.push('/ai-chat/new')
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-32 w-full max-w-2xl mb-4" />
            <Skeleton className="h-32 w-full max-w-2xl" />
        </div>
    )
} 