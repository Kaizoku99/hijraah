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
    (e._sentryDebugIds[s] = "e11ef55f-96a4-43ea-bdf3-91c8410cfa7a"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-e11ef55f-96a4-43ea-bdf3-91c8410cfa7a"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8347],
  {
    46771: (e, s, d) => {
      "use strict";
      d.r(s), d.d(s, { default: () => f });
      var a = d(30602),
        l = d(13575),
        n = d(97687),
        t = d.n(n),
        i = d(85218);
      let c = () => (0, a.jsx)("div", {});
      var r = d(6530),
        m = d(5271);
      function u() {
        return (0, a.jsxs)("div", {
          className:
            "w-full max-w-4xl mx-auto bg-muted/20 rounded-lg p-8 animate-pulse",
          children: [
            (0, a.jsx)("div", {
              className: "h-8 w-64 bg-muted mb-4 rounded-md",
            }),
            (0, a.jsx)("div", {
              className: "h-4 w-96 bg-muted/70 mb-8 rounded-md",
            }),
            (0, a.jsxs)("div", {
              className: "space-y-6",
              children: [
                (0, a.jsx)("div", {
                  className: "h-10 w-full bg-muted rounded-md",
                }),
                (0, a.jsx)("div", {
                  className: "h-32 w-full bg-muted rounded-md",
                }),
                (0, a.jsx)("div", {
                  className: "h-20 w-full bg-muted rounded-md",
                }),
                (0, a.jsx)("div", {
                  className: "flex justify-end",
                  children: (0, a.jsx)("div", {
                    className: "h-10 w-32 bg-muted rounded-md",
                  }),
                }),
              ],
            }),
          ],
        });
      }
      function f() {
        return (0, a.jsxs)("div", {
          className: "container py-8",
          children: [
            (0, a.jsx)("div", {
              className: "flex items-center mb-6",
              children: (0, a.jsx)(t(), {
                href: "/documents",
                legacyBehavior: !0,
                children: (0, a.jsxs)(m.$, {
                  variant: "ghost",
                  size: "sm",
                  className: "flex items-center gap-1",
                  children: [
                    (0, a.jsx)(l.A, { className: "h-4 w-4" }),
                    "Back to Documents",
                  ],
                }),
              }),
            }),
            (0, a.jsx)("div", {
              className: "flex justify-between items-center mb-6",
              children: (0, a.jsx)("h1", {
                className: "text-3xl font-bold",
                children: "Create AI Document",
              }),
            }),
            (0, a.jsx)(r.k, {
              children: (0, a.jsx)(i.Suspense, {
                fallback: (0, a.jsx)(u, {}),
                children: (0, a.jsx)(c, {}),
              }),
            }),
          ],
        });
      }
    },
    95126: (e, s, d) => {
      Promise.resolve().then(d.bind(d, 46771));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(95126)), (_N_E = e.O());
  },
]);
