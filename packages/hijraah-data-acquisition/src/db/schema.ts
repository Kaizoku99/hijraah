/**
 * Drizzle ORM Schema for Hijraah Data Acquisition
 *
 * Database schema definitions for data acquisition, policy tracking,
 * knowledge graph, and community validation systems.
 */

import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  real,
  jsonb,
  uuid,
  varchar,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Data Sources table
export const dataSources = pgTable(
  "data_sources",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    type: varchar("type", { length: 50 }).notNull(), // government, api, community, document
    url: text("url"),
    apiEndpoint: text("api_endpoint"),
    credibilityScore: real("credibility_score").notNull().default(0.5),
    updateFrequency: varchar("update_frequency", { length: 100 }).notNull(), // cron expression
    lastUpdated: timestamp("last_updated"),
    metadata: jsonb("metadata"),
    isActive: boolean("is_active").notNull().default(true),
    rateLimits: jsonb("rate_limits"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    nameIdx: index("data_sources_name_idx").on(table.name),
    typeIdx: index("data_sources_type_idx").on(table.type),
    activeIdx: index("data_sources_active_idx").on(table.isActive),
  }),
);

// Collection Results table
export const collectionResults = pgTable(
  "collection_results",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => dataSources.id),
    status: varchar("status", { length: 20 }).notNull(), // success, partial, failed
    collectedAt: timestamp("collected_at").notNull().defaultNow(),
    data: jsonb("data"),
    metadata: jsonb("metadata").notNull(),
    nextCollectionAt: timestamp("next_collection_at"),
    processingTimeMs: integer("processing_time_ms"),
    itemsCollected: integer("items_collected").default(0),
    errors: jsonb("errors"),
    warnings: jsonb("warnings"),
  },
  (table) => ({
    sourceIdx: index("collection_results_source_idx").on(table.sourceId),
    statusIdx: index("collection_results_status_idx").on(table.status),
    collectedAtIdx: index("collection_results_collected_at_idx").on(
      table.collectedAt,
    ),
  }),
);

// Policy Changes table
export const policyChanges = pgTable(
  "policy_changes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => dataSources.id),
    country: varchar("country", { length: 10 }).notNull(),
    changeType: varchar("change_type", { length: 50 }).notNull(),
    impactLevel: varchar("impact_level", { length: 20 }).notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    effectiveDate: timestamp("effective_date"),
    detectedAt: timestamp("detected_at").notNull().defaultNow(),
    affectedCategories: jsonb("affected_categories"),
    sourceUrl: text("source_url").notNull(),
    confidence: real("confidence").notNull(),
    reviewStatus: varchar("review_status", { length: 20 })
      .notNull()
      .default("pending"),
    reviewedBy: uuid("reviewed_by"),
    reviewedAt: timestamp("reviewed_at"),
    embedding: jsonb("embedding"), // pgvector embedding for semantic analysis
  },
  (table) => ({
    countryIdx: index("policy_changes_country_idx").on(table.country),
    impactIdx: index("policy_changes_impact_idx").on(table.impactLevel),
    detectedAtIdx: index("policy_changes_detected_at_idx").on(table.detectedAt),
    reviewStatusIdx: index("policy_changes_review_status_idx").on(
      table.reviewStatus,
    ),
  }),
);

// Entities table for knowledge graph
export const entities = pgTable(
  "entities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    type: varchar("type", { length: 50 }).notNull(),
    properties: jsonb("properties").notNull(),
    confidence: real("confidence").notNull(),
    sources: jsonb("sources").notNull(),
    embedding: jsonb("embedding"), // pgvector embedding
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    nameIdx: index("entities_name_idx").on(table.name),
    typeIdx: index("entities_type_idx").on(table.type),
    confidenceIdx: index("entities_confidence_idx").on(table.confidence),
    nameTypeIdx: uniqueIndex("entities_name_type_idx").on(
      table.name,
      table.type,
    ),
  }),
);

// Relationships table for knowledge graph
export const relationships = pgTable(
  "relationships",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceEntityId: uuid("source_entity_id")
      .notNull()
      .references(() => entities.id),
    targetEntityId: uuid("target_entity_id")
      .notNull()
      .references(() => entities.id),
    type: varchar("type", { length: 50 }).notNull(),
    strength: real("strength").notNull(),
    confidence: real("confidence").notNull(),
    temporalValidity: jsonb("temporal_validity"),
    properties: jsonb("properties"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    sourceIdx: index("relationships_source_idx").on(table.sourceEntityId),
    targetIdx: index("relationships_target_idx").on(table.targetEntityId),
    typeIdx: index("relationships_type_idx").on(table.type),
    sourceTargetIdx: uniqueIndex("relationships_source_target_idx").on(
      table.sourceEntityId,
      table.targetEntityId,
      table.type,
    ),
  }),
);

// Community Experiences table
export const communityExperiences = pgTable(
  "community_experiences",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    pathway: varchar("pathway", { length: 100 }).notNull(),
    targetCountry: varchar("target_country", { length: 10 }).notNull(),
    milestone: varchar("milestone", { length: 100 }).notNull(),
    actualTimeline: integer("actual_timeline").notNull(), // days
    actualCost: real("actual_cost").notNull(),
    difficulty: integer("difficulty").notNull(), // 1-10 scale
    success: boolean("success").notNull(),
    feedback: text("feedback").notNull(),
    verificationStatus: varchar("verification_status", { length: 20 })
      .notNull()
      .default("pending"),
    qualityScore: real("quality_score"),
    submittedAt: timestamp("submitted_at").notNull().defaultNow(),
    verifiedAt: timestamp("verified_at"),
    verifiedBy: uuid("verified_by"),
  },
  (table) => ({
    userIdx: index("community_experiences_user_idx").on(table.userId),
    pathwayIdx: index("community_experiences_pathway_idx").on(table.pathway),
    countryIdx: index("community_experiences_country_idx").on(
      table.targetCountry,
    ),
    verificationIdx: index("community_experiences_verification_idx").on(
      table.verificationStatus,
    ),
    submittedAtIdx: index("community_experiences_submitted_at_idx").on(
      table.submittedAt,
    ),
  }),
);

// Community Validations table
export const communityValidations = pgTable(
  "community_validations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    submissionId: uuid("submission_id")
      .notNull()
      .references(() => communityExperiences.id),
    validatorId: uuid("validator_id").notNull(),
    validationScore: real("validation_score").notNull(),
    validationDetails: jsonb("validation_details").notNull(),
    validatedAt: timestamp("validated_at").notNull().defaultNow(),
  },
  (table) => ({
    submissionIdx: index("community_validations_submission_idx").on(
      table.submissionId,
    ),
    validatorIdx: index("community_validations_validator_idx").on(
      table.validatorId,
    ),
    validatedAtIdx: index("community_validations_validated_at_idx").on(
      table.validatedAt,
    ),
  }),
);

// Notifications table
export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    type: varchar("type", { length: 50 }).notNull(),
    title: text("title").notNull(),
    message: text("message").notNull(),
    severity: varchar("severity", { length: 20 }).notNull(), // critical, high, medium, low
    metadata: jsonb("metadata"),
    readAt: timestamp("read_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("notifications_user_idx").on(table.userId),
    typeIdx: index("notifications_type_idx").on(table.type),
    severityIdx: index("notifications_severity_idx").on(table.severity),
    createdAtIdx: index("notifications_created_at_idx").on(table.createdAt),
    readAtIdx: index("notifications_read_at_idx").on(table.readAt),
  }),
);

// System Alerts table
export const systemAlerts = pgTable(
  "system_alerts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    type: varchar("type", { length: 50 }).notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    severity: varchar("severity", { length: 20 }).notNull(), // critical, high, medium, low
    metadata: jsonb("metadata"),
    resolvedAt: timestamp("resolved_at"),
    resolvedBy: uuid("resolved_by"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    typeIdx: index("system_alerts_type_idx").on(table.type),
    severityIdx: index("system_alerts_severity_idx").on(table.severity),
    createdAtIdx: index("system_alerts_created_at_idx").on(table.createdAt),
    resolvedAtIdx: index("system_alerts_resolved_at_idx").on(table.resolvedAt),
  }),
);

// Policy Change Analyses table
export const policyChangeAnalyses = pgTable(
  "policy_change_analyses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    country: varchar("country", { length: 10 }).notNull(),
    policyType: varchar("policy_type", { length: 50 }).notNull(),
    sourceUrl: text("source_url").notNull(),
    totalChanges: integer("total_changes").notNull().default(0),
    criticalChanges: integer("critical_changes").notNull().default(0),
    highPriorityChanges: integer("high_priority_changes").notNull().default(0),
    mostImpactedAreas: jsonb("most_impacted_areas"),
    overallImpactLevel: varchar("overall_impact_level", {
      length: 20,
    }).notNull(),
    recommendations: jsonb("recommendations"),
    analyzedAt: timestamp("analyzed_at").notNull().defaultNow(),
  },
  (table) => ({
    countryIdx: index("policy_change_analyses_country_idx").on(table.country),
    policyTypeIdx: index("policy_change_analyses_policy_type_idx").on(
      table.policyType,
    ),
    impactLevelIdx: index("policy_change_analyses_impact_level_idx").on(
      table.overallImpactLevel,
    ),
    analyzedAtIdx: index("policy_change_analyses_analyzed_at_idx").on(
      table.analyzedAt,
    ),
  }),
);

// User Profiles table (for notifications)
export const userProfiles = pgTable(
  "user_profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    targetCountry: varchar("target_country", { length: 10 }),
    visaType: varchar("visa_type", { length: 50 }),
    immigrationType: varchar("immigration_type", { length: 50 }),
    immigrationTypes: jsonb("immigration_types"), // array of types
    currentStage: varchar("current_stage", { length: 100 }),
    notificationPreferences: jsonb("notification_preferences"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    targetCountryIdx: index("user_profiles_target_country_idx").on(
      table.targetCountry,
    ),
    visaTypeIdx: index("user_profiles_visa_type_idx").on(table.visaType),
    immigrationTypeIdx: index("user_profiles_immigration_type_idx").on(
      table.immigrationType,
    ),
  }),
);

// Orchestration Runs table
export const orchestrationRuns = pgTable(
  "orchestration_runs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    type: varchar("type", { length: 50 }).notNull(),
    countriesProcessed: integer("countries_processed").notNull().default(0),
    countriesFailed: integer("countries_failed").notNull().default(0),
    totalSources: integer("total_sources").notNull().default(0),
    results: jsonb("results"),
    errors: jsonb("errors"),
    startedAt: timestamp("started_at").notNull().defaultNow(),
    completedAt: timestamp("completed_at").notNull().defaultNow(),
  },
  (table) => ({
    typeIdx: index("orchestration_runs_type_idx").on(table.type),
    completedAtIdx: index("orchestration_runs_completed_at_idx").on(
      table.completedAt,
    ),
  }),
);

// Source Reliability Assessments table
export const sourceReliabilityAssessments = pgTable(
  "source_reliability_assessments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    url: text("url").notNull(),
    country: varchar("country", { length: 10 }).notNull(),
    agency: varchar("agency", { length: 255 }).notNull(),
    isReliable: boolean("is_reliable").notNull(),
    successRate: real("success_rate"),
    averageResponseTime: integer("average_response_time"), // milliseconds
    totalAttempts: integer("total_attempts").notNull().default(0),
    recentErrors: jsonb("recent_errors"),
    reason: text("reason"),
    assessedAt: timestamp("assessed_at").notNull().defaultNow(),
  },
  (table) => ({
    urlIdx: index("source_reliability_assessments_url_idx").on(table.url),
    countryIdx: index("source_reliability_assessments_country_idx").on(
      table.country,
    ),
    reliableIdx: index("source_reliability_assessments_reliable_idx").on(
      table.isReliable,
    ),
    assessedAtIdx: index("source_reliability_assessments_assessed_at_idx").on(
      table.assessedAt,
    ),
  }),
);

// Task Executions table for monitoring
export const taskExecutions = pgTable(
  "task_executions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    taskId: varchar("task_id", { length: 100 }).notNull(),
    runId: varchar("run_id", { length: 100 }).notNull(),
    status: varchar("status", { length: 20 }).notNull(), // pending, running, completed, failed
    startedAt: timestamp("started_at").notNull().defaultNow(),
    completedAt: timestamp("completed_at"),
    duration: integer("duration"), // milliseconds
    attempt: integer("attempt").notNull().default(1),
    payload: jsonb("payload"),
    result: jsonb("result"),
    error: text("error"),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    taskIdx: index("task_executions_task_idx").on(table.taskId),
    runIdx: index("task_executions_run_idx").on(table.runId),
    statusIdx: index("task_executions_status_idx").on(table.status),
    startedAtIdx: index("task_executions_started_at_idx").on(table.startedAt),
  }),
);

// Scraped Data table for storing collected data
export const scrapedData = pgTable(
  "scraped_data",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => dataSources.id),
    dataType: varchar("data_type", { length: 100 }).notNull(),
    data: jsonb("data").notNull(),
    confidenceScore: real("confidence_score").notNull().default(0.5),
    status: varchar("status", { length: 20 }).notNull().default("active"), // active, rejected, quarantined
    expertVerified: boolean("expert_verified").notNull().default(false),
    expertModified: boolean("expert_modified").notNull().default(false),
    rejectionReason: text("rejection_reason"),
    modificationReason: text("modification_reason"),
    embedding: jsonb("embedding"), // pgvector embedding
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    sourceIdx: index("scraped_data_source_idx").on(table.sourceId),
    dataTypeIdx: index("scraped_data_data_type_idx").on(table.dataType),
    statusIdx: index("scraped_data_status_idx").on(table.status),
    confidenceIdx: index("scraped_data_confidence_idx").on(table.confidenceScore),
    createdAtIdx: index("scraped_data_created_at_idx").on(table.createdAt),
  }),
);

// Data Conflicts table for conflict detection and resolution
export const dataConflicts = pgTable(
  "data_conflicts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    dataIds: jsonb("data_ids").notNull(), // Array of conflicting data IDs
    conflictType: varchar("conflict_type", { length: 50 }).notNull(), // value, format, source, temporal, logical
    severity: varchar("severity", { length: 20 }).notNull(), // low, medium, high, critical
    description: text("description").notNull(),
    conflictingValues: jsonb("conflicting_values").notNull(),
    suggestedResolution: varchar("suggested_resolution", { length: 50 }).notNull(), // manual_review, auto_resolve, expert_review, community_vote
    confidence: real("confidence").notNull(),
    status: varchar("status", { length: 20 }).notNull().default("detected"), // detected, under_review, resolved, dismissed
    resolution: jsonb("resolution"),
    detectedAt: timestamp("detected_at").notNull().defaultNow(),
    resolvedAt: timestamp("resolved_at"),
    resolvedBy: uuid("resolved_by"),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    conflictTypeIdx: index("data_conflicts_conflict_type_idx").on(table.conflictType),
    severityIdx: index("data_conflicts_severity_idx").on(table.severity),
    statusIdx: index("data_conflicts_status_idx").on(table.status),
    detectedAtIdx: index("data_conflicts_detected_at_idx").on(table.detectedAt),
    resolvedAtIdx: index("data_conflicts_resolved_at_idx").on(table.resolvedAt),
  }),
);

// Expert Reviews table for managing expert review workflow
export const expertReviews = pgTable(
  "expert_reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conflictId: uuid("conflict_id")
      .notNull()
      .references(() => dataConflicts.id),
    reviewType: varchar("review_type", { length: 50 }).notNull(), // conflict_resolution, quality_assessment, data_verification, escalated_review
    priority: varchar("priority", { length: 20 }).notNull(), // low, medium, high, critical
    description: text("description").notNull(),
    context: jsonb("context").notNull(),
    aiGuidance: jsonb("ai_guidance"),
    additionalEvidence: jsonb("additional_evidence"),
    decision: varchar("decision", { length: 20 }), // accept, reject, modify, escalate
    resolution: jsonb("resolution"),
    recommendations: jsonb("recommendations"),
    assignedTo: uuid("assigned_to"),
    reviewedBy: uuid("reviewed_by"),
    deadline: timestamp("deadline"),
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, in_progress, completed, escalated
    createdAt: timestamp("created_at").notNull().defaultNow(),
    reviewedAt: timestamp("reviewed_at"),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    conflictIdx: index("expert_reviews_conflict_idx").on(table.conflictId),
    reviewTypeIdx: index("expert_reviews_review_type_idx").on(table.reviewType),
    priorityIdx: index("expert_reviews_priority_idx").on(table.priority),
    statusIdx: index("expert_reviews_status_idx").on(table.status),
    assignedToIdx: index("expert_reviews_assigned_to_idx").on(table.assignedTo),
    deadlineIdx: index("expert_reviews_deadline_idx").on(table.deadline),
    createdAtIdx: index("expert_reviews_created_at_idx").on(table.createdAt),
  }),
);

// Quality Feedback table for community and expert feedback
export const qualityFeedback = pgTable(
  "quality_feedback",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    dataId: uuid("data_id").notNull(),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => dataSources.id),
    feedbackType: varchar("feedback_type", { length: 50 }).notNull(), // accuracy, completeness, timeliness, relevance, format, expert_resolution
    rating: integer("rating").notNull(), // 1-5 scale
    comment: text("comment"),
    suggestedImprovement: text("suggested_improvement"),
    reportedBy: uuid("reported_by").notNull(),
    reportedAt: timestamp("reported_at").notNull().defaultNow(),
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, reviewed, implemented, rejected
    reviewedBy: uuid("reviewed_by"),
    reviewedAt: timestamp("reviewed_at"),
    reviewNotes: text("review_notes"),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    dataIdx: index("quality_feedback_data_idx").on(table.dataId),
    sourceIdx: index("quality_feedback_source_idx").on(table.sourceId),
    feedbackTypeIdx: index("quality_feedback_feedback_type_idx").on(table.feedbackType),
    statusIdx: index("quality_feedback_status_idx").on(table.status),
    reportedByIdx: index("quality_feedback_reported_by_idx").on(table.reportedBy),
    reportedAtIdx: index("quality_feedback_reported_at_idx").on(table.reportedAt),
  }),
);

// Validation Rules table for storing quality validation rules
export const validationRules = pgTable(
  "validation_rules",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ruleType: varchar("rule_type", { length: 50 }).notNull(),
    description: text("description").notNull(),
    ruleDefinition: jsonb("rule_definition").notNull(),
    expectedImpact: real("expected_impact").notNull(),
    status: varchar("status", { length: 20 }).notNull().default("active"), // active, inactive, pending_approval
    createdFrom: varchar("created_from", { length: 50 }), // feedback_loop, manual, system
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    ruleTypeIdx: index("validation_rules_rule_type_idx").on(table.ruleType),
    statusIdx: index("validation_rules_status_idx").on(table.status),
    createdFromIdx: index("validation_rules_created_from_idx").on(table.createdFrom),
    createdAtIdx: index("validation_rules_created_at_idx").on(table.createdAt),
  }),
);

// Quality Analysis Results table for storing feedback loop analysis
export const qualityAnalysisResults = pgTable(
  "quality_analysis_results",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    analysisType: varchar("analysis_type", { length: 50 }).notNull(), // pattern_analysis, source_reliability, rule_improvement
    reviewsAnalyzed: integer("reviews_analyzed").notNull(),
    patternsIdentified: integer("patterns_identified").notNull(),
    improvementsImplemented: integer("improvements_implemented").notNull(),
    analysisResults: jsonb("analysis_results").notNull(),
    implementedImprovements: jsonb("implemented_improvements").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    analysisTypeIdx: index("quality_analysis_results_analysis_type_idx").on(table.analysisType),
    createdAtIdx: index("quality_analysis_results_created_at_idx").on(table.createdAt),
  }),
);

// Define relationships
export const dataSourcesRelations = relations(dataSources, ({ many }) => ({
  collectionResults: many(collectionResults),
  policyChanges: many(policyChanges),
}));

export const collectionResultsRelations = relations(
  collectionResults,
  ({ one }) => ({
    dataSource: one(dataSources, {
      fields: [collectionResults.sourceId],
      references: [dataSources.id],
    }),
  }),
);

export const policyChangesRelations = relations(policyChanges, ({ one }) => ({
  dataSource: one(dataSources, {
    fields: [policyChanges.sourceId],
    references: [dataSources.id],
  }),
}));

export const entitiesRelations = relations(entities, ({ many }) => ({
  sourceRelationships: many(relationships, { relationName: "sourceEntity" }),
  targetRelationships: many(relationships, { relationName: "targetEntity" }),
}));

export const relationshipsRelations = relations(relationships, ({ one }) => ({
  sourceEntity: one(entities, {
    fields: [relationships.sourceEntityId],
    references: [entities.id],
    relationName: "sourceEntity",
  }),
  targetEntity: one(entities, {
    fields: [relationships.targetEntityId],
    references: [entities.id],
    relationName: "targetEntity",
  }),
}));

export const communityExperiencesRelations = relations(
  communityExperiences,
  ({ many }) => ({
    validations: many(communityValidations),
  }),
);

export const communityValidationsRelations = relations(
  communityValidations,
  ({ one }) => ({
    submission: one(communityExperiences, {
      fields: [communityValidations.submissionId],
      references: [communityExperiences.id],
    }),
  }),
);

export const scrapedDataRelations = relations(scrapedData, ({ one, many }) => ({
  dataSource: one(dataSources, {
    fields: [scrapedData.sourceId],
    references: [dataSources.id],
  }),
  qualityFeedback: many(qualityFeedback),
}));

export const dataConflictsRelations = relations(dataConflicts, ({ many }) => ({
  expertReviews: many(expertReviews),
}));

export const expertReviewsRelations = relations(expertReviews, ({ one }) => ({
  conflict: one(dataConflicts, {
    fields: [expertReviews.conflictId],
    references: [dataConflicts.id],
  }),
}));

export const qualityFeedbackRelations = relations(qualityFeedback, ({ one }) => ({
  dataSource: one(dataSources, {
    fields: [qualityFeedback.sourceId],
    references: [dataSources.id],
  }),
}));

// Notification system relations (Task 11.1)
export const userNotificationPreferencesRelations = relations(
  userNotificationPreferences,
  ({ one }) => ({
    userProfile: one(userProfiles, {
      fields: [userNotificationPreferences.userId],
      references: [userProfiles.id],
    }),
  }),
);

export const multiChannelDeliveriesRelations = relations(
  multiChannelDeliveries,
  ({ one }) => ({
    notification: one(notifications, {
      fields: [multiChannelDeliveries.notificationId],
      references: [notifications.id],
    }),
  }),
);

export const userPersonalizationContextsRelations = relations(
  userPersonalizationContexts,
  ({ one, many }) => ({
    userProfile: one(userProfiles, {
      fields: [userPersonalizationContexts.userId],
      references: [userProfiles.id],
    }),
    personalizedNotifications: many(personalizedNotifications),
  }),
);

export const personalizedNotificationsRelations = relations(
  personalizedNotifications,
  ({ one, many }) => ({
    context: one(userPersonalizationContexts, {
      fields: [personalizedNotifications.contextId],
      references: [userPersonalizationContexts.id],
    }),
    timingOptimizations: many(notificationTimingOptimizations),
  }),
);

export const notificationTimingOptimizationsRelations = relations(
  notificationTimingOptimizations,
  ({ one }) => ({
    personalizedNotification: one(personalizedNotifications, {
      fields: [notificationTimingOptimizations.contentId],
      references: [personalizedNotifications.id],
    }),
  }),
);

export const personalizationPerformanceTrackingRelations = relations(
  personalizationPerformanceTracking,
  ({ one, many }) => ({
    notification: one(notifications, {
      fields: [personalizationPerformanceTracking.notificationId],
      references: [notifications.id],
    }),
    modelUpdates: many(personalizationModelUpdates),
  }),
);

export const personalizationModelUpdatesRelations = relations(
  personalizationModelUpdates,
  ({ one }) => ({
    performanceTracking: one(personalizationPerformanceTracking, {
      fields: [personalizationModelUpdates.performanceId],
      references: [personalizationPerformanceTracking.id],
    }),
  }),
);

export const webhookDeliveriesRelations = relations(webhookDeliveries, ({ one }) => ({
  webhook: one(webhooks, {
    fields: [webhookDeliveries.webhookId],
    references: [webhooks.id],
  }),
  event: one(webhookEvents, {
    fields: [webhookDeliveries.eventId],
    references: [webhookEvents.id],
  }),
}));

export const userCasesRelations = relations(userCases, ({ one }) => ({
  userProfile: one(userProfiles, {
    fields: [userCases.userId],
    references: [userProfiles.id],
  }),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  userProfile: one(userProfiles, {
    fields: [documents.userId],
    references: [userProfiles.id],
  }),
}));

// Multi-Language Processing Relations
export const translationResultsRelations = relations(translationResults, ({ one, many }) => ({
  dataSource: one(dataSources, {
    fields: [translationResults.sourceId],
    references: [dataSources.id],
  }),
  qualityAssessments: many(translationQualityAssessments),
}));

export const multilingualContentExtractionsRelations = relations(
  multilingualContentExtractions,
  ({ many }) => ({
    // Add relations as needed
  }),
);

export const crossLanguageEntityLinksRelations = relations(
  crossLanguageEntityLinks,
  ({ one }) => ({
    sourceEntity: one(entities, {
      fields: [crossLanguageEntityLinks.sourceEntityId],
      references: [entities.id],
      relationName: "sourceEntity",
    }),
    targetEntity: one(entities, {
      fields: [crossLanguageEntityLinks.targetEntityId],
      references: [entities.id],
      relationName: "targetEntity",
    }),
  }),
);

export const multilingualKnowledgeGraphNodesRelations = relations(
  multilingualKnowledgeGraphNodes,
  ({ one }) => ({
    entity: one(entities, {
      fields: [multilingualKnowledgeGraphNodes.entityId],
      references: [entities.id],
    }),
  }),
);

export const translationQualityAssessmentsRelations = relations(
  translationQualityAssessments,
  ({ one }) => ({
    translation: one(translationResults, {
      fields: [translationQualityAssessments.translationId],
      references: [translationResults.id],
    }),
  }),
);

// Competitive Intelligence Relations
export const competitorPlatformsRelations = relations(competitorPlatforms, ({ many }) => ({
  monitoringResults: many(competitorMonitoringResults),
}));

export const competitorMonitoringResultsRelations = relations(
  competitorMonitoringResults,
  ({ one }) => ({
    platform: one(competitorPlatforms, {
      fields: [competitorMonitoringResults.platformId],
      references: [competitorPlatforms.id],
    }),
  }),
);

// Multi-Language Processing Tables

// Language-specific data sources
export const languageSpecificDataSources = pgTable(
  "language_specific_data_sources",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    url: text("url").notNull(),
    language: varchar("language", { length: 10 }).notNull(),
    country: varchar("country", { length: 10 }).notNull(),
    agency: varchar("agency", { length: 255 }).notNull(),
    documentType: varchar("document_type", { length: 50 }).notNull(),
    priority: varchar("priority", { length: 20 }).notNull().default("medium"),
    updateFrequency: varchar("update_frequency", { length: 100 }).notNull(),
    translationTargets: jsonb("translation_targets").notNull(),
    qualityThreshold: real("quality_threshold").notNull().default(0.8),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    urlIdx: index("language_specific_data_sources_url_idx").on(table.url),
    languageIdx: index("language_specific_data_sources_language_idx").on(table.language),
    countryIdx: index("language_specific_data_sources_country_idx").on(table.country),
    priorityIdx: index("language_specific_data_sources_priority_idx").on(table.priority),
    activeIdx: index("language_specific_data_sources_active_idx").on(table.isActive),
  }),
);

// Translation results
export const translationResults = pgTable(
  "translation_results",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceId: uuid("source_id").references(() => dataSources.id),
    originalText: text("original_text").notNull(),
    translatedText: text("translated_text").notNull(),
    sourceLanguage: varchar("source_language", { length: 10 }).notNull(),
    targetLanguage: varchar("target_language", { length: 10 }).notNull(),
    confidence: real("confidence").notNull(),
    qualityScore: real("quality_score").notNull(),
    translationMethod: varchar("translation_method", { length: 50 }).notNull(),
    preservedTerms: jsonb("preserved_terms"),
    alternativeTranslations: jsonb("alternative_translations"),
    context: varchar("context", { length: 50 }).notNull().default("general"),
    domain: varchar("domain", { length: 50 }),
    metadata: jsonb("metadata").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    sourceIdx: index("translation_results_source_idx").on(table.sourceId),
    sourceLanguageIdx: index("translation_results_source_language_idx").on(table.sourceLanguage),
    targetLanguageIdx: index("translation_results_target_language_idx").on(table.targetLanguage),
    confidenceIdx: index("translation_results_confidence_idx").on(table.confidence),
    qualityIdx: index("translation_results_quality_idx").on(table.qualityScore),
    createdAtIdx: index("translation_results_created_at_idx").on(table.createdAt),
  }),
);

// Multilingual content extractions
export const multilingualContentExtractions = pgTable(
  "multilingual_content_extractions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    url: text("url").notNull(),
    detectedLanguage: varchar("detected_language", { length: 10 }).notNull(),
    languageConfidence: real("language_confidence").notNull(),
    originalContent: text("original_content").notNull(),
    translations: jsonb("translations").notNull(),
    structuredData: jsonb("structured_data"),
    extractionOptions: jsonb("extraction_options").notNull(),
    firecrawlOptions: jsonb("firecrawl_options").notNull(),
    metadata: jsonb("metadata").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    urlIdx: index("multilingual_content_extractions_url_idx").on(table.url),
    detectedLanguageIdx: index("multilingual_content_extractions_detected_language_idx").on(table.detectedLanguage),
    languageConfidenceIdx: index("multilingual_content_extractions_language_confidence_idx").on(table.languageConfidence),
    createdAtIdx: index("multilingual_content_extractions_created_at_idx").on(table.createdAt),
  }),
);

// Cross-language entity links
export const crossLanguageEntityLinks = pgTable(
  "cross_language_entity_links",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceEntityId: uuid("source_entity_id").notNull().references(() => entities.id),
    targetEntityId: uuid("target_entity_id").notNull().references(() => entities.id),
    sourceLanguage: varchar("source_language", { length: 10 }).notNull(),
    targetLanguage: varchar("target_language", { length: 10 }).notNull(),
    linkingMethod: varchar("linking_method", { length: 50 }).notNull(),
    confidence: real("confidence").notNull(),
    similarity: real("similarity").notNull(),
    translations: jsonb("translations"),
    metadata: jsonb("metadata").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    sourceEntityIdx: index("cross_language_entity_links_source_entity_idx").on(table.sourceEntityId),
    targetEntityIdx: index("cross_language_entity_links_target_entity_idx").on(table.targetEntityId),
    sourceLanguageIdx: index("cross_language_entity_links_source_language_idx").on(table.sourceLanguage),
    targetLanguageIdx: index("cross_language_entity_links_target_language_idx").on(table.targetLanguage),
    confidenceIdx: index("cross_language_entity_links_confidence_idx").on(table.confidence),
    linkingMethodIdx: index("cross_language_entity_links_linking_method_idx").on(table.linkingMethod),
  }),
);

// Multilingual knowledge graph nodes
export const multilingualKnowledgeGraphNodes = pgTable(
  "multilingual_knowledge_graph_nodes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    entityId: uuid("entity_id").notNull().references(() => entities.id),
    type: varchar("type", { length: 50 }).notNull(),
    primaryLanguage: varchar("primary_language", { length: 10 }).notNull(),
    labels: jsonb("labels").notNull(), // language -> label mapping
    descriptions: jsonb("descriptions").notNull(), // language -> description mapping
    properties: jsonb("properties").notNull(),
    embeddings: jsonb("embeddings").notNull(), // language -> embedding mapping
    confidence: real("confidence").notNull(),
    sources: jsonb("sources").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    entityIdx: index("multilingual_knowledge_graph_nodes_entity_idx").on(table.entityId),
    typeIdx: index("multilingual_knowledge_graph_nodes_type_idx").on(table.type),
    primaryLanguageIdx: index("multilingual_knowledge_graph_nodes_primary_language_idx").on(table.primaryLanguage),
    confidenceIdx: index("multilingual_knowledge_graph_nodes_confidence_idx").on(table.confidence),
  }),
);

// Translation quality assessments
export const translationQualityAssessments = pgTable(
  "translation_quality_assessments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    translationId: uuid("translation_id").notNull().references(() => translationResults.id),
    assessmentCriteria: jsonb("assessment_criteria").notNull(),
    overallScore: real("overall_score").notNull(),
    issues: jsonb("issues").notNull(),
    recommendations: jsonb("recommendations").notNull(),
    assessedBy: varchar("assessed_by", { length: 50 }).notNull(), // ai, human, hybrid
    assessedAt: timestamp("assessed_at").notNull().defaultNow(),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    translationIdx: index("translation_quality_assessments_translation_idx").on(table.translationId),
    overallScoreIdx: index("translation_quality_assessments_overall_score_idx").on(table.overallScore),
    assessedByIdx: index("translation_quality_assessments_assessed_by_idx").on(table.assessedBy),
    assessedAtIdx: index("translation_quality_assessments_assessed_at_idx").on(table.assessedAt),
  }),
);

// Localization pipeline runs
export const localizationPipelineRuns = pgTable(
  "localization_pipeline_runs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceLanguage: varchar("source_language", { length: 10 }).notNull(),
    targetLanguages: jsonb("target_languages").notNull(),
    contentTypes: jsonb("content_types").notNull(),
    automationLevel: varchar("automation_level", { length: 50 }).notNull(),
    qualityGates: jsonb("quality_gates").notNull(),
    deliveryChannels: jsonb("delivery_channels").notNull(),
    status: varchar("status", { length: 20 }).notNull().default("pending"),
    itemsProcessed: integer("items_processed").notNull().default(0),
    itemsSuccessful: integer("items_successful").notNull().default(0),
    itemsFailed: integer("items_failed").notNull().default(0),
    results: jsonb("results"),
    errors: jsonb("errors"),
    startedAt: timestamp("started_at").notNull().defaultNow(),
    completedAt: timestamp("completed_at"),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    sourceLanguageIdx: index("localization_pipeline_runs_source_language_idx").on(table.sourceLanguage),
    statusIdx: index("localization_pipeline_runs_status_idx").on(table.status),
    startedAtIdx: index("localization_pipeline_runs_started_at_idx").on(table.startedAt),
    completedAtIdx: index("localization_pipeline_runs_completed_at_idx").on(table.completedAt),
  }),
);

// Competitive Intelligence Tables

// Competitor Platforms table
export const competitorPlatforms = pgTable(
  "competitor_platforms",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    url: text("url").notNull(),
    type: varchar("type", { length: 50 }).notNull(), // immigration_platform, legal_service, government_portal, consulting_firm
    countryFocus: jsonb("country_focus").notNull(), // Array of country codes
    languages: jsonb("languages").notNull(), // Array of language codes
    lastMonitored: timestamp("last_monitored"),
    nextMonitoring: timestamp("next_monitoring"),
    monitoringFrequency: varchar("monitoring_frequency", { length: 20 }).notNull().default("weekly"), // daily, weekly, monthly
    priority: varchar("priority", { length: 20 }).notNull().default("medium"), // high, medium, low
    status: varchar("status", { length: 20 }).notNull().default("active"), // active, inactive, archived
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    nameIdx: index("competitor_platforms_name_idx").on(table.name),
    typeIdx: index("competitor_platforms_type_idx").on(table.type),
    priorityIdx: index("competitor_platforms_priority_idx").on(table.priority),
    statusIdx: index("competitor_platforms_status_idx").on(table.status),
    nextMonitoringIdx: index("competitor_platforms_next_monitoring_idx").on(table.nextMonitoring),
  }),
);

// Competitor Monitoring Results table
export const competitorMonitoringResults = pgTable(
  "competitor_monitoring_results",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    platformId: uuid("platform_id")
      .notNull()
      .references(() => competitorPlatforms.id),
    monitoringType: varchar("monitoring_type", { length: 50 }).notNull(), // feature_analysis, data_coverage, content_changes, performance_metrics
    results: jsonb("results").notNull(),
    changesDetected: jsonb("changes_detected").notNull(), // Array of detected changes
    alerts: jsonb("alerts").notNull(), // Array of generated alerts
    monitoredAt: timestamp("monitored_at").notNull().defaultNow(),
    nextMonitoring: timestamp("next_monitoring").notNull(),
    processingTimeMs: integer("processing_time_ms"),
    pagesAnalyzed: integer("pages_analyzed").default(0),
    confidenceScore: real("confidence_score").default(0.8),
  },
  (table) => ({
    platformIdx: index("competitor_monitoring_results_platform_idx").on(table.platformId),
    monitoringTypeIdx: index("competitor_monitoring_results_monitoring_type_idx").on(table.monitoringType),
    monitoredAtIdx: index("competitor_monitoring_results_monitored_at_idx").on(table.monitoredAt),
    nextMonitoringIdx: index("competitor_monitoring_results_next_monitoring_idx").on(table.nextMonitoring),
  }),
);

// Competitive Gap Analysis table
export const competitiveGapAnalysis = pgTable(
  "competitive_gap_analysis",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    competitorIds: jsonb("competitor_ids").notNull(), // Array of competitor IDs analyzed
    analysisScope: varchar("analysis_scope", { length: 50 }).notNull(), // features, data_coverage, comprehensive
    gapsIdentified: jsonb("gaps_identified").notNull(), // Array of gap analysis results
    prioritizedGaps: jsonb("prioritized_gaps").notNull(), // Array of prioritized gaps
    strategicRecommendations: jsonb("strategic_recommendations").notNull(),
    totalGaps: integer("total_gaps").notNull().default(0),
    highPriorityGaps: integer("high_priority_gaps").notNull().default(0),
    analyzedAt: timestamp("analyzed_at").notNull().defaultNow(),
    validUntil: timestamp("valid_until"),
  },
  (table) => ({
    analysisScopeIdx: index("competitive_gap_analysis_analysis_scope_idx").on(table.analysisScope),
    analyzedAtIdx: index("competitive_gap_analysis_analyzed_at_idx").on(table.analyzedAt),
    totalGapsIdx: index("competitive_gap_analysis_total_gaps_idx").on(table.totalGaps),
    highPriorityGapsIdx: index("competitive_gap_analysis_high_priority_gaps_idx").on(table.highPriorityGaps),
  }),
);

// Competitive Opportunities table
export const competitiveOpportunities = pgTable(
  "competitive_opportunities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    type: varchar("type", { length: 50 }).notNull(), // data_source, feature_enhancement, market_gap, technology_advantage
    potentialImpact: varchar("potential_impact", { length: 20 }).notNull(), // critical, high, medium, low
    implementationComplexity: varchar("implementation_complexity", { length: 20 }).notNull(), // low, medium, high
    estimatedEffortWeeks: integer("estimated_effort_weeks").notNull(),
    roiScore: real("roi_score").notNull(),
    competitiveAdvantage: text("competitive_advantage").notNull(),
    requirements: jsonb("requirements").notNull(), // Array of requirements
    risks: jsonb("risks").notNull(), // Array of risks
    validationData: jsonb("validation_data"), // Validation results from AI analysis
    priorityScore: real("priority_score"),
    identifiedAt: timestamp("identified_at").notNull().defaultNow(),
    status: varchar("status", { length: 20 }).notNull().default("identified"), // identified, evaluated, approved, in_progress, completed, rejected
    assignedTo: uuid("assigned_to"),
    targetCompletionDate: timestamp("target_completion_date"),
    completedAt: timestamp("completed_at"),
  },
  (table) => ({
    typeIdx: index("competitive_opportunities_type_idx").on(table.type),
    potentialImpactIdx: index("competitive_opportunities_potential_impact_idx").on(table.potentialImpact),
    statusIdx: index("competitive_opportunities_status_idx").on(table.status),
    priorityScoreIdx: index("competitive_opportunities_priority_score_idx").on(table.priorityScore),
    identifiedAtIdx: index("competitive_opportunities_identified_at_idx").on(table.identifiedAt),
    assignedToIdx: index("competitive_opportunities_assigned_to_idx").on(table.assignedTo),
  }),
);

// Competitive Intelligence Orchestrations table
export const competitiveIntelligenceOrchestrations = pgTable(
  "competitive_intelligence_orchestrations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orchestrationType: varchar("orchestration_type", { length: 50 }).notNull(), // full_analysis, monitoring_only, gap_analysis_only, opportunity_identification_only
    startedAt: timestamp("started_at").notNull().defaultNow(),
    completedAt: timestamp("completed_at"),
    stages: jsonb("stages").notNull(), // Object with stage statuses and results
    executiveSummary: jsonb("executive_summary"),
    competitorsAnalyzed: integer("competitors_analyzed").default(0),
    gapsIdentified: integer("gaps_identified").default(0),
    opportunitiesGenerated: integer("opportunities_generated").default(0),
    status: varchar("status", { length: 20 }).notNull().default("running"), // running, completed, failed, partial
    triggeredBy: varchar("triggered_by", { length: 50 }), // scheduled, manual, alert
    metadata: jsonb("metadata"),
  },
  (table) => ({
    orchestrationTypeIdx: index("competitive_intelligence_orchestrations_orchestration_type_idx").on(table.orchestrationType),
    statusIdx: index("competitive_intelligence_orchestrations_status_idx").on(table.status),
    startedAtIdx: index("competitive_intelligence_orchestrations_started_at_idx").on(table.startedAt),
    completedAtIdx: index("competitive_intelligence_orchestrations_completed_at_idx").on(table.completedAt),
    triggeredByIdx: index("competitive_intelligence_orchestrations_triggered_by_idx").on(table.triggeredBy),
  }),
);

// API Integration Tables

// API Keys table for authentication
export const apiKeys = pgTable(
  "api_keys",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    keyHash: varchar("key_hash", { length: 64 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    permissions: jsonb("permissions").notNull(), // Array of permission strings
    rateLimit: jsonb("rate_limit").notNull(),
    subscriptionTier: varchar("subscription_tier", { length: 20 }).notNull().default("free"),
    isActive: boolean("is_active").notNull().default(true),
    expiresAt: timestamp("expires_at"),
    lastUsedAt: timestamp("last_used_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("api_keys_user_idx").on(table.userId),
    tierIdx: index("api_keys_tier_idx").on(table.subscriptionTier),
    activeIdx: index("api_keys_active_idx").on(table.isActive),
    expiresIdx: index("api_keys_expires_idx").on(table.expiresAt),
  }),
);

// API Usage Records table for tracking
export const apiUsageRecords = pgTable(
  "api_usage_records",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    apiKeyId: uuid("api_key_id")
      .notNull()
      .references(() => apiKeys.id),
    endpoint: varchar("endpoint", { length: 255 }).notNull(),
    method: varchar("method", { length: 10 }).notNull(),
    statusCode: integer("status_code").notNull(),
    responseTime: integer("response_time").notNull(), // milliseconds
    requestSize: integer("request_size").notNull().default(0), // bytes
    responseSize: integer("response_size").notNull().default(0), // bytes
    firecrawlCreditsUsed: integer("firecrawl_credits_used").default(0),
    aiTokensUsed: integer("ai_tokens_used").default(0),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    apiKeyIdx: index("api_usage_records_api_key_idx").on(table.apiKeyId),
    endpointIdx: index("api_usage_records_endpoint_idx").on(table.endpoint),
    timestampIdx: index("api_usage_records_timestamp_idx").on(table.timestamp),
    statusIdx: index("api_usage_records_status_idx").on(table.statusCode),
  }),
);

// Webhooks table
export const webhooks = pgTable(
  "webhooks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    url: text("url").notNull(),
    events: jsonb("events").notNull(), // Array of event types
    filters: jsonb("filters"),
    headers: jsonb("headers"),
    secret: varchar("secret", { length: 128 }),
    isActive: boolean("is_active").notNull().default(true),
    retryConfig: jsonb("retry_config"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("webhooks_user_idx").on(table.userId),
    activeIdx: index("webhooks_active_idx").on(table.isActive),
    createdAtIdx: index("webhooks_created_at_idx").on(table.createdAt),
  }),
);

// Webhook Events table
export const webhookEvents = pgTable(
  "webhook_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    type: varchar("type", { length: 100 }).notNull(),
    data: jsonb("data").notNull(),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
    source: varchar("source", { length: 100 }).notNull(),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    typeIdx: index("webhook_events_type_idx").on(table.type),
    timestampIdx: index("webhook_events_timestamp_idx").on(table.timestamp),
    sourceIdx: index("webhook_events_source_idx").on(table.source),
  }),
);

// Webhook Deliveries table
export const webhookDeliveries = pgTable(
  "webhook_deliveries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    webhookId: uuid("webhook_id")
      .notNull()
      .references(() => webhooks.id),
    eventId: uuid("event_id")
      .notNull()
      .references(() => webhookEvents.id),
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, sent, failed, retrying
    attempts: integer("attempts").notNull().default(0),
    maxAttempts: integer("max_attempts").notNull().default(3),
    nextRetryAt: timestamp("next_retry_at"),
    sentAt: timestamp("sent_at"),
    responseStatus: integer("response_status"),
    responseBody: text("response_body"),
    error: text("error"),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    webhookIdx: index("webhook_deliveries_webhook_idx").on(table.webhookId),
    eventIdx: index("webhook_deliveries_event_idx").on(table.eventId),
    statusIdx: index("webhook_deliveries_status_idx").on(table.status),
    nextRetryIdx: index("webhook_deliveries_next_retry_idx").on(table.nextRetryAt),
  }),
);

// User Notification Preferences table (Task 11.1)
export const userNotificationPreferences = pgTable(
  "user_notification_preferences",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    notificationType: varchar("notification_type", { length: 50 }).notNull(),
    channels: jsonb("channels").notNull(), // Array of channel names
    enabled: boolean("enabled").notNull().default(true),
    frequency: varchar("frequency", { length: 20 }).notNull().default("immediate"), // immediate, hourly, daily, weekly
    quietHours: jsonb("quiet_hours"), // { enabled, startTime, endTime, timezone }
    filters: jsonb("filters"), // { countries, visaTypes, immigrationTypes, keywords, excludeKeywords }
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("user_notification_preferences_user_idx").on(table.userId),
    typeIdx: index("user_notification_preferences_type_idx").on(table.notificationType),
    enabledIdx: index("user_notification_preferences_enabled_idx").on(table.enabled),
    userTypeIdx: uniqueIndex("user_notification_preferences_user_type_idx").on(
      table.userId,
      table.notificationType,
    ),
  }),
);

// Multi-Channel Deliveries table (Task 11.1)
export const multiChannelDeliveries = pgTable(
  "multi_channel_deliveries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    notificationId: uuid("notification_id").notNull(),
    userId: uuid("user_id").notNull(),
    channels: jsonb("channels").notNull(), // Array of channel delivery status
    aggregatedStatus: varchar("aggregated_status", { length: 20 }).notNull().default("pending"),
    totalChannels: integer("total_channels").notNull(),
    successfulChannels: integer("successful_channels").notNull().default(0),
    failedChannels: integer("failed_channels").notNull().default(0),
    deliveredAt: timestamp("delivered_at"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    notificationIdx: index("multi_channel_deliveries_notification_idx").on(table.notificationId),
    userIdx: index("multi_channel_deliveries_user_idx").on(table.userId),
    statusIdx: index("multi_channel_deliveries_status_idx").on(table.aggregatedStatus),
    createdAtIdx: index("multi_channel_deliveries_created_at_idx").on(table.createdAt),
  }),
);

// Notification Deliveries table (Task 11.1)
export const notificationDeliveries = pgTable(
  "notification_deliveries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    notificationId: uuid("notification_id").notNull(),
    userId: uuid("user_id").notNull(),
    channels: jsonb("channels").notNull(), // Array of delivery results per channel
    totalChannels: integer("total_channels").notNull(),
    successfulChannels: integer("successful_channels").notNull().default(0),
    failedChannels: integer("failed_channels").notNull().default(0),
    deliveredAt: timestamp("delivered_at").notNull().defaultNow(),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    notificationIdx: index("notification_deliveries_notification_idx").on(table.notificationId),
    userIdx: index("notification_deliveries_user_idx").on(table.userId),
    deliveredAtIdx: index("notification_deliveries_delivered_at_idx").on(table.deliveredAt),
  }),
);

// Batch Notification Processing table (Task 11.1)
export const batchNotificationProcessing = pgTable(
  "batch_notification_processing",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    batchId: uuid("batch_id").notNull().unique(),
    policyChangeId: uuid("policy_change_id").notNull(),
    totalUsers: integer("total_users").notNull(),
    processedUsers: integer("processed_users").notNull().default(0),
    successfulNotifications: integer("successful_notifications").notNull().default(0),
    failedNotifications: integer("failed_notifications").notNull().default(0),
    startedAt: timestamp("started_at").notNull().defaultNow(),
    completedAt: timestamp("completed_at"),
    estimatedCompletion: timestamp("estimated_completion"),
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, processing, completed, failed, cancelled
    errors: jsonb("errors"), // Array of error objects
    metadata: jsonb("metadata"),
  },
  (table) => ({
    batchIdx: index("batch_notification_processing_batch_idx").on(table.batchId),
    policyChangeIdx: index("batch_notification_processing_policy_change_idx").on(table.policyChangeId),
    statusIdx: index("batch_notification_processing_status_idx").on(table.status),
    startedAtIdx: index("batch_notification_processing_started_at_idx").on(table.startedAt),
  }),
);

// User Personalization Contexts table (Task 11.1)
export const userPersonalizationContexts = pgTable(
  "user_personalization_contexts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    contextAnalysis: jsonb("context_analysis").notNull(),
    similarityAnalysis: jsonb("similarity_analysis"),
    notificationContext: jsonb("notification_context").notNull(),
    analyzedAt: timestamp("analyzed_at").notNull().defaultNow(),
    expiresAt: timestamp("expires_at").notNull(),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    userIdx: index("user_personalization_contexts_user_idx").on(table.userId),
    analyzedAtIdx: index("user_personalization_contexts_analyzed_at_idx").on(table.analyzedAt),
    expiresAtIdx: index("user_personalization_contexts_expires_at_idx").on(table.expiresAt),
  }),
);

// Personalized Notifications table (Task 11.1)
export const personalizedNotifications = pgTable(
  "personalized_notifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    contextId: uuid("context_id")
      .notNull()
      .references(() => userPersonalizationContexts.id),
    baseNotification: jsonb("base_notification").notNull(),
    personalizedContent: jsonb("personalized_content").notNull(),
    channelVariations: jsonb("channel_variations"),
    relevanceScore: real("relevance_score").notNull(),
    urgencyLevel: varchar("urgency_level", { length: 20 }).notNull(),
    generatedAt: timestamp("generated_at").notNull().defaultNow(),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    userIdx: index("personalized_notifications_user_idx").on(table.userId),
    contextIdx: index("personalized_notifications_context_idx").on(table.contextId),
    relevanceIdx: index("personalized_notifications_relevance_idx").on(table.relevanceScore),
    urgencyIdx: index("personalized_notifications_urgency_idx").on(table.urgencyLevel),
    generatedAtIdx: index("personalized_notifications_generated_at_idx").on(table.generatedAt),
  }),
);

// Notification Timing Optimizations table (Task 11.1)
export const notificationTimingOptimizations = pgTable(
  "notification_timing_optimizations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    contentId: uuid("content_id")
      .notNull()
      .references(() => personalizedNotifications.id),
    timingAnalysis: jsonb("timing_analysis").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    userIdx: index("notification_timing_optimizations_user_idx").on(table.userId),
    contentIdx: index("notification_timing_optimizations_content_idx").on(table.contentId),
    createdAtIdx: index("notification_timing_optimizations_created_at_idx").on(table.createdAt),
  }),
);

// Personalization Performance Tracking table (Task 11.1)
export const personalizationPerformanceTracking = pgTable(
  "personalization_performance_tracking",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    notificationId: uuid("notification_id").notNull(),
    predictedMetrics: jsonb("predicted_metrics").notNull(),
    actualEngagement: jsonb("actual_engagement"),
    performanceAnalysis: jsonb("performance_analysis"),
    trackedAt: timestamp("tracked_at").notNull().defaultNow(),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    userIdx: index("personalization_performance_tracking_user_idx").on(table.userId),
    notificationIdx: index("personalization_performance_tracking_notification_idx").on(table.notificationId),
    trackedAtIdx: index("personalization_performance_tracking_tracked_at_idx").on(table.trackedAt),
  }),
);

// Personalization Model Updates table (Task 11.1)
export const personalizationModelUpdates = pgTable(
  "personalization_model_updates",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    performanceId: uuid("performance_id")
      .notNull()
      .references(() => personalizationPerformanceTracking.id),
    modelUpdates: jsonb("model_updates").notNull(),
    appliedAt: timestamp("applied_at").notNull().defaultNow(),
    status: varchar("status", { length: 20 }).notNull().default("applied"), // applied, reverted, testing
    metadata: jsonb("metadata"),
  },
  (table) => ({
    userIdx: index("personalization_model_updates_user_idx").on(table.userId),
    performanceIdx: index("personalization_model_updates_performance_idx").on(table.performanceId),
    statusIdx: index("personalization_model_updates_status_idx").on(table.status),
    appliedAtIdx: index("personalization_model_updates_applied_at_idx").on(table.appliedAt),
  }),
);

// Preference Optimizations table (Task 11.1)
export const preferenceOptimizations = pgTable(
  "preference_optimizations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    analysisType: varchar("analysis_type", { length: 50 }).notNull(),
    engagementAnalysis: jsonb("engagement_analysis").notNull(),
    similarUsersData: jsonb("similar_users_data"),
    optimizationPlan: jsonb("optimization_plan").notNull(),
    status: varchar("status", { length: 20 }).notNull().default("pending_review"), // pending_review, implemented, partially_implemented, rejected
    implementedChanges: jsonb("implemented_changes"),
    failedChanges: jsonb("failed_changes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    implementedAt: timestamp("implemented_at"),
    metadata: jsonb("metadata"),
  },
  (table) => ({
    userIdx: index("preference_optimizations_user_idx").on(table.userId),
    analysisTypeIdx: index("preference_optimizations_analysis_type_idx").on(table.analysisType),
    statusIdx: index("preference_optimizations_status_idx").on(table.status),
    createdAtIdx: index("preference_optimizations_created_at_idx").on(table.createdAt),
  }),
);

// User Cases table (referenced in personalization)
export const userCases = pgTable(
  "user_cases",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    caseType: varchar("case_type", { length: 100 }).notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    targetCountry: varchar("target_country", { length: 10 }),
    visaType: varchar("visa_type", { length: 50 }),
    currentStage: varchar("current_stage", { length: 100 }),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("user_cases_user_idx").on(table.userId),
    statusIdx: index("user_cases_status_idx").on(table.status),
    countryIdx: index("user_cases_country_idx").on(table.targetCountry),
    createdAtIdx: index("user_cases_created_at_idx").on(table.createdAt),
  }),
);

// Documents table (referenced in personalization)
export const documents = pgTable(
  "documents",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    contentType: varchar("content_type", { length: 100 }),
    fileSize: integer("file_size"),
    source: text("source"),
    metadata: jsonb("metadata"),
    isProcessed: boolean("is_processed").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("documents_user_idx").on(table.userId),
    processedIdx: index("documents_processed_idx").on(table.isProcessed),
    createdAtIdx: index("documents_created_at_idx").on(table.createdAt),
  }),
);

// Firecrawl Jobs table
export const firecrawlJobs = pgTable(
  "firecrawl_jobs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    jobId: varchar("job_id", { length: 255 }).notNull().unique(),
    type: varchar("type", { length: 50 }).notNull(), // scrape, crawl, batch
    config: jsonb("config").notNull(),
    status: varchar("status", { length: 20 }).notNull().default("pending"),
    userId: uuid("user_id").notNull(),
    apiKeyId: uuid("api_key_id")
      .notNull()
      .references(() => apiKeys.id),
    estimatedCredits: integer("estimated_credits").notNull().default(0),
    creditsUsed: integer("credits_used").default(0),
    resultData: jsonb("result_data"),
    error: text("error"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    completedAt: timestamp("completed_at"),
  },
  (table) => ({
    jobIdIdx: uniqueIndex("firecrawl_jobs_job_id_idx").on(table.jobId),
    userIdx: index("firecrawl_jobs_user_idx").on(table.userId),
    apiKeyIdx: index("firecrawl_jobs_api_key_idx").on(table.apiKeyId),
    statusIdx: index("firecrawl_jobs_status_idx").on(table.status),
    createdAtIdx: index("firecrawl_jobs_created_at_idx").on(table.createdAt),
  }),
);

// API Relations
export const apiKeysRelations = relations(apiKeys, ({ many }) => ({
  usageRecords: many(apiUsageRecords),
  firecrawlJobs: many(firecrawlJobs),
}));

export const apiUsageRecordsRelations = relations(apiUsageRecords, ({ one }) => ({
  apiKey: one(apiKeys, {
    fields: [apiUsageRecords.apiKeyId],
    references: [apiKeys.id],
  }),
}));

export const webhooksRelations = relations(webhooks, ({ many }) => ({
  deliveries: many(webhookDeliveries),
}));

export const webhookEventsRelations = relations(webhookEvents, ({ many }) => ({
  deliveries: many(webhookDeliveries),
}));

export const firecrawlJobsRelations = relations(firecrawlJobs, ({ one }) => ({
  apiKey: one(apiKeys, {
    fields: [firecrawlJobs.apiKeyId],
    references: [apiKeys.id],
  }),
}));

// Export schema for Drizzle migrations
export const schema = {
  dataSources,
  collectionResults,
  policyChanges,
  entities,
  relationships,
  communityExperiences,
  communityValidations,
  notifications,
  systemAlerts,
  policyChangeAnalyses,
  userProfiles,
  orchestrationRuns,
  sourceReliabilityAssessments,
  taskExecutions,
  scrapedData,
  dataConflicts,
  expertReviews,
  qualityFeedback,
  validationRules,
  qualityAnalysisResults,
  // API Integration tables
  apiKeys,
  apiUsageRecords,
  webhooks,
  webhookEvents,
  webhookDeliveries,
  firecrawlJobs,
  // Relations
  dataSourcesRelations,
  collectionResultsRelations,
  policyChangesRelations,
  entitiesRelations,
  relationshipsRelations,
  communityExperiencesRelations,
  communityValidationsRelations,
  scrapedDataRelations,
  dataConflictsRelations,
  expertReviewsRelations,
  qualityFeedbackRelations,
  // API Relations
  apiKeysRelations,
  apiUsageRecordsRelations,
  webhooksRelations,
  webhookEventsRelations,
  webhookDeliveriesRelations,
  firecrawlJobsRelations,
} as const;
