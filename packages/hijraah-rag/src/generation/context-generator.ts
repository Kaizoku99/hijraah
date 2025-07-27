import { CoreMessage, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import {
  RetrievalResult,
  RAGProcessedDocumentChunk,
  UserContext,
  GeneratedResponse,
  GenerationError,
  GenerationContext,
  GenerationOptions,
} from "../types.js";

/**
 * A generator that creates context-aware and personalized responses,
 * supporting real-time streaming and post-generation processing.
 */
export class ContextAwareGenerator {
  private llm;

  constructor(apiKey?: string) {
    // Create a custom OpenAI provider instance with the API key.
    // The AI SDK will automatically use the OPENAI_API_KEY environment
    // variable if the apiKey is not provided.
    this.llm = createOpenAI({
      apiKey: apiKey,
    });
  }

  /**
   * Generates a streaming response based on a query, retrieval context, and user profile.
   */
  async generate(
    query: string,
    retrievedContext: RetrievalResult,
    userContext?: UserContext | null,
    options?: GenerationOptions,
  ) {
    const context = this.buildContext(retrievedContext, userContext);
    const systemPrompt = this.createSystemPrompt(context, options);
    const messages: CoreMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: query },
    ];

    const model = options?.model || "gpt-4o";
    const temperature = options?.temperature || 0.7;
    const maxOutputTokens = options?.maxTokens || 2048;
    const startTime = Date.now();

    const result = streamText({
      model: this.llm(model),
      messages,
      temperature,
      maxOutputTokens,
      maxRetries: 3,
      onFinish: async ({ usage, finishReason, text, response }) => {
        console.log(`[ContextAwareGenerator] Stream finished.`);
        console.log(`Usage: ${JSON.stringify(usage)}`);
        console.log(`Finish reason: ${finishReason}`);
        // Post-generation processing
        const validatedText = await this.validateResponse(text, context);
        const sources = this.extractSourcesWithCitations(
          validatedText,
          retrievedContext,
        );
        const confidence = finishReason === "stop" ? 0.9 : 0.5;
        const finalResponse: GeneratedResponse = {
          text: validatedText,
          sources: sources,
          confidence: confidence,
          metadata: {
            model,
            tokensUsed: usage?.totalTokens || 0,
            processingTime: Date.now() - startTime,
            sourcesUsed: sources.length,
            citationsIncluded: options?.includeSourceCitations !== false,
          },
        };
        console.log(
          `[ContextAwareGenerator] Final response metadata:`,
          finalResponse.metadata,
        );
      },
      onError: ({ error }) => {
        console.error("[ContextAwareGenerator] Streaming error:", error);
      },
    });
    // Return a Response object that can be used in API routes
    return result.toTextStreamResponse();
  }

  /**
   * Non-streaming version for simpler use cases
   */
  async generateSync(context: GenerationContext): Promise<GeneratedResponse> {
    const builtContext = this.buildContext(
      context.retrievalResult,
      context.userContext,
    );
    const systemPrompt = this.createSystemPrompt(
      builtContext,
      context.generationOptions,
    );
    const messages: CoreMessage[] = [{ role: "system", content: systemPrompt }];

    // Add conversation history if provided
    if (context.conversationHistory) {
      messages.push(
        ...context.conversationHistory.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      );
    }

    messages.push({ role: "user", content: context.query });

    const model = context.generationOptions?.model || "gpt-4o";
    const temperature = context.generationOptions?.temperature || 0.7;
    const maxTokens = context.generationOptions?.maxTokens || 2048;
    const startTime = Date.now();

    try {
      const response = await this.llm(model).doGenerate({
        inputFormat: "messages",
        mode: {
          type: "regular",
        },
        prompt: messages,
        temperature,
        maxTokens,
      });

      const text = response.text || "";
      const validatedText = await this.validateResponse(text, builtContext);
      const sources = this.extractSourcesWithCitations(
        validatedText,
        context.retrievalResult,
      );

      return {
        text: validatedText,
        sources,
        confidence: response.finishReason === "stop" ? 0.9 : 0.5,
        metadata: {
          model,
          tokensUsed: response.usage?.totalTokens || 0,
          processingTime: Date.now() - startTime,
          sourcesUsed: sources.length,
          citationsIncluded:
            context.generationOptions?.includeSourceCitations !== false,
        },
      };
    } catch (error) {
      throw new GenerationError("Failed to generate response", error);
    }
  }

  /**
   * Constructs the full context string to be passed to the LLM.
   */
  public buildContext(
    retrievedContext: RetrievalResult,
    userContext?: UserContext | null,
  ): BuiltContext {
    const chunkContext = retrievedContext.chunks
      .map(
        (chunk, index) =>
          `Source [${index + 1}] (${chunk.metadata.sourceUrl}):\n${
            chunk.content
          }`,
      )
      .join("\n\n---\n\n");

    const kgContext = `
Knowledge Graph Context:
Entities: ${
      retrievedContext.kgContext.entities.length > 0
        ? retrievedContext.kgContext.entities
            .map((e) => `${e.name} (${e.type})`)
            .join(", ")
        : "None"
    }
Relationships: ${
      retrievedContext.kgContext.relationships.length > 0
        ? retrievedContext.kgContext.relationships
            .map(
              (r) =>
                `${r.sourceEntityName} -> ${r.type} -> ${r.targetEntityName}`,
            )
            .join(", ")
        : "None"
    }
    `;

    let userProfileContext = "User Profile: Not provided.";
    if (userContext) {
      userProfileContext = `
User Profile:
- User ID: ${userContext.userId}
- Preferred Language: ${userContext.preferences?.language || "Not specified"}
- Complexity Level: ${userContext.preferences?.complexity || "intermediate"}
- Domains of Interest: ${
        (userContext.preferences?.domains || []).join(", ") || "Not specified"
      }
- Goals: ${(userContext.profile?.goals || []).join(", ") || "Not specified"}
- Interests: ${
        (userContext.profile?.interests || []).join(", ") || "Not specified"
      }
    `;
    }

    const formattedContext = `${chunkContext}\n\n${kgContext}\n\n${userProfileContext}`;
    const temporalContext = this.getTemporalContext();

    return { formattedContext, temporalContext };
  }

  /**
   * Gets the current date to provide temporal context.
   */
  private getTemporalContext(): string {
    return new Date().toISOString();
  }

  /**
   * Creates the system prompt with instructions for the LLM.
   */
  public createSystemPrompt(
    context: BuiltContext,
    options?: GenerationOptions,
  ): string {
    const tone = options?.tone || "professional";
    const format = options?.format || "markdown";
    const includeCitations = options?.includeSourceCitations !== false;

    const toneInstructions = {
      professional:
        "Maintain a professional, informative tone suitable for official immigration advice.",
      casual:
        "Use a friendly, conversational tone while remaining accurate and helpful.",
      academic:
        "Use formal academic language with precise terminology and detailed explanations.",
    };

    return `You are a specialized AI assistant for Hijraah, an immigration services platform. Your role is to provide accurate, context-aware, and personalized immigration advice.

    **Instructions:**
    1.  **Primary Source:** Base your answers strictly on the provided "Source" and "Knowledge Graph Context". Do not use outside knowledge.
    2.  **Citation:** ${includeCitations ? "When you use information from a source, cite it by number (e.g., [1], [2])." : "Do not include source citations in your response."}
    3.  **Personalization:** Use the "User Profile" to tailor your response to the user's specific situation.
    4.  **Temporal Awareness:** Consider the "Current Date" provided as ${context.temporalContext} for any time-sensitive information.
    5.  **No Information:** If the context does not contain an answer, explicitly state that you cannot answer based on the provided information. Do not invent details.
    6.  **Tone:** ${toneInstructions[tone]}
    7.  **Format:** Provide your response in ${format} format.

    **Provided Context:**
    ${context.formattedContext}
    `;
  }

  /**
   * Validates the generated response.
   */
  private async validateResponse(
    response: string,
    context: BuiltContext,
  ): Promise<string> {
    if (!response || response.trim().length === 0) {
      return "I am sorry, but I could not generate a response based on the provided information.";
    }

    // Additional validation can be added here
    // - Check for harmful content
    // - Verify factual accuracy against context
    // - Ensure formatting is correct

    return response;
  }

  /**
   * Extracts source citations from the final text.
   */
  private extractSourcesWithCitations(
    responseText: string,
    retrievedContext: RetrievalResult,
  ): RAGProcessedDocumentChunk[] {
    const mentionedSources = new Set<number>();
    const regex = /\[(\d+)\]/g;
    let match;
    while ((match = regex.exec(responseText)) !== null) {
      mentionedSources.add(parseInt(match[1], 10));
    }

    if (mentionedSources.size === 0) {
      // If no explicit citations, assume all sources were relevant to the response
      return retrievedContext.chunks.slice(0, 3); // Return top 3 sources
    }

    return Array.from(mentionedSources)
      .sort((a, b) => a - b)
      .map((num) => retrievedContext.chunks[num - 1])
      .filter(Boolean); // Filter out any invalid index
  }
}

/**
 * Internal representation of the context passed to the LLM.
 */
interface BuiltContext {
  formattedContext: string;
  temporalContext: string;
}
