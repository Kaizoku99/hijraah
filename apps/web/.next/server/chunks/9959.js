try {
  let e =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
          ? global
          : "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self
              ? self
              : {},
    t = new e.Error().stack;
  t &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[t] = "6f00adad-16d0-4c07-b904-e2d0fe940b3f"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-6f00adad-16d0-4c07-b904-e2d0fe940b3f"));
} catch (e) {}
("use strict");
(exports.id = 9959),
  (exports.ids = [9959]),
  (exports.modules = {
    69959: (e, t, a) => {
      a.r(t),
        a.d(t, {
          aiChatbotChat: () => S,
          aiChatbotChatRelations: () => et,
          aiChatbotChatSchema: () => eE,
          aiChatbotDocument: () => M,
          aiChatbotDocumentRelations: () => es,
          aiChatbotDocumentSchema: () => eS,
          aiChatbotMessage: () => D,
          aiChatbotMessageRelations: () => ea,
          aiChatbotMessageV2: () => J,
          aiChatbotMessageV2Relations: () => ed,
          aiChatbotMessageV2Schema: () => eK,
          aiChatbotStream: () => k,
          aiChatbotStreamRelations: () => ei,
          aiChatbotSuggestion: () => F,
          aiChatbotSuggestionRelations: () => en,
          aiChatbotSuggestionSchema: () => eD,
          aiChatbotUser: () => K,
          aiChatbotUserRelations: () => ee,
          aiChatbotUserSchema: () => eC,
          aiChatbotVote: () => q,
          aiChatbotVoteV2: () => Q,
          apiSchema: () => R,
          artifactSchema: () => eN,
          artifactTypeEnum: () => C,
          artifacts: () => j,
          artifactsRelations: () => er,
          authSchema: () => b,
          chatMessageSchema: () => ex,
          chatMessageVotes: () => $,
          chatMessages: () => L,
          chatMessagesRelations: () => ec,
          chatSessionSchema: () => eg,
          chatSessions: () => V,
          chatSessionsRelations: () => eu,
          crawlJobs: () => T,
          crawlJobsRelations: () => el,
          dataRetentionPolicies: () => Z,
          dataTypeEnum: () => E,
          documentSchema: () => ey,
          documents: () => G,
          documentsRelations: () => em,
          embeddings: () => O,
          embeddingsRelations: () => e_,
          entities: () => X,
          entitiesRelations: () => ef,
          insertAIChatbotChatSchema: () => eq,
          insertAIChatbotDocumentSchema: () => eM,
          insertAIChatbotMessageV2Schema: () => eQ,
          insertAIChatbotSuggestionSchema: () => eF,
          insertAIChatbotUserSchema: () => eJ,
          insertArtifactSchema: () => eA,
          insertChatMessageSchema: () => ew,
          insertChatSessionSchema: () => ev,
          insertDocumentSchema: () => eP,
          insertProfileSchema: () => eb,
          insertWebIndexSchema: () => eR,
          profileSchema: () => eh,
          profiles: () => U,
          publicSchema: () => y,
          relationships: () => Y,
          relationshipsRelations: () => eI,
          roleEnum: () => w,
          statusEnum: () => P,
          streams: () => W,
          suggestions: () => H,
          upstashCacheMeta: () => B,
          visibilityEnum: () => v,
          voteTypeEnum: () => A,
          webIndexSchema: () => ep,
          webIndexes: () => z,
          webIndexesRelations: () => eo,
        });
      var d = a(63721),
        s = a(37671),
        n = a(40128),
        i = a(38201),
        o = a(23769),
        l = a(98636),
        u = a(48645),
        c = a(20040),
        r = a(44444),
        m = a(8488),
        _ = a(64819),
        f = a(60529),
        I = a(55190),
        h = a(41599),
        p = a(47161),
        g = a(4595),
        x = a(19313),
        N = a(26634);
      let y = (0, d.D6)("public"),
        b = (0, d.D6)("auth"),
        R = (0, d.D6)("api"),
        v = (0, s.rL)("visibility", ["private", "public", "shared"]),
        w = (0, s.rL)("role", ["system", "user", "assistant", "tool"]),
        A = (0, s.rL)("vote_type", ["up", "down"]),
        P = (0, s.rL)("status", [
          "pending",
          "processing",
          "completed",
          "failed",
          "cancelled",
        ]),
        C = (0, s.rL)("artifact_type", [
          "code",
          "text",
          "image",
          "sheet",
          "chart",
          "diagram",
        ]),
        E = (0, s.rL)("data_type", [
          "chat_messages",
          "documents",
          "embeddings",
          "artifacts",
          "user_data",
          "search_history",
        ]),
        K = (0, n.cJ)("User", {
          id: (0, i.uR)("id").primaryKey().defaultRandom(),
          email: (0, o.yf)("email", { length: 64 }).notNull().unique(),
          password: (0, o.yf)("password", { length: 64 }),
        }),
        S = (0, n.cJ)(
          "Chat",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            createdAt: (0, l.vE)("createdAt").notNull().defaultNow(),
            title: (0, u.Qq)("title").notNull(),
            userId: (0, i.uR)("userId")
              .notNull()
              .references(() => K.id, { onDelete: "cascade" }),
            visibility: (0, o.yf)("visibility", { enum: ["public", "private"] })
              .notNull()
              .default("private"),
          },
          (e) => ({
            userIdIndex: (0, c.Pe)("idx_chat_user_id").on(e.userId),
            visibilityIndex: (0, c.Pe)("idx_chat_visibility").on(e.visibility),
          }),
        ),
        D = (0, n.cJ)(
          "Message",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            chatId: (0, i.uR)("chatId")
              .notNull()
              .references(() => S.id, { onDelete: "cascade" }),
            role: (0, o.yf)("role").notNull(),
            content: (0, r.Fx)("content").notNull(),
            createdAt: (0, l.vE)("createdAt").notNull().defaultNow(),
          },
          (e) => ({
            chatIdIndex: (0, c.Pe)("idx_message_chat_id").on(e.chatId),
            roleIndex: (0, c.Pe)("idx_message_role").on(e.role),
          }),
        ),
        J = (0, n.cJ)(
          "Message_v2",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            chatId: (0, i.uR)("chatId")
              .notNull()
              .references(() => S.id, { onDelete: "cascade" }),
            role: (0, o.yf)("role").notNull(),
            parts: (0, r.Fx)("parts").notNull().default([]),
            attachments: (0, r.Fx)("attachments").notNull().default([]),
            createdAt: (0, l.vE)("createdAt").notNull().defaultNow(),
          },
          (e) => ({
            chatIdIndex: (0, c.Pe)("idx_message_v2_chat_id").on(e.chatId),
            roleIndex: (0, c.Pe)("idx_message_v2_role").on(e.role),
          }),
        ),
        q = (0, n.cJ)(
          "Vote",
          {
            chatId: (0, i.uR)("chatId")
              .notNull()
              .references(() => S.id, { onDelete: "cascade" }),
            messageId: (0, i.uR)("messageId")
              .notNull()
              .references(() => D.id, { onDelete: "cascade" }),
            isUpvoted: (0, m.zM)("isUpvoted").notNull(),
          },
          (e) => ({
            pk: (0, _.ie)({ columns: [e.chatId, e.messageId] }),
            chatIdIndex: (0, c.Pe)("idx_vote_chat_id").on(e.chatId),
            messageIdIndex: (0, c.Pe)("idx_vote_message_id").on(e.messageId),
          }),
        ),
        Q = (0, n.cJ)(
          "Vote_v2",
          {
            chatId: (0, i.uR)("chatId")
              .notNull()
              .references(() => S.id, { onDelete: "cascade" }),
            messageId: (0, i.uR)("messageId")
              .notNull()
              .references(() => J.id, { onDelete: "cascade" }),
            isUpvoted: (0, m.zM)("isUpvoted").notNull(),
          },
          (e) => ({
            pk: (0, _.ie)({ columns: [e.chatId, e.messageId] }),
            chatIdIndex: (0, c.Pe)("idx_vote_v2_chat_id").on(e.chatId),
            messageIdIndex: (0, c.Pe)("idx_vote_v2_message_id").on(e.messageId),
          }),
        ),
        M = (0, n.cJ)(
          "Document",
          {
            id: (0, i.uR)("id").notNull().defaultRandom(),
            createdAt: (0, l.vE)("createdAt").notNull().defaultNow(),
            title: (0, u.Qq)("title").notNull(),
            content: (0, u.Qq)("content"),
            kind: (0, o.yf)("kind", {
              enum: ["text", "code", "image", "sheet"],
            })
              .notNull()
              .default("text"),
            userId: (0, i.uR)("userId")
              .notNull()
              .references(() => K.id, { onDelete: "cascade" }),
          },
          (e) => ({
            pk: (0, _.ie)({ columns: [e.id, e.createdAt] }),
            userIdIndex: (0, c.Pe)("idx_document_user_id").on(e.userId),
            kindIndex: (0, c.Pe)("idx_document_kind").on(e.kind),
          }),
        ),
        F = (0, n.cJ)(
          "Suggestion",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            documentId: (0, i.uR)("documentId").notNull(),
            documentCreatedAt: (0, l.vE)("documentCreatedAt").notNull(),
            originalText: (0, u.Qq)("originalText").notNull(),
            suggestedText: (0, u.Qq)("suggestedText").notNull(),
            description: (0, u.Qq)("description"),
            isResolved: (0, m.zM)("isResolved").notNull().default(!1),
            userId: (0, i.uR)("userId")
              .notNull()
              .references(() => K.id, { onDelete: "cascade" }),
            createdAt: (0, l.vE)("createdAt").notNull().defaultNow(),
          },
          (e) => ({
            documentRef: (0, f.mt)({
              columns: [e.documentId, e.documentCreatedAt],
              foreignColumns: [M.id, M.createdAt],
            }),
            userIdIndex: (0, c.Pe)("idx_suggestion_user_id").on(e.userId),
            documentIndex: (0, c.Pe)("idx_suggestion_document").on(
              e.documentId,
              e.documentCreatedAt,
            ),
          }),
        ),
        k = (0, n.cJ)(
          "Stream",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            chatId: (0, i.uR)("chatId").notNull(),
            createdAt: (0, l.vE)("createdAt").notNull().defaultNow(),
          },
          (e) => ({
            chatRef: (0, f.mt)({ columns: [e.chatId], foreignColumns: [S.id] }),
            chatIdIndex: (0, c.Pe)("idx_stream_chat_id").on(e.chatId),
          }),
        ),
        U = (0, n.cJ)(
          "profiles",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            userId: (0, i.uR)("user_id").notNull().unique(),
            email: (0, u.Qq)("email").unique(),
            fullName: (0, u.Qq)("full_name"),
            avatarUrl: (0, u.Qq)("avatar_url"),
            locale: (0, o.yf)("locale", { length: 10 }).default("en"),
            timezone: (0, o.yf)("timezone", { length: 50 }).default("UTC"),
            preferences: (0, r.Fx)("preferences").$type().default({}),
            metadata: (0, r.Fx)("metadata").default({}),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
            updatedAt: (0, l.vE)("updated_at")
              .defaultNow()
              .notNull()
              .$onUpdate(() => new Date()),
          },
          (e) => ({
            userIdIndex: (0, c.Pe)("profiles_user_id_idx").on(e.userId),
            emailIndex: (0, c.Pe)("profiles_email_idx").on(e.email),
          }),
        ),
        z = (0, n.cJ)(
          "web_indexes",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            userId: (0, i.uR)("user_id").notNull(),
            url: (0, u.Qq)("url").notNull(),
            namespace: (0, o.yf)("namespace", { length: 255 }).notNull(),
            title: (0, u.Qq)("title"),
            description: (0, u.Qq)("description"),
            pagesCrawled: (0, I.nd)("pages_crawled").default(0),
            totalPages: (0, I.nd)("total_pages"),
            lastCrawlDuration: (0, I.nd)("last_crawl_duration"),
            estimatedCost: (0, h.sH)("estimated_cost", {
              precision: 10,
              scale: 4,
            }).default("0"),
            metadata: (0, r.Fx)("metadata").$type().default({}),
            crawlConfig: (0, r.Fx)("crawl_config").$type().default({}),
            isActive: (0, m.zM)("is_active").default(!0),
            isPublic: (0, m.zM)("is_public").default(!1),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
            updatedAt: (0, l.vE)("updated_at")
              .defaultNow()
              .notNull()
              .$onUpdate(() => new Date()),
            lastCrawledAt: (0, l.vE)("last_crawled_at"),
          },
          (e) => ({
            userNamespaceUnique: (0, p.Am)().on(e.userId, e.namespace),
            urlIndex: (0, c.Pe)("web_indexes_url_idx").on(e.url),
            userIdIndex: (0, c.Pe)("web_indexes_user_id_idx").on(e.userId),
            isActiveIndex: (0, c.Pe)("web_indexes_is_active_idx").on(
              e.isActive,
            ),
            namespaceTrgmIndex: (0, c.Pe)(
              "web_indexes_namespace_trgm_idx",
            ).using("gin", (0, g.ll)`namespace gin_trgm_ops`),
          }),
        ),
        T = (0, n.cJ)(
          "crawl_jobs",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            webIndexId: (0, i.uR)("web_index_id")
              .notNull()
              .references(() => z.id, { onDelete: "cascade" }),
            status: P("status").default("pending").notNull(),
            firecrawlJobId: (0, u.Qq)("firecrawl_job_id"),
            startedAt: (0, l.vE)("started_at"),
            completedAt: (0, l.vE)("completed_at"),
            errorMessage: (0, u.Qq)("error_message"),
            pagesProcessed: (0, I.nd)("pages_processed").default(0),
            metadata: (0, r.Fx)("metadata").default({}),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
          },
          (e) => ({
            webIndexIdIndex: (0, c.Pe)("crawl_jobs_web_index_id_idx").on(
              e.webIndexId,
            ),
            statusIndex: (0, c.Pe)("crawl_jobs_status_idx").on(e.status),
          }),
        ),
        V = (0, n.cJ)(
          "chat_sessions",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            userId: (0, i.uR)("user_id").notNull(),
            title: (0, u.Qq)("title"),
            visibility: v("visibility").default("private").notNull(),
            model: (0, o.yf)("model", { length: 50 }).default("gpt-4o"),
            systemPrompt: (0, u.Qq)("system_prompt"),
            webIndexId: (0, i.uR)("web_index_id").references(() => z.id, {
              onDelete: "set null",
            }),
            metadata: (0, r.Fx)("metadata").default({}),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
            updatedAt: (0, l.vE)("updated_at").defaultNow().notNull(),
          },
          (e) => ({
            userIdIndex: (0, c.Pe)("chat_sessions_user_id_idx").on(e.userId),
            webIndexIdIndex: (0, c.Pe)("chat_sessions_web_index_id_idx").on(
              e.webIndexId,
            ),
          }),
        ),
        L = (0, n.cJ)(
          "chat_messages",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            chatId: (0, i.uR)("chat_id")
              .notNull()
              .references(() => V.id, { onDelete: "cascade" }),
            role: w("role").notNull(),
            content: (0, u.Qq)("content").notNull(),
            toolCalls: (0, r.Fx)("tool_calls").default([]),
            attachments: (0, r.Fx)("attachments").default([]),
            artifacts: (0, r.Fx)("artifacts").default([]),
            metadata: (0, r.Fx)("metadata").default({}),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
          },
          (e) => ({
            chatIdIndex: (0, c.Pe)("chat_messages_chat_id_idx").on(e.chatId),
            roleIndex: (0, c.Pe)("chat_messages_role_idx").on(e.role),
          }),
        ),
        $ = (0, n.cJ)(
          "chat_message_votes",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            messageId: (0, i.uR)("message_id")
              .notNull()
              .references(() => L.id, { onDelete: "cascade" }),
            userId: (0, i.uR)("user_id").notNull(),
            voteType: A("vote_type").notNull(),
            feedback: (0, u.Qq)("feedback"),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
          },
          (e) => ({
            messageUserUnique: (0, p.Am)().on(e.messageId, e.userId),
            messageIdIndex: (0, c.Pe)("chat_message_votes_message_id_idx").on(
              e.messageId,
            ),
          }),
        ),
        j = (0, n.cJ)(
          "artifacts",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            messageId: (0, i.uR)("message_id").references(() => L.id, {
              onDelete: "cascade",
            }),
            userId: (0, i.uR)("user_id").notNull(),
            title: (0, u.Qq)("title").notNull(),
            type: (0, o.yf)("type", { length: 50 }).notNull(),
            language: (0, o.yf)("language", { length: 50 }),
            content: (0, u.Qq)("content").notNull(),
            metadata: (0, r.Fx)("metadata").default({}),
            isPublic: (0, m.zM)("is_public").default(!1),
            version: (0, I.nd)("version").default(1),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
            updatedAt: (0, l.vE)("updated_at").defaultNow().notNull(),
          },
          (e) => ({
            userIdIndex: (0, c.Pe)("artifacts_user_id_idx").on(e.userId),
            typeIndex: (0, c.Pe)("artifacts_type_idx").on(e.type),
            messageIdIndex: (0, c.Pe)("artifacts_message_id_idx").on(
              e.messageId,
            ),
          }),
        ),
        H = (0, n.cJ)(
          "suggestions",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            chatId: (0, i.uR)("chat_id").references(() => V.id, {
              onDelete: "cascade",
            }),
            messageId: (0, i.uR)("message_id").references(() => L.id, {
              onDelete: "cascade",
            }),
            content: (0, u.Qq)("content").notNull(),
            isUsed: (0, m.zM)("is_used").default(!1),
            metadata: (0, r.Fx)("metadata").default({}),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
          },
          (e) => ({
            chatIdIndex: (0, c.Pe)("suggestions_chat_id_idx").on(e.chatId),
            messageIdIndex: (0, c.Pe)("suggestions_message_id_idx").on(
              e.messageId,
            ),
          }),
        ),
        W = (0, n.cJ)(
          "streams",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            chatId: (0, i.uR)("chat_id")
              .notNull()
              .references(() => V.id, { onDelete: "cascade" }),
            content: (0, u.Qq)("content"),
            isFinished: (0, m.zM)("is_finished").default(!1),
            metadata: (0, r.Fx)("metadata").default({}),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
            updatedAt: (0, l.vE)("updated_at").defaultNow().notNull(),
          },
          (e) => ({
            chatIdIndex: (0, c.Pe)("streams_chat_id_idx").on(e.chatId),
          }),
        ),
        B = (0, n.cJ)(
          "upstash_cache_meta",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            cacheKey: (0, u.Qq)("cache_key").notNull().unique(),
            namespace: (0, o.yf)("namespace", { length: 100 }).notNull(),
            size: (0, I.nd)("size"),
            ttl: (0, I.nd)("ttl"),
            hitCount: (0, I.nd)("hit_count").default(0),
            lastAccessed: (0, l.vE)("last_accessed").defaultNow(),
            metadata: (0, r.Fx)("metadata").default({}),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
          },
          (e) => ({
            cacheKeyIndex: (0, c.Pe)("upstash_cache_meta_cache_key_idx").on(
              e.cacheKey,
            ),
            namespaceIndex: (0, c.Pe)("upstash_cache_meta_namespace_idx").on(
              e.namespace,
            ),
          }),
        ),
        G = (0, n.cJ)(
          "documents",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            userId: (0, i.uR)("user_id").notNull(),
            webIndexId: (0, i.uR)("web_index_id").references(() => z.id, {
              onDelete: "cascade",
            }),
            title: (0, u.Qq)("title").notNull(),
            content: (0, u.Qq)("content").notNull(),
            contentType: (0, o.yf)("content_type", { length: 100 }).default(
              "text/plain",
            ),
            fileSize: (0, I.nd)("file_size"),
            checksum: (0, o.yf)("checksum", { length: 64 }),
            source: (0, u.Qq)("source"),
            metadata: (0, r.Fx)("metadata").default({}),
            isProcessed: (0, m.zM)("is_processed").default(!1),
            vectorId: (0, u.Qq)("vector_id"),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
            updatedAt: (0, l.vE)("updated_at").defaultNow().notNull(),
          },
          (e) => ({
            userIdIndex: (0, c.Pe)("documents_user_id_idx").on(e.userId),
            webIndexIdIndex: (0, c.Pe)("documents_web_index_id_idx").on(
              e.webIndexId,
            ),
            sourceIndex: (0, c.Pe)("documents_source_idx").on(e.source),
            checksumIndex: (0, c.Pe)("documents_checksum_idx").on(e.checksum),
          }),
        ),
        O = (0, n.cJ)(
          "embeddings",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            documentId: (0, i.uR)("document_id").references(() => G.id, {
              onDelete: "cascade",
            }),
            content: (0, u.Qq)("content").notNull(),
            embedding: (0, u.Qq)("embedding"),
            chunkIndex: (0, I.nd)("chunk_index").default(0),
            tokenCount: (0, I.nd)("token_count"),
            model: (0, o.yf)("model", { length: 50 }).default(
              "text-embedding-3-small",
            ),
            metadata: (0, r.Fx)("metadata").default({}),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
          },
          (e) => ({
            documentIdIndex: (0, c.Pe)("embeddings_document_id_idx").on(
              e.documentId,
            ),
            modelIndex: (0, c.Pe)("embeddings_model_idx").on(e.model),
          }),
        ),
        X = (0, n.cJ)(
          "entities",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            name: (0, u.Qq)("name").notNull(),
            type: (0, o.yf)("type", { length: 50 }).notNull(),
            description: (0, u.Qq)("description"),
            properties: (0, r.Fx)("properties").default({}),
            documentIds: (0, r.Fx)("document_ids").default([]),
            confidence: (0, I.nd)("confidence").default(0),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
            updatedAt: (0, l.vE)("updated_at").defaultNow().notNull(),
          },
          (e) => ({
            nameIndex: (0, c.Pe)("entities_name_idx").on(e.name),
            typeIndex: (0, c.Pe)("entities_type_idx").on(e.type),
          }),
        ),
        Y = (0, n.cJ)(
          "relationships",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            sourceId: (0, i.uR)("source_id")
              .notNull()
              .references(() => X.id, { onDelete: "cascade" }),
            targetId: (0, i.uR)("target_id")
              .notNull()
              .references(() => X.id, { onDelete: "cascade" }),
            type: (0, o.yf)("type", { length: 50 }).notNull(),
            properties: (0, r.Fx)("properties").default({}),
            strength: (0, I.nd)("strength").default(0),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
          },
          (e) => ({
            sourceIdIndex: (0, c.Pe)("relationships_source_id_idx").on(
              e.sourceId,
            ),
            targetIdIndex: (0, c.Pe)("relationships_target_id_idx").on(
              e.targetId,
            ),
            typeIndex: (0, c.Pe)("relationships_type_idx").on(e.type),
          }),
        ),
        Z = (0, n.cJ)(
          "data_retention_policies",
          {
            id: (0, i.uR)("id").primaryKey().defaultRandom(),
            userId: (0, i.uR)("user_id").notNull(),
            dataType: (0, o.yf)("data_type", { length: 50 }).notNull(),
            retentionDays: (0, I.nd)("retention_days").default(90),
            autoDelete: (0, m.zM)("auto_delete").default(!0),
            lastCleanup: (0, l.vE)("last_cleanup"),
            createdAt: (0, l.vE)("created_at").defaultNow().notNull(),
            updatedAt: (0, l.vE)("updated_at").defaultNow().notNull(),
          },
          (e) => ({
            userIdIndex: (0, c.Pe)("data_retention_policies_user_id_idx").on(
              e.userId,
            ),
            dataTypeIndex: (0, c.Pe)(
              "data_retention_policies_data_type_idx",
            ).on(e.dataType),
          }),
        ),
        ee = (0, x.K1)(K, ({ many: e }) => ({
          chats: e(S),
          documents: e(M),
          suggestions: e(F),
        })),
        et = (0, x.K1)(S, ({ one: e, many: t }) => ({
          user: e(K, { fields: [S.userId], references: [K.id] }),
          messages: t(D),
          messagesV2: t(J),
          votes: t(q),
          votesV2: t(Q),
          streams: t(k),
        })),
        ea = (0, x.K1)(D, ({ one: e, many: t }) => ({
          chat: e(S, { fields: [D.chatId], references: [S.id] }),
          votes: t(q),
        })),
        ed = (0, x.K1)(J, ({ one: e, many: t }) => ({
          chat: e(S, { fields: [J.chatId], references: [S.id] }),
          votes: t(Q),
        })),
        es = (0, x.K1)(M, ({ one: e, many: t }) => ({
          user: e(K, { fields: [M.userId], references: [K.id] }),
          suggestions: t(F),
        })),
        en = (0, x.K1)(F, ({ one: e }) => ({
          user: e(K, { fields: [F.userId], references: [K.id] }),
          document: e(M, {
            fields: [F.documentId, F.documentCreatedAt],
            references: [M.id, M.createdAt],
          }),
        })),
        ei = (0, x.K1)(k, ({ one: e }) => ({
          chat: e(S, { fields: [k.chatId], references: [S.id] }),
        })),
        eo = (0, x.K1)(z, ({ many: e, one: t }) => ({
          crawlJobs: e(T),
          chatSessions: e(V),
          documents: e(G),
        })),
        el = (0, x.K1)(T, ({ one: e }) => ({
          webIndex: e(z, { fields: [T.webIndexId], references: [z.id] }),
        })),
        eu = (0, x.K1)(V, ({ many: e, one: t }) => ({
          messages: e(L),
          suggestions: e(H),
          streams: e(W),
          webIndex: t(z, { fields: [V.webIndexId], references: [z.id] }),
        })),
        ec = (0, x.K1)(L, ({ one: e, many: t }) => ({
          chatSession: e(V, { fields: [L.chatId], references: [V.id] }),
          votes: t($),
          artifacts: t(j),
          suggestions: t(H),
        })),
        er = (0, x.K1)(j, ({ one: e }) => ({
          message: e(L, { fields: [j.messageId], references: [L.id] }),
        })),
        em = (0, x.K1)(G, ({ one: e, many: t }) => ({
          webIndex: e(z, { fields: [G.webIndexId], references: [z.id] }),
          embeddings: t(O),
        })),
        e_ = (0, x.K1)(O, ({ one: e }) => ({
          document: e(G, { fields: [O.documentId], references: [G.id] }),
        })),
        ef = (0, x.K1)(X, ({ many: e }) => ({
          sourceRelationships: e(Y, { relationName: "source" }),
          targetRelationships: e(Y, { relationName: "target" }),
        })),
        eI = (0, x.K1)(Y, ({ one: e }) => ({
          source: e(X, {
            fields: [Y.sourceId],
            references: [X.id],
            relationName: "source",
          }),
          target: e(X, {
            fields: [Y.targetId],
            references: [X.id],
            relationName: "target",
          }),
        })),
        eh = (0, N.aJ)(U),
        ep = (0, N.aJ)(z),
        eg = (0, N.aJ)(V),
        ex = (0, N.aJ)(L),
        eN = (0, N.aJ)(j),
        ey = (0, N.aJ)(G),
        eb = (0, N.r)(U),
        eR = (0, N.r)(z),
        ev = (0, N.r)(V),
        ew = (0, N.r)(L),
        eA = (0, N.r)(j),
        eP = (0, N.r)(G),
        eC = (0, N.aJ)(K),
        eE = (0, N.aJ)(S),
        eK = (0, N.aJ)(J),
        eS = (0, N.aJ)(M),
        eD = (0, N.aJ)(F),
        eJ = (0, N.r)(K),
        eq = (0, N.r)(S),
        eQ = (0, N.r)(J),
        eM = (0, N.r)(M),
        eF = (0, N.r)(F);
    },
  });
//# sourceMappingURL=9959.js.map
