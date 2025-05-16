'use client'

import { useEffect, useState } from 'react'
import { Message } from 'ai'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

interface UnifiedSuggestionsProps {
    messages: Message[]
    append: (message: Message | Message[]) => Promise<void>
}

// Sample suggested prompts - in production these could be dynamically generated based on context
const defaultSuggestions = [
    'Can you explain the Canada Express Entry requirements?',
    'What documents do I need for a US H1B visa?',
    'Compare UK and Australia immigration policies',
    'How long does the immigration process usually take?'
]

export function UnifiedSuggestions({ messages, append }: UnifiedSuggestionsProps) {
    const [suggestions, setSuggestions] = useState<string[]>(defaultSuggestions)
    const [isVisible, setIsVisible] = useState(true)

    // Hide suggestions after user starts a conversation
    useEffect(() => {
        if (messages.length > 0) {
            setIsVisible(false)
        } else {
            setIsVisible(true)
        }
    }, [messages.length])

    // In a real implementation, you might generate context-aware suggestions
    // based on the conversation history, user preferences, etc.
    useEffect(() => {
        if (messages.length > 0) {
            // Example of generating new suggestions based on last message
            // This could call an API to generate relevant follow-up questions
            const lastMessage = messages[messages.length - 1]

            if (lastMessage.role === 'assistant') {
                // For demonstration purposes we'll just use static suggestions
                // In a real app, you might call an API here
                setIsVisible(true)
            }
        }
    }, [messages])

    if (!isVisible) return null

    return (
        <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Suggested questions</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                            append({
                                id: Date.now().toString(),
                                content: suggestion,
                                role: 'user',
                            })
                            setIsVisible(false)
                        }}
                    >
                        {suggestion}
                    </Button>
                ))}
            </div>
        </div>
    )
} 