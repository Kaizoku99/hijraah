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
    (e._sentryDebugIds[n] = "c8a3976c-3f12-4cba-9266-eed8cf28e3d7"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-c8a3976c-3f12-4cba-9266-eed8cf28e3d7"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6398],
  {
    32022: (e, n, s) => {
      "use strict";
      s.r(n), s.d(n, { default: () => l });
      var d = s(30602),
        t = s(41960);
      function l() {
        let e = (0, t.useParams)().locale || "en";
        return (0, d.jsxs)("div", {
          className: "p-4",
          children: [
            (0, d.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Document Verification Page",
            }),
            (0, d.jsxs)("p", { children: ["Current Locale: ", e.toString()] }),
          ],
        });
      }
    },
    73341: (e, n, s) => {
      Promise.resolve().then(s.bind(s, 32022));
    },
  },
  (e) => {
    var n = (n) => e((e.s = n));
    e.O(0, [6593, 3209, 7358], () => n(73341)), (_N_E = e.O());
  },
]);
