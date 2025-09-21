/**
 * AI-Unified Chat API Route - AI SDK v5 Compliant
 * 
 * Simplified version following Context7 best practices for error handling
 */

// Import polyfills first to ensure Web Streams API is available
import "@/lib/polyfills";

import { 
  streamText, 
  convertToModelMessages, 
  tool,
  createUIMessageStream,
  createUIMessageStreamResponse,
  validateUIMessages,
  stepCountIs,
  hasToolCall,
  generateId,
  JsonToSseTransformStream
} from "ai";
import { openai } from "@ai-sdk/openai";
import { v4 as uuidv4, validate as validateUuid } from "uuid";
import { z } from "zod";
import { geolocation } from "@vercel/functions";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import fetchPonyfill from "fetch-ponyfill";
import { createResumableStreamContext, type ResumableStreamContext } from "resumable-stream";
import { after } from "next/server";
import { 
  saveChat,
  clearActiveStream,
  setActiveStream,
  loadStreams,
  loadActiveStreamId 
} from "@/lib/chat-store";

// Internal imports (alphabetized for import/order)
import { ChatModelType } from "@/core/chat/entities/chat";
import {
  Chat,
  type ChatVisibility as ChatVisibilityType,
} from "@/core/chat/entities/chat";
import {
  ChatRepository,
  DBChatSessionInsert,
} from "@/infrastructure/repositories/chat-repository";
import {
  AIConfig,
  selectModelForTask,
  getModelInstance,
  trackModelUsage,
} from "@/lib/ai/config";
import {
  type RequestHints,
  systemPrompt as genericSystemPrompt,
} from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";
import { dbMessageToAIMessage } from "@/lib/ai-sdk-adapter";
import { logger } from "@/lib/logger";
import { trackEvent } from "@/lib/monitoring";
import { RAGPipelineFactory, type RAGDependencies } from "@hijraah/rag";
import { RateLimitService } from "@/services/rate-limit-service";
import { Json } from "@/types/database.types";

// Configuration
export const maxDuration = 60;
export const runtime = "nodejs";

// Enhanced Tool Definitions - AI SDK v5 Beta Compliant
const getWeatherTool = tool({
  description: "Get the current weather at a specific location",
  inputSchema: z.object({
    latitude: z.number().describe("Latitude coordinate"),
    longitude: z.number().describe("Longitude coordinate"),
  }),
  execute: async ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
    );
    const weatherData = await response.json();
    return weatherData;
  },
});

const createDocumentTool = (session: any) =>
  tool({
    description: "Create a new document with specified content and metadata",
    inputSchema: z.object({
      title: z.string().describe("Document title"),
      content: z.string().describe("Document content"),
      type: z.enum(["text", "markdown", "code"]).describe("Document type"),
      tags: z.array(z.string()).nullable().describe("Document tags"),
    }),
    execute: async ({
      title,
      content,
      type,
      tags,
    }: {
      title: string;
      content: string;
      type: "text" | "markdown" | "code";
      tags: string[] | null;
    }) => {
      // Simulate document creation
      const documentId = uuidv4();
      return {
        id: documentId,
        title,
        createdAt: new Date().toISOString(),
        success: true,
      };
    },
  });

const updateDocumentTool = (session: any) =>
  tool({
    description: "Update an existing document with new content",
    inputSchema: z.object({
      documentId: z.string().describe("Document ID to update"),
      content: z.string().describe("New document content"),
      title: z.string().nullable().describe("New document title"),
    }),
    execute: async ({
      documentId,
      content,
      title,
    }: {
      documentId: string;
      content: string;
      title: string | null;
    }) => {
      // Simulate document update
      return {
        id: documentId,
        updatedAt: new Date().toISOString(),
        success: true,
      };
    },
  });

// Validation schemas - simplified but complete
const chatVisibilityEnumValues: [ChatVisibilityType, ...ChatVisibilityType[]] =
  ["private", "public", "team"];

// Allow both legacy simple messages and AI SDK UIMessage format
const simpleMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1).max(10000),
  createdAt: z.any().optional(),
});

const uiMessagePartSchema = z.object({
  type: z.string(),
  text: z.string().optional(),
});

const uiMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant", "system"]),
  parts: z.array(uiMessagePartSchema).optional(),
  content: z.string().optional(),
  createdAt: z.any().optional(),
});

const postRequestSchema = z.object({
  id: z.string().uuid().optional(),
  messages: z.array(z.union([simpleMessageSchema, uiMessageSchema])).min(0), // Context7: Allow empty arrays for new chat creation per AI SDK v5 patterns
  selectedChatModel: z.nativeEnum(ChatModelType),
  visibility: z.enum(chatVisibilityEnumValues).optional(),
  description: z.string().max(1000).optional(),
  caseId: z.string().uuid().optional(),
  countryCode: z.string().length(2).optional(),
});

const updateChatSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  modelType: z.nativeEnum(ChatModelType).optional(),
  caseId: z.string().uuid().optional().nullable(),
  visibility: z.enum(chatVisibilityEnumValues).optional(),
});

// Global stream context
let globalStreamContext: ResumableStreamContext | null = null;

function getStreamContext() {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({ waitUntil: after });
    } catch (error: any) {
      if (!error.message.includes("REDIS_URL")) {
        logger.error("Failed to initialize resumable stream context", error);
      }
    }
  }
  return globalStreamContext;
}

// Helper functions
function extractChatIdFromPath(pathname: string): string | null {
  const parts = pathname.split("/");
  if (parts.length > 3 && parts[1] === "api" && parts[2] === "chat") {
    const potentialId = parts[3];
    return validateUuid(potentialId) ? potentialId : null;
  }
  return null;
}

function extractTextFromMessage(message: any): string | undefined {
  // Context7: Defensive coding - handle undefined/null messages gracefully
  if (!message) return undefined;

  // Support both simple message format (content) and UIMessage format (parts array)
  if (typeof message.content === "string") return message.content;
  const textPart = message.parts?.find((p: any) => p.type === "text");
  return textPart?.text;
}

// Import our new authentication adapter
import {
  authenticateRequest as authenticateRequestAdapter,
  createAuthErrorResponse,
  requirePermission,
  AuthenticationError,
  type AuthResult,
} from "./auth-adapter";

async function enhanceWithRAGContext(
  userMessage: string,
  userId: string
): Promise<string | null> {
  try {
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { fetch: ponyfetch } = fetchPonyfill();
    const openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      fetch: ponyfetch as unknown as typeof fetch,
    });

    // Skip RAG if Upstash config is missing to prevent runtime errors locally
    const hasVector =
      (!!process.env.UPSTASH_VECTOR_REST_URL &&
        !!process.env.UPSTASH_VECTOR_REST_TOKEN) ||
      (!!process.env.UPSTASH_VECTOR_URL && !!process.env.UPSTASH_VECTOR_TOKEN);
    const hasRedis =
      (!!process.env.UPSTASH_REDIS_REST_URL &&
        !!process.env.UPSTASH_REDIS_REST_TOKEN) ||
      (!!process.env.UPSTASH_REDIS_URL && !!process.env.UPSTASH_REDIS_TOKEN);
    if (!hasVector || !hasRedis) {
      logger.warn("RAG disabled: Upstash config missing");
      return null;
    }

    // Context7 Pattern: Create RAG dependencies
    const ragDependencies: RAGDependencies = {
      supabase: supabaseClient as any,
      openai: openaiClient as any,
      firecrawlApiKey: process.env.FIRECRAWL_API_KEY,
      mistralApiKey: process.env.MISTRAL_API_KEY,
    };

    // Context7 Pattern: Create RAG pipeline using the factory
    const ragFactory = new RAGPipelineFactory(ragDependencies, {
      retrieval: {
        defaultLimit: 10,
        defaultThreshold: 0.7,
        maxConcurrentQueries: 5,
        cacheEnabled: true,
        cacheTTL: 3600,
      },
      generation: {
        defaultModel: "gpt-4o",
        defaultTemperature: 0.7,
        maxTokens: 2048,
        enableCaching: true,
      },
      personalization: {
        enabled: true,
        learningRate: 0.1,
        historyLength: 50,
      },
    });

    const pipeline = ragFactory.createPipeline();

    // Context7 Pattern: Use the unified query method
    const ragResult = await pipeline.query(userMessage, { userId });

    // Context7 Pattern: Use the generator to create system prompt
    const generator = ragFactory.createContextGenerator();
    return generator.createSystemPrompt(
      generator.buildContext(
        ragResult.retrievalResult,
        ragResult.retrievalResult.userContext
      )
    );
  } catch (error) {
    logger.error(
      "RAG context enhancement failed",
      error instanceof Error ? error : new Error(String(error))
    );
    return null;
  }
}

// Main POST handler - AI SDK v5 Beta compliant
/**
 * Context7: Enhanced Chat API with Robust Input Handling
 *
 * This handler follows Context7 defensive programming patterns and AI SDK v5 best practices:
 *
 * 1. **Flexible Input Normalization**: Supports multiple payload formats including:
 *    - Standard `messages` array for existing chats
 *    - `initialMessage` string for new chat creation (converted to UIMessage format)
 *    - Legacy `message` object for backwards compatibility
 *
 * 2. **Robust Validation**: Uses Zod schemas with Context7 validation patterns:
 *    - Allows empty message arrays for new chat creation (`.min(0)`)
 *    - Converts simple messages to UIMessage format with `parts` array
 *    - Validates message structure following AI SDK UIMessage standards
 *    - Graceful handling of optional fields with defensive coding
 *
 * 3. **AI SDK v5 Compliance**: Implements latest patterns for:
 *    - Message validation with `validateUIMessages`
 *    - Enhanced streaming with resumable stream support
 *    - Proper error handling and type safety
 *
 * 4. **Defensive Programming**: Null guards and type safety throughout
 *    - `extractTextFromMessage` handles undefined/null inputs
 *    - Input normalization prevents runtime errors
 *    - Comprehensive error handling for all edge cases
 */
export async function POST(request: Request) {
  const startTime = Date.now();
  const { pathname } = new URL(request.url);
  const extractedChatId = extractChatIdFromPath(pathname);

  try {
    // Authentication - Context7 compliant with guest support
    let authResult: AuthResult;
    try {
      authResult = await authenticateRequestAdapter(request as any);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return createAuthErrorResponse(error);
      }
      throw error;
    }

    const { user: userFromAuth, isGuest } = authResult;
    const userId = userFromAuth.id;

    // Context7 - Observability: Log request with user context
    logger.info("Chat API request", {
      userId,
      isGuest,
      pathname,
      userAgent: request.headers.get("user-agent"),
    });

    // Rate limiting
    const rateLimitResult = await RateLimitService.isAllowed(
      userId,
      "api",
      "standard"
    );
    if (!rateLimitResult.success) {
      return new Response("Rate limit exceeded", {
        status: 429,
        headers: {
          "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        },
      });
    }

    const chatRepository = new ChatRepository();

    // Handle different endpoints
    if (extractedChatId && pathname.endsWith("/generate-title")) {
      return await handleGenerateTitle(extractedChatId, userId, chatRepository);
    }

    // Main chat endpoint
    if (pathname === "/api/chat" || pathname === "/api/chat/") {
      const body = await request.json();

      // Context7: Enhanced normalization with initialMessage support following AI SDK UIMessage patterns
      const initialMessageAsArray = body.initialMessage
        ? [
            {
              id: uuidv4(),
              role: "user" as const,
              parts: [{ type: "text", text: body.initialMessage }], // UIMessage format with parts array
              createdAt: new Date().toISOString(),
            },
          ]
        : [];

      const normalizedBody = {
        ...body,
        id: body.id && validateUuid(body.id) ? body.id : uuidv4(),
        messages:
          body.messages ||
          (body.message ? [body.message] : initialMessageAsArray), // Support initialMessage field
        visibility: body.visibility || body.selectedVisibilityType || "private",
        selectedChatModel: body.selectedChatModel || body.modelType || "gpt-4", // Map modelType to selectedChatModel
      };

      // Debug logging to see what we're receiving
      console.log("[Chat API Debug] Raw body:", JSON.stringify(body, null, 2));
      console.log(
        "[Chat API Debug] Normalized body:",
        JSON.stringify(normalizedBody, null, 2)
      );

      const validatedData = postRequestSchema.parse(normalizedBody);
      const {
        id: chatIdFromRequest,
        messages: clientMessages,
        selectedChatModel,
        visibility = "private",
        description,
        caseId,
        countryCode,
      } = validatedData;

      // Ensure chatIdFromRequest is defined after normalization
      const chatId = chatIdFromRequest || uuidv4();

      // Context7: Handle empty message arrays for new chat creation
      if (clientMessages.length === 0) {
        // Create empty chat session without AI processing
        const chatRepository = new ChatRepository();

        const chatData: DBChatSessionInsert = {
          id: chatId,
          user_id: userId,
          title: "New Chat",
          model: selectedChatModel,
          visibility,
          case_id: caseId || null,
          metadata: {
            createdAt: new Date().toISOString(),
          },
        };

        await chatRepository.create(chatData);

        return new Response(
          JSON.stringify({
            success: true,
            chat: {
              id: chatId,
              title: "New Chat",
              model: selectedChatModel,
              visibility,
              messages: [], // Empty messages array
              createdAt: new Date().toISOString(),
            },
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const userMessage = clientMessages[clientMessages.length - 1] as any;
      const userMessageContent = extractTextFromMessage(userMessage) || "";

      // Context7 - Intelligent model selection based on task requirements
      const taskType =
        userMessageContent.toLowerCase().includes("reason") ||
        userMessageContent.toLowerCase().includes("analyze") ||
        userMessageContent.toLowerCase().includes("explain")
          ? "reasoning"
          : "chat";

      const requiresVision = clientMessages.some(
        (msg: any) =>
          msg.parts?.some((part: any) => part.type === "image") ||
          msg.attachments?.length > 0
      );

      // Get or create chat
      let chatEntity = await chatRepository.getChatById(chatId);

      if (!chatEntity) {
        const title = userMessageContent.substring(0, 100) || "New Chat";
        const newChatData = {
          id: chatId,
          user_id: userId,
          title,
          model: selectedChatModel,
          visibility,
          case_id: caseId || null,
          metadata: {
            ...(countryCode && { countryCode }),
            ...(description && { description }),
            createdAt: new Date().toISOString(),
          },
        } as any;

        const newChatRecord = await chatRepository.create(newChatData);
        // eslint-disable-next-line import/no-relative-parent-imports
        const { Chat } = await import("@/core/chat/entities/chat");
        chatEntity = Chat.fromDatabase(newChatRecord);
        logger.info("Created new chat", { chatId, userId });
      } else if (chatEntity.userId !== userId) {
        return new Response("Forbidden", { status: 403 });
      }

      // Get existing messages and prepare for AI
      const existingMessages = await chatRepository.getMessages(chatId);
      const allMessages = [
        ...existingMessages.map(dbMessageToAIMessage),
        userMessage,
      ];

      // Enhanced context
      const { longitude, latitude, city, country } = geolocation(request);
      const requestHints = { longitude, latitude, city, country } as any;

      let systemPrompt =
        chatEntity?.systemPrompt ||
        genericSystemPrompt({ selectedChatModel, requestHints });

      // RAG enhancement
      try {
        const ragContext = await enhanceWithRAGContext(
          userMessageContent,
          userId
        );
        if (ragContext) {
          systemPrompt = `${systemPrompt}\n\n${ragContext}`;
        }
      } catch (error) {
        logger.warn("RAG integration failed, continuing without context", {
          error,
        });
      }

      // Context7: Save user message in UIMessage format for AI SDK v5 compliance
      const userMessageId = uuidv4();
      await chatRepository.addMessage(chatId, {
        id: userMessageId,
        role: "user",
        content: userMessageContent, // Keep for backward compatibility
        metadata: {
          // Store UIMessage parts in metadata for AI SDK validation
          uiMessageParts: [{ type: "text", text: userMessageContent }],
          requestHints,
          timestamp: new Date().toISOString(),
          userAgent: request.headers.get("User-Agent"),
          clientMessageId: userMessage.id,
        } as any,
        user_id: userId,
      });

      // Context7 - Clear any previous active stream before starting new one
      await clearActiveStream(chatId);

      // Build tools according to selected model (disable tools for models without tool support)
      const tools =
        selectedChatModel === ChatModelType.GPT_3_5
          ? undefined
          : ({
              getWeather: getWeatherTool,
              createDocument: createDocumentTool(userFromAuth),
              updateDocument: updateDocumentTool(userFromAuth),
            } as const);

      // Context7: Validation guard - ensure all messages have UIMessage parts format
      const messagesWithParts = allMessages.map((msg: any) => {
        if (!msg.parts || !Array.isArray(msg.parts)) {
          // Convert legacy message to UIMessage format
          const textContent =
            typeof msg.content === "string" ? msg.content : "";
          return {
            ...msg,
            parts: [{ type: "text", text: textContent }],
          };
        }
        return msg;
      });

      // Validate UI messages against current tool schemas (latest AI SDK guidance)
      const validatedMessages = await validateUIMessages({
        messages: messagesWithParts as any, // Guaranteed UIMessage format with parts
        tools: tools as any,
      });

      // Context7 - Latest AI SDK v5 Model Validation Pattern
      let selectedModel;
      try {
        selectedModel = myProvider.languageModel(selectedChatModel);
        if (!selectedModel) {
          throw new Error(`Model ${selectedChatModel} not available in provider`);
        }
      } catch (modelError) {
        logger.error(
          "Model selection failed",
          modelError instanceof Error ? modelError : new Error(String(modelError)),
          {
            chatId,
            selectedChatModel,
            // Latest Context7 environment check pattern
            hasGatewayKey: Boolean(process.env.AI_GATEWAY_API_KEY),
            hasOpenAIKey: Boolean(process.env.OPENAI_API_KEY),
            hasAnthropicKey: Boolean(process.env.ANTHROPIC_API_KEY),
          }
        );
        
        // Latest Context7 error response pattern
        return new Response(
          JSON.stringify({ 
            error: "Model configuration error", 
            message: `Selected model ${selectedChatModel} is not available. Please check your AI provider configuration.`,
            ...(process.env.NODE_ENV === 'development' && {
              details: modelError instanceof Error ? modelError.message : String(modelError)
            })
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // AI SDK v5+ - Enhanced streamText with all features
      const result = streamText({
        model: selectedModel,
        system: systemPrompt,
        messages: convertToModelMessages(validatedMessages),

        // AI SDK v5 Beta - Modern stopping conditions
        stopWhen: [
          stepCountIs(5), // Maximum 5 steps
          hasToolCall("finalizeTask"), // Stop on finalization
          // Custom condition for content completion
          ({ steps }) => {
            const lastStep = steps[steps.length - 1];
            return lastStep?.text?.includes("TASK_COMPLETE") || false;
          },
        ],

        // AI SDK v5 Beta - Enhanced tool definitions with streaming
        tools,

        // AI SDK v5 Beta - Enhanced step callback
        onStepFinish: async ({
          text,
          toolCalls,
          toolResults,
          finishReason,
          usage,
          reasoning,
          sources,
          files,
        }) => {
          const stepTime = Date.now() - startTime;

          // Context7 - Observability: Log each step completion
          logger.info("AI step finished", {
            chatId,
            finishReason,
            textLength: text.length,
            toolCallsCount: toolCalls?.length || 0,
            toolResultsCount: toolResults?.length || 0,
            tokensUsed: usage?.totalTokens || 0,
            stepTime,
            hasReasoning: !!reasoning,
            sourcesCount: sources?.length || 0,
            filesCount: files?.length || 0,
          });

          // Track tool usage for analytics
          if (toolCalls && toolCalls.length > 0) {
            trackEvent({
              name: "tool_calls_executed",
              properties: {
                chatId,
                toolNames: toolCalls.map((tc) => tc.toolName),
                userId,
              },
            });
          }
        },

        // AI SDK v5 Beta - Enhanced chunk processing
        onChunk: async ({ chunk }) => {
          switch (chunk.type) {
            case "text-delta":
              logger.debug("Text delta received", {
                chatId,
                deltaLength: ((chunk as any).delta ?? (chunk as any).text ?? "")
                  .length,
              });
              break;

            case "reasoning-delta":
              logger.info("Reasoning delta received", {
                chatId,
                deltaLength: ((chunk as any).delta ?? (chunk as any).text ?? "")
                  .length,
              });
              break;

            case "source":
              // AI SDK v5 Beta - Source information handling
              logger.info("Source chunk received", {
                chatId,
                sourceType: (chunk as any).sourceType,
                sourceId: (chunk as any).id,
              });
              break;

            case "tool-call":
              // AI SDK v5 Beta - Enhanced tool call logging
              logger.info("Tool call chunk received", {
                chatId,
                toolName: chunk.toolName,
                toolCallId: chunk.toolCallId,
              });
              break;

            case "tool-input-start":
              logger.debug("Tool input streaming started", {
                chatId,
                toolName: chunk.toolName,
                toolCallId: chunk.id,
              });
              break;

            case "tool-input-delta":
              logger.debug("Tool input delta received", {
                chatId,
                toolCallId: (chunk as any).id,
                deltaLength: (
                  (chunk as any).delta ??
                  (chunk as any).text ??
                  (chunk as any).inputTextDelta ??
                  ""
                ).length,
              });
              break;

            case "tool-result":
              logger.info("Tool result chunk received", {
                chatId,
                outputSize: JSON.stringify(chunk.output).length,
              });
              break;

            case "raw":
              logger.debug("Raw chunk received", { chatId });
              break;
          }
        },

        // AI SDK v5 Beta - Enhanced onFinish with full response handling
        onFinish: async ({
          text,
          usage,
          response,
          reasoning,
          sources,
          files,
        }) => {
          const processingTime = Date.now() - startTime;

          try {
            const assistantMessageId = uuidv4();

            // Context7: Save assistant message in UIMessage format for AI SDK v5 compliance
            const assistantParts = [];
            if (reasoning) {
              assistantParts.push({ type: "reasoning", text: reasoning });
            }
            if (text) {
              assistantParts.push({ type: "text", text });
            }

            await chatRepository.addMessage(chatId, {
              id: assistantMessageId,
              role: "assistant",
              content: text, // Keep for backward compatibility
              metadata: {
                // Store UIMessage parts in metadata for AI SDK validation
                uiMessageParts:
                  assistantParts.length > 0
                    ? assistantParts
                    : [{ type: "text", text }],
                model: selectedChatModel,
                modelId: response.modelId,
                processingTime,
                tokensUsed: usage?.totalTokens || 0,
                inputTokens: (usage as any)?.inputTokens || 0,
                outputTokens: (usage as any)?.outputTokens || 0,
                timestamp: new Date().toISOString(),
                hasReasoning: !!reasoning,
                reasoningLength: reasoning?.length || 0,
                sourcesCount: sources?.length || 0,
                filesCount: files?.length || 0,
                responseId: response.id,
                aiGateway: true, // Track AI Gateway usage
              } as any,
              user_id: userId,
            });

            // Context7 - Clear active stream when finished (as per guide)
            await clearActiveStream(chatId);

            // Context7 - Enhanced AI Gateway usage tracking
            try {
              trackModelUsage(
                response.modelId || selectedChatModel.toString(),
                {
                  inputTokens: (usage as any)?.inputTokens || 0,
                  outputTokens: (usage as any)?.outputTokens || 0,
                  totalTokens: usage?.totalTokens || 0,
                  processingTime,
                  success: true,
                }
              );
            } catch (trackingError) {
              logger.warn("Failed to track AI Gateway usage", {
                trackingError,
              });
            }

            // Enhanced metrics tracking
            trackEvent({
              name: "chat_message_processed",
              properties: {
                chatId,
                model: selectedChatModel,
                modelId: response.modelId,
                processingTime,
                tokensUsed: usage?.totalTokens || 0,
                inputTokens: (usage as any)?.inputTokens || 0,
                outputTokens: (usage as any)?.outputTokens || 0,
                hasReasoning: !!reasoning,
                sourcesCount: sources?.length || 0,
                filesCount: files?.length || 0,
                userId,
                isGuest,
                aiGateway: true, // Track AI Gateway usage
                taskType, // Track intelligent task detection
              },
            });

            logger.info("Chat message processed via AI Gateway", {
              chatId,
              processingTime,
              tokensUsed: usage?.totalTokens || 0,
              modelId: response.modelId,
              hasReasoning: !!reasoning,
              sourcesCount: sources?.length || 0,
              taskType,
            });
          } catch (error) {
            logger.error(
              "Failed to save assistant message",
              error instanceof Error ? error : new Error(String(error))
            );
          }
        },

        // AI SDK v5 Beta - Enhanced error handling following Context7 patterns
        onError: ({ error }) => {
          // Context7 - Structured error logging with proper context
          const errorInstance = error instanceof Error ? error : new Error(String(error));
          
          logger.error("AI streaming error occurred", errorInstance, {
            chatId,
            userId,
            selectedChatModel,
            errorType: errorInstance.name,
            errorMessage: errorInstance.message,
            isGuest,
            processingTime: Date.now() - startTime,
            timestamp: new Date().toISOString(),
          });

          // Context7 - Track streaming errors for monitoring
          trackEvent({
            name: "streaming_error",
            properties: {
              chatId,
              userId,
              model: selectedChatModel,
              errorType: errorInstance.name,
              errorMessage: errorInstance.message.substring(0, 100), // Truncate for privacy
              isGuest,
            },
          });
        },
      });

      // Context7 - Enhanced resumable streams implementation following AI SDK v5 patterns
      const streamContext = getStreamContext();
      if (streamContext) {
        try {
          const streamId = uuidv4();

          // Context7 - Set this as the active stream for resumption
          await setActiveStream({ chatId, streamId });

          // Context7 - Use createUIMessageStream for Node.js compatibility
          const stream = createUIMessageStream({
            originalMessages: allMessages as any,
            execute: ({ writer }) => {
              // Context7 - Merge the streamText result properly
              result.consumeStream();
              writer.merge(result.toUIMessageStream());
            },
            onFinish: ({ messages }) => {
              // Context7 - Clear the active stream when finished (as per guide)
              clearActiveStream(chatId);
              saveChat({ chatId, messages });
            },
            onError: (error) => {
              // Context7 - Enhanced error handling for resumable streams
              const errorInstance = error instanceof Error ? error : new Error(String(error));
              
              logger.error("Resumable stream error", errorInstance, {
                chatId,
                userId,
                streamId,
                errorType: errorInstance.name,
                errorMessage: errorInstance.message,
                selectedChatModel,
                isGuest,
                timestamp: new Date().toISOString(),
              });

              // Context7 - Clear the active stream on error
              clearActiveStream(chatId);

              // Context7 - Return user-friendly error messages based on error type
              if (errorInstance.message.includes("pipeThrough")) {
                return "Stream processing error. Your browser or environment may not support the required streaming features. Please try again.";
              }
              
              if (errorInstance.message.includes("Gateway")) {
                return "AI Gateway connection failed. Please check your connection and try again.";
              }
              
              if (errorInstance.message.includes("timeout")) {
                return "Request timed out. Please try again.";
              }

              return "Streaming error occurred. Please try again.";
            },
          });

          return createUIMessageStreamResponse({
            stream,
            headers: {
              "X-Chat-Id": chatId,
              "X-Stream-Id": streamId,
            },
          });
        } catch (error) {
          // Context7 - Proper error handling with type safety
          const safeError =
            error instanceof Error ? error : new Error(String(error));
          logger.warn(
            "Failed to create resumable stream, falling back to regular stream",
            {
              error: safeError.message,
              chatId,
            }
          );
        }
      }

      // Context7 - Use createUIMessageStream for Node.js compatibility (fallback path)
      const headers: HeadersInit = {};
      if (chatId) {
        headers["X-Chat-Id"] = chatId;
      }

      try {
        const stream = createUIMessageStream({
          originalMessages: allMessages as any,
          execute: ({ writer }) => {
            // Context7 - Merge the streamText result properly
            result.consumeStream();
            writer.merge(result.toUIMessageStream());
          },
          onFinish: ({ messages }) => {
            saveChat({ chatId, messages });
          },
          onError: (error) => {
            // Context7 - Enhanced error logging for fallback stream
            const errorInstance = error instanceof Error ? error : new Error(String(error));
            
            logger.error("Chat streaming error (fallback path)", errorInstance, {
              chatId,
              userId,
              isGuest,
              selectedChatModel,
              errorType: errorInstance.name,
              errorMessage: errorInstance.message,
              streamType: "fallback",
              processingTime: Date.now() - startTime,
              timestamp: new Date().toISOString(),
            });

            // Context7 - Track fallback streaming errors
            trackEvent({
              name: "streaming_error_fallback",
              properties: {
                chatId,
                userId,
                model: selectedChatModel,
                errorType: errorInstance.name,
                errorMessage: errorInstance.message.substring(0, 100),
                isGuest,
                streamType: "fallback",
              },
            });

            // Context7 - Return structured error messages based on error type
            if (error == null) {
              return "An unknown error occurred. Please try again.";
            }

            if (typeof error === "string") {
              // Handle string errors from gateway
              if (error.includes("Gateway request failed")) {
                return "AI Gateway connection failed. Please check your connection and try again.";
              }
              if (error.includes("timeout")) {
                return "Request timed out. Please try again.";
              }
              return error;
            }

            if (error instanceof Error) {
              const errorMessage = error.message;

              // Handle specific error types with user-friendly messages
              if (
                errorMessage.includes("Gateway request failed") ||
                errorMessage.includes("gateway") ||
                errorMessage.includes("pipeThrough")
              ) {
                return "AI Gateway connection failed. Please check your connection and try again.";
              }
              if (
                errorMessage.includes("timeout") ||
                errorMessage.includes("TIMEOUT")
              ) {
                return "Request timed out. Please try again.";
              }
              if (
                errorMessage.includes("unauthorized") ||
                errorMessage.includes("401")
              ) {
                return "Authentication failed. Please refresh the page and try again.";
              }
              if (
                errorMessage.includes("rate limit") ||
                errorMessage.includes("429")
              ) {
                return "Rate limit exceeded. Please wait a moment and try again.";
              }
              if (
                errorMessage.includes("network") ||
                errorMessage.includes("Failed to fetch")
              ) {
                return "Network connection failed. Please check your internet connection and try again.";
              }

              return errorMessage;
            }

            // Fallback for object errors
            return JSON.stringify(error);
          },
        });

        return createUIMessageStreamResponse({ 
          stream, 
          headers,
        });
      } catch (streamError) {
        // Context7 - Fallback for stream creation errors
        logger.error(
          "Failed to create stream response, using fallback",
          streamError instanceof Error
            ? streamError
            : new Error(String(streamError)),
          {
            chatId,
            userId,
            selectedChatModel,
          }
        );

        // Return a simple error response if streaming fails
        return new Response(
          JSON.stringify({
            error: "Streaming temporarily unavailable. Please try again.",
          }),
          {
            status: 503,
            headers: {
              "Content-Type": "application/json",
              "X-Chat-Id": chatId,
            },
          }
        );
      }
    }

    return new Response("Not Found", { status: 404 });
  } catch (error: any) {
    logger.error("Chat API error", error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: error.issues,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Simplified handlers for other operations
async function handleGenerateTitle(
  chatId: string,
  userId: string,
  chatRepository: any
) {
  try {
    const chat = await chatRepository.getChatById(chatId);
    if (!chat || chat.userId !== userId) {
      return new Response("Forbidden", { status: 403 });
    }

    const messages = await chatRepository.getMessages(chatId);
    const firstUserMessage = messages.find((m: any) => m.role === "user");

    if (!firstUserMessage) {
      return new Response("No user message found", { status: 400 });
    }

    const title =
      extractTextFromMessage(firstUserMessage)?.substring(0, 100) || "New Chat";
    await chatRepository.update(chatId, { title });

    return Response.json({ success: true, title });
  } catch (error) {
    logger.error(
      "Failed to generate title",
      error instanceof Error ? error : new Error(String(error))
    );
    return new Response("Failed to generate title", { status: 500 });
  }
}

// GET handler - Enhanced for resumable streaming
export async function GET(request: Request) {
  try {
    let authResult: AuthResult;
    try {
      authResult = await authenticateRequestAdapter(request as any);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return createAuthErrorResponse(error);
      }
      throw error;
    }
    const { user } = authResult;

    const chatRepository = new ChatRepository();
    const { pathname, searchParams } = new URL(request.url);
    const extractedChatId = extractChatIdFromPath(pathname);

    // Handle resumable stream requests
    const chatId = searchParams.get("chatId");
    if (chatId) {
      const streamContext = getStreamContext();
      if (!streamContext) {
        return new Response("Resumable streaming not available", {
          status: 503,
        });
      }

      try {
        // Get the most recent stream ID for this chat
        const streamIds = await loadStreams(chatId);

        if (!streamIds.length) {
          // No content response when there is no active stream
          return new Response(null, { status: 204 });
        }

        const recentStreamId = streamIds[streamIds.length - 1];

        if (!recentStreamId) {
          return new Response(null, { status: 204 });
        }

        // Attempt to resume the existing stream
        const resumedStream =
          await streamContext.resumeExistingStream(recentStreamId);

        if (!resumedStream) {
          return new Response(null, { status: 204 });
        }

        return new Response(resumedStream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            "X-Chat-Id": chatId,
            "X-Stream-Id": recentStreamId,
          },
        });
      } catch (error) {
        // Context7 - Proper error handling with type safety
        const safeError =
          error instanceof Error ? error : new Error(String(error));
        logger.error("Failed to resume stream", safeError);
        return new Response("Failed to resume stream", { status: 500 });
      }
    }

    // Handle stream resume by streamId (legacy support)
    const streamId = searchParams.get("streamId");
    if (streamId) {
      const streamContext = getStreamContext();
      if (streamContext) {
        try {
          // Context7 - Latest AI SDK v5 Web Streams API Validation
          if (typeof ReadableStream === 'undefined' || !ReadableStream.prototype.pipeThrough) {
            logger.error(
              "Web Streams API not available for stream resumption",
              new Error("Web Streams API not available - pipeThrough method missing"),
              {
                streamId,
                hasReadableStream: typeof ReadableStream !== 'undefined',
                hasPipeThrough: ReadableStream?.prototype?.pipeThrough !== undefined,
                nodeVersion: process.version,
                runtime: process.env.NEXT_RUNTIME,
              }
            );
            
            return new Response(
              JSON.stringify({ 
                error: "Stream API not supported", 
                message: "Web Streams API is not available in this environment. Please check your Node.js version and polyfills.",
              }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          const emptyDataStream = createUIMessageStream({
            execute: () => {},
          });

          const resumedStream = await streamContext.resumableStream(
            streamId,
            () => emptyDataStream.pipeThrough(new JsonToSseTransformStream())
          );

          return new Response(resumedStream, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          });
        } catch (error) {
          return new Response("Stream not found", { status: 404 });
        }
      }
      return new Response("Stream context not available", { status: 500 });
    }

    // Get specific chat
    if (extractedChatId) {
      const chat = await chatRepository.getChatById(extractedChatId);
      if (!chat || chat.userId !== user.id) {
        return new Response("Chat not found", { status: 404 });
      }
      return Response.json({ chat: chat.toObject() });
    }

    // Get chat list
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const offset = Math.max(parseInt(searchParams.get("offset") || "0"), 0);
    const caseId = searchParams.get("caseId") || undefined;

    const chats = await chatRepository.getByUserId(user.id, {
      limit,
      offset,
      case_id: caseId,
    });
    // eslint-disable-next-line import/no-relative-parent-imports
    const { Chat } = await import("@/core/chat/entities/chat");
    const chatEntities = chats.map((c: any) => Chat.fromDatabase(c));

    return Response.json({
      chats: chatEntities.map((chat) => chat.toObject()),
      pagination: { limit, offset, hasMore: chats.length === limit },
    });
  } catch (error) {
    logger.error(
      "GET error",
      error instanceof Error ? error : new Error(String(error))
    );
    return new Response("Internal server error", { status: 500 });
  }
}

// PATCH handler - simplified
export async function PATCH(request: Request) {
  try {
    let authResult: AuthResult;
    try {
      authResult = await authenticateRequestAdapter(request as any);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return createAuthErrorResponse(error);
      }
      throw error;
    }
    const { user } = authResult;

    const { pathname } = new URL(request.url);
    const chatId = extractChatIdFromPath(pathname);
    if (!chatId) return new Response("Chat ID required", { status: 400 });

    // eslint-disable-next-line import/no-relative-parent-imports
    const { ChatRepository } = await import(
      "@/infrastructure/repositories/chat-repository"
    );
    const chatRepository = new ChatRepository();
    const chat = await chatRepository.getChatById(chatId);
    if (!chat || chat.userId !== user.id) {
      return new Response("Chat not found", { status: 404 });
    }

    const body = await request.json();
    const validatedData = updateChatSchema.parse(body);

    const updatedChat = await chatRepository.update(chatId, {
      title: validatedData.title,
      model: validatedData.modelType,
      visibility: validatedData.visibility,
      case_id: validatedData.caseId,
      metadata: {
        ...chat.metadata,
        ...(validatedData.description !== undefined && {
          description: validatedData.description,
        }),
        updatedAt: new Date().toISOString(),
      },
    });

    // eslint-disable-next-line import/no-relative-parent-imports
    const { Chat } = await import("@/core/chat/entities/chat");
    return Response.json({ chat: Chat.fromDatabase(updatedChat).toObject() });
  } catch (error) {
    logger.error(
      "PATCH error",
      error instanceof Error ? error : new Error(String(error))
    );
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Validation failed", details: error.issues }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response("Internal server error", { status: 500 });
  }
}

// DELETE handler - simplified
export async function DELETE(request: Request) {
  try {
    let authResult: AuthResult;
    try {
      authResult = await authenticateRequestAdapter(request as any);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return createAuthErrorResponse(error);
      }
      throw error;
    }
    const { user } = authResult;

    const { pathname } = new URL(request.url);
    const chatId = extractChatIdFromPath(pathname);
    if (!chatId) return new Response("Chat ID required", { status: 400 });

    // eslint-disable-next-line import/no-relative-parent-imports
    const { ChatRepository } = await import(
      "@/infrastructure/repositories/chat-repository"
    );
    const chatRepository = new ChatRepository();
    const chat = await chatRepository.getChatById(chatId);
    if (!chat || chat.userId !== user.id) {
      return new Response("Forbidden", { status: 403 });
    }

    await chatRepository.deleteChat(chatId);
    return Response.json({ success: true });
  } catch (error) {
    logger.error(
      "DELETE error",
      error instanceof Error ? error : new Error(String(error))
    );
    return new Response("Internal server error", { status: 500 });
  }
}
