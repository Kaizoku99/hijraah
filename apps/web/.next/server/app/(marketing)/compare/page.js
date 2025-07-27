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
    r = new e.Error().stack;
  r &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[r] = "e1a2bb66-ccff-4e0e-a93e-2b79c7a49965"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-e1a2bb66-ccff-4e0e-a93e-2b79c7a49965"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 8646),
    (e.ids = [8646]),
    (e.modules = {
      1278: (e, r, t) => {
        "use strict";
        t.d(r, { Qg: () => i, bL: () => d });
        var s = t(84205),
          a = t(56558),
          o = t(61268),
          i = Object.freeze({
            position: "absolute",
            border: 0,
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            wordWrap: "normal",
          }),
          n = s.forwardRef((e, r) =>
            (0, o.jsx)(a.sG.span, {
              ...e,
              ref: r,
              style: { ...i, ...e.style },
            }),
          );
        n.displayName = "VisuallyHidden";
        var d = n;
      },
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      4988: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => o.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => p,
            tree: () => d,
          });
        var s = t(11610),
          a = t(51293),
          o = t(59059),
          i = t(17770),
          n = {};
        for (let e in i)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (n[e] = () => i[e]);
        t.d(r, n);
        let d = {
            children: [
              "",
              {
                children: [
                  "(marketing)",
                  {
                    children: [
                      "compare",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(t.bind(t, 14117)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\compare\\page.tsx",
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {
                    forbidden: [
                      () => Promise.resolve().then(t.t.bind(t, 57382, 23)),
                      "next/dist/client/components/forbidden-error",
                    ],
                    unauthorized: [
                      () => Promise.resolve().then(t.t.bind(t, 87039, 23)),
                      "next/dist/client/components/unauthorized-error",
                    ],
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(t.bind(t, 22630)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\layout.tsx",
                ],
                error: [
                  () => Promise.resolve().then(t.bind(t, 94745)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
                ],
                "global-error": [
                  () => Promise.resolve().then(t.bind(t, 59059)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(t.bind(t, 53974)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
                ],
                forbidden: [
                  () => Promise.resolve().then(t.t.bind(t, 57382, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(t.t.bind(t, 87039, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          l = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\compare\\page.tsx",
          ],
          c = { require: t, loadChunk: () => Promise.resolve() },
          p = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(marketing)/compare/page",
              pathname: "/compare",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11890: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 14117));
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      13242: (e, r, t) => {
        "use strict";
        t.d(r, { F: () => a });
        var s = t(61268);
        t(84205);
        let a = ({ children: e, className: r, ...t }) =>
          (0, s.jsx)("div", {
            className: `overflow-auto ${r || ""}`,
            ...t,
            children: e,
          });
      },
      14117: (e, r, t) => {
        "use strict";
        let s;
        t.r(r),
          t.d(r, {
            default: () => h,
            generateImageMetadata: () => p,
            generateMetadata: () => c,
            generateViewport: () => u,
          });
        var a = t(63033),
          o = t(26394),
          i = t(60442),
          n = (0, o.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(marketing)\\\\compare\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\compare\\page.tsx",
            "default",
          );
        let d = { ...a },
          l =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof n
            ? new Proxy(n, {
                apply: (e, r, t) => {
                  let s, a, o;
                  try {
                    let e = l?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (o = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(marketing)/compare",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: o,
                    })
                    .apply(r, t);
                },
              })
            : n;
        let c = void 0,
          p = void 0,
          u = void 0,
          h = s;
      },
      15668: (e) => {
        function r(e) {
          var r = Error("Cannot find module '" + e + "'");
          throw ((r.code = "MODULE_NOT_FOUND"), r);
        }
        (r.keys = () => []), (r.resolve = r), (r.id = 15668), (e.exports = r);
      },
      16176: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { Separator: () => d });
            var a = t(61268),
              o = t(51209);
            t(84205);
            var i = t(15942),
              n = e([i]);
            function d({
              className: e,
              orientation: r = "horizontal",
              decorative: t = !0,
              ...s
            }) {
              return (0, a.jsx)(o.b, {
                "data-slot": "separator-root",
                decorative: t,
                orientation: r,
                className: (0, i.cn)(
                  "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
                  e,
                ),
                ...s,
              });
            }
            (i = (n.then ? (await n)() : n)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28777: (e, r, t) => {
        "use strict";
        function s(e, r, { checkForDefaultPrevented: t = !0 } = {}) {
          return function (s) {
            if ((e?.(s), !1 === t || !s.defaultPrevented)) return r?.(s);
          };
        }
        t.d(r, { m: () => s });
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
      32367: (e, r, t) => {
        "use strict";
        let s;
        t.d(r, { AG: () => g, Iw: () => x, UU: () => f });
        var a = t(97713),
          o = t(15149),
          i = t.n(o),
          n = t(84205);
        let { fetch: d } = i()(),
          l = "http://localhost:54321",
          c =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          p = process.env.SUPABASE_SERVICE_ROLE_KEY,
          u = c ? { apikey: c } : void 0;
        function h() {
          if (!l || !c)
            throw (
              (console.error(
                "Missing environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
              ),
              Error("Supabase URL or Anon Key is missing."))
            );
        }
        {
          let e = globalThis;
          e.__USING_PONYFETCH__ ||
            ((e.fetch = d), (e.__USING_PONYFETCH__ = !0));
        }
        function m() {
          return (h(), s)
            ? s
            : (s = (0, a.createBrowserClient)(l, c, {
                global: { headers: u },
              }));
        }
        function x() {
          return (0, n.useMemo)(m, []);
        }
        function f() {
          return (
            h(), (0, a.createBrowserClient)(l, c, { global: { headers: u } })
          );
        }
        let g = m;
        m();
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
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      51619: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r), t.d(r, { default: () => c });
            var a = t(61268),
              o = t(84205),
              i = t(98654),
              n = t(56359),
              d = t(90907),
              l = e([n]);
            n = (l.then ? (await l)() : l)[0];
            let p = new d.O();
            function c() {
              let [e, r] = (0, o.useState)(!1),
                [t, s] = (0, o.useState)(null),
                d = async (e, t) => {
                  r(!0);
                  try {
                    let { data: r } = await p.compareCountries(e, t);
                    s(r), i.oR.success("Comparison generated successfully");
                  } catch (e) {
                    console.error("Comparison error:", e),
                      i.oR.error(
                        e instanceof Error
                          ? e.message
                          : "Failed to compare countries",
                      ),
                      s("Failed to compare countries. Please try again.");
                  } finally {
                    r(!1);
                  }
                };
              return (0, a.jsxs)("div", {
                className: "container mx-auto py-8",
                children: [
                  (0, a.jsx)("h1", {
                    className: "text-3xl font-bold mb-8",
                    children: "Compare Immigration Requirements",
                  }),
                  (0, a.jsx)(n.s, {
                    onCompare: d,
                    isLoading: e,
                    comparison: t,
                  }),
                ],
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      56359: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { s: () => p });
            var a = t(61268),
              o = t(84205),
              i = t(28909),
              n = t(13242),
              d = t(95957),
              l = t(16176),
              c = e([i, d, l]);
            [i, d, l] = c.then ? (await c)() : c;
            let u = ["visa", "study", "work", "immigrate", "citizenship"];
            function p({ onCompare: e, isLoading: r, comparison: t }) {
              let [s, c] = (0, o.useState)([]),
                [p, h] = (0, o.useState)("visa"),
                [m, x] = (0, o.useState)(null),
                f = (e) => {
                  c((r) =>
                    r.includes(e) ? r.filter((r) => r !== e) : [...r, e],
                  );
                },
                g = async () => {
                  if (s.length < 2)
                    return void alert(
                      "Please select at least 2 countries to compare",
                    );
                  try {
                    await e(s, p);
                  } catch (e) {
                    x(e);
                  }
                };
              return (0, a.jsxs)("div", {
                className: "space-y-6",
                children: [
                  (0, a.jsxs)("div", {
                    className: "flex flex-col space-y-4",
                    children: [
                      (0, a.jsx)("h2", {
                        className: "text-xl font-semibold",
                        children: "Select Countries to Compare",
                      }),
                      (0, a.jsx)("div", {
                        className: "flex flex-wrap gap-2",
                        children: [].map((e) =>
                          (0, a.jsx)(
                            i.$,
                            {
                              variant: s.includes(e) ? "secondary" : "outline",
                              onClick: () => f(e),
                              className: "capitalize",
                              children: e,
                            },
                            e,
                          ),
                        ),
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "flex flex-col space-y-4",
                    children: [
                      (0, a.jsx)("h2", {
                        className: "text-xl font-semibold",
                        children: "Select Category",
                      }),
                      (0, a.jsxs)(d.l6, {
                        value: p,
                        onValueChange: h,
                        children: [
                          (0, a.jsx)(d.bq, {
                            children: (0, a.jsx)(d.yv, {
                              placeholder: "Select category",
                            }),
                          }),
                          (0, a.jsx)(d.gC, {
                            children: u.map((e) =>
                              (0, a.jsx)(
                                d.eb,
                                {
                                  value: e,
                                  children:
                                    e.charAt(0).toUpperCase() + e.slice(1),
                                },
                                e,
                              ),
                            ),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsx)(i.$, {
                    onClick: g,
                    disabled: s.length < 2 || r,
                    className: "w-full",
                    children: r ? "Comparing..." : "Compare Selected Countries",
                  }),
                  t &&
                    (0, a.jsxs)(a.Fragment, {
                      children: [
                        (0, a.jsx)(l.Separator, {}),
                        (0, a.jsxs)("div", {
                          className: "rounded-lg border p-4",
                          children: [
                            (0, a.jsx)("h2", {
                              className: "text-xl font-semibold mb-4",
                              children: "Comparison Results",
                            }),
                            (0, a.jsx)(n.F, {
                              className: "h-[400px]",
                              children: (0, a.jsx)("div", {
                                className: "prose dark:prose-invert max-w-none",
                                children: t,
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                ],
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      58746: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 51619));
      },
      59570: () => {},
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      70753: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("ChevronDown", [
          ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }],
        ]);
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
      },
      74998: (e) => {
        "use strict";
        e.exports = require("perf_hooks");
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
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      90907: (e, r, t) => {
        "use strict";
        t.d(r, { O: () => a });
        var s = t(32367);
        class a {
          constructor(e = {}) {
            (this.supabase = (0, s.AG)()), (this.baseUrl = e.baseUrl || "/api");
          }
          async getAuthHeader() {
            let {
              data: { session: e },
              error: r,
            } = await this.supabase.auth.getSession();
            if (r || !e) throw Error("Not authenticated");
            return {
              Authorization: `Bearer ${e.access_token}`,
              "Content-Type": "application/json",
            };
          }
          async fetchWithAuth(e, r = {}) {
            let t = await this.getAuthHeader(),
              s = await fetch(`${this.baseUrl}${e}`, {
                ...r,
                headers: { ...t, ...r.headers },
              });
            if (!s.ok)
              throw Error(
                (await s.json().catch(() => ({}))).message ||
                  "API request failed",
              );
            return s.json();
          }
          async processQuery(e, r) {
            return this.fetchWithAuth("/ai/chat", {
              method: "POST",
              body: JSON.stringify({ query: e, filters: r }),
            });
          }
          async compareCountries(e, r) {
            return this.fetchWithAuth("/ai/compare", {
              method: "POST",
              body: JSON.stringify({ countries: e, category: r }),
            });
          }
        }
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      95957: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              bq: () => h,
              eb: () => x,
              gC: () => m,
              l6: () => p,
              yv: () => u,
            });
            var a = t(61268),
              o = t(81242),
              i = t(70753),
              n = t(415),
              d = t(84205),
              l = t(15942),
              c = e([l]);
            l = (c.then ? (await c)() : c)[0];
            let p = o.bL;
            o.YJ;
            let u = o.WT,
              h = d.forwardRef(({ className: e, children: r, ...t }, s) =>
                (0, a.jsxs)(o.l9, {
                  ref: s,
                  className: (0, l.cn)(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    e,
                  ),
                  ...t,
                  children: [
                    r,
                    (0, a.jsx)(o.In, {
                      asChild: !0,
                      children: (0, a.jsx)(i.A, {
                        className: "h-4 w-4 opacity-50",
                      }),
                    }),
                  ],
                }),
              );
            h.displayName = o.l9.displayName;
            let m = d.forwardRef(
              (
                { className: e, children: r, position: t = "popper", ...s },
                i,
              ) =>
                (0, a.jsx)(o.ZL, {
                  children: (0, a.jsx)(o.UC, {
                    ref: i,
                    className: (0, l.cn)(
                      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                      "popper" === t &&
                        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                      e,
                    ),
                    position: t,
                    ...s,
                    children: (0, a.jsx)(o.LM, {
                      className: (0, l.cn)(
                        "p-1",
                        "popper" === t &&
                          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                      ),
                      children: r,
                    }),
                  }),
                }),
            );
            (m.displayName = o.UC.displayName),
              (d.forwardRef(({ className: e, ...r }, t) =>
                (0, a.jsx)(o.JU, {
                  ref: t,
                  className: (0, l.cn)(
                    "py-1.5 pl-8 pr-2 text-sm font-semibold",
                    e,
                  ),
                  ...r,
                }),
              ).displayName = o.JU.displayName);
            let x = d.forwardRef(({ className: e, children: r, ...t }, s) =>
              (0, a.jsxs)(o.q7, {
                ref: s,
                className: (0, l.cn)(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  e,
                ),
                ...t,
                children: [
                  (0, a.jsx)("span", {
                    className:
                      "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                    children: (0, a.jsx)(o.VF, {
                      children: (0, a.jsx)(n.A, { className: "h-4 w-4" }),
                    }),
                  }),
                  (0, a.jsx)(o.p4, { children: r }),
                ],
              }),
            );
            (x.displayName = o.q7.displayName),
              (d.forwardRef(({ className: e, ...r }, t) =>
                (0, a.jsx)(o.wv, {
                  ref: t,
                  className: (0, l.cn)("-mx-1 my-1 h-px bg-muted", e),
                  ...r,
                }),
              ).displayName = o.wv.displayName),
              s();
          } catch (e) {
            s(e);
          }
        });
      },
    });
  var r = require("../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(
      0,
      [827, 6518, 2033, 4027, 2872, 7713, 5149, 9729, 3390, 7401, 6867, 4630],
      () => t(4988),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
