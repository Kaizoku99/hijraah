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
    (e._sentryDebugIds[s] = "8d6b0564-4545-431e-9e5d-09f8deeb787b"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-8d6b0564-4545-431e-9e5d-09f8deeb787b"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6915],
  {
    80187: (e, s, n) => {
      "use strict";
      n.r(s), n.d(s, { default: () => t });
      var d = n(30602),
        l = n(41960);
      function t() {
        let e = (0, l.useParams)().locale || "en";
        return (0, d.jsxs)("div", {
          className: "p-4",
          children: [
            (0, d.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Family Sponsorship Page",
            }),
            (0, d.jsxs)("p", { children: ["Current Locale: ", e.toString()] }),
          ],
        });
      }
    },
    96486: (e, s, n) => {
      Promise.resolve().then(n.bind(n, 80187));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 3209, 7358], () => s(96486)), (_N_E = e.O());
  },
]);
