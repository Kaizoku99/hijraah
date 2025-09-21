"use client";

import { type UIMessage } from "ai";
import {
  Copy,
  MoreVertical,
  ThumbsDown,
  ThumbsUp,
  Check,
  Bot,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import remarkGfm from "remark-gfm";

import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

import { UnifiedMarkdown } from "./UnifiedMarkdown";
import {
  Message as AIMessage,
  MessageContent,
  MessageAvatar,
  Actions,
  Action,
  Response,
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtContent,
  ChainOfThoughtStep,
  Context,
  ContextTrigger,
  ContextContent,
  ContextContentHeader,
  ContextContentBody,
  ContextInputUsage,
  ContextOutputUsage,
  Sources,
  SourcesTrigger,
  SourcesContent,
  Source,
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
  InlineCitation,
  InlineCitationText,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselPrev,
  InlineCitationCarouselNext,
  InlineCitationSource,
  InlineCitationQuote,
} from "./ai-elements";

interface UnifiedMessageProps {
  message: UIMessage & {
    reasoning?: string;
    sources?: Array<{
      title: string;
      url: string;
      description?: string;
    }>;
    tools?: Array<{
      type: string;
      state:
        | "input-streaming"
        | "input-available"
        | "output-available"
        | "output-error";
      input?: any;
      output?: any;
      errorText?: string;
    }>;
    usage?: {
      inputTokens?: number;
      outputTokens?: number;
      reasoningTokens?: number;
      cachedInputTokens?: number;
    };
    modelId?: string;
  };
  isLastMessage?: boolean;
  chatId: string;
  isReasoningStreaming?: boolean;
}

// Helper function to extract text content from UIMessage parts
function extractTextContent(message: UIMessage): string {
  if (!message.parts || message.parts.length === 0) {
    return "";
  }

  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => {
      if (part.type === "text") {
        return part.text || "";
      }
      return "";
    })
    .join("");
}

// Helper function to get full message content for operations like clipboard
function getFullMessageContent(message: UIMessage): string {
  const textContent = extractTextContent(message);

  // If there's legacy content property (for backward compatibility), use it
  if ("content" in message && typeof (message as any).content === "string") {
    return (message as any).content;
  }

  return textContent;
}

export function UnifiedMessage({
  message,
  isLastMessage,
  chatId,
  isReasoningStreaming = false,
}: UnifiedMessageProps) {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState<"liked" | "disliked" | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const isUser = message.role === "user";

  // Debug message rendering - Context7 best practice: include all referenced values
  useEffect(() => {
    const textContent = extractTextContent(message);
    console.log("Rendering message:", message.id, textContent.substring(0, 50));
  }, [message]);

  const copyToClipboard = async () => {
    try {
      const content = getFullMessageContent(message);
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast({
        title: "Copied to clipboard",
        description: "Message content copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy message to clipboard",
        variant: "destructive",
      });
    }
  };

  const submitFeedback = async (type: "like" | "dislike") => {
    try {
      // Only allow feedback on assistant messages
      if (message.role !== "assistant") return;

      const newFeedback = type === "like" ? "liked" : "disliked";

      // Toggle feedback if already selected
      if (feedback === newFeedback) {
        setFeedback(null);
      } else {
        setFeedback(newFeedback);
      }

      const response = await fetch("/api/chat/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId: message.id,
          chatId,
          type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive",
      });
    }
  };

  // Helper function to process message content for inline citations
  const processMessageContent = (content: string) => {
    // Look for URLs in the message and wrap them with inline citations
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlPattern);

    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        // This is a URL, wrap it with inline citation
        return (
          <InlineCitation key={index}>
            <InlineCitationText>{part}</InlineCitationText>
            <InlineCitationCard>
              <InlineCitationCardTrigger sources={[part]} />
              <InlineCitationCardBody>
                <InlineCitationSource
                  title="External Link"
                  url={part}
                  description="Click to visit this link"
                />
              </InlineCitationCardBody>
            </InlineCitationCard>
          </InlineCitation>
        );
      }
      return part;
    });
  };

  // Extract text content for rendering
  const textContent = extractTextContent(message);

  return (
    <AIMessage from={message.role} className="w-full">
      <MessageAvatar
        src={isUser ? "/user-avatar.png" : "/bot-avatar.png"}
        name={isUser ? "User" : "Assistant"}
      />
      <MessageContent>
        {/* Enhanced Reasoning Display using ChainOfThought */}
        {message.reasoning && !isUser && (
          <ChainOfThought defaultOpen={isReasoningStreaming}>
            <ChainOfThoughtHeader>Chain of Thought</ChainOfThoughtHeader>
            <ChainOfThoughtContent>
              <ChainOfThoughtStep
                label="AI Reasoning Process"
                status={isReasoningStreaming ? "active" : "complete"}
                description="Model thinking through the problem"
              >
                <Response>{message.reasoning}</Response>
              </ChainOfThoughtStep>
            </ChainOfThoughtContent>
          </ChainOfThought>
        )}

        {/* Sources Display using ai-elements */}
        {message.sources && message.sources.length > 0 && !isUser && (
          <Sources>
            <SourcesTrigger count={message.sources.length} />
            <SourcesContent>
              {message.sources.map((source: any, index: number) => (
                <Source key={index} href={source.url} title={source.title}>
                  <span className="block font-medium">{source.title}</span>
                  {source.description && (
                    <span className="text-xs text-muted-foreground">
                      {source.description}
                    </span>
                  )}
                </Source>
              ))}
            </SourcesContent>
          </Sources>
        )}

        {/* Enhanced Tool Calls Display using ai-elements */}
        {message.tools && message.tools.length > 0 && !isUser && (
          <div className="space-y-2">
            {message.tools
              .filter((tool: any) => {
                // Enhanced defensive filtering for streaming updates
                return tool && 
                       typeof tool === 'object' && 
                       tool.type && 
                       tool.state &&
                       typeof tool.type === 'string' &&
                       typeof tool.state === 'string';
              })
              .map((tool: any, index: number) => {
                // Additional safety check during render
                try {
                  if (!tool || !tool.type || !tool.state) {
                    console.warn('Invalid tool data during render:', tool);
                    return null;
                  }
                  
                  return (
                    <Tool key={index}>
                      <ToolHeader type={tool.type} state={tool.state} />
                      <ToolContent>
                        {tool.input && <ToolInput input={tool.input} />}
                        {(tool.output || tool.errorText) && (
                          <ToolOutput
                            output={tool.output}
                            errorText={tool.errorText}
                          />
                        )}
                      </ToolContent>
                    </Tool>
                  );
                } catch (error) {
                  console.error('Error rendering tool:', error, tool);
                  return null;
                }
              })
              .filter(Boolean)} {/* Filter out null returns */}
          </div>
        )}

        {/* Main Message Content with Enhanced Response Component */}
        <div className="w-full">
          <Response
            className="prose prose-sm max-w-none dark:prose-invert"
            isStreaming={isLastMessage && !isUser}
            onContentUpdate={(content) => {
              // Optional: Handle content updates during streaming
            }}
          >
            {textContent}
          </Response>
        </div>

        {/* Context/Usage Information Display */}
        {message.usage && !isUser && isLastMessage && (
          <div className="mt-2 flex justify-end">
            <Context
              usedTokens={
                (message.usage.inputTokens || 0) +
                (message.usage.outputTokens || 0)
              }
              maxTokens={4000} // Default context window, could be dynamic based on model
              usage={{
                inputTokens: message.usage.inputTokens || 0,
                outputTokens: message.usage.outputTokens || 0,
                totalTokens:
                  (message.usage.inputTokens || 0) +
                  (message.usage.outputTokens || 0),
                ...(message.usage.reasoningTokens && {
                  reasoningTokens: message.usage.reasoningTokens,
                }),
                ...(message.usage.cachedInputTokens && {
                  cachedInputTokens: message.usage.cachedInputTokens,
                }),
              }}
              modelId={message.modelId as any}
            >
              <ContextTrigger />
              <ContextContent>
                <ContextContentHeader />
                <ContextContentBody>
                  <div className="space-y-2">
                    <ContextInputUsage />
                    <ContextOutputUsage />
                    {message.usage.reasoningTokens && <ContextOutputUsage />}
                  </div>
                </ContextContentBody>
              </ContextContent>
            </Context>
          </div>
        )}

        {/* Actions for assistant messages */}
        {!isUser && (
          <Actions className="opacity-0 group-hover:opacity-100 transition-opacity mt-2">
            <Action
              tooltip={
                feedback === "liked" ? "Remove like" : "Like this response"
              }
              onClick={() => submitFeedback("like")}
              className={cn(feedback === "liked" && "text-green-500")}
            >
              <ThumbsUp className="h-4 w-4" />
            </Action>
            <Action
              tooltip={
                feedback === "disliked"
                  ? "Remove dislike"
                  : "Dislike this response"
              }
              onClick={() => submitFeedback("dislike")}
              className={cn(feedback === "disliked" && "text-red-500")}
            >
              <ThumbsDown className="h-4 w-4" />
            </Action>
            <Action tooltip="Copy message" onClick={copyToClipboard}>
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Action>
            <Action tooltip="More options">
              <MoreVertical className="h-4 w-4" />
            </Action>
          </Actions>
        )}
      </MessageContent>
    </AIMessage>
  );
}
