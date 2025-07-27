import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ModelMultiplexer } from "@/lib/ai/model-multiplexer";
import { EnhancedHybridRetriever } from "@/lib/ai/enhanced-hybrid-retriever";
import { db } from "@hijraah/database/client";
import {
  chatSessions,
  chatMessages,
  webIndexes,
} from "@hijraah/database/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

// OpenAI-compatible request schema
const chatCompletionSchema = z.object({
  model: z.string().default("gpt-4o"),
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    }),
  ),
  max_tokens: z.number().optional(),
  temperature: z.number().min(0).max(2).default(0.7),
  stream: z.boolean().default(false),
  // Custom Hijraah parameters
  web_index_id: z.string().optional(),
  use_rag: z.boolean().default(true),
  chat_session_id: z.string().optional(),
});

// Initialize services
const modelMultiplexer = new ModelMultiplexer();
const hybridRetriever = new EnhancedHybridRetriever();

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: { message: "Unauthorized", type: "authentication_error" } },
        { status: 401 },
      );
    }

    const body = await request.json();
    const validatedData = chatCompletionSchema.parse(body);

    // Get user's last message for RAG
    const userMessage = validatedData.messages
      .filter((m) => m.role === "user")
      .pop();

    if (!userMessage) {
      return NextResponse.json(
        {
          error: {
            message: "No user message found",
            type: "invalid_request_error",
          },
        },
        { status: 400 },
      );
    }

    let contextMessages = validatedData.messages;
    let sources: any[] = [];

    // Perform RAG retrieval if enabled and web_index_id provided
    if (validatedData.use_rag && validatedData.web_index_id) {
      // Verify user has access to the web index
      const [webIndex] = await db
        .select()
        .from(webIndexes)
        .where(
          and(
            eq(webIndexes.id, validatedData.web_index_id),
            eq(webIndexes.userId, session.user.id),
          ),
        )
        .limit(1);

      if (webIndex) {
        try {
          const retrievalResult = await hybridRetriever.retrieve(
            userMessage.content,
            {
              limit: 5,
              webIndexId: validatedData.web_index_id,
            },
          );

          sources = retrievalResult.documents;

          // Add context to messages if sources found
          if (sources.length > 0) {
            const contextContent = sources
              .map((doc, index) => `[Source ${index + 1}]: ${doc.content}`)
              .join("\n\n");

            const systemMessage = {
              role: "system" as const,
              content: `You are an AI assistant for Hijraah Immigration Platform. Use the following context to answer the user's question. If the context doesn't contain relevant information, say so clearly.

Context:
${contextContent}

Instructions:
- Provide accurate, helpful answers based on the context
- Cite sources when referencing specific information
- If information is not in the context, acknowledge this limitation
- Focus on immigration-related guidance when appropriate`,
            };

            contextMessages = [systemMessage, ...validatedData.messages];
          }
        } catch (ragError) {
          console.warn(
            "RAG retrieval failed, continuing without context:",
            ragError,
          );
        }
      }
    }

    // Generate response using model multiplexer
    const completion = await modelMultiplexer.createChatCompletion({
      model: validatedData.model,
      messages: contextMessages,
      max_tokens: validatedData.max_tokens,
      temperature: validatedData.temperature,
      stream: validatedData.stream,
    });

    // Store chat session and messages if chat_session_id provided
    if (validatedData.chat_session_id) {
      try {
        // Verify chat session belongs to user
        const [chatSession] = await db
          .select()
          .from(chatSessions)
          .where(
            and(
              eq(chatSessions.id, validatedData.chat_session_id),
              eq(chatSessions.userId, session.user.id),
            ),
          )
          .limit(1);

        if (chatSession) {
          // Store user message
          await db.insert(chatMessages).values({
            chatId: validatedData.chat_session_id,
            role: "user",
            content: userMessage.content,
            metadata: {
              webIndexId: validatedData.web_index_id,
              sourcesCount: sources.length,
            },
          });

          // Store assistant response
          const assistantContent = validatedData.stream
            ? "[Streaming response]"
            : completion.choices[0]?.message?.content || "";

          await db.insert(chatMessages).values({
            chatId: validatedData.chat_session_id,
            role: "assistant",
            content: assistantContent,
            metadata: {
              model: completion.model,
              usage: completion.usage,
              sources: sources.map((s) => ({
                id: s.id,
                title: s.title,
                url: s.source,
              })),
            },
          });
        }
      } catch (dbError) {
        console.error("Failed to store chat messages:", dbError);
        // Continue without failing the request
      }
    }

    // Handle streaming response
    if (validatedData.stream) {
      return new Response(completion.stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Add sources to response metadata for non-streaming
    const response = {
      ...completion,
      hijraah_metadata: {
        sources: sources.map((s) => ({
          id: s.id,
          title: s.title,
          url: s.source,
          relevance: s.similarity,
        })),
        web_index_id: validatedData.web_index_id,
        rag_enabled: validatedData.use_rag,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in chat completions:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            message: "Invalid request parameters",
            type: "invalid_request_error",
            details: error.errors,
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: {
          message: "Internal server error",
          type: "api_error",
        },
      },
      { status: 500 },
    );
  }
}

// GET endpoint for API documentation
export async function GET() {
  return NextResponse.json({
    name: "Hijraah Chat Completions API",
    description: "OpenAI-compatible chat completions with RAG capabilities",
    version: "1.0.0",
    endpoints: {
      "POST /api/v1/chat/completions": {
        description: "Create a chat completion with optional RAG retrieval",
        parameters: {
          model: "AI model to use (default: gpt-4o)",
          messages: "Array of chat messages",
          web_index_id: "Optional web index ID for RAG retrieval",
          use_rag: "Enable/disable RAG retrieval (default: true)",
          chat_session_id: "Optional chat session ID for message storage",
          temperature: "Sampling temperature (0-2, default: 0.7)",
          max_tokens: "Maximum tokens in response",
          stream: "Enable streaming response (default: false)",
        },
      },
    },
    authentication: "Bearer token required",
  });
}
