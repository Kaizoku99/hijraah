"use client";

import { useState, useEffect, useMemo } from "react";
import { useI18n } from "@/i18n/hooks";
import { ChatModelType } from "@/core/chat/entities/chat";
import { getOptimalModel, checkProviderHealth } from "@/lib/ai/providers";
import { 
  checkAllModelsAvailability, 
  recommendModel, 
  getModelConfig 
} from "@/lib/ai/model-provider";

export interface ModelOption {
  value: string;
  label: string;
  description?: string;
  provider: 'openai' | 'anthropic' | 'gateway';
  tier: 'fast' | 'balanced' | 'advanced';
  contextWindow: number;
  features: string[];
  isAvailable: boolean;
}

/**
 * Context7 - Advanced model management hook with automatic selection
 * Integrates with AI providers and provides intelligent model selection
 * Now supports background automatic model switching based on context
 */
export function useModelManager(initialModel?: string) {
  const { t } = useI18n();
  const [selectedModel, setSelectedModel] = useState<string>(
    initialModel || "gateway:chat-balanced" // Default to balanced model
  );
  const [providerHealth, setProviderHealth] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Context7 - Enhanced model definitions with modern registry integration
  const availableModels = useMemo((): ModelOption[] => {
    // Always provide models with fallback availability
    const baseModels = [
      {
        value: "gateway:reasoning-large",
        label: t("chat.models.gpt4o") || "GPT-4o (Reasoning)",
        description: "Advanced reasoning with enhanced thinking capabilities",
        provider: 'gateway' as const,
        tier: 'advanced' as const,
        contextWindow: 128000,
        features: ['reasoning', 'thinking', 'analysis', 'complex'],
        isAvailable: true // Always available as it has fallbacks
      },
      {
        value: "gateway:chat-balanced",
        label: t("chat.models.gpt4omini") || "GPT-4o Mini",
        description: "Balanced performance for general conversations",
        provider: 'gateway' as const,
        tier: 'balanced' as const,
        contextWindow: 128000,
        features: ['chat', 'general', 'balanced'],
        isAvailable: true
      },
      {
        value: "gateway:chat-fast",
        label: t("chat.models.gpt35turbo") || "GPT-3.5 Turbo",
        description: "Fast responses for quick queries",
        provider: 'gateway' as const,
        tier: 'fast' as const,
        contextWindow: 16385,
        features: ['fast', 'chat', 'quick'],
        isAvailable: true
      },
      {
        value: "gateway:reasoning-claude",
        label: t("chat.models.claude35sonnet") || "Claude 3.5 Sonnet",
        description: "Advanced reasoning with thinking capabilities",
        provider: 'gateway' as const,
        tier: 'advanced' as const,
        contextWindow: 200000,
        features: ['reasoning', 'thinking', 'analysis', 'creative'],
        isAvailable: true
      },
      {
        value: "gateway:chat-claude",
        label: t("chat.models.claude35haiku") || "Claude 3.5 Haiku",
        description: "Fast and efficient for general queries",
        provider: 'gateway' as const,
        tier: 'fast' as const,
        contextWindow: 200000,
        features: ['fast', 'chat', 'concise'],
        isAvailable: true
      }
    ];

    // Filter based on provider health, but keep at least one model available
    const healthFilteredModels = baseModels.map(model => ({
      ...model,
      isAvailable: model.isAvailable && (
        providerHealth.gateway !== false || 
        providerHealth.openai !== false ||
        providerHealth.anthropic !== false
      )
    }));

    // Ensure at least one model is available
    const availableCount = healthFilteredModels.filter(m => m.isAvailable).length;
    if (availableCount === 0) {
      // Force the first model to be available as a fallback
      healthFilteredModels[0].isAvailable = true;
    }

    return healthFilteredModels;
  }, [t, providerHealth]);

  // Context7 - Simplified and more resilient health check
  useEffect(() => {
    const checkHealth = async () => {
      setIsLoading(true);
      try {
        // Set default health status
        const defaultHealth = {
          openai: true,
          anthropic: true,
          gateway: true
        };

        // Try to check provider health, but don't fail if it doesn't work
        try {
          const [providerHealthResult, modelAvailability] = await Promise.all([
            checkProviderHealth(),
            checkAllModelsAvailability()
          ]);
          
          // Combine provider health with model-specific availability
          const combinedHealth = {
            openai: Boolean(providerHealthResult.details?.openai || (
              modelAvailability[ChatModelType.GPT_4] || 
              modelAvailability[ChatModelType.GPT_3_5]
            )),
            anthropic: Boolean(providerHealthResult.details?.anthropic || (
              modelAvailability[ChatModelType.CLAUDE_3_OPUS] ||
              modelAvailability[ChatModelType.CLAUDE_3_SONNET] ||
              modelAvailability[ChatModelType.CLAUDE_3_HAIKU]
            )),
            gateway: Boolean(providerHealthResult.details?.gateway || providerHealthResult.healthy)
          };
          
          setProviderHealth(combinedHealth);
        } catch (healthError) {
          console.warn('Provider health check failed, using defaults:', healthError);
          // Fall back to assuming all providers are available
          setProviderHealth(defaultHealth);
        }
      } catch (error) {
        console.error('Failed to check provider health:', error);
        // Assume all providers are available if health check fails completely
        setProviderHealth({
          openai: true,
          anthropic: true,
          gateway: true
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkHealth();
    // Check health every 5 minutes
    const interval = setInterval(checkHealth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Context7 - Smart model selection based on context and availability
  const suggestOptimalModel = (
    chatContext?: string,
    priority: 'cost' | 'quality' | 'speed' = 'quality'
  ): string => {
    try {
      // Context-based model recommendations using modern registry models
      const contextRecommendations: Record<string, string> = {
        visa: "gateway:reasoning-claude", // Complex requirements analysis
        documents: "gateway:reasoning-large", // Good for document understanding
        eligibility: "gateway:reasoning-claude", // Logical reasoning
        legal: "gateway:reasoning-claude", // Complex legal analysis
        timeline: "gateway:reasoning-large", // Planning and organization
        family: "gateway:chat-balanced", // Balanced for family matters
        work: "gateway:reasoning-large", // Employment visa complexity
        study: "gateway:chat-balanced", // Educational pathways
        business: "gateway:reasoning-claude", // Complex business requirements
        general: "gateway:chat-balanced", // Default balanced choice
      };

      let recommended = contextRecommendations[chatContext || 'general'];

      // Adjust based on priority
      if (priority === 'speed') {
        recommended = "gateway:chat-fast"; // Fastest option
      } else if (priority === 'cost') {
        recommended = "gateway:chat-claude"; // Most economical
      }

      return recommended || "gateway:chat-balanced";
    } catch (error) {
      console.error('Failed to get optimal model:', error);
      return "gateway:chat-balanced"; // Fallback
    }
  };

  // Context7 - Model change handler with validation
  const handleModelChange = (modelValue: string) => {
    const model = availableModels.find(m => m.value === modelValue);
    if (model && model.isAvailable) {
      setSelectedModel(modelValue);
    } else {
      console.warn(`Model ${modelValue} is not available, keeping current selection`);
    }
  };

  // Context7 - Get current model info
  const currentModel = useMemo(() => {
    return availableModels.find(m => m.value === selectedModel) || availableModels[0];
  }, [selectedModel, availableModels]);

  // Context7 - Return all models (availability is built into the model definitions)
  const availableModelsOnly = useMemo(() => {
    return availableModels; // Don't filter here, let the UI handle availability display
  }, [availableModels]);

  return {
    selectedModel,
    setSelectedModel: handleModelChange,
    availableModels: availableModelsOnly,
    currentModel,
    suggestOptimalModel,
    providerHealth,
    isLoading
  };
}
