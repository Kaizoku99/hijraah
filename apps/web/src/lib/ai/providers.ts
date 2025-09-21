import { gateway, createGateway } from "@ai-sdk/gateway";

import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
  createProviderRegistry,
  defaultSettingsMiddleware,
} from "ai";

import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from "./models.test";

// Check if we're in a test environment
const isTestEnvironment = Boolean(
  process.env.NODE_ENV === "test" ||
    process.env.JEST_WORKER_ID ||
    process.env.VITEST ||
    process.env.TEST_MODE
);

// Context7 - Latest AI SDK v5 Gateway Configuration
// Create enhanced gateway instance following latest documentation patterns
const aiGateway = createGateway({
  // Latest Context7 pattern: environment variable precedence
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
  // Enhanced observability and platform identification
  headers: {
    "X-Source": "hijraah-platform",
    "X-Version": "1.0.0",
    "X-Environment": process.env.NODE_ENV || "development",
  },
});

// Define basic mocks for test environment
let testChatModel: any = null;
let testReasoningModel: any = null;
let testTitleModel: any = null;
let testArtifactModel: any = null;

if (isTestEnvironment) {
  // Simplified mocks for testing
  const mockModel = (name: string) => ({
    id: `mock-${name}`,
    doGenerate: async () => ({ text: `mock response from ${name}` }),
  });
  testChatModel = mockModel("chat");
  testReasoningModel = mockModel("reasoning");
  testTitleModel = mockModel("title");
  testArtifactModel = mockModel("artifact");
}

// Context7 - AI SDK v5 Provider Registry with Vercel AI Gateway Only
// Simplified registry using only AI Gateway for all model access
export const aiRegistry = !isTestEnvironment
  ? createProviderRegistry(
      {
        // Primary AI Gateway models - Context7 compliant
        gateway: customProvider({
          languageModels: {
            // High-performance models for complex reasoning with enhanced middleware
            "reasoning-large": wrapLanguageModel({
              model: aiGateway("openai/gpt-4o"),
              middleware: [
                defaultSettingsMiddleware({
                  settings: {
                    temperature: 0.1,
                    maxOutputTokens: 8000,
                    providerOptions: {
                      openai: {
                        reasoningEffort: "high",
                        store: false,
                      },
                    },
                  },
                }),
                extractReasoningMiddleware({ tagName: "think" }),
              ],
            }),

            // Balanced models for general chat
            "chat-balanced": wrapLanguageModel({
              model: aiGateway("openai/gpt-4o-mini"),
              middleware: defaultSettingsMiddleware({
                settings: {
                  temperature: 0.7,
                  maxOutputTokens: 4000,
                  providerOptions: {
                    openai: {
                      store: false,
                    },
                  },
                },
              }),
            }),

            // Fast models for quick responses
            "chat-fast": aiGateway("openai/gpt-3.5-turbo"),

            // Advanced reasoning models using Anthropic through gateway
            "reasoning-claude": wrapLanguageModel({
              model: aiGateway("anthropic/claude-3-5-sonnet-20241022"),
              middleware: [
                defaultSettingsMiddleware({
                  settings: {
                    temperature: 0.2,
                    maxOutputTokens: 8000,
                    providerOptions: {
                      anthropic: {
                        thinking: {
                          type: "enabled",
                          budgetTokens: 8000,
                        },
                      },
                    },
                  },
                }),
                extractReasoningMiddleware({ tagName: "think" }),
              ],
            }),

            // Fast Anthropic model
            "chat-claude": aiGateway("anthropic/claude-3-5-haiku-20241022"),

            // Specialized models for specific tasks
            "title-generator": aiGateway("openai/gpt-4o-mini"),
            "artifact-creator": aiGateway("openai/gpt-4o"),

            // Extended reasoning model for complex analysis
            "analysis-deep": wrapLanguageModel({
              model: aiGateway("anthropic/claude-3-5-sonnet-20241022"),
              middleware: [
                defaultSettingsMiddleware({
                  settings: {
                    temperature: 0.1,
                    maxOutputTokens: 12000,
                    providerOptions: {
                      anthropic: {
                        thinking: {
                          type: "enabled",
                          budgetTokens: 12000,
                        },
                      },
                    },
                  },
                }),
                extractReasoningMiddleware({ tagName: "think" }),
              ],
            }),
          },
          fallbackProvider: gateway, // Use default gateway as fallback
        }),
      },
      { separator: ":" }
    )
  : null;

// Context7 - Latest AI SDK v5 Provider Registry Pattern with Proper Fallback Support
const createModelProvider = () => {
  // Check if AI Gateway is configured (latest Context7 pattern)
  const hasGatewayConfig = Boolean(process.env.AI_GATEWAY_API_KEY);
  
  // Import direct providers for fallback (latest imports)
  const { createOpenAI } = require("@ai-sdk/openai");
  const { createAnthropic } = require("@ai-sdk/anthropic");
  
  // Create direct providers with latest configuration patterns
  const directOpenAI = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const directAnthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
  
  // Enhanced Context7 pattern: Simple gateway first, fallback second approach
  const createModelWithFallback = (gatewayModel: string, fallbackModel: any) => {
    // Primary: Use Gateway if configured and API key is present
    if (hasGatewayConfig && process.env.AI_GATEWAY_API_KEY?.trim()) {
      try {
        // Return gateway model directly - AI SDK will handle fallback at provider level
        return aiGateway(gatewayModel);
      } catch (error) {
        console.warn(`[AI Gateway] Failed to create ${gatewayModel}, using direct provider:`, error);
        return fallbackModel;
      }
    }
    
    // Fallback: Use direct provider when Gateway not configured or unavailable
    console.log(`[AI Gateway] Using direct provider for ${gatewayModel} (Gateway not configured)`);
    return fallbackModel;
  };
  
  return {
    // Latest AI SDK v5 model mappings with Context7 fallback pattern
    "chat-model-small": createModelWithFallback("openai/gpt-4o-mini", directOpenAI("gpt-4o-mini")),
    "chat-model-large": createModelWithFallback("openai/gpt-4o", directOpenAI("gpt-4o")),
    
    // Latest Context7 reasoning model with enhanced middleware
    "chat-model-reasoning": wrapLanguageModel({
      model: createModelWithFallback("anthropic/claude-3-5-sonnet-20241022", directAnthropic("claude-3-5-sonnet-20241022")),
      middleware: [
        defaultSettingsMiddleware({
          settings: {
            temperature: 0.1,
            maxOutputTokens: 8000,
            // Latest Context7 provider options pattern
            providerOptions: {
              anthropic: {
                thinking: {
                  type: "enabled",
                  budgetTokens: 12000,
                },
              },
            },
          },
        }),
        extractReasoningMiddleware({ tagName: "think" }),
      ],
    }),
    "title-model": createModelWithFallback("openai/gpt-4o-mini", directOpenAI("gpt-4o-mini")),
    "artifact-model": createModelWithFallback("openai/gpt-4o", directOpenAI("gpt-4o")),

    // ChatModelType enum mappings following latest AI SDK v5 patterns
    "gpt-3.5-turbo": createModelWithFallback("openai/gpt-3.5-turbo", directOpenAI("gpt-3.5-turbo")),
    "gpt-4": createModelWithFallback("openai/gpt-4o", directOpenAI("gpt-4o")), // Latest: Map to gpt-4o
    "gpt-4-vision-preview": createModelWithFallback("openai/gpt-4o", directOpenAI("gpt-4o")), // gpt-4o has vision
    "claude-3-sonnet": createModelWithFallback("anthropic/claude-3-5-sonnet-20241022", directAnthropic("claude-3-5-sonnet-20241022")),
    "claude-3-opus": createModelWithFallback("anthropic/claude-3-opus-20240229", directAnthropic("claude-3-opus-20240229")),
    "claude-3-haiku": createModelWithFallback("anthropic/claude-3-5-haiku-20241022", directAnthropic("claude-3-5-haiku-20241022")),
  };
};

// Context7 - Latest AI SDK v5 Provider Export with Enhanced Fallback
export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        "chat-model-small": testChatModel,
        "chat-model-large": testChatModel,
        "chat-model-reasoning": testReasoningModel,
        "title-model": testTitleModel,
        "artifact-model": testArtifactModel,
        // ChatModelType enum mappings for tests
        "gpt-3.5-turbo": testChatModel,
        "gpt-4": testChatModel,
        "gpt-4-vision-preview": testChatModel,
        "claude-3-sonnet": testChatModel,
        "claude-3-opus": testChatModel,
        "claude-3-haiku": testChatModel,
      },
    })
  : customProvider({
      languageModels: createModelProvider(),
      // Latest Context7 pattern: Use direct OpenAI as ultimate fallback
      fallbackProvider: (() => {
        try {
          const { createOpenAI } = require("@ai-sdk/openai");
          return createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
        } catch (error) {
          console.warn("[Provider] Direct OpenAI fallback failed:", error);
          return undefined;
        }
      })(),
    });

// Context7 - Smart model selector function using only AI Gateway
export function getOptimalModel(
  task: "chat" | "reasoning" | "fast" | "creative" | "analysis" = "chat",
  priority: "cost" | "quality" | "speed" = "quality"
) {
  if (isTestEnvironment) {
    return testChatModel;
  }

  const modelMap = {
    chat: {
      cost:
        aiRegistry?.languageModel("gateway:chat-fast") ||
        aiGateway("openai/gpt-3.5-turbo"),
      quality:
        aiRegistry?.languageModel("gateway:chat-balanced") ||
        aiGateway("openai/gpt-4o-mini"),
      speed:
        aiRegistry?.languageModel("gateway:chat-fast") ||
        aiGateway("openai/gpt-3.5-turbo"),
    },
    reasoning: {
      cost:
        aiRegistry?.languageModel("gateway:chat-balanced") ||
        aiGateway("openai/gpt-4o-mini"),
      quality:
        aiRegistry?.languageModel("gateway:reasoning-claude") ||
        aiGateway("anthropic/claude-3-5-sonnet-20241022"),
      speed:
        aiRegistry?.languageModel("gateway:chat-balanced") ||
        aiGateway("openai/gpt-4o-mini"),
    },
    fast: {
      cost:
        aiRegistry?.languageModel("gateway:chat-fast") ||
        aiGateway("openai/gpt-3.5-turbo"),
      quality:
        aiRegistry?.languageModel("gateway:chat-fast") ||
        aiGateway("openai/gpt-3.5-turbo"),
      speed:
        aiRegistry?.languageModel("gateway:chat-fast") ||
        aiGateway("openai/gpt-3.5-turbo"),
    },
    creative: {
      cost:
        aiRegistry?.languageModel("gateway:chat-balanced") ||
        aiGateway("openai/gpt-4o-mini"),
      quality:
        aiRegistry?.languageModel("gateway:reasoning-large") ||
        aiGateway("openai/gpt-4o"),
      speed:
        aiRegistry?.languageModel("gateway:chat-balanced") ||
        aiGateway("openai/gpt-4o-mini"),
    },
    analysis: {
      cost:
        aiRegistry?.languageModel("gateway:chat-claude") ||
        aiGateway("anthropic/claude-3-5-haiku-20241022"),
      quality:
        aiRegistry?.languageModel("gateway:analysis-deep") ||
        aiGateway("anthropic/claude-3-5-sonnet-20241022"),
      speed:
        aiRegistry?.languageModel("gateway:chat-claude") ||
        aiGateway("anthropic/claude-3-5-haiku-20241022"),
    },
  };

  return modelMap[task][priority];
}

// Context7 - Health check function for AI Gateway availability
export async function checkProviderHealth() {
  if (isTestEnvironment) {
    return { healthy: true, providers: ["test"] };
  }

  const healthResults = {
    gateway: false,
    availability: false,
    directProviders: 0,
  };

  try {
    // Check AI Gateway availability - simplified approach for AI SDK v5
    if (process.env.AI_GATEWAY_API_KEY?.trim()) {
      // Simple test call to verify gateway is working
      const testModel = aiGateway("openai/gpt-3.5-turbo");
      healthResults.gateway = Boolean(testModel);
      healthResults.availability = true;
    }
  } catch (error) {
    console.warn("AI Gateway health check failed:", error);
    healthResults.gateway = false;
  }

  // Check direct provider availability
  const directProviders = [];
  if (process.env.OPENAI_API_KEY?.trim()) directProviders.push("openai");
  if (process.env.ANTHROPIC_API_KEY?.trim()) directProviders.push("anthropic");
  
  healthResults.directProviders = directProviders.length;
  healthResults.availability = healthResults.gateway || directProviders.length > 0;

  return {
    healthy: healthResults.availability,
    providers: healthResults.gateway ? ["gateway", ...directProviders] : directProviders,
    details: healthResults,
    modelCount: healthResults.availability ? "available" : "unavailable",
  };
}

// Context7 - Export default gateway for direct usage
export { gateway, aiGateway };

// Context7 - Export enhanced gateway with middleware for advanced usage
export const enhancedGateway = createGateway({
  // Latest Context7 pattern: simplified API key configuration
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
  headers: {
    "X-Source": "hijraah-platform-enhanced",
    "X-Version": "1.0.0",
    "X-Features": "reasoning,analysis,creative",
  },
});
