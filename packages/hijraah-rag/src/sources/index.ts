// Sources module exports
export {
  evaluateSourceConfidence,
  evaluateSource,
  evaluateSources,
  rankSources,
  type SourceInfo,
} from "./source-evaluator.js";

// Re-export source-related types
export type { SourceEvaluation, EvaluationCriteria } from "../types.js";
