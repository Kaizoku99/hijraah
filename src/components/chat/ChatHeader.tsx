'use client'

import { type Conversation } from '@/types/chat'
import { MoreVerticalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ChatHeaderProps {
    conversation: Conversation
}

export function ChatHeader({ conversation }: ChatHeaderProps) {
    return (
        <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-3">
                <div>
                    <h2 className="font-semibold">{conversation.title}</h2>
                    <p className="text-sm text-muted-foreground">
                        {conversation.participants.length} participants
                    </p>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVerticalIcon className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                        Leave Conversation
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}