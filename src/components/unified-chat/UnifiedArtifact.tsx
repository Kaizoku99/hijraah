'use client'

import { useState } from 'react'
import { Attachment, Message } from 'ai'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UnifiedMarkdown } from './UnifiedMarkdown'

// Extend the Attachment type to include the id property
interface ExtendedAttachment extends Attachment {
    id: string;
}

interface UnifiedArtifactProps {
    chatId: string
    input: string
    setInput: (value: string) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
    isLoading: boolean
    stop: () => void
    attachments: ExtendedAttachment[]
    setAttachments: (attachments: ExtendedAttachment[]) => void
    append: (message: Message | Message[]) => Promise<void>
    messages: Message[]
    setMessages: (messages: Message[]) => void
    reload: () => Promise<void>
    isVisible: boolean
    setIsVisible: (isVisible: boolean) => void
    isReadonly?: boolean
}

export function UnifiedArtifact({
    chatId,
    input,
    setInput,
    handleSubmit,
    isLoading,
    stop,
    attachments,
    setAttachments,
    append,
    messages,
    setMessages,
    reload,
    isVisible,
    setIsVisible,
    isReadonly = false
}: UnifiedArtifactProps) {
    const [activeTab, setActiveTab] = useState<'document' | 'context'>('document')
    const [documentContent, setDocumentContent] = useState<string>('')
    const [isGenerating, setIsGenerating] = useState(false)

    // Extract document content from a message
    const extractDocumentContent = (message: Message) => {
        // Look for a markdown code block that indicates a document
        const match = message.content.match(/```(\w+)?\n([\s\S]*?)```/)
        if (match) {
            return match[2]
        }

        return message.content
    }

    const handleGenerateDocument = async () => {
        setIsGenerating(true)

        try {
            // Create a system message with the correct type
            const systemMessage = {
                id: Date.now().toString(),
                role: 'system' as const, // Use const assertion to fix type
                content: 'Generate a comprehensive document based on the conversation above.'
            }

            // Append system message requesting document generation
            await append(systemMessage)

            // Set document content from the assistant's response
            setTimeout(() => {
                if (messages.length > 0) {
                    const lastMessage = messages[messages.length - 1]
                    if (lastMessage.role === 'assistant') {
                        setDocumentContent(extractDocumentContent(lastMessage))
                    }
                }
                setIsGenerating(false)
                setActiveTab('document')
            }, 1000)

        } catch (error) {
            console.error('Error generating document:', error)
            setIsGenerating(false)
        }
    }

    if (!isVisible) return null

    return (
        <div className={cn(
            'fixed right-0 top-0 bottom-0 z-10 w-full md:w-[30vw] bg-background border-l shadow-lg transition-transform',
            'h-[calc(100vh-4rem)]',
            'mt-16',
            isVisible ? 'translate-x-0' : 'translate-x-full'
        )}>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="text-lg font-semibold">Research & Documents</div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsVisible(false)}
                        className="h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex border-b">
                    <Button
                        variant={activeTab === 'document' ? 'default' : 'ghost'}
                        className="flex-1 rounded-none border-b-2 border-transparent"
                        onClick={() => setActiveTab('document')}
                    >
                        Document
                    </Button>
                    <Button
                        variant={activeTab === 'context' ? 'default' : 'ghost'}
                        className="flex-1 rounded-none border-b-2 border-transparent"
                        onClick={() => setActiveTab('context')}
                    >
                        Context
                    </Button>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex-1 overflow-auto">
                        <ScrollArea className="h-full">
                            <div className="p-4">
                                {activeTab === 'document' ? (
                                    <div className="flex flex-col gap-4">
                                        {documentContent ? (
                                            <UnifiedMarkdown
                                                content={documentContent}
                                                className="prose max-w-none dark:prose-invert"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center gap-4 py-8">
                                                <p className="text-sm text-muted-foreground text-center">
                                                    Generate a document based on your conversation with the AI.
                                                </p>
                                                <Button
                                                    disabled={isGenerating || isLoading || isReadonly}
                                                    onClick={handleGenerateDocument}
                                                >
                                                    {isGenerating ? 'Generating...' : 'Generate Document'}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        <p className="text-sm text-muted-foreground">
                                            Additional context and sources used by the AI will appear here.
                                        </p>
                                        {/* Context sources would be displayed here */}
                                        <div className="border rounded-md p-4">
                                            <h3 className="text-sm font-medium mb-2">Sources</h3>
                                            <p className="text-xs text-muted-foreground">
                                                No sources available for this conversation.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>

                    <div className="border-t h-1/3 overflow-auto">
                        <ScrollArea className="h-full">
                            <div className="p-4">
                                <h3 className="text-sm font-medium mb-2">Document History</h3>
                                <div className="flex flex-col gap-2">
                                    {/* Would be populated with document history */}
                                    <div className="text-xs text-muted-foreground">
                                        No document history available.
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    )
} 