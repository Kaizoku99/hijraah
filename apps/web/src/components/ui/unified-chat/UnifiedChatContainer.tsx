"use client";

import {
  useChat,
  type Message as SDKMessage,
  type CreateMessage,
} from "@ai-sdk/react";
import { v4 as uuidv4 } from "uuid";
import {
  useState,
  useEffect,
  FormEvent,
  useCallback,
  useRef,
  ChangeEvent,
} from "react";

import {
  artifactDefinitions,
  ArtifactKind,
  initialArtifactData,
} from "@/artifacts";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  useArtifactStore,
  useSetArtifact,
  useResetArtifact,
} from "@/hooks/use-artifact";
import { useAuth } from "@/lib/auth/hooks";
import { useSupabaseBrowser } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { DataStreamDelta, ExtendedAttachment, StreamDataPoint } from "@/types";

import { ChatAnalytics } from "./chat-analytics";
import { UnifiedArtifact } from "./UnifiedArtifact";
import { UnifiedChatHeader } from "./UnifiedChatHeader";
import { UnifiedDocumentProcessor } from "./UnifiedDocumentProcessor";
import { UnifiedMessageInput } from "./UnifiedMessageInput";
import { UnifiedMessageList } from "./UnifiedMessageList";
import { UnifiedResearchContainer } from "./UnifiedResearchContainer";
import { UnifiedSuggestions } from "./UnifiedSuggestions";
import { UnifiedWebScraper } from "./UnifiedWebScraper";

type Message = SDKMessage;

// Adapter function to convert StreamDataPoint to DataStreamDelta
/**
 * Converts UI-specific StreamDataPoint format to the standardized DataStreamDelta format.
 *
 * The UnifiedChatContainer uses UI-specific event types (e.g., 'artifact_*'),
 * while the artifact system expects the standardized types (e.g., 'kind') from DataStreamDelta.
 * This adapter ensures compatibility between these two systems.
 *
 * @param point The StreamDataPoint from the chat system
 * @returns A properly formatted DataStreamDelta object
 */
function adaptStreamPointToDelta(point: StreamDataPoint): DataStreamDelta {
  // Map from UnifiedChat's "artifact_*" format to DataStreamDelta's format
  const typeMap: Record<string, DataStreamDelta["type"] | undefined> = {
    artifact_kind: "kind",
    artifact_id: "id",
    artifact_title: "title",
    artifact_clear: "clear",
    artifact_finish: "finish",
    text_delta: "text-delta",
    code_delta: "code-delta",
    sheet_delta: "sheet-delta",
    image_delta: "image-delta",
  };

  // Get the mapped type or use a safe fallback if no direct mapping exists
  const mappedType = typeMap[point.type] || "text-delta";

  return {
    type: mappedType,
    content: point.content,
  };
}

export interface UnifiedChatContainerProps {
  id?: string;
  className?: string;
  isReadonly?: boolean;
}

export function UnifiedChatContainer({
  id,
  className,
  isReadonly = false,
}: UnifiedChatContainerProps) {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const supabase = useSupabaseBrowser();

  // === Enhanced Logging for Auth Session ===
  console.log(
    "[UnifiedChatContainer] Initial auth state - User:",
    user,
    "Session:",
    session,
  );
  useEffect(() => {
    console.log(
      "[UnifiedChatContainer] Auth state update - User:",
      user,
      "Session:",
      session,
    );
  }, [user, session]);

  // === State Management ===
  const [currentChatId, setCurrentChatId] = useState<string>(id || uuidv4());
  const [currentModel, setCurrentModel] = useState("gpt-4o");
  const [currentVisibility, setCurrentVisibility] = useState("private");
  const [attachments, setAttachments] = useState<ExtendedAttachment[]>([]);
  const [currentTitle, setCurrentTitle] = useState("New Conversation");

  // Get artifact state/setters from Zustand store
  const artifactState = useArtifactStore((state) => state.artifact);
  const setArtifact = useSetArtifact();
  const resetArtifact = useResetArtifact();

  // Panel Visibility State (Artifact visibility might be linked to artifactState.kind)
  const isArtifactVisible = artifactState.kind !== null;
  const [isResearchVisible, setIsResearchVisible] = useState(false);
  const [isDocumentProcessorVisible, setIsDocumentProcessorVisible] =
    useState(false);
  const [isWebScraperVisible, setIsWebScraperVisible] = useState(false);
  const [isAnalyticsVisible, setIsAnalyticsVisible] = useState(false);

  // === Fetch Session Info ===
  const fetchSessionInfo = useCallback(
    async (chatId: string) => {
      if (!supabase) {
        console.error(
          "[UnifiedChatContainer] Supabase client not available in fetchSessionInfo.",
        );
        setCurrentTitle("New Conversation"); // Fallback
        return;
      }
      if (!chatId) {
        console.warn(
          "[UnifiedChatContainer] fetchSessionInfo called with no chatId.",
        );
        // Don't try to fetch if no chatId, could be a new chat not yet saved.
        setCurrentTitle("New Conversation"); // Set to default for new/unsaved chat
        return;
      }
      console.log(
        `[UnifiedChatContainer] Attempting to fetch info for chat ID: '${chatId}'`,
      );
      try {
        // Log current Supabase auth session state again just before the critical fetch
        const { data: currentAuthSession, error: currentAuthError } =
          await supabase.auth.getSession();
        console.log(
          "[UnifiedChatContainer] Supabase Auth Session right before fetching chat_sessions:",
          currentAuthSession,
          "Auth Error (if any):",
          currentAuthError,
        );
        if (currentAuthError) {
          console.error(
            "[UnifiedChatContainer] Supabase auth error before fetching chat_sessions:",
            currentAuthError,
          );
          // Potentially stop here if auth is the issue
        }
        if (!currentAuthSession?.session) {
          console.warn(
            "[UnifiedChatContainer] No active Supabase session before fetching chat_sessions. This might lead to RLS issues.",
          );
        }

        const { data, error } = await supabase
          .from("chat_sessions")
          .select("*")
          .eq("id", chatId)
          .single();

        if (error || !data) {
          // Handle initial empty result or explicit error (e.g. replication lag)
          for (let attempt = 1; attempt <= 3; attempt++) {
            await new Promise((res) => setTimeout(res, attempt * 500));
            const { data: retryData, error: retryErr } = await supabase
              .from("chat_sessions")
              .select("*")
              .eq("id", chatId)
              .single();
            if (!retryErr && retryData?.title) {
              setCurrentTitle(retryData.title);
              return;
            }
          }
          console.error(
            "[UnifiedChatContainer] Error fetching session info from 'chat_sessions' table. Chat ID:",
            chatId,
            "Supabase Error:",
            error || "No data returned",
          );
          setCurrentTitle("New Conversation");
          return;
        }

        if (data.title) {
          console.log(
            `[UnifiedChatContainer] Successfully fetched and set title: ${data.title} for chat ID: ${chatId}`,
          );
          setCurrentTitle(data.title);
        } else {
          console.log(
            `[UnifiedChatContainer] No session title found for chat ID: ${chatId}, using default. Data received:`,
            data,
          );
          setCurrentTitle("New Conversation");
        }
      } catch (err: any) {
        console.error(
          "[UnifiedChatContainer] Catch block: Failed to fetch session info for chat ID:",
          chatId,
          "Error details:",
          err,
          "Error message:",
          err?.message,
          "Error stack:",
          err?.stack,
        );
        setCurrentTitle("New Conversation");
      }
    },
    [supabase], // supabase client is the key dependency here
  );

  // === useChat Hook ===
  const apiEndpointForChat = "/api/chat";
  console.log(
    `[UnifiedChatContainer] useChat API endpoint: ${apiEndpointForChat}`,
  );
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    stop,
    isLoading,
    error: chatHookError, // Renamed to avoid conflict with other 'error' variables
    data,
    setMessages,
    append,
    reload,
  } = useChat({
    api: apiEndpointForChat,
    id: currentChatId,
    initialMessages: [],
    body: {
      selectedChatModel: currentModel,
      visibility: currentVisibility,
    },
    headers: {
      // Ensure Authorization header is only added if access_token exists
      ...(session?.access_token && {
        Authorization: `Bearer ${session.access_token}`,
      }),
    },
    generateId: () => uuidv4(),
    onFinish: async (message) => {
      console.log("[UnifiedChatContainer] Chat finished, message:", message);
      // Fetch session info again to update title if it was a new chat that just got created/named by the backend
      if (currentChatId) {
        // Ensure currentChatId is valid before fetching
        await fetchSessionInfo(currentChatId);
      }
    },
    onError: (err) => {
      console.error(
        "[UnifiedChatContainer] useChat hook error:",
        err,
        "Stringified:",
        JSON.stringify(err),
      );
      const errorMessage =
        (err as any)?.message || "An error occurred in chat. Please try again.";
      toast({
        title: "Chat Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  // === Effects ===

  // Effect to add event listeners for toggling panels
  useEffect(() => {
    const handleToggleDocumentProcessor = () => {
      setIsDocumentProcessorVisible((v) => !v);
    };

    const handleToggleResearch = () => {
      setIsResearchVisible((v) => !v);
    };

    const handleToggleWebScraper = () => {
      setIsWebScraperVisible((v) => !v);
    };

    const handleToggleAnalytics = () => {
      setIsAnalyticsVisible((v) => !v);
    };

    document.addEventListener(
      "toggle-document-processor",
      handleToggleDocumentProcessor,
    );
    document.addEventListener("toggle-research", handleToggleResearch);
    document.addEventListener("toggle-web-scraper", handleToggleWebScraper);
    document.addEventListener("toggle-analytics", handleToggleAnalytics);

    return () => {
      document.removeEventListener(
        "toggle-document-processor",
        handleToggleDocumentProcessor,
      );
      document.removeEventListener("toggle-research", handleToggleResearch);
      document.removeEventListener(
        "toggle-web-scraper",
        handleToggleWebScraper,
      );
      document.removeEventListener("toggle-analytics", handleToggleAnalytics);
    };
  }, []);

  // Effect to update currentChatId when the id prop changes
  useEffect(() => {
    if (id && id !== currentChatId) {
      console.log(
        `[UnifiedChatContainer] ID prop changed. Updating currentChatId from ${currentChatId} to ${id}`,
      );
      setCurrentChatId(id);
      // Reset artifact and potentially other state when chat ID changes
      resetArtifact();
      // The useChat hook will automatically reload messages based on the new id
    } else if (!id) {
      // If no ID is provided (e.g., new chat page), ensure we have a local ID
      // but don't necessarily fetch history yet.
      if (!currentChatId) {
        const newId = uuidv4();
        console.log(
          `[UnifiedChatContainer] No ID prop found, generating new local ID: ${newId}`,
        );
        setCurrentChatId(newId);
      }
    }
  }, [id, currentChatId, resetArtifact]);

  // Effect to fetch session info when currentChatId changes
  useEffect(() => {
    // Only fetch if currentChatId is a valid, non-empty string
    if (currentChatId && currentChatId.trim() !== "") {
      fetchSessionInfo(currentChatId);
    } else {
      console.log(
        "[UnifiedChatContainer] Skipping fetchSessionInfo in useEffect because currentChatId is invalid or empty:",
        currentChatId,
      );
      // Reset title if chat ID becomes invalid (e.g. navigating from existing chat to new chat directly)
      setCurrentTitle("New Conversation");
    }
  }, [currentChatId, fetchSessionInfo]);

  const lastProcessedDataIndex = useRef(-1);
  useEffect(() => {
    if (!data?.length || data.length === lastProcessedDataIndex.current + 1)
      return;
    const newDataPoints = data.slice(
      lastProcessedDataIndex.current + 1,
    ) as StreamDataPoint[];
    lastProcessedDataIndex.current = data.length - 1;
    console.log("Processing data stream points:", newDataPoints);
    newDataPoints.forEach((delta: StreamDataPoint) => {
      const definition = artifactDefinitions.find(
        (def: any) => def.kind === artifactState.kind,
      );
      if (definition?.onStreamPart) {
        definition.onStreamPart({
          streamPart: adaptStreamPointToDelta(delta),
          setArtifact,
        });
      }
      setArtifact((currentArtifact) => {
        const draftArtifact = currentArtifact ?? {
          ...initialArtifactData,
          status: "streaming",
        };
        if (!draftArtifact) return draftArtifact;
        switch (delta.type) {
          case "artifact_kind":
            return {
              ...initialArtifactData,
              kind: delta.content as ArtifactKind,
              status: "streaming",
            };
          case "artifact_id":
            return {
              ...draftArtifact,
              documentId: delta.content as string,
              status: "streaming",
            };
          case "artifact_title":
            return {
              ...draftArtifact,
              title: delta.content as string,
              status: "streaming",
            };
          case "artifact_clear":
            return { ...draftArtifact, content: "", status: "streaming" };
          case "artifact_finish":
            return { ...draftArtifact, status: "idle" };
          default:
            return draftArtifact;
        }
      });
    });
  }, [data, artifactState.kind, setArtifact]);

  // === Event Handlers ===
  const handleFormSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input.trim() && attachments.length === 0) return Promise.resolve();
      const validAttachments = attachments
        .filter((a) => a.url !== undefined)
        .map((a) => ({
          id: a.id,
          name: a.name,
          url: a.url as string,
          type: a.type,
          size: a.size ?? 0,
        }));
      const attachmentsPayload =
        validAttachments.length > 0 ? validAttachments : undefined;
      const dataToSend = attachmentsPayload
        ? { attachments: attachmentsPayload }
        : undefined;
      console.log("Submitting message with data:", dataToSend);
      handleSubmit(e, { data: dataToSend });
      setInput("");
      setAttachments([]);
      return Promise.resolve();
    },
    [input, attachments, handleSubmit, setInput],
  );

  const handleAppend = useCallback(
    async (messageOrMessages: Message | Message[]) => {
      if (!messageOrMessages) {
        console.warn("handleAppend called with empty message(s).");
        return Promise.resolve();
      }
      console.log("Appending message(s):", messageOrMessages);
      if (Array.isArray(messageOrMessages)) {
        for (const msg of messageOrMessages) {
          if (msg.content) {
            await append(msg);
          }
        }
      } else if (messageOrMessages.content) {
        await append(messageOrMessages as CreateMessage);
      }
      return Promise.resolve();
    },
    [append],
  );

  const handleNewSession = useCallback(async () => {
    const newId = uuidv4();
    console.log(`Starting new session: ${newId}`);
    setCurrentChatId(newId);
    setMessages([]);
    setAttachments([]);
    setInput("");
    resetArtifact();
    setCurrentTitle("New Conversation");
    toast({
      title: "New chat started",
      description: `Session ID: ${newId.substring(0, 6)}...`,
    });
    return Promise.resolve();
  }, [setInput, toast, setMessages, resetArtifact]);

  const handleSessionChange = useCallback(
    (sessionId: string) => {
      if (sessionId === currentChatId) return;
      console.log(`Changing session to: ${sessionId}`);
      setCurrentChatId(sessionId);
      setAttachments([]);
      setInput("");
    },
    [currentChatId, setInput],
  );

  const toggleArtifact = useCallback(() => {
    /* Visibility now derived from artifactState.kind */
  }, []);
  const toggleResearch = useCallback(() => setIsResearchVisible((v) => !v), []);
  const toggleDocumentProcessor = useCallback(
    () => setIsDocumentProcessorVisible((v) => !v),
    [],
  );
  const toggleWebScraper = useCallback(
    () => setIsWebScraperVisible((v) => !v),
    [],
  );
  const toggleAnalytics = useCallback(
    () => setIsAnalyticsVisible((v) => !v),
    [],
  );

  const handleModelChange = useCallback(
    (model: string) => setCurrentModel(model),
    [],
  );
  const handleVisibilityChange = useCallback(
    (vis: string) => setCurrentVisibility(vis),
    [],
  );

  const handleTitleChangeFromHeader = useCallback((newTitle: string) => {
    setCurrentTitle(newTitle);
  }, []);

  if (!user && !isReadonly) {
    return (
      <Card className="flex h-full items-center justify-center p-6">
        <p className="text-muted-foreground">
          Please sign in to start chatting
        </p>
      </Card>
    );
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <UnifiedChatHeader
        chatId={currentChatId}
        initialTitle={currentTitle}
        selectedModel={currentModel}
        selectedVisibility={currentVisibility}
        onModelChange={handleModelChange}
        onVisibilityChange={handleVisibilityChange}
        onTitleChange={handleTitleChangeFromHeader}
        isReadonly={isReadonly}
        onNewSession={handleNewSession}
        onSessionChange={handleSessionChange}
        toggleArtifact={toggleArtifact}
        toggleResearch={toggleResearch}
        toggleDocumentProcessor={toggleDocumentProcessor}
        toggleWebScraper={toggleWebScraper}
        toggleAnalytics={toggleAnalytics}
        isArtifactVisible={isArtifactVisible}
        isResearchVisible={isResearchVisible}
        isDocumentProcessorVisible={isDocumentProcessorVisible}
        isWebScraperVisible={isWebScraperVisible}
        isAnalyticsVisible={isAnalyticsVisible}
      />
      <div className="flex-1 overflow-hidden flex relative">
        <div
          className={cn(
            "flex-1 overflow-y-auto p-4",
            isWebScraperVisible ||
              isResearchVisible ||
              isDocumentProcessorVisible ||
              isAnalyticsVisible
              ? "max-w-[calc(100%-350px)]"
              : "",
          )}
        >
          <UnifiedMessageList
            messages={messages}
            isLoading={isLoading}
            chatId={currentChatId}
          />
        </div>
        {isArtifactVisible && <UnifiedArtifact />}
        {isResearchVisible && (
          <UnifiedResearchContainer
            chatId={currentChatId}
            append={handleAppend}
            messages={messages}
            isLoading={isLoading}
            isVisible={isResearchVisible}
            className="w-[350px] flex-shrink-0"
          />
        )}
        {isDocumentProcessorVisible && (
          <UnifiedDocumentProcessor
            chatId={currentChatId}
            append={handleAppend}
            attachments={attachments}
            isLoading={isLoading}
            isVisible={isDocumentProcessorVisible}
            className="w-[350px] flex-shrink-0"
          />
        )}
        {isWebScraperVisible && (
          <UnifiedWebScraper
            chatId={currentChatId}
            append={handleAppend}
            isLoading={isLoading}
            isVisible={isWebScraperVisible}
            className="w-[350px] flex-shrink-0"
          />
        )}
        {isAnalyticsVisible && (
          <ChatAnalytics
            chatId={currentChatId}
            className="w-[350px] flex-shrink-0"
          />
        )}
      </div>
      <div className="border-t p-4">
        <UnifiedSuggestions append={handleAppend} messages={messages} />
        <UnifiedMessageInput
          input={input}
          setInput={setInput}
          handleSubmit={handleFormSubmit}
          isLoading={isLoading}
          stop={stop}
          attachments={attachments}
          setAttachments={setAttachments}
          chatId={currentChatId}
          chatError={
            chatHookError && !isLoading ? (chatHookError.message ?? null) : null
          }
        />
      </div>
    </div>
  );
}
