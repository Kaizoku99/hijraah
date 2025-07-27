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
    (e._sentryDebugIds[s] = "99c80622-7896-4907-b257-f18f275f46ca"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-99c80622-7896-4907-b257-f18f275f46ca"));
} catch (e) {}
("use strict");
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5312],
  {
    15312: (e, s, i) => {
      i.r(s), i.d(s, { FirstTask: () => u });
      var t = i(30602),
        a = i(4194),
        l = i(17957),
        n = i(62408),
        c = i(62839),
        r = i(85218),
        d = i(10190),
        o = i(5271),
        m = i(77413),
        x = i(86697),
        h = i(20731);
      let p = (e) => {
          let { task: s, onComplete: i } = e,
            [d, x] = (0, r.useState)(!1),
            [h, p] = (0, r.useState)(!1),
            u = (0, r.useCallback)(() => {
              x(!0),
                setTimeout(() => {
                  p(!0), x(!1), setTimeout(() => i(s.id, s.actionKey), 1e3);
                }, 1e3);
            }, [s.id, s.actionKey, i]),
            f = s.icon;
          return (0, t.jsxs)(m.Zp, {
            className:
              "border border-muted relative overflow-hidden transition-shadow hover:shadow-md",
            children: [
              (0, t.jsx)(m.aR, {
                children: (0, t.jsxs)("div", {
                  className: "flex items-start gap-4",
                  children: [
                    (0, t.jsx)("div", {
                      className:
                        "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0",
                      children: (0, t.jsx)(f, {
                        className: "h-5 w-5 text-primary",
                      }),
                    }),
                    (0, t.jsxs)("div", {
                      children: [
                        (0, t.jsx)(m.ZB, { children: s.title }),
                        (0, t.jsx)(m.BT, {
                          className: "mt-1",
                          children: s.description,
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              (0, t.jsx)(m.wL, {
                className: "flex justify-end",
                children: (0, t.jsx)(a.N, {
                  mode: "wait",
                  children: h
                    ? (0, t.jsxs)(
                        l.P.div,
                        {
                          initial: { opacity: 0, y: 10 },
                          animate: { opacity: 1, y: 0 },
                          exit: { opacity: 0 },
                          className:
                            "flex items-center gap-2 text-primary font-medium",
                          children: [
                            (0, t.jsx)(c.A, { size: 18 }),
                            " Completed",
                          ],
                        },
                        "completed",
                      )
                    : (0, t.jsxs)(
                        o.$,
                        {
                          onClick: u,
                          disabled: d,
                          className: "gap-2",
                          children: [
                            d ? "Processing..." : s.cta,
                            !d && (0, t.jsx)(n.A, { size: 16 }),
                          ],
                        },
                        "cta-button",
                      ),
                }),
              }),
              h &&
                (0, t.jsx)(l.P.div, {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className:
                    "absolute inset-0 bg-primary/5 pointer-events-none",
                }),
            ],
          });
        },
        u = () => {
          let { onboarding: e, completeStep: s } = (0, h.z)(),
            [i, n] = (0, r.useState)(null),
            [u, f] = (0, r.useState)(!1),
            y = (0, d.Dv)("first-task"),
            j = (0, r.useMemo)(() => (null == y ? void 0 : y.tasks) || [], [y]);
          (0, r.useEffect)(() => {
            j.length > 0 && !i && n(j[0].id);
          }, [j, i]);
          let b = (0, r.useCallback)(
              async (e, i) => {
                f(!0);
                try {
                  await fetch("/api/onboarding/actions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ actionKey: i, isCompleted: !0 }),
                  });
                } catch (e) {
                  console.error(
                    "Failed to mark action ".concat(i, " as completed:"),
                    e,
                  );
                }
                setTimeout(() => s("first-task"), 1500);
              },
              [s],
            ),
            g =
              e.isActive &&
              "first-task" === e.currentStep &&
              !e.hideForSession &&
              !e.isCompleted;
          return g && y && 0 !== j.length
            ? (0, t.jsx)(a.N, {
                children:
                  g &&
                  (0, t.jsx)("div", {
                    className:
                      "fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4",
                    children: (0, t.jsxs)(
                      l.P.div,
                      {
                        initial: { opacity: 0, scale: 0.95 },
                        animate: { opacity: 1, scale: 1 },
                        exit: { opacity: 0, scale: 0.9 },
                        className:
                          "bg-card border rounded-xl shadow-lg max-w-2xl w-full flex flex-col max-h-[90vh]",
                        children: [
                          (0, t.jsxs)(m.aR, {
                            children: [
                              (0, t.jsx)(m.ZB, {
                                className: "text-2xl",
                                children: y.title,
                              }),
                              (0, t.jsx)(m.BT, {
                                className: "text-base",
                                children: y.description,
                              }),
                            ],
                          }),
                          (0, t.jsx)(m.Wu, {
                            className: "flex-grow overflow-y-auto",
                            children: (0, t.jsxs)(x.Tabs, {
                              value: null != i ? i : "",
                              onValueChange: (e) => {
                                n(e);
                              },
                              className: "w-full",
                              children: [
                                (0, t.jsx)(x.TabsList, {
                                  className: "grid w-full grid-cols-".concat(
                                    j.length,
                                    " mb-6",
                                  ),
                                  children: j.map((e) =>
                                    (0, t.jsxs)(
                                      x.TabsTrigger,
                                      {
                                        value: e.id,
                                        children: [e.title.split(" ")[0], " "],
                                      },
                                      e.id,
                                    ),
                                  ),
                                }),
                                j.map((e) =>
                                  (0, t.jsx)(
                                    x.TabsContent,
                                    {
                                      value: e.id,
                                      className: "mt-0",
                                      children: (0, t.jsx)(a.N, {
                                        mode: "wait",
                                        children: (0, t.jsx)(
                                          l.P.div,
                                          {
                                            initial: { opacity: 0, x: 20 },
                                            animate: { opacity: 1, x: 0 },
                                            exit: { opacity: 0, x: -20 },
                                            transition: { duration: 0.2 },
                                            children: (0, t.jsx)(p, {
                                              task: e,
                                              onComplete: b,
                                            }),
                                          },
                                          e.id,
                                        ),
                                      }),
                                    },
                                    e.id,
                                  ),
                                ),
                              ],
                            }),
                          }),
                          (0, t.jsxs)(m.wL, {
                            className:
                              "flex justify-between border-t p-6 mt-auto",
                            children: [
                              (0, t.jsx)(o.$, {
                                variant: "ghost",
                                onClick: () => s("first-task"),
                                children: "Skip This Step",
                              }),
                              u &&
                                (0, t.jsxs)(l.P.div, {
                                  initial: { opacity: 0, y: 10 },
                                  animate: { opacity: 1, y: 0 },
                                  className:
                                    "text-primary flex items-center gap-2",
                                  children: [
                                    (0, t.jsx)(c.A, { size: 16 }),
                                    (0, t.jsx)("span", {
                                      children: "Task Completed! Moving on...",
                                    }),
                                  ],
                                }),
                            ],
                          }),
                        ],
                      },
                      "first-task-modal",
                    ),
                  }),
              })
            : null;
        };
    },
  },
]);
