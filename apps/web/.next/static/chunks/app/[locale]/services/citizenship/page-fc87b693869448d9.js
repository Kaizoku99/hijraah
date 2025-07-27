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
    (e._sentryDebugIds[s] = "3fae1483-1589-486a-aba5-33f4fb7e814f"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3fae1483-1589-486a-aba5-33f4fb7e814f"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2827],
  {
    46603: (e, s, n) => {
      "use strict";
      n.r(s), n.d(s, { default: () => l });
      var a = n(30602),
        t = n(41960);
      function l() {
        let e = (0, t.useParams)().locale || "en";
        return (0, a.jsxs)("div", {
          className: "p-4",
          children: [
            (0, a.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Citizenship Page",
            }),
            (0, a.jsxs)("p", { children: ["Current Locale: ", e.toString()] }),
          ],
        });
      }
    },
    52054: (e, s, n) => {
      Promise.resolve().then(n.bind(n, 46603));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 3209, 7358], () => s(52054)), (_N_E = e.O());
  },
]);
