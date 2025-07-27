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
    (e._sentryDebugIds[n] = "3c63e4ed-d671-4420-a4c5-ad224a008c4e"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3c63e4ed-d671-4420-a4c5-ad224a008c4e"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8039],
  {
    13011: (e, n, s) => {
      "use strict";
      s.r(n), s.d(n, { default: () => a });
      var d = s(30602),
        t = s(85218),
        r = s(5271);
      function a(e) {
        let { error: n, reset: s } = e;
        return (
          (0, t.useEffect)(() => {
            console.error(n);
          }, [n]),
          (0, d.jsx)("div", {
            className: "flex h-screen",
            children: (0, d.jsxs)("div", {
              className: "m-auto text-center space-y-4",
              children: [
                (0, d.jsx)("h2", {
                  className: "text-2xl font-bold",
                  children: "Something went wrong!",
                }),
                (0, d.jsx)("p", {
                  className: "text-muted-foreground",
                  children: n.message,
                }),
                (0, d.jsx)(r.$, {
                  onClick: () => s(),
                  variant: "outline",
                  children: "Try again",
                }),
              ],
            }),
          })
        );
      }
    },
    44003: (e, n, s) => {
      Promise.resolve().then(s.bind(s, 13011));
    },
  },
  (e) => {
    var n = (n) => e((e.s = n));
    e.O(0, [4223, 6593, 3209, 7358], () => n(44003)), (_N_E = e.O());
  },
]);
