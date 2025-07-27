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
    (e._sentryDebugIds[s] = "3ace1fa9-6599-4107-ae17-fb7dd11bd326"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3ace1fa9-6599-4107-ae17-fb7dd11bd326"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [3116],
  {
    34388: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => p });
      var d = a(30602),
        r = a(73974),
        l = a(22897),
        i = a(88542),
        n = a(39896),
        t = a(13868),
        o = a(84418),
        c = a(30311);
      function p(e) {
        let { params: s } = e,
          a = (0, r.useTranslations)("roadmap"),
          p = (0, n.p)(),
          f = (0, t.V8)(p),
          { user: m, isLoading: u } = (0, o.useAuth)(),
          { roadmapId: h } = s;
        return u
          ? (0, d.jsxs)("div", {
              className: "p-8 space-y-4",
              children: [
                (0, d.jsx)(i.E, { className: "h-8 w-1/4" }),
                (0, d.jsx)(i.E, { className: "h-4 w-1/2" }),
                (0, d.jsx)(i.E, { className: "h-64 w-full" }),
              ],
            })
          : m
            ? h
              ? (0, d.jsxs)("div", {
                  className: (0, c.cn)("p-4 md:p-6 lg:p-8", f ? "rtl" : "ltr"),
                  dir: f ? "rtl" : "ltr",
                  children: [
                    (0, d.jsxs)("div", {
                      className: "mb-6",
                      children: [
                        (0, d.jsx)("h1", {
                          className: "text-2xl md:text-3xl font-bold",
                          children: a("pageTitle"),
                        }),
                        (0, d.jsx)("p", {
                          className: "text-muted-foreground",
                          children: a("description"),
                        }),
                      ],
                    }),
                    (0, d.jsx)(l.A, { userId: m.id, roadmapId: h }),
                  ],
                })
              : (console.error(
                  "RoadmapPage: roadmapId is missing from URL params.",
                ),
                (0, d.jsx)("div", {
                  className: "p-8",
                  children: "Error: Roadmap ID not specified.",
                }))
            : (console.error("RoadmapPage: User is not authenticated."),
              (0, d.jsx)("div", {
                className: "p-8",
                children: "Access Denied: Please log in to view this page.",
              }));
      }
    },
    36215: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 34388));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(36215)), (_N_E = e.O());
  },
]);
