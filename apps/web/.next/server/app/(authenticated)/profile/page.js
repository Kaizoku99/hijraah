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
    (e._sentryDebugIds[t] = "a3acee57-37be-460f-9dcd-6b6717e8e784"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-a3acee57-37be-460f-9dcd-6b6717e8e784"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 9945),
    (e.ids = [9945]),
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
            useAuth: () => u,
            useHasPermission: () => h,
            useHasRole: () => f,
            useIsAuthenticated: () => p,
            useSession: () => m,
            useUser: () => c,
          });
        var s = r(61268),
          a = r(84205),
          i = r(32367),
          n = r(61460);
        function o(e) {
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
              settings: r,
            }),
          };
        }
        let l = (0, a.createContext)(void 0);
        function d({ children: e }) {
          let [t, r] = (0, a.useState)(null),
            [n, d] = (0, a.useState)(null),
            [u, c] = (0, a.useState)(!0),
            p = (0, i.UU)(),
            f = (0, a.useCallback)(async () => {
              try {
                c(!0);
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
                  d(e), r(o(t));
                } else d(null), r(null);
              } catch (e) {
                console.error("Error refreshing session:", e), d(null), r(null);
              } finally {
                c(!1);
              }
            }, [p]),
            h = (0, a.useCallback)(
              async (e, t) => {
                c(!0);
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
                    e?.session && (d(e.session), r(o(e.session.user)));
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
                  c(!1);
                }
              },
              [p],
            ),
            m = (0, a.useCallback)(async () => {
              c(!0);
              try {
                let { error: e } = await p.auth.signOut();
                if (e) throw e;
                d(null), r(null);
              } catch (e) {
                console.error("Error signing out:", e);
              } finally {
                c(!1);
              }
            }, [p]),
            g = (0, a.useCallback)(
              async (e) => {
                c(!0);
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
                  c(!1);
                }
              },
              [p],
            ),
            w = (0, a.useCallback)(
              async (e, t) => {
                c(!0);
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
                  c(!1);
                }
              },
              [p],
            ),
            v = (0, a.useCallback)(
              async (e) => {
                c(!0);
                try {
                  let { error: t } = await p.auth.updateUser({ password: e });
                  if (t) throw t;
                  return !0;
                } catch (e) {
                  throw (console.error("Error updating password:", e), e);
                } finally {
                  c(!1);
                }
              },
              [p],
            );
          return (0, s.jsx)(l.Provider, {
            value: {
              user: t,
              session: n,
              isLoading: u,
              isAuthenticated: !!n,
              signIn: h,
              signOut: m,
              refreshSession: f,
              signUp: g,
              resetPassword: w,
              updatePassword: v,
              error: null,
            },
            children: e,
          });
        }
        function u() {
          let e = (0, a.useContext)(l);
          if (void 0 === e)
            throw Error("useAuth must be used within an AuthProvider");
          return e;
        }
        function c() {
          let { user: e } = u();
          return e;
        }
        function p() {
          let { isAuthenticated: e } = u();
          return e;
        }
        function f(e) {
          let t = c();
          return t?.role === e;
        }
        function h(e) {
          let t = c();
          return (0, n._m)(t, e);
        }
        function m() {
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
      5451: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              BT: () => p,
              Wu: () => f,
              ZB: () => c,
              Zp: () => d,
              aR: () => u,
              wL: () => h,
            });
            var a = r(61268),
              i = r(55728),
              n = r(84205),
              o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let d = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.P.div, {
                ref: r,
                className: (0, o.cn)(
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
            let u = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            u.displayName = "CardHeader";
            let c = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("h3", {
                ref: r,
                className: (0, o.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            c.displayName = "CardTitle";
            let p = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("p", {
                ref: r,
                className: (0, o.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            p.displayName = "CardDescription";
            let f = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            f.displayName = "CardContent";
            let h = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex items-center p-6 pt-0", e),
                ...t,
              }),
            );
            (h.displayName = "CardFooter"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      6934: () => {},
      7839: (e, t, r) => {
        "use strict";
        r.d(t, { jH: () => i });
        var s = r(84205);
        r(61268);
        var a = s.createContext(void 0);
        function i(e) {
          let t = s.useContext(a);
          return e || t || "ltr";
        }
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10308: (e, t, r) => {
        "use strict";
        r.d(t, { c: () => a });
        var s = r(84205);
        function a(e) {
          let t = s.useRef(e);
          return (
            s.useEffect(() => {
              t.current = e;
            }),
            s.useMemo(
              () =>
                (...e) =>
                  t.current?.(...e),
              [],
            )
          );
        }
      },
      10812: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { H: () => l });
            var a = r(61268),
              i = r(43572);
            r(84205);
            var n = r(23734),
              o = e([n]);
            function l({
              user: e,
              className: t = "",
              fallbackClassName: r = "",
              size: s = "md",
              shape: o = "circle",
            }) {
              let l = { circle: "rounded-full", square: "rounded-lg" };
              return (0, a.jsxs)(n.eu, {
                className: `${{ sm: "h-8 w-8", md: "h-10 w-10", lg: "h-16 w-16", xl: "h-24 w-24" }[s]} ${l[o]} ${t}`,
                children: [
                  e?.avatar
                    ? (0, a.jsx)(n.BK, {
                        src: e.avatar,
                        alt: e?.name || "User Avatar",
                        onError: (e) => {
                          console.warn("Avatar image failed to load:", e),
                            (e.target.style.display = "none");
                        },
                      })
                    : null,
                  (0, a.jsx)(n.q5, {
                    className: `${l[o]} ${r}`,
                    children: e?.name
                      ? e?.name
                        ? e.name
                            .split(" ")
                            .map((e) => e[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()
                        : "?"
                      : (0, a.jsx)(i.A, { className: "h-5 w-5" }),
                  }),
                ],
              });
            }
            (n = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      12809: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 51206));
      },
      13315: (e, t, r) => {
        "use strict";
        r.d(t, { H4: () => _, _V: () => j, bL: () => S });
        var s = r(84205),
          a = r(18047),
          i = r(10308),
          n = r(66130),
          o = r(78593),
          l = r(17764);
        function d() {
          return () => {};
        }
        var u = r(61268),
          c = "Avatar",
          [p, f] = (0, a.A)(c),
          [h, m] = p(c),
          g = s.forwardRef((e, t) => {
            let { __scopeAvatar: r, ...a } = e,
              [i, n] = s.useState("idle");
            return (0, u.jsx)(h, {
              scope: r,
              imageLoadingStatus: i,
              onImageLoadingStatusChange: n,
              children: (0, u.jsx)(o.sG.span, { ...a, ref: t }),
            });
          });
        g.displayName = c;
        var w = "AvatarImage",
          v = s.forwardRef((e, t) => {
            let {
                __scopeAvatar: r,
                src: a,
                onLoadingStatusChange: c = () => {},
                ...p
              } = e,
              f = m(w, r),
              h = (function (e, { referrerPolicy: t, crossOrigin: r }) {
                let a = (0, l.useSyncExternalStore)(
                    d,
                    () => !0,
                    () => !1,
                  ),
                  i = s.useRef(null),
                  o = a
                    ? (i.current || (i.current = new window.Image()), i.current)
                    : null,
                  [u, c] = s.useState(() => y(o, e));
                return (
                  (0, n.N)(() => {
                    c(y(o, e));
                  }, [o, e]),
                  (0, n.N)(() => {
                    let e = (e) => () => {
                      c(e);
                    };
                    if (!o) return;
                    let s = e("loaded"),
                      a = e("error");
                    return (
                      o.addEventListener("load", s),
                      o.addEventListener("error", a),
                      t && (o.referrerPolicy = t),
                      "string" == typeof r && (o.crossOrigin = r),
                      () => {
                        o.removeEventListener("load", s),
                          o.removeEventListener("error", a);
                      }
                    );
                  }, [o, r, t]),
                  u
                );
              })(a, p),
              g = (0, i.c)((e) => {
                c(e), f.onImageLoadingStatusChange(e);
              });
            return (
              (0, n.N)(() => {
                "idle" !== h && g(h);
              }, [h, g]),
              "loaded" === h
                ? (0, u.jsx)(o.sG.img, { ...p, ref: t, src: a })
                : null
            );
          });
        v.displayName = w;
        var x = "AvatarFallback",
          b = s.forwardRef((e, t) => {
            let { __scopeAvatar: r, delayMs: a, ...i } = e,
              n = m(x, r),
              [l, d] = s.useState(void 0 === a);
            return (
              s.useEffect(() => {
                if (void 0 !== a) {
                  let e = window.setTimeout(() => d(!0), a);
                  return () => window.clearTimeout(e);
                }
              }, [a]),
              l && "loaded" !== n.imageLoadingStatus
                ? (0, u.jsx)(o.sG.span, { ...i, ref: t })
                : null
            );
          });
        function y(e, t) {
          return e
            ? t
              ? (e.src !== t && (e.src = t),
                e.complete && e.naturalWidth > 0 ? "loaded" : "loading")
              : "error"
            : "idle";
        }
        b.displayName = x;
        var S = g,
          j = v,
          _ = b;
      },
      15090: (e, t, r) => {
        "use strict";
        r.d(t, { d: () => p });
        var s = r(84205);
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
                let { toastId: r } = t;
                if (r) n.has(r) && (clearTimeout(n.get(r)), n.delete(r));
                else
                  for (let [e, t] of n.entries()) clearTimeout(t), n.delete(e);
                return {
                  ...e,
                  toasts: e.toasts.map((e) =>
                    e.id === r || void 0 === r ? { ...e, open: !1 } : e,
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
          l = [],
          d = { toasts: [] };
        function u(e) {
          (d = o(d, e)),
            l.forEach((e) => {
              e(d);
            });
        }
        function c({ ...e }) {
          let t = (i = (i + 1) % Number.MAX_VALUE).toString(),
            r = () => u({ type: a.DISMISS_TOAST, toastId: t });
          return (
            u({
              type: a.ADD_TOAST,
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
                u({ type: a.UPDATE_TOAST, toast: { ...e, id: t } }),
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
              toast: c,
              dismiss: (e) => u({ type: a.DISMISS_TOAST, toastId: e }),
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
      16979: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { J: () => l });
            var a = r(61268),
              i = r(30595);
            r(84205);
            var n = r(15942),
              o = e([n]);
            function l({ className: e, ...t }) {
              return (0, a.jsx)(i.b, {
                "data-slot": "label",
                className: (0, n.cn)(
                  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  e,
                ),
                ...t,
              });
            }
            (n = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      17764: (e, t, r) => {
        "use strict";
        e.exports = r(42001);
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
      23734: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { BK: () => p, eu: () => c, q5: () => f });
            var a = r(61268),
              i = r(13315),
              n = r(91635),
              o = r(84205),
              l = r(15942),
              d = e([l]);
            l = (d.then ? (await d)() : d)[0];
            let u = (0, n.F)(
                "relative flex shrink-0 overflow-hidden rounded-full",
                {
                  variants: {
                    size: { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" },
                  },
                  defaultVariants: { size: "md" },
                },
              ),
              c = o.forwardRef(({ className: e, size: t, ...r }, s) =>
                (0, a.jsx)(i.bL, {
                  ref: s,
                  className: (0, l.cn)(u({ size: t }), e),
                  ...r,
                }),
              );
            c.displayName = i.bL.displayName;
            let p = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i._V, {
                ref: r,
                className: (0, l.cn)("aspect-square h-full w-full", e),
                ...t,
              }),
            );
            p.displayName = i._V.displayName;
            let f = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.H4, {
                ref: r,
                className: (0, l.cn)(
                  "flex h-full w-full items-center justify-center rounded-full bg-muted",
                  e,
                ),
                ...t,
              }),
            );
            (f.displayName = i.H4.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28366: (e, t, r) => {
        "use strict";
        r.d(t, { B8: () => T, UC: () => R, bL: () => P, l9: () => C });
        var s = r(84205),
          a = r(28777),
          i = r(18047),
          n = r(59150),
          o = r(94653),
          l = r(78593),
          d = r(7839),
          u = r(48705),
          c = r(42414),
          p = r(61268),
          f = "Tabs",
          [h, m] = (0, i.A)(f, [n.RG]),
          g = (0, n.RG)(),
          [w, v] = h(f),
          x = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: a,
                defaultValue: i,
                orientation: n = "horizontal",
                dir: o,
                activationMode: h = "automatic",
                ...m
              } = e,
              g = (0, d.jH)(o),
              [v, x] = (0, u.i)({
                prop: s,
                onChange: a,
                defaultProp: i ?? "",
                caller: f,
              });
            return (0, p.jsx)(w, {
              scope: r,
              baseId: (0, c.B)(),
              value: v,
              onValueChange: x,
              orientation: n,
              dir: g,
              activationMode: h,
              children: (0, p.jsx)(l.sG.div, {
                dir: g,
                "data-orientation": n,
                ...m,
                ref: t,
              }),
            });
          });
        x.displayName = f;
        var b = "TabsList",
          y = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...a } = e,
              i = v(b, r),
              o = g(r);
            return (0, p.jsx)(n.bL, {
              asChild: !0,
              ...o,
              orientation: i.orientation,
              dir: i.dir,
              loop: s,
              children: (0, p.jsx)(l.sG.div, {
                role: "tablist",
                "aria-orientation": i.orientation,
                ...a,
                ref: t,
              }),
            });
          });
        y.displayName = b;
        var S = "TabsTrigger",
          j = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: i = !1, ...o } = e,
              d = v(S, r),
              u = g(r),
              c = N(d.baseId, s),
              f = E(d.baseId, s),
              h = s === d.value;
            return (0, p.jsx)(n.q7, {
              asChild: !0,
              ...u,
              focusable: !i,
              active: h,
              children: (0, p.jsx)(l.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": h,
                "aria-controls": f,
                "data-state": h ? "active" : "inactive",
                "data-disabled": i ? "" : void 0,
                disabled: i,
                id: c,
                ...o,
                ref: t,
                onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                  i || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : d.onValueChange(s);
                }),
                onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && d.onValueChange(s);
                }),
                onFocus: (0, a.m)(e.onFocus, () => {
                  let e = "manual" !== d.activationMode;
                  h || i || !e || d.onValueChange(s);
                }),
              }),
            });
          });
        j.displayName = S;
        var _ = "TabsContent",
          A = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: a,
                forceMount: i,
                children: n,
                ...d
              } = e,
              u = v(_, r),
              c = N(u.baseId, a),
              f = E(u.baseId, a),
              h = a === u.value,
              m = s.useRef(h);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (m.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, p.jsx)(o.C, {
                present: i || h,
                children: ({ present: r }) =>
                  (0, p.jsx)(l.sG.div, {
                    "data-state": h ? "active" : "inactive",
                    "data-orientation": u.orientation,
                    role: "tabpanel",
                    "aria-labelledby": c,
                    hidden: !r,
                    id: f,
                    tabIndex: 0,
                    ...d,
                    ref: t,
                    style: {
                      ...e.style,
                      animationDuration: m.current ? "0s" : void 0,
                    },
                    children: r && n,
                  }),
              })
            );
          });
        function N(e, t) {
          return `${e}-trigger-${t}`;
        }
        function E(e, t) {
          return `${e}-content-${t}`;
        }
        A.displayName = _;
        var P = x,
          T = y,
          C = j,
          R = A;
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      30595: (e, t, r) => {
        "use strict";
        r.d(t, { b: () => o });
        var s = r(84205),
          a = r(56558),
          i = r(61268),
          n = s.forwardRef((e, t) =>
            (0, i.jsx)(a.sG.label, {
              ...e,
              ref: t,
              onMouseDown: (t) => {
                t.target.closest("button, input, select, textarea") ||
                  (e.onMouseDown?.(t),
                  !t.defaultPrevented && t.detail > 1 && t.preventDefault());
              },
            }),
          );
        n.displayName = "Label";
        var o = n;
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      32367: (e, t, r) => {
        "use strict";
        let s;
        r.d(t, { AG: () => w, Iw: () => m, UU: () => g });
        var a = r(97713),
          i = r(15149),
          n = r.n(i),
          o = r(84205);
        let { fetch: l } = n()(),
          d = "http://localhost:54321",
          u =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          c = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = u ? { apikey: u } : void 0;
        function f() {
          if (!d || !u)
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
          return (f(), s)
            ? s
            : (s = (0, a.createBrowserClient)(d, u, {
                global: { headers: p },
              }));
        }
        function m() {
          return (0, o.useMemo)(h, []);
        }
        function g() {
          return (
            f(), (0, a.createBrowserClient)(d, u, { global: { headers: p } })
          );
        }
        let w = h;
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
      37787: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { T: () => l });
            var a = r(61268),
              i = r(84205),
              n = r(15942),
              o = e([n]);
            n = (o.then ? (await o)() : o)[0];
            let l = i.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("textarea", {
                className: (0, n.cn)(
                  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  e,
                ),
                ref: r,
                ...t,
              }),
            );
            (l.displayName = "Textarea"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42001: (e, t, r) => {
        "use strict";
        var s = r(84205),
          a =
            "function" == typeof Object.is
              ? Object.is
              : function (e, t) {
                  return (
                    (e === t && (0 !== e || 1 / e == 1 / t)) ||
                    (e != e && t != t)
                  );
                },
          i = s.useState,
          n = s.useEffect,
          o = s.useLayoutEffect,
          l = s.useDebugValue;
        function d(e) {
          var t = e.getSnapshot;
          e = e.value;
          try {
            var r = t();
            return !a(e, r);
          } catch (e) {
            return !0;
          }
        }
        var u =
          "undefined" == typeof window ||
          void 0 === window.document ||
          void 0 === window.document.createElement
            ? function (e, t) {
                return t();
              }
            : function (e, t) {
                var r = t(),
                  s = i({ inst: { value: r, getSnapshot: t } }),
                  a = s[0].inst,
                  u = s[1];
                return (
                  o(
                    function () {
                      (a.value = r),
                        (a.getSnapshot = t),
                        d(a) && u({ inst: a });
                    },
                    [e, r, t],
                  ),
                  n(
                    function () {
                      return (
                        d(a) && u({ inst: a }),
                        e(function () {
                          d(a) && u({ inst: a });
                        })
                      );
                    },
                    [e],
                  ),
                  l(r),
                  r
                );
              };
        t.useSyncExternalStore =
          void 0 !== s.useSyncExternalStore ? s.useSyncExternalStore : u;
      },
      42414: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => l });
        var s,
          a = r(84205),
          i = r(66130),
          n =
            (s || (s = r.t(a, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          o = 0;
        function l(e) {
          let [t, r] = a.useState(n());
          return (
            (0, i.N)(() => {
              e || r((e) => e ?? String(o++));
            }, [e]),
            e || (t ? `radix-${t}` : "")
          );
        }
      },
      43572: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("User", [
          [
            "path",
            { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" },
          ],
          ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
        ]);
      },
      43886: () => {},
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      51206: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => f,
            generateImageMetadata: () => c,
            generateMetadata: () => u,
            generateViewport: () => p,
          });
        var a = r(63033),
          i = r(26394),
          n = r(60442),
          o = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\profile\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\profile\\page.tsx",
            "default",
          );
        let l = { ...a },
          d =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof o
            ? new Proxy(o, {
                apply: (e, t, r) => {
                  let s, a, i;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return n
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(authenticated)/profile",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : o;
        let u = void 0,
          c = void 0,
          p = void 0,
          f = s;
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
        r.d(t, { hO: () => l, sG: () => o });
        var s = r(84205),
          a = r(90304),
          i = r(86415),
          n = r(61268),
          o = [
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
            let r = (0, i.TL)(`Primitive.${t}`),
              a = s.forwardRef((e, s) => {
                let { asChild: a, ...i } = e;
                return (
                  "undefined" != typeof window &&
                    (window[Symbol.for("radix-ui")] = !0),
                  (0, n.jsx)(a ? r : t, { ...i, ref: s })
                );
              });
            return (a.displayName = `Primitive.${t}`), { ...e, [t]: a };
          }, {});
        function l(e, t) {
          e && a.flushSync(() => e.dispatchEvent(t));
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
      59150: (e, t, r) => {
        "use strict";
        r.d(t, { RG: () => y, bL: () => C, q7: () => R });
        var s = r(84205),
          a = r(28777),
          i = r(28029),
          n = r(71604),
          o = r(18047),
          l = r(42414),
          d = r(78593),
          u = r(10308),
          c = r(48705),
          p = r(7839),
          f = r(61268),
          h = "rovingFocusGroup.onEntryFocus",
          m = { bubbles: !1, cancelable: !0 },
          g = "RovingFocusGroup",
          [w, v, x] = (0, i.N)(g),
          [b, y] = (0, o.A)(g, [x]),
          [S, j] = b(g),
          _ = s.forwardRef((e, t) =>
            (0, f.jsx)(w.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, f.jsx)(w.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, f.jsx)(A, { ...e, ref: t }),
              }),
            }),
          );
        _.displayName = g;
        var A = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: i,
                loop: o = !1,
                dir: l,
                currentTabStopId: w,
                defaultCurrentTabStopId: x,
                onCurrentTabStopIdChange: b,
                onEntryFocus: y,
                preventScrollOnEntryFocus: j = !1,
                ..._
              } = e,
              A = s.useRef(null),
              N = (0, n.s)(t, A),
              E = (0, p.jH)(l),
              [P, C] = (0, c.i)({
                prop: w,
                defaultProp: x ?? null,
                onChange: b,
                caller: g,
              }),
              [R, I] = s.useState(!1),
              k = (0, u.c)(y),
              U = v(r),
              q = s.useRef(!1),
              [O, F] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = A.current;
                if (e)
                  return (
                    e.addEventListener(h, k), () => e.removeEventListener(h, k)
                  );
              }, [k]),
              (0, f.jsx)(S, {
                scope: r,
                orientation: i,
                dir: E,
                loop: o,
                currentTabStopId: P,
                onItemFocus: s.useCallback((e) => C(e), [C]),
                onItemShiftTab: s.useCallback(() => I(!0), []),
                onFocusableItemAdd: s.useCallback(() => F((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => F((e) => e - 1), []),
                children: (0, f.jsx)(d.sG.div, {
                  tabIndex: R || 0 === O ? -1 : 0,
                  "data-orientation": i,
                  ..._,
                  ref: N,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, a.m)(e.onMouseDown, () => {
                    q.current = !0;
                  }),
                  onFocus: (0, a.m)(e.onFocus, (e) => {
                    let t = !q.current;
                    if (e.target === e.currentTarget && t && !R) {
                      let t = new CustomEvent(h, m);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = U().filter((e) => e.focusable);
                        T(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === P),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          j,
                        );
                      }
                    }
                    q.current = !1;
                  }),
                  onBlur: (0, a.m)(e.onBlur, () => I(!1)),
                }),
              })
            );
          }),
          N = "RovingFocusGroupItem",
          E = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: i = !0,
                active: n = !1,
                tabStopId: o,
                children: u,
                ...c
              } = e,
              p = (0, l.B)(),
              h = o || p,
              m = j(N, r),
              g = m.currentTabStopId === h,
              x = v(r),
              {
                onFocusableItemAdd: b,
                onFocusableItemRemove: y,
                currentTabStopId: S,
              } = m;
            return (
              s.useEffect(() => {
                if (i) return b(), () => y();
              }, [i, b, y]),
              (0, f.jsx)(w.ItemSlot, {
                scope: r,
                id: h,
                focusable: i,
                active: n,
                children: (0, f.jsx)(d.sG.span, {
                  tabIndex: g ? 0 : -1,
                  "data-orientation": m.orientation,
                  ...c,
                  ref: t,
                  onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                    i ? m.onItemFocus(h) : e.preventDefault();
                  }),
                  onFocus: (0, a.m)(e.onFocus, () => m.onItemFocus(h)),
                  onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void m.onItemShiftTab();
                    if (e.target !== e.currentTarget) return;
                    let t = (function (e, t, r) {
                      var s;
                      let a =
                        ((s = e.key),
                        "rtl" !== r
                          ? s
                          : "ArrowLeft" === s
                            ? "ArrowRight"
                            : "ArrowRight" === s
                              ? "ArrowLeft"
                              : s);
                      if (
                        !(
                          "vertical" === t &&
                          ["ArrowLeft", "ArrowRight"].includes(a)
                        ) &&
                        !(
                          "horizontal" === t &&
                          ["ArrowUp", "ArrowDown"].includes(a)
                        )
                      )
                        return P[a];
                    })(e, m.orientation, m.dir);
                    if (void 0 !== t) {
                      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                        return;
                      e.preventDefault();
                      let r = x()
                        .filter((e) => e.focusable)
                        .map((e) => e.ref.current);
                      if ("last" === t) r.reverse();
                      else if ("prev" === t || "next" === t) {
                        "prev" === t && r.reverse();
                        let s = r.indexOf(e.currentTarget);
                        r = m.loop
                          ? (function (e, t) {
                              return e.map((r, s) => e[(t + s) % e.length]);
                            })(r, s + 1)
                          : r.slice(s + 1);
                      }
                      setTimeout(() => T(r));
                    }
                  }),
                  children:
                    "function" == typeof u
                      ? u({ isCurrentTabStop: g, hasTabStop: null != S })
                      : u,
                }),
              })
            );
          });
        E.displayName = N;
        var P = {
          ArrowLeft: "prev",
          ArrowUp: "prev",
          ArrowRight: "next",
          ArrowDown: "next",
          PageUp: "first",
          Home: "first",
          PageDown: "last",
          End: "last",
        };
        function T(e, t = !1) {
          let r = document.activeElement;
          for (let s of e)
            if (
              s === r ||
              (s.focus({ preventScroll: t }), document.activeElement !== r)
            )
              return;
        }
        var C = _,
          R = E;
      },
      59570: () => {},
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
        class a extends s {
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
            super(e, "auth/session-error", t, 400),
              (this.name = "SessionError");
          }
        }
        class o extends s {
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
        class u {
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
        let c = null;
        function p(e, t) {
          var r;
          return (c || (c = new u(void 0)), c).hasPermission(e, t);
        }
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      64656: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => u,
            pages: () => d,
            routeModule: () => c,
            tree: () => l,
          });
        var s = r(11610),
          a = r(51293),
          i = r(59059),
          n = r(17770),
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
        r.d(t, o);
        let l = {
            children: [
              "",
              {
                children: [
                  "(authenticated)",
                  {
                    children: [
                      "profile",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 51206)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\profile\\page.tsx",
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(r.bind(r, 72967)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\layout.tsx",
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\profile\\page.tsx",
          ],
          u = { require: r, loadChunk: () => Promise.resolve() },
          c = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/profile/page",
              pathname: "/profile",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      72967: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => u,
            generateMetadata: () => d,
            generateViewport: () => c,
          });
        var a = r(63033),
          i = r(35242),
          n = r(60442);
        let o = { ...a },
          l =
            "workUnitAsyncStorage" in o
              ? o.workUnitAsyncStorage
              : "requestAsyncStorage" in o
                ? o.requestAsyncStorage
                : void 0;
        s = new Proxy(
          function ({ children: e }) {
            return (0, i.jsx)(i.Fragment, { children: e });
          },
          {
            apply: (e, t, r) => {
              let s, a, i;
              try {
                let e = l?.getStore();
                (s = e?.headers.get("sentry-trace") ?? void 0),
                  (a = e?.headers.get("baggage") ?? void 0),
                  (i = e?.headers);
              } catch (e) {}
              return n
                .wrapServerComponentWithSentry(e, {
                  componentRoute: "/(authenticated)",
                  componentType: "Layout",
                  sentryTraceHeader: s,
                  baggageHeader: a,
                  headers: i,
                })
                .apply(t, r);
            },
          },
        );
        let d = void 0,
          u = void 0,
          c = void 0,
          p = s;
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
      77001: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, {
              Tabs: () => l,
              TabsContent: () => c,
              TabsList: () => d,
              TabsTrigger: () => u,
            });
            var a = r(61268),
              i = r(28366);
            r(84205);
            var n = r(15942),
              o = e([n]);
            function l({ className: e, ...t }) {
              return (0, a.jsx)(i.bL, {
                "data-slot": "tabs",
                className: (0, n.cn)("flex flex-col gap-2", e),
                ...t,
              });
            }
            function d({ className: e, ...t }) {
              return (0, a.jsx)(i.B8, {
                "data-slot": "tabs-list",
                className: (0, n.cn)(
                  "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                  e,
                ),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
              return (0, a.jsx)(i.l9, {
                "data-slot": "tabs-trigger",
                className: (0, n.cn)(
                  "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...t,
              });
            }
            function c({ className: e, ...t }) {
              return (0, a.jsx)(i.UC, {
                "data-slot": "tabs-content",
                className: (0, n.cn)("flex-1 outline-none", e),
                ...t,
              });
            }
            (n = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
      },
      77961: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 83284));
      },
      78337: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { p: () => o });
            var a = r(61268);
            r(84205);
            var i = r(15942),
              n = e([i]);
            function o({ className: e, type: t, ...r }) {
              return (0, a.jsx)("input", {
                type: t,
                "data-slot": "input",
                className: (0, i.cn)(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  e,
                ),
                ...r,
              });
            }
            (i = (n.then ? (await n)() : n)[0]), s();
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
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      81630: (e) => {
        "use strict";
        e.exports = require("http");
      },
      81728: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Key", [
          ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }],
          ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
          ["path", { d: "m15.5 7.5 3 3L22 7l-3-3", key: "1rn1fs" }],
        ]);
      },
      81904: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(95255).A)("Camera", [
          [
            "path",
            {
              d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
              key: "1tc9qg",
            },
          ],
          ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }],
        ]);
      },
      83284: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => b });
            var a = r(61268),
              i = r(97713),
              n = r(81904),
              o = r(81728),
              l = r(84205),
              d = r(16979),
              u = r(37787),
              c = r(15090),
              p = r(3519),
              f = r(92542),
              h = r(28909),
              m = r(5451),
              g = r(78337),
              w = r(77001),
              v = r(10812),
              x = e([d, u, h, m, g, w, v]);
            function b() {
              let { user: e } = (0, p.useAuth)(),
                { toast: t } = (0, c.d)(),
                r = (0, i.createBrowserClient)(
                  "http://localhost:54321",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                ),
                [s, x] = (0, l.useState)(!1),
                [b, y] = (0, l.useState)(e?.user_metadata?.avatar_url),
                [S, j] = (0, l.useState)({
                  name: e?.user_metadata?.name || "",
                  email: e?.email || "",
                  bio: e?.user_metadata?.bio || "",
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }),
                _ = (e) => {
                  j((t) => ({ ...t, [e.target.id]: e.target.value }));
                },
                A = async (e) => {
                  e.preventDefault(), x(!0);
                  try {
                    let { error: e } = await r.auth.updateUser({
                      data: { name: S.name, bio: S.bio },
                    });
                    if (e) throw e;
                    t({
                      title: "Success",
                      description: "Profile updated successfully",
                    });
                  } catch (e) {
                    t({
                      variant: "destructive",
                      title: "Error",
                      description: "Failed to update profile",
                    });
                  } finally {
                    x(!1);
                  }
                },
                N = async (e) => {
                  if (
                    (e.preventDefault(),
                    x(!0),
                    S.newPassword !== S.confirmPassword)
                  ) {
                    t({
                      variant: "destructive",
                      title: "Error",
                      description: "New passwords do not match",
                    }),
                      x(!1);
                    return;
                  }
                  try {
                    let { error: e } = await r.auth.updateUser({
                      password: S.newPassword,
                    });
                    if (e) throw e;
                    t({
                      title: "Success",
                      description: "Password updated successfully",
                    }),
                      j((e) => ({
                        ...e,
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      }));
                  } catch (e) {
                    t({
                      variant: "destructive",
                      title: "Error",
                      description: "Failed to update password",
                    });
                  } finally {
                    x(!1);
                  }
                },
                E = async (s) => {
                  let a = s.target.files?.[0];
                  if (a && e)
                    try {
                      x(!0);
                      let s = await (0, f.F4)(r, a, e.id);
                      await (0, f.OJ)(r, e.id, s);
                      let { error: i } = await r.auth.updateUser({
                        data: { avatar_url: s },
                      });
                      if (i) throw i;
                      y(s),
                        t({
                          title: "Success",
                          description: "Profile picture updated successfully",
                        });
                    } catch (e) {
                      console.error("Avatar upload error:", e),
                        t({
                          variant: "destructive",
                          title: "Error",
                          description: "Failed to update profile picture",
                        });
                    } finally {
                      x(!1);
                    }
                };
              return (0, a.jsxs)("div", {
                className: "container max-w-4xl py-8",
                children: [
                  (0, a.jsx)("h1", {
                    className: "text-3xl font-bold mb-6",
                    children: "Profile Settings",
                  }),
                  (0, a.jsxs)(w.Tabs, {
                    defaultValue: "general",
                    className: "w-full",
                    children: [
                      (0, a.jsxs)(w.TabsList, {
                        className: "mb-6",
                        children: [
                          (0, a.jsx)(w.TabsTrigger, {
                            value: "general",
                            children: "General",
                          }),
                          (0, a.jsx)(w.TabsTrigger, {
                            value: "security",
                            children: "Security",
                          }),
                        ],
                      }),
                      (0, a.jsx)(w.TabsContent, {
                        value: "general",
                        children: (0, a.jsx)(m.Zp, {
                          className: "p-6",
                          children: (0, a.jsxs)("form", {
                            onSubmit: A,
                            className: "grid gap-6",
                            children: [
                              (0, a.jsxs)("div", {
                                className: "flex items-center gap-4",
                                children: [
                                  (0, a.jsxs)("div", {
                                    className: "relative",
                                    children: [
                                      (0, a.jsx)(v.H, {
                                        user: {
                                          name: S.name,
                                          email: S.email,
                                          avatar: b,
                                        },
                                        size: "lg",
                                        shape: "circle",
                                        className:
                                          "cursor-pointer hover:opacity-80 transition-opacity",
                                      }),
                                      (0, a.jsx)("label", {
                                        htmlFor: "avatar-upload",
                                        children: (0, a.jsx)(h.$, {
                                          className:
                                            "absolute -bottom-2 -right-2 rounded-full cursor-pointer w-8 h-8 p-0",
                                          variant: "outline",
                                          type: "button",
                                          children: (0, a.jsx)(n.A, {
                                            className: "w-4 h-4",
                                          }),
                                        }),
                                      }),
                                      (0, a.jsx)("input", {
                                        id: "avatar-upload",
                                        type: "file",
                                        accept: "image/*",
                                        className: "hidden",
                                        onChange: E,
                                        disabled: s,
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)("div", {
                                    children: [
                                      (0, a.jsx)("h3", {
                                        className: "font-medium",
                                        children: "Profile Picture",
                                      }),
                                      (0, a.jsx)("p", {
                                        className:
                                          "text-sm text-muted-foreground",
                                        children:
                                          "Click the camera icon to update your photo",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, a.jsxs)("div", {
                                className: "grid gap-4",
                                children: [
                                  (0, a.jsxs)("div", {
                                    className: "grid gap-2",
                                    children: [
                                      (0, a.jsx)(d.J, {
                                        htmlFor: "name",
                                        children: "Full Name",
                                      }),
                                      (0, a.jsx)(g.p, {
                                        id: "name",
                                        placeholder: "Enter your full name",
                                        value: S.name,
                                        onChange: _,
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)("div", {
                                    className: "grid gap-2",
                                    children: [
                                      (0, a.jsx)(d.J, {
                                        htmlFor: "email",
                                        children: "Email",
                                      }),
                                      (0, a.jsx)(g.p, {
                                        id: "email",
                                        type: "email",
                                        value: S.email,
                                        disabled: !0,
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)("div", {
                                    className: "grid gap-2",
                                    children: [
                                      (0, a.jsx)(d.J, {
                                        htmlFor: "bio",
                                        children: "Bio",
                                      }),
                                      (0, a.jsx)(u.T, {
                                        id: "bio",
                                        placeholder:
                                          "Tell us a bit about yourself",
                                        className: "min-h-[100px]",
                                        onChange: _,
                                        children: S.bio,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, a.jsx)(h.$, {
                                className: "w-full sm:w-auto",
                                disabled: s,
                                children: s ? "Saving..." : "Save Changes",
                              }),
                            ],
                          }),
                        }),
                      }),
                      (0, a.jsx)(w.TabsContent, {
                        value: "security",
                        children: (0, a.jsx)(m.Zp, {
                          className: "p-6",
                          children: (0, a.jsx)("form", {
                            onSubmit: N,
                            className: "grid gap-6",
                            children: (0, a.jsxs)("div", {
                              className: "flex items-start gap-4",
                              children: [
                                (0, a.jsx)("div", {
                                  className:
                                    "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center",
                                  children: (0, a.jsx)(o.A, {
                                    className: "w-5 h-5 text-primary",
                                  }),
                                }),
                                (0, a.jsxs)("div", {
                                  className: "flex-1",
                                  children: [
                                    (0, a.jsx)("h3", {
                                      className: "font-medium mb-1",
                                      children: "Password",
                                    }),
                                    (0, a.jsx)("p", {
                                      className:
                                        "text-sm text-muted-foreground mb-4",
                                      children:
                                        "Update your password to keep your account secure",
                                    }),
                                    (0, a.jsxs)("div", {
                                      className: "grid gap-4",
                                      children: [
                                        (0, a.jsxs)("div", {
                                          className: "grid gap-2",
                                          children: [
                                            (0, a.jsx)(d.J, {
                                              htmlFor: "currentPassword",
                                              children: "Current Password",
                                            }),
                                            (0, a.jsx)(g.p, {
                                              id: "currentPassword",
                                              type: "password",
                                              placeholder:
                                                "Enter current password",
                                              value: S.currentPassword,
                                              onChange: _,
                                            }),
                                          ],
                                        }),
                                        (0, a.jsxs)("div", {
                                          className: "grid gap-2",
                                          children: [
                                            (0, a.jsx)(d.J, {
                                              htmlFor: "newPassword",
                                              children: "New Password",
                                            }),
                                            (0, a.jsx)(g.p, {
                                              id: "newPassword",
                                              type: "password",
                                              placeholder: "Enter new password",
                                              value: S.newPassword,
                                              onChange: _,
                                            }),
                                          ],
                                        }),
                                        (0, a.jsxs)("div", {
                                          className: "grid gap-2",
                                          children: [
                                            (0, a.jsx)(d.J, {
                                              htmlFor: "confirmPassword",
                                              children: "Confirm Password",
                                            }),
                                            (0, a.jsx)(g.p, {
                                              id: "confirmPassword",
                                              type: "password",
                                              placeholder:
                                                "Confirm new password",
                                              value: S.confirmPassword,
                                              onChange: _,
                                            }),
                                          ],
                                        }),
                                        (0, a.jsx)(h.$, {
                                          className: "w-full sm:w-auto",
                                          disabled: s,
                                          children: s
                                            ? "Updating..."
                                            : "Update Password",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        }),
                      }),
                    ],
                  }),
                ],
              });
            }
            ([d, u, h, m, g, w, v] = x.then ? (await x)() : x), s();
          } catch (e) {
            s(e);
          }
        });
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
      92542: (e, t, r) => {
        "use strict";
        r.d(t, { F4: () => o, Nv: () => d, OJ: () => l, dM: () => u });
        class s extends Error {
          constructor(e, t) {
            super(e),
              (this.originalError = t),
              (this.name = "AvatarUploadError"),
              t && t.stack && (this.stack = t.stack);
          }
        }
        class a extends Error {
          constructor(e, t) {
            super(e),
              (this.originalError = t),
              (this.name = "ProfileUpdateError"),
              t && t.stack && (this.stack = t.stack);
          }
        }
        let i = "avatars",
          n = new Map();
        async function o(e, t, r) {
          try {
            let a = t.name.split(".").pop(),
              n = `${r}-${Date.now()}.${a}`,
              o = `${r}/${n}`,
              { error: l } = await e.storage
                .from(i)
                .upload(o, t, { upsert: !0 });
            if (l) throw new s("Failed to upload avatar to storage.", l);
            let {
              data: { publicUrl: d },
            } = e.storage.from(i).getPublicUrl(o);
            if (!d)
              throw new s("Failed to get public URL for avatar after upload.");
            return d;
          } catch (e) {
            if (e instanceof s) throw e;
            throw (
              (console.error("Error uploading avatar:", e),
              new s("An unexpected error occurred during avatar upload.", e))
            );
          }
        }
        async function l(e, t, r) {
          try {
            let { data: s, error: i } = await e
              .from("profiles")
              .select("id")
              .eq("id", t)
              .maybeSingle();
            if (i)
              throw new a(
                "Error checking for existing profile before avatar update.",
                i,
              );
            if (s) {
              let { error: s } = await e
                .from("profiles")
                .update({ avatar_url: r, updated_at: new Date().toISOString() })
                .eq("id", t);
              if (s)
                throw new a("Failed to update profile with new avatar URL.", s);
            } else {
              let { error: s } = await e
                .from("profiles")
                .insert({
                  id: t,
                  avatar_url: r,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                });
              if (s)
                throw new a("Failed to create new profile with avatar URL.", s);
            }
          } catch (e) {
            if (e instanceof a) throw e;
            throw (
              (console.error("Error updating user avatar:", e),
              new a(
                "An unexpected error occurred while updating user avatar.",
                e,
              ))
            );
          }
        }
        let d = (e) => {
          let t = 0;
          for (let r = 0; r < e.length; r++)
            (t = e.charCodeAt(r) + ((t << 5) - t)), (t &= t);
          let r = Math.abs(t % 1e3);
          return `https://api.dicebear.com/8.x/identicon/svg?seed=${r}`;
        };
        async function u(e, t) {
          if (!t)
            return (
              console.warn(
                "getUserAvatar called with no userId, returning default.",
              ),
              "/avatars/default.png"
            );
          if (n.has(t)) return n.get(t);
          if (!e)
            return (
              console.error(
                "getUserAvatar requires a valid Supabase client instance.",
              ),
              d(t)
            );
          try {
            let { data: r, error: s } = await e
              .from("profiles")
              .select("avatar_url")
              .eq("id", t)
              .single();
            if (
              (s &&
                "PGRST116" !== s.code &&
                console.error(
                  "Error fetching profile avatar_url (raw):",
                  s,
                  "Error fetching profile avatar_url (JSON):",
                  JSON.stringify(s, Object.getOwnPropertyNames(s)),
                ),
              r?.avatar_url)
            )
              return n.set(t, r.avatar_url), r.avatar_url;
            let a = `public/${t}.png`,
              { data: i } = await e.storage.from("avatars").getPublicUrl(a);
            if (i?.publicUrl)
              if (i.publicUrl.endsWith(a))
                return n.set(t, i.publicUrl), i.publicUrl;
              else
                console.warn(
                  `Storage URL ${i.publicUrl} does not match expected path ${a}. Falling back.`,
                );
            let o = d(t);
            return n.set(t, o), o;
          } catch (r) {
            console.error(
              "Error getting user avatar (raw):",
              r,
              "Error getting user avatar (JSON):",
              JSON.stringify(r, Object.getOwnPropertyNames(r)),
            );
            let e = d(t);
            return n.set(t, e), e;
          }
        }
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      95255: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => n });
        var s = r(84205),
          a = {
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
        let i = (e) =>
            e
              .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
              .toLowerCase()
              .trim(),
          n = (e, t) => {
            let r = (0, s.forwardRef)(
              (
                {
                  color: r = "currentColor",
                  size: n = 24,
                  strokeWidth: o = 2,
                  absoluteStrokeWidth: l,
                  className: d = "",
                  children: u,
                  ...c
                },
                p,
              ) =>
                (0, s.createElement)(
                  "svg",
                  {
                    ref: p,
                    ...a,
                    width: n,
                    height: n,
                    stroke: r,
                    strokeWidth: l ? (24 * Number(o)) / Number(n) : o,
                    className: ["lucide", `lucide-${i(e)}`, d].join(" "),
                    ...c,
                  },
                  [
                    ...t.map(([e, t]) => (0, s.createElement)(e, t)),
                    ...(Array.isArray(u) ? u : [u]),
                  ],
                ),
            );
            return (r.displayName = `${e}`), r;
          };
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 8029, 5728, 4630],
      () => r(64656),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
