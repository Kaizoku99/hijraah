/**
 * AI-Unified Chat API Route - AI SDK v5 Beta Compliant
 *
 * Features full AI SDK v5 beta compliance with Context7 principles:
 * - Tool call streaming with enhanced callbacks (onInputStart, onInputDelta, onInputAvailable)
 * - Modern UI message streams (.toUIMessageStreamResponse())
 * - Enhanced step callbacks (onStepFinish, onChunk)
 * - stopWhen conditions instead of maxSteps
 * - Reasoning content support
 * - Structured output capabilities
 * - Start/Delta/End streaming patterns
 * - Context7 observability & tracing
 */

import { geolocation } from "@vercel/functions";
import {
  streamText,
  type Message as AIMessage,
  convertToModelMessages,
  stepCountIs,
  hasToolCall,
  tool,
} from "ai";
import { after } from "next/server";
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from "resumable-stream";
import { z } from "zod";
import { v4 as uuidv4, validate as validateUuid } from "uuid";

// Core imports
import { logger } from "@/lib/logger";
import { trackEvent } from "@/lib/monitoring";
import { ChatModelType } from "@/_core/chat/entities/chat";
import {
  Chat,
  type ChatVisibility as ChatVisibilityType,
} from "@/_core/chat/entities/chat";
import {
  ChatRepository,
  DBChatSessionInsert,
} from "@/_infrastructure/repositories/chat-repository";
import { RateLimitService } from "@/services/rate-limit-service";

// AI & Tools
import {
  type RequestHints,
  systemPrompt as genericSystemPrompt,
} from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";

// Database & Auth
import { createSupabaseServiceClient } from "@/lib/supabase/client";
import { createClient } from "@supabase/supabase-js";
import { generateUUID } from "@/lib/utils";
import { Json } from "@/types/database.types";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { dbMessageToAIMessage } from "@/lib/ai-sdk-adapter";

// RAG
import { HybridRetriever } from "@/lib/rag/retrieval/hybrid-retriever";
import { ContextAwareGenerator } from "@/lib/rag/generation/context-generator";
import OpenAI from "openai";
import * as fetchPonyfill from "fetch-ponyfill";

const { fetch: ponyfetch } = fetchPonyfill.default();

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
  outputSchema: z.object({
    current: z.object({
      temperature_2m: z.number(),
      time: z.string(),
    }),
    daily: z.object({
      sunrise: z.array(z.string()),
      sunset: z.array(z.string()),
    }),
    hourly: z.object({
      temperature_2m: z.array(z.number()),
    }),
  }),
  // Enhanced tool callbacks for streaming
  onInputStart: ({ toolCallId }) => {
    logger.info("Weather tool input streaming started", { toolCallId });
  },
  onInputDelta: ({ inputTextDelta, toolCallId }) => {
    logger.debug("Weather tool input delta", {
      toolCallId,
      delta: inputTextDelta,
    });
  },
  onInputAvailable: ({ input, toolCallId }) => {
    logger.info("Weather tool input ready", { toolCallId, input });
  },
  execute: async ({ latitude, longitude }) => {
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
      tags: z.array(z.string()).optional().describe("Document tags"),
    }),
    outputSchema: z.object({
      id: z.string(),
      title: z.string(),
      createdAt: z.string(),
      success: z.boolean(),
    }),
    onInputStart: ({ toolCallId }) => {
      logger.info("Document creation tool started", {
        toolCallId,
        userId: session?.id,
      });
    },
    onInputDelta: ({ inputTextDelta, toolCallId }) => {
      logger.debug("Document creation input delta", {
        toolCallId,
        delta: inputTextDelta,
      });
    },
    onInputAvailable: ({ input, toolCallId }) => {
      logger.info("Document creation input ready", {
        toolCallId,
        input: input.title,
      });
    },
    execute: async ({ title, content, type, tags }) => {
      // Simulate document creation
      const documentId = generateUUID();
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
      title: z.string().optional().describe("New document title"),
    }),
    outputSchema: z.object({
      id: z.string(),
      updatedAt: z.string(),
      success: z.boolean(),
    }),
    onInputStart: ({ toolCallId }) => {
      logger.info("Document update tool started", {
        toolCallId,
        userId: session?.id,
      });
    },
    onInputDelta: ({ inputTextDelta, toolCallId }) => {
      logger.debug("Document update input delta", {
        toolCallId,
        delta: inputTextDelta,
      });
    },
    onInputAvailable: ({ input, toolCallId }) => {
      logger.info("Document update input ready", {
        toolCallId,
        documentId: input.documentId,
      });
    },
    execute: async ({ documentId, content, title }) => {
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

const postRequestSchema = z.object({
  id: z.string().uuid().optional(),
  messages: z.array(
    z.object({
      id: z.string(),
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1).max(10000),
      createdAt: z.date().optional(),
    })
  ),
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
    const openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      fetch: ponyfetch as unknown as typeof fetch,
    });

    const retriever = new HybridRetriever(supabaseClient, openaiClient);
    const generator = new ContextAwareGenerator();

    const searchResults = await retriever.search(userMessage, { userId });
    const context = generator.buildContext(
      searchResults,
      (searchResults as any).userContext
    );
    return generator.createSystemPrompt(context);
  } catch (error) {
    logger.error(
      "RAG context enhancement failed",
      error instanceof Error ? error : new Error(String(error))
    );
    return null;
  }
}

// Main POST handler - AI SDK v5 Beta compliant
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

      // Simple validation with normalization
      const normalizedBody = {
        ...body,
        id: body.id && validateUuid(body.id) ? body.id : uuidv4(),
        messages: body.messages || (body.message ? [body.message] : []),
        visibility: body.visibility || body.selectedVisibilityType || "private",
      };

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

      const userMessage = clientMessages[
        clientMessages.length - 1
      ] as AIMessage;
      const userMessageContent = extractTextFromMessage(userMessage) || "";

      // Get or create chat
      let chatEntity = await chatRepository.getChatById(chatId);

      if (!chatEntity) {
        const title = userMessageContent.substring(0, 100) || "New Chat";
        const newChatData: DBChatSessionInsert = {
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
        };

        const newChatRecord = await chatRepository.create(newChatData);
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
      const requestHints: RequestHints = { longitude, latitude, city, country };

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

      // Save user message first
      await chatRepository.addMessage(chatId, {
        id: userMessage.id,
        role: "user",
        content: userMessageContent,
        metadata: {
          requestHints,
          timestamp: new Date().toISOString(),
          userAgent: request.headers.get("User-Agent"),
        } as unknown as Json,
        user_id: userId,
      });

      // AI SDK v5 Beta - Enhanced streamText with all features
      const result = streamText({
        model: myProvider.languageModel(selectedChatModel),
        system: systemPrompt,
        messages: convertToModelMessages(allMessages),

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
        tools:
          selectedChatModel === ChatModelType.GPT_3_5
            ? undefined
            : {
                getWeather: getWeatherTool,
                createDocument: createDocumentTool(userFromAuth),
                updateDocument: updateDocumentTool(userFromAuth),
              },

        // AI SDK v5 Beta - Enhanced step callback
        onStepFinish: async ({
          stepType,
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
            stepType,
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
                stepType,
                userId,
              },
            });
          }
        },

        // AI SDK v5 Beta - Enhanced chunk processing
        onChunk: async ({ chunk }) => {
          switch (chunk.type) {
            case "text":
              // Context7 - Observability: Log text streaming
              logger.debug("Text chunk received", {
                chatId,
                textLength: chunk.text.length,
              });
              break;

            case "reasoning":
              // AI SDK v5 Beta - Reasoning content support
              logger.info("Reasoning chunk received", {
                chatId,
                reasoningLength: chunk.text.length,
              });
              break;

            case "source":
              // AI SDK v5 Beta - Source information handling
              logger.info("Source chunk received", {
                chatId,
                sourceType: chunk.source.sourceType,
                sourceId: chunk.source.id,
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
                toolCallId: chunk.id,
                deltaLength: chunk.delta.length,
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
            const assistantMessageId = generateUUID();

            // Save assistant message with enhanced metadata
            await chatRepository.addMessage(chatId, {
              id: assistantMessageId,
              role: "assistant",
              content: text,
              metadata: {
                model: selectedChatModel,
                modelId: response.modelId,
                processingTime,
                tokensUsed: usage?.totalTokens || 0,
                promptTokens: usage?.promptTokens || 0,
                completionTokens: usage?.completionTokens || 0,
                timestamp: new Date().toISOString(),
                hasReasoning: !!reasoning,
                reasoningLength: reasoning?.length || 0,
                sourcesCount: sources?.length || 0,
                filesCount: files?.length || 0,
                responseId: response.id,
              } as unknown as Json,
              user_id: userId,
            });

            // Enhanced metrics tracking
            trackEvent({
              name: "chat_message_processed",
              properties: {
                chatId,
                model: selectedChatModel,
                modelId: response.modelId,
                processingTime,
                tokensUsed: usage?.totalTokens || 0,
                promptTokens: usage?.promptTokens || 0,
                completionTokens: usage?.completionTokens || 0,
                hasReasoning: !!reasoning,
                sourcesCount: sources?.length || 0,
                filesCount: files?.length || 0,
                userId,
                isGuest,
              },
            });

            logger.info("Chat message processed", {
              chatId,
              processingTime,
              tokensUsed: usage?.totalTokens || 0,
              modelId: response.modelId,
              hasReasoning: !!reasoning,
              sourcesCount: sources?.length || 0,
            });
          } catch (error) {
            logger.error(
              "Failed to save assistant message",
              error instanceof Error ? error : new Error(String(error))
            );
          }
        },

        onError: ({ error }) => {
          logger.error("Streaming error", new Error(String(error)), { chatId });
        },
      });

      // Handle resumable streams if available
      const streamContext = getStreamContext();
      if (streamContext) {
        try {
          const streamId = generateUUID();
          const resumableStream = await streamContext.resumableStream(
            streamId,
            () =>
              result.toUIMessageStreamResponse() as unknown as ReadableStream<string>
          );
          await chatRepository.storeStreamId(chatId, streamId);
          return resumableStream;
        } catch (error) {
          logger.warn(
            "Failed to create resumable stream, using regular stream",
            { error }
          );
        }
      }

      // AI SDK v5 Beta - Modern UI message stream response
      const headers: HeadersInit = {};
      if (chatId) {
        headers["X-Chat-Id"] = chatId;
      }

      return result.toUIMessageStreamResponse({
        headers,
        // AI SDK v5 Beta - Enhanced response metadata
        messageMetadata: ({ part }) => {
          // Send model information on start
          if (part.type === "start") {
            return {
              model: selectedChatModel,
              chatId,
              startTime: Date.now(),
            };
          }

          // Send step information on finish-step
          if (part.type === "finish-step") {
            return {
              model: part.response.modelId,
              stepDuration: Date.now() - startTime,
              tokensUsed: part.usage.totalTokens,
            };
          }

          // Send final information on finish
          if (part.type === "finish") {
            return {
              totalTokens: part.totalUsage.totalTokens,
              totalDuration: Date.now() - startTime,
              chatId,
            };
          }
        },
      });
    }

    return new Response("Not Found", { status: 404 });
  } catch (error: any) {
    logger.error("Chat API error", error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: error.errors,
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
  chatRepository: ChatRepository
) {
  try {
    const chat = await chatRepository.getChatById(chatId);
    if (!chat || chat.userId !== userId) {
      return new Response("Forbidden", { status: 403 });
    }

    const messages = await chatRepository.getMessages(chatId);
    const firstUserMessage = messages.find((m) => m.role === "user");

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

// GET handler - simplified
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

    // Handle stream resume
    const streamId = searchParams.get("streamId");
    if (streamId) {
      const streamContext = getStreamContext();
      if (streamContext) {
        try {
          const resumedStream = await streamContext.resumableStream(
            streamId,
            () => new ReadableStream<string>()
          );
          return resumedStream;
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
    const chatEntities = chats.map((c) => Chat.fromDatabase(c));

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

    return Response.json({ chat: Chat.fromDatabase(updatedChat).toObject() });
  } catch (error) {
    logger.error(
      "PATCH error",
      error instanceof Error ? error : new Error(String(error))
    );
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Validation failed", details: error.errors }),
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
