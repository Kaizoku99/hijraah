'use client'

import { useState, useRef, FormEvent, KeyboardEvent, ChangeEvent } from 'react'
import { Paperclip, SendHorizonal, StopCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import type { Attachment } from 'ai'
import { useDropzone } from 'react-dropzone'

// Extend the Attachment type to include the id property
interface ExtendedAttachment extends Attachment {
    id: string;
}

interface UnifiedMessageInputProps {
    input: string
    setInput: (value: string) => void
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
    isLoading: boolean
    stop: () => void
    attachments: ExtendedAttachment[]
    setAttachments: (attachments: ExtendedAttachment[]) => void
    chatId: string
}

export function UnifiedMessageInput({
    input,
    setInput,
    handleSubmit,
    isLoading,
    stop,
    attachments,
    setAttachments,
    chatId
}: UnifiedMessageInputProps) {
    const { toast } = useToast()
    const formRef = useRef<HTMLFormElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const [isDraggingOver, setIsDraggingOver] = useState(false)

    const { getRootProps, getInputProps } = useDropzone({
        noClick: true,
        noKeyboard: true,
        maxFiles: 10,
        maxSize: 10 * 1024 * 1024, // 10MB max file size
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
            'application/pdf': ['.pdf'],
            'text/plain': ['.txt'],
            'text/csv': ['.csv'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        onDragEnter: () => setIsDraggingOver(true),
        onDragLeave: () => setIsDraggingOver(false),
        onDrop: async (acceptedFiles, rejectedFiles) => {
            setIsDraggingOver(false)

            // Handle rejected files (too large or wrong type)
            if (rejectedFiles.length > 0) {
                toast({
                    title: 'File upload failed',
                    description: 'Some files were rejected due to size or type restrictions',
                    variant: 'destructive'
                })
            }

            if (acceptedFiles.length === 0) return

            try {
                // Process each file
                const newAttachments = await Promise.all(
                    acceptedFiles.map(async (file) => {
                        const formData = new FormData()
                        formData.append('file', file)
                        formData.append('chatId', chatId)

                        const response = await fetch('/api/files/upload', {
                            method: 'POST',
                            body: formData
                        })

                        if (!response.ok) {
                            throw new Error(`Failed to upload file: ${file.name}`)
                        }

                        const data = await response.json()

                        return {
                            id: data.id,
                            name: file.name,
                            type: file.type,
                            size: file.size,
                            url: data.url
                        } as ExtendedAttachment
                    })
                )

                setAttachments([...attachments, ...newAttachments])
                toast({
                    title: 'Files uploaded',
                    description: `Successfully uploaded ${acceptedFiles.length} file(s)`
                })

            } catch (error) {
                console.error('Error uploading files:', error)
                toast({
                    title: 'Upload failed',
                    description: 'Failed to upload files. Please try again.',
                    variant: 'destructive'
                })
            }
        }
    })

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            console.log('Submit via Enter key')
            formRef.current?.requestSubmit()
        }
    }

    const removeAttachment = (id: string) => {
        setAttachments(attachments.filter(file => file.id !== id))
    }

    return (
        <div
            {...getRootProps()}
            className={cn(
                'relative',
                isDraggingOver && 'after:absolute after:inset-0 after:bg-primary/10 after:border-2 after:border-dashed after:border-primary after:rounded-md after:z-10'
            )}
        >
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative flex flex-col"
            >
                <input {...getInputProps()} />

                {/* Attachments display */}
                {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {attachments.map((file) => (
                            <div
                                key={file.id}
                                className="flex items-center gap-1.5 text-xs bg-muted rounded-md px-2 py-1"
                            >
                                <span className="max-w-[150px] truncate">{file.name}</span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4"
                                    onClick={() => removeAttachment(file.id)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="relative flex items-center">
                    <Textarea
                        ref={inputRef}
                        tabIndex={0}
                        placeholder="Send a message..."
                        value={input}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="min-h-12 max-h-36 resize-none pr-20 py-3"
                        disabled={isLoading}
                    />
                    <div className="absolute right-2 flex items-center gap-1">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={isLoading}
                            className="text-muted-foreground"
                            onClick={() => inputRef.current?.click()}
                        >
                            <Paperclip className="h-5 w-5" />
                            <span className="sr-only">Attach file</span>
                        </Button>
                        {isLoading ? (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={stop}
                            >
                                <StopCircle className="h-5 w-5" />
                                <span className="sr-only">Stop generating</span>
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                variant="ghost"
                                size="icon"
                                disabled={!input.trim() && attachments.length === 0}
                                onClick={() => console.log('Send button clicked')}
                            >
                                <SendHorizonal className="h-5 w-5" />
                                <span className="sr-only">Send message</span>
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
} 