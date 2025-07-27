import { CoreMessage, StreamData, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import {
  RetrievalResult,
  RAGProcessedDocumentChunk,
  UserContext,
  GeneratedResponse,
} from "@/lib/rag/types";

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
  ) {
    const context = this.buildContext(retrievedContext, userContext);
    const systemPrompt = this.createSystemPrompt(context);
    const messages: CoreMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: query },
    ];

    const data = new StreamData();
    // Immediately pass retrieval context to the client for display
    data.append(JSON.parse(JSON.stringify({ retrievedContext })));

    const result = await streamText({
      // Use the specific model from our configured provider
      model: this.llm("gpt-4o"),
      messages,
      onFinish: async (completion) => {
        const validatedText = await this.validateResponse(
          completion.text,
          context,
        );
        const sources = this.addCitations(validatedText, retrievedContext);
        const confidence = completion.finishReason === "stop" ? 0.9 : 0.5;

        const finalResponse: GeneratedResponse = {
          text: validatedText,
          sources: sources,
          confidence: confidence,
        };
        // Append the final, processed data to the stream
        data.append(JSON.parse(JSON.stringify(finalResponse)));
        data.close();
      },
    });

    // Use toDataStreamResponse() to create a ReadableStream with the Vercel AI protocol.
    return result.toDataStreamResponse();
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
                `${r.source_entity_name} -> ${r.type} -> ${r.target_entity_name}`,
            )
            .join(", ")
        : "None"
    }
    `;

    let userProfileContext = "User Profile: Not provided.";
    if (userContext) {
      userProfileContext = `
User Profile:
- Country of Residence: ${userContext.countryOfResidence || "Not specified"}
- Country of Interest: ${userContext.countryOfInterest || "Not specified"}
- Immigration Goals: ${
        (userContext.immigrationGoals || []).join(", ") || "Not specified"
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
  public createSystemPrompt(context: BuiltContext): string {
    return `You are a specialized AI assistant for Hijraah, an immigration services platform. Your role is to provide accurate, context-aware, and personalized immigration advice.

    **Instructions:**
    1.  **Primary Source:** Base your answers strictly on the provided "Source" and "Knowledge Graph Context". Do not use outside knowledge.
    2.  **Citation:** When you use information from a source, cite it by number (e.g., [1], [2]).
    3.  **Personalization:** Use the "User Profile" to tailor your response to the user's specific situation.
    4.  **Temporal Awareness:** Consider the "Current Date" provided as ${context.temporalContext} for any time-sensitive information.
    5.  **No Information:** If the context does not contain an answer, explicitly state that you cannot answer based on the provided information. Do not invent details.
    6.  **Persona:** Maintain a professional, empathetic, and encouraging tone.

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
    return response;
  }

  /**
   * Extracts source citations from the final text.
   */
  private addCitations(
    responseText: string,
    retrievedContext: RetrievalResult,
  ): GeneratedResponse["sources"] {
    const mentionedSources = new Set<number>();
    const regex = /\[(\d+)\]/g;
    let match;
    while ((match = regex.exec(responseText)) !== null) {
      mentionedSources.add(parseInt(match[1], 10));
    }

    if (mentionedSources.size === 0) {
      // If no explicit citations, assume all sources were relevant to the response
      return retrievedContext.chunks;
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
