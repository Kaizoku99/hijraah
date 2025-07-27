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
    (e._sentryDebugIds[s] = "3fb86159-5829-42ed-84d4-89cfc7c022c0"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3fb86159-5829-42ed-84d4-89cfc7c022c0"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4748],
  {
    3332: (e, s, n) => {
      "use strict";
      n.r(s), n.d(s, { default: () => u });
      var i = n(30602),
        l = n(85218),
        a = n(84418),
        r = n(51347),
        t = n(5271),
        d = n(77413),
        c = n(86697);
      function u() {
        var e, s;
        let n = (0, a.useAuth)(),
          u = (0, a.useUser)(),
          h = (0, a.useIsAuthenticated)(),
          o = (0, a.useHasRole)("admin"),
          [x, j] = (0, l.useState)(""),
          [m, g] = (0, l.useState)(""),
          [p, v] = (0, l.useState)(null),
          [b, f] = (0, l.useState)(""),
          y = !!u && (0, r._m)(u, "users:view"),
          N = async () => {
            try {
              let e = await n.signIn({ email: x, password: m });
              v({ success: !0, data: e });
            } catch (e) {
              v({ success: !1, error: e });
            }
          },
          w = async () => {
            try {
              await n.signOut(),
                v({ success: !0, message: "Signed out successfully" });
            } catch (e) {
              v({ success: !1, error: e });
            }
          };
        return (
          (0, l.useEffect)(() => {}, [u, h, o]),
          (0, i.jsxs)("div", {
            className: "container mx-auto py-10",
            children: [
              (0, i.jsx)("h1", {
                className: "text-3xl font-bold mb-8 text-center",
                children: "Auth System Test Page",
              }),
              (0, i.jsxs)(c.Tabs, {
                defaultValue: "status",
                children: [
                  (0, i.jsxs)(c.TabsList, {
                    className: "grid w-full grid-cols-4",
                    children: [
                      (0, i.jsx)(c.TabsTrigger, {
                        value: "status",
                        children: "Auth Status",
                      }),
                      (0, i.jsx)(c.TabsTrigger, {
                        value: "signin",
                        children: "Sign In",
                      }),
                      (0, i.jsx)(c.TabsTrigger, {
                        value: "permissions",
                        children: "Permissions",
                      }),
                      (0, i.jsx)(c.TabsTrigger, {
                        value: "debug",
                        children: "Debug",
                      }),
                    ],
                  }),
                  (0, i.jsx)(c.TabsContent, {
                    value: "status",
                    children: (0, i.jsxs)(d.Zp, {
                      children: [
                        (0, i.jsxs)(d.aR, {
                          children: [
                            (0, i.jsx)(d.ZB, {
                              children: "Authentication Status",
                            }),
                            (0, i.jsx)(d.BT, {
                              children:
                                "Current user authentication information",
                            }),
                          ],
                        }),
                        (0, i.jsx)(d.Wu, {
                          children: (0, i.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                              (0, i.jsxs)("div", {
                                children: [
                                  (0, i.jsx)("strong", {
                                    children: "Authenticated:",
                                  }),
                                  " ",
                                  h ? "✅ Yes" : "❌ No",
                                ],
                              }),
                              u &&
                                (0, i.jsxs)(i.Fragment, {
                                  children: [
                                    (0, i.jsxs)("div", {
                                      children: [
                                        (0, i.jsx)("strong", {
                                          children: "User ID:",
                                        }),
                                        " ",
                                        u.id,
                                      ],
                                    }),
                                    (0, i.jsxs)("div", {
                                      children: [
                                        (0, i.jsx)("strong", {
                                          children: "Email:",
                                        }),
                                        " ",
                                        u.email,
                                      ],
                                    }),
                                    (0, i.jsxs)("div", {
                                      children: [
                                        (0, i.jsx)("strong", {
                                          children: "Name:",
                                        }),
                                        " ",
                                        (null == (e = u.user_metadata)
                                          ? void 0
                                          : e.full_name) || "Not set",
                                      ],
                                    }),
                                    (0, i.jsxs)("div", {
                                      children: [
                                        (0, i.jsx)("strong", {
                                          children: "Role:",
                                        }),
                                        " ",
                                        (null == (s = u.user_metadata)
                                          ? void 0
                                          : s.role) || "Not set",
                                      ],
                                    }),
                                    (0, i.jsxs)("div", {
                                      children: [
                                        (0, i.jsx)("strong", {
                                          children: "Is Admin:",
                                        }),
                                        " ",
                                        o ? "✅ Yes" : "❌ No",
                                      ],
                                    }),
                                    (0, i.jsxs)("div", {
                                      children: [
                                        (0, i.jsx)("strong", {
                                          children: "Can Access Users:",
                                        }),
                                        " ",
                                        y ? "✅ Yes" : "❌ No",
                                      ],
                                    }),
                                  ],
                                }),
                            ],
                          }),
                        }),
                        (0, i.jsx)(d.wL, {
                          children: h
                            ? (0, i.jsx)(t.$, {
                                onClick: w,
                                variant: "destructive",
                                children: "Sign Out",
                              })
                            : (0, i.jsx)(t.$, {
                                disabled: !0,
                                children: "Not Signed In",
                              }),
                        }),
                      ],
                    }),
                  }),
                  (0, i.jsx)(c.TabsContent, {
                    value: "signin",
                    children: (0, i.jsxs)(d.Zp, {
                      children: [
                        (0, i.jsxs)(d.aR, {
                          children: [
                            (0, i.jsx)(d.ZB, { children: "Sign In" }),
                            (0, i.jsx)(d.BT, {
                              children: "Test signing in with credentials",
                            }),
                          ],
                        }),
                        (0, i.jsx)(d.Wu, {
                          children: (0, i.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                              (0, i.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  (0, i.jsx)("label", {
                                    className: "text-sm font-medium",
                                    children: "Email",
                                  }),
                                  (0, i.jsx)("input", {
                                    type: "email",
                                    value: x,
                                    onChange: (e) => j(e.target.value),
                                    className: "w-full p-2 border rounded-md",
                                    placeholder: "email@example.com",
                                  }),
                                ],
                              }),
                              (0, i.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  (0, i.jsx)("label", {
                                    className: "text-sm font-medium",
                                    children: "Password",
                                  }),
                                  (0, i.jsx)("input", {
                                    type: "password",
                                    value: m,
                                    onChange: (e) => g(e.target.value),
                                    className: "w-full p-2 border rounded-md",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                        (0, i.jsx)(d.wL, {
                          children: (0, i.jsx)(t.$, {
                            onClick: N,
                            children: "Sign In",
                          }),
                        }),
                      ],
                    }),
                  }),
                  (0, i.jsx)(c.TabsContent, {
                    value: "permissions",
                    children: (0, i.jsxs)(d.Zp, {
                      children: [
                        (0, i.jsxs)(d.aR, {
                          children: [
                            (0, i.jsx)(d.ZB, { children: "Test Permissions" }),
                            (0, i.jsx)(d.BT, {
                              children:
                                "Check if the current user has specific permissions",
                            }),
                          ],
                        }),
                        (0, i.jsx)(d.Wu, {
                          children: (0, i.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                              (0, i.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  (0, i.jsx)("label", {
                                    className: "text-sm font-medium",
                                    children: "Permission",
                                  }),
                                  (0, i.jsx)("input", {
                                    type: "text",
                                    value: b,
                                    onChange: (e) => f(e.target.value),
                                    className: "w-full p-2 border rounded-md",
                                    placeholder: "e.g. users:view",
                                  }),
                                ],
                              }),
                              (0, i.jsx)("div", {
                                children: (0, i.jsx)("p", {
                                  className: "text-sm text-gray-500",
                                  children:
                                    "Examples: users:view, applications:manage, system:settings",
                                }),
                              }),
                            ],
                          }),
                        }),
                        (0, i.jsx)(d.wL, {
                          children: (0, i.jsx)(t.$, {
                            onClick: () => {
                              try {
                                let e = !!u && (0, r._m)(u, b);
                                v({
                                  success: !0,
                                  message: "Permission check: ".concat(b),
                                  hasAccess: e,
                                });
                              } catch (e) {
                                v({ success: !1, error: e });
                              }
                            },
                            disabled: !h,
                            children: "Test Permission",
                          }),
                        }),
                      ],
                    }),
                  }),
                  (0, i.jsx)(c.TabsContent, {
                    value: "debug",
                    children: (0, i.jsxs)(d.Zp, {
                      children: [
                        (0, i.jsxs)(d.aR, {
                          children: [
                            (0, i.jsx)(d.ZB, { children: "Debug Information" }),
                            (0, i.jsx)(d.BT, {
                              children: "Raw data and operation results",
                            }),
                          ],
                        }),
                        (0, i.jsx)(d.Wu, {
                          children: (0, i.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                              (0, i.jsxs)("div", {
                                children: [
                                  (0, i.jsx)("strong", {
                                    children: "Last Operation Result:",
                                  }),
                                  (0, i.jsx)("pre", {
                                    className:
                                      "mt-2 p-4 bg-gray-100 rounded-md overflow-auto max-h-60",
                                    children: p
                                      ? JSON.stringify(p, null, 2)
                                      : "No operations performed yet",
                                  }),
                                ],
                              }),
                              (0, i.jsxs)("div", {
                                children: [
                                  (0, i.jsx)("strong", {
                                    children: "User Object:",
                                  }),
                                  (0, i.jsx)("pre", {
                                    className:
                                      "mt-2 p-4 bg-gray-100 rounded-md overflow-auto max-h-60",
                                    children: u
                                      ? JSON.stringify(u, null, 2)
                                      : "No user data",
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
            ],
          })
        );
      }
    },
    86648: (e, s, n) => {
      Promise.resolve().then(n.bind(n, 3332));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [4223, 6593, 3209, 7358], () => s(86648)), (_N_E = e.O());
  },
]);
