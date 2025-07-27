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
    (e._sentryDebugIds[s] = "3b8f7951-3ef8-4b1a-b82f-2662d6b40720"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3b8f7951-3ef8-4b1a-b82f-2662d6b40720"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [768],
  {
    6630: (e, s, a) => {
      "use strict";
      a.d(s, { RegisterForm: () => b });
      var r = a(30602),
        t = a(26515),
        n = a(71188),
        l = a(41960),
        i = a(85218),
        c = a(72508),
        o = a(36839),
        d = a(17967),
        m = a(84418),
        u = a(5271);
      function h(e) {
        let { view: s } = e;
        (0, l.useRouter)();
        let { signIn: a } = (0, m.useAuth)(),
          [t, c] = i.useState(null),
          d = async (e) => {
            try {
              c(e),
                await a(e, {
                  redirectTo: "".concat(
                    window.location.origin,
                    "/auth/callback",
                  ),
                });
            } catch (s) {
              console.error("Error signing in with ".concat(e, ":"), s),
                o.oR.error("Failed to sign in with ".concat(e)),
                c(null);
            }
          };
        return (0, r.jsxs)("div", {
          className: "grid gap-2",
          children: [
            (0, r.jsx)(u.$, {
              variant: "outline",
              className: "w-full",
              onClick: () => d("google"),
              disabled: null !== t,
              children:
                "google" === t
                  ? (0, r.jsxs)(r.Fragment, {
                      children: [
                        (0, r.jsx)(n.A, {
                          className: "mr-2 h-4 w-4 animate-spin",
                        }),
                        "Connecting...",
                      ],
                    })
                  : (0, r.jsxs)(r.Fragment, {
                      children: [
                        (0, r.jsxs)("svg", {
                          className: "mr-2 h-4 w-4",
                          viewBox: "0 0 24 24",
                          children: [
                            (0, r.jsx)("path", {
                              d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                              fill: "#4285F4",
                            }),
                            (0, r.jsx)("path", {
                              d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                              fill: "#34A853",
                            }),
                            (0, r.jsx)("path", {
                              d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                              fill: "#FBBC05",
                            }),
                            (0, r.jsx)("path", {
                              d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                              fill: "#EA4335",
                            }),
                          ],
                        }),
                        "Continue with Google",
                      ],
                    }),
            }),
            (0, r.jsxs)("div", {
              className: "relative",
              children: [
                (0, r.jsx)("div", {
                  className: "absolute inset-0 flex items-center",
                  children: (0, r.jsx)("span", {
                    className: "w-full border-t",
                  }),
                }),
                (0, r.jsx)("div", {
                  className: "relative flex justify-center text-xs uppercase",
                  children: (0, r.jsx)("span", {
                    className: "bg-background px-2 text-muted-foreground",
                    children: "Or continue with",
                  }),
                }),
              ],
            }),
          ],
        });
      }
      var x = a(31538),
        j = a(14985),
        p = a(77413),
        f = a(16873),
        w = a(4401);
      let g = d
        .Ik({
          email: d.Yj().email("Invalid email address"),
          password: d
            .Yj()
            .min(8, "Password must be at least 8 characters")
            .regex(
              /[A-Z]/,
              "Password must contain at least one uppercase letter",
            )
            .regex(
              /[a-z]/,
              "Password must contain at least one lowercase letter",
            )
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(
              /[^A-Za-z0-9]/,
              "Password must contain at least one special character",
            ),
          confirmPassword: d.Yj(),
          firstName: d.Yj().min(2, "First name must be at least 2 characters"),
          lastName: d.Yj().min(2, "Last name must be at least 2 characters"),
        })
        .refine((e) => e.password === e.confirmPassword, {
          message: "Passwords don't match",
          path: ["confirmPassword"],
        });
      function b() {
        let e = (0, l.useRouter)();
        (0, l.useSearchParams)();
        let [s, a] = i.useState(!1),
          [d, m] = i.useState(""),
          b = (0, c.mN)({
            resolver: (0, t.u)(g),
            defaultValues: {
              email: "",
              password: "",
              confirmPassword: "",
              firstName: "",
              lastName: "",
            },
          }),
          N = async (s) => {
            try {
              a(!0);
              let r = (0, j.UU)(),
                { data: t, error: n } = await r.auth.signUp({
                  email: s.email,
                  password: s.password,
                  options: {
                    emailRedirectTo: "".concat(
                      window.location.origin,
                      "/auth/callback",
                    ),
                    data: {
                      first_name: s.firstName,
                      last_name: s.lastName,
                      full_name: "".concat(s.firstName, " ").concat(s.lastName),
                    },
                  },
                });
              if (n) throw n;
              t.user
                ? e.push("/auth/verify-email")
                : o.oR.error(
                    "Registration completed, but user data is missing. Please try logging in.",
                  );
            } catch (e) {
              console.error("Registration error:", e),
                o.oR.error(
                  e.message ||
                    "An unexpected error occurred during registration.",
                );
            } finally {
              a(!1);
            }
          };
        return (0, r.jsxs)(p.Zp, {
          className: "w-full max-w-md",
          children: [
            (0, r.jsxs)(p.aR, {
              children: [
                (0, r.jsx)(p.ZB, { children: "Create Account" }),
                (0, r.jsx)(p.BT, {
                  children: "Enter your details to create a new account",
                }),
              ],
            }),
            (0, r.jsxs)(p.Wu, {
              className: "space-y-6",
              children: [
                (0, r.jsx)(h, { view: "sign-up" }),
                (0, r.jsx)(f.lV, {
                  ...b,
                  children: (0, r.jsxs)("form", {
                    onSubmit: b.handleSubmit(N),
                    className: "space-y-4",
                    children: [
                      (0, r.jsxs)("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                          (0, r.jsx)(f.zB, {
                            control: b.control,
                            name: "firstName",
                            render: (e) => {
                              let { field: a } = e;
                              return (0, r.jsxs)(f.eI, {
                                children: [
                                  (0, r.jsx)(f.lR, { children: "First Name" }),
                                  (0, r.jsx)(f.MJ, {
                                    children: (0, r.jsx)(w.p, {
                                      placeholder: "Enter your first name",
                                      disabled: s,
                                      ...a,
                                    }),
                                  }),
                                  (0, r.jsx)(f.C5, {}),
                                ],
                              });
                            },
                          }),
                          (0, r.jsx)(f.zB, {
                            control: b.control,
                            name: "lastName",
                            render: (e) => {
                              let { field: a } = e;
                              return (0, r.jsxs)(f.eI, {
                                children: [
                                  (0, r.jsx)(f.lR, { children: "Last Name" }),
                                  (0, r.jsx)(f.MJ, {
                                    children: (0, r.jsx)(w.p, {
                                      placeholder: "Enter your last name",
                                      disabled: s,
                                      ...a,
                                    }),
                                  }),
                                  (0, r.jsx)(f.C5, {}),
                                ],
                              });
                            },
                          }),
                        ],
                      }),
                      (0, r.jsx)(f.zB, {
                        control: b.control,
                        name: "email",
                        render: (e) => {
                          let { field: a } = e;
                          return (0, r.jsxs)(f.eI, {
                            children: [
                              (0, r.jsx)(f.lR, { children: "Email" }),
                              (0, r.jsx)(f.MJ, {
                                children: (0, r.jsx)(w.p, {
                                  type: "email",
                                  placeholder: "Enter your email",
                                  disabled: s,
                                  ...a,
                                }),
                              }),
                              (0, r.jsx)(f.C5, {}),
                            ],
                          });
                        },
                      }),
                      (0, r.jsx)(f.zB, {
                        control: b.control,
                        name: "password",
                        render: (e) => {
                          let { field: a } = e;
                          return (0, r.jsxs)(f.eI, {
                            children: [
                              (0, r.jsx)(f.lR, { children: "Password" }),
                              (0, r.jsx)(f.MJ, {
                                children: (0, r.jsx)(w.p, {
                                  type: "password",
                                  placeholder: "Create a password",
                                  disabled: s,
                                  ...a,
                                  onChange: (e) => {
                                    a.onChange(e), m(e.target.value);
                                  },
                                }),
                              }),
                              (0, r.jsx)(f.C5, {}),
                            ],
                          });
                        },
                      }),
                      (0, r.jsx)(x.M, { password: d }),
                      (0, r.jsx)(f.zB, {
                        control: b.control,
                        name: "confirmPassword",
                        render: (e) => {
                          let { field: a } = e;
                          return (0, r.jsxs)(f.eI, {
                            children: [
                              (0, r.jsx)(f.lR, {
                                children: "Confirm Password",
                              }),
                              (0, r.jsx)(f.MJ, {
                                children: (0, r.jsx)(w.p, {
                                  type: "password",
                                  placeholder: "Confirm your password",
                                  disabled: s,
                                  ...a,
                                }),
                              }),
                              (0, r.jsx)(f.C5, {}),
                            ],
                          });
                        },
                      }),
                      (0, r.jsx)(u.$, {
                        type: "submit",
                        className: "w-full",
                        disabled: s,
                        children: s
                          ? (0, r.jsxs)(r.Fragment, {
                              children: [
                                (0, r.jsx)(n.A, {
                                  className: "mr-2 h-4 w-4 animate-spin",
                                }),
                                "Creating account...",
                              ],
                            })
                          : "Create Account",
                      }),
                    ],
                  }),
                }),
              ],
            }),
            (0, r.jsx)(p.wL, {
              className: "flex justify-center",
              children: (0, r.jsxs)("div", {
                className: "text-center text-sm",
                children: [
                  "Already have an account?",
                  " ",
                  (0, r.jsx)(u.$, {
                    variant: "link",
                    className: "px-2",
                    onClick: () => e.push("/auth/login"),
                    children: "Sign in",
                  }),
                ],
              }),
            }),
          ],
        });
      }
    },
    17311: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 6630));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(17311)), (_N_E = e.O());
  },
]);
