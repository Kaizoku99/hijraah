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
    (e._sentryDebugIds[t] = "153c6104-0b71-47a0-a375-6b5a139296f2"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-153c6104-0b71-47a0-a375-6b5a139296f2"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 7002),
    (e.ids = [7002]),
    (e.modules = {
      3068: (e, t, s) => {
        "use strict";
        s.r(t),
          s.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => c,
            pages: () => l,
            routeModule: () => u,
            tree: () => d,
          });
        var r = s(11610),
          a = s(51293),
          i = s(59059),
          n = s(17770),
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
        s.d(t, o);
        let d = {
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
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(s.bind(s, 89702)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\cases\\page.tsx",
                                ],
                              },
                            ],
                          },
                          {},
                        ],
                      },
                      {
                        layout: [
                          () => Promise.resolve().then(s.bind(s, 73856)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\layout.tsx",
                        ],
                        loading: [
                          () => Promise.resolve().then(s.bind(s, 97020)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\loading.tsx",
                        ],
                      },
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(s.bind(s, 72967)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\layout.tsx",
                    ],
                    forbidden: [
                      () => Promise.resolve().then(s.t.bind(s, 57382, 23)),
                      "next/dist/client/components/forbidden-error",
                    ],
                    unauthorized: [
                      () => Promise.resolve().then(s.t.bind(s, 87039, 23)),
                      "next/dist/client/components/unauthorized-error",
                    ],
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(s.bind(s, 22630)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\layout.tsx",
                ],
                error: [
                  () => Promise.resolve().then(s.bind(s, 94745)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
                ],
                "global-error": [
                  () => Promise.resolve().then(s.bind(s, 59059)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(s.bind(s, 53974)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
                ],
                forbidden: [
                  () => Promise.resolve().then(s.t.bind(s, 57382, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(s.t.bind(s, 87039, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          l = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\cases\\page.tsx",
          ],
          c = { require: s, loadChunk: () => Promise.resolve() },
          u = new r.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/dashboard/cases/page",
              pathname: "/dashboard/cases",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3519: (e, t, s) => {
        "use strict";
        s.r(t),
          s.d(t, {
            AuthProvider: () => l,
            useAuth: () => c,
            useHasPermission: () => m,
            useHasRole: () => p,
            useIsAuthenticated: () => h,
            useSession: () => f,
            useUser: () => u,
          });
        var r = s(61268),
          a = s(84205),
          i = s(32367),
          n = s(61460);
        function o(e) {
          if (!e) return null;
          let t = e.user_metadata?.role || "client",
            s = {
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
            role: t,
            isAdmin: "admin" === t,
            settings: s,
            hasTwoFactorAuth: () => s.twoFactorAuth,
            updateSettings: (t) => {
              let r = { ...s, ...t };
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
              role: t,
              settings: s,
            }),
          };
        }
        let d = (0, a.createContext)(void 0);
        function l({ children: e }) {
          let [t, s] = (0, a.useState)(null),
            [n, l] = (0, a.useState)(null),
            [c, u] = (0, a.useState)(!0),
            h = (0, i.UU)(),
            p = (0, a.useCallback)(async () => {
              try {
                u(!0);
                let {
                  data: { session: e },
                  error: t,
                } = await h.auth.getSession();
                if (t) throw t;
                if (e) {
                  let {
                    data: { user: t },
                    error: r,
                  } = await h.auth.getUser();
                  if (r) throw r;
                  l(e), s(o(t));
                } else l(null), s(null);
              } catch (e) {
                console.error("Error refreshing session:", e), l(null), s(null);
              } finally {
                u(!1);
              }
            }, [h]),
            m = (0, a.useCallback)(
              async (e, t) => {
                u(!0);
                try {
                  if ("email" === e) {
                    if (!t?.email || !t?.password)
                      throw Error(
                        "Email and password required for email sign in",
                      );
                    let { data: e, error: r } = await h.auth.signInWithPassword(
                      { email: t.email, password: t.password },
                    );
                    if (r) throw r;
                    e?.session && (l(e.session), s(o(e.session.user)));
                  } else {
                    let { error: s } = await h.auth.signInWithOAuth({
                      provider: e,
                      options: t?.redirectTo
                        ? { redirectTo: t.redirectTo }
                        : void 0,
                    });
                    if (s) throw s;
                  }
                } catch (e) {
                  throw (console.error("Error signing in:", e), e);
                } finally {
                  u(!1);
                }
              },
              [h],
            ),
            f = (0, a.useCallback)(async () => {
              u(!0);
              try {
                let { error: e } = await h.auth.signOut();
                if (e) throw e;
                l(null), s(null);
              } catch (e) {
                console.error("Error signing out:", e);
              } finally {
                u(!1);
              }
            }, [h]),
            g = (0, a.useCallback)(
              async (e) => {
                u(!0);
                try {
                  if (!e.email || !e.password)
                    throw Error("Email and password required for sign up");
                  let { data: t, error: s } = await h.auth.signUp({
                    email: e.email,
                    password: e.password,
                    options: {
                      data: { full_name: e.fullName || "" },
                      emailRedirectTo:
                        e.redirectTo ||
                        `${window.location.origin}/auth/callback`,
                    },
                  });
                  if (s) throw s;
                  return t;
                } catch (e) {
                  throw (console.error("Error signing up:", e), e);
                } finally {
                  u(!1);
                }
              },
              [h],
            ),
            x = (0, a.useCallback)(
              async (e, t) => {
                u(!0);
                try {
                  let { error: s } = await h.auth.resetPasswordForEmail(e, {
                    redirectTo:
                      t || `${window.location.origin}/auth/reset-password`,
                  });
                  if (s) throw s;
                  return !0;
                } catch (e) {
                  throw (console.error("Error resetting password:", e), e);
                } finally {
                  u(!1);
                }
              },
              [h],
            ),
            b = (0, a.useCallback)(
              async (e) => {
                u(!0);
                try {
                  let { error: t } = await h.auth.updateUser({ password: e });
                  if (t) throw t;
                  return !0;
                } catch (e) {
                  throw (console.error("Error updating password:", e), e);
                } finally {
                  u(!1);
                }
              },
              [h],
            );
          return (0, r.jsx)(d.Provider, {
            value: {
              user: t,
              session: n,
              isLoading: c,
              isAuthenticated: !!n,
              signIn: m,
              signOut: f,
              refreshSession: p,
              signUp: g,
              resetPassword: x,
              updatePassword: b,
              error: null,
            },
            children: e,
          });
        }
        function c() {
          let e = (0, a.useContext)(d);
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
        function p(e) {
          let t = u();
          return t?.role === e;
        }
        function m(e) {
          let t = u();
          return (0, n._m)(t, e);
        }
        function f() {
          let e = (0, a.useContext)(d);
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
      5913: (e, t, s) => {
        "use strict";
        s.d(t, { pC: () => a });
        var r = s(32367);
        let a = {
          async getCases() {
            let e = (0, r.UU)(),
              { data: t, error: s } = await e
                .from("cases")
                .select("*")
                .order("created_at", { ascending: !1 });
            if (s) throw s;
            return t;
          },
          async getCaseById(e) {
            let t = (0, r.UU)(),
              { data: s, error: a } = await t
                .from("cases")
                .select("*")
                .eq("id", e)
                .single();
            if (a) throw a;
            return s;
          },
          async createCase(e) {
            let t = (0, r.UU)(),
              { data: s, error: a } = await t
                .from("cases")
                .insert(e)
                .select()
                .single();
            if (a) throw a;
            return s;
          },
          async updateCase(e, t) {
            let s = (0, r.UU)(),
              { data: a, error: i } = await s
                .from("cases")
                .update(t)
                .eq("id", e)
                .select()
                .single();
            if (i) throw i;
            return a;
          },
          async deleteCase(e) {
            let t = (0, r.UU)(),
              { error: s } = await t.from("cases").delete().eq("id", e);
            if (s) throw s;
          },
          async getCaseAnalytics() {
            let e = (0, r.UU)(),
              { data: t, error: s } = await e
                .from("cases")
                .select("status, type");
            if (s) throw s;
            return {
              total: t.length,
              byStatus: t.reduce(
                (e, t) => ((e[t.status] = (e[t.status] || 0) + 1), e),
                {},
              ),
              byType: t.reduce(
                (e, t) => ((e[t.type] = (e[t.type] || 0) + 1), e),
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
      9370: (e, t, s) => {
        "use strict";
        s.d(t, { A: () => r });
        let r = (0, s(95255).A)("TrendingUp", [
          [
            "polyline",
            { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" },
          ],
          ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }],
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
      12335: (e, t, s) => {
        "use strict";
        s.d(t, { A: () => r });
        let r = (0, s(95255).A)("ChevronRight", [
          ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }],
        ]);
      },
      14677: (e, t, s) => {
        "use strict";
        s.d(t, { A: () => r });
        let r = (0, s(95255).A)("Calendar", [
          ["path", { d: "M8 2v4", key: "1cmpym" }],
          ["path", { d: "M16 2v4", key: "4m81vk" }],
          [
            "rect",
            {
              width: "18",
              height: "18",
              x: "3",
              y: "4",
              rx: "2",
              key: "1hopcy",
            },
          ],
          ["path", { d: "M3 10h18", key: "8toen8" }],
        ]);
      },
      15090: (e, t, s) => {
        "use strict";
        s.d(t, { d: () => h });
        var r = s(84205);
        let a = {
            ADD_TOAST: "ADD_TOAST",
            UPDATE_TOAST: "UPDATE_TOAST",
            DISMISS_TOAST: "DISMISS_TOAST",
            REMOVE_TOAST: "REMOVE_TOAST",
          },
          i = 0,
          n = new Map(),
          o = (e, t) => {
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
                let { toastId: s } = t;
                if (s) n.has(s) && (clearTimeout(n.get(s)), n.delete(s));
                else
                  for (let [e, t] of n.entries()) clearTimeout(t), n.delete(e);
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === s || void 0 === s ? { ...e, open: !1 } : e,
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
          (l = o(l, e)),
            d.forEach((e) => {
              e(l);
            });
        }
        function u({ ...e }) {
          let t = (i = (i + 1) % Number.MAX_VALUE).toString(),
            s = () => c({ type: a.DISMISS_TOAST, toastId: t });
          return (
            c({
              type: a.ADD_TOAST,
              toast: {
                ...e,
                id: t,
                open: !0,
                onOpenChange: (e) => {
                  e || s();
                },
              },
            }),
            {
              id: t,
              dismiss: s,
              update: (e) =>
                c({ type: a.UPDATE_TOAST, toast: { ...e, id: t } }),
            }
          );
        }
        function h() {
          let [e, t] = r.useState(l);
          return (
            r.useEffect(
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
      15127: (e, t, s) => {
        "use strict";
        s.d(t, { A: () => r });
        let r = (0, s(95255).A)("Plus", [
          ["path", { d: "M5 12h14", key: "1ays0h" }],
          ["path", { d: "M12 5v14", key: "s699le" }],
        ]);
      },
      15668: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 15668), (e.exports = t);
      },
      18390: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 28713));
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
      28713: (e, t, s) => {
        "use strict";
        s.a(e, async (e, r) => {
          try {
            s.d(t, { CasesDashboard: () => y });
            var a = s(61268),
              i = s(46299),
              n = s(99793),
              o = s(9370),
              d = s(89882),
              l = s(84205),
              c = s(94507),
              u = s(28539),
              h = s(8435),
              p = s(5913),
              m = s(75822),
              f = s(28909),
              g = s(94812),
              x = s(77001),
              b = s(15090),
              w = e([c, u, h, f, g, x]);
            function y() {
              let { toast: e } = (0, b.d)(),
                t = (0, d.useRouter)(),
                [s, r] = (0, l.useState)(!0),
                [w, y] = (0, l.useState)([]),
                [v, _] = (0, l.useState)([]),
                [A, j] = (0, l.useState)("cases"),
                C = (0, l.useCallback)(async () => {
                  r(!0);
                  try {
                    let [e, t] = await Promise.all([
                      p.pC.getCases(),
                      m.wP.getDocuments(),
                    ]);
                    y(e), _(t);
                  } catch (t) {
                    console.error("Error fetching dashboard data:", t),
                      e({
                        title: "Error",
                        description:
                          "Failed to load dashboard data. Please try again.",
                        variant: "destructive",
                      });
                  } finally {
                    r(!1);
                  }
                }, [e]),
                E = async (t) => {
                  try {
                    await p.pC.createCase(t),
                      e({
                        title: "Success",
                        description: "Case created successfully.",
                      }),
                      C();
                  } catch (t) {
                    console.error("Error creating case:", t),
                      e({
                        title: "Error",
                        description: "Failed to create case. Please try again.",
                        variant: "destructive",
                      });
                  }
                },
                S = async (t) => {
                  try {
                    await m.wP.uploadDocument(t),
                      e({
                        title: "Success",
                        description: "Document uploaded successfully.",
                      }),
                      C();
                  } catch (t) {
                    console.error("Error uploading document:", t),
                      e({
                        title: "Error",
                        description:
                          "Failed to upload document. Please try again.",
                        variant: "destructive",
                      });
                  }
                };
              return s
                ? (0, a.jsxs)("div", {
                    className: "container px-4 py-8 mx-auto",
                    children: [
                      (0, a.jsx)(g.E, { className: "h-12 w-48 mb-8" }),
                      (0, a.jsxs)("div", {
                        className: "grid gap-6 md:grid-cols-3 mb-8",
                        children: [
                          (0, a.jsx)(g.E, { className: "h-32 w-full" }),
                          (0, a.jsx)(g.E, { className: "h-32 w-full" }),
                          (0, a.jsx)(g.E, { className: "h-32 w-full" }),
                        ],
                      }),
                      (0, a.jsx)(g.E, { className: "h-96 w-full" }),
                    ],
                  })
                : (0, a.jsxs)("div", {
                    className: "container px-4 py-8 mx-auto",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "flex justify-between items-center mb-8",
                        children: [
                          (0, a.jsx)("h1", {
                            className: "text-3xl font-bold",
                            children: "Cases Dashboard",
                          }),
                          (0, a.jsx)(f.$, {
                            onClick: () => t.push("/dashboard/cases/new"),
                            children: "New Case",
                          }),
                        ],
                      }),
                      (0, a.jsxs)(x.Tabs, {
                        defaultValue: "cases",
                        className: "mb-8",
                        onValueChange: j,
                        children: [
                          (0, a.jsxs)(x.TabsList, {
                            className: "grid w-full md:w-auto grid-cols-3 mb-8",
                            children: [
                              (0, a.jsxs)(x.TabsTrigger, {
                                value: "cases",
                                className: "flex items-center gap-2",
                                children: [
                                  (0, a.jsx)(i.A, { className: "h-4 w-4" }),
                                  (0, a.jsx)("span", {
                                    className: "hidden md:inline",
                                    children: "Cases",
                                  }),
                                ],
                              }),
                              (0, a.jsxs)(x.TabsTrigger, {
                                value: "documents",
                                className: "flex items-center gap-2",
                                children: [
                                  (0, a.jsx)(n.A, { className: "h-4 w-4" }),
                                  (0, a.jsx)("span", {
                                    className: "hidden md:inline",
                                    children: "Documents",
                                  }),
                                ],
                              }),
                              (0, a.jsxs)(x.TabsTrigger, {
                                value: "analytics",
                                className: "flex items-center gap-2",
                                children: [
                                  (0, a.jsx)(o.A, { className: "h-4 w-4" }),
                                  (0, a.jsx)("span", {
                                    className: "hidden md:inline",
                                    children: "Analytics",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, a.jsx)(h.G, {
                            cases: w,
                            documents: v,
                            activeTab: A,
                          }),
                          (0, a.jsx)(x.TabsContent, {
                            value: "cases",
                            children: (0, a.jsx)(c.G, {
                              cases: w,
                              onCaseUpdated: C,
                            }),
                          }),
                          (0, a.jsx)(x.TabsContent, { value: "documents" }),
                          (0, a.jsx)(x.TabsContent, { value: "analytics" }),
                        ],
                      }),
                      (0, a.jsx)(u.c, {
                        activeTab: A,
                        cases: w,
                        onCreateCase: E,
                        onUploadDocument: S,
                      }),
                    ],
                  });
            }
            ([c, u, h, f, g, x] = w.then ? (await w)() : w), r();
          } catch (e) {
            r(e);
          }
        });
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
      32367: (e, t, s) => {
        "use strict";
        let r;
        s.d(t, { AG: () => x, Iw: () => f, UU: () => g });
        var a = s(97713),
          i = s(15149),
          n = s.n(i),
          o = s(84205);
        let { fetch: d } = n()(),
          l = "http://localhost:54321",
          c =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          u = process.env.SUPABASE_SERVICE_ROLE_KEY,
          h = c ? { apikey: c } : void 0;
        function p() {
          if (!l || !c)
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
            ((e.fetch = d), (e.__USING_PONYFETCH__ = !0));
        }
        function m() {
          return (p(), r)
            ? r
            : (r = (0, a.createBrowserClient)(l, c, {
                global: { headers: h },
              }));
        }
        function f() {
          return (0, o.useMemo)(m, []);
        }
        function g() {
          return (
            p(), (0, a.createBrowserClient)(l, c, { global: { headers: h } })
          );
        }
        let x = m;
        m();
      },
      32961: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 69655));
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
      38568: (e, t, s) => {
        "use strict";
        s.d(t, { A: () => r });
        let r = (0, s(95255).A)("CheckCircle", [
          ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
          ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
        ]);
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      46532: (e, t, s) => {
        "use strict";
        s.a(e, async (e, r) => {
          try {
            s.d(t, { E: () => l });
            var a = s(61268),
              i = s(86415),
              n = s(91635);
            s(84205);
            var o = s(15942),
              d = e([o]);
            o = (d.then ? (await d)() : d)[0];
            let c = (0, n.F)(
              "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
              {
                variants: {
                  variant: {
                    default:
                      "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
                    secondary:
                      "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
                    destructive:
                      "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                    outline:
                      "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
                  },
                },
                defaultVariants: { variant: "default" },
              },
            );
            function l({ className: e, variant: t, asChild: s = !1, ...r }) {
              let n = s ? i.DX : "span";
              return (0, a.jsx)(n, {
                "data-slot": "badge",
                className: (0, o.cn)(c({ variant: t }), e),
                ...r,
              });
            }
            r();
          } catch (e) {
            r(e);
          }
        });
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      51384: (e, t, s) => {
        "use strict";
        s.a(e, async (e, r) => {
          try {
            s.d(t, {
              CG: () => c,
              Fm: () => m,
              Qs: () => g,
              cj: () => l,
              h: () => p,
              qp: () => f,
            });
            var a = s(61268),
              i = s(33459),
              n = s(90495);
            s(84205);
            var o = s(15942),
              d = e([o]);
            function l({ ...e }) {
              return (0, a.jsx)(i.bL, { "data-slot": "sheet", ...e });
            }
            function c({ ...e }) {
              return (0, a.jsx)(i.l9, { "data-slot": "sheet-trigger", ...e });
            }
            function u({ ...e }) {
              return (0, a.jsx)(i.ZL, { "data-slot": "sheet-portal", ...e });
            }
            function h({ className: e, ...t }) {
              return (0, a.jsx)(i.hJ, {
                "data-slot": "sheet-overlay",
                className: (0, o.cn)(
                  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
                  e,
                ),
                ...t,
              });
            }
            function p({ className: e, children: t, side: s = "right", ...r }) {
              return (0, a.jsxs)(u, {
                children: [
                  (0, a.jsx)(h, {}),
                  (0, a.jsxs)(i.UC, {
                    "data-slot": "sheet-content",
                    className: (0, o.cn)(
                      "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
                      "right" === s &&
                        "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
                      "left" === s &&
                        "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
                      "top" === s &&
                        "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
                      "bottom" === s &&
                        "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
                      e,
                    ),
                    ...r,
                    children: [
                      t,
                      (0, a.jsxs)(i.bm, {
                        className:
                          "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
                        children: [
                          (0, a.jsx)(n.A, { className: "size-4" }),
                          (0, a.jsx)("span", {
                            className: "sr-only",
                            children: "Close",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
            }
            function m({ className: e, ...t }) {
              return (0, a.jsx)("div", {
                "data-slot": "sheet-header",
                className: (0, o.cn)("flex flex-col gap-1.5 p-4", e),
                ...t,
              });
            }
            function f({ className: e, ...t }) {
              return (0, a.jsx)(i.hE, {
                "data-slot": "sheet-title",
                className: (0, o.cn)("text-foreground font-semibold", e),
                ...t,
              });
            }
            function g({ className: e, ...t }) {
              return (0, a.jsx)(i.VY, {
                "data-slot": "sheet-description",
                className: (0, o.cn)("text-muted-foreground text-sm", e),
                ...t,
              });
            }
            (o = (d.then ? (await d)() : d)[0]), r();
          } catch (e) {
            r(e);
          }
        });
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
      61460: (e, t, s) => {
        "use strict";
        s.d(t, { _m: () => h });
        class r extends Error {
          constructor(e, t, s, r) {
            super(e),
              (this.name = "AuthError"),
              (this.code = t),
              (this.status = r),
              (this.originalError = s);
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
          constructor(e = "Authentication required", t) {
            super(e, "auth/unauthorized", t, 401),
              (this.name = "UnauthorizedError");
          }
        }
        class i extends r {
          constructor(e = "Insufficient permissions", t) {
            super(e, "auth/forbidden", t, 403), (this.name = "ForbiddenError");
          }
        }
        class n extends r {
          constructor(e = "Session error", t) {
            super(e, "auth/session-error", t, 400),
              (this.name = "SessionError");
          }
        }
        class o extends r {
          constructor(e = "Invalid credentials", t) {
            super(e, "auth/invalid-credentials", t, 401),
              (this.name = "InvalidCredentialsError");
          }
        }
        class d extends r {
          constructor(e = "User operation failed", t) {
            super(e, "auth/user-operation-failed", t, 400),
              (this.name = "UserOperationError");
          }
        }
        let l = { roles: {}, superAdminRole: "admin", enableCache: !0 };
        class c {
          constructor(e = {}) {
            this.permissionCache = new Map();
            let t = { ...l, ...e };
            (this.roles = t.roles || {}),
              (this.superAdminRole = t.superAdminRole || "admin"),
              (this.enableCache = t.enableCache ?? !0),
              (this.extractRoles =
                t.extractRoles || ((e) => [e.role || "user"]));
          }
          defineRole(e) {
            (this.roles[e.name] = e),
              this.enableCache && this.permissionCache.clear();
          }
          defineRoles(e) {
            (this.roles = { ...this.roles, ...e }),
              this.enableCache && this.permissionCache.clear();
          }
          getRolePermissions(e, t = new Set()) {
            if (t.has(e)) return new Set();
            t.add(e);
            let s = this.roles[e];
            if (!s) return new Set();
            let r = new Set(s.permissions);
            if (s.inherits && s.inherits.length > 0)
              for (let e of s.inherits)
                this.getRolePermissions(e, t).forEach((e) => r.add(e));
            return r;
          }
          getUserPermissions(e) {
            if (!e) return new Set();
            let t = this.extractRoles(e);
            if (t.includes(this.superAdminRole)) return new Set(["*"]);
            if (this.enableCache) {
              let e = t.sort().join(","),
                s = this.permissionCache.get(e);
              if (s) return s;
            }
            let s = new Set();
            for (let e of t)
              this.getRolePermissions(e).forEach((e) => s.add(e));
            if (this.enableCache && t.length > 0) {
              let e = t.sort().join(",");
              this.permissionCache.set(e, s);
            }
            return s;
          }
          hasRole(e, t) {
            if (!e) return !1;
            let s = this.extractRoles(e);
            return s.includes(t) || s.includes(this.superAdminRole);
          }
          hasPermission(e, t) {
            if (!e) return !1;
            let s = this.getUserPermissions(e);
            if (s.has("*") || s.has(t)) return !0;
            let r = t.split(":");
            for (let e = 1; e <= r.length; e++) {
              let t = [...r.slice(0, e), "*"].join(":");
              if (s.has(t)) return !0;
            }
            return !1;
          }
          hasAnyPermission(e, t) {
            return t.some((t) => this.hasPermission(e, t));
          }
          hasAllPermissions(e, t) {
            return t.every((t) => this.hasPermission(e, t));
          }
          enforcePermission(e, t) {
            if (!this.hasPermission(e, t))
              throw new i(`Missing required permission: ${t}`);
          }
          enforceAnyPermission(e, t) {
            if (!this.hasAnyPermission(e, t))
              throw new i(
                `Missing at least one of the required permissions: ${t.join(", ")}`,
              );
          }
          enforceAllPermissions(e, t) {
            if (!this.hasAllPermissions(e, t))
              throw new i(
                `Missing some of the required permissions: ${t.join(", ")}`,
              );
          }
          createPermission(e, t) {
            return `${e}:${t}`;
          }
        }
        let u = null;
        function h(e, t) {
          var s;
          return (u || (u = new c(void 0)), u).hasPermission(e, t);
        }
      },
      61950: (e, t, s) => {
        "use strict";
        s.d(t, { A: () => r });
        let r = (0, s(95255).A)("AlertCircle", [
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
      69655: (e, t, s) => {
        "use strict";
        s.d(t, { CasesDashboard: () => r });
        let r = (0, s(26394).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call CasesDashboard() from the server but CasesDashboard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\presentation\\cases\\cases-dashboard.tsx",
          "CasesDashboard",
        );
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
      75822: (e, t, s) => {
        "use strict";
        s.d(t, { wP: () => a });
        var r = s(32367);
        let a = {
          async getDocuments(e) {
            let t = (0, r.UU)()
              .from("documents")
              .select("*")
              .order("created_at", { ascending: !1 });
            e && t.eq("case_id", e);
            let { data: s, error: a } = await t;
            if (a) throw a;
            return s;
          },
          async getDocumentById(e) {
            let t = (0, r.UU)(),
              { data: s, error: a } = await t
                .from("documents")
                .select("*")
                .eq("id", e)
                .single();
            if (a) throw a;
            return s;
          },
          async uploadDocument(e, t) {
            let s = (0, r.UU)(),
              a = e.name.split(".").pop(),
              i = `${t}/${Date.now()}.${a}`,
              { data: n, error: o } = await s.storage
                .from("documents")
                .upload(i, e);
            if (o) throw o;
            let {
                data: { publicUrl: d },
              } = s.storage.from("documents").getPublicUrl(i),
              { data: l, error: c } = await s
                .from("documents")
                .insert({
                  case_id: t,
                  name: e.name,
                  type: e.type,
                  size: e.size,
                  url: d,
                  path: i,
                })
                .select()
                .single();
            if (c) throw c;
            return l;
          },
          async deleteDocument(e) {
            let t = (0, r.UU)(),
              { data: s, error: a } = await t
                .from("documents")
                .select("path")
                .eq("id", e)
                .single();
            if (a) throw a;
            if (s?.path) {
              let { error: e } = await t.storage
                .from("documents")
                .remove([s.path]);
              if (e) throw e;
            }
            let { error: i } = await t.from("documents").delete().eq("id", e);
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
      78337: (e, t, s) => {
        "use strict";
        s.a(e, async (e, r) => {
          try {
            s.d(t, { p: () => o });
            var a = s(61268);
            s(84205);
            var i = s(15942),
              n = e([i]);
            function o({ className: e, type: t, ...s }) {
              return (0, a.jsx)("input", {
                type: t,
                "data-slot": "input",
                className: (0, i.cn)(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  e,
                ),
                ...s,
              });
            }
            (i = (n.then ? (await n)() : n)[0]), r();
          } catch (e) {
            r(e);
          }
        });
      },
      79366: (e, t, s) => {
        "use strict";
        s.d(t, { p: () => i });
        var r = s(89882),
          a = s(58702);
        function i() {
          let e = (0, r.usePathname)();
          return (
            a.IB.find((t) => e === `/${t}` || e.startsWith(`/${t}/`)) || a.q
          );
        }
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
      89702: (e, t, s) => {
        "use strict";
        let r;
        s.r(t),
          s.d(t, {
            default: () => m,
            generateImageMetadata: () => h,
            generateMetadata: () => u,
            generateViewport: () => p,
            metadata: () => d,
          });
        var a = s(63033),
          i = s(35242),
          n = s(69655),
          o = s(60442);
        let d = {
            title: "Cases | Hijraah Immigration Platform",
            description: "Manage your immigration cases",
          },
          l = { ...a },
          c =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        r = new Proxy(
          function () {
            return (0, i.jsx)(n.CasesDashboard, {});
          },
          {
            apply: (e, t, s) => {
              let r, a, i;
              try {
                let e = c?.getStore();
                (r = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (i = e?.headers);
              } catch (e) {}
              return o
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/(authenticated)/dashboard/cases",
                  componentType: "Page",
                  sentryTraceHeader: r,
                  baggageHeader: a,
                  headers: i,
                })
                .apply(t, s);
            },
          },
        );
        let u = void 0,
          h = void 0,
          p = void 0,
          m = r;
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      93336: (e, t, s) => {
        "use strict";
        s.a(e, async (e, r) => {
          try {
            s.d(t, {
              Hr: () => m,
              Ht: () => f,
              I: () => h,
              SQ: () => u,
              _2: () => p,
              lp: () => g,
              mB: () => x,
              rI: () => l,
              ty: () => c,
            });
            var a = s(61268),
              i = s(57833),
              n = s(83659);
            s(84205);
            var o = s(15942),
              d = e([o]);
            function l({ ...e }) {
              return (0, a.jsx)(i.bL, { "data-slot": "dropdown-menu", ...e });
            }
            function c({ ...e }) {
              return (0, a.jsx)(i.l9, {
                "data-slot": "dropdown-menu-trigger",
                ...e,
              });
            }
            function u({ className: e, sideOffset: t = 4, ...s }) {
              return (0, a.jsx)(i.ZL, {
                children: (0, a.jsx)(i.UC, {
                  "data-slot": "dropdown-menu-content",
                  sideOffset: t,
                  className: (0, o.cn)(
                    "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
                    e,
                  ),
                  ...s,
                }),
              });
            }
            function h({ ...e }) {
              return (0, a.jsx)(i.YJ, {
                "data-slot": "dropdown-menu-group",
                ...e,
              });
            }
            function p({
              className: e,
              inset: t,
              variant: s = "default",
              ...r
            }) {
              return (0, a.jsx)(i.q7, {
                "data-slot": "dropdown-menu-item",
                "data-inset": t,
                "data-variant": s,
                className: (0, o.cn)(
                  "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...r,
              });
            }
            function m({ ...e }) {
              return (0, a.jsx)(i.z6, {
                "data-slot": "dropdown-menu-radio-group",
                ...e,
              });
            }
            function f({ className: e, children: t, ...s }) {
              return (0, a.jsxs)(i.hN, {
                "data-slot": "dropdown-menu-radio-item",
                className: (0, o.cn)(
                  "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...s,
                children: [
                  (0, a.jsx)("span", {
                    className:
                      "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
                    children: (0, a.jsx)(i.VF, {
                      children: (0, a.jsx)(n.A, {
                        className: "size-2 fill-current",
                      }),
                    }),
                  }),
                  t,
                ],
              });
            }
            function g({ className: e, inset: t, ...s }) {
              return (0, a.jsx)(i.JU, {
                "data-slot": "dropdown-menu-label",
                "data-inset": t,
                className: (0, o.cn)(
                  "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
                  e,
                ),
                ...s,
              });
            }
            function x({ className: e, ...t }) {
              return (0, a.jsx)(i.wv, {
                "data-slot": "dropdown-menu-separator",
                className: (0, o.cn)("bg-border -mx-1 my-1 h-px", e),
                ...t,
              });
            }
            (o = (d.then ? (await d)() : d)[0]), r();
          } catch (e) {
            r(e);
          }
        });
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      94812: (e, t, s) => {
        "use strict";
        s.a(e, async (e, r) => {
          try {
            s.d(t, { E: () => o });
            var a = s(61268),
              i = s(15942),
              n = e([i]);
            function o({ className: e, ...t }) {
              return (0, a.jsx)("div", {
                "data-slot": "skeleton",
                className: (0, i.cn)("bg-accent animate-pulse rounded-md", e),
                ...t,
              });
            }
            (i = (n.then ? (await n)() : n)[0]), r();
          } catch (e) {
            r(e);
          }
        });
      },
      96648: (e, t, s) => {
        "use strict";
        s.d(t, { A: () => r });
        let r = (0, s(95255).A)("LogOut", [
          [
            "path",
            { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" },
          ],
          ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
          ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }],
        ]);
      },
    });
  var t = require("../../../../webpack-runtime.js");
  t.C(e);
  var s = (e) => t((t.s = e)),
    r = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 6188, 7911, 5124, 7272, 1578, 6777, 4630, 6536, 7251,
      ],
      () => s(3068),
    );
  module.exports = r;
})();
//# sourceMappingURL=page.js.map
