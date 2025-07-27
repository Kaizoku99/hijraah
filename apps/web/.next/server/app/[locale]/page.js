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
    (e._sentryDebugIds[t] = "f9bf2da8-ff2a-4cdd-80ba-c781a7aa42f1"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-f9bf2da8-ff2a-4cdd-80ba-c781a7aa42f1"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 465),
    (e.ids = [465]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      6485: (e, t, r) => {
        "use strict";
        r.d(t, { HomeClient: () => s });
        let s = (0, r(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call HomeClient() from the server but HomeClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\home-client.tsx",
          "HomeClient",
        );
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
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
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
      36100: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => c,
            pages: () => n,
            routeModule: () => x,
            tree: () => d,
          });
        var s = r(11610),
          l = r(51293),
          i = r(59059),
          a = r(17770),
          o = {};
        for (let e in a)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (o[e] = () => a[e]);
        r.d(t, o);
        let d = {
            children: [
              "",
              {
                children: [
                  "[locale]",
                  {
                    children: [
                      "__PAGE__",
                      {},
                      {
                        page: [
                          () => Promise.resolve().then(r.bind(r, 81686)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\page.tsx",
                        ],
                      },
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(r.bind(r, 63249)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\layout.tsx",
                    ],
                    "not-found": [
                      () => Promise.resolve().then(r.bind(r, 47995)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\not-found.tsx",
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
          n = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          x = new s.AppPageRouteModule({
            definition: {
              kind: l.RouteKind.APP_PAGE,
              page: "/[locale]/page",
              pathname: "/[locale]",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
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
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41429: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 41560));
      },
      41560: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { HomeClient: () => v });
            var l = r(61268),
              i = r(92206),
              a = r(9845),
              o = r(50828),
              d = r(82122),
              n = r(36789),
              c = r(43572),
              x = r(44803),
              m = r(38568),
              u = r(31655),
              p = r.n(u),
              h = r(95124),
              b = r(28909),
              g = r(15942),
              f = e([b, g]);
            function v({ locale: e }) {
              let t = (0, h.useTranslations)(),
                r = `/${e}`,
                s = "ar" === e;
              return (0, l.jsxs)(l.Fragment, {
                children: [
                  (0, l.jsxs)("section", {
                    className:
                      "relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-16 md:py-20 lg:py-24",
                    children: [
                      (0, l.jsxs)("div", {
                        className: "absolute inset-0 opacity-10",
                        children: [
                          (0, l.jsx)("div", {
                            className:
                              "absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl",
                          }),
                          (0, l.jsx)("div", {
                            className:
                              "absolute top-1/2 right-0 w-80 h-80 rounded-full bg-indigo-500 filter blur-3xl",
                          }),
                          (0, l.jsx)("div", {
                            className:
                              "absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-sky-500 filter blur-3xl",
                          }),
                        ],
                      }),
                      (0, l.jsx)("div", {
                        className:
                          "max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8",
                        children: (0, l.jsxs)("div", {
                          className:
                            "grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center",
                          children: [
                            (0, l.jsxs)("div", {
                              className: (0, g.cn)(
                                "text-left",
                                s && "text-right",
                              ),
                              children: [
                                (0, l.jsx)("div", {
                                  className:
                                    "inline-block px-3 py-1 mb-4 md:mb-6 text-sm font-medium rounded-full bg-blue-500/20 text-blue-200 dark:bg-blue-800/30 dark:text-blue-200",
                                  children: t("Home.simplifiedSolutions"),
                                }),
                                (0, l.jsxs)("h1", {
                                  className:
                                    "text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-tight",
                                  children: [
                                    t("Home.titleStart"),
                                    " ",
                                    (0, l.jsxs)("span", {
                                      className:
                                        "text-blue-300 dark:text-blue-300 relative",
                                      children: [
                                        t("Home.titleHighlight"),
                                        (0, l.jsx)("span", {
                                          className:
                                            "absolute bottom-0 left-0 w-full h-1 bg-blue-400 rounded-full",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, l.jsx)("p", {
                                  className:
                                    "text-lg md:text-xl text-blue-100 dark:text-blue-100 mb-6 md:mb-8 leading-relaxed",
                                  children: t("Home.description"),
                                }),
                                (0, l.jsxs)("div", {
                                  className: (0, g.cn)(
                                    "flex flex-col sm:flex-row gap-4",
                                    s && "sm:flex-row-reverse",
                                  ),
                                  children: [
                                    (0, l.jsx)(b.$, {
                                      asChild: !0,
                                      size: "lg",
                                      className:
                                        "text-lg font-medium bg-white text-blue-700 hover:bg-blue-50 dark:bg-blue-100 dark:text-blue-900 dark:hover:bg-blue-200 transition-all duration-200",
                                      children: (0, l.jsxs)(p(), {
                                        href: `${r}/chat`,
                                        className: (0, g.cn)(
                                          "flex items-center",
                                          s && "flex-row-reverse",
                                        ),
                                        children: [
                                          t("Home.startChat"),
                                          " ",
                                          (0, l.jsx)(i.A, {
                                            className: (0, g.cn)(
                                              s
                                                ? "mr-2 rtl:mr-0 rtl:ml-2"
                                                : "ml-2",
                                            ),
                                          }),
                                        ],
                                      }),
                                    }),
                                    (0, l.jsx)(b.$, {
                                      asChild: !0,
                                      size: "lg",
                                      variant: "outline",
                                      className:
                                        "text-lg font-medium border-white text-white hover:bg-white/10 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-all duration-200",
                                      children: (0, l.jsxs)(p(), {
                                        href: `${r}/assessment`,
                                        className: (0, g.cn)(
                                          "flex items-center",
                                          s && "flex-row-reverse",
                                        ),
                                        children: [
                                          t("Home.checkEligibility"),
                                          " ",
                                          (0, l.jsx)(a.A, {
                                            className: (0, g.cn)(
                                              s
                                                ? "mr-2 rtl:mr-0 rtl:ml-2"
                                                : "ml-2",
                                            ),
                                          }),
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                                (0, l.jsx)("div", {
                                  className: (0, g.cn)(
                                    "mt-6 flex",
                                    s ? "justify-end" : "justify-start",
                                  ),
                                  children: (0, l.jsx)(b.$, {
                                    asChild: !0,
                                    variant: "link",
                                    className: "text-blue-200 hover:text-white",
                                    children: (0, l.jsxs)(p(), {
                                      href: `${r}/dashboard`,
                                      className: (0, g.cn)(
                                        "flex items-center",
                                        s && "flex-row-reverse",
                                      ),
                                      children: [
                                        (0, l.jsx)(o.A, {
                                          className: (0, g.cn)(
                                            s ? "ml-2" : "mr-2",
                                          ),
                                        }),
                                        " ",
                                        t("Home.existingUsers"),
                                      ],
                                    }),
                                  }),
                                }),
                                (0, l.jsxs)("div", {
                                  className: "mt-6 md:mt-8 flex items-center",
                                  children: [
                                    (0, l.jsx)("div", {
                                      className: "flex -space-x-2",
                                      children: [1, 2, 3, 4].map((e) =>
                                        (0, l.jsx)(
                                          "div",
                                          {
                                            className:
                                              "w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:bg-gray-700 dark:border-blue-900",
                                          },
                                          e,
                                        ),
                                      ),
                                    }),
                                    (0, l.jsxs)("p", {
                                      className: (0, g.cn)(
                                        "ml-4",
                                        s && "mr-4 ml-0",
                                      ),
                                      dir: s ? "rtl" : "ltr",
                                      children: [
                                        (0, l.jsx)("span", {
                                          className: "font-medium",
                                          children: "5,000+",
                                        }),
                                        " ",
                                        t("Home.successfulJourneys"),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, l.jsx)("div", {
                              className: "hidden lg:block relative",
                              children: (0, l.jsxs)("div", {
                                className:
                                  "w-full h-[500px] relative bg-gradient-to-tr from-blue-400/20 to-blue-600/20 rounded-lg backdrop-blur-sm p-6 border border-white/10",
                                children: [
                                  (0, l.jsx)("div", {
                                    className:
                                      "absolute -right-6 -top-6 w-20 h-20 rounded-full bg-blue-500/30 backdrop-blur-xl",
                                  }),
                                  (0, l.jsx)("div", {
                                    className:
                                      "absolute -left-6 -bottom-6 w-16 h-16 rounded-full bg-indigo-500/30 backdrop-blur-xl",
                                  }),
                                  (0, l.jsxs)("div", {
                                    className:
                                      "h-full w-full rounded-md bg-white/5 backdrop-blur-sm border border-white/10 p-4 flex flex-col",
                                    children: [
                                      (0, l.jsx)("div", {
                                        className:
                                          "h-10 w-full bg-blue-900/40 rounded-md mb-4 flex items-center px-4",
                                        children: (0, l.jsxs)("div", {
                                          className: "flex space-x-2",
                                          children: [
                                            (0, l.jsx)("div", {
                                              className:
                                                "w-3 h-3 rounded-full bg-red-400",
                                            }),
                                            (0, l.jsx)("div", {
                                              className:
                                                "w-3 h-3 rounded-full bg-yellow-400",
                                            }),
                                            (0, l.jsx)("div", {
                                              className:
                                                "w-3 h-3 rounded-full bg-green-400",
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, l.jsxs)("div", {
                                        className:
                                          "flex-1 bg-blue-900/30 rounded-md p-4 backdrop-blur-sm",
                                        children: [
                                          (0, l.jsxs)("div", {
                                            className: (0, g.cn)(
                                              "flex items-start mb-4",
                                              s && "flex-row-reverse",
                                            ),
                                            children: [
                                              (0, l.jsx)("div", {
                                                className: (0, g.cn)(
                                                  "w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0",
                                                  s ? "ml-3" : "mr-3",
                                                ),
                                                children: (0, l.jsx)(i.A, {
                                                  className:
                                                    "h-4 w-4 text-white",
                                                }),
                                              }),
                                              (0, l.jsx)("div", {
                                                className: (0, g.cn)(
                                                  "bg-blue-800/40 p-3 rounded-lg",
                                                  s
                                                    ? "rounded-tr-none"
                                                    : "rounded-tl-none",
                                                ),
                                                children: (0, l.jsx)("p", {
                                                  className: (0, g.cn)(
                                                    "text-sm text-blue-100",
                                                    s && "text-right",
                                                  ),
                                                  dir: s ? "rtl" : "ltr",
                                                  children: t(
                                                    "Home.chatExample.question",
                                                  ),
                                                }),
                                              }),
                                            ],
                                          }),
                                          (0, l.jsxs)("div", {
                                            className: (0, g.cn)(
                                              "flex items-start mb-4",
                                              s && "flex-row-reverse",
                                            ),
                                            children: [
                                              (0, l.jsx)("div", {
                                                className: (0, g.cn)(
                                                  "w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0",
                                                  s ? "ml-3" : "mr-3",
                                                ),
                                                children: (0, l.jsx)("svg", {
                                                  className:
                                                    "h-4 w-4 text-white",
                                                  fill: "currentColor",
                                                  viewBox: "0 0 24 24",
                                                  children: (0, l.jsx)("path", {
                                                    d: "M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z",
                                                  }),
                                                }),
                                              }),
                                              (0, l.jsx)("div", {
                                                className: (0, g.cn)(
                                                  "bg-indigo-800/40 p-3 rounded-lg",
                                                  s
                                                    ? "rounded-tr-none"
                                                    : "rounded-tl-none",
                                                ),
                                                children: (0, l.jsxs)("p", {
                                                  className: (0, g.cn)(
                                                    "text-sm text-blue-100",
                                                    s && "text-right",
                                                  ),
                                                  dir: s ? "rtl" : "ltr",
                                                  children: [
                                                    t(
                                                      "Home.chatExample.answer",
                                                    ),
                                                    (0, l.jsx)("br", {}),
                                                    (0, l.jsx)("br", {}),
                                                    "1. ",
                                                    t("Home.chatExample.step1"),
                                                    (0, l.jsx)("br", {}),
                                                    "2. ",
                                                    t("Home.chatExample.step2"),
                                                    (0, l.jsx)("br", {}),
                                                    "3. ",
                                                    t("Home.chatExample.step3"),
                                                  ],
                                                }),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, l.jsx)("section", {
                    className:
                      "py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900",
                    children: (0, l.jsxs)("div", {
                      className: "max-w-7xl mx-auto",
                      children: [
                        (0, l.jsxs)("div", {
                          className: (0, g.cn)(
                            "text-center mb-10 md:mb-12",
                            s && "rtl",
                          ),
                          children: [
                            (0, l.jsx)("span", {
                              className:
                                "inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-3 md:mb-4",
                              children: t("Home.features.subtitle"),
                            }),
                            (0, l.jsx)("h2", {
                              className:
                                "text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white",
                              children: t("Home.features.title"),
                            }),
                          ],
                        }),
                        (0, l.jsx)("div", {
                          className:
                            "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8",
                          children: [
                            {
                              icon: i.A,
                              titleKey: "aiSupport",
                              descriptionKey: "aiSupportDesc",
                            },
                            {
                              icon: d.A,
                              titleKey: "expertGuidance",
                              descriptionKey: "expertGuidanceDesc",
                            },
                            {
                              icon: n.A,
                              titleKey: "timeSaving",
                              descriptionKey: "timeSavingDesc",
                            },
                          ].map((e, r) =>
                            (0, l.jsxs)(
                              "div",
                              {
                                className:
                                  "p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900 transition-all",
                                children: [
                                  (0, l.jsx)("div", {
                                    className:
                                      "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4 md:mb-6",
                                    children: (0, l.jsx)(e.icon, {
                                      className:
                                        "h-6 w-6 text-blue-600 dark:text-blue-400",
                                    }),
                                  }),
                                  (0, l.jsx)("h3", {
                                    className: (0, g.cn)(
                                      "text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white",
                                      s && "text-right",
                                    ),
                                    children: t(`Home.features.${e.titleKey}`),
                                  }),
                                  (0, l.jsx)("p", {
                                    className: (0, g.cn)(
                                      "text-gray-600 dark:text-gray-300",
                                      s && "text-right",
                                    ),
                                    dir: s ? "rtl" : "ltr",
                                    children: t(
                                      `Home.features.${e.descriptionKey}`,
                                    ),
                                  }),
                                ],
                              },
                              r,
                            ),
                          ),
                        }),
                      ],
                    }),
                  }),
                  (0, l.jsx)("section", {
                    className:
                      "py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800",
                    children: (0, l.jsxs)("div", {
                      className: "max-w-7xl mx-auto",
                      children: [
                        (0, l.jsxs)("div", {
                          className: (0, g.cn)(
                            "text-center mb-10 md:mb-12",
                            s && "rtl",
                          ),
                          children: [
                            (0, l.jsx)("span", {
                              className:
                                "inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-3 md:mb-4",
                              children: t("Home.process.subtitle"),
                            }),
                            (0, l.jsx)("h2", {
                              className:
                                "text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white",
                              children: t("Home.process.title"),
                            }),
                          ],
                        }),
                        (0, l.jsxs)("div", {
                          className: "relative",
                          children: [
                            (0, l.jsx)("div", {
                              className:
                                "absolute top-1/2 left-0 right-0 h-1 bg-blue-200 dark:bg-blue-900 transform -translate-y-1/2 hidden md:block",
                            }),
                            (0, l.jsx)("div", {
                              className:
                                "grid grid-cols-1 md:grid-cols-4 gap-8 relative",
                              children: [
                                {
                                  step: "1",
                                  titleKey: "createAccount",
                                  descriptionKey: "createAccountDesc",
                                  icon: c.A,
                                },
                                {
                                  step: "2",
                                  titleKey: "assessment",
                                  descriptionKey: "assessmentDesc",
                                  icon: x.A,
                                },
                                {
                                  step: "3",
                                  titleKey: "getGuidance",
                                  descriptionKey: "getGuidanceDesc",
                                  icon: i.A,
                                },
                                {
                                  step: "4",
                                  titleKey: "trackProgress",
                                  descriptionKey: "trackProgressDesc",
                                  icon: m.A,
                                },
                              ].map((e, r) =>
                                (0, l.jsxs)(
                                  "div",
                                  {
                                    className: (0, g.cn)(
                                      "text-center relative",
                                      s && "rtl",
                                    ),
                                    children: [
                                      (0, l.jsx)("div", {
                                        className:
                                          "w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 md:mb-6 text-xl font-bold relative z-10 border-4 border-white dark:border-gray-800",
                                        children: e.step,
                                      }),
                                      (0, l.jsx)("h3", {
                                        className:
                                          "text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white",
                                        children: t(
                                          `Home.process.${e.titleKey}`,
                                        ),
                                      }),
                                      (0, l.jsx)("p", {
                                        className:
                                          "text-gray-600 dark:text-gray-300",
                                        dir: s ? "rtl" : "ltr",
                                        children: t(
                                          `Home.process.${e.descriptionKey}`,
                                        ),
                                      }),
                                    ],
                                  },
                                  r,
                                ),
                              ),
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, l.jsxs)("section", {
                    className:
                      "py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden",
                    children: [
                      (0, l.jsx)("div", {
                        className: "absolute inset-0 opacity-10",
                        children: (0, l.jsx)("div", {
                          className:
                            "absolute top-0 left-0 w-full h-full bg-[url('/patterns/pattern.svg')] bg-repeat opacity-20",
                        }),
                      }),
                      (0, l.jsxs)("div", {
                        className:
                          "max-w-4xl mx-auto text-center relative z-10",
                        children: [
                          (0, l.jsx)("span", {
                            className:
                              "inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white mb-4 md:mb-6",
                            children: t("Home.cta.subtitle"),
                          }),
                          (0, l.jsx)("h2", {
                            className:
                              "text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6",
                            children: t("Home.cta.title"),
                          }),
                          (0, l.jsx)("p", {
                            className:
                              "text-lg md:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto",
                            children: t("Home.cta.description"),
                          }),
                          (0, l.jsxs)("div", {
                            className: (0, g.cn)(
                              "flex flex-col sm:flex-row gap-4 justify-center",
                              s && "sm:flex-row-reverse",
                            ),
                            children: [
                              (0, l.jsx)(b.$, {
                                asChild: !0,
                                size: "lg",
                                variant: "secondary",
                                className:
                                  "text-lg font-medium bg-white text-blue-700 hover:bg-blue-50 transition-all duration-200",
                                children: (0, l.jsxs)(p(), {
                                  href: `${r}/signup`,
                                  className: (0, g.cn)(
                                    "flex items-center",
                                    s && "flex-row-reverse",
                                  ),
                                  children: [
                                    t("Home.cta.getStarted"),
                                    " ",
                                    (0, l.jsx)(a.A, {
                                      className: (0, g.cn)(s ? "mr-2" : "ml-2"),
                                    }),
                                  ],
                                }),
                              }),
                              (0, l.jsx)(b.$, {
                                asChild: !0,
                                size: "lg",
                                variant: "outline",
                                className:
                                  "text-lg font-medium border-2 border-white text-white bg-white/10 hover:bg-white/30 transition-all duration-200 shadow-md ring-1 ring-white/20",
                                children: (0, l.jsx)(p(), {
                                  href: `${r}/about`,
                                  className: "flex items-center",
                                  children: t("Home.cta.learnMore"),
                                }),
                              }),
                            ],
                          }),
                          (0, l.jsx)("div", {
                            className: "mt-6",
                            children: (0, l.jsx)(b.$, {
                              asChild: !0,
                              variant: "link",
                              className: "text-blue-200 hover:text-white",
                              children: (0, l.jsxs)(p(), {
                                href: `${r}/dashboard`,
                                className: (0, g.cn)(
                                  "flex items-center justify-center",
                                  s && "flex-row-reverse",
                                ),
                                children: [
                                  (0, l.jsx)(o.A, {
                                    className: (0, g.cn)(s ? "ml-2" : "mr-2"),
                                  }),
                                  " ",
                                  t("Home.cta.existingAccount"),
                                ],
                              }),
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
            }
            ([b, g] = f.then ? (await f)() : f), s();
          } catch (e) {
            s(e);
          }
        });
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
      50828: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("LineChart", [
          ["path", { d: "M3 3v18h18", key: "1s2lah" }],
          ["path", { d: "m19 9-5 5-4-4-3 3", key: "2osh9i" }],
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
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
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
      81686: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => m,
            generateMetadata: () => x,
            generateViewport: () => u,
          });
        var l = r(63033),
          i = r(35242),
          a = r(6485),
          o = r(60442);
        async function d({ params: e }) {
          let t = (await Promise.resolve(e)).locale;
          return (0, i.jsx)(a.HomeClient, { locale: t });
        }
        let n = { ...l },
          c =
            "workUnitAsyncStorage" in n
              ? n.workUnitAsyncStorage
              : "requestAsyncStorage" in n
                ? n.requestAsyncStorage
                : void 0;
        s = new Proxy(d, {
          apply: (e, t, r) => {
            let s, l, i;
            try {
              let e = c?.getStore();
              (s = e?.headers.get("sentry-trace") ?? void 0),
                (l = e?.headers.get("baggage") ?? void 0),
                (i = e?.headers);
            } catch (e) {}
            return o
              .wrapServerComponentWithSentry(e, {
                componentRoute: "/[locale]",
                componentType: "Page",
                sentryTraceHeader: s,
                baggageHeader: l,
                headers: i,
              })
              .apply(t, r);
          },
        });
        let x = void 0,
          m = void 0,
          u = void 0,
          p = s;
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
      91645: (e) => {
        "use strict";
        e.exports = require("net");
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
      99573: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 6485));
      },
    });
  var t = require("../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 9729, 3390,
        4990, 6188, 7911, 7401, 5124, 7272, 3042, 385, 7393, 4486, 7018, 4763,
        7333, 7145, 9207, 4630, 8264, 27, 7935,
      ],
      () => r(36100),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
