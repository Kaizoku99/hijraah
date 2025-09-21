/**
 * AI utilities and providers for Hijraah
 */

import {
  generateText,
  streamText,
  LanguageModel,
  ModelMessage,
  CoreTool,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { mistral } from "@ai-sdk/mistral";
import { fireworks } from "@ai-sdk/fireworks";
import { deepseek } from "@ai-sdk/deepseek";

// Export types and interfaces
export interface AIConfig {
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIMultiplexerConfig {
  openaiApiKey?: string;
  anthropicApiKey?: string;
  googleApiKey?: string;
  mistralApiKey?: string;
  fireworksApiKey?: string;
  deepseekApiKey?: string;
  redisUrl?: string;
  redisToken?: string;
}

// Create AI provider instance
export const createHijraahAI = (config: AIConfig) => {
  return {
    config,
    generateText: async (prompt: string, options?: Partial<AIConfig>) => {
      const model = openai(config.model || "gpt-4o-mini", {
        apiKey: config.apiKey,
      });

      return await generateText({
        model,
        prompt,
        temperature: options?.temperature || config.temperature || 0.1,
        maxOutputTokens: options?.maxTokens || config.maxTokens || 2000,
      });
    },
  };
};

// AI Multiplexer for multiple providers
export const createAIMultiplexer = (config: AIMultiplexerConfig) => {
  const providers = [];

  if (config.openaiApiKey) {
    providers.push({
      name: "openai",
      model: openai("gpt-4o-mini", { apiKey: config.openaiApiKey }),
    });
  }

  if (config.anthropicApiKey) {
    providers.push({
      name: "anthropic",
      model: anthropic("claude-3-haiku", { apiKey: config.anthropicApiKey }),
    });
  }

  if (config.googleApiKey) {
    providers.push({
      name: "google",
      model: google("models/gemini-pro", { apiKey: config.googleApiKey }),
    });
  }

  if (config.mistralApiKey) {
    providers.push({
      name: "mistral",
      model: mistral("mistral-large-latest", { apiKey: config.mistralApiKey }),
    });
  }

  return {
    providers,
    generateText: async (options: {
      prompt: string;
      model?: string;
      temperature?: number;
      maxTokens?: number;
    }) => {
      // Use the first available provider or specified model
      let selectedProvider = providers[0];

      if (options.model) {
        selectedProvider =
          providers.find((p) => p.name === options.model) || selectedProvider;
      }

      if (!selectedProvider) {
        throw new Error("No AI provider available");
      }

      const result = await generateText({
        model: selectedProvider.model,
        prompt: options.prompt,
        temperature: options.temperature || 0.1,
        maxOutputTokens: options.maxTokens || 2000,
      });

      return {
        text: result.text,
        provider: selectedProvider.name,
        usage: result.usage,
      };
    },
  };
};

export type AIProvider = ReturnType<typeof createHijraahAI>;
export type AIMultiplexer = ReturnType<typeof createAIMultiplexer>;
