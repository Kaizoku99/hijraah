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
    (e._sentryDebugIds[s] = "2cf821c6-c406-4d85-88b5-fde64aceda70"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-2cf821c6-c406-4d85-88b5-fde64aceda70"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [670],
  {
    43706: (e, s, d) => {
      "use strict";
      d.r(s), d.d(s, { default: () => t });
      var n = d(30602),
        l = d(41960);
      function t() {
        let e = (0, l.useParams)().locale || "en";
        return (0, n.jsxs)("div", {
          className: "p-4",
          children: [
            (0, n.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Knowledge Base Page",
            }),
            (0, n.jsxs)("p", { children: ["Current Locale: ", e.toString()] }),
          ],
        });
      }
    },
    75203: (e, s, d) => {
      Promise.resolve().then(d.bind(d, 43706));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 3209, 7358], () => s(75203)), (_N_E = e.O());
  },
]);
