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
    (e._sentryDebugIds[t] = "1297412f-02e3-4d75-8009-8bc4cd31fbc4"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-1297412f-02e3-4d75-8009-8bc4cd31fbc4"));
} catch (e) {}
("use strict");
(exports.id = 6034),
  (exports.ids = [6034]),
  (exports.modules = {
    1415: (e, t, a) => {
      a.d(t, { BZ: () => w, o0: () => h, p$: () => N, qi: () => v });
      var d = a(16659),
        i = a(30487),
        n = a(46445),
        o = a(55753),
        r = a(90500),
        s = a(32856),
        l = a(98424),
        c = a(62085),
        u = a(91522),
        m = a(42727),
        f = a(14567);
      let p = (0, d.rL)("user_role", ["user", "admin", "client"]),
        y = (0, d.rL)("case_status", [
          "draft",
          "submitted",
          "in_review",
          "approved",
          "rejected",
          "completed",
        ]),
        _ = (0, i.cJ)("profiles", {
          id: (0, n.uR)("id").primaryKey(),
          firstName: (0, o.Qq)("first_name"),
          lastName: (0, o.Qq)("last_name"),
          avatarUrl: (0, o.Qq)("avatar_url"),
          bio: (0, o.Qq)("bio"),
          timezone: (0, o.Qq)("timezone"),
          language: (0, o.Qq)("language").default("en"),
          countryOfResidence: (0, o.Qq)("country_of_residence"),
          countryOfInterest: (0, o.Qq)("country_of_interest"),
          countryOfCitizenship: (0, o.Qq)("country_of_citizenship"),
          isAdmin: (0, r.zM)("is_admin").default(!1),
          visaType: (0, o.Qq)("visa_type"),
          immigrationGoals: (0, o.Qq)("immigration_goals"),
          role: p("role").default("client"),
          createdAt: (0, s.vE)("created_at", { withTimezone: !0 }).defaultNow(),
          updatedAt: (0, s.vE)("updated_at", { withTimezone: !0 }).defaultNow(),
        }),
        g = (0, i.cJ)("cases", {
          id: (0, n.uR)("id").primaryKey().defaultRandom(),
          userId: (0, n.uR)("user_id")
            .notNull()
            .references(() => _.id, { onDelete: "cascade" }),
          title: (0, o.Qq)("title").notNull(),
          description: (0, o.Qq)("description"),
          status: y("status").notNull().default("draft"),
          metadata: (0, l.Pq)("metadata").default("{}"),
          createdAt: (0, s.vE)("created_at", { withTimezone: !0 }).defaultNow(),
          updatedAt: (0, s.vE)("updated_at", { withTimezone: !0 }).defaultNow(),
        }),
        h = (0, i.cJ)("chat_sessions", {
          id: (0, n.uR)("id").primaryKey().defaultRandom(),
          userId: (0, n.uR)("user_id")
            .notNull()
            .references(() => _.id, { onDelete: "cascade" }),
          title: (0, o.Qq)("title"),
          context: (0, o.Qq)("context"),
          prompt: (0, o.Qq)("prompt"),
          model: (0, o.Qq)("model"),
          systemPrompt: (0, o.Qq)("system_prompt"),
          agentConfig: (0, l.Pq)("agent_config").default("{}"),
          caseId: (0, n.uR)("case_id").references(() => g.id, {
            onDelete: "set null",
          }),
          lastMessageAt: (0, s.vE)("last_message_at", {
            withTimezone: !0,
          }).defaultNow(),
          metadata: (0, l.Pq)("metadata").default("{}"),
          visibility: (0, c.yf)("visibility", {
            enum: ["private", "public", "team"],
          })
            .notNull()
            .default("private"),
          createdAt: (0, s.vE)("created_at", { withTimezone: !0 })
            .notNull()
            .defaultNow(),
          updatedAt: (0, s.vE)("updated_at", { withTimezone: !0 })
            .notNull()
            .defaultNow(),
        }),
        N = (0, i.cJ)("chat_messages", {
          id: (0, n.uR)("id").primaryKey().defaultRandom(),
          sessionId: (0, n.uR)("session_id")
            .notNull()
            .references(() => h.id, { onDelete: "cascade" }),
          userId: (0, n.uR)("user_id").references(() => _.id, {
            onDelete: "set null",
          }),
          role: (0, c.yf)("role", {
            enum: ["user", "assistant", "system", "tool", "function"],
          }).notNull(),
          content: (0, o.Qq)("content").notNull(),
          sources: (0, l.Pq)("sources"),
          toolCalls: (0, l.Pq)("tool_calls"),
          metadata: (0, l.Pq)("metadata").default("{}"),
          tokens: (0, u.nd)("tokens"),
          createdAt: (0, s.vE)("created_at", { withTimezone: !0 })
            .notNull()
            .defaultNow(),
          updatedAt: (0, s.vE)("updated_at", { withTimezone: !0 })
            .notNull()
            .defaultNow(),
        }),
        w = (0, i.cJ)(
          "chat_message_votes",
          {
            messageId: (0, n.uR)("message_id")
              .notNull()
              .references(() => N.id, { onDelete: "cascade" }),
            userId: (0, n.uR)("user_id")
              .notNull()
              .references(() => _.id, { onDelete: "cascade" }),
            isUpvoted: (0, r.zM)("is_upvoted").notNull().default(!0),
            createdAt: (0, s.vE)("created_at", {
              withTimezone: !0,
            }).defaultNow(),
          },
          (e) => ({ pk: (0, m.ie)({ columns: [e.messageId, e.userId] }) }),
        ),
        v = (0, i.cJ)("artifacts", {
          id: (0, n.uR)("id").primaryKey().defaultRandom(),
          userId: (0, n.uR)("user_id").references(() => _.id, {
            onDelete: "cascade",
          }),
          title: (0, o.Qq)("title").notNull(),
          kind: (0, o.Qq)("kind").notNull(),
          content: (0, o.Qq)("content").notNull(),
          createdAt: (0, s.vE)("created_at", { withTimezone: !0 })
            .notNull()
            .defaultNow(),
          updatedAt: (0, s.vE)("updated_at", { withTimezone: !0 })
            .notNull()
            .defaultNow(),
        });
      (0, i.cJ)("suggestions", {
        id: (0, n.uR)("id").primaryKey().defaultRandom(),
        userId: (0, n.uR)("user_id").references(() => _.id, {
          onDelete: "cascade",
        }),
        documentId: (0, n.uR)("document_id")
          .notNull()
          .references(() => v.id, { onDelete: "cascade" }),
        title: (0, o.Qq)("title"),
        fromText: (0, o.Qq)("from_text"),
        toText: (0, o.Qq)("to_text"),
        createdAt: (0, s.vE)("created_at", { withTimezone: !0 })
          .notNull()
          .defaultNow(),
        updatedAt: (0, s.vE)("updated_at", { withTimezone: !0 })
          .notNull()
          .defaultNow(),
      }),
        (0, i.cJ)("streams", {
          id: (0, n.uR)("id").primaryKey().defaultRandom(),
          chatId: (0, n.uR)("chat_id").references(() => h.id, {
            onDelete: "cascade",
          }),
          createdAt: (0, s.vE)("created_at", { withTimezone: !0 })
            .notNull()
            .defaultNow(),
        }),
        (0, i.cJ)("chat_attachments", {
          id: (0, n.uR)("id").primaryKey().defaultRandom(),
          chatId: (0, n.uR)("chat_id")
            .notNull()
            .references(() => h.id, { onDelete: "cascade" }),
          messageId: (0, n.uR)("message_id")
            .notNull()
            .references(() => N.id, { onDelete: "cascade" }),
          userId: (0, n.uR)("user_id")
            .notNull()
            .references(() => _.id, { onDelete: "cascade" }),
          fileName: (0, o.Qq)("file_name").notNull(),
          fileType: (0, o.Qq)("file_type").notNull(),
          fileSize: (0, u.nd)("file_size").notNull(),
          filePath: (0, o.Qq)("file_path").notNull(),
          createdAt: (0, s.vE)("created_at", { withTimezone: !0 })
            .notNull()
            .defaultNow(),
        });
      let q = (0, i.cJ)("legacy_chats", {
          id: (0, n.uR)("id").primaryKey().notNull().defaultRandom(),
          createdAt: (0, s.vE)("created_at").notNull(),
          userId: (0, n.uR)("user_id")
            .notNull()
            .references(() => _.id, { onDelete: "cascade" }),
          title: (0, o.Qq)("title").notNull(),
          visibility: (0, c.yf)("visibility").default("private").notNull(),
        }),
        x = (0, i.cJ)("legacy_messages", {
          id: (0, n.uR)("id").primaryKey().notNull().defaultRandom(),
          chatId: (0, n.uR)("chat_id")
            .notNull()
            .references(() => q.id, { onDelete: "cascade" }),
          role: (0, c.yf)("role").notNull(),
          parts: (0, l.Pq)("parts").notNull(),
          attachments: (0, l.Pq)("attachments").notNull(),
          createdAt: (0, s.vE)("created_at").notNull(),
        }),
        z = (0, i.cJ)("legacy_messages_v2", {
          id: (0, n.uR)("id").primaryKey().notNull().defaultRandom(),
          chatId: (0, n.uR)("chat_id")
            .notNull()
            .references(() => q.id, { onDelete: "cascade" }),
          role: (0, c.yf)("role").notNull(),
          parts: (0, l.Pq)("parts").notNull(),
          attachments: (0, l.Pq)("attachments").notNull(),
          createdAt: (0, s.vE)("created_at").notNull(),
        });
      (0, i.cJ)(
        "legacy_votes",
        {
          chatId: (0, n.uR)("chat_id")
            .notNull()
            .references(() => q.id, { onDelete: "cascade" }),
          messageId: (0, n.uR)("message_id")
            .notNull()
            .references(() => x.id, { onDelete: "cascade" }),
          isUpvoted: (0, r.zM)("is_upvoted").notNull(),
        },
        (e) => ({ pk: (0, m.ie)({ columns: [e.chatId, e.messageId] }) }),
      ),
        (0, i.cJ)(
          "legacy_votes_v2",
          {
            chatId: (0, n.uR)("chat_id")
              .notNull()
              .references(() => q.id, { onDelete: "cascade" }),
            messageId: (0, n.uR)("message_id")
              .notNull()
              .references(() => z.id, { onDelete: "cascade" }),
            isUpvoted: (0, r.zM)("is_upvoted").notNull(),
          },
          (e) => ({ pk: (0, m.ie)({ columns: [e.chatId, e.messageId] }) }),
        );
      let I = f.z.object({
          text: f.z.string().min(1).max(2e3),
          type: f.z.enum(["text"]),
        }),
        R = f.z.object({
          id: f.z.string().uuid(),
          createdAt: f.z.coerce.date(),
          role: f.z.enum(["user", "assistant", "system", "tool", "function"]),
          content: f.z.string().min(1).max(2e3),
          parts: f.z.array(I),
          experimental_attachments: f.z
            .array(
              f.z.object({
                url: f.z.string().url(),
                name: f.z.string().min(1).max(2e3),
                contentType: f.z.enum(["image/png", "image/jpg", "image/jpeg"]),
              }),
            )
            .optional(),
        });
      f.z
        .object({
          id: f.z.string().uuid(),
          messages: f.z.array(R).min(1),
          selectedChatModel: f.z.enum([
            "gpt-3.5-turbo",
            "gpt-4",
            "gpt-4-vision-preview",
            "gpt-4o",
            "claude-3-sonnet",
            "claude-3-opus",
            "claude-3-haiku",
          ]),
          visibility: f.z
            .enum(["public", "private", "team"])
            .default("private"),
        })
        .extend({
          description: f.z.string().optional(),
          caseId: f.z.string().uuid().optional(),
          countryCode: f.z.string().optional(),
        });
    },
    16034: (e, t, a) => {
      a.a(e, async (e, d) => {
        try {
          a.d(t, {
            Ci: () => m,
            XO: () => u,
            bd: () => p,
            iB: () => _,
            kA: () => h,
            sl: () => f,
            tw: () => g,
            xt: () => y,
          });
          var i = a(649),
            n = a(42351),
            o = a(52549),
            r = a(78814),
            s = a(20716),
            l = a(1415);
          a(81231);
          var c = e([s]);
          s = (c.then ? (await c)() : c)[0];
          let N = (0, r.A)(process.env.POSTGRES_URL),
            w = (0, o.f)(N);
          async function u({ id: e }) {
            try {
              let [t] = await w
                .select()
                .from(l.o0)
                .where((0, i.eq)(l.o0.id, e));
              return t;
            } catch (e) {
              throw (
                (console.error(
                  "Failed to get chat session by id from database",
                  e,
                ),
                e)
              );
            }
          }
          async function m({ messageId: e, userId: t, isUpvoted: a }) {
            try {
              return await w
                .insert(l.BZ)
                .values({ messageId: e, userId: t, isUpvoted: a })
                .onConflictDoUpdate({
                  target: [l.BZ.messageId, l.BZ.userId],
                  set: { isUpvoted: a },
                })
                .returning();
            } catch (e) {
              throw (
                (console.error("Failed to vote on message in database", e), e)
              );
            }
          }
          async function f({ sessionId: e }) {
            try {
              return await w
                .select({
                  messageId: l.BZ.messageId,
                  userId: l.BZ.userId,
                  isUpvoted: l.BZ.isUpvoted,
                  createdAt: l.BZ.createdAt,
                })
                .from(l.BZ)
                .innerJoin(l.p$, (0, i.eq)(l.BZ.messageId, l.p$.id))
                .where((0, i.eq)(l.p$.sessionId, e));
            } catch (e) {
              throw (
                (console.error(
                  "Failed to get votes for messages in session from database",
                  e,
                ),
                e)
              );
            }
          }
          async function p({
            id: e,
            title: t,
            kind: a,
            content: d,
            userId: i,
          }) {
            try {
              let n = (function (e) {
                switch (e) {
                  case "document":
                  case "mindmap":
                    return "text";
                  case "spreadsheet":
                    return "sheet";
                  case "code":
                    return "code";
                  case "image":
                    return "image";
                  default:
                    throw Error(`Unhandled artifact type: ${e}`);
                }
              })(a);
              return await w
                .insert(l.qi)
                .values({
                  id: e,
                  title: t,
                  kind: n,
                  content: d,
                  userId: i,
                  createdAt: new Date(),
                });
            } catch (e) {
              throw (console.error("Failed to save document in database"), e);
            }
          }
          async function y({ id: e }) {
            try {
              return await w
                .selectDistinctOn([l.qi.id], {
                  id: l.qi.id,
                  title: l.qi.title,
                  kind: l.qi.kind,
                  userId: l.qi.userId,
                  createdAt: l.qi.createdAt,
                })
                .from(l.qi)
                .where((0, i.eq)(l.qi.id, e))
                .orderBy(l.qi.id, (0, n.i)(l.qi.createdAt));
            } catch (e) {
              throw (
                (console.error("Failed to get documents by id from database"),
                e)
              );
            }
          }
          async function _({ id: e, timestamp: t }) {
            try {
              return await w
                .delete(l.qi)
                .where(
                  (0, i.Uo)(
                    (0, i.eq)(l.qi.id, e),
                    (0, i.lt)(l.qi.createdAt, t),
                  ),
                );
            } catch (e) {
              throw (
                (console.error(
                  "Failed to delete documents by id after timestamp from database",
                ),
                e)
              );
            }
          }
          async function g({ documentId: e }) {
            try {
              let t = await w
                .select()
                .from(t)
                .where((0, i.eq)(t.documentId, e))
                .orderBy((0, n.i)(t.createdAt));
              return t;
            } catch (e) {
              throw (
                (console.error(
                  "Failed to get suggestions by document id from database",
                  e,
                ),
                e)
              );
            }
          }
          async function h({ id: e }) {
            try {
              let [t] = await w
                .select()
                .from(l.p$)
                .where((0, i.eq)(l.p$.id, e));
              return t;
            } catch (e) {
              throw (
                (console.error("Failed to get message by id from database"), e)
              );
            }
          }
          d();
        } catch (e) {
          d(e);
        }
      });
    },
    20716: (e, t, a) => {
      a.a(e, async (e, d) => {
        try {
          a.d(t, { cn: () => l, lk: () => c, p1: () => u });
          var i = a(85488),
            n = a(31399),
            o = a(63775),
            r = a(54710),
            s = e([i]);
          function l(...e) {
            return (0, r.QP)((0, o.$)(e));
          }
          function c() {
            return "undefined" != typeof crypto && crypto.randomUUID
              ? crypto.randomUUID()
              : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                  /[xy]/g,
                  function (e) {
                    let t = (16 * Math.random()) | 0;
                    return ("x" === e ? t : (3 & t) | 8).toString(16);
                  },
                );
          }
          function u() {
            var e = (0, i.generateId)(12);
            let t = (0, n.uP)(10);
            return (0, n.Y8)(e, t);
          }
          (i = (s.then ? (await s)() : s)[0]), d();
        } catch (e) {
          d(e);
        }
      });
    },
    81231: (e, t, a) => {
      a(18279);
    },
  });
//# sourceMappingURL=6034.js.map
