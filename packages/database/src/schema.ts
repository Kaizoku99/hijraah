/**
 * Database schema definitions
 * This file contains Drizzle schema definitions for Hijraah platform
 */

import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  integer,
  boolean,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enums
export const sessionTypeEnum = pgEnum("session_type", [
  "chat",
  "research",
  "case",
]);
export const sessionStatusEnum = pgEnum("session_status", [
  "active",
  "completed",
  "archived",
]);
export const caseStatusEnum = pgEnum("case_status", [
  "draft",
  "submitted",
  "in_review",
  "approved",
  "rejected",
  "completed",
]);
export const documentStatusEnum = pgEnum("document_status", [
  "pending",
  "verified",
  "rejected",
]);
export const notificationTypeEnum = pgEnum("notification_type", [
  "system",
  "case_update",
  "document_request",
  "message",
]);
export const userRoleEnum = pgEnum("user_role", ["user", "admin", "client"]);
export const analysisStatusEnum = pgEnum("analysis_status", [
  "pending",
  "processing",
  "completed",
  "failed",
]);
export const onboardingJobStatusEnum = pgEnum("onboarding_job_status", [
  "pending",
  "processing",
  "completed",
  "failed",
]);

// Main tables used by application
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  timezone: text("timezone"),
  language: text("language").default("en"),
  countryOfResidence: text("country_of_residence"),
  countryOfInterest: text("country_of_interest"),
  countryOfCitizenship: text("country_of_citizenship"),
  isAdmin: boolean("is_admin").default(false),
  visaType: text("visa_type"),
  immigrationGoals: jsonb("immigration_goals").default(sql`'[]'::jsonb`),
  role: userRoleEnum("role").default("client"),
  // Intelligent onboarding fields
  emailDomain: text("email_domain"),
  companyAnalysisId: uuid("company_analysis_id"),
  onboardingCompletedAt: timestamp("onboarding_completed_at", {
    withTimezone: true,
  }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const cases = pgTable("cases", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: caseStatusEnum("status").notNull().default("draft"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  title: text("title"),
  context: text("context"),
  prompt: text("prompt"),
  model: text("model"),
  systemPrompt: text("system_prompt"),
  agentConfig: jsonb("agent_config").default(sql`'{}'::jsonb`),
  caseId: uuid("case_id"),
  lastMessageAt: timestamp("last_message_at", {
    withTimezone: true,
  }).defaultNow(),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  visibility: text("visibility").notNull().default("private"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id").notNull(),
  userId: uuid("user_id"),
  role: text("role").notNull(),
  content: text("content").notNull(),
  sources: jsonb("sources"),
  toolCalls: jsonb("tool_calls"),
  metadata: jsonb("metadata").default(sql`'{}'`),
  tokens: integer("tokens"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  filename: text("filename").notNull(),
  filePath: text("file_path").notNull(),
  fileType: text("file_type"),
  fileSize: integer("file_size"),
  content: text("content"),
  title: text("title").notNull(),
  status: text("status").notNull().default("uploading"),
  classification: jsonb("classification"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const researchSessions = pgTable("research_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  query: text("query").notNull(),
  status: text("status").notNull().default("pending"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const researchSources = pgTable("research_sources", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id").notNull(),
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  content: text("content"),
  relevance: integer("relevance"),
  credibilityScore: integer("credibility_score"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const deepResearchSessions = pgTable("deep_research_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  query: text("query").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const kgEntities = pgTable("kg_entities", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  properties: jsonb("properties").default(sql`'{}'::jsonb`),
  embedding: text("embedding"), // For vector embeddings
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const scrapeConfigurations = pgTable("scrape_configurations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  baseUrl: text("base_url").notNull(),
  sourceType: text("source_type").notNull(),
  countryCode: text("country_code"),
  extractionSchema: jsonb("extraction_schema"),
  firecrawlParams: jsonb("firecrawl_params"),
  schedule: text("schedule"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const scrapedSources = pgTable("scraped_sources", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url").notNull(),
  title: text("title"),
  sourceType: text("source_type").notNull(),
  countryCode: text("country_code"),
  autoragIndexed: boolean("autorag_indexed").default(false),
  lastScrapedAt: timestamp("last_scraped_at", {
    withTimezone: true,
  }).defaultNow(),
  contentHash: text("content_hash"),
  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  markdownContent: text("markdown_content"),
  htmlContent: text("html_content"),
  extractedData: jsonb("extracted_data"),
  pageStatusCode: integer("page_status_code"),
  firecrawlJobId: text("firecrawl_job_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Legacy/compatibility tables - these don't exist in the real schema but are expected by code
export const artifacts = pgTable("artifacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const artifactMessages = pgTable("artifact_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  artifactId: uuid("artifact_id").notNull(),
  role: text("role").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  archived: boolean("archived").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const documentTemplates = pgTable("document_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  countries: jsonb("countries"),
  fields: jsonb("fields"),
  sections: jsonb("sections"),
  validations: jsonb("validations"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventType: text("event_type").notNull(),
  userId: uuid("user_id"),
  sessionId: text("session_id"),
  properties: jsonb("properties").default(sql`'{}'::jsonb`),
  timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow(),
});

// AI Chatbot compatibility table for guest users
export const aiChatbotUser = pgTable("ai_chatbot_user", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  password: text("password"), // Nullable for guest users
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Web indexes table for storing web scraping results
export const webIndexes = pgTable("web_indexes", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  url: text("url").notNull(),
  title: text("title"),
  content: text("content"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Crawl jobs table for tracking web scraping jobs
export const crawlJobs = pgTable("crawl_jobs", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  url: text("url").notNull(),
  status: text("status").default("pending"), // 'pending', 'running', 'completed', 'failed'
  results: jsonb("results"),
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Intelligent onboarding tables
export const companyAnalyses = pgTable("company_analyses", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  domain: text("domain").notNull().unique(),
  companyName: text("company_name"),
  industry: text("industry"),
  companySize: text("company_size"),
  description: text("description"),
  country: text("country"),
  websiteContent: jsonb("website_content"), // Raw Firecrawl scraped content
  firecrawlMetadata: jsonb("firecrawl_metadata"), // Firecrawl response metadata
  analysisResult: jsonb("analysis_result"), // LLM analysis results
  status: analysisStatusEnum("status").notNull().default("pending"),
  errorMessage: text("error_message"),
  processedAt: timestamp("processed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const personalizedOnboarding = pgTable("personalized_onboarding", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid("user_id").notNull(),
  companyAnalysisId: uuid("company_analysis_id"),

  // AI-generated personalized content
  keywords: jsonb("keywords").default(sql`'[]'::jsonb`), // Array of relevant keywords
  demoSettings: jsonb("demo_settings").default(sql`'{}'::jsonb`), // Demo project configuration
  configuration: jsonb("configuration").default(sql`'{}'::jsonb`), // Service configuration

  // Immigration-specific recommendations
  recommendedVisaTypes: jsonb("recommended_visa_types").default(
    sql`'[]'::jsonb`
  ),
  priorityCountries: jsonb("priority_countries").default(sql`'[]'::jsonb`),
  suggestedDocuments: jsonb("suggested_documents").default(sql`'[]'::jsonb`),
  industryInsights: jsonb("industry_insights").default(sql`'{}'::jsonb`),

  // AI analysis metadata
  confidenceScore: text("confidence_score").default("0.0"), // Using text for DECIMAL compatibility
  generationModel: text("generation_model").default("gpt-4"),
  promptVersion: text("prompt_version").default("v1.0"),

  status: analysisStatusEnum("status").notNull().default("pending"),
  generatedAt: timestamp("generated_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const onboardingJobs = pgTable("onboarding_jobs", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid("user_id").notNull(),
  email: text("email").notNull(),
  emailDomain: text("email_domain").notNull(),

  jobType: text("job_type").notNull().default("intelligent_onboarding"),
  status: onboardingJobStatusEnum("status").notNull().default("pending"),

  // Processing steps tracking
  stepsCompleted: jsonb("steps_completed").default(sql`'[]'::jsonb`),
  currentStep: text("current_step"),
  totalSteps: integer("total_steps").default(4),

  // Results and metadata
  companyAnalysisId: uuid("company_analysis_id"),
  personalizedOnboardingId: uuid("personalized_onboarding_id"),

  errorMessage: text("error_message"),
  startedAt: timestamp("started_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const schemas = {
  profiles,
  adminUsers,
  cases,
  chatSessions,
  chatMessages,
  documents,
  researchSessions,
  researchSources,
  deepResearchSessions,
  kgEntities,
  scrapeConfigurations,
  scrapedSources,
  artifacts,
  artifactMessages,
  conversations,
  messages,
  documentTemplates,
  analyticsEvents,
  aiChatbotUser,
  webIndexes,
  crawlJobs,
  companyAnalyses,
  personalizedOnboarding,
  onboardingJobs,
} as const;

// Export schema types
export type SchemaType = typeof schemas;

// Export individual table types for convenience
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = typeof profiles.$inferInsert;

export type Case = typeof cases.$inferSelect;
export type InsertCase = typeof cases.$inferInsert;

export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = typeof chatSessions.$inferInsert;

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;

export type ResearchSession = typeof researchSessions.$inferSelect;
export type InsertResearchSession = typeof researchSessions.$inferInsert;

export type WebIndex = typeof webIndexes.$inferSelect;
export type InsertWebIndex = typeof webIndexes.$inferInsert;

export type CrawlJob = typeof crawlJobs.$inferSelect;
export type InsertCrawlJob = typeof crawlJobs.$inferInsert;

// Intelligent onboarding types
export type CompanyAnalysis = typeof companyAnalyses.$inferSelect;
export type InsertCompanyAnalysis = typeof companyAnalyses.$inferInsert;

export type PersonalizedOnboarding = typeof personalizedOnboarding.$inferSelect;
export type InsertPersonalizedOnboarding =
  typeof personalizedOnboarding.$inferInsert;

export type OnboardingJob = typeof onboardingJobs.$inferSelect;
export type InsertOnboardingJob = typeof onboardingJobs.$inferInsert;
