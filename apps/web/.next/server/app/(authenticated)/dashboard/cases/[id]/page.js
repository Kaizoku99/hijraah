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
    (e._sentryDebugIds[s] = "6f5e37c3-6ffd-4120-9ea4-5e151bbabc24"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-6f5e37c3-6ffd-4120-9ea4-5e151bbabc24"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 1312),
    (e.ids = [1312]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3519: (e, s, t) => {
        "use strict";
        t.r(s),
          t.d(s, {
            AuthProvider: () => d,
            useAuth: () => c,
            useHasPermission: () => p,
            useHasRole: () => m,
            useIsAuthenticated: () => h,
            useSession: () => x,
            useUser: () => u,
          });
        var r = t(61268),
          a = t(84205),
          i = t(32367),
          n = t(61460);
        function o(e) {
          if (!e) return null;
          let s = e.user_metadata?.role || "client",
            t = {
              theme: e.user_metadata?.settings_theme || "system",
              language: e.user_metadata?.settings_language || "en",
              emailNotifications:
                e.user_metadata?.settings_emailNotifications || !1,
              documentReminders:
                e.user_metadata?.settings_documentReminders || !1,
              applicationUpdates:
                e.user_metadata?.settings_applicationUpdates || !1,
              twoFactorAuth: e.user_metadata?.settings_twoFactorAuth || !1,
            };
          return {
            ...e,
            fullName:
              e.user_metadata?.full_name || e.email?.split("@")[0] || "User",
            avatarUrl: e.user_metadata?.avatar_url || "",
            role: s,
            isAdmin: "admin" === s,
            settings: t,
            hasTwoFactorAuth: () => t.twoFactorAuth,
            updateSettings: (s) => {
              let r = { ...t, ...s };
              return o({
                ...e,
                user_metadata: {
                  ...e.user_metadata,
                  settings_theme: r.theme,
                  settings_language: r.language,
                  settings_emailNotifications: r.emailNotifications,
                  settings_documentReminders: r.documentReminders,
                  settings_applicationUpdates: r.applicationUpdates,
                  settings_twoFactorAuth: r.twoFactorAuth,
                },
              });
            },
            toObject: () => ({
              id: e.id,
              email: e.email,
              fullName:
                e.user_metadata?.full_name || e.email?.split("@")[0] || "User",
              avatarUrl: e.user_metadata?.avatar_url || "",
              role: s,
              settings: t,
            }),
          };
        }
        let l = (0, a.createContext)(void 0);
        function d({ children: e }) {
          let [s, t] = (0, a.useState)(null),
            [n, d] = (0, a.useState)(null),
            [c, u] = (0, a.useState)(!0),
            h = (0, i.UU)(),
            m = (0, a.useCallback)(async () => {
              try {
                u(!0);
                let {
                  data: { session: e },
                  error: s,
                } = await h.auth.getSession();
                if (s) throw s;
                if (e) {
                  let {
                    data: { user: s },
                    error: r,
                  } = await h.auth.getUser();
                  if (r) throw r;
                  d(e), t(o(s));
                } else d(null), t(null);
              } catch (e) {
                console.error("Error refreshing session:", e), d(null), t(null);
              } finally {
                u(!1);
              }
            }, [h]),
            p = (0, a.useCallback)(
              async (e, s) => {
                u(!0);
                try {
                  if ("email" === e) {
                    if (!s?.email || !s?.password)
                      throw Error(
                        "Email and password required for email sign in",
                      );
                    let { data: e, error: r } = await h.auth.signInWithPassword(
                      { email: s.email, password: s.password },
                    );
                    if (r) throw r;
                    e?.session && (d(e.session), t(o(e.session.user)));
                  } else {
                    let { error: t } = await h.auth.signInWithOAuth({
                      provider: e,
                      options: s?.redirectTo
                        ? { redirectTo: s.redirectTo }
                        : void 0,
                    });
                    if (t) throw t;
                  }
                } catch (e) {
                  throw (console.error("Error signing in:", e), e);
                } finally {
                  u(!1);
                }
              },
              [h],
            ),
            x = (0, a.useCallback)(async () => {
              u(!0);
              try {
                let { error: e } = await h.auth.signOut();
                if (e) throw e;
                d(null), t(null);
              } catch (e) {
                console.error("Error signing out:", e);
              } finally {
                u(!1);
              }
            }, [h]),
            f = (0, a.useCallback)(
              async (e) => {
                u(!0);
                try {
                  if (!e.email || !e.password)
                    throw Error("Email and password required for sign up");
                  let { data: s, error: t } = await h.auth.signUp({
                    email: e.email,
                    password: e.password,
                    options: {
                      data: { full_name: e.fullName || "" },
                      emailRedirectTo:
                        e.redirectTo ||
                        `${window.location.origin}/auth/callback`,
                    },
                  });
                  if (t) throw t;
                  return s;
                } catch (e) {
                  throw (console.error("Error signing up:", e), e);
                } finally {
                  u(!1);
                }
              },
              [h],
            ),
            g = (0, a.useCallback)(
              async (e, s) => {
                u(!0);
                try {
                  let { error: t } = await h.auth.resetPasswordForEmail(e, {
                    redirectTo:
                      s || `${window.location.origin}/auth/reset-password`,
                  });
                  if (t) throw t;
                  return !0;
                } catch (e) {
                  throw (console.error("Error resetting password:", e), e);
                } finally {
                  u(!1);
                }
              },
              [h],
            ),
            w = (0, a.useCallback)(
              async (e) => {
                u(!0);
                try {
                  let { error: s } = await h.auth.updateUser({ password: e });
                  if (s) throw s;
                  return !0;
                } catch (e) {
                  throw (console.error("Error updating password:", e), e);
                } finally {
                  u(!1);
                }
              },
              [h],
            );
          return (0, r.jsx)(l.Provider, {
            value: {
              user: s,
              session: n,
              isLoading: c,
              isAuthenticated: !!n,
              signIn: p,
              signOut: x,
              refreshSession: m,
              signUp: f,
              resetPassword: g,
              updatePassword: w,
              error: null,
            },
            children: e,
          });
        }
        function c() {
          let e = (0, a.useContext)(l);
          if (void 0 === e)
            throw Error("useAuth must be used within an AuthProvider");
          return e;
        }
        function u() {
          let { user: e } = c();
          return e;
        }
        function h() {
          let { isAuthenticated: e } = c();
          return e;
        }
        function m(e) {
          let s = u();
          return s?.role === e;
        }
        function p(e) {
          let s = u();
          return (0, n._m)(s, e);
        }
        function x() {
          let e = (0, a.useContext)(l);
          if (void 0 === e)
            throw Error("useSession must be used within an AuthProvider");
          return {
            session: e.session,
            user: e.user,
            isLoading: e.isLoading,
            error: null,
            refreshSession: e.refreshSession,
          };
        }
      },
      5640: (e, s, t) => {
        "use strict";
        t.a(e, async (e, r) => {
          try {
            let d;
            t.r(s),
              t.d(s, {
                default: () => x,
                generateImageMetadata: () => m,
                generateMetadata: () => h,
                generateViewport: () => p,
              });
            var a = t(63033),
              i = t(35242),
              n = t(8630),
              o = t(60442),
              l = e([n]);
            n = (l.then ? (await l)() : l)[0];
            let c = { ...a },
              u =
                "workUnitAsyncStorage" in c
                  ? c.workUnitAsyncStorage
                  : "requestAsyncStorage" in c
                    ? c.requestAsyncStorage
                    : void 0;
            d = new Proxy(
              function () {
                return (0, i.jsxs)("div", {
                  className: "container mx-auto p-6 space-y-6",
                  children: [
                    (0, i.jsxs)("div", {
                      className: "flex items-center space-x-4 mb-6",
                      children: [
                        (0, i.jsx)(n.E, { className: "h-8 w-32" }),
                        (0, i.jsx)(n.E, { className: "h-8 w-16" }),
                      ],
                    }),
                    (0, i.jsxs)("div", {
                      className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                      children: [
                        (0, i.jsxs)("div", {
                          className: "col-span-2 space-y-6",
                          children: [
                            (0, i.jsx)(n.E, {
                              className: "h-64 w-full rounded-lg",
                            }),
                            (0, i.jsxs)("div", {
                              className: "space-y-4",
                              children: [
                                (0, i.jsx)(n.E, { className: "h-8 w-48" }),
                                (0, i.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, i.jsx)(n.E, {
                                      className: "h-12 w-full",
                                    }),
                                    (0, i.jsx)(n.E, {
                                      className: "h-12 w-full",
                                    }),
                                    (0, i.jsx)(n.E, {
                                      className: "h-12 w-3/4",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, i.jsxs)("div", {
                          className: "space-y-6",
                          children: [
                            (0, i.jsx)(n.E, {
                              className: "h-40 w-full rounded-lg",
                            }),
                            (0, i.jsx)(n.E, {
                              className: "h-60 w-full rounded-lg",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                });
              },
              {
                apply: (e, s, t) => {
                  let r, a, i;
                  try {
                    let e = u?.getStore();
                    (r = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(authenticated)/dashboard/cases/[id]",
                      componentType: "Loading",
                      sentryTraceHeader: r,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(s, t);
                },
              },
            );
            let h = void 0,
              m = void 0,
              p = void 0,
              x = d;
            r();
          } catch (e) {
            r(e);
          }
        });
      },
      5913: (e, s, t) => {
        "use strict";
        t.d(s, { pC: () => a });
        var r = t(32367);
        let a = {
          async getCases() {
            let e = (0, r.UU)(),
              { data: s, error: t } = await e
                .from("cases")
                .select("*")
                .order("created_at", { ascending: !1 });
            if (t) throw t;
            return s;
          },
          async getCaseById(e) {
            let s = (0, r.UU)(),
              { data: t, error: a } = await s
                .from("cases")
                .select("*")
                .eq("id", e)
                .single();
            if (a) throw a;
            return t;
          },
          async createCase(e) {
            let s = (0, r.UU)(),
              { data: t, error: a } = await s
                .from("cases")
                .insert(e)
                .select()
                .single();
            if (a) throw a;
            return t;
          },
          async updateCase(e, s) {
            let t = (0, r.UU)(),
              { data: a, error: i } = await t
                .from("cases")
                .update(s)
                .eq("id", e)
                .select()
                .single();
            if (i) throw i;
            return a;
          },
          async deleteCase(e) {
            let s = (0, r.UU)(),
              { error: t } = await s.from("cases").delete().eq("id", e);
            if (t) throw t;
          },
          async getCaseAnalytics() {
            let e = (0, r.UU)(),
              { data: s, error: t } = await e
                .from("cases")
                .select("status, type");
            if (t) throw t;
            return {
              total: s.length,
              byStatus: s.reduce(
                (e, s) => ((e[s.status] = (e[s.status] || 0) + 1), e),
                {},
              ),
              byType: s.reduce(
                (e, s) => ((e[s.type] = (e[s.type] || 0) + 1), e),
                {},
              ),
            };
          },
        };
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      15014: (e, s, t) => {
        "use strict";
        t.d(s, { A: () => r });
        let r = (0, t(95255).A)("Trash2", [
          ["path", { d: "M3 6h18", key: "d0wm0j" }],
          [
            "path",
            { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" },
          ],
          ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
          ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
          ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
        ]);
      },
      15668: (e) => {
        function s(e) {
          var s = Error("Cannot find module '" + e + "'");
          throw ((s.code = "MODULE_NOT_FOUND"), s);
        }
        (s.keys = () => []), (s.resolve = s), (s.id = 15668), (e.exports = s);
      },
      16363: (e, s, t) => {
        "use strict";
        t.a(e, async (e, r) => {
          try {
            t.d(s, { CaseDetail: () => C });
            var a = t(61268),
              i = t(81578),
              n = t(90286),
              o = t(36789),
              l = t(16498),
              d = t(15014),
              c = t(46299),
              u = t(99793),
              h = t(14677),
              m = t(89882),
              p = t(84205),
              x = t(77001),
              f = t(5913),
              g = t(75822),
              w = t(73638),
              y = t(46532),
              b = t(28909),
              j = t(5451),
              v = t(94812),
              N = t(15090),
              _ = e([x, w, y, b, j, v]);
            function C({ caseId: e }) {
              let s = (0, m.useRouter)(),
                { toast: t } = (0, N.d)(),
                [r, _] = (0, p.useState)(!0),
                [C, E] = (0, p.useState)(null),
                [A, P] = (0, p.useState)([]),
                [q, U] = (0, p.useState)("details"),
                k = (e) => {
                  switch (e) {
                    case "active":
                      return "bg-green-100 text-green-800 hover:bg-green-200";
                    case "pending":
                    case "pending_review":
                      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
                    case "in_progress":
                      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
                    case "completed":
                    case "approved":
                      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
                    case "rejected":
                      return "bg-red-100 text-red-800 hover:bg-red-200";
                    default:
                      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
                  }
                },
                S = (e) => {
                  if (!e) return "N/A";
                  try {
                    return (0, i.GP)(new Date(e), "MMM d, yyyy");
                  } catch (e) {
                    return "Invalid date";
                  }
                };
              (0, p.useCallback)(async () => {
                _(!0);
                try {
                  let [s, t] = await Promise.all([
                    f.pC.getCaseById(e),
                    g.wP.getDocuments(e),
                  ]);
                  E(s), P(t);
                } catch (e) {
                  console.error("Error fetching case details:", e),
                    t({
                      title: "Error",
                      description:
                        "Failed to load case details. Please try again.",
                      variant: "destructive",
                    });
                } finally {
                  _(!1);
                }
              }, [e, t]);
              let T = async () => {
                try {
                  await f.pC.deleteCase(e),
                    t({
                      title: "Success",
                      description: "Case deleted successfully.",
                    }),
                    s.push("/dashboard/cases");
                } catch (e) {
                  console.error("Error deleting case:", e),
                    t({
                      title: "Error",
                      description: "Failed to delete case. Please try again.",
                      variant: "destructive",
                    });
                }
              };
              return r
                ? (0, a.jsxs)("div", {
                    className: "container px-4 py-8 mx-auto",
                    children: [
                      (0, a.jsx)(v.E, { className: "h-8 w-32 mb-6" }),
                      (0, a.jsx)(v.E, { className: "h-12 w-full mb-8" }),
                      (0, a.jsx)(v.E, { className: "h-96 w-full" }),
                    ],
                  })
                : C
                  ? (0, a.jsxs)("div", {
                      className: "container px-4 py-8 mx-auto",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "flex items-center mb-6",
                          children: [
                            (0, a.jsxs)(b.$, {
                              variant: "ghost",
                              onClick: () => s.back(),
                              className: "mr-2",
                              children: [
                                (0, a.jsx)(n.A, { className: "mr-2 h-4 w-4" }),
                                " Back",
                              ],
                            }),
                            (0, a.jsx)("h1", {
                              className: "text-2xl font-bold",
                              children: C.title || "Case Details",
                            }),
                          ],
                        }),
                        (0, a.jsxs)("div", {
                          className:
                            "flex flex-col md:flex-row md:justify-between md:items-center mb-8",
                          children: [
                            (0, a.jsxs)("div", {
                              className: "flex items-center mb-4 md:mb-0",
                              children: [
                                (0, a.jsx)(y.E, {
                                  className: k(C.status),
                                  children: C.status?.replace("_", " "),
                                }),
                                (0, a.jsxs)("span", {
                                  className:
                                    "ml-4 text-sm text-muted-foreground",
                                  children: [
                                    (0, a.jsx)(o.A, {
                                      className: "inline h-4 w-4 mr-1",
                                    }),
                                    "Created: ",
                                    S(C.created_at),
                                  ],
                                }),
                              ],
                            }),
                            (0, a.jsxs)("div", {
                              className: "flex space-x-2",
                              children: [
                                (0, a.jsxs)(b.$, {
                                  variant: "outline",
                                  onClick: () =>
                                    s.push(`/dashboard/cases/${e}/edit`),
                                  children: [
                                    (0, a.jsx)(l.A, {
                                      className: "mr-2 h-4 w-4",
                                    }),
                                    " Edit",
                                  ],
                                }),
                                (0, a.jsxs)(w.Lt, {
                                  children: [
                                    (0, a.jsx)(w.tv, {
                                      asChild: !0,
                                      children: (0, a.jsxs)(b.$, {
                                        variant: "destructive",
                                        children: [
                                          (0, a.jsx)(d.A, {
                                            className: "mr-2 h-4 w-4",
                                          }),
                                          " Delete",
                                        ],
                                      }),
                                    }),
                                    (0, a.jsxs)(w.EO, {
                                      children: [
                                        (0, a.jsxs)(w.wd, {
                                          children: [
                                            (0, a.jsx)(w.r7, {
                                              children: "Are you sure?",
                                            }),
                                            (0, a.jsx)(w.$v, {
                                              children:
                                                "This will permanently delete this case and all its associated data. This action cannot be undone.",
                                            }),
                                          ],
                                        }),
                                        (0, a.jsxs)(w.ck, {
                                          children: [
                                            (0, a.jsx)(w.Zr, {
                                              children: "Cancel",
                                            }),
                                            (0, a.jsx)(w.Rx, {
                                              onClick: T,
                                              children: "Delete",
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
                        (0, a.jsxs)(x.Tabs, {
                          defaultValue: "details",
                          className: "mb-8",
                          onValueChange: U,
                          children: [
                            (0, a.jsxs)(x.TabsList, {
                              className:
                                "grid w-full md:w-auto grid-cols-3 mb-8",
                              children: [
                                (0, a.jsxs)(x.TabsTrigger, {
                                  value: "details",
                                  className: "flex items-center gap-2",
                                  children: [
                                    (0, a.jsx)(c.A, { className: "h-4 w-4" }),
                                    (0, a.jsx)("span", {
                                      className: "hidden md:inline",
                                      children: "Details",
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)(x.TabsTrigger, {
                                  value: "documents",
                                  className: "flex items-center gap-2",
                                  children: [
                                    (0, a.jsx)(u.A, { className: "h-4 w-4" }),
                                    (0, a.jsx)("span", {
                                      className: "hidden md:inline",
                                      children: "Documents",
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)(x.TabsTrigger, {
                                  value: "timeline",
                                  className: "flex items-center gap-2",
                                  children: [
                                    (0, a.jsx)(h.A, { className: "h-4 w-4" }),
                                    (0, a.jsx)("span", {
                                      className: "hidden md:inline",
                                      children: "Timeline",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, a.jsx)(x.TabsContent, {
                              value: "details",
                              children: (0, a.jsxs)(j.Zp, {
                                children: [
                                  (0, a.jsxs)(j.aR, {
                                    children: [
                                      (0, a.jsx)(j.ZB, {
                                        children: "Case Information",
                                      }),
                                      (0, a.jsx)(j.BT, {
                                        children:
                                          "Details and information about this immigration case",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)(j.Wu, {
                                    className: "space-y-4",
                                    children: [
                                      (0, a.jsxs)("div", {
                                        className: "grid md:grid-cols-2 gap-4",
                                        children: [
                                          (0, a.jsxs)("div", {
                                            children: [
                                              (0, a.jsx)("h3", {
                                                className:
                                                  "text-sm font-medium text-muted-foreground mb-1",
                                                children: "Case Number",
                                              }),
                                              (0, a.jsx)("p", {
                                                children:
                                                  C.case_number || "N/A",
                                              }),
                                            ],
                                          }),
                                          (0, a.jsxs)("div", {
                                            children: [
                                              (0, a.jsx)("h3", {
                                                className:
                                                  "text-sm font-medium text-muted-foreground mb-1",
                                                children: "Case Type",
                                              }),
                                              (0, a.jsx)("p", {
                                                children: C.case_type || "N/A",
                                              }),
                                            ],
                                          }),
                                          (0, a.jsxs)("div", {
                                            children: [
                                              (0, a.jsx)("h3", {
                                                className:
                                                  "text-sm font-medium text-muted-foreground mb-1",
                                                children: "Status",
                                              }),
                                              (0, a.jsx)(y.E, {
                                                className: k(C.status),
                                                children: C.status?.replace(
                                                  "_",
                                                  " ",
                                                ),
                                              }),
                                            ],
                                          }),
                                          (0, a.jsxs)("div", {
                                            children: [
                                              (0, a.jsx)("h3", {
                                                className:
                                                  "text-sm font-medium text-muted-foreground mb-1",
                                                children: "Created Date",
                                              }),
                                              (0, a.jsx)("p", {
                                                children: S(C.created_at),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, a.jsxs)("div", {
                                        children: [
                                          (0, a.jsx)("h3", {
                                            className:
                                              "text-sm font-medium text-muted-foreground mb-1",
                                            children: "Description",
                                          }),
                                          (0, a.jsx)("p", {
                                            className:
                                              "text-gray-600 dark:text-gray-400",
                                            children:
                                              C.description ||
                                              "No description provided",
                                          }),
                                        ],
                                      }),
                                      C.notes &&
                                        (0, a.jsxs)("div", {
                                          children: [
                                            (0, a.jsx)("h3", {
                                              className:
                                                "text-sm font-medium text-muted-foreground mb-1",
                                              children: "Notes",
                                            }),
                                            (0, a.jsx)("p", {
                                              className: "text-sm",
                                              children: C.notes,
                                            }),
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            (0, a.jsx)(x.TabsContent, {
                              value: "documents",
                              children: (0, a.jsxs)(j.Zp, {
                                children: [
                                  (0, a.jsxs)(j.aR, {
                                    children: [
                                      (0, a.jsx)(j.ZB, {
                                        children: "Documents",
                                      }),
                                      (0, a.jsx)(j.BT, {
                                        children:
                                          "Documents related to this case",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsx)(j.Wu, {
                                    children:
                                      0 === A.length
                                        ? (0, a.jsxs)("div", {
                                            className: "text-center py-8",
                                            children: [
                                              (0, a.jsx)(u.A, {
                                                className:
                                                  "h-12 w-12 mx-auto text-muted-foreground mb-4",
                                              }),
                                              (0, a.jsx)("h3", {
                                                className:
                                                  "text-lg font-medium",
                                                children: "No documents found",
                                              }),
                                              (0, a.jsx)("p", {
                                                className:
                                                  "text-muted-foreground mb-4",
                                                children:
                                                  "Upload documents for this case",
                                              }),
                                              (0, a.jsx)(b.$, {
                                                onClick: () =>
                                                  s.push(
                                                    `/dashboard/cases/${e}/documents/upload`,
                                                  ),
                                                children: "Upload Document",
                                              }),
                                            ],
                                          })
                                        : (0, a.jsx)("div", {
                                            className: "grid gap-4",
                                            children: A.map((e) =>
                                              (0, a.jsxs)(
                                                "div",
                                                {
                                                  className:
                                                    "flex items-center justify-between p-4 border rounded-lg",
                                                  children: [
                                                    (0, a.jsxs)("div", {
                                                      className:
                                                        "flex items-center",
                                                      children: [
                                                        (0, a.jsx)(u.A, {
                                                          className:
                                                            "h-5 w-5 mr-3 text-blue-500",
                                                        }),
                                                        (0, a.jsxs)("div", {
                                                          children: [
                                                            (0, a.jsx)("h4", {
                                                              className:
                                                                "font-medium",
                                                              children: e.name,
                                                            }),
                                                            (0, a.jsxs)("p", {
                                                              className:
                                                                "text-sm text-muted-foreground",
                                                              children: [
                                                                "Uploaded on ",
                                                                S(e.created_at),
                                                              ],
                                                            }),
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                    (0, a.jsx)(b.$, {
                                                      variant: "ghost",
                                                      size: "sm",
                                                      onClick: () =>
                                                        s.push(
                                                          `/dashboard/documents/${e.id}`,
                                                        ),
                                                      children: "View",
                                                    }),
                                                  ],
                                                },
                                                e.id,
                                              ),
                                            ),
                                          }),
                                  }),
                                ],
                              }),
                            }),
                            (0, a.jsx)(x.TabsContent, {
                              value: "timeline",
                              children: (0, a.jsxs)(j.Zp, {
                                children: [
                                  (0, a.jsxs)(j.aR, {
                                    children: [
                                      (0, a.jsx)(j.ZB, {
                                        children: "Case Timeline",
                                      }),
                                      (0, a.jsx)(j.BT, {
                                        children:
                                          "History and progress of this case",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsx)(j.Wu, {
                                    children: (0, a.jsxs)("div", {
                                      className: "text-center py-8",
                                      children: [
                                        (0, a.jsx)(h.A, {
                                          className:
                                            "h-12 w-12 mx-auto text-muted-foreground mb-4",
                                        }),
                                        (0, a.jsx)("h3", {
                                          className: "text-lg font-medium",
                                          children: "Timeline Coming Soon",
                                        }),
                                        (0, a.jsx)("p", {
                                          className: "text-muted-foreground",
                                          children:
                                            "Timeline feature is under development",
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
                  : (0, a.jsxs)("div", {
                      className: "container px-4 py-8 mx-auto",
                      children: [
                        (0, a.jsxs)(b.$, {
                          variant: "ghost",
                          onClick: () => s.back(),
                          className: "mb-6",
                          children: [
                            (0, a.jsx)(n.A, { className: "mr-2 h-4 w-4" }),
                            " Back",
                          ],
                        }),
                        (0, a.jsxs)(j.Zp, {
                          children: [
                            (0, a.jsxs)(j.aR, {
                              children: [
                                (0, a.jsx)(j.ZB, {
                                  children: "Case Not Found",
                                }),
                                (0, a.jsx)(j.BT, {
                                  children:
                                    "The case you are looking for does not exist or you don't have permission to view it.",
                                }),
                              ],
                            }),
                            (0, a.jsx)(j.wL, {
                              children: (0, a.jsx)(b.$, {
                                onClick: () => s.push("/dashboard/cases"),
                                children: "Go to Cases",
                              }),
                            }),
                          ],
                        }),
                      ],
                    });
            }
            ([x, w, y, b, j, v] = _.then ? (await _)() : _), r();
          } catch (e) {
            r(e);
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
      29637: (e, s, t) => {
        "use strict";
        t.d(s, { CaseDetail: () => r });
        let r = (0, t(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call CaseDetail() from the server but CaseDetail is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\presentation\\cases\\case-detail.tsx",
          "CaseDetail",
        );
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      32367: (e, s, t) => {
        "use strict";
        let r;
        t.d(s, { AG: () => g, Iw: () => x, UU: () => f });
        var a = t(97713),
          i = t(15149),
          n = t.n(i),
          o = t(84205);
        let { fetch: l } = n()(),
          d = "http://localhost:54321",
          c =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          u = process.env.SUPABASE_SERVICE_ROLE_KEY,
          h = c ? { apikey: c } : void 0;
        function m() {
          if (!d || !c)
            throw (
              (console.error(
                "Missing environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
              ),
              Error("Supabase URL or Anon Key is missing."))
            );
        }
        {
          let e = globalThis;
          e.__USING_PONYFETCH__ ||
            ((e.fetch = l), (e.__USING_PONYFETCH__ = !0));
        }
        function p() {
          return (m(), r)
            ? r
            : (r = (0, a.createBrowserClient)(d, c, {
                global: { headers: h },
              }));
        }
        function x() {
          return (0, o.useMemo)(p, []);
        }
        function f() {
          return (
            m(), (0, a.createBrowserClient)(d, c, { global: { headers: h } })
          );
        }
        let g = p;
        p();
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
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
      59570: () => {},
      60196: (e, s, t) => {
        "use strict";
        t.r(s),
          t.d(s, {
            GlobalError: () => i.default,
            __next_app__: () => c,
            pages: () => d,
            routeModule: () => u,
            tree: () => l,
          });
        var r = t(11610),
          a = t(51293),
          i = t(59059),
          n = t(17770),
          o = {};
        for (let e in n)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (o[e] = () => n[e]);
        t.d(s, o);
        let l = {
            children: [
              "",
              {
                children: [
                  "(authenticated)",
                  {
                    children: [
                      "dashboard",
                      {
                        children: [
                          "cases",
                          {
                            children: [
                              "[id]",
                              {
                                children: [
                                  "__PAGE__",
                                  {},
                                  {
                                    page: [
                                      () =>
                                        Promise.resolve().then(
                                          t.bind(t, 60883),
                                        ),
                                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\cases\\[id]\\page.tsx",
                                    ],
                                  },
                                ],
                              },
                              {
                                loading: [
                                  () => Promise.resolve().then(t.bind(t, 5640)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\cases\\[id]\\loading.tsx",
                                ],
                              },
                            ],
                          },
                          {},
                        ],
                      },
                      {
                        layout: [
                          () => Promise.resolve().then(t.bind(t, 73856)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\layout.tsx",
                        ],
                        loading: [
                          () => Promise.resolve().then(t.bind(t, 97020)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\loading.tsx",
                        ],
                      },
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(t.bind(t, 72967)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\layout.tsx",
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
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\cases\\[id]\\page.tsx",
          ],
          c = { require: t, loadChunk: () => Promise.resolve() },
          u = new r.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/dashboard/cases/[id]/page",
              pathname: "/dashboard/cases/[id]",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      60883: (e, s, t) => {
        "use strict";
        let r;
        t.r(s),
          t.d(s, {
            default: () => p,
            generateImageMetadata: () => h,
            generateMetadata: () => u,
            generateViewport: () => m,
            metadata: () => l,
          });
        var a = t(63033),
          i = t(35242),
          n = t(29637),
          o = t(60442);
        let l = {
            title: "Case Details | Hijraah Immigration Platform",
            description: "View and manage case details",
          },
          d = { ...a },
          c =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        r = new Proxy(
          function ({ params: e }) {
            return (0, i.jsx)(n.CaseDetail, { id: e.id });
          },
          {
            apply: (e, s, t) => {
              let r, a, i;
              try {
                let e = c?.getStore();
                (r = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (i = e?.headers);
              } catch (e) {}
              return o
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/(authenticated)/dashboard/cases/[id]",
                  componentType: "Page",
                  sentryTraceHeader: r,
                  baggageHeader: a,
                  headers: i,
                })
                .apply(s, t);
            },
          },
        );
        let u = void 0,
          h = void 0,
          m = void 0,
          p = r;
      },
      61460: (e, s, t) => {
        "use strict";
        t.d(s, { _m: () => h });
        class r extends Error {
          constructor(e, s, t, r) {
            super(e),
              (this.name = "AuthError"),
              (this.code = s),
              (this.status = r),
              (this.originalError = t);
          }
          toJSON() {
            return {
              name: this.name,
              message: this.message,
              code: this.code,
              status: this.status,
            };
          }
          toResponse() {
            return new Response(
              JSON.stringify({
                error: { message: this.message, code: this.code },
              }),
              {
                status: this.status || 500,
                headers: { "Content-Type": "application/json" },
              },
            );
          }
        }
        class a extends r {
          constructor(e = "Authentication required", s) {
            super(e, "auth/unauthorized", s, 401),
              (this.name = "UnauthorizedError");
          }
        }
        class i extends r {
          constructor(e = "Insufficient permissions", s) {
            super(e, "auth/forbidden", s, 403), (this.name = "ForbiddenError");
          }
        }
        class n extends r {
          constructor(e = "Session error", s) {
            super(e, "auth/session-error", s, 400),
              (this.name = "SessionError");
          }
        }
        class o extends r {
          constructor(e = "Invalid credentials", s) {
            super(e, "auth/invalid-credentials", s, 401),
              (this.name = "InvalidCredentialsError");
          }
        }
        class l extends r {
          constructor(e = "User operation failed", s) {
            super(e, "auth/user-operation-failed", s, 400),
              (this.name = "UserOperationError");
          }
        }
        let d = { roles: {}, superAdminRole: "admin", enableCache: !0 };
        class c {
          constructor(e = {}) {
            this.permissionCache = new Map();
            let s = { ...d, ...e };
            (this.roles = s.roles || {}),
              (this.superAdminRole = s.superAdminRole || "admin"),
              (this.enableCache = s.enableCache ?? !0),
              (this.extractRoles =
                s.extractRoles || ((e) => [e.role || "user"]));
          }
          defineRole(e) {
            (this.roles[e.name] = e),
              this.enableCache && this.permissionCache.clear();
          }
          defineRoles(e) {
            (this.roles = { ...this.roles, ...e }),
              this.enableCache && this.permissionCache.clear();
          }
          getRolePermissions(e, s = new Set()) {
            if (s.has(e)) return new Set();
            s.add(e);
            let t = this.roles[e];
            if (!t) return new Set();
            let r = new Set(t.permissions);
            if (t.inherits && t.inherits.length > 0)
              for (let e of t.inherits)
                this.getRolePermissions(e, s).forEach((e) => r.add(e));
            return r;
          }
          getUserPermissions(e) {
            if (!e) return new Set();
            let s = this.extractRoles(e);
            if (s.includes(this.superAdminRole)) return new Set(["*"]);
            if (this.enableCache) {
              let e = s.sort().join(","),
                t = this.permissionCache.get(e);
              if (t) return t;
            }
            let t = new Set();
            for (let e of s)
              this.getRolePermissions(e).forEach((e) => t.add(e));
            if (this.enableCache && s.length > 0) {
              let e = s.sort().join(",");
              this.permissionCache.set(e, t);
            }
            return t;
          }
          hasRole(e, s) {
            if (!e) return !1;
            let t = this.extractRoles(e);
            return t.includes(s) || t.includes(this.superAdminRole);
          }
          hasPermission(e, s) {
            if (!e) return !1;
            let t = this.getUserPermissions(e);
            if (t.has("*") || t.has(s)) return !0;
            let r = s.split(":");
            for (let e = 1; e <= r.length; e++) {
              let s = [...r.slice(0, e), "*"].join(":");
              if (t.has(s)) return !0;
            }
            return !1;
          }
          hasAnyPermission(e, s) {
            return s.some((s) => this.hasPermission(e, s));
          }
          hasAllPermissions(e, s) {
            return s.every((s) => this.hasPermission(e, s));
          }
          enforcePermission(e, s) {
            if (!this.hasPermission(e, s))
              throw new i(`Missing required permission: ${s}`);
          }
          enforceAnyPermission(e, s) {
            if (!this.hasAnyPermission(e, s))
              throw new i(
                `Missing at least one of the required permissions: ${s.join(", ")}`,
              );
          }
          enforceAllPermissions(e, s) {
            if (!this.hasAllPermissions(e, s))
              throw new i(
                `Missing some of the required permissions: ${s.join(", ")}`,
              );
          }
          createPermission(e, s) {
            return `${e}:${s}`;
          }
        }
        let u = null;
        function h(e, s) {
          var t;
          return (u || (u = new c(void 0)), u).hasPermission(e, s);
        }
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73338: (e, s, t) => {
        Promise.resolve().then(t.bind(t, 16363));
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
      75822: (e, s, t) => {
        "use strict";
        t.d(s, { wP: () => a });
        var r = t(32367);
        let a = {
          async getDocuments(e) {
            let s = (0, r.UU)()
              .from("documents")
              .select("*")
              .order("created_at", { ascending: !1 });
            e && s.eq("case_id", e);
            let { data: t, error: a } = await s;
            if (a) throw a;
            return t;
          },
          async getDocumentById(e) {
            let s = (0, r.UU)(),
              { data: t, error: a } = await s
                .from("documents")
                .select("*")
                .eq("id", e)
                .single();
            if (a) throw a;
            return t;
          },
          async uploadDocument(e, s) {
            let t = (0, r.UU)(),
              a = e.name.split(".").pop(),
              i = `${s}/${Date.now()}.${a}`,
              { data: n, error: o } = await t.storage
                .from("documents")
                .upload(i, e);
            if (o) throw o;
            let {
                data: { publicUrl: l },
              } = t.storage.from("documents").getPublicUrl(i),
              { data: d, error: c } = await t
                .from("documents")
                .insert({
                  case_id: s,
                  name: e.name,
                  type: e.type,
                  size: e.size,
                  url: l,
                  path: i,
                })
                .select()
                .single();
            if (c) throw c;
            return d;
          },
          async deleteDocument(e) {
            let s = (0, r.UU)(),
              { data: t, error: a } = await s
                .from("documents")
                .select("path")
                .eq("id", e)
                .single();
            if (a) throw a;
            if (t?.path) {
              let { error: e } = await s.storage
                .from("documents")
                .remove([t.path]);
              if (e) throw e;
            }
            let { error: i } = await s.from("documents").delete().eq("id", e);
            if (i) throw i;
          },
        };
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
      83954: (e, s, t) => {
        Promise.resolve().then(t.bind(t, 29637));
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
      90286: (e, s, t) => {
        "use strict";
        t.d(s, { A: () => r });
        let r = (0, t(95255).A)("ArrowLeft", [
          ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
          ["path", { d: "M19 12H5", key: "x3x0zl" }],
        ]);
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      96648: (e, s, t) => {
        "use strict";
        t.d(s, { A: () => r });
        let r = (0, t(95255).A)("LogOut", [
          [
            "path",
            { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" },
          ],
          ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
          ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }],
        ]);
      },
    });
  var s = require("../../../../../webpack-runtime.js");
  s.C(e);
  var t = (e) => s((s.s = e)),
    r = s.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        4990, 6188, 7272, 1578, 6777, 4630, 6536, 8730,
      ],
      () => t(60196),
    );
  module.exports = r;
})();
//# sourceMappingURL=page.js.map
