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
    (e._sentryDebugIds[s] = "c7da2443-b1db-4c59-902e-096001edc03a"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-c7da2443-b1db-4c59-902e-096001edc03a"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2959],
  {
    57114: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => x });
      var l = a(30602),
        t = a(72170),
        r = a(41960),
        n = a(19326),
        c = a(85218),
        i = a(26600),
        d = a(5271),
        u = a(77413),
        o = a(4401),
        m = a(88542);
      function h() {
        let e = (0, r.useRouter)(),
          [s, a] = (0, n.ZA)("q", { defaultValue: "" }),
          [h, x] = (0, c.useState)([]),
          [f, b] = (0, c.useState)(!1),
          [j, p] = (0, c.useState)(null),
          y = async (e) => {
            if (!e.trim()) {
              x([]), p(null);
              return;
            }
            b(!0), p(null);
            try {
              let s = await fetch(
                "/api/search?query=".concat(encodeURIComponent(e)),
              );
              if (!s.ok) {
                let e = await s.json();
                throw Error(e.error || "Search failed");
              }
              let a = await s.json();
              x(a.results),
                0 === a.results.length &&
                  p("No documents found matching your query");
            } catch (e) {
              console.error("Search error:", e),
                p(e.message || "An error occurred during search");
            } finally {
              b(!1);
            }
          };
        (0, c.useEffect)(() => {
          s.trim() && y(s);
        }, [s]);
        let g = async (e) => {
            e.preventDefault(), s.trim() ? y(s) : (x([]), p(null));
          },
          N = (s) => {
            e.push("/documents/".concat(s));
          };
        return (0, l.jsxs)("div", {
          className: "w-full max-w-3xl mx-auto",
          children: [
            (0, l.jsxs)("form", {
              onSubmit: g,
              className: "flex gap-2 mb-6",
              children: [
                (0, l.jsx)(o.p, {
                  type: "text",
                  placeholder: "Search documents semantically...",
                  value: s,
                  onChange: (e) => a(e.target.value),
                  className: "flex-1",
                }),
                (0, l.jsxs)(d.$, {
                  type: "submit",
                  disabled: f,
                  children: [
                    f
                      ? "Searching..."
                      : (0, l.jsx)(t.A, { className: "h-4 w-4 mr-2" }),
                    "Search",
                  ],
                }),
              ],
            }),
            f &&
              (0, l.jsx)("div", {
                className: "space-y-4",
                children: [void 0, void 0, void 0].map((e, s) =>
                  (0, l.jsxs)(
                    u.Zp,
                    {
                      children: [
                        (0, l.jsxs)(u.aR, {
                          className: "pb-2",
                          children: [
                            (0, l.jsx)(m.E, { className: "h-4 w-3/4" }),
                            (0, l.jsx)(m.E, { className: "h-3 w-1/2" }),
                          ],
                        }),
                        (0, l.jsxs)(u.Wu, {
                          children: [
                            (0, l.jsx)(m.E, { className: "h-3 w-full mb-2" }),
                            (0, l.jsx)(m.E, { className: "h-3 w-full mb-2" }),
                            (0, l.jsx)(m.E, { className: "h-3 w-2/3" }),
                          ],
                        }),
                      ],
                    },
                    s,
                  ),
                ),
              }),
            j &&
              !f &&
              (0, l.jsx)("div", {
                className: "text-center py-8 text-muted-foreground",
                children: j,
              }),
            !f &&
              h.length > 0 &&
              (0, l.jsx)("div", {
                className: "space-y-4",
                children: h.map((e) => {
                  var s, a;
                  return (0, l.jsxs)(
                    u.Zp,
                    {
                      className:
                        "cursor-pointer hover:bg-muted/50 transition-colors",
                      onClick: () => N(e.id),
                      children: [
                        (0, l.jsxs)(u.aR, {
                          className: "pb-2",
                          children: [
                            (0, l.jsxs)("div", {
                              className: "flex justify-between items-start",
                              children: [
                                (0, l.jsx)(u.ZB, {
                                  className: "text-lg",
                                  children: e.title,
                                }),
                                (0, l.jsx)(i.E, {
                                  variant:
                                    "public" === e.visibility
                                      ? "default"
                                      : "outline",
                                  children: e.visibility,
                                }),
                              ],
                            }),
                            (0, l.jsxs)(u.BT, {
                              children: [
                                "Relevance: ",
                                Math.round(100 * e.similarity),
                                "%",
                              ],
                            }),
                          ],
                        }),
                        (0, l.jsx)(u.Wu, {
                          children: (0, l.jsxs)("p", {
                            className:
                              "text-sm text-muted-foreground line-clamp-3",
                            children: [
                              (null == (a = e.content) || null == (s = a.text)
                                ? void 0
                                : s.substring(0, 200)) ||
                                "No preview available",
                              "...",
                            ],
                          }),
                        }),
                        (0, l.jsx)(u.wL, {
                          className: "pt-0",
                          children: (0, l.jsx)(d.$, {
                            variant: "ghost",
                            size: "sm",
                            children: "View Document",
                          }),
                        }),
                      ],
                    },
                    e.id,
                  );
                }),
              }),
          ],
        });
      }
      function x() {
        return (0, l.jsx)("div", {
          className: "container py-8",
          children: (0, l.jsxs)("div", {
            className: "max-w-4xl mx-auto",
            children: [
              (0, l.jsx)("h1", {
                className: "text-3xl font-bold mb-2",
                children: "Semantic Document Search",
              }),
              (0, l.jsx)("p", {
                className: "text-muted-foreground mb-8",
                children:
                  "Search for documents using natural language. Our AI-powered search understands the meaning behind your query.",
              }),
              (0, l.jsx)(h, {}),
            ],
          }),
        });
      }
    },
    60054: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 57114));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(60054)), (_N_E = e.O());
  },
]);
