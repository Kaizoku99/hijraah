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
    (e._sentryDebugIds[n] = "2aeef527-a9aa-4e0c-a3a1-4f3b1e1020a2"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-2aeef527-a9aa-4e0c-a3a1-4f3b1e1020a2"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [3224],
  {
    42328: (e, n, s) => {
      "use strict";
      s.r(n), s.d(n, { default: () => c });
      var t = s(30602),
        l = s(97687),
        o = s.n(l),
        r = s(73974),
        a = s(15883);
      function c() {
        let e = "Page Not Found",
          n = "The page you are looking for does not exist.",
          s = "Back to Home";
        try {
          let l = (0, r.useTranslations)("errors");
          return (0, t.jsx)(a.O, {
            children: (0, t.jsxs)("div", {
              className:
                "flex flex-col items-center justify-center min-h-screen py-2",
              children: [
                (0, t.jsx)("h1", {
                  className: "text-4xl font-bold",
                  children: l("notFound", { fallback: e }),
                }),
                (0, t.jsx)("p", {
                  className: "mt-3 text-xl mb-6",
                  children: l("pageNotFound", { fallback: n }),
                }),
                (0, t.jsx)(o(), {
                  href: "/",
                  className:
                    "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                  legacyBehavior: !0,
                  children: l("backHome", { fallback: s }),
                }),
              ],
            }),
          });
        } catch (l) {
          return (
            console.error("Translation error in not-found page:", l),
            (0, t.jsx)(a.O, {
              children: (0, t.jsxs)("div", {
                className:
                  "flex flex-col items-center justify-center min-h-screen py-2",
                children: [
                  (0, t.jsx)("h1", {
                    className: "text-4xl font-bold",
                    children: e,
                  }),
                  (0, t.jsx)("p", {
                    className: "mt-3 text-xl mb-6",
                    children: n,
                  }),
                  (0, t.jsx)(o(), {
                    href: "/",
                    className:
                      "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    legacyBehavior: !0,
                    children: s,
                  }),
                ],
              }),
            })
          );
        }
      }
    },
    50703: (e, n, s) => {
      Promise.resolve().then(s.bind(s, 42328));
    },
  },
  (e) => {
    var n = (n) => e((e.s = n));
    e.O(0, [6593, 4223, 3209, 7358], () => n(50703)), (_N_E = e.O());
  },
]);
