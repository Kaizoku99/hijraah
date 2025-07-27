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
    (e._sentryDebugIds[s] = "b0958b3a-4377-4732-8d7b-e3eede80e7aa"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-b0958b3a-4377-4732-8d7b-e3eede80e7aa"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [1315],
  {
    14915: (e, s, n) => {
      "use strict";
      n.r(s), n.d(s, { default: () => a });
      var d = n(30602),
        t = n(41960);
      function a() {
        let e = (0, t.useParams)().locale || "en";
        return (0, d.jsxs)("div", {
          className: "p-4",
          children: [
            (0, d.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Immigration News Page",
            }),
            (0, d.jsxs)("p", { children: ["Current Locale: ", e.toString()] }),
          ],
        });
      }
    },
    33882: (e, s, n) => {
      Promise.resolve().then(n.bind(n, 14915));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 3209, 7358], () => s(33882)), (_N_E = e.O());
  },
]);
