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
    (e._sentryDebugIds[t] = "90511897-1b8b-420f-a6ee-e1e8b0a15c64"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-90511897-1b8b-420f-a6ee-e1e8b0a15c64"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4],
  {
    6934: () => {},
    25356: (e) => {
      "use strict";
      e.exports = require("node:buffer");
    },
    33624: (e, t, r) => {
      "use strict";
      let a;
      r.d(t, { AG: () => f });
      var i = r(14371),
        n = r(49977),
        s = r.n(n);
      r(84994);
      let { fetch: o } = s()(),
        c = "http://localhost:54321",
        l =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
        u = process.env.SUPABASE_SERVICE_ROLE_KEY,
        d = l ? { apikey: l } : void 0;
      {
        let e = globalThis;
        e.__USING_PONYFETCH__ || ((e.fetch = o), (e.__USING_PONYFETCH__ = !0));
      }
      function p() {
        return ((function () {
          if (!c || !l)
            throw (
              (console.error(
                "Missing environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
              ),
              Error("Supabase URL or Anon Key is missing."))
            );
        })(),
        a)
          ? a
          : (a = (0, i.createBrowserClient)(c, l, { global: { headers: d } }));
      }
      let f = p;
      p();
    },
    43886: () => {},
    65521: (e) => {
      "use strict";
      e.exports = require("node:async_hooks");
    },
    97602: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { ComponentMod: () => eI, default: () => eA });
      var a,
        i = {};
      r.r(i),
        r.d(i, {
          DELETE: () => eg,
          GET: () => eu,
          HEAD: () => em,
          OPTIONS: () => eh,
          PATCH: () => ef,
          POST: () => ed,
          PUT: () => ep,
          dynamic: () => K,
          maxDuration: () => Q,
          runtime: () => Z,
        });
      var n = {};
      r.r(n),
        r.d(n, {
          patchFetch: () => ew,
          routeModule: () => eb,
          serverHooks: () => eE,
          workAsyncStorage: () => ey,
          workUnitAsyncStorage: () => e_,
        });
      var s = r(12375),
        o = r(74236),
        c = r(25980),
        l = r(41233),
        u = r(29902),
        d = r(79767),
        p = r(72283),
        f = r(36083),
        g = r(20032),
        m = r(33624);
      g.Ik({
        id: g.Yj(),
        userId: g.Yj().optional(),
        messages: g.YO(g.bz()),
        metadata: g.g1(g.bz()).optional(),
        status: g.k5([
          "idle",
          "thinking",
          "executing",
          "waiting",
          "complete",
          "error",
        ]),
        createdAt: g.Yj(),
        updatedAt: g.Yj(),
        isArchived: g.zM().default(!1),
      });
      var h = (function (e) {
        return (
          (e.VISA_ASSISTANT = "visa_assistant"),
          (e.DOCUMENT_PREPARER = "document_preparer"),
          (e.ELIGIBILITY_CHECKER = "eligibility_checker"),
          (e.IMMIGRATION_ADVISOR = "immigration_advisor"),
          e
        );
      })({});
      async function b(e) {
        let t = (0, m.AG)(),
          { data: r, error: a } = await t
            .from("agents")
            .select("*")
            .eq("id", e)
            .single();
        return a || !r
          ? (console.error("Failed to load agent:", a), null)
          : E(r);
      }
      async function y(e, t, r = []) {
        let a = _(t, {
          userId: e,
          messages: r,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        return await a.save(), a;
      }
      function _(e, t) {
        switch (e) {
          case "visa_assistant":
            return new VisaAssistantAgent(t);
          case "document_preparer":
            return new DocumentPreparerAgent(t);
          case "eligibility_checker":
            return new EligibilityCheckerAgent(t);
          default:
            return new ImmigrationAdvisorAgent(t);
        }
      }
      function E(e) {
        return _(e.agent_type, {
          id: e.id,
          userId: e.user_id,
          messages: e.messages,
          metadata: e.metadata,
          status: e.status,
          createdAt: e.created_at,
          updatedAt: e.updated_at,
          isArchived: e.is_archived,
        });
      }
      async function w(e) {
        let t = (0, m.AG)(),
          { data: r, error: a } = await t
            .from("agents")
            .select("*")
            .eq("user_id", e)
            .eq("is_archived", !1)
            .order("updated_at", { ascending: !1 });
        return a ? (console.error("Failed to list agents:", a), []) : r.map(E);
      }
      class v {
        constructor(e) {
          this.userId = e;
        }
        async createAgent(e) {
          if (!this.userId)
            throw Error("User ID is required to create an agent");
          return y(this.userId, e);
        }
        async getAgent(e) {
          return b(e);
        }
        async listAgents() {
          return this.userId ? w(this.userId) : [];
        }
        async sendMessage(e, t) {
          let r = await this.getAgent(e);
          if (!r) throw Error(`Agent with ID ${e} not found`);
          return r.processMessage(t);
        }
        async routeMessage(e) {
          if (!this.userId)
            throw Error("User ID is required to route messages");
          let t = await this.listAgents(),
            r = this.classifyMessageIntent(e),
            a = t.find((e) => e.type === r);
          if (a) {
            let t = await a.processMessage(e);
            return { agentId: a.id, response: t, isNewAgent: !1 };
          }
          {
            let t = await this.createAgent(r),
              a = await t.processMessage(e);
            return { agentId: t.id, response: a, isNewAgent: !0 };
          }
        }
        async archiveAgent(e) {
          let t = await this.getAgent(e);
          return !!t && (await t.archive(), !0);
        }
        async executeAgentStep(e) {
          let t = await this.getAgent(e);
          if (!t) throw Error(`Agent with ID ${e} not found`);
          return t.executeStep();
        }
        async saveAgentFeedback(e, t) {
          if (!this.userId) throw Error("User ID is required to save feedback");
          let r = (0, m.AG)();
          await r
            .from("agent_feedback")
            .insert({
              agent_id: e,
              user_id: this.userId,
              rating: t.rating,
              comments: t.comments,
              was_helpful: t.wasHelpful,
              created_at: new Date().toISOString(),
            });
        }
        classifyMessageIntent(e) {
          let t = e.toLowerCase();
          return t.includes("visa") ||
            t.includes("permit") ||
            t.includes("application status")
            ? h.VISA_ASSISTANT
            : t.includes("document") ||
                t.includes("form") ||
                t.includes("paperwork") ||
                t.includes("certificate")
              ? h.DOCUMENT_PREPARER
              : t.includes("eligible") ||
                  t.includes("qualify") ||
                  t.includes("requirements") ||
                  t.includes("criteria")
                ? h.ELIGIBILITY_CHECKER
                : h.IMMIGRATION_ADVISOR;
        }
      }
      function S(e) {
        return new v(e);
      }
      var R = r(14371),
        I = r(70303),
        A = r(40632),
        k = r(55566),
        O = r(62299),
        T = r(41301),
        x = r(78614),
        P = r(74480),
        j = r(43209);
      let M = new WeakMap();
      function C(e) {
        let t = M.get(e);
        if (t) return t;
        let r = Promise.resolve(e);
        return (
          M.set(e, r),
          Object.defineProperties(r, {
            [Symbol.iterator]: {
              value: e[Symbol.iterator]
                ? e[Symbol.iterator].bind(e)
                : U.bind(e),
            },
            size: { get: () => e.size },
            get: { value: e.get.bind(e) },
            getAll: { value: e.getAll.bind(e) },
            has: { value: e.has.bind(e) },
            set: { value: e.set.bind(e) },
            delete: { value: e.delete.bind(e) },
            clear: {
              value:
                "function" == typeof e.clear ? e.clear.bind(e) : $.bind(e, r),
            },
            toString: { value: e.toString.bind(e) },
          }),
          r
        );
      }
      function D(e) {
        return "object" == typeof e && null !== e && "string" == typeof e.name
          ? `'${e.name}'`
          : "string" == typeof e
            ? `'${e}'`
            : "...";
      }
      let N = (0, P.I)(q);
      function q(e, t) {
        let r = e ? `Route "${e}" ` : "This route ";
        return Object.defineProperty(
          Error(
            `${r}used ${t}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E223", enumerable: !1, configurable: !0 },
        );
      }
      function U() {
        return this.getAll()
          .map((e) => [e.name, e])
          .values();
      }
      function $(e) {
        for (let e of this.getAll()) this.delete(e.name);
        return e;
      }
      r(41534);
      let z = new WeakMap(),
        F = (0, P.I)(function (e, t) {
          let r = e ? `Route "${e}" ` : "This route ";
          return Object.defineProperty(
            Error(
              `${r}used ${t}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`,
            ),
            "__NEXT_ERROR_CODE",
            { value: "E277", enumerable: !1, configurable: !0 },
          );
        });
      function L() {
        let e = workAsyncStorage.getStore(),
          t = workUnitAsyncStorage.getStore();
        switch (
          ((!e || !t) && throwForMissingRequestStore("draftMode"), t.type)
        ) {
          case "request":
            return B(t.draftMode, e);
          case "cache":
          case "unstable-cache":
            let r = getDraftModeProviderForCacheScope(e, t);
            if (r) return B(r, e);
          case "prerender":
          case "prerender-ppr":
          case "prerender-legacy":
            return X(null);
          default:
            return t;
        }
      }
      function B(e, t) {
        let r,
          a = H.get(L);
        return a || ((r = X(e)), H.set(e, r), r);
      }
      r(19073);
      let H = new WeakMap();
      function X(e) {
        let t = new G(e),
          r = Promise.resolve(t);
        return (
          Object.defineProperty(r, "isEnabled", {
            get: () => t.isEnabled,
            set(e) {
              Object.defineProperty(r, "isEnabled", {
                value: e,
                writable: !0,
                enumerable: !0,
              });
            },
            enumerable: !0,
            configurable: !0,
          }),
          (r.enable = t.enable.bind(t)),
          (r.disable = t.disable.bind(t)),
          r
        );
      }
      class G {
        constructor(e) {
          this._provider = e;
        }
        get isEnabled() {
          return null !== this._provider && this._provider.isEnabled;
        }
        enable() {
          J("draftMode().enable()"),
            null !== this._provider && this._provider.enable();
        }
        disable() {
          J("draftMode().disable()"),
            null !== this._provider && this._provider.disable();
        }
      }
      let Y = (0, P.I)(function (e, t) {
        let r = e ? `Route "${e}" ` : "This route ";
        return Object.defineProperty(
          Error(
            `${r}used ${t}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E377", enumerable: !1, configurable: !0 },
        );
      });
      function J(e) {
        let t = workAsyncStorage.getStore(),
          r = workUnitAsyncStorage.getStore();
        if (t) {
          if (r) {
            if ("cache" === r.type)
              throw Object.defineProperty(
                Error(
                  `Route ${t.route} used "${e}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
                ),
                "__NEXT_ERROR_CODE",
                { value: "E246", enumerable: !1, configurable: !0 },
              );
            else if ("unstable-cache" === r.type)
              throw Object.defineProperty(
                Error(
                  `Route ${t.route} used "${e}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`,
                ),
                "__NEXT_ERROR_CODE",
                { value: "E259", enumerable: !1, configurable: !0 },
              );
            else if ("after" === r.phase)
              throw Object.defineProperty(
                Error(
                  `Route ${t.route} used "${e}" inside \`after\`. The enabled status of draftMode can be read inside \`after\` but you cannot enable or disable draftMode. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`,
                ),
                "__NEXT_ERROR_CODE",
                { value: "E348", enumerable: !1, configurable: !0 },
              );
          }
          if (t.dynamicShouldError)
            throw Object.defineProperty(
              new StaticGenBailoutError(
                `Route ${t.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${e}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
              ),
              "__NEXT_ERROR_CODE",
              { value: "E553", enumerable: !1, configurable: !0 },
            );
          if (r) {
            if ("prerender" === r.type) {
              let a = Object.defineProperty(
                Error(
                  `Route ${t.route} used ${e} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`,
                ),
                "__NEXT_ERROR_CODE",
                { value: "E126", enumerable: !1, configurable: !0 },
              );
              abortAndThrowOnSynchronousRequestDataAccess(t.route, e, a, r);
            } else if ("prerender-ppr" === r.type)
              postponeWithTracking(t.route, e, r.dynamicTracking);
            else if ("prerender-legacy" === r.type) {
              r.revalidate = 0;
              let a = Object.defineProperty(
                new DynamicServerError(
                  `Route ${t.route} couldn't be rendered statically because it used \`${e}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`,
                ),
                "__NEXT_ERROR_CODE",
                { value: "E558", enumerable: !1, configurable: !0 },
              );
              throw (
                ((t.dynamicUsageDescription = e),
                (t.dynamicUsageStack = a.stack),
                a)
              );
            }
          }
        }
      }
      async function W(e) {
        let t = (function () {
            let e = (function () {
              let e = "cookies",
                t = k.J.getStore(),
                r = p.workUnitAsyncStorage.getStore();
              if (t) {
                if (r && "after" === r.phase && !(0, j.iC)())
                  throw Object.defineProperty(
                    Error(
                      `Route ${t.route} used "cookies" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "cookies" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`,
                    ),
                    "__NEXT_ERROR_CODE",
                    { value: "E88", enumerable: !1, configurable: !0 },
                  );
                if (t.forceStatic)
                  return C(I.Ck.seal(new A.tm(new Headers({}))));
                if (r) {
                  if ("cache" === r.type)
                    throw Object.defineProperty(
                      Error(
                        `Route ${t.route} used "cookies" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
                      ),
                      "__NEXT_ERROR_CODE",
                      { value: "E398", enumerable: !1, configurable: !0 },
                    );
                  else if ("unstable-cache" === r.type)
                    throw Object.defineProperty(
                      Error(
                        `Route ${t.route} used "cookies" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`,
                      ),
                      "__NEXT_ERROR_CODE",
                      { value: "E157", enumerable: !1, configurable: !0 },
                    );
                }
                if (t.dynamicShouldError)
                  throw Object.defineProperty(
                    new T.f(
                      `Route ${t.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
                    ),
                    "__NEXT_ERROR_CODE",
                    { value: "E549", enumerable: !1, configurable: !0 },
                  );
                if (r)
                  if ("prerender" === r.type) {
                    var a = t.route,
                      i = r;
                    let e = M.get(i);
                    if (e) return e;
                    let n = (0, x.W)(i.renderSignal, "`cookies()`");
                    return (
                      M.set(i, n),
                      Object.defineProperties(n, {
                        [Symbol.iterator]: {
                          value: function () {
                            let e = "`cookies()[Symbol.iterator]()`",
                              t = q(a, e);
                            (0, O.t3)(a, e, t, i);
                          },
                        },
                        size: {
                          get() {
                            let e = "`cookies().size`",
                              t = q(a, e);
                            (0, O.t3)(a, e, t, i);
                          },
                        },
                        get: {
                          value: function () {
                            let e;
                            e =
                              0 == arguments.length
                                ? "`cookies().get()`"
                                : `\`cookies().get(${D(arguments[0])})\``;
                            let t = q(a, e);
                            (0, O.t3)(a, e, t, i);
                          },
                        },
                        getAll: {
                          value: function () {
                            let e;
                            e =
                              0 == arguments.length
                                ? "`cookies().getAll()`"
                                : `\`cookies().getAll(${D(arguments[0])})\``;
                            let t = q(a, e);
                            (0, O.t3)(a, e, t, i);
                          },
                        },
                        has: {
                          value: function () {
                            let e;
                            e =
                              0 == arguments.length
                                ? "`cookies().has()`"
                                : `\`cookies().has(${D(arguments[0])})\``;
                            let t = q(a, e);
                            (0, O.t3)(a, e, t, i);
                          },
                        },
                        set: {
                          value: function () {
                            let e;
                            if (0 == arguments.length) e = "`cookies().set()`";
                            else {
                              let t = arguments[0];
                              e = t
                                ? `\`cookies().set(${D(t)}, ...)\``
                                : "`cookies().set(...)`";
                            }
                            let t = q(a, e);
                            (0, O.t3)(a, e, t, i);
                          },
                        },
                        delete: {
                          value: function () {
                            let e;
                            e =
                              0 == arguments.length
                                ? "`cookies().delete()`"
                                : 1 == arguments.length
                                  ? `\`cookies().delete(${D(arguments[0])})\``
                                  : `\`cookies().delete(${D(arguments[0])}, ...)\``;
                            let t = q(a, e);
                            (0, O.t3)(a, e, t, i);
                          },
                        },
                        clear: {
                          value: function () {
                            let e = "`cookies().clear()`",
                              t = q(a, e);
                            (0, O.t3)(a, e, t, i);
                          },
                        },
                        toString: {
                          value: function () {
                            let e = "`cookies().toString()`",
                              t = q(a, e);
                            (0, O.t3)(a, e, t, i);
                          },
                        },
                      }),
                      n
                    );
                  } else
                    "prerender-ppr" === r.type
                      ? (0, O.Ui)(t.route, e, r.dynamicTracking)
                      : "prerender-legacy" === r.type && (0, O.xI)(e, t, r);
                (0, O.Pk)(t, r);
              }
              let n = (0, p.getExpectedRequestStore)(e);
              return C((0, I.Xj)(n) ? n.userspaceMutableCookies : n.cookies);
            })();
            return (0, R.createServerClient)(
              "http://localhost:54321",
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
              { cookies: { get: (t) => e.get(t)?.value } },
            );
          })(),
          {
            data: { user: r },
            error: a,
          } = await t.auth.getUser();
        return a || !r
          ? (a &&
              console.error(
                "Error fetching user in getAuthenticatedUser (API route):",
              ),
            null)
          : {
              ...r,
              fullName: r.user_metadata?.full_name || r.user_metadata?.name,
              avatarUrl: r.user_metadata?.avatar_url,
              role:
                r.user_metadata?.role === "admin" ||
                r.user_metadata?.role === "user"
                  ? r.user_metadata.role
                  : "user",
            };
      }
      var V = r(35655);
      let Z = "edge",
        K = "force-dynamic",
        Q = 60,
        ee = g.Ik({
          agentType: g.k5([
            h.VISA_ASSISTANT,
            h.DOCUMENT_PREPARER,
            h.ELIGIBILITY_CHECKER,
            h.IMMIGRATION_ADVISOR,
          ]),
        }),
        et = g.Ik({ agentId: g.Yj(), message: g.Yj() }),
        er = g.Ik({ message: g.Yj() }),
        ea = g.Ik({
          agentId: g.Yj(),
          rating: g.ai().min(1).max(5),
          comments: g.Yj().optional(),
          wasHelpful: g.zM(),
        });
      async function ei(e) {
        try {
          let t = await W(e);
          if (!t) return f.Rp.json({ error: "Unauthorized" }, { status: 401 });
          let r = S(t.id),
            a = await r.listAgents();
          return f.Rp.json({ agents: a });
        } catch (e) {
          return (
            console.error("Error listing agents:", e),
            f.Rp.json({ error: "Failed to list agents" }, { status: 500 })
          );
        }
      }
      async function en(e) {
        try {
          let t = await W(e);
          if (!t) return f.Rp.json({ error: "Unauthorized" }, { status: 401 });
          let r = await e.json();
          if ("create" === r.action) {
            let { agentType: e } = ee.parse(r),
              a = S(t.id),
              i = await a.createAgent(e);
            return f.Rp.json({ agentId: i.id });
          }
          if ("message" === r.action) {
            let { agentId: e, message: a } = et.parse(r),
              i = S(t.id),
              n = (0, m.AG)();
            await n
              .from("user_interactions")
              .insert({
                user_id: t.id,
                interaction_type: "agent_message",
                content: a,
                created_at: new Date().toISOString(),
              });
            let s = await i.sendMessage(e, a);
            if ("string" == typeof s) return f.Rp.json({ response: s });
            return new Response(s);
          }
          if ("route" === r.action) {
            let { message: e } = er.parse(r),
              a = S(t.id),
              i = await a.routeMessage(e);
            if ("string" == typeof i.response)
              return f.Rp.json({
                agentId: i.agentId,
                response: i.response,
                isNewAgent: i.isNewAgent,
              });
            let n = new TextEncoder()
                .encode(`data: ${JSON.stringify({ agentId: i.agentId, isNewAgent: i.isNewAgent })}

`),
              s = new ReadableStream({
                start(e) {
                  e.enqueue(n);
                },
              }),
              o = new ReadableStream({
                async start(e) {
                  let t = s.getReader(),
                    r = i.response.getReader(),
                    { value: a, done: n } = await t.read();
                  for (n || e.enqueue(a); ; ) {
                    let { value: t, done: a } = await r.read();
                    if (a) break;
                    e.enqueue(t);
                  }
                  e.close();
                },
              });
            return new Response(o);
          } else {
            if ("feedback" !== r.action)
              return f.Rp.json({ error: "Invalid action" }, { status: 400 });
            let e = ea.parse(r),
              a = S(t.id);
            return (
              await a.saveAgentFeedback(e.agentId, {
                rating: e.rating,
                comments: e.comments,
                wasHelpful: e.wasHelpful,
              }),
              f.Rp.json({ success: !0 })
            );
          }
        } catch (e) {
          return (
            console.error("Error processing agent request:", e),
            f.Rp.json({ error: "Failed to process request" }, { status: 500 })
          );
        }
      }
      async function es(e) {
        try {
          let t = await W(e);
          if (!t) return f.Rp.json({ error: "Unauthorized" }, { status: 401 });
          let { searchParams: r } = new URL(e.url),
            a = r.get("agentId");
          if (!a)
            return f.Rp.json(
              { error: "Agent ID is required" },
              { status: 400 },
            );
          let i = S(t.id);
          if (await i.archiveAgent(a)) return f.Rp.json({ success: !0 });
          return f.Rp.json(
            { error: "Agent not found or could not be archived" },
            { status: 404 },
          );
        } catch (e) {
          return (
            console.error("Error archiving agent:", e),
            f.Rp.json({ error: "Failed to archive agent" }, { status: 500 })
          );
        }
      }
      let eo = { ...p },
        ec =
          "workUnitAsyncStorage" in eo
            ? eo.workUnitAsyncStorage
            : "requestAsyncStorage" in eo
              ? eo.requestAsyncStorage
              : void 0;
      function el(e, t) {
        return "phase-production-build" === process.env.NEXT_PHASE ||
          "function" != typeof e
          ? e
          : new Proxy(e, {
              apply: (e, r, a) => {
                let i;
                try {
                  let e = ec?.getStore();
                  i = e?.headers;
                } catch (e) {}
                return V.f(e, {
                  method: t,
                  parameterizedRoute: "/api/agents",
                  headers: i,
                }).apply(r, a);
              },
            });
      }
      let eu = el(ei, "GET"),
        ed = el(en, "POST"),
        ep = el(void 0, "PUT"),
        ef = el(void 0, "PATCH"),
        eg = el(es, "DELETE"),
        em = el(void 0, "HEAD"),
        eh = el(void 0, "OPTIONS"),
        eb = new l.AppRouteRouteModule({
          definition: {
            kind: u.A.APP_ROUTE,
            page: "/api/agents/route",
            pathname: "/api/agents",
            filename: "route",
            bundlePath: "app/api/agents/route",
          },
          resolvedPagePath:
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\api\\agents\\route.ts",
          nextConfigOutput: "",
          userland: i,
        }),
        {
          workAsyncStorage: ey,
          workUnitAsyncStorage: e_,
          serverHooks: eE,
        } = eb;
      function ew() {
        return (0, d.V5)({ workAsyncStorage: ey, workUnitAsyncStorage: e_ });
      }
      let ev = {
          env: {
            _sentryRewriteFramesDistDir: ".next",
            _sentryRewriteFramesAssetPrefixPath: "",
            _sentryRewritesTunnelPath: "/monitoring",
            _sentryRelease: "d92a5e8d8d7c20e1f785b33fde2c15257fdb31d2",
          },
          eslint: {
            ignoreDuringBuilds: !1,
            dirs: ["src", "app", "config", "scripts", "__tests__"],
          },
          typescript: { ignoreBuildErrors: !0, tsconfigPath: "tsconfig.json" },
          distDir: ".next",
          cleanDistDir: !0,
          assetPrefix: "",
          cacheMaxMemorySize: 0x3200000,
          configOrigin: "next.config.mjs",
          useFileSystemPublicRoutes: !0,
          generateEtags: !0,
          pageExtensions: ["tsx", "ts", "jsx", "js"],
          poweredByHeader: !1,
          compress: !0,
          images: {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            path: "/_next/image",
            loader: "default",
            loaderFile: "",
            domains: ["images.unsplash.com", "cdn.sanity.io"],
            disableStaticImages: !1,
            minimumCacheTTL: 60,
            formats: ["image/webp"],
            dangerouslyAllowSVG: !1,
            contentSecurityPolicy:
              "script-src 'none'; frame-src 'none'; sandbox;",
            contentDispositionType: "attachment",
            remotePatterns: [{ protocol: "https", hostname: "**" }],
            unoptimized: !1,
          },
          devIndicators: { position: "bottom-left" },
          onDemandEntries: { maxInactiveAge: 6e4, pagesBufferLength: 5 },
          amp: { canonicalBase: "" },
          basePath: "",
          sassOptions: {},
          trailingSlash: !1,
          i18n: null,
          productionBrowserSourceMaps: !1,
          excludeDefaultMomentLocales: !0,
          serverRuntimeConfig: {},
          publicRuntimeConfig: {},
          reactProductionProfiling: !1,
          reactStrictMode: !0,
          reactMaxHeadersLength: 6e3,
          httpAgentOptions: { keepAlive: !0 },
          logging: { fetches: { fullUrl: !0 } },
          expireTime: 31536e3,
          staticPageGenerationTimeout: 60,
          modularizeImports: {
            "@mui/icons-material": {
              transform: "@mui/icons-material/{{member}}",
            },
            lodash: { transform: "lodash/{{member}}" },
          },
          outputFileTracingRoot: "E:\\downloads\\Hijraah",
          experimental: {
            nodeMiddleware: !1,
            cacheLife: {
              default: { stale: 300, revalidate: 900, expire: 0xfffffffe },
              seconds: { stale: 0, revalidate: 1, expire: 60 },
              minutes: { stale: 300, revalidate: 60, expire: 3600 },
              hours: { stale: 300, revalidate: 3600, expire: 86400 },
              days: { stale: 300, revalidate: 86400, expire: 604800 },
              weeks: { stale: 300, revalidate: 604800, expire: 2592e3 },
              max: { stale: 300, revalidate: 2592e3, expire: 0xfffffffe },
            },
            cacheHandlers: {},
            cssChunking: !0,
            multiZoneDraftMode: !1,
            appNavFailHandling: !1,
            prerenderEarlyExit: !0,
            serverMinification: !0,
            serverSourceMaps: !1,
            linkNoTouchStart: !1,
            caseSensitiveRoutes: !1,
            clientSegmentCache: !1,
            preloadEntriesOnStart: !0,
            clientRouterFilter: !0,
            clientRouterFilterRedirects: !1,
            fetchCacheKeyPrefix: "",
            middlewarePrefetch: "flexible",
            optimisticClientCache: !0,
            manualClientBasePath: !1,
            cpus: 11,
            memoryBasedWorkersCount: !1,
            imgOptConcurrency: null,
            imgOptTimeoutInSeconds: 7,
            imgOptMaxInputPixels: 0xfff8001,
            imgOptSequentialRead: null,
            isrFlushToDisk: !0,
            workerThreads: !1,
            optimizeCss: !0,
            nextScriptWorkers: !1,
            scrollRestoration: !1,
            externalDir: !1,
            disableOptimizedLoading: !1,
            gzipSize: !0,
            craCompat: !1,
            esmExternals: !0,
            fullySpecified: !1,
            swcTraceProfiling: !1,
            forceSwcTransforms: !1,
            largePageDataBytes: 128e3,
            turbo: { root: "E:\\downloads\\Hijraah" },
            typedRoutes: !1,
            typedEnv: !1,
            clientTraceMetadata: ["baggage", "sentry-trace"],
            parallelServerCompiles: !1,
            parallelServerBuildTraces: !1,
            ppr: !1,
            authInterrupts: !1,
            webpackMemoryOptimizations: !1,
            optimizeServerReact: !0,
            useEarlyImport: !1,
            viewTransition: !1,
            staleTimes: { dynamic: 0, static: 300 },
            serverComponentsHmrCache: !0,
            staticGenerationMaxConcurrency: 8,
            staticGenerationMinPagesPerWorker: 25,
            dynamicIO: !1,
            inlineCss: !1,
            useCache: !1,
            serverActions: {
              bodySizeLimit: "2mb",
              allowedOrigins: ["localhost:3000"],
            },
            optimizePackageImports: [
              "lucide-react",
              "@radix-ui/react-icons",
              "date-fns",
              "lodash",
              "lodash-es",
              "ramda",
              "antd",
              "react-bootstrap",
              "ahooks",
              "@ant-design/icons",
              "@headlessui/react",
              "@headlessui-float/react",
              "@heroicons/react/20/solid",
              "@heroicons/react/24/solid",
              "@heroicons/react/24/outline",
              "@visx/visx",
              "@tremor/react",
              "rxjs",
              "@mui/material",
              "@mui/icons-material",
              "recharts",
              "react-use",
              "effect",
              "@effect/schema",
              "@effect/platform",
              "@effect/platform-node",
              "@effect/platform-browser",
              "@effect/platform-bun",
              "@effect/sql",
              "@effect/sql-mssql",
              "@effect/sql-mysql2",
              "@effect/sql-pg",
              "@effect/sql-squlite-node",
              "@effect/sql-squlite-bun",
              "@effect/sql-squlite-wasm",
              "@effect/sql-squlite-react-native",
              "@effect/rpc",
              "@effect/rpc-http",
              "@effect/typeclass",
              "@effect/experimental",
              "@effect/opentelemetry",
              "@material-ui/core",
              "@material-ui/icons",
              "@tabler/icons-react",
              "mui-core",
              "react-icons/ai",
              "react-icons/bi",
              "react-icons/bs",
              "react-icons/cg",
              "react-icons/ci",
              "react-icons/di",
              "react-icons/fa",
              "react-icons/fa6",
              "react-icons/fc",
              "react-icons/fi",
              "react-icons/gi",
              "react-icons/go",
              "react-icons/gr",
              "react-icons/hi",
              "react-icons/hi2",
              "react-icons/im",
              "react-icons/io",
              "react-icons/io5",
              "react-icons/lia",
              "react-icons/lib",
              "react-icons/lu",
              "react-icons/md",
              "react-icons/pi",
              "react-icons/ri",
              "react-icons/rx",
              "react-icons/si",
              "react-icons/sl",
              "react-icons/tb",
              "react-icons/tfi",
              "react-icons/ti",
              "react-icons/vsc",
              "react-icons/wi",
            ],
          },
          htmlLimitedBots:
            "Mediapartners-Google|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti",
          bundlePagesRouterDependencies: !1,
          configFile: "E:\\downloads\\Hijraah\\apps\\web\\next.config.mjs",
          configFileName: "next.config.mjs",
          serverExternalPackages: [
            "pdf-parse",
            "ai",
            "amqplib",
            "connect",
            "dataloader",
            "express",
            "generic-pool",
            "graphql",
            "@hapi/hapi",
            "ioredis",
            "kafkajs",
            "koa",
            "lru-memoizer",
            "mongodb",
            "mongoose",
            "mysql",
            "mysql2",
            "knex",
            "pg",
            "pg-pool",
            "@node-redis/client",
            "@redis/client",
            "redis",
            "tedious",
          ],
          compiler: { removeConsole: { exclude: ["error", "warn"] } },
          _originalRewrites: {
            beforeFiles: [],
            afterFiles: [
              {
                source: "/monitoring(/?)",
                has: [
                  { type: "query", key: "o", value: "(?<orgid>\\d*)" },
                  { type: "query", key: "p", value: "(?<projectid>\\d*)" },
                  { type: "query", key: "r", value: "(?<region>[a-z]{2})" },
                ],
                destination:
                  "https://o:orgid.ingest.:region.sentry.io/api/:projectid/envelope/?hsts=0",
              },
              {
                source: "/monitoring(/?)",
                has: [
                  { type: "query", key: "o", value: "(?<orgid>\\d*)" },
                  { type: "query", key: "p", value: "(?<projectid>\\d*)" },
                ],
                destination:
                  "https://o:orgid.ingest.sentry.io/api/:projectid/envelope/?hsts=0",
              },
            ],
            fallback: [],
          },
          _originalRedirects: [
            { source: "/login", destination: "/auth/login", permanent: !0 },
            { source: "/signup", destination: "/auth/signup", permanent: !0 },
          ],
        },
        eS =
          null == (a = self.__RSC_MANIFEST) ? void 0 : a["/api/agents/route"],
        eR = ((e) => (e ? JSON.parse(e) : void 0))(self.__RSC_SERVER_MANIFEST);
      eS &&
        eR &&
        (0, o.fQ)({
          page: "/api/agents/route",
          clientReferenceManifest: eS,
          serverActionsManifest: eR,
          serverModuleMap: (0, s.e)({ serverActionsManifest: eR }),
        });
      let eI = n,
        eA = c.s.wrap(eb, { nextConfig: ev });
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [275, 121, 283, 83], () => t(97602));
    var r = e.O();
    (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)[
      "middleware_app/api/agents/route"
    ] = r;
  },
]);
//# sourceMappingURL=route.js.map
