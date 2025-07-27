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
    (e._sentryDebugIds[r] = "27cfa4dc-fddf-4d0d-afc7-5554529ebe88"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-27cfa4dc-fddf-4d0d-afc7-5554529ebe88"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 1791),
    (e.ids = [1791]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      5451: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              BT: () => u,
              Wu: () => h,
              ZB: () => p,
              Zp: () => l,
              aR: () => c,
              wL: () => x,
            });
            var i = t(61268),
              a = t(55728),
              o = t(84205),
              n = t(15942),
              d = e([n]);
            n = (d.then ? (await d)() : d)[0];
            let l = o.forwardRef(({ className: e, ...r }, t) =>
              (0, i.jsx)(a.P.div, {
                ref: t,
                className: (0, n.cn)(
                  "rounded-lg border bg-card text-card-foreground shadow-sm",
                  e,
                ),
                whileHover: {
                  scale: 1.03,
                  boxShadow:
                    "0px 7px 25px rgba(0,0,0,0.08), 0px 3px 10px rgba(0,0,0,0.04)",
                },
                transition: { type: "spring", stiffness: 300, damping: 20 },
                ...r,
              }),
            );
            l.displayName = "Card";
            let c = o.forwardRef(({ className: e, ...r }, t) =>
              (0, i.jsx)("div", {
                ref: t,
                className: (0, n.cn)("flex flex-col space-y-1.5 p-6", e),
                ...r,
              }),
            );
            c.displayName = "CardHeader";
            let p = o.forwardRef(({ className: e, ...r }, t) =>
              (0, i.jsx)("h3", {
                ref: t,
                className: (0, n.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...r,
              }),
            );
            p.displayName = "CardTitle";
            let u = o.forwardRef(({ className: e, ...r }, t) =>
              (0, i.jsx)("p", {
                ref: t,
                className: (0, n.cn)("text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            u.displayName = "CardDescription";
            let h = o.forwardRef(({ className: e, ...r }, t) =>
              (0, i.jsx)("div", {
                ref: t,
                className: (0, n.cn)("p-6 pt-0", e),
                ...r,
              }),
            );
            h.displayName = "CardContent";
            let x = o.forwardRef(({ className: e, ...r }, t) =>
              (0, i.jsx)("div", {
                ref: t,
                className: (0, n.cn)("flex items-center p-6 pt-0", e),
                ...r,
              }),
            );
            (x.displayName = "CardFooter"), s();
          } catch (e) {
            s(e);
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
      21973: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r), t.d(r, { default: () => u });
            var i = t(61268),
              a = t(92206),
              o = t(31655),
              n = t.n(o),
              d = t(11603),
              l = t(28909),
              c = t(5451),
              p = e([d, l, c]);
            function u() {
              return (0, i.jsxs)("div", {
                className: "container max-w-4xl py-8",
                children: [
                  (0, i.jsx)("h1", {
                    className: "text-3xl font-bold mb-6",
                    children: "Help Center",
                  }),
                  (0, i.jsxs)("div", {
                    className: "grid gap-6",
                    children: [
                      (0, i.jsxs)(c.Zp, {
                        className: "p-6",
                        children: [
                          (0, i.jsx)("h2", {
                            className: "text-xl font-semibold mb-4",
                            children: "Need Immediate Assistance?",
                          }),
                          (0, i.jsx)("p", {
                            className: "text-muted-foreground mb-4",
                            children:
                              "Our AI assistant is available 24/7 to help answer your questions.",
                          }),
                          (0, i.jsx)(l.$, {
                            asChild: !0,
                            children: (0, i.jsx)(n(), {
                              href: "/chat",
                              legacyBehavior: !0,
                              children: (0, i.jsxs)("a", {
                                children: [
                                  (0, i.jsx)(a.A, {
                                    className: "mr-2 h-4 w-4",
                                  }),
                                  "Start Chat",
                                ],
                              }),
                            }),
                          }),
                        ],
                      }),
                      (0, i.jsxs)("div", {
                        children: [
                          (0, i.jsx)("h2", {
                            className: "text-xl font-semibold mb-4",
                            children: "Frequently Asked Questions",
                          }),
                          (0, i.jsxs)(d.nD, {
                            type: "single",
                            collapsible: !0,
                            className: "w-full",
                            children: [
                              (0, i.jsxs)(d.As, {
                                value: "what-is",
                                children: [
                                  (0, i.jsx)(d.$m, {
                                    children: "What is Hijraah?",
                                  }),
                                  (0, i.jsx)(d.ub, {
                                    children:
                                      "Hijraah is an AI-powered immigration assistant that helps you navigate the complex immigration process. We provide personalized guidance, document assistance, and real-time support for your immigration journey.",
                                  }),
                                ],
                              }),
                              (0, i.jsxs)(d.As, {
                                value: "how-works",
                                children: [
                                  (0, i.jsx)(d.$m, {
                                    children: "How does it work?",
                                  }),
                                  (0, i.jsx)(d.ub, {
                                    children:
                                      "Our AI analyzes your specific situation and provides tailored guidance based on current immigration laws and regulations. You can chat with our AI assistant, get document reviews, and receive step-by-step guidance throughout your immigration process.",
                                  }),
                                ],
                              }),
                              (0, i.jsxs)(d.As, {
                                value: "features",
                                children: [
                                  (0, i.jsx)(d.$m, {
                                    children: "What features are available?",
                                  }),
                                  (0, i.jsx)(d.ub, {
                                    children: (0, i.jsxs)("ul", {
                                      className: "list-disc pl-4 space-y-2",
                                      children: [
                                        (0, i.jsx)("li", {
                                          children: "24/7 AI Chat Support",
                                        }),
                                        (0, i.jsx)("li", {
                                          children:
                                            "Document Review and Analysis",
                                        }),
                                        (0, i.jsx)("li", {
                                          children: "Eligibility Assessment",
                                        }),
                                        (0, i.jsx)("li", {
                                          children:
                                            "Step-by-Step Immigration Guidance",
                                        }),
                                        (0, i.jsx)("li", {
                                          children:
                                            "Real-time Updates and Notifications",
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                              (0, i.jsxs)(d.As, {
                                value: "support",
                                children: [
                                  (0, i.jsx)(d.$m, {
                                    children: "How can I get support?",
                                  }),
                                  (0, i.jsxs)(d.ub, {
                                    children: [
                                      "You can get support through multiple channels:",
                                      (0, i.jsxs)("ul", {
                                        className:
                                          "list-disc pl-4 space-y-2 mt-2",
                                        children: [
                                          (0, i.jsx)("li", {
                                            children:
                                              "Chat with our AI assistant 24/7",
                                          }),
                                          (0, i.jsx)("li", {
                                            children:
                                              "Email support at support@hijraah.com",
                                          }),
                                          (0, i.jsx)("li", {
                                            children:
                                              "Check our documentation for detailed guides",
                                          }),
                                          (0, i.jsx)("li", {
                                            children:
                                              "Join our community forum",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
            }
            ([d, l, c] = p.then ? (await p)() : p), s();
          } catch (e) {
            s(e);
          }
        });
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29071: (e, r, t) => {
        "use strict";
        let s;
        t.r(r),
          t.d(r, {
            default: () => h,
            generateImageMetadata: () => p,
            generateMetadata: () => c,
            generateViewport: () => u,
          });
        var i = t(63033),
          a = t(26394),
          o = t(60442),
          n = (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(marketing)\\\\help\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\help\\page.tsx",
            "default",
          );
        let d = { ...i },
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
                  let s, i, a;
                  try {
                    let e = l?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (i = e?.headers.get("baggage") ?? void 0),
                      (a = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(marketing)/help",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: i,
                      headers: a,
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
      42414: (e, r, t) => {
        "use strict";
        t.d(r, { B: () => d });
        var s,
          i = t(84205),
          a = t(66130),
          o =
            (s || (s = t.t(i, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          n = 0;
        function d(e) {
          let [r, t] = i.useState(o());
          return (
            (0, a.N)(() => {
              e || t((e) => e ?? String(n++));
            }, [e]),
            e || (r ? `radix-${r}` : "")
          );
        }
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      64686: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 21973));
      },
      64908: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => a.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => p,
            tree: () => d,
          });
        var s = t(11610),
          i = t(51293),
          a = t(59059),
          o = t(17770),
          n = {};
        for (let e in o)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (n[e] = () => o[e]);
        t.d(r, n);
        let d = {
            children: [
              "",
              {
                children: [
                  "(marketing)",
                  {
                    children: [
                      "help",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(t.bind(t, 29071)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\help\\page.tsx",
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\help\\page.tsx",
          ],
          c = { require: t, loadChunk: () => Promise.resolve() },
          p = new s.AppPageRouteModule({
            definition: {
              kind: i.RouteKind.APP_PAGE,
              page: "/(marketing)/help/page",
              pathname: "/help",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
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
      92206: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("MessageSquare", [
          [
            "path",
            {
              d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
              key: "1lielz",
            },
          ],
        ]);
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94950: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 29071));
      },
      95255: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => o });
        var s = t(84205),
          i = {
            xmlns: "http://www.w3.org/2000/svg",
            width: 24,
            height: 24,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          };
        let a = (e) =>
            e
              .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
              .toLowerCase()
              .trim(),
          o = (e, r) => {
            let t = (0, s.forwardRef)(
              (
                {
                  color: t = "currentColor",
                  size: o = 24,
                  strokeWidth: n = 2,
                  absoluteStrokeWidth: d,
                  className: l = "",
                  children: c,
                  ...p
                },
                u,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: u,
                    ...i,
                    width: o,
                    height: o,
                    stroke: t,
                    strokeWidth: d ? (24 * Number(n)) / Number(o) : n,
                    className: ["lucide", `lucide-${a(e)}`, l].join(" "),
                    ...p,
                  },
                  [
                    ...r.map(([e, r]) => (0, s.createElement)(e, r)),
                    ...(Array.isArray(c) ? c : [c]),
                  ],
                ),
            );
            return (t.displayName = `${e}`), t;
          };
      },
    });
  var r = require("../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(
      0,
      [827, 6518, 2033, 4027, 8859, 1655, 8029, 5728, 4630, 1603],
      () => t(64908),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
