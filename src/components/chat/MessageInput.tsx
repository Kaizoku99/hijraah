'use client'

import { useState, useRef } from 'react'
import { PaperclipIcon, SendIcon, TelescopeIcon, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useDeepResearch } from '@/hooks/useDeepResearch'

interface MessageInputProps {
    onSendMessage: (content: string) => Promise<void>
    className?: string
}

export function MessageInput({ onSendMessage, className }: MessageInputProps) {
    const [content, setContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeepResearchMode, setIsDeepResearchMode] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { startResearch, isLoading: isResearchLoading } = useDeepResearch()

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

                // Also send the message as a regular chat message
                await onSendMessage(`🔍 Researching: ${content.trim()}`);
            } else {
                // Regular message
                await onSendMessage(content.trim())
            }
            setContent('')
            textareaRef.current?.focus()
        } catch (error) {
            console.error('Error sending message:', error);
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
        setIsDeepResearchMode(!isDeepResearchMode);
        // Focus the textarea after toggling
        setTimeout(() => {
            textareaRef.current?.focus();
        }, 0);
    }

    const isLoading = isSubmitting || isResearchLoading;
    const buttonDisabled = !content.trim() || isLoading;

    return (
        <div className={cn('flex items-end gap-2 border-t p-4', className)}>
            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={isDeepResearchMode ? "default" : "outline"}
                            size="icon"
                            className={cn(
                                "shrink-0 transition-all duration-200",
                                isDeepResearchMode && "bg-primary text-primary-foreground shadow-md"
                            )}
                            onClick={toggleDeepResearchMode}
                        >
                            {isDeepResearchMode ? (
                                <TelescopeIcon className="h-5 w-5" />
                            ) : (
                                <SearchIcon className="h-5 w-5" />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                        <p>
                            {isDeepResearchMode
                                ? "Deep Research Mode: AI will search the web for comprehensive information"
                                : "Click to enable Deep Research Mode for web-based research"}
                        </p>
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

            <div className="relative flex-1">
                <Textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isDeepResearchMode
                        ? "Enter a research question..."
                        : "Type a message..."}
                    className={cn(
                        "min-h-[2.5rem] resize-none pr-12",
                        isDeepResearchMode && "border-primary"
                    )}
                    rows={1}
                />

                {isDeepResearchMode && (
                    <div className="absolute right-3 top-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                        DEEP RESEARCH
                    </div>
                )}
            </div>

            <Button
                variant="default"
                size="icon"
                className="shrink-0"
                disabled={buttonDisabled}
                onClick={() => void handleSubmit()}
            >
                <SendIcon className="h-5 w-5" />
            </Button>
        </div>
    )
}