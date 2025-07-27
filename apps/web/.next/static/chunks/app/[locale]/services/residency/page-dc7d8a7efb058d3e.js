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
    (e._sentryDebugIds[s] = "a6f0139d-434b-418f-9bb8-c3f521bd91be"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-a6f0139d-434b-418f-9bb8-c3f521bd91be"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9777],
  {
    10348: (e, s, n) => {
      Promise.resolve().then(n.bind(n, 15369));
    },
    15369: (e, s, n) => {
      "use strict";
      n.r(s), n.d(s, { default: () => l });
      var d = n(30602),
        t = n(41960);
      function l() {
        let e = (0, t.useParams)().locale || "en";
        return (0, d.jsxs)("div", {
          className: "p-4",
          children: [
            (0, d.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Residency Page",
            }),
            (0, d.jsxs)("p", { children: ["Current Locale: ", e.toString()] }),
          ],
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 3209, 7358], () => s(10348)), (_N_E = e.O());
  },
]);
