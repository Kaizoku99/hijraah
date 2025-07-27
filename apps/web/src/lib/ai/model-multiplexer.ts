import OpenAI from "openai";
import { Redis } from "@upstash/redis";

interface ModelConfig {
  client: OpenAI;
  priority: number;
  name: string;
  rateLimit: {
    requests: number;
    window: number; // in seconds
  };
}

interface CompletionRequest {
  model: string;
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}

export class ModelMultiplexer {
  private primaryModels: ModelConfig[] = [];
  private fallbackModels: ModelConfig[] = [];
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_URL!,
      token: process.env.UPSTASH_REDIS_TOKEN!,
    });

    this.initializeModels();
  }

  private initializeModels() {
    // Primary models (high quality, immigration expertise)
    if (process.env.ANTHROPIC_API_KEY) {
      this.primaryModels.push({
        client: new OpenAI({
          apiKey: process.env.ANTHROPIC_API_KEY,
          baseURL: "https://api.anthropic.com/v1/",
        }),
        priority: 5,
        name: "claude-3-5-sonnet-20241022",
        rateLimit: { requests: 40, window: 60 },
      });
    }

    if (process.env.OPENAI_API_KEY) {
      this.primaryModels.push({
        client: new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
          baseURL: "https://api.openai.com/v1",
        }),
        priority: 4,
        name: "gpt-4o",
        rateLimit: { requests: 100, window: 60 },
      });
    }

    if (process.env.GEMINI_API_KEY) {
      this.primaryModels.push({
        client: new OpenAI({
          apiKey: process.env.GEMINI_API_KEY,
          baseURL: "https://generativelanguage.googleapis.com/v1beta/",
        }),
        priority: 3,
        name: "gemini-1.5-pro",
        rateLimit: { requests: 60, window: 60 },
      });
    }

    // Fallback models (cost-effective, high availability)
    if (process.env.OPENAI_API_KEY) {
      this.fallbackModels.push({
        client: new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
          baseURL: "https://api.openai.com/v1",
        }),
        priority: 5,
        name: "gpt-4o-mini",
        rateLimit: { requests: 200, window: 60 },
      });
    }

    if (process.env.GEMINI_API_KEY) {
      this.fallbackModels.push({
        client: new OpenAI({
          apiKey: process.env.GEMINI_API_KEY,
          baseURL: "https://generativelanguage.googleapis.com/v1beta/",
        }),
        priority: 4,
        name: "gemini-1.5-flash",
        rateLimit: { requests: 100, window: 60 },
      });
    }

    if (process.env.ANTHROPIC_API_KEY) {
      this.fallbackModels.push({
        client: new OpenAI({
          apiKey: process.env.ANTHROPIC_API_KEY,
          baseURL: "https://api.anthropic.com/v1/",
        }),
        priority: 3,
        name: "claude-3-haiku-20240307",
        rateLimit: { requests: 60, window: 60 },
      });
    }

    // Sort by priority (highest first)
    this.primaryModels.sort((a, b) => b.priority - a.priority);
    this.fallbackModels.sort((a, b) => b.priority - a.priority);
  }

  private async checkRateLimit(modelName: string): Promise<boolean> {
    try {
      const key = `rate_limit:${modelName}`;
      const current = await this.redis.get(key);

      if (current === null) {
        await this.redis.setex(key, 60, 1);
        return true;
      }

      const model = [...this.primaryModels, ...this.fallbackModels].find(
        (m) => m.name === modelName
      );

      if (!model) return false;

      if (Number(current) >= model.rateLimit.requests) {
        return false;
      }

      await this.redis.incr(key);
      return true;
    } catch (error) {
      console.warn("Rate limit check failed, allowing request:", error);
      return true;
    }
  }

  private async tryModelCompletion(
    model: ModelConfig,
    request: CompletionRequest
  ): Promise<any> {
    try {
      // Check rate limit
      const withinLimit = await this.checkRateLimit(model.name);
      if (!withinLimit) {
        throw new Error(`Rate limit exceeded for ${model.name}`);
      }

      // Map model names to provider-specific names
      const providerModel = this.mapModelName(request.model, model.name);

      const completion = await model.client.chat.completions.create({
        model: providerModel,
        messages: request.messages,
        max_tokens: request.max_tokens,
        temperature: request.temperature,
        stream: request.stream,
      });

      return {
        ...completion,
        model: model.name, // Return our standard model name
        hijraah_provider: this.getProviderName(model.name),
      };
    } catch (error) {
      console.error(`Model ${model.name} failed:`, error);
      throw error;
    }
  }

  private mapModelName(requestedModel: string, providerModel: string): string {
    // Map generic model names to provider-specific names
    const modelMap: Record<string, Record<string, string>> = {
      "gpt-4o": {
        "gpt-4o": "gpt-4o",
        "gpt-4o-mini": "gpt-4o-mini",
      },
      "claude-3-5-sonnet": {
        "claude-3-5-sonnet-20241022": "claude-3-5-sonnet-20241022",
        "claude-3-haiku-20240307": "claude-3-haiku-20240307",
      },
      "gemini-pro": {
        "gemini-1.5-pro": "gemini-1.5-pro-latest",
        "gemini-1.5-flash": "gemini-1.5-flash-latest",
      },
    };

    // If direct mapping exists, use it
    if (modelMap[requestedModel]?.[providerModel]) {
      return modelMap[requestedModel][providerModel];
    }

    // Otherwise return the provider model as-is
    return providerModel;
  }

  private getProviderName(modelName: string): string {
    if (modelName.includes("gpt")) return "openai";
    if (modelName.includes("claude")) return "anthropic";
    if (modelName.includes("gemini")) return "google";
    return "unknown";
  }

  async createChatCompletion(request: CompletionRequest): Promise<any> {
    const allModels = [...this.primaryModels, ...this.fallbackModels];
    const errors: Error[] = [];

    // Try primary models first
    for (const model of this.primaryModels) {
      try {
        const result = await this.tryModelCompletion(model, request);
        console.log(`✅ Success with primary model: ${model.name}`);
        return result;
      } catch (error) {
        console.warn(`❌ Primary model ${model.name} failed:`, error);
        errors.push(error as Error);
      }
    }

    console.log("🔄 All primary models failed, trying fallbacks...");

    // Try fallback models
    for (const model of this.fallbackModels) {
      try {
        const result = await this.tryModelCompletion(model, request);
        console.log(`✅ Success with fallback model: ${model.name}`);
        return result;
      } catch (error) {
        console.warn(`❌ Fallback model ${model.name} failed:`, error);
        errors.push(error as Error);
      }
    }

    // All models failed
    const errorMessage = `All models failed: ${errors.map((e) => e.message).join(", ")}`;
    console.error("💥 Complete failure:", errorMessage);

    throw new Error(errorMessage);
  }

  async getModelStatus(): Promise<{
    primary: Array<{ name: string; available: boolean; priority: number }>;
    fallback: Array<{ name: string; available: boolean; priority: number }>;
  }> {
    const checkModelAvailability = async (model: ModelConfig) => {
      const available = await this.checkRateLimit(model.name);
      return {
        name: model.name,
        available,
        priority: model.priority,
      };
    };

    const [primaryStatus, fallbackStatus] = await Promise.all([
      Promise.all(this.primaryModels.map(checkModelAvailability)),
      Promise.all(this.fallbackModels.map(checkModelAvailability)),
    ]);

    return {
      primary: primaryStatus,
      fallback: fallbackStatus,
    };
  }
}

export default ModelMultiplexer;
