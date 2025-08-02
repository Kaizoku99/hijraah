/**
 * Knowledge Graph Tasks Index
 * 
 * Exports all Trigger.dev v4 tasks for knowledge graph construction,
 * entity processing, relationship mapping, and temporal reasoning.
 */

// Entity processing tasks (Task 3.1)
export { extractEntitiesTask } from "./extract-entities.js";
export { mapRelationshipsTask } from "./map-relationships.js";
export { scoreConfidenceTask } from "./score-confidence.js";
export { resolveEntitiesTask } from "./resolve-entities.js";

// Entity processing orchestration
export { orchestrateEntityProcessingTask } from "./orchestrate-entity-processing.js";

// Temporal reasoning tasks (Task 3.2)
export {
  analyzeTemporalDataTask,
  analyzeTemporalDataOnDemand,
} from "./analyze-temporal-data.js";

export {
  trackPolicyVersionsTask,
  trackPolicyVersionsBatch,
  comparePolicyVersions,
} from "./track-policy-versions.js";

export {
  predictTrendsTask,
  compareTrendsTask,
  monitorTrendsRealTime,
} from "./predict-trends.js";

export {
  validateTimelinesTask,
  validateTimelinesBatch,
  investigateTimelineDiscrepancies,
} from "./validate-timelines.js";

// Temporal processing orchestration
export {
  orchestrateTemporalProcessingTask,
  scheduledTemporalProcessingTask,
  customTemporalWorkflowTask,
} from "./orchestrate-temporal-processing.js";

// Graph traversal and query tasks (Task 3.3)
export { traverseGraphTask } from "./traverse-graph.js";
export { 
  calculateEntityImportanceTask,
  scheduledEntityImportanceTask 
} from "./calculate-entity-importance.js";
export { extractSubgraphsTask } from "./extract-subgraphs.js";
export { searchGraphTask } from "./search-graph.js";
export { 
  graphMaintenanceTask,
  optimizeGraphTask 
} from "./graph-maintenance.js";

// Type exports for entity processing
export type { ExtractEntitiesTask } from "./extract-entities.js";
export type { MapRelationshipsTask } from "./map-relationships.js";
export type { ScoreConfidenceTask } from "./score-confidence.js";
export type { ResolveEntitiesTask } from "./resolve-entities.js";
export type { OrchestratEntityProcessingTask } from "./orchestrate-entity-processing.js";

// Re-export types for convenience
export type {
  Entity,
  Relationship,
  DataSource,
  CollectionResult,
  PolicyChange,
} from "../../types/index.js";