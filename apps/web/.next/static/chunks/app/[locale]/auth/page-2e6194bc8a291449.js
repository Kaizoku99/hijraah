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
    (e._sentryDebugIds[s] = "03873e89-c9fc-409a-bca4-73c3e2ea42ec"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-03873e89-c9fc-409a-bca4-73c3e2ea42ec"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7096],
  {
    40962: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 92068));
    },
    92068: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => k });
      var r = a(30602),
        t = a(26515),
        i = a(17957),
        l = a(26913),
        d = a(61053),
        n = a(34944),
        c = a(62839),
        o = a(38027),
        m = a(71188),
        u = a(40784),
        x = a(97687),
        p = a.n(x),
        h = a(41960),
        f = a(85218),
        y = a(72508),
        j = a(2353),
        g = a(47482),
        w = a(84418),
        b = a(86292),
        N = a(5271),
        v = a(77413),
        P = a(3240),
        A = a(4401),
        C = a(60070),
        _ = a(31538);
      function k() {
        let [e, s] = (0, f.useState)(!1),
          { signUp: a } = (0, w.useAuth)(),
          { toast: x } = (0, g.d)(),
          k = (0, h.useRouter)(),
          {
            register: E,
            handleSubmit: z,
            watch: S,
            formState: { errors: T },
          } = (0, y.mN)({
            resolver: (0, t.u)(b.zK),
            defaultValues: { email: "", password: "", confirmPassword: "" },
            mode: "onChange",
          }),
          V = S("password", ""),
          F = [
            {
              id: "length",
              label: "Must be at least 8 characters",
              isValid: V.length >= 8,
            },
            {
              id: "uppercase",
              label: "Contains uppercase letter",
              isValid: /[A-Z]/.test(V),
            },
            {
              id: "lowercase",
              label: "Contains lowercase letter",
              isValid: /[a-z]/.test(V),
            },
            {
              id: "number",
              label: "Contains number",
              isValid: /[0-9]/.test(V),
            },
            {
              id: "special",
              label: "Contains special character",
              isValid: /[^A-Za-z0-9]/.test(V),
            },
          ],
          I = async (e) => {
            s(!0);
            try {
              await a(e.email, e.password);
              try {
                await fetch("/api/onboarding/init", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                });
              } catch (e) {
                console.error("Error initializing onboarding:", e);
              }
              x({
                title: "Register",
                description:
                  "Registration successful! Please check your email to verify your account.",
              }),
                k.push("/auth/login");
            } catch (e) {
              x({
                variant: "destructive",
                title: "Error",
                description:
                  e instanceof Error
                    ? e.message
                    : "An unexpected error occurred. Please try again.",
              });
            } finally {
              s(!1);
            }
          };
        return (0, r.jsxs)("div", {
          className:
            "bg-gradient-to-br from-background to-muted flex min-h-svh flex-col items-center justify-center p-4 md:p-8",
          children: [
            (0, r.jsx)(j.U, {}),
            (0, r.jsxs)(i.P.div, {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.3 },
              className:
                "w-full max-w-md px-4 py-8 flex flex-col items-center gap-8",
              children: [
                (0, r.jsxs)(p(), {
                  href: "/",
                  className:
                    "flex items-center gap-3 self-center transition-transform hover:scale-105",
                  legacyBehavior: !0,
                  children: [
                    (0, r.jsx)("div", {
                      className:
                        "bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md shadow-md",
                      children: (0, r.jsx)(l.A, { className: "size-4" }),
                    }),
                    (0, r.jsx)("span", {
                      className: "font-semibold text-xl tracking-tight",
                      children: "Hijraah",
                    }),
                  ],
                }),
                (0, r.jsx)(i.P.div, {
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 0.1, duration: 0.4 },
                  className: "w-full",
                  children: (0, r.jsxs)(v.Zp, {
                    className: "border-border/30 shadow-lg",
                    children: [
                      (0, r.jsxs)(v.aR, {
                        className: "space-y-2 text-center pb-6",
                        children: [
                          (0, r.jsx)(v.ZB, {
                            className: "text-2xl font-bold",
                            children: "Create an account",
                          }),
                          (0, r.jsx)(v.BT, {
                            className: "text-muted-foreground",
                            children:
                              "Enter your details below to create your account",
                          }),
                        ],
                      }),
                      (0, r.jsx)(v.Wu, {
                        children: (0, r.jsx)("form", {
                          onSubmit: z(I),
                          className: "space-y-6",
                          children: (0, r.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                              (0, r.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  (0, r.jsx)(C.J, {
                                    htmlFor: "email",
                                    className: "text-sm font-medium",
                                    children: "Email",
                                  }),
                                  (0, r.jsxs)("div", {
                                    className: "relative",
                                    children: [
                                      (0, r.jsx)(d.A, {
                                        className:
                                          "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                                      }),
                                      (0, r.jsx)(A.p, {
                                        id: "email",
                                        type: "email",
                                        placeholder: "name@example.com",
                                        className: "pl-10",
                                        "aria-invalid": !!T.email,
                                        "aria-describedby": T.email
                                          ? "email-error"
                                          : void 0,
                                        disabled: e,
                                        ...E("email"),
                                      }),
                                    ],
                                  }),
                                  T.email &&
                                    (0, r.jsx)(P.j, {
                                      message: T.email.message,
                                      id: "email-error",
                                    }),
                                ],
                              }),
                              (0, r.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  (0, r.jsx)(C.J, {
                                    htmlFor: "password",
                                    className: "text-sm font-medium",
                                    children: "Password",
                                  }),
                                  (0, r.jsxs)("div", {
                                    className: "relative",
                                    children: [
                                      (0, r.jsx)(n.A, {
                                        className:
                                          "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                                      }),
                                      (0, r.jsx)(A.p, {
                                        id: "password",
                                        type: "password",
                                        className: "pl-10",
                                        "aria-invalid": !!T.password,
                                        "aria-describedby": T.password
                                          ? "password-error"
                                          : void 0,
                                        disabled: e,
                                        ...E("password"),
                                      }),
                                    ],
                                  }),
                                  T.password &&
                                    (0, r.jsx)(P.j, {
                                      message: T.password.message,
                                      id: "password-error",
                                    }),
                                  V &&
                                    (0, r.jsx)(_.M, {
                                      password: V,
                                      className: "mt-3",
                                    }),
                                  V &&
                                    (0, r.jsx)("div", {
                                      className:
                                        "grid grid-cols-1 md:grid-cols-2 gap-2 mt-3",
                                      children: F.map((e) => {
                                        let { id: s, label: a, isValid: t } = e;
                                        return (0, r.jsxs)(
                                          "div",
                                          {
                                            className:
                                              "flex items-center gap-2 text-xs",
                                            children: [
                                              t
                                                ? (0, r.jsx)(c.A, {
                                                    className:
                                                      "h-3.5 w-3.5 text-emerald-500",
                                                  })
                                                : (0, r.jsx)(o.A, {
                                                    className:
                                                      "h-3.5 w-3.5 text-muted-foreground",
                                                  }),
                                              (0, r.jsx)("span", {
                                                className: t
                                                  ? "text-emerald-500"
                                                  : "text-muted-foreground",
                                                children: a,
                                              }),
                                            ],
                                          },
                                          s,
                                        );
                                      }),
                                    }),
                                ],
                              }),
                              (0, r.jsxs)("div", {
                                className: "space-y-2",
                                children: [
                                  (0, r.jsx)(C.J, {
                                    htmlFor: "confirm-password",
                                    className: "text-sm font-medium",
                                    children: "Confirm Password",
                                  }),
                                  (0, r.jsxs)("div", {
                                    className: "relative",
                                    children: [
                                      (0, r.jsx)(n.A, {
                                        className:
                                          "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                                      }),
                                      (0, r.jsx)(A.p, {
                                        id: "confirm-password",
                                        type: "password",
                                        className: "pl-10",
                                        "aria-invalid": !!T.confirmPassword,
                                        "aria-describedby": T.confirmPassword
                                          ? "confirm-password-error"
                                          : void 0,
                                        disabled: e,
                                        ...E("confirmPassword"),
                                      }),
                                    ],
                                  }),
                                  T.confirmPassword &&
                                    (0, r.jsx)(P.j, {
                                      message: T.confirmPassword.message,
                                      id: "confirm-password-error",
                                    }),
                                ],
                              }),
                              (0, r.jsx)(N.$, {
                                type: "submit",
                                className: "w-full font-medium mt-2",
                                disabled: e,
                                children: e
                                  ? (0, r.jsxs)(r.Fragment, {
                                      children: [
                                        (0, r.jsx)(m.A, {
                                          className:
                                            "mr-2 h-4 w-4 animate-spin",
                                        }),
                                        "Creating account...",
                                      ],
                                    })
                                  : (0, r.jsxs)(r.Fragment, {
                                      children: [
                                        "Create Account",
                                        (0, r.jsx)(u.A, {
                                          className: "ml-2 h-4 w-4",
                                        }),
                                      ],
                                    }),
                              }),
                            ],
                          }),
                        }),
                      }),
                      (0, r.jsx)(v.wL, {
                        className:
                          "flex justify-center border-t bg-muted/30 p-4",
                        children: (0, r.jsxs)("p", {
                          className: "text-center text-sm",
                          children: [
                            "Already have an account?",
                            " ",
                            (0, r.jsx)(p(), {
                              href: "/auth/login",
                              className:
                                "text-primary font-medium hover:underline underline-offset-4",
                              children: "Sign in",
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                (0, r.jsxs)("p", {
                  className:
                    "text-muted-foreground text-center text-xs max-w-xs",
                  children: [
                    "By clicking Create Account, you agree to our",
                    " ",
                    (0, r.jsx)(p(), {
                      href: "/terms",
                      className:
                        "text-primary hover:underline underline-offset-4",
                      children: "Terms of Service",
                    }),
                    " ",
                    "and",
                    " ",
                    (0, r.jsx)(p(), {
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
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(40962)), (_N_E = e.O());
  },
]);
