import {
  pgTable,
  pgSchema,
  uuid,
  text,
  timestamp,
  jsonb,
  boolean,
  integer,
  serial,
  varchar,
  unique,
  index,
  primaryKey,
  pgEnum,
  numeric,
  AnyPgColumn,
  foreignKey,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { vector } from "pgvector/drizzle-orm";

// ===== SCHEMA ORGANIZATION (Context7 Best Practice) =====
// Note: public schema is the default, no need to define it explicitly
export const authSchema = pgSchema("auth");
export const apiSchema = pgSchema("api");

// ===== ENUMS =====
export const visibilityEnum = pgEnum("visibility", [
  "private",
  "public",
  "shared",
]);
export const roleEnum = pgEnum("role", ["system", "user", "assistant", "tool"]);
export const voteTypeEnum = pgEnum("vote_type", ["up", "down"]);
export const statusEnum = pgEnum("status", [
  "pending",
  "processing",
  "completed",
  "failed",
  "cancelled",
]);

export const artifactTypeEnum = pgEnum("artifact_type", [
  "code",
  "text",
  "image",
  "sheet",
  "chart",
  "diagram",
]);

export const dataTypeEnum = pgEnum("data_type", [
  "chat_messages",
  "documents",
  "document_chunks",
  "artifacts",
  "user_data",
  "search_history",
]);

// ===== AI-CHATBOT COMPATIBILITY TABLES =====

// User table for ai-chatbot compatibility
export const aiChatbotUser = pgTable("User", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull().unique(),
  password: varchar("password", { length: 64 }), // For guest users
});

export type AIChatbotUser = typeof aiChatbotUser.$inferSelect;

// Chat table for ai-chatbot compatibility
export const aiChatbotChat = pgTable(
  "Chat",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    title: text("title").notNull(),
    userId: uuid("userId")
      .notNull()
      .references(() => aiChatbotUser.id, { onDelete: "cascade" }),
    visibility: varchar("visibility", {
      enum: ["public", "private"],
    })
      .notNull()
      .default("private"),
  },
  (table) => ({
    userIdIndex: index("idx_chat_user_id").on(table.userId),
    visibilityIndex: index("idx_chat_visibility").on(table.visibility),
  }),
);

export type AIChatbotChat = typeof aiChatbotChat.$inferSelect;

// Legacy Message table (deprecated in ai-chatbot)
export const aiChatbotMessage = pgTable(
  "Message",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    chatId: uuid("chatId")
      .notNull()
      .references(() => aiChatbotChat.id, { onDelete: "cascade" }),
    role: varchar("role").notNull(),
    content: jsonb("content").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    chatIdIndex: index("idx_message_chat_id").on(table.chatId),
    roleIndex: index("idx_message_role").on(table.role),
  }),
);

export type AIChatbotMessage = typeof aiChatbotMessage.$inferSelect;

// Modern Message_v2 table
export const aiChatbotMessageV2 = pgTable(
  "Message_v2",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    chatId: uuid("chatId")
      .notNull()
      .references(() => aiChatbotChat.id, { onDelete: "cascade" }),
    role: varchar("role").notNull(),
    parts: jsonb("parts").notNull().default([]),
    attachments: jsonb("attachments").notNull().default([]),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    chatIdIndex: index("idx_message_v2_chat_id").on(table.chatId),
    roleIndex: index("idx_message_v2_role").on(table.role),
  }),
);

export type AIChatbotMessageV2 = typeof aiChatbotMessageV2.$inferSelect;

// Legacy Vote table
export const aiChatbotVote = pgTable(
  "Vote",
  {
    chatId: uuid("chatId")
      .notNull()
      .references(() => aiChatbotChat.id, { onDelete: "cascade" }),
    messageId: uuid("messageId")
      .notNull()
      .references(() => aiChatbotMessage.id, { onDelete: "cascade" }),
    isUpvoted: boolean("isUpvoted").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.chatId, table.messageId] }),
    chatIdIndex: index("idx_vote_chat_id").on(table.chatId),
    messageIdIndex: index("idx_vote_message_id").on(table.messageId),
  }),
);

export type AIChatbotVote = typeof aiChatbotVote.$inferSelect;

// Modern Vote_v2 table
export const aiChatbotVoteV2 = pgTable(
  "Vote_v2",
  {
    chatId: uuid("chatId")
      .notNull()
      .references(() => aiChatbotChat.id, { onDelete: "cascade" }),
    messageId: uuid("messageId")
      .notNull()
      .references(() => aiChatbotMessageV2.id, { onDelete: "cascade" }),
    isUpvoted: boolean("isUpvoted").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.chatId, table.messageId] }),
    chatIdIndex: index("idx_vote_v2_chat_id").on(table.chatId),
    messageIdIndex: index("idx_vote_v2_message_id").on(table.messageId),
  }),
);

export type AIChatbotVoteV2 = typeof aiChatbotVoteV2.$inferSelect;

// Document table for artifacts (with compound primary key)
export const aiChatbotDocument = pgTable(
  "Document",
  {
    id: uuid("id").notNull().defaultRandom(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    title: text("title").notNull(),
    content: text("content"),
    kind: varchar("kind", {
      enum: ["text", "code", "image", "sheet"],
    })
      .notNull()
      .default("text"),
    userId: uuid("userId")
      .notNull()
      .references(() => aiChatbotUser.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id, table.createdAt] }),
    userIdIndex: index("idx_document_user_id").on(table.userId),
    kindIndex: index("idx_document_kind").on(table.kind),
  }),
);

export type AIChatbotDocument = typeof aiChatbotDocument.$inferSelect;

// Suggestion table for document collaboration
export const aiChatbotSuggestion = pgTable(
  "Suggestion",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    documentId: uuid("documentId").notNull(),
    documentCreatedAt: timestamp("documentCreatedAt").notNull(),
    originalText: text("originalText").notNull(),
    suggestedText: text("suggestedText").notNull(),
    description: text("description"),
    isResolved: boolean("isResolved").notNull().default(false),
    userId: uuid("userId")
      .notNull()
      .references(() => aiChatbotUser.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    documentRef: foreignKey({
      columns: [table.documentId, table.documentCreatedAt],
      foreignColumns: [aiChatbotDocument.id, aiChatbotDocument.createdAt],
    }),
    userIdIndex: index("idx_suggestion_user_id").on(table.userId),
    documentIndex: index("idx_suggestion_document").on(
      table.documentId,
      table.documentCreatedAt,
    ),
  }),
);

export type AIChatbotSuggestion = typeof aiChatbotSuggestion.$inferSelect;

// Stream table for resumable streams
export const aiChatbotStream = pgTable(
  "Stream",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    chatId: uuid("chatId").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    chatRef: foreignKey({
      columns: [table.chatId],
      foreignColumns: [aiChatbotChat.id],
    }),
    chatIdIndex: index("idx_stream_chat_id").on(table.chatId),
  }),
);

export type AIChatbotStream = typeof aiChatbotStream.$inferSelect;

// ===== USERS & AUTH TABLES =====
// Note: auth.users table is managed by Supabase Auth, we reference it via UUID

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().unique(),
    email: text("email").unique(),
    fullName: text("full_name"),
    avatarUrl: text("avatar_url"),
    locale: varchar("locale", { length: 10 }).default("en"),
    timezone: varchar("timezone", { length: 50 }).default("UTC"),
    preferences: jsonb("preferences")
      .$type<{
        theme?: "light" | "dark" | "system";
        notifications?: boolean;
        aiModel?: string;
        language?: string;
      }>()
      .default({}),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    userIdIndex: index("profiles_user_id_idx").on(table.userId),
    emailIndex: index("profiles_email_idx").on(table.email),
  }),
);

// ===== WEB INDEXES (FIRESTARTER) =====
export const webIndexes = pgTable(
  "web_indexes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    url: text("url").notNull(),
    namespace: varchar("namespace", { length: 255 }).notNull(),
    title: text("title"),
    description: text("description"),
    pagesCrawled: integer("pages_crawled").default(0),
    totalPages: integer("total_pages"),
    lastCrawlDuration: integer("last_crawl_duration"), // in seconds
    estimatedCost: numeric("estimated_cost", {
      precision: 10,
      scale: 4,
    }).default("0"),
    metadata: jsonb("metadata")
      .$type<{
        crawlDepth?: number;
        includePatterns?: string[];
        excludePatterns?: string[];
        headers?: Record<string, string>;
      }>()
      .default({}),
    crawlConfig: jsonb("crawl_config")
      .$type<{
        maxPages?: number;
        respectRobotsTxt?: boolean;
        delay?: number;
        concurrent?: number;
      }>()
      .default({}),
    isActive: boolean("is_active").default(true),
    isPublic: boolean("is_public").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
    lastCrawledAt: timestamp("last_crawled_at"),
  },
  (table) => ({
    userNamespaceUnique: unique().on(table.userId, table.namespace),
    urlIndex: index("web_indexes_url_idx").on(table.url),
    userIdIndex: index("web_indexes_user_id_idx").on(table.userId),
    isActiveIndex: index("web_indexes_is_active_idx").on(table.isActive),
    namespaceTrgmIndex: index("web_indexes_namespace_trgm_idx").using(
      "gin",
      sql`namespace gin_trgm_ops`,
    ),
  }),
);

export const crawlJobs = pgTable(
  "crawl_jobs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    webIndexId: uuid("web_index_id")
      .notNull()
      .references(() => webIndexes.id, { onDelete: "cascade" }),
    status: statusEnum("status").default("pending").notNull(),
    firecrawlJobId: text("firecrawl_job_id"),
    startedAt: timestamp("started_at"),
    completedAt: timestamp("completed_at"),
    errorMessage: text("error_message"),
    pagesProcessed: integer("pages_processed").default(0),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    webIndexIdIndex: index("crawl_jobs_web_index_id_idx").on(table.webIndexId),
    statusIndex: index("crawl_jobs_status_idx").on(table.status),
  }),
);

// ===== CHAT SYSTEM (UNIFIED AI-CHATBOT + EXISTING) =====
export const chatSessions = pgTable(
  "chat_sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    title: text("title"),
    visibility: visibilityEnum("visibility").default("private").notNull(),
    model: varchar("model", { length: 50 }).default("gpt-4o"),
    systemPrompt: text("system_prompt"),
    webIndexId: uuid("web_index_id").references(() => webIndexes.id, {
      onDelete: "set null",
    }),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIndex: index("chat_sessions_user_id_idx").on(table.userId),
    webIndexIdIndex: index("chat_sessions_web_index_id_idx").on(
      table.webIndexId,
    ),
  }),
);

export const chatMessages = pgTable(
  "chat_messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    chatId: uuid("chat_id")
      .notNull()
      .references(() => chatSessions.id, { onDelete: "cascade" }),
    role: roleEnum("role").notNull(),
    content: text("content").notNull(),
    toolCalls: jsonb("tool_calls").default([]),
    attachments: jsonb("attachments").default([]),
    artifacts: jsonb("artifacts").default([]),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    chatIdIndex: index("chat_messages_chat_id_idx").on(table.chatId),
    roleIndex: index("chat_messages_role_idx").on(table.role),
  }),
);

export const chatMessageVotes = pgTable(
  "chat_message_votes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    messageId: uuid("message_id")
      .notNull()
      .references(() => chatMessages.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(),
    voteType: voteTypeEnum("vote_type").notNull(),
    feedback: text("feedback"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    messageUserUnique: unique().on(table.messageId, table.userId),
    messageIdIndex: index("chat_message_votes_message_id_idx").on(
      table.messageId,
    ),
  }),
);

// ===== ARTIFACTS (EXTENDED FOR AI-CHATBOT) =====
export const artifacts = pgTable(
  "artifacts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    messageId: uuid("message_id").references(() => chatMessages.id, {
      onDelete: "cascade",
    }),
    userId: uuid("user_id").notNull(),
    title: text("title").notNull(),
    type: varchar("type", { length: 50 }).notNull(), // 'code', 'text', 'image', 'sheet'
    language: varchar("language", { length: 50 }), // for code artifacts
    content: text("content").notNull(),
    metadata: jsonb("metadata").default({}),
    isPublic: boolean("is_public").default(false),
    version: integer("version").default(1),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIndex: index("artifacts_user_id_idx").on(table.userId),
    typeIndex: index("artifacts_type_idx").on(table.type),
    messageIdIndex: index("artifacts_message_id_idx").on(table.messageId),
  }),
);

// ===== SUGGESTIONS =====
export const suggestions = pgTable(
  "suggestions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    chatId: uuid("chat_id").references(() => chatSessions.id, {
      onDelete: "cascade",
    }),
    messageId: uuid("message_id").references(() => chatMessages.id, {
      onDelete: "cascade",
    }),
    content: text("content").notNull(),
    isUsed: boolean("is_used").default(false),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    chatIdIndex: index("suggestions_chat_id_idx").on(table.chatId),
    messageIdIndex: index("suggestions_message_id_idx").on(table.messageId),
  }),
);

// ===== STREAMS =====
export const streams = pgTable(
  "streams",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    chatId: uuid("chat_id")
      .notNull()
      .references(() => chatSessions.id, { onDelete: "cascade" }),
    content: text("content"),
    isFinished: boolean("is_finished").default(false),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    chatIdIndex: index("streams_chat_id_idx").on(table.chatId),
  }),
);

// ===== UPSTASH CACHE METADATA =====
export const upstashCacheMeta = pgTable(
  "upstash_cache_meta",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    cacheKey: text("cache_key").notNull().unique(),
    namespace: varchar("namespace", { length: 100 }).notNull(),
    size: integer("size"),
    ttl: integer("ttl"), // time to live in seconds
    hitCount: integer("hit_count").default(0),
    lastAccessed: timestamp("last_accessed").defaultNow(),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    cacheKeyIndex: index("upstash_cache_meta_cache_key_idx").on(table.cacheKey),
    namespaceIndex: index("upstash_cache_meta_namespace_idx").on(
      table.namespace,
    ),
  }),
);

// ===== DOCUMENT STORAGE =====
export const documents = pgTable(
  "documents",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    webIndexId: uuid("web_index_id").references(() => webIndexes.id, {
      onDelete: "cascade",
    }),
    title: text("title").notNull(),
    content: text("content").notNull(),
    contentType: varchar("content_type", { length: 100 }).default("text/plain"),
    fileSize: integer("file_size"),
    checksum: varchar("checksum", { length: 64 }),
    source: text("source"), // URL or file path
    metadata: jsonb("metadata").default({}),
    isProcessed: boolean("is_processed").default(false),
    vectorId: text("vector_id"), // Reference to vector database
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIndex: index("documents_user_id_idx").on(table.userId),
    webIndexIdIndex: index("documents_web_index_id_idx").on(table.webIndexId),
    sourceIndex: index("documents_source_idx").on(table.source),
    checksumIndex: index("documents_checksum_idx").on(table.checksum),
  }),
);

// ===== DOCUMENT CHUNKS =====
export const documentChunksEnhanced = pgTable(
  "document_chunks_enhanced",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    documentId: uuid("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),
    chunkIndex: integer("chunk_index").notNull(),
    textContent: text("text_content").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }),
    tokenCount: integer("token_count"),
    entities: jsonb("entities").default([]),
    keyPhrases: jsonb("key_phrases").default([]),
    language: varchar("language", { length: 10 }).default("en"),
    chunkMetadata: jsonb("chunk_metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    documentIdIndex: index("idx_chunks_enhanced_document_id").on(
      table.documentId,
    ),
    documentChunkUnique: unique().on(table.documentId, table.chunkIndex),
  }),
);

// ===== COMMUNITY DATA =====
export const communityExperiences = pgTable(
  "community_experiences",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    pathway: varchar("pathway", { length: 100 }).notNull(),
    targetCountry: varchar("target_country", { length: 3 }).notNull(), // ISO country code
    milestone: varchar("milestone", { length: 100 }).notNull(),
    actualTimeline: integer("actual_timeline").notNull(), // days
    actualCost: numeric("actual_cost", { precision: 10, scale: 2 }).notNull(),
    difficulty: integer("difficulty").notNull(), // 1-10 scale
    success: boolean("success").notNull(),
    feedback: text("feedback").notNull(),
    verificationStatus: varchar("verification_status", { length: 20 })
      .default("pending")
      .notNull(), // pending, verified, disputed
    qualityScore: numeric("quality_score", { precision: 3, scale: 2 }), // 0-1
    metadata: jsonb("metadata").default({}),
    submittedAt: timestamp("submitted_at").defaultNow().notNull(),
    verifiedAt: timestamp("verified_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIndex: index("community_experiences_user_id_idx").on(table.userId),
    pathwayIndex: index("community_experiences_pathway_idx").on(table.pathway),
    countryIndex: index("community_experiences_country_idx").on(table.targetCountry),
    milestoneIndex: index("community_experiences_milestone_idx").on(table.milestone),
    verificationStatusIndex: index("community_experiences_verification_status_idx").on(table.verificationStatus),
    successIndex: index("community_experiences_success_idx").on(table.success),
  }),
);

export const communityValidations = pgTable(
  "community_validations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    experienceId: uuid("experience_id")
      .notNull()
      .references(() => communityExperiences.id, { onDelete: "cascade" }),
    validatorUserId: uuid("validator_user_id").notNull(),
    validationType: varchar("validation_type", { length: 20 }).notNull(), // peer_review, expert_review, automated
    score: numeric("score", { precision: 3, scale: 2 }).notNull(), // 0-1
    feedback: text("feedback"),
    confidence: numeric("confidence", { precision: 3, scale: 2 }).notNull(), // 0-1
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    experienceIdIndex: index("community_validations_experience_id_idx").on(table.experienceId),
    validatorIndex: index("community_validations_validator_idx").on(table.validatorUserId),
    typeIndex: index("community_validations_type_idx").on(table.validationType),
  }),
);

export const userReputations = pgTable(
  "user_reputations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().unique(),
    overallScore: numeric("overall_score", { precision: 5, scale: 2 }).default("0").notNull(), // 0-100
    level: varchar("level", { length: 20 }).default("novice").notNull(), // novice, contributor, expert, authority
    accuracyScore: numeric("accuracy_score", { precision: 3, scale: 2 }).default("0").notNull(), // 0-1
    completenessScore: numeric("completeness_score", { precision: 3, scale: 2 }).default("0").notNull(), // 0-1
    consistencyScore: numeric("consistency_score", { precision: 3, scale: 2 }).default("0").notNull(), // 0-1
    helpfulnessScore: numeric("helpfulness_score", { precision: 3, scale: 2 }).default("0").notNull(), // 0-1
    contributionsCount: integer("contributions_count").default(0).notNull(),
    validationsCount: integer("validations_count").default(0).notNull(),
    lastCalculatedAt: timestamp("last_calculated_at").defaultNow().notNull(),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIndex: index("user_reputations_user_id_idx").on(table.userId),
    levelIndex: index("user_reputations_level_idx").on(table.level),
    overallScoreIndex: index("user_reputations_overall_score_idx").on(table.overallScore),
  }),
);

export const gamificationRewards = pgTable(
  "gamification_rewards",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    rewardType: varchar("reward_type", { length: 50 }).notNull(), // badge, points, level_up, achievement
    rewardName: varchar("reward_name", { length: 100 }).notNull(),
    description: text("description"),
    points: integer("points").default(0),
    metadata: jsonb("metadata").default({}),
    earnedAt: timestamp("earned_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIndex: index("gamification_rewards_user_id_idx").on(table.userId),
    typeIndex: index("gamification_rewards_type_idx").on(table.rewardType),
    earnedAtIndex: index("gamification_rewards_earned_at_idx").on(table.earnedAt),
  }),
);

export const peerReviewOrchestrations = pgTable(
  "peer_review_orchestrations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    experienceId: uuid("experience_id")
      .notNull()
      .references(() => communityExperiences.id, { onDelete: "cascade" }),
    reason: varchar("reason", { length: 100 }).notNull(),
    priority: varchar("priority", { length: 10 }).notNull(), // low, medium, high
    reviewersRequested: jsonb("reviewers_requested").notNull().default([]), // Array of user IDs
    status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, in_progress, completed, expired
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    experienceIdIndex: index("peer_review_orchestrations_experience_id_idx").on(table.experienceId),
    statusIndex: index("peer_review_orchestrations_status_idx").on(table.status),
    priorityIndex: index("peer_review_orchestrations_priority_idx").on(table.priority),
  }),
);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    type: varchar("type", { length: 50 }).notNull(), // milestone_reminder, validation_request, reward_earned, peer_review_request
    title: varchar("title", { length: 200 }).notNull(),
    message: text("message").notNull(),
    actionUrl: text("action_url"),
    priority: varchar("priority", { length: 10 }).default("medium").notNull(), // low, medium, high
    isRead: boolean("is_read").default(false).notNull(),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    readAt: timestamp("read_at"),
  },
  (table) => ({
    userIdIndex: index("notifications_user_id_idx").on(table.userId),
    typeIndex: index("notifications_type_idx").on(table.type),
    isReadIndex: index("notifications_is_read_idx").on(table.isRead),
    priorityIndex: index("notifications_priority_idx").on(table.priority),
    createdAtIndex: index("notifications_created_at_idx").on(table.createdAt),
  }),
);

// ===== KNOWLEDGE GRAPH =====
export const entities = pgTable(
  "entities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    type: varchar("type", { length: 50 }).notNull(),
    description: text("description"),
    properties: jsonb("properties").default({}),
    documentIds: jsonb("document_ids").default([]), // Array of document IDs
    confidence: integer("confidence").default(0), // 0-100
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    nameIndex: index("entities_name_idx").on(table.name),
    typeIndex: index("entities_type_idx").on(table.type),
  }),
);

export const relationships = pgTable(
  "relationships",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => entities.id, { onDelete: "cascade" }),
    targetId: uuid("target_id")
      .notNull()
      .references(() => entities.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 50 }).notNull(),
    properties: jsonb("properties").default({}),
    strength: integer("strength").default(0), // 0-100
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    sourceIdIndex: index("relationships_source_id_idx").on(table.sourceId),
    targetIdIndex: index("relationships_target_id_idx").on(table.targetId),
    typeIndex: index("relationships_type_idx").on(table.type),
  }),
);

// ===== PRIVACY & GDPR COMPLIANCE =====
export const dataRetentionPolicies = pgTable(
  "data_retention_policies",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    dataType: varchar("data_type", { length: 50 }).notNull(),
    retentionDays: integer("retention_days").default(90),
    autoDelete: boolean("auto_delete").default(true),
    lastCleanup: timestamp("last_cleanup"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIndex: index("data_retention_policies_user_id_idx").on(table.userId),
    dataTypeIndex: index("data_retention_policies_data_type_idx").on(
      table.dataType,
    ),
  }),
);

// ===== AI-CHATBOT RELATIONS =====
export const aiChatbotUserRelations = relations(aiChatbotUser, ({ many }) => ({
  chats: many(aiChatbotChat),
  documents: many(aiChatbotDocument),
  suggestions: many(aiChatbotSuggestion),
}));

export const aiChatbotChatRelations = relations(
  aiChatbotChat,
  ({ one, many }) => ({
    user: one(aiChatbotUser, {
      fields: [aiChatbotChat.userId],
      references: [aiChatbotUser.id],
    }),
    messages: many(aiChatbotMessage),
    messagesV2: many(aiChatbotMessageV2),
    votes: many(aiChatbotVote),
    votesV2: many(aiChatbotVoteV2),
    streams: many(aiChatbotStream),
  }),
);

export const aiChatbotMessageRelations = relations(
  aiChatbotMessage,
  ({ one, many }) => ({
    chat: one(aiChatbotChat, {
      fields: [aiChatbotMessage.chatId],
      references: [aiChatbotChat.id],
    }),
    votes: many(aiChatbotVote),
  }),
);

export const aiChatbotMessageV2Relations = relations(
  aiChatbotMessageV2,
  ({ one, many }) => ({
    chat: one(aiChatbotChat, {
      fields: [aiChatbotMessageV2.chatId],
      references: [aiChatbotChat.id],
    }),
    votes: many(aiChatbotVoteV2),
  }),
);

export const aiChatbotDocumentRelations = relations(
  aiChatbotDocument,
  ({ one, many }) => ({
    user: one(aiChatbotUser, {
      fields: [aiChatbotDocument.userId],
      references: [aiChatbotUser.id],
    }),
    suggestions: many(aiChatbotSuggestion),
  }),
);

export const aiChatbotSuggestionRelations = relations(
  aiChatbotSuggestion,
  ({ one }) => ({
    user: one(aiChatbotUser, {
      fields: [aiChatbotSuggestion.userId],
      references: [aiChatbotUser.id],
    }),
    document: one(aiChatbotDocument, {
      fields: [
        aiChatbotSuggestion.documentId,
        aiChatbotSuggestion.documentCreatedAt,
      ],
      references: [aiChatbotDocument.id, aiChatbotDocument.createdAt],
    }),
  }),
);

export const aiChatbotStreamRelations = relations(
  aiChatbotStream,
  ({ one }) => ({
    chat: one(aiChatbotChat, {
      fields: [aiChatbotStream.chatId],
      references: [aiChatbotChat.id],
    }),
  }),
);

// ===== EXISTING RELATIONS =====
export const webIndexesRelations = relations(webIndexes, ({ many, one }) => ({
  crawlJobs: many(crawlJobs),
  chatSessions: many(chatSessions),
  documents: many(documents),
}));

export const crawlJobsRelations = relations(crawlJobs, ({ one }) => ({
  webIndex: one(webIndexes, {
    fields: [crawlJobs.webIndexId],
    references: [webIndexes.id],
  }),
}));

export const chatSessionsRelations = relations(
  chatSessions,
  ({ many, one }) => ({
    messages: many(chatMessages),
    suggestions: many(suggestions),
    streams: many(streams),
    webIndex: one(webIndexes, {
      fields: [chatSessions.webIndexId],
      references: [webIndexes.id],
    }),
  }),
);

export const chatMessagesRelations = relations(
  chatMessages,
  ({ one, many }) => ({
    chatSession: one(chatSessions, {
      fields: [chatMessages.chatId],
      references: [chatSessions.id],
    }),
    votes: many(chatMessageVotes),
    artifacts: many(artifacts),
    suggestions: many(suggestions),
  }),
);

export const artifactsRelations = relations(artifacts, ({ one }) => ({
  message: one(chatMessages, {
    fields: [artifacts.messageId],
    references: [chatMessages.id],
  }),
}));

export const documentsRelations = relations(documents, ({ one, many }) => ({
  webIndex: one(webIndexes, {
    fields: [documents.webIndexId],
    references: [webIndexes.id],
  }),
  documentChunks: many(documentChunksEnhanced),
}));

export const documentChunksEnhancedRelations = relations(
  documentChunksEnhanced,
  ({ one }) => ({
    document: one(documents, {
      fields: [documentChunksEnhanced.documentId],
      references: [documents.id],
    }),
  }),
);

export const communityExperiencesRelations = relations(
  communityExperiences,
  ({ many }) => ({
    validations: many(communityValidations),
  }),
);

export const communityValidationsRelations = relations(
  communityValidations,
  ({ one }) => ({
    experience: one(communityExperiences, {
      fields: [communityValidations.experienceId],
      references: [communityExperiences.id],
    }),
  }),
);

export const userReputationsRelations = relations(userReputations, ({ many }) => ({
  rewards: many(gamificationRewards),
}));

export const gamificationRewardsRelations = relations(
  gamificationRewards,
  ({ one }) => ({
    userReputation: one(userReputations, {
      fields: [gamificationRewards.userId],
      references: [userReputations.userId],
    }),
  }),
);

export const peerReviewOrchestrationsRelations = relations(
  peerReviewOrchestrations,
  ({ one }) => ({
    experience: one(communityExperiences, {
      fields: [peerReviewOrchestrations.experienceId],
      references: [communityExperiences.id],
    }),
  }),
);

export const notificationsRelations = relations(notifications, ({ one }) => ({
  // No direct relations needed for notifications
}));

export const entitiesRelations = relations(entities, ({ many }) => ({
  sourceRelationships: many(relationships, { relationName: "source" }),
  targetRelationships: many(relationships, { relationName: "target" }),
}));

export const relationshipsRelations = relations(relationships, ({ one }) => ({
  source: one(entities, {
    fields: [relationships.sourceId],
    references: [entities.id],
    relationName: "source",
  }),
  target: one(entities, {
    fields: [relationships.targetId],
    references: [entities.id],
    relationName: "target",
  }),
}));

// ===== EXPORT TYPES FOR CONTEXT7 COMPATIBILITY =====

// Main Hijraah types
export type Profile = typeof profiles.$inferSelect;
export type WebIndex = typeof webIndexes.$inferSelect;
export type CrawlJob = typeof crawlJobs.$inferSelect;
export type ChatSession = typeof chatSessions.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type ChatMessageVote = typeof chatMessageVotes.$inferSelect;
export type Artifact = typeof artifacts.$inferSelect;
export type Suggestion = typeof suggestions.$inferSelect;
export type Stream = typeof streams.$inferSelect;
export type Document = typeof documents.$inferSelect;
export type DocumentChunk = typeof documentChunksEnhanced.$inferSelect;
export type Entity = typeof entities.$inferSelect;
export type Relationship = typeof relationships.$inferSelect;
export type UpstashCacheMeta = typeof upstashCacheMeta.$inferSelect;
export type DataRetentionPolicy = typeof dataRetentionPolicies.$inferSelect;

// Community data types
export type CommunityExperience = typeof communityExperiences.$inferSelect;
export type CommunityValidation = typeof communityValidations.$inferSelect;
export type UserReputation = typeof userReputations.$inferSelect;
export type GamificationReward = typeof gamificationRewards.$inferSelect;
export type PeerReviewOrchestration = typeof peerReviewOrchestrations.$inferSelect;
export type Notification = typeof notifications.$inferSelect;

// Zod schemas for validation (Context7 best practice)
export const profileSchema = createSelectSchema(profiles);
export const webIndexSchema = createSelectSchema(webIndexes);
export const chatSessionSchema = createSelectSchema(chatSessions);
export const chatMessageSchema = createSelectSchema(chatMessages);
export const artifactSchema = createSelectSchema(artifacts);
export const documentSchema = createSelectSchema(documents);
export const documentChunkSchema = createSelectSchema(documentChunksEnhanced);

export const insertProfileSchema = createInsertSchema(profiles);
export const insertWebIndexSchema = createInsertSchema(webIndexes);
export const insertChatSessionSchema = createInsertSchema(chatSessions);
export const insertChatMessageSchema = createInsertSchema(chatMessages);
export const insertArtifactSchema = createInsertSchema(artifacts);
export const insertDocumentSchema = createInsertSchema(documents);
export const insertDocumentChunkSchema = createInsertSchema(
  documentChunksEnhanced,
);

// Community data schemas
export const communityExperienceSchema = createSelectSchema(communityExperiences);
export const communityValidationSchema = createSelectSchema(communityValidations);
export const userReputationSchema = createSelectSchema(userReputations);
export const gamificationRewardSchema = createSelectSchema(gamificationRewards);
export const peerReviewOrchestrationSchema = createSelectSchema(peerReviewOrchestrations);
export const notificationSchema = createSelectSchema(notifications);

export const insertCommunityExperienceSchema = createInsertSchema(communityExperiences);
export const insertCommunityValidationSchema = createInsertSchema(communityValidations);
export const insertUserReputationSchema = createInsertSchema(userReputations);
export const insertGamificationRewardSchema = createInsertSchema(gamificationRewards);
export const insertPeerReviewOrchestrationSchema = createInsertSchema(peerReviewOrchestrations);
export const insertNotificationSchema = createInsertSchema(notifications);

// AI-Chatbot Zod schemas
export const aiChatbotUserSchema = createSelectSchema(aiChatbotUser);
export const aiChatbotChatSchema = createSelectSchema(aiChatbotChat);
export const aiChatbotMessageV2Schema = createSelectSchema(aiChatbotMessageV2);
export const aiChatbotDocumentSchema = createSelectSchema(aiChatbotDocument);
export const aiChatbotSuggestionSchema =
  createSelectSchema(aiChatbotSuggestion);

export const insertAIChatbotUserSchema = createInsertSchema(aiChatbotUser);
export const insertAIChatbotChatSchema = createInsertSchema(aiChatbotChat);
export const insertAIChatbotMessageV2Schema =
  createInsertSchema(aiChatbotMessageV2);
export const insertAIChatbotDocumentSchema =
  createInsertSchema(aiChatbotDocument);
export const insertAIChatbotSuggestionSchema =
  createInsertSchema(aiChatbotSuggestion);
