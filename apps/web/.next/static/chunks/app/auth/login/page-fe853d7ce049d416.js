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
    (e._sentryDebugIds[s] = "622418fa-42c1-4c0e-b628-20db8bc96b08"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-622418fa-42c1-4c0e-b628-20db8bc96b08"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4859],
  {
    56593: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 68335));
    },
    68335: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => P });
      var r = a(30602),
        t = a(26515),
        i = a(17957),
        l = a(26913),
        n = a(61053),
        d = a(34944),
        o = a(71188),
        c = a(62408),
        m = a(97687),
        x = a.n(m),
        h = a(41960),
        u = a(85218),
        f = a(72508),
        p = a(2353),
        g = a(60070),
        j = a(47482),
        y = a(84418),
        w = a(86292),
        v = a(5271),
        b = a(77413),
        N = a(3240),
        S = a(4401),
        E = a(56753);
      function P() {
        let [e, s] = (0, u.useState)(!1),
          { signIn: a, user: m, session: P } = (0, y.useAuth)(),
          { toast: k } = (0, j.d)(),
          _ = (0, h.useRouter)(),
          F = (0, h.useSearchParams)().get("redirectedFrom") || "/dashboard",
          {
            register: I,
            handleSubmit: z,
            formState: { errors: A },
          } = (0, f.mN)({
            resolver: (0, t.u)(w.X5),
            defaultValues: { email: "", password: "" },
          });
        (0, u.useEffect)(() => {
          m && P && _.push(F);
        }, [m, P, _, F]);
        let B = async (e) => {
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
            k({
              title: "Login",
              description: "You have successfully logged in.",
            });
          } catch (e) {
            k({
              variant: "destructive",
              title: "Error",
              description:
                e instanceof Error
                  ? e.message
                  : "Invalid email or password. Please try again.",
            });
          } finally {
            s(!1);
          }
        };
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(p.U, {}),
            (0, r.jsxs)("div", {
              className:
                "bg-gradient-to-br from-background to-muted flex min-h-svh flex-col items-center justify-center p-4 md:p-8",
              children: [
                (0, r.jsx)("div", {
                  className: "absolute top-4 right-4 flex items-center gap-2",
                }),
                (0, r.jsxs)(i.P.div, {
                  initial: { opacity: 0, y: -20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.3 },
                  className:
                    "w-full max-w-md px-4 py-8 flex flex-col items-center gap-8",
                  children: [
                    (0, r.jsxs)(x(), {
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
                      children: (0, r.jsxs)(b.Zp, {
                        className: "border-border/30 shadow-lg",
                        children: [
                          (0, r.jsxs)(b.aR, {
                            className: "space-y-2 text-center pb-6",
                            children: [
                              (0, r.jsx)(b.ZB, {
                                className: "text-2xl font-bold",
                                children: "Login to your account",
                              }),
                              (0, r.jsx)(b.BT, {
                                className: "text-muted-foreground",
                                children:
                                  "Enter your credentials to access your account",
                              }),
                            ],
                          }),
                          (0, r.jsx)(b.Wu, {
                            children: (0, r.jsx)("form", {
                              onSubmit: z(B),
                              className: "space-y-6",
                              children: (0, r.jsxs)("div", {
                                className: "flex flex-col gap-6",
                                children: [
                                  (0, r.jsxs)("div", {
                                    className: "flex flex-col gap-3",
                                    children: [
                                      (0, r.jsxs)(v.$, {
                                        variant: "outline",
                                        className:
                                          "w-full shadow-sm hover:shadow-md transition-all px-4 py-2 flex items-center text-sm",
                                        children: [
                                          (0, r.jsx)("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            viewBox: "0 0 24 24",
                                            className:
                                              "flex-shrink-0 size-4 mr-2",
                                            children: (0, r.jsx)("path", {
                                              d: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
                                              fill: "currentColor",
                                            }),
                                          }),
                                          "Sign in with Apple",
                                        ],
                                      }),
                                      (0, r.jsxs)(v.$, {
                                        variant: "outline",
                                        className:
                                          "w-full shadow-sm hover:shadow-md transition-all px-4 py-2 flex items-center text-sm",
                                        children: [
                                          (0, r.jsx)("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            viewBox: "0 0 24 24",
                                            className:
                                              "flex-shrink-0 size-4 mr-2",
                                            children: (0, r.jsx)("path", {
                                              d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 3.36 2.16 2.16 2.84 5.213 2.84 7.667 0 .76-.053 1.467-.173 2.053H12.48z",
                                              fill: "currentColor",
                                            }),
                                          }),
                                          "Sign in with Google",
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, r.jsxs)("div", {
                                    className:
                                      "relative flex items-center gap-2 py-2",
                                    children: [
                                      (0, r.jsx)(E.Separator, {
                                        className: "flex-1",
                                      }),
                                      (0, r.jsx)("span", {
                                        className:
                                          "text-xs text-muted-foreground font-medium bg-card px-2",
                                        children: "Or continue with",
                                      }),
                                      (0, r.jsx)(E.Separator, {
                                        className: "flex-1",
                                      }),
                                    ],
                                  }),
                                  (0, r.jsxs)("div", {
                                    className: "space-y-4",
                                    children: [
                                      (0, r.jsxs)("div", {
                                        className: "space-y-2",
                                        children: [
                                          (0, r.jsx)(g.J, {
                                            htmlFor: "email",
                                            className: "text-sm font-medium",
                                            children: "Email",
                                          }),
                                          (0, r.jsxs)("div", {
                                            className: "relative",
                                            children: [
                                              (0, r.jsx)(n.A, {
                                                className:
                                                  "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                                              }),
                                              (0, r.jsx)(S.p, {
                                                id: "email",
                                                type: "email",
                                                placeholder: "Enter your email",
                                                className: "pl-10",
                                                "aria-invalid": !!A.email,
                                                "aria-describedby": A.email
                                                  ? "email-error"
                                                  : void 0,
                                                disabled: e,
                                                ...I("email"),
                                              }),
                                            ],
                                          }),
                                          A.email &&
                                            (0, r.jsx)(N.j, {
                                              message: A.email.message,
                                              id: "email-error",
                                            }),
                                        ],
                                      }),
                                      (0, r.jsxs)("div", {
                                        className: "space-y-2",
                                        children: [
                                          (0, r.jsxs)("div", {
                                            className:
                                              "flex items-center justify-between",
                                            children: [
                                              (0, r.jsx)(g.J, {
                                                htmlFor: "password",
                                                className:
                                                  "text-sm font-medium",
                                                children: "Password",
                                              }),
                                              (0, r.jsx)(x(), {
                                                href: "/auth/forgot-password",
                                                className:
                                                  "text-xs text-primary hover:underline underline-offset-4 transition-colors",
                                                "aria-label": "Forgot Password",
                                                children: "Forgot Password?",
                                              }),
                                            ],
                                          }),
                                          (0, r.jsxs)("div", {
                                            className: "relative",
                                            children: [
                                              (0, r.jsx)(d.A, {
                                                className:
                                                  "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                                              }),
                                              (0, r.jsx)(S.p, {
                                                id: "password",
                                                type: "password",
                                                className: "pl-10",
                                                "aria-invalid": !!A.password,
                                                "aria-describedby": A.password
                                                  ? "password-error"
                                                  : void 0,
                                                disabled: e,
                                                ...I("password"),
                                              }),
                                            ],
                                          }),
                                          A.password &&
                                            (0, r.jsx)(N.j, {
                                              message: A.password.message,
                                              id: "password-error",
                                            }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, r.jsx)(v.$, {
                                    type: "submit",
                                    className: "w-full font-medium",
                                    disabled: e,
                                    children: e
                                      ? (0, r.jsxs)(r.Fragment, {
                                          children: [
                                            (0, r.jsx)(o.A, {
                                              className:
                                                "mr-2 h-4 w-4 animate-spin",
                                            }),
                                            "Loading...",
                                          ],
                                        })
                                      : (0, r.jsxs)(r.Fragment, {
                                          children: [
                                            "Sign In",
                                            (0, r.jsx)(c.A, {
                                              className: "ml-2 h-4 w-4",
                                            }),
                                          ],
                                        }),
                                  }),
                                ],
                              }),
                            }),
                          }),
                          (0, r.jsx)(b.wL, {
                            className:
                              "flex justify-center border-t bg-muted/30 p-4",
                            children: (0, r.jsxs)("p", {
                              className: "text-center text-sm",
                              children: [
                                "Don't have an account?",
                                " ",
                                (0, r.jsx)(x(), {
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
                    (0, r.jsxs)("p", {
                      className:
                        "text-muted-foreground text-center text-xs max-w-xs",
                      children: [
                        "By clicking Sign In, you agree to our",
                        " ",
                        (0, r.jsx)(x(), {
                          href: "/terms",
                          className:
                            "text-primary hover:underline underline-offset-4",
                          children: "Terms of Service",
                        }),
                        " ",
                        "and",
                        " ",
                        (0, r.jsx)(x(), {
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
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(56593)), (_N_E = e.O());
  },
]);
