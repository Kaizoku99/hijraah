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
    (e._sentryDebugIds[t] = "66c33380-b667-4609-a4ca-84e42913f7a2"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-66c33380-b667-4609-a4ca-84e42913f7a2"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 7943),
    (e.ids = [7943]),
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
      6934: () => {},
      7704: (e, t, r) => {
        "use strict";
        let n;
        r.r(t),
          r.d(t, {
            default: () => f,
            generateImageMetadata: () => c,
            generateMetadata: () => u,
            generateViewport: () => p,
          });
        var o = r(63033),
          i = r(26394),
          s = r(60442),
          a = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(ai-unified)\\\\chat\\\\new\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\new\\page.tsx",
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
                      componentRoute: "/(ai-unified)/chat/new",
                      componentType: "Page",
                      sentryTraceHeader: n,
                      baggageHeader: o,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : a;
        let u = void 0,
          c = void 0,
          p = void 0,
          f = n;
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
      16760: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => u,
            pages: () => l,
            routeModule: () => c,
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
                          "new",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () => Promise.resolve().then(r.bind(r, 7704)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\new\\page.tsx",
                                ],
                              },
                            ],
                          },
                          {
                            layout: [
                              () => Promise.resolve().then(r.bind(r, 48867)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\new\\layout.tsx",
                            ],
                          },
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(ai-unified)\\chat\\new\\page.tsx",
          ],
          u = { require: r, loadChunk: () => Promise.resolve() },
          c = new n.AppPageRouteModule({
            definition: {
              kind: o.RouteKind.APP_PAGE,
              page: "/(ai-unified)/chat/new/page",
              pathname: "/chat/new",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
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
                    u = n.useMemo(() => d, Object.values(d));
                  return (0, o.jsx)(l.Provider, { value: u, children: i });
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
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34132: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 68274));
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
      43886: () => {},
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      48867: (e, t, r) => {
        "use strict";
        let n;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => u,
            generateMetadata: () => l,
            generateViewport: () => c,
            metadata: () => s,
          });
        var o = r(63033),
          i = r(60442);
        let s = {
            title: "New Unified Chat - Hijraah",
            description: "Start a new unified AI chat conversation",
          },
          a = { ...o },
          d =
            "workUnitAsyncStorage" in a
              ? a.workUnitAsyncStorage
              : "requestAsyncStorage" in a
                ? a.requestAsyncStorage
                : void 0;
        n = new Proxy(
          function ({ children: e }) {
            return e;
          },
          {
            apply: (e, t, r) => {
              let n, o, s;
              try {
                let e = d?.getStore();
                (n = e?.headers.get("sentry-trace") ?? void 0),
                  (o = e?.headers.get("baggage") ?? void 0),
                  (s = e?.headers);
              } catch (e) {}
              return i
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/(ai-unified)/chat/new",
                  componentType: "Layout",
                  sentryTraceHeader: n,
                  baggageHeader: o,
                  headers: s,
                })
                .apply(t, r);
            },
          },
        );
        let l = void 0,
          u = void 0,
          c = void 0,
          p = n;
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
      58100: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 7704));
      },
      58281: (e, t, r) => {
        "use strict";
        r.d(t, { c: () => n });
        var n = (function (e) {
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
              return c;
            },
            getRedirectTypeFromError: function () {
              return u;
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
        function u(e) {
          if (!(0, o.isRedirectError)(e))
            throw Object.defineProperty(
              Error("Not a redirect error"),
              "__NEXT_ERROR_CODE",
              { value: "E260", enumerable: !1, configurable: !0 },
            );
          return e.digest.split(";", 2)[1];
        }
        function c(e) {
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
      68274: (e, t, r) => {
        "use strict";
        r.a(e, async (e, n) => {
          try {
            r.r(t), r.d(t, { default: () => u });
            var o = r(61268),
              i = r(89882);
            r(84205);
            var s = r(51005);
            r(58281);
            var a = r(3519),
              d = r(94812),
              l = e([d]);
            function u() {
              (0, i.useRouter)();
              let e = (0, a.useUser)(),
                { createChat: t, isLoading: r } = (0, s.Y)();
              return null == e || r
                ? (0, o.jsxs)("div", {
                    className:
                      "flex flex-col items-center justify-center min-h-[60vh] p-4",
                    children: [
                      (0, o.jsx)(d.E, { className: "h-8 w-64 mb-4" }),
                      (0, o.jsx)(d.E, {
                        className: "h-32 w-full max-w-2xl mb-4",
                      }),
                      (0, o.jsx)(d.E, { className: "h-32 w-full max-w-2xl" }),
                    ],
                  })
                : e
                  ? (0, o.jsx)("div", {
                      className:
                        "flex items-center justify-center min-h-[60vh]",
                      children: (0, o.jsxs)("div", {
                        className: "flex flex-col items-center",
                        children: [
                          (0, o.jsx)("h1", {
                            className: "text-2xl font-bold mb-4",
                            children: "Creating your new chat...",
                          }),
                          (0, o.jsx)("p", {
                            className: "text-muted-foreground",
                            children: "Please wait while we set things up.",
                          }),
                        ],
                      }),
                    })
                  : (0, o.jsxs)("div", {
                      className:
                        "flex flex-col items-center justify-center min-h-[60vh] p-4",
                      children: [
                        (0, o.jsx)("h1", {
                          className: "text-2xl font-bold mb-4",
                          children: "Sign in required",
                        }),
                        (0, o.jsx)("p", {
                          className: "text-muted-foreground mb-4",
                          children:
                            "You need to be signed in to create a new chat.",
                        }),
                      ],
                    });
            }
            (d = (l.then ? (await l)() : l)[0]), n();
          } catch (e) {
            n(e);
          }
        });
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
            default: () => w,
            experimental_ppr: () => f,
            generateImageMetadata: () => y,
            generateMetadata: () => v,
            generateViewport: () => g,
            metadata: () => p,
          });
        var o = r(63033),
          i = r(35242),
          s = r(15058),
          a = r(42057),
          d = r(16714),
          l = r(98699),
          u = r(14795),
          c = r(60442);
        let p = {
            title: "Unified Chat - Hijraah",
            description: "Chat with our AI assistant to get immigration help",
          },
          f = !0;
        async function b({ children: e }) {
          let [t, r] = await Promise.all([(0, u.j2)(), (0, s.UL)()]),
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
        let m = { ...o },
          h =
            "workUnitAsyncStorage" in m
              ? m.workUnitAsyncStorage
              : "requestAsyncStorage" in m
                ? m.requestAsyncStorage
                : void 0;
        n = new Proxy(b, {
          apply: (e, t, r) => {
            let n, o, i;
            try {
              let e = h?.getStore();
              (n = e?.headers.get("sentry-trace") ?? void 0),
                (o = e?.headers.get("baggage") ?? void 0),
                (i = e?.headers);
            } catch (e) {}
            return c
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
          g = void 0,
          w = n;
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
            default: () => g,
            experimental_ppr: () => p,
            generateImageMetadata: () => v,
            generateMetadata: () => h,
            generateViewport: () => y,
          });
        var o = r(63033),
          i = r(35242),
          s = r(15058),
          a = r(42057),
          d = r(16714),
          l = r(98699),
          u = r(14795),
          c = r(60442);
        let p = !0;
        async function f({ children: e }) {
          let [t, r] = await Promise.all([(0, u.j2)(), (0, s.UL)()]),
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
          m =
            "workUnitAsyncStorage" in b
              ? b.workUnitAsyncStorage
              : "requestAsyncStorage" in b
                ? b.requestAsyncStorage
                : void 0;
        n = new Proxy(f, {
          apply: (e, t, r) => {
            let n, o, i;
            try {
              let e = m?.getStore();
              (n = e?.headers.get("sentry-trace") ?? void 0),
                (o = e?.headers.get("baggage") ?? void 0),
                (i = e?.headers);
            } catch (e) {}
            return c
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
        let h = void 0,
          v = void 0,
          y = void 0,
          g = n;
      },
      90645: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          !(function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            ReadonlyURLSearchParams: function () {
              return u;
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
        class u extends URLSearchParams {
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
              return m;
            },
            initScriptLoader: function () {
              return h;
            },
          });
        let n = r(17380),
          o = r(88835),
          i = r(61268),
          s = n._(r(90304)),
          a = o._(r(84205)),
          d = r(3954),
          l = r(86327),
          u = r(1523),
          c = new Map(),
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
                stylesheets: u,
              } = e,
              b = r || t;
            if (b && p.has(b)) return;
            if (c.has(t)) {
              p.add(b), c.get(t).then(n, d);
              return;
            }
            let m = () => {
                o && o(), p.add(b);
              },
              h = document.createElement("script"),
              v = new Promise((e, t) => {
                h.addEventListener("load", function (t) {
                  e(), n && n.call(this, t), m();
                }),
                  h.addEventListener("error", function (e) {
                    t(e);
                  });
              }).catch(function (e) {
                d && d(e);
              });
            i
              ? ((h.innerHTML = i.__html || ""), m())
              : s
                ? ((h.textContent =
                    "string" == typeof s
                      ? s
                      : Array.isArray(s)
                        ? s.join("")
                        : ""),
                  m())
                : t && ((h.src = t), c.set(t, v)),
              (0, l.setAttributesFromProps)(h, e),
              "worker" === a && h.setAttribute("type", "text/partytown"),
              h.setAttribute("data-nscript", a),
              u && f(u),
              document.body.appendChild(h);
          };
        function m(e) {
          let { strategy: t = "afterInteractive" } = e;
          "lazyOnload" === t
            ? window.addEventListener("load", () => {
                (0, u.requestIdleCallback)(() => b(e));
              })
            : b(e);
        }
        function h(e) {
          e.forEach(m),
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
              onError: c,
              stylesheets: f,
              ...m
            } = e,
            {
              updateScripts: h,
              scripts: v,
              getIsSsr: y,
              appDir: g,
              nonce: w,
            } = (0, a.useContext)(d.HeadManagerContext),
            x = (0, a.useRef)(!1);
          (0, a.useEffect)(() => {
            let e = t || r;
            x.current || (o && e && p.has(e) && o(), (x.current = !0));
          }, [o, t, r]);
          let _ = (0, a.useRef)(!1);
          if (
            ((0, a.useEffect)(() => {
              if (!_.current) {
                if ("afterInteractive" === l) b(e);
                else
                  "lazyOnload" === l &&
                    ("complete" === document.readyState
                      ? (0, u.requestIdleCallback)(() => b(e))
                      : window.addEventListener("load", () => {
                          (0, u.requestIdleCallback)(() => b(e));
                        }));
                _.current = !0;
              }
            }, [e, l]),
            ("beforeInteractive" === l || "worker" === l) &&
              (h
                ? ((v[l] = (v[l] || []).concat([
                    { id: t, src: r, onLoad: n, onReady: o, onError: c, ...m },
                  ])),
                  h(v))
                : y && y()
                  ? p.add(t || r)
                  : y && !y() && b(e)),
            g)
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
                  m.dangerouslySetInnerHTML &&
                    ((m.children = m.dangerouslySetInnerHTML.__html),
                    delete m.dangerouslySetInnerHTML),
                  (0, i.jsx)("script", {
                    nonce: w,
                    dangerouslySetInnerHTML: {
                      __html:
                        "(self.__next_s=self.__next_s||[]).push(" +
                        JSON.stringify([0, { ...m, id: t }]) +
                        ")",
                    },
                  })
                );
              else
                return (
                  s.default.preload(
                    r,
                    m.integrity
                      ? {
                          as: "script",
                          integrity: m.integrity,
                          nonce: w,
                          crossOrigin: m.crossOrigin,
                        }
                      : { as: "script", nonce: w, crossOrigin: m.crossOrigin },
                  ),
                  (0, i.jsx)("script", {
                    nonce: w,
                    dangerouslySetInnerHTML: {
                      __html:
                        "(self.__next_s=self.__next_s||[]).push(" +
                        JSON.stringify([r, { ...m, id: t }]) +
                        ")",
                    },
                  })
                );
            "afterInteractive" === l &&
              r &&
              s.default.preload(
                r,
                m.integrity
                  ? {
                      as: "script",
                      integrity: m.integrity,
                      nonce: w,
                      crossOrigin: m.crossOrigin,
                    }
                  : { as: "script", nonce: w, crossOrigin: m.crossOrigin },
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
        827, 6518, 2033, 4027, 2872, 7713, 5149, 1655, 9729, 3390, 7719, 6188,
        7911, 7401, 5124, 3042, 385, 8119, 5058, 131, 2028, 4630, 8264, 27,
        4232,
      ],
      () => r(16760),
    );
  module.exports = n;
})();
//# sourceMappingURL=page.js.map
