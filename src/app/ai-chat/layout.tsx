import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI Chat - Hijraah',
    description: 'Chat with our AI assistant to get immigration help',
}

export default function AIChatLayout({ children }: { children: ReactNode }) {
    return children
} 