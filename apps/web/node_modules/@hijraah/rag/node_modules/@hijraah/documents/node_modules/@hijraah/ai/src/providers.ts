import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { deepseek } from "@ai-sdk/deepseek";
import { fireworks } from "@ai-sdk/fireworks";
import { mistral } from "@ai-sdk/mistral";
import { customProvider, wrapLanguageModel } from "ai";
import { cacheMiddleware } from "./middleware.js";

// Provider configuration interface
export interface ProviderConfig {
  enabled: boolean;
  apiKey?: string;
  baseURL?: string;
  defaultModel?: string;
  rateLimit?: {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
}

// Unified provider registry following Context7 patterns
export function createHijraahProviderRegistry(
  config: Record<string, ProviderConfig>
) {
  const languageModels: Record<string, any> = {};
  const imageModels: Record<string, any> = {};

  // OpenAI Provider
  if (config.openai?.enabled) {
    const openaiClient = openai({
      apiKey: config.openai.apiKey,
      baseURL: config.openai.baseURL,
    });

    // Add OpenAI language models with caching middleware
    languageModels["gpt-4o"] = wrapLanguageModel({
      model: openaiClient("gpt-4o"),
      middleware: cacheMiddleware(),
    });

    languageModels["gpt-4o-mini"] = wrapLanguageModel({
      model: openaiClient("gpt-4o-mini"),
      middleware: cacheMiddleware(),
    });

    languageModels["gpt-4-turbo"] = wrapLanguageModel({
      model: openaiClient("gpt-4-turbo"),
      middleware: cacheMiddleware(),
    });

    // Add image models
    imageModels["dall-e-3"] = openaiClient.image("dall-e-3");
    imageModels["dall-e-2"] = openaiClient.image("dall-e-2");
  }

  // Anthropic Provider
  if (config.anthropic?.enabled) {
    const anthropicClient = anthropic({
      apiKey: config.anthropic.apiKey,
    });

    languageModels["claude-3-5-sonnet"] = wrapLanguageModel({
      model: anthropicClient("claude-3-5-sonnet-20241022"),
      middleware: cacheMiddleware(),
    });

    languageModels["claude-3-opus"] = wrapLanguageModel({
      model: anthropicClient("claude-3-opus-20240229"),
      middleware: cacheMiddleware(),
    });

    languageModels["claude-3-haiku"] = wrapLanguageModel({
      model: anthropicClient("claude-3-haiku-20240307"),
      middleware: cacheMiddleware(),
    });
  }

  // Google Provider
  if (config.google?.enabled) {
    const googleClient = google({
      apiKey: config.google.apiKey,
    });

    languageModels["gemini-1.5-pro"] = wrapLanguageModel({
      model: googleClient("gemini-1.5-pro"),
      middleware: cacheMiddleware(),
    });

    languageModels["gemini-1.5-flash"] = wrapLanguageModel({
      model: googleClient("gemini-1.5-flash"),
      middleware: cacheMiddleware(),
    });
  }

  // DeepSeek Provider
  if (config.deepseek?.enabled) {
    const deepseekClient = deepseek({
      apiKey: config.deepseek.apiKey,
    });

    languageModels["deepseek-chat"] = wrapLanguageModel({
      model: deepseekClient("deepseek-chat"),
      middleware: cacheMiddleware(),
    });

    languageModels["deepseek-coder"] = wrapLanguageModel({
      model: deepseekClient("deepseek-coder"),
      middleware: cacheMiddleware(),
    });
  }

  // Fireworks Provider
  if (config.fireworks?.enabled) {
    const fireworksClient = fireworks({
      apiKey: config.fireworks.apiKey,
    });

    languageModels["llama-3-8b"] = wrapLanguageModel({
      model: fireworksClient("accounts/fireworks/models/llama-v3-8b-instruct"),
      middleware: cacheMiddleware(),
    });

    languageModels["mixtral-8x7b"] = wrapLanguageModel({
      model: fireworksClient("accounts/fireworks/models/mixtral-8x7b-instruct"),
      middleware: cacheMiddleware(),
    });
  }

  // Mistral Provider
  if (config.mistral?.enabled) {
    const mistralClient = mistral({
      apiKey: config.mistral.apiKey,
    });

    languageModels["mistral-large"] = wrapLanguageModel({
      model: mistralClient("mistral-large-latest"),
      middleware: cacheMiddleware(),
    });

    languageModels["mistral-medium"] = wrapLanguageModel({
      model: mistralClient("mistral-medium-latest"),
      middleware: cacheMiddleware(),
    });
  }

  // Create custom provider with all models
  return customProvider({
    languageModels,
    imageModels,
    fallbackProvider: openai, // Default fallback
  });
}

// Model capability matrix for intelligent selection
export const MODEL_CAPABILITIES = {
  "gpt-4o": {
    reasoning: true,
    vision: true,
    tools: true,
    streaming: true,
    maxContextLength: 128000,
    costTier: "high",
    speed: "medium",
  },
  "gpt-4o-mini": {
    reasoning: true,
    vision: true,
    tools: true,
    streaming: true,
    maxContextLength: 128000,
    costTier: "low",
    speed: "fast",
  },
  "claude-3-5-sonnet": {
    reasoning: true,
    vision: true,
    tools: true,
    streaming: true,
    maxContextLength: 200000,
    costTier: "high",
    speed: "medium",
  },
  "claude-3-haiku": {
    reasoning: true,
    vision: true,
    tools: true,
    streaming: true,
    maxContextLength: 200000,
    costTier: "low",
    speed: "fast",
  },
  "gemini-1.5-pro": {
    reasoning: true,
    vision: true,
    tools: true,
    streaming: true,
    maxContextLength: 1000000,
    costTier: "medium",
    speed: "medium",
  },
  "deepseek-chat": {
    reasoning: true,
    vision: false,
    tools: true,
    streaming: true,
    maxContextLength: 64000,
    costTier: "low",
    speed: "fast",
  },
} as const;

// Helper function to get optimal model for a task
export function getOptimalModel(requirements: {
  needsVision?: boolean;
  needsReasoning?: boolean;
  needsTools?: boolean;
  contextLength?: number;
  priority?: "cost" | "speed" | "quality";
}): string {
  const candidates = Object.entries(MODEL_CAPABILITIES)
    .filter(([_, capabilities]) => {
      if (requirements.needsVision && !capabilities.vision) return false;
      if (requirements.needsReasoning && !capabilities.reasoning) return false;
      if (requirements.needsTools && !capabilities.tools) return false;
      if (
        requirements.contextLength &&
        capabilities.maxContextLength < requirements.contextLength
      )
        return false;
      return true;
    })
    .sort(([, a], [, b]) => {
      switch (requirements.priority) {
        case "cost":
          const costOrder = { low: 0, medium: 1, high: 2 };
          return costOrder[a.costTier] - costOrder[b.costTier];
        case "speed":
          const speedOrder = { fast: 0, medium: 1, slow: 2 };
          return speedOrder[a.speed] - speedOrder[b.speed];
        case "quality":
        default:
          const qualityOrder = { low: 0, medium: 1, high: 2 };
          return qualityOrder[b.costTier] - qualityOrder[a.costTier]; // Reverse for quality
      }
    });

  return candidates[0]?.[0] || "gpt-4o-mini"; // Default fallback
}

// Provider health check utility
export async function checkProviderHealth(
  provider: any
): Promise<Record<string, boolean>> {
  const healthStatus: Record<string, boolean> = {};

  const testModels = ["gpt-4o-mini", "claude-3-haiku", "gemini-1.5-flash"];

  for (const modelId of testModels) {
    try {
      const model = provider.languageModel(modelId);
      if (model) {
        // Simple health check with minimal token usage
        await model.doGenerate({
          inputFormat: "prompt",
          mode: { type: "regular" },
          prompt: [{ role: "user", content: "Hi" }],
          maxTokens: 5,
        });
        healthStatus[modelId] = true;
      } else {
        healthStatus[modelId] = false;
      }
    } catch (error) {
      healthStatus[modelId] = false;
    }
  }

  return healthStatus;
}
