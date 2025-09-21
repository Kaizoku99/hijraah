/**
 * Trigger.dev v4 Task Definitions
 *
 * This module contains all Trigger.dev task definitions for data acquisition.
 */

// Import task implementations
import { governmentScrapingTasks } from "./government-scraping";
import { policyChangeDetectionTasks } from "./policy-change-detection";
import { multiCountryOrchestrationTasks } from "./multi-country-orchestration";
import { knowledgeGraphTasks } from "./knowledge-graph";
// Import new knowledge graph tasks from directory
import {
  extractEntitiesTask,
  mapRelationshipsTask,
  scoreConfidenceTask,
  resolveEntitiesTask,
  orchestrateEntityProcessingTask,
  // Temporal reasoning tasks (Task 3.2)
  analyzeTemporalDataTask,
  analyzeTemporalDataOnDemand,
  trackPolicyVersionsTask,
  trackPolicyVersionsBatch,
  comparePolicyVersions,
  predictTrendsTask,
  compareTrendsTask,
  monitorTrendsRealTime,
  validateTimelinesTask,
  validateTimelinesBatch,
  investigateTimelineDiscrepancies,
  orchestrateTemporalProcessingTask,
  scheduledTemporalProcessingTask,
  customTemporalWorkflowTask,
  // Graph traversal tasks (Task 3.3)
  traverseGraphTask,
  calculateEntityImportanceTask,
  scheduledEntityImportanceTask,
  extractSubgraphsTask,
  searchGraphTask,
  graphMaintenanceTask,
  optimizeGraphTask,
} from "./knowledge-graph/index.js";

// Import community data tasks (Task 4.1, 4.2)
import {
  collectUserExperienceTask,
  processDocumentUploadsTask,
  validateExperienceDataTask,
  sendNotificationTask,
} from "./community-data/user-experience-collection.js";

import {
  gamifyContributionsTask,
  updateUserReputationTask,
  updateLeaderboardsTask,
} from "./community-data/gamification.js";

import {
  validateCommunityDataTask,
  detectOutliersTask,
  orchestratePeerReviewTask,
  calculateReputationScoresTask,
} from "./community-data/community-validation.js";

// Import document processing tasks (Task 7.1, 7.2)
import {
  processDocumentsTask,
  performOCRTask,
  performEnhancedOCRTask,
  classifyDocumentTask,
  batchClassifyDocumentsTask,
  extractStructuredDataTask,
  batchExtractStructuredDataTask,
  // Task 7.2 - Intelligent extraction tasks
  extractFieldDataTask,
  validateExtractionTask,
  scoreAccuracyTask,
  reviewManuallyTask,
  // Task 7.2 - Quality monitoring tasks
  monitorExtractionQualityTask,
  automatedQualityAssuranceTask,
  ragQualityIntegrationTask,
} from "./document-processing/index.js";

// Import notification system tasks (Task 11.1)
import {
  // Policy change notifications
  monitorPolicyChangesTask,
  processPolicyChangeNotificationsTask,
  personalizeAndDeliverNotificationTask,
  deliverMultiChannelNotificationTask,
  // User preference management
  initializeUserPreferencesTask,
  updateUserPreferencesTask,
  optimizeUserPreferencesTask,
  implementOptimizationRecommendationsTask,
  // Multi-channel delivery
  orchestrateMultiChannelDeliveryTask,
  deliverChannelOptimizedContentTask,
  handleDeliveryFailuresTask,
  // Notification personalization
  analyzeUserContextTask,
  generatePersonalizedContentTask,
  optimizeNotificationTimingTask,
  trackPersonalizationPerformanceTask,
  updatePersonalizationModelTask,
} from "./notifications/index.js";

// Import multi-language processing tasks (Task 8)
import {
  multilingualScrapingTasks,
  translationPipelineTasks,
  crossLanguageEntityLinkingTasks,
} from "./multi-language/index.js";

// Import comprehensive immigration data scraping task
import {
  scrapeImmigrationDataTask,
  scheduledImmigrationScrapingTask,
} from "./immigration-data-scraper.js";

// Export implemented tasks
export const triggerTasks = {
  // Government website scraping tasks (Task 2.1) - IMPLEMENTED
  ...governmentScrapingTasks,

  // Policy change detection tasks (Task 2.2) - IMPLEMENTED
  ...policyChangeDetectionTasks,

  // Multi-country orchestration tasks (Task 2.3) - IMPLEMENTED
  ...multiCountryOrchestrationTasks,

  // Knowledge graph tasks (Task 3.1) - IMPLEMENTED
  ...knowledgeGraphTasks,
  // New knowledge graph tasks (Task 3.1) - IMPLEMENTED
  extractEntitiesTask,
  mapRelationshipsTask,
  scoreConfidenceTask,
  resolveEntitiesTask,
  orchestrateEntityProcessingTask,
  // Temporal reasoning tasks (Task 3.2) - IMPLEMENTED
  analyzeTemporalDataTask,
  analyzeTemporalDataOnDemand,
  trackPolicyVersionsTask,
  trackPolicyVersionsBatch,
  comparePolicyVersions,
  predictTrendsTask,
  compareTrendsTask,
  monitorTrendsRealTime,
  validateTimelinesTask,
  validateTimelinesBatch,
  investigateTimelineDiscrepancies,
  orchestrateTemporalProcessingTask,
  scheduledTemporalProcessingTask,
  customTemporalWorkflowTask,
  // Graph traversal tasks (Task 3.3) - IMPLEMENTED
  traverseGraphTask,
  calculateEntityImportanceTask,
  scheduledEntityImportanceTask,
  extractSubgraphsTask,
  searchGraphTask,
  graphMaintenanceTask,
  optimizeGraphTask,

  // Community data tasks (Task 4.1, 4.2) - IMPLEMENTED
  collectUserExperience: collectUserExperienceTask,
  processDocumentUploads: processDocumentUploadsTask,
  gamifyContributions: gamifyContributionsTask,
  validateExperienceData: validateExperienceDataTask,
  validateCommunityData: validateCommunityDataTask,
  detectOutliers: detectOutliersTask,
  orchestratePeerReview: orchestratePeerReviewTask,
  calculateReputationScores: calculateReputationScoresTask,
  updateUserReputation: updateUserReputationTask,
  updateLeaderboards: updateLeaderboardsTask,
  sendNotification: sendNotificationTask,

  // Document processing tasks (Task 7.1) - IMPLEMENTED
  processDocuments: processDocumentsTask,
  performOCR: performOCRTask,
  performEnhancedOCR: performEnhancedOCRTask,
  classifyDocument: classifyDocumentTask,
  batchClassifyDocuments: batchClassifyDocumentsTask,
  extractStructuredData: extractStructuredDataTask,
  batchExtractStructuredData: batchExtractStructuredDataTask,

  // Intelligent extraction tasks (Task 7.2) - IMPLEMENTED
  extractFieldData: extractFieldDataTask,
  validateExtraction: validateExtractionTask,
  scoreAccuracy: scoreAccuracyTask,
  reviewManually: reviewManuallyTask,

  // Quality monitoring tasks (Task 7.2) - IMPLEMENTED
  monitorExtractionQuality: monitorExtractionQualityTask,
  automatedQualityAssurance: automatedQualityAssuranceTask,
  ragQualityIntegration: ragQualityIntegrationTask,

  // Notification system tasks (Task 11.1) - IMPLEMENTED
  // Policy change notifications
  monitorPolicyChanges: monitorPolicyChangesTask,
  processPolicyChangeNotifications: processPolicyChangeNotificationsTask,
  personalizeAndDeliverNotification: personalizeAndDeliverNotificationTask,
  deliverMultiChannelNotification: deliverMultiChannelNotificationTask,
  // User preference management
  initializeUserPreferences: initializeUserPreferencesTask,
  updateUserPreferences: updateUserPreferencesTask,
  optimizeUserPreferences: optimizeUserPreferencesTask,
  implementOptimizationRecommendations:
    implementOptimizationRecommendationsTask,
  // Multi-channel delivery
  orchestrateMultiChannelDelivery: orchestrateMultiChannelDeliveryTask,
  deliverChannelOptimizedContent: deliverChannelOptimizedContentTask,
  handleDeliveryFailures: handleDeliveryFailuresTask,
  // Notification personalization
  analyzeUserContext: analyzeUserContextTask,
  generatePersonalizedContent: generatePersonalizedContentTask,
  optimizeNotificationTiming: optimizeNotificationTimingTask,
  trackPersonalizationPerformance: trackPersonalizationPerformanceTask,
  updatePersonalizationModel: updatePersonalizationModelTask,

  // Multi-language processing tasks (Task 8) - IMPLEMENTED
  ...multilingualScrapingTasks,
  ...translationPipelineTasks,
  ...crossLanguageEntityLinkingTasks,

  // Comprehensive immigration data scraping tasks - IMPLEMENTED
  scrapeImmigrationData: scrapeImmigrationDataTask,
  scheduledImmigrationScraping: scheduledImmigrationScrapingTask,

  // Community data tasks (Task 4.3) - PLACEHOLDER
  aggregateTimelineData: null,
  calculateConfidenceIntervals: null,
  performComparativeAnalysis: null,
  analyzeTrends: null,

  // ML and prediction tasks (Task 5.1, 5.2, 5.3)
  trainMLModels: null,
  extractFeatures: null,
  validateModels: null,
  retrainModels: null,
  generatePredictions: null,
  estimateTimelines: null,
  calculateCosts: null,
  assessRisks: null,
  scorePredictionConfidence: null,
  analyzeFactorImportance: null,
  generateExplanations: null,
  visualizeUncertainty: null,
} as const;

// Task metadata for documentation
export const taskMetadata = {
  totalTasks: Object.keys(triggerTasks).length,
  categories: {
    scraping: 6, // Updated to include comprehensive immigration scraper
    policyDetection: 2,
    orchestration: 1,
    knowledgeGraph: 25, // Updated to include graph traversal tasks
    communityData: 12, // Updated to include implemented tasks
    documentProcessing: 13, // Tasks 7.1, 7.2 - COMPLETED
    notifications: 16, // Task 11.1 - COMPLETED
    multiLanguage: 12, // Task 8 - COMPLETED
    machineLearning: 8, // Remaining placeholder tasks
    immigrationData: 2, // New comprehensive immigration data scraping tasks
  },
  implemented: {
    knowledgeGraph: 25, // Tasks 3.1, 3.2, 3.3 - COMPLETED
    communityData: 12, // Tasks 4.1, 4.2 - COMPLETED
    documentProcessing: 13, // Tasks 7.1, 7.2 - COMPLETED
    notifications: 16, // Task 11.1 - COMPLETED
    multiLanguage: 12, // Task 8 - COMPLETED
    scraping: 6, // Tasks 2.1, 2.2, 2.3 + immigration scraper - COMPLETED
    policyDetection: 2, // Task 2.2 - COMPLETED
    orchestration: 1, // Task 2.3 - COMPLETED
    immigrationData: 2, // Comprehensive immigration data scraping - COMPLETED
  },
  status: "Comprehensive Immigration Data Scraping System - COMPLETED",
  nextPhase: "Task 5.1 - Predictive analytics and ML models",
} as const;

console.log("📋 Trigger.dev task definitions loaded");
console.log(`🔢 Total tasks implemented: ${taskMetadata.totalTasks}`);
console.log(`✅ Current status: ${taskMetadata.status}`);
console.log(`🚀 Next implementation phase: ${taskMetadata.nextPhase}`);
