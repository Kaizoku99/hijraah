'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../button';
import { ScrollArea } from '../scroll-area';
import { ChatService, ChatConversation } from '@/lib/supabase/chat';
import { Archive, MessageSquare, Plus, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useChat } from '@/contexts/chat-context';
import { Badge } from '../badge';

interface ChatListProps {
  onSelect: (conversationId: string) => void;
  onNew: () => void;
  className?: string;
}

interface ActiveUser {
  user_id: string;
  online_at: string;
  typing?: boolean;
  conversation_id?: string;
}

export function ChatList({ onSelect, onNew, className }: ChatListProps) {
  const { activeUsers } = useChat();
  const [conversations, setConversations] = React.useState<ChatConversation[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const chatService = React.useMemo(() => new ChatService(), []);

  const loadConversations = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await chatService.listConversations();
      setConversations(data);
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast.error('Failed to load conversations');
    } finally {
      setIsLoading(false);
    }
  }, [chatService]);

  React.useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const handleSelect = React.useCallback((id: string) => {
    setSelectedId(id);
    onSelect(id);
  }, [onSelect]);

  const handleArchive = React.useCallback(async (id: string) => {
    try {
      await chatService.archiveConversation(id);
      toast.success('Conversation archived');
      loadConversations();
    } catch (error) {
      console.error('Error archiving conversation:', error);
      toast.error('Failed to archive conversation');
    }
  }, [chatService, loadConversations]);

  const handleDelete = React.useCallback(async (id: string) => {
    try {
      await chatService.deleteConversation(id);
      toast.success('Conversation deleted');
      loadConversations();
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast.error('Failed to delete conversation');
    }
  }, [chatService, loadConversations]);

  // Group active users by conversation
  const activeUsersByConversation = React.useMemo(() => {
    return (activeUsers as ActiveUser[]).reduce((acc, user) => {
      const conversationId = user.conversation_id || 'lobby';
      if (!acc[conversationId]) {
        acc[conversationId] = [];
      }
      acc[conversationId].push(user);
      return acc;
    }, {} as Record<string, ActiveUser[]>);
  }, [activeUsers]);

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Conversations</h2>
        <Button onClick={onNew} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                No conversations yet
              </p>
            </div>
          ) : (
            conversations.map((conversation) => {
              const conversationUsers = activeUsersByConversation[conversation.id] || [];
              const typingUsers = conversationUsers.filter(user => user.typing);
              
              return (
                <div
                  key={conversation.id}
                  className={cn(
                    'group flex items-center justify-between rounded-lg p-3 hover:bg-muted',
                    selectedId === conversation.id && 'bg-muted'
                  )}
                >
                  <button
                    className="flex-1 truncate text-left"
                    onClick={() => handleSelect(conversation.id)}
                  >
                    <p className="truncate font-medium">
                      {conversation.title || 'Untitled Conversation'}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        {new Date(conversation.created_at).toLocaleDateString()}
                      </p>
                      {conversationUsers.length > 0 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  <span>{conversationUsers.length}</span>
                                </Badge>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Active users:</p>
                              <ul className="mt-1 text-sm">
                                {conversationUsers.map(user => (
                                  <li key={user.user_id}>
                                    {user.user_id}
                                    {user.typing && ' (typing...)'}
                                  </li>
                                ))}
                              </ul>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    {typingUsers.length > 0 && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {typingUsers.length === 1
                          ? `${typingUsers[0].user_id} is typing...`
                          : `${typingUsers.length} people are typing...`}
                      </p>
                    )}
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleArchive(conversation.id)}
                      >
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(conversation.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
} 