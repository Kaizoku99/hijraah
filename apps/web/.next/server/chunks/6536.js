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
    a = new e.Error().stack;
  a &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[a] = "48e0bbdc-2482-4839-b47a-2df6d557b14d"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-48e0bbdc-2482-4839-b47a-2df6d557b14d"));
} catch (e) {}
(exports.id = 6536),
  (exports.ids = [6536]),
  (exports.modules = {
    5451: (e, a, t) => {
      "use strict";
      t.a(e, async (e, s) => {
        try {
          t.d(a, {
            BT: () => h,
            Wu: () => m,
            ZB: () => x,
            Zp: () => d,
            aR: () => c,
            wL: () => f,
          });
          var r = t(61268),
            n = t(55728),
            l = t(84205),
            i = t(15942),
            o = e([i]);
          i = (o.then ? (await o)() : o)[0];
          let d = l.forwardRef(({ className: e, ...a }, t) =>
            (0, r.jsx)(n.P.div, {
              ref: t,
              className: (0, i.cn)(
                "rounded-lg border bg-card text-card-foreground shadow-sm",
                e,
              ),
              whileHover: {
                scale: 1.03,
                boxShadow:
                  "0px 7px 25px rgba(0,0,0,0.08), 0px 3px 10px rgba(0,0,0,0.04)",
              },
              transition: { type: "spring", stiffness: 300, damping: 20 },
              ...a,
            }),
          );
          d.displayName = "Card";
          let c = l.forwardRef(({ className: e, ...a }, t) =>
            (0, r.jsx)("div", {
              ref: t,
              className: (0, i.cn)("flex flex-col space-y-1.5 p-6", e),
              ...a,
            }),
          );
          c.displayName = "CardHeader";
          let x = l.forwardRef(({ className: e, ...a }, t) =>
            (0, r.jsx)("h3", {
              ref: t,
              className: (0, i.cn)(
                "text-2xl font-semibold leading-none tracking-tight",
                e,
              ),
              ...a,
            }),
          );
          x.displayName = "CardTitle";
          let h = l.forwardRef(({ className: e, ...a }, t) =>
            (0, r.jsx)("p", {
              ref: t,
              className: (0, i.cn)("text-sm text-muted-foreground", e),
              ...a,
            }),
          );
          h.displayName = "CardDescription";
          let m = l.forwardRef(({ className: e, ...a }, t) =>
            (0, r.jsx)("div", {
              ref: t,
              className: (0, i.cn)("p-6 pt-0", e),
              ...a,
            }),
          );
          m.displayName = "CardContent";
          let f = l.forwardRef(({ className: e, ...a }, t) =>
            (0, r.jsx)("div", {
              ref: t,
              className: (0, i.cn)("flex items-center p-6 pt-0", e),
              ...a,
            }),
          );
          (f.displayName = "CardFooter"), s();
        } catch (e) {
          s(e);
        }
      });
    },
    6934: () => {},
    8630: (e, a, t) => {
      "use strict";
      t.a(e, async (e, s) => {
        try {
          t.d(a, { E: () => i });
          var r = t(35242),
            n = t(20716),
            l = e([n]);
          function i({ className: e, ...a }) {
            return (0, r.jsx)("div", {
              "data-slot": "skeleton",
              className: (0, n.cn)("bg-accent animate-pulse rounded-md", e),
              ...a,
            });
          }
          (n = (l.then ? (await l)() : l)[0]), s();
        } catch (e) {
          s(e);
        }
      });
    },
    13189: (e, a, t) => {
      Promise.resolve().then(t.bind(t, 73856));
    },
    20716: (e, a, t) => {
      "use strict";
      t.a(e, async (e, s) => {
        try {
          t.d(a, { cn: () => d, lk: () => c, p1: () => x });
          var r = t(85488),
            n = t(31399),
            l = t(63775),
            i = t(54710),
            o = e([r]);
          function d(...e) {
            return (0, i.QP)((0, l.$)(e));
          }
          function c() {
            return "undefined" != typeof crypto && crypto.randomUUID
              ? crypto.randomUUID()
              : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                  /[xy]/g,
                  function (e) {
                    let a = (16 * Math.random()) | 0;
                    return ("x" === e ? a : (3 & a) | 8).toString(16);
                  },
                );
          }
          function x() {
            var e = (0, r.generateId)(12);
            let a = (0, n.uP)(10);
            return (0, n.Y8)(e, a);
          }
          (r = (o.then ? (await o)() : o)[0]), s();
        } catch (e) {
          s(e);
        }
      });
    },
    26341: (e, a, t) => {
      Promise.resolve().then(t.bind(t, 52658));
    },
    43886: () => {},
    52658: (e, a, t) => {
      "use strict";
      t.a(e, async (e, s) => {
        try {
          t.r(a), t.d(a, { default: () => j });
          var r = t(61268),
            n = t(3519),
            l = t(57896),
            i = t(46299),
            o = t(52327),
            d = t(99793),
            c = t(80305),
            x = t(43202),
            h = t(36798),
            m = t(90495),
            f = t(96648),
            g = t(26216),
            u = t(31655),
            p = t.n(u),
            y = t(89882),
            v = t(84205),
            b = t(28909),
            w = e([b]);
          function j({ children: e }) {
            let [a, t] = (0, v.useState)(!1),
              s = (0, y.usePathname)(),
              { user: u, signOut: w } = (0, n.useAuth)(),
              j = async () => {
                await w(), (window.location.href = "/login");
              },
              N = [
                { name: "Dashboard", href: "/dashboard", icon: l.A },
                { name: "Cases", href: "/dashboard/cases", icon: i.A },
                { name: "Clients", href: "/dashboard/clients", icon: o.A },
                { name: "Documents", href: "/dashboard/documents", icon: d.A },
                {
                  name: "Immigration Status",
                  href: "/dashboard/status",
                  icon: c.A,
                },
                { name: "Roadmaps", href: "/dashboard/roadmaps", icon: x.A },
                { name: "Settings", href: "/dashboard/settings", icon: h.A },
              ],
              S = (e) => s === e || s.startsWith(`${e}/`);
            return (0, r.jsxs)("div", {
              className: "h-screen flex overflow-hidden bg-gray-50",
              children: [
                (0, r.jsx)("div", {
                  className: "md:hidden",
                  children: (0, r.jsxs)("div", {
                    className: `fixed inset-0 flex z-40 ${a ? "visible" : "invisible"}`,
                    children: [
                      (0, r.jsx)("div", {
                        className: `fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-in-out duration-300 ${a ? "opacity-100" : "opacity-0"}`,
                        onClick: () => t(!1),
                      }),
                      (0, r.jsxs)("div", {
                        className: `relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition ease-in-out duration-300 ${a ? "translate-x-0" : "-translate-x-full"}`,
                        children: [
                          (0, r.jsx)("div", {
                            className: "absolute top-0 right-0 -mr-12 pt-2",
                            children: (0, r.jsxs)("button", {
                              className:
                                "ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white",
                              onClick: () => t(!1),
                              children: [
                                (0, r.jsx)("span", {
                                  className: "sr-only",
                                  children: "Close sidebar",
                                }),
                                (0, r.jsx)(m.A, {
                                  className: "h-6 w-6 text-white",
                                }),
                              ],
                            }),
                          }),
                          (0, r.jsxs)("div", {
                            className: "flex-1 h-0 pt-5 pb-4 overflow-y-auto",
                            children: [
                              (0, r.jsx)("div", {
                                className:
                                  "flex-shrink-0 flex items-center px-4",
                                children: (0, r.jsx)("h1", {
                                  className: "text-xl font-bold text-gray-800",
                                  children: "Hijraah",
                                }),
                              }),
                              (0, r.jsx)("nav", {
                                className: "mt-5 px-2 space-y-1",
                                children: N.map((e) =>
                                  (0, r.jsxs)(
                                    p(),
                                    {
                                      href: e.href,
                                      className: `group flex items-center px-2 py-2 text-base font-medium rounded-md ${S(e.href) ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`,
                                      legacyBehavior: !0,
                                      children: [
                                        (0, r.jsx)(e.icon, {
                                          className: `mr-4 flex-shrink-0 h-6 w-6 ${S(e.href) ? "text-gray-600" : "text-gray-400 group-hover:text-gray-500"}`,
                                        }),
                                        e.name,
                                      ],
                                    },
                                    e.name,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          (0, r.jsx)("div", {
                            className:
                              "flex-shrink-0 flex border-t border-gray-200 p-4",
                            children: (0, r.jsxs)(b.$, {
                              variant: "ghost",
                              onClick: j,
                              className: "flex items-center text-gray-600",
                              children: [
                                (0, r.jsx)(f.A, { className: "mr-3 h-5 w-5" }),
                                "Sign out",
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, r.jsx)("div", {
                  className: "hidden md:flex md:flex-shrink-0",
                  children: (0, r.jsx)("div", {
                    className: "flex flex-col w-64",
                    children: (0, r.jsxs)("div", {
                      className:
                        "flex flex-col h-0 flex-1 border-r border-gray-200 bg-white",
                      children: [
                        (0, r.jsxs)("div", {
                          className:
                            "flex-1 flex flex-col pt-5 pb-4 overflow-y-auto",
                          children: [
                            (0, r.jsx)("div", {
                              className: "flex items-center flex-shrink-0 px-4",
                              children: (0, r.jsx)("h1", {
                                className: "text-xl font-bold text-gray-800",
                                children: "Hijraah",
                              }),
                            }),
                            (0, r.jsx)("nav", {
                              className: "mt-5 flex-1 px-2 bg-white space-y-1",
                              children: N.map((e) =>
                                (0, r.jsxs)(
                                  p(),
                                  {
                                    href: e.href,
                                    className: `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${S(e.href) ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`,
                                    legacyBehavior: !0,
                                    children: [
                                      (0, r.jsx)(e.icon, {
                                        className: `mr-3 flex-shrink-0 h-6 w-6 ${S(e.href) ? "text-gray-600" : "text-gray-400 group-hover:text-gray-500"}`,
                                      }),
                                      e.name,
                                    ],
                                  },
                                  e.name,
                                ),
                              ),
                            }),
                          ],
                        }),
                        (0, r.jsx)("div", {
                          className:
                            "flex-shrink-0 flex border-t border-gray-200 p-4",
                          children: (0, r.jsxs)(b.$, {
                            variant: "ghost",
                            onClick: j,
                            className: "flex items-center text-gray-600",
                            children: [
                              (0, r.jsx)(f.A, { className: "mr-3 h-5 w-5" }),
                              "Sign out",
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
                (0, r.jsxs)("div", {
                  className: "flex flex-col w-0 flex-1 overflow-hidden",
                  children: [
                    (0, r.jsx)("div", {
                      className: "md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3",
                      children: (0, r.jsxs)("button", {
                        className:
                          "-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
                        onClick: () => t(!0),
                        children: [
                          (0, r.jsx)("span", {
                            className: "sr-only",
                            children: "Open sidebar",
                          }),
                          (0, r.jsx)(g.A, { className: "h-6 w-6" }),
                        ],
                      }),
                    }),
                    (0, r.jsx)("main", {
                      className:
                        "flex-1 relative z-0 overflow-y-auto focus:outline-none",
                      children: (0, r.jsx)("div", {
                        className: "py-6",
                        children: e,
                      }),
                    }),
                  ],
                }),
              ],
            });
          }
          (b = (w.then ? (await w)() : w)[0]), s();
        } catch (e) {
          s(e);
        }
      });
    },
    72967: (e, a, t) => {
      "use strict";
      let s;
      t.r(a),
        t.d(a, {
          default: () => h,
          generateImageMetadata: () => c,
          generateMetadata: () => d,
          generateViewport: () => x,
        });
      var r = t(63033),
        n = t(35242),
        l = t(60442);
      let i = { ...r },
        o =
          "workUnitAsyncStorage" in i
            ? i.workUnitAsyncStorage
            : "requestAsyncStorage" in i
              ? i.requestAsyncStorage
              : void 0;
      s = new Proxy(
        function ({ children: e }) {
          return (0, n.jsx)(n.Fragment, { children: e });
        },
        {
          apply: (e, a, t) => {
            let s, r, n;
            try {
              let e = o?.getStore();
              (s = e?.headers.get("sentry-trace") ?? void 0),
                (r = e?.headers.get("baggage") ?? void 0),
                (n = e?.headers);
            } catch (e) {}
            return l
              .wrapServerComponentWithSentry(e, {
                componentRoute: "/(authenticated)",
                componentType: "Layout",
                sentryTraceHeader: s,
                baggageHeader: r,
                headers: n,
              })
              .apply(a, t);
          },
        },
      );
      let d = void 0,
        c = void 0,
        x = void 0,
        h = s;
    },
    73856: (e, a, t) => {
      "use strict";
      let s;
      t.r(a),
        t.d(a, {
          default: () => m,
          generateImageMetadata: () => x,
          generateMetadata: () => c,
          generateViewport: () => h,
        });
      var r = t(63033),
        n = t(26394),
        l = t(60442),
        i = (0, n.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\dashboard\\\\layout.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\layout.tsx",
          "default",
        );
      let o = { ...r },
        d =
          "workUnitAsyncStorage" in o
            ? o.workUnitAsyncStorage
            : "requestAsyncStorage" in o
              ? o.requestAsyncStorage
              : void 0;
      s =
        "function" == typeof i
          ? new Proxy(i, {
              apply: (e, a, t) => {
                let s, r, n;
                try {
                  let e = d?.getStore();
                  (s = e?.headers.get("sentry-trace") ?? void 0),
                    (r = e?.headers.get("baggage") ?? void 0),
                    (n = e?.headers);
                } catch (e) {}
                return l
                  .wrapServerComponentWithSentry(e, {
                    componentRoute: "/(authenticated)/dashboard",
                    componentType: "Layout",
                    sentryTraceHeader: s,
                    baggageHeader: r,
                    headers: n,
                  })
                  .apply(a, t);
              },
            })
          : i;
      let c = void 0,
        x = void 0,
        h = void 0,
        m = s;
    },
    97020: (e, a, t) => {
      "use strict";
      t.a(e, async (e, s) => {
        try {
          let d;
          t.r(a),
            t.d(a, {
              default: () => g,
              generateImageMetadata: () => m,
              generateMetadata: () => h,
              generateViewport: () => f,
            });
          var r = t(63033),
            n = t(35242),
            l = t(8630),
            i = t(60442),
            o = e([l]);
          l = (o.then ? (await o)() : o)[0];
          let c = { ...r },
            x =
              "workUnitAsyncStorage" in c
                ? c.workUnitAsyncStorage
                : "requestAsyncStorage" in c
                  ? c.requestAsyncStorage
                  : void 0;
          d = new Proxy(
            function () {
              return (0, n.jsxs)("div", {
                className: "flex flex-col h-screen",
                children: [
                  (0, n.jsx)("div", {
                    className:
                      "flex items-center justify-between px-4 py-2 border-b",
                    children: (0, n.jsx)(l.E, { className: "h-6 w-48" }),
                  }),
                  (0, n.jsxs)("div", {
                    className: "flex flex-1 overflow-hidden",
                    children: [
                      (0, n.jsx)("div", {
                        className: "w-64 h-screen border-r",
                        children: (0, n.jsx)(l.E, {
                          className: "h-screen w-full",
                        }),
                      }),
                      (0, n.jsx)("div", {
                        className: "flex-1 overflow-auto",
                        children: (0, n.jsxs)("div", {
                          className: "container mx-auto p-6",
                          children: [
                            (0, n.jsxs)("div", {
                              className:
                                "mb-6 flex items-center justify-between",
                              children: [
                                (0, n.jsx)(l.E, { className: "h-10 w-48" }),
                                (0, n.jsx)(l.E, { className: "h-10 w-28" }),
                              ],
                            }),
                            (0, n.jsxs)("div", {
                              className: "grid gap-4 md:grid-cols-3 mb-6",
                              children: [
                                (0, n.jsx)(l.E, {
                                  className: "h-28 w-full rounded-lg",
                                }),
                                (0, n.jsx)(l.E, {
                                  className: "h-28 w-full rounded-lg",
                                }),
                                (0, n.jsx)(l.E, {
                                  className: "h-28 w-full rounded-lg",
                                }),
                              ],
                            }),
                            (0, n.jsxs)("div", {
                              className: "space-y-4",
                              children: [
                                (0, n.jsx)(l.E, {
                                  className: "h-24 w-full rounded-lg",
                                }),
                                (0, n.jsx)(l.E, {
                                  className: "h-24 w-full rounded-lg",
                                }),
                                (0, n.jsx)(l.E, {
                                  className: "h-24 w-full rounded-lg",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              });
            },
            {
              apply: (e, a, t) => {
                let s, r, n;
                try {
                  let e = x?.getStore();
                  (s = e?.headers.get("sentry-trace") ?? void 0),
                    (r = e?.headers.get("baggage") ?? void 0),
                    (n = e?.headers);
                } catch (e) {}
                return i
                  .wrapServerComponentWithSentry(e, {
                    componentRoute: "/(authenticated)/dashboard",
                    componentType: "Loading",
                    sentryTraceHeader: s,
                    baggageHeader: r,
                    headers: n,
                  })
                  .apply(a, t);
              },
            },
          );
          let h = void 0,
            m = void 0,
            f = void 0,
            g = d;
          s();
        } catch (e) {
          s(e);
        }
      });
    },
  });
//# sourceMappingURL=6536.js.map
