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
    n = new e.Error().stack;
  n &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[n] = "a77d5397-e37b-4d6a-aec7-2eb0255f6188"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-a77d5397-e37b-4d6a-aec7-2eb0255f6188"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4219],
  {
    54495: (e, n, r) => {
      "use strict";
      r.r(n), r.d(n, { default: () => c });
      var s = r(30602),
        l = r(70015),
        t = r(85218),
        d = r(5271);
      function c(e) {
        let { error: n, reset: r } = e;
        return (
          (0, t.useEffect)(() => {
            console.error("Global error occurred:", n), l.Cp(n);
          }, [n]),
          (0, s.jsx)("html", {
            children: (0, s.jsx)("body", {
              children: (0, s.jsxs)("div", {
                className:
                  "flex min-h-screen flex-col items-center justify-center p-4 text-center",
                children: [
                  (0, s.jsx)("h1", {
                    className: "text-4xl font-bold mb-4",
                    children: "Something went wrong!",
                  }),
                  (0, s.jsx)("p", {
                    className: "text-xl mb-8",
                    children: n.message || "An unexpected error occurred",
                  }),
                  (0, s.jsxs)("div", {
                    className: "space-x-4",
                    children: [
                      (0, s.jsx)(d.$, {
                        onClick: () => r(),
                        children: "Try again",
                      }),
                      (0, s.jsx)(d.$, {
                        variant: "outline",
                        onClick: () => (window.location.href = "/"),
                        children: "Go home",
                      }),
                    ],
                  }),
                  !1,
                ],
              }),
            }),
          })
        );
      }
    },
    61015: (e, n, r) => {
      Promise.resolve().then(r.bind(r, 54495));
    },
  },
  (e) => {
    var n = (n) => e((e.s = n));
    e.O(0, [4223, 6593, 3209, 7358], () => n(61015)), (_N_E = e.O());
  },
]);
