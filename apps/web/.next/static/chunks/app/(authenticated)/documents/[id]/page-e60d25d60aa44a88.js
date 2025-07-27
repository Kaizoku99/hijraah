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
    (e._sentryDebugIds[s] = "5e4c6156-c974-4ca0-92ba-56d380dcea00"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-5e4c6156-c974-4ca0-92ba-56d380dcea00"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [2596],
  {
    8920: (e, s, t) => {
      "use strict";
      t.r(s), t.d(s, { default: () => b });
      var n = t(30602),
        l = t(13575),
        i = t(1055),
        a = t(56887),
        c = t(5071),
        r = t(41960),
        d = t(85218),
        o = t(26600),
        m = t(6530),
        u = t(14024),
        h = t(5271),
        x = t(77413),
        j = t(88542);
      function b() {
        let e = (0, r.useParams)(),
          s = (0, r.useRouter)(),
          {
            artifacts: t,
            deleteArtifact: b,
            updateArtifactVisibility: f,
          } = (0, m.S)(),
          [p, v] = (0, d.useState)(null),
          [N, y] = (0, d.useState)(!0);
        (0, d.useEffect)(() => {
          t && (v(t.find((s) => s.id === e.id) || null), y(!1));
        }, [t, e.id]);
        let w = async () => {
            p && (await b(p.id), s.push("/documents"));
          },
          g = async () => {
            if (p) {
              let e = "public" === p.visibility ? "private" : "public";
              await f(p.id, e), v({ ...p, visibility: e });
            }
          };
        if (N)
          return (0, n.jsxs)("div", {
            className: "container py-8",
            children: [
              (0, n.jsxs)("div", {
                className: "flex items-center mb-6",
                children: [
                  (0, n.jsx)(j.E, { className: "h-10 w-10 rounded-full" }),
                  (0, n.jsx)(j.E, { className: "h-8 w-48 ml-4" }),
                ],
              }),
              (0, n.jsx)(j.E, { className: "h-8 w-full mb-4" }),
              (0, n.jsx)(j.E, { className: "h-64 w-full rounded-md" }),
            ],
          });
        if (!p)
          return (0, n.jsxs)("div", {
            className: "container py-8",
            children: [
              (0, n.jsxs)(h.$, {
                variant: "outline",
                onClick: () => s.push("/documents"),
                className: "mb-6",
                children: [
                  (0, n.jsx)(l.A, { className: "mr-2 h-4 w-4" }),
                  "Back to Documents",
                ],
              }),
              (0, n.jsxs)(x.Zp, {
                className: "p-8 text-center",
                children: [
                  (0, n.jsx)("h2", {
                    className: "text-2xl font-bold mb-2",
                    children: "Document Not Found",
                  }),
                  (0, n.jsx)("p", {
                    className: "text-muted-foreground mb-4",
                    children:
                      "The document you are looking for does not exist or has been deleted.",
                  }),
                  (0, n.jsx)(h.$, {
                    onClick: () => s.push("/documents"),
                    children: "Return to Documents",
                  }),
                ],
              }),
            ],
          });
        let k = "public" === p.visibility;
        return (0, n.jsxs)("div", {
          className: "container py-8",
          children: [
            (0, n.jsxs)(h.$, {
              variant: "outline",
              onClick: () => s.push("/documents"),
              className: "mb-6",
              children: [
                (0, n.jsx)(l.A, { className: "mr-2 h-4 w-4" }),
                "Back to Documents",
              ],
            }),
            (0, n.jsxs)("div", {
              className: "flex justify-between items-center mb-4",
              children: [
                (0, n.jsx)("h1", {
                  className: "text-3xl font-bold",
                  children: p.title,
                }),
                (0, n.jsxs)("div", {
                  className: "flex gap-2",
                  children: [
                    (0, n.jsx)(h.$, {
                      variant: "outline",
                      size: "sm",
                      onClick: g,
                      children: k
                        ? (0, n.jsxs)(n.Fragment, {
                            children: [
                              (0, n.jsx)(i.A, { className: "mr-2 h-4 w-4" }),
                              "Public",
                            ],
                          })
                        : (0, n.jsxs)(n.Fragment, {
                            children: [
                              (0, n.jsx)(a.A, { className: "mr-2 h-4 w-4" }),
                              "Private",
                            ],
                          }),
                    }),
                    (0, n.jsxs)(u.Lt, {
                      children: [
                        (0, n.jsx)(u.tv, {
                          asChild: !0,
                          children: (0, n.jsxs)(h.$, {
                            variant: "destructive",
                            size: "sm",
                            children: [
                              (0, n.jsx)(c.A, { className: "mr-2 h-4 w-4" }),
                              "Delete",
                            ],
                          }),
                        }),
                        (0, n.jsxs)(u.EO, {
                          children: [
                            (0, n.jsxs)(u.wd, {
                              children: [
                                (0, n.jsx)(u.r7, { children: "Are you sure?" }),
                                (0, n.jsx)(u.$v, {
                                  children:
                                    "This action cannot be undone. This will permanently delete the document and remove its data from our servers.",
                                }),
                              ],
                            }),
                            (0, n.jsxs)(u.ck, {
                              children: [
                                (0, n.jsx)(u.Zr, { children: "Cancel" }),
                                (0, n.jsx)(u.Rx, {
                                  onClick: w,
                                  children: "Delete",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, n.jsxs)("div", {
              className: "mb-6 flex gap-2",
              children: [
                (0, n.jsx)(o.E, {
                  variant: k ? "default" : "outline",
                  children: k ? "Public" : "Private",
                }),
                (0, n.jsx)(o.E, {
                  variant: "secondary",
                  children: p.type || "Document",
                }),
                p.created_at &&
                  (0, n.jsxs)(o.E, {
                    variant: "outline",
                    children: [
                      "Created: ",
                      new Date(p.created_at).toLocaleDateString(),
                    ],
                  }),
              ],
            }),
            (0, n.jsx)(x.Zp, {
              className: "p-6 mb-6",
              children: (0, n.jsxs)("div", {
                className: "prose dark:prose-invert max-w-none",
                children: [
                  (0, n.jsx)("h2", {
                    className: "text-xl font-semibold mb-2",
                    children: p.title,
                  }),
                  (0, n.jsx)("div", {
                    className: "whitespace-pre-wrap",
                    children:
                      "object" == typeof p.content && p.content.text
                        ? p.content.text
                        : "string" == typeof p.content
                          ? p.content
                          : JSON.stringify(p.content, null, 2),
                  }),
                ],
              }),
            }),
          ],
        });
      }
    },
    93135: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 8920));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(93135)), (_N_E = e.O());
  },
]);
