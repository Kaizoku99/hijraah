'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
    ChevronDown,
    MoreHorizontal,
    Share2,
    Trash2,
    Download,
    Pencil
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIChatHeaderProps {
    chatId: string
    selectedModel: string
    isReadonly?: boolean
    className?: string
}

export function AIChatHeader({
    chatId,
    selectedModel,
    isReadonly = false,
    className
}: AIChatHeaderProps) {
    const [title, setTitle] = useState('New Chat')
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleTitleSave = () => {
        // Save the title to the database
        setIsEditingTitle(false)
    }

    const handleDeleteChat = async () => {
        try {
            await fetch(`/api/ai/chat?id=${chatId}`, {
                method: 'DELETE',
            })
            // Redirect to the chat list or home page
            window.location.href = '/'
        } catch (error) {
            console.error('Error deleting chat:', error)
        }
    }

    const handleExportChat = () => {
        // Export the chat as JSON or markdown
        console.log('Export chat')
    }

    return (
        <div className={cn('flex items-center justify-between border-b px-4 py-2', className)}>
            <div className="flex items-center gap-2">
                {isEditingTitle ? (
                    <div className="flex items-center gap-2">
                        <Input
                            value={title}
                            onChange={handleTitleChange}
                            className="h-8 w-48"
                            autoFocus
                            onBlur={handleTitleSave}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleTitleSave()
                                }
                            }}
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleTitleSave}
                        >
                            Save
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        {!isReadonly && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsEditingTitle(true)}
                                className="h-6 w-6 p-0"
                            >
                                <Pencil className="h-3.5 w-3.5" />
                                <span className="sr-only">Edit title</span>
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center text-sm text-muted-foreground">
                    <span>Model:</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-1">
                                {selectedModel}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>gpt-4o</DropdownMenuItem>
                            <DropdownMenuItem>gpt-3.5-turbo</DropdownMenuItem>
                            <DropdownMenuItem>claude-3-opus</DropdownMenuItem>
                            <DropdownMenuItem>claude-3-sonnet</DropdownMenuItem>
                            <DropdownMenuItem>gemini-pro</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Separator orientation="vertical" className="h-6" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                            <span className="sr-only">More options</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setIsShareDialogOpen(true)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportChat}>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </DropdownMenuItem>
                        {!isReadonly && (
                            <DropdownMenuItem
                                onClick={handleDeleteChat}
                                className="text-destructive focus:text-destructive"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Share Chat</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="share-url">Share URL</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="share-url"
                                    value={`${window.location.origin}/chat/shared/${chatId}`}
                                    readOnly
                                />
                                <Button
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            `${window.location.origin}/chat/shared/${chatId}`
                                        )
                                    }}
                                >
                                    Copy
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
} 