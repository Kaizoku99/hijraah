/**
 * Dynamic Suggestions Generation API
 *
 * Generates context-aware suggestions based on conversation history and user context.
 * Uses AI to create personalized, relevant suggestions for immigration-related queries.
 */

import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import { logger } from "@/lib/logger";
import { trackEvent } from "@/lib/monitoring";
import { RateLimitService } from "@/services/rate-limit-service";
import {
  authenticateRequest as authenticateRequestAdapter,
  createAuthErrorResponse,
  AuthenticationError,
  type AuthResult,
} from "../../chat/auth-adapter";
import {
  createSuggestionsCacheKey,
  getCachedSuggestions,
  cacheSuggestions,
  type CachedSuggestion,
} from "@/lib/suggestions-cache";

// Validation schemas
const suggestionRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    })
  ),
  type: z.enum(["initial", "follow-up", "contextual"]),
  context: z.object({
    conversationLength: z.number(),
    lastUserMessage: z.string().optional(),
    lastAssistantMessage: z.string().optional(),
  }),
});

const suggestionResponseSchema = z.object({
  text: z.string(),
  category: z.enum(["initial", "follow-up", "contextual"]),
  confidence: z.number().min(0).max(1),
});

type SuggestionRequest = z.infer<typeof suggestionRequestSchema>;

// Immigration-specific suggestion templates
const immigrationSuggestionTemplates = {
  initial: [
    "Can you explain the {country} {visa_type} requirements?",
    "What documents do I need for a {country} {visa_type} visa?",
    "Compare {country1} and {country2} immigration policies",
    "How long does the {visa_type} process usually take?",
    "What are the eligibility criteria for {visa_type}?",
    "How much does the {visa_type} application cost?",
    "What are the processing times for {visa_type}?",
    "Can you help me understand the {visa_type} points system?",
  ],
  followUp: [
    "Can you elaborate on the financial requirements?",
    "What are the next steps in the process?",
    "Are there any exceptions to these rules?",
    "How can I improve my chances of approval?",
    "What happens if my application is rejected?",
    "Can you provide more details about the interview process?",
    "What documents should I prepare in advance?",
    "How do I track my application status?",
  ],
  contextual: [
    "Based on what you mentioned about {topic}, what should I consider?",
    "Given my situation with {context}, what are my options?",
    "How does {previous_topic} relate to {current_topic}?",
    "What are the alternatives to {mentioned_approach}?",
    "Can you provide more specific guidance for {specific_situation}?",
    "What are the pros and cons of {option}?",
    "How does this compare to other similar programs?",
    "What are the recent changes to {policy}?",
  ],
};

// Immigration-related keywords for context analysis
const immigrationKeywords = {
  countries: [
    "canada",
    "usa",
    "uk",
    "australia",
    "new zealand",
    "germany",
    "france",
    "singapore",
  ],
  visaTypes: [
    "express entry",
    "h1b",
    "skilled worker",
    "student",
    "family",
    "business",
    "investor",
    "refugee",
  ],
  topics: [
    "requirements",
    "documents",
    "processing time",
    "costs",
    "eligibility",
    "points",
    "interview",
    "appeal",
  ],
};

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Authentication with ECONNRESET error handling
    let authResult: AuthResult;
    try {
      authResult = await authenticateRequestAdapter(request as any);
    } catch (error) {
      // Handle connection reset errors gracefully
      if (error instanceof Error && error.message.includes('ECONNRESET')) {
        logger.warn("Connection reset during authentication", { error: error.message });
        return NextResponse.json(
          { error: "Connection interrupted. Please try again." },
          { status: 503 }
        );
      }
      if (error instanceof AuthenticationError) {
        return createAuthErrorResponse(error);
      }
      throw error;
    }

    const { user: userFromAuth, isGuest } = authResult;
    const userId = userFromAuth.id;

    // Parse and validate request first for caching
    const body = await request.json();
    const validatedRequest = suggestionRequestSchema.parse(body);

    // Create message content hash for caching
    const messageContent = validatedRequest.messages
      .map(m => `${m.role}:${m.content}`)
      .join('|');

    // Create cache key using Redis-based caching
    const cacheKey = createSuggestionsCacheKey(
      userId,
      validatedRequest.type,
      validatedRequest.context.conversationLength,
      messageContent
    );
    
    // Check Redis cache first
    const cachedSuggestions = await getCachedSuggestions(cacheKey);
    if (cachedSuggestions) {
      logger.info("Returning cached suggestion response", {
        userId,
        type: validatedRequest.type,
        count: cachedSuggestions.length,
        cacheKey: cacheKey.slice(0, 30) + "...",
      });
      
      // Track cached result
      trackEvent({
        name: "suggestions_generated",
        userId,
        properties: {
          type: validatedRequest.type,
          count: cachedSuggestions.length,
          conversationLength: validatedRequest.context.conversationLength,
          processingTime: Date.now() - startTime,
          cached: true,
        },
      });

      return NextResponse.json(cachedSuggestions);
    }

    // Rate limiting (more aggressive for suggestions)
    const rateLimitResult = await RateLimitService.isAllowed(
      userId,
      "suggestions",
      "premium" // Use available tier
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

    // Log request for observability
    logger.info("Suggestion generation request", {
      userId,
      isGuest,
      type: validatedRequest.type,
      conversationLength: validatedRequest.context.conversationLength,
      cacheKey: cacheKey.slice(0, 30) + "...",
    });

    // Generate suggestions using AI
    const suggestions = await generateContextualSuggestions(validatedRequest);

    // Cache the results in Redis
    await cacheSuggestions(cacheKey, suggestions, {
      userId,
      type: validatedRequest.type,
      conversationLength: validatedRequest.context.conversationLength,
      messageHash: Buffer.from(messageContent).toString('base64').slice(0, 20),
    });

    // Track event
    trackEvent({
      name: "suggestions_generated",
      userId,
      properties: {
        type: validatedRequest.type,
        count: suggestions.length,
        conversationLength: validatedRequest.context.conversationLength,
        processingTime: Date.now() - startTime,
        cached: false,
      },
    });

    return NextResponse.json(suggestions);
  } catch (error) {
    logger.error(
      "Suggestion generation failed",
      error instanceof Error ? error : new Error(String(error))
    );

    // Handle specific error types
    if (error instanceof Error) {
      // Handle connection reset errors
      if (error.message.includes('ECONNRESET') || error.message.includes('aborted')) {
        return NextResponse.json(
          { error: "Connection interrupted. Please try again." },
          { status: 503 }
        );
      }
      
      // Handle timeout errors
      if (error.message.includes('timeout')) {
        return NextResponse.json(
          { error: "Request timed out. Please try again." },
          { status: 504 }
        );
      }
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request format", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function generateContextualSuggestions(
  request: SuggestionRequest
): Promise<CachedSuggestion[]> {
  const { messages, type, context } = request;

  // Create AI provider
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Build context-aware prompt
  const prompt = buildSuggestionPrompt(messages, type, context);

  try {
    const result = await generateText({
      model: openai("gpt-4o-mini") as any, // Type assertion for AI SDK v5 compatibility
      prompt,
      maxOutputTokens: 500,
      temperature: 0.7,
    });

    // Parse AI response and extract suggestions
    const suggestions = parseSuggestionsFromAIResponse(result.text, type);

    return suggestions.map((text, index) => ({
      text,
      category: type,
      confidence: Math.max(0.7, 1 - index * 0.1), // Higher confidence for first suggestions
    }));
  } catch (error) {
    logger.warn("AI suggestion generation failed, using fallback", {
      error: error instanceof Error ? error.message : String(error),
    });

    // Fallback to template-based suggestions
    const fallbackSuggestions = generateFallbackSuggestions(type, context);
    return fallbackSuggestions;
  }
}

function buildSuggestionPrompt(
  messages: SuggestionRequest["messages"],
  type: string,
  context: SuggestionRequest["context"]
): string {
  const conversationContext = messages
    .slice(-4) // Last 4 messages for context
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n");

  const immigrationContext = extractImmigrationContext(messages);

  return `You are an immigration expert assistant. Generate 4-6 relevant, specific, and helpful follow-up questions based on the conversation context.

Conversation Context:
${conversationContext}

Immigration Context Detected: ${immigrationContext}

Suggestion Type: ${type}

Requirements:
- Questions should be specific to immigration and visa processes
- Focus on practical next steps and clarifications
- Keep questions concise (under 100 characters)
- Make them actionable and relevant to the user's situation
- Avoid generic questions if specific context is available

Generate exactly 4 suggestions, one per line, starting with a dash (-).`;
}

function extractImmigrationContext(
  messages: SuggestionRequest["messages"]
): string {
  const allText = messages
    .map((m) => m.content)
    .join(" ")
    .toLowerCase();

  const detectedCountries = immigrationKeywords.countries.filter((country) =>
    allText.includes(country)
  );

  const detectedVisaTypes = immigrationKeywords.visaTypes.filter((visaType) =>
    allText.includes(visaType)
  );

  const detectedTopics = immigrationKeywords.topics.filter((topic) =>
    allText.includes(topic)
  );

  const context = [];
  if (detectedCountries.length > 0)
    context.push(`Countries: ${detectedCountries.join(", ")}`);
  if (detectedVisaTypes.length > 0)
    context.push(`Visa Types: ${detectedVisaTypes.join(", ")}`);
  if (detectedTopics.length > 0)
    context.push(`Topics: ${detectedTopics.join(", ")}`);

  return context.length > 0
    ? context.join("; ")
    : "General immigration inquiry";
}

function parseSuggestionsFromAIResponse(
  aiResponse: string,
  type: string
): string[] {
  const lines = aiResponse.split("\n").filter((line) => line.trim());
  const suggestions: string[] = [];

  for (const line of lines) {
    const cleanedLine = line.replace(/^[-•*]\s*/, "").trim();
    if (cleanedLine && cleanedLine.length > 10 && cleanedLine.length < 150) {
      suggestions.push(cleanedLine);
    }
  }

  // Ensure we have at least 4 suggestions
  while (suggestions.length < 4) {
    const fallbackSuggestions = generateFallbackSuggestions(type as any, {
      conversationLength: 0,
    });
    suggestions.push(
      fallbackSuggestions[suggestions.length]?.text ||
        "How can I help you further?"
    );
  }

  return suggestions.slice(0, 6); // Return max 6 suggestions
}

function generateFallbackSuggestions(
  type: "initial" | "follow-up" | "contextual",
  context: SuggestionRequest["context"]
): CachedSuggestion[] {
  const templates =
    immigrationSuggestionTemplates[type === "follow-up" ? "followUp" : type];
  const suggestions = templates
    .slice(0, 4)
    .map((template: string, index: number) => ({
      text: template
        .replace("{country}", "Canada")
        .replace("{country1}", "Canada")
        .replace("{country2}", "Australia")
        .replace("{visa_type}", "Express Entry")
        .replace("{topic}", "immigration requirements")
        .replace("{context}", "your situation")
        .replace("{previous_topic}", "visa requirements")
        .replace("{current_topic}", "application process")
        .replace("{mentioned_approach}", "Express Entry")
        .replace("{specific_situation}", "your case")
        .replace("{option}", "this pathway")
        .replace("{policy}", "immigration policies"),
      category: type,
      confidence: Math.max(0.6, 1 - index * 0.1),
    }));

  return suggestions;
}
