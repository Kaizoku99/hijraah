import { z } from "zod";
import { logger } from "@/lib/logger";
import { trackEvent } from "@/lib/monitoring";
import { aiRegistry, myProvider, getOptimalModel, checkProviderHealth } from "./providers";

// Legacy AI Configuration - maintained for backward compatibility
const LegacyAIConfig = {
  models: {
    deepseek: {
      modelName: "deepseek-coder-33b-instruct",
      temperature: 0.7,
      maxTokens: 2048,
      topP: 0.95,
      frequencyPenalty: 0,
      presencePenalty: 0,
    },
    gpt4: {
      modelName: "gpt-4-turbo-preview",
      temperature: 0.7,
      maxTokens: 4096,
      topP: 0.95,
      frequencyPenalty: 0,
      presencePenalty: 0,
    },
  },
  rag: {
    chunkSize: 1000,
    chunkOverlap: 200,
    embeddingModel: "text-embedding-3-large",
    retrievalTopK: 5,
    maxDistance: 0.8,
    minRelevanceScore: 0.7,
  },
  chat: {
    maxHistoryLength: 10,
    maxResponseTokens: 1000,
    streamingEnabled: true,
    defaultSystemPrompt: "You are a helpful immigration assistant.",
  },
};

// AI SDK v5 - Enhanced model configuration types
export interface AIModelConfig {
  provider: 'gateway' | 'openai' | 'anthropic' | 'fallback';
  modelId: string;
  settings?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
  };
  capabilities?: {
    streaming?: boolean;
    functions?: boolean;
    vision?: boolean;
    reasoning?: boolean;
  };
  pricing?: {
    inputTokens: number;
    outputTokens: number;
    currency: 'USD';
  };
}

// Context7 - Model registry with enhanced metadata
export const ModelRegistry: Record<string, AIModelConfig> = {
  // High-performance reasoning models
  "reasoning-large": {
    provider: 'gateway',
    modelId: 'gateway:reasoning-large',
    settings: { temperature: 0.1, maxTokens: 8000 },
    capabilities: { streaming: true, functions: true, reasoning: true },
    pricing: { inputTokens: 0.005, outputTokens: 0.015, currency: 'USD' }
  },
  
  // Balanced chat models
  "chat-balanced": {
    provider: 'gateway',
    modelId: 'gateway:chat-balanced',
    settings: { temperature: 0.7, maxTokens: 4000 },
    capabilities: { streaming: true, functions: true, vision: true },
    pricing: { inputTokens: 0.00015, outputTokens: 0.0006, currency: 'USD' }
  },
  
  // Fast response models
  "chat-fast": {
    provider: 'gateway',
    modelId: 'gateway:chat-fast',
    settings: { temperature: 0.8, maxTokens: 2000 },
    capabilities: { streaming: true, functions: true },
    pricing: { inputTokens: 0.0005, outputTokens: 0.0015, currency: 'USD' }
  },
  
  // Claude reasoning models
  "reasoning-claude": {
    provider: 'gateway',
    modelId: 'gateway:reasoning-claude',
    settings: { temperature: 0.2, maxTokens: 8000 },
    capabilities: { streaming: true, functions: true, reasoning: true },
    pricing: { inputTokens: 0.003, outputTokens: 0.015, currency: 'USD' }
  }
};

// Context7 - Intelligent model selection based on task characteristics
export function selectModelForTask(
  taskType: 'chat' | 'reasoning' | 'creative' | 'analysis' | 'coding' | 'translation',
  constraints: {
    priority?: 'speed' | 'quality' | 'cost';
    maxTokens?: number;
    requiresReasoning?: boolean;
    requiresVision?: boolean;
  } = {}
): string {
  const { priority = 'quality', maxTokens = 4000, requiresReasoning = false, requiresVision = false } = constraints;
  
  // Context7 - Task-based model mapping with intelligent fallbacks
  const taskModelMap = {
    chat: requiresVision 
      ? 'chat-balanced' 
      : priority === 'speed' 
        ? 'chat-fast' 
        : 'chat-balanced',
    
    reasoning: requiresReasoning 
      ? 'reasoning-claude' 
      : priority === 'cost' 
        ? 'chat-balanced' 
        : 'reasoning-large',
    
    creative: priority === 'speed' 
      ? 'chat-fast' 
      : 'reasoning-large',
    
    analysis: 'reasoning-claude',
    
    coding: priority === 'speed' 
      ? 'chat-balanced' 
      : 'reasoning-large',
    
    translation: 'chat-balanced'
  };
  
  const selectedModel = taskModelMap[taskType];
  
  // Context7 - Observability: Log model selection
  try {
    logger.info('Model selected', {
      taskType,
      selectedModel,
      priority,
      maxTokens,
      requiresReasoning,
      requiresVision
    });
    
    // Context7 - Analytics: Track model usage patterns
    trackEvent({
      name: 'ai_model_selected',
      properties: {
        taskType,
        selectedModel,
        priority,
        constraints
      }
    });
  } catch (error) {
    // Silent fallback if logging/tracking fails
    console.warn('Failed to log model selection:', error);
  }
  
  return selectedModel;
}

// AI SDK v5 - Enhanced model instance retrieval with fallbacks
export function getModelInstance(modelId: string) {
  try {
    // Try to get from advanced registry first
    if (aiRegistry && !modelId.includes(':')) {
      return aiRegistry.languageModel(`gateway:${modelId}`);
    }
    
    if (aiRegistry && modelId.includes(':')) {
      return aiRegistry.languageModel(modelId);
    }
    
    // Fallback to legacy provider
    return myProvider.languageModel(modelId);
  } catch (error) {
    try {
      logger.error('Failed to get model instance', error as Error, { modelId });
    } catch {
      console.error('Failed to get model instance:', error, 'modelId:', modelId);
    }
    
    // Context7 - Graceful degradation: Return optimal fallback model
    return getOptimalModel('chat', 'cost');
  }
}

// Context7 - Model performance monitoring
export async function getModelPerformanceMetrics() {
  try {
    const healthCheck = await checkProviderHealth();
    
    return {
      timestamp: new Date().toISOString(),
      providerHealth: healthCheck,
      availableModels: Object.keys(ModelRegistry),
      registry: {
        available: aiRegistry !== null,
        modelCount: aiRegistry ? Object.keys(ModelRegistry).length : 0
      }
    };
  } catch (error) {
    try {
      logger.error('Failed to get model performance metrics', error as Error);
    } catch {
      console.error('Failed to get model performance metrics:', error);
    }
    return null;
  }
}

// AI SDK v5 - Enhanced usage tracking with Context7 observability
export function trackModelUsage(
  modelId: string,
  usage: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    processingTime: number;
    success: boolean;
    error?: string;
  }
) {
  try {
    const modelConfig = ModelRegistry[modelId];
    const cost = modelConfig ? 
      (usage.inputTokens * modelConfig.pricing.inputTokens + 
       usage.outputTokens * modelConfig.pricing.outputTokens) / 1000 : 0;
    
    // Context7 - Comprehensive usage analytics
    trackEvent({
      name: 'ai_model_usage',
      properties: {
        modelId,
        provider: modelConfig?.provider || 'unknown',
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
        processingTime: usage.processingTime,
        estimatedCost: cost,
        success: usage.success,
        error: usage.error
      }
    });
    
    // Context7 - Structured logging for observability
    logger.info('Model usage tracked', {
      modelId,
      usage,
      estimatedCost: cost,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    // Silent fallback if tracking fails
    console.warn('Failed to track model usage:', error);
  }
}

// Enhanced AI Configuration with Context7 and AI Gateway integration
export const AIConfig = {
  // Legacy configuration for backward compatibility
  ...LegacyAIConfig,
  
  // New AI Gateway configuration
  registry: ModelRegistry,
  selectModel: selectModelForTask,
  getInstance: getModelInstance,
  getMetrics: getModelPerformanceMetrics,
  trackUsage: trackModelUsage,
  providers: {
    primary: aiRegistry,
    fallback: myProvider,
    health: checkProviderHealth
  }
} as const;

export const DocumentSchema = z.object({
  id: z.string(),
  content: z.string(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  embedding: z.array(z.number()).optional(),
});

export type Document = z.infer<typeof DocumentSchema>;

export const ChatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["system", "user", "assistant"]),
  content: z.string(),
  timestamp: z.date(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
