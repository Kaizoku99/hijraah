'use client'

import { Message } from 'ai'
import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UnifiedSuggestionsProps {
    messages: Message[]
    append: (message: Message | Message[]) => Promise<void>
    className?: string
}

// Sample suggested prompts - in production these could be dynamically generated based on context
const initialSuggestions = [
    'Can you explain the Canada Express Entry requirements?',
    'What documents do I need for a US H1B visa?',
    'Compare UK and Australia immigration policies',
    'How long does the immigration process usually take?'
]

const followUpSuggestions = [
    'Can you elaborate on the financial requirements?',
    'What are the next steps in the process?',
    'Are there any exceptions to these rules?'
]

export function UnifiedSuggestions({ messages, append, className }: UnifiedSuggestionsProps) {
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isVisible, setIsVisible] = useState(true)

    // Logic adapted from AISuggestions:
    // Show initial suggestions, then contextual ones, then hide.
    useEffect(() => {
        if (messages.length === 0) {
            // Initial suggestions for new conversations
            setSuggestions(initialSuggestions)
            setIsVisible(true)
        } else if (messages.length === 2) {
            // After first exchange, provide follow-up suggestions
            const lastMessage = messages[messages.length - 1]
            if (lastMessage.role === 'assistant') {
                // Generate contextual suggestions based on the assistant's response
                // This could be enhanced with an API call to generate dynamic suggestions
                setSuggestions(followUpSuggestions) // Use placeholder follow-ups
                setIsVisible(true)
            } else {
                // If user sent the second message, hide suggestions for now
                setIsVisible(false)
            }
        } else if (messages.length > 2) {
            // Hide suggestions after the initial exchange (adjust threshold as needed)
            setIsVisible(false)
        } else {
            // Keep suggestions hidden if only one message exists (user's first message)
            setIsVisible(false)
        }
    }, [messages])

    if (!isVisible || suggestions.length === 0) return null

    const handleSuggestionClick = (suggestion: string) => {
        append({
            id: crypto.randomUUID(), // Use crypto.randomUUID()
            content: suggestion,
            role: 'user',
        })
        // No need to explicitly setIsVisible(false) here,
        // the useEffect will handle it when messages update.
    }

    return (
        // Apply className to the root div
        <div className={cn('mb-4', className)}>
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
                        onClick={() => handleSuggestionClick(suggestion)} // Use handler
                    >
                        {suggestion}
                    </Button>
                ))}
            </div>
        </div>
    );
} 