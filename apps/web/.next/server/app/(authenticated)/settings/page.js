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
    (e._sentryDebugIds[t] = "59b613eb-33a3-4e29-8ff3-074cbdf36ad4"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-59b613eb-33a3-4e29-8ff3-074cbdf36ad4"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 1905),
    (e.ids = [1905]),
    (e.modules = {
      278: (e, t, r) => {
        "use strict";
        r.d(t, { bL: () => j, zi: () => S });
        var s = r(84205),
          a = r(28777),
          i = r(71604),
          n = r(18047),
          o = r(48705),
          l = r(67155),
          d = r(91557),
          c = r(78593),
          u = r(61268),
          p = "Switch",
          [h, f] = (0, n.A)(p),
          [m, x] = h(p),
          g = s.forwardRef((e, t) => {
            let {
                __scopeSwitch: r,
                name: n,
                checked: l,
                defaultChecked: d,
                required: h,
                disabled: f,
                value: x = "on",
                onCheckedChange: g,
                form: v,
                ...w
              } = e,
              [j, S] = s.useState(null),
              N = (0, i.s)(t, (e) => S(e)),
              A = s.useRef(!1),
              _ = !j || v || !!j.closest("form"),
              [E, T] = (0, o.i)({
                prop: l,
                defaultProp: d ?? !1,
                onChange: g,
                caller: p,
              });
            return (0, u.jsxs)(m, {
              scope: r,
              checked: E,
              disabled: f,
              children: [
                (0, u.jsx)(c.sG.button, {
                  type: "button",
                  role: "switch",
                  "aria-checked": E,
                  "aria-required": h,
                  "data-state": y(E),
                  "data-disabled": f ? "" : void 0,
                  disabled: f,
                  value: x,
                  ...w,
                  ref: N,
                  onClick: (0, a.m)(e.onClick, (e) => {
                    T((e) => !e),
                      _ &&
                        ((A.current = e.isPropagationStopped()),
                        A.current || e.stopPropagation());
                  }),
                }),
                _ &&
                  (0, u.jsx)(b, {
                    control: j,
                    bubbles: !A.current,
                    name: n,
                    value: x,
                    checked: E,
                    required: h,
                    disabled: f,
                    form: v,
                    style: { transform: "translateX(-100%)" },
                  }),
              ],
            });
          });
        g.displayName = p;
        var v = "SwitchThumb",
          w = s.forwardRef((e, t) => {
            let { __scopeSwitch: r, ...s } = e,
              a = x(v, r);
            return (0, u.jsx)(c.sG.span, {
              "data-state": y(a.checked),
              "data-disabled": a.disabled ? "" : void 0,
              ...s,
              ref: t,
            });
          });
        w.displayName = v;
        var b = s.forwardRef(
          (
            { __scopeSwitch: e, control: t, checked: r, bubbles: a = !0, ...n },
            o,
          ) => {
            let c = s.useRef(null),
              p = (0, i.s)(c, o),
              h = (0, l.Z)(r),
              f = (0, d.X)(t);
            return (
              s.useEffect(() => {
                let e = c.current;
                if (!e) return;
                let t = Object.getOwnPropertyDescriptor(
                  window.HTMLInputElement.prototype,
                  "checked",
                ).set;
                if (h !== r && t) {
                  let s = new Event("click", { bubbles: a });
                  t.call(e, r), e.dispatchEvent(s);
                }
              }, [h, r, a]),
              (0, u.jsx)("input", {
                type: "checkbox",
                "aria-hidden": !0,
                defaultChecked: r,
                ...n,
                tabIndex: -1,
                ref: p,
                style: {
                  ...n.style,
                  ...f,
                  position: "absolute",
                  pointerEvents: "none",
                  opacity: 0,
                  margin: 0,
                },
              })
            );
          },
        );
        function y(e) {
          return e ? "checked" : "unchecked";
        }
        b.displayName = "SwitchBubbleInput";
        var j = g,
          S = w;
      },
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
            useHasPermission: () => f,
            useHasRole: () => h,
            useIsAuthenticated: () => p,
            useSession: () => m,
            useUser: () => u,
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
            [c, u] = (0, a.useState)(!0),
            p = (0, i.UU)(),
            h = (0, a.useCallback)(async () => {
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
                  d(e), r(o(t));
                } else d(null), r(null);
              } catch (e) {
                console.error("Error refreshing session:", e), d(null), r(null);
              } finally {
                u(!1);
              }
            }, [p]),
            f = (0, a.useCallback)(
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
                  u(!1);
                }
              },
              [p],
            ),
            m = (0, a.useCallback)(async () => {
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
            x = (0, a.useCallback)(
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
            g = (0, a.useCallback)(
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
            v = (0, a.useCallback)(
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
              session: n,
              isLoading: c,
              isAuthenticated: !!n,
              signIn: f,
              signOut: m,
              refreshSession: h,
              signUp: x,
              resetPassword: g,
              updatePassword: v,
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
        function p() {
          let { isAuthenticated: e } = c();
          return e;
        }
        function h(e) {
          let t = u();
          return t?.role === e;
        }
        function f(e) {
          let t = u();
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
              Wu: () => h,
              ZB: () => u,
              Zp: () => d,
              aR: () => c,
              wL: () => f,
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
            let c = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex flex-col space-y-1.5 p-6", e),
                ...t,
              }),
            );
            c.displayName = "CardHeader";
            let u = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("h3", {
                ref: r,
                className: (0, o.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...t,
              }),
            );
            u.displayName = "CardTitle";
            let p = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("p", {
                ref: r,
                className: (0, o.cn)("text-sm text-muted-foreground", e),
                ...t,
              }),
            );
            p.displayName = "CardDescription";
            let h = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("p-6 pt-0", e),
                ...t,
              }),
            );
            h.displayName = "CardContent";
            let f = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)("div", {
                ref: r,
                className: (0, o.cn)("flex items-center p-6 pt-0", e),
                ...t,
              }),
            );
            (f.displayName = "CardFooter"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      5870: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => h,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var a = r(63033),
          i = r(26394),
          n = r(60442),
          o = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\settings\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\settings\\page.tsx",
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
                      componentRoute: "/(authenticated)/settings",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: i,
                    })
                    .apply(t, r);
                },
              })
            : o;
        let c = void 0,
          u = void 0,
          p = void 0,
          h = s;
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
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      13315: (e, t, r) => {
        "use strict";
        r.d(t, { H4: () => N, _V: () => S, bL: () => j });
        var s = r(84205),
          a = r(18047),
          i = r(10308),
          n = r(66130),
          o = r(78593),
          l = r(17764);
        function d() {
          return () => {};
        }
        var c = r(61268),
          u = "Avatar",
          [p, h] = (0, a.A)(u),
          [f, m] = p(u),
          x = s.forwardRef((e, t) => {
            let { __scopeAvatar: r, ...a } = e,
              [i, n] = s.useState("idle");
            return (0, c.jsx)(f, {
              scope: r,
              imageLoadingStatus: i,
              onImageLoadingStatusChange: n,
              children: (0, c.jsx)(o.sG.span, { ...a, ref: t }),
            });
          });
        x.displayName = u;
        var g = "AvatarImage",
          v = s.forwardRef((e, t) => {
            let {
                __scopeAvatar: r,
                src: a,
                onLoadingStatusChange: u = () => {},
                ...p
              } = e,
              h = m(g, r),
              f = (function (e, { referrerPolicy: t, crossOrigin: r }) {
                let a = (0, l.useSyncExternalStore)(
                    d,
                    () => !0,
                    () => !1,
                  ),
                  i = s.useRef(null),
                  o = a
                    ? (i.current || (i.current = new window.Image()), i.current)
                    : null,
                  [c, u] = s.useState(() => y(o, e));
                return (
                  (0, n.N)(() => {
                    u(y(o, e));
                  }, [o, e]),
                  (0, n.N)(() => {
                    let e = (e) => () => {
                      u(e);
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
                  c
                );
              })(a, p),
              x = (0, i.c)((e) => {
                u(e), h.onImageLoadingStatusChange(e);
              });
            return (
              (0, n.N)(() => {
                "idle" !== f && x(f);
              }, [f, x]),
              "loaded" === f
                ? (0, c.jsx)(o.sG.img, { ...p, ref: t, src: a })
                : null
            );
          });
        v.displayName = g;
        var w = "AvatarFallback",
          b = s.forwardRef((e, t) => {
            let { __scopeAvatar: r, delayMs: a, ...i } = e,
              n = m(w, r),
              [l, d] = s.useState(void 0 === a);
            return (
              s.useEffect(() => {
                if (void 0 !== a) {
                  let e = window.setTimeout(() => d(!0), a);
                  return () => window.clearTimeout(e);
                }
              }, [a]),
              l && "loaded" !== n.imageLoadingStatus
                ? (0, c.jsx)(o.sG.span, { ...i, ref: t })
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
        b.displayName = w;
        var j = x,
          S = v,
          N = b;
      },
      13909: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { d: () => d });
            var a = r(61268),
              i = r(278),
              n = r(84205),
              o = r(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let d = n.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.bL, {
                className: (0, o.cn)(
                  "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
                  e,
                ),
                ...t,
                ref: r,
                children: (0, a.jsx)(i.zi, {
                  className: (0, o.cn)(
                    "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
                  ),
                }),
              }),
            );
            (d.displayName = i.bL.displayName), s();
          } catch (e) {
            s(e);
          }
        });
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
        function c(e) {
          (d = o(d, e)),
            l.forEach((e) => {
              e(d);
            });
        }
        function u({ ...e }) {
          let t = (i = (i + 1) % Number.MAX_VALUE).toString(),
            r = () => c({ type: a.DISMISS_TOAST, toastId: t });
          return (
            c({
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
                c({ type: a.UPDATE_TOAST, toast: { ...e, id: t } }),
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
              dismiss: (e) => c({ type: a.DISMISS_TOAST, toastId: e }),
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
            r.d(t, { BK: () => p, eu: () => u, q5: () => h });
            var a = r(61268),
              i = r(13315),
              n = r(91635),
              o = r(84205),
              l = r(15942),
              d = e([l]);
            l = (d.then ? (await d)() : d)[0];
            let c = (0, n.F)(
                "relative flex shrink-0 overflow-hidden rounded-full",
                {
                  variants: {
                    size: { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" },
                  },
                  defaultVariants: { size: "md" },
                },
              ),
              u = o.forwardRef(({ className: e, size: t, ...r }, s) =>
                (0, a.jsx)(i.bL, {
                  ref: s,
                  className: (0, l.cn)(c({ size: t }), e),
                  ...r,
                }),
              );
            u.displayName = i.bL.displayName;
            let p = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i._V, {
                ref: r,
                className: (0, l.cn)("aspect-square h-full w-full", e),
                ...t,
              }),
            );
            p.displayName = i._V.displayName;
            let h = o.forwardRef(({ className: e, ...t }, r) =>
              (0, a.jsx)(i.H4, {
                ref: r,
                className: (0, l.cn)(
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
        r.d(t, { B8: () => C, UC: () => P, bL: () => T, l9: () => R });
        var s = r(84205),
          a = r(28777),
          i = r(18047),
          n = r(59150),
          o = r(94653),
          l = r(78593),
          d = r(7839),
          c = r(48705),
          u = r(42414),
          p = r(61268),
          h = "Tabs",
          [f, m] = (0, i.A)(h, [n.RG]),
          x = (0, n.RG)(),
          [g, v] = f(h),
          w = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: s,
                onValueChange: a,
                defaultValue: i,
                orientation: n = "horizontal",
                dir: o,
                activationMode: f = "automatic",
                ...m
              } = e,
              x = (0, d.jH)(o),
              [v, w] = (0, c.i)({
                prop: s,
                onChange: a,
                defaultProp: i ?? "",
                caller: h,
              });
            return (0, p.jsx)(g, {
              scope: r,
              baseId: (0, u.B)(),
              value: v,
              onValueChange: w,
              orientation: n,
              dir: x,
              activationMode: f,
              children: (0, p.jsx)(l.sG.div, {
                dir: x,
                "data-orientation": n,
                ...m,
                ref: t,
              }),
            });
          });
        w.displayName = h;
        var b = "TabsList",
          y = s.forwardRef((e, t) => {
            let { __scopeTabs: r, loop: s = !0, ...a } = e,
              i = v(b, r),
              o = x(r);
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
        var j = "TabsTrigger",
          S = s.forwardRef((e, t) => {
            let { __scopeTabs: r, value: s, disabled: i = !1, ...o } = e,
              d = v(j, r),
              c = x(r),
              u = _(d.baseId, s),
              h = E(d.baseId, s),
              f = s === d.value;
            return (0, p.jsx)(n.q7, {
              asChild: !0,
              ...c,
              focusable: !i,
              active: f,
              children: (0, p.jsx)(l.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": f,
                "aria-controls": h,
                "data-state": f ? "active" : "inactive",
                "data-disabled": i ? "" : void 0,
                disabled: i,
                id: u,
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
                  f || i || !e || d.onValueChange(s);
                }),
              }),
            });
          });
        S.displayName = j;
        var N = "TabsContent",
          A = s.forwardRef((e, t) => {
            let {
                __scopeTabs: r,
                value: a,
                forceMount: i,
                children: n,
                ...d
              } = e,
              c = v(N, r),
              u = _(c.baseId, a),
              h = E(c.baseId, a),
              f = a === c.value,
              m = s.useRef(f);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (m.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, p.jsx)(o.C, {
                present: i || f,
                children: ({ present: r }) =>
                  (0, p.jsx)(l.sG.div, {
                    "data-state": f ? "active" : "inactive",
                    "data-orientation": c.orientation,
                    role: "tabpanel",
                    "aria-labelledby": u,
                    hidden: !r,
                    id: h,
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
        function _(e, t) {
          return `${e}-trigger-${t}`;
        }
        function E(e, t) {
          return `${e}-content-${t}`;
        }
        A.displayName = N;
        var T = w,
          C = y,
          R = S,
          P = A;
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      30239: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 90076));
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      32367: (e, t, r) => {
        "use strict";
        let s;
        r.d(t, { AG: () => g, Iw: () => m, UU: () => x });
        var a = r(97713),
          i = r(15149),
          n = r.n(i),
          o = r(84205);
        let { fetch: l } = n()(),
          d = "http://localhost:54321",
          c =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          u = process.env.SUPABASE_SERVICE_ROLE_KEY,
          p = c ? { apikey: c } : void 0;
        function h() {
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
        function f() {
          return (h(), s)
            ? s
            : (s = (0, a.createBrowserClient)(d, c, {
                global: { headers: p },
              }));
        }
        function m() {
          return (0, o.useMemo)(f, []);
        }
        function x() {
          return (
            h(), (0, a.createBrowserClient)(d, c, { global: { headers: p } })
          );
        }
        let g = f;
        f();
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
        var c =
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
                  c = s[1];
                return (
                  o(
                    function () {
                      (a.value = r),
                        (a.getSnapshot = t),
                        d(a) && c({ inst: a });
                    },
                    [e, r, t],
                  ),
                  n(
                    function () {
                      return (
                        d(a) && c({ inst: a }),
                        e(function () {
                          d(a) && c({ inst: a });
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
          void 0 !== s.useSyncExternalStore ? s.useSyncExternalStore : c;
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
      43886: () => {},
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
      58244: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.default,
            __next_app__: () => c,
            pages: () => d,
            routeModule: () => u,
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
                      "settings",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 5870)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\settings\\page.tsx",
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
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\settings\\page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(authenticated)/settings/page",
              pathname: "/settings",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      59150: (e, t, r) => {
        "use strict";
        r.d(t, { RG: () => y, bL: () => R, q7: () => P });
        var s = r(84205),
          a = r(28777),
          i = r(28029),
          n = r(71604),
          o = r(18047),
          l = r(42414),
          d = r(78593),
          c = r(10308),
          u = r(48705),
          p = r(7839),
          h = r(61268),
          f = "rovingFocusGroup.onEntryFocus",
          m = { bubbles: !1, cancelable: !0 },
          x = "RovingFocusGroup",
          [g, v, w] = (0, i.N)(x),
          [b, y] = (0, o.A)(x, [w]),
          [j, S] = b(x),
          N = s.forwardRef((e, t) =>
            (0, h.jsx)(g.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, h.jsx)(g.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, h.jsx)(A, { ...e, ref: t }),
              }),
            }),
          );
        N.displayName = x;
        var A = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                orientation: i,
                loop: o = !1,
                dir: l,
                currentTabStopId: g,
                defaultCurrentTabStopId: w,
                onCurrentTabStopIdChange: b,
                onEntryFocus: y,
                preventScrollOnEntryFocus: S = !1,
                ...N
              } = e,
              A = s.useRef(null),
              _ = (0, n.s)(t, A),
              E = (0, p.jH)(l),
              [T, R] = (0, u.i)({
                prop: g,
                defaultProp: w ?? null,
                onChange: b,
                caller: x,
              }),
              [P, k] = s.useState(!1),
              I = (0, c.c)(y),
              q = v(r),
              U = s.useRef(!1),
              [O, D] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = A.current;
                if (e)
                  return (
                    e.addEventListener(f, I), () => e.removeEventListener(f, I)
                  );
              }, [I]),
              (0, h.jsx)(j, {
                scope: r,
                orientation: i,
                dir: E,
                loop: o,
                currentTabStopId: T,
                onItemFocus: s.useCallback((e) => R(e), [R]),
                onItemShiftTab: s.useCallback(() => k(!0), []),
                onFocusableItemAdd: s.useCallback(() => D((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => D((e) => e - 1), []),
                children: (0, h.jsx)(d.sG.div, {
                  tabIndex: P || 0 === O ? -1 : 0,
                  "data-orientation": i,
                  ...N,
                  ref: _,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, a.m)(e.onMouseDown, () => {
                    U.current = !0;
                  }),
                  onFocus: (0, a.m)(e.onFocus, (e) => {
                    let t = !U.current;
                    if (e.target === e.currentTarget && t && !P) {
                      let t = new CustomEvent(f, m);
                      if (
                        (e.currentTarget.dispatchEvent(t), !t.defaultPrevented)
                      ) {
                        let e = q().filter((e) => e.focusable);
                        C(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === T),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          S,
                        );
                      }
                    }
                    U.current = !1;
                  }),
                  onBlur: (0, a.m)(e.onBlur, () => k(!1)),
                }),
              })
            );
          }),
          _ = "RovingFocusGroupItem",
          E = s.forwardRef((e, t) => {
            let {
                __scopeRovingFocusGroup: r,
                focusable: i = !0,
                active: n = !1,
                tabStopId: o,
                children: c,
                ...u
              } = e,
              p = (0, l.B)(),
              f = o || p,
              m = S(_, r),
              x = m.currentTabStopId === f,
              w = v(r),
              {
                onFocusableItemAdd: b,
                onFocusableItemRemove: y,
                currentTabStopId: j,
              } = m;
            return (
              s.useEffect(() => {
                if (i) return b(), () => y();
              }, [i, b, y]),
              (0, h.jsx)(g.ItemSlot, {
                scope: r,
                id: f,
                focusable: i,
                active: n,
                children: (0, h.jsx)(d.sG.span, {
                  tabIndex: x ? 0 : -1,
                  "data-orientation": m.orientation,
                  ...u,
                  ref: t,
                  onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                    i ? m.onItemFocus(f) : e.preventDefault();
                  }),
                  onFocus: (0, a.m)(e.onFocus, () => m.onItemFocus(f)),
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
                        return T[a];
                    })(e, m.orientation, m.dir);
                    if (void 0 !== t) {
                      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                        return;
                      e.preventDefault();
                      let r = w()
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
                      setTimeout(() => C(r));
                    }
                  }),
                  children:
                    "function" == typeof c
                      ? c({ isCurrentTabStop: x, hasTabStop: null != j })
                      : c,
                }),
              })
            );
          });
        E.displayName = _;
        var T = {
          ArrowLeft: "prev",
          ArrowUp: "prev",
          ArrowRight: "next",
          ArrowDown: "next",
          PageUp: "first",
          Home: "first",
          PageDown: "last",
          End: "last",
        };
        function C(e, t = !1) {
          let r = document.activeElement;
          for (let s of e)
            if (
              s === r ||
              (s.focus({ preventScroll: t }), document.activeElement !== r)
            )
              return;
        }
        var R = N,
          P = E;
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
        function p(e, t) {
          var r;
          return (u || (u = new c(void 0)), u).hasPermission(e, t);
        }
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      67155: (e, t, r) => {
        "use strict";
        r.d(t, { Z: () => a });
        var s = r(84205);
        function a(e) {
          let t = s.useRef({ value: e, previous: e });
          return s.useMemo(
            () => (
              t.current.value !== e &&
                ((t.current.previous = t.current.value), (t.current.value = e)),
              t.current.previous
            ),
            [e],
          );
        }
      },
      72967: (e, t, r) => {
        "use strict";
        let s;
        r.r(t),
          r.d(t, {
            default: () => p,
            generateImageMetadata: () => c,
            generateMetadata: () => d,
            generateViewport: () => u,
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
          c = void 0,
          u = void 0,
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
              TabsContent: () => u,
              TabsList: () => d,
              TabsTrigger: () => c,
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
            function c({ className: e, ...t }) {
              return (0, a.jsx)(i.l9, {
                "data-slot": "tabs-trigger",
                className: (0, n.cn)(
                  "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
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
      90076: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.r(t), r.d(t, { default: () => x });
            var a = r(61268),
              i = r(89882),
              n = r(84205),
              o = r(15090),
              l = r(3519),
              d = r(32367),
              c = r(92290),
              u = r(28909),
              p = r(5451),
              h = r(13909),
              f = r(77001),
              m = e([c, u, p, h, f]);
            function x() {
              let [e, t] = (0, n.useState)(!1),
                { user: r } = (0, l.useAuth)(),
                { toast: s } = (0, o.d)(),
                m = (0, d.Iw)(),
                [x, g] = (0, n.useState)(r?.user_metadata?.full_name || ""),
                v = (0, i.useSearchParams)().get("tab"),
                [w, b] = (0, n.useState)({
                  emailNotifications: !0,
                  documentReminders: !0,
                  applicationUpdates: !0,
                  twoFactorAuth: !1,
                  theme: "system",
                  language: "en",
                }),
                y = async (e) => {
                  try {
                    if (!r?.id) throw Error("User not authenticated");
                    let { error: t } = await m
                      .from("profiles")
                      .update({ avatar_url: e })
                      .eq("id", r.id);
                    if (t) throw t;
                  } catch (e) {
                    s({
                      variant: "destructive",
                      title: "Error",
                      description: "Failed to update profile",
                    });
                  }
                },
                j = async (e, t) => {
                  b((r) => ({ ...r, [e]: t }));
                  try {
                    if (!r?.id) throw Error("User not authenticated");
                    let { error: a } = await m
                      .from("profiles")
                      .update({ [`settings_${e}`]: t })
                      .eq("id", r.id);
                    if (a) throw a;
                    s({
                      title: "Success",
                      description: "Settings updated successfully",
                    });
                  } catch (e) {
                    s({
                      variant: "destructive",
                      title: "Error",
                      description: "Failed to update settings",
                    });
                  }
                },
                S = async () => {
                  try {
                    if ((t(!0), !r)) throw Error("No user");
                    let { error: e } = await m.auth.updateUser({
                      data: { full_name: x },
                    });
                    if (e) throw e;
                    let { error: a } = await m
                      .from("profiles")
                      .update({ full_name: x })
                      .eq("id", r.id);
                    if (a) throw a;
                    s({
                      title: "Success",
                      description: "Profile updated successfully",
                    });
                  } catch (e) {
                    console.error("Profile update error:", e),
                      s({
                        variant: "destructive",
                        title: "Error",
                        description: "Failed to update profile",
                      });
                  } finally {
                    t(!1);
                  }
                };
              return (0, a.jsx)("div", {
                className: "container max-w-4xl py-8",
                children: (0, a.jsxs)(f.Tabs, {
                  defaultValue: v || "general",
                  className: "space-y-4",
                  children: [
                    (0, a.jsxs)(f.TabsList, {
                      children: [
                        (0, a.jsx)(f.TabsTrigger, {
                          value: "general",
                          children: "General",
                        }),
                        (0, a.jsx)(f.TabsTrigger, {
                          value: "notifications",
                          children: "Notifications",
                        }),
                        (0, a.jsx)(f.TabsTrigger, {
                          value: "security",
                          children: "Security",
                        }),
                      ],
                    }),
                    (0, a.jsx)(f.TabsContent, {
                      value: "general",
                      children: (0, a.jsxs)(p.Zp, {
                        children: [
                          (0, a.jsxs)(p.aR, {
                            children: [
                              (0, a.jsx)(p.ZB, {
                                children: "General Settings",
                              }),
                              (0, a.jsx)(p.BT, {
                                children: "Manage your profile and preferences",
                              }),
                            ],
                          }),
                          (0, a.jsxs)(p.Wu, {
                            className: "space-y-6",
                            children: [
                              (0, a.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, a.jsx)("h3", {
                                    className: "text-lg font-medium",
                                    children: "Profile Information",
                                  }),
                                  (0, a.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                      (0, a.jsx)("label", {
                                        className: "text-sm font-medium",
                                        children: "Full Name",
                                      }),
                                      (0, a.jsxs)("div", {
                                        className: "flex gap-2",
                                        children: [
                                          (0, a.jsx)("input", {
                                            type: "text",
                                            value: x,
                                            onChange: (e) => g(e.target.value),
                                            className:
                                              "flex-1 rounded-md border px-3 py-2",
                                            placeholder: "Enter your full name",
                                          }),
                                          (0, a.jsx)(u.$, {
                                            onClick: S,
                                            disabled: e,
                                            children: e
                                              ? "Updating..."
                                              : "Update",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, a.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, a.jsx)("h3", {
                                    className: "text-lg font-medium",
                                    children: "Profile Picture",
                                  }),
                                  (0, a.jsx)(c.n, {
                                    currentAvatarUrl:
                                      r?.user_metadata?.avatar_url,
                                    onUploadComplete: y,
                                  }),
                                ],
                              }),
                              (0, a.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, a.jsx)("h3", {
                                    className: "text-lg font-medium",
                                    children: "Preferences",
                                  }),
                                  (0, a.jsxs)("div", {
                                    className: "space-y-4",
                                    children: [
                                      (0, a.jsxs)("div", {
                                        className:
                                          "flex items-center justify-between",
                                        children: [
                                          (0, a.jsxs)("div", {
                                            className: "space-y-0.5",
                                            children: [
                                              (0, a.jsx)("label", {
                                                className:
                                                  "text-sm font-medium",
                                                children: "Theme",
                                              }),
                                              (0, a.jsx)("p", {
                                                className:
                                                  "text-sm text-muted-foreground",
                                                children:
                                                  "Choose your preferred theme",
                                              }),
                                            ],
                                          }),
                                          (0, a.jsxs)("select", {
                                            value: w.theme,
                                            onChange: (e) =>
                                              j("theme", e.target.value),
                                            className:
                                              "w-[200px] rounded-md border",
                                            children: [
                                              (0, a.jsx)("option", {
                                                value: "light",
                                                children: "Light",
                                              }),
                                              (0, a.jsx)("option", {
                                                value: "dark",
                                                children: "Dark",
                                              }),
                                              (0, a.jsx)("option", {
                                                value: "system",
                                                children: "System",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, a.jsxs)("div", {
                                        className:
                                          "flex items-center justify-between",
                                        children: [
                                          (0, a.jsxs)("div", {
                                            className: "space-y-0.5",
                                            children: [
                                              (0, a.jsx)("label", {
                                                className:
                                                  "text-sm font-medium",
                                                children: "Language",
                                              }),
                                              (0, a.jsx)("p", {
                                                className:
                                                  "text-sm text-muted-foreground",
                                                children:
                                                  "Select your preferred language",
                                              }),
                                            ],
                                          }),
                                          (0, a.jsxs)("select", {
                                            value: w.language,
                                            onChange: (e) =>
                                              j("language", e.target.value),
                                            className:
                                              "w-[200px] rounded-md border",
                                            children: [
                                              (0, a.jsx)("option", {
                                                value: "en",
                                                children: "English",
                                              }),
                                              (0, a.jsx)("option", {
                                                value: "es",
                                                children: "Spanish",
                                              }),
                                              (0, a.jsx)("option", {
                                                value: "fr",
                                                children: "French",
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
                        ],
                      }),
                    }),
                    (0, a.jsx)(f.TabsContent, {
                      value: "notifications",
                      children: (0, a.jsxs)(p.Zp, {
                        children: [
                          (0, a.jsxs)(p.aR, {
                            children: [
                              (0, a.jsx)(p.ZB, {
                                children: "Notification Settings",
                              }),
                              (0, a.jsx)(p.BT, {
                                children:
                                  "Manage how you receive notifications",
                              }),
                            ],
                          }),
                          (0, a.jsxs)(p.Wu, {
                            className: "space-y-4",
                            children: [
                              (0, a.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  (0, a.jsxs)("div", {
                                    className: "space-y-0.5",
                                    children: [
                                      (0, a.jsx)("label", {
                                        className: "text-sm font-medium",
                                        children: "Email Notifications",
                                      }),
                                      (0, a.jsx)("p", {
                                        className:
                                          "text-sm text-muted-foreground",
                                        children:
                                          "Receive updates about your application",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsx)(h.d, {
                                    checked: w.emailNotifications,
                                    onCheckedChange: (e) =>
                                      j("emailNotifications", e),
                                  }),
                                ],
                              }),
                              (0, a.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  (0, a.jsxs)("div", {
                                    className: "space-y-0.5",
                                    children: [
                                      (0, a.jsx)("label", {
                                        className: "text-sm font-medium",
                                        children: "Document Reminders",
                                      }),
                                      (0, a.jsx)("p", {
                                        className:
                                          "text-sm text-muted-foreground",
                                        children:
                                          "Get reminded about document deadlines",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsx)(h.d, {
                                    checked: w.documentReminders,
                                    onCheckedChange: (e) =>
                                      j("documentReminders", e),
                                  }),
                                ],
                              }),
                              (0, a.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  (0, a.jsxs)("div", {
                                    className: "space-y-0.5",
                                    children: [
                                      (0, a.jsx)("label", {
                                        className: "text-sm font-medium",
                                        children: "Application Updates",
                                      }),
                                      (0, a.jsx)("p", {
                                        className:
                                          "text-sm text-muted-foreground",
                                        children:
                                          "Receive status updates about your application",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsx)(h.d, {
                                    checked: w.applicationUpdates,
                                    onCheckedChange: (e) =>
                                      j("applicationUpdates", e),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, a.jsx)(f.TabsContent, {
                      value: "security",
                      children: (0, a.jsxs)(p.Zp, {
                        children: [
                          (0, a.jsxs)(p.aR, {
                            children: [
                              (0, a.jsx)(p.ZB, {
                                children: "Security Settings",
                              }),
                              (0, a.jsx)(p.BT, {
                                children: "Manage your account security",
                              }),
                            ],
                          }),
                          (0, a.jsxs)(p.Wu, {
                            className: "space-y-4",
                            children: [
                              (0, a.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  (0, a.jsxs)("div", {
                                    className: "space-y-0.5",
                                    children: [
                                      (0, a.jsx)("label", {
                                        className: "text-sm font-medium",
                                        children: "Two-Factor Authentication",
                                      }),
                                      (0, a.jsx)("p", {
                                        className:
                                          "text-sm text-muted-foreground",
                                        children:
                                          "Add an extra layer of security to your account",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsx)(h.d, {
                                    checked: w.twoFactorAuth,
                                    onCheckedChange: (e) =>
                                      j("twoFactorAuth", e),
                                  }),
                                ],
                              }),
                              (0, a.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, a.jsx)("h3", {
                                    className: "text-lg font-medium",
                                    children: "Password",
                                  }),
                                  (0, a.jsx)(u.$, {
                                    variant: "outline",
                                    children: "Change Password",
                                  }),
                                ],
                              }),
                              (0, a.jsxs)("div", {
                                className: "space-y-4",
                                children: [
                                  (0, a.jsx)("h3", {
                                    className: "text-lg font-medium",
                                    children: "Sessions",
                                  }),
                                  (0, a.jsx)(u.$, {
                                    variant: "destructive",
                                    children: "Sign Out All Devices",
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
              });
            }
            ([c, u, p, h, f] = m.then ? (await m)() : m), s();
          } catch (e) {
            s(e);
          }
        });
      },
      91557: (e, t, r) => {
        "use strict";
        r.d(t, { X: () => i });
        var s = r(84205),
          a = r(66130);
        function i(e) {
          let [t, r] = s.useState(void 0);
          return (
            (0, a.N)(() => {
              if (e) {
                r({ width: e.offsetWidth, height: e.offsetHeight });
                let t = new ResizeObserver((t) => {
                  let s, a;
                  if (!Array.isArray(t) || !t.length) return;
                  let i = t[0];
                  if ("borderBoxSize" in i) {
                    let e = i.borderBoxSize,
                      t = Array.isArray(e) ? e[0] : e;
                    (s = t.inlineSize), (a = t.blockSize);
                  } else (s = e.offsetWidth), (a = e.offsetHeight);
                  r({ width: s, height: a });
                });
                return (
                  t.observe(e, { box: "border-box" }), () => t.unobserve(e)
                );
              }
              r(void 0);
            }, [e]),
            t
          );
        }
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      92290: (e, t, r) => {
        "use strict";
        r.a(e, async (e, s) => {
          try {
            r.d(t, { n: () => p });
            var a = r(61268),
              i = r(84205),
              n = r(15090),
              o = r(32367),
              l = r(23734),
              d = r(28909),
              c = e([l, d]);
            async function u(e) {
              let t = (0, o.AG)(),
                r = e.name.split(".").pop(),
                s = `${Math.random()}.${r}`,
                { data: a, error: i } = await t.storage
                  .from("avatars")
                  .upload(s, e);
              if (i) throw i;
              let {
                data: { publicUrl: n },
              } = t.storage.from("avatars").getPublicUrl(a.path);
              return n;
            }
            [l, d] = c.then ? (await c)() : c;
            let p = ({ currentAvatarUrl: e, onUploadComplete: t }) => {
              let [r, s] = (0, i.useState)(!1),
                { toast: o } = (0, n.d)(),
                c = async (e) => {
                  let r = e.target.files?.[0];
                  if (r)
                    try {
                      s(!0);
                      let e = await u(r);
                      await t(e),
                        o({
                          title: "Success",
                          description: "Avatar updated successfully",
                        });
                    } catch (e) {
                      o({
                        variant: "destructive",
                        title: "Error",
                        description: "Failed to upload avatar",
                      });
                    } finally {
                      s(!1);
                    }
                };
              return (0, a.jsxs)("div", {
                className: "flex items-center gap-4",
                children: [
                  (0, a.jsx)(l.eu, {
                    className: "h-16 w-16",
                    children: (0, a.jsx)("img", { src: e, alt: "Avatar" }),
                  }),
                  (0, a.jsxs)("div", {
                    children: [
                      (0, a.jsx)("input", {
                        type: "file",
                        accept: "image/*",
                        className: "hidden",
                        id: "avatar-upload",
                        onChange: c,
                        disabled: r,
                      }),
                      (0, a.jsx)(d.$, {
                        variant: "outline",
                        onClick: () =>
                          document.getElementById("avatar-upload")?.click(),
                        disabled: r,
                        children: r ? "Uploading..." : "Change Avatar",
                      }),
                    ],
                  }),
                ],
              });
            };
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      99975: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 5870));
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(
      0,
      [827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 8029, 5728, 4630],
      () => r(58244),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
