try {
  let t =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
          ? global
          : "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self
              ? self
              : {},
    e = new t.Error().stack;
  e &&
    ((t._sentryDebugIds = t._sentryDebugIds || {}),
    (t._sentryDebugIds[e] = "5582fc73-10d1-4866-8511-8f76e13d415f"),
    (t._sentryDebugIdIdentifier =
      "sentry-dbid-5582fc73-10d1-4866-8511-8f76e13d415f"));
} catch (t) {}
(exports.id = 3751),
  (exports.ids = [3751]),
  (exports.modules = {
    8963: (t) => {
      function e(t) {
        var e = Error("Cannot find module '" + t + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      (e.keys = () => []), (e.resolve = e), (e.id = 8963), (t.exports = e);
    },
    21088: (t, e, a) => {
      "use strict";
      a.d(e, { V: () => n });
      var s = a(86773),
        i = a(88421),
        r = a(44783),
        o = a(87323);
      class n extends i.g {
        constructor(t = {}) {
          super("chat_sessions", t);
        }
        async getChatById(t) {
          let e = await super.getById(t);
          return e ? this.toChatEntity(e) : null;
        }
        async getById(t) {
          return await super.getById(t);
        }
        async getByUserId(t, e) {
          let a = (await this.getClient())
            .from("chat_sessions")
            .select("*")
            .eq("user_id", t);
          if ((e?.case_id && (a = a.eq("case_id", e.case_id)), e?.orderBy)) {
            let [t, s] = e.orderBy.split(":");
            a = a.order(
              {
                createdAt: "created_at",
                updatedAt: "updated_at",
                lastMessageAt: "last_message_at",
                userId: "user_id",
                caseId: "case_id",
                systemPrompt: "system_prompt",
                agentConfig: "agent_config",
              }[t] || t,
              { ascending: "desc" !== s },
            );
          } else a = a.order("last_message_at", { ascending: !1 });
          e?.limit && (a = a.limit(e.limit)),
            e?.offset &&
              (a = a.range(e.offset, e.offset + (e.limit || 10) - 1));
          let { data: s, error: i } = await a;
          if (i)
            throw (
              (console.error("Error fetching chats by user ID:", i),
              Error(`Failed to fetch chats: ${i.message}`))
            );
          return s || [];
        }
        async getMessages(t) {
          let e = await this.getClient(),
            { data: a, error: s } = await e
              .from("chat_messages")
              .select("*")
              .eq("session_id", t)
              .order("created_at", { ascending: !0 });
          if (s)
            throw (
              (console.error("Error fetching chat messages:", s),
              Error(`Failed to fetch chat messages: ${s.message}`))
            );
          return a || [];
        }
        async getWithDetails(t) {
          let e = await this.getClient(),
            { data: a, error: s } = await e
              .from("chat_sessions")
              .select("*")
              .eq("id", t)
              .single();
          if (s || !a)
            return (
              (s && "PGRST116" === s.code) ||
                console.error("Error fetching chat:", s),
              null
            );
          let { data: i, error: r } = await e
            .from("chat_messages")
            .select("*")
            .eq("session_id", t)
            .order("created_at", { ascending: !0 });
          if (r)
            throw (
              (console.error("Error fetching chat messages:", r),
              Error(`Failed to fetch chat messages: ${r.message}`))
            );
          let o = (i || []).map((t) => t.id),
            n = [];
          if (o.length > 0) {
            let { data: t, error: a } = await e
              .from("chat_attachments")
              .select("*")
              .in("message_id", o);
            if (a)
              throw (
                (console.error("Error fetching chat attachments:", a),
                Error(`Failed to fetch chat attachments: ${a.message}`))
              );
            n = t || [];
          }
          return { chat: a, messages: i || [], attachments: n };
        }
        async addMessage(t, e) {
          let a = await this.getClient(),
            s = {
              ...e,
              session_id: t,
              created_at: e.created_at || new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            { data: i, error: r } = await a
              .from("chat_messages")
              .insert(s)
              .select()
              .single();
          if (r)
            throw (
              (console.error("Error adding chat message:", r),
              Error(`Failed to add chat message: ${r.message}`))
            );
          return (
            await a
              .from("chat_sessions")
              .update({ last_message_at: new Date().toISOString() })
              .eq("id", t),
            i
          );
        }
        async deleteChat(t) {
          let e = await this.getClient(),
            { error: a } = await e
              .from("chat_messages")
              .delete()
              .eq("session_id", t);
          if (a) throw (console.error("Error deleting chat messages:", a), a);
          let { error: s } = await e.from("chat_sessions").delete().eq("id", t);
          if (s) throw (console.error("Error deleting chat session:", s), s);
          return { success: !0 };
        }
        async getMessageCountForUser(t, e) {
          let a = await this.getClient(),
            s = new Date(Date.now() - 60 * e * 6e4).toISOString(),
            { count: i, error: r } = await a
              .from("chat_messages")
              .select("*", { count: "exact", head: !0 })
              .eq("user_id", t)
              .gte("created_at", s);
          if (r)
            throw (
              (console.error("Error getting message count for user:", r), r)
            );
          return i || 0;
        }
        async storeStreamId(t, e) {
          let a = await this.getClient(),
            { data: s, error: i } = await a
              .from("chat_sessions")
              .select("context")
              .eq("id", t)
              .single();
          if (i || !s)
            return void console.error(
              `Chat not found for storing stream ID: ${t}`,
              i,
            );
          let r =
              "object" == typeof s.context && null !== s.context
                ? s.context
                : {},
            o = Array.isArray(r.streamIds) ? r.streamIds : [];
          o.includes(e) || o.push(e), (r.streamIds = o);
          let { error: n } = await a
            .from("chat_sessions")
            .update({ context: r })
            .eq("id", t);
          n && console.error(`Error storing stream ID for chat ${t}:`, n);
        }
        async getStreamIdsForChat(t) {
          let e = await this.getClient(),
            { data: a, error: s } = await e
              .from("chat_sessions")
              .select("context")
              .eq("id", t)
              .single();
          if (s || !a)
            return (
              console.error(`Chat not found for getting stream IDs: ${t}`, s),
              []
            );
          let i =
            "object" == typeof a.context && null !== a.context ? a.context : {};
          return i?.streamIds || [];
        }
        async deleteStreamIdsForChat(t) {
          let e = await this.getClient(),
            { data: a, error: s } = await e
              .from("chat_sessions")
              .select("context")
              .eq("id", t)
              .single();
          if (s || !a)
            return void console.error(
              `Chat not found for deleting stream IDs: ${t}`,
              s,
            );
          let i =
            "object" == typeof a.context && null !== a.context ? a.context : {};
          if (i.streamIds) {
            delete i.streamIds;
            let { error: a } = await e
              .from("chat_sessions")
              .update({ context: i })
              .eq("id", t);
            a && console.error(`Error deleting stream IDs for chat ${t}:`, a);
          }
        }
        toDomainEntity(t) {
          return t;
        }
        toChatEntity(t) {
          return s.ry.fromDatabase(t);
        }
        toChatSessionDomain(t) {
          return o.M.toChatSessionDomain(t);
        }
        fromDomainEntity(t) {
          let e = t.toObject();
          return (0, r.uc)(e);
        }
        fromChatSessionDomain(t) {
          return o.M.fromChatSessionDomain(t);
        }
        fromDomainEntityToDbRecord(t) {
          return this.fromDomainEntity(t);
        }
        mapRecordToDomain(t) {
          return this.toChatEntity(t);
        }
      }
    },
    26457: (t, e, a) => {
      "use strict";
      let s;
      a.d(e, {
        AG: () => I,
        ND: () => D,
        UU: () => g,
        db: () => p,
        ln: () => w,
        nH: () => y,
        r: () => A,
      });
      var i = a(68119),
        r = a(77719),
        o = a(60131),
        n = a.n(o);
      a(84147);
      let { fetch: d } = n()(),
        c = "http://localhost:54321",
        l =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
        m = process.env.SUPABASE_SERVICE_ROLE_KEY,
        u = l ? { apikey: l } : void 0,
        h = m ? { apikey: m } : void 0;
      function f() {
        if (!c || !l)
          throw (
            (console.error(
              "Missing environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
            ),
            Error("Supabase URL or Anon Key is missing."))
          );
      }
      {
        let t = globalThis;
        t.__USING_PONYFETCH__ || ((t.fetch = d), (t.__USING_PONYFETCH__ = !0));
      }
      function _() {
        return (f(), s)
          ? s
          : (s = (0, i.createBrowserClient)(c, l, { global: { headers: u } }));
      }
      function g() {
        return (
          f(), (0, i.createBrowserClient)(c, l, { global: { headers: u } })
        );
      }
      function p(t) {
        return (
          f(),
          (0, i.createServerClient)(c, l, {
            cookies: {
              get: (e) => t.get(e)?.value,
              set(e, a, s) {
                try {
                  t.set(e, a, s);
                } catch (t) {
                  console.warn(`Failed to set cookie '${e}':`, t);
                }
              },
              remove(e, a) {
                try {
                  t.set(e, "", a);
                } catch (t) {
                  console.warn(`Failed to remove cookie '${e}':`, t);
                }
              },
            },
            global: { fetch: d, headers: u },
          })
        );
      }
      function y() {
        if (!c || !m)
          throw (
            (console.error("Supabase URL or Service Role Key is missing"),
            Error("Supabase service client configuration is incomplete."))
          );
        return (0, r.createClient)(c, m, {
          auth: { autoRefreshToken: !1, persistSession: !1 },
          global: { fetch: d, headers: h },
        });
      }
      let w = (t) => {
          f();
          let e = t.headers.get("cookie") ?? "";
          return (0, i.createServerClient)(c, l, {
            cookies: {
              get(t) {
                let a = e.match(RegExp(`(^|;)s*${t}=([^;]+)`));
                return a?.[2];
              },
              set(t, e, a) {
                console.warn(
                  `Attempted to set cookie '${t}' in createEdgeClient. This must be handled by the caller via Response headers.`,
                );
              },
              remove(t, e) {
                console.warn(
                  `Attempted to remove cookie '${t}' in createEdgeClient. This must be handled by the caller via Response headers.`,
                );
              },
            },
            global: { fetch: d, headers: u },
          });
        },
        I = _,
        A = y,
        D = _();
    },
    44783: (t, e, a) => {
      "use strict";
      a.d(e, {
        Cb: () =>
          function t(e) {
            return Array.isArray(e)
              ? e.map((e) => t(e))
              : e instanceof Date
                ? e
                : "object" == typeof e && null !== e
                  ? Object.keys(e).reduce(
                      (a, i) => ({ ...a, [(0, s.camelCase)(i)]: t(e[i]) }),
                      {},
                    )
                  : e;
          },
        uc: () =>
          function t(e) {
            return Array.isArray(e)
              ? e.map((e) => t(e))
              : e instanceof Date
                ? e
                : "object" == typeof e && null !== e
                  ? Object.keys(e).reduce(
                      (a, i) => ({ ...a, [(0, s.snakeCase)(i)]: t(e[i]) }),
                      {},
                    )
                  : e;
          },
      });
      var s = a(78287);
    },
    48149: (t, e, a) => {
      "use strict";
      a.d(e, { UU: () => r, nH: () => i.nH });
      var s = a(15058),
        i = a(26457);
      let r = async function () {
        let t = await (0, s.UL)();
        return (0, i.db)(t);
      };
    },
    59570: () => {},
    86773: (t, e, a) => {
      "use strict";
      a.d(e, { c1: () => s, ry: () => o });
      var s = (function (t) {
        return (
          (t.GPT_3_5 = "gpt-3.5-turbo"),
          (t.GPT_4 = "gpt-4"),
          (t.GPT_4_VISION = "gpt-4-vision-preview"),
          (t.CLAUDE_3_SONNET = "claude-3-sonnet"),
          (t.CLAUDE_3_OPUS = "claude-3-opus"),
          (t.CLAUDE_3_HAIKU = "claude-3-haiku"),
          t
        );
      })({});
      class i {
        constructor(t) {
          (this.id = t.id),
            (this.chatId = t.chatId),
            (this.role = t.role),
            (this.content = t.content),
            (this.attachments = t.attachments || []),
            (this.metadata = t.metadata || {}),
            (this.createdAt = t.createdAt || new Date());
        }
        static fromDatabase(t, e = []) {
          return new i({
            id: t.id,
            chatId: t.session_id,
            role: t.role,
            content: t.content || "",
            attachments: e.filter((e) => e.messageId === t.id),
            metadata:
              "object" == typeof t.metadata && t.metadata ? t.metadata : {},
            createdAt: new Date(t.created_at),
          });
        }
      }
      class r {
        constructor(t) {
          (this.id = t.id),
            (this.messageId = t.messageId),
            (this.type = t.type),
            (this.fileId = t.fileId || null),
            (this.url = t.url || null),
            (this.name = t.name),
            (this.contentType = t.contentType || null),
            (this.size = t.size || null),
            (this.metadata = t.metadata || {}),
            (this.createdAt = t.createdAt || new Date());
        }
        static fromDatabase(t) {
          return new r({
            id: t.id,
            messageId: t.message_id,
            type: t.type,
            fileId: t.file_id,
            url: t.url,
            name: t.name,
            contentType: t.content_type,
            size: t.size,
            metadata:
              "object" == typeof t.metadata && t.metadata ? t.metadata : {},
            createdAt: new Date(t.created_at),
          });
        }
      }
      class o {
        constructor(t) {
          (this.id = t.id),
            (this.userId = t.userId),
            (this.title = t.title),
            (this.description = t.description || null),
            (this.modelType = t.modelType || "gpt-4"),
            (this.visibility = t.visibility || "private"),
            (this.systemPrompt = t.systemPrompt || null),
            (this.messages = t.messages || []),
            (this.case_id = t.case_id || null),
            (this.metadata = t.rawMetadata || {}),
            (this.createdAt = t.createdAt || new Date()),
            (this.updatedAt = t.updatedAt || new Date());
        }
        addMessage(t) {
          let e = { ...t, chatId: this.id };
          return this.messages.push(e), (this.updatedAt = new Date()), this;
        }
        getLatestMessage() {
          return 0 === this.messages.length
            ? null
            : [...this.messages].sort(
                (t, e) => e.createdAt.getTime() - t.createdAt.getTime(),
              )[0];
        }
        assignToCase(t) {
          return (this.case_id = t), (this.updatedAt = new Date()), this;
        }
        updateMetadata(t) {
          return (
            (this.metadata = { ...this.metadata, ...t }),
            (this.updatedAt = new Date()),
            this
          );
        }
        updateDetails(t) {
          return (
            void 0 !== t.title && (this.title = t.title),
            void 0 !== t.description && (this.description = t.description),
            void 0 !== t.modelType && (this.modelType = t.modelType),
            void 0 !== t.visibility && (this.visibility = t.visibility),
            void 0 !== t.systemPrompt && (this.systemPrompt = t.systemPrompt),
            (this.updatedAt = new Date()),
            this
          );
        }
        toObject() {
          return {
            id: this.id,
            userId: this.userId,
            title: this.title,
            description: this.description,
            modelType: this.modelType,
            visibility: this.visibility,
            systemPrompt: this.systemPrompt,
            messages: this.messages,
            case_id: this.case_id,
            metadata: this.metadata,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
          };
        }
        static fromDatabase(t, e = [], a = []) {
          let s =
              "object" != typeof t.metadata ||
              null === t.metadata ||
              Array.isArray(t.metadata)
                ? {}
                : t.metadata,
            n = a.map(r.fromDatabase);
          return new o({
            id: t.id,
            userId: t.user_id,
            title: t.title || "Untitled Chat",
            description: s?.description || null,
            modelType: t.model || "gpt-4",
            visibility: t.visibility || "private",
            systemPrompt: t.system_prompt || null,
            messages: e.map((t) => i.fromDatabase(t, n)),
            case_id: t.case_id || null,
            rawMetadata: s,
            createdAt: t.created_at ? new Date(t.created_at) : new Date(),
            updatedAt: t.updated_at ? new Date(t.updated_at) : new Date(),
          });
        }
      }
    },
    87323: (t, e, a) => {
      "use strict";
      a.d(e, { M: () => i });
      var s = a(44783);
      class i {
        static toChatSessionDomain(t) {
          return {
            id: t.id,
            userId: t.user_id,
            title: t.title,
            systemPrompt: t.system_prompt,
            context: t.context,
            model: t.model,
            prompt: t.prompt,
            agentConfig: t.agent_config,
            caseId: t.case_id,
            lastMessageAt: t.last_message_at,
            metadata: t.metadata,
            visibility: t.visibility,
            createdAt: t.created_at,
            updatedAt: t.updated_at,
          };
        }
        static fromChatSessionDomain(t) {
          return {
            id: t.id,
            user_id: t.userId,
            title: t.title,
            system_prompt: t.systemPrompt,
            context: t.context,
            model: t.model,
            prompt: t.prompt,
            agent_config: t.agentConfig,
            case_id: t.caseId,
            last_message_at: t.lastMessageAt,
            metadata: t.metadata,
            visibility: t.visibility,
            created_at: t.createdAt,
            updated_at: t.updatedAt,
          };
        }
        static toChatMessageDomain(t) {
          return {
            id: t.id,
            sessionId: t.session_id,
            userId: t.user_id,
            role: t.role,
            content: t.content,
            sources: t.sources,
            toolCalls: t.tool_calls,
            tokens: t.tokens,
            metadata: t.metadata,
            createdAt: t.created_at,
            updatedAt: t.updated_at,
          };
        }
        static fromChatMessageDomain(t) {
          return {
            id: t.id,
            session_id: t.sessionId,
            user_id: t.userId,
            role: t.role,
            content: t.content,
            sources: t.sources,
            tool_calls: t.toolCalls,
            tokens: t.tokens,
            metadata: t.metadata,
            created_at: t.createdAt,
            updated_at: t.updatedAt,
          };
        }
        static toDocumentDomain(t) {
          return {
            id: t.id,
            userId: t.user_id,
            title: t.title,
            filename: t.filename,
            filePath: t.file_path,
            fileType: t.file_type,
            fileSize: t.file_size,
            content: t.content,
            text: t.text,
            status: t.status,
            classification: t.classification,
            metadata: t.metadata,
            createdAt: t.created_at,
            updatedAt: t.updated_at,
          };
        }
        static fromDocumentDomain(t) {
          return {
            id: t.id,
            user_id: t.userId,
            title: t.title,
            filename: t.filename,
            file_path: t.filePath,
            file_type: t.fileType,
            file_size: t.fileSize,
            content: t.content,
            text: t.text,
            status: t.status,
            classification: t.classification,
            metadata: t.metadata,
            created_at: t.createdAt,
            updated_at: t.updatedAt,
          };
        }
        static toCaseDomain(t) {
          return {
            id: t.id,
            userId: t.user_id,
            title: t.title,
            description: t.description,
            status: t.status,
            metadata: t.metadata,
            createdAt: t.created_at,
            updatedAt: t.updated_at,
          };
        }
        static fromCaseDomain(t) {
          return {
            id: t.id,
            user_id: t.userId,
            title: t.title,
            description: t.description,
            status: t.status,
            metadata: t.metadata,
            created_at: t.createdAt,
            updated_at: t.updatedAt,
          };
        }
        static toUserProfileDomain(t) {
          return {
            id: t.id,
            firstName: t.first_name,
            lastName: t.last_name,
            avatarUrl: t.avatar_url,
            bio: t.bio,
            countryOfCitizenship: t.country_of_citizenship,
            countryOfInterest: t.country_of_interest,
            countryOfResidence: t.country_of_residence,
            immigrationGoals: t.immigration_goals,
            language: t.language,
            timezone: t.timezone,
            visaType: t.visa_type,
            role: t.role,
            isAdmin: t.is_admin,
            createdAt: t.created_at,
            updatedAt: t.updated_at,
          };
        }
        static fromUserProfileDomain(t) {
          return {
            id: t.id,
            first_name: t.firstName,
            last_name: t.lastName,
            avatar_url: t.avatarUrl,
            bio: t.bio,
            country_of_citizenship: t.countryOfCitizenship,
            country_of_interest: t.countryOfInterest,
            country_of_residence: t.countryOfResidence,
            immigration_goals: t.immigrationGoals,
            language: t.language,
            timezone: t.timezone,
            visa_type: t.visaType,
            role: t.role,
            is_admin: t.isAdmin,
            created_at: t.createdAt,
            updated_at: t.updatedAt,
          };
        }
        static genericToDomain(t) {
          return (0, s.Cb)(t);
        }
        static genericFromDomain(t) {
          return (0, s.uc)(t);
        }
      }
    },
    88421: (t, e, a) => {
      "use strict";
      a.d(e, { g: () => i });
      var s = a(48149);
      class i {
        static {
          this.clientInstance = null;
        }
        constructor(t, e = {}) {
          this.tableName = t;
        }
        async getClient() {
          return (
            null === i.clientInstance && (i.clientInstance = (0, s.nH)()),
            i.clientInstance
          );
        }
        async getAll(t = {}) {
          let e = await this.getClient(),
            { data: a, error: s } = await e
              .from(this.tableName)
              .select("*")
              .range(t.offset || 0, (t.offset || 0) + (t.limit || 100) - 1);
          if (s) throw s;
          return a;
        }
        async getById(t) {
          let e = await this.getClient(),
            { data: a, error: s } = await e
              .from(this.tableName)
              .select("*")
              .eq("id", t)
              .single();
          if (s) {
            if ("PGRST116" === s.code) return null;
            throw s;
          }
          return a;
        }
        async create(t) {
          let e = await this.getClient(),
            { data: a, error: s } = await e
              .from(this.tableName)
              .insert(t)
              .select()
              .single();
          if (s) throw (console.error("[BaseRepository.create] Error:", s), s);
          return a;
        }
        async update(t, e) {
          let a = await this.getClient(),
            { data: s, error: i } = await a
              .from(this.tableName)
              .update(e)
              .eq("id", t)
              .select()
              .single();
          if (i) throw i;
          return s;
        }
        async delete(t) {
          let e = await this.getClient(),
            { error: a } = await e.from(this.tableName).delete().eq("id", t);
          if (a) throw a;
          return !0;
        }
      }
    },
    96708: (t) => {
      function e(t) {
        var e = Error("Cannot find module '" + t + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      (e.keys = () => []), (e.resolve = e), (e.id = 96708), (t.exports = e);
    },
    97108: (t) => {
      function e(t) {
        var e = Error("Cannot find module '" + t + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      (e.keys = () => []), (e.resolve = e), (e.id = 97108), (t.exports = e);
    },
  });
//# sourceMappingURL=3751.js.map
