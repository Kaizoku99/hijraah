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
    (e._sentryDebugIds[r] = "1d2d98fb-5004-4d7f-881c-b7c1372cb2c7"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-1d2d98fb-5004-4d7f-881c-b7c1372cb2c7"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 7880),
    (e.ids = [7880]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3954: (e, r, t) => {
        "use strict";
        e.exports = t(31756).vendored.contexts.HeadManagerContext;
      },
      6147: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 47350)),
          Promise.resolve().then(t.t.bind(t, 53320, 23));
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      14829: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              BT: () => p,
              Wu: () => x,
              ZB: () => u,
              Zp: () => l,
              aR: () => c,
            });
            var a = t(35242),
              i = t(47350),
              o = t(84147),
              n = t(20716),
              d = e([n]);
            n = (d.then ? (await d)() : d)[0];
            let l = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)(i.motion.div, {
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
              (0, a.jsx)("div", {
                ref: t,
                className: (0, n.cn)("flex flex-col space-y-1.5 p-6", e),
                ...r,
              }),
            );
            c.displayName = "CardHeader";
            let u = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("h3", {
                ref: t,
                className: (0, n.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...r,
              }),
            );
            u.displayName = "CardTitle";
            let p = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("p", {
                ref: t,
                className: (0, n.cn)("text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            p.displayName = "CardDescription";
            let x = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, n.cn)("p-6 pt-0", e),
                ...r,
              }),
            );
            (x.displayName = "CardContent"),
              (o.forwardRef(({ className: e, ...r }, t) =>
                (0, a.jsx)("div", {
                  ref: t,
                  className: (0, n.cn)("flex items-center p-6 pt-0", e),
                  ...r,
                }),
              ).displayName = "CardFooter"),
              s();
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
      20716: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { cn: () => l, lk: () => c, p1: () => u });
            var a = t(85488),
              i = t(31399),
              o = t(63775),
              n = t(54710),
              d = e([a]);
            function l(...e) {
              return (0, n.QP)((0, o.$)(e));
            }
            function c() {
              return "undefined" != typeof crypto && crypto.randomUUID
                ? crypto.randomUUID()
                : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                    /[xy]/g,
                    function (e) {
                      let r = (16 * Math.random()) | 0;
                      return ("x" === e ? r : (3 & r) | 8).toString(16);
                    },
                  );
            }
            function u() {
              var e = (0, a.generateId)(12);
              let r = (0, i.uP)(10);
              return (0, i.Y8)(e, r);
            }
            (a = (d.then ? (await d)() : d)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      21459: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            let f;
            t.r(r),
              t.d(r, {
                default: () => k,
                generateImageMetadata: () => w,
                generateMetadata: () => j,
                generateViewport: () => q,
              });
            var a = t(63033),
              i = t(35242),
              o = t(57846),
              n = t(37255),
              d = t(67089),
              l = t(82348),
              c = t(60884),
              u = t(23477),
              p = t(57145),
              x = t(14829),
              m = t(60442),
              h = e([x]);
            x = (h.then ? (await h)() : h)[0];
            let g = [
                { value: "10K+", label: "Successful Applications", icon: o.A },
                { value: "50+", label: "Countries Served", icon: n.A },
                { value: "95%", label: "Success Rate", icon: d.A },
              ],
              b = [
                {
                  title: "Expert Guidance",
                  description:
                    "Our AI is trained on the latest immigration policies and procedures.",
                  icon: l.A,
                },
                {
                  title: "User Privacy",
                  description:
                    "Your data is protected with enterprise-grade security.",
                  icon: c.A,
                },
                {
                  title: "Community Support",
                  description:
                    "Join thousands of others on their immigration journey.",
                  icon: u.A,
                },
              ],
              y = { ...a },
              v =
                "workUnitAsyncStorage" in y
                  ? y.workUnitAsyncStorage
                  : "requestAsyncStorage" in y
                    ? y.requestAsyncStorage
                    : void 0;
            f = new Proxy(
              function () {
                return (0, i.jsxs)("div", {
                  className: "container py-12",
                  children: [
                    (0, i.jsxs)("div", {
                      className: "text-center mb-12",
                      children: [
                        (0, i.jsx)("h1", {
                          className: "text-4xl font-bold mb-4",
                          children: "About Hijraah",
                        }),
                        (0, i.jsx)("p", {
                          className:
                            "text-xl text-muted-foreground max-w-2xl mx-auto",
                          children:
                            "Empowering immigrants worldwide with AI-powered guidance and support",
                        }),
                      ],
                    }),
                    (0, i.jsxs)("div", {
                      className:
                        "grid md:grid-cols-2 gap-12 items-center mb-16",
                      children: [
                        (0, i.jsxs)("div", {
                          children: [
                            (0, i.jsx)("h2", {
                              className: "text-3xl font-bold mb-4",
                              children: "Our Mission",
                            }),
                            (0, i.jsx)("p", {
                              className: "text-lg text-muted-foreground mb-6",
                              children:
                                "At Hijraah, we believe that everyone deserves access to clear, reliable immigration guidance. Our AI-powered platform makes the immigration process more accessible, efficient, and transparent.",
                            }),
                            (0, i.jsx)("p", {
                              className: "text-lg text-muted-foreground",
                              children:
                                "We combine cutting-edge technology with comprehensive immigration knowledge to provide personalized assistance at every step of your journey.",
                            }),
                          ],
                        }),
                        (0, i.jsx)("div", {
                          className:
                            "relative h-[400px] rounded-lg overflow-hidden",
                          children: (0, i.jsx)(p.default, {
                            src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
                            alt: "Team meeting",
                            fill: !0,
                            className: "object-cover",
                          }),
                        }),
                      ],
                    }),
                    (0, i.jsx)("div", {
                      className: "grid md:grid-cols-3 gap-6 mb-16",
                      children: g.map((e) =>
                        (0, i.jsxs)(
                          x.Zp,
                          {
                            className: "p-6 text-center",
                            children: [
                              (0, i.jsx)(e.icon, {
                                className: "w-8 h-8 mx-auto mb-4 text-primary",
                              }),
                              (0, i.jsx)("div", {
                                className: "text-3xl font-bold mb-2",
                                children: e.value,
                              }),
                              (0, i.jsx)("div", {
                                className: "text-muted-foreground",
                                children: e.label,
                              }),
                            ],
                          },
                          e.label,
                        ),
                      ),
                    }),
                    (0, i.jsxs)("div", {
                      className: "mb-16",
                      children: [
                        (0, i.jsx)("h2", {
                          className: "text-3xl font-bold text-center mb-8",
                          children: "Our Values",
                        }),
                        (0, i.jsx)("div", {
                          className: "grid md:grid-cols-3 gap-8",
                          children: b.map((e) =>
                            (0, i.jsxs)(
                              x.Zp,
                              {
                                className: "p-6",
                                children: [
                                  (0, i.jsx)(e.icon, {
                                    className: "w-8 h-8 mb-4 text-primary",
                                  }),
                                  (0, i.jsx)("h3", {
                                    className: "text-xl font-semibold mb-2",
                                    children: e.title,
                                  }),
                                  (0, i.jsx)("p", {
                                    className: "text-muted-foreground",
                                    children: e.description,
                                  }),
                                ],
                              },
                              e.title,
                            ),
                          ),
                        }),
                      ],
                    }),
                    (0, i.jsxs)("div", {
                      children: [
                        (0, i.jsx)("h2", {
                          className: "text-3xl font-bold text-center mb-8",
                          children: "Our Team",
                        }),
                        (0, i.jsx)("div", {
                          className: "grid md:grid-cols-3 gap-8",
                          children: [
                            {
                              name: "Sarah Johnson",
                              role: "Immigration Expert",
                              image:
                                "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                            },
                            {
                              name: "Michael Chen",
                              role: "AI Specialist",
                              image:
                                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                            },
                            {
                              name: "Emily Rodriguez",
                              role: "Legal Advisor",
                              image:
                                "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
                            },
                          ].map((e) =>
                            (0, i.jsxs)(
                              x.Zp,
                              {
                                className: "p-6 text-center",
                                children: [
                                  (0, i.jsx)("div", {
                                    className:
                                      "relative w-32 h-32 mx-auto mb-4",
                                    children: (0, i.jsx)(p.default, {
                                      src: e.image,
                                      alt: e.name,
                                      fill: !0,
                                      className: "object-cover rounded-full",
                                    }),
                                  }),
                                  (0, i.jsx)("h3", {
                                    className: "text-xl font-semibold mb-1",
                                    children: e.name,
                                  }),
                                  (0, i.jsx)("p", {
                                    className: "text-muted-foreground",
                                    children: e.role,
                                  }),
                                ],
                              },
                              e.name,
                            ),
                          ),
                        }),
                      ],
                    }),
                  ],
                });
              },
              {
                apply: (e, r, t) => {
                  let s, a, i;
                  try {
                    let e = v?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return m
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(marketing)/about",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(r, t);
                },
              },
            );
            let j = void 0,
              w = void 0,
              q = void 0,
              k = f;
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      23477: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(30980).A)("Users", [
          [
            "path",
            { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" },
          ],
          ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
          ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
          ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }],
        ]);
      },
      27011: (e, r, t) => {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          Object.defineProperty(r, "useMergedRef", {
            enumerable: !0,
            get: function () {
              return a;
            },
          });
        let s = t(84205);
        function a(e, r) {
          let t = (0, s.useRef)(null),
            a = (0, s.useRef)(null);
          return (0, s.useCallback)(
            (s) => {
              if (null === s) {
                let e = t.current;
                e && ((t.current = null), e());
                let r = a.current;
                r && ((a.current = null), r());
              } else e && (t.current = i(e, s)), r && (a.current = i(r, s));
            },
            [e, r],
          );
        }
        function i(e, r) {
          if ("function" != typeof e)
            return (
              (e.current = r),
              () => {
                e.current = null;
              }
            );
          {
            let t = e(r);
            return "function" == typeof t ? t : () => e(null);
          }
        }
        ("function" == typeof r.default ||
          ("object" == typeof r.default && null !== r.default)) &&
          void 0 === r.default.__esModule &&
          (Object.defineProperty(r.default, "__esModule", { value: !0 }),
          Object.assign(r.default, r),
          (e.exports = r.default));
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
      37255: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(30980).A)("Globe", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          [
            "path",
            {
              d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
              key: "13o1zl",
            },
          ],
          ["path", { d: "M2 12h20", key: "9i4pu4" }],
        ]);
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
      57846: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(30980).A)("CheckCircle", [
          ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
          ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
        ]);
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      60884: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(30980).A)("Shield", [
          [
            "path",
            {
              d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
              key: "oel41y",
            },
          ],
        ]);
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      67089: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(30980).A)("BarChart", [
          ["line", { x1: "12", x2: "12", y1: "20", y2: "10", key: "1vz5eb" }],
          ["line", { x1: "18", x2: "18", y1: "20", y2: "4", key: "cun8e5" }],
          ["line", { x1: "6", x2: "6", y1: "20", y2: "16", key: "hq0ia6" }],
        ]);
      },
      71803: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 46376)),
          Promise.resolve().then(t.t.bind(t, 37018, 23));
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
      82348: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(30980).A)("Award", [
          ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }],
          [
            "path",
            { d: "M15.477 12.89 17 22l-5-3-5 3 1.523-9.11", key: "em7aur" },
          ],
        ]);
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
      87904: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => i.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => u,
            tree: () => d,
          });
        var s = t(11610),
          a = t(51293),
          i = t(59059),
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
                      "about",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(t.bind(t, 21459)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\about\\page.tsx",
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(marketing)\\about\\page.tsx",
          ],
          c = { require: t, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(marketing)/about/page",
              pathname: "/about",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
    });
  var r = require("../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(
      0,
      [827, 6518, 2033, 4027, 5728, 4990, 7018, 7145, 4292, 4630],
      () => t(87904),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
