// Main exports for @hijraah/ai package
export { EnhancedModelMultiplexer } from "./multiplexer.js";
export type {
  ModelConfig,
  MultiplexerOptions,
  GenerationRequest,
} from "./multiplexer.js";

export {
  createHijraahProviderRegistry,
  getOptimalModel,
  checkProviderHealth,
  MODEL_CAPABILITIES,
} from "./providers.js";
export type { ProviderConfig } from "./providers.js";

export {
  cacheMiddleware,
  rateLimitMiddleware,
  monitoringMiddleware,
  errorHandlingMiddleware,
  createStandardMiddleware,
} from "./middleware.js";

// Re-export commonly used AI SDK types
export type {
  CoreMessage,
  GenerateTextResult,
  StreamTextResult,
  LanguageModelV1Middleware,
} from "ai";

// Utility function to create a configured multiplexer instance
export function createHijraahAI(options: {
  redis?: any;
  fallbackStrategy?: "cost" | "speed" | "quality";
  enableCaching?: boolean;
  enableMonitoring?: boolean;
}) {
  const {
    redis,
    fallbackStrategy = "quality",
    enableCaching = true,
    enableMonitoring = true,
  } = options;

  return new EnhancedModelMultiplexer({
    redis,
    fallbackStrategy,
    maxRetries: 3,
    enableCaching,
  });
}
