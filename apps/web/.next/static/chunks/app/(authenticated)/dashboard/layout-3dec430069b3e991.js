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
    s = new e.Error().stack;
  s &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[s] = "ece55f77-c7b9-41db-811a-eb2c917985b9"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-ece55f77-c7b9-41db-811a-eb2c917985b9"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [527],
  {
    8979: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 9555));
    },
    9555: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => v });
      var r = a(30602),
        n = a(84418),
        t = a(50482),
        l = a(65266),
        i = a(33814),
        c = a(40972),
        o = a(75436),
        d = a(5768),
        x = a(91479),
        h = a(36350),
        f = a(90125),
        m = a(73869),
        g = a(97687),
        u = a.n(g),
        b = a(41960),
        y = a(85218),
        p = a(5271);
      function v(e) {
        let { children: s } = e,
          [a, g] = (0, y.useState)(!1),
          v = (0, b.usePathname)(),
          { user: j, signOut: N } = (0, n.useAuth)(),
          w = async () => {
            await N(), (window.location.href = "/login");
          },
          k = [
            { name: "Dashboard", href: "/dashboard", icon: t.A },
            { name: "Cases", href: "/dashboard/cases", icon: l.A },
            { name: "Clients", href: "/dashboard/clients", icon: i.A },
            { name: "Documents", href: "/dashboard/documents", icon: c.A },
            {
              name: "Immigration Status",
              href: "/dashboard/status",
              icon: o.A,
            },
            { name: "Roadmaps", href: "/dashboard/roadmaps", icon: d.A },
            { name: "Settings", href: "/dashboard/settings", icon: x.A },
          ],
          A = (e) => v === e || v.startsWith("".concat(e, "/"));
        return (0, r.jsxs)("div", {
          className: "h-screen flex overflow-hidden bg-gray-50",
          children: [
            (0, r.jsx)("div", {
              className: "md:hidden",
              children: (0, r.jsxs)("div", {
                className: "fixed inset-0 flex z-40 ".concat(
                  a ? "visible" : "invisible",
                ),
                children: [
                  (0, r.jsx)("div", {
                    className:
                      "fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-in-out duration-300 ".concat(
                        a ? "opacity-100" : "opacity-0",
                      ),
                    onClick: () => g(!1),
                  }),
                  (0, r.jsxs)("div", {
                    className:
                      "relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition ease-in-out duration-300 ".concat(
                        a ? "translate-x-0" : "-translate-x-full",
                      ),
                    children: [
                      (0, r.jsx)("div", {
                        className: "absolute top-0 right-0 -mr-12 pt-2",
                        children: (0, r.jsxs)("button", {
                          className:
                            "ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white",
                          onClick: () => g(!1),
                          children: [
                            (0, r.jsx)("span", {
                              className: "sr-only",
                              children: "Close sidebar",
                            }),
                            (0, r.jsx)(h.A, {
                              className: "h-6 w-6 text-white",
                            }),
                          ],
                        }),
                      }),
                      (0, r.jsxs)("div", {
                        className: "flex-1 h-0 pt-5 pb-4 overflow-y-auto",
                        children: [
                          (0, r.jsx)("div", {
                            className: "flex-shrink-0 flex items-center px-4",
                            children: (0, r.jsx)("h1", {
                              className: "text-xl font-bold text-gray-800",
                              children: "Hijraah",
                            }),
                          }),
                          (0, r.jsx)("nav", {
                            className: "mt-5 px-2 space-y-1",
                            children: k.map((e) =>
                              (0, r.jsxs)(
                                u(),
                                {
                                  href: e.href,
                                  className:
                                    "group flex items-center px-2 py-2 text-base font-medium rounded-md ".concat(
                                      A(e.href)
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                    ),
                                  legacyBehavior: !0,
                                  children: [
                                    (0, r.jsx)(e.icon, {
                                      className:
                                        "mr-4 flex-shrink-0 h-6 w-6 ".concat(
                                          A(e.href)
                                            ? "text-gray-600"
                                            : "text-gray-400 group-hover:text-gray-500",
                                        ),
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
                        children: (0, r.jsxs)(p.$, {
                          variant: "ghost",
                          onClick: w,
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
                          children: k.map((e) =>
                            (0, r.jsxs)(
                              u(),
                              {
                                href: e.href,
                                className:
                                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md ".concat(
                                    A(e.href)
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                  ),
                                legacyBehavior: !0,
                                children: [
                                  (0, r.jsx)(e.icon, {
                                    className:
                                      "mr-3 flex-shrink-0 h-6 w-6 ".concat(
                                        A(e.href)
                                          ? "text-gray-600"
                                          : "text-gray-400 group-hover:text-gray-500",
                                      ),
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
                      children: (0, r.jsxs)(p.$, {
                        variant: "ghost",
                        onClick: w,
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
                    onClick: () => g(!0),
                    children: [
                      (0, r.jsx)("span", {
                        className: "sr-only",
                        children: "Open sidebar",
                      }),
                      (0, r.jsx)(m.A, { className: "h-6 w-6" }),
                    ],
                  }),
                }),
                (0, r.jsx)("main", {
                  className:
                    "flex-1 relative z-0 overflow-y-auto focus:outline-none",
                  children: (0, r.jsx)("div", {
                    className: "py-6",
                    children: s,
                  }),
                }),
              ],
            }),
          ],
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(8979)), (_N_E = e.O());
  },
]);
