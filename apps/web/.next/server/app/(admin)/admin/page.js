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
    (e._sentryDebugIds[t] = "08978d67-b686-4767-96b7-1ef3da1b4462"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-08978d67-b686-4767-96b7-1ef3da1b4462"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 5867),
    (e.ids = [5867]),
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
              BT: () => p,
              Wu: () => x,
              ZB: () => u,
              Zp: () => l,
              aR: () => c,
              wL: () => m,
            });
            var a = r(61268),
              i = r(55728),
              o = r(84205),
              n = r(15942),
              d = e([n]);
            n = (d.then ? (await d)() : d)[0];
            let l = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.P.div, {
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
            l.displayName = "Card";
            let c = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, n.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            c.displayName = "CardHeader";
            let u = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("h3", {
                ref: r,
                className: (0, n.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            u.displayName = "CardTitle";
            let p = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("p", {
                ref: r,
                className: (0, n.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            p.displayName = "CardDescription";
            let x = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, n.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            x.displayName = "CardContent";
            let m = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, n.cn)("flex items-center p-6 pt-0", e),
                ...t,
              }),
            );
            (m.displayName = "CardFooter"), s();
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
      15090: (e, t, r) => {
        "use strict";
        r.d(t, { d: () => p });
        var s = r(84205);
        let a = {
            ADD_TOAST: "ADD_TOAST",
            UPDATE_TOAST: "UPDATE_TOAST",
            DISMISS_TOAST: "DISMISS_TOAST",
            REMOVE_TOAST: "REMOVE_TOAST",
          },
          i = 0,
          o = new Map(),
          n = (e, t) => {
            switch (t.type) {
              case a.ADD_TOAST:
                return { ...e, toasts: [t.toast, ...e.toasts].slice(0, 5) };
              case a.UPDATE_TOAST:
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === t.toast.id ? { ...e, ...t.toast } : e,
                  ),
                };
              case a.DISMISS_TOAST: {
                let { toastId: r } = t;
                if (r) o.has(r) && (clearTimeout(o.get(r)), o.delete(r));
                else
                  for (let [e, t] of o.entries()) clearTimeout(t), o.delete(e);
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === r || void 0 === r ? { ...e, open: !1 } : e,
                  ),
                };
              }
              case a.REMOVE_TOAST:
                if (void 0 === t.toastId) return { ...e, toasts: [] };
                return {
                  ...e,
                  toasts: e.toasts.filter((e) => e.id !== t.toastId),
                };
            }
          },
          d = [],
          l = { toasts: [] };
        function c(e) {
          (l = n(l, e)),
            d.forEach((e) => {
              e(l);
            });
        }
        function u({ ...e }) {
          let t = (i = (i + 1) % Number.MAX_VALUE).toString(),
            r = () => c({ type: a.DISMISS_TOAST, toastId: t });
          return (
            c({
              type: a.ADD_TOAST,
              toast: {
                ...e,
                id: t,
                open: !0,
                onOpenChange: (e) => {
                  e || r();
                },
              },
            }),
            {
              id: t,
              dismiss: r,
              update: (e) =>
                c({ type: a.UPDATE_TOAST, toast: { ...e, id: t } }),
            }
          );
        }
        function p() {
          let [e, t] = s.useState(l);
          return (
            s.useEffect(
              () => (
                d.push(t),
                () => {
                  let e = d.indexOf(t);
                  e > -1 && d.splice(e, 1);
                }
              ),
              [e],
            ),
            {
              ...e,
              toast: u,
              dismiss: (e) => c({ type: a.DISMISS_TOAST, toastId: e }),
            }
          );
        }
      },
      16812: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => u,
            tree: () => d,
          });
        var s = r(11610),
          a = r(51293),
          i = r(59059),
          o = r(17770),
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
        r.d(t, n);
        let d = {
            children: [
              "",
              {
                children: [
                  "(admin)",
                  {
                    children: [
                      "admin",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 95084)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(admin)\\admin\\page.tsx",
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
          l = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(admin)\\admin\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(admin)/admin/page",
              pathname: "/admin",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
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
      32983: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 80918));
      },
      33156: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("FileCheck", [
          [
            "path",
            {
              d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
              key: "1rqfz7",
            },
          ],
          ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
          ["path", { d: "m9 15 2 2 4-4", key: "1grp1n" }],
        ]);
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      36686: (e) => {
        "use strict";
        e.exports = require("diagnostics_channel");
      },
      36789: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Clock", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }],
        ]);
      },
      36798: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Settings", [
          [
            "path",
            {
              d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
              key: "1qme2f",
            },
          ],
          ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
        ]);
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
      47134: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Activity", [
          ["path", { d: "M22 12h-4l-3 9L9 3l-3 9H2", key: "d5dnw9" }],
        ]);
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
      61950: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("AlertCircle", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
          [
            "line",
            { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" },
          ],
        ]);
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      72735: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 95084));
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
      80918: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => w });
            var a = r(61268),
              i = r(99358),
              o = r(36789),
              n = r(36798),
              d = r(52327),
              l = r(33156),
              c = r(94910),
              u = r(47134),
              p = r(61950),
              x = r(82122),
              m = r(31655),
              h = r.n(m),
              f = r(89882),
              g = r(84205),
              b = r(5451),
              y = r(15090),
              j = e([b]);
            function w() {
              let { toast: e } = (0, y.d)();
              (0, f.useRouter)();
              let [t, r] = (0, g.useState)({
                  documentCount: 0,
                  userCount: 0,
                  activeSources: 0,
                  scrapeCount: 0,
                  recentSuccessRate: 0,
                  averageTrustScore: 0,
                }),
                s = [
                  {
                    title: "Scraping Sources",
                    description:
                      "Manage web scraping sources for automated content collection",
                    icon: (0, a.jsx)(i.A, { className: "h-6 w-6" }),
                    href: "/admin/scraping-sources",
                    color: "bg-blue-100 dark:bg-blue-900",
                    textColor: "text-blue-700 dark:text-blue-300",
                  },
                  {
                    title: "Scraping Logs",
                    description:
                      "Monitor scheduled scraping jobs and view scraping history",
                    icon: (0, a.jsx)(o.A, { className: "h-6 w-6" }),
                    href: "/admin/scraping-logs",
                    color: "bg-indigo-100 dark:bg-indigo-900",
                    textColor: "text-indigo-700 dark:text-indigo-300",
                  },
                  {
                    title: "System Settings",
                    description:
                      "Configure global application settings and preferences",
                    icon: (0, a.jsx)(n.A, { className: "h-6 w-6" }),
                    href: "/admin/settings",
                    color: "bg-purple-100 dark:bg-purple-900",
                    textColor: "text-purple-700 dark:text-purple-300",
                  },
                  {
                    title: "User Management",
                    description:
                      "Add, edit, and manage user accounts and permissions",
                    icon: (0, a.jsx)(d.A, { className: "h-6 w-6" }),
                    href: "/admin/users",
                    color: "bg-green-100 dark:bg-green-900",
                    textColor: "text-green-700 dark:text-green-300",
                  },
                  {
                    title: "Document Verification",
                    description:
                      "Review and verify user-submitted documents and forms",
                    icon: (0, a.jsx)(l.A, { className: "h-6 w-6" }),
                    href: "/admin/verification",
                    color: "bg-amber-100 dark:bg-amber-900",
                    textColor: "text-amber-700 dark:text-amber-300",
                  },
                  {
                    title: "Database Management",
                    description:
                      "Oversee database operations and content moderation",
                    icon: (0, a.jsx)(c.A, { className: "h-6 w-6" }),
                    href: "/admin/database",
                    color: "bg-red-100 dark:bg-red-900",
                    textColor: "text-red-700 dark:text-red-300",
                  },
                  {
                    title: "System Logs",
                    description:
                      "Monitor system activity, errors, and performance metrics",
                    icon: (0, a.jsx)(u.A, { className: "h-6 w-6" }),
                    href: "/admin/logs",
                    color: "bg-cyan-100 dark:bg-cyan-900",
                    textColor: "text-cyan-700 dark:text-cyan-300",
                  },
                ];
              return (0, a.jsxs)("div", {
                className: "container mx-auto py-8",
                children: [
                  (0, a.jsxs)("div", {
                    className: "mb-8",
                    children: [
                      (0, a.jsx)("h1", {
                        className: "text-3xl font-bold mb-2",
                        children: "Admin Dashboard",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-muted-foreground",
                        children:
                          "Manage and monitor the Hijraah immigration platform.",
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className:
                      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8",
                    children: [
                      (0, a.jsxs)(b.Zp, {
                        children: [
                          (0, a.jsxs)(b.aR, {
                            className:
                              "flex flex-row items-center justify-between pb-2",
                            children: [
                              (0, a.jsx)(b.ZB, {
                                className: "text-sm font-medium",
                                children: "Total Documents",
                              }),
                              (0, a.jsx)(l.A, {
                                className: "h-4 w-4 text-muted-foreground",
                              }),
                            ],
                          }),
                          (0, a.jsxs)(b.Wu, {
                            children: [
                              (0, a.jsx)("div", {
                                className: "text-2xl font-bold",
                                children: t.documentCount,
                              }),
                              (0, a.jsx)("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Immigration documents processed",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsxs)(b.Zp, {
                        children: [
                          (0, a.jsxs)(b.aR, {
                            className:
                              "flex flex-row items-center justify-between pb-2",
                            children: [
                              (0, a.jsx)(b.ZB, {
                                className: "text-sm font-medium",
                                children: "Active Users",
                              }),
                              (0, a.jsx)(d.A, {
                                className: "h-4 w-4 text-muted-foreground",
                              }),
                            ],
                          }),
                          (0, a.jsxs)(b.Wu, {
                            children: [
                              (0, a.jsx)("div", {
                                className: "text-2xl font-bold",
                                children: t.userCount,
                              }),
                              (0, a.jsx)("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Users registered on the platform",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsxs)(b.Zp, {
                        children: [
                          (0, a.jsxs)(b.aR, {
                            className:
                              "flex flex-row items-center justify-between pb-2",
                            children: [
                              (0, a.jsx)(b.ZB, {
                                className: "text-sm font-medium",
                                children: "Scraping Sources",
                              }),
                              (0, a.jsx)(i.A, {
                                className: "h-4 w-4 text-muted-foreground",
                              }),
                            ],
                          }),
                          (0, a.jsxs)(b.Wu, {
                            children: [
                              (0, a.jsx)("div", {
                                className: "text-2xl font-bold",
                                children: t.activeSources,
                              }),
                              (0, a.jsx)("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Active web scraping sources",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsxs)(b.Zp, {
                        children: [
                          (0, a.jsxs)(b.aR, {
                            className:
                              "flex flex-row items-center justify-between pb-2",
                            children: [
                              (0, a.jsx)(b.ZB, {
                                className: "text-sm font-medium",
                                children: "Total Scrapes",
                              }),
                              (0, a.jsx)(o.A, {
                                className: "h-4 w-4 text-muted-foreground",
                              }),
                            ],
                          }),
                          (0, a.jsxs)(b.Wu, {
                            children: [
                              (0, a.jsx)("div", {
                                className: "text-2xl font-bold",
                                children: t.scrapeCount,
                              }),
                              (0, a.jsx)("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Web scraping operations performed",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsxs)(b.Zp, {
                        children: [
                          (0, a.jsxs)(b.aR, {
                            className:
                              "flex flex-row items-center justify-between pb-2",
                            children: [
                              (0, a.jsx)(b.ZB, {
                                className: "text-sm font-medium",
                                children: "Scrape Success Rate",
                              }),
                              (0, a.jsx)(p.A, {
                                className: "h-4 w-4 text-muted-foreground",
                              }),
                            ],
                          }),
                          (0, a.jsxs)(b.Wu, {
                            children: [
                              (0, a.jsxs)("div", {
                                className: "text-2xl font-bold",
                                children: [t.recentSuccessRate, "%"],
                              }),
                              (0, a.jsx)("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Last 30 days success rate",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsxs)(b.Zp, {
                        children: [
                          (0, a.jsxs)(b.aR, {
                            className:
                              "flex flex-row items-center justify-between pb-2",
                            children: [
                              (0, a.jsx)(b.ZB, {
                                className: "text-sm font-medium",
                                children: "Average Trust Score",
                              }),
                              (0, a.jsx)(x.A, {
                                className: "h-4 w-4 text-muted-foreground",
                              }),
                            ],
                          }),
                          (0, a.jsxs)(b.Wu, {
                            children: [
                              (0, a.jsx)("div", {
                                className: "text-2xl font-bold",
                                children: t.averageTrustScore,
                              }),
                              (0, a.jsx)("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Average source trust rating",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsx)("h2", {
                    className: "text-2xl font-bold mb-4",
                    children: "Admin Features",
                  }),
                  (0, a.jsx)("div", {
                    className:
                      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                    children: s.map((e) =>
                      (0, a.jsx)(
                        h(),
                        {
                          href: e.href,
                          legacyBehavior: !0,
                          children: (0, a.jsx)(b.Zp, {
                            className:
                              "h-full hover:bg-muted/50 transition-colors cursor-pointer",
                            children: (0, a.jsxs)(b.aR, {
                              children: [
                                (0, a.jsx)("div", {
                                  className: `rounded-full p-2 w-fit ${e.color}`,
                                  children: (0, a.jsx)("div", {
                                    className: e.textColor,
                                    children: e.icon,
                                  }),
                                }),
                                (0, a.jsx)(b.ZB, {
                                  className: "mt-4",
                                  children: e.title,
                                }),
                                (0, a.jsx)(b.BT, { children: e.description }),
                              ],
                            }),
                          }),
                        },
                        e.title,
                      ),
                    ),
                  }),
                ],
              });
            }
            (b = (j.then ? (await j)() : j)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      82122: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Shield", [
          [
            "path",
            {
              d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
              key: "oel41y",
            },
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
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94910: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Database", [
          ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
          ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
          ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }],
        ]);
      },
      95084: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => x,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var a = r(63033),
          i = r(26394),
          o = r(60442),
          n = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(admin)\\\\admin\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(admin)\\admin\\page.tsx",
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
                apply: (e, t, r) => {
                  let s, a, i;
                  try {
                    let e = l?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(admin)/admin",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : n;
        let c = void 0,
          u = void 0,
          p = void 0,
          x = s;
      },
      95255: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => o });
        var s = r(84205),
          a = {
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
        let i = (e) =>
            e
              .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
              .toLowerCase()
              .trim(),
          o = (e, t) => {
            let r = (0, s.forwardRef)(
              (
                {
                  color: r = "currentColor",
                  size: o = 24,
                  strokeWidth: n = 2,
                  absoluteStrokeWidth: d,
                  className: l = "",
                  children: c,
                  ...u
                },
                p,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: p,
                    ...a,
                    width: o,
                    height: o,
                    stroke: r,
                    strokeWidth: d ? (24 * Number(n)) / Number(o) : n,
                    className: ["lucide", `lucide-${i(e)}`, l].join(" "),
                    ...u,
                  },
                  [
                    ...t.map(([e, t]) => (0, s.createElement)(e, t)),
                    ...(Array.isArray(c) ? c : [c]),
                  ],
                ),
            );
            return (r.displayName = `${e}`), r;
          };
      },
      99358: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Globe", [
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
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [827, 6518, 2033, 4027, 1655, 5728, 4630], () => r(16812));
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
