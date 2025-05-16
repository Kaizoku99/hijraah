'use client'

import { useState, useEffect } from 'react'
import { Message } from 'ai'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AISuggestionsProps {
    messages: Message[]
    append: (message: Message | Message[]) => void
    className?: string
}

export function AISuggestions({
    messages,
    append,
    className
}: AISuggestionsProps) {
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isVisible, setIsVisible] = useState(true)

    // Generate suggestions based on the conversation
    useEffect(() => {
        if (messages.length === 0) {
            // Initial suggestions for new conversations
            setSuggestions([
                'What documents do I need for a work visa?',
                'How do I check my immigration status?',
                'What are the eligibility requirements for permanent residency?'
            ])
            setIsVisible(true)
        } else if (messages.length === 2) {
            // After first exchange, provide follow-up suggestions
            const lastMessage = messages[messages.length - 1]
            if (lastMessage.role === 'assistant') {
                // Generate contextual suggestions based on the assistant's response
                // This could be enhanced with an API call to generate dynamic suggestions
                setSuggestions([
                    'Can you explain the process in more detail?',
                    'What documents will I need to provide?',
                    'How long does this process usually take?'
                ])
                setIsVisible(true)
            }
        } else if (messages.length > 4) {
            // Hide suggestions after a few exchanges
            setIsVisible(false)
        }
    }, [messages])

    const handleSuggestionClick = (suggestion: string) => {
        append({
            id: crypto.randomUUID(),
            role: 'user',
            content: suggestion
        })
        setIsVisible(false)
    }

    if (!isVisible || suggestions.length === 0) {
        return null
    }

    return (
        <div className={cn('mt-4 flex flex-wrap gap-2', className)}>
            {suggestions.map((suggestion, index) => (
                <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleSuggestionClick(suggestion)}
                >
                    {suggestion}
                </Button>
            ))}
        </div>
    )
} 