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
    (e._sentryDebugIds[s] = "b64ee9bb-5e2c-4d93-a827-c5474dcf073a"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-b64ee9bb-5e2c-4d93-a827-c5474dcf073a"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9413],
  {
    7023: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 69285));
    },
    69285: (e, s, t) => {
      "use strict";
      t.r(s), t.d(s, { default: () => f });
      var l = t(30602),
        a = t(97687),
        n = t.n(a),
        r = t(85218),
        i = t(60070),
        d = t(47482),
        c = t(84418),
        o = t(5271),
        u = t(4401);
      function f() {
        let [e, s] = (0, r.useState)(""),
          [t, a] = (0, r.useState)(!1),
          { resetPassword: f } = (0, c.useAuth)(),
          { toast: m } = (0, d.d)(),
          h = async (s) => {
            s.preventDefault(), a(!0);
            try {
              await f(e),
                m({
                  title: "Check your email",
                  description: "We have sent you a password reset link",
                });
            } catch (e) {
              m({
                variant: "destructive",
                title: "Error",
                description: "Failed to send reset email",
              });
            } finally {
              a(!1);
            }
          };
        return (0, l.jsx)("div", {
          className:
            "container flex h-screen w-screen flex-col items-center justify-center",
          children: (0, l.jsxs)("div", {
            className:
              "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",
            children: [
              (0, l.jsxs)("div", {
                className: "flex flex-col space-y-2 text-center",
                children: [
                  (0, l.jsx)("h1", {
                    className: "text-2xl font-semibold tracking-tight",
                    children: "Reset your password",
                  }),
                  (0, l.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children:
                      "Enter your email address and we will send you a reset link",
                  }),
                ],
              }),
              (0, l.jsxs)("form", {
                onSubmit: h,
                className: "space-y-4",
                children: [
                  (0, l.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, l.jsx)(i.J, { htmlFor: "email", children: "Email" }),
                      (0, l.jsx)(u.p, {
                        id: "email",
                        type: "email",
                        placeholder: "m@example.com",
                        value: e,
                        onChange: (e) => s(e.target.value),
                        required: !0,
                      }),
                    ],
                  }),
                  (0, l.jsx)(o.$, {
                    type: "submit",
                    className: "w-full",
                    disabled: t,
                    children: t ? "Sending reset link..." : "Send Reset Link",
                  }),
                ],
              }),
              (0, l.jsx)("div", {
                className: "text-center text-sm",
                children: (0, l.jsx)(n(), {
                  href: "/auth/login",
                  className: "text-muted-foreground hover:text-primary",
                  children: "Back to login",
                }),
              }),
            ],
          }),
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(7023)), (_N_E = e.O());
  },
]);
