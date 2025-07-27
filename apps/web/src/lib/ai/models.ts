import { anthropic } from "@ai-sdk/anthropic";
import { deepseek } from "@ai-sdk/deepseek";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import OpenAI from "openai";

import { env } from "@/_shared/config/env.mjs";

import { listFineTunedModels } from "./fine-tuning/fine-tuning-service-shared";

// Import fireworks SDK conditionally to avoid requiring it when not in use
let fireworks: any;
try {
  fireworks = require("@ai-sdk/fireworks");
} catch (error) {
  // Fireworks SDK is optional, only used for certain models
  console.warn(
    "Fireworks SDK not installed, some models will not be available",
  );
}

// Original types preserved for backward compatibility
export type AIModel =
  | "gpt-4"
  | "gemini-pro"
  | "claude-3"
  | "deepseek-chat"
  | "immigration-fine-tuned";

interface AIModelConfig {
  openaiKey?: string;
  googleKey?: string;
  anthropicKey?: string;
  deepseekKey?: string;
}

interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  stopSequences?: string[];
  stream?: boolean;
}

// Define the Model interface that will be used across the application
export interface Model {
  id: string;
  name: string;
  apiIdentifier: string;
  description: string;
  provider?: string;
  category?: string; // New field for fine-tuned model category
  isFineTuned?: boolean; // Flag to identify fine-tuned models
}

// Chat models available for conversation
export const models: Array<Model> = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    apiIdentifier: "gpt-4o",
    description:
      "Most powerful model for complex tasks with multimodal capabilities",
    provider: "openai",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    apiIdentifier: "gpt-4o-mini",
    description: "Balanced model for most tasks, more affordable",
    provider: "openai",
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    apiIdentifier: "gpt-3.5-turbo",
    description: "Fast and cost-effective for simpler tasks",
    provider: "openai",
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    apiIdentifier: "claude-3-opus",
    description: "Anthropic's most powerful model for complex reasoning",
    provider: "anthropic",
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    apiIdentifier: "claude-3-sonnet",
    description: "Balanced performance and cost for most tasks",
    provider: "anthropic",
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    apiIdentifier: "gemini-pro",
    description: "Google's advanced large language model",
    provider: "google",
  },
];

// Reasoning models specifically for deep research and complex analysis
export const reasoningModels: Array<Model> = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    apiIdentifier: "gpt-4-turbo",
    description: "Optimized for deep research and step-by-step reasoning",
    provider: "openai",
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    apiIdentifier: "claude-3-opus",
    description: "Excellent for detailed research analysis with citations",
    provider: "anthropic",
  },
  {
    id: "deepseek-coder",
    name: "DeepSeek Coder",
    apiIdentifier: "deepseek-coder",
    description: "Specialized for code analysis and reasoning",
    provider: "fireworks",
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    apiIdentifier: "gemini-pro",
    description: "Google's model with strong reasoning capabilities",
    provider: "google",
  },
];

// New category for immigration-specific fine-tuned models
export const fineTunedModels: Array<Model> = [];

// Function to load fine-tuned models from the database
export async function loadFineTunedModels() {
  try {
    const dbModels = await listFineTunedModels();

    // Reset the array
    fineTunedModels.length = 0;

    // Add all fine-tuned models to the array
    dbModels.forEach((model) => {
      if (model.fine_tuned_model) {
        fineTunedModels.push({
          id: model.fine_tuned_model,
          name: `Immigration (${model.category || "General"})`,
          apiIdentifier: model.fine_tuned_model,
          description: `Fine-tuned model for ${model.category || "general"} immigration assistance`,
          provider: "openai",
          category: model.category || "general",
          isFineTuned: true,
        });
      }
    });

    // Also update the custom provider
    updateCustomProviderWithFineTunedModels();

    return fineTunedModels;
  } catch (error) {
    console.error("Error loading fine-tuned models:", error);
    return [];
  }
}

// Function to update the custom provider with fine-tuned models
function updateCustomProviderWithFineTunedModels() {
  // Create a new provider with updated models
  // This approach avoids direct modification of the provider properties
  fineTunedModels.forEach((model) => {
    // Add the model using the correct API
    // @ts-ignore - We need to dynamically register models
    customAIProvider.languageModel(model.id, openai(model.apiIdentifier));
  });
}

// Get all available models including fine-tuned ones
export function getAllAvailableModels(): Model[] {
  return [...models, ...fineTunedModels];
}

// Default models to use if none specified
export const DEFAULT_MODEL_NAME = "gpt-4o-mini";
export const DEFAULT_REASONING_MODEL_NAME = "gpt-4-turbo";

// Custom model provider setup that works with Vercel AI SDK
export const customAIProvider = customProvider({
  languageModels: {
    "gpt-4o": openai("gpt-4o"),
    "gpt-4o-mini": openai("gpt-4o-mini"),
    "gpt-3.5-turbo": openai("gpt-3.5-turbo"),
    "gpt-4-turbo": wrapLanguageModel({
      model: openai("gpt-4-turbo"),
      middleware: extractReasoningMiddleware({ tagName: "reasoning" }),
    }),
    "claude-3-opus": anthropic("claude-3-opus"),
    "claude-3-sonnet": anthropic("claude-3-sonnet"),
    "gemini-pro": google("gemini-pro"),
    "deepseek-coder": fireworks
      ? fireworks("accounts/fireworks/models/deepseek-coder")
      : null,
    // Fine-tuned models will be added dynamically
  },
  imageModels: {
    "dall-e-3": openai.image("dall-e-3"),
    "dall-e-2": openai.image("dall-e-2"),
  },
});

// Helper function for custom model configuration
export function customModel(
  modelIdentifier: string,
  isReasoning: boolean = false,
) {
  // If reasoning is enabled and no specific reasoning model is provided,
  // use the default reasoning model
  if (isReasoning) {
    // If the model is already a reasoning model, use it directly
    const isAlreadyReasoningModel = reasoningModels.some(
      (model) => model.id === modelIdentifier,
    );
    if (isAlreadyReasoningModel) {
      return modelIdentifier;
    }

    // Otherwise, use the default reasoning model for the provider
    const requestedModel = [...models, ...reasoningModels].find(
      (model) => model.id === modelIdentifier,
    );
    const provider = requestedModel?.provider || "openai";

    // Select appropriate reasoning model based on provider
    if (provider === "anthropic") {
      return "claude-3-opus";
    } else if (provider === "google") {
      return "gemini-pro";
    } else if (provider === "fireworks") {
      return "deepseek-coder";
    }

    // Default to OpenAI's reasoning model
    return DEFAULT_REASONING_MODEL_NAME;
  }

  return modelIdentifier;
}

// Function to save the selected model in cookies
export async function saveModelIdInCookie(model: string) {
  if (typeof document !== "undefined") {
    document.cookie = `model-id=${model};path=/;max-age=31536000`;
  }
}

// Function to save the selected reasoning model in cookies
export async function saveReasoningModelIdInCookie(model: string) {
  if (typeof document !== "undefined") {
    document.cookie = `reasoning-model-id=${model};path=/;max-age=31536000`;
  }
}

// Updated getModelById to include fine-tuned models
export function getModelById(modelId: string): Model | undefined {
  // Check standard models
  const standardModel = models.find((m) => m.id === modelId);
  if (standardModel) return standardModel;

  // Check reasoning models
  const reasoningModel = reasoningModels.find((m) => m.id === modelId);
  if (reasoningModel) return reasoningModel;

  // Check fine-tuned models
  const fineTunedModel = fineTunedModels.find((m) => m.id === modelId);
  if (fineTunedModel) return fineTunedModel;

  return undefined;
}

// For backward compatibility with older api
export class AIModelManager {
  private modelConfig: AIModelConfig;

  constructor(modelConfig: AIModelConfig = {}) {
    this.modelConfig = modelConfig;
  }

  // Legacy method for backward compatibility
  async generateText(prompt: string, options: GenerateOptions = {}) {
    try {
      // Use OpenAI API directly for backward compatibility
      const openaiClient = new OpenAI({
        apiKey: this.modelConfig.openaiKey || env.OPENAI_API_KEY,
      });

      const response = await openaiClient.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1000,
        stream: false,
      });

      return response.choices[0]?.message?.content || "";
    } catch (error) {
      console.error("Error generating text:", error);
      throw error;
    }
  }
}
