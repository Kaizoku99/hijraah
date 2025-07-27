/**
 * Hijraah Data Acquisition Package
 *
 * Comprehensive data acquisition and competitive differentiation system
 * Built with Trigger.dev v4, Supabase, and AI SDK integration
 */

// Export core interfaces
export * from "./interfaces/index.js";

// Export types and schemas
export * from "./types/index.js";

// Export base classes
export { BaseWebScraper } from "./base/WebScraper.js";
export { BaseAPIClient } from "./base/APIClient.js";

// Export trigger tasks (will be implemented in subsequent tasks)
export * from "./trigger/index.js";

// Package metadata
export const packageInfo = {
  name: "@hijraah/data-acquisition",
  version: "0.1.0",
  description:
    "Data acquisition and competitive differentiation system for Hijraah",
  features: [
    "Government website scraping with Firecrawl integration",
    "Policy change detection and monitoring",
    "Knowledge graph construction",
    "Community data validation",
    "Predictive analytics and ML models",
    "Trigger.dev v4 task orchestration",
    "Supabase integration",
    "AI SDK integration",
  ],
  dependencies: {
    "trigger.dev": "^4.0.0-beta",
    supabase: "^2.39.0",
    "drizzle-orm": "^0.29.0",
    ai: "^3.0.0",
    "firecrawl-mcp": "^1.0.0",
    zod: "^3.22.0",
  },
} as const;

// Utility functions
export const createDataAcquisitionConfig = (options: {
  supabaseUrl: string;
  supabaseKey: string;
  firecrawlApiKey: string;
  openaiApiKey: string;
}) => {
  return {
    ...options,
    defaultBatchConfig: {
      batchSize: 10,
      concurrency: 5,
      retryAttempts: 3,
      retryDelay: 1000,
      timeout: 30000,
    },
    rateLimits: {
      global: 1000,
      perSource: 100,
    },
    retryConfig: {
      maxAttempts: 3,
      backoffFactor: 2,
      maxDelay: 10000,
    },
  };
};

// Version and build info
export const buildInfo = {
  version: "0.1.0",
  buildDate: new Date().toISOString(),
  triggerDevVersion: "4.0.0-beta",
  nodeVersion: process.version,
} as const;
