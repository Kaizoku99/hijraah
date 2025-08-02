// Core exports
export * from './agents'
export * from './orchestrators'
export * from './teams'
export * from './tools'
export * from './types'
export * from './utils'
export * from './monitoring'

// Main orchestrator for easy access
export { ImmigrationOrchestrator } from './orchestrators/immigration-orchestrator'

// Agent teams
export { DocumentProcessingTeam } from './teams/document-processing-team'
export { PolicyComplianceTeam } from './teams/policy-compliance-team'
export { CaseDecisionTeam } from './teams/case-decision-team'

// Multi-modal document processing agents
export { 
  DocumentClassificationAgent,
  OCRProcessingAgent,
  ContentExtractionAgent,
  QualityValidationAgent,
  TranslationAgent,
  MultiModalDocumentTeam
} from './agents/document-processing'

// Common tools
export { createImmigrationTool } from './tools/immigration-tool-factory'
export { documentAnalysisTool } from './tools/document-analysis-tool'
export { policyQueryTool } from './tools/policy-query-tool'

// Monitoring components
export { agentPerformanceMonitor } from './monitoring/agent-performance-monitor'
export { tokenUsageAnalytics } from './monitoring/token-usage-analytics'
export { agentSuccessMetrics } from './monitoring/agent-success-metrics'
export { agentDebuggingInterface } from './monitoring/agent-debugging-interface'
export { abTestingFramework } from './monitoring/ab-testing-framework'
export { monitoringDashboard } from './monitoring/monitoring-dashboard'