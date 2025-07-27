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
    (e._sentryDebugIds[t] = "37a2b00a-1a45-4f8a-a7e7-dfa16e41d988"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-37a2b00a-1a45-4f8a-a7e7-dfa16e41d988"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 9836),
    (e.ids = [4630, 9836]),
    (e.modules = {
      1523: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            cancelIdleCallback: function () {
              return a;
            },
            requestIdleCallback: function () {
              return r;
            },
          });
        let r =
            ("undefined" != typeof self &&
              self.requestIdleCallback &&
              self.requestIdleCallback.bind(window)) ||
            function (e) {
              let t = Date.now();
              return self.setTimeout(function () {
                e({
                  didTimeout: !1,
                  timeRemaining: function () {
                    return Math.max(0, 50 - (Date.now() - t));
                  },
                });
              }, 1);
            },
          a =
            ("undefined" != typeof self &&
              self.cancelIdleCallback &&
              self.cancelIdleCallback.bind(window)) ||
            function (e) {
              return clearTimeout(e);
            };
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      1708: (e) => {
        "use strict";
        e.exports = require("node:process");
      },
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      8963: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 8963), (e.exports = t);
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      13242: (e, t, r) => {
        "use strict";
        r.d(t, { F: () => n });
        var a = r(61268);
        r(84205);
        let n = ({ children: e, className: t, ...r }) =>
          (0, a.jsx)("div", {
            className: `overflow-auto ${t || ""}`,
            ...r,
            children: e,
          });
      },
      14604: (e, t, r) => {
        let { createProxy: a } = r(85493);
        e.exports = a(
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\next@15.3.0-canary.31_@babe_be67f368de2727c847f3a61f5e6cf4fa\\node_modules\\next\\dist\\client\\script.js",
        );
      },
      14795: (e, t, r) => {
        "use strict";
        r.d(t, { j2: () => n });
        var a = r(84001);
        async function n() {
          return (await (0, a.WV)()).session;
        }
        r(57011), r(67761), r(29244);
      },
      15942: (e, t, r) => {
        "use strict";
        r.a(e, async (e, a) => {
          try {
            r.d(t, {
              Cq: () => c,
              GO: () => p,
              cn: () => d,
              lk: () => l,
              y8: () => u,
            });
            var n = r(85488);
            r(3477);
            var s = r(79029),
              i = r(58360),
              o = e([n]);
            function d(...e) {
              return (0, i.QP)((0, s.$)(e));
            }
            function l() {
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
            function c(e) {
              if (0 === e) return "0 Bytes";
              let t = Math.floor(Math.log(e) / Math.log(1024));
              return (
                parseFloat((e / Math.pow(1024, t)).toFixed(2)) +
                " " +
                ["Bytes", "KB", "MB", "GB", "TB"][t]
              );
            }
            n = (o.then ? (await o)() : o)[0];
            let p = async (e) => {
              let t = await fetch(e);
              if (!t.ok) {
                let e = Error("An error occurred while fetching the data.");
                try {
                  e.info = await t.json();
                } catch (r) {
                  e.info = t.statusText;
                }
                throw ((e.status = t.status), e);
              }
              return t.json();
            };
            function u(e) {
              return e.map((e) => {
                var t;
                return {
                  ...e,
                  content:
                    ((t = e.content),
                    "string" != typeof t
                      ? ""
                      : t.replace(/<has_function_call>/g, "")),
                };
              });
            }
            a();
          } catch (e) {
            a(e);
          }
        });
      },
      16714: (e, t, r) => {
        "use strict";
        r.d(t, { AppSidebar: () => a });
        let a = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call AppSidebar() from the server but AppSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\app-sidebar.tsx",
          "AppSidebar",
        );
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21088: (e, t, r) => {
        "use strict";
        r.d(t, { V: () => o });
        var a = r(86773),
          n = r(88421),
          s = r(44783),
          i = r(87323);
        class o extends n.g {
          constructor(e = {}) {
            super("chat_sessions", e);
          }
          async getChatById(e) {
            let t = await super.getById(e);
            return t ? this.toChatEntity(t) : null;
          }
          async getById(e) {
            return await super.getById(e);
          }
          async getByUserId(e, t) {
            let r = (await this.getClient())
              .from("chat_sessions")
              .select("*")
              .eq("user_id", e);
            if ((t?.case_id && (r = r.eq("case_id", t.case_id)), t?.orderBy)) {
              let [e, a] = t.orderBy.split(":");
              r = r.order(
                {
                  createdAt: "created_at",
                  updatedAt: "updated_at",
                  lastMessageAt: "last_message_at",
                  userId: "user_id",
                  caseId: "case_id",
                  systemPrompt: "system_prompt",
                  agentConfig: "agent_config",
                }[e] || e,
                { ascending: "desc" !== a },
              );
            } else r = r.order("last_message_at", { ascending: !1 });
            t?.limit && (r = r.limit(t.limit)),
              t?.offset &&
                (r = r.range(t.offset, t.offset + (t.limit || 10) - 1));
            let { data: a, error: n } = await r;
            if (n)
              throw (
                (console.error("Error fetching chats by user ID:", n),
                Error(`Failed to fetch chats: ${n.message}`))
              );
            return a || [];
          }
          async getMessages(e) {
            let t = await this.getClient(),
              { data: r, error: a } = await t
                .from("chat_messages")
                .select("*")
                .eq("session_id", e)
                .order("created_at", { ascending: !0 });
            if (a)
              throw (
                (console.error("Error fetching chat messages:", a),
                Error(`Failed to fetch chat messages: ${a.message}`))
              );
            return r || [];
          }
          async getWithDetails(e) {
            let t = await this.getClient(),
              { data: r, error: a } = await t
                .from("chat_sessions")
                .select("*")
                .eq("id", e)
                .single();
            if (a || !r)
              return (
                (a && "PGRST116" === a.code) ||
                  console.error("Error fetching chat:", a),
                null
              );
            let { data: n, error: s } = await t
              .from("chat_messages")
              .select("*")
              .eq("session_id", e)
              .order("created_at", { ascending: !0 });
            if (s)
              throw (
                (console.error("Error fetching chat messages:", s),
                Error(`Failed to fetch chat messages: ${s.message}`))
              );
            let i = (n || []).map((e) => e.id),
              o = [];
            if (i.length > 0) {
              let { data: e, error: r } = await t
                .from("chat_attachments")
                .select("*")
                .in("message_id", i);
              if (r)
                throw (
                  (console.error("Error fetching chat attachments:", r),
                  Error(`Failed to fetch chat attachments: ${r.message}`))
                );
              o = e || [];
            }
            return { chat: r, messages: n || [], attachments: o };
          }
          async addMessage(e, t) {
            let r = await this.getClient(),
              a = {
                ...t,
                session_id: e,
                created_at: t.created_at || new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              { data: n, error: s } = await r
                .from("chat_messages")
                .insert(a)
                .select()
                .single();
            if (s)
              throw (
                (console.error("Error adding chat message:", s),
                Error(`Failed to add chat message: ${s.message}`))
              );
            return (
              await r
                .from("chat_sessions")
                .update({ last_message_at: new Date().toISOString() })
                .eq("id", e),
              n
            );
          }
          async deleteChat(e) {
            let t = await this.getClient(),
              { error: r } = await t
                .from("chat_messages")
                .delete()
                .eq("session_id", e);
            if (r) throw (console.error("Error deleting chat messages:", r), r);
            let { error: a } = await t
              .from("chat_sessions")
              .delete()
              .eq("id", e);
            if (a) throw (console.error("Error deleting chat session:", a), a);
            return { success: !0 };
          }
          async getMessageCountForUser(e, t) {
            let r = await this.getClient(),
              a = new Date(Date.now() - 60 * t * 6e4).toISOString(),
              { count: n, error: s } = await r
                .from("chat_messages")
                .select("*", { count: "exact", head: !0 })
                .eq("user_id", e)
                .gte("created_at", a);
            if (s)
              throw (
                (console.error("Error getting message count for user:", s), s)
              );
            return n || 0;
          }
          async storeStreamId(e, t) {
            let r = await this.getClient(),
              { data: a, error: n } = await r
                .from("chat_sessions")
                .select("context")
                .eq("id", e)
                .single();
            if (n || !a)
              return void console.error(
                `Chat not found for storing stream ID: ${e}`,
                n,
              );
            let s =
                "object" == typeof a.context && null !== a.context
                  ? a.context
                  : {},
              i = Array.isArray(s.streamIds) ? s.streamIds : [];
            i.includes(t) || i.push(t), (s.streamIds = i);
            let { error: o } = await r
              .from("chat_sessions")
              .update({ context: s })
              .eq("id", e);
            o && console.error(`Error storing stream ID for chat ${e}:`, o);
          }
          async getStreamIdsForChat(e) {
            let t = await this.getClient(),
              { data: r, error: a } = await t
                .from("chat_sessions")
                .select("context")
                .eq("id", e)
                .single();
            if (a || !r)
              return (
                console.error(`Chat not found for getting stream IDs: ${e}`, a),
                []
              );
            let n =
              "object" == typeof r.context && null !== r.context
                ? r.context
                : {};
            return n?.streamIds || [];
          }
          async deleteStreamIdsForChat(e) {
            let t = await this.getClient(),
              { data: r, error: a } = await t
                .from("chat_sessions")
                .select("context")
                .eq("id", e)
                .single();
            if (a || !r)
              return void console.error(
                `Chat not found for deleting stream IDs: ${e}`,
                a,
              );
            let n =
              "object" == typeof r.context && null !== r.context
                ? r.context
                : {};
            if (n.streamIds) {
              delete n.streamIds;
              let { error: r } = await t
                .from("chat_sessions")
                .update({ context: n })
                .eq("id", e);
              r && console.error(`Error deleting stream IDs for chat ${e}:`, r);
            }
          }
          toDomainEntity(e) {
            return e;
          }
          toChatEntity(e) {
            return a.ry.fromDatabase(e);
          }
          toChatSessionDomain(e) {
            return i.M.toChatSessionDomain(e);
          }
          fromDomainEntity(e) {
            let t = e.toObject();
            return (0, s.uc)(t);
          }
          fromChatSessionDomain(e) {
            return i.M.fromChatSessionDomain(e);
          }
          fromDomainEntityToDbRecord(e) {
            return this.fromDomainEntity(e);
          }
          mapRecordToDomain(e) {
            return this.toChatEntity(e);
          }
        }
      },
      21800: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 16714)),
          Promise.resolve().then(r.bind(r, 98699)),
          Promise.resolve().then(r.bind(r, 29244)),
          Promise.resolve().then(r.t.bind(r, 14604, 23));
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      22630: (e, t, r) => {
        "use strict";
        let a;
        r.r(t),
          r.d(t, {
            default: () => y,
            dynamic: () => p,
            generateImageMetadata: () => b,
            generateMetadata: () => g,
            generateViewport: () => v,
            maxDuration: () => m,
            metadata: () => c,
            viewport: () => u,
          });
        var n = r(63033),
          s = r(35242);
        r(93206);
        var i = r(51433),
          o = r(59107),
          d = r(39862),
          l = r(60442);
        let c = {
            title: {
              default: "Hijraah - Navigate Your Immigration Journey",
              template: "%s | Hijraah",
            },
            metadataBase: new URL("https://hijraah.vercel.app"),
            description:
              "Navigate your immigration journey with AI guidance - Compare immigration policies across countries with intelligent insights",
            keywords: [
              "immigration",
              "visa",
              "comparison",
              "countries",
              "policies",
              "AI guidance",
              "immigration journey",
            ],
            authors: [{ name: "Hijraah Team" }],
            creator: "Hijraah",
            icons: { icon: "/Hijraah_logo.png", apple: "/Hijraah_logo.png" },
            openGraph: {
              type: "website",
              locale: "en_US",
              url: "https://hijraah.vercel.app",
              title: "Hijraah - Immigration Comparison",
              description:
                "Compare immigration policies across countries with AI-powered insights",
              siteName: "Hijraah",
              images: [
                {
                  url: "/Hijraah_logo.png",
                  width: 800,
                  height: 800,
                  alt: "Hijraah Logo",
                },
              ],
            },
            twitter: {
              card: "summary_large_image",
              title: "Hijraah - Immigration Comparison",
              description:
                "Compare immigration policies across countries with AI-powered insights",
              creator: "@hijraah",
              images: ["/Hijraah_logo.png"],
            },
            robots: { index: !0, follow: !0 },
          },
          u = {
            themeColor: [
              { media: "(prefers-color-scheme: light)", color: "white" },
              { media: "(prefers-color-scheme: dark)", color: "#18181b" },
            ],
            width: "device-width",
            initialScale: 1,
          },
          p = "force-dynamic",
          m = 60,
          h = { ...n },
          f =
            "workUnitAsyncStorage" in h
              ? h.workUnitAsyncStorage
              : "requestAsyncStorage" in h
                ? h.requestAsyncStorage
                : void 0;
        a = new Proxy(
          function ({ children: e }) {
            let t = { plugins: [] };
            return (0, s.jsxs)(s.Fragment, {
              children: [
                e,
                (0, s.jsx)(o.Analytics, {}),
                (0, s.jsx)(d.SpeedInsights, {}),
                t && (0, s.jsx)(i.StagewiseToolbar, { config: t }),
              ],
            });
          },
          {
            apply: (e, t, r) => {
              let a, n, s;
              try {
                let e = f?.getStore();
                (a = e?.headers.get("sentry-trace") ?? void 0),
                  (n = e?.headers.get("baggage") ?? void 0),
                  (s = e?.headers);
              } catch (e) {}
              return l
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/",
                  componentType: "Layout",
                  sentryTraceHeader: a,
                  baggageHeader: n,
                  headers: s,
                })
                .apply(t, r);
            },
          },
        );
        let g = void 0,
          b = void 0,
          v = void 0,
          y = a;
      },
      26564: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 26564), (e.exports = t);
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28169: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 87113));
      },
      28191: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 84792)),
          Promise.resolve().then(r.bind(r, 66561)),
          Promise.resolve().then(r.bind(r, 25052));
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28909: (e, t, r) => {
        "use strict";
        r.a(e, async (e, a) => {
          try {
            r.d(t, { $: () => l, r: () => c });
            var n = r(61268),
              s = r(86415),
              i = r(91635);
            r(84205);
            var o = r(15942),
              d = e([o]);
            o = (d.then ? (await d)() : d)[0];
            let c = (0, i.F)(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              {
                variants: {
                  variant: {
                    default:
                      "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                    destructive:
                      "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                    outline:
                      "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                    secondary:
                      "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                    ghost:
                      "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                    link: "text-primary underline-offset-4 hover:underline",
                  },
                  size: {
                    default: "h-9 px-4 py-2 has-[>svg]:px-3",
                    sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                    lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                    icon: "size-9",
                  },
                },
                defaultVariants: { variant: "default", size: "default" },
              },
            );
            function l({
              className: e,
              variant: t,
              size: r,
              asChild: a = !1,
              ...i
            }) {
              let d = a ? s.DX : "button";
              return (0, n.jsx)(d, {
                "data-slot": "button",
                className: (0, o.cn)(c({ variant: t, size: r, className: e })),
                ...i,
              });
            }
            a();
          } catch (e) {
            a(e);
          }
        });
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34631: (e) => {
        "use strict";
        e.exports = require("tls");
      },
      36686: (e) => {
        "use strict";
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42057: (e, t, r) => {
        "use strict";
        r.d(t, { default: () => n.a });
        var a = r(14604),
          n = r.n(a);
      },
      44619: (e, t, r) => {
        "use strict";
        r.a(e, async (e, a) => {
          try {
            r.d(t, { Fc: () => d, TN: () => c, XL: () => l });
            var n = r(61268),
              s = r(91635);
            r(84205);
            var i = r(15942),
              o = e([i]);
            i = (o.then ? (await o)() : o)[0];
            let u = (0, s.F)(
              "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
              {
                variants: {
                  variant: {
                    default: "bg-background text-foreground",
                    destructive:
                      "text-destructive-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-foreground/80",
                  },
                },
                defaultVariants: { variant: "default" },
              },
            );
            function d({ className: e, variant: t, ...r }) {
              return (0, n.jsx)("div", {
                "data-slot": "alert",
                role: "alert",
                className: (0, i.cn)(u({ variant: t }), e),
                ...r,
              });
            }
            function l({ className: e, ...t }) {
              return (0, n.jsx)("div", {
                "data-slot": "alert-title",
                className: (0, i.cn)(
                  "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
                  e,
                ),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, n.jsx)("div", {
                "data-slot": "alert-description",
                className: (0, i.cn)(
                  "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
                  e,
                ),
                ...t,
              });
            }
            a();
          } catch (e) {
            a(e);
          }
        });
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      44783: (e, t, r) => {
        "use strict";
        r.d(t, {
          Cb: () =>
            function e(t) {
              return Array.isArray(t)
                ? t.map((t) => e(t))
                : t instanceof Date
                  ? t
                  : "object" == typeof t && null !== t
                    ? Object.keys(t).reduce(
                        (r, n) => ({ ...r, [(0, a.camelCase)(n)]: e(t[n]) }),
                        {},
                      )
                    : t;
            },
          uc: () =>
            function e(t) {
              return Array.isArray(t)
                ? t.map((t) => e(t))
                : t instanceof Date
                  ? t
                  : "object" == typeof t && null !== t
                    ? Object.keys(t).reduce(
                        (r, n) => ({ ...r, [(0, a.snakeCase)(n)]: e(t[n]) }),
                        {},
                      )
                    : t;
            },
        });
        var a = r(78287);
      },
      46532: (e, t, r) => {
        "use strict";
        r.a(e, async (e, a) => {
          try {
            r.d(t, { E: () => l });
            var n = r(61268),
              s = r(86415),
              i = r(91635);
            r(84205);
            var o = r(15942),
              d = e([o]);
            o = (d.then ? (await d)() : d)[0];
            let c = (0, i.F)(
              "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
              {
                variants: {
                  variant: {
                    default:
                      "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
                    secondary:
                      "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
                    destructive:
                      "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                    outline:
                      "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
                  },
                },
                defaultVariants: { variant: "default" },
              },
            );
            function l({ className: e, variant: t, asChild: r = !1, ...a }) {
              let i = r ? s.DX : "span";
              return (0, n.jsx)(i, {
                "data-slot": "badge",
                className: (0, o.cn)(c({ variant: t }), e),
                ...a,
              });
            }
            a();
          } catch (e) {
            a(e);
          }
        });
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      49917: (e, t, r) => {
        "use strict";
        r.d(t, { C1: () => w, bL: () => x });
        var a = r(84205),
          n = r(18047),
          s = r(78593),
          i = r(61268),
          o = "Progress",
          [d, l] = (0, n.A)(o),
          [c, u] = d(o),
          p = a.forwardRef((e, t) => {
            var r, a;
            let {
              __scopeProgress: n,
              value: o = null,
              max: d,
              getValueLabel: l = f,
              ...u
            } = e;
            (d || 0 === d) &&
              !v(d) &&
              console.error(
                ((r = `${d}`),
                `Invalid prop \`max\` of value \`${r}\` supplied to \`Progress\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`),
              );
            let p = v(d) ? d : 100;
            null === o ||
              y(o, p) ||
              console.error(
                ((a = `${o}`),
                `Invalid prop \`value\` of value \`${a}\` supplied to \`Progress\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or 100 if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`),
              );
            let m = y(o, p) ? o : null,
              h = b(m) ? l(m, p) : void 0;
            return (0, i.jsx)(c, {
              scope: n,
              value: m,
              max: p,
              children: (0, i.jsx)(s.sG.div, {
                "aria-valuemax": p,
                "aria-valuemin": 0,
                "aria-valuenow": b(m) ? m : void 0,
                "aria-valuetext": h,
                role: "progressbar",
                "data-state": g(m, p),
                "data-value": m ?? void 0,
                "data-max": p,
                ...u,
                ref: t,
              }),
            });
          });
        p.displayName = o;
        var m = "ProgressIndicator",
          h = a.forwardRef((e, t) => {
            let { __scopeProgress: r, ...a } = e,
              n = u(m, r);
            return (0, i.jsx)(s.sG.div, {
              "data-state": g(n.value, n.max),
              "data-value": n.value ?? void 0,
              "data-max": n.max,
              ...a,
              ref: t,
            });
          });
        function f(e, t) {
          return `${Math.round((e / t) * 100)}%`;
        }
        function g(e, t) {
          return null == e ? "indeterminate" : e === t ? "complete" : "loading";
        }
        function b(e) {
          return "number" == typeof e;
        }
        function v(e) {
          return b(e) && !isNaN(e) && e > 0;
        }
        function y(e, t) {
          return b(e) && !isNaN(e) && e <= t && e >= 0;
        }
        h.displayName = m;
        var x = p,
          w = h;
      },
      52327: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => a });
        let a = (0, r(95255).A)("Users", [
          [
            "path",
            { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" },
          ],
          ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
          ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
          ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }],
        ]);
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      53974: (e, t, r) => {
        "use strict";
        let a;
        r.r(t),
          r.d(t, {
            default: () => m,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var n = r(63033),
          s = r(26394),
          i = r(60442),
          o = (0, s.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\not-found.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
            "default",
          );
        let d = { ...n },
          l =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        a =
          "function" == typeof o
            ? new Proxy(o, {
                apply: (e, t, r) => {
                  let a, n, s;
                  try {
                    let e = l?.getStore();
                    (a = e?.headers.get("sentry-trace") ?? void 0),
                      (n = e?.headers.get("baggage") ?? void 0),
                      (s = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/",
                      componentType: "Not-found",
                      sentryTraceHeader: a,
                      baggageHeader: n,
                      headers: s,
                    })
                    .apply(t, r);
                },
              })
            : o;
        let c = void 0,
          u = void 0,
          p = void 0,
          m = a;
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      56460: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => s });
        var a = r(61268),
          n = r(89882);
        function s() {
          return (
            (0, n.useRouter)(),
            (0, a.jsxs)("div", {
              className:
                "flex flex-col items-center justify-center min-h-screen py-2",
              children: [
                (0, a.jsx)("h1", {
                  className: "text-4xl font-bold",
                  children: "Page Not Found",
                }),
                (0, a.jsx)("p", {
                  className: "mt-3 text-xl",
                  children: "Redirecting to home page...",
                }),
              ],
            })
          );
        }
        r(84205), r(58702);
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      58702: (e, t, r) => {
        "use strict";
        r.d(t, {
          IB: () => a,
          V8: () => o,
          XG: () => i,
          o0: () => s,
          q: () => n,
        });
        let a = ["en", "ar", "es", "fr"],
          n = "en",
          s = {
            en: {
              nativeName: "English",
              englishName: "English",
              direction: "ltr",
              dateFormat: "MM/DD/YYYY",
              flag: "\uD83C\uDDFA\uD83C\uDDF8",
              htmlLang: "en",
              calendar: "gregory",
              number: { decimal: ".", thousands: "," },
            },
            ar: {
              nativeName: "العربية",
              englishName: "Arabic",
              direction: "rtl",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDF8\uD83C\uDDE6",
              htmlLang: "ar",
              calendar: "islamic",
              fontClass: "font-arabic",
              number: { decimal: "٫", thousands: "٬" },
            },
            fr: {
              nativeName: "Fran\xe7ais",
              englishName: "French",
              direction: "ltr",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDEB\uD83C\uDDF7",
              htmlLang: "fr",
              calendar: "gregory",
              number: { decimal: ",", thousands: " " },
            },
            es: {
              nativeName: "Espa\xf1ol",
              englishName: "Spanish",
              direction: "ltr",
              dateFormat: "DD/MM/YYYY",
              flag: "\uD83C\uDDEA\uD83C\uDDF8",
              htmlLang: "es",
              calendar: "gregory",
              number: { decimal: ",", thousands: "." },
            },
          };
        function i(e) {
          return s[e] || s[n];
        }
        function o(e) {
          return "rtl" === i(e).direction;
        }
      },
      58882: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => a });
        let a = (0, r(95255).A)("Upload", [
          [
            "path",
            { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" },
          ],
          ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
          ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }],
        ]);
      },
      59059: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => a });
        let a = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\global-error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
          "default",
        );
      },
      59893: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 87447));
      },
      61950: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => a });
        let a = (0, r(95255).A)("AlertCircle", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
          [
            "line",
            { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" },
          ],
        ]);
      },
      63017: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 59059));
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      63965: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 92062));
      },
      66135: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => a });
        let a = (0, r(95255).A)("Loader2", [
          ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }],
        ]);
      },
      69621: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 94745));
      },
      70724: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            useGlobalTranslate: () => o,
            useI18n: () => s,
            useTranslate: () => i,
          });
        var a = r(95124),
          n = r(58702);
        function s() {
          let e = (0, a.useLocale)(),
            t = (0, a.useTranslations)(),
            r = (0, a.useFormatter)(),
            s = (0, a.useTimeZone)(),
            i = (0, a.useNow)(),
            o = (0, n.XG)(e),
            d = o.direction;
          return {
            t,
            format: r,
            locale: e,
            timeZone: s,
            now: i,
            config: o,
            direction: d,
            isRtl: "rtl" === d,
            formatDate: (e, t) => r.dateTime(e, t),
            formatRelativeTime: (e) => r.relativeTime(e),
            formatCurrency: (e, t = "USD") =>
              r.number(e, { style: "currency", currency: t }),
            formatNumber: (e, t) => r.number(e, t),
          };
        }
        function i(e) {
          return (0, a.useTranslations)(e);
        }
        function o() {
          return (0, a.useTranslations)();
        }
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73136: (e) => {
        "use strict";
        e.exports = require("node:url");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      73927: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, { "4055c9f9dce3c849928e65e87017b3609674121d00": () => a.M });
        var a = r(29997);
      },
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
      },
      74614: (e, t, r) => {
        "use strict";
        let a;
        r.r(t),
          r.d(t, {
            default: () => x,
            experimental_ppr: () => m,
            generateImageMetadata: () => v,
            generateMetadata: () => b,
            generateViewport: () => y,
            metadata: () => p,
          });
        var n = r(63033),
          s = r(35242),
          i = r(15058),
          o = r(42057),
          d = r(16714),
          l = r(98699),
          c = r(14795),
          u = r(60442);
        let p = {
            title: "Unified Chat - Hijraah",
            description: "Chat with our AI assistant to get immigration help",
          },
          m = !0;
        async function h({ children: e }) {
          let [t, r] = await Promise.all([(0, c.j2)(), (0, i.UL)()]),
            a = r.get("sidebar:state")?.value !== "true";
          return (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsx)(o.default, {
                src: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js",
                strategy: "beforeInteractive",
              }),
              (0, s.jsxs)(l.SidebarProvider, {
                defaultOpen: !a,
                children: [
                  (0, s.jsx)(d.AppSidebar, {}),
                  (0, s.jsx)(l.SidebarInset, { children: e }),
                ],
              }),
            ],
          });
        }
        let f = { ...n },
          g =
            "workUnitAsyncStorage" in f
              ? f.workUnitAsyncStorage
              : "requestAsyncStorage" in f
                ? f.requestAsyncStorage
                : void 0;
        a = new Proxy(h, {
          apply: (e, t, r) => {
            let a, n, s;
            try {
              let e = g?.getStore();
              (a = e?.headers.get("sentry-trace") ?? void 0),
                (n = e?.headers.get("baggage") ?? void 0),
                (s = e?.headers);
            } catch (e) {}
            return u
              .wrapServerComponentWithSentry(e, {
                componentRoute: "/(ai-unified)/chat",
                componentType: "Layout",
                sentryTraceHeader: a,
                baggageHeader: n,
                headers: s,
              })
              .apply(t, r);
          },
        });
        let b = void 0,
          v = void 0,
          y = void 0,
          x = a;
      },
      74619: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 74619), (e.exports = t);
      },
      74998: (e) => {
        "use strict";
        e.exports = require("perf_hooks");
      },
      75581: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 39008));
      },
      75919: (e) => {
        "use strict";
        e.exports = require("node:worker_threads");
      },
      76760: (e) => {
        "use strict";
        e.exports = require("node:path");
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77032: (e, t, r) => {
        Promise.resolve().then(r.t.bind(r, 11299, 23)),
          Promise.resolve().then(r.t.bind(r, 81119, 23)),
          Promise.resolve().then(r.t.bind(r, 68259, 23)),
          Promise.resolve().then(r.t.bind(r, 36914, 23)),
          Promise.resolve().then(r.t.bind(r, 15142, 23)),
          Promise.resolve().then(r.t.bind(r, 98554, 23)),
          Promise.resolve().then(r.t.bind(r, 88424, 23)),
          Promise.resolve().then(r.t.bind(r, 64834, 23));
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
      },
      79428: (e) => {
        "use strict";
        e.exports = require("buffer");
      },
      79551: (e) => {
        "use strict";
        e.exports = require("url");
      },
      79646: (e) => {
        "use strict";
        e.exports = require("child_process");
      },
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      81630: (e) => {
        "use strict";
        e.exports = require("http");
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      85352: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 43851)),
          Promise.resolve().then(r.bind(r, 33713)),
          Promise.resolve().then(r.bind(r, 3519)),
          Promise.resolve().then(r.t.bind(r, 99966, 23));
      },
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      86327: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "setAttributesFromProps", {
            enumerable: !0,
            get: function () {
              return s;
            },
          });
        let r = {
            acceptCharset: "accept-charset",
            className: "class",
            htmlFor: "for",
            httpEquiv: "http-equiv",
            noModule: "noModule",
          },
          a = [
            "onLoad",
            "onReady",
            "dangerouslySetInnerHTML",
            "children",
            "onError",
            "strategy",
            "stylesheets",
          ];
        function n(e) {
          return ["async", "defer", "noModule"].includes(e);
        }
        function s(e, t) {
          for (let [s, i] of Object.entries(t)) {
            if (!t.hasOwnProperty(s) || a.includes(s) || void 0 === i) continue;
            let o = r[s] || s.toLowerCase();
            "SCRIPT" === e.tagName && n(o)
              ? (e[o] = !!i)
              : e.setAttribute(o, String(i)),
              (!1 === i ||
                ("SCRIPT" === e.tagName && n(o) && (!i || "false" === i))) &&
                (e.setAttribute(o, ""), e.removeAttribute(o));
          }
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      86364: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => s.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => u,
            tree: () => d,
          });
        var a = r(11610),
          n = r(51293),
          s = r(59059),
          i = r(17770),
          o = {};
        for (let e in i)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (o[e] = () => i[e]);
        r.d(t, o);
        let d = {
            children: [
              "",
              {
                children: [
                  "(ai-unified)",
                  {
                    children: [
                      "chat",
                      {
                        children: [
                          "[id]",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(r.bind(r, 99351)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\[id]\\page.tsx",
                                ],
                              },
                            ],
                          },
                          {},
                        ],
                      },
                      {
                        layout: [
                          () => Promise.resolve().then(r.bind(r, 74614)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\layout.tsx",
                        ],
                      },
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(r.bind(r, 89663)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\layout.tsx",
                    ],
                    forbidden: [
                      () => Promise.resolve().then(r.t.bind(r, 57382, 23)),
                      "next/dist/client/components/forbidden-error",
                    ],
                    unauthorized: [
                      () => Promise.resolve().then(r.t.bind(r, 87039, 23)),
                      "next/dist/client/components/unauthorized-error",
                    ],
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(r.bind(r, 22630)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\layout.tsx",
                ],
                error: [
                  () => Promise.resolve().then(r.bind(r, 94745)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
                ],
                "global-error": [
                  () => Promise.resolve().then(r.bind(r, 59059)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(r.bind(r, 53974)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
                ],
                forbidden: [
                  () => Promise.resolve().then(r.t.bind(r, 57382, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(r.t.bind(r, 87039, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          l = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\[id]\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new a.AppPageRouteModule({
            definition: {
              kind: n.RouteKind.APP_PAGE,
              page: "/(ai-unified)/chat/[id]/page",
              pathname: "/chat/[id]",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      86773: (e, t, r) => {
        "use strict";
        r.d(t, { c1: () => a, ry: () => i });
        var a = (function (e) {
          return (
            (e.GPT_3_5 = "gpt-3.5-turbo"),
            (e.GPT_4 = "gpt-4"),
            (e.GPT_4_VISION = "gpt-4-vision-preview"),
            (e.CLAUDE_3_SONNET = "claude-3-sonnet"),
            (e.CLAUDE_3_OPUS = "claude-3-opus"),
            (e.CLAUDE_3_HAIKU = "claude-3-haiku"),
            e
          );
        })({});
        class n {
          constructor(e) {
            (this.id = e.id),
              (this.chatId = e.chatId),
              (this.role = e.role),
              (this.content = e.content),
              (this.attachments = e.attachments || []),
              (this.metadata = e.metadata || {}),
              (this.createdAt = e.createdAt || new Date());
          }
          static fromDatabase(e, t = []) {
            return new n({
              id: e.id,
              chatId: e.session_id,
              role: e.role,
              content: e.content || "",
              attachments: t.filter((t) => t.messageId === e.id),
              metadata:
                "object" == typeof e.metadata && e.metadata ? e.metadata : {},
              createdAt: new Date(e.created_at),
            });
          }
        }
        class s {
          constructor(e) {
            (this.id = e.id),
              (this.messageId = e.messageId),
              (this.type = e.type),
              (this.fileId = e.fileId || null),
              (this.url = e.url || null),
              (this.name = e.name),
              (this.contentType = e.contentType || null),
              (this.size = e.size || null),
              (this.metadata = e.metadata || {}),
              (this.createdAt = e.createdAt || new Date());
          }
          static fromDatabase(e) {
            return new s({
              id: e.id,
              messageId: e.message_id,
              type: e.type,
              fileId: e.file_id,
              url: e.url,
              name: e.name,
              contentType: e.content_type,
              size: e.size,
              metadata:
                "object" == typeof e.metadata && e.metadata ? e.metadata : {},
              createdAt: new Date(e.created_at),
            });
          }
        }
        class i {
          constructor(e) {
            (this.id = e.id),
              (this.userId = e.userId),
              (this.title = e.title),
              (this.description = e.description || null),
              (this.modelType = e.modelType || "gpt-4"),
              (this.visibility = e.visibility || "private"),
              (this.systemPrompt = e.systemPrompt || null),
              (this.messages = e.messages || []),
              (this.case_id = e.case_id || null),
              (this.metadata = e.rawMetadata || {}),
              (this.createdAt = e.createdAt || new Date()),
              (this.updatedAt = e.updatedAt || new Date());
          }
          addMessage(e) {
            let t = { ...e, chatId: this.id };
            return this.messages.push(t), (this.updatedAt = new Date()), this;
          }
          getLatestMessage() {
            return 0 === this.messages.length
              ? null
              : [...this.messages].sort(
                  (e, t) => t.createdAt.getTime() - e.createdAt.getTime(),
                )[0];
          }
          assignToCase(e) {
            return (this.case_id = e), (this.updatedAt = new Date()), this;
          }
          updateMetadata(e) {
            return (
              (this.metadata = { ...this.metadata, ...e }),
              (this.updatedAt = new Date()),
              this
            );
          }
          updateDetails(e) {
            return (
              void 0 !== e.title && (this.title = e.title),
              void 0 !== e.description && (this.description = e.description),
              void 0 !== e.modelType && (this.modelType = e.modelType),
              void 0 !== e.visibility && (this.visibility = e.visibility),
              void 0 !== e.systemPrompt && (this.systemPrompt = e.systemPrompt),
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
          static fromDatabase(e, t = [], r = []) {
            let a =
                "object" != typeof e.metadata ||
                null === e.metadata ||
                Array.isArray(e.metadata)
                  ? {}
                  : e.metadata,
              o = r.map(s.fromDatabase);
            return new i({
              id: e.id,
              userId: e.user_id,
              title: e.title || "Untitled Chat",
              description: a?.description || null,
              modelType: e.model || "gpt-4",
              visibility: e.visibility || "private",
              systemPrompt: e.system_prompt || null,
              messages: t.map((e) => n.fromDatabase(e, o)),
              case_id: e.case_id || null,
              rawMetadata: a,
              createdAt: e.created_at ? new Date(e.created_at) : new Date(),
              updatedAt: e.updated_at ? new Date(e.updated_at) : new Date(),
            });
          }
        }
      },
      87113: (e, t, r) => {
        "use strict";
        r.a(e, async (e, a) => {
          try {
            r.r(t), r.d(t, { default: () => o });
            var n = r(61268);
            r(86896), r(84205);
            var s = r(28909),
              i = e([s]);
            function o({ error: e, reset: t }) {
              return (0, n.jsx)("html", {
                children: (0, n.jsx)("body", {
                  children: (0, n.jsxs)("div", {
                    className:
                      "flex min-h-screen flex-col items-center justify-center p-4 text-center",
                    children: [
                      (0, n.jsx)("h1", {
                        className: "text-4xl font-bold mb-4",
                        children: "Something went wrong!",
                      }),
                      (0, n.jsx)("p", {
                        className: "text-xl mb-8",
                        children: e.message || "An unexpected error occurred",
                      }),
                      (0, n.jsxs)("div", {
                        className: "space-x-4",
                        children: [
                          (0, n.jsx)(s.$, {
                            onClick: () => t(),
                            children: "Try again",
                          }),
                          (0, n.jsx)(s.$, {
                            variant: "outline",
                            onClick: () => (window.location.href = "/"),
                            children: "Go home",
                          }),
                        ],
                      }),
                      !1,
                    ],
                  }),
                }),
              });
            }
            (s = (i.then ? (await i)() : i)[0]), a();
          } catch (e) {
            a(e);
          }
        });
      },
      87323: (e, t, r) => {
        "use strict";
        r.d(t, { M: () => n });
        var a = r(44783);
        class n {
          static toChatSessionDomain(e) {
            return {
              id: e.id,
              userId: e.user_id,
              title: e.title,
              systemPrompt: e.system_prompt,
              context: e.context,
              model: e.model,
              prompt: e.prompt,
              agentConfig: e.agent_config,
              caseId: e.case_id,
              lastMessageAt: e.last_message_at,
              metadata: e.metadata,
              visibility: e.visibility,
              createdAt: e.created_at,
              updatedAt: e.updated_at,
            };
          }
          static fromChatSessionDomain(e) {
            return {
              id: e.id,
              user_id: e.userId,
              title: e.title,
              system_prompt: e.systemPrompt,
              context: e.context,
              model: e.model,
              prompt: e.prompt,
              agent_config: e.agentConfig,
              case_id: e.caseId,
              last_message_at: e.lastMessageAt,
              metadata: e.metadata,
              visibility: e.visibility,
              created_at: e.createdAt,
              updated_at: e.updatedAt,
            };
          }
          static toChatMessageDomain(e) {
            return {
              id: e.id,
              sessionId: e.session_id,
              userId: e.user_id,
              role: e.role,
              content: e.content,
              sources: e.sources,
              toolCalls: e.tool_calls,
              tokens: e.tokens,
              metadata: e.metadata,
              createdAt: e.created_at,
              updatedAt: e.updated_at,
            };
          }
          static fromChatMessageDomain(e) {
            return {
              id: e.id,
              session_id: e.sessionId,
              user_id: e.userId,
              role: e.role,
              content: e.content,
              sources: e.sources,
              tool_calls: e.toolCalls,
              tokens: e.tokens,
              metadata: e.metadata,
              created_at: e.createdAt,
              updated_at: e.updatedAt,
            };
          }
          static toDocumentDomain(e) {
            return {
              id: e.id,
              userId: e.user_id,
              title: e.title,
              filename: e.filename,
              filePath: e.file_path,
              fileType: e.file_type,
              fileSize: e.file_size,
              content: e.content,
              text: e.text,
              status: e.status,
              classification: e.classification,
              metadata: e.metadata,
              createdAt: e.created_at,
              updatedAt: e.updated_at,
            };
          }
          static fromDocumentDomain(e) {
            return {
              id: e.id,
              user_id: e.userId,
              title: e.title,
              filename: e.filename,
              file_path: e.filePath,
              file_type: e.fileType,
              file_size: e.fileSize,
              content: e.content,
              text: e.text,
              status: e.status,
              classification: e.classification,
              metadata: e.metadata,
              created_at: e.createdAt,
              updated_at: e.updatedAt,
            };
          }
          static toCaseDomain(e) {
            return {
              id: e.id,
              userId: e.user_id,
              title: e.title,
              description: e.description,
              status: e.status,
              metadata: e.metadata,
              createdAt: e.created_at,
              updatedAt: e.updated_at,
            };
          }
          static fromCaseDomain(e) {
            return {
              id: e.id,
              user_id: e.userId,
              title: e.title,
              description: e.description,
              status: e.status,
              metadata: e.metadata,
              created_at: e.createdAt,
              updated_at: e.updatedAt,
            };
          }
          static toUserProfileDomain(e) {
            return {
              id: e.id,
              firstName: e.first_name,
              lastName: e.last_name,
              avatarUrl: e.avatar_url,
              bio: e.bio,
              countryOfCitizenship: e.country_of_citizenship,
              countryOfInterest: e.country_of_interest,
              countryOfResidence: e.country_of_residence,
              immigrationGoals: e.immigration_goals,
              language: e.language,
              timezone: e.timezone,
              visaType: e.visa_type,
              role: e.role,
              isAdmin: e.is_admin,
              createdAt: e.created_at,
              updatedAt: e.updated_at,
            };
          }
          static fromUserProfileDomain(e) {
            return {
              id: e.id,
              first_name: e.firstName,
              last_name: e.lastName,
              avatar_url: e.avatarUrl,
              bio: e.bio,
              country_of_citizenship: e.countryOfCitizenship,
              country_of_interest: e.countryOfInterest,
              country_of_residence: e.countryOfResidence,
              immigration_goals: e.immigrationGoals,
              language: e.language,
              timezone: e.timezone,
              visa_type: e.visaType,
              role: e.role,
              is_admin: e.isAdmin,
              created_at: e.createdAt,
              updated_at: e.updatedAt,
            };
          }
          static genericToDomain(e) {
            return (0, a.Cb)(e);
          }
          static genericFromDomain(e) {
            return (0, a.uc)(e);
          }
        }
      },
      87447: (e, t, r) => {
        "use strict";
        r.a(e, async (e, a) => {
          try {
            r.r(t), r.d(t, { default: () => o });
            var n = r(61268);
            r(84205);
            var s = r(28909),
              i = e([s]);
            function o({ error: e, reset: t }) {
              return (0, n.jsx)("div", {
                className: "flex h-screen",
                children: (0, n.jsxs)("div", {
                  className: "m-auto text-center space-y-4",
                  children: [
                    (0, n.jsx)("h2", {
                      className: "text-2xl font-bold",
                      children: "Something went wrong!",
                    }),
                    (0, n.jsx)("p", {
                      className: "text-muted-foreground",
                      children: e.message,
                    }),
                    (0, n.jsx)(s.$, {
                      onClick: () => t(),
                      variant: "outline",
                      children: "Try again",
                    }),
                  ],
                }),
              });
            }
            (s = (i.then ? (await i)() : i)[0]), a();
          } catch (e) {
            a(e);
          }
        });
      },
      88421: (e, t, r) => {
        "use strict";
        r.d(t, { g: () => n });
        var a = r(48149);
        class n {
          static {
            this.clientInstance = null;
          }
          constructor(e, t = {}) {
            this.tableName = e;
          }
          async getClient() {
            return (
              null === n.clientInstance && (n.clientInstance = (0, a.nH)()),
              n.clientInstance
            );
          }
          async getAll(e = {}) {
            let t = await this.getClient(),
              { data: r, error: a } = await t
                .from(this.tableName)
                .select("*")
                .range(e.offset || 0, (e.offset || 0) + (e.limit || 100) - 1);
            if (a) throw a;
            return r;
          }
          async getById(e) {
            let t = await this.getClient(),
              { data: r, error: a } = await t
                .from(this.tableName)
                .select("*")
                .eq("id", e)
                .single();
            if (a) {
              if ("PGRST116" === a.code) return null;
              throw a;
            }
            return r;
          }
          async create(e) {
            let t = await this.getClient(),
              { data: r, error: a } = await t
                .from(this.tableName)
                .insert(e)
                .select()
                .single();
            if (a)
              throw (console.error("[BaseRepository.create] Error:", a), a);
            return r;
          }
          async update(e, t) {
            let r = await this.getClient(),
              { data: a, error: n } = await r
                .from(this.tableName)
                .update(t)
                .eq("id", e)
                .select()
                .single();
            if (n) throw n;
            return a;
          }
          async delete(e) {
            let t = await this.getClient(),
              { error: r } = await t.from(this.tableName).delete().eq("id", e);
            if (r) throw r;
            return !0;
          }
        }
      },
      89123: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => a });
        let a = (0, r(95255).A)("Info", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["path", { d: "M12 16v-4", key: "1dtifu" }],
          ["path", { d: "M12 8h.01", key: "e9boi3" }],
        ]);
      },
      89663: (e, t, r) => {
        "use strict";
        let a;
        r.r(t),
          r.d(t, {
            default: () => y,
            experimental_ppr: () => p,
            generateImageMetadata: () => b,
            generateMetadata: () => g,
            generateViewport: () => v,
          });
        var n = r(63033),
          s = r(35242),
          i = r(15058),
          o = r(42057),
          d = r(16714),
          l = r(98699),
          c = r(14795),
          u = r(60442);
        let p = !0;
        async function m({ children: e }) {
          let [t, r] = await Promise.all([(0, c.j2)(), (0, i.UL)()]),
            a = r.get("sidebar:state")?.value !== "true";
          return (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsx)(o.default, {
                src: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js",
                strategy: "beforeInteractive",
              }),
              (0, s.jsxs)(l.SidebarProvider, {
                defaultOpen: !a,
                children: [
                  (0, s.jsx)(d.AppSidebar, {}),
                  (0, s.jsx)(l.SidebarInset, { children: e }),
                ],
              }),
            ],
          });
        }
        let h = { ...n },
          f =
            "workUnitAsyncStorage" in h
              ? h.workUnitAsyncStorage
              : "requestAsyncStorage" in h
                ? h.requestAsyncStorage
                : void 0;
        a = new Proxy(m, {
          apply: (e, t, r) => {
            let a, n, s;
            try {
              let e = f?.getStore();
              (a = e?.headers.get("sentry-trace") ?? void 0),
                (n = e?.headers.get("baggage") ?? void 0),
                (s = e?.headers);
            } catch (e) {}
            return u
              .wrapServerComponentWithSentry(e, {
                componentRoute: "/(ai-unified)",
                componentType: "Layout",
                sentryTraceHeader: a,
                baggageHeader: n,
                headers: s,
              })
              .apply(t, r);
          },
        });
        let g = void 0,
          b = void 0,
          v = void 0,
          y = a;
      },
      89783: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 53974));
      },
      90184: (e, t, r) => {
        Promise.resolve().then(r.t.bind(r, 2938, 23)),
          Promise.resolve().then(r.t.bind(r, 65405, 23)),
          Promise.resolve().then(r.t.bind(r, 83573, 23)),
          Promise.resolve().then(r.t.bind(r, 35348, 23)),
          Promise.resolve().then(r.t.bind(r, 39308, 23)),
          Promise.resolve().then(r.t.bind(r, 4784, 23)),
          Promise.resolve().then(r.t.bind(r, 60830, 23)),
          Promise.resolve().then(r.t.bind(r, 84360, 23));
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      92062: (e, t, r) => {
        "use strict";
        r.d(t, { UnifiedChatContainer: () => a });
        let a = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call UnifiedChatContainer() from the server but UnifiedChatContainer is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\unified-chat\\UnifiedChatContainer.tsx",
          "UnifiedChatContainer",
        );
      },
      92256: (e, t, r) => {
        "use strict";
        r.a(e, async (e, a) => {
          try {
            r.d(t, { k: () => l });
            var n = r(61268),
              s = r(49917),
              i = r(84205),
              o = r(15942),
              d = e([o]);
            o = (d.then ? (await d)() : d)[0];
            let l = i.forwardRef(({ className: e, value: t, ...r }, a) =>
              (0, n.jsx)(s.bL, {
                ref: a,
                className: (0, o.cn)(
                  "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
                  e,
                ),
                ...r,
                children: (0, n.jsx)(s.C1, {
                  className: "h-full w-full flex-1 bg-primary transition-all",
                  style: { transform: `translateX(-${100 - (t || 0)}%)` },
                }),
              }),
            );
            (l.displayName = s.bL.displayName), a();
          } catch (e) {
            a(e);
          }
        });
      },
      92663: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => a });
        let a = (0, r(95255).A)("BookOpen", [
          [
            "path",
            { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", key: "vv98re" },
          ],
          [
            "path",
            { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", key: "1cyq3y" },
          ],
        ]);
      },
      93206: () => {},
      94511: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 56460));
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94745: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => a });
        let a = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
          "default",
        );
      },
      96708: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 96708), (e.exports = t);
      },
      97927: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 51433)),
          Promise.resolve().then(r.bind(r, 59107)),
          Promise.resolve().then(r.bind(r, 39862));
      },
      98699: (e, t, r) => {
        "use strict";
        r.d(t, {
          SidebarInset: () => n,
          SidebarProvider: () => s,
          SidebarTrigger: () => i,
        });
        var a = r(26394);
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call Sidebar() from the server but Sidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "Sidebar",
        ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarContent() from the server but SidebarContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarContent",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarFooter() from the server but SidebarFooter is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarFooter",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroup() from the server but SidebarGroup is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroup",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroupAction() from the server but SidebarGroupAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroupAction",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroupContent() from the server but SidebarGroupContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroupContent",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroupLabel() from the server but SidebarGroupLabel is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroupLabel",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarHeader() from the server but SidebarHeader is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarHeader",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarInput() from the server but SidebarInput is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarInput",
          );
        let n = (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarInset() from the server but SidebarInset is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarInset",
        );
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarMenu() from the server but SidebarMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarMenu",
        ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuAction() from the server but SidebarMenuAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuAction",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuBadge() from the server but SidebarMenuBadge is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuBadge",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuButton() from the server but SidebarMenuButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuButton",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuItem() from the server but SidebarMenuItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuItem",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSkeleton() from the server but SidebarMenuSkeleton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSkeleton",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSub() from the server but SidebarMenuSub is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSub",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSubButton() from the server but SidebarMenuSubButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSubButton",
          ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSubItem() from the server but SidebarMenuSubItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSubItem",
          );
        let s = (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarProvider() from the server but SidebarProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarProvider",
        );
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarRail() from the server but SidebarRail is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarRail",
        ),
          (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarSeparator() from the server but SidebarSeparator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarSeparator",
          );
        let i = (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarTrigger() from the server but SidebarTrigger is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarTrigger",
        );
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useSidebar() from the server but useSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "useSidebar",
        );
      },
      99351: (e, t, r) => {
        "use strict";
        let a;
        r.r(t),
          r.d(t, {
            default: () => b,
            generateImageMetadata: () => f,
            generateMetadata: () => h,
            generateViewport: () => g,
          });
        var n = r(63033),
          s = r(35242),
          i = r(29073),
          o = r(92062),
          d = r(21088),
          l = r(48149),
          c = r(60442);
        async function u({ params: e }) {
          let t = (0, l.createServerClient)(),
            {
              data: { user: r },
            } = await t.auth.getUser(),
            a = new d.V(),
            n = await a.getById(e.id);
          n || (0, i.notFound)();
          let c = n.userId !== r?.id;
          return (0, s.jsx)("div", {
            className: "flex h-screen flex-col",
            children: (0, s.jsx)(o.UnifiedChatContainer, {
              id: e.id,
              isReadonly: c,
            }),
          });
        }
        let p = { ...n },
          m =
            "workUnitAsyncStorage" in p
              ? p.workUnitAsyncStorage
              : "requestAsyncStorage" in p
                ? p.requestAsyncStorage
                : void 0;
        a = new Proxy(u, {
          apply: (e, t, r) => {
            let a, n, s;
            try {
              let e = m?.getStore();
              (a = e?.headers.get("sentry-trace") ?? void 0),
                (n = e?.headers.get("baggage") ?? void 0),
                (s = e?.headers);
            } catch (e) {}
            return c
              .wrapServerComponentWithSentry(e, {
                componentRoute: "/(ai-unified)/chat/[id]",
                componentType: "Page",
                sentryTraceHeader: a,
                baggageHeader: n,
                headers: s,
              })
              .apply(t, r);
          },
        });
        let h = void 0,
          f = void 0,
          g = void 0,
          b = a;
      },
      99966: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            default: function () {
              return v;
            },
            handleClientScriptLoad: function () {
              return f;
            },
            initScriptLoader: function () {
              return g;
            },
          });
        let a = r(17380),
          n = r(88835),
          s = r(61268),
          i = a._(r(90304)),
          o = n._(r(84205)),
          d = r(3954),
          l = r(86327),
          c = r(1523),
          u = new Map(),
          p = new Set(),
          m = (e) => {
            if (i.default.preinit)
              return void e.forEach((e) => {
                i.default.preinit(e, { as: "style" });
              });
          },
          h = (e) => {
            let {
                src: t,
                id: r,
                onLoad: a = () => {},
                onReady: n = null,
                dangerouslySetInnerHTML: s,
                children: i = "",
                strategy: o = "afterInteractive",
                onError: d,
                stylesheets: c,
              } = e,
              h = r || t;
            if (h && p.has(h)) return;
            if (u.has(t)) {
              p.add(h), u.get(t).then(a, d);
              return;
            }
            let f = () => {
                n && n(), p.add(h);
              },
              g = document.createElement("script"),
              b = new Promise((e, t) => {
                g.addEventListener("load", function (t) {
                  e(), a && a.call(this, t), f();
                }),
                  g.addEventListener("error", function (e) {
                    t(e);
                  });
              }).catch(function (e) {
                d && d(e);
              });
            s
              ? ((g.innerHTML = s.__html || ""), f())
              : i
                ? ((g.textContent =
                    "string" == typeof i
                      ? i
                      : Array.isArray(i)
                        ? i.join("")
                        : ""),
                  f())
                : t && ((g.src = t), u.set(t, b)),
              (0, l.setAttributesFromProps)(g, e),
              "worker" === o && g.setAttribute("type", "text/partytown"),
              g.setAttribute("data-nscript", o),
              c && m(c),
              document.body.appendChild(g);
          };
        function f(e) {
          let { strategy: t = "afterInteractive" } = e;
          "lazyOnload" === t
            ? window.addEventListener("load", () => {
                (0, c.requestIdleCallback)(() => h(e));
              })
            : h(e);
        }
        function g(e) {
          e.forEach(f),
            [
              ...document.querySelectorAll(
                '[data-nscript="beforeInteractive"]',
              ),
              ...document.querySelectorAll('[data-nscript="beforePageRender"]'),
            ].forEach((e) => {
              let t = e.id || e.getAttribute("src");
              p.add(t);
            });
        }
        function b(e) {
          let {
              id: t,
              src: r = "",
              onLoad: a = () => {},
              onReady: n = null,
              strategy: l = "afterInteractive",
              onError: u,
              stylesheets: m,
              ...f
            } = e,
            {
              updateScripts: g,
              scripts: b,
              getIsSsr: v,
              appDir: y,
              nonce: x,
            } = (0, o.useContext)(d.HeadManagerContext),
            w = (0, o.useRef)(!1);
          (0, o.useEffect)(() => {
            let e = t || r;
            w.current || (n && e && p.has(e) && n(), (w.current = !0));
          }, [n, t, r]);
          let _ = (0, o.useRef)(!1);
          if (
            ((0, o.useEffect)(() => {
              if (!_.current) {
                if ("afterInteractive" === l) h(e);
                else
                  "lazyOnload" === l &&
                    ("complete" === document.readyState
                      ? (0, c.requestIdleCallback)(() => h(e))
                      : window.addEventListener("load", () => {
                          (0, c.requestIdleCallback)(() => h(e));
                        }));
                _.current = !0;
              }
            }, [e, l]),
            ("beforeInteractive" === l || "worker" === l) &&
              (g
                ? ((b[l] = (b[l] || []).concat([
                    { id: t, src: r, onLoad: a, onReady: n, onError: u, ...f },
                  ])),
                  g(b))
                : v && v()
                  ? p.add(t || r)
                  : v && !v() && h(e)),
            y)
          ) {
            if (
              (m &&
                m.forEach((e) => {
                  i.default.preinit(e, { as: "style" });
                }),
              "beforeInteractive" === l)
            )
              if (!r)
                return (
                  f.dangerouslySetInnerHTML &&
                    ((f.children = f.dangerouslySetInnerHTML.__html),
                    delete f.dangerouslySetInnerHTML),
                  (0, s.jsx)("script", {
                    nonce: x,
                    dangerouslySetInnerHTML: {
                      __html:
                        "(self.__next_s=self.__next_s||[]).push(" +
                        JSON.stringify([0, { ...f, id: t }]) +
                        ")",
                    },
                  })
                );
              else
                return (
                  i.default.preload(
                    r,
                    f.integrity
                      ? {
                          as: "script",
                          integrity: f.integrity,
                          nonce: x,
                          crossOrigin: f.crossOrigin,
                        }
                      : { as: "script", nonce: x, crossOrigin: f.crossOrigin },
                  ),
                  (0, s.jsx)("script", {
                    nonce: x,
                    dangerouslySetInnerHTML: {
                      __html:
                        "(self.__next_s=self.__next_s||[]).push(" +
                        JSON.stringify([r, { ...f, id: t }]) +
                        ")",
                    },
                  })
                );
            "afterInteractive" === l &&
              r &&
              i.default.preload(
                r,
                f.integrity
                  ? {
                      as: "script",
                      integrity: f.integrity,
                      nonce: x,
                      crossOrigin: f.crossOrigin,
                    }
                  : { as: "script", nonce: x, crossOrigin: f.crossOrigin },
              );
          }
          return null;
        }
        Object.defineProperty(b, "__nextScript", { value: !0 });
        let v = b;
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
    });
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    a = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 7719, 6188, 7911, 7401, 5124, 3042, 385, 4486, 8119, 5058, 131,
        2028, 4307, 7111, 8287, 8264, 27, 4232, 9008,
      ],
      () => r(86364),
    );
  module.exports = a;
})();
//# sourceMappingURL=page.js.map
