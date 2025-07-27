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

// TODO: Fix middleware exports for AI SDK v5
// export {
//   cacheMiddleware,
//   rateLimitMiddleware,
//   monitoringMiddleware,
//   errorHandlingMiddleware,
//   createStandardMiddleware,
// } from "./middleware.js";

// Re-export commonly used AI SDK types
export type { ModelMessage, GenerateTextResult, StreamTextResult } from "ai";

// Import the class at the top
import { EnhancedModelMultiplexer as MultiplexerClass } from "./multiplexer.js";

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

  return new MultiplexerClass({
    redis,
    fallbackStrategy,
    maxRetries: 3,
    enableCaching,
  });
}
