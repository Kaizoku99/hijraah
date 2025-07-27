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
    (e._sentryDebugIds[t] = "9c5c0402-a632-4605-af8f-bd00410bd46d"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-9c5c0402-a632-4605-af8f-bd00410bd46d"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 5657),
    (e.ids = [5657]),
    (e.modules = {
      1523: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            cancelIdleCallback: function () {
              return n;
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
          n =
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
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3954: (e, t, r) => {
        "use strict";
        e.exports = r(31756).vendored.contexts.HeadManagerContext;
      },
      5451: (e, t, r) => {
        "use strict";
        r.a(e, async (e, n) => {
          try {
            r.d(t, {
              BT: () => p,
              Wu: () => f,
              ZB: () => u,
              Zp: () => l,
              aR: () => c,
              wL: () => b,
            });
            var o = r(61268),
              i = r(55728),
              s = r(84205),
              a = r(15942),
              d = e([a]);
            a = (d.then ? (await d)() : d)[0];
            let l = s.forwardRef(({ className: e, ...t }, r) =>
              (0, o.jsx)(i.P.div, {
                ref: r,
                className: (0, a.cn)(
                  "rounded-lg border bg-card text-card-foreground shadow-sm",
                  e,
                ),
                whileHover: {
                  scale: 1.03,
                  boxShadow:
                    "0px 7px 25px rgba(0,0,0,0.08), 0px 3px 10px rgba(0,0,0,0.04)",
                },
                transition: { type: "spring", stiffness: 300, damping: 20 },
                ...t,
              }),
            );
            l.displayName = "Card";
            let c = s.forwardRef(({ className: e, ...t }, r) =>
              (0, o.jsx)("div", {
                ref: r,
                className: (0, a.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            c.displayName = "CardHeader";
            let u = s.forwardRef(({ className: e, ...t }, r) =>
              (0, o.jsx)("h3", {
                ref: r,
                className: (0, a.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            u.displayName = "CardTitle";
            let p = s.forwardRef(({ className: e, ...t }, r) =>
              (0, o.jsx)("p", {
                ref: r,
                className: (0, a.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            p.displayName = "CardDescription";
            let f = s.forwardRef(({ className: e, ...t }, r) =>
              (0, o.jsx)("div", {
                ref: r,
                className: (0, a.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            f.displayName = "CardContent";
            let b = s.forwardRef(({ className: e, ...t }, r) =>
              (0, o.jsx)("div", {
                ref: r,
                className: (0, a.cn)("flex items-center p-6 pt-0", e),
                ...t,
              }),
            );
            (b.displayName = "CardFooter"), n();
          } catch (e) {
            n(e);
          }
        });
      },
      6304: (e, t, r) => {
        "use strict";
        r.a(e, async (e, n) => {
          try {
            r.r(t), r.d(t, { default: () => y });
            var o = r(61268),
              i = r(94763),
              s = r(90286),
              a = r(31469),
              d = r(31655),
              l = r.n(d),
              c = r(89882),
              u = r(84205),
              p = r(28909),
              f = r(5451),
              b = r(94812),
              h = r(15090),
              m = r(3519),
              v = e([p, f, b]);
            function y() {
              let e = (0, c.useRouter)(),
                { user: t } = (0, m.useAuth)(),
                { toast: r } = (0, h.d)(),
                [n, d] = (0, u.useState)([]),
                [v, y] = (0, u.useState)(!0),
                x = async (e) => {
                  try {
                    if (
                      !(
                        await fetch(`/api/chat/${e}/unarchive`, {
                          method: "PUT",
                        })
                      ).ok
                    )
                      throw Error("Failed to unarchive chat");
                    d(n.filter((t) => t.id !== e)),
                      r({
                        title: "Chat unarchived",
                        description:
                          "The chat has been restored to your history",
                      });
                  } catch (e) {
                    console.error("Error unarchiving chat:", e),
                      r({
                        title: "Error",
                        description: e.message || "Failed to unarchive chat",
                        variant: "destructive",
                      });
                  }
                };
              return t
                ? (0, o.jsxs)("div", {
                    className: "container mx-auto py-8",
                    children: [
                      (0, o.jsxs)("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                          (0, o.jsx)("h1", {
                            className: "text-2xl font-bold",
                            children: "Archived Chats",
                          }),
                          (0, o.jsxs)(p.$, {
                            variant: "outline",
                            onClick: () => e.push("/ai-chat/history"),
                            children: [
                              (0, o.jsx)(s.A, { className: "mr-2 h-4 w-4" }),
                              "Back to History",
                            ],
                          }),
                        ],
                      }),
                      v
                        ? (0, o.jsx)("div", {
                            className:
                              "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
                            children: [1, 2, 3].map((e) =>
                              (0, o.jsxs)(
                                f.Zp,
                                {
                                  children: [
                                    (0, o.jsx)(f.aR, {
                                      children: (0, o.jsx)(b.E, {
                                        className: "h-6 w-3/4",
                                      }),
                                    }),
                                    (0, o.jsx)(f.Wu, {
                                      children: (0, o.jsx)(b.E, {
                                        className: "h-4 w-full",
                                      }),
                                    }),
                                    (0, o.jsx)(f.wL, {
                                      children: (0, o.jsx)(b.E, {
                                        className: "h-9 w-full",
                                      }),
                                    }),
                                  ],
                                },
                                e,
                              ),
                            ),
                          })
                        : 0 === n.length
                          ? (0, o.jsxs)("div", {
                              className: "text-center py-12",
                              children: [
                                (0, o.jsx)(a.A, {
                                  className:
                                    "mx-auto h-12 w-12 text-muted-foreground",
                                }),
                                (0, o.jsx)("h2", {
                                  className: "mt-4 text-lg font-semibold",
                                  children: "No archived chats",
                                }),
                                (0, o.jsx)("p", {
                                  className: "text-muted-foreground mt-2",
                                  children:
                                    "When you archive chats, they will appear here",
                                }),
                                (0, o.jsxs)(p.$, {
                                  className: "mt-4",
                                  variant: "outline",
                                  onClick: () => e.push("/ai-chat/history"),
                                  children: [
                                    (0, o.jsx)(s.A, {
                                      className: "mr-2 h-4 w-4",
                                    }),
                                    "Back to History",
                                  ],
                                }),
                              ],
                            })
                          : (0, o.jsx)("div", {
                              className:
                                "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
                              children: n.map((e) =>
                                (0, o.jsxs)(
                                  f.Zp,
                                  {
                                    children: [
                                      (0, o.jsxs)(f.aR, {
                                        children: [
                                          (0, o.jsx)(f.ZB, {
                                            className: "truncate",
                                            children:
                                              e.title ||
                                              `Chat (${e.id.substring(0, 6)}...)`,
                                          }),
                                          (0, o.jsxs)("p", {
                                            className:
                                              "text-sm text-muted-foreground",
                                            children: [
                                              "Archived ",
                                              (0, i.m)(new Date(e.updated_at), {
                                                addSuffix: !0,
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, o.jsxs)(f.wL, {
                                        className: "flex justify-between",
                                        children: [
                                          (0, o.jsx)(p.$, {
                                            variant: "outline",
                                            asChild: !0,
                                            children: (0, o.jsx)(l(), {
                                              href: `/ai-chat/${e.id}`,
                                              children: "View",
                                            }),
                                          }),
                                          (0, o.jsxs)(p.$, {
                                            variant: "secondary",
                                            onClick: () => x(e.id),
                                            children: [
                                              (0, o.jsx)(a.A, {
                                                className: "mr-2 h-4 w-4",
                                              }),
                                              "Unarchive",
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  e.id,
                                ),
                              ),
                            }),
                    ],
                  })
                : (0, o.jsx)("div", {
                    className: "container mx-auto py-8",
                    children: (0, o.jsxs)("div", {
                      className: "text-center",
                      children: [
                        (0, o.jsx)("h1", {
                          className: "text-2xl font-bold",
                          children: "Archived Chats",
                        }),
                        (0, o.jsx)("p", {
                          className: "text-muted-foreground mt-2",
                          children:
                            "Please sign in to view your archived chats",
                        }),
                      ],
                    }),
                  });
            }
            ([p, f, b] = v.then ? (await v)() : v), n();
          } catch (e) {
            n(e);
          }
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
      11316: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "notFound", {
            enumerable: !0,
            get: function () {
              return o;
            },
          });
        let n = "" + r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
        function o() {
          let e = Object.defineProperty(Error(n), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: !1,
            configurable: !0,
          });
          throw ((e.digest = n), e);
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      14604: (e, t, r) => {
        let { createProxy: n } = r(85493);
        e.exports = n(
          "E:\\downloads\\Hijraah\\node_modules\\.pnpm\\next@15.3.0-canary.31_@babe_be67f368de2727c847f3a61f5e6cf4fa\\node_modules\\next\\dist\\client\\script.js",
        );
      },
      14749: (e, t, r) => {
        "use strict";
        function n() {
          throw Object.defineProperty(
            Error(
              "`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled.",
            ),
            "__NEXT_ERROR_CODE",
            { value: "E488", enumerable: !1, configurable: !0 },
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "forbidden", {
            enumerable: !0,
            get: function () {
              return n;
            },
          }),
          r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE,
          ("function" == typeof t.default ||
            ("object" == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, "__esModule", { value: !0 }),
            Object.assign(t.default, t),
            (e.exports = t.default));
      },
      14795: (e, t, r) => {
        "use strict";
        r.d(t, { j2: () => o });
        var n = r(84001);
        async function o() {
          return (await (0, n.WV)()).session;
        }
        r(57011), r(67761), r(29244);
      },
      16714: (e, t, r) => {
        "use strict";
        r.d(t, { AppSidebar: () => n });
        let n = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call AppSidebar() from the server but AppSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\app-sidebar.tsx",
          "AppSidebar",
        );
      },
      18047: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s, q: () => i });
        var n = r(84205),
          o = r(61268);
        function i(e, t) {
          let r = n.createContext(t),
            i = (e) => {
              let { children: t, ...i } = e,
                s = n.useMemo(() => i, Object.values(i));
              return (0, o.jsx)(r.Provider, { value: s, children: t });
            };
          return (
            (i.displayName = e + "Provider"),
            [
              i,
              function (o) {
                let i = n.useContext(r);
                if (i) return i;
                if (void 0 !== t) return t;
                throw Error(`\`${o}\` must be used within \`${e}\``);
              },
            ]
          );
        }
        function s(e, t = []) {
          let r = [],
            i = () => {
              let t = r.map((e) => n.createContext(e));
              return function (r) {
                let o = r?.[e] || t;
                return n.useMemo(
                  () => ({ [`__scope${e}`]: { ...r, [e]: o } }),
                  [r, o],
                );
              };
            };
          return (
            (i.scopeName = e),
            [
              function (t, i) {
                let s = n.createContext(i),
                  a = r.length;
                r = [...r, i];
                let d = (t) => {
                  let { scope: r, children: i, ...d } = t,
                    l = r?.[e]?.[a] || s,
                    c = n.useMemo(() => d, Object.values(d));
                  return (0, o.jsx)(l.Provider, { value: c, children: i });
                };
                return (
                  (d.displayName = t + "Provider"),
                  [
                    d,
                    function (r, o) {
                      let d = o?.[e]?.[a] || s,
                        l = n.useContext(d);
                      if (l) return l;
                      if (void 0 !== i) return i;
                      throw Error(`\`${r}\` must be used within \`${t}\``);
                    },
                  ]
                );
              },
              (function (...e) {
                let t = e[0];
                if (1 === e.length) return t;
                let r = () => {
                  let r = e.map((e) => ({
                    useScope: e(),
                    scopeName: e.scopeName,
                  }));
                  return function (e) {
                    let o = r.reduce((t, { useScope: r, scopeName: n }) => {
                      let o = r(e)[`__scope${n}`];
                      return { ...t, ...o };
                    }, {});
                    return n.useMemo(
                      () => ({ [`__scope${t.scopeName}`]: o }),
                      [o],
                    );
                  };
                };
                return (r.scopeName = t.scopeName), r;
              })(i, ...t),
            ]
          );
        }
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
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
      23399: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "unstable_rethrow", {
            enumerable: !0,
            get: function () {
              return function e(t) {
                if (
                  (0, s.isNextRouterError)(t) ||
                  (0, i.isBailoutToCSRError)(t) ||
                  (0, d.isDynamicServerError)(t) ||
                  (0, a.isDynamicPostpone)(t) ||
                  (0, o.isPostpone)(t) ||
                  (0, n.isHangingPromiseRejectionError)(t)
                )
                  throw t;
                t instanceof Error && "cause" in t && e(t.cause);
              };
            },
          });
        let n = r(6223),
          o = r(96124),
          i = r(58937),
          s = r(91613),
          a = r(62938),
          d = r(98800);
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28777: (e, t, r) => {
        "use strict";
        function n(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
          return function (n) {
            if ((e?.(n), !1 === r || !n.defaultPrevented)) return t?.(n);
          };
        }
        r.d(t, { m: () => n });
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29073: (e, t, r) => {
        "use strict";
        var n = r(90645);
        r.o(n, "notFound") &&
          r.d(t, {
            notFound: function () {
              return n.notFound;
            },
          }),
          r.o(n, "permanentRedirect") &&
            r.d(t, {
              permanentRedirect: function () {
                return n.permanentRedirect;
              },
            }),
          r.o(n, "redirect") &&
            r.d(t, {
              redirect: function () {
                return n.redirect;
              },
            });
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      31469: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("Archive", [
          [
            "rect",
            {
              width: "20",
              height: "5",
              x: "2",
              y: "3",
              rx: "1",
              key: "1wp1u1",
            },
          ],
          [
            "path",
            { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" },
          ],
          ["path", { d: "M10 12h4", key: "a56b0p" }],
        ]);
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
      41513: (e, t, r) => {
        "use strict";
        let n;
        r.r(t),
          r.d(t, {
            default: () => f,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var o = r(63033),
          i = r(26394),
          s = r(60442),
          a = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(ai-unified)\\\\chat\\\\archived\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\archived\\page.tsx",
            "default",
          );
        let d = { ...o },
          l =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        n =
          "function" == typeof a
            ? new Proxy(a, {
                apply: (e, t, r) => {
                  let n, o, i;
                  try {
                    let e = l?.getStore();
                    (n = e?.headers.get("sentry-trace") ?? void 0),
                      (o = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return s
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(ai-unified)/chat/archived",
                      componentType: "Page",
                      sentryTraceHeader: n,
                      baggageHeader: o,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : a;
        let c = void 0,
          u = void 0,
          p = void 0,
          f = n;
      },
      41602: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 41513));
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42057: (e, t, r) => {
        "use strict";
        r.d(t, { default: () => o.a });
        var n = r(14604),
          o = r.n(n);
      },
      42600: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "unstable_rethrow", {
            enumerable: !0,
            get: function () {
              return n;
            },
          });
        let n = r(23399).unstable_rethrow;
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      52480: (e, t, r) => {
        "use strict";
        function n() {
          throw Object.defineProperty(
            Error(
              "`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled.",
            ),
            "__NEXT_ERROR_CODE",
            { value: "E411", enumerable: !1, configurable: !0 },
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "unauthorized", {
            enumerable: !0,
            get: function () {
              return n;
            },
          }),
          r(17581).HTTP_ERROR_FALLBACK_ERROR_CODE,
          ("function" == typeof t.default ||
            ("object" == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, "__esModule", { value: !0 }),
            Object.assign(t.default, t),
            (e.exports = t.default));
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
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      59754: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 6304));
      },
      61284: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => u,
            tree: () => d,
          });
        var n = r(11610),
          o = r(51293),
          i = r(59059),
          s = r(17770),
          a = {};
        for (let e in s)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (a[e] = () => s[e]);
        r.d(t, a);
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
                          "archived",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(r.bind(r, 41513)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\archived\\page.tsx",
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\archived\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new n.AppPageRouteModule({
            definition: {
              kind: o.RouteKind.APP_PAGE,
              page: "/(ai-unified)/chat/archived/page",
              pathname: "/chat/archived",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      63961: (e, t, r) => {
        "use strict";
        r.d(t, { TL: () => s });
        var n = r(84205),
          o = r(71604),
          i = r(61268);
        function s(e) {
          let t = (function (e) {
              let t = n.forwardRef((e, t) => {
                let { children: r, ...i } = e;
                if (n.isValidElement(r)) {
                  var s;
                  let e,
                    a,
                    d =
                      ((s = r),
                      (a =
                        (e = Object.getOwnPropertyDescriptor(
                          s.props,
                          "ref",
                        )?.get) &&
                        "isReactWarning" in e &&
                        e.isReactWarning)
                        ? s.ref
                        : (a =
                              (e = Object.getOwnPropertyDescriptor(
                                s,
                                "ref",
                              )?.get) &&
                              "isReactWarning" in e &&
                              e.isReactWarning)
                          ? s.props.ref
                          : s.props.ref || s.ref),
                    l = (function (e, t) {
                      let r = { ...t };
                      for (let n in t) {
                        let o = e[n],
                          i = t[n];
                        /^on[A-Z]/.test(n)
                          ? o && i
                            ? (r[n] = (...e) => {
                                let t = i(...e);
                                return o(...e), t;
                              })
                            : o && (r[n] = o)
                          : "style" === n
                            ? (r[n] = { ...o, ...i })
                            : "className" === n &&
                              (r[n] = [o, i].filter(Boolean).join(" "));
                      }
                      return { ...e, ...r };
                    })(i, r.props);
                  return (
                    r.type !== n.Fragment && (l.ref = t ? (0, o.t)(t, d) : d),
                    n.cloneElement(r, l)
                  );
                }
                return n.Children.count(r) > 1 ? n.Children.only(null) : null;
              });
              return (t.displayName = `${e}.SlotClone`), t;
            })(e),
            r = n.forwardRef((e, r) => {
              let { children: o, ...s } = e,
                a = n.Children.toArray(o),
                l = a.find(d);
              if (l) {
                let e = l.props.children,
                  o = a.map((t) =>
                    t !== l
                      ? t
                      : n.Children.count(e) > 1
                        ? n.Children.only(null)
                        : n.isValidElement(e)
                          ? e.props.children
                          : null,
                  );
                return (0, i.jsx)(t, {
                  ...s,
                  ref: r,
                  children: n.isValidElement(e)
                    ? n.cloneElement(e, void 0, o)
                    : null,
                });
              }
              return (0, i.jsx)(t, { ...s, ref: r, children: o });
            });
          return (r.displayName = `${e}.Slot`), r;
        }
        var a = Symbol("radix.slottable");
        function d(e) {
          return (
            n.isValidElement(e) &&
            "function" == typeof e.type &&
            "__radixId" in e.type &&
            e.type.__radixId === a
          );
        }
      },
      65278: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            getRedirectError: function () {
              return s;
            },
            getRedirectStatusCodeFromError: function () {
              return u;
            },
            getRedirectTypeFromError: function () {
              return c;
            },
            getURLFromRedirectError: function () {
              return l;
            },
            permanentRedirect: function () {
              return d;
            },
            redirect: function () {
              return a;
            },
          });
        let n = r(20835),
          o = r(21293),
          i = r(19121).actionAsyncStorage;
        function s(e, t, r) {
          void 0 === r && (r = n.RedirectStatusCode.TemporaryRedirect);
          let i = Object.defineProperty(
            Error(o.REDIRECT_ERROR_CODE),
            "__NEXT_ERROR_CODE",
            { value: "E394", enumerable: !1, configurable: !0 },
          );
          return (
            (i.digest =
              o.REDIRECT_ERROR_CODE + ";" + t + ";" + e + ";" + r + ";"),
            i
          );
        }
        function a(e, t) {
          var r;
          throw (
            (null != t ||
              (t = (
                null == i || null == (r = i.getStore()) ? void 0 : r.isAction
              )
                ? o.RedirectType.push
                : o.RedirectType.replace),
            s(e, t, n.RedirectStatusCode.TemporaryRedirect))
          );
        }
        function d(e, t) {
          throw (
            (void 0 === t && (t = o.RedirectType.replace),
            s(e, t, n.RedirectStatusCode.PermanentRedirect))
          );
        }
        function l(e) {
          return (0, o.isRedirectError)(e)
            ? e.digest.split(";").slice(2, -2).join(";")
            : null;
        }
        function c(e) {
          if (!(0, o.isRedirectError)(e))
            throw Object.defineProperty(
              Error("Not a redirect error"),
              "__NEXT_ERROR_CODE",
              { value: "E260", enumerable: !1, configurable: !0 },
            );
          return e.digest.split(";", 2)[1];
        }
        function u(e) {
          if (!(0, o.isRedirectError)(e))
            throw Object.defineProperty(
              Error("Not a redirect error"),
              "__NEXT_ERROR_CODE",
              { value: "E260", enumerable: !1, configurable: !0 },
            );
          return Number(e.digest.split(";").at(-2));
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      66130: (e, t, r) => {
        "use strict";
        r.d(t, { N: () => o });
        var n = r(84205),
          o = globalThis?.document ? n.useLayoutEffect : () => {};
      },
      71604: (e, t, r) => {
        "use strict";
        r.d(t, { s: () => s, t: () => i });
        var n = r(84205);
        function o(e, t) {
          if ("function" == typeof e) return e(t);
          null != e && (e.current = t);
        }
        function i(...e) {
          return (t) => {
            let r = !1,
              n = e.map((e) => {
                let n = o(e, t);
                return r || "function" != typeof n || (r = !0), n;
              });
            if (r)
              return () => {
                for (let t = 0; t < n.length; t++) {
                  let r = n[t];
                  "function" == typeof r ? r() : o(e[t], null);
                }
              };
          };
        }
        function s(...e) {
          return n.useCallback(i(...e), e);
        }
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      73927: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, { "4055c9f9dce3c849928e65e87017b3609674121d00": () => n.M });
        var n = r(29997);
      },
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
      },
      74614: (e, t, r) => {
        "use strict";
        let n;
        r.r(t),
          r.d(t, {
            default: () => g,
            experimental_ppr: () => f,
            generateImageMetadata: () => y,
            generateMetadata: () => v,
            generateViewport: () => x,
            metadata: () => p,
          });
        var o = r(63033),
          i = r(35242),
          s = r(15058),
          a = r(42057),
          d = r(16714),
          l = r(98699),
          c = r(14795),
          u = r(60442);
        let p = {
            title: "Unified Chat - Hijraah",
            description: "Chat with our AI assistant to get immigration help",
          },
          f = !0;
        async function b({ children: e }) {
          let [t, r] = await Promise.all([(0, c.j2)(), (0, s.UL)()]),
            n = r.get("sidebar:state")?.value !== "true";
          return (0, i.jsxs)(i.Fragment, {
            children: [
              (0, i.jsx)(a.default, {
                src: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js",
                strategy: "beforeInteractive",
              }),
              (0, i.jsxs)(l.SidebarProvider, {
                defaultOpen: !n,
                children: [
                  (0, i.jsx)(d.AppSidebar, {}),
                  (0, i.jsx)(l.SidebarInset, { children: e }),
                ],
              }),
            ],
          });
        }
        let h = { ...o },
          m =
            "workUnitAsyncStorage" in h
              ? h.workUnitAsyncStorage
              : "requestAsyncStorage" in h
                ? h.requestAsyncStorage
                : void 0;
        n = new Proxy(b, {
          apply: (e, t, r) => {
            let n, o, i;
            try {
              let e = m?.getStore();
              (n = e?.headers.get("sentry-trace") ?? void 0),
                (o = e?.headers.get("baggage") ?? void 0),
                (i = e?.headers);
            } catch (e) {}
            return u
              .wrapServerComponentWithSentry(e, {
                componentRoute: "/(ai-unified)/chat",
                componentType: "Layout",
                sentryTraceHeader: n,
                baggageHeader: o,
                headers: i,
              })
              .apply(t, r);
          },
        });
        let v = void 0,
          y = void 0,
          x = void 0,
          g = n;
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
      78593: (e, t, r) => {
        "use strict";
        r.d(t, { hO: () => d, sG: () => a });
        var n = r(84205),
          o = r(90304),
          i = r(63961),
          s = r(61268),
          a = [
            "a",
            "button",
            "div",
            "form",
            "h2",
            "h3",
            "img",
            "input",
            "label",
            "li",
            "nav",
            "ol",
            "p",
            "select",
            "span",
            "svg",
            "ul",
          ].reduce((e, t) => {
            let r = (0, i.TL)(`Primitive.${t}`),
              o = n.forwardRef((e, n) => {
                let { asChild: o, ...i } = e;
                return (
                  "undefined" != typeof window &&
                    (window[Symbol.for("radix-ui")] = !0),
                  (0, s.jsx)(o ? r : t, { ...i, ref: n })
                );
              });
            return (o.displayName = `Primitive.${t}`), { ...e, [t]: o };
          }, {});
        function d(e, t) {
          e && o.flushSync(() => e.dispatchEvent(t));
        }
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
              return i;
            },
          });
        let r = {
            acceptCharset: "accept-charset",
            className: "class",
            htmlFor: "for",
            httpEquiv: "http-equiv",
            noModule: "noModule",
          },
          n = [
            "onLoad",
            "onReady",
            "dangerouslySetInnerHTML",
            "children",
            "onError",
            "strategy",
            "stylesheets",
          ];
        function o(e) {
          return ["async", "defer", "noModule"].includes(e);
        }
        function i(e, t) {
          for (let [i, s] of Object.entries(t)) {
            if (!t.hasOwnProperty(i) || n.includes(i) || void 0 === s) continue;
            let a = r[i] || i.toLowerCase();
            "SCRIPT" === e.tagName && o(a)
              ? (e[a] = !!s)
              : e.setAttribute(a, String(s)),
              (!1 === s ||
                ("SCRIPT" === e.tagName && o(a) && (!s || "false" === s))) &&
                (e.setAttribute(a, ""), e.removeAttribute(a));
          }
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      89663: (e, t, r) => {
        "use strict";
        let n;
        r.r(t),
          r.d(t, {
            default: () => x,
            experimental_ppr: () => p,
            generateImageMetadata: () => v,
            generateMetadata: () => m,
            generateViewport: () => y,
          });
        var o = r(63033),
          i = r(35242),
          s = r(15058),
          a = r(42057),
          d = r(16714),
          l = r(98699),
          c = r(14795),
          u = r(60442);
        let p = !0;
        async function f({ children: e }) {
          let [t, r] = await Promise.all([(0, c.j2)(), (0, s.UL)()]),
            n = r.get("sidebar:state")?.value !== "true";
          return (0, i.jsxs)(i.Fragment, {
            children: [
              (0, i.jsx)(a.default, {
                src: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js",
                strategy: "beforeInteractive",
              }),
              (0, i.jsxs)(l.SidebarProvider, {
                defaultOpen: !n,
                children: [
                  (0, i.jsx)(d.AppSidebar, {}),
                  (0, i.jsx)(l.SidebarInset, { children: e }),
                ],
              }),
            ],
          });
        }
        let b = { ...o },
          h =
            "workUnitAsyncStorage" in b
              ? b.workUnitAsyncStorage
              : "requestAsyncStorage" in b
                ? b.requestAsyncStorage
                : void 0;
        n = new Proxy(f, {
          apply: (e, t, r) => {
            let n, o, i;
            try {
              let e = h?.getStore();
              (n = e?.headers.get("sentry-trace") ?? void 0),
                (o = e?.headers.get("baggage") ?? void 0),
                (i = e?.headers);
            } catch (e) {}
            return u
              .wrapServerComponentWithSentry(e, {
                componentRoute: "/(ai-unified)",
                componentType: "Layout",
                sentryTraceHeader: n,
                baggageHeader: o,
                headers: i,
              })
              .apply(t, r);
          },
        });
        let m = void 0,
          v = void 0,
          y = void 0,
          x = n;
      },
      90286: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        let n = (0, r(95255).A)("ArrowLeft", [
          ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
          ["path", { d: "M19 12H5", key: "x3x0zl" }],
        ]);
      },
      90645: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            ReadonlyURLSearchParams: function () {
              return c;
            },
            RedirectType: function () {
              return o.RedirectType;
            },
            forbidden: function () {
              return s.forbidden;
            },
            notFound: function () {
              return i.notFound;
            },
            permanentRedirect: function () {
              return n.permanentRedirect;
            },
            redirect: function () {
              return n.redirect;
            },
            unauthorized: function () {
              return a.unauthorized;
            },
            unstable_rethrow: function () {
              return d.unstable_rethrow;
            },
          });
        let n = r(65278),
          o = r(21293),
          i = r(11316),
          s = r(14749),
          a = r(52480),
          d = r(42600);
        class l extends Error {
          constructor() {
            super(
              "Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams",
            );
          }
        }
        class c extends URLSearchParams {
          append() {
            throw new l();
          }
          delete() {
            throw new l();
          }
          set() {
            throw new l();
          }
          sort() {
            throw new l();
          }
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      98699: (e, t, r) => {
        "use strict";
        r.d(t, {
          SidebarInset: () => o,
          SidebarProvider: () => i,
          SidebarTrigger: () => s,
        });
        var n = r(26394);
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call Sidebar() from the server but Sidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "Sidebar",
        ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarContent() from the server but SidebarContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarContent",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarFooter() from the server but SidebarFooter is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarFooter",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroup() from the server but SidebarGroup is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroup",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroupAction() from the server but SidebarGroupAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroupAction",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroupContent() from the server but SidebarGroupContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroupContent",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarGroupLabel() from the server but SidebarGroupLabel is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarGroupLabel",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarHeader() from the server but SidebarHeader is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarHeader",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarInput() from the server but SidebarInput is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarInput",
          );
        let o = (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarInset() from the server but SidebarInset is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarInset",
        );
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarMenu() from the server but SidebarMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarMenu",
        ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuAction() from the server but SidebarMenuAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuAction",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuBadge() from the server but SidebarMenuBadge is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuBadge",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuButton() from the server but SidebarMenuButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuButton",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuItem() from the server but SidebarMenuItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuItem",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSkeleton() from the server but SidebarMenuSkeleton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSkeleton",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSub() from the server but SidebarMenuSub is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSub",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSubButton() from the server but SidebarMenuSubButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSubButton",
          ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarMenuSubItem() from the server but SidebarMenuSubItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarMenuSubItem",
          );
        let i = (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarProvider() from the server but SidebarProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarProvider",
        );
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarRail() from the server but SidebarRail is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarRail",
        ),
          (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call SidebarSeparator() from the server but SidebarSeparator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
            "SidebarSeparator",
          );
        let s = (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarTrigger() from the server but SidebarTrigger is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarTrigger",
        );
        (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call useSidebar() from the server but useSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "useSidebar",
        );
      },
      99966: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            default: function () {
              return y;
            },
            handleClientScriptLoad: function () {
              return h;
            },
            initScriptLoader: function () {
              return m;
            },
          });
        let n = r(17380),
          o = r(88835),
          i = r(61268),
          s = n._(r(90304)),
          a = o._(r(84205)),
          d = r(3954),
          l = r(86327),
          c = r(1523),
          u = new Map(),
          p = new Set(),
          f = (e) => {
            if (s.default.preinit)
              return void e.forEach((e) => {
                s.default.preinit(e, { as: "style" });
              });
          },
          b = (e) => {
            let {
                src: t,
                id: r,
                onLoad: n = () => {},
                onReady: o = null,
                dangerouslySetInnerHTML: i,
                children: s = "",
                strategy: a = "afterInteractive",
                onError: d,
                stylesheets: c,
              } = e,
              b = r || t;
            if (b && p.has(b)) return;
            if (u.has(t)) {
              p.add(b), u.get(t).then(n, d);
              return;
            }
            let h = () => {
                o && o(), p.add(b);
              },
              m = document.createElement("script"),
              v = new Promise((e, t) => {
                m.addEventListener("load", function (t) {
                  e(), n && n.call(this, t), h();
                }),
                  m.addEventListener("error", function (e) {
                    t(e);
                  });
              }).catch(function (e) {
                d && d(e);
              });
            i
              ? ((m.innerHTML = i.__html || ""), h())
              : s
                ? ((m.textContent =
                    "string" == typeof s
                      ? s
                      : Array.isArray(s)
                        ? s.join("")
                        : ""),
                  h())
                : t && ((m.src = t), u.set(t, v)),
              (0, l.setAttributesFromProps)(m, e),
              "worker" === a && m.setAttribute("type", "text/partytown"),
              m.setAttribute("data-nscript", a),
              c && f(c),
              document.body.appendChild(m);
          };
        function h(e) {
          let { strategy: t = "afterInteractive" } = e;
          "lazyOnload" === t
            ? window.addEventListener("load", () => {
                (0, c.requestIdleCallback)(() => b(e));
              })
            : b(e);
        }
        function m(e) {
          e.forEach(h),
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
        function v(e) {
          let {
              id: t,
              src: r = "",
              onLoad: n = () => {},
              onReady: o = null,
              strategy: l = "afterInteractive",
              onError: u,
              stylesheets: f,
              ...h
            } = e,
            {
              updateScripts: m,
              scripts: v,
              getIsSsr: y,
              appDir: x,
              nonce: g,
            } = (0, a.useContext)(d.HeadManagerContext),
            w = (0, a.useRef)(!1);
          (0, a.useEffect)(() => {
            let e = t || r;
            w.current || (o && e && p.has(e) && o(), (w.current = !0));
          }, [o, t, r]);
          let C = (0, a.useRef)(!1);
          if (
            ((0, a.useEffect)(() => {
              if (!C.current) {
                if ("afterInteractive" === l) b(e);
                else
                  "lazyOnload" === l &&
                    ("complete" === document.readyState
                      ? (0, c.requestIdleCallback)(() => b(e))
                      : window.addEventListener("load", () => {
                          (0, c.requestIdleCallback)(() => b(e));
                        }));
                C.current = !0;
              }
            }, [e, l]),
            ("beforeInteractive" === l || "worker" === l) &&
              (m
                ? ((v[l] = (v[l] || []).concat([
                    { id: t, src: r, onLoad: n, onReady: o, onError: u, ...h },
                  ])),
                  m(v))
                : y && y()
                  ? p.add(t || r)
                  : y && !y() && b(e)),
            x)
          ) {
            if (
              (f &&
                f.forEach((e) => {
                  s.default.preinit(e, { as: "style" });
                }),
              "beforeInteractive" === l)
            )
              if (!r)
                return (
                  h.dangerouslySetInnerHTML &&
                    ((h.children = h.dangerouslySetInnerHTML.__html),
                    delete h.dangerouslySetInnerHTML),
                  (0, i.jsx)("script", {
                    nonce: g,
                    dangerouslySetInnerHTML: {
                      __html:
                        "(self.__next_s=self.__next_s||[]).push(" +
                        JSON.stringify([0, { ...h, id: t }]) +
                        ")",
                    },
                  })
                );
              else
                return (
                  s.default.preload(
                    r,
                    h.integrity
                      ? {
                          as: "script",
                          integrity: h.integrity,
                          nonce: g,
                          crossOrigin: h.crossOrigin,
                        }
                      : { as: "script", nonce: g, crossOrigin: h.crossOrigin },
                  ),
                  (0, i.jsx)("script", {
                    nonce: g,
                    dangerouslySetInnerHTML: {
                      __html:
                        "(self.__next_s=self.__next_s||[]).push(" +
                        JSON.stringify([r, { ...h, id: t }]) +
                        ")",
                    },
                  })
                );
            "afterInteractive" === l &&
              r &&
              s.default.preload(
                r,
                h.integrity
                  ? {
                      as: "script",
                      integrity: h.integrity,
                      nonce: g,
                      crossOrigin: h.crossOrigin,
                    }
                  : { as: "script", nonce: g, crossOrigin: h.crossOrigin },
              );
          }
          return null;
        }
        Object.defineProperty(v, "__nextScript", { value: !0 });
        let y = v;
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
    n = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 1655, 5728, 9729, 3390, 7719,
        6188, 7911, 7401, 5124, 7272, 3042, 385, 8119, 4763, 5058, 131, 2028,
        4630, 8264, 27, 4232,
      ],
      () => r(61284),
    );
  module.exports = n;
})();
//# sourceMappingURL=page.js.map
