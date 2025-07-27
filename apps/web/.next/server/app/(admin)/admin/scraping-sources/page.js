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
    r = new e.Error().stack;
  r &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[r] = "f06849e6-373d-490e-8bbe-f1c76a632b0e"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-f06849e6-373d-490e-8bbe-f1c76a632b0e"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 2984),
    (e.ids = [2984]),
    (e.modules = {
      278: (e, r, t) => {
        "use strict";
        t.d(r, { bL: () => w, zi: () => N });
        var s = t(84205),
          a = t(28777),
          n = t(71604),
          i = t(18047),
          o = t(48705),
          l = t(67155),
          d = t(91557),
          c = t(78593),
          u = t(61268),
          p = "Switch",
          [h, x] = (0, i.A)(p),
          [m, f] = h(p),
          g = s.forwardRef((e, r) => {
            let {
                __scopeSwitch: t,
                name: i,
                checked: l,
                defaultChecked: d,
                required: h,
                disabled: x,
                value: f = "on",
                onCheckedChange: g,
                form: j,
                ...v
              } = e,
              [w, N] = s.useState(null),
              C = (0, n.s)(r, (e) => N(e)),
              k = s.useRef(!1),
              S = !w || j || !!w.closest("form"),
              [A, E] = (0, o.i)({
                prop: l,
                defaultProp: d ?? !1,
                onChange: g,
                caller: p,
              });
            return (0, u.jsxs)(m, {
              scope: t,
              checked: A,
              disabled: x,
              children: [
                (0, u.jsx)(c.sG.button, {
                  type: "button",
                  role: "switch",
                  "aria-checked": A,
                  "aria-required": h,
                  "data-state": y(A),
                  "data-disabled": x ? "" : void 0,
                  disabled: x,
                  value: f,
                  ...v,
                  ref: C,
                  onClick: (0, a.m)(e.onClick, (e) => {
                    E((e) => !e),
                      S &&
                        ((k.current = e.isPropagationStopped()),
                        k.current || e.stopPropagation());
                  }),
                }),
                S &&
                  (0, u.jsx)(b, {
                    control: w,
                    bubbles: !k.current,
                    name: i,
                    value: f,
                    checked: A,
                    required: h,
                    disabled: x,
                    form: j,
                    style: { transform: "translateX(-100%)" },
                  }),
              ],
            });
          });
        g.displayName = p;
        var j = "SwitchThumb",
          v = s.forwardRef((e, r) => {
            let { __scopeSwitch: t, ...s } = e,
              a = f(j, t);
            return (0, u.jsx)(c.sG.span, {
              "data-state": y(a.checked),
              "data-disabled": a.disabled ? "" : void 0,
              ...s,
              ref: r,
            });
          });
        v.displayName = j;
        var b = s.forwardRef(
          (
            { __scopeSwitch: e, control: r, checked: t, bubbles: a = !0, ...i },
            o,
          ) => {
            let c = s.useRef(null),
              p = (0, n.s)(c, o),
              h = (0, l.Z)(t),
              x = (0, d.X)(r);
            return (
              s.useEffect(() => {
                let e = c.current;
                if (!e) return;
                let r = Object.getOwnPropertyDescriptor(
                  window.HTMLInputElement.prototype,
                  "checked",
                ).set;
                if (h !== t && r) {
                  let s = new Event("click", { bubbles: a });
                  r.call(e, t), e.dispatchEvent(s);
                }
              }, [h, t, a]),
              (0, u.jsx)("input", {
                type: "checkbox",
                "aria-hidden": !0,
                defaultChecked: t,
                ...i,
                tabIndex: -1,
                ref: p,
                style: {
                  ...i.style,
                  ...x,
                  position: "absolute",
                  pointerEvents: "none",
                  opacity: 0,
                  margin: 0,
                },
              })
            );
          },
        );
        function y(e) {
          return e ? "checked" : "unchecked";
        }
        b.displayName = "SwitchBubbleInput";
        var w = g,
          N = v;
      },
      1278: (e, r, t) => {
        "use strict";
        t.d(r, { Qg: () => i, bL: () => l });
        var s = t(84205),
          a = t(56558),
          n = t(61268),
          i = Object.freeze({
            position: "absolute",
            border: 0,
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            wordWrap: "normal",
          }),
          o = s.forwardRef((e, r) =>
            (0, n.jsx)(a.sG.span, {
              ...e,
              ref: r,
              style: { ...i, ...e.style },
            }),
          );
        o.displayName = "VisuallyHidden";
        var l = o;
      },
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      5451: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              BT: () => p,
              Wu: () => h,
              ZB: () => u,
              Zp: () => d,
              aR: () => c,
              wL: () => x,
            });
            var a = t(61268),
              n = t(55728),
              i = t(84205),
              o = t(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let d = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)(n.P.div, {
                ref: t,
                className: (0, o.cn)(
                  "rounded-lg border bg-card text-card-foreground shadow-sm",
                  e,
                ),
                whileHover: {
                  scale: 1.03,
                  boxShadow:
                    "0px 7px 25px rgba(0,0,0,0.08), 0px 3px 10px rgba(0,0,0,0.04)",
                },
                transition: { type: "spring", stiffness: 300, damping: 20 },
                ...r,
              }),
            );
            d.displayName = "Card";
            let c = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, o.cn)("flex flex-col space-y-1.5 p-6", e),
                ...r,
              }),
            );
            c.displayName = "CardHeader";
            let u = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("h3", {
                ref: t,
                className: (0, o.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  e,
                ),
                ...r,
              }),
            );
            u.displayName = "CardTitle";
            let p = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("p", {
                ref: t,
                className: (0, o.cn)("text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            p.displayName = "CardDescription";
            let h = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, o.cn)("p-6 pt-0", e),
                ...r,
              }),
            );
            h.displayName = "CardContent";
            let x = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("div", {
                ref: t,
                className: (0, o.cn)("flex items-center p-6 pt-0", e),
                ...r,
              }),
            );
            (x.displayName = "CardFooter"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      7839: (e, r, t) => {
        "use strict";
        t.d(r, { jH: () => n });
        var s = t(84205);
        t(61268);
        var a = s.createContext(void 0);
        function n(e) {
          let r = s.useContext(a);
          return e || r || "ltr";
        }
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      13909: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { d: () => d });
            var a = t(61268),
              n = t(278),
              i = t(84205),
              o = t(15942),
              l = e([o]);
            o = (l.then ? (await l)() : l)[0];
            let d = i.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)(n.bL, {
                className: (0, o.cn)(
                  "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
                  e,
                ),
                ...r,
                ref: t,
                children: (0, a.jsx)(n.zi, {
                  className: (0, o.cn)(
                    "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
                  ),
                }),
              }),
            );
            (d.displayName = n.bL.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      15127: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("Plus", [
          ["path", { d: "M5 12h14", key: "1ays0h" }],
          ["path", { d: "M12 5v14", key: "s699le" }],
        ]);
      },
      16979: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { J: () => l });
            var a = t(61268),
              n = t(30595);
            t(84205);
            var i = t(15942),
              o = e([i]);
            function l({ className: e, ...r }) {
              return (0, a.jsx)(n.b, {
                "data-slot": "label",
                className: (0, i.cn)(
                  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                  e,
                ),
                ...r,
              });
            }
            (i = (o.then ? (await o)() : o)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21565: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.r(r), t.d(r, { default: () => L });
            var a = t(61268),
              n = t(97052),
              i = t(15127),
              o = t(99358),
              l = t(24131),
              d = t(16498),
              c = t(80069),
              u = t(82122),
              p = t(34961),
              h = t(82985),
              x = t(14677),
              m = t(36789),
              f = t(53855),
              g = t(69394),
              j = t(89882),
              v = t(84205),
              b = t(36322),
              y = t(36352),
              w = t(73638),
              N = t(46532),
              C = t(28909),
              k = t(5451),
              S = t(30205),
              A = t(93336),
              E = t(86183),
              R = t(78337),
              q = t(95957),
              T = t(94812),
              _ = t(13909),
              I = t(77001),
              z = t(37787),
              M = t(15090),
              F = e([w, N, C, k, S, A, E, R, q, T, _, I, z]);
            [w, N, C, k, S, A, E, R, q, T, _, I, z] = F.then ? (await F)() : F;
            let P = y.Ik({
                name: y
                  .Yj()
                  .min(2, { message: "Name must be at least 2 characters" }),
                url: y.Yj().url({ message: "Please enter a valid URL" }),
                category: y.k5([
                  "government",
                  "legal",
                  "news",
                  "blog",
                  "forum",
                  "other",
                ]),
                description: y.Yj().optional(),
                scrape_frequency: y.Yj(),
                is_active: y.zM().default(!0),
              }),
              D = y.Ik({
                score: y.ai().min(0).max(100),
                notes: y.Yj().optional(),
              });
            function L() {
              (0, j.useRouter)();
              let { toast: e } = (0, M.d)(),
                [r, t] = (0, v.useState)([]),
                [s, y] = (0, v.useState)(!0),
                [F, L] = (0, v.useState)("all"),
                [V, B] = (0, v.useState)(!1),
                [G, $] = (0, v.useState)(!1),
                [H, J] = (0, v.useState)(!1),
                [O, U] = (0, v.useState)(null),
                [W, Z] = (0, v.useState)(!1),
                Y = (0, b.mN)({
                  resolver: (0, n.u)(P),
                  defaultValues: {
                    name: "",
                    url: "",
                    category: "other",
                    description: "",
                    scrape_frequency: "1 day",
                    is_active: !0,
                  },
                }),
                K = (0, b.mN)({
                  resolver: (0, n.u)(D),
                  defaultValues: { score: 50, notes: "" },
                }),
                X = (0, v.useCallback)(async () => {
                  y(!0);
                  try {
                    let e = await fetch("/api/admin/scraping-sources");
                    if (!e.ok) throw Error("Failed to fetch sources");
                    let r = await e.json();
                    t(r);
                  } catch (r) {
                    console.error("Error fetching sources:", r),
                      e({
                        title: "Error",
                        description: "Failed to fetch scraping sources",
                        variant: "destructive",
                      });
                  } finally {
                    y(!1);
                  }
                }, []),
                Q = async (r) => {
                  try {
                    let t = O
                        ? `/api/admin/scraping-sources/${O.id}`
                        : "/api/admin/scraping-sources",
                      s = O ? "PUT" : "POST";
                    if (
                      !(
                        await fetch(t, {
                          method: s,
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(r),
                        })
                      ).ok
                    )
                      throw Error(
                        `Failed to ${O ? "update" : "create"} source`,
                      );
                    X(),
                      e({
                        title: "Success",
                        description: `Source ${O ? "updated" : "created"} successfully`,
                      }),
                      B(!1),
                      $(!1);
                  } catch (r) {
                    console.error("Error saving source:", r),
                      e({
                        title: "Error",
                        description: `Failed to ${O ? "update" : "create"} source`,
                        variant: "destructive",
                      });
                  }
                },
                ee = async (r) => {
                  try {
                    if (
                      !(
                        await fetch(`/api/admin/scraping-sources/${r}`, {
                          method: "DELETE",
                        })
                      ).ok
                    )
                      throw Error("Failed to delete source");
                    X(),
                      e({
                        title: "Success",
                        description: "Source deleted successfully",
                      });
                  } catch (r) {
                    console.error("Error deleting source:", r),
                      e({
                        title: "Error",
                        description: "Failed to delete source",
                        variant: "destructive",
                      });
                  }
                },
                er = async (r) => {
                  try {
                    let t = await fetch("/api/scheduled-scraping", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ sourceIds: [r] }),
                    });
                    if (!t.ok) throw Error("Failed to trigger scraping");
                    await t.json(),
                      e({
                        title: "Scraping initiated",
                        description:
                          "The source will be scraped in the background",
                      }),
                      setTimeout(X, 5e3);
                  } catch (r) {
                    console.error("Error triggering scraping:", r),
                      e({
                        title: "Error",
                        description: "Failed to trigger scraping",
                        variant: "destructive",
                      });
                  }
                },
                et = async (r) => {
                  if (O) {
                    Z(!0);
                    try {
                      if (
                        !(
                          await fetch(
                            `/api/admin/scraping-sources/${O.id}/validate`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(r),
                            },
                          )
                        ).ok
                      )
                        throw Error("Failed to validate source");
                      X(),
                        e({
                          title: "Validation submitted",
                          description: "Your validation has been recorded",
                        }),
                        J(!1),
                        K.reset();
                    } catch (r) {
                      console.error("Error validating source:", r),
                        e({
                          title: "Error",
                          description: "Failed to submit validation",
                          variant: "destructive",
                        });
                    } finally {
                      Z(!1);
                    }
                  }
                },
                es = "all" === F ? r : r.filter((e) => e.category === F);
              return (0, a.jsxs)("div", {
                className: "container mx-auto py-6",
                children: [
                  (0, a.jsxs)("div", {
                    className: "flex justify-between items-center mb-6",
                    children: [
                      (0, a.jsxs)("div", {
                        children: [
                          (0, a.jsx)("h1", {
                            className: "text-3xl font-bold",
                            children: "Web Scraping Sources",
                          }),
                          (0, a.jsx)("p", {
                            className: "text-muted-foreground",
                            children:
                              "Manage the sources for scheduled web scraping.",
                          }),
                        ],
                      }),
                      (0, a.jsxs)(S.lG, {
                        open: V,
                        onOpenChange: B,
                        children: [
                          (0, a.jsx)(S.zM, {
                            asChild: !0,
                            children: (0, a.jsxs)(C.$, {
                              children: [
                                (0, a.jsx)(i.A, { className: "mr-2 h-4 w-4" }),
                                "Add Source",
                              ],
                            }),
                          }),
                          (0, a.jsxs)(S.Cf, {
                            className: "sm:max-w-[425px]",
                            children: [
                              (0, a.jsxs)(S.c7, {
                                children: [
                                  (0, a.jsx)(S.L3, {
                                    children: "Add New Scraping Source",
                                  }),
                                  (0, a.jsx)(S.rr, {
                                    children:
                                      "Add a new website for scheduled scraping.",
                                  }),
                                ],
                              }),
                              (0, a.jsx)(E.lV, {
                                ...Y,
                                children: (0, a.jsxs)("form", {
                                  onSubmit: Y.handleSubmit(Q),
                                  className: "space-y-4 py-4",
                                  children: [
                                    (0, a.jsx)(E.zB, {
                                      control: Y.control,
                                      name: "name",
                                      render: ({ field: e }) =>
                                        (0, a.jsxs)(E.eI, {
                                          children: [
                                            (0, a.jsx)(E.lR, {
                                              children: "Name",
                                            }),
                                            (0, a.jsx)(E.MJ, {
                                              children: (0, a.jsx)(R.p, {
                                                placeholder:
                                                  "Canadian Immigration Official Site",
                                                ...e,
                                              }),
                                            }),
                                            (0, a.jsx)(E.C5, {}),
                                          ],
                                        }),
                                    }),
                                    (0, a.jsx)(E.zB, {
                                      control: Y.control,
                                      name: "url",
                                      render: ({ field: e }) =>
                                        (0, a.jsxs)(E.eI, {
                                          children: [
                                            (0, a.jsx)(E.lR, {
                                              children: "URL",
                                            }),
                                            (0, a.jsx)(E.MJ, {
                                              children: (0, a.jsx)(R.p, {
                                                placeholder:
                                                  "https://www.example.com",
                                                ...e,
                                              }),
                                            }),
                                            (0, a.jsx)(E.C5, {}),
                                          ],
                                        }),
                                    }),
                                    (0, a.jsx)(E.zB, {
                                      control: Y.control,
                                      name: "category",
                                      render: ({ field: e }) =>
                                        (0, a.jsxs)(E.eI, {
                                          children: [
                                            (0, a.jsx)(E.lR, {
                                              children: "Category",
                                            }),
                                            (0, a.jsxs)(q.l6, {
                                              onValueChange: e.onChange,
                                              defaultValue: e.value,
                                              children: [
                                                (0, a.jsx)(E.MJ, {
                                                  children: (0, a.jsx)(q.bq, {
                                                    children: (0, a.jsx)(q.yv, {
                                                      placeholder:
                                                        "Select a category",
                                                    }),
                                                  }),
                                                }),
                                                (0, a.jsxs)(q.gC, {
                                                  children: [
                                                    (0, a.jsx)(q.eb, {
                                                      value: "government",
                                                      children: "Government",
                                                    }),
                                                    (0, a.jsx)(q.eb, {
                                                      value: "legal",
                                                      children: "Legal",
                                                    }),
                                                    (0, a.jsx)(q.eb, {
                                                      value: "news",
                                                      children: "News",
                                                    }),
                                                    (0, a.jsx)(q.eb, {
                                                      value: "blog",
                                                      children: "Blog",
                                                    }),
                                                    (0, a.jsx)(q.eb, {
                                                      value: "forum",
                                                      children: "Forum",
                                                    }),
                                                    (0, a.jsx)(q.eb, {
                                                      value: "other",
                                                      children: "Other",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, a.jsx)(E.C5, {}),
                                          ],
                                        }),
                                    }),
                                    (0, a.jsx)(E.zB, {
                                      control: Y.control,
                                      name: "description",
                                      render: ({ field: e }) =>
                                        (0, a.jsxs)(E.eI, {
                                          children: [
                                            (0, a.jsx)(E.lR, {
                                              children: "Description",
                                            }),
                                            (0, a.jsx)(E.MJ, {
                                              children: (0, a.jsx)(z.T, {
                                                placeholder:
                                                  "Description of this source...",
                                                ...e,
                                                value: e.value || "",
                                              }),
                                            }),
                                            (0, a.jsx)(E.C5, {}),
                                          ],
                                        }),
                                    }),
                                    (0, a.jsx)(E.zB, {
                                      control: Y.control,
                                      name: "scrape_frequency",
                                      render: ({ field: e }) =>
                                        (0, a.jsxs)(E.eI, {
                                          children: [
                                            (0, a.jsx)(E.lR, {
                                              children: "Scrape Frequency",
                                            }),
                                            (0, a.jsxs)(q.l6, {
                                              onValueChange: e.onChange,
                                              defaultValue: e.value,
                                              children: [
                                                (0, a.jsx)(E.MJ, {
                                                  children: (0, a.jsx)(q.bq, {
                                                    children: (0, a.jsx)(q.yv, {
                                                      placeholder:
                                                        "Select frequency",
                                                    }),
                                                  }),
                                                }),
                                                (0, a.jsxs)(q.gC, {
                                                  children: [
                                                    (0, a.jsx)(q.eb, {
                                                      value: "1 hour",
                                                      children: "Every hour",
                                                    }),
                                                    (0, a.jsx)(q.eb, {
                                                      value: "6 hours",
                                                      children: "Every 6 hours",
                                                    }),
                                                    (0, a.jsx)(q.eb, {
                                                      value: "12 hours",
                                                      children:
                                                        "Every 12 hours",
                                                    }),
                                                    (0, a.jsx)(q.eb, {
                                                      value: "1 day",
                                                      children: "Daily",
                                                    }),
                                                    (0, a.jsx)(q.eb, {
                                                      value: "3 days",
                                                      children: "Every 3 days",
                                                    }),
                                                    (0, a.jsx)(q.eb, {
                                                      value: "1 week",
                                                      children: "Weekly",
                                                    }),
                                                    (0, a.jsx)(q.eb, {
                                                      value: "2 weeks",
                                                      children: "Every 2 weeks",
                                                    }),
                                                    (0, a.jsx)(q.eb, {
                                                      value: "1 month",
                                                      children: "Monthly",
                                                    }),
                                                    (0, a.jsx)(q.eb, {
                                                      value: "manual",
                                                      children: "Manual only",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, a.jsx)(E.C5, {}),
                                          ],
                                        }),
                                    }),
                                    (0, a.jsx)(E.zB, {
                                      control: Y.control,
                                      name: "is_active",
                                      render: ({ field: e }) =>
                                        (0, a.jsxs)(E.eI, {
                                          className:
                                            "flex flex-row items-center justify-between rounded-lg border p-3",
                                          children: [
                                            (0, a.jsxs)("div", {
                                              className: "space-y-0.5",
                                              children: [
                                                (0, a.jsx)(E.lR, {
                                                  children: "Active",
                                                }),
                                                (0, a.jsx)("p", {
                                                  className:
                                                    "text-sm text-muted-foreground",
                                                  children:
                                                    "Should this source be included in scheduled scraping?",
                                                }),
                                              ],
                                            }),
                                            (0, a.jsx)(E.MJ, {
                                              children: (0, a.jsx)(_.d, {
                                                checked: e.value,
                                                onCheckedChange: e.onChange,
                                              }),
                                            }),
                                          ],
                                        }),
                                    }),
                                    (0, a.jsxs)(S.Es, {
                                      children: [
                                        (0, a.jsx)(C.$, {
                                          type: "button",
                                          variant: "outline",
                                          onClick: () => B(!1),
                                          children: "Cancel",
                                        }),
                                        (0, a.jsx)(C.$, {
                                          type: "submit",
                                          children: "Save",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)(I.Tabs, {
                    defaultValue: "all",
                    className: "w-full",
                    onValueChange: L,
                    children: [
                      (0, a.jsxs)(I.TabsList, {
                        className: "mb-4",
                        children: [
                          (0, a.jsx)(I.TabsTrigger, {
                            value: "all",
                            children: "All Sources",
                          }),
                          (0, a.jsx)(I.TabsTrigger, {
                            value: "government",
                            children: "Government",
                          }),
                          (0, a.jsx)(I.TabsTrigger, {
                            value: "legal",
                            children: "Legal",
                          }),
                          (0, a.jsx)(I.TabsTrigger, {
                            value: "news",
                            children: "News",
                          }),
                          (0, a.jsx)(I.TabsTrigger, {
                            value: "blog",
                            children: "Blogs",
                          }),
                          (0, a.jsx)(I.TabsTrigger, {
                            value: "forum",
                            children: "Forums",
                          }),
                          (0, a.jsx)(I.TabsTrigger, {
                            value: "other",
                            children: "Other",
                          }),
                        ],
                      }),
                      (0, a.jsx)(I.TabsContent, {
                        value: F,
                        className: "space-y-4",
                        children: s
                          ? (0, a.jsx)("div", {
                              className:
                                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                              children: Array(6)
                                .fill(0)
                                .map((e, r) =>
                                  (0, a.jsxs)(
                                    k.Zp,
                                    {
                                      className: "overflow-hidden",
                                      children: [
                                        (0, a.jsxs)(k.aR, {
                                          className: "pb-2",
                                          children: [
                                            (0, a.jsx)(T.E, {
                                              className: "h-6 w-3/4 mb-2",
                                            }),
                                            (0, a.jsx)(T.E, {
                                              className: "h-4 w-full",
                                            }),
                                          ],
                                        }),
                                        (0, a.jsxs)(k.Wu, {
                                          children: [
                                            (0, a.jsx)(T.E, {
                                              className: "h-4 w-full mb-2",
                                            }),
                                            (0, a.jsx)(T.E, {
                                              className: "h-4 w-3/4",
                                            }),
                                          ],
                                        }),
                                        (0, a.jsxs)(k.wL, {
                                          className: "flex justify-between",
                                          children: [
                                            (0, a.jsx)(T.E, {
                                              className: "h-9 w-20",
                                            }),
                                            (0, a.jsx)(T.E, {
                                              className: "h-9 w-9 rounded-full",
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    r,
                                  ),
                                ),
                            })
                          : 0 === es.length
                            ? (0, a.jsxs)("div", {
                                className:
                                  "flex flex-col items-center justify-center p-8 text-center",
                                children: [
                                  (0, a.jsx)(o.A, {
                                    className:
                                      "h-12 w-12 text-muted-foreground mb-4",
                                  }),
                                  (0, a.jsx)("h3", {
                                    className: "text-lg font-medium",
                                    children: "No sources found",
                                  }),
                                  (0, a.jsx)("p", {
                                    className:
                                      "text-muted-foreground mt-1 mb-4",
                                    children:
                                      "all" === F
                                        ? "You haven't added any scraping sources yet."
                                        : `No ${F} sources found.`,
                                  }),
                                  (0, a.jsxs)(C.$, {
                                    onClick: () => B(!0),
                                    children: [
                                      (0, a.jsx)(i.A, {
                                        className: "mr-2 h-4 w-4",
                                      }),
                                      "Add Your First Source",
                                    ],
                                  }),
                                ],
                              })
                            : (0, a.jsx)("div", {
                                className:
                                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                                children: es.map((e) =>
                                  (0, a.jsxs)(
                                    k.Zp,
                                    {
                                      className: "overflow-hidden",
                                      children: [
                                        (0, a.jsxs)(k.aR, {
                                          className: "pb-2",
                                          children: [
                                            (0, a.jsxs)("div", {
                                              className:
                                                "flex justify-between items-start",
                                              children: [
                                                (0, a.jsx)(k.ZB, {
                                                  className: "text-lg",
                                                  children: e.name,
                                                }),
                                                (0, a.jsxs)(A.rI, {
                                                  children: [
                                                    (0, a.jsx)(A.ty, {
                                                      asChild: !0,
                                                      children: (0, a.jsx)(
                                                        C.$,
                                                        {
                                                          variant: "ghost",
                                                          size: "icon",
                                                          className: "h-8 w-8",
                                                          children: (0, a.jsx)(
                                                            l.A,
                                                            {
                                                              className:
                                                                "h-4 w-4",
                                                            },
                                                          ),
                                                        },
                                                      ),
                                                    }),
                                                    (0, a.jsxs)(A.SQ, {
                                                      align: "end",
                                                      children: [
                                                        (0, a.jsxs)(A._2, {
                                                          onClick: () => {
                                                            U(e), $(!0);
                                                          },
                                                          children: [
                                                            (0, a.jsx)(d.A, {
                                                              className:
                                                                "mr-2 h-4 w-4",
                                                            }),
                                                            "Edit",
                                                          ],
                                                        }),
                                                        (0, a.jsxs)(A._2, {
                                                          onClick: () => {
                                                            window.open(
                                                              e.url,
                                                              "_blank",
                                                            );
                                                          },
                                                          children: [
                                                            (0, a.jsx)(c.A, {
                                                              className:
                                                                "mr-2 h-4 w-4",
                                                            }),
                                                            "Visit Source",
                                                          ],
                                                        }),
                                                        (0, a.jsxs)(A._2, {
                                                          onClick: () => {
                                                            U(e), J(!0);
                                                          },
                                                          children: [
                                                            (0, a.jsx)(u.A, {
                                                              className:
                                                                "mr-2 h-4 w-4",
                                                            }),
                                                            "Validate",
                                                          ],
                                                        }),
                                                        (0, a.jsxs)(A._2, {
                                                          onClick: () =>
                                                            er(e.id),
                                                          children: [
                                                            (0, a.jsx)(p.A, {
                                                              className:
                                                                "mr-2 h-4 w-4",
                                                            }),
                                                            "Scrape Now",
                                                          ],
                                                        }),
                                                        (0, a.jsx)(A.mB, {}),
                                                        (0, a.jsxs)(w.Lt, {
                                                          children: [
                                                            (0, a.jsx)(w.tv, {
                                                              asChild: !0,
                                                              children: (0,
                                                              a.jsxs)(A._2, {
                                                                onSelect: (e) =>
                                                                  e.preventDefault(),
                                                                children: [
                                                                  (0, a.jsx)(
                                                                    h.A,
                                                                    {
                                                                      className:
                                                                        "mr-2 h-4 w-4",
                                                                    },
                                                                  ),
                                                                  "Delete",
                                                                ],
                                                              }),
                                                            }),
                                                            (0, a.jsxs)(w.EO, {
                                                              children: [
                                                                (0, a.jsxs)(
                                                                  w.wd,
                                                                  {
                                                                    children: [
                                                                      (0,
                                                                      a.jsx)(
                                                                        w.r7,
                                                                        {
                                                                          children:
                                                                            "Are you absolutely sure?",
                                                                        },
                                                                      ),
                                                                      (0,
                                                                      a.jsxs)(
                                                                        w.$v,
                                                                        {
                                                                          children:
                                                                            [
                                                                              'This will permanently delete the scraping source "',
                                                                              e.name,
                                                                              '" and all associated validation records.',
                                                                            ],
                                                                        },
                                                                      ),
                                                                    ],
                                                                  },
                                                                ),
                                                                (0, a.jsxs)(
                                                                  w.ck,
                                                                  {
                                                                    children: [
                                                                      (0,
                                                                      a.jsx)(
                                                                        w.Zr,
                                                                        {
                                                                          children:
                                                                            "Cancel",
                                                                        },
                                                                      ),
                                                                      (0,
                                                                      a.jsx)(
                                                                        w.Rx,
                                                                        {
                                                                          onClick:
                                                                            () =>
                                                                              ee(
                                                                                e.id,
                                                                              ),
                                                                          className:
                                                                            "bg-destructive text-destructive-foreground",
                                                                          children:
                                                                            "Delete",
                                                                        },
                                                                      ),
                                                                    ],
                                                                  },
                                                                ),
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
                                            (0, a.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                (0, a.jsx)(N.E, {
                                                  variant: e.is_active
                                                    ? "default"
                                                    : "secondary",
                                                  children: e.is_active
                                                    ? "Active"
                                                    : "Inactive",
                                                }),
                                                (0, a.jsx)(N.E, {
                                                  variant: "outline",
                                                  className: "capitalize",
                                                  children: e.category,
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, a.jsxs)(k.Wu, {
                                          className: "pb-2",
                                          children: [
                                            (0, a.jsx)("p", {
                                              className:
                                                "text-sm text-muted-foreground truncate",
                                              children: (0, a.jsx)("a", {
                                                href: e.url,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "hover:underline",
                                                children: e.url,
                                              }),
                                            }),
                                            e.description &&
                                              (0, a.jsx)("p", {
                                                className:
                                                  "text-sm mt-2 line-clamp-2",
                                                children: e.description,
                                              }),
                                          ],
                                        }),
                                        (0, a.jsxs)(k.wL, {
                                          className:
                                            "flex justify-between pt-2",
                                          children: [
                                            (0, a.jsxs)("div", {
                                              className: "flex flex-col",
                                              children: [
                                                (0, a.jsxs)("div", {
                                                  className:
                                                    "flex items-center gap-1 text-sm text-muted-foreground",
                                                  children: [
                                                    (0, a.jsx)(x.A, {
                                                      className: "h-3 w-3",
                                                    }),
                                                    (0, a.jsx)("span", {
                                                      children: e.last_scraped
                                                        ? new Date(
                                                            e.last_scraped,
                                                          ).toLocaleDateString()
                                                        : "Never scraped",
                                                    }),
                                                  ],
                                                }),
                                                (0, a.jsxs)("div", {
                                                  className:
                                                    "flex items-center gap-1 text-sm text-muted-foreground",
                                                  children: [
                                                    (0, a.jsx)(m.A, {
                                                      className: "h-3 w-3",
                                                    }),
                                                    (0, a.jsx)("span", {
                                                      children:
                                                        "manual" ===
                                                        e.scrape_frequency
                                                          ? "Manual only"
                                                          : `Every ${e.scrape_frequency}`,
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, a.jsx)("div", {
                                              className: "flex items-center",
                                              children: (0, a.jsxs)("div", {
                                                className:
                                                  "flex items-center gap-1 rounded-full px-2 py-1 bg-muted",
                                                title: "Trust Score",
                                                children: [
                                                  (0, a.jsx)(u.A, {
                                                    className: "h-3 w-3",
                                                  }),
                                                  (0, a.jsx)("span", {
                                                    className:
                                                      "text-sm font-medium",
                                                    children: e.trust_score,
                                                  }),
                                                ],
                                              }),
                                            }),
                                          ],
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
                  (0, a.jsx)(S.lG, {
                    open: G,
                    onOpenChange: $,
                    children: (0, a.jsxs)(S.Cf, {
                      className: "sm:max-w-[425px]",
                      children: [
                        (0, a.jsxs)(S.c7, {
                          children: [
                            (0, a.jsx)(S.L3, {
                              children: "Edit Scraping Source",
                            }),
                            (0, a.jsx)(S.rr, {
                              children:
                                "Update the details for this scraping source.",
                            }),
                          ],
                        }),
                        (0, a.jsx)(E.lV, {
                          ...Y,
                          children: (0, a.jsxs)("form", {
                            onSubmit: Y.handleSubmit(Q),
                            className: "space-y-4 py-4",
                            children: [
                              (0, a.jsx)(E.zB, {
                                control: Y.control,
                                name: "name",
                                render: ({ field: e }) =>
                                  (0, a.jsxs)(E.eI, {
                                    children: [
                                      (0, a.jsx)(E.lR, { children: "Name" }),
                                      (0, a.jsx)(E.MJ, {
                                        children: (0, a.jsx)(R.p, { ...e }),
                                      }),
                                      (0, a.jsx)(E.C5, {}),
                                    ],
                                  }),
                              }),
                              (0, a.jsx)(E.zB, {
                                control: Y.control,
                                name: "url",
                                render: ({ field: e }) =>
                                  (0, a.jsxs)(E.eI, {
                                    children: [
                                      (0, a.jsx)(E.lR, { children: "URL" }),
                                      (0, a.jsx)(E.MJ, {
                                        children: (0, a.jsx)(R.p, { ...e }),
                                      }),
                                      (0, a.jsx)(E.C5, {}),
                                    ],
                                  }),
                              }),
                              (0, a.jsx)(E.zB, {
                                control: Y.control,
                                name: "category",
                                render: ({ field: e }) =>
                                  (0, a.jsxs)(E.eI, {
                                    children: [
                                      (0, a.jsx)(E.lR, {
                                        children: "Category",
                                      }),
                                      (0, a.jsxs)(q.l6, {
                                        onValueChange: e.onChange,
                                        value: e.value,
                                        children: [
                                          (0, a.jsx)(E.MJ, {
                                            children: (0, a.jsx)(q.bq, {
                                              children: (0, a.jsx)(q.yv, {
                                                placeholder:
                                                  "Select a category",
                                              }),
                                            }),
                                          }),
                                          (0, a.jsxs)(q.gC, {
                                            children: [
                                              (0, a.jsx)(q.eb, {
                                                value: "government",
                                                children: "Government",
                                              }),
                                              (0, a.jsx)(q.eb, {
                                                value: "legal",
                                                children: "Legal",
                                              }),
                                              (0, a.jsx)(q.eb, {
                                                value: "news",
                                                children: "News",
                                              }),
                                              (0, a.jsx)(q.eb, {
                                                value: "blog",
                                                children: "Blog",
                                              }),
                                              (0, a.jsx)(q.eb, {
                                                value: "forum",
                                                children: "Forum",
                                              }),
                                              (0, a.jsx)(q.eb, {
                                                value: "other",
                                                children: "Other",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, a.jsx)(E.C5, {}),
                                    ],
                                  }),
                              }),
                              (0, a.jsx)(E.zB, {
                                control: Y.control,
                                name: "description",
                                render: ({ field: e }) =>
                                  (0, a.jsxs)(E.eI, {
                                    children: [
                                      (0, a.jsx)(E.lR, {
                                        children: "Description",
                                      }),
                                      (0, a.jsx)(E.MJ, {
                                        children: (0, a.jsx)(z.T, {
                                          ...e,
                                          value: e.value || "",
                                        }),
                                      }),
                                      (0, a.jsx)(E.C5, {}),
                                    ],
                                  }),
                              }),
                              (0, a.jsx)(E.zB, {
                                control: Y.control,
                                name: "scrape_frequency",
                                render: ({ field: e }) =>
                                  (0, a.jsxs)(E.eI, {
                                    children: [
                                      (0, a.jsx)(E.lR, {
                                        children: "Scrape Frequency",
                                      }),
                                      (0, a.jsxs)(q.l6, {
                                        onValueChange: e.onChange,
                                        value: e.value,
                                        children: [
                                          (0, a.jsx)(E.MJ, {
                                            children: (0, a.jsx)(q.bq, {
                                              children: (0, a.jsx)(q.yv, {
                                                placeholder: "Select frequency",
                                              }),
                                            }),
                                          }),
                                          (0, a.jsxs)(q.gC, {
                                            children: [
                                              (0, a.jsx)(q.eb, {
                                                value: "1 hour",
                                                children: "Every hour",
                                              }),
                                              (0, a.jsx)(q.eb, {
                                                value: "6 hours",
                                                children: "Every 6 hours",
                                              }),
                                              (0, a.jsx)(q.eb, {
                                                value: "12 hours",
                                                children: "Every 12 hours",
                                              }),
                                              (0, a.jsx)(q.eb, {
                                                value: "1 day",
                                                children: "Daily",
                                              }),
                                              (0, a.jsx)(q.eb, {
                                                value: "3 days",
                                                children: "Every 3 days",
                                              }),
                                              (0, a.jsx)(q.eb, {
                                                value: "1 week",
                                                children: "Weekly",
                                              }),
                                              (0, a.jsx)(q.eb, {
                                                value: "2 weeks",
                                                children: "Every 2 weeks",
                                              }),
                                              (0, a.jsx)(q.eb, {
                                                value: "1 month",
                                                children: "Monthly",
                                              }),
                                              (0, a.jsx)(q.eb, {
                                                value: "manual",
                                                children: "Manual only",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, a.jsx)(E.C5, {}),
                                    ],
                                  }),
                              }),
                              (0, a.jsx)(E.zB, {
                                control: Y.control,
                                name: "is_active",
                                render: ({ field: e }) =>
                                  (0, a.jsxs)(E.eI, {
                                    className:
                                      "flex flex-row items-center justify-between rounded-lg border p-3",
                                    children: [
                                      (0, a.jsxs)("div", {
                                        className: "space-y-0.5",
                                        children: [
                                          (0, a.jsx)(E.lR, {
                                            children: "Active",
                                          }),
                                          (0, a.jsx)("p", {
                                            className:
                                              "text-sm text-muted-foreground",
                                            children:
                                              "Should this source be included in scheduled scraping?",
                                          }),
                                        ],
                                      }),
                                      (0, a.jsx)(E.MJ, {
                                        children: (0, a.jsx)(_.d, {
                                          checked: e.value,
                                          onCheckedChange: e.onChange,
                                        }),
                                      }),
                                    ],
                                  }),
                              }),
                              (0, a.jsxs)(S.Es, {
                                children: [
                                  (0, a.jsx)(C.$, {
                                    type: "button",
                                    variant: "outline",
                                    onClick: () => $(!1),
                                    children: "Cancel",
                                  }),
                                  (0, a.jsx)(C.$, {
                                    type: "submit",
                                    children: "Save Changes",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
                  (0, a.jsx)(S.lG, {
                    open: H,
                    onOpenChange: J,
                    children: (0, a.jsxs)(S.Cf, {
                      className: "sm:max-w-[425px]",
                      children: [
                        (0, a.jsxs)(S.c7, {
                          children: [
                            (0, a.jsx)(S.L3, { children: "Validate Source" }),
                            (0, a.jsx)(S.rr, {
                              children:
                                "Rate the reliability and quality of this source.",
                            }),
                          ],
                        }),
                        O &&
                          (0, a.jsxs)(a.Fragment, {
                            children: [
                              (0, a.jsxs)("div", {
                                className: "py-4",
                                children: [
                                  (0, a.jsx)("h3", {
                                    className: "font-medium",
                                    children: O.name,
                                  }),
                                  (0, a.jsx)("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: O.url,
                                  }),
                                  (0, a.jsx)("div", {
                                    className: "flex items-center mt-2",
                                    children: (0, a.jsxs)("div", {
                                      className:
                                        "flex items-center gap-1 rounded-full px-2 py-1 bg-muted",
                                      children: [
                                        (0, a.jsx)(u.A, {
                                          className: "h-4 w-4",
                                        }),
                                        (0, a.jsxs)("span", {
                                          className: "text-sm font-medium",
                                          children: [
                                            "Current score: ",
                                            O.trust_score,
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                              (0, a.jsx)(E.lV, {
                                ...K,
                                children: (0, a.jsxs)("form", {
                                  onSubmit: K.handleSubmit(et),
                                  className: "space-y-4",
                                  children: [
                                    (0, a.jsx)(E.zB, {
                                      control: K.control,
                                      name: "score",
                                      render: ({ field: e }) =>
                                        (0, a.jsxs)(E.eI, {
                                          children: [
                                            (0, a.jsx)(E.lR, {
                                              children: "Trust Score (0-100)",
                                            }),
                                            (0, a.jsxs)("div", {
                                              className: "space-y-2",
                                              children: [
                                                (0, a.jsxs)("div", {
                                                  className:
                                                    "flex justify-between text-xs text-muted-foreground",
                                                  children: [
                                                    (0, a.jsxs)("span", {
                                                      className:
                                                        "flex items-center",
                                                      children: [
                                                        (0, a.jsx)(f.A, {
                                                          className:
                                                            "h-3 w-3 mr-1",
                                                        }),
                                                        "Unreliable",
                                                      ],
                                                    }),
                                                    (0, a.jsxs)("span", {
                                                      className:
                                                        "flex items-center",
                                                      children: [
                                                        (0, a.jsx)(g.A, {
                                                          className:
                                                            "h-3 w-3 mr-1",
                                                        }),
                                                        "Very reliable",
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                                (0, a.jsx)(E.MJ, {
                                                  children: (0, a.jsxs)("div", {
                                                    className:
                                                      "flex items-center gap-4",
                                                    children: [
                                                      (0, a.jsx)(R.p, {
                                                        type: "range",
                                                        min: 0,
                                                        max: 100,
                                                        step: 1,
                                                        className: "w-full",
                                                        ...e,
                                                        value: e.value,
                                                        onChange: (r) =>
                                                          e.onChange(
                                                            parseInt(
                                                              r.target.value,
                                                              10,
                                                            ),
                                                          ),
                                                      }),
                                                      (0, a.jsx)("span", {
                                                        className:
                                                          "font-medium w-8 text-center",
                                                        children: e.value,
                                                      }),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            }),
                                            (0, a.jsx)(E.C5, {}),
                                          ],
                                        }),
                                    }),
                                    (0, a.jsx)(E.zB, {
                                      control: K.control,
                                      name: "notes",
                                      render: ({ field: e }) =>
                                        (0, a.jsxs)(E.eI, {
                                          children: [
                                            (0, a.jsx)(E.lR, {
                                              children: "Notes",
                                            }),
                                            (0, a.jsx)(E.MJ, {
                                              children: (0, a.jsx)(z.T, {
                                                placeholder:
                                                  "Why did you give this score? (optional)",
                                                className: "min-h-[80px]",
                                                ...e,
                                                value: e.value || "",
                                              }),
                                            }),
                                            (0, a.jsx)(E.C5, {}),
                                          ],
                                        }),
                                    }),
                                    (0, a.jsxs)(S.Es, {
                                      children: [
                                        (0, a.jsx)(C.$, {
                                          type: "button",
                                          variant: "outline",
                                          onClick: () => J(!1),
                                          children: "Cancel",
                                        }),
                                        (0, a.jsx)(C.$, {
                                          type: "submit",
                                          disabled: W,
                                          children: W
                                            ? "Submitting..."
                                            : "Submit Validation",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                      ],
                    }),
                  }),
                ],
              });
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      24131: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("MoreHorizontal", [
          ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
          ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
          ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
        ]);
      },
      27676: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => n.default,
            __next_app__: () => c,
            pages: () => d,
            routeModule: () => u,
            tree: () => l,
          });
        var s = t(11610),
          a = t(51293),
          n = t(59059),
          i = t(17770),
          o = {};
        for (let e in i)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (o[e] = () => i[e]);
        t.d(r, o);
        let l = {
            children: [
              "",
              {
                children: [
                  "(admin)",
                  {
                    children: [
                      "admin",
                      {
                        children: [
                          "scraping-sources",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(t.bind(t, 46275)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(admin)\\admin\\scraping-sources\\page.tsx",
                                ],
                              },
                            ],
                          },
                          {},
                        ],
                      },
                      {},
                    ],
                  },
                  {
                    forbidden: [
                      () => Promise.resolve().then(t.t.bind(t, 57382, 23)),
                      "next/dist/client/components/forbidden-error",
                    ],
                    unauthorized: [
                      () => Promise.resolve().then(t.t.bind(t, 87039, 23)),
                      "next/dist/client/components/unauthorized-error",
                    ],
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(t.bind(t, 22630)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\layout.tsx",
                ],
                error: [
                  () => Promise.resolve().then(t.bind(t, 94745)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
                ],
                "global-error": [
                  () => Promise.resolve().then(t.bind(t, 59059)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(t.bind(t, 53974)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
                ],
                forbidden: [
                  () => Promise.resolve().then(t.t.bind(t, 57382, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(t.t.bind(t, 87039, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(admin)\\admin\\scraping-sources\\page.tsx",
          ],
          c = { require: t, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(admin)/admin/scraping-sources/page",
              pathname: "/admin/scraping-sources",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      28366: (e, r, t) => {
        "use strict";
        t.d(r, { B8: () => R, UC: () => T, bL: () => E, l9: () => q });
        var s = t(84205),
          a = t(28777),
          n = t(18047),
          i = t(59150),
          o = t(94653),
          l = t(78593),
          d = t(7839),
          c = t(48705),
          u = t(42414),
          p = t(61268),
          h = "Tabs",
          [x, m] = (0, n.A)(h, [i.RG]),
          f = (0, i.RG)(),
          [g, j] = x(h),
          v = s.forwardRef((e, r) => {
            let {
                __scopeTabs: t,
                value: s,
                onValueChange: a,
                defaultValue: n,
                orientation: i = "horizontal",
                dir: o,
                activationMode: x = "automatic",
                ...m
              } = e,
              f = (0, d.jH)(o),
              [j, v] = (0, c.i)({
                prop: s,
                onChange: a,
                defaultProp: n ?? "",
                caller: h,
              });
            return (0, p.jsx)(g, {
              scope: t,
              baseId: (0, u.B)(),
              value: j,
              onValueChange: v,
              orientation: i,
              dir: f,
              activationMode: x,
              children: (0, p.jsx)(l.sG.div, {
                dir: f,
                "data-orientation": i,
                ...m,
                ref: r,
              }),
            });
          });
        v.displayName = h;
        var b = "TabsList",
          y = s.forwardRef((e, r) => {
            let { __scopeTabs: t, loop: s = !0, ...a } = e,
              n = j(b, t),
              o = f(t);
            return (0, p.jsx)(i.bL, {
              asChild: !0,
              ...o,
              orientation: n.orientation,
              dir: n.dir,
              loop: s,
              children: (0, p.jsx)(l.sG.div, {
                role: "tablist",
                "aria-orientation": n.orientation,
                ...a,
                ref: r,
              }),
            });
          });
        y.displayName = b;
        var w = "TabsTrigger",
          N = s.forwardRef((e, r) => {
            let { __scopeTabs: t, value: s, disabled: n = !1, ...o } = e,
              d = j(w, t),
              c = f(t),
              u = S(d.baseId, s),
              h = A(d.baseId, s),
              x = s === d.value;
            return (0, p.jsx)(i.q7, {
              asChild: !0,
              ...c,
              focusable: !n,
              active: x,
              children: (0, p.jsx)(l.sG.button, {
                type: "button",
                role: "tab",
                "aria-selected": x,
                "aria-controls": h,
                "data-state": x ? "active" : "inactive",
                "data-disabled": n ? "" : void 0,
                disabled: n,
                id: u,
                ...o,
                ref: r,
                onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                  n || 0 !== e.button || !1 !== e.ctrlKey
                    ? e.preventDefault()
                    : d.onValueChange(s);
                }),
                onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                  [" ", "Enter"].includes(e.key) && d.onValueChange(s);
                }),
                onFocus: (0, a.m)(e.onFocus, () => {
                  let e = "manual" !== d.activationMode;
                  x || n || !e || d.onValueChange(s);
                }),
              }),
            });
          });
        N.displayName = w;
        var C = "TabsContent",
          k = s.forwardRef((e, r) => {
            let {
                __scopeTabs: t,
                value: a,
                forceMount: n,
                children: i,
                ...d
              } = e,
              c = j(C, t),
              u = S(c.baseId, a),
              h = A(c.baseId, a),
              x = a === c.value,
              m = s.useRef(x);
            return (
              s.useEffect(() => {
                let e = requestAnimationFrame(() => (m.current = !1));
                return () => cancelAnimationFrame(e);
              }, []),
              (0, p.jsx)(o.C, {
                present: n || x,
                children: ({ present: t }) =>
                  (0, p.jsx)(l.sG.div, {
                    "data-state": x ? "active" : "inactive",
                    "data-orientation": c.orientation,
                    role: "tabpanel",
                    "aria-labelledby": u,
                    hidden: !t,
                    id: h,
                    tabIndex: 0,
                    ...d,
                    ref: r,
                    style: {
                      ...e.style,
                      animationDuration: m.current ? "0s" : void 0,
                    },
                    children: t && i,
                  }),
              })
            );
          });
        function S(e, r) {
          return `${e}-trigger-${r}`;
        }
        function A(e, r) {
          return `${e}-content-${r}`;
        }
        k.displayName = C;
        var E = v,
          R = y,
          q = N,
          T = k;
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      30205: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              Cf: () => x,
              Es: () => f,
              L3: () => g,
              c7: () => m,
              lG: () => c,
              rr: () => j,
              zM: () => u,
            });
            var a = t(61268),
              n = t(33459),
              i = t(90495),
              o = t(84205),
              l = t(15942),
              d = e([l]);
            l = (d.then ? (await d)() : d)[0];
            let c = n.bL,
              u = n.l9,
              p = n.ZL;
            n.bm;
            let h = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)(n.hJ, {
                ref: t,
                className: (0, l.cn)(
                  "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                  e,
                ),
                ...r,
              }),
            );
            h.displayName = n.hJ.displayName;
            let x = o.forwardRef(({ className: e, children: r, ...t }, s) =>
              (0, a.jsxs)(p, {
                children: [
                  (0, a.jsx)(h, {}),
                  (0, a.jsxs)(n.UC, {
                    ref: s,
                    className: (0, l.cn)(
                      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                      e,
                    ),
                    ...t,
                    children: [
                      r,
                      (0, a.jsxs)(n.bm, {
                        className:
                          "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                        children: [
                          (0, a.jsx)(i.A, { className: "h-4 w-4" }),
                          (0, a.jsx)("span", {
                            className: "sr-only",
                            children: "Close",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            );
            x.displayName = n.UC.displayName;
            let m = ({ className: e, ...r }) =>
              (0, a.jsx)("div", {
                className: (0, l.cn)(
                  "flex flex-col space-y-1.5 text-center sm:text-left",
                  e,
                ),
                ...r,
              });
            m.displayName = "DialogHeader";
            let f = ({ className: e, ...r }) =>
              (0, a.jsx)("div", {
                className: (0, l.cn)(
                  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
                  e,
                ),
                ...r,
              });
            f.displayName = "DialogFooter";
            let g = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)(n.hE, {
                ref: t,
                className: (0, l.cn)(
                  "text-lg font-semibold leading-none tracking-tight",
                  e,
                ),
                ...r,
              }),
            );
            g.displayName = n.hE.displayName;
            let j = o.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)(n.VY, {
                ref: t,
                className: (0, l.cn)("text-sm text-muted-foreground", e),
                ...r,
              }),
            );
            (j.displayName = n.VY.displayName), s();
          } catch (e) {
            s(e);
          }
        });
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34961: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("Play", [
          ["polygon", { points: "5 3 19 12 5 21 5 3", key: "191637" }],
        ]);
      },
      36686: (e) => {
        "use strict";
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      37787: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { T: () => l });
            var a = t(61268),
              n = t(84205),
              i = t(15942),
              o = e([i]);
            i = (o.then ? (await o)() : o)[0];
            let l = n.forwardRef(({ className: e, ...r }, t) =>
              (0, a.jsx)("textarea", {
                className: (0, i.cn)(
                  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  e,
                ),
                ref: t,
                ...r,
              }),
            );
            (l.displayName = "Textarea"), s();
          } catch (e) {
            s(e);
          }
        });
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42414: (e, r, t) => {
        "use strict";
        t.d(r, { B: () => l });
        var s,
          a = t(84205),
          n = t(66130),
          i =
            (s || (s = t.t(a, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          o = 0;
        function l(e) {
          let [r, t] = a.useState(i());
          return (
            (0, n.N)(() => {
              e || t((e) => e ?? String(o++));
            }, [e]),
            e || (r ? `radix-${r}` : "")
          );
        }
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      45317: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 46275));
      },
      46275: (e, r, t) => {
        "use strict";
        let s;
        t.r(r),
          t.d(r, {
            default: () => h,
            generateImageMetadata: () => u,
            generateMetadata: () => c,
            generateViewport: () => p,
          });
        var a = t(63033),
          n = t(26394),
          i = t(60442),
          o = (0, n.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(admin)\\\\admin\\\\scraping-sources\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(admin)\\admin\\scraping-sources\\page.tsx",
            "default",
          );
        let l = { ...a },
          d =
            "workUnitAsyncStorage" in l
              ? l.workUnitAsyncStorage
              : "requestAsyncStorage" in l
                ? l.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof o
            ? new Proxy(o, {
                apply: (e, r, t) => {
                  let s, a, n;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (n = e?.headers);
                  } catch (e) {}
                  return i
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(admin)/admin/scraping-sources",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: a,
                      headers: n,
                    })
                    .apply(r, t);
                },
              })
            : o;
        let c = void 0,
          u = void 0,
          p = void 0,
          h = s;
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      53855: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("ThumbsDown", [
          ["path", { d: "M17 14V2", key: "8ymqnk" }],
          [
            "path",
            {
              d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z",
              key: "s6e0r",
            },
          ],
        ]);
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      58469: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 21565));
      },
      59150: (e, r, t) => {
        "use strict";
        t.d(r, { RG: () => y, bL: () => q, q7: () => T });
        var s = t(84205),
          a = t(28777),
          n = t(28029),
          i = t(71604),
          o = t(18047),
          l = t(42414),
          d = t(78593),
          c = t(10308),
          u = t(48705),
          p = t(7839),
          h = t(61268),
          x = "rovingFocusGroup.onEntryFocus",
          m = { bubbles: !1, cancelable: !0 },
          f = "RovingFocusGroup",
          [g, j, v] = (0, n.N)(f),
          [b, y] = (0, o.A)(f, [v]),
          [w, N] = b(f),
          C = s.forwardRef((e, r) =>
            (0, h.jsx)(g.Provider, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, h.jsx)(g.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, h.jsx)(k, { ...e, ref: r }),
              }),
            }),
          );
        C.displayName = f;
        var k = s.forwardRef((e, r) => {
            let {
                __scopeRovingFocusGroup: t,
                orientation: n,
                loop: o = !1,
                dir: l,
                currentTabStopId: g,
                defaultCurrentTabStopId: v,
                onCurrentTabStopIdChange: b,
                onEntryFocus: y,
                preventScrollOnEntryFocus: N = !1,
                ...C
              } = e,
              k = s.useRef(null),
              S = (0, i.s)(r, k),
              A = (0, p.jH)(l),
              [E, q] = (0, u.i)({
                prop: g,
                defaultProp: v ?? null,
                onChange: b,
                caller: f,
              }),
              [T, _] = s.useState(!1),
              I = (0, c.c)(y),
              z = j(t),
              M = s.useRef(!1),
              [F, L] = s.useState(0);
            return (
              s.useEffect(() => {
                let e = k.current;
                if (e)
                  return (
                    e.addEventListener(x, I), () => e.removeEventListener(x, I)
                  );
              }, [I]),
              (0, h.jsx)(w, {
                scope: t,
                orientation: n,
                dir: A,
                loop: o,
                currentTabStopId: E,
                onItemFocus: s.useCallback((e) => q(e), [q]),
                onItemShiftTab: s.useCallback(() => _(!0), []),
                onFocusableItemAdd: s.useCallback(() => L((e) => e + 1), []),
                onFocusableItemRemove: s.useCallback(() => L((e) => e - 1), []),
                children: (0, h.jsx)(d.sG.div, {
                  tabIndex: T || 0 === F ? -1 : 0,
                  "data-orientation": n,
                  ...C,
                  ref: S,
                  style: { outline: "none", ...e.style },
                  onMouseDown: (0, a.m)(e.onMouseDown, () => {
                    M.current = !0;
                  }),
                  onFocus: (0, a.m)(e.onFocus, (e) => {
                    let r = !M.current;
                    if (e.target === e.currentTarget && r && !T) {
                      let r = new CustomEvent(x, m);
                      if (
                        (e.currentTarget.dispatchEvent(r), !r.defaultPrevented)
                      ) {
                        let e = z().filter((e) => e.focusable);
                        R(
                          [
                            e.find((e) => e.active),
                            e.find((e) => e.id === E),
                            ...e,
                          ]
                            .filter(Boolean)
                            .map((e) => e.ref.current),
                          N,
                        );
                      }
                    }
                    M.current = !1;
                  }),
                  onBlur: (0, a.m)(e.onBlur, () => _(!1)),
                }),
              })
            );
          }),
          S = "RovingFocusGroupItem",
          A = s.forwardRef((e, r) => {
            let {
                __scopeRovingFocusGroup: t,
                focusable: n = !0,
                active: i = !1,
                tabStopId: o,
                children: c,
                ...u
              } = e,
              p = (0, l.B)(),
              x = o || p,
              m = N(S, t),
              f = m.currentTabStopId === x,
              v = j(t),
              {
                onFocusableItemAdd: b,
                onFocusableItemRemove: y,
                currentTabStopId: w,
              } = m;
            return (
              s.useEffect(() => {
                if (n) return b(), () => y();
              }, [n, b, y]),
              (0, h.jsx)(g.ItemSlot, {
                scope: t,
                id: x,
                focusable: n,
                active: i,
                children: (0, h.jsx)(d.sG.span, {
                  tabIndex: f ? 0 : -1,
                  "data-orientation": m.orientation,
                  ...u,
                  ref: r,
                  onMouseDown: (0, a.m)(e.onMouseDown, (e) => {
                    n ? m.onItemFocus(x) : e.preventDefault();
                  }),
                  onFocus: (0, a.m)(e.onFocus, () => m.onItemFocus(x)),
                  onKeyDown: (0, a.m)(e.onKeyDown, (e) => {
                    if ("Tab" === e.key && e.shiftKey)
                      return void m.onItemShiftTab();
                    if (e.target !== e.currentTarget) return;
                    let r = (function (e, r, t) {
                      var s;
                      let a =
                        ((s = e.key),
                        "rtl" !== t
                          ? s
                          : "ArrowLeft" === s
                            ? "ArrowRight"
                            : "ArrowRight" === s
                              ? "ArrowLeft"
                              : s);
                      if (
                        !(
                          "vertical" === r &&
                          ["ArrowLeft", "ArrowRight"].includes(a)
                        ) &&
                        !(
                          "horizontal" === r &&
                          ["ArrowUp", "ArrowDown"].includes(a)
                        )
                      )
                        return E[a];
                    })(e, m.orientation, m.dir);
                    if (void 0 !== r) {
                      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)
                        return;
                      e.preventDefault();
                      let t = v()
                        .filter((e) => e.focusable)
                        .map((e) => e.ref.current);
                      if ("last" === r) t.reverse();
                      else if ("prev" === r || "next" === r) {
                        "prev" === r && t.reverse();
                        let s = t.indexOf(e.currentTarget);
                        t = m.loop
                          ? (function (e, r) {
                              return e.map((t, s) => e[(r + s) % e.length]);
                            })(t, s + 1)
                          : t.slice(s + 1);
                      }
                      setTimeout(() => R(t));
                    }
                  }),
                  children:
                    "function" == typeof c
                      ? c({ isCurrentTabStop: f, hasTabStop: null != w })
                      : c,
                }),
              })
            );
          });
        A.displayName = S;
        var E = {
          ArrowLeft: "prev",
          ArrowUp: "prev",
          ArrowRight: "next",
          ArrowDown: "next",
          PageUp: "first",
          Home: "first",
          PageDown: "last",
          End: "last",
        };
        function R(e, r = !1) {
          let t = document.activeElement;
          for (let s of e)
            if (
              s === t ||
              (s.focus({ preventScroll: r }), document.activeElement !== t)
            )
              return;
        }
        var q = C,
          T = A;
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      67155: (e, r, t) => {
        "use strict";
        t.d(r, { Z: () => a });
        var s = t(84205);
        function a(e) {
          let r = s.useRef({ value: e, previous: e });
          return s.useMemo(
            () => (
              r.current.value !== e &&
                ((r.current.previous = r.current.value), (r.current.value = e)),
              r.current.previous
            ),
            [e],
          );
        }
      },
      69394: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("ThumbsUp", [
          ["path", { d: "M7 10v12", key: "1qc93n" }],
          [
            "path",
            {
              d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z",
              key: "y3tblf",
            },
          ],
        ]);
      },
      70753: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("ChevronDown", [
          ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }],
        ]);
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      74998: (e) => {
        "use strict";
        e.exports = require("perf_hooks");
      },
      75919: (e) => {
        "use strict";
        e.exports = require("node:worker_threads");
      },
      76760: (e) => {
        "use strict";
        e.exports = require("node:path");
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
      },
      78337: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, { p: () => o });
            var a = t(61268);
            t(84205);
            var n = t(15942),
              i = e([n]);
            function o({ className: e, type: r, ...t }) {
              return (0, a.jsx)("input", {
                type: r,
                "data-slot": "input",
                className: (0, n.cn)(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  e,
                ),
                ...t,
              });
            }
            (n = (i.then ? (await i)() : i)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      79551: (e) => {
        "use strict";
        e.exports = require("url");
      },
      79646: (e) => {
        "use strict";
        e.exports = require("child_process");
      },
      80069: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("ExternalLink", [
          ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
          ["path", { d: "M10 14 21 3", key: "gplh6r" }],
          [
            "path",
            {
              d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
              key: "a6xqqp",
            },
          ],
        ]);
      },
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      82122: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("Shield", [
          [
            "path",
            {
              d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
              key: "oel41y",
            },
          ],
        ]);
      },
      82985: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("Trash", [
          ["path", { d: "M3 6h18", key: "d0wm0j" }],
          [
            "path",
            { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" },
          ],
          ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
        ]);
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      86183: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              C5: () => x,
              MJ: () => h,
              eI: () => u,
              lR: () => p,
              lV: () => m,
              zB: () => g,
            });
            var a = t(61268),
              n = t(86415),
              i = t(84205),
              o = t(36322),
              l = t(16979),
              d = t(15942),
              c = e([l, d]);
            [l, d] = c.then ? (await c)() : c;
            let m = o.Op,
              f = i.createContext({}),
              g = ({ ...e }) =>
                (0, a.jsx)(f.Provider, {
                  value: { name: e.name },
                  children: (0, a.jsx)(o.xI, { ...e }),
                }),
              j = () => {
                let e = i.useContext(f),
                  r = i.useContext(v),
                  { getFieldState: t } = (0, o.xW)(),
                  s = (0, o.lN)({ name: e.name }),
                  a = t(e.name, s);
                if (!e)
                  throw Error("useFormField should be used within <FormField>");
                let { id: n } = r;
                return {
                  id: n,
                  name: e.name,
                  formItemId: `${n}-form-item`,
                  formDescriptionId: `${n}-form-item-description`,
                  formMessageId: `${n}-form-item-message`,
                  ...a,
                };
              },
              v = i.createContext({});
            function u({ className: e, ...r }) {
              let t = i.useId();
              return (0, a.jsx)(v.Provider, {
                value: { id: t },
                children: (0, a.jsx)("div", {
                  "data-slot": "form-item",
                  className: (0, d.cn)("grid gap-2", e),
                  ...r,
                }),
              });
            }
            function p({ className: e, ...r }) {
              let { error: t, formItemId: s } = j();
              return (0, a.jsx)(l.J, {
                "data-slot": "form-label",
                "data-error": !!t,
                className: (0, d.cn)("data-[error=true]:text-destructive", e),
                htmlFor: s,
                ...r,
              });
            }
            function h({ ...e }) {
              let {
                error: r,
                formItemId: t,
                formDescriptionId: s,
                formMessageId: i,
              } = j();
              return (0, a.jsx)(n.DX, {
                "data-slot": "form-control",
                id: t,
                "aria-describedby": r ? `${s} ${i}` : `${s}`,
                "aria-invalid": !!r,
                ...e,
              });
            }
            function x({ className: e, ...r }) {
              let { error: t, formMessageId: s } = j(),
                n = t ? String(t?.message ?? "") : r.children;
              return n
                ? (0, a.jsx)("p", {
                    "data-slot": "form-message",
                    id: s,
                    className: (0, d.cn)("text-destructive text-sm", e),
                    ...r,
                    children: n,
                  })
                : null;
            }
            s();
          } catch (e) {
            s(e);
          }
        });
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      91557: (e, r, t) => {
        "use strict";
        t.d(r, { X: () => n });
        var s = t(84205),
          a = t(66130);
        function n(e) {
          let [r, t] = s.useState(void 0);
          return (
            (0, a.N)(() => {
              if (e) {
                t({ width: e.offsetWidth, height: e.offsetHeight });
                let r = new ResizeObserver((r) => {
                  let s, a;
                  if (!Array.isArray(r) || !r.length) return;
                  let n = r[0];
                  if ("borderBoxSize" in n) {
                    let e = n.borderBoxSize,
                      r = Array.isArray(e) ? e[0] : e;
                    (s = r.inlineSize), (a = r.blockSize);
                  } else (s = e.offsetWidth), (a = e.offsetHeight);
                  t({ width: s, height: a });
                });
                return (
                  r.observe(e, { box: "border-box" }), () => r.unobserve(e)
                );
              }
              t(void 0);
            }, [e]),
            r
          );
        }
      },
      93336: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              Hr: () => x,
              Ht: () => m,
              I: () => p,
              SQ: () => u,
              _2: () => h,
              lp: () => f,
              mB: () => g,
              rI: () => d,
              ty: () => c,
            });
            var a = t(61268),
              n = t(57833),
              i = t(83659);
            t(84205);
            var o = t(15942),
              l = e([o]);
            function d({ ...e }) {
              return (0, a.jsx)(n.bL, { "data-slot": "dropdown-menu", ...e });
            }
            function c({ ...e }) {
              return (0, a.jsx)(n.l9, {
                "data-slot": "dropdown-menu-trigger",
                ...e,
              });
            }
            function u({ className: e, sideOffset: r = 4, ...t }) {
              return (0, a.jsx)(n.ZL, {
                children: (0, a.jsx)(n.UC, {
                  "data-slot": "dropdown-menu-content",
                  sideOffset: r,
                  className: (0, o.cn)(
                    "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
                    e,
                  ),
                  ...t,
                }),
              });
            }
            function p({ ...e }) {
              return (0, a.jsx)(n.YJ, {
                "data-slot": "dropdown-menu-group",
                ...e,
              });
            }
            function h({
              className: e,
              inset: r,
              variant: t = "default",
              ...s
            }) {
              return (0, a.jsx)(n.q7, {
                "data-slot": "dropdown-menu-item",
                "data-inset": r,
                "data-variant": t,
                className: (0, o.cn)(
                  "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...s,
              });
            }
            function x({ ...e }) {
              return (0, a.jsx)(n.z6, {
                "data-slot": "dropdown-menu-radio-group",
                ...e,
              });
            }
            function m({ className: e, children: r, ...t }) {
              return (0, a.jsxs)(n.hN, {
                "data-slot": "dropdown-menu-radio-item",
                className: (0, o.cn)(
                  "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  e,
                ),
                ...t,
                children: [
                  (0, a.jsx)("span", {
                    className:
                      "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
                    children: (0, a.jsx)(n.VF, {
                      children: (0, a.jsx)(i.A, {
                        className: "size-2 fill-current",
                      }),
                    }),
                  }),
                  r,
                ],
              });
            }
            function f({ className: e, inset: r, ...t }) {
              return (0, a.jsx)(n.JU, {
                "data-slot": "dropdown-menu-label",
                "data-inset": r,
                className: (0, o.cn)(
                  "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
                  e,
                ),
                ...t,
              });
            }
            function g({ className: e, ...r }) {
              return (0, a.jsx)(n.wv, {
                "data-slot": "dropdown-menu-separator",
                className: (0, o.cn)("bg-border -mx-1 my-1 h-px", e),
                ...r,
              });
            }
            (o = (l.then ? (await l)() : l)[0]), s();
          } catch (e) {
            s(e);
          }
        });
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      95957: (e, r, t) => {
        "use strict";
        t.a(e, async (e, s) => {
          try {
            t.d(r, {
              bq: () => h,
              eb: () => m,
              gC: () => x,
              l6: () => u,
              yv: () => p,
            });
            var a = t(61268),
              n = t(81242),
              i = t(70753),
              o = t(415),
              l = t(84205),
              d = t(15942),
              c = e([d]);
            d = (c.then ? (await c)() : c)[0];
            let u = n.bL;
            n.YJ;
            let p = n.WT,
              h = l.forwardRef(({ className: e, children: r, ...t }, s) =>
                (0, a.jsxs)(n.l9, {
                  ref: s,
                  className: (0, d.cn)(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    e,
                  ),
                  ...t,
                  children: [
                    r,
                    (0, a.jsx)(n.In, {
                      asChild: !0,
                      children: (0, a.jsx)(i.A, {
                        className: "h-4 w-4 opacity-50",
                      }),
                    }),
                  ],
                }),
              );
            h.displayName = n.l9.displayName;
            let x = l.forwardRef(
              (
                { className: e, children: r, position: t = "popper", ...s },
                i,
              ) =>
                (0, a.jsx)(n.ZL, {
                  children: (0, a.jsx)(n.UC, {
                    ref: i,
                    className: (0, d.cn)(
                      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                      "popper" === t &&
                        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                      e,
                    ),
                    position: t,
                    ...s,
                    children: (0, a.jsx)(n.LM, {
                      className: (0, d.cn)(
                        "p-1",
                        "popper" === t &&
                          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                      ),
                      children: r,
                    }),
                  }),
                }),
            );
            (x.displayName = n.UC.displayName),
              (l.forwardRef(({ className: e, ...r }, t) =>
                (0, a.jsx)(n.JU, {
                  ref: t,
                  className: (0, d.cn)(
                    "py-1.5 pl-8 pr-2 text-sm font-semibold",
                    e,
                  ),
                  ...r,
                }),
              ).displayName = n.JU.displayName);
            let m = l.forwardRef(({ className: e, children: r, ...t }, s) =>
              (0, a.jsxs)(n.q7, {
                ref: s,
                className: (0, d.cn)(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  e,
                ),
                ...t,
                children: [
                  (0, a.jsx)("span", {
                    className:
                      "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                    children: (0, a.jsx)(n.VF, {
                      children: (0, a.jsx)(o.A, { className: "h-4 w-4" }),
                    }),
                  }),
                  (0, a.jsx)(n.p4, { children: r }),
                ],
              }),
            );
            (m.displayName = n.q7.displayName),
              (l.forwardRef(({ className: e, ...r }, t) =>
                (0, a.jsx)(n.wv, {
                  ref: t,
                  className: (0, d.cn)("-mx-1 my-1 h-px bg-muted", e),
                  ...r,
                }),
              ).displayName = n.wv.displayName),
              s();
          } catch (e) {
            s(e);
          }
        });
      },
      99358: (e, r, t) => {
        "use strict";
        t.d(r, { A: () => s });
        let s = (0, t(95255).A)("Globe", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          [
            "path",
            {
              d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
              key: "13o1zl",
            },
          ],
          ["path", { d: "M2 12h20", key: "9i4pu4" }],
        ]);
      },
    });
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(
      0,
      [
        827, 6518, 2033, 4027, 8859, 8029, 5728, 9729, 3390, 6188, 7911, 6867,
        1502, 7052, 4630, 8730,
      ],
      () => t(27676),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
