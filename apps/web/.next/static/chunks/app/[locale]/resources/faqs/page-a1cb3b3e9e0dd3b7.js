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
    (e._sentryDebugIds[s] = "03042915-e4f2-4c41-bcd8-d84e6f5d96fa"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-03042915-e4f2-4c41-bcd8-d84e6f5d96fa"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [3433],
  {
    12212: (e, s, d) => {
      Promise.resolve().then(d.bind(d, 45773));
    },
    45773: (e, s, d) => {
      "use strict";
      d.r(s), d.d(s, { default: () => l });
      var n = d(30602),
        t = d(41960);
      function l() {
        let e = (0, t.useParams)().locale || "en";
        return (0, n.jsxs)("div", {
          className: "p-4",
          children: [
            (0, n.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "FAQs Page",
            }),
            (0, n.jsxs)("p", { children: ["Current Locale: ", e.toString()] }),
          ],
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 3209, 7358], () => s(12212)), (_N_E = e.O());
  },
]);
