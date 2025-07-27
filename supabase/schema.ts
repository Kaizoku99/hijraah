import {
  pgTable,
  varchar,
  timestamp,
  json,
  uuid,
  text,
  primaryKey,
  foreignKey,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

// =========================================
// ENUMS
// =========================================
export const userRoleEnum = pgEnum("user_role", ["user", "admin", "client"]);
export const caseStatusEnum = pgEnum("case_status", [
  "draft",
  "submitted",
  "in_review",
  "approved",
  "rejected",
  "completed",
]);

// =========================================
// Database Schema (Drizzle ORM)
// =========================================

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(), // This references auth.users(id)
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
  immigrationGoals: text("immigration_goals"),
  role: userRoleEnum("role").default("client"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type Profile = InferSelectModel<typeof profiles>;
export type InsertProfile = InferInsertModel<typeof profiles>;

export const cases = pgTable("cases", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  status: caseStatusEnum("status").notNull().default("draft"),
  metadata: json("metadata").default("{}"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type Case = InferSelectModel<typeof cases>;
export type InsertCase = InferInsertModel<typeof cases>;

export const chatSessions = pgTable("chat_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  title: text("title"),
  context: text("context"),
  prompt: text("prompt"),
  model: text("model"),
  systemPrompt: text("system_prompt"),
  agentConfig: json("agent_config").default("{}"),
  caseId: uuid("case_id").references(() => cases.id, { onDelete: "set null" }),
  lastMessageAt: timestamp("last_message_at", {
    withTimezone: true,
  }).defaultNow(),
  metadata: json("metadata").default("{}"),
  visibility: varchar("visibility", { enum: ["private", "public", "team"] })
    .notNull()
    .default("private"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type ChatSession = InferSelectModel<typeof chatSessions>;
export type InsertChatSession = InferInsertModel<typeof chatSessions>;

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => chatSessions.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => profiles.id, {
    onDelete: "set null",
  }),
  role: varchar("role", {
    enum: ["user", "assistant", "system", "tool", "function"],
  }).notNull(),
  content: text("content").notNull(),
  sources: json("sources"),
  toolCalls: json("tool_calls"),
  metadata: json("metadata").default("{}"),
  tokens: integer("tokens"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type ChatMessage = InferSelectModel<typeof chatMessages>;
export type InsertChatMessage = InferInsertModel<typeof chatMessages>;

export const chatMessageVotes = pgTable(
  "chat_message_votes",
  {
    messageId: uuid("message_id")
      .notNull()
      .references(() => chatMessages.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    isUpvoted: boolean("is_upvoted").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.messageId, table.userId] }),
    };
  },
);

export type ChatMessageVote = InferSelectModel<typeof chatMessageVotes>;
export type InsertChatMessageVote = InferInsertModel<typeof chatMessageVotes>;

export const artifacts = pgTable("artifacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),
  title: text("title").notNull(),
  kind: text("kind").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Artifact = InferSelectModel<typeof artifacts>;
export type InsertArtifact = InferInsertModel<typeof artifacts>;

export const suggestions = pgTable("suggestions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),
  documentId: uuid("document_id")
    .notNull()
    .references(() => artifacts.id, { onDelete: "cascade" }),
  title: text("title"),
  fromText: text("from_text"),
  toText: text("to_text"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Suggestion = InferSelectModel<typeof suggestions>;
export type InsertSuggestion = InferInsertModel<typeof suggestions>;

export const streams = pgTable("streams", {
  id: uuid("id").primaryKey().defaultRandom(),
  chatId: uuid("chat_id").references(() => chatSessions.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Stream = InferSelectModel<typeof streams>;
export type InsertStream = InferInsertModel<typeof streams>;

export const chatAttachments = pgTable("chat_attachments", {
  id: uuid("id").primaryKey().defaultRandom(),
  chatId: uuid("chat_id")
    .notNull()
    .references(() => chatSessions.id, { onDelete: "cascade" }),
  messageId: uuid("message_id")
    .notNull()
    .references(() => chatMessages.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size").notNull(),
  filePath: text("file_path").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type ChatAttachment = InferSelectModel<typeof chatAttachments>;
export type InsertChatAttachment = InferInsertModel<typeof chatAttachments>;

// Legacy Tables
export const legacyChats = pgTable("legacy_chats", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("created_at").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  visibility: varchar("visibility").default("private").notNull(),
});

export const legacyMessages = pgTable("legacy_messages", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chat_id")
    .notNull()
    .references(() => legacyChats.id, { onDelete: "cascade" }),
  role: varchar("role").notNull(),
  parts: json("parts").notNull(),
  attachments: json("attachments").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const legacyMessagesV2 = pgTable("legacy_messages_v2", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chat_id")
    .notNull()
    .references(() => legacyChats.id, { onDelete: "cascade" }),
  role: varchar("role").notNull(),
  parts: json("parts").notNull(),
  attachments: json("attachments").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const legacyVotes = pgTable(
  "legacy_votes",
  {
    chatId: uuid("chat_id")
      .notNull()
      .references(() => legacyChats.id, { onDelete: "cascade" }),
    messageId: uuid("message_id")
      .notNull()
      .references(() => legacyMessages.id, { onDelete: "cascade" }),
    isUpvoted: boolean("is_upvoted").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.chatId, table.messageId] }),
  }),
);

export const legacyVotesV2 = pgTable(
  "legacy_votes_v2",
  {
    chatId: uuid("chat_id")
      .notNull()
      .references(() => legacyChats.id, { onDelete: "cascade" }),
    messageId: uuid("message_id")
      .notNull()
      .references(() => legacyMessagesV2.id, { onDelete: "cascade" }),
    isUpvoted: boolean("is_upvoted").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.chatId, table.messageId] }),
  }),
);

// =========================================
// API Validation Schema (Zod)
// =========================================

export const textPartSchema = z.object({
  text: z.string().min(1).max(2000),
  type: z.enum(["text"]),
});

export const chatMessageSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  role: z.enum(["user", "assistant", "system", "tool", "function"]),
  content: z.string().min(1).max(2000),
  parts: z.array(textPartSchema),
  experimental_attachments: z
    .array(
      z.object({
        url: z.string().url(),
        name: z.string().min(1).max(2000),
        contentType: z.enum(["image/png", "image/jpg", "image/jpeg"]),
      }),
    )
    .optional(),
});

export const chatRequestBodySchema = z
  .object({
    id: z.string().uuid(),
    messages: z.array(chatMessageSchema).min(1),
    selectedChatModel: z.enum([
      "gpt-3.5-turbo",
      "gpt-4",
      "gpt-4-vision-preview",
      "gpt-4o",
      "claude-3-sonnet",
      "claude-3-opus",
      "claude-3-haiku",
    ]),
    visibility: z.enum(["public", "private", "team"]).default("private"),
  })
  .extend({
    description: z.string().optional(),
    caseId: z.string().uuid().optional(),
    countryCode: z.string().optional(),
  });

export const postRequestBodySchema = chatRequestBodySchema;
export type PostRequestBody = ChatRequestBody;

export type ChatMessageSchema = z.infer<typeof chatMessageSchema>;
export type ChatRequestBody = z.infer<typeof chatRequestBodySchema>;

// (Legacy alias exports removed – migrate to `profiles`, `artifacts`, `suggestions`)
