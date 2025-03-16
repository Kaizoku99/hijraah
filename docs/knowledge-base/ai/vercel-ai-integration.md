# Vercel AI Integration Guide

This document provides comprehensive guidelines for integrating and using AI capabilities in the Hijraah immigration platform using the Vercel AI SDK.

## Overview

The Hijraah platform leverages advanced AI capabilities to enhance the immigration experience for users. This is primarily achieved through the Vercel AI SDK, which provides a unified interface for working with various AI models and capabilities across the application.

## Key Components

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                  Vercel AI SDK Integration                  │
│                                                             │
├─────────────────┬───────────────────────┬─────────────────┤
│                 │                       │                 │
│  Model Access   │   Streaming Response  │  AI Tools       │
│                 │                       │                 │
└─────────────────┴───────────────────────┴─────────────────┘
           │                  │                   │
┌──────────▼──────────┐ ┌────▼─────────────┐ ┌───▼────────────────┐
│                     │ │                  │ │                    │
│  Multiple AI Models │ │ Server Components│ │ Function Calling   │
│  - OpenAI           │ │ & API Routes     │ │ & Tools Framework  │
│  - Anthropic        │ │                  │ │                    │
│  - Google           │ └──────────────────┘ └────────────────────┘
│  - DeepSeek         │
│                     │
└─────────────────────┘
           │
┌──────────▼──────────┐
│                     │
│    UI Components    │
│    - Chat UI        │
│    - Research UI    │
│    - Document Gen   │
│                     │
└─────────────────────┘
```

## Installation and Setup

### 1. Required Dependencies

The Hijraah platform uses the following AI-related packages:

```bash
# Core Vercel AI SDK
npm install ai

# Model provider integrations
npm install @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/google @ai-sdk/deepseek
```

### 2. Environment Variables

Configure the following environment variables in your `.env.local` file:

```
# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Anthropic
ANTHROPIC_API_KEY=your-anthropic-api-key

# Google AI
GOOGLE_API_KEY=your-google-api-key

# DeepSeek
DEEPSEEK_API_KEY=your-deepseek-api-key
```

## Model Management

The Hijraah platform implements a centralized model management system in `src/lib/ai/models.ts` that provides:

1. A registry of available models across providers
2. A unified interface for model selection
3. Custom reasoning models with enhanced capabilities

### Available Models

The platform supports multiple models from various providers:

| Provider  | Available Models                   | Use Cases                              |
| --------- | ---------------------------------- | -------------------------------------- |
| OpenAI    | GPT-4o, GPT-4o Mini, GPT-3.5-Turbo | General chat, document analysis        |
| Anthropic | Claude 3 Opus, Claude 3 Sonnet     | Research, reasoning, factual responses |
| Google    | Gemini Pro                         | Alternative model option               |
| DeepSeek  | DeepSeek Coder                     | Code analysis, technical documentation |

### Model Selection

Use the `AIModelSelector` component for allowing users to select their preferred model:

```tsx
import { AIModelSelector } from "@/components/research/AIModelSelector";

export function ResearchInterface() {
  const [modelId, setModelId] = useState("gpt-4o-mini");

  return (
    <div>
      <AIModelSelector value={modelId} onChange={setModelId} />
      {/* Rest of your component */}
    </div>
  );
}
```

### Custom Model Configuration

For advanced use cases, you can use the `customModel` helper:

```typescript
import { customModel } from "@/lib/ai/models";

// Get the appropriate model ID, optionally enabling reasoning capabilities
const modelId = customModel("gpt-4o-mini", true); // Enable reasoning
```

## Chat Implementation

### Basic Chat Integration

The simplest way to add AI chat functionality is using the `useChat` hook:

```tsx
"use client";

import { useChat } from "ai/react";

export function SimpleChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about immigration..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

### Customized Chat Components

For more advanced use cases, use the pre-built `AIChat` component:

```tsx
import { AIChat } from "@/components/ui/ai-chat";

export function ImmigrationResearchPage() {
  return (
    <div className="container">
      <h2>Immigration Research Assistant</h2>
      <AIChat
        filters={{
          country: "Canada",
          category: "Work Visa",
          language: "en",
        }}
      />
    </div>
  );
}
```

## API Routes

### Chat API Route

The main chat API route is implemented in `src/app/api/chat/route.ts` and supports:

1. Streaming responses
2. Multiple AI models
3. Function calling via AI tools
4. Session persistence

Example implementation:

```typescript
import { createDataStreamResponse, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { customModel } from "@/lib/ai/models";
import { tools } from "@/lib/ai/tools";

export const runtime = "edge";

export async function POST(req: Request) {
  return createDataStreamResponse({
    execute: async (dataStream) => {
      try {
        const { messages, modelId = "gpt-4o-mini" } = await req.json();

        // Create the appropriate model instance
        const model = customModel(modelId, false);

        // Create streaming response using Vercel AI SDK
        const result = await streamText({
          model: openai(model),
          messages,
          temperature: 0.7,
          tools,
        });

        // Merge the streaming result into the data stream
        result.mergeIntoDataStream(dataStream);

        // Additional processing can be done here
      } catch (error) {
        console.error("Chat API error:", error);
        dataStream.writeData({
          type: "error",
          value: { message: "Failed to process chat request" },
        });
      }
    },
  });
}
```

## AI Tools and Function Calling

The Vercel AI SDK supports function calling through AI tools, which are defined in `src/lib/ai/tools/`.

### Creating Custom Tools

```typescript
import { tool } from "ai";
import { z } from "zod";

export const searchTool = tool({
  description: "Search for immigration information",
  parameters: z.object({
    query: z.string().describe("The search query"),
    country: z.string().optional().describe("Country to search for"),
  }),
  execute: async ({ query, country }) => {
    // Implement search functionality
    const results = await performSearch(query, country);
    return results;
  },
});
```

### Using Tools in Chat

Tools can be enabled in the chat API route:

```typescript
const result = await streamText({
  model: openai(model),
  messages,
  temperature: 0.7,
  experimental_activeTools: ["search", "extract", "createDocument"],
  tools,
});
```

## Embeddings and Vector Search

The platform uses OpenAI embeddings for semantic search capabilities:

### Generating Embeddings

```typescript
import { generateEmbedding } from "@/lib/openai";

// Generate embedding for text
const embedding = await generateEmbedding("Canadian immigration requirements");

// Store embedding in Supabase
await supabase.from("embeddings").insert({
  text: "Canadian immigration requirements",
  embedding,
  metadata: { type: "research" },
});
```

### Semantic Search

```typescript
import { performSemanticSearch } from "@/lib/search";

// Search for relevant content
const results = await performSemanticSearch("Work permit requirements", 10);
```

## Document Processing and Analysis

AI tools are used for document analysis and processing:

### Text Extraction and Analysis

```typescript
import { extractImmigrationData } from "@/lib/ai/extract-immigration-data";

// Extract structured information from text
const structuredData = await extractImmigrationData(documentText);
```

### Document Generation

```typescript
import { generateDocument } from "@/lib/ai/document-generator";

// Generate a document based on a template and user data
const coverLetter = await generateDocument("coverLetter", {
  name: "John Doe",
  experience: "5 years in software development",
  targetCountry: "Canada",
  visaType: "Express Entry",
});
```

## Research and Analysis Features

The platform includes specialized AI research capabilities:

### Deep Research Tool

```typescript
const deepResearchTool = tool({
  description: "Perform deep research on a topic",
  parameters: z.object({
    topic: z.string().describe("Research topic"),
    depth: z.number().optional().describe("Research depth (1-5)"),
  }),
  execute: async ({ topic, depth = 3 }) => {
    // Implement multi-stage research process
    return await performDeepResearch(topic, depth);
  },
});
```

### Immigration Comparison

```typescript
import { compareImmigrationPaths } from "@/lib/ai/immigration-comparison";

// Compare immigration options
const comparison = await compareImmigrationPaths({
  profile: userProfile,
  countries: ["Canada", "Australia"],
  visaTypes: ["Work", "Student"],
});
```

## Web Scraping with Firecrawl and AI

The Hijraah platform combines Firecrawl's web scraping capabilities with AI to extract and process immigration information from government websites and other authoritative sources.

### Setting Up Firecrawl Scraper

```typescript
import { FirecrawlScraper } from "@/lib/scrapers/firecrawl";
import { summarizeText } from "@/lib/ai/summarize";
import { extractImmigrationData } from "@/lib/ai/extract-immigration-data";

// Initialize the scraper
const scraper = new FirecrawlScraper({
  headless: true,
  timeout: 30000,
  userAgent: "Hijraah Immigration Research Bot",
});

// Scrape content from an immigration website
async function scrapeImmigrationInfo(url: string) {
  // 1. Use Firecrawl to extract content
  const { html, text } = await scraper.scrape(url);

  // 2. Summarize the content with AI
  const summary = await summarizeText(text);

  // 3. Extract structured immigration data
  const structuredData = await extractImmigrationData(text);

  // 4. Store results
  await storeScrapedData({
    url,
    summary,
    structuredData,
    rawText: text,
    timestamp: new Date().toISOString(),
  });

  return {
    summary,
    structuredData,
  };
}
```

### AI-Enhanced Content Processing

The platform uses AI to enhance scraped content:

1. **Content Classification**: Automatically categorize immigration content (visa types, requirements, procedures)
2. **Information Extraction**: Pull out key details like requirements, fees, processing times
3. **Change Detection**: Identify changes in immigration policies over time
4. **Cross-Referencing**: Validate information across multiple sources

```typescript
import { classifyContent } from "@/lib/ai/content-classifier";

// Classify scraped content
async function classifyScrapedContent(text: string) {
  return await classifyContent(text, {
    categories: [
      "visa_requirements",
      "application_process",
      "fees_and_costs",
      "eligibility_criteria",
      "processing_times",
      "legal_updates",
    ],
  });
}
```

### Scheduled Scraping with AI Analysis

The platform implements scheduled scraping with AI analysis for keeping immigration information current:

```typescript
// src/app/api/scheduled-scraping/route.ts
import { FirecrawlScraper } from "@/lib/scrapers/firecrawl";
import { summarizeText } from "@/lib/ai/summarize";
import { extractImmigrationData } from "@/lib/ai/extract-immigration-data";
import { detectContentChanges } from "@/lib/ai/content-changes";

export async function POST(req: Request) {
  try {
    const { sourcesToScrape } = await req.json();

    const scraper = new FirecrawlScraper();
    const results = [];

    for (const source of sourcesToScrape) {
      // Extract content
      const { text } = await scraper.scrape(source.url);

      // Get previous version from database
      const previousVersion = await getPreviousVersionFromDB(source.url);

      // Detect if significant changes occurred using AI
      const { hasChanged, changes } = await detectContentChanges(
        text,
        previousVersion.text
      );

      if (hasChanged) {
        // Process and analyze new content
        const summary = await summarizeText(text);
        const structuredData = await extractImmigrationData(text);

        // Store updated information
        await updateDatabaseWithNewVersion(source.url, {
          text,
          summary,
          structuredData,
          changes,
        });

        // Add to results
        results.push({
          url: source.url,
          hasChanged: true,
          changes,
        });
      } else {
        results.push({
          url: source.url,
          hasChanged: false,
        });
      }
    }

    return Response.json({ results });
  } catch (error) {
    console.error("Scheduled scraping error:", error);
    return Response.json(
      { error: "Failed to complete scheduled scraping" },
      { status: 500 }
    );
  }
}
```

## Best Practices

### 1. Error Handling

Always implement proper error handling for AI operations:

```typescript
try {
  const result = await aiOperation();
  // Process result
} catch (error) {
  if (error.name === "APIError") {
    // Handle API errors (rate limits, authentication)
  } else if (error.name === "ValidationError") {
    // Handle input validation errors
  } else {
    // Handle other errors
    console.error("AI operation failed:", error);
  }
}
```

### 2. Rate Limiting and Cost Management

Implement rate limiting to control API usage:

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create rate limiter (10 requests per minute)
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1m"),
  analytics: true,
});

// Apply rate limiting
const { success, remaining } = await ratelimit.limit(userIdentifier);
if (!success) {
  throw new Error("Rate limit exceeded. Please try again later.");
}
```

### 3. Content Moderation

Implement content moderation for user inputs:

```typescript
import { moderateContent } from "@/lib/ai/moderation";

// Check content before processing
const { flagged, categories } = await moderateContent(userInput);
if (flagged) {
  throw new Error("Content violates platform policies.");
}
```

### 4. Performance Optimization

For improved performance:

- Use edge runtime for AI-powered API routes
- Implement caching for common AI responses
- Use streaming responses for better user experience

## Integration with Other Systems

### Supabase Integration

AI capabilities are integrated with Supabase for data persistence:

```typescript
import { supabase } from "@/lib/supabase/client";

// Store chat history
await supabase.from("chat_sessions").insert({
  user_id: userId,
  messages: chatMessages,
  model: selectedModel,
  created_at: new Date().toISOString(),
});
```

### Next.js App Router Integration

AI components are designed to work with Next.js App Router:

- Server Components fetch initial AI data
- Client Components handle interactive AI features
- Edge API Routes manage streaming AI responses

## Testing AI Components

### Unit Testing

Test AI components with mock responses:

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { AIChat } from "@/components/ui/ai-chat";
import { useChat } from "ai/react";

// Mock the useChat hook
jest.mock("ai/react", () => ({
  useChat: jest.fn(),
}));

describe("AIChat component", () => {
  it("renders correctly and handles user input", () => {
    // Mock implementation
    (useChat as jest.Mock).mockReturnValue({
      messages: [{ id: "1", role: "assistant", content: "How can I help?" }],
      input: "",
      handleInputChange: jest.fn(),
      handleSubmit: jest.fn(),
    });

    render(<AIChat />);

    // Assert UI elements
    expect(screen.getByText("How can I help?")).toBeInTheDocument();
  });
});
```

### Integration Testing

Test the complete AI workflow:

```typescript
describe("AI Chat Integration", () => {
  it("sends messages and receives responses", async () => {
    // Implement end-to-end test with msw or similar
  });
});
```

## Future AI Enhancements

Planned enhancements to the AI system include:

1. **Multimodal Support**: Enabling image understanding for document analysis
2. **Fine-tuned Models**: Creating immigration-specific fine-tuned models
3. **Collaborative AI**: Enabling collaborative research with shared AI sessions
4. **Enhanced Personalization**: More personalized responses based on user history
5. **Autonomous Agents**: Creating autonomous agents for complex immigration tasks

## Conclusion

The Vercel AI SDK provides a powerful foundation for AI integration in the Hijraah platform. By following this guide, developers can effectively implement, extend, and maintain AI capabilities throughout the application.

For questions or additional assistance, contact the AI integration team.
