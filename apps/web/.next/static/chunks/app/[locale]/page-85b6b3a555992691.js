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
    (e._sentryDebugIds[t] = "bfd9f49f-86c0-43e8-899e-3eff3bbb20b5"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-bfd9f49f-86c0-43e8-899e-3eff3bbb20b5"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [465],
  {
    12265: (e, t, l) => {
      "use strict";
      l.d(t, { HomeClient: () => f });
      var s = l(30602),
        r = l(61511),
        a = l(62408),
        i = l(36327),
        d = l(78155),
        c = l(83944),
        n = l(49921),
        m = l(72170),
        o = l(92352),
        x = l(97687),
        b = l.n(x),
        u = l(73974),
        h = l(5271),
        g = l(30311);
      function f(e) {
        let { locale: t } = e,
          l = (0, u.useTranslations)(),
          x = "/".concat(t),
          f = "ar" === t;
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsxs)("section", {
              className:
                "relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-16 md:py-20 lg:py-24",
              children: [
                (0, s.jsxs)("div", {
                  className: "absolute inset-0 opacity-10",
                  children: [
                    (0, s.jsx)("div", {
                      className:
                        "absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl",
                    }),
                    (0, s.jsx)("div", {
                      className:
                        "absolute top-1/2 right-0 w-80 h-80 rounded-full bg-indigo-500 filter blur-3xl",
                    }),
                    (0, s.jsx)("div", {
                      className:
                        "absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-sky-500 filter blur-3xl",
                    }),
                  ],
                }),
                (0, s.jsx)("div", {
                  className:
                    "max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8",
                  children: (0, s.jsxs)("div", {
                    className:
                      "grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center",
                    children: [
                      (0, s.jsxs)("div", {
                        className: (0, g.cn)("text-left", f && "text-right"),
                        children: [
                          (0, s.jsx)("div", {
                            className:
                              "inline-block px-3 py-1 mb-4 md:mb-6 text-sm font-medium rounded-full bg-blue-500/20 text-blue-200 dark:bg-blue-800/30 dark:text-blue-200",
                            children: l("Home.simplifiedSolutions"),
                          }),
                          (0, s.jsxs)("h1", {
                            className:
                              "text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-tight",
                            children: [
                              l("Home.titleStart"),
                              " ",
                              (0, s.jsxs)("span", {
                                className:
                                  "text-blue-300 dark:text-blue-300 relative",
                                children: [
                                  l("Home.titleHighlight"),
                                  (0, s.jsx)("span", {
                                    className:
                                      "absolute bottom-0 left-0 w-full h-1 bg-blue-400 rounded-full",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, s.jsx)("p", {
                            className:
                              "text-lg md:text-xl text-blue-100 dark:text-blue-100 mb-6 md:mb-8 leading-relaxed",
                            children: l("Home.description"),
                          }),
                          (0, s.jsxs)("div", {
                            className: (0, g.cn)(
                              "flex flex-col sm:flex-row gap-4",
                              f && "sm:flex-row-reverse",
                            ),
                            children: [
                              (0, s.jsx)(h.$, {
                                asChild: !0,
                                size: "lg",
                                className:
                                  "text-lg font-medium bg-white text-blue-700 hover:bg-blue-50 dark:bg-blue-100 dark:text-blue-900 dark:hover:bg-blue-200 transition-all duration-200",
                                children: (0, s.jsxs)(b(), {
                                  href: "".concat(x, "/chat"),
                                  className: (0, g.cn)(
                                    "flex items-center",
                                    f && "flex-row-reverse",
                                  ),
                                  children: [
                                    l("Home.startChat"),
                                    " ",
                                    (0, s.jsx)(r.A, {
                                      className: (0, g.cn)(
                                        f ? "mr-2 rtl:mr-0 rtl:ml-2" : "ml-2",
                                      ),
                                    }),
                                  ],
                                }),
                              }),
                              (0, s.jsx)(h.$, {
                                asChild: !0,
                                size: "lg",
                                variant: "outline",
                                className:
                                  "text-lg font-medium border-white text-white hover:bg-white/10 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-all duration-200",
                                children: (0, s.jsxs)(b(), {
                                  href: "".concat(x, "/assessment"),
                                  className: (0, g.cn)(
                                    "flex items-center",
                                    f && "flex-row-reverse",
                                  ),
                                  children: [
                                    l("Home.checkEligibility"),
                                    " ",
                                    (0, s.jsx)(a.A, {
                                      className: (0, g.cn)(
                                        f ? "mr-2 rtl:mr-0 rtl:ml-2" : "ml-2",
                                      ),
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                          (0, s.jsx)("div", {
                            className: (0, g.cn)(
                              "mt-6 flex",
                              f ? "justify-end" : "justify-start",
                            ),
                            children: (0, s.jsx)(h.$, {
                              asChild: !0,
                              variant: "link",
                              className: "text-blue-200 hover:text-white",
                              children: (0, s.jsxs)(b(), {
                                href: "".concat(x, "/dashboard"),
                                className: (0, g.cn)(
                                  "flex items-center",
                                  f && "flex-row-reverse",
                                ),
                                children: [
                                  (0, s.jsx)(i.A, {
                                    className: (0, g.cn)(f ? "ml-2" : "mr-2"),
                                  }),
                                  " ",
                                  l("Home.existingUsers"),
                                ],
                              }),
                            }),
                          }),
                          (0, s.jsxs)("div", {
                            className: "mt-6 md:mt-8 flex items-center",
                            children: [
                              (0, s.jsx)("div", {
                                className: "flex -space-x-2",
                                children: [1, 2, 3, 4].map((e) =>
                                  (0, s.jsx)(
                                    "div",
                                    {
                                      className:
                                        "w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:bg-gray-700 dark:border-blue-900",
                                    },
                                    e,
                                  ),
                                ),
                              }),
                              (0, s.jsxs)("p", {
                                className: (0, g.cn)("ml-4", f && "mr-4 ml-0"),
                                dir: f ? "rtl" : "ltr",
                                children: [
                                  (0, s.jsx)("span", {
                                    className: "font-medium",
                                    children: "5,000+",
                                  }),
                                  " ",
                                  l("Home.successfulJourneys"),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, s.jsx)("div", {
                        className: "hidden lg:block relative",
                        children: (0, s.jsxs)("div", {
                          className:
                            "w-full h-[500px] relative bg-gradient-to-tr from-blue-400/20 to-blue-600/20 rounded-lg backdrop-blur-sm p-6 border border-white/10",
                          children: [
                            (0, s.jsx)("div", {
                              className:
                                "absolute -right-6 -top-6 w-20 h-20 rounded-full bg-blue-500/30 backdrop-blur-xl",
                            }),
                            (0, s.jsx)("div", {
                              className:
                                "absolute -left-6 -bottom-6 w-16 h-16 rounded-full bg-indigo-500/30 backdrop-blur-xl",
                            }),
                            (0, s.jsxs)("div", {
                              className:
                                "h-full w-full rounded-md bg-white/5 backdrop-blur-sm border border-white/10 p-4 flex flex-col",
                              children: [
                                (0, s.jsx)("div", {
                                  className:
                                    "h-10 w-full bg-blue-900/40 rounded-md mb-4 flex items-center px-4",
                                  children: (0, s.jsxs)("div", {
                                    className: "flex space-x-2",
                                    children: [
                                      (0, s.jsx)("div", {
                                        className:
                                          "w-3 h-3 rounded-full bg-red-400",
                                      }),
                                      (0, s.jsx)("div", {
                                        className:
                                          "w-3 h-3 rounded-full bg-yellow-400",
                                      }),
                                      (0, s.jsx)("div", {
                                        className:
                                          "w-3 h-3 rounded-full bg-green-400",
                                      }),
                                    ],
                                  }),
                                }),
                                (0, s.jsxs)("div", {
                                  className:
                                    "flex-1 bg-blue-900/30 rounded-md p-4 backdrop-blur-sm",
                                  children: [
                                    (0, s.jsxs)("div", {
                                      className: (0, g.cn)(
                                        "flex items-start mb-4",
                                        f && "flex-row-reverse",
                                      ),
                                      children: [
                                        (0, s.jsx)("div", {
                                          className: (0, g.cn)(
                                            "w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0",
                                            f ? "ml-3" : "mr-3",
                                          ),
                                          children: (0, s.jsx)(r.A, {
                                            className: "h-4 w-4 text-white",
                                          }),
                                        }),
                                        (0, s.jsx)("div", {
                                          className: (0, g.cn)(
                                            "bg-blue-800/40 p-3 rounded-lg",
                                            f
                                              ? "rounded-tr-none"
                                              : "rounded-tl-none",
                                          ),
                                          children: (0, s.jsx)("p", {
                                            className: (0, g.cn)(
                                              "text-sm text-blue-100",
                                              f && "text-right",
                                            ),
                                            dir: f ? "rtl" : "ltr",
                                            children: l(
                                              "Home.chatExample.question",
                                            ),
                                          }),
                                        }),
                                      ],
                                    }),
                                    (0, s.jsxs)("div", {
                                      className: (0, g.cn)(
                                        "flex items-start mb-4",
                                        f && "flex-row-reverse",
                                      ),
                                      children: [
                                        (0, s.jsx)("div", {
                                          className: (0, g.cn)(
                                            "w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0",
                                            f ? "ml-3" : "mr-3",
                                          ),
                                          children: (0, s.jsx)("svg", {
                                            className: "h-4 w-4 text-white",
                                            fill: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: (0, s.jsx)("path", {
                                              d: "M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z",
                                            }),
                                          }),
                                        }),
                                        (0, s.jsx)("div", {
                                          className: (0, g.cn)(
                                            "bg-indigo-800/40 p-3 rounded-lg",
                                            f
                                              ? "rounded-tr-none"
                                              : "rounded-tl-none",
                                          ),
                                          children: (0, s.jsxs)("p", {
                                            className: (0, g.cn)(
                                              "text-sm text-blue-100",
                                              f && "text-right",
                                            ),
                                            dir: f ? "rtl" : "ltr",
                                            children: [
                                              l("Home.chatExample.answer"),
                                              (0, s.jsx)("br", {}),
                                              (0, s.jsx)("br", {}),
                                              "1. ",
                                              l("Home.chatExample.step1"),
                                              (0, s.jsx)("br", {}),
                                              "2. ",
                                              l("Home.chatExample.step2"),
                                              (0, s.jsx)("br", {}),
                                              "3. ",
                                              l("Home.chatExample.step3"),
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
            (0, s.jsx)("section", {
              className:
                "py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900",
              children: (0, s.jsxs)("div", {
                className: "max-w-7xl mx-auto",
                children: [
                  (0, s.jsxs)("div", {
                    className: (0, g.cn)(
                      "text-center mb-10 md:mb-12",
                      f && "rtl",
                    ),
                    children: [
                      (0, s.jsx)("span", {
                        className:
                          "inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-3 md:mb-4",
                        children: l("Home.features.subtitle"),
                      }),
                      (0, s.jsx)("h2", {
                        className:
                          "text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white",
                        children: l("Home.features.title"),
                      }),
                    ],
                  }),
                  (0, s.jsx)("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8",
                    children: [
                      {
                        icon: r.A,
                        titleKey: "aiSupport",
                        descriptionKey: "aiSupportDesc",
                      },
                      {
                        icon: d.A,
                        titleKey: "expertGuidance",
                        descriptionKey: "expertGuidanceDesc",
                      },
                      {
                        icon: c.A,
                        titleKey: "timeSaving",
                        descriptionKey: "timeSavingDesc",
                      },
                    ].map((e, t) =>
                      (0, s.jsxs)(
                        "div",
                        {
                          className:
                            "p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900 transition-all",
                          children: [
                            (0, s.jsx)("div", {
                              className:
                                "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4 md:mb-6",
                              children: (0, s.jsx)(e.icon, {
                                className:
                                  "h-6 w-6 text-blue-600 dark:text-blue-400",
                              }),
                            }),
                            (0, s.jsx)("h3", {
                              className: (0, g.cn)(
                                "text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white",
                                f && "text-right",
                              ),
                              children: l("Home.features.".concat(e.titleKey)),
                            }),
                            (0, s.jsx)("p", {
                              className: (0, g.cn)(
                                "text-gray-600 dark:text-gray-300",
                                f && "text-right",
                              ),
                              dir: f ? "rtl" : "ltr",
                              children: l(
                                "Home.features.".concat(e.descriptionKey),
                              ),
                            }),
                          ],
                        },
                        t,
                      ),
                    ),
                  }),
                ],
              }),
            }),
            (0, s.jsx)("section", {
              className:
                "py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800",
              children: (0, s.jsxs)("div", {
                className: "max-w-7xl mx-auto",
                children: [
                  (0, s.jsxs)("div", {
                    className: (0, g.cn)(
                      "text-center mb-10 md:mb-12",
                      f && "rtl",
                    ),
                    children: [
                      (0, s.jsx)("span", {
                        className:
                          "inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 mb-3 md:mb-4",
                        children: l("Home.process.subtitle"),
                      }),
                      (0, s.jsx)("h2", {
                        className:
                          "text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white",
                        children: l("Home.process.title"),
                      }),
                    ],
                  }),
                  (0, s.jsxs)("div", {
                    className: "relative",
                    children: [
                      (0, s.jsx)("div", {
                        className:
                          "absolute top-1/2 left-0 right-0 h-1 bg-blue-200 dark:bg-blue-900 transform -translate-y-1/2 hidden md:block",
                      }),
                      (0, s.jsx)("div", {
                        className:
                          "grid grid-cols-1 md:grid-cols-4 gap-8 relative",
                        children: [
                          {
                            step: "1",
                            titleKey: "createAccount",
                            descriptionKey: "createAccountDesc",
                            icon: n.A,
                          },
                          {
                            step: "2",
                            titleKey: "assessment",
                            descriptionKey: "assessmentDesc",
                            icon: m.A,
                          },
                          {
                            step: "3",
                            titleKey: "getGuidance",
                            descriptionKey: "getGuidanceDesc",
                            icon: r.A,
                          },
                          {
                            step: "4",
                            titleKey: "trackProgress",
                            descriptionKey: "trackProgressDesc",
                            icon: o.A,
                          },
                        ].map((e, t) =>
                          (0, s.jsxs)(
                            "div",
                            {
                              className: (0, g.cn)(
                                "text-center relative",
                                f && "rtl",
                              ),
                              children: [
                                (0, s.jsx)("div", {
                                  className:
                                    "w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 md:mb-6 text-xl font-bold relative z-10 border-4 border-white dark:border-gray-800",
                                  children: e.step,
                                }),
                                (0, s.jsx)("h3", {
                                  className:
                                    "text-xl font-semibold mb-2 md:mb-3 text-gray-900 dark:text-white",
                                  children: l(
                                    "Home.process.".concat(e.titleKey),
                                  ),
                                }),
                                (0, s.jsx)("p", {
                                  className: "text-gray-600 dark:text-gray-300",
                                  dir: f ? "rtl" : "ltr",
                                  children: l(
                                    "Home.process.".concat(e.descriptionKey),
                                  ),
                                }),
                              ],
                            },
                            t,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            }),
            (0, s.jsxs)("section", {
              className:
                "py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 relative overflow-hidden",
              children: [
                (0, s.jsx)("div", {
                  className: "absolute inset-0 opacity-10",
                  children: (0, s.jsx)("div", {
                    className:
                      "absolute top-0 left-0 w-full h-full bg-[url('/patterns/pattern.svg')] bg-repeat opacity-20",
                  }),
                }),
                (0, s.jsxs)("div", {
                  className: "max-w-4xl mx-auto text-center relative z-10",
                  children: [
                    (0, s.jsx)("span", {
                      className:
                        "inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white mb-4 md:mb-6",
                      children: l("Home.cta.subtitle"),
                    }),
                    (0, s.jsx)("h2", {
                      className:
                        "text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6",
                      children: l("Home.cta.title"),
                    }),
                    (0, s.jsx)("p", {
                      className:
                        "text-lg md:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto",
                      children: l("Home.cta.description"),
                    }),
                    (0, s.jsxs)("div", {
                      className: (0, g.cn)(
                        "flex flex-col sm:flex-row gap-4 justify-center",
                        f && "sm:flex-row-reverse",
                      ),
                      children: [
                        (0, s.jsx)(h.$, {
                          asChild: !0,
                          size: "lg",
                          variant: "secondary",
                          className:
                            "text-lg font-medium bg-white text-blue-700 hover:bg-blue-50 transition-all duration-200",
                          children: (0, s.jsxs)(b(), {
                            href: "".concat(x, "/signup"),
                            className: (0, g.cn)(
                              "flex items-center",
                              f && "flex-row-reverse",
                            ),
                            children: [
                              l("Home.cta.getStarted"),
                              " ",
                              (0, s.jsx)(a.A, {
                                className: (0, g.cn)(f ? "mr-2" : "ml-2"),
                              }),
                            ],
                          }),
                        }),
                        (0, s.jsx)(h.$, {
                          asChild: !0,
                          size: "lg",
                          variant: "outline",
                          className:
                            "text-lg font-medium border-2 border-white text-white bg-white/10 hover:bg-white/30 transition-all duration-200 shadow-md ring-1 ring-white/20",
                          children: (0, s.jsx)(b(), {
                            href: "".concat(x, "/about"),
                            className: "flex items-center",
                            children: l("Home.cta.learnMore"),
                          }),
                        }),
                      ],
                    }),
                    (0, s.jsx)("div", {
                      className: "mt-6",
                      children: (0, s.jsx)(h.$, {
                        asChild: !0,
                        variant: "link",
                        className: "text-blue-200 hover:text-white",
                        children: (0, s.jsxs)(b(), {
                          href: "".concat(x, "/dashboard"),
                          className: (0, g.cn)(
                            "flex items-center justify-center",
                            f && "flex-row-reverse",
                          ),
                          children: [
                            (0, s.jsx)(i.A, {
                              className: (0, g.cn)(f ? "ml-2" : "mr-2"),
                            }),
                            " ",
                            l("Home.cta.existingAccount"),
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
    },
    21379: (e, t, l) => {
      Promise.resolve().then(l.bind(l, 12265));
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [6593, 4223, 3209, 7358], () => t(21379)), (_N_E = e.O());
  },
]);
