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
    (e._sentryDebugIds[s] = "9090500a-52db-4535-a74a-9781166f43c1"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-9090500a-52db-4535-a74a-9781166f43c1"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [3790],
  {
    39113: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => b });
      var r = a(30602),
        l = a(1510),
        n = a(72170),
        d = a(74583),
        c = a(78155),
        t = a(40972),
        i = a(97687),
        o = a.n(i),
        m = a(85218);
      let h = () => (0, r.jsx)("div", {});
      var u = a(6530),
        x = a(5271),
        j = a(88542),
        g = a(86697);
      function f() {
        return (0, r.jsxs)("div", {
          className: "space-y-4",
          children: [
            (0, r.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [
                (0, r.jsx)(j.E, { className: "h-8 w-48" }),
                (0, r.jsx)(j.E, { className: "h-10 w-32" }),
              ],
            }),
            (0, r.jsx)(j.E, { className: "h-12 w-full" }),
            (0, r.jsx)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
              children: Array(6)
                .fill(0)
                .map((e, s) =>
                  (0, r.jsx)(j.E, { className: "h-52 w-full rounded-md" }, s),
                ),
            }),
          ],
        });
      }
      function b() {
        return (0, r.jsxs)("div", {
          className: "container py-8",
          children: [
            (0, r.jsxs)("div", {
              className: "mb-8 flex items-center justify-between",
              children: [
                (0, r.jsxs)("div", {
                  children: [
                    (0, r.jsx)("h1", {
                      className: "text-3xl font-bold",
                      children: "Your Documents",
                    }),
                    (0, r.jsx)("p", {
                      className: "text-muted-foreground",
                      children:
                        "Manage and organize your immigration related documents.",
                    }),
                  ],
                }),
                (0, r.jsxs)("div", {
                  className: "flex gap-2",
                  children: [
                    (0, r.jsx)(x.$, {
                      asChild: !0,
                      children: (0, r.jsxs)(o(), {
                        href: "/documents/create",
                        legacyBehavior: !0,
                        children: [
                          (0, r.jsx)(l.A, { className: "mr-2 h-4 w-4" }),
                          " Create Document",
                        ],
                      }),
                    }),
                    (0, r.jsx)(x.$, {
                      asChild: !0,
                      variant: "outline",
                      children: (0, r.jsxs)(o(), {
                        href: "/documents/search",
                        legacyBehavior: !0,
                        children: [
                          (0, r.jsx)(n.A, { className: "mr-2 h-4 w-4" }),
                          " Semantic Search",
                        ],
                      }),
                    }),
                    (0, r.jsx)(x.$, {
                      asChild: !0,
                      variant: "outline",
                      children: (0, r.jsxs)(o(), {
                        href: "/documents/scrape",
                        legacyBehavior: !0,
                        children: [
                          (0, r.jsx)(d.A, { className: "mr-2 h-4 w-4" }),
                          " Scrape Website",
                        ],
                      }),
                    }),
                    (0, r.jsx)(x.$, {
                      asChild: !0,
                      variant: "ghost",
                      children: (0, r.jsxs)(o(), {
                        href: "/admin/scraping-sources",
                        legacyBehavior: !0,
                        children: [
                          (0, r.jsx)(c.A, { className: "mr-2 h-4 w-4" }),
                          " Manage Sources",
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
            (0, r.jsxs)(g.Tabs, {
              defaultValue: "ai-generated",
              className: "w-full",
              children: [
                (0, r.jsxs)(g.TabsList, {
                  className: "mb-4",
                  children: [
                    (0, r.jsx)(g.TabsTrigger, {
                      value: "ai-generated",
                      children: "AI-Generated Documents",
                    }),
                    (0, r.jsx)(g.TabsTrigger, {
                      value: "scraped",
                      children: "Website Scrapes",
                    }),
                    (0, r.jsx)(g.TabsTrigger, {
                      value: "uploaded",
                      children: "Uploaded Documents",
                    }),
                  ],
                }),
                (0, r.jsxs)(g.TabsContent, {
                  value: "ai-generated",
                  className: "space-y-4",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "mb-4 flex items-center gap-2",
                      children: [
                        (0, r.jsx)(t.A, {
                          className: "h-5 w-5 text-muted-foreground",
                        }),
                        (0, r.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "These documents are generated with AI assistance based on your inputs.",
                        }),
                      ],
                    }),
                    (0, r.jsx)(u.k, {
                      children: (0, r.jsx)(m.Suspense, {
                        fallback: (0, r.jsx)(f, {}),
                        children: (0, r.jsx)(h, {}),
                      }),
                    }),
                  ],
                }),
                (0, r.jsxs)(g.TabsContent, {
                  value: "scraped",
                  className: "space-y-4",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "mb-4 flex items-center gap-2",
                      children: [
                        (0, r.jsx)(d.A, {
                          className: "h-5 w-5 text-muted-foreground",
                        }),
                        (0, r.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Documents created from web content using the scraper tool.",
                        }),
                      ],
                    }),
                    (0, r.jsx)(u.k, {
                      children: (0, r.jsx)(m.Suspense, {
                        fallback: (0, r.jsx)(f, {}),
                        children: (0, r.jsx)(h, {}),
                      }),
                    }),
                  ],
                }),
                (0, r.jsx)(g.TabsContent, {
                  value: "uploaded",
                  className: "space-y-4",
                  children: (0, r.jsxs)("div", {
                    className: "bg-muted/50 p-12 rounded-md text-center",
                    children: [
                      (0, r.jsx)("h3", {
                        className: "text-lg font-medium mb-2",
                        children: "Document Upload Feature",
                      }),
                      (0, r.jsx)("p", {
                        className: "text-muted-foreground mb-4",
                        children:
                          "This feature is coming soon. You will be able to upload and process documents with AI.",
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        });
      }
    },
    85008: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 39113));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(85008)), (_N_E = e.O());
  },
]);
