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
    (e._sentryDebugIds[s] = "6863d91b-2e5e-48ef-91c7-b9c3f6ce2dfc"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-6863d91b-2e5e-48ef-91c7-b9c3f6ce2dfc"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5015],
  {
    34961: (e, s, n) => {
      Promise.resolve().then(n.bind(n, 56211));
    },
    56211: (e, s, n) => {
      "use strict";
      n.r(s), n.d(s, { default: () => r });
      var d = n(30602),
        t = n(41960);
      function r() {
        let e = (0, t.useParams)().locale || "en";
        return (0, d.jsxs)("div", {
          className: "p-4",
          children: [
            (0, d.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Work Permits Page",
            }),
            (0, d.jsxs)("p", { children: ["Current Locale: ", e.toString()] }),
          ],
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 3209, 7358], () => s(34961)), (_N_E = e.O());
  },
]);
