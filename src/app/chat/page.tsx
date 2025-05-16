'use client'

import { UnifiedChatContainer } from '@/components/unified-chat'

export default function ChatPage() {
    return (
        <div className="flex h-screen flex-col">
            <main className="flex-1 overflow-hidden">
                <UnifiedChatContainer />
            </main>
        </div>
    )
} 