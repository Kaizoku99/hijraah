import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { deepseek } from "@ai-sdk/deepseek";
import { fireworks } from "@ai-sdk/fireworks";
import { mistral } from "@ai-sdk/mistral";
import {
  customProvider,
  generateText,
  streamText,
  LanguageModelV1Middleware,
  type GenerateTextResult,
  type StreamTextResult,
  type CoreMessage,
} from "ai";
import { Redis } from "@upstash/redis";
import { z } from "zod";

// Types for model configuration and management
export interface ModelConfig {
  id: string;
  provider: string;
  priority: number;
  costPer1MTokens: number;
  rateLimit: {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
  capabilities: {
    reasoning: boolean;
    vision: boolean;
    tools: boolean;
    streaming: boolean;
  };
  maxTokens: number;
  contextWindow: number;
}

export interface MultiplexerOptions {
  redis?: Redis;
  fallbackStrategy: "cost" | "speed" | "quality";
  maxRetries: number;
  enableCaching: boolean;
  costThreshold?: number;
}

export interface GenerationRequest {
  messages: CoreMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  tools?: any;
  userId?: string;
  priority?: "low" | "medium" | "high";
}

// Enhanced AI Model Multiplexer with Context7 patterns
export class EnhancedModelMultiplexer {
  private redis?: Redis;
  private modelConfigs: Map<string, ModelConfig> = new Map();
  private rateLimitCache: Map<string, { count: number; window: number }> =
    new Map();
  private options: MultiplexerOptions;
  private provider;

  constructor(options: MultiplexerOptions) {
    this.options = options;
    this.redis = options.redis;
    this.initializeModelConfigs();
    this.provider = this.createUnifiedProvider();
  }

  private initializeModelConfigs() {
    // OpenAI Models
    this.addModelConfig({
      id: "gpt-4o",
      provider: "openai",
      priority: 10,
      costPer1MTokens: 15.0,
      rateLimit: { requestsPerMinute: 100, tokensPerMinute: 150000 },
      capabilities: {
        reasoning: true,
        vision: true,
        tools: true,
        streaming: true,
      },
      maxTokens: 4096,
      contextWindow: 128000,
    });

    this.addModelConfig({
      id: "gpt-4o-mini",
      provider: "openai",
      priority: 8,
      costPer1MTokens: 0.6,
      rateLimit: { requestsPerMinute: 200, tokensPerMinute: 200000 },
      capabilities: {
        reasoning: true,
        vision: true,
        tools: true,
        streaming: true,
      },
      maxTokens: 4096,
      contextWindow: 128000,
    });

    // Anthropic Models
    this.addModelConfig({
      id: "claude-3-5-sonnet",
      provider: "anthropic",
      priority: 9,
      costPer1MTokens: 15.0,
      rateLimit: { requestsPerMinute: 40, tokensPerMinute: 80000 },
      capabilities: {
        reasoning: true,
        vision: true,
        tools: true,
        streaming: true,
      },
      maxTokens: 8192,
      contextWindow: 200000,
    });

    this.addModelConfig({
      id: "claude-3-haiku",
      provider: "anthropic",
      priority: 7,
      costPer1MTokens: 1.25,
      rateLimit: { requestsPerMinute: 60, tokensPerMinute: 100000 },
      capabilities: {
        reasoning: true,
        vision: true,
        tools: true,
        streaming: true,
      },
      maxTokens: 4096,
      contextWindow: 200000,
    });

    // Google Models
    this.addModelConfig({
      id: "gemini-1.5-pro",
      provider: "google",
      priority: 6,
      costPer1MTokens: 7.0,
      rateLimit: { requestsPerMinute: 60, tokensPerMinute: 120000 },
      capabilities: {
        reasoning: true,
        vision: true,
        tools: true,
        streaming: true,
      },
      maxTokens: 8192,
      contextWindow: 1000000,
    });

    // DeepSeek Models
    this.addModelConfig({
      id: "deepseek-chat",
      provider: "deepseek",
      priority: 5,
      costPer1MTokens: 0.27,
      rateLimit: { requestsPerMinute: 100, tokensPerMinute: 200000 },
      capabilities: {
        reasoning: true,
        vision: false,
        tools: true,
        streaming: true,
      },
      maxTokens: 4096,
      contextWindow: 64000,
    });

    // Mistral Models
    this.addModelConfig({
      id: "mistral-large",
      provider: "mistral",
      priority: 4,
      costPer1MTokens: 8.0,
      rateLimit: { requestsPerMinute: 50, tokensPerMinute: 100000 },
      capabilities: {
        reasoning: true,
        vision: false,
        tools: true,
        streaming: true,
      },
      maxTokens: 4096,
      contextWindow: 128000,
    });
  }

  private addModelConfig(config: ModelConfig) {
    this.modelConfigs.set(config.id, config);
  }

  private createUnifiedProvider() {
    const languageModels: Record<string, any> = {};

    // Populate language models from configurations
    for (const [modelId, config] of this.modelConfigs) {
      switch (config.provider) {
        case "openai":
          languageModels[modelId] = openai(modelId);
          break;
        case "anthropic":
          languageModels[modelId] = anthropic(modelId);
          break;
        case "google":
          languageModels[modelId] = google(modelId);
          break;
        case "deepseek":
          languageModels[modelId] = deepseek(modelId);
          break;
        case "fireworks":
          languageModels[modelId] = fireworks(modelId);
          break;
        case "mistral":
          languageModels[modelId] = mistral(modelId);
          break;
      }
    }

    return customProvider({
      languageModels,
      fallbackProvider: openai, // Default fallback
    });
  }

  // Intelligent model selection based on request requirements
  private async selectModel(request: GenerationRequest): Promise<string> {
    const requestedModel = request.model || "gpt-4o-mini";

    // If specific model is requested and available, check its availability
    if (this.modelConfigs.has(requestedModel)) {
      const isAvailable = await this.checkModelAvailability(
        requestedModel,
        request.userId
      );
      if (isAvailable) {
        return requestedModel;
      }
    }

    // Intelligent fallback selection
    const candidates = Array.from(this.modelConfigs.values())
      .filter((config) => {
        // Filter by capabilities if needed
        if (request.tools && !config.capabilities.tools) return false;
        if (request.stream && !config.capabilities.streaming) return false;
        return true;
      })
      .sort((a, b) => {
        // Sort by strategy
        switch (this.options.fallbackStrategy) {
          case "cost":
            return a.costPer1MTokens - b.costPer1MTokens;
          case "speed":
            return (
              b.rateLimit.requestsPerMinute - a.rateLimit.requestsPerMinute
            );
          case "quality":
          default:
            return b.priority - a.priority;
        }
      });

    // Find first available model
    for (const candidate of candidates) {
      const isAvailable = await this.checkModelAvailability(
        candidate.id,
        request.userId
      );
      if (isAvailable) {
        return candidate.id;
      }
    }

    // Final fallback
    return "gpt-4o-mini";
  }

  private async checkModelAvailability(
    modelId: string,
    userId?: string
  ): Promise<boolean> {
    const config = this.modelConfigs.get(modelId);
    if (!config) return false;

    // Check rate limits
    const rateLimitKey = `rate_limit:${modelId}:${userId || "global"}`;

    if (this.redis) {
      const currentCount = (await this.redis.get(rateLimitKey)) || 0;
      if (currentCount >= config.rateLimit.requestsPerMinute) {
        return false;
      }
    } else {
      // Use in-memory cache for rate limiting
      const cacheKey = `${modelId}:${userId || "global"}`;
      const cached = this.rateLimitCache.get(cacheKey);
      const now = Date.now();

      if (
        cached &&
        cached.window > now &&
        cached.count >= config.rateLimit.requestsPerMinute
      ) {
        return false;
      }
    }

    return true;
  }

  private async updateRateLimit(modelId: string, userId?: string) {
    const rateLimitKey = `rate_limit:${modelId}:${userId || "global"}`;

    if (this.redis) {
      await this.redis.incr(rateLimitKey);
      await this.redis.expire(rateLimitKey, 60); // 1 minute window
    } else {
      // Update in-memory cache
      const cacheKey = `${modelId}:${userId || "global"}`;
      const now = Date.now();
      const windowEnd = now + 60000; // 1 minute

      const cached = this.rateLimitCache.get(cacheKey);
      if (cached && cached.window > now) {
        cached.count++;
      } else {
        this.rateLimitCache.set(cacheKey, { count: 1, window: windowEnd });
      }
    }
  }

  // Enhanced generateText with automatic failover
  async generateText(
    request: GenerationRequest
  ): Promise<GenerateTextResult<any>> {
    const selectedModel = await this.selectModel(request);
    let lastError: Error | null = null;

    // Track usage
    await this.updateRateLimit(selectedModel, request.userId);

    for (let attempt = 0; attempt < this.options.maxRetries; attempt++) {
      try {
        const model = this.provider.languageModel(selectedModel);

        const result = await generateText({
          model,
          messages: request.messages,
          temperature: request.temperature,
          maxTokens: request.maxTokens,
          tools: request.tools,
        });

        // Log successful generation
        await this.logUsage(selectedModel, result.usage, request.userId);

        return result;
      } catch (error) {
        lastError = error as Error;
        console.warn(
          `Model ${selectedModel} failed on attempt ${attempt + 1}:`,
          error
        );

        // Try fallback model
        if (attempt < this.options.maxRetries - 1) {
          const fallbackModel = await this.selectFallbackModel(
            selectedModel,
            request
          );
          if (fallbackModel !== selectedModel) {
            // Update rate limit for fallback model
            await this.updateRateLimit(fallbackModel, request.userId);
            continue;
          }
        }
      }
    }

    throw lastError || new Error("All models failed");
  }

  // Enhanced streamText with automatic failover
  async streamText(request: GenerationRequest): Promise<StreamTextResult<any>> {
    const selectedModel = await this.selectModel(request);

    // Track usage
    await this.updateRateLimit(selectedModel, request.userId);

    try {
      const model = this.provider.languageModel(selectedModel);

      const result = await streamText({
        model,
        messages: request.messages,
        temperature: request.temperature,
        maxTokens: request.maxTokens,
        tools: request.tools,
        onFinish: async ({ usage }) => {
          // Log usage when streaming completes
          await this.logUsage(selectedModel, usage, request.userId);
        },
      });

      return result;
    } catch (error) {
      console.error(`Streaming failed for model ${selectedModel}:`, error);

      // Try fallback for streaming
      const fallbackModel = await this.selectFallbackModel(
        selectedModel,
        request
      );
      if (fallbackModel !== selectedModel) {
        const model = this.provider.languageModel(fallbackModel);
        await this.updateRateLimit(fallbackModel, request.userId);

        return streamText({
          model,
          messages: request.messages,
          temperature: request.temperature,
          maxTokens: request.maxTokens,
          tools: request.tools,
          onFinish: async ({ usage }) => {
            await this.logUsage(fallbackModel, usage, request.userId);
          },
        });
      }

      throw error;
    }
  }

  private async selectFallbackModel(
    failedModel: string,
    request: GenerationRequest
  ): Promise<string> {
    // Select a different model based on the same criteria
    const alternatives = Array.from(this.modelConfigs.values())
      .filter((config) => config.id !== failedModel)
      .sort((a, b) => b.priority - a.priority);

    for (const alternative of alternatives) {
      const isAvailable = await this.checkModelAvailability(
        alternative.id,
        request.userId
      );
      if (isAvailable) {
        return alternative.id;
      }
    }

    return failedModel; // Return original if no alternatives
  }

  private async logUsage(modelId: string, usage: any, userId?: string) {
    if (!this.redis) return;

    const usageKey = `usage:${modelId}:${new Date().toISOString().slice(0, 10)}`;
    const userUsageKey = userId
      ? `usage:user:${userId}:${new Date().toISOString().slice(0, 10)}`
      : null;

    const usageData = {
      promptTokens: usage?.promptTokens || 0,
      completionTokens: usage?.completionTokens || 0,
      totalTokens: usage?.totalTokens || 0,
      timestamp: Date.now(),
    };

    // Log model usage
    await this.redis.lpush(usageKey, JSON.stringify(usageData));
    await this.redis.expire(usageKey, 86400 * 7); // Keep for 7 days

    // Log user usage
    if (userUsageKey) {
      await this.redis.lpush(userUsageKey, JSON.stringify(usageData));
      await this.redis.expire(userUsageKey, 86400 * 7);
    }
  }

  // Get usage statistics
  async getUsageStats(
    modelId?: string,
    userId?: string,
    days: number = 7
  ): Promise<any> {
    if (!this.redis) return null;

    const stats: any = {};
    const now = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date(now.getTime() - i * 86400000)
        .toISOString()
        .slice(0, 10);
      const key = modelId
        ? `usage:${modelId}:${date}`
        : userId
          ? `usage:user:${userId}:${date}`
          : `usage:*:${date}`;

      const usageEntries = await this.redis.lrange(key, 0, -1);
      const dayStats = usageEntries.reduce(
        (acc, entry) => {
          const data = JSON.parse(entry);
          acc.promptTokens += data.promptTokens;
          acc.completionTokens += data.completionTokens;
          acc.totalTokens += data.totalTokens;
          acc.requests += 1;
          return acc;
        },
        { promptTokens: 0, completionTokens: 0, totalTokens: 0, requests: 0 }
      );

      stats[date] = dayStats;
    }

    return stats;
  }

  // Get available models with their current status
  getAvailableModels(): ModelConfig[] {
    return Array.from(this.modelConfigs.values());
  }

  // Health check for all models
  async healthCheck(): Promise<Record<string, boolean>> {
    const health: Record<string, boolean> = {};

    for (const [modelId] of this.modelConfigs) {
      try {
        const isAvailable = await this.checkModelAvailability(modelId);
        health[modelId] = isAvailable;
      } catch (error) {
        health[modelId] = false;
      }
    }

    return health;
  }
}
