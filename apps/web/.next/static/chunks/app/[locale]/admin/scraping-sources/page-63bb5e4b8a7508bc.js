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
    (e._sentryDebugIds[s] = "1115f49d-8aa3-4f61-b339-05846cb87a97"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-1115f49d-8aa3-4f61-b339-05846cb87a97"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5334],
  {
    59207: (e, s, n) => {
      Promise.resolve().then(n.bind(n, 90234));
    },
    90234: (e, s, n) => {
      "use strict";
      n.r(s), n.d(s, { default: () => i });
      var a = n(30602),
        d = n(41960),
        r = n(85218),
        t = n(42854);
      function i() {
        let e = (0, d.useParams)().locale || "en",
          { isAdmin: s, isLoading: n } = (0, t.h)();
        return ((0, r.useEffect)(() => {
          n || s || (0, d.redirect)("/".concat(e, "/dashboard"));
        }, [s, n, e]),
        n || !s)
          ? (0, a.jsx)("div", {
              className: "p-4",
              children: "Loading or checking admin status...",
            })
          : (0, a.jsxs)("div", {
              className: "p-4",
              children: [
                (0, a.jsx)("h1", {
                  className: "text-2xl font-bold",
                  children: "Admin: Scraping Sources Page",
                }),
                (0, a.jsxs)("p", {
                  children: ["Current Locale: ", e.toString()],
                }),
              ],
            });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(59207)), (_N_E = e.O());
  },
]);
