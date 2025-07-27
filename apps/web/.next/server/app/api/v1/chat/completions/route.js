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
    (e._sentryDebugIds[t] = "3f50163c-65e3-4f9b-a11b-7e2138bfce45"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3f50163c-65e3-4f9b-a11b-7e2138bfce45"));
} catch (e) {}
("use strict");
(() => {
  var e = {};
  (e.id = 8246),
    (e.ids = [8246]),
    (e.modules = {
      3295: (e) => {
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      8086: (e) => {
        e.exports = require("module");
      },
      10846: (e) => {
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        e.exports = require("punycode");
      },
      19121: (e) => {
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        e.exports = require("process");
      },
      21820: (e) => {
        e.exports = require("os");
      },
      27910: (e) => {
        e.exports = require("stream");
      },
      28354: (e) => {
        e.exports = require("util");
      },
      29021: (e) => {
        e.exports = require("fs");
      },
      29294: (e) => {
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31421: (e) => {
        e.exports = require("node:child_process");
      },
      33873: (e) => {
        e.exports = require("path");
      },
      34631: (e) => {
        e.exports = require("tls");
      },
      36686: (e) => {
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        e.exports = require("node:http");
      },
      37830: (e) => {
        e.exports = require("node:stream/web");
      },
      38522: (e) => {
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        e.exports = require("node:tls");
      },
      44708: (e) => {
        e.exports = require("node:https");
      },
      44870: (e) => {
        e.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
      },
      48161: (e) => {
        e.exports = require("node:os");
      },
      53053: (e) => {
        e.exports = require("node:diagnostics_channel");
      },
      55511: (e) => {
        e.exports = require("crypto");
      },
      55591: (e) => {
        e.exports = require("https");
      },
      57075: (e) => {
        e.exports = require("node:stream");
      },
      57975: (e) => {
        e.exports = require("node:util");
      },
      62799: (e, t, r) => {
        r.d(t, { db: () => l });
        var s = r(61371),
          i = r(78814),
          o = r(69959);
        let a = process.env.DATABASE_URL;
        if (!a) throw Error("DATABASE_URL environment variable is required");
        let n = (0, i.A)(a, { max: 10, idle_timeout: 20, connect_timeout: 10 }),
          l = (0, s.f)(n, { schema: o, logger: !1 });
      },
      63033: (e) => {
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      73024: (e) => {
        e.exports = require("node:fs");
      },
      73566: (e) => {
        e.exports = require("worker_threads");
      },
      74075: (e) => {
        e.exports = require("zlib");
      },
      74998: (e) => {
        e.exports = require("perf_hooks");
      },
      75919: (e) => {
        e.exports = require("node:worker_threads");
      },
      76760: (e) => {
        e.exports = require("node:path");
      },
      77030: (e) => {
        e.exports = require("node:net");
      },
      77598: (e) => {
        e.exports = require("node:crypto");
      },
      79428: (e) => {
        e.exports = require("buffer");
      },
      79551: (e) => {
        e.exports = require("url");
      },
      79646: (e) => {
        e.exports = require("child_process");
      },
      80481: (e) => {
        e.exports = require("node:readline");
      },
      81630: (e) => {
        e.exports = require("http");
      },
      83997: (e) => {
        e.exports = require("tty");
      },
      84297: (e) => {
        e.exports = require("async_hooks");
      },
      86592: (e) => {
        e.exports = require("node:inspector");
      },
      91645: (e) => {
        e.exports = require("net");
      },
      94735: (e) => {
        e.exports = require("events");
      },
      98241: (e, t, r) => {
        r.r(t),
          r.d(t, {
            patchFetch: () => K,
            routeModule: () => C,
            serverHooks: () => U,
            workAsyncStorage: () => O,
            workUnitAsyncStorage: () => L,
          });
        var s = {};
        r.r(s),
          r.d(s, {
            DELETE: () => N,
            GET: () => P,
            HEAD: () => T,
            OPTIONS: () => j,
            PATCH: () => S,
            POST: () => M,
            PUT: () => R,
          });
        var i = r(94168),
          o = r(51293),
          a = r(64588),
          n = r(63033),
          l = r(68593),
          p = r(14795),
          d = r(57826),
          c = r(73346);
        class u {
          constructor() {
            (this.primaryModels = []),
              (this.fallbackModels = []),
              (this.redis = new c.Q({
                url: process.env.UPSTASH_REDIS_URL,
                token: process.env.UPSTASH_REDIS_TOKEN,
              })),
              this.initializeModels();
          }
          initializeModels() {
            process.env.ANTHROPIC_API_KEY &&
              this.primaryModels.push({
                client: new d.Ay({
                  apiKey: process.env.ANTHROPIC_API_KEY,
                  baseURL: "https://api.anthropic.com/v1/",
                }),
                priority: 5,
                name: "claude-3-5-sonnet-20241022",
                rateLimit: { requests: 40, window: 60 },
              }),
              process.env.OPENAI_API_KEY &&
                this.primaryModels.push({
                  client: new d.Ay({
                    apiKey: process.env.OPENAI_API_KEY,
                    baseURL: "https://api.openai.com/v1",
                  }),
                  priority: 4,
                  name: "gpt-4o",
                  rateLimit: { requests: 100, window: 60 },
                }),
              process.env.GEMINI_API_KEY &&
                this.primaryModels.push({
                  client: new d.Ay({
                    apiKey: process.env.GEMINI_API_KEY,
                    baseURL:
                      "https://generativelanguage.googleapis.com/v1beta/",
                  }),
                  priority: 3,
                  name: "gemini-1.5-pro",
                  rateLimit: { requests: 60, window: 60 },
                }),
              process.env.OPENAI_API_KEY &&
                this.fallbackModels.push({
                  client: new d.Ay({
                    apiKey: process.env.OPENAI_API_KEY,
                    baseURL: "https://api.openai.com/v1",
                  }),
                  priority: 5,
                  name: "gpt-4o-mini",
                  rateLimit: { requests: 200, window: 60 },
                }),
              process.env.GEMINI_API_KEY &&
                this.fallbackModels.push({
                  client: new d.Ay({
                    apiKey: process.env.GEMINI_API_KEY,
                    baseURL:
                      "https://generativelanguage.googleapis.com/v1beta/",
                  }),
                  priority: 4,
                  name: "gemini-1.5-flash",
                  rateLimit: { requests: 100, window: 60 },
                }),
              process.env.ANTHROPIC_API_KEY &&
                this.fallbackModels.push({
                  client: new d.Ay({
                    apiKey: process.env.ANTHROPIC_API_KEY,
                    baseURL: "https://api.anthropic.com/v1/",
                  }),
                  priority: 3,
                  name: "claude-3-haiku-20240307",
                  rateLimit: { requests: 60, window: 60 },
                }),
              this.primaryModels.sort((e, t) => t.priority - e.priority),
              this.fallbackModels.sort((e, t) => t.priority - e.priority);
          }
          async checkRateLimit(e) {
            try {
              let t = `rate_limit:${e}`,
                r = await this.redis.get(t);
              if (null === r) return await this.redis.setex(t, 60, 1), !0;
              let s = [...this.primaryModels, ...this.fallbackModels].find(
                (t) => t.name === e,
              );
              if (!s || Number(r) >= s.rateLimit.requests) return !1;
              return await this.redis.incr(t), !0;
            } catch (e) {
              return (
                console.warn("Rate limit check failed, allowing request:", e),
                !0
              );
            }
          }
          async tryModelCompletion(e, t) {
            try {
              if (!(await this.checkRateLimit(e.name)))
                throw Error(`Rate limit exceeded for ${e.name}`);
              let r = this.mapModelName(t.model, e.name);
              return {
                ...(await e.client.chat.completions.create({
                  model: r,
                  messages: t.messages,
                  max_tokens: t.max_tokens,
                  temperature: t.temperature,
                  stream: t.stream,
                })),
                model: e.name,
                hijraah_provider: this.getProviderName(e.name),
              };
            } catch (t) {
              throw (console.error(`Model ${e.name} failed:`, t), t);
            }
          }
          mapModelName(e, t) {
            let r = {
              "gpt-4o": { "gpt-4o": "gpt-4o", "gpt-4o-mini": "gpt-4o-mini" },
              "claude-3-5-sonnet": {
                "claude-3-5-sonnet-20241022": "claude-3-5-sonnet-20241022",
                "claude-3-haiku-20240307": "claude-3-haiku-20240307",
              },
              "gemini-pro": {
                "gemini-1.5-pro": "gemini-1.5-pro-latest",
                "gemini-1.5-flash": "gemini-1.5-flash-latest",
              },
            };
            return r[e]?.[t] ? r[e][t] : t;
          }
          getProviderName(e) {
            return e.includes("gpt")
              ? "openai"
              : e.includes("claude")
                ? "anthropic"
                : e.includes("gemini")
                  ? "google"
                  : "unknown";
          }
          async createChatCompletion(e) {
            [...this.primaryModels, ...this.fallbackModels];
            let t = [];
            for (let r of this.primaryModels)
              try {
                return await this.tryModelCompletion(r, e);
              } catch (e) {
                console.warn(`❌ Primary model ${r.name} failed:`, e),
                  t.push(e);
              }
            for (let r of this.fallbackModels)
              try {
                return await this.tryModelCompletion(r, e);
              } catch (e) {
                console.warn(`❌ Fallback model ${r.name} failed:`, e),
                  t.push(e);
              }
            let r = `All models failed: ${t.map((e) => e.message).join(", ")}`;
            throw (
              (console.error("\uD83D\uDCA5 Complete failure:", r), Error(r))
            );
          }
          async getModelStatus() {
            let e = async (e) => {
                let t = await this.checkRateLimit(e.name);
                return { name: e.name, available: t, priority: e.priority };
              },
              [t, r] = await Promise.all([
                Promise.all(this.primaryModels.map(e)),
                Promise.all(this.fallbackModels.map(e)),
              ]);
            return { primary: t, fallback: r };
          }
        }
        class m {
          constructor(e) {}
          async retrieve(e) {
            return [
              {
                content: `Stubbed retrieval result for: ${e.query} - Enhanced retrieval temporarily disabled during migration`,
                score: 0.9,
                metadata: {
                  source: "stub",
                  timestamp: new Date().toISOString(),
                },
              },
            ];
          }
        }
        var h = r(62799),
          g = r(69959),
          f = r(42476),
          x = r(58342),
          y = r(79273),
          w = r(60442);
        let _ = x.Ik({
            model: x.Yj().default("gpt-4o"),
            messages: x.YO(
              x.Ik({
                role: x.k5(["user", "assistant", "system"]),
                content: x.Yj(),
              }),
            ),
            max_tokens: x.ai().optional(),
            temperature: x.ai().min(0).max(2).default(0.7),
            stream: x.zM().default(!1),
            web_index_id: x.Yj().optional(),
            use_rag: x.zM().default(!0),
            chat_session_id: x.Yj().optional(),
          }),
          v = new u(),
          b = new m();
        async function q(e) {
          try {
            let t = await (0, p.j2)();
            if (!t?.user?.id)
              return l.NextResponse.json(
                {
                  error: {
                    message: "Unauthorized",
                    type: "authentication_error",
                  },
                },
                { status: 401 },
              );
            let r = await e.json(),
              s = _.parse(r),
              i = s.messages.filter((e) => "user" === e.role).pop();
            if (!i)
              return l.NextResponse.json(
                {
                  error: {
                    message: "No user message found",
                    type: "invalid_request_error",
                  },
                },
                { status: 400 },
              );
            let o = s.messages,
              a = [];
            if (s.use_rag && s.web_index_id) {
              let [e] = await h.db
                .select()
                .from(g.webIndexes)
                .where(
                  (0, f.Uo)(
                    (0, f.eq)(g.webIndexes.id, s.web_index_id),
                    (0, f.eq)(g.webIndexes.userId, t.user.id),
                  ),
                )
                .limit(1);
              if (e)
                try {
                  if (
                    (a = (
                      await b.retrieve(i.content, {
                        limit: 5,
                        webIndexId: s.web_index_id,
                      })
                    ).documents).length > 0
                  ) {
                    let e = a
                      .map((e, t) => `[Source ${t + 1}]: ${e.content}`)
                      .join("\n\n");
                    o = [
                      {
                        role: "system",
                        content: `You are an AI assistant for Hijraah Immigration Platform. Use the following context to answer the user's question. If the context doesn't contain relevant information, say so clearly.

Context:
${e}

Instructions:
- Provide accurate, helpful answers based on the context
- Cite sources when referencing specific information
- If information is not in the context, acknowledge this limitation
- Focus on immigration-related guidance when appropriate`,
                      },
                      ...s.messages,
                    ];
                  }
                } catch (e) {
                  console.warn(
                    "RAG retrieval failed, continuing without context:",
                    e,
                  );
                }
            }
            let n = await v.createChatCompletion({
              model: s.model,
              messages: o,
              max_tokens: s.max_tokens,
              temperature: s.temperature,
              stream: s.stream,
            });
            if (s.chat_session_id)
              try {
                let [e] = await h.db
                  .select()
                  .from(g.chatSessions)
                  .where(
                    (0, f.Uo)(
                      (0, f.eq)(g.chatSessions.id, s.chat_session_id),
                      (0, f.eq)(g.chatSessions.userId, t.user.id),
                    ),
                  )
                  .limit(1);
                if (e) {
                  await h.db
                    .insert(g.chatMessages)
                    .values({
                      chatId: s.chat_session_id,
                      role: "user",
                      content: i.content,
                      metadata: {
                        webIndexId: s.web_index_id,
                        sourcesCount: a.length,
                      },
                    });
                  let e = s.stream
                    ? "[Streaming response]"
                    : n.choices[0]?.message?.content || "";
                  await h.db
                    .insert(g.chatMessages)
                    .values({
                      chatId: s.chat_session_id,
                      role: "assistant",
                      content: e,
                      metadata: {
                        model: n.model,
                        usage: n.usage,
                        sources: a.map((e) => ({
                          id: e.id,
                          title: e.title,
                          url: e.source,
                        })),
                      },
                    });
                }
              } catch (e) {
                console.error("Failed to store chat messages:", e);
              }
            if (s.stream)
              return new Response(n.stream, {
                headers: {
                  "Content-Type": "text/event-stream",
                  "Cache-Control": "no-cache",
                  Connection: "keep-alive",
                },
              });
            let d = {
              ...n,
              hijraah_metadata: {
                sources: a.map((e) => ({
                  id: e.id,
                  title: e.title,
                  url: e.source,
                  relevance: e.similarity,
                })),
                web_index_id: s.web_index_id,
                rag_enabled: s.use_rag,
              },
            };
            return l.NextResponse.json(d);
          } catch (e) {
            if (
              (console.error("Error in chat completions:", e), e instanceof y.G)
            )
              return l.NextResponse.json(
                {
                  error: {
                    message: "Invalid request parameters",
                    type: "invalid_request_error",
                    details: e.errors,
                  },
                },
                { status: 400 },
              );
            return l.NextResponse.json(
              {
                error: { message: "Internal server error", type: "api_error" },
              },
              { status: 500 },
            );
          }
        }
        async function I() {
          return l.NextResponse.json({
            name: "Hijraah Chat Completions API",
            description:
              "OpenAI-compatible chat completions with RAG capabilities",
            version: "1.0.0",
            endpoints: {
              "POST /api/v1/chat/completions": {
                description:
                  "Create a chat completion with optional RAG retrieval",
                parameters: {
                  model: "AI model to use (default: gpt-4o)",
                  messages: "Array of chat messages",
                  web_index_id: "Optional web index ID for RAG retrieval",
                  use_rag: "Enable/disable RAG retrieval (default: true)",
                  chat_session_id:
                    "Optional chat session ID for message storage",
                  temperature: "Sampling temperature (0-2, default: 0.7)",
                  max_tokens: "Maximum tokens in response",
                  stream: "Enable streaming response (default: false)",
                },
              },
            },
            authentication: "Bearer token required",
          });
        }
        let A = { ...n },
          k =
            "workUnitAsyncStorage" in A
              ? A.workUnitAsyncStorage
              : "requestAsyncStorage" in A
                ? A.requestAsyncStorage
                : void 0;
        function E(e, t) {
          return "phase-production-build" === process.env.NEXT_PHASE ||
            "function" != typeof e
            ? e
            : new Proxy(e, {
                apply: (e, r, s) => {
                  let i;
                  try {
                    let e = k?.getStore();
                    i = e?.headers;
                  } catch (e) {}
                  return w
                    .wrapRouteHandlerWithSentry(e, {
                      method: t,
                      parameterizedRoute: "/api/v1/chat/completions",
                      headers: i,
                    })
                    .apply(r, s);
                },
              });
        }
        let P = E(I, "GET"),
          M = E(q, "POST"),
          R = E(void 0, "PUT"),
          S = E(void 0, "PATCH"),
          N = E(void 0, "DELETE"),
          T = E(void 0, "HEAD"),
          j = E(void 0, "OPTIONS"),
          C = new i.AppRouteRouteModule({
            definition: {
              kind: o.RouteKind.APP_ROUTE,
              page: "/api/v1/chat/completions/route",
              pathname: "/api/v1/chat/completions",
              filename: "route",
              bundlePath: "app/api/v1/chat/completions/route",
            },
            resolvedPagePath:
              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\v1\\chat\\completions\\route.ts",
            nextConfigOutput: "",
            userland: s,
          }),
          { workAsyncStorage: O, workUnitAsyncStorage: L, serverHooks: U } = C;
        function K() {
          return (0, a.patchFetch)({
            workAsyncStorage: O,
            workUnitAsyncStorage: L,
          });
        }
      },
    });
  var t = require("../../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2872, 7713, 5149, 7719, 8119, 5058, 5400, 131, 8342, 2028,
        7826, 1070, 978, 3346, 1371, 4232, 9632, 9959,
      ],
      () => r(98241),
    );
  module.exports = s;
})();
//# sourceMappingURL=route.js.map
