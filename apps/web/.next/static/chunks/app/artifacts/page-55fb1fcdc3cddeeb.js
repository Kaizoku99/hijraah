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
    (e._sentryDebugIds[s] = "82f3e538-4fa5-4866-9ec9-d5a0d4b7d79d"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-82f3e538-4fa5-4866-9ec9-d5a0d4b7d79d"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6486],
  {
    65240: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 84812)),
        Promise.resolve().then(a.bind(a, 84418));
    },
    84812: (e, s, a) => {
      "use strict";
      a.d(s, { ArtifactGallery: () => y });
      var l = a(30602),
        t = a(40972),
        i = a(39087),
        r = a(55271),
        c = a(45847),
        n = a(90630),
        d = a(38124),
        o = a(88477),
        h = a(1510),
        u = a(72170),
        x = a(5071),
        m = a(41960),
        p = a(85218),
        j = a(16125),
        f = a(5271),
        v = a(77413),
        b = a(14315),
        g = a(4401),
        N = a(61159),
        w = a(6530);
      function y() {
        let {
            artifacts: e,
            deleteArtifact: s,
            updateArtifactVisibility: a,
            isLoading: y,
          } = (0, w.S)(),
          [C, A] = (0, p.useState)(""),
          [k, _] = (0, p.useState)("all"),
          [D, S] = (0, p.useState)("all"),
          [P, I] = (0, p.useState)(null),
          $ = (0, m.useRouter)(),
          E = e.filter((e) => {
            let s = e.title.toLowerCase().includes(C.toLowerCase()),
              a = "all" === k || e.type === k,
              l = "all" === D || e.visibility === D;
            return s && a && l;
          }),
          L = async (e, a) => {
            a.preventDefault(),
              a.stopPropagation(),
              window.confirm(
                "Are you sure you want to delete this artifact?",
              ) && (await s(e));
          },
          T = async (e, s, l) => {
            l.preventDefault(), l.stopPropagation(), await a(e, s);
          },
          V = (e) => {
            I(e);
          },
          z = () => {
            I(null);
          },
          F = (e) => {
            switch (e) {
              case "document":
              default:
                return (0, l.jsx)(t.A, { className: "h-4 w-4" });
              case "code":
                return (0, l.jsx)(i.A, { className: "h-4 w-4" });
              case "spreadsheet":
                return (0, l.jsx)(r.A, { className: "h-4 w-4" });
              case "image":
                return (0, l.jsx)(c.A, { className: "h-4 w-4" });
            }
          },
          O = (e) => {
            switch (e) {
              case "public":
                return (0, l.jsx)(n.A, { className: "h-4 w-4" });
              case "team":
                return (0, l.jsx)(d.A, { className: "h-4 w-4" });
              default:
                return (0, l.jsx)(o.A, { className: "h-4 w-4" });
            }
          };
        return (0, l.jsxs)("div", {
          className: "container mx-auto py-6",
          children: [
            (0, l.jsxs)("div", {
              className: "flex justify-between items-center mb-6",
              children: [
                (0, l.jsx)("h1", {
                  className: "text-2xl font-bold",
                  children: "Your Artifacts",
                }),
                (0, l.jsxs)(f.$, {
                  onClick: () => $.push("/create-artifact"),
                  children: [
                    (0, l.jsx)(h.A, { className: "h-4 w-4 mr-2" }),
                    "Create New",
                  ],
                }),
              ],
            }),
            (0, l.jsxs)("div", {
              className: "flex flex-col md:flex-row gap-4 mb-6",
              children: [
                (0, l.jsxs)("div", {
                  className: "relative flex-grow",
                  children: [
                    (0, l.jsx)(u.A, {
                      className:
                        "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
                    }),
                    (0, l.jsx)(g.p, {
                      placeholder: "Search artifacts...",
                      className: "pl-8",
                      value: C,
                      onChange: (e) => A(e.target.value),
                    }),
                  ],
                }),
                (0, l.jsxs)(N.l6, {
                  value: k,
                  onValueChange: _,
                  children: [
                    (0, l.jsx)(N.bq, {
                      className: "w-[180px]",
                      children: (0, l.jsx)(N.yv, {
                        placeholder: "Filter by type",
                      }),
                    }),
                    (0, l.jsxs)(N.gC, {
                      children: [
                        (0, l.jsx)(N.eb, {
                          value: "all",
                          children: "All Types",
                        }),
                        (0, l.jsx)(N.eb, {
                          value: "document",
                          children: "Documents",
                        }),
                        (0, l.jsx)(N.eb, { value: "code", children: "Code" }),
                        (0, l.jsx)(N.eb, {
                          value: "spreadsheet",
                          children: "Spreadsheets",
                        }),
                        (0, l.jsx)(N.eb, {
                          value: "image",
                          children: "Images",
                        }),
                        (0, l.jsx)(N.eb, {
                          value: "mindmap",
                          children: "Mind Maps",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, l.jsxs)(N.l6, {
                  value: D,
                  onValueChange: S,
                  children: [
                    (0, l.jsx)(N.bq, {
                      className: "w-[180px]",
                      children: (0, l.jsx)(N.yv, {
                        placeholder: "Filter by visibility",
                      }),
                    }),
                    (0, l.jsxs)(N.gC, {
                      children: [
                        (0, l.jsx)(N.eb, {
                          value: "all",
                          children: "All Visibility",
                        }),
                        (0, l.jsx)(N.eb, {
                          value: "private",
                          children: "Private",
                        }),
                        (0, l.jsx)(N.eb, { value: "team", children: "Team" }),
                        (0, l.jsx)(N.eb, {
                          value: "public",
                          children: "Public",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            y
              ? (0, l.jsx)("div", {
                  className:
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                  children: [...Array(6)].map((e, s) =>
                    (0, l.jsx)(
                      v.Zp,
                      {
                        className: "w-full h-48 animate-pulse",
                        children: (0, l.jsx)(v.Wu, {
                          className: "p-6 flex items-center justify-center",
                          children: (0, l.jsx)("div", {
                            className:
                              "h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4",
                          }),
                        }),
                      },
                      s,
                    ),
                  ),
                })
              : 0 === E.length
                ? (0, l.jsxs)("div", {
                    className:
                      "flex flex-col items-center justify-center py-12",
                    children: [
                      (0, l.jsx)("p", {
                        className: "text-muted-foreground mb-4",
                        children: "No artifacts found",
                      }),
                      (0, l.jsx)(f.$, {
                        variant: "outline",
                        onClick: () => $.push("/create-artifact"),
                        children: "Create your first artifact",
                      }),
                    ],
                  })
                : (0, l.jsx)("div", {
                    className:
                      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                    children: E.map((e) => {
                      var s, a;
                      return (0, l.jsxs)(
                        v.Zp,
                        {
                          className:
                            "cursor-pointer hover:border-primary/50 transition-colors",
                          onClick: () => V(e.id),
                          children: [
                            (0, l.jsx)(v.aR, {
                              className: "p-4 pb-2",
                              children: (0, l.jsxs)("div", {
                                className: "flex justify-between items-center",
                                children: [
                                  (0, l.jsxs)("div", {
                                    className: "flex items-center space-x-2",
                                    children: [
                                      F(e.type),
                                      (0, l.jsx)("span", {
                                        className: "font-medium truncate",
                                        children: e.title,
                                      }),
                                    ],
                                  }),
                                  (0, l.jsxs)("div", {
                                    className: "flex space-x-1",
                                    children: [
                                      (0, l.jsx)(f.$, {
                                        variant: "ghost",
                                        size: "icon",
                                        className: "h-7 w-7",
                                        onClick: (s) => {
                                          let a =
                                            "private" === e.visibility
                                              ? "team"
                                              : "team" === e.visibility
                                                ? "public"
                                                : "private";
                                          T(e.id, a, s);
                                        },
                                        children: O(e.visibility),
                                      }),
                                      (0, l.jsx)(f.$, {
                                        variant: "ghost",
                                        size: "icon",
                                        className:
                                          "h-7 w-7 text-destructive hover:text-destructive",
                                        onClick: (s) => L(e.id, s),
                                        children: (0, l.jsx)(x.A, {
                                          className: "h-4 w-4",
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            (0, l.jsx)(v.Wu, {
                              className: "p-4 pt-2",
                              children: (0, l.jsxs)("div", {
                                className:
                                  "h-24 overflow-hidden text-sm text-muted-foreground",
                                children: [
                                  "document" === e.type &&
                                    (0, l.jsx)("p", {
                                      className: "line-clamp-4",
                                      children:
                                        (null == (s = e.content)
                                          ? void 0
                                          : s.text) || "",
                                    }),
                                  "code" === e.type &&
                                    (0, l.jsx)("pre", {
                                      className:
                                        "line-clamp-4 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded",
                                      children: (0, l.jsx)("code", {
                                        children:
                                          (null == (a = e.content)
                                            ? void 0
                                            : a.code) || "",
                                      }),
                                    }),
                                ],
                              }),
                            }),
                            (0, l.jsx)(v.wL, {
                              className:
                                "p-4 pt-2 text-xs text-muted-foreground",
                              children: (0, l.jsxs)("div", {
                                className: "flex justify-between w-full",
                                children: [
                                  (0, l.jsxs)("span", {
                                    children: [
                                      "Created:",
                                      " ",
                                      new Date(
                                        e.created_at,
                                      ).toLocaleDateString(),
                                    ],
                                  }),
                                  (0, l.jsx)(f.$, {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-6 px-2",
                                    onClick: (s) => {
                                      s.stopPropagation(),
                                        $.push("/artifacts/".concat(e.id));
                                    },
                                    children: "View Full",
                                  }),
                                ],
                              }),
                            }),
                          ],
                        },
                        e.id,
                      );
                    }),
                  }),
            (0, l.jsx)(b.lG, {
              open: !!P,
              onOpenChange: (e) => !e && z(),
              children: (0, l.jsx)(b.Cf, {
                className: "sm:max-w-[900px] h-[80vh] p-0",
                children:
                  P &&
                  (0, l.jsx)(j.Artifact, {
                    id: P,
                    onClose: z,
                    className: "border-0 shadow-none",
                  }),
              }),
            }),
          ],
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(65240)), (_N_E = e.O());
  },
]);
