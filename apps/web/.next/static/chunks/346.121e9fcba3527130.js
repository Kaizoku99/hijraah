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
    (e._sentryDebugIds[s] = "a8a0fc04-6268-4d8e-abdd-8fcdfcb85e87"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-a8a0fc04-6268-4d8e-abdd-8fcdfcb85e87"));
} catch (e) {}
("use strict");
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [346],
  {
    80346: (e, s, l) => {
      l.r(s), l.d(s, { Resources: () => m });
      var a = l(30602),
        r = l(4194),
        i = l(17957),
        t = l(41624),
        n = l(85218),
        c = l(10190),
        d = l(5271),
        o = l(77413),
        u = l(86697),
        x = l(20731);
      let h = (e) => {
          let { resource: s } = e,
            l = s.icon;
          return (0, a.jsxs)(o.Zp, {
            className:
              "transition-all hover:border-primary/50 hover:shadow-md flex flex-col",
            children: [
              (0, a.jsx)(o.aR, {
                className: "pb-2",
                children: (0, a.jsxs)("div", {
                  className: "flex items-center gap-2",
                  children: [
                    (0, a.jsx)("div", {
                      className: "p-1.5 rounded-md bg-primary/10 text-primary",
                      children: (0, a.jsx)(l, { className: "h-4 w-4" }),
                    }),
                    (0, a.jsx)(o.ZB, {
                      className: "text-base",
                      children: s.title,
                    }),
                  ],
                }),
              }),
              (0, a.jsx)(o.Wu, {
                className: "pb-2 flex-grow",
                children: (0, a.jsx)(o.BT, { children: s.description }),
              }),
              (0, a.jsx)(o.wL, {
                children: (0, a.jsx)(d.$, {
                  variant: "link",
                  size: "sm",
                  className: "gap-1 text-xs px-0 h-auto py-1 text-primary",
                  asChild: !0,
                  children: (0, a.jsxs)("a", {
                    href: s.link,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      "View Resource ",
                      (0, a.jsx)(t.A, { className: "h-3 w-3 opacity-70" }),
                    ],
                  }),
                }),
              }),
            ],
          });
        },
        m = () => {
          var e, s;
          let { onboarding: l, completeStep: t } = (0, x.z)(),
            [m, p] = (0, n.useState)(null),
            f = (0, c.Dv)("resources"),
            b = (null == f ? void 0 : f.resourceCategories) || [];
          (0, n.useState)(() => {
            b.length > 0 && !m && p(b[0].id);
          });
          let g =
              l.isActive &&
              "resources" === l.currentStep &&
              !l.hideForSession &&
              !l.isCompleted,
            j = (0, n.useCallback)(async () => {
              t("resources");
            }, [t]);
          return g && f && 0 !== b.length
            ? (0, a.jsx)(r.N, {
                children:
                  g &&
                  (0, a.jsx)("div", {
                    className:
                      "fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4",
                    children: (0, a.jsxs)(
                      i.P.div,
                      {
                        initial: { opacity: 0, scale: 0.95 },
                        animate: { opacity: 1, scale: 1 },
                        exit: { opacity: 0, scale: 0.9 },
                        className:
                          "bg-card border rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] flex flex-col",
                        children: [
                          (0, a.jsxs)(o.aR, {
                            children: [
                              (0, a.jsx)(o.ZB, {
                                className: "text-2xl",
                                children: f.title,
                              }),
                              (0, a.jsx)(o.BT, {
                                className: "text-base",
                                children: f.description,
                              }),
                            ],
                          }),
                          (0, a.jsx)(o.Wu, {
                            className: "flex-grow overflow-y-auto",
                            children: (0, a.jsxs)(u.Tabs, {
                              defaultValue:
                                null !=
                                (s =
                                  null != m
                                    ? m
                                    : null == (e = b[0])
                                      ? void 0
                                      : e.id)
                                  ? s
                                  : "",
                              value: null != m ? m : "",
                              onValueChange: (e) => {
                                p(e);
                              },
                              children: [
                                (0, a.jsx)(u.TabsList, {
                                  className: "grid w-full grid-cols-".concat(
                                    b.length,
                                    " mb-6",
                                  ),
                                  children: b.map((e) => {
                                    let s = e.icon;
                                    return (0, a.jsxs)(
                                      u.TabsTrigger,
                                      {
                                        value: e.id,
                                        children: [
                                          (0, a.jsx)(s, {
                                            className: "h-4 w-4 mr-2",
                                          }),
                                          e.title,
                                        ],
                                      },
                                      e.id,
                                    );
                                  }),
                                }),
                                b.map((e) =>
                                  (0, a.jsx)(
                                    u.TabsContent,
                                    {
                                      value: e.id,
                                      className: "mt-0",
                                      children: (0, a.jsx)(r.N, {
                                        mode: "wait",
                                        children: (0, a.jsx)(
                                          i.P.div,
                                          {
                                            initial: { opacity: 0, y: 20 },
                                            animate: { opacity: 1, y: 0 },
                                            exit: { opacity: 0, y: -20 },
                                            transition: { duration: 0.3 },
                                            className:
                                              "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
                                            children: e.resources.map((e) =>
                                              (0, a.jsx)(
                                                h,
                                                { resource: e },
                                                e.link,
                                              ),
                                            ),
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
                          (0, a.jsx)(o.wL, {
                            className: "flex justify-end border-t p-6 mt-auto",
                            children: (0, a.jsx)(d.$, {
                              variant: "default",
                              onClick: j,
                              children: "Done Exploring",
                            }),
                          }),
                        ],
                      },
                      "resources-modal",
                    ),
                  }),
              })
            : null;
        };
    },
  },
]);
