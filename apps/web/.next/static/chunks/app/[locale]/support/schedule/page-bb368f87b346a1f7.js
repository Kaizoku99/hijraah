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
    (e._sentryDebugIds[n] = "a58a7890-637f-4a45-ae01-c2748716a9e4"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-a58a7890-637f-4a45-ae01-c2748716a9e4"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4943],
  {
    9239: (e, n, s) => {
      "use strict";
      s.r(n), s.d(n, { default: () => l });
      var a = s(30602),
        t = s(41960);
      function l() {
        let e = (0, t.useParams)().locale || "en";
        return (0, a.jsxs)("div", {
          className: "p-4",
          children: [
            (0, a.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Schedule Consultation Page",
            }),
            (0, a.jsxs)("p", { children: ["Current Locale: ", e.toString()] }),
          ],
        });
      }
    },
    32350: (e, n, s) => {
      Promise.resolve().then(s.bind(s, 9239));
    },
  },
  (e) => {
    var n = (n) => e((e.s = n));
    e.O(0, [6593, 3209, 7358], () => n(32350)), (_N_E = e.O());
  },
]);
