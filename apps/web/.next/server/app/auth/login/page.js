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
    (e._sentryDebugIds[t] = "d56e9371-c15c-4e44-812a-2dacaa20ab7e"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-d56e9371-c15c-4e44-812a-2dacaa20ab7e"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 4859),
    (e.ids = [4859]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3519: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            AuthProvider: () => d,
            useAuth: () => c,
            useHasPermission: () => h,
            useHasRole: () => m,
            useIsAuthenticated: () => p,
            useSession: () => g,
            useUser: () => u,
          });
        var s = r(61268),
          i = r(84205),
          a = r(32367),
          o = r(61460);
        function n(e) {
          if (!e) return null;
          let t = e.user_metadata?.role || "client",
            r = {
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
            settings: r,
            hasTwoFactorAuth: () => r.twoFactorAuth,
            updateSettings: (t) => {
              let s = { ...r, ...t };
              return n({
                ...e,
                user_metadata: {
                  ...e.user_metadata,
                  settings_theme: s.theme,
                  settings_language: s.language,
                  settings_emailNotifications: s.emailNotifications,
                  settings_documentReminders: s.documentReminders,
                  settings_applicationUpdates: s.applicationUpdates,
                  settings_twoFactorAuth: s.twoFactorAuth,
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
              settings: r,
            }),
          };
        }
        let l = (0, i.createContext)(void 0);
        function d({ children: e }) {
          let [t, r] = (0, i.useState)(null),
            [o, d] = (0, i.useState)(null),
            [c, u] = (0, i.useState)(!0),
            p = (0, a.UU)(),
            m = (0, i.useCallback)(async () => {
              try {
                u(!0);
                let {
                  data: { session: e },
                  error: t,
                } = await p.auth.getSession();
                if (t) throw t;
                if (e) {
                  let {
                    data: { user: t },
                    error: s,
                  } = await p.auth.getUser();
                  if (s) throw s;
                  d(e), r(n(t));
                } else d(null), r(null);
              } catch (e) {
                console.error("Error refreshing session:", e), d(null), r(null);
              } finally {
                u(!1);
              }
            }, [p]),
            h = (0, i.useCallback)(
              async (e, t) => {
                u(!0);
                try {
                  if ("email" === e) {
                    if (!t?.email || !t?.password)
                      throw Error(
                        "Email and password required for email sign in",
                      );
                    let { data: e, error: s } = await p.auth.signInWithPassword(
                      { email: t.email, password: t.password },
                    );
                    if (s) throw s;
                    e?.session && (d(e.session), r(n(e.session.user)));
                  } else {
                    let { error: r } = await p.auth.signInWithOAuth({
                      provider: e,
                      options: t?.redirectTo
                        ? { redirectTo: t.redirectTo }
                        : void 0,
                    });
                    if (r) throw r;
                  }
                } catch (e) {
                  throw (console.error("Error signing in:", e), e);
                } finally {
                  u(!1);
                }
              },
              [p],
            ),
            g = (0, i.useCallback)(async () => {
              u(!0);
              try {
                let { error: e } = await p.auth.signOut();
                if (e) throw e;
                d(null), r(null);
              } catch (e) {
                console.error("Error signing out:", e);
              } finally {
                u(!1);
              }
            }, [p]),
            f = (0, i.useCallback)(
              async (e) => {
                u(!0);
                try {
                  if (!e.email || !e.password)
                    throw Error("Email and password required for sign up");
                  let { data: t, error: r } = await p.auth.signUp({
                    email: e.email,
                    password: e.password,
                    options: {
                      data: { full_name: e.fullName || "" },
                      emailRedirectTo:
                        e.redirectTo ||
                        `${window.location.origin}/auth/callback`,
                    },
                  });
                  if (r) throw r;
                  return t;
                } catch (e) {
                  throw (console.error("Error signing up:", e), e);
                } finally {
                  u(!1);
                }
              },
              [p],
            ),
            y = (0, i.useCallback)(
              async (e, t) => {
                u(!0);
                try {
                  let { error: r } = await p.auth.resetPasswordForEmail(e, {
                    redirectTo:
                      t || `${window.location.origin}/auth/reset-password`,
                  });
                  if (r) throw r;
                  return !0;
                } catch (e) {
                  throw (console.error("Error resetting password:", e), e);
                } finally {
                  u(!1);
                }
              },
              [p],
            ),
            x = (0, i.useCallback)(
              async (e) => {
                u(!0);
                try {
                  let { error: t } = await p.auth.updateUser({ password: e });
                  if (t) throw t;
                  return !0;
                } catch (e) {
                  throw (console.error("Error updating password:", e), e);
                } finally {
                  u(!1);
                }
              },
              [p],
            );
          return (0, s.jsx)(l.Provider, {
            value: {
              user: t,
              session: o,
              isLoading: c,
              isAuthenticated: !!o,
              signIn: h,
              signOut: g,
              refreshSession: m,
              signUp: f,
              resetPassword: y,
              updatePassword: x,
              error: null,
            },
            children: e,
          });
        }
        function c() {
          let e = (0, i.useContext)(l);
          if (void 0 === e)
            throw Error("useAuth must be used within an AuthProvider");
          return e;
        }
        function u() {
          let { user: e } = c();
          return e;
        }
        function p() {
          let { isAuthenticated: e } = c();
          return e;
        }
        function m(e) {
          let t = u();
          return t?.role === e;
        }
        function h(e) {
          let t = u();
          return (0, o._m)(t, e);
        }
        function g() {
          let e = (0, i.useContext)(l);
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
      3745: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("HelpCircle", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          [
            "path",
            { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" },
          ],
          ["path", { d: "M12 17h.01", key: "p32p05" }],
        ]);
      },
      5224: (e, t, r) => {
        "use strict";
        r.d(t, { X5: () => i, zK: () => a });
        var s = r(36352);
        let i = s.Ik({
            email: s
              .Yj()
              .email({ message: "Please enter a valid email address" }),
            password: s.Yj().min(1, { message: "Password is required" }),
          }),
          a = s
            .Ik({
              email: s
                .Yj()
                .email({ message: "Please enter a valid email address" }),
              password: s
                .Yj()
                .min(8, { message: "Password must be at least 8 characters" })
                .refine((e) => /[A-Z]/.test(e), {
                  message:
                    "Password must contain at least one uppercase letter",
                })
                .refine((e) => /[a-z]/.test(e), {
                  message:
                    "Password must contain at least one lowercase letter",
                })
                .refine((e) => /[0-9]/.test(e), {
                  message: "Password must contain at least one number",
                })
                .refine((e) => /[^A-Za-z0-9]/.test(e), {
                  message:
                    "Password must contain at least one special character",
                }),
              confirmPassword: s.Yj(),
            })
            .refine((e) => e.password === e.confirmPassword, {
              message: "Passwords do not match",
              path: ["confirmPassword"],
            });
      },
      5451: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              BT: () => p,
              Wu: () => m,
              ZB: () => u,
              Zp: () => d,
              aR: () => c,
              wL: () => h,
            });
            var i = r(61268),
              a = r(55728),
              o = r(84205),
              n = r(15942),
              l = e([n]);
            n = (l.then ? (await l)() : l)[0];
            let d = o.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)(a.P.div, {
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
            d.displayName = "Card";
            let c = o.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("div", {
                ref: r,
                className: (0, n.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            c.displayName = "CardHeader";
            let u = o.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("h3", {
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
              (0, i.jsx)("p", {
                ref: r,
                className: (0, n.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            p.displayName = "CardDescription";
            let m = o.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("div", {
                ref: r,
                className: (0, n.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            m.displayName = "CardContent";
            let h = o.forwardRef(({ className: e, ...t }, r) =>
              (0, i.jsx)("div", {
                ref: r,
                className: (0, n.cn)("flex items-center p-6 pt-0", e),
                ...t,
              }),
            );
            (h.displayName = "CardFooter"), s();
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
      11404: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => a.default,
            __next_app__: () => c,
            pages: () => d,
            routeModule: () => u,
            tree: () => l,
          });
        var s = r(11610),
          i = r(51293),
          a = r(59059),
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
        let l = {
            children: [
              "",
              {
                children: [
                  "auth",
                  {
                    children: [
                      "login",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 21380)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\auth\\login\\page.tsx",
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {},
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
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\auth\\login\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: i.RouteKind.APP_PAGE,
              page: "/auth/login/page",
              pathname: "/auth/login",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      14677: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Calendar", [
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
      15012: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Video", [
          ["path", { d: "m22 8-6 4 6 4V8Z", key: "50v9me" }],
          [
            "rect",
            {
              width: "14",
              height: "12",
              x: "2",
              y: "6",
              rx: "2",
              ry: "2",
              key: "1rqjg6",
            },
          ],
        ]);
      },
      15090: (e, t, r) => {
        "use strict";
        r.d(t, { d: () => p });
        var s = r(84205);
        let i = {
            ADD_TOAST: "ADD_TOAST",
            UPDATE_TOAST: "UPDATE_TOAST",
            DISMISS_TOAST: "DISMISS_TOAST",
            REMOVE_TOAST: "REMOVE_TOAST",
          },
          a = 0,
          o = new Map(),
          n = (e, t) => {
            switch (t.type) {
              case i.ADD_TOAST:
                return { ...e, toasts: [t.toast, ...e.toasts].slice(0, 5) };
              case i.UPDATE_TOAST:
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === t.toast.id ? { ...e, ...t.toast } : e,
                  ),
                };
              case i.DISMISS_TOAST: {
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
              case i.REMOVE_TOAST:
                if (void 0 === t.toastId) return { ...e, toasts: [] };
                return {
                  ...e,
                  toasts: e.toasts.filter((e) => e.id !== t.toastId),
                };
            }
          },
          l = [],
          d = { toasts: [] };
        function c(e) {
          (d = n(d, e)),
            l.forEach((e) => {
              e(d);
            });
        }
        function u({ ...e }) {
          let t = (a = (a + 1) % Number.MAX_VALUE).toString(),
            r = () => c({ type: i.DISMISS_TOAST, toastId: t });
          return (
            c({
              type: i.ADD_TOAST,
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
                c({ type: i.UPDATE_TOAST, toast: { ...e, id: t } }),
            }
          );
        }
        function p() {
          let [e, t] = s.useState(d);
          return (
            s.useEffect(
              () => (
                l.push(t),
                () => {
                  let e = l.indexOf(t);
                  e > -1 && l.splice(e, 1);
                }
              ),
              [e],
            ),
            {
              ...e,
              toast: u,
              dismiss: (e) => c({ type: i.DISMISS_TOAST, toastId: e }),
            }
          );
        }
      },
      15668: (e) => {
        function t(e) {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        }
        (t.keys = () => []), (t.resolve = t), (t.id = 15668), (e.exports = t);
      },
      16176: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { Separator: () => l });
            var i = r(61268),
              a = r(51209);
            r(84205);
            var o = r(15942),
              n = e([o]);
            function l({
              className: e,
              orientation: t = "horizontal",
              decorative: r = !0,
              ...s
            }) {
              return (0, i.jsx)(a.b, {
                "data-slot": "separator-root",
                decorative: r,
                orientation: t,
                className: (0, o.cn)(
                  "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
                  e,
                ),
                ...s,
              });
            }
            (o = (n.then ? (await n)() : n)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      16951: (e, t, r) => {
        "use strict";
        r.d(t, {
          B5: () => h,
          Dv: () => m,
          Yk: () => g,
          ZH: () => f,
          Zj: () => u,
          m_: () => p,
        });
        var s = r(58882),
          i = r(14677),
          a = r(99793),
          o = r(92663),
          n = r(80305),
          l = r(3745),
          d = r(15012),
          c = r(52327);
        r(84205);
        let u = [
            {
              id: "welcome",
              title: "Welcome to Hijraah",
              description:
                "Your journey to simplified immigration starts here. We'll guide you through the process step by step.",
              component: "WelcomeModal",
            },
            {
              id: "profile-setup",
              title: "Profile Setup",
              description:
                "Tell us about your immigration goals and preferences so we can personalize your experience.",
              component: "ProfileSetup",
              profileSetupConfig: {
                actionKey: "profile_setup_completed",
                countries: [
                  { value: "us", label: "United States" },
                  { value: "ca", label: "Canada" },
                  { value: "uk", label: "United Kingdom" },
                  { value: "in", label: "India" },
                  { value: "ng", label: "Nigeria" },
                  { value: "cn", label: "China" },
                  { value: "other", label: "Other" },
                ],
                destinations: [
                  { value: "us", label: "United States" },
                  { value: "ca", label: "Canada" },
                  { value: "uk", label: "United Kingdom" },
                  { value: "au", label: "Australia" },
                  { value: "nz", label: "New Zealand" },
                  { value: "de", label: "Germany" },
                  { value: "other", label: "Other" },
                ],
                languages: [
                  { value: "en", label: "English" },
                  { value: "es", label: "Spanish" },
                  { value: "fr", label: "French" },
                  { value: "ar", label: "Arabic" },
                ],
              },
              features: [
                {
                  id: "personal-info",
                  title: "Personal Information",
                  description:
                    "Securely store your basic information to streamline document completion.",
                },
                {
                  id: "immigration-status",
                  title: "Immigration Status",
                  description:
                    "Help us understand your current situation and destination plans.",
                },
                {
                  id: "preferences",
                  title: "Preferences",
                  description:
                    "Set your preferences for language, notifications, and more.",
                },
              ],
            },
            {
              id: "feature-tour",
              title: "Feature Tour",
              description:
                "Discover the powerful tools Hijraah offers to simplify your immigration journey.",
              component: "FeatureTour",
              actionKey: "feature_tour_completed",
              tourStops: [
                {
                  target: '[data-tour="dashboard"]',
                  placement: "bottom",
                  title: "Your Dashboard",
                  content: "Overview of your cases, documents, and progress.",
                },
                {
                  target: '[data-tour="profile"]',
                  placement: "right",
                  title: "Profile Settings",
                  content:
                    "Manage your personal information and preferences here.",
                },
                {
                  target: '[data-tour="documents"]',
                  placement: "left",
                  title: "Document Management",
                  content:
                    "Upload, organize, and access your important documents securely.",
                },
                {
                  target: '[data-tour="cases"]',
                  placement: "top",
                  title: "Case Tracking",
                  content:
                    "Track the status and progress of your immigration cases.",
                },
                {
                  target: '[data-tour="help"]',
                  placement: "bottom",
                  title: "Help & Support",
                  content:
                    "Find guides, FAQs, and contact support if you need help.",
                },
              ],
              features: [
                {
                  id: "document-management",
                  title: "Document Management",
                  description:
                    "Upload, organize, and securely store all your important immigration documents in one place.",
                  imageUrl: "/images/features/document-management.svg",
                },
                {
                  id: "case-tracking",
                  title: "Case Tracking",
                  description:
                    "Monitor the progress of your immigration applications with real-time status updates.",
                  imageUrl: "/images/features/case-tracking.svg",
                },
                {
                  id: "ai-assistance",
                  title: "AI Assistance",
                  description:
                    "Get personalized guidance and answers to your immigration questions with our AI assistant.",
                  imageUrl: "/images/features/ai-assistance.svg",
                },
                {
                  id: "deadline-reminders",
                  title: "Deadline Reminders",
                  description:
                    "Never miss an important date with automated reminders for application deadlines and appointments.",
                  imageUrl: "/images/features/deadline-reminders.svg",
                },
              ],
            },
            {
              id: "first-task",
              title: "Complete Your First Task",
              description:
                "Choose one task to get started and experience a core feature of Hijraah.",
              component: "FirstTask",
              tasks: [
                {
                  id: "upload",
                  title: "Upload Your First Document",
                  description:
                    "Start by uploading an important immigration document to keep it secure and accessible.",
                  cta: "Upload Document",
                  icon: s.A,
                  actionKey: "first_task_upload",
                },
                {
                  id: "consult",
                  title: "Schedule a Consultation",
                  description:
                    "Book a session with an immigration expert to discuss your specific situation.",
                  cta: "Book Consultation",
                  icon: i.A,
                  actionKey: "first_task_consult",
                },
                {
                  id: "application",
                  title: "Start an Application/Case",
                  description:
                    "Begin your first immigration case setup with our guided process.",
                  cta: "Start Case",
                  icon: a.A,
                  actionKey: "first_task_application",
                },
              ],
              features: [
                {
                  id: "create-case",
                  title: "Create Your First Case",
                  description:
                    "Set up your first immigration case to track your progress and manage documents.",
                },
                {
                  id: "upload-document",
                  title: "Upload Your First Document",
                  description:
                    "Securely upload and store your first immigration document.",
                },
              ],
            },
            {
              id: "resources",
              title: "Explore Resources",
              description:
                "Discover helpful guides, tools, and community support for your immigration journey.",
              component: "Resources",
              actionKey: "resources_viewed",
              resourceCategories: [
                {
                  id: "guides",
                  title: "Guides",
                  icon: o.A,
                  resources: [
                    {
                      icon: o.A,
                      title: "Getting Started Guide",
                      description:
                        "A comprehensive guide on how to use Hijraah for your immigration journey.",
                      link: "/guides/getting-started",
                    },
                    {
                      icon: n.A,
                      title: "Country-Specific Guides",
                      description:
                        "Detailed guides for the most popular immigration destinations.",
                      link: "/guides/countries",
                    },
                    {
                      icon: i.A,
                      title: "Immigration Timeline",
                      description:
                        "Learn about typical immigration process timelines and milestones.",
                      link: "/guides/timeline",
                    },
                    {
                      icon: l.A,
                      title: "Frequently Asked Questions",
                      description:
                        "Find answers to common questions about immigration processes.",
                      link: "/help/faq",
                    },
                  ],
                },
                {
                  id: "documents",
                  title: "Documents",
                  icon: a.A,
                  resources: [
                    {
                      icon: a.A,
                      title: "Document Checklist Tool",
                      description:
                        "Use our tool to generate a checklist of essential documents for your specific case.",
                      link: "/tools/document-checklist",
                    },
                    {
                      icon: a.A,
                      title: "Sample Templates",
                      description:
                        "View sample templates for common immigration forms and letters.",
                      link: "/documents/templates",
                    },
                    {
                      icon: a.A,
                      title: "Legal Resources",
                      description:
                        "Links to official government immigration sites and legal aid information.",
                      link: "/resources/legal",
                    },
                    {
                      icon: a.A,
                      title: "Form Filling Guides",
                      description:
                        "Step-by-step guides for filling out common immigration forms accurately.",
                      link: "/guides/forms",
                    },
                  ],
                },
                {
                  id: "videos",
                  title: "Videos",
                  icon: d.A,
                  resources: [
                    {
                      icon: d.A,
                      title: "Platform Tutorial",
                      description:
                        "Watch a comprehensive video tutorial on using the Hijraah platform features.",
                      link: "/videos/tutorial",
                    },
                    {
                      icon: d.A,
                      title: "Immigration Process Explained",
                      description:
                        "Video overview of typical immigration processes and common steps involved.",
                      link: "/videos/process",
                    },
                    {
                      icon: d.A,
                      title: "Expert Interviews",
                      description:
                        "Watch interviews with immigration lawyers and consultants sharing insights.",
                      link: "/videos/experts",
                    },
                    {
                      icon: d.A,
                      title: "User Success Stories",
                      description:
                        "Hear from users who successfully navigated their immigration journey with Hijraah.",
                      link: "/videos/success-stories",
                    },
                  ],
                },
                {
                  id: "community",
                  title: "Community & Support",
                  icon: c.A,
                  resources: [
                    {
                      icon: c.A,
                      title: "Community Forum",
                      description:
                        "Join discussions, ask questions, and share experiences with fellow users.",
                      link: "/community/forums",
                    },
                    {
                      icon: c.A,
                      title: "Find an Expert",
                      description:
                        "Connect with verified immigration experts and consultants through our network.",
                      link: "/experts",
                    },
                    {
                      icon: i.A,
                      title: "Events & Webinars",
                      description:
                        "Find upcoming webinars, workshops, and Q&A sessions related to immigration.",
                      link: "/community/events",
                    },
                    {
                      icon: l.A,
                      title: "Get Support",
                      description:
                        "Access our help center or contact our support team for assistance.",
                      link: "/help",
                    },
                  ],
                },
              ],
              features: [
                {
                  id: "immigration-guides",
                  title: "Immigration Guides",
                  description:
                    "Step-by-step guides for different visa types and immigration processes.",
                  imageUrl: "/images/features/guides.svg",
                },
                {
                  id: "country-information",
                  title: "Country Information",
                  description:
                    "Detailed information about immigration policies, requirements, and cultural insights for different countries.",
                  imageUrl: "/images/features/country-info.svg",
                },
                {
                  id: "document-templates",
                  title: "Document Templates",
                  description:
                    "Access professionally designed templates for common immigration documents and letters.",
                  imageUrl: "/images/features/templates.svg",
                },
                {
                  id: "community-support",
                  title: "Community Support",
                  description:
                    "Connect with others on similar immigration journeys to share experiences and advice.",
                  imageUrl: "/images/features/community.svg",
                },
              ],
            },
          ],
          p = (e) => {
            if (!(e < 0) && !(e >= u.length)) return u[e];
          },
          m = (e) => u.find((t) => t.id === e),
          h = (e) => u.findIndex((t) => t.id === e),
          g = () => u.length,
          f = u.map((e) => e.id);
      },
      16979: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { J: () => l });
            var i = r(61268),
              a = r(30595);
            r(84205);
            var o = r(15942),
              n = e([o]);
            function l({ className: e, ...t }) {
              return (0, i.jsx)(a.b, {
                "data-slot": "label",
                className: (0, o.cn)(
                  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  e,
                ),
                ...t,
              });
            }
            (o = (n.then ? (await n)() : n)[0]), s();
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
      21366: (e, t, r) => {
        "use strict";
        r.d(t, { j: () => a });
        var s = r(61268),
          i = r(61950);
        function a({ message: e }) {
          return e
            ? (0, s.jsxs)("div", {
                className:
                  "bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive",
                children: [
                  (0, s.jsx)(i.A, { className: "h-4 w-4" }),
                  (0, s.jsx)("p", { children: e }),
                ],
              })
            : null;
        }
      },
      21380: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => m,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var i = r(63033),
          a = r(26394),
          o = r(60442),
          n = (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\auth\\\\login\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\auth\\login\\page.tsx",
            "default",
          );
        let l = { ...i },
          d =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof n
            ? new Proxy(n, {
                apply: (e, t, r) => {
                  let s, i, a;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (i = e?.headers.get("baggage") ?? void 0),
                      (a = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/auth/login",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: i,
                      headers: a,
                    })
                    .apply(t, r);
                },
              })
            : n;
        let c = void 0,
          u = void 0,
          p = void 0,
          m = s;
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
      32367: (e, t, r) => {
        "use strict";
        let s;
        r.d(t, { AG: () => y, Iw: () => g, UU: () => f });
        var i = r(97713),
          a = r(15149),
          o = r.n(a),
          n = r(84205);
        let { fetch: l } = o()(),
          d = "http://localhost:54321",
          c =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          u = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = c ? { apikey: c } : void 0;
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
        function h() {
          return (m(), s)
            ? s
            : (s = (0, i.createBrowserClient)(d, c, {
                global: { headers: p },
              }));
        }
        function g() {
          return (0, n.useMemo)(h, []);
        }
        function f() {
          return (
            m(), (0, i.createBrowserClient)(d, c, { global: { headers: p } })
          );
        }
        let y = h;
        h();
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
      43128: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Mail", [
          [
            "rect",
            {
              width: "20",
              height: "16",
              x: "2",
              y: "4",
              rx: "2",
              key: "18n3k1",
            },
          ],
          [
            "path",
            { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" },
          ],
        ]);
      },
      43946: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("KeyRound", [
          [
            "path",
            {
              d: "M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z",
              key: "167ctg",
            },
          ],
          [
            "circle",
            {
              cx: "16.5",
              cy: "7.5",
              r: ".5",
              fill: "currentColor",
              key: "w0ekpg",
            },
          ],
        ]);
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      47894: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => N });
            var i = r(61268),
              a = r(97052),
              o = r(6130),
              n = r(85044),
              l = r(43128),
              d = r(43946),
              c = r(66135),
              u = r(9845),
              p = r(31655),
              m = r.n(p),
              h = r(89882),
              g = r(84205),
              f = r(36322),
              y = r(97721),
              x = r(16979),
              w = r(15090),
              v = r(3519),
              b = r(5224),
              A = r(28909),
              S = r(5451),
              k = r(21366),
              j = r(78337),
              _ = r(16176),
              C = e([x, A, S, j, _]);
            function N() {
              let [e, t] = (0, g.useState)(!1),
                { signIn: r, user: s, session: p } = (0, v.useAuth)(),
                { toast: C } = (0, w.d)();
              (0, h.useRouter)(),
                (0, h.useSearchParams)().get("redirectedFrom");
              let {
                  register: N,
                  handleSubmit: P,
                  formState: { errors: E },
                } = (0, f.mN)({
                  resolver: (0, a.u)(b.X5),
                  defaultValues: { email: "", password: "" },
                }),
                T = async (e) => {
                  t(!0);
                  try {
                    await r(e.email, e.password);
                    try {
                      await fetch("/api/onboarding/init", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                      });
                    } catch (e) {
                      console.error("Error initializing onboarding:", e);
                    }
                    C({
                      title: "Login",
                      description: "You have successfully logged in.",
                    });
                  } catch (e) {
                    C({
                      variant: "destructive",
                      title: "Error",
                      description:
                        e instanceof Error
                          ? e.message
                          : "Invalid email or password. Please try again.",
                    });
                  } finally {
                    t(!1);
                  }
                };
              return (0, i.jsxs)(i.Fragment, {
                children: [
                  (0, i.jsx)(y.U, {}),
                  (0, i.jsxs)("div", {
                    className:
                      "bg-gradient-to-br from-background to-muted flex min-h-svh flex-col items-center justify-center p-4 md:p-8",
                    children: [
                      (0, i.jsx)("div", {
                        className:
                          "absolute top-4 right-4 flex items-center gap-2",
                      }),
                      (0, i.jsxs)(o.P.div, {
                        initial: { opacity: 0, y: -20 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.3 },
                        className:
                          "w-full max-w-md px-4 py-8 flex flex-col items-center gap-8",
                        children: [
                          (0, i.jsxs)(m(), {
                            href: "/",
                            className:
                              "flex items-center gap-3 self-center transition-transform hover:scale-105",
                            legacyBehavior: !0,
                            children: [
                              (0, i.jsx)("div", {
                                className:
                                  "bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md shadow-md",
                                children: (0, i.jsx)(n.A, {
                                  className: "size-4",
                                }),
                              }),
                              (0, i.jsx)("span", {
                                className:
                                  "font-semibold text-xl tracking-tight",
                                children: "Hijraah",
                              }),
                            ],
                          }),
                          (0, i.jsx)(o.P.div, {
                            initial: { opacity: 0, scale: 0.95 },
                            animate: { opacity: 1, scale: 1 },
                            transition: { delay: 0.1, duration: 0.4 },
                            className: "w-full",
                            children: (0, i.jsxs)(S.Zp, {
                              className: "border-border/30 shadow-lg",
                              children: [
                                (0, i.jsxs)(S.aR, {
                                  className: "space-y-2 text-center pb-6",
                                  children: [
                                    (0, i.jsx)(S.ZB, {
                                      className: "text-2xl font-bold",
                                      children: "Login to your account",
                                    }),
                                    (0, i.jsx)(S.BT, {
                                      className: "text-muted-foreground",
                                      children:
                                        "Enter your credentials to access your account",
                                    }),
                                  ],
                                }),
                                (0, i.jsx)(S.Wu, {
                                  children: (0, i.jsx)("form", {
                                    onSubmit: P(T),
                                    className: "space-y-6",
                                    children: (0, i.jsxs)("div", {
                                      className: "flex flex-col gap-6",
                                      children: [
                                        (0, i.jsxs)("div", {
                                          className: "flex flex-col gap-3",
                                          children: [
                                            (0, i.jsxs)(A.$, {
                                              variant: "outline",
                                              className:
                                                "w-full shadow-sm hover:shadow-md transition-all px-4 py-2 flex items-center text-sm",
                                              children: [
                                                (0, i.jsx)("svg", {
                                                  xmlns:
                                                    "http://www.w3.org/2000/svg",
                                                  viewBox: "0 0 24 24",
                                                  className:
                                                    "flex-shrink-0 size-4 mr-2",
                                                  children: (0, i.jsx)("path", {
                                                    d: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
                                                    fill: "currentColor",
                                                  }),
                                                }),
                                                "Sign in with Apple",
                                              ],
                                            }),
                                            (0, i.jsxs)(A.$, {
                                              variant: "outline",
                                              className:
                                                "w-full shadow-sm hover:shadow-md transition-all px-4 py-2 flex items-center text-sm",
                                              children: [
                                                (0, i.jsx)("svg", {
                                                  xmlns:
                                                    "http://www.w3.org/2000/svg",
                                                  viewBox: "0 0 24 24",
                                                  className:
                                                    "flex-shrink-0 size-4 mr-2",
                                                  children: (0, i.jsx)("path", {
                                                    d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 3.36 2.16 2.16 2.84 5.213 2.84 7.667 0 .76-.053 1.467-.173 2.053H12.48z",
                                                    fill: "currentColor",
                                                  }),
                                                }),
                                                "Sign in with Google",
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, i.jsxs)("div", {
                                          className:
                                            "relative flex items-center gap-2 py-2",
                                          children: [
                                            (0, i.jsx)(_.Separator, {
                                              className: "flex-1",
                                            }),
                                            (0, i.jsx)("span", {
                                              className:
                                                "text-xs text-muted-foreground font-medium bg-card px-2",
                                              children: "Or continue with",
                                            }),
                                            (0, i.jsx)(_.Separator, {
                                              className: "flex-1",
                                            }),
                                          ],
                                        }),
                                        (0, i.jsxs)("div", {
                                          className: "space-y-4",
                                          children: [
                                            (0, i.jsxs)("div", {
                                              className: "space-y-2",
                                              children: [
                                                (0, i.jsx)(x.J, {
                                                  htmlFor: "email",
                                                  className:
                                                    "text-sm font-medium",
                                                  children: "Email",
                                                }),
                                                (0, i.jsxs)("div", {
                                                  className: "relative",
                                                  children: [
                                                    (0, i.jsx)(l.A, {
                                                      className:
                                                        "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                                                    }),
                                                    (0, i.jsx)(j.p, {
                                                      id: "email",
                                                      type: "email",
                                                      placeholder:
                                                        "Enter your email",
                                                      className: "pl-10",
                                                      "aria-invalid": !!E.email,
                                                      "aria-describedby":
                                                        E.email
                                                          ? "email-error"
                                                          : void 0,
                                                      disabled: e,
                                                      ...N("email"),
                                                    }),
                                                  ],
                                                }),
                                                E.email &&
                                                  (0, i.jsx)(k.j, {
                                                    message: E.email.message,
                                                    id: "email-error",
                                                  }),
                                              ],
                                            }),
                                            (0, i.jsxs)("div", {
                                              className: "space-y-2",
                                              children: [
                                                (0, i.jsxs)("div", {
                                                  className:
                                                    "flex items-center justify-between",
                                                  children: [
                                                    (0, i.jsx)(x.J, {
                                                      htmlFor: "password",
                                                      className:
                                                        "text-sm font-medium",
                                                      children: "Password",
                                                    }),
                                                    (0, i.jsx)(m(), {
                                                      href: "/auth/forgot-password",
                                                      className:
                                                        "text-xs text-primary hover:underline underline-offset-4 transition-colors",
                                                      "aria-label":
                                                        "Forgot Password",
                                                      children:
                                                        "Forgot Password?",
                                                    }),
                                                  ],
                                                }),
                                                (0, i.jsxs)("div", {
                                                  className: "relative",
                                                  children: [
                                                    (0, i.jsx)(d.A, {
                                                      className:
                                                        "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                                                    }),
                                                    (0, i.jsx)(j.p, {
                                                      id: "password",
                                                      type: "password",
                                                      className: "pl-10",
                                                      "aria-invalid":
                                                        !!E.password,
                                                      "aria-describedby":
                                                        E.password
                                                          ? "password-error"
                                                          : void 0,
                                                      disabled: e,
                                                      ...N("password"),
                                                    }),
                                                  ],
                                                }),
                                                E.password &&
                                                  (0, i.jsx)(k.j, {
                                                    message: E.password.message,
                                                    id: "password-error",
                                                  }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, i.jsx)(A.$, {
                                          type: "submit",
                                          className: "w-full font-medium",
                                          disabled: e,
                                          children: e
                                            ? (0, i.jsxs)(i.Fragment, {
                                                children: [
                                                  (0, i.jsx)(c.A, {
                                                    className:
                                                      "mr-2 h-4 w-4 animate-spin",
                                                  }),
                                                  "Loading...",
                                                ],
                                              })
                                            : (0, i.jsxs)(i.Fragment, {
                                                children: [
                                                  "Sign In",
                                                  (0, i.jsx)(u.A, {
                                                    className: "ml-2 h-4 w-4",
                                                  }),
                                                ],
                                              }),
                                        }),
                                      ],
                                    }),
                                  }),
                                }),
                                (0, i.jsx)(S.wL, {
                                  className:
                                    "flex justify-center border-t bg-muted/30 p-4",
                                  children: (0, i.jsxs)("p", {
                                    className: "text-center text-sm",
                                    children: [
                                      "Don't have an account?",
                                      " ",
                                      (0, i.jsx)(m(), {
                                        href: "/auth/register",
                                        className:
                                          "text-primary font-medium hover:underline underline-offset-4",
                                        children: "Create an account",
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                          }),
                          (0, i.jsxs)("p", {
                            className:
                              "text-muted-foreground text-center text-xs max-w-xs",
                            children: [
                              "By clicking Sign In, you agree to our",
                              " ",
                              (0, i.jsx)(m(), {
                                href: "/terms",
                                className:
                                  "text-primary hover:underline underline-offset-4",
                                children: "Terms of Service",
                              }),
                              " ",
                              "and",
                              " ",
                              (0, i.jsx)(m(), {
                                href: "/privacy",
                                className:
                                  "text-primary hover:underline underline-offset-4",
                                children: "Privacy Policy",
                              }),
                              ".",
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
            }
            ([x, A, S, j, _] = C.then ? (await C)() : C), s();
          } catch (e) {
            s(e);
          }
        });
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
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      56558: (e, t, r) => {
        "use strict";
        r.d(t, { hO: () => l, sG: () => n });
        var s = r(84205),
          i = r(90304),
          a = r(86415),
          o = r(61268),
          n = [
            "a",
            "button",
            "div",
            "form",
            "h2",
            "h3",
            "img",
            "input",
            "label",
            "li",
            "nav",
            "ol",
            "p",
            "select",
            "span",
            "svg",
            "ul",
          ].reduce((e, t) => {
            let r = (0, a.TL)(`Primitive.${t}`),
              i = s.forwardRef((e, s) => {
                let { asChild: i, ...a } = e;
                return (
                  "undefined" != typeof window &&
                    (window[Symbol.for("radix-ui")] = !0),
                  (0, o.jsx)(i ? r : t, { ...a, ref: s })
                );
              });
            return (i.displayName = `Primitive.${t}`), { ...e, [t]: i };
          }, {});
        function l(e, t) {
          e && i.flushSync(() => e.dispatchEvent(t));
        }
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      58882: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Upload", [
          [
            "path",
            { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" },
          ],
          ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
          ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }],
        ]);
      },
      59570: () => {},
      60655: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 21380));
      },
      61460: (e, t, r) => {
        "use strict";
        r.d(t, { _m: () => p });
        class s extends Error {
          constructor(e, t, r, s) {
            super(e),
              (this.name = "AuthError"),
              (this.code = t),
              (this.status = s),
              (this.originalError = r);
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
        class i extends s {
          constructor(e = "Authentication required", t) {
            super(e, "auth/unauthorized", t, 401),
              (this.name = "UnauthorizedError");
          }
        }
        class a extends s {
          constructor(e = "Insufficient permissions", t) {
            super(e, "auth/forbidden", t, 403), (this.name = "ForbiddenError");
          }
        }
        class o extends s {
          constructor(e = "Session error", t) {
            super(e, "auth/session-error", t, 400),
              (this.name = "SessionError");
          }
        }
        class n extends s {
          constructor(e = "Invalid credentials", t) {
            super(e, "auth/invalid-credentials", t, 401),
              (this.name = "InvalidCredentialsError");
          }
        }
        class l extends s {
          constructor(e = "User operation failed", t) {
            super(e, "auth/user-operation-failed", t, 400),
              (this.name = "UserOperationError");
          }
        }
        let d = { roles: {}, superAdminRole: "admin", enableCache: !0 };
        class c {
          constructor(e = {}) {
            this.permissionCache = new Map();
            let t = { ...d, ...e };
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
            let r = this.roles[e];
            if (!r) return new Set();
            let s = new Set(r.permissions);
            if (r.inherits && r.inherits.length > 0)
              for (let e of r.inherits)
                this.getRolePermissions(e, t).forEach((e) => s.add(e));
            return s;
          }
          getUserPermissions(e) {
            if (!e) return new Set();
            let t = this.extractRoles(e);
            if (t.includes(this.superAdminRole)) return new Set(["*"]);
            if (this.enableCache) {
              let e = t.sort().join(","),
                r = this.permissionCache.get(e);
              if (r) return r;
            }
            let r = new Set();
            for (let e of t)
              this.getRolePermissions(e).forEach((e) => r.add(e));
            if (this.enableCache && t.length > 0) {
              let e = t.sort().join(",");
              this.permissionCache.set(e, r);
            }
            return r;
          }
          hasRole(e, t) {
            if (!e) return !1;
            let r = this.extractRoles(e);
            return r.includes(t) || r.includes(this.superAdminRole);
          }
          hasPermission(e, t) {
            if (!e) return !1;
            let r = this.getUserPermissions(e);
            if (r.has("*") || r.has(t)) return !0;
            let s = t.split(":");
            for (let e = 1; e <= s.length; e++) {
              let t = [...s.slice(0, e), "*"].join(":");
              if (r.has(t)) return !0;
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
              throw new a(`Missing required permission: ${t}`);
          }
          enforceAnyPermission(e, t) {
            if (!this.hasAnyPermission(e, t))
              throw new a(
                `Missing at least one of the required permissions: ${t.join(", ")}`,
              );
          }
          enforceAllPermissions(e, t) {
            if (!this.hasAllPermissions(e, t))
              throw new a(
                `Missing some of the required permissions: ${t.join(", ")}`,
              );
          }
          createPermission(e, t) {
            return `${e}:${t}`;
          }
        }
        let u = null;
        function p(e, t) {
          var r;
          return (u || (u = new c(void 0)), u).hasPermission(e, t);
        }
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
      66135: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Loader2", [
          ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }],
        ]);
      },
      67135: (e, t, r) => {
        "use strict";
        r.d(t, { X: () => p, z: () => u });
        var s = r(61268),
          i = r(97713),
          a = r(84205),
          o = r(98654),
          n = r(16951),
          l = r(32367);
        let d = {
            currentStep: "welcome",
            progress: 0,
            isCompleted: !1,
            isActive: !1,
            hideForSession: !1,
          },
          c = (0, a.createContext)(void 0),
          u = () => {
            let e = (0, a.useContext)(c);
            if (!e)
              throw Error(
                "useOnboarding must be used within an OnboardingProvider",
              );
            return e;
          },
          p = ({ children: e }) => {
            let [t, r] = (0, a.useState)({ hideForSession: !1 }),
              [u, p] = (0, a.useState)(null),
              m = (0, i.createBrowserClient)(
                "http://localhost:54321",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
              );
            (0, a.useEffect)(() => {
              (async () => {
                let { data: e } = await m.auth.getUser();
                p(e.user);
              })();
              let { data: e } = m.auth.onAuthStateChange(async (e, t) => {
                p(t?.user ?? null),
                  ("SIGNED_IN" === e || "SIGNED_OUT" === e) &&
                    r((e) => ({ ...e, hideForSession: !1 }));
              });
              return () => {
                e.subscription.unsubscribe();
              };
            }, [m]);
            let {
                onboardingState: h,
                updateOnboardingState: g,
                isLoading: f,
              } = (function (e) {
                let [t, r] = (0, a.useState)(d),
                  [s, i] = (0, a.useState)(!0),
                  n = (0, l.Iw)(),
                  c = (0, a.useCallback)(
                    async (s) => {
                      if (!e) return;
                      let i = { ...t, ...s };
                      if ((r(i), i.isActive))
                        try {
                          let { error: t } = await n
                            .from("user_onboarding")
                            .upsert({
                              user_id: e.id,
                              current_step: i.currentStep,
                              progress: i.progress,
                              is_completed: i.isCompleted,
                              updated_at: new Date().toISOString(),
                            });
                          t &&
                            (console.error(
                              "[OnboardingPersistence] updateOnboardingState: Upsert error:",
                              t,
                            ),
                            o.oR.error("Failed to save onboarding progress."));
                        } catch (e) {
                          console.error(
                            "[OnboardingPersistence] updateOnboardingState: Unexpected upsert error:",
                            e,
                          ),
                            o.oR.error(
                              "An error occurred while saving onboarding progress.",
                            );
                        }
                    },
                    [e, n, t],
                  );
                return {
                  onboardingState: t,
                  updateOnboardingState: c,
                  isLoading: s,
                };
              })(u),
              y = (0, a.useMemo)(
                () => ({ ...h, hideForSession: t.hideForSession }),
                [h, t.hideForSession],
              ),
              x = (e) => {
                let t = (0, n.Yk)();
                return t <= 1 ? 100 : Math.round((e / (t - 1)) * 100);
              },
              w = (0, a.useCallback)(() => {
                let e = (0, n.B5)(y.currentStep),
                  t = (0, n.Yk)();
                if (e < t - 1) {
                  let t = e + 1;
                  g({ currentStep: n.ZH[t], progress: x(t), isCompleted: !1 });
                } else
                  e === t - 1 &&
                    (g({ progress: 100, isCompleted: !0, isActive: !1 }),
                    o.oR.success("Onboarding complete! You're all set."));
              }, [y.currentStep, g]),
              v = (0, a.useCallback)(() => {
                let e = (0, n.B5)(y.currentStep);
                if (e > 0) {
                  let t = e - 1;
                  g({ currentStep: n.ZH[t], progress: x(t), isCompleted: !1 });
                }
              }, [y.currentStep, g]),
              b = (0, a.useCallback)(() => {
                g({ progress: 100, isCompleted: !0, isActive: !1 }),
                  o.oR.info("Onboarding skipped.");
              }, [g]),
              A = (0, a.useCallback)(() => {
                r((e) => ({ ...e, hideForSession: !0 }));
              }, []),
              S = (0, a.useCallback)(() => {
                g({
                  currentStep: n.ZH[0],
                  progress: 0,
                  isCompleted: !1,
                  isActive: !0,
                  hideForSession: !1,
                }),
                  r({ hideForSession: !1 }),
                  o.oR.info("Onboarding restarted.");
              }, [y, g]),
              k = (0, a.useCallback)(
                (e) => {
                  if (y.currentStep === e && !y.isCompleted) {
                    let t = n.Zj.find((t) => t.id === e);
                    t?.actionKey &&
                      fetch("/api/onboarding/actions", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          actionKey: t.actionKey,
                          isCompleted: !0,
                        }),
                      }).catch((r) => {
                        console.error(
                          `Failed to mark step ${e} action ${t.actionKey} as completed:`,
                          r,
                        );
                      }),
                      w();
                  }
                },
                [y.currentStep, y.isCompleted, w],
              );
            return (0, s.jsx)(c.Provider, {
              value: {
                onboarding: y,
                isLoading: f,
                user: u,
                nextStep: w,
                previousStep: v,
                skipOnboarding: b,
                hideOnboardingForSession: A,
                resetOnboarding: S,
                completeStep: k,
              },
              children: e,
            });
          };
      },
      68903: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 47894));
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
      78337: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { p: () => n });
            var i = r(61268);
            r(84205);
            var a = r(15942),
              o = e([a]);
            function n({ className: e, type: t, ...r }) {
              return (0, i.jsx)("input", {
                type: t,
                "data-slot": "input",
                className: (0, a.cn)(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  e,
                ),
                ...r,
              });
            }
            (a = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
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
      80305: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Flag", [
          [
            "path",
            {
              d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",
              key: "i9b6wo",
            },
          ],
          ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }],
        ]);
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
      85044: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("GalleryVerticalEnd", [
          ["path", { d: "M7 2h10", key: "nczekb" }],
          ["path", { d: "M5 6h14", key: "u2x4p" }],
          [
            "rect",
            {
              width: "18",
              height: "12",
              x: "3",
              y: "10",
              rx: "2",
              key: "l0tzu3",
            },
          ],
        ]);
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
      92663: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("BookOpen", [
          [
            "path",
            { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", key: "vv98re" },
          ],
          [
            "path",
            { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", key: "1cyq3y" },
          ],
        ]);
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      95255: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => o });
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
        let a = (e) =>
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
                  absoluteStrokeWidth: l,
                  className: d = "",
                  children: c,
                  ...u
                },
                p,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: p,
                    ...i,
                    width: o,
                    height: o,
                    stroke: r,
                    strokeWidth: l ? (24 * Number(n)) / Number(o) : n,
                    className: ["lucide", `lucide-${a(e)}`, d].join(" "),
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
      97721: (e, t, r) => {
        "use strict";
        r.d(t, { U: () => n });
        var s = r(89882);
        r(84205);
        var i = r(67135),
          a = r(3519),
          o = r(32367);
        function n() {
          (0, s.useRouter)();
          let { user: e } = (0, a.useAuth)();
          (0, o.UU)();
          let { onboarding: t } = (0, i.z)();
          return null;
        }
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
    s = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 1655, 5728, 7401, 1502, 7052,
        3749, 4630,
      ],
      () => r(11404),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
