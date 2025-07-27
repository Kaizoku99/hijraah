// Ingestion module exports
export { DocumentProcessor } from "./document-processor.js";
export { UrlDiscovery, type DiscoveredUrl } from "./url-discovery.js";

// Re-export ingestion-related types
export type {
  IngestionJob,
  IngestionOptions,
  IngestionResult,
} from "../types.js";
