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
    (e._sentryDebugIds[t] = "2e8ca758-5777-4457-a1f8-168c27c646a2"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-2e8ca758-5777-4457-a1f8-168c27c646a2"));
} catch (e) {}
(exports.id = 27),
  (exports.ids = [27]),
  (exports.modules = {
    10812: (e, t, a) => {
      "use strict";
      a.a(e, async (e, r) => {
        try {
          a.d(t, { H: () => o });
          var s = a(61268),
            i = a(43572);
          a(84205);
          var l = a(23734),
            n = e([l]);
          function o({
            user: e,
            className: t = "",
            fallbackClassName: a = "",
            size: r = "md",
            shape: n = "circle",
          }) {
            let o = { circle: "rounded-full", square: "rounded-lg" };
            return (0, s.jsxs)(l.eu, {
              className: `${{ sm: "h-8 w-8", md: "h-10 w-10", lg: "h-16 w-16", xl: "h-24 w-24" }[r]} ${o[n]} ${t}`,
              children: [
                e?.avatar
                  ? (0, s.jsx)(l.BK, {
                      src: e.avatar,
                      alt: e?.name || "User Avatar",
                      onError: (e) => {
                        console.warn("Avatar image failed to load:", e),
                          (e.target.style.display = "none");
                      },
                    })
                  : null,
                (0, s.jsx)(l.q5, {
                  className: `${o[n]} ${a}`,
                  children: e?.name
                    ? e?.name
                      ? e.name
                          .split(" ")
                          .map((e) => e[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()
                      : "?"
                    : (0, s.jsx)(i.A, { className: "h-5 w-5" }),
                }),
              ],
            });
          }
          (l = (n.then ? (await n)() : n)[0]), r();
        } catch (e) {
          r(e);
        }
      });
    },
    15090: (e, t, a) => {
      "use strict";
      a.d(t, { d: () => h });
      var r = a(84205);
      let s = {
          ADD_TOAST: "ADD_TOAST",
          UPDATE_TOAST: "UPDATE_TOAST",
          DISMISS_TOAST: "DISMISS_TOAST",
          REMOVE_TOAST: "REMOVE_TOAST",
        },
        i = 0,
        l = new Map(),
        n = (e, t) => {
          switch (t.type) {
            case s.ADD_TOAST:
              return { ...e, toasts: [t.toast, ...e.toasts].slice(0, 5) };
            case s.UPDATE_TOAST:
              return {
                ...e,
                toasts: e.toasts.map((e) =>
                  e.id === t.toast.id ? { ...e, ...t.toast } : e,
                ),
              };
            case s.DISMISS_TOAST: {
              let { toastId: a } = t;
              if (a) l.has(a) && (clearTimeout(l.get(a)), l.delete(a));
              else for (let [e, t] of l.entries()) clearTimeout(t), l.delete(e);
              return {
                ...e,
                toasts: e.toasts.map((e) =>
                  e.id === a || void 0 === a ? { ...e, open: !1 } : e,
                ),
              };
            }
            case s.REMOVE_TOAST:
              if (void 0 === t.toastId) return { ...e, toasts: [] };
              return {
                ...e,
                toasts: e.toasts.filter((e) => e.id !== t.toastId),
              };
          }
        },
        o = [],
        c = { toasts: [] };
      function d(e) {
        (c = n(c, e)),
          o.forEach((e) => {
            e(c);
          });
      }
      function u({ ...e }) {
        let t = (i = (i + 1) % Number.MAX_VALUE).toString(),
          a = () => d({ type: s.DISMISS_TOAST, toastId: t });
        return (
          d({
            type: s.ADD_TOAST,
            toast: {
              ...e,
              id: t,
              open: !0,
              onOpenChange: (e) => {
                e || a();
              },
            },
          }),
          {
            id: t,
            dismiss: a,
            update: (e) => d({ type: s.UPDATE_TOAST, toast: { ...e, id: t } }),
          }
        );
      }
      function h() {
        let [e, t] = r.useState(c);
        return (
          r.useEffect(
            () => (
              o.push(t),
              () => {
                let e = o.indexOf(t);
                e > -1 && o.splice(e, 1);
              }
            ),
            [e],
          ),
          {
            ...e,
            toast: u,
            dismiss: (e) => d({ type: s.DISMISS_TOAST, toastId: e }),
          }
        );
      }
    },
    29997: (e, t, a) => {
      "use strict";
      let r;
      a.d(t, { M: () => p });
      var s = a(61120);
      a(94046);
      var i = a(39917),
        l = a(67303),
        n = a(61260),
        o = a.n(n);
      a(65244);
      let { fetch: c } = o()(),
        d = "http://localhost:54321",
        u =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
        h = process.env.SUPABASE_SERVICE_ROLE_KEY,
        m = u ? { apikey: u } : void 0,
        f = h ? { apikey: h } : void 0;
      {
        let e = globalThis;
        e.__USING_PONYFETCH__ || ((e.fetch = c), (e.__USING_PONYFETCH__ = !0));
      }
      async function p(e) {
        if (!e) return !1;
        try {
          let t = (function () {
              if (!d || !h)
                throw (
                  (console.error("Supabase URL or Service Role Key is missing"),
                  Error("Supabase service client configuration is incomplete."))
                );
              return (0, l.createClient)(d, h, {
                auth: { autoRefreshToken: !1, persistSession: !1 },
                global: { fetch: c, headers: f },
              });
            })(),
            { data: a, error: r } = await t
              .from("admin_users")
              .select("is_admin")
              .eq("user_id", e)
              .maybeSingle();
          if (r)
            return (
              console.error(
                `Error checking admin_users table for user ${e}:`,
                r.message,
              ),
              !1
            );
          return !!a?.is_admin;
        } catch (t) {
          return (
            console.error(
              `Exception during admin status check for user ${e}:`,
              t.message,
            ),
            !1
          );
        }
      }
      (function () {
        if (!d || !u)
          throw (
            (console.error(
              "Missing environment variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
            ),
            Error("Supabase URL or Anon Key is missing."))
          );
      })(),
        r || (r = (0, i.createBrowserClient)(d, u, { global: { headers: m } })),
        (0, a(31706).D)([p]),
        (0, s.A)(p, "4055c9f9dce3c849928e65e87017b3609674121d00", null);
    },
    33192: (e, t, a) => {
      "use strict";
      a.a(e, async (e, r) => {
        try {
          a.d(t, { r: () => v });
          var s = a(61268),
            i = a(96581),
            l = a(82285),
            n = a(206),
            o = a(67060),
            c = a(96465),
            d = a(66341),
            u = a(13274),
            h = a(96648),
            m = a(31655),
            f = a.n(m),
            p = a(98654),
            g = a(3519),
            x = a(28909),
            y = a(93336),
            w = a(33713),
            j = a(10812),
            b = e([x, y, w, j]);
          function v({ user: e }) {
            let { isMobile: t } = (0, w.cL)(),
              { signOut: a } = (0, g.useAuth)();
            if (!e)
              return (0, s.jsx)(w.wZ, {
                children: (0, s.jsxs)(w.FX, {
                  className: "flex gap-2",
                  children: [
                    (0, s.jsx)(x.$, {
                      asChild: !0,
                      variant: "outline",
                      className:
                        "w-full border-blue-500 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-900/30",
                      size: "sm",
                      children: (0, s.jsxs)(f(), {
                        href: "/auth/login",
                        children: [
                          (0, s.jsx)(i.A, { className: "mr-2 h-4 w-4" }),
                          "Sign In",
                        ],
                      }),
                    }),
                    (0, s.jsx)(x.$, {
                      asChild: !0,
                      className:
                        "w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 shadow-sm",
                      size: "sm",
                      children: (0, s.jsxs)(f(), {
                        href: "/auth/register",
                        children: [
                          (0, s.jsx)(l.A, { className: "mr-2 h-4 w-4" }),
                          "Sign Up",
                        ],
                      }),
                    }),
                  ],
                }),
              });
            let r = async () => {
              try {
                if (!a) {
                  p.oR.error("Logout function not available"),
                    console.error("SignOut function is undefined");
                  return;
                }
                await a(), p.oR.success("Logged out successfully");
              } catch (e) {
                console.error("Logout failed:", e),
                  p.oR.error("Failed to logout. Please try again.");
              }
            };
            return (0, s.jsx)(w.wZ, {
              children: (0, s.jsx)(w.FX, {
                children: (0, s.jsxs)(y.rI, {
                  children: [
                    (0, s.jsx)(y.ty, {
                      asChild: !0,
                      children: (0, s.jsxs)(w.Uj, {
                        size: "lg",
                        className:
                          "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                        children: [
                          (0, s.jsx)(j.H, {
                            user: e,
                            size: "sm",
                            shape: "square",
                            className: "rounded-lg",
                          }),
                          (0, s.jsxs)("div", {
                            className:
                              "grid flex-1 text-left text-sm leading-tight",
                            children: [
                              (0, s.jsx)("span", {
                                className: "truncate font-medium",
                                children: e.name,
                              }),
                              (0, s.jsx)("span", {
                                className: "truncate text-xs",
                                children: e.email,
                              }),
                            ],
                          }),
                          (0, s.jsx)(n.A, { className: "ml-auto size-4" }),
                        ],
                      }),
                    }),
                    (0, s.jsxs)(y.SQ, {
                      className:
                        "w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg",
                      side: t ? "bottom" : "right",
                      align: "end",
                      sideOffset: 4,
                      children: [
                        (0, s.jsx)(y.lp, {
                          className: "p-0 font-normal",
                          children: (0, s.jsxs)("div", {
                            className:
                              "flex items-center gap-2 px-1 py-1.5 text-left text-sm",
                            children: [
                              (0, s.jsx)(j.H, {
                                user: e,
                                size: "sm",
                                shape: "square",
                                className: "rounded-lg",
                              }),
                              (0, s.jsxs)("div", {
                                className:
                                  "grid flex-1 text-left text-sm leading-tight",
                                children: [
                                  (0, s.jsx)("span", {
                                    className: "truncate font-medium",
                                    children: e.name,
                                  }),
                                  (0, s.jsx)("span", {
                                    className: "truncate text-xs",
                                    children: e.email,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                        (0, s.jsx)(y.mB, {}),
                        (0, s.jsx)(y.I, {
                          children: (0, s.jsx)(y._2, {
                            asChild: !0,
                            children: (0, s.jsxs)(f(), {
                              href: "/subscription/plans",
                              children: [
                                (0, s.jsx)(o.A, { className: "mr-2 h-4 w-4" }),
                                "Upgrade to Pro",
                              ],
                            }),
                          }),
                        }),
                        (0, s.jsx)(y.mB, {}),
                        (0, s.jsxs)(y.I, {
                          children: [
                            (0, s.jsx)(y._2, {
                              asChild: !0,
                              children: (0, s.jsxs)(f(), {
                                href: "/profile",
                                "data-tour": "profile",
                                children: [
                                  (0, s.jsx)(c.A, {
                                    className: "mr-2 h-4 w-4",
                                  }),
                                  "Account",
                                ],
                              }),
                            }),
                            (0, s.jsx)(y._2, {
                              asChild: !0,
                              children: (0, s.jsxs)(f(), {
                                href: "/settings/billing",
                                children: [
                                  (0, s.jsx)(d.A, {
                                    className: "mr-2 h-4 w-4",
                                  }),
                                  "Billing",
                                ],
                              }),
                            }),
                            (0, s.jsx)(y._2, {
                              asChild: !0,
                              children: (0, s.jsxs)(f(), {
                                href: "/settings?tab=notifications",
                                children: [
                                  (0, s.jsx)(u.A, {
                                    className: "mr-2 h-4 w-4",
                                  }),
                                  "Notifications",
                                ],
                              }),
                            }),
                          ],
                        }),
                        (0, s.jsx)(y.mB, {}),
                        (0, s.jsxs)(y._2, {
                          onClick: r,
                          children: [
                            (0, s.jsx)(h.A, { className: "mr-2 h-4 w-4" }),
                            "Log out",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            });
          }
          ([x, y, w, j] = b.then ? (await b)() : b), r();
        } catch (e) {
          r(e);
        }
      });
    },
    43851: (e, t, a) => {
      "use strict";
      a.a(e, async (e, r) => {
        try {
          a.d(t, { AppSidebar: () => S });
          var s = a(61268),
            i = a(70753),
            l = a(12335),
            n = a(15127),
            o = a(15014),
            c = a(95124),
            d = a(84205),
            u = a(51005),
            h = a(28909),
            m = a(94812),
            f = a(79366),
            p = a(64012),
            g = a(58702),
            x = a(3452),
            y = a(3519);
          a(92542);
          var w = a(32367),
            j = a(15942),
            b = a(33192),
            v = a(33713),
            N = e([h, m, j, b, v]);
          [h, m, j, b, v] = N.then ? (await N)() : N;
          let E = {
            navMain: [
              {
                titleKey: "dashboard",
                url: "/dashboard",
                items: [
                  { titleKey: "overview", url: "/dashboard" },
                  { titleKey: "cases", url: "/dashboard/cases" },
                ],
              },
              {
                titleKey: "caseManagement",
                url: "/dashboard/cases",
                items: [
                  { titleKey: "allCases", url: "/dashboard/cases" },
                  { titleKey: "newCase", url: "/dashboard/cases/new" },
                  {
                    titleKey: "assignedCases",
                    url: "/dashboard/cases?assigned=true",
                  },
                  {
                    titleKey: "caseTemplates",
                    url: "/dashboard/cases/templates",
                  },
                  { titleKey: "reports", url: "/dashboard/cases/reports" },
                ],
              },
              {
                titleKey: "immigrationServices",
                url: "#",
                items: [
                  { titleKey: "visaApplications", url: "/services/visas" },
                  { titleKey: "workPermits", url: "/services/work-permits" },
                  { titleKey: "residency", url: "/services/residency" },
                  { titleKey: "citizenship", url: "/services/citizenship" },
                  { titleKey: "familySponsorship", url: "/services/family" },
                  {
                    titleKey: "businessImmigration",
                    url: "/services/business",
                  },
                ],
              },
              {
                titleKey: "documents",
                url: "/documents",
                items: [
                  { titleKey: "myDocuments", url: "/documents" },
                  { titleKey: "uploadDocuments", url: "/documents/upload" },
                  { titleKey: "documentStatus", url: "/documents/status" },
                  { titleKey: "verification", url: "/documents/verification" },
                ],
              },
              {
                titleKey: "resources",
                url: "#",
                items: [
                  {
                    titleKey: "countryInformation",
                    url: "/resources/countries",
                  },
                  { titleKey: "immigrationNews", url: "/resources/news" },
                  { titleKey: "legalRequirements", url: "/resources/legal" },
                  { titleKey: "faqs", url: "/resources/faqs" },
                ],
              },
              {
                titleKey: "support",
                url: "#",
                items: [
                  { titleKey: "chatSupport", url: "/chat" },
                  {
                    titleKey: "scheduleConsultation",
                    url: "/support/schedule",
                  },
                  { titleKey: "knowledgeBase", url: "/support/knowledge" },
                ],
              },
              {
                titleKey: "admin",
                url: "#",
                items: [
                  {
                    titleKey: "scrapingSources",
                    url: "/admin/scraping-sources",
                  },
                  { titleKey: "systemSettings", url: "/admin/settings" },
                ],
              },
            ],
          };
          function S({ ...e }) {
            let { open: t } = (0, v.cL)(),
              { user: a, isLoading: r, signOut: N } = (0, y.useAuth)(),
              { isAdmin: S } = (0, p.h)(),
              _ = (0, c.useTranslations)("sidebar"),
              A = (0, f.p)(),
              T = (0, g.V8)(A),
              O = (0, x.a8)(),
              [I, k] = (0, d.useState)(void 0);
            (0, w.Iw)();
            let [C, K] = (0, d.useState)(!1),
              [U, D] = (0, d.useState)(null),
              { getChats: F, deleteChat: M, isLoading: $ } = (0, u.Y)(),
              [P, R] = (0, d.useState)([]),
              [L, z] = (0, d.useState)(!1),
              [B, J] = (0, d.useState)(null);
            (0, d.useCallback)(async () => {
              if (!a) return void R([]);
              let e = !0;
              z(!0), J(null);
              try {
                let t = await F({ limit: 50 });
                e && R(t);
              } catch (t) {
                console.error("Error loading chats:", t),
                  e && J("Failed to load chat history.");
              } finally {
                e && z(!1);
              }
              return () => {
                e = !1;
              };
            }, [a]);
            let q = async (e, t) => {
              if (
                (e.stopPropagation(),
                e.preventDefault(),
                confirm("Are you sure you want to delete this chat?"))
              )
                try {
                  await M(t),
                    R((e) => e.filter((e) => e.id !== t)),
                    O === `/chat/${t}` && (window.location.href = "/chat/new");
                } catch (e) {
                  console.error("Error deleting chat:", e),
                    J("Failed to delete chat.");
                }
            };
            if (!t) return null;
            if (r)
              return (0, s.jsxs)(v.Bx, {
                collapsible: "icon",
                className: (0, j.cn)(
                  "border-sidebar-border bg-sidebar-background text-sidebar-foreground",
                  T ? "border-l ml-auto" : "border-r",
                ),
                ...e,
                children: [
                  (0, s.jsx)(v.Gh, {
                    children: (0, s.jsxs)("div", {
                      className: "p-4 space-y-2",
                      children: [
                        (0, s.jsx)(m.E, { className: "h-8 w-3/4" }),
                        (0, s.jsx)(m.E, { className: "h-4 w-1/2" }),
                      ],
                    }),
                  }),
                  (0, s.jsx)(v.Yv, {
                    className: "flex-1 overflow-y-auto",
                    children: (0, s.jsxs)("div", {
                      className: "p-4 space-y-4",
                      children: [
                        (0, s.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, s.jsx)(m.E, { className: "h-6 w-1/3" }),
                            (0, s.jsx)(m.E, { className: "h-8 w-full" }),
                            " ",
                            (0, s.jsx)(m.E, { className: "h-8 w-full ml-2" }),
                            (0, s.jsx)(m.E, { className: "h-8 w-full ml-2" }),
                            (0, s.jsx)(m.E, { className: "h-8 w-full ml-2" }),
                          ],
                        }),
                        [void 0, void 0, void 0, void 0].map((e, t) =>
                          (0, s.jsxs)(
                            "div",
                            {
                              className: "space-y-2",
                              children: [
                                (0, s.jsx)(m.E, { className: "h-6 w-4/5" }),
                                (0, s.jsx)(m.E, {
                                  className: "h-4 w-full ml-4",
                                }),
                                (0, s.jsx)(m.E, {
                                  className: "h-4 w-full ml-4",
                                }),
                              ],
                            },
                            t,
                          ),
                        ),
                      ],
                    }),
                  }),
                  (0, s.jsx)(v.CG, {
                    className: "border-t border-sidebar-border p-4",
                    children: (0, s.jsx)(m.E, { className: "h-10 w-full" }),
                  }),
                ],
              });
            let X = E.navMain.filter((e) => "admin" !== e.titleKey || S),
              Y = a
                ? {
                    name:
                      a.user_metadata?.full_name ||
                      a.email?.split("@")[0] ||
                      "User",
                    email: a.email || "",
                    avatar: I || "/avatars/default-1.png",
                  }
                : void 0,
              H = (e) => {
                D(U === e ? null : e);
              },
              G = (e, t = !1) => {
                if (e.url.startsWith("/admin/") && !S) return null;
                let a = O === e.url,
                  r = (0, s.jsx)(s.Fragment, { children: _(e.titleKey) }),
                  n = (0, s.jsx)(x.N_, {
                    href: e.url,
                    className: "flex-grow w-full",
                    children: r,
                  });
                return (0, s.jsxs)(
                  v.FX,
                  {
                    className: (0, j.cn)({
                      "bg-primary/10 text-primary": a,
                      "hover:bg-muted/50": !a,
                    }),
                    onClick: e.subMenu ? () => H(e.titleKey) : void 0,
                    children: [
                      e.subMenu ? r : n,
                      e.subMenu &&
                        (0, s.jsx)("span", {
                          className: "ml-auto",
                          children:
                            U === e.titleKey
                              ? (0, s.jsx)(i.A, { size: 16 })
                              : (0, s.jsx)(l.A, { size: 16 }),
                        }),
                    ],
                  },
                  e.titleKey,
                );
              };
            return (0, s.jsxs)(v.Bx, {
              collapsible: "icon",
              className: (0, j.cn)(
                "border-sidebar-border bg-sidebar-background text-sidebar-foreground",
                T ? "border-l ml-auto" : "border-r",
              ),
              ...e,
              children: [
                (0, s.jsx)(v.Gh, {
                  children: (0, s.jsx)("div", {
                    className: "p-4",
                    children: (0, s.jsx)("h2", {
                      className: "text-lg font-semibold",
                      children: "Hijraah",
                    }),
                  }),
                }),
                (0, s.jsx)(v.Yv, {
                  className: "flex-1 overflow-y-auto",
                  children: (0, s.jsxs)(v.wZ, {
                    children: [
                      (0, s.jsxs)(v.Cn, {
                        children: [
                          (0, s.jsxs)(v.jj, {
                            className: "flex items-center justify-between",
                            children: [
                              _("chats"),
                              " ",
                              (0, s.jsx)(x.N_, {
                                href: "/chat/new",
                                passHref: !0,
                                legacyBehavior: !0,
                                children: (0, s.jsxs)(h.$, {
                                  variant: "ghost",
                                  size: "icon",
                                  className: "h-6 w-6",
                                  children: [
                                    (0, s.jsx)(n.A, { size: 16 }),
                                    (0, s.jsx)("span", {
                                      className: "sr-only",
                                      children: "New Chat",
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                          L
                            ? (0, s.jsxs)(s.Fragment, {
                                children: [
                                  (0, s.jsx)(m.E, {
                                    className: "h-8 w-full my-1",
                                  }),
                                  (0, s.jsx)(m.E, {
                                    className: "h-8 w-full my-1",
                                  }),
                                  (0, s.jsx)(m.E, {
                                    className: "h-8 w-full my-1",
                                  }),
                                ],
                              })
                            : B
                              ? (0, s.jsx)("div", {
                                  className: "text-destructive text-xs px-2",
                                  children: B,
                                })
                              : 0 === P.length
                                ? (0, s.jsx)("div", {
                                    className:
                                      "text-muted-foreground text-xs px-2",
                                    children: "No chats yet.",
                                  })
                                : P.map((e) => {
                                    let t = O === `/chat/${e.id}`;
                                    return (0, s.jsxs)(
                                      v.FX,
                                      {
                                        className: (0, j.cn)(
                                          "group flex justify-between items-center",
                                          {
                                            "bg-primary/10 text-primary": t,
                                            "hover:bg-muted/50": !t,
                                          },
                                        ),
                                        children: [
                                          (0, s.jsx)(x.N_, {
                                            href: `/chat/${e.id}`,
                                            className:
                                              "flex-grow truncate pr-2",
                                            title: e.title || "Untitled Chat",
                                            children:
                                              e.title || "Untitled Chat",
                                          }),
                                          (0, s.jsxs)(h.$, {
                                            variant: "ghost",
                                            size: "icon",
                                            className:
                                              "h-6 w-6 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive",
                                            onClick: (t) => q(t, e.id),
                                            disabled: $,
                                            children: [
                                              (0, s.jsx)(o.A, { size: 14 }),
                                              (0, s.jsx)("span", {
                                                className: "sr-only",
                                                children: "Delete Chat",
                                              }),
                                            ],
                                          }),
                                        ],
                                      },
                                      e.id,
                                    );
                                  }),
                        ],
                      }),
                      X.map((e) =>
                        (0, s.jsxs)(
                          v.Cn,
                          {
                            children: [
                              (0, s.jsx)(v.jj, { children: _(e.titleKey) }),
                              e.items.map((e) =>
                                (0, s.jsxs)(
                                  d.Fragment,
                                  {
                                    children: [
                                      G(e),
                                      e.subMenu &&
                                        U === e.titleKey &&
                                        (0, s.jsx)(v.q9, {
                                          children: e.subMenu.map((e) =>
                                            G(e, !0),
                                          ),
                                        }),
                                    ],
                                  },
                                  e.titleKey,
                                ),
                              ),
                            ],
                          },
                          e.titleKey,
                        ),
                      ),
                    ],
                  }),
                }),
                (0, s.jsx)(v.CG, {
                  className: "border-t border-sidebar-border p-2",
                  children: Y
                    ? (0, s.jsx)(b.r, { user: Y })
                    : (0, s.jsxs)("div", {
                        className: "flex items-center space-x-2",
                        children: [
                          (0, s.jsx)(x.N_, {
                            href: "/login",
                            className: "flex-1",
                            children: (0, s.jsx)(v.Uj, {
                              className: "w-full",
                              children: _("login"),
                            }),
                          }),
                          (0, s.jsx)(x.N_, {
                            href: "/auth/register",
                            className: "flex-1",
                            children: (0, s.jsx)(v.Uj, {
                              className: "w-full",
                              children: _("signUp"),
                            }),
                          }),
                        ],
                      }),
                }),
              ],
            });
          }
          r();
        } catch (e) {
          r(e);
        }
      });
    },
    51005: (e, t, a) => {
      "use strict";
      a.d(t, { Y: () => l });
      var r = a(84205),
        s = a(3519),
        i = a(15090);
      function l() {
        let { toast: e } = (0, i.d)(),
          { session: t } = (0, s.useAuth)(),
          [a, l] = (0, r.useState)(!1),
          [n, o] = (0, r.useState)([]),
          [c, d] = (0, r.useState)(null),
          u = t?.access_token
            ? { Authorization: `Bearer ${t.access_token}` }
            : {},
          h = (0, r.useCallback)(
            async (t = {}) => {
              try {
                l(!0);
                let e = await fetch("/api/chat", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", ...u },
                  body: JSON.stringify(t),
                });
                if (!e.ok) {
                  let t = await e.json();
                  throw Error(t.error || "Failed to create chat");
                }
                let a = (await e.json()).chat;
                return o((e) => [a, ...e]), d(a), a;
              } catch (t) {
                return (
                  e({
                    title: "Error",
                    description: t.message || "Failed to create chat",
                    variant: "destructive",
                  }),
                  null
                );
              } finally {
                l(!1);
              }
            },
            [e, u],
          ),
          m = (0, r.useCallback)(
            async (t = {}) => {
              try {
                l(!0);
                let e = new URLSearchParams();
                t.limit && e.append("limit", t.limit.toString()),
                  t.offset && e.append("offset", t.offset.toString()),
                  t.caseId && e.append("caseId", t.caseId);
                let a = await fetch(`/api/chat?${e.toString()}`, {
                  headers: { ...u },
                });
                if (!a.ok) {
                  let e = await a.json();
                  throw Error(e.error || "Failed to fetch chats");
                }
                let r = await a.json();
                return o(r.chats), r.chats;
              } catch (t) {
                return (
                  e({
                    title: "Error",
                    description: t.message || "Failed to fetch chats",
                    variant: "destructive",
                  }),
                  []
                );
              } finally {
                l(!1);
              }
            },
            [e, u],
          ),
          f = (0, r.useCallback)(
            async (t) => {
              try {
                l(!0);
                let e = await fetch(`/api/chat/${t}`, { headers: { ...u } });
                if (!e.ok) {
                  let t = await e.json();
                  throw Error(t.error || "Failed to fetch chat");
                }
                let a = await e.json();
                return d(a.chat), a.chat;
              } catch (t) {
                return (
                  e({
                    title: "Error",
                    description: t.message || "Failed to fetch chat",
                    variant: "destructive",
                  }),
                  null
                );
              } finally {
                l(!1);
              }
            },
            [e, u],
          ),
          p = (0, r.useCallback)(
            async (t, a, r = []) => {
              try {
                l(!0);
                let e = await fetch(`/api/chat/${t}/messages`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json", ...u },
                  body: JSON.stringify({ message: a, attachments: r }),
                });
                if (!e.ok) {
                  let t = await e.json();
                  throw Error(t.error || "Failed to send message");
                }
                let s = await e.json();
                return (
                  await f(t),
                  {
                    userMessageId: s.userMessageId,
                    assistantMessageId: s.assistantMessageId,
                  }
                );
              } catch (t) {
                return (
                  e({
                    title: "Error",
                    description: t.message || "Failed to send message",
                    variant: "destructive",
                  }),
                  null
                );
              } finally {
                l(!1);
              }
            },
            [e, u, f],
          ),
          g = (0, r.useCallback)(
            async (t, a) => {
              try {
                l(!0);
                let e = await fetch(`/api/chat/${t}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json", ...u },
                  body: JSON.stringify(a),
                });
                if (!e.ok) {
                  let t = await e.json();
                  throw Error(t.error || "Failed to update chat");
                }
                let r = await e.json();
                return (
                  d(r.chat),
                  o((e) => e.map((e) => (e.id === t ? r.chat : e))),
                  r.chat
                );
              } catch (t) {
                return (
                  e({
                    title: "Error",
                    description: t.message || "Failed to update chat",
                    variant: "destructive",
                  }),
                  null
                );
              } finally {
                l(!1);
              }
            },
            [e, u],
          ),
          x = (0, r.useCallback)(
            async (t) => {
              try {
                l(!0);
                let e = await fetch(`/api/chat/${t}`, {
                  method: "DELETE",
                  headers: { ...u },
                });
                if (!e.ok) {
                  let t = await e.json();
                  throw Error(t.error || "Failed to delete chat");
                }
                return (
                  o((e) => e.filter((e) => e.id !== t)),
                  c?.id === t && d(null),
                  !0
                );
              } catch (t) {
                return (
                  e({
                    title: "Error",
                    description: t.message || "Failed to delete chat",
                    variant: "destructive",
                  }),
                  !1
                );
              } finally {
                l(!1);
              }
            },
            [e, u, c],
          ),
          y = (0, r.useCallback)(
            async (t) => {
              try {
                l(!0);
                let e = await fetch(`/api/chat/${t}/generate-title`, {
                  method: "POST",
                  headers: { ...u },
                });
                if (!e.ok) {
                  let t = await e.json();
                  throw Error(t.error || "Failed to generate chat title");
                }
                let a = await e.json();
                return (
                  c?.id === t &&
                    d((e) => (e ? { ...e, title: a.title } : null)),
                  o((e) =>
                    e.map((e) => (e.id === t ? { ...e, title: a.title } : e)),
                  ),
                  a.title
                );
              } catch (t) {
                return (
                  e({
                    title: "Error",
                    description: t.message || "Failed to generate chat title",
                    variant: "destructive",
                  }),
                  null
                );
              } finally {
                l(!1);
              }
            },
            [e, u, c],
          );
        return {
          isLoading: a,
          chats: n,
          currentChat: c,
          createChat: h,
          getChats: m,
          getChat: f,
          sendMessage: p,
          updateChat: g,
          deleteChat: x,
          generateChatTitle: y,
        };
      }
    },
    64012: (e, t, a) => {
      "use strict";
      a.d(t, { h: () => l });
      var r = a(84205),
        s = a(23708);
      s.callServer, s.findSourceMapURL;
      var i = a(3519);
      function l() {
        let { user: e } = (0, i.useAuth)(),
          [t, a] = (0, r.useState)(!1),
          [s, l] = (0, r.useState)(!0);
        return { isAdmin: t, isLoading: s };
      }
    },
    73285: (e) => {
      function t(e) {
        var t = Error("Cannot find module '" + e + "'");
        throw ((t.code = "MODULE_NOT_FOUND"), t);
      }
      (t.keys = () => []), (t.resolve = t), (t.id = 73285), (e.exports = t);
    },
    79366: (e, t, a) => {
      "use strict";
      a.d(t, { p: () => i });
      var r = a(89882),
        s = a(58702);
      function i() {
        let e = (0, r.usePathname)();
        return s.IB.find((t) => e === `/${t}` || e.startsWith(`/${t}/`)) || s.q;
      }
    },
    92542: (e, t, a) => {
      "use strict";
      a.d(t, { F4: () => n, Nv: () => c, OJ: () => o, dM: () => d });
      class r extends Error {
        constructor(e, t) {
          super(e),
            (this.originalError = t),
            (this.name = "AvatarUploadError"),
            t && t.stack && (this.stack = t.stack);
        }
      }
      class s extends Error {
        constructor(e, t) {
          super(e),
            (this.originalError = t),
            (this.name = "ProfileUpdateError"),
            t && t.stack && (this.stack = t.stack);
        }
      }
      let i = "avatars",
        l = new Map();
      async function n(e, t, a) {
        try {
          let s = t.name.split(".").pop(),
            l = `${a}-${Date.now()}.${s}`,
            n = `${a}/${l}`,
            { error: o } = await e.storage.from(i).upload(n, t, { upsert: !0 });
          if (o) throw new r("Failed to upload avatar to storage.", o);
          let {
            data: { publicUrl: c },
          } = e.storage.from(i).getPublicUrl(n);
          if (!c)
            throw new r("Failed to get public URL for avatar after upload.");
          return c;
        } catch (e) {
          if (e instanceof r) throw e;
          throw (
            (console.error("Error uploading avatar:", e),
            new r("An unexpected error occurred during avatar upload.", e))
          );
        }
      }
      async function o(e, t, a) {
        try {
          let { data: r, error: i } = await e
            .from("profiles")
            .select("id")
            .eq("id", t)
            .maybeSingle();
          if (i)
            throw new s(
              "Error checking for existing profile before avatar update.",
              i,
            );
          if (r) {
            let { error: r } = await e
              .from("profiles")
              .update({ avatar_url: a, updated_at: new Date().toISOString() })
              .eq("id", t);
            if (r)
              throw new s("Failed to update profile with new avatar URL.", r);
          } else {
            let { error: r } = await e
              .from("profiles")
              .insert({
                id: t,
                avatar_url: a,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              });
            if (r)
              throw new s("Failed to create new profile with avatar URL.", r);
          }
        } catch (e) {
          if (e instanceof s) throw e;
          throw (
            (console.error("Error updating user avatar:", e),
            new s(
              "An unexpected error occurred while updating user avatar.",
              e,
            ))
          );
        }
      }
      let c = (e) => {
        let t = 0;
        for (let a = 0; a < e.length; a++)
          (t = e.charCodeAt(a) + ((t << 5) - t)), (t &= t);
        let a = Math.abs(t % 1e3);
        return `https://api.dicebear.com/8.x/identicon/svg?seed=${a}`;
      };
      async function d(e, t) {
        if (!t)
          return (
            console.warn(
              "getUserAvatar called with no userId, returning default.",
            ),
            "/avatars/default.png"
          );
        if (l.has(t)) return l.get(t);
        if (!e)
          return (
            console.error(
              "getUserAvatar requires a valid Supabase client instance.",
            ),
            c(t)
          );
        try {
          let { data: a, error: r } = await e
            .from("profiles")
            .select("avatar_url")
            .eq("id", t)
            .single();
          if (
            (r &&
              "PGRST116" !== r.code &&
              console.error(
                "Error fetching profile avatar_url (raw):",
                r,
                "Error fetching profile avatar_url (JSON):",
                JSON.stringify(r, Object.getOwnPropertyNames(r)),
              ),
            a?.avatar_url)
          )
            return l.set(t, a.avatar_url), a.avatar_url;
          let s = `public/${t}.png`,
            { data: i } = await e.storage.from("avatars").getPublicUrl(s);
          if (i?.publicUrl)
            if (i.publicUrl.endsWith(s))
              return l.set(t, i.publicUrl), i.publicUrl;
            else
              console.warn(
                `Storage URL ${i.publicUrl} does not match expected path ${s}. Falling back.`,
              );
          let n = c(t);
          return l.set(t, n), n;
        } catch (a) {
          console.error(
            "Error getting user avatar (raw):",
            a,
            "Error getting user avatar (JSON):",
            JSON.stringify(a, Object.getOwnPropertyNames(a)),
          );
          let e = c(t);
          return l.set(t, e), e;
        }
      }
    },
  });
//# sourceMappingURL=27.js.map
