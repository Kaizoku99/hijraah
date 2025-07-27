// Main exports for @hijraah/documents package
export { EnhancedDocumentProcessor } from "./processor.js";
export type {
  Document,
  ProcessingOptions,
  ProcessingResult,
  ProcessorConfig,
} from "./processor.js";

// Factory function for easy instantiation
export function createHijraahDocumentProcessor(config: ProcessorConfig) {
  return new EnhancedDocumentProcessor(config);
}
