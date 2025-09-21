"use client";

import { UIMessage } from "ai";
import { Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";

import { cn } from "@/lib/utils";

import { Suggestions, Suggestion } from "./ai-elements";

interface UnifiedSuggestionsProps {
  messages: UIMessage[];
  append: (message: UIMessage | UIMessage[]) => Promise<void>;
  className?: string;
}

// Fallback static suggestions for when dynamic generation fails
const fallbackInitialSuggestions = [
  "Can you explain the Canada Express Entry requirements?",
  "What documents do I need for a US H1B visa?",
  "Compare UK and Australia immigration policies",
  "How long does the immigration process usually take?",
];

const fallbackFollowUpSuggestions = [
  "Can you elaborate on the financial requirements?",
  "What are the next steps in the process?",
  "Are there any exceptions to these rules?",
];

// Types for dynamic suggestions
interface DynamicSuggestion {
  text: string;
  category: "initial" | "follow-up" | "contextual";
  confidence: number;
}

export function UnifiedSuggestions({
  messages,
  append,
  className,
}: UnifiedSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Add refs for request management
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastRequestHashRef = useRef<string>("");
  const requestCacheRef = useRef<Map<string, string[]>>(new Map());

  // Use messages directly but add proper debouncing in useEffect
  const messagesLength = messages.length;
  const lastMessageId = messages[messages.length - 1]?.id;

  // Create a stable hash for request deduplication
  const createRequestHash = useCallback((messages: UIMessage[], type: string) => {
    const messageIds = messages.map(m => m.id).join(',');
    const lastContent = messages[messages.length - 1]?.parts?.map(p => p.type === "text" ? p.text : "").join("") || "";
    return `${type}-${messages.length}-${messageIds}-${lastContent.slice(0, 50)}`;
  }, []);

  // Function to generate dynamic suggestions based on context
  const generateDynamicSuggestions = useCallback(async (
    messages: UIMessage[],
    type: "initial" | "follow-up" | "contextual"
  ): Promise<string[]> => {
    // Create request hash for deduplication
    const requestHash = createRequestHash(messages, type);
    
    // Check if we already have cached results
    if (requestCacheRef.current.has(requestHash)) {
      console.log("Using cached suggestions for:", requestHash);
      return requestCacheRef.current.get(requestHash)!;
    }
    
    // Check if this is the same request as the last one
    if (lastRequestHashRef.current === requestHash) {
      console.log("Skipping duplicate request for:", requestHash);
      return [];
    }
    
    lastRequestHashRef.current = requestHash;

    try {
      // Cancel previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      setIsLoading(true);

      const response = await fetch("/api/suggestions/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          messages: messages.map((msg) => ({
            role: msg.role,
            content:
              msg.parts
                ?.map((part) => (part.type === "text" ? part.text : ""))
                .join(" ") || "",
          })),
          type,
          context: {
            conversationLength: messages.length,
            lastUserMessage:
              messages
                .filter((m) => m.role === "user")
                .pop()
                ?.parts?.map((part) => (part.type === "text" ? part.text : ""))
                .join(" ") || "",
            lastAssistantMessage:
              messages
                .filter((m) => m.role === "assistant")
                .pop()
                ?.parts?.map((part) => (part.type === "text" ? part.text : ""))
                .join(" ") || "",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate suggestions");
      }

      const data: DynamicSuggestion[] = await response.json();
      const suggestions = data.map((suggestion) => suggestion.text);
      
      // Cache the results
      requestCacheRef.current.set(requestHash, suggestions);
      
      // Clean up old cache entries (keep only last 10)
      if (requestCacheRef.current.size > 10) {
        const firstKey = requestCacheRef.current.keys().next().value;
        if (firstKey) {
          requestCacheRef.current.delete(firstKey);
        }
      }
      
      return suggestions;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.log("Request aborted for:", requestHash);
        return [];
      }
      
      console.warn(
        "Failed to generate dynamic suggestions, using fallback:",
        error
      );
      // Return fallback suggestions based on type
      return type === "initial"
        ? fallbackInitialSuggestions
        : fallbackFollowUpSuggestions;
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [createRequestHash]);

  // Enhanced logic for showing suggestions based on conversation context with debouncing
  useEffect(() => {
    // Debounce the effect to prevent rapid successive calls
    const timeoutId = setTimeout(async () => {
      // Skip if currently loading to prevent race conditions
      if (isLoading) return;
      
      if (messages.length === 0) {
        // Initial suggestions for new conversations
        const dynamicSuggestions = await generateDynamicSuggestions(
          messages,
          "initial"
        );
        if (dynamicSuggestions.length > 0) {
          setSuggestions(dynamicSuggestions);
          setIsVisible(true);
        }
      } else if (messages.length === 2) {
        // After first exchange, provide follow-up suggestions
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.role === "assistant") {
          // Generate contextual suggestions based on the assistant's response
          const dynamicSuggestions = await generateDynamicSuggestions(
            messages,
            "follow-up"
          );
          if (dynamicSuggestions.length > 0) {
            setSuggestions(dynamicSuggestions);
            setIsVisible(true);
          }
        } else {
          // If user sent the second message, hide suggestions for now
          setIsVisible(false);
        }
      } else if (messages.length > 2 && messages.length <= 6) {
        // Show contextual suggestions for ongoing conversations
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.role === "assistant") {
          const dynamicSuggestions = await generateDynamicSuggestions(
            messages,
            "contextual"
          );
          if (dynamicSuggestions.length > 0) {
            setSuggestions(dynamicSuggestions);
            setIsVisible(true);
          }
        } else {
          setIsVisible(false);
        }
      } else if (messages.length > 6) {
        // Hide suggestions after extended conversations to avoid clutter
        setIsVisible(false);
      } else {
        // Keep suggestions hidden if only one message exists (user's first message)
        setIsVisible(false);
      }
    }, 300); // 300ms debounce

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      // Cancel any pending request when component unmounts or dependencies change
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [messages, generateDynamicSuggestions, isLoading]);

  if (!isVisible || suggestions.length === 0) return null;

  const handleSuggestionClick = (suggestion: string) => {
    const newMessage: UIMessage = {
      id: crypto.randomUUID(),
      role: "user",
      parts: [{ type: "text", text: suggestion }],
    };
    append(newMessage);
    // Clear suggestions after selection to prevent confusion
    setSuggestions([]);
    setIsVisible(false);
  };

  return (
    <div className={cn("mb-4", className)}>
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">
          Suggested questions
        </span>
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>
      <Suggestions>
        {suggestions.map((suggestion, index) => (
          <Suggestion
            key={index}
            suggestion={suggestion}
            onClick={handleSuggestionClick}
            variant="outline"
            size="sm"
            className="text-xs whitespace-nowrap"
          />
        ))}
      </Suggestions>
    </div>
  );
}
