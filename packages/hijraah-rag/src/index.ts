// Main exports for @hijraah/rag package
export * from "./types.js";
export * from "./factory.js";

// Export classes and functions from modules (not types, as they're in types.js)
export { HybridRetriever } from "./retrieval/hybrid-retriever.js";
export { ImageRetriever } from "./retrieval/image-retriever.js";
export { createRetriever, CompositeRetriever } from "./retrieval/factory.js";

export { DocumentProcessor } from "./ingestion/document-processor.js";
export { UrlDiscovery, type DiscoveredUrl } from "./ingestion/url-discovery.js";

export { ContextAwareGenerator } from "./generation/context-generator.js";

export {
  KnowledgeGraphBuilder,
  type Entity,
  type Relationship,
} from "./knowledge-graph/builder.js";

export {
  QueryHistoryAnalyzer,
  type HistoricalInterest,
} from "./personalization/history-analyzer.js";
export {
  PreferenceLearner,
  type PreferenceWeight,
} from "./personalization/preference-learner.js";

export {
  evaluateSourceConfidence,
  evaluateSource,
  evaluateSources,
  rankSources,
  type SourceInfo,
} from "./sources/source-evaluator.js";
