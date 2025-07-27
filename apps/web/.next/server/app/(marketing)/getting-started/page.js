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
    (e._sentryDebugIds[t] = "f955d319-d160-4801-91fb-b02b4a384eab"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-f955d319-d160-4801-91fb-b02b4a384eab"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 6753),
    (e.ids = [6753]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      5451: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              BT: () => u,
              Wu: () => h,
              ZB: () => p,
              Zp: () => c,
              aR: () => l,
              wL: () => x,
            });
            var i = r(61268),
              o = r(55728),
              a = r(84205),
              n = r(15942),
              d = e([n]);
            n = (d.then ? (await d)() : d)[0];
            let c = a.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)(o.P.div, {
                ref: r,
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
                ...t,
              }),
            );
            c.displayName = "Card";
            let l = a.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("div", {
                ref: r,
                className: (0, n.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            l.displayName = "CardHeader";
            let p = a.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("h3", {
                ref: r,
                className: (0, n.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            p.displayName = "CardTitle";
            let u = a.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("p", {
                ref: r,
                className: (0, n.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            u.displayName = "CardDescription";
            let h = a.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("div", {
                ref: r,
                className: (0, n.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            h.displayName = "CardContent";
            let x = a.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("div", {
                ref: r,
                className: (0, n.cn)("flex items-center p-6 pt-0", e),
                ...t,
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
      9845: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("ArrowRight", [
          ["path", { d: "M5 12h14", key: "1ays0h" }],
          ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
        ]);
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
      20174: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => h,
            generateImageMetadata: () => p,
            generateMetadata: () => l,
            generateViewport: () => u,
          });
        var i = r(63033),
          o = r(26394),
          a = r(60442),
          n = (0, o.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(marketing)\\\\getting-started\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\getting-started\\page.tsx",
            "default",
          );
        let d = { ...i },
          c =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof n
            ? new Proxy(n, {
                apply: (e, t, r) => {
                  let s, i, o;
                  try {
                    let e = c?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (i = e?.headers.get("baggage") ?? void 0),
                      (o = e?.headers);
                  } catch (e) {}
                  return a
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(marketing)/getting-started",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: i,
                      headers: o,
                    })
                    .apply(t, r);
                },
              })
            : n;
        let l = void 0,
          p = void 0,
          u = void 0,
          h = s;
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
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
      40399: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 96308));
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
      52327: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Users", [
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
      68072: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => o.default,
            __next_app__: () => l,
            pages: () => c,
            routeModule: () => p,
            tree: () => d,
          });
        var s = r(11610),
          i = r(51293),
          o = r(59059),
          a = r(17770),
          n = {};
        for (let e in a)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (n[e] = () => a[e]);
        r.d(t, n);
        let d = {
            children: [
              "",
              {
                children: [
                  "(marketing)",
                  {
                    children: [
                      "getting-started",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 20174)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\getting-started\\page.tsx",
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {
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
          c = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\getting-started\\page.tsx",
          ],
          l = { require: r, loadChunk: () => Promise.resolve() },
          p = new s.AppPageRouteModule({
            definition: {
              kind: i.RouteKind.APP_PAGE,
              page: "/(marketing)/getting-started/page",
              pathname: "/getting-started",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
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
      87255: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 20174));
      },
      92206: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("MessageSquare", [
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
      95255: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => a });
        var s = r(84205),
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
        let o = (e) =>
            e
              .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
              .toLowerCase()
              .trim(),
          a = (e, t) => {
            let r = (0, s.forwardRef)(
              (
                {
                  color: r = "currentColor",
                  size: a = 24,
                  strokeWidth: n = 2,
                  absoluteStrokeWidth: d,
                  className: c = "",
                  children: l,
                  ...p
                },
                u,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: u,
                    ...i,
                    width: a,
                    height: a,
                    stroke: r,
                    strokeWidth: d ? (24 * Number(n)) / Number(a) : n,
                    className: ["lucide", `lucide-${o(e)}`, c].join(" "),
                    ...p,
                  },
                  [
                    ...t.map(([e, t]) => (0, s.createElement)(e, t)),
                    ...(Array.isArray(l) ? l : [l]),
                  ],
                ),
            );
            return (r.displayName = `${e}`), r;
          };
      },
      96308: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => m });
            var i = r(61268),
              o = r(92206),
              a = r(98683),
              n = r(99793),
              d = r(52327),
              c = r(9845),
              l = r(31655),
              p = r.n(l),
              u = r(28909),
              h = r(5451),
              x = e([u, h]);
            function m() {
              let e = [
                {
                  title: "Start a Chat",
                  description:
                    "Begin by chatting with our AI assistant to understand your immigration options.",
                  icon: o.A,
                  href: "/chat",
                  buttonText: "Start Chat",
                },
                {
                  title: "Check Eligibility",
                  description:
                    "Use our assessment tool to check your eligibility for different immigration programs.",
                  icon: a.A,
                  href: "/assessment",
                  buttonText: "Check Now",
                },
                {
                  title: "Prepare Documents",
                  description:
                    "Get a personalized checklist of required documents for your immigration process.",
                  icon: n.A,
                  href: "/documents",
                  buttonText: "View Checklist",
                },
                {
                  title: "Join Community",
                  description:
                    "Connect with others who are also going through the immigration process.",
                  icon: d.A,
                  href: "/community",
                  buttonText: "Join Now",
                },
              ];
              return (0, i.jsxs)("div", {
                className: "container max-w-4xl py-8",
                children: [
                  (0, i.jsxs)("div", {
                    className: "text-center mb-12",
                    children: [
                      (0, i.jsx)("h1", {
                        className: "text-4xl font-bold mb-4",
                        children: "Welcome to Hijraah",
                      }),
                      (0, i.jsx)("p", {
                        className: "text-xl text-muted-foreground",
                        children:
                          "Let's get you started on your immigration journey",
                      }),
                    ],
                  }),
                  (0, i.jsx)("div", {
                    className: "grid gap-6",
                    children: e.map((e, t) =>
                      (0, i.jsx)(
                        h.Zp,
                        {
                          className: "p-6",
                          children: (0, i.jsxs)("div", {
                            className: "flex items-start gap-4",
                            children: [
                              (0, i.jsx)("div", {
                                className:
                                  "flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10",
                                children: (0, i.jsx)(e.icon, {
                                  className: "h-6 w-6 text-primary",
                                }),
                              }),
                              (0, i.jsxs)("div", {
                                className: "flex-1",
                                children: [
                                  (0, i.jsx)("h2", {
                                    className: "text-xl font-semibold mb-2",
                                    children: e.title,
                                  }),
                                  (0, i.jsx)("p", {
                                    className: "text-muted-foreground mb-4",
                                    children: e.description,
                                  }),
                                  (0, i.jsx)(u.$, {
                                    asChild: !0,
                                    children: (0, i.jsxs)(p(), {
                                      href: e.href,
                                      legacyBehavior: !0,
                                      children: [
                                        e.buttonText,
                                        (0, i.jsx)(c.A, {
                                          className: "ml-2 h-4 w-4",
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        },
                        t,
                      ),
                    ),
                  }),
                ],
              });
            }
            ([u, h] = x.then ? (await x)() : x), s();
          } catch (e) {
            s(e);
          }
        });
      },
      98683: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("CheckCircle2", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
        ]);
      },
      99793: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("FileText", [
          [
            "path",
            {
              d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
              key: "1rqfz7",
            },
          ],
          ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
          ["path", { d: "M10 9H8", key: "b1mrlr" }],
          ["path", { d: "M16 13H8", key: "t4e002" }],
          ["path", { d: "M16 17H8", key: "z1uh3a" }],
        ]);
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827, 6518, 2033, 4027, 1655, 5728, 4630], () => r(68072));
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
