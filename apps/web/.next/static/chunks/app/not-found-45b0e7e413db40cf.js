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
    (e._sentryDebugIds[t] = "67cca7bb-d201-4938-ac5c-37401ae20edf"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-67cca7bb-d201-4938-ac5c-37401ae20edf"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4345],
  {
    63609: (e, t, s) => {
      "use strict";
      s.r(t), s.d(t, { default: () => a });
      var n = s(30602),
        d = s(41960),
        c = s(85218),
        l = s(13868);
      function a() {
        let e = (0, d.useRouter)();
        return (
          (0, c.useEffect)(() => {
            e.replace("/".concat(l.q));
          }, [e]),
          (0, n.jsxs)("div", {
            className:
              "flex flex-col items-center justify-center min-h-screen py-2",
            children: [
              (0, n.jsx)("h1", {
                className: "text-4xl font-bold",
                children: "Page Not Found",
              }),
              (0, n.jsx)("p", {
                className: "mt-3 text-xl",
                children: "Redirecting to home page...",
              }),
            ],
          })
        );
      }
    },
    93833: (e, t, s) => {
      Promise.resolve().then(s.bind(s, 63609));
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [6593, 4223, 3209, 7358], () => t(93833)), (_N_E = e.O());
  },
]);
