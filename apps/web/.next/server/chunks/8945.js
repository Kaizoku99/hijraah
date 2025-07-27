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
    t = new e.Error().stack;
  t &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[t] = "24362ee8-bfe6-4aee-98c1-36038565e060"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-24362ee8-bfe6-4aee-98c1-36038565e060"));
} catch (e) {}
("use strict");
(exports.id = 8945),
  (exports.ids = [8945]),
  (exports.modules = {
    5451: (e, t, a) => {
      a.a(e, async (e, s) => {
        try {
          a.d(t, {
            BT: () => f,
            Wu: () => m,
            ZB: () => u,
            Zp: () => d,
            aR: () => o,
            wL: () => x,
          });
          var r = a(61268),
            i = a(55728),
            n = a(84205),
            l = a(15942),
            c = e([l]);
          l = (c.then ? (await c)() : c)[0];
          let d = n.forwardRef(({ className: e, ...t }, a) =>
            (0, r.jsx)(i.P.div, {
              ref: a,
              className: (0, l.cn)(
                "rounded-lg border bg-card text-card-foreground shadow-sm",
                e,
              ),
              whileHover: {
                scale: 1.03,
                boxShadow:
                  "0px 7px 25px rgba(0,0,0,0.08), 0px 3px 10px rgba(0,0,0,0.04)",
              },
              transition: { type: "spring", stiffness: 300, damping: 20 },
              ...t,
            }),
          );
          d.displayName = "Card";
          let o = n.forwardRef(({ className: e, ...t }, a) =>
            (0, r.jsx)("div", {
              ref: a,
              className: (0, l.cn)("flex flex-col space-y-1.5 p-6", e),
              ...t,
            }),
          );
          o.displayName = "CardHeader";
          let u = n.forwardRef(({ className: e, ...t }, a) =>
            (0, r.jsx)("h3", {
              ref: a,
              className: (0, l.cn)(
                "text-2xl font-semibold leading-none tracking-tight",
                e,
              ),
              ...t,
            }),
          );
          u.displayName = "CardTitle";
          let f = n.forwardRef(({ className: e, ...t }, a) =>
            (0, r.jsx)("p", {
              ref: a,
              className: (0, l.cn)("text-sm text-muted-foreground", e),
              ...t,
            }),
          );
          f.displayName = "CardDescription";
          let m = n.forwardRef(({ className: e, ...t }, a) =>
            (0, r.jsx)("div", {
              ref: a,
              className: (0, l.cn)("p-6 pt-0", e),
              ...t,
            }),
          );
          m.displayName = "CardContent";
          let x = n.forwardRef(({ className: e, ...t }, a) =>
            (0, r.jsx)("div", {
              ref: a,
              className: (0, l.cn)("flex items-center p-6 pt-0", e),
              ...t,
            }),
          );
          (x.displayName = "CardFooter"), s();
        } catch (e) {
          s(e);
        }
      });
    },
    14478: (e, t, a) => {
      a.d(t, { A: () => s });
      let s = (0, a(95255).A)("Grid3x3", [
        [
          "rect",
          { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" },
        ],
        ["path", { d: "M3 9h18", key: "1pudct" }],
        ["path", { d: "M3 15h18", key: "5xshup" }],
        ["path", { d: "M9 3v18", key: "fh3hqa" }],
        ["path", { d: "M15 3v18", key: "14nvp0" }],
      ]);
    },
    14711: (e, t, a) => {
      a.d(t, { A: () => s });
      let s = (0, a(95255).A)("Share2", [
        ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
        ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
        ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
        [
          "line",
          { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" },
        ],
        [
          "line",
          { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" },
        ],
      ]);
    },
    14795: (e, t, a) => {
      a.d(t, { j2: () => r });
      var s = a(84001);
      async function r() {
        return (await (0, s.WV)()).session;
      }
      a(57011), a(67761), a(29244);
    },
    52827: (e, t, a) => {
      a.a(e, async (e, s) => {
        try {
          a.d(t, { Artifact: () => C });
          var r = a(61268),
            i = a(99793),
            n = a(63942),
            l = a(14478),
            c = a(63806),
            d = a(14711),
            o = a(96465),
            u = a(27896),
            f = a(15014),
            m = a(90495),
            x = a(89882),
            h = a(84205),
            p = a(28909),
            g = a(5451),
            v = a(93336),
            y = a(78337),
            w = a(77001),
            b = a(87826),
            j = a(15942),
            N = e([p, g, v, y, w, b, j]);
          function k({ content: e }) {
            return (0, r.jsx)("div", {
              className: "whitespace-pre-wrap",
              children: e,
            });
          }
          function C({ id: e, viewOnly: t = !1, onClose: a, className: s }) {
            let {
                currentArtifact: N,
                artifactMessages: C,
                getArtifact: A,
                updateArtifact: T,
                deleteArtifact: S,
                updateArtifactVisibility: _,
                isLoading: R,
              } = (0, b.S)(),
              [L, E] = (0, h.useState)("document"),
              [F, z] = (0, h.useState)(!1),
              [$, q] = (0, h.useState)(""),
              [D, I] = (0, h.useState)({ text: "" }),
              [P, M] = (0, h.useState)({ code: "", language: "" }),
              V = (0, x.useRouter)();
            (0, x.usePathname)();
            let Z = async () => {
                window.confirm(
                  "Are you sure you want to delete this artifact?",
                ) && (await S(e), a ? a() : V.push("/artifacts"));
              },
              B = async (t) => {
                await _(e, t);
              },
              U = async () => {
                if (!N) return;
                let t =
                  "document" === N.type ? D : "code" === N.type ? P : N.content;
                await T(e, { title: $, content: t }), z(!1);
              };
            return R || !N
              ? (0, r.jsx)(g.Zp, {
                  className: (0, j.cn)(
                    "w-full h-full min-h-[300px] flex items-center justify-center",
                    s,
                  ),
                  children: (0, r.jsx)("div", {
                    className: "animate-pulse text-muted-foreground",
                    children: "Loading artifact...",
                  }),
                })
              : (0, r.jsxs)(g.Zp, {
                  className: (0, j.cn)("w-full h-full flex flex-col", s),
                  children: [
                    (0, r.jsxs)(g.aR, {
                      className:
                        "flex flex-row items-center justify-between pb-2 space-y-0",
                      children: [
                        (0, r.jsxs)("div", {
                          className: "flex items-center space-x-2",
                          children: [
                            ((e) => {
                              switch (e) {
                                case "document":
                                default:
                                  return (0, r.jsx)(i.A, {
                                    className: "h-5 w-5",
                                  });
                                case "code":
                                  return (0, r.jsx)(n.A, {
                                    className: "h-5 w-5",
                                  });
                                case "spreadsheet":
                                  return (0, r.jsx)(l.A, {
                                    className: "h-5 w-5",
                                  });
                                case "image":
                                  return (0, r.jsx)(c.A, {
                                    className: "h-5 w-5",
                                  });
                              }
                            })(N.type),
                            F
                              ? (0, r.jsx)(y.p, {
                                  value: $,
                                  onChange: (e) => q(e.target.value),
                                  className: "h-7 text-lg font-semibold",
                                })
                              : (0, r.jsx)(g.ZB, { children: N.title }),
                          ],
                        }),
                        (0, r.jsxs)("div", {
                          className: "flex items-center space-x-2",
                          children: [
                            !t &&
                              (0, r.jsxs)(r.Fragment, {
                                children: [
                                  (0, r.jsxs)(v.rI, {
                                    children: [
                                      (0, r.jsx)(v.ty, {
                                        asChild: !0,
                                        children: (0, r.jsx)(p.$, {
                                          variant: "ghost",
                                          size: "icon",
                                          className: "h-8 w-8",
                                          children: ((e) => {
                                            switch (e) {
                                              case "public":
                                                return (0, r.jsx)(d.A, {
                                                  className: "h-4 w-4",
                                                });
                                              case "team":
                                                return (0, r.jsx)(o.A, {
                                                  className: "h-4 w-4",
                                                });
                                              default:
                                                return (0, r.jsx)(u.A, {
                                                  className: "h-4 w-4",
                                                });
                                            }
                                          })(N.visibility),
                                        }),
                                      }),
                                      (0, r.jsxs)(v.SQ, {
                                        align: "end",
                                        children: [
                                          (0, r.jsxs)(v._2, {
                                            onClick: () => B("private"),
                                            children: [
                                              (0, r.jsx)(u.A, {
                                                className: "h-4 w-4 mr-2",
                                              }),
                                              "Private",
                                            ],
                                          }),
                                          (0, r.jsxs)(v._2, {
                                            onClick: () => B("team"),
                                            children: [
                                              (0, r.jsx)(o.A, {
                                                className: "h-4 w-4 mr-2",
                                              }),
                                              "Team",
                                            ],
                                          }),
                                          (0, r.jsxs)(v._2, {
                                            onClick: () => B("public"),
                                            children: [
                                              (0, r.jsx)(d.A, {
                                                className: "h-4 w-4 mr-2",
                                              }),
                                              "Public",
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  F
                                    ? (0, r.jsxs)(r.Fragment, {
                                        children: [
                                          (0, r.jsx)(p.$, {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: () => {
                                              N &&
                                                (q(N.title),
                                                "document" === N.type &&
                                                N.content
                                                  ? I(N.content)
                                                  : "code" === N.type &&
                                                    N.content &&
                                                    M(N.content)),
                                                z(!1);
                                            },
                                            children: "Cancel",
                                          }),
                                          (0, r.jsx)(p.$, {
                                            variant: "default",
                                            size: "sm",
                                            onClick: U,
                                            children: "Save",
                                          }),
                                        ],
                                      })
                                    : (0, r.jsx)(p.$, {
                                        variant: "ghost",
                                        size: "sm",
                                        onClick: () => z(!0),
                                        children: "Edit",
                                      }),
                                  (0, r.jsx)(p.$, {
                                    variant: "ghost",
                                    size: "icon",
                                    className: "h-8 w-8 text-destructive",
                                    onClick: Z,
                                    children: (0, r.jsx)(f.A, {
                                      className: "h-4 w-4",
                                    }),
                                  }),
                                ],
                              }),
                            a &&
                              (0, r.jsx)(p.$, {
                                variant: "ghost",
                                size: "icon",
                                className: "h-8 w-8",
                                onClick: a,
                                children: (0, r.jsx)(m.A, {
                                  className: "h-4 w-4",
                                }),
                              }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsx)(g.Wu, {
                      className: "flex-1 p-0 overflow-hidden",
                      children: (0, r.jsxs)(w.Tabs, {
                        value: L,
                        onValueChange: E,
                        className: "h-full flex flex-col",
                        children: [
                          (0, r.jsxs)(w.TabsList, {
                            className: "mx-4",
                            children: [
                              (0, r.jsx)(w.TabsTrigger, {
                                value: "document",
                                onClick: () => E("document"),
                                children: "Document",
                              }),
                              C.length > 0 &&
                                (0, r.jsxs)(w.TabsTrigger, {
                                  value: "chat",
                                  onClick: () => E("chat"),
                                  children: ["Chat (", C.length, ")"],
                                }),
                            ],
                          }),
                          (0, r.jsxs)(w.TabsContent, {
                            value: "document",
                            className: "flex-1 p-4 overflow-auto",
                            children: [
                              "document" === N.type &&
                                (F
                                  ? (0, r.jsx)("div", {
                                      className: "min-h-[300px] font-mono",
                                      children: (0, r.jsx)("textarea", {
                                        value: D?.text || "",
                                        onChange: (e) =>
                                          I({ ...D, text: e.target.value }),
                                        className:
                                          "w-full h-full min-h-[300px] p-2 border rounded-md",
                                      }),
                                    })
                                  : (0, r.jsx)("div", {
                                      className:
                                        "prose dark:prose-invert max-w-none",
                                      children: (0, r.jsx)(k, {
                                        content: N.content?.text || "",
                                      }),
                                    })),
                              "code" === N.type &&
                                (F
                                  ? (0, r.jsxs)("div", {
                                      className: "space-y-4",
                                      children: [
                                        (0, r.jsxs)("div", {
                                          className: "flex space-x-2",
                                          children: [
                                            (0, r.jsx)(y.p, {
                                              value: P?.fileName || "",
                                              onChange: (e) =>
                                                M({
                                                  ...P,
                                                  fileName: e.target.value,
                                                }),
                                              placeholder: "Filename",
                                              className: "w-1/3",
                                            }),
                                            (0, r.jsx)(y.p, {
                                              value: P?.language || "",
                                              onChange: (e) =>
                                                M({
                                                  ...P,
                                                  language: e.target.value,
                                                }),
                                              placeholder: "Language",
                                              className: "w-1/3",
                                            }),
                                          ],
                                        }),
                                        (0, r.jsx)("div", {
                                          className: "min-h-[300px] font-mono",
                                          children: (0, r.jsx)("textarea", {
                                            value: P?.code || "",
                                            onChange: (e) =>
                                              M({ ...P, code: e.target.value }),
                                            className:
                                              "w-full h-full min-h-[300px] p-2 border rounded-md font-mono",
                                          }),
                                        }),
                                      ],
                                    })
                                  : (0, r.jsxs)("div", {
                                      className:
                                        "prose dark:prose-invert max-w-none",
                                      children: [
                                        (0, r.jsx)("h3", {
                                          children:
                                            N.content?.fileName || "Code",
                                        }),
                                        (0, r.jsx)("pre", {
                                          className:
                                            "bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto",
                                          children: (0, r.jsx)("code", {
                                            children: N.content?.code || "",
                                          }),
                                        }),
                                      ],
                                    })),
                            ],
                          }),
                          (0, r.jsx)(w.TabsContent, {
                            value: "chat",
                            className: "flex-1 p-4 overflow-auto",
                            children: (0, r.jsx)("div", {
                              className: "space-y-4",
                              children: C.map((e) =>
                                (0, r.jsxs)(
                                  "div",
                                  {
                                    className: (0, j.cn)(
                                      "p-3 rounded-lg",
                                      "user" === e.role
                                        ? "bg-primary text-primary-foreground ml-12"
                                        : "bg-muted mr-12",
                                    ),
                                    children: [
                                      (0, r.jsx)("div", {
                                        className: "text-xs font-medium mb-1",
                                        children:
                                          "user" === e.role
                                            ? "You"
                                            : "AI Assistant",
                                      }),
                                      (0, r.jsx)("div", {
                                        children: e.message,
                                      }),
                                    ],
                                  },
                                  e.id,
                                ),
                              ),
                            }),
                          }),
                        ],
                      }),
                    }),
                    (0, r.jsx)(g.wL, {
                      className: "text-xs text-muted-foreground pt-2 pb-2",
                      children: (0, r.jsxs)("div", {
                        className: "flex items-center space-x-1",
                        children: [
                          (0, r.jsxs)("span", {
                            children: [
                              "Created: ",
                              new Date(N.created_at).toLocaleString(),
                            ],
                          }),
                          (0, r.jsx)("span", { children: "•" }),
                          (0, r.jsxs)("span", {
                            children: [
                              "Updated: ",
                              new Date(N.updated_at).toLocaleString(),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                });
          }
          ([p, g, v, y, w, b, j] = N.then ? (await N)() : N), s();
        } catch (e) {
          s(e);
        }
      });
    },
    63806: (e, t, a) => {
      a.d(t, { A: () => s });
      let s = (0, a(95255).A)("Image", [
        [
          "rect",
          {
            width: "18",
            height: "18",
            x: "3",
            y: "3",
            rx: "2",
            ry: "2",
            key: "1m3agn",
          },
        ],
        ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
        [
          "path",
          { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" },
        ],
      ]);
    },
    77001: (e, t, a) => {
      a.a(e, async (e, s) => {
        try {
          a.d(t, {
            Tabs: () => c,
            TabsContent: () => u,
            TabsList: () => d,
            TabsTrigger: () => o,
          });
          var r = a(61268),
            i = a(28366);
          a(84205);
          var n = a(15942),
            l = e([n]);
          function c({ className: e, ...t }) {
            return (0, r.jsx)(i.bL, {
              "data-slot": "tabs",
              className: (0, n.cn)("flex flex-col gap-2", e),
              ...t,
            });
          }
          function d({ className: e, ...t }) {
            return (0, r.jsx)(i.B8, {
              "data-slot": "tabs-list",
              className: (0, n.cn)(
                "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
                e,
              ),
              ...t,
            });
          }
          function o({ className: e, ...t }) {
            return (0, r.jsx)(i.l9, {
              "data-slot": "tabs-trigger",
              className: (0, n.cn)(
                "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                e,
              ),
              ...t,
            });
          }
          function u({ className: e, ...t }) {
            return (0, r.jsx)(i.UC, {
              "data-slot": "tabs-content",
              className: (0, n.cn)("flex-1 outline-none", e),
              ...t,
            });
          }
          (n = (l.then ? (await l)() : l)[0]), s();
        } catch (e) {
          s(e);
        }
      });
    },
    87216: (e, t, a) => {
      a.a(e, async (e, s) => {
        try {
          a.d(t, { Ck: () => p, dj: () => g });
          var r = a(61268),
            i = a(24419),
            n = a(91635),
            l = a(90495),
            c = a(61950),
            d = a(38568),
            o = a(89123),
            u = a(84205),
            f = a.n(u),
            m = a(15942),
            x = e([m]);
          m = (x.then ? (await x)() : x)[0];
          let y = (0, u.createContext)(void 0);
          i.Kq,
            (f().forwardRef(({ className: e, ...t }, a) =>
              (0, r.jsx)(i.LM, {
                ref: a,
                className: (0, m.cn)(
                  "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
                  e,
                ),
                ...t,
              }),
            ).displayName = i.LM.displayName);
          let w = (0, n.F)(
            "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
            {
              variants: {
                variant: {
                  default: "border bg-background text-foreground",
                  destructive:
                    "destructive group border-destructive bg-destructive text-destructive-foreground",
                },
              },
              defaultVariants: { variant: "default" },
            },
          );
          function h({
            title: e,
            description: t,
            variant: a = "default",
            onClose: s,
          }) {
            let i = {
              default: null,
              destructive: c.A,
              success: d.A,
              info: o.A,
            }[a];
            return (0, r.jsxs)("div", {
              className: `max-w-md rounded-lg border shadow-lg p-4 flex items-start gap-3 animate-slide-up-fade ${{ default: "bg-white border-gray-200", destructive: "bg-red-50 border-red-200 text-red-700", success: "bg-green-50 border-green-200 text-green-700", info: "bg-blue-50 border-blue-200 text-blue-700" }[a]}`,
              role: "alert",
              children: [
                i && (0, r.jsx)(i, { className: "h-5 w-5 flex-shrink-0" }),
                (0, r.jsxs)("div", {
                  className: "flex-1",
                  children: [
                    (0, r.jsx)("h3", { className: "font-medium", children: e }),
                    t &&
                      (0, r.jsx)("p", {
                        className: "text-sm mt-1 opacity-90",
                        children: t,
                      }),
                  ],
                }),
                (0, r.jsx)("button", {
                  onClick: s,
                  className: "flex-shrink-0 rounded-full p-1 hover:bg-gray-100",
                  "aria-label": "Close",
                  children: (0, r.jsx)(l.A, { className: "h-4 w-4" }),
                }),
              ],
            });
          }
          function p({ children: e }) {
            let [t, a] = (0, u.useState)([]),
              s = (0, u.useRef)(0),
              i = (0, u.useCallback)((e) => {
                a((t) => t.filter((t) => t.id !== e));
              }, []),
              n = (0, u.useCallback)(
                (e) => {
                  let t = `toast-${s.current++}`,
                    r = { ...e, id: t };
                  a((e) => [...e, r]),
                    setTimeout(() => {
                      i(t);
                    }, e.duration || 5e3);
                },
                [i],
              ),
              l = (0, u.useMemo)(
                () => ({ toast: n, toasts: t, removeToast: i }),
                [n, t, i],
              );
            return (0, r.jsxs)(y.Provider, {
              value: l,
              children: [e, (0, r.jsx)(v, {})],
            });
          }
          function g() {
            let e = (0, u.useContext)(y);
            if (!e)
              throw Error("useToast must be used within a CustomToastProvider");
            return e;
          }
          function v() {
            let { toasts: e, removeToast: t } = g();
            return (0, r.jsx)("div", {
              className: "fixed bottom-0 right-0 p-4 space-y-2 z-50",
              children: e.map((e) =>
                (0, r.jsx)(h, { ...e, onClose: () => t(e.id) }, e.id),
              ),
            });
          }
          (f().forwardRef(({ className: e, variant: t, ...a }, s) =>
            (0, r.jsx)(i.bL, {
              ref: s,
              className: (0, m.cn)(w({ variant: t }), e),
              ...a,
            }),
          ).displayName = i.bL.displayName),
            (f().forwardRef(({ className: e, ...t }, a) =>
              (0, r.jsx)(i.rc, {
                ref: a,
                className: (0, m.cn)(
                  "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
                  e,
                ),
                ...t,
              }),
            ).displayName = i.rc.displayName),
            (f().forwardRef(({ className: e, ...t }, a) =>
              (0, r.jsx)(i.bm, {
                ref: a,
                className: (0, m.cn)(
                  "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
                  e,
                ),
                "toast-close": "",
                ...t,
                children: (0, r.jsx)(l.A, { className: "h-4 w-4" }),
              }),
            ).displayName = i.bm.displayName),
            (f().forwardRef(({ className: e, ...t }, a) =>
              (0, r.jsx)(i.hE, {
                ref: a,
                className: (0, m.cn)("text-sm font-semibold", e),
                ...t,
              }),
            ).displayName = i.hE.displayName),
            (f().forwardRef(({ className: e, ...t }, a) =>
              (0, r.jsx)(i.VY, {
                ref: a,
                className: (0, m.cn)("text-sm opacity-90", e),
                ...t,
              }),
            ).displayName = i.VY.displayName),
            s();
        } catch (e) {
          s(e);
        }
      });
    },
    87826: (e, t, a) => {
      a.a(e, async (e, s) => {
        try {
          a.d(t, { S: () => f, k: () => o });
          var r = a(61268),
            i = a(89882),
            n = a(84205),
            l = a(87216),
            c = a(32367),
            d = e([l]);
          l = (d.then ? (await d)() : d)[0];
          let u = (0, n.createContext)(void 0);
          function o({ children: e }) {
            let [t, a] = (0, n.useState)([]),
              [s, d] = (0, n.useState)(null),
              [o, f] = (0, n.useState)([]),
              [m, x] = (0, n.useState)(!1),
              [h, p] = (0, n.useState)(null),
              g = (0, i.useRouter)(),
              { toast: v } = (0, l.dj)(),
              y = (0, c.AG)(),
              w = async (e) => {
                try {
                  x(!0), p(null);
                  let { data: t, error: a } = await y
                    .from("artifacts")
                    .select("*")
                    .eq("id", e)
                    .single();
                  if (a) throw a;
                  d(t);
                  let { data: s, error: r } = await y
                    .from("artifact_messages")
                    .select("*")
                    .eq("artifact_id", e)
                    .order("created_at", { ascending: !0 });
                  if (r) throw r;
                  f(s || []);
                } catch (e) {
                  console.error("Error fetching artifact:", e),
                    p("Failed to fetch artifact");
                } finally {
                  x(!1);
                }
              },
              b = async (e, t, a, s) => {
                try {
                  x(!0), p(null);
                  let { data: r } = await y.auth.getUser();
                  if (!r?.user) throw Error("User not authenticated");
                  let i = {
                      title: e,
                      type: t,
                      content: a,
                      user_id: r.user.id,
                      chat_id: s,
                      visibility: "private",
                    },
                    { data: n, error: l } = await y
                      .from("artifacts")
                      .insert(i)
                      .select()
                      .single();
                  if (l) throw l;
                  return (
                    v({
                      title: "Artifact created",
                      description: `${e} has been created successfully`,
                      variant: "success",
                    }),
                    n
                  );
                } catch (t) {
                  let e = "Failed to create artifact";
                  throw (
                    (p(e),
                    console.error(t),
                    v({
                      title: "Error",
                      description: e,
                      variant: "destructive",
                    }),
                    t)
                  );
                } finally {
                  x(!1);
                }
              },
              j = async (e, t) => {
                try {
                  x(!0), p(null);
                  let { error: a } = await y
                    .from("artifacts")
                    .update({ ...t, updated_at: new Date().toISOString() })
                    .eq("id", e);
                  if (a) throw a;
                  v({
                    title: "Artifact updated",
                    description: "Your changes have been saved",
                    variant: "success",
                  });
                } catch (t) {
                  let e = "Failed to update artifact";
                  p(e),
                    console.error(t),
                    v({
                      title: "Error",
                      description: e,
                      variant: "destructive",
                    });
                } finally {
                  x(!1);
                }
              },
              N = async (e) => {
                try {
                  x(!0), p(null);
                  let { error: t } = await y
                    .from("artifacts")
                    .delete()
                    .eq("id", e);
                  if (t) throw t;
                  s?.id === e && (d(null), g.push("/artifacts")),
                    v({
                      title: "Artifact deleted",
                      description: "The artifact has been removed",
                      variant: "success",
                    });
                } catch (t) {
                  let e = "Failed to delete artifact";
                  p(e),
                    console.error(t),
                    v({
                      title: "Error",
                      description: e,
                      variant: "destructive",
                    });
                } finally {
                  x(!1);
                }
              },
              k = async (e, t, a) => {
                try {
                  x(!0), p(null);
                  let { error: s } = await y
                    .from("artifact_messages")
                    .insert({ artifact_id: e, content: t, role: a });
                  if (s) throw s;
                  await w(e);
                } catch (e) {
                  p("Failed to add message"), console.error(e);
                } finally {
                  x(!1);
                }
              },
              C = async (e, t) => {
                try {
                  x(!0), p(null);
                  let { error: a } = await y
                    .from("artifacts")
                    .update({ visibility: t })
                    .eq("id", e);
                  if (a) throw a;
                  v({
                    title: "Visibility updated",
                    description: `Artifact is now ${t}`,
                    variant: "success",
                  });
                } catch (t) {
                  let e = "Failed to update visibility";
                  p(e),
                    console.error(t),
                    v({
                      title: "Error",
                      description: e,
                      variant: "destructive",
                    });
                } finally {
                  x(!1);
                }
              };
            return (0, r.jsx)(u.Provider, {
              value: {
                artifacts: t,
                currentArtifact: s,
                artifactMessages: o,
                isLoading: m,
                error: h,
                createArtifact: b,
                updateArtifact: j,
                deleteArtifact: N,
                getArtifact: w,
                addArtifactMessage: k,
                updateArtifactVisibility: C,
              },
              children: e,
            });
          }
          let f = () => {
            let e = (0, n.useContext)(u);
            if (void 0 === e)
              throw Error(
                "useArtifact must be used within an ArtifactProvider",
              );
            return e;
          };
          s();
        } catch (e) {
          s(e);
        }
      });
    },
  });
//# sourceMappingURL=8945.js.map
