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
  // Relations
  dataSourcesRelations,
  collectionResultsRelations,
  policyChangesRelations,
  entitiesRelations,
  relationshipsRelations,
  communityExperiencesRelations,
  communityValidationsRelations,
} as const;
