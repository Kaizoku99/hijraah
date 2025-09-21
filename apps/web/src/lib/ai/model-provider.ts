"use client";

import { myProvider, getOptimalModel } from "@/lib/ai/providers";
import { ChatModelType } from "@/core/chat/entities/chat";

/**
 * Context7 - Smart model provider integration
 * Bridges the gap between our UI components and AI providers
 */

export interface ModelProviderConfig {
  modelType: ChatModelType;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  contextWindow?: number;
  features?: string[];
}

/**
 * Context7 - Get the actual language model instance from providers
 */
export function getLanguageModel(modelType: ChatModelType, config?: Partial<ModelProviderConfig>) {
  try {
    // Map ChatModelType to provider model
    const providerModel = myProvider.languageModel(modelType);
    
    if (!providerModel) {
      console.warn(`Model ${modelType} not found, falling back to default`);
      return myProvider.languageModel(ChatModelType.GPT_4);
    }
    
    return providerModel;
  } catch (error) {
    console.error(`Failed to get language model ${modelType}:`, error);
    // Return fallback model
    return myProvider.languageModel(ChatModelType.GPT_4);
  }
}

/**
 * Context7 - Smart model configuration based on chat context
 */
export function getModelConfig(
  chatContext: string,
  modelType: ChatModelType
): ModelProviderConfig {
  const baseConfig: ModelProviderConfig = {
    modelType,
    temperature: 0.7,
    maxTokens: 4000,
    contextWindow: getContextWindow(modelType),
    features: getModelFeatures(modelType),
  };

  // Context-specific configurations
  const contextConfigs: Record<string, Partial<ModelProviderConfig>> = {
    visa: {
      temperature: 0.3, // More precise for visa requirements
      systemPrompt: "You are a visa specialist. Provide accurate, step-by-step guidance on visa applications, requirements, and procedures.",
    },
    documents: {
      temperature: 0.2, // Very precise for document requirements
      systemPrompt: "You are a document verification expert. Help users understand document requirements, formats, and procedures.",
    },
    eligibility: {
      temperature: 0.1, // Most precise for eligibility assessments
      systemPrompt: "You are an immigration eligibility expert. Analyze user situations carefully to determine program eligibility.",
    },
    legal: {
      temperature: 0.2,
      maxTokens: 6000, // More detailed legal explanations
      systemPrompt: "You are an immigration law expert. Provide accurate legal information while recommending professional consultation.",
    },
    creative: {
      temperature: 0.8,
      systemPrompt: "You are a creative immigration consultant helping users explore innovative pathways.",
    },
  };

  const contextConfig = contextConfigs[chatContext] || {};
  
  return {
    ...baseConfig,
    ...contextConfig,
  };
}

/**
 * Context7 - Get model context window size
 */
function getContextWindow(modelType: ChatModelType): number {
  const contextWindows: Record<ChatModelType, number> = {
    [ChatModelType.GPT_4]: 128000,
    [ChatModelType.GPT_3_5]: 16385,
    [ChatModelType.GPT_4_VISION]: 128000,
    [ChatModelType.CLAUDE_3_OPUS]: 200000,
    [ChatModelType.CLAUDE_3_SONNET]: 200000,
    [ChatModelType.CLAUDE_3_HAIKU]: 200000,
  };

  return contextWindows[modelType] || 4000;
}

/**
 * Context7 - Get model capabilities
 */
function getModelFeatures(modelType: ChatModelType): string[] {
  const features: Record<ChatModelType, string[]> = {
    [ChatModelType.GPT_4]: ['vision', 'reasoning', 'code', 'analysis', 'multimodal'],
    [ChatModelType.GPT_3_5]: ['chat', 'general', 'fast'],
    [ChatModelType.GPT_4_VISION]: ['vision', 'image-analysis', 'multimodal'],
    [ChatModelType.CLAUDE_3_OPUS]: ['analysis', 'creative', 'reasoning', 'thinking', 'complex'],
    [ChatModelType.CLAUDE_3_SONNET]: ['balanced', 'reasoning', 'analysis', 'coding'],
    [ChatModelType.CLAUDE_3_HAIKU]: ['fast', 'chat', 'concise', 'quick'],
  };

  return features[modelType] || ['general'];
}

/**
 * Context7 - Model health and availability checker
 */
export async function checkModelAvailability(modelType: ChatModelType): Promise<boolean> {
  try {
    const model = getLanguageModel(modelType);
    // Simple availability check - in production, you might want to make a test request
    return model !== null;
  } catch (error) {
    console.error(`Model ${modelType} availability check failed:`, error);
    return false;
  }
}

/**
 * Context7 - Batch check all model availability
 */
export async function checkAllModelsAvailability(): Promise<Record<ChatModelType, boolean>> {
  const models = Object.values(ChatModelType);
  const results: Record<ChatModelType, boolean> = {} as Record<ChatModelType, boolean>;

  await Promise.all(
    models.map(async (model) => {
      results[model] = await checkModelAvailability(model);
    })
  );

  return results;
}

/**
 * Context7 - Smart model recommendation engine
 */
export function recommendModel(
  chatContext: string,
  userPreferences?: {
    priority?: 'speed' | 'quality' | 'cost';
    features?: string[];
    maxTokens?: number;
  }
): ChatModelType {
  const priority = userPreferences?.priority || 'quality';

  // Context-based model recommendations
  const contextRecommendations: Record<string, ChatModelType> = {
    visa: ChatModelType.CLAUDE_3_OPUS, // Complex requirements analysis
    documents: ChatModelType.GPT_4, // Good for document understanding
    eligibility: ChatModelType.CLAUDE_3_SONNET, // Logical reasoning
    legal: ChatModelType.CLAUDE_3_OPUS, // Complex legal analysis
    timeline: ChatModelType.GPT_4, // Planning and organization
    family: ChatModelType.CLAUDE_3_SONNET, // Balanced for family matters
    work: ChatModelType.GPT_4, // Employment visa complexity
    study: ChatModelType.CLAUDE_3_SONNET, // Educational pathways
    business: ChatModelType.CLAUDE_3_OPUS, // Complex business requirements
    general: ChatModelType.GPT_4, // Default balanced choice
  };

  let recommended = contextRecommendations[chatContext] || ChatModelType.GPT_4;

  // Adjust based on priority
  if (priority === 'speed') {
    recommended = ChatModelType.GPT_3_5; // Fastest option
  } else if (priority === 'cost') {
    recommended = ChatModelType.CLAUDE_3_HAIKU; // Most economical
  }

  return recommended;
}
