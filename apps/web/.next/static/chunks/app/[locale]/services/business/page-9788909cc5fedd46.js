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
    (e._sentryDebugIds[s] = "3bb99957-a260-454c-92c9-6c069ce8fa7b"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3bb99957-a260-454c-92c9-6c069ce8fa7b"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [1517],
  {
    18504: (e, s, n) => {
      Promise.resolve().then(n.bind(n, 34125));
    },
    34125: (e, s, n) => {
      "use strict";
      n.r(s), n.d(s, { default: () => r });
      var t = n(30602),
        l = n(41960);
      function r() {
        let e = (0, l.useParams)().locale || "en";
        return (0, t.jsxs)("div", {
          className: "p-4",
          children: [
            (0, t.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Business Immigration Page",
            }),
            (0, t.jsxs)("p", { children: ["Current Locale: ", e.toString()] }),
          ],
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 3209, 7358], () => s(18504)), (_N_E = e.O());
  },
]);
