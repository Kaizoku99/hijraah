'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
    PaperclipIcon,
    SendIcon,
    MicIcon,
    StopCircleIcon,
    ImageIcon,
    FileIcon,
    XIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIMessageInputProps {
    input: string
    setInput: (input: string) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading?: boolean
    stop?: () => void
    attachments?: any[]
    setAttachments?: (attachments: any[]) => void
    className?: string
}

export function AIMessageInput({
    input,
    setInput,
    handleSubmit,
    isLoading = false,
    stop,
    attachments = [],
    setAttachments,
    className
}: AIMessageInputProps) {
    const [isRecording, setIsRecording] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [input])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            const form = e.currentTarget.form
            if (form) {
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && setAttachments) {
            const newFiles = Array.from(e.target.files).map((file) => ({
                name: file.name,
                type: file.type,
                size: file.size,
                file
            }))
            setAttachments([...attachments, ...newFiles])
            e.target.value = '' // Reset input
        }
    }

    const handleRemoveAttachment = (index: number) => {
        if (setAttachments) {
            const newAttachments = [...attachments]
            newAttachments.splice(index, 1)
            setAttachments(newAttachments)
        }
    }

    const handleStartRecording = () => {
        setIsRecording(true)
        // Implement speech-to-text functionality
    }

    const handleStopRecording = () => {
        setIsRecording(false)
        // Stop recording and process speech-to-text
    }

    return (
        <div className={cn('space-y-2', className)}>
            {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {attachments.map((attachment, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs"
                        >
                            {attachment.type.startsWith('image/') ? (
                                <ImageIcon className="h-3 w-3" />
                            ) : (
                                <FileIcon className="h-3 w-3" />
                            )}
                            <span className="max-w-[100px] truncate">{attachment.name}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0"
                                onClick={() => handleRemoveAttachment(index)}
                            >
                                <XIcon className="h-3 w-3" />
                                <span className="sr-only">Remove</span>
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="flex items-end gap-2"
            >
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <PaperclipIcon className="h-5 w-5" />
                    <span className="sr-only">Attach file</span>
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.txt"
                />

                <div className="relative flex-1">
                    <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="min-h-[40px] max-h-[200px] resize-none pr-10"
                        rows={1}
                    />
                    {isRecording && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                                <span className="text-sm">Recording...</span>
                            </div>
                        </div>
                    )}
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                >
                    {isRecording ? (
                        <StopCircleIcon className="h-5 w-5 text-red-500" />
                    ) : (
                        <MicIcon className="h-5 w-5" />
                    )}
                    <span className="sr-only">
                        {isRecording ? 'Stop recording' : 'Start recording'}
                    </span>
                </Button>

                {isLoading && stop ? (
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="flex-shrink-0"
                        onClick={stop}
                    >
                        <StopCircleIcon className="h-5 w-5" />
                        <span className="sr-only">Stop generating</span>
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        size="icon"
                        className="flex-shrink-0"
                        disabled={input.trim().length === 0 && attachments.length === 0}
                    >
                        <SendIcon className="h-5 w-5" />
                        <span className="sr-only">Send message</span>
                    </Button>
                )}
            </form>
        </div>
    )
} 