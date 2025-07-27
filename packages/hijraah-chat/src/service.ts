import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { jwt } from "hono/jwt";
import { upgradeWebSocket } from "hono/ws";
import { streamText, generateText, type CoreMessage } from "ai";
import { createHijraahAI } from "@hijraah/ai";
import { createHijraahDocumentProcessor } from "@hijraah/documents";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// Chat message schemas
export const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
  timestamp: z.string().datetime(),
  metadata: z.record(z.any()).optional(),
});

export const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema),
  model: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  max_tokens: z.number().min(1).max(8192).optional(),
  stream: z.boolean().optional(),
  user: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const ChatResponseSchema = z.object({
  id: z.string(),
  object: z.literal("chat.completion"),
  created: z.number(),
  model: z.string(),
  choices: z.array(
    z.object({
      index: z.number(),
      message: MessageSchema,
      finish_reason: z.enum([
        "stop",
        "length",
        "content_filter",
        "function_call",
      ]),
    }),
  ),
  usage: z
    .object({
      prompt_tokens: z.number(),
      completion_tokens: z.number(),
      total_tokens: z.number(),
    })
    .optional(),
});

export type ChatMessage = z.infer<typeof MessageSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;

export interface ChatServiceConfig {
  redis?: Redis;
  jwtSecret?: string;
  corsOrigin?: string | string[];
  rateLimitWindow: number;
  rateLimitMax: number;
  enableWebSocket: boolean;
  enableDocumentProcessing: boolean;
}

// Enhanced Chat Service with Hono and Context7 patterns
export class HijraahChatService {
  private app: Hono;
  private redis?: Redis;
  private aiProvider;
  private documentProcessor;
  private config: ChatServiceConfig;
  private activeSessions = new Map<string, WebSocket>();

  constructor(config: ChatServiceConfig) {
    this.config = {
      rateLimitWindow: 60000, // 1 minute
      rateLimitMax: 100,
      enableWebSocket: true,
      enableDocumentProcessing: true,
      ...config,
    };

    this.redis =
      config.redis ||
      (process.env.UPSTASH_REDIS_REST_URL
        ? new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL!,
            token: process.env.UPSTASH_REDIS_REST_TOKEN!,
          })
        : undefined);

    this.aiProvider = createHijraahAI({
      redis: this.redis,
      fallbackStrategy: "quality",
      enableCaching: true,
      enableMonitoring: true,
    });

    this.documentProcessor = createHijraahDocumentProcessor({
      redis: this.redis,
      enableCaching: true,
    });

    this.app = new Hono();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    // CORS middleware
    this.app.use(
      "*",
      cors({
        origin: this.config.corsOrigin || "*",
        allowMethods: ["GET", "POST", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
      }),
    );

    // Logger middleware
    this.app.use("*", logger());

    // Pretty JSON in development
    if (process.env.NODE_ENV !== "production") {
      this.app.use("*", prettyJSON());
    }

    // Rate limiting middleware
    this.app.use("*", async (c, next) => {
      if (!this.redis) return next();

      const clientIP =
        c.req.header("x-forwarded-for") ||
        c.req.header("x-real-ip") ||
        "unknown";

      const key = `rate_limit:${clientIP}`;
      const current = await this.redis.incr(key);

      if (current === 1) {
        await this.redis.expire(
          key,
          Math.floor(this.config.rateLimitWindow / 1000),
        );
      }

      if (current > this.config.rateLimitMax) {
        return c.json({ error: "Rate limit exceeded" }, 429);
      }

      return next();
    });

    // Authentication middleware (optional)
    if (this.config.jwtSecret) {
      this.app.use("/api/v1/chat/*", jwt({ secret: this.config.jwtSecret }));
    }
  }

  private setupRoutes(): void {
    // Health check endpoint
    this.app.get("/health", async (c) => {
      const health = {
        status: "ok",
        timestamp: new Date().toISOString(),
        services: {
          ai: false,
          documents: false,
          redis: !!this.redis,
          websocket: this.config.enableWebSocket,
        },
      };

      // Test AI provider
      try {
        await this.aiProvider.healthCheck();
        health.services.ai = true;
      } catch (error) {
        console.warn("AI health check failed:", error);
      }

      // Test document processor
      if (this.config.enableDocumentProcessing) {
        try {
          const docHealth = await this.documentProcessor.healthCheck();
          health.services.documents = docHealth.processor;
        } catch (error) {
          console.warn("Document processor health check failed:", error);
        }
      }

      return c.json(health);
    });

    // OpenAI-compatible chat completions endpoint
    this.app.post("/api/v1/chat/completions", async (c) => {
      try {
        const body = await c.req.json();
        const request = ChatRequestSchema.parse(body);

        const chatId = uuidv4();
        const timestamp = Date.now();

        // Convert messages to AI SDK format
        const messages: CoreMessage[] = request.messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        // Handle streaming response
        if (request.stream) {
          return this.handleStreamingChat(c, {
            id: chatId,
            messages,
            model: request.model || "gpt-4o-mini",
            temperature: request.temperature,
            maxTokens: request.max_tokens,
            userId: request.user,
            metadata: request.metadata,
          });
        }

        // Handle regular response
        const result = await this.aiProvider.generateText({
          messages,
          model: request.model || "gpt-4o-mini",
          temperature: request.temperature,
          maxTokens: request.max_tokens,
          userId: request.user,
        });

        const response: ChatResponse = {
          id: chatId,
          object: "chat.completion",
          created: Math.floor(timestamp / 1000),
          model: request.model || "gpt-4o-mini",
          choices: [
            {
              index: 0,
              message: {
                id: uuidv4(),
                role: "assistant",
                content: result.text,
                timestamp: new Date().toISOString(),
              },
              finish_reason: "stop",
            },
          ],
          usage: {
            prompt_tokens: result.usage?.promptTokens || 0,
            completion_tokens: result.usage?.completionTokens || 0,
            total_tokens: result.usage?.totalTokens || 0,
          },
        };

        // Store conversation if Redis is available
        if (this.redis && request.user) {
          await this.storeConversation(
            request.user,
            chatId,
            request.messages,
            response.choices[0].message,
          );
        }

        return c.json(response);
      } catch (error) {
        console.error("Chat completion error:", error);

        if (error instanceof z.ZodError) {
          return c.json(
            {
              error: {
                message: "Invalid request format",
                type: "invalid_request_error",
                details: error.errors,
              },
            },
            400,
          );
        }

        return c.json(
          {
            error: {
              message: "Internal server error",
              type: "api_error",
            },
          },
          500,
        );
      }
    });

    // Document processing endpoint
    if (this.config.enableDocumentProcessing) {
      this.app.post("/api/v1/documents/process", async (c) => {
        try {
          const formData = await c.req.formData();
          const file = formData.get("file") as File;
          const options = formData.get("options");

          if (!file) {
            return c.json({ error: "No file provided" }, 400);
          }

          const processingOptions = options
            ? JSON.parse(options as string)
            : {};
          const result = await this.documentProcessor.processDocument(
            file,
            processingOptions,
          );

          return c.json({
            success: true,
            document: result.document,
            metadata: result.metadata,
            stats: {
              processingTime: result.processingTime,
              chunksGenerated: result.chunksGenerated,
              embeddingsGenerated: result.embeddingsGenerated,
            },
          });
        } catch (error) {
          console.error("Document processing error:", error);
          return c.json(
            {
              error: {
                message: "Document processing failed",
                type: "processing_error",
              },
            },
            500,
          );
        }
      });
    }

    // WebSocket endpoint for real-time chat
    if (this.config.enableWebSocket) {
      this.app.get(
        "/ws/chat",
        upgradeWebSocket((c) => {
          return {
            onOpen: (event, ws) => {
              const sessionId = uuidv4();
              this.activeSessions.set(sessionId, ws);
              console.log("WebSocket connection opened:", sessionId);
            },

            onMessage: async (event, ws) => {
              try {
                const data = JSON.parse(event.data as string);
                await this.handleWebSocketMessage(ws, data);
              } catch (error) {
                console.error("WebSocket message error:", error);
                ws.send(
                  JSON.stringify({
                    type: "error",
                    message: "Invalid message format",
                  }),
                );
              }
            },

            onClose: (event, ws) => {
              // Remove from active sessions
              for (const [sessionId, socket] of this.activeSessions) {
                if (socket === ws) {
                  this.activeSessions.delete(sessionId);
                  console.log("WebSocket connection closed:", sessionId);
                  break;
                }
              }
            },

            onError: (event, ws) => {
              console.error("WebSocket error:", event);
            },
          };
        }),
      );
    }

    // Conversation history endpoint
    this.app.get("/api/v1/conversations/:userId", async (c) => {
      const userId = c.req.param("userId");
      const limit = parseInt(c.req.query("limit") || "10");
      const offset = parseInt(c.req.query("offset") || "0");

      try {
        const conversations = await this.getConversationHistory(
          userId,
          limit,
          offset,
        );
        return c.json({ conversations });
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
        return c.json({ error: "Failed to fetch conversations" }, 500);
      }
    });
  }

  private async handleStreamingChat(
    c: any,
    request: {
      id: string;
      messages: CoreMessage[];
      model: string;
      temperature?: number;
      maxTokens?: number;
      userId?: string;
      metadata?: Record<string, any>;
    },
  ) {
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const result = await this.aiProvider.streamText({
            messages: request.messages,
            model: request.model,
            temperature: request.temperature,
            maxTokens: request.maxTokens,
            userId: request.userId,
          });

          let fullContent = "";

          for await (const chunk of result.textStream) {
            fullContent += chunk;

            const sseData = {
              id: request.id,
              object: "chat.completion.chunk",
              created: Math.floor(Date.now() / 1000),
              model: request.model,
              choices: [
                {
                  index: 0,
                  delta: {
                    content: chunk,
                  },
                  finish_reason: null,
                },
              ],
            };

            controller.enqueue(`data: ${JSON.stringify(sseData)}\n\n`);
          }

          // Send final chunk
          const finalChunk = {
            id: request.id,
            object: "chat.completion.chunk",
            created: Math.floor(Date.now() / 1000),
            model: request.model,
            choices: [
              {
                index: 0,
                delta: {},
                finish_reason: "stop",
              },
            ],
          };

          controller.enqueue(`data: ${JSON.stringify(finalChunk)}\n\n`);
          controller.enqueue("data: [DONE]\n\n");
          controller.close();

          // Store conversation
          if (this.redis && request.userId) {
            const assistantMessage: ChatMessage = {
              id: uuidv4(),
              role: "assistant",
              content: fullContent,
              timestamp: new Date().toISOString(),
            };

            await this.storeConversation(
              request.userId,
              request.id,
              request.messages.map((m) => ({
                id: uuidv4(),
                role: m.role,
                content: m.content,
                timestamp: new Date().toISOString(),
              })),
              assistantMessage,
            );
          }
        } catch (error) {
          console.error("Streaming error:", error);
          controller.enqueue(`data: {"error": "Stream processing failed"}\n\n`);
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  private async handleWebSocketMessage(
    ws: WebSocket,
    data: any,
  ): Promise<void> {
    const { type, payload } = data;

    switch (type) {
      case "chat":
        try {
          const request = ChatRequestSchema.parse(payload);

          // Convert to AI format
          const messages: CoreMessage[] = request.messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          }));

          const result = await this.aiProvider.streamText({
            messages,
            model: request.model || "gpt-4o-mini",
            temperature: request.temperature,
            maxTokens: request.max_tokens,
            userId: request.user,
          });

          // Stream response through WebSocket
          let fullContent = "";
          for await (const chunk of result.textStream) {
            fullContent += chunk;
            ws.send(
              JSON.stringify({
                type: "chunk",
                content: chunk,
              }),
            );
          }

          ws.send(
            JSON.stringify({
              type: "complete",
              content: fullContent,
            }),
          );
        } catch (error) {
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Chat processing failed",
            }),
          );
        }
        break;

      case "ping":
        ws.send(JSON.stringify({ type: "pong" }));
        break;

      default:
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Unknown message type",
          }),
        );
    }
  }

  private async storeConversation(
    userId: string,
    chatId: string,
    userMessages: ChatMessage[],
    assistantMessage: ChatMessage,
  ): Promise<void> {
    if (!this.redis) return;

    try {
      const conversationKey = `conversation:${userId}:${chatId}`;
      const allMessages = [...userMessages, assistantMessage];

      await this.redis.setex(
        conversationKey,
        86400 * 7, // 7 days TTL
        JSON.stringify({
          id: chatId,
          userId,
          messages: allMessages,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      );

      // Add to user's conversation list
      const userConversationsKey = `conversations:${userId}`;
      await this.redis.zadd(userConversationsKey, {
        score: Date.now(),
        member: chatId,
      });
    } catch (error) {
      console.warn("Failed to store conversation:", error);
    }
  }

  private async getConversationHistory(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<any[]> {
    if (!this.redis) return [];

    try {
      const userConversationsKey = `conversations:${userId}`;
      const chatIds = await this.redis.zrevrange(
        userConversationsKey,
        offset,
        offset + limit - 1,
      );

      const conversations = [];
      for (const chatId of chatIds) {
        const conversationKey = `conversation:${userId}:${chatId}`;
        const conversation = await this.redis.get(conversationKey);
        if (conversation) {
          conversations.push(JSON.parse(conversation as string));
        }
      }

      return conversations;
    } catch (error) {
      console.warn("Failed to fetch conversation history:", error);
      return [];
    }
  }

  // Get the Hono app instance
  getApp(): Hono {
    return this.app;
  }

  // Health check
  async healthCheck(): Promise<{
    chat: boolean;
    ai: boolean;
    documents: boolean;
    redis: boolean;
    websocket: boolean;
  }> {
    const health = {
      chat: true,
      ai: false,
      documents: false,
      redis: !!this.redis,
      websocket: this.config.enableWebSocket,
    };

    // Test AI provider
    try {
      const aiHealth = await this.aiProvider.healthCheck();
      health.ai = Object.values(aiHealth).some((status) => status === true);
    } catch (error) {
      console.warn("AI health check failed:", error);
    }

    // Test document processor
    if (this.config.enableDocumentProcessing) {
      try {
        const docHealth = await this.documentProcessor.healthCheck();
        health.documents = docHealth.processor;
      } catch (error) {
        console.warn("Document processor health check failed:", error);
      }
    }

    // Test Redis
    if (this.redis) {
      try {
        await this.redis.ping();
      } catch (error) {
        health.redis = false;
        console.warn("Redis health check failed:", error);
      }
    }

    return health;
  }
}
