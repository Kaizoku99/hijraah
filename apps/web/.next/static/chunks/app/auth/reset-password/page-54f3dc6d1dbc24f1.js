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
    (e._sentryDebugIds[s] = "0b9aff0c-2480-4b28-af2c-1809b42e3a0f"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-0b9aff0c-2480-4b28-af2c-1809b42e3a0f"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6470],
  {
    21441: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 61945));
    },
    61945: (e, s, t) => {
      "use strict";
      t.r(s), t.d(s, { default: () => u });
      var r = t(30602),
        a = t(41960),
        d = t(85218),
        l = t(60070),
        n = t(47482),
        i = t(14985),
        o = t(5271),
        c = t(4401);
      function u() {
        let [e, s] = (0, d.useState)(""),
          [t, u] = (0, d.useState)(""),
          [f, p] = (0, d.useState)(!1),
          h = (0, a.useRouter)(),
          { toast: w } = (0, n.d)(),
          x = (0, i.AG)(),
          y = async (s) => {
            if ((s.preventDefault(), p(!0), e !== t)) {
              w({
                variant: "destructive",
                title: "Error",
                description: "Passwords do not match",
              }),
                p(!1);
              return;
            }
            try {
              let { error: s } = await x.auth.updateUser({ password: e });
              if (s) throw s;
              w({
                title: "Success",
                description: "Your password has been reset successfully",
              }),
                h.push("/auth/login");
            } catch (e) {
              w({
                variant: "destructive",
                title: "Error",
                description: "Failed to reset password",
              });
            } finally {
              p(!1);
            }
          };
        return (0, r.jsx)("div", {
          className:
            "container flex h-screen w-screen flex-col items-center justify-center",
          children: (0, r.jsxs)("div", {
            className:
              "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",
            children: [
              (0, r.jsxs)("div", {
                className: "flex flex-col space-y-2 text-center",
                children: [
                  (0, r.jsx)("h1", {
                    className: "text-2xl font-semibold tracking-tight",
                    children: "Reset your password",
                  }),
                  (0, r.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children: "Enter your new password below",
                  }),
                ],
              }),
              (0, r.jsxs)("form", {
                onSubmit: y,
                className: "space-y-4",
                children: [
                  (0, r.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, r.jsx)(l.J, {
                        htmlFor: "password",
                        children: "New Password",
                      }),
                      (0, r.jsx)(c.p, {
                        id: "password",
                        type: "password",
                        value: e,
                        onChange: (e) => s(e.target.value),
                        required: !0,
                      }),
                    ],
                  }),
                  (0, r.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, r.jsx)(l.J, {
                        htmlFor: "confirmPassword",
                        children: "Confirm Password",
                      }),
                      (0, r.jsx)(c.p, {
                        id: "confirmPassword",
                        type: "password",
                        value: t,
                        onChange: (e) => u(e.target.value),
                        required: !0,
                      }),
                    ],
                  }),
                  (0, r.jsx)(o.$, {
                    type: "submit",
                    className: "w-full",
                    disabled: f,
                    children: f ? "Resetting password..." : "Reset Password",
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(21441)), (_N_E = e.O());
  },
]);
