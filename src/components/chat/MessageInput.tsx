'use client'

import { useState, useRef } from 'react'
import { PaperclipIcon, SendIcon, SearchIcon, TelescopeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useDeepResearch } from '@/hooks/useDeepResearch'
import { DeepResearchComponent } from '@/components/DeepResearch'

interface MessageInputProps {
    onSendMessage: (content: string) => Promise<void>
    className?: string
}

export function MessageInput({ onSendMessage, className }: MessageInputProps) {
    const [content, setContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeepResearchMode, setIsDeepResearchMode] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { startResearch, state: deepResearchState } = useDeepResearch()

    const handleSubmit = async () => {
        if (!content.trim() || isSubmitting) return

        setIsSubmitting(true)
        try {
            if (isDeepResearchMode) {
                // Start deep research
                await startResearch({
                    query: content.trim(),
                    maxDepth: 3
                });
            } else {
                // Regular message
                await onSendMessage(content.trim())
            }
            setContent('')
            textareaRef.current?.focus()
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            void handleSubmit()
        }
    }

    const toggleDeepResearchMode = () => {
        setIsDeepResearchMode(!isDeepResearchMode)
    }

    return (
        <>
            <div className={cn('flex items-end gap-2 border-t p-4', className)}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={isDeepResearchMode ? "default" : "ghost"}
                                size="icon"
                                className="shrink-0"
                                onClick={toggleDeepResearchMode}
                            >
                                {isDeepResearchMode ? (
                                    <TelescopeIcon className="h-5 w-5" />
                                ) : (
                                    <SearchIcon className="h-5 w-5" />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            {isDeepResearchMode
                                ? "Deep Research Mode (comprehensive analysis)"
                                : "Normal Search Mode"}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => {
                        // TODO: Implement file upload
                    }}
                >
                    <PaperclipIcon className="h-5 w-5" />
                </Button>
                <Textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isDeepResearchMode
                        ? "Enter a research question..."
                        : "Type a message..."}
                    className="min-h-[2.5rem] resize-none"
                    rows={1}
                />
                <Button
                    variant="default"
                    size="icon"
                    className="shrink-0"
                    disabled={!content.trim() || isSubmitting}
                    onClick={() => void handleSubmit()}
                >
                    <SendIcon className="h-5 w-5" />
                </Button>
            </div>

            {/* Render the Deep Research component if active */}
            {deepResearchState.isActive && <DeepResearchComponent />}
        </>
    )
}