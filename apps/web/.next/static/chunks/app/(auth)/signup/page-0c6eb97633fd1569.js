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
    (e._sentryDebugIds[t] = "c2186ac6-778b-4f89-8779-53bd77180670"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-c2186ac6-778b-4f89-8779-53bd77180670"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2271],
  {
    3559: (e, t, s) => {
      "use strict";
      s.r(t), s.d(t, { default: () => h });
      var a = s(30602),
        i = s(2960),
        l = s(85989),
        r = s(41960),
        c = s(85218),
        n = s(5271),
        d = s(4401),
        o = s(60070),
        u = s(47482);
      function h() {
        let [e, t] = (0, c.useState)(""),
          [s, h] = (0, c.useState)(""),
          [m, p] = (0, c.useState)(!1),
          x = (0, r.useRouter)(),
          { toast: f } = (0, u.d)(),
          g = (0, i.createBrowserClient)(
            "http://localhost:54321",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          ),
          b = async (t) => {
            t.preventDefault(), p(!0);
            try {
              let { error: t } = await g.auth.signUp({
                email: e,
                password: s,
                options: {
                  emailRedirectTo: "".concat(location.origin, "/auth/callback"),
                },
              });
              if (t) throw t;
              f({
                title: "Success",
                description: "Please check your email to confirm your account.",
              }),
                x.push("/login");
            } catch (e) {
              f({
                title: "Error",
                description: e.message,
                variant: "destructive",
              });
            } finally {
              p(!1);
            }
          },
          y = async () => {
            try {
              let { error: e } = await g.auth.signInWithOAuth({
                provider: "google",
                options: {
                  redirectTo: "".concat(location.origin, "/auth/callback"),
                },
              });
              if (e) throw e;
            } catch (e) {
              f({
                title: "Error",
                description: e.message,
                variant: "destructive",
              });
            }
          };
        return (0, a.jsx)("div", {
          className:
            "flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8",
          children: (0, a.jsxs)("div", {
            className: "w-full max-w-md space-y-8",
            children: [
              (0, a.jsxs)("div", {
                className: "text-center",
                children: [
                  (0, a.jsx)("h2", {
                    className: "text-3xl font-bold tracking-tight",
                    children: "Create an account",
                  }),
                  (0, a.jsx)("p", {
                    className: "mt-2 text-sm text-muted-foreground",
                    children: "Sign up to get started with Hijraah",
                  }),
                ],
              }),
              (0, a.jsxs)("form", {
                onSubmit: b,
                className: "mt-8 space-y-6",
                children: [
                  (0, a.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                      (0, a.jsxs)("div", {
                        children: [
                          (0, a.jsx)(o.J, {
                            htmlFor: "email",
                            children: "Email address",
                          }),
                          (0, a.jsx)(d.p, {
                            id: "email",
                            type: "email",
                            value: e,
                            onChange: (e) => t(e.target.value),
                            required: !0,
                            className: "mt-1",
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        children: [
                          (0, a.jsx)(o.J, {
                            htmlFor: "password",
                            children: "Password",
                          }),
                          (0, a.jsx)(d.p, {
                            id: "password",
                            type: "password",
                            value: s,
                            onChange: (e) => h(e.target.value),
                            required: !0,
                            className: "mt-1",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsx)(n.$, {
                    type: "submit",
                    className: "w-full",
                    disabled: m,
                    children: m ? "Creating account..." : "Create account",
                  }),
                ],
              }),
              (0, a.jsxs)("div", {
                className: "relative my-4",
                children: [
                  (0, a.jsx)("div", {
                    className: "absolute inset-0 flex items-center",
                    children: (0, a.jsx)("div", {
                      className: "w-full border-t",
                    }),
                  }),
                  (0, a.jsx)("div", {
                    className: "relative flex justify-center text-sm",
                    children: (0, a.jsx)("span", {
                      className: "bg-background px-2 text-muted-foreground",
                      children: "Or continue with",
                    }),
                  }),
                ],
              }),
              (0, a.jsxs)(n.$, {
                type: "button",
                variant: "outline",
                className: "w-full",
                onClick: y,
                children: [
                  (0, a.jsx)(l.A, { className: "mr-2 h-4 w-4" }),
                  " Google",
                ],
              }),
            ],
          }),
        });
      }
    },
    58377: (e, t, s) => {
      Promise.resolve().then(s.bind(s, 3559));
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [6593, 4223, 3209, 7358], () => t(58377)), (_N_E = e.O());
  },
]);
