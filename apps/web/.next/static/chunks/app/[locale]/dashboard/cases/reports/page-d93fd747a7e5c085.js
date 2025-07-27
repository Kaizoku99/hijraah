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
    (e._sentryDebugIds[s] = "26fbfced-33ba-4415-a0ce-73474ff360b6"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-26fbfced-33ba-4415-a0ce-73474ff360b6"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9176],
  {
    61342: (e, s, n) => {
      Promise.resolve().then(n.bind(n, 64708));
    },
    64708: (e, s, n) => {
      "use strict";
      n.r(s), n.d(s, { default: () => l });
      var t = n(30602),
        d = n(41960);
      function l() {
        let e = (0, d.useParams)().locale || "en";
        return (0, t.jsxs)("div", {
          className: "p-4",
          children: [
            (0, t.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Case Reports Page",
            }),
            (0, t.jsxs)("p", { children: ["Current Locale: ", e.toString()] }),
          ],
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 3209, 7358], () => s(61342)), (_N_E = e.O());
  },
]);
