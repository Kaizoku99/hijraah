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
    (e._sentryDebugIds[s] = "dd2a988c-da07-450b-94d8-ec3c3ce2395b"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-dd2a988c-da07-450b-94d8-ec3c3ce2395b"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5495],
  {
    2535: (e, s, l) => {
      Promise.resolve().then(l.bind(l, 50382));
    },
    50382: (e, s, l) => {
      "use strict";
      l.d(s, { LoginForm: () => g });
      var r = l(30602),
        a = l(26515),
        n = l(71188),
        i = l(41960),
        t = l(85218),
        c = l(72508),
        d = l(36839),
        o = l(17967),
        m = l(84418),
        h = l(5271),
        x = l(77413),
        u = l(16873),
        p = l(4401);
      let j = o.Ik({
        email: o.Yj().email("Invalid email address"),
        password: o.Yj().min(8, "Password must be at least 8 characters"),
      });
      function g() {
        let { signIn: e } = (0, m.useAuth)(),
          s = (0, i.useRouter)(),
          l = (0, i.useSearchParams)(),
          [o, g] = t.useState(!1),
          w = (0, c.mN)({
            resolver: (0, a.u)(j),
            defaultValues: { email: "", password: "" },
          }),
          f = async (r) => {
            try {
              g(!0), await e("email", { email: r.email, password: r.password });
              let a = l.get("redirect") || "/dashboard";
              s.push(a);
            } catch (e) {
              console.error("Login error:", e), d.oR.error("Failed to sign in");
            } finally {
              g(!1);
            }
          };
        return (0, r.jsxs)(x.Zp, {
          className: "w-full max-w-md",
          children: [
            (0, r.jsxs)(x.aR, {
              children: [
                (0, r.jsx)(x.ZB, { children: "Sign In" }),
                (0, r.jsx)(x.BT, {
                  children:
                    "Choose your sign-in method or enter your email and password",
                }),
              ],
            }),
            (0, r.jsxs)(x.Wu, {
              children: [
                (0, r.jsxs)("div", {
                  className: "grid gap-4 mb-6",
                  children: [
                    (0, r.jsxs)(h.$, {
                      variant: "outline",
                      className: "w-full",
                      onClick: () =>
                        d.oR.info("Apple login not implemented yet."),
                      children: [
                        (0, r.jsx)("svg", {
                          className: "mr-2 h-4 w-4",
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          children: (0, r.jsx)("path", {
                            d: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
                            fill: "currentColor",
                          }),
                        }),
                        "Sign in with Apple",
                      ],
                    }),
                    (0, r.jsxs)(h.$, {
                      variant: "outline",
                      className: "w-full",
                      onClick: () =>
                        d.oR.info("Google login not implemented yet."),
                      children: [
                        (0, r.jsx)("svg", {
                          className: "mr-2 h-4 w-4",
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          children: (0, r.jsx)("path", {
                            d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
                            fill: "currentColor",
                          }),
                        }),
                        "Sign in with Google",
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)("div", {
                  className: "relative mb-4",
                  children: [
                    (0, r.jsx)("div", {
                      className: "absolute inset-0 flex items-center",
                      children: (0, r.jsx)("span", {
                        className: "w-full border-t",
                      }),
                    }),
                    (0, r.jsx)("div", {
                      className:
                        "relative flex justify-center text-xs uppercase",
                      children: (0, r.jsx)("span", {
                        className: "bg-card px-2 text-muted-foreground",
                        children: "Or continue with",
                      }),
                    }),
                  ],
                }),
                (0, r.jsx)(u.lV, {
                  ...w,
                  children: (0, r.jsxs)("form", {
                    onSubmit: w.handleSubmit(f),
                    className: "space-y-4",
                    children: [
                      (0, r.jsx)(u.zB, {
                        control: w.control,
                        name: "email",
                        render: (e) => {
                          let { field: s } = e;
                          return (0, r.jsxs)(u.eI, {
                            children: [
                              (0, r.jsx)(u.lR, { children: "Email" }),
                              (0, r.jsx)(u.MJ, {
                                children: (0, r.jsx)(p.p, {
                                  type: "email",
                                  placeholder: "Enter your email",
                                  disabled: o,
                                  ...s,
                                }),
                              }),
                              (0, r.jsx)(u.C5, {}),
                            ],
                          });
                        },
                      }),
                      (0, r.jsx)(u.zB, {
                        control: w.control,
                        name: "password",
                        render: (e) => {
                          let { field: s } = e;
                          return (0, r.jsxs)(u.eI, {
                            children: [
                              (0, r.jsx)(u.lR, { children: "Password" }),
                              (0, r.jsx)(u.MJ, {
                                children: (0, r.jsx)(p.p, {
                                  type: "password",
                                  placeholder: "Enter your password",
                                  disabled: o,
                                  ...s,
                                }),
                              }),
                              (0, r.jsx)(u.C5, {}),
                            ],
                          });
                        },
                      }),
                      (0, r.jsx)(h.$, {
                        type: "submit",
                        className: "w-full",
                        disabled: o,
                        children: o
                          ? (0, r.jsxs)(r.Fragment, {
                              children: [
                                (0, r.jsx)(n.A, {
                                  className: "mr-2 h-4 w-4 animate-spin",
                                }),
                                "Signing in...",
                              ],
                            })
                          : "Sign In",
                      }),
                    ],
                  }),
                }),
              ],
            }),
            (0, r.jsxs)(x.wL, {
              className: "flex flex-col gap-3 items-center pt-0",
              children: [
                (0, r.jsx)("div", {
                  className: "text-center text-sm",
                  children: (0, r.jsx)(h.$, {
                    variant: "link",
                    className: "px-2 text-muted-foreground",
                    onClick: () => s.push("/auth/reset-password"),
                    children: "Forgot password?",
                  }),
                }),
                (0, r.jsxs)("div", {
                  className: "text-center text-sm",
                  children: [
                    "Don't have an account?",
                    " ",
                    (0, r.jsx)(h.$, {
                      variant: "link",
                      className: "px-2",
                      onClick: () => s.push("/auth/register"),
                      children: "Sign up",
                    }),
                  ],
                }),
                (0, r.jsxs)("div", {
                  className: "text-muted-foreground text-center text-xs mt-2",
                  children: [
                    "By clicking continue, you agree to our",
                    " ",
                    (0, r.jsx)(h.$, {
                      variant: "link",
                      className: "p-0 h-auto text-xs",
                      onClick: () => s.push("/legal/terms"),
                      children: "Terms of Service",
                    }),
                    " ",
                    "and",
                    " ",
                    (0, r.jsx)(h.$, {
                      variant: "link",
                      className: "p-0 h-auto text-xs",
                      onClick: () => s.push("/legal/privacy"),
                      children: "Privacy Policy",
                    }),
                    ".",
                  ],
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
    e.O(0, [6593, 4223, 3209, 7358], () => s(2535)), (_N_E = e.O());
  },
]);
