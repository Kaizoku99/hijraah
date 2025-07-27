"use client";

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
  Database as DatabaseIcon,
  ScanSearch,
  Globe2,
  PlusCircle,
  MessageSquare,
  Settings2,
  BarChartHorizontal,
  Pencil,
  Download,
} from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth/hooks";
import {
  useSupabaseBrowser,
  type TypedSSRSupabaseClient,
} from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { Database } from "@/types/supabase";
// import { ChatHistory } from "@/components/ui/chat-history"; // Commented out - Component not found

export const chatVisibilityOptions = [
  {
    value: "private",
    label: "Private",
    icon: Lock,
    description: "Only you can view this chat",
  },
  {
    value: "public",
    label: "Public",
    icon: Globe,
    description: "Anyone with the link can view this chat",
  },
  {
    value: "team",
    label: "Team",
    icon: Users,
    description: "Your team members can view this chat",
  },
];

const availableModels = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
];

interface ChatSession {
  id: string;
  title: string;
  created_at: string;
  is_archived?: boolean;
  // Add other fields as needed to match API response
  user_id?: string;
  model?: string;
  visibility?: string;
  updated_at?: string;
}

interface UnifiedChatHeaderProps {
  chatId: string;
  initialTitle: string;
  selectedModel: string;
  selectedVisibility: string;
  onModelChange: (model: string) => void;
  onVisibilityChange: (visibility: string) => void;
  /**
   * Callback fired when the chat title is successfully updated in the database.
   * Used by the parent container to keep local state in sync without an extra fetch.
   */
  onTitleChange?: (newTitle: string) => void;
  onNewSession: () => void;
  onSessionChange: (sessionId: string) => void;
  isReadonly?: boolean;
  toggleArtifact?: () => void;
  isArtifactVisible?: boolean;
  toggleResearch?: () => void;
  isResearchVisible?: boolean;
  toggleDocumentProcessor?: () => void;
  isDocumentProcessorVisible?: boolean;
  toggleWebScraper?: () => void;
  isWebScraperVisible?: boolean;
  toggleAnalytics?: () => void;
  isAnalyticsVisible?: boolean;
}

export function UnifiedChatHeader({
  chatId,
  initialTitle,
  selectedModel,
  selectedVisibility,
  onModelChange,
  onVisibilityChange,
  onTitleChange,
  onNewSession,
  onSessionChange,
  isReadonly = false,
  toggleArtifact,
  isArtifactVisible = false,
  toggleResearch,
  isResearchVisible = false,
  toggleDocumentProcessor,
  isDocumentProcessorVisible = false,
  toggleWebScraper,
  isWebScraperVisible = false,
  toggleAnalytics,
  isAnalyticsVisible = false,
}: UnifiedChatHeaderProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const supabase = useSupabaseBrowser();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isUnarchiving, setIsUnarchiving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(initialTitle);
  const [isSavingTitle, setIsSavingTitle] = useState(false);
  const [currentChatIsArchived, setCurrentChatIsArchived] = useState(false);

  useEffect(() => {
    setCurrentTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    const fetchSessions = async () => {
      setIsLoadingSessions(true);
      console.log(
        "[UnifiedChatHeader] Fetching sessions via API for chatId:",
        chatId
      );
      try {
        const sessionApiUrl = "/api/chat?limit=50";
        console.log(
          `[UnifiedChatHeader] Fetching sessions from: ${sessionApiUrl}`
        );

        // Get the current session token for auth
        const supabaseAuth = await supabase?.auth.getSession();
        const accessToken = supabaseAuth?.data?.session?.access_token;

        const headers: Record<string, string> = {};
        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
          console.log("[UnifiedChatHeader] Using auth token for request");
        } else {
          console.warn(
            "[UnifiedChatHeader] No auth token available for request!"
          );
          if (supabase) {
            // Try to refresh the session to get a new token
            console.log(
              "[UnifiedChatHeader] Attempting to refresh auth session"
            );
            const { error } = await supabase.auth.refreshSession();
            if (error) {
              throw new Error(`Auth session refresh failed: ${error.message}`);
            }
            // Get the refreshed session
            const refreshed = await supabase.auth.getSession();
            const newToken = refreshed?.data?.session?.access_token;
            if (newToken) {
              headers["Authorization"] = `Bearer ${newToken}`;
              console.log("[UnifiedChatHeader] Using refreshed auth token");
            } else {
              throw new Error(
                "Failed to obtain a valid auth token after refresh"
              );
            }
          } else {
            throw new Error("Supabase client not available");
          }
        }

        const response = await fetch(sessionApiUrl, {
          headers,
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          }
          throw new Error(
            `API Error: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();

        const fetchedSessions = result.chats || [];

        console.log(
          "[UnifiedChatHeader] Data from /api/chat:",
          fetchedSessions
        );

        if (!Array.isArray(fetchedSessions)) {
          console.error(
            "[UnifiedChatHeader] API response 'chats' is not an array:",
            fetchedSessions
          );
          throw new Error("Invalid data format received from API.");
        }

        setSessions(fetchedSessions as ChatSession[]);

        console.log(
          "[UnifiedChatHeader] Attempting to find session with ID:",
          chatId
        );
        const currentChat = fetchedSessions.find(
          (session: ChatSession) => session.id === chatId
        );
        console.log(
          "[UnifiedChatHeader] Found currentChat from API data:",
          currentChat
        );

        if (currentChat) {
          console.log(
            "[UnifiedChatHeader] Current chat is_archived from API data:",
            currentChat.is_archived
          );
          setCurrentChatIsArchived(!!currentChat.is_archived);
        } else {
          console.log(
            "[UnifiedChatHeader] Current chat not found in fetched API data."
          );
          setCurrentChatIsArchived(false);
        }
      } catch (err: any) {
        console.error("Failed to fetch chat sessions via API:", err);

        // Handle auth-specific error messages
        const errorMessage =
          err.message || "An unknown error occurred while fetching sessions.";
        const isAuthError =
          errorMessage.includes("auth") ||
          errorMessage.includes("log in") ||
          errorMessage.includes("token") ||
          errorMessage.includes("401");

        toast({
          title: isAuthError
            ? "Authentication Error"
            : "Failed to load chat sessions",
          description: errorMessage,
          variant: "destructive",
          action: isAuthError ? (
            <div className="flex">
              <button
                className="bg-primary text-primary-foreground px-2 py-1 rounded"
                onClick={() => (window.location.href = "/auth/login")}
              >
                Log in
              </button>
            </div>
          ) : undefined,
        });

        setSessions([]);
        setCurrentChatIsArchived(false);
      } finally {
        setIsLoadingSessions(false);
      }
    };

    fetchSessions();
  }, [chatId, toast, supabase]);

  const visibilityOption = chatVisibilityOptions.find(
    (option) => option.value === selectedVisibility
  );
  const VisibilityIcon = visibilityOption?.icon || Lock;

  const handleCopyLink = async () => {
    setIsCopying(true);
    try {
      const chatUrl = `${window.location.origin}/chat/${chatId}`;
      await navigator.clipboard.writeText(chatUrl);
      toast({
        title: "Link copied",
        description: "Chat link copied to clipboard",
      });
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast({
        title: "Failed to copy link",
        description: "An error occurred while copying the link",
        variant: "destructive",
      });
    } finally {
      setIsCopying(false);
    }
  };

  const handleShareChat = async (newVisibility: string) => {
    if (
      newVisibility === selectedVisibility ||
      isSharing ||
      !supabase ||
      !user?.id
    )
      return;
    setIsSharing(true);
    try {
      const { error: updateError } = await supabase
        .from("chat_sessions")
        .update({
          visibility: newVisibility,
          updated_at: new Date().toISOString(),
        })
        .eq("id", chatId)
        .eq("user_id", user.id);
      if (updateError) throw updateError;
      onVisibilityChange(newVisibility);
      toast({
        title: "Chat visibility updated",
        description: `Chat is now ${newVisibility}`,
      });
    } catch (error: any) {
      console.error("Failed to update visibility:", error);
      toast({
        title: "Failed to update visibility",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  const handleArchiveChat = async () => {
    if (isArchiving) return;
    setIsArchiving(true);
    try {
      const response = await fetch(`/api/chat/${chatId}/archive`, {
        method: "PUT",
      });
      if (!response.ok) throw new Error("Failed to archive chat");
      toast({ title: "Chat archived" });
      setCurrentChatIsArchived(true);
    } catch (error: any) {
      console.error("Failed to archive chat:", error);
      toast({
        title: "Failed to archive chat",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsArchiving(false);
    }
  };

  const handleUnarchiveChat = async () => {
    if (isUnarchiving) return;
    setIsUnarchiving(true);
    try {
      const response = await fetch(`/api/chat/${chatId}/unarchive`, {
        method: "PUT",
      });
      if (!response.ok) throw new Error("Failed to unarchive chat");
      toast({ title: "Chat unarchived" });
      setCurrentChatIsArchived(false);
    } catch (error: any) {
      console.error("Failed to unarchive chat:", error);
      toast({
        title: "Failed to unarchive chat",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUnarchiving(false);
    }
  };

  const handleDeleteChat = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/chat/${chatId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete chat");
      toast({ title: "Chat deleted" });
      onNewSession();
    } catch (error: any) {
      console.error("Failed to delete chat:", error);
      toast({
        title: "Failed to delete chat",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  const handleTitleSave = useCallback(async () => {
    const trimmedTitle = currentTitle.trim();
    if (
      !supabase ||
      !user?.id ||
      !trimmedTitle ||
      trimmedTitle === initialTitle ||
      isSavingTitle
    ) {
      setIsEditingTitle(false);
      if (trimmedTitle !== initialTitle) setCurrentTitle(initialTitle);
      return;
    }
    setIsSavingTitle(true);
    try {
      const { error } = await supabase
        .from("chat_sessions")
        .update({ title: trimmedTitle, updated_at: new Date().toISOString() })
        .eq("id", chatId);
      if (error) throw error;
      toast({ title: "Title updated" });
      setIsEditingTitle(false);
      setSessions((prev) =>
        prev.map((s) => (s.id === chatId ? { ...s, title: trimmedTitle } : s))
      );
      if (onTitleChange) {
        onTitleChange(trimmedTitle);
      }
    } catch (err: any) {
      console.error("Failed to update title:", err);
      toast({ title: "Failed to save title", variant: "destructive" });
      setCurrentTitle(initialTitle);
    } finally {
      setIsSavingTitle(false);
      setIsEditingTitle(false);
    }
  }, [
    supabase,
    user?.id,
    chatId,
    currentTitle,
    initialTitle,
    toast,
    isSavingTitle,
    onTitleChange,
  ]);

  const handleTitleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTitleSave();
    } else if (e.key === "Escape") {
      setCurrentTitle(initialTitle);
      setIsEditingTitle(false);
    }
  };

  const handleExportChat = async () => {
    try {
      const response = await fetch(`/api/chat/${chatId}/messages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chat messages");
      }

      const messages = await response.json();

      if (!messages || messages.length === 0) {
        toast({
          title: "No messages to export",
          description: "This chat has no messages to export.",
        });
        return;
      }

      // Format messages into a text string
      const chatTitle = currentTitle || `Chat_${chatId}`;
      const formattedDate = new Date().toISOString().split("T")[0];
      let exportContent = `# ${chatTitle}\n`;
      exportContent += `# Exported on: ${formattedDate}\n\n`;

      messages.forEach((message: any) => {
        const timestamp = new Date(message.created_at).toLocaleString();
        const role =
          message.role.charAt(0).toUpperCase() + message.role.slice(1);
        exportContent += `## ${role} (${timestamp})\n${message.content}\n\n`;
      });

      // Create and download a text file
      const blob = new Blob([exportContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${chatTitle.replace(/\s+/g, "_")}_${formattedDate}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Chat exported successfully",
        description: `Saved as ${a.download}`,
      });
    } catch (error: any) {
      console.error("Failed to export chat:", error);
      toast({
        title: "Failed to export chat",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const currentSessionTitle =
    sessions.find((s) => s.id === chatId)?.title ||
    `Chat (${chatId?.substring(0, 6)}...)`;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="relative z-20 flex h-14 items-center justify-between border-b bg-background px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {isEditingTitle ? (
              <>
                <Input
                  value={currentTitle}
                  onChange={handleTitleChange}
                  onBlur={handleTitleSave}
                  onKeyDown={handleTitleEditKeyDown}
                  className="h-8 flex-grow min-w-0"
                  autoFocus
                  disabled={isSavingTitle}
                  placeholder="Chat title"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleTitleSave}
                  disabled={
                    isSavingTitle ||
                    currentTitle.trim() === initialTitle ||
                    !currentTitle.trim()
                  }
                >
                  {isSavingTitle ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCurrentTitle(initialTitle);
                    setIsEditingTitle(false);
                  }}
                  disabled={isSavingTitle}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1.5 px-2 max-w-full text-left h-auto py-1"
                    onClick={() => !isReadonly && setIsEditingTitle(true)}
                    disabled={isReadonly}
                  >
                    <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span
                      className="truncate text-base font-semibold flex-grow min-w-0"
                      title={currentTitle}
                    >
                      {currentTitle || "New Chat"}
                    </span>
                    {!isReadonly && (
                      <Pencil className="h-3.5 w-3.5 text-muted-foreground ml-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isReadonly ? currentTitle : "Edit Title"}
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    disabled={isLoadingSessions}
                  >
                    <ChevronDown className="h-4 w-4" />
                    <span className="sr-only">Switch Chat</span>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Switch Chat</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Recent Chats</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isLoadingSessions ? (
                <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
              ) : sessions.length > 0 ? (
                sessions.map((session) => (
                  <DropdownMenuItem
                    key={session.id}
                    onClick={() => onSessionChange(session.id)}
                    disabled={session.id === chatId}
                    className={cn(session.id === chatId && "bg-accent")}
                  >
                    <span className="truncate">
                      {session.title ||
                        `Chat (${session.id.substring(0, 6)}...)`}
                    </span>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>No recent chats</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onNewSession}
                className="h-8 w-8 flex-shrink-0"
              >
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only">New Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {toggleResearch && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isResearchVisible ? "secondary" : "ghost"}
                  size="icon"
                  onClick={toggleResearch}
                  className="h-8 w-8"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Research Panel</TooltipContent>
            </Tooltip>
          )}
          {toggleDocumentProcessor && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isDocumentProcessorVisible ? "secondary" : "ghost"}
                  size="icon"
                  onClick={toggleDocumentProcessor}
                  className="h-8 w-8"
                >
                  <FileText className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Document Processor</TooltipContent>
            </Tooltip>
          )}
          {toggleWebScraper && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isWebScraperVisible ? "secondary" : "ghost"}
                  size="icon"
                  onClick={toggleWebScraper}
                  className="h-8 w-8"
                >
                  <Globe2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Web Scraper</TooltipContent>
            </Tooltip>
          )}
          {toggleArtifact && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isArtifactVisible ? "secondary" : "ghost"}
                  size="icon"
                  onClick={toggleArtifact}
                  className="h-8 w-8"
                >
                  <DatabaseIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Artifacts Panel</TooltipContent>
            </Tooltip>
          )}
          {toggleAnalytics && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isAnalyticsVisible ? "secondary" : "ghost"}
                  size="icon"
                  onClick={toggleAnalytics}
                  className="h-8 w-8"
                >
                  <BarChartHorizontal className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Chat Analytics</TooltipContent>
            </Tooltip>
          )}
          {(toggleResearch ||
            toggleDocumentProcessor ||
            toggleWebScraper ||
            toggleArtifact ||
            toggleAnalytics) && <div className="h-6 w-px bg-border mx-1"></div>}

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-1.5 px-2 h-8"
                  >
                    <Settings2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm max-w-[100px] truncate">
                      {availableModels.find((m) => m.value === selectedModel)
                        ?.label || selectedModel}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Select Model</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Model</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedModel}
                onValueChange={onModelChange}
              >
                {availableModels.map((model) => (
                  <DropdownMenuRadioItem key={model.value} value={model.value}>
                    {model.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="flex items-center gap-1.5 px-3 h-8"
                  >
                    <VisibilityIcon className="h-4 w-4" />
                    <span className="text-sm">
                      {visibilityOption?.label || "Share"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Share & Actions</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Sharing Settings</DropdownMenuLabel>
              {chatVisibilityOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleShareChat(option.value)}
                  disabled={isSharing || option.value === selectedVisibility}
                >
                  <option.icon className="h-4 w-4 mr-2" />
                  <div>
                    <div>{option.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Other Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleCopyLink} disabled={isCopying}>
                <Copy className="mr-2 h-4 w-4" />{" "}
                {isCopying ? "Copying..." : "Copy Link"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportChat}>
                <Download className="mr-2 h-4 w-4" /> Export Chat
              </DropdownMenuItem>
              {currentChatIsArchived ? (
                <DropdownMenuItem
                  onClick={handleUnarchiveChat}
                  disabled={isUnarchiving}
                >
                  <Archive className="mr-2 h-4 w-4" />{" "}
                  {isUnarchiving ? "Unarchiving..." : "Unarchive"}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={handleArchiveChat}
                  disabled={isArchiving}
                >
                  <Archive className="mr-2 h-4 w-4" />{" "}
                  {isArchiving ? "Archiving..." : "Archive"}
                </DropdownMenuItem>
              )}
              {!isReadonly && (
                <DropdownMenuItem
                  onClick={handleDeleteChat}
                  disabled={isDeleting}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <Trash className="mr-2 h-4 w-4" />{" "}
                  {isDeleting ? "Deleting..." : "Delete Chat"}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </TooltipProvider>
  );
}
