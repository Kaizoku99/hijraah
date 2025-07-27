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
    (e._sentryDebugIds[n] = "9315bd31-838a-4d08-bb53-281e7e3935b8"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-9315bd31-838a-4d08-bb53-281e7e3935b8"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8322],
  {
    26651: (e, n, s) => {
      Promise.resolve().then(s.bind(s, 47106));
    },
    47106: (e, n, s) => {
      "use strict";
      s.r(n), s.d(n, { default: () => r });
      var d = s(30602),
        t = s(41960);
      function r() {
        let e = (0, t.useParams)().locale || "en";
        return (0, d.jsxs)("div", {
          className: "p-4",
          children: [
            (0, d.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Country Information Page",
            }),
            (0, d.jsxs)("p", { children: ["Current Locale: ", e.toString()] }),
          ],
        });
      }
    },
  },
  (e) => {
    var n = (n) => e((e.s = n));
    e.O(0, [6593, 3209, 7358], () => n(26651)), (_N_E = e.O());
  },
]);
