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
    (e._sentryDebugIds[t] = "5df1f66b-aa4b-432e-9898-4a1dc52ea3b2"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-5df1f66b-aa4b-432e-9898-4a1dc52ea3b2"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [3067],
  {
    13671: (e, t, s) => {
      Promise.resolve().then(s.bind(s, 60587));
    },
    60587: (e, t, s) => {
      "use strict";
      s.r(t), s.d(t, { default: () => o });
      var i = s(30602),
        a = s(41960),
        l = s(85218),
        r = s(47482),
        n = s(14985),
        c = s(5271);
      function o() {
        let [e, t] = (0, l.useState)(!0),
          [s, o] = (0, l.useState)(!1),
          d = (0, a.useRouter)(),
          f = (0, a.useSearchParams)(),
          { toast: u } = (0, r.d)(),
          x = (0, n.UU)(),
          h = (0, l.useCallback)(async () => {
            try {
              let e = f.get("token"),
                t = f.get("type");
              if (!e || "email" !== t) throw Error("Invalid verification link");
              let { error: s } = await x.auth.verifyOtp({
                token_hash: e,
                type: "email",
              });
              if (s) throw s;
              o(!0),
                u({
                  title: "Success",
                  description: "Your email has been verified",
                });
            } catch (e) {
              u({
                variant: "destructive",
                title: "Error",
                description: "Failed to verify email",
              });
            } finally {
              t(!1);
            }
          }, [f, x.auth, u]);
        return ((0, l.useEffect)(() => {
          h();
        }, [h]),
        e)
          ? (0, i.jsx)("div", {
              className:
                "container flex h-screen w-screen flex-col items-center justify-center",
              children: (0, i.jsx)("div", {
                className:
                  "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",
                children: (0, i.jsxs)("div", {
                  className: "flex flex-col space-y-2 text-center",
                  children: [
                    (0, i.jsx)("h1", {
                      className: "text-2xl font-semibold tracking-tight",
                      children: "Verifying your email",
                    }),
                    (0, i.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children:
                        "Please wait while we verify your email address",
                    }),
                  ],
                }),
              }),
            })
          : (0, i.jsx)("div", {
              className:
                "container flex h-screen w-screen flex-col items-center justify-center",
              children: (0, i.jsxs)("div", {
                className:
                  "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",
                children: [
                  (0, i.jsxs)("div", {
                    className: "flex flex-col space-y-2 text-center",
                    children: [
                      (0, i.jsx)("h1", {
                        className: "text-2xl font-semibold tracking-tight",
                        children: s ? "Email verified" : "Verification failed",
                      }),
                      (0, i.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children: s
                          ? "You can now sign in to your account"
                          : "Please try again or contact support",
                      }),
                    ],
                  }),
                  (0, i.jsx)(c.$, {
                    onClick: () => d.push("/auth/login"),
                    className: "w-full",
                    children: "Go to Login",
                  }),
                ],
              }),
            });
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [6593, 4223, 3209, 7358], () => t(13671)), (_N_E = e.O());
  },
]);
