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
    (e._sentryDebugIds[s] = "d1dad2bb-ce85-44aa-97e0-eb277c58f1fd"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-d1dad2bb-ce85-44aa-97e0-eb277c58f1fd"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7403],
  {
    48410: (e, s, d) => {
      Promise.resolve().then(d.bind(d, 84951));
    },
    84951: (e, s, d) => {
      "use strict";
      d.r(s), d.d(s, { default: () => t });
      var n = d(30602),
        a = d(41960);
      function t() {
        let e = (0, a.useParams)().locale || "en";
        return (0, n.jsxs)("div", {
          className: "p-4",
          children: [
            (0, n.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Visa Applications Page",
            }),
            (0, n.jsxs)("p", { children: ["Current Locale: ", e.toString()] }),
          ],
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 3209, 7358], () => s(48410)), (_N_E = e.O());
  },
]);
