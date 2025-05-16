'use client'

import { useState } from 'react'
import { Message } from 'ai'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { XIcon, FileTextIcon, CodeIcon, ImageIcon } from 'lucide-react'
import { Markdown } from '@/components/ui/markdown'

interface AIArtifactProps {
    chatId: string
    input: string
    setInput: (input: string) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading?: boolean
    stop?: () => void
    attachments?: any[]
    setAttachments?: (attachments: any[]) => void
    append?: (message: Message | Message[]) => void
    messages: Message[]
    setMessages: (messages: Message[]) => void
    reload?: () => void
    isVisible: boolean
    setIsVisible: (isVisible: boolean) => void
    isReadonly?: boolean
}

export function AIArtifact({
    chatId,
    input,
    setInput,
    handleSubmit,
    isLoading = false,
    stop,
    attachments = [],
    setAttachments,
    append,
    messages,
    setMessages,
    reload,
    isVisible,
    setIsVisible,
    isReadonly = false
}: AIArtifactProps) {
    const [activeTab, setActiveTab] = useState('document')

    // Find artifacts in the messages
    const artifacts = messages
        .filter((message) => message.role === 'assistant')
        .flatMap((message) => {
            // Extract artifacts from message content
            // This is a simplified implementation - in a real app, you would parse the message
            // to find actual artifacts like documents, code, etc.
            const hasDocument = message.content.includes('```')
            const hasCode = message.content.includes('```')
            const hasImage = message.content.includes('![')

            return [
                hasDocument && {
                    type: 'document',
                    content: message.content,
                    id: `doc-${message.id}`
                },
                hasCode && {
                    type: 'code',
                    content: message.content,
                    id: `code-${message.id}`
                },
                hasImage && {
                    type: 'image',
                    content: message.content,
                    id: `img-${message.id}`
                }
            ].filter(Boolean)
        })

    if (!isVisible || artifacts.length === 0) {
        return null
    }

    return (
        <div className="fixed right-0 top-16 bottom-0 z-10 hidden w-[350px] border-l bg-background p-4 md:block">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Artifacts</h3>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsVisible(false)}
                >
                    <XIcon className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Button>
            </div>

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="mt-4"
            >
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="document">
                        <FileTextIcon className="mr-2 h-4 w-4" />
                        Docs
                    </TabsTrigger>
                    <TabsTrigger value="code">
                        <CodeIcon className="mr-2 h-4 w-4" />
                        Code
                    </TabsTrigger>
                    <TabsTrigger value="image">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Images
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="document" className="mt-4 space-y-4">
                    {artifacts
                        .filter((artifact) => artifact.type === 'document')
                        .map((artifact) => (
                            <div
                                key={artifact.id}
                                className="rounded-lg border p-3"
                            >
                                <Markdown content={artifact.content} />
                                <div className="mt-2 flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            // Download document
                                        }}
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => {
                                            // Edit document
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        ))}
                </TabsContent>

                <TabsContent value="code" className="mt-4 space-y-4">
                    {artifacts
                        .filter((artifact) => artifact.type === 'code')
                        .map((artifact) => (
                            <div
                                key={artifact.id}
                                className="rounded-lg border p-3"
                            >
                                <Markdown content={artifact.content} />
                                <div className="mt-2 flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            // Copy code
                                            navigator.clipboard.writeText(artifact.content)
                                        }}
                                    >
                                        Copy
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => {
                                            // Execute code
                                        }}
                                    >
                                        Run
                                    </Button>
                                </div>
                            </div>
                        ))}
                </TabsContent>

                <TabsContent value="image" className="mt-4 space-y-4">
                    {artifacts
                        .filter((artifact) => artifact.type === 'image')
                        .map((artifact) => (
                            <div
                                key={artifact.id}
                                className="rounded-lg border p-3"
                            >
                                <Markdown content={artifact.content} />
                                <div className="mt-2 flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            // Download image
                                        }}
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => {
                                            // Edit image
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        ))}
                </TabsContent>
            </Tabs>
        </div>
    )
} 