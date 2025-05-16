import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Chat History - Hijraah',
    description: 'View your chat history with our AI assistant',
}

export default function ChatHistoryLayout({ children }: { children: ReactNode }) {
    return children
} 