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
    (e._sentryDebugIds[s] = "75e98b0b-1f9b-4bb8-927a-52a17e61bb43"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-75e98b0b-1f9b-4bb8-927a-52a17e61bb43"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [1845],
  {
    19185: (e, s, i) => {
      "use strict";
      i.r(s), i.d(s, { default: () => h });
      var a = i(30602),
        t = i(61053),
        r = i(71188),
        n = i(59834),
        l = i(41960),
        c = i(85218),
        o = i(36839),
        u = i(84418),
        d = i(14985),
        f = i(5271),
        m = i(77413);
      function h() {
        let { user: e } = (0, u.useAuth)(),
          s = (0, l.useRouter)(),
          [i, h] = c.useState(!1),
          [x, b] = c.useState(60),
          [y, j] = c.useState(60),
          g = c.useRef(null);
        c.useEffect(() => {
          if (x > 0) {
            let e = setTimeout(() => b(x - 1), 1e3);
            return () => clearTimeout(e);
          }
        }, [x]),
          c.useEffect(() => {
            if (y > 0) {
              let e = setTimeout(() => j(y - 1), 1e3);
              return () => clearTimeout(e);
            }
          }, [y]),
          c.useEffect(() => {
            0 === y && !i && g.current && g.current.focus();
          }, [y, i]),
          c.useEffect(() => {
            let e = async () => {
              try {
                let e = await (0, d.AG)(),
                  {
                    data: { user: i },
                    error: a,
                  } = await e.auth.getUser();
                if (a) throw a;
                (null == i ? void 0 : i.email_confirmed_at) &&
                  (o.oR.success("Email verified successfully!"),
                  s.push("/dashboard"));
              } catch (e) {
                console.error("Error checking verification:", e),
                  o.oR.error(
                    "Failed to check email verification status. Please check your internet connection.",
                  );
              }
            };
            0 === x && (e(), b(60));
          }, [x, s]);
        let p = async () => {
          try {
            if (!(null == e ? void 0 : e.email))
              return void o.oR.error("Email address not found");
            h(!0);
            let s = await (0, d.AG)(),
              { error: i } = await s.auth.resend({
                type: "signup",
                email: e.email,
              });
            if (i) throw i;
            o.oR.success("Verification email resent successfully"),
              j(60),
              b(60);
          } catch (e) {
            console.error("Error resending verification:", e),
              o.oR.error("Failed to resend verification email"),
              j(30);
          } finally {
            h(!1);
          }
        };
        return (0, a.jsx)("div", {
          className:
            "container flex items-center justify-center min-h-[calc(100vh-4rem)]",
          children: (0, a.jsxs)(m.Zp, {
            className: "w-full max-w-md",
            children: [
              (0, a.jsxs)(m.aR, {
                children: [
                  (0, a.jsxs)(m.ZB, {
                    className: "flex items-center gap-2",
                    children: [
                      (0, a.jsx)(t.A, { className: "h-5 w-5" }),
                      "Verify Your Email",
                    ],
                  }),
                  (0, a.jsx)(m.BT, {
                    children: (null == e ? void 0 : e.email)
                      ? (0, a.jsxs)(a.Fragment, {
                          children: [
                            "We've sent a verification email to",
                            " ",
                            (0, a.jsx)("span", {
                              className: "font-medium",
                              children: e.email,
                            }),
                          ],
                        })
                      : "Please check your email for verification instructions",
                  }),
                ],
              }),
              (0, a.jsxs)(m.Wu, {
                className: "space-y-4",
                children: [
                  (0, a.jsxs)("div", {
                    className: "text-sm text-muted-foreground",
                    children: [
                      (0, a.jsx)("p", {
                        children:
                          "Please check your email and click the verification link to continue.",
                      }),
                      (0, a.jsxs)("p", {
                        className: "mt-2",
                        children: [
                          "The page will automatically refresh in",
                          " ",
                          (0, a.jsx)("span", {
                            className: "font-medium",
                            children: x,
                          }),
                          " ",
                          "seconds.",
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "flex items-center justify-center",
                    children:
                      0 === x &&
                      (0, a.jsx)(r.A, {
                        className: "h-8 w-8 animate-spin text-primary",
                      }),
                  }),
                ],
              }),
              (0, a.jsxs)(m.wL, {
                className: "flex flex-col gap-4",
                children: [
                  (0, a.jsx)(f.$, {
                    ref: g,
                    variant: "outline",
                    className: "w-full",
                    onClick: p,
                    disabled: i || y > 0,
                    children: i
                      ? (0, a.jsxs)(a.Fragment, {
                          children: [
                            (0, a.jsx)(r.A, {
                              className: "mr-2 h-4 w-4 animate-spin",
                            }),
                            "Resending...",
                          ],
                        })
                      : (0, a.jsxs)(a.Fragment, {
                          children: [
                            (0, a.jsx)(n.A, { className: "mr-2 h-4 w-4" }),
                            "Resend Verification Email",
                            y > 0 && " (".concat(y, "s)"),
                          ],
                        }),
                  }),
                  (0, a.jsx)("div", {
                    className: "text-center text-sm",
                    children: (0, a.jsx)(f.$, {
                      variant: "link",
                      className: "text-muted-foreground",
                      onClick: () => s.push("/auth/login"),
                      children: "Back to Sign In",
                    }),
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
    52324: (e, s, i) => {
      Promise.resolve().then(i.bind(i, 19185));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(52324)), (_N_E = e.O());
  },
]);
