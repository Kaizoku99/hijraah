"use client";

import {
  useChat,
  type UIMessage as SDKMessage,
  type CreateUIMessage,
} from "@ai-sdk-tools/store";
import { DefaultChatTransport } from "ai";
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
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  useArtifactStore,
  useSetArtifact,
  useResetArtifact,
} from "@/hooks/use-artifact";

// Enhanced AI SDK Tools imports (v0.4 capabilities)
import { 
  useStreamingArtifactManager,
  useAllArtifacts,
  useEnhancedErrorHandling,
  useArtifactAnalytics,
  useArtifactLifecycle,
  artifactUtils,
  ArtifactType
} from "@/artifacts/ai-sdk-tools";

import { useAuth } from "@/lib/auth/hooks";
import { useSupabaseBrowser } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { DataStreamDelta, ExtendedAttachment, StreamDataPoint } from "@/types";
import { chatPerformanceMonitor } from "@/lib/performance/chat-performance";
import { useAIDevtoolsEnhanced } from "@/components/ai/ai-devtools-wrapper";

import { ChatAnalytics } from "./chat-analytics";
import { UnifiedArtifact } from "./UnifiedArtifact";
import { UnifiedChatHeader } from "./UnifiedChatHeader";
import { UnifiedDocumentProcessor } from "./UnifiedDocumentProcessor";
import { UnifiedMessageInput } from "./UnifiedMessageInput";
import { UnifiedMessageList } from "./UnifiedMessageList";
import { UnifiedResearchContainer } from "./UnifiedResearchContainer";
import { UnifiedSuggestions } from "./UnifiedSuggestions";
import { StreamStatus } from "./StreamStatus";
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

  // === AI DevTools Integration for Enhanced Debugging ===
  const devtools = useAIDevtoolsEnhanced();
  
  // Log chat-specific DevTools events in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const chatStats = devtools.getChatStats();
      const chatEvents = devtools.getChatEvents();
      
      console.log("[UnifiedChatContainer] DevTools Chat Stats:", chatStats);
      console.log("[UnifiedChatContainer] Recent Chat Events:", chatEvents.slice(-5));
    }
  }, [devtools]);

  // === Enhanced Logging for Auth Session ===
  console.log(
    "[UnifiedChatContainer] Initial auth state - User:",
    user,
    "Session:",
    session
  );
  useEffect(() => {
    console.log(
      "[UnifiedChatContainer] Auth state update - User:",
      user,
      "Session:",
      session
    );
  }, [user, session]);

  // === State Management ===
  const [currentChatId, setCurrentChatId] = useState<string>(id || "");
  // Use a server-accepted default (matches ChatModelType enum on server)
  const [currentModel, setCurrentModel] = useState("gpt-4");
  const [currentVisibility, setCurrentVisibility] = useState("private");
  const [attachments, setAttachments] = useState<ExtendedAttachment[]>([]);
  const [currentTitle, setCurrentTitle] = useState("New Conversation");

  // Manual input state management (no longer provided by useChat)
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced state for reasoning and tools
  const [isReasoningStreaming, setIsReasoningStreaming] = useState(false);
  const [currentReasoning, setCurrentReasoning] = useState<string>("");
  const [activeTools, setActiveTools] = useState<Array<any>>([]);

  // Resumable streaming state
  const [isResuming, setIsResuming] = useState(false);
  const [hasStreamError, setHasStreamError] = useState(false);
  const [streamErrorMessage, setStreamErrorMessage] = useState<string>("");

  // Get artifact state/setters from Zustand store
  const artifactState = useArtifactStore((state) => state.artifact);
  const setArtifact = useSetArtifact();
  const resetArtifact = useResetArtifact();

  // Enhanced AI SDK Tools v0.4 integration
  const streamingManager = useStreamingArtifactManager();
  const allArtifacts = useAllArtifacts();
  const { current: currentArtifact, currentArtifactType, artifactStats, hasActiveArtifacts } = allArtifacts;
  
  // Real-time analytics and lifecycle monitoring
  const analytics = useArtifactAnalytics();
  useArtifactLifecycle(); // Automatic lifecycle monitoring with toast notifications
  
  // Enhanced error handling with v0.4 features
  const artifactErrorHandling = useEnhancedErrorHandling({
    retryConfig: { maxRetries: 5, baseDelay: 1000 },
    onRetry: (attempt, error) => {
      console.log(`[Chat] Artifact retry attempt ${attempt}:`, error.message);
    },
    onRecovery: (attempt) => {
      console.log(`[Chat] Artifact recovered after ${attempt} attempts`);
      toast({
        title: "Recovered",
        description: `Artifact generation resumed successfully after ${attempt} attempts`,
      });
    },
  });

  // Panel Visibility State (Enhanced artifact visibility detection)
  const isArtifactVisible = artifactState.kind !== null || currentArtifact !== null;
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
          "[UnifiedChatContainer] Supabase client not available in fetchSessionInfo."
        );
        setCurrentTitle("New Conversation"); // Fallback
        return;
      }
      if (!chatId) {
        console.warn(
          "[UnifiedChatContainer] fetchSessionInfo called with no chatId."
        );
        // Don't try to fetch if no chatId, could be a new chat not yet saved.
        setCurrentTitle("New Conversation"); // Set to default for new/unsaved chat
        return;
      }
      console.log(
        `[UnifiedChatContainer] Attempting to fetch info for chat ID: '${chatId}'`
      );
      try {
        // Log current Supabase auth session state again just before the critical fetch
        const { data: currentAuthSession, error: currentAuthError } =
          await supabase.auth.getSession();
        console.log(
          "[UnifiedChatContainer] Supabase Auth Session right before fetching chat_sessions:",
          currentAuthSession,
          "Auth Error (if any):",
          currentAuthError
        );
        if (currentAuthError) {
          console.error(
            "[UnifiedChatContainer] Supabase auth error before fetching chat_sessions:",
            currentAuthError
          );
          // Potentially stop here if auth is the issue
        }
        if (!currentAuthSession?.session) {
          console.warn(
            "[UnifiedChatContainer] No active Supabase session before fetching chat_sessions. This might lead to RLS issues."
          );
        }

        const { data, error } = await supabase
          .from("chat_sessions")
          .select("*")
          .eq("id", chatId)
          .maybeSingle();

        // If no row yet, this is expected for a brand-new chat (chat row is created on first message)
        if (!error && !data) {
          console.debug(
            `[UnifiedChatContainer] No existing session for ${chatId} yet (new chat). Using default title until first message creates it.`
          );
          setCurrentTitle("New Conversation");
          return;
        }

        if (error) {
          // Only retry on actual errors (e.g., transient issues), not on empty results
          for (let attempt = 1; attempt <= 3; attempt++) {
            await new Promise((res) => setTimeout(res, attempt * 500));
            const { data: retryData, error: retryErr } = await supabase
              .from("chat_sessions")
              .select("*")
              .eq("id", chatId)
              .maybeSingle();
            if (!retryErr && retryData?.title) {
              setCurrentTitle(retryData.title);
              return;
            }
          }
          console.error(
            "[UnifiedChatContainer] Error fetching session info from 'chat_sessions' table. Chat ID:",
            chatId,
            "Supabase Error:",
            error
          );
          setCurrentTitle("New Conversation");
          return;
        }

        if (data && data.title) {
          console.log(
            `[UnifiedChatContainer] Successfully fetched and set title: ${data.title} for chat ID: ${chatId}`
          );
          setCurrentTitle(data.title);
        } else {
          console.log(
            `[UnifiedChatContainer] No session title found for chat ID: ${chatId}, using default. Data received:`,
            data
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
          err?.stack
        );
        setCurrentTitle("New Conversation");
      }
    },
    [supabase] // supabase client is the key dependency here
  );

  // === Optimized useChat Hook with Deferred Streaming ===
  const apiEndpointForChat = "/api/chat";
  const [shouldStartStream, setShouldStartStream] = useState(false);

  console.log(
    `[UnifiedChatContainer] useChat API endpoint: ${apiEndpointForChat}, shouldStartStream: ${shouldStartStream}`
  );

  const {
    messages,
    sendMessage,
    stop,
    error: chatHookError, // Renamed to avoid conflict with other 'error' variables
    setMessages,
    resumeStream, // Add resumeStream function from useChat
  } = useChat({
    id: currentChatId || undefined, // Only pass ID if we have one
    messages: [],
    transport: new DefaultChatTransport({
      api: apiEndpointForChat,
      // Use dynamic headers so we always send the latest access token
      headers: () => {
        const token = session?.access_token;
        const headers: Record<string, string> = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        return headers;
      },
      // Ensure cookies (like Supabase auth cookies) are included on requests
      credentials: "include",
      body: {
        selectedChatModel: currentModel,
        visibility: currentVisibility,
      },
    }),
    // Enable resumable streaming only when user starts interacting AND we have a chat ID
    resume: shouldStartStream && !!currentChatId,
    onFinish: async (message) => {
      console.log("[UnifiedChatContainer] Chat finished, message:", message);
      setIsLoading(false);
      setHasStreamError(false);
      setStreamErrorMessage("");

      // Mark stream as completed for performance tracking
      if (currentChatId) {
        chatPerformanceMonitor.markStreamEnd(currentChatId);
        // Ensure currentChatId is valid before fetching
        await fetchSessionInfo(currentChatId);
      }
    },
    onError: (err) => {
      console.error(
        "[UnifiedChatContainer] useChat hook error:",
        err,
        "Stringified:",
        JSON.stringify(err)
      );
      setIsLoading(false);
      setIsResuming(false);
      setHasStreamError(true);

      // Context7 - Enhanced error handling for different error types
      let userErrorMessage = "An error occurred in chat. Please try again.";
      let errorTitle = "Chat Error";

      if (err && typeof err === "object") {
        const errorObj = err as any;
        const errorMessage = errorObj?.message || String(err);

        // Handle specific Gateway errors
        if (
          errorMessage.includes("Gateway request failed") ||
          errorMessage.includes("gateway")
        ) {
          userErrorMessage =
            "AI Gateway connection failed. Please check your connection and try again.";
          errorTitle = "Connection Error";
        } else if (
          errorMessage.includes("timeout") ||
          errorMessage.includes("TIMEOUT")
        ) {
          userErrorMessage = "Request timed out. Please try again.";
          errorTitle = "Timeout Error";
        } else if (
          errorMessage.includes("unauthorized") ||
          errorMessage.includes("UNAUTHORIZED") ||
          errorMessage.includes("401")
        ) {
          userErrorMessage =
            "Authentication failed. Please refresh the page and try again.";
          errorTitle = "Authentication Error";
        } else if (
          errorMessage.includes("rate limit") ||
          errorMessage.includes("RATE_LIMIT") ||
          errorMessage.includes("429")
        ) {
          userErrorMessage =
            "Rate limit exceeded. Please wait a moment and try again.";
          errorTitle = "Rate Limit";
        } else if (
          errorMessage.includes("network") ||
          errorMessage.includes("NETWORK") ||
          errorMessage.includes("Failed to fetch")
        ) {
          userErrorMessage =
            "Network connection failed. Please check your internet connection and try again.";
          errorTitle = "Network Error";
        } else if (errorMessage.includes("Invalid error response format")) {
          userErrorMessage =
            "Server response format error. Our team has been notified.";
          errorTitle = "Server Error";
        } else {
          // Use the actual error message if it's user-friendly, otherwise use default
          userErrorMessage =
            errorMessage.length < 100 ? errorMessage : userErrorMessage;
        }
      }

      setStreamErrorMessage(userErrorMessage);
      toast({
        title: errorTitle,
        description: userErrorMessage,
        variant: "destructive",
      });
    },
  });

  // === Enhanced Stream Data Handling with AI SDK Tools ===
  
  // Handle streaming data updates from the chat API
  const handleStreamData = useCallback(async (streamData: StreamDataPoint[]) => {
    if (!streamData || streamData.length === 0) return;
    
    console.log('[UnifiedChatContainer] Processing stream data:', streamData.length, 'chunks');
    
    for (const point of streamData) {
      try {
        // Convert to standardized format
        const delta = adaptStreamPointToDelta(point);
        
        // Handle reasoning updates
        if (point.type === 'reasoning_delta') {
          setCurrentReasoning(prev => prev + (point.content || ''));
          setIsReasoningStreaming(true);
        } else if (point.type === 'reasoning_finish') {
          setIsReasoningStreaming(false);
        }
        
        // Handle tool updates
        else if (point.type === 'tool_call') {
          setActiveTools(prev => [...prev, point.content]);
        }
        
        // Handle artifact updates through AI SDK Tools streaming manager
        else if (point.type.startsWith('artifact_')) {
          await artifactErrorHandling.executeWithRetry(async () => {
            await streamingManager.processStreamData(delta);
          });
        }
        
        // Handle other stream data types
        else {
          console.log('[UnifiedChatContainer] Unhandled stream data type:', point.type);
        }
        
      } catch (error) {
        console.error('[UnifiedChatContainer] Error processing stream data:', error);
        toast({
          title: "Stream Error",
          description: "Error processing streaming data",
          variant: "destructive",
        });
      }
    }
  }, [streamingManager, artifactErrorHandling, toast]);

  // === Effects ===

  // Effect to auto-resume interrupted streams with Context7 guards
  useEffect(() => {
    // Context7 - Comprehensive validation before auto-resume attempt
    if (
      currentChatId &&
      currentChatId.trim() !== "" &&
      resumeStream &&
      typeof resumeStream === "function" &&
      shouldStartStream &&
      !isLoading &&
      !isResuming
    ) {
      // Auto-resume any interrupted streams for this chat
      console.log(
        `[UnifiedChatContainer] Attempting to auto-resume streams for chat: ${currentChatId}`
      );
      try {
        resumeStream();
      } catch (error) {
        console.warn(
          "[UnifiedChatContainer] Failed to auto-resume stream:",
          error
        );
        // Don't show error to user as this is expected when no stream exists to resume
        // Just log for debugging purposes
      }
    }
  }, [currentChatId, resumeStream, shouldStartStream, isLoading, isResuming]);

  // Enhanced resume function with Context7 error handling and proper guards
  const handleResumeStream = useCallback(async () => {
    // Context7 - Comprehensive validation before attempting resume
    if (!resumeStream) {
      console.warn(
        "[UnifiedChatContainer] resumeStream function not available"
      );
      toast({
        title: "Resume not available",
        description: "Stream resume functionality is not currently available.",
        variant: "destructive",
      });
      return;
    }

    if (!currentChatId || currentChatId.trim() === "") {
      console.warn("[UnifiedChatContainer] Cannot resume: No valid chat ID");
      toast({
        title: "Resume failed",
        description: "Cannot resume stream without a valid chat session.",
        variant: "destructive",
      });
      return;
    }

    if (!shouldStartStream) {
      console.warn("[UnifiedChatContainer] Cannot resume: Stream not enabled");
      toast({
        title: "Resume failed",
        description: "Stream resumption is not enabled for this chat.",
        variant: "destructive",
      });
      return;
    }

    setIsResuming(true);
    setHasStreamError(false);
    setStreamErrorMessage("");

    try {
      console.log(
        `[UnifiedChatContainer] Manually resuming stream for chat: ${currentChatId}`
      );

      // Context7 - Type-safe function call with error boundary
      await resumeStream();

      toast({
        title: "Stream resumed",
        description: "Successfully resumed the interrupted response.",
      });
    } catch (error) {
      console.error("[UnifiedChatContainer] Manual resume failed:", error);

      // Context7 - Enhanced error handling with specific error types
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error occurred during stream resume";

      setHasStreamError(true);
      setStreamErrorMessage(errorMessage);

      // Context7 - User-friendly error messages based on error type
      let userErrorMessage = "Could not resume the stream. Please try again.";
      if (errorMessage.includes("Gateway")) {
        userErrorMessage =
          "Gateway connection failed. Please check your connection and try again.";
      } else if (errorMessage.includes("timeout")) {
        userErrorMessage = "Resume operation timed out. Please try again.";
      } else if (errorMessage.includes("unauthorized")) {
        userErrorMessage =
          "Authentication failed. Please refresh and try again.";
      }

      toast({
        title: "Resume failed",
        description: userErrorMessage,
        variant: "destructive",
      });
    } finally {
      setIsResuming(false);
    }
  }, [resumeStream, currentChatId, shouldStartStream, toast]);

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
      handleToggleDocumentProcessor
    );
    document.addEventListener("toggle-research", handleToggleResearch);
    document.addEventListener("toggle-web-scraper", handleToggleWebScraper);
    document.addEventListener("toggle-analytics", handleToggleAnalytics);

    return () => {
      document.removeEventListener(
        "toggle-document-processor",
        handleToggleDocumentProcessor
      );
      document.removeEventListener("toggle-research", handleToggleResearch);
      document.removeEventListener(
        "toggle-web-scraper",
        handleToggleWebScraper
      );
      document.removeEventListener("toggle-analytics", handleToggleAnalytics);
    };
  }, []);

  // Effect to update currentChatId when the id prop changes
  useEffect(() => {
    if (id && id !== currentChatId) {
      console.log(
        `[UnifiedChatContainer] ID prop changed. Updating currentChatId from ${currentChatId} to ${id}`
      );

      // Start performance tracking for existing chat
      chatPerformanceMonitor.startTracking(id);

      setCurrentChatId(id);
      // Reset artifact and potentially other state when chat ID changes
      resetArtifact();
      // The useChat hook will automatically reload messages based on the new id
    } else if (!id && !currentChatId) {
      // If no ID is provided and we don't have a current chat ID,
      // don't generate one yet - wait until user sends a message
      console.log(
        `[UnifiedChatContainer] No ID prop and no current chat ID - will generate when needed`
      );
    }
  }, [id, currentChatId, resetArtifact]);

  // Load chat metadata quickly on mount - defer stream until needed
  useEffect(() => {
    const loadChatMetadata = async () => {
      if (!currentChatId || !session?.access_token) return;

      try {
        const response = await fetch(`/api/chat/${currentChatId}/metadata`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (response.ok) {
          const metadata = await response.json();
          console.log(
            `[UnifiedChatContainer] Loaded chat metadata in ${metadata.loadTime}ms:`,
            metadata
          );

          // Mark chat as loaded for performance tracking
          chatPerformanceMonitor.markChatLoaded(currentChatId);

          // Update session info with lightweight metadata using functional updates
          // Context7 - Use functional updates to avoid dependency array issues
          setCurrentTitle(metadata.title);
          setCurrentModel((prev) => metadata.model || prev);
          setCurrentVisibility((prev) => metadata.visibility || prev);

          // If chat has existing messages, enable streaming immediately for resume capability
          if (metadata.hasMessages) {
            setShouldStartStream(true);
          }
        }
      } catch (error) {
        console.warn(
          "[UnifiedChatContainer] Failed to load metadata, falling back to full fetch:",
          error
        );
        // Fallback to full session info fetch
        if (currentChatId) {
          fetchSessionInfo(currentChatId);
        }
      }
    };

    loadChatMetadata();
  }, [currentChatId, session?.access_token, fetchSessionInfo]);

  // Effect to fetch session info when currentChatId changes (fallback only)
  useEffect(() => {
    // Only fetch if currentChatId is a valid, non-empty string and metadata didn't load
    if (currentChatId && currentChatId.trim() !== "") {
      // The metadata endpoint will handle the fast path, this is just the fallback
      console.log(
        "[UnifiedChatContainer] Session metadata loaded via fast path"
      );
    } else {
      console.log(
        "[UnifiedChatContainer] Skipping fetchSessionInfo in useEffect because currentChatId is invalid or empty:",
        currentChatId
      );
      // Reset title if chat ID becomes invalid (e.g. navigating from existing chat to new chat directly)
      setCurrentTitle("New Conversation");
    }
  }, [currentChatId, fetchSessionInfo]);

  // === Event Handlers ===
  const handleFormSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input.trim() && attachments.length === 0) return Promise.resolve();

      // Generate chat ID if we don't have one yet (new chat scenario)
      let chatId = currentChatId;
      if (!chatId || chatId.trim() === "") {
        chatId = uuidv4();
        console.log(
          `[UnifiedChatContainer] Generated new chat ID for first message: ${chatId}`
        );
        setCurrentChatId(chatId);
      }

      setIsLoading(true);

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

      try {
        // Enable streaming when user sends first message
        if (!shouldStartStream) {
          setShouldStartStream(true);
          if (currentChatId) {
            chatPerformanceMonitor.markFirstMessage(currentChatId);
            chatPerformanceMonitor.markStreamStart(currentChatId);
          }
        }

        // AI SDK v5: sendMessage returns a Promise, not an object with state
        // Enhanced with AI SDK Tools streaming integration
        const messageData = {
          text: input,
          data: dataToSend,
          onStreamData: handleStreamData, // Attach stream data handler
        };
        
        await sendMessage(messageData);
        setInput("");
        setAttachments([]);
      } catch (error) {
        console.error("Error sending message:", error);
        setIsLoading(false);
        setHasStreamError(true);
        setStreamErrorMessage(error instanceof Error ? error.message : 'An error occurred');
      }

      return Promise.resolve();
    },
    [input, attachments, sendMessage, currentChatId, shouldStartStream]
  );

  const handleAppend = useCallback(
    async (messageOrMessages: Message | Message[]) => {
      if (!messageOrMessages) {
        console.warn("handleAppend called with empty message(s).");
        return Promise.resolve();
      }
      console.log("Appending message(s):", messageOrMessages);

      setIsLoading(true);

      try {
        if (Array.isArray(messageOrMessages)) {
          for (const msg of messageOrMessages) {
            // Extract text content from message parts
            const textContent =
              msg.parts
                ?.filter((part) => part.type === "text")
                ?.map((part) => (part as any).text)
                ?.join("") || "";

            if (textContent) {
              await sendMessage({ 
                text: textContent,
                onStreamData: handleStreamData,
              });
            }
          }
        } else {
          // Extract text content from message parts
          const textContent =
            messageOrMessages.parts
              ?.filter((part) => part.type === "text")
              ?.map((part) => (part as any).text)
              ?.join("") || "";

          if (textContent) {
            await sendMessage({ 
              text: textContent,
              onStreamData: handleStreamData,
            });
          }
        }
      } catch (error) {
        console.error("Error appending message:", error);
        setIsLoading(false);
      }

      return Promise.resolve();
    },
    [sendMessage]
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
    // Reset enhanced state
    setCurrentReasoning("");
    setActiveTools([]);
    setIsReasoningStreaming(false);
    toast({
      title: "New chat started",
      description: `Session ID: ${newId.substring(0, 6)}...`,
    });
    return Promise.resolve();
  }, [toast, setMessages, resetArtifact]);

  const handleSessionChange = useCallback(
    (sessionId: string) => {
      if (sessionId === currentChatId) return;
      console.log(`Changing session to: ${sessionId}`);
      setCurrentChatId(sessionId);
      setAttachments([]);
      setInput("");
    },
    [currentChatId]
  );

  const toggleArtifact = useCallback(() => {
    /* Visibility now derived from artifactState.kind */
  }, []);
  const toggleResearch = useCallback(() => setIsResearchVisible((v) => !v), []);
  const toggleDocumentProcessor = useCallback(
    () => setIsDocumentProcessorVisible((v) => !v),
    []
  );
  const toggleWebScraper = useCallback(
    () => setIsWebScraperVisible((v) => !v),
    []
  );
  const toggleAnalytics = useCallback(
    () => setIsAnalyticsVisible((v) => !v),
    []
  );

  const handleModelChange = useCallback(
    (model: string) => setCurrentModel(model),
    []
  );
  const handleVisibilityChange = useCallback(
    (vis: string) => setCurrentVisibility(vis),
    []
  );

  const handleTitleChangeFromHeader = useCallback((newTitle: string) => {
    setCurrentTitle(newTitle);
  }, []);

  if (!user && !isReadonly) {
    return (
      <Card className="flex h-full items-center justify-center p-6 border-dashed border-2 border-muted-foreground/20">
        <div className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">Welcome to Hijraah AI</h3>
          <p className="text-muted-foreground max-w-md">
            Please sign in to start your immigration journey with our AI-powered
            assistant
          </p>
          <Button className="mt-4">Get Started</Button>
        </div>
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
      <div className="flex-1 overflow-hidden flex relative transition-all duration-300 ease-in-out">
        <div
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
            isWebScraperVisible ||
              isResearchVisible ||
              isDocumentProcessorVisible ||
              isAnalyticsVisible
              ? "max-w-[calc(100%-350px)]"
              : ""
          )}
        >
          <UnifiedMessageList
            messages={messages.map((msg) => ({
              ...msg,
              reasoning:
                msg.id === messages[messages.length - 1]?.id
                  ? currentReasoning
                  : undefined,
              tools:
                msg.id === messages[messages.length - 1]?.id
                  ? activeTools
                  : undefined,
            }))}
            isLoading={isLoading}
            chatId={currentChatId}
            isReasoningStreaming={isReasoningStreaming}
          />
        </div>
        {isArtifactVisible && (
          <div className="animate-in slide-in-from-right duration-300 ease-in-out">
            <UnifiedArtifact />
          </div>
        )}
        {isResearchVisible && (
          <div className="animate-in slide-in-from-right duration-300 ease-in-out">
            <UnifiedResearchContainer
              chatId={currentChatId}
              append={handleAppend}
              messages={messages}
              isLoading={isLoading}
              isVisible={isResearchVisible}
              className="w-[350px] flex-shrink-0 border-l border-border"
            />
          </div>
        )}
        {isDocumentProcessorVisible && (
          <div className="animate-in slide-in-from-right duration-300 ease-in-out">
            <UnifiedDocumentProcessor
              chatId={currentChatId}
              append={handleAppend}
              attachments={attachments}
              isLoading={isLoading}
              isVisible={isDocumentProcessorVisible}
              className="w-[350px] flex-shrink-0 border-l border-border"
            />
          </div>
        )}
        {isWebScraperVisible && (
          <div className="animate-in slide-in-from-right duration-300 ease-in-out">
            <UnifiedWebScraper
              chatId={currentChatId}
              append={handleAppend}
              isLoading={isLoading}
              isVisible={isWebScraperVisible}
              className="w-[350px] flex-shrink-0 border-l border-border"
            />
          </div>
        )}
        {isAnalyticsVisible && (
          <div className="animate-in slide-in-from-right duration-300 ease-in-out">
            <ChatAnalytics
              chatId={currentChatId}
              className="w-[350px] flex-shrink-0 border-l border-border"
            />
          </div>
        )}
      </div>
      <div className="border-t p-4 bg-background/95 backdrop-blur-sm">
        <StreamStatus
          isStreaming={isLoading}
          isResuming={isResuming}
          hasError={hasStreamError}
          errorMessage={streamErrorMessage}
          onResume={handleResumeStream}
          onRetry={() => {
            // Create a mock form event for retry
            const mockEvent = new Event("submit", {
              bubbles: true,
              cancelable: true,
            }) as any;
            mockEvent.preventDefault = () => {};
            handleFormSubmit(mockEvent);
          }}
          className="mb-4"
        />
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
          chatError={chatHookError ? (chatHookError.message ?? null) : null}
          selectedModel={currentModel}
          onModelChange={handleModelChange}
          resumeStream={handleResumeStream}
        />
      </div>
    </div>
  );
}
