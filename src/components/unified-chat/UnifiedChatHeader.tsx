'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import {
    Copy,
    Share2,
    Lock,
    Globe,
    Users,
    ChevronDown,
    Archive,
    Trash,
    File,
    FileText,
    BookOpen,
    Search,
    Database,
    ScanSearch,
    Globe2
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const chatVisibilityOptions = [
    {
        value: 'private',
        label: 'Private',
        icon: Lock,
        description: 'Only you can view this chat',
    },
    {
        value: 'public',
        label: 'Public',
        icon: Globe,
        description: 'Anyone with the link can view this chat',
    },
    {
        value: 'team',
        label: 'Team',
        icon: Users,
        description: 'Your team members can view this chat',
    },
]

interface UnifiedChatHeaderProps {
    chatId: string
    selectedModel?: string
    selectedVisibility?: string
    isReadonly?: boolean
    toggleArtifact?: () => void
    isArtifactVisible?: boolean
    toggleResearch?: () => void
    isResearchVisible?: boolean
    toggleDocumentProcessor?: () => void
    isDocumentProcessorVisible?: boolean
    toggleWebScraper?: () => void
    isWebScraperVisible?: boolean
}

export function UnifiedChatHeader({
    chatId,
    selectedModel = 'gpt-4o',
    selectedVisibility = 'private',
    isReadonly = false,
    toggleArtifact,
    isArtifactVisible = false,
    toggleResearch,
    isResearchVisible = false,
    toggleDocumentProcessor,
    isDocumentProcessorVisible = false,
    toggleWebScraper,
    isWebScraperVisible = false
}: UnifiedChatHeaderProps) {
    const { user } = useAuth()
    const { toast } = useToast()
    const [isCopying, setIsCopying] = useState(false)
    const [isSharing, setIsSharing] = useState(false)
    const [isArchiving, setIsArchiving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const visibilityOption = chatVisibilityOptions.find(option => option.value === selectedVisibility)
    const VisibilityIcon = visibilityOption?.icon || Lock

    // Function to copy chat link to clipboard
    const handleCopyLink = async () => {
        setIsCopying(true)
        try {
            const chatUrl = `${window.location.origin}/chat/${chatId}`
            await navigator.clipboard.writeText(chatUrl)
            toast({
                title: 'Link copied',
                description: 'Chat link copied to clipboard',
            })
        } catch (error) {
            console.error('Failed to copy link:', error)
            toast({
                title: 'Failed to copy link',
                description: 'An error occurred while copying the link',
                variant: 'destructive',
            })
        } finally {
            setIsCopying(false)
        }
    }

    // Function to toggle chat visibility
    const handleShareChat = async (newVisibility: string) => {
        if (newVisibility === selectedVisibility) return

        setIsSharing(true)
        try {
            // Update chat visibility via API
            const response = await fetch(`/api/chat/${chatId}/share`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ visibility: newVisibility }),
            })

            if (!response.ok) {
                throw new Error('Failed to update chat visibility')
            }

            toast({
                title: 'Chat visibility updated',
                description: `Chat is now ${newVisibility}`,
            })
        } catch (error) {
            console.error('Failed to update visibility:', error)
            toast({
                title: 'Failed to update visibility',
                description: 'An error occurred while updating chat visibility',
                variant: 'destructive',
            })
        } finally {
            setIsSharing(false)
        }
    }

    // Function to archive chat
    const handleArchiveChat = async () => {
        setIsArchiving(true)
        try {
            // Archive chat via API
            const response = await fetch(`/api/chat/${chatId}/archive`, {
                method: 'PUT',
            })

            if (!response.ok) {
                throw new Error('Failed to archive chat')
            }

            toast({
                title: 'Chat archived',
                description: 'This chat has been archived',
            })
        } catch (error) {
            console.error('Failed to archive chat:', error)
            toast({
                title: 'Failed to archive chat',
                description: 'An error occurred while archiving the chat',
                variant: 'destructive',
            })
        } finally {
            setIsArchiving(false)
        }
    }

    // Function to delete chat
    const handleDeleteChat = async () => {
        setIsDeleting(true)
        try {
            // Delete chat via API
            const response = await fetch(`/api/chat/${chatId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete chat')
            }

            toast({
                title: 'Chat deleted',
                description: 'This chat has been deleted',
            })

            // Redirect to home or chats page
            window.location.href = '/'
        } catch (error) {
            console.error('Failed to delete chat:', error)
            toast({
                title: 'Failed to delete chat',
                description: 'An error occurred while deleting the chat',
                variant: 'destructive',
            })
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="flex items-center justify-between border-b px-4 py-2">
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-normal">
                    {selectedModel}
                </Badge>

                {visibilityOption && (
                    <Badge variant="secondary" className="flex items-center gap-1 font-normal">
                        <VisibilityIcon className="h-3 w-3" />
                        <span>{visibilityOption.label}</span>
                    </Badge>
                )}
            </div>

            <div className="flex items-center gap-2">
                {/* Research Button */}
                {toggleResearch && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={isResearchVisible ? "default" : "ghost"}
                                    size="icon"
                                    onClick={toggleResearch}
                                    className="h-8 w-8"
                                >
                                    <Search className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Deep Research</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}

                {/* Web Scraper Button */}
                {toggleWebScraper && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={isWebScraperVisible ? "default" : "ghost"}
                                    size="icon"
                                    onClick={toggleWebScraper}
                                    className="h-8 w-8"
                                >
                                    <Globe2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Web Scraper</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}

                {/* OCR Document Processor Button */}
                {toggleDocumentProcessor && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={isDocumentProcessorVisible ? "default" : "ghost"}
                                    size="icon"
                                    onClick={toggleDocumentProcessor}
                                    className="h-8 w-8"
                                >
                                    <ScanSearch className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Document Processor</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}

                {/* Document Generator Button */}
                {toggleArtifact && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={isArtifactVisible ? "default" : "ghost"}
                                    size="icon"
                                    onClick={toggleArtifact}
                                    className="h-8 w-8"
                                >
                                    <FileText className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Document Generator</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}

                {!isReadonly && user && (
                    <>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={handleCopyLink}
                                        disabled={isCopying}
                                        className="h-8 w-8"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Copy link</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <DropdownMenu>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                disabled={isSharing}
                                            >
                                                <Share2 className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Share chat</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Chat visibility</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {chatVisibilityOptions.map((option) => (
                                    <DropdownMenuItem
                                        key={option.value}
                                        className={cn(
                                            "flex items-center gap-2 cursor-pointer",
                                            option.value === selectedVisibility && "bg-accent"
                                        )}
                                        onClick={() => handleShareChat(option.value)}
                                    >
                                        <option.icon className="h-4 w-4" />
                                        <div className="flex flex-col">
                                            <span>{option.label}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {option.description}
                                            </span>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    className="flex items-center gap-2 cursor-pointer text-muted-foreground"
                                    onClick={handleArchiveChat}
                                    disabled={isArchiving}
                                >
                                    <Archive className="h-4 w-4" />
                                    <span>Archive chat</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                                    onClick={handleDeleteChat}
                                    disabled={isDeleting}
                                >
                                    <Trash className="h-4 w-4" />
                                    <span>Delete chat</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}
            </div>
        </div>
    )
} 