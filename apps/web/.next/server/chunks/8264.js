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
    (e._sentryDebugIds[t] = "b195b1a6-11f9-4d96-801c-985586723321"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-b195b1a6-11f9-4d96-801c-985586723321"));
} catch (e) {}
(exports.id = 8264),
  (exports.ids = [8264]),
  (exports.modules = {
    3452: (e, t, a) => {
      "use strict";
      a.d(t, { N_: () => i, a8: () => o });
      var s = a(14202),
        r = a(58702);
      let {
        Link: i,
        redirect: n,
        usePathname: o,
        useRouter: d,
      } = (0, s.Jt)({ locales: r.IB });
    },
    3519: (e, t, a) => {
      "use strict";
      a.r(t),
        a.d(t, {
          AuthProvider: () => l,
          useAuth: () => c,
          useHasPermission: () => m,
          useHasRole: () => h,
          useIsAuthenticated: () => f,
          useSession: () => p,
          useUser: () => u,
        });
      var s = a(61268),
        r = a(84205),
        i = a(32367),
        n = a(61460);
      function o(e) {
        if (!e) return null;
        let t = e.user_metadata?.role || "client",
          a = {
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
          settings: a,
          hasTwoFactorAuth: () => a.twoFactorAuth,
          updateSettings: (t) => {
            let s = { ...a, ...t };
            return o({
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
            settings: a,
          }),
        };
      }
      let d = (0, r.createContext)(void 0);
      function l({ children: e }) {
        let [t, a] = (0, r.useState)(null),
          [n, l] = (0, r.useState)(null),
          [c, u] = (0, r.useState)(!0),
          f = (0, i.UU)(),
          h = (0, r.useCallback)(async () => {
            try {
              u(!0);
              let {
                data: { session: e },
                error: t,
              } = await f.auth.getSession();
              if (t) throw t;
              if (e) {
                let {
                  data: { user: t },
                  error: s,
                } = await f.auth.getUser();
                if (s) throw s;
                l(e), a(o(t));
              } else l(null), a(null);
            } catch (e) {
              console.error("Error refreshing session:", e), l(null), a(null);
            } finally {
              u(!1);
            }
          }, [f]),
          m = (0, r.useCallback)(
            async (e, t) => {
              u(!0);
              try {
                if ("email" === e) {
                  if (!t?.email || !t?.password)
                    throw Error(
                      "Email and password required for email sign in",
                    );
                  let { data: e, error: s } = await f.auth.signInWithPassword({
                    email: t.email,
                    password: t.password,
                  });
                  if (s) throw s;
                  e?.session && (l(e.session), a(o(e.session.user)));
                } else {
                  let { error: a } = await f.auth.signInWithOAuth({
                    provider: e,
                    options: t?.redirectTo
                      ? { redirectTo: t.redirectTo }
                      : void 0,
                  });
                  if (a) throw a;
                }
              } catch (e) {
                throw (console.error("Error signing in:", e), e);
              } finally {
                u(!1);
              }
            },
            [f],
          ),
          p = (0, r.useCallback)(async () => {
            u(!0);
            try {
              let { error: e } = await f.auth.signOut();
              if (e) throw e;
              l(null), a(null);
            } catch (e) {
              console.error("Error signing out:", e);
            } finally {
              u(!1);
            }
          }, [f]),
          g = (0, r.useCallback)(
            async (e) => {
              u(!0);
              try {
                if (!e.email || !e.password)
                  throw Error("Email and password required for sign up");
                let { data: t, error: a } = await f.auth.signUp({
                  email: e.email,
                  password: e.password,
                  options: {
                    data: { full_name: e.fullName || "" },
                    emailRedirectTo:
                      e.redirectTo || `${window.location.origin}/auth/callback`,
                  },
                });
                if (a) throw a;
                return t;
              } catch (e) {
                throw (console.error("Error signing up:", e), e);
              } finally {
                u(!1);
              }
            },
            [f],
          ),
          b = (0, r.useCallback)(
            async (e, t) => {
              u(!0);
              try {
                let { error: a } = await f.auth.resetPasswordForEmail(e, {
                  redirectTo:
                    t || `${window.location.origin}/auth/reset-password`,
                });
                if (a) throw a;
                return !0;
              } catch (e) {
                throw (console.error("Error resetting password:", e), e);
              } finally {
                u(!1);
              }
            },
            [f],
          ),
          x = (0, r.useCallback)(
            async (e) => {
              u(!0);
              try {
                let { error: t } = await f.auth.updateUser({ password: e });
                if (t) throw t;
                return !0;
              } catch (e) {
                throw (console.error("Error updating password:", e), e);
              } finally {
                u(!1);
              }
            },
            [f],
          );
        return (0, s.jsx)(d.Provider, {
          value: {
            user: t,
            session: n,
            isLoading: c,
            isAuthenticated: !!n,
            signIn: m,
            signOut: p,
            refreshSession: h,
            signUp: g,
            resetPassword: b,
            updatePassword: x,
            error: null,
          },
          children: e,
        });
      }
      function c() {
        let e = (0, r.useContext)(d);
        if (void 0 === e)
          throw Error("useAuth must be used within an AuthProvider");
        return e;
      }
      function u() {
        let { user: e } = c();
        return e;
      }
      function f() {
        let { isAuthenticated: e } = c();
        return e;
      }
      function h(e) {
        let t = u();
        return t?.role === e;
      }
      function m(e) {
        let t = u();
        return (0, n._m)(t, e);
      }
      function p() {
        let e = (0, r.useContext)(d);
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
    15668: (e) => {
      function t(e) {
        var t = Error("Cannot find module '" + e + "'");
        throw ((t.code = "MODULE_NOT_FOUND"), t);
      }
      (t.keys = () => []), (t.resolve = t), (t.id = 15668), (e.exports = t);
    },
    16176: (e, t, a) => {
      "use strict";
      a.a(e, async (e, s) => {
        try {
          a.d(t, { Separator: () => d });
          var r = a(61268),
            i = a(51209);
          a(84205);
          var n = a(15942),
            o = e([n]);
          function d({
            className: e,
            orientation: t = "horizontal",
            decorative: a = !0,
            ...s
          }) {
            return (0, r.jsx)(i.b, {
              "data-slot": "separator-root",
              decorative: a,
              orientation: t,
              className: (0, n.cn)(
                "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
                e,
              ),
              ...s,
            });
          }
          (n = (o.then ? (await o)() : o)[0]), s();
        } catch (e) {
          s(e);
        }
      });
    },
    23734: (e, t, a) => {
      "use strict";
      a.a(e, async (e, s) => {
        try {
          a.d(t, { BK: () => f, eu: () => u, q5: () => h });
          var r = a(61268),
            i = a(13315),
            n = a(91635),
            o = a(84205),
            d = a(15942),
            l = e([d]);
          d = (l.then ? (await l)() : l)[0];
          let c = (0, n.F)(
              "relative flex shrink-0 overflow-hidden rounded-full",
              {
                variants: {
                  size: { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" },
                },
                defaultVariants: { size: "md" },
              },
            ),
            u = o.forwardRef(({ className: e, size: t, ...a }, s) =>
              (0, r.jsx)(i.bL, {
                ref: s,
                className: (0, d.cn)(c({ size: t }), e),
                ...a,
              }),
            );
          u.displayName = i.bL.displayName;
          let f = o.forwardRef(({ className: e, ...t }, a) =>
            (0, r.jsx)(i._V, {
              ref: a,
              className: (0, d.cn)("aspect-square h-full w-full", e),
              ...t,
            }),
          );
          f.displayName = i._V.displayName;
          let h = o.forwardRef(({ className: e, ...t }, a) =>
            (0, r.jsx)(i.H4, {
              ref: a,
              className: (0, d.cn)(
                "flex h-full w-full items-center justify-center rounded-full bg-muted",
                e,
              ),
              ...t,
            }),
          );
          (h.displayName = i.H4.displayName), s();
        } catch (e) {
          s(e);
        }
      });
    },
    32367: (e, t, a) => {
      "use strict";
      let s;
      a.d(t, { AG: () => b, Iw: () => p, UU: () => g });
      var r = a(97713),
        i = a(15149),
        n = a.n(i),
        o = a(84205);
      let { fetch: d } = n()(),
        l = "http://localhost:54321",
        c =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
        u = process.env.SUPABASE_SERVICE_ROLE_KEY,
        f = c ? { apikey: c } : void 0;
      function h() {
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
        e.__USING_PONYFETCH__ || ((e.fetch = d), (e.__USING_PONYFETCH__ = !0));
      }
      function m() {
        return (h(), s)
          ? s
          : (s = (0, r.createBrowserClient)(l, c, { global: { headers: f } }));
      }
      function p() {
        return (0, o.useMemo)(m, []);
      }
      function g() {
        return (
          h(), (0, r.createBrowserClient)(l, c, { global: { headers: f } })
        );
      }
      let b = m;
      m();
    },
    33713: (e, t, a) => {
      "use strict";
      a.a(e, async (e, s) => {
        try {
          a.d(t, {
            Bx: () => w,
            CG: () => N,
            Cn: () => E,
            FX: () => k,
            Gh: () => _,
            SidebarInset: () => j,
            SidebarProvider: () => v,
            SidebarTrigger: () => y,
            Uj: () => U,
            Yv: () => C,
            cL: () => x,
            jj: () => S,
            q9: () => z,
            wZ: () => A,
          });
          var r = a(61268),
            i = a(86415),
            n = a(91635),
            o = a(75707),
            d = a(84205),
            l = a(28909),
            c = a(78337),
            u = a(16176),
            f = a(51384),
            h = a(94812),
            m = a(89284),
            p = a(96678),
            g = a(15942),
            b = e([l, c, u, f, h, m, g]);
          [l, c, u, f, h, m, g] = b.then ? (await b)() : b;
          let P = d.createContext(null);
          function x() {
            let e = d.useContext(P);
            if (!e)
              throw Error("useSidebar must be used within a SidebarProvider.");
            return e;
          }
          function v({
            defaultOpen: e = !0,
            open: t,
            onOpenChange: a,
            className: s,
            style: i,
            children: n,
            ...o
          }) {
            let l = (0, p.a)(),
              [c, u] = d.useState(!1),
              [f, h] = d.useState(e),
              b = t ?? f,
              x = d.useCallback(
                (e) => {
                  let t = "function" == typeof e ? e(b) : e;
                  a ? a(t) : h(t),
                    (document.cookie = `sidebar_state=${t}; path=/; max-age=604800`);
                },
                [a, b],
              ),
              v = d.useCallback(
                () => (l ? u((e) => !e) : x((e) => !e)),
                [l, x, u],
              );
            d.useEffect(() => {
              let e = (e) => {
                "b" === e.key &&
                  (e.metaKey || e.ctrlKey) &&
                  (e.preventDefault(), v());
              };
              return (
                window.addEventListener("keydown", e),
                () => window.removeEventListener("keydown", e)
              );
            }, [v]);
            let w = b ? "expanded" : "collapsed",
              y = d.useMemo(
                () => ({
                  state: w,
                  open: b,
                  setOpen: x,
                  isMobile: l,
                  openMobile: c,
                  setOpenMobile: u,
                  toggleSidebar: v,
                }),
                [w, b, x, l, c, u, v],
              );
            return (0, r.jsx)(P.Provider, {
              value: y,
              children: (0, r.jsx)(m.Bc, {
                delayDuration: 0,
                children: (0, r.jsx)("div", {
                  "data-slot": "sidebar-wrapper",
                  style: {
                    "--sidebar-width": "16rem",
                    "--sidebar-width-icon": "3rem",
                    ...i,
                  },
                  className: (0, g.cn)(
                    "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
                    s,
                  ),
                  ...o,
                  children: n,
                }),
              }),
            });
          }
          function w({
            side: e = "left",
            variant: t = "sidebar",
            collapsible: a = "offcanvas",
            className: s,
            children: i,
            ...n
          }) {
            let {
              isMobile: o,
              state: d,
              openMobile: l,
              setOpenMobile: c,
            } = x();
            return "none" === a
              ? (0, r.jsx)("div", {
                  "data-slot": "sidebar",
                  className: (0, g.cn)(
                    "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
                    s,
                  ),
                  ...n,
                  children: i,
                })
              : o
                ? (0, r.jsx)(f.cj, {
                    open: l,
                    onOpenChange: c,
                    ...n,
                    children: (0, r.jsxs)(f.h, {
                      "data-sidebar": "sidebar",
                      "data-slot": "sidebar",
                      "data-mobile": "true",
                      className:
                        "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
                      style: { "--sidebar-width": "18rem" },
                      side: e,
                      children: [
                        (0, r.jsxs)(f.Fm, {
                          className: "sr-only",
                          children: [
                            (0, r.jsx)(f.qp, { children: "Sidebar" }),
                            (0, r.jsx)(f.Qs, {
                              children: "Displays the mobile sidebar.",
                            }),
                          ],
                        }),
                        (0, r.jsx)("div", {
                          className: "flex h-full w-full flex-col",
                          children: i,
                        }),
                      ],
                    }),
                  })
                : (0, r.jsxs)("div", {
                    className:
                      "group peer text-sidebar-foreground hidden md:block",
                    "data-state": d,
                    "data-collapsible": "collapsed" === d ? a : "",
                    "data-variant": t,
                    "data-side": e,
                    "data-slot": "sidebar",
                    children: [
                      (0, r.jsx)("div", {
                        "data-slot": "sidebar-gap",
                        className: (0, g.cn)(
                          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
                          "group-data-[collapsible=offcanvas]:w-0",
                          "group-data-[side=right]:rotate-180",
                          "floating" === t || "inset" === t
                            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
                        ),
                      }),
                      (0, r.jsx)("div", {
                        "data-slot": "sidebar-container",
                        className: (0, g.cn)(
                          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
                          "left" === e
                            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                          "floating" === t || "inset" === t
                            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
                          s,
                        ),
                        ...n,
                        children: (0, r.jsx)("div", {
                          "data-sidebar": "sidebar",
                          "data-slot": "sidebar-inner",
                          className:
                            "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                          children: i,
                        }),
                      }),
                    ],
                  });
          }
          function y({ className: e, onClick: t, ...a }) {
            let { toggleSidebar: s } = x();
            return (0, r.jsxs)(l.$, {
              "data-sidebar": "trigger",
              "data-slot": "sidebar-trigger",
              variant: "ghost",
              size: "icon",
              className: (0, g.cn)("size-7", e),
              onClick: (e) => {
                t?.(e), s();
              },
              ...a,
              children: [
                (0, r.jsx)(o.A, {}),
                (0, r.jsx)("span", {
                  className: "sr-only",
                  children: "Toggle Sidebar",
                }),
              ],
            });
          }
          function j({ className: e, ...t }) {
            return (0, r.jsx)("main", {
              "data-slot": "sidebar-inset",
              className: (0, g.cn)(
                "bg-background relative flex w-full flex-1 flex-col",
                "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
                e,
              ),
              ...t,
            });
          }
          function _({ className: e, ...t }) {
            return (0, r.jsx)("div", {
              "data-slot": "sidebar-header",
              "data-sidebar": "header",
              className: (0, g.cn)("flex flex-col gap-2 p-2", e),
              ...t,
            });
          }
          function N({ className: e, ...t }) {
            return (0, r.jsx)("div", {
              "data-slot": "sidebar-footer",
              "data-sidebar": "footer",
              className: (0, g.cn)("flex flex-col gap-2 p-2", e),
              ...t,
            });
          }
          function C({ className: e, ...t }) {
            return (0, r.jsx)("div", {
              "data-slot": "sidebar-content",
              "data-sidebar": "content",
              className: (0, g.cn)(
                "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
                e,
              ),
              ...t,
            });
          }
          function E({ className: e, ...t }) {
            return (0, r.jsx)("div", {
              "data-slot": "sidebar-group",
              "data-sidebar": "group",
              className: (0, g.cn)(
                "relative flex w-full min-w-0 flex-col p-2",
                e,
              ),
              ...t,
            });
          }
          function S({ className: e, asChild: t = !1, ...a }) {
            let s = t ? i.DX : "div";
            return (0, r.jsx)(s, {
              "data-slot": "sidebar-group-label",
              "data-sidebar": "group-label",
              className: (0, g.cn)(
                "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
                "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
                e,
              ),
              ...a,
            });
          }
          function A({ className: e, ...t }) {
            return (0, r.jsx)("ul", {
              "data-slot": "sidebar-menu",
              "data-sidebar": "menu",
              className: (0, g.cn)("flex w-full min-w-0 flex-col gap-1", e),
              ...t,
            });
          }
          function k({ className: e, ...t }) {
            return (0, r.jsx)("li", {
              "data-slot": "sidebar-menu-item",
              "data-sidebar": "menu-item",
              className: (0, g.cn)("group/menu-item relative", e),
              ...t,
            });
          }
          let I = (0, n.F)(
            "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
            {
              variants: {
                variant: {
                  default:
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  outline:
                    "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
                },
                size: {
                  default: "h-8 text-sm",
                  sm: "h-7 text-xs",
                  lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
                },
              },
              defaultVariants: { variant: "default", size: "default" },
            },
          );
          function U({
            asChild: e = !1,
            isActive: t = !1,
            variant: a = "default",
            size: s = "default",
            tooltip: n,
            className: o,
            ...d
          }) {
            let l = e ? i.DX : "button",
              { isMobile: c, state: u } = x(),
              f = (0, r.jsx)(l, {
                "data-slot": "sidebar-menu-button",
                "data-sidebar": "menu-button",
                "data-size": s,
                "data-active": t,
                className: (0, g.cn)(I({ variant: a, size: s }), o),
                ...d,
              });
            return n
              ? ("string" == typeof n && (n = { children: n }),
                (0, r.jsxs)(m.m_, {
                  children: [
                    (0, r.jsx)(m.k$, { asChild: !0, children: f }),
                    (0, r.jsx)(m.ZI, {
                      side: "right",
                      align: "center",
                      hidden: "collapsed" !== u || c,
                      ...n,
                    }),
                  ],
                }))
              : f;
          }
          function z({ className: e, ...t }) {
            return (0, r.jsx)("ul", {
              "data-slot": "sidebar-menu-sub",
              "data-sidebar": "menu-sub",
              className: (0, g.cn)(
                "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
                "group-data-[collapsible=icon]:hidden",
                e,
              ),
              ...t,
            });
          }
          s();
        } catch (e) {
          s(e);
        }
      });
    },
    51384: (e, t, a) => {
      "use strict";
      a.a(e, async (e, s) => {
        try {
          a.d(t, {
            CG: () => c,
            Fm: () => m,
            Qs: () => g,
            cj: () => l,
            h: () => h,
            qp: () => p,
          });
          var r = a(61268),
            i = a(33459),
            n = a(90495);
          a(84205);
          var o = a(15942),
            d = e([o]);
          function l({ ...e }) {
            return (0, r.jsx)(i.bL, { "data-slot": "sheet", ...e });
          }
          function c({ ...e }) {
            return (0, r.jsx)(i.l9, { "data-slot": "sheet-trigger", ...e });
          }
          function u({ ...e }) {
            return (0, r.jsx)(i.ZL, { "data-slot": "sheet-portal", ...e });
          }
          function f({ className: e, ...t }) {
            return (0, r.jsx)(i.hJ, {
              "data-slot": "sheet-overlay",
              className: (0, o.cn)(
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
                e,
              ),
              ...t,
            });
          }
          function h({ className: e, children: t, side: a = "right", ...s }) {
            return (0, r.jsxs)(u, {
              children: [
                (0, r.jsx)(f, {}),
                (0, r.jsxs)(i.UC, {
                  "data-slot": "sheet-content",
                  className: (0, o.cn)(
                    "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
                    "right" === a &&
                      "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
                    "left" === a &&
                      "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
                    "top" === a &&
                      "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
                    "bottom" === a &&
                      "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
                    e,
                  ),
                  ...s,
                  children: [
                    t,
                    (0, r.jsxs)(i.bm, {
                      className:
                        "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
                      children: [
                        (0, r.jsx)(n.A, { className: "size-4" }),
                        (0, r.jsx)("span", {
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
            return (0, r.jsx)("div", {
              "data-slot": "sheet-header",
              className: (0, o.cn)("flex flex-col gap-1.5 p-4", e),
              ...t,
            });
          }
          function p({ className: e, ...t }) {
            return (0, r.jsx)(i.hE, {
              "data-slot": "sheet-title",
              className: (0, o.cn)("text-foreground font-semibold", e),
              ...t,
            });
          }
          function g({ className: e, ...t }) {
            return (0, r.jsx)(i.VY, {
              "data-slot": "sheet-description",
              className: (0, o.cn)("text-muted-foreground text-sm", e),
              ...t,
            });
          }
          (o = (d.then ? (await d)() : d)[0]), s();
        } catch (e) {
          s(e);
        }
      });
    },
    59570: () => {},
    61460: (e, t, a) => {
      "use strict";
      a.d(t, { _m: () => f });
      class s extends Error {
        constructor(e, t, a, s) {
          super(e),
            (this.name = "AuthError"),
            (this.code = t),
            (this.status = s),
            (this.originalError = a);
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
      class r extends s {
        constructor(e = "Authentication required", t) {
          super(e, "auth/unauthorized", t, 401),
            (this.name = "UnauthorizedError");
        }
      }
      class i extends s {
        constructor(e = "Insufficient permissions", t) {
          super(e, "auth/forbidden", t, 403), (this.name = "ForbiddenError");
        }
      }
      class n extends s {
        constructor(e = "Session error", t) {
          super(e, "auth/session-error", t, 400), (this.name = "SessionError");
        }
      }
      class o extends s {
        constructor(e = "Invalid credentials", t) {
          super(e, "auth/invalid-credentials", t, 401),
            (this.name = "InvalidCredentialsError");
        }
      }
      class d extends s {
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
            (this.extractRoles = t.extractRoles || ((e) => [e.role || "user"]));
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
          let a = this.roles[e];
          if (!a) return new Set();
          let s = new Set(a.permissions);
          if (a.inherits && a.inherits.length > 0)
            for (let e of a.inherits)
              this.getRolePermissions(e, t).forEach((e) => s.add(e));
          return s;
        }
        getUserPermissions(e) {
          if (!e) return new Set();
          let t = this.extractRoles(e);
          if (t.includes(this.superAdminRole)) return new Set(["*"]);
          if (this.enableCache) {
            let e = t.sort().join(","),
              a = this.permissionCache.get(e);
            if (a) return a;
          }
          let a = new Set();
          for (let e of t) this.getRolePermissions(e).forEach((e) => a.add(e));
          if (this.enableCache && t.length > 0) {
            let e = t.sort().join(",");
            this.permissionCache.set(e, a);
          }
          return a;
        }
        hasRole(e, t) {
          if (!e) return !1;
          let a = this.extractRoles(e);
          return a.includes(t) || a.includes(this.superAdminRole);
        }
        hasPermission(e, t) {
          if (!e) return !1;
          let a = this.getUserPermissions(e);
          if (a.has("*") || a.has(t)) return !0;
          let s = t.split(":");
          for (let e = 1; e <= s.length; e++) {
            let t = [...s.slice(0, e), "*"].join(":");
            if (a.has(t)) return !0;
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
      function f(e, t) {
        var a;
        return (u || (u = new c(void 0)), u).hasPermission(e, t);
      }
    },
    78337: (e, t, a) => {
      "use strict";
      a.a(e, async (e, s) => {
        try {
          a.d(t, { p: () => o });
          var r = a(61268);
          a(84205);
          var i = a(15942),
            n = e([i]);
          function o({ className: e, type: t, ...a }) {
            return (0, r.jsx)("input", {
              type: t,
              "data-slot": "input",
              className: (0, i.cn)(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                e,
              ),
              ...a,
            });
          }
          (i = (n.then ? (await n)() : n)[0]), s();
        } catch (e) {
          s(e);
        }
      });
    },
    89284: (e, t, a) => {
      "use strict";
      a.a(e, async (e, s) => {
        try {
          a.d(t, { Bc: () => d, ZI: () => u, k$: () => c, m_: () => l });
          var r = a(61268),
            i = a(33336);
          a(84205);
          var n = a(15942),
            o = e([n]);
          function d({ delayDuration: e = 0, ...t }) {
            return (0, r.jsx)(i.Kq, {
              "data-slot": "tooltip-provider",
              delayDuration: e,
              ...t,
            });
          }
          function l({ ...e }) {
            return (0, r.jsx)(d, {
              children: (0, r.jsx)(i.bL, { "data-slot": "tooltip", ...e }),
            });
          }
          function c({ ...e }) {
            return (0, r.jsx)(i.l9, { "data-slot": "tooltip-trigger", ...e });
          }
          function u({ className: e, sideOffset: t = 0, children: a, ...s }) {
            return (0, r.jsx)(i.ZL, {
              children: (0, r.jsxs)(i.UC, {
                "data-slot": "tooltip-content",
                sideOffset: t,
                className: (0, n.cn)(
                  "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
                  e,
                ),
                ...s,
                children: [
                  a,
                  (0, r.jsx)(i.i3, {
                    className:
                      "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
                  }),
                ],
              }),
            });
          }
          (n = (o.then ? (await o)() : o)[0]), s();
        } catch (e) {
          s(e);
        }
      });
    },
    93336: (e, t, a) => {
      "use strict";
      a.a(e, async (e, s) => {
        try {
          a.d(t, {
            Hr: () => m,
            Ht: () => p,
            I: () => f,
            SQ: () => u,
            _2: () => h,
            lp: () => g,
            mB: () => b,
            rI: () => l,
            ty: () => c,
          });
          var r = a(61268),
            i = a(57833),
            n = a(83659);
          a(84205);
          var o = a(15942),
            d = e([o]);
          function l({ ...e }) {
            return (0, r.jsx)(i.bL, { "data-slot": "dropdown-menu", ...e });
          }
          function c({ ...e }) {
            return (0, r.jsx)(i.l9, {
              "data-slot": "dropdown-menu-trigger",
              ...e,
            });
          }
          function u({ className: e, sideOffset: t = 4, ...a }) {
            return (0, r.jsx)(i.ZL, {
              children: (0, r.jsx)(i.UC, {
                "data-slot": "dropdown-menu-content",
                sideOffset: t,
                className: (0, o.cn)(
                  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
                  e,
                ),
                ...a,
              }),
            });
          }
          function f({ ...e }) {
            return (0, r.jsx)(i.YJ, {
              "data-slot": "dropdown-menu-group",
              ...e,
            });
          }
          function h({ className: e, inset: t, variant: a = "default", ...s }) {
            return (0, r.jsx)(i.q7, {
              "data-slot": "dropdown-menu-item",
              "data-inset": t,
              "data-variant": a,
              className: (0, o.cn)(
                "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                e,
              ),
              ...s,
            });
          }
          function m({ ...e }) {
            return (0, r.jsx)(i.z6, {
              "data-slot": "dropdown-menu-radio-group",
              ...e,
            });
          }
          function p({ className: e, children: t, ...a }) {
            return (0, r.jsxs)(i.hN, {
              "data-slot": "dropdown-menu-radio-item",
              className: (0, o.cn)(
                "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                e,
              ),
              ...a,
              children: [
                (0, r.jsx)("span", {
                  className:
                    "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
                  children: (0, r.jsx)(i.VF, {
                    children: (0, r.jsx)(n.A, {
                      className: "size-2 fill-current",
                    }),
                  }),
                }),
                t,
              ],
            });
          }
          function g({ className: e, inset: t, ...a }) {
            return (0, r.jsx)(i.JU, {
              "data-slot": "dropdown-menu-label",
              "data-inset": t,
              className: (0, o.cn)(
                "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
                e,
              ),
              ...a,
            });
          }
          function b({ className: e, ...t }) {
            return (0, r.jsx)(i.wv, {
              "data-slot": "dropdown-menu-separator",
              className: (0, o.cn)("bg-border -mx-1 my-1 h-px", e),
              ...t,
            });
          }
          (o = (d.then ? (await d)() : d)[0]), s();
        } catch (e) {
          s(e);
        }
      });
    },
    94812: (e, t, a) => {
      "use strict";
      a.a(e, async (e, s) => {
        try {
          a.d(t, { E: () => o });
          var r = a(61268),
            i = a(15942),
            n = e([i]);
          function o({ className: e, ...t }) {
            return (0, r.jsx)("div", {
              "data-slot": "skeleton",
              className: (0, i.cn)("bg-accent animate-pulse rounded-md", e),
              ...t,
            });
          }
          (i = (n.then ? (await n)() : n)[0]), s();
        } catch (e) {
          s(e);
        }
      });
    },
    96678: (e, t, a) => {
      "use strict";
      a.d(t, { a: () => r });
      var s = a(84205);
      function r() {
        let [e, t] = s.useState(void 0);
        return (
          s.useEffect(() => {
            let e = window.matchMedia("(max-width: 767px)"),
              a = () => {
                t(window.innerWidth < 768);
              };
            return (
              e.addEventListener("change", a),
              t(window.innerWidth < 768),
              () => e.removeEventListener("change", a)
            );
          }, []),
          !!e
        );
      }
    },
  });
//# sourceMappingURL=8264.js.map
