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
    (e._sentryDebugIds[t] = "70925c48-f4ae-48b8-a2f3-99e1c4704c96"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-70925c48-f4ae-48b8-a2f3-99e1c4704c96"));
} catch (e) {}
("use strict");
(exports.id = 4688),
  (exports.ids = [4688]),
  (exports.modules = {
    92307: (e, t, i) => {
      i.a(e, async (e, s) => {
        try {
          i.r(t), i.d(t, { WelcomeModal: () => x });
          var a = i(61268),
            l = i(6130),
            n = i(98683);
          i(84205);
          var c = i(16951),
            r = i(28909),
            d = i(30205),
            o = i(67135),
            m = e([r, d]);
          [r, d] = m.then ? (await m)() : m;
          let x = () => {
            let { onboarding: e, nextStep: t, skipOnboarding: i } = (0, o.z)(),
              s = (0, c.Dv)("welcome"),
              m =
                e.isActive &&
                "welcome" === e.currentStep &&
                !e.hideForSession &&
                !e.isCompleted;
            if (!m || !s) return null;
            let x = s.features || [];
            return (0, a.jsx)(d.lG, {
              open: m,
              onOpenChange: (e) => !e && i(),
              children: (0, a.jsxs)(d.Cf, {
                className: "sm:max-w-[500px]",
                children: [
                  (0, a.jsxs)(d.c7, {
                    children: [
                      (0, a.jsx)(l.P.div, {
                        initial: { y: -20, opacity: 0 },
                        animate: { y: 0, opacity: 1 },
                        transition: { duration: 0.5 },
                        children: (0, a.jsxs)(d.L3, {
                          className: "text-2xl font-bold text-center",
                          children: [s.title, " "],
                        }),
                      }),
                      (0, a.jsx)(l.P.div, {
                        initial: { y: 20, opacity: 0 },
                        animate: { y: 0, opacity: 1 },
                        transition: { duration: 0.5, delay: 0.2 },
                        children: (0, a.jsxs)(d.rr, {
                          className: "text-center pt-2",
                          children: [s.description, " "],
                        }),
                      }),
                    ],
                  }),
                  (0, a.jsx)("div", {
                    className: "py-6",
                    children: (0, a.jsx)(l.P.div, {
                      initial: { scale: 0.9, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      transition: { duration: 0.4, delay: 0.4 },
                      className: "space-y-4",
                      children: x.map((e, t) =>
                        (0, a.jsxs)(
                          "div",
                          {
                            className: "flex items-start space-x-3",
                            children: [
                              (0, a.jsx)(l.P.div, {
                                initial: { scale: 0, opacity: 0 },
                                animate: { scale: 1, opacity: 1 },
                                transition: {
                                  duration: 0.3,
                                  delay: 0.5 + 0.1 * t,
                                },
                                className: "mt-0.5",
                                children: (0, a.jsx)(n.A, {
                                  className: "h-5 w-5 text-primary",
                                }),
                              }),
                              (0, a.jsxs)("div", {
                                children: [
                                  (0, a.jsx)("h3", {
                                    className: "font-medium",
                                    children: e.title,
                                  }),
                                  (0, a.jsx)("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: e.description,
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
                  (0, a.jsxs)(d.Es, {
                    className: "sm:justify-between flex-col sm:flex-row gap-2",
                    children: [
                      (0, a.jsx)(r.$, {
                        variant: "outline",
                        onClick: i,
                        className: "w-full sm:w-auto",
                        children: "Skip Tour",
                      }),
                      (0, a.jsx)(r.$, {
                        onClick: t,
                        className: "w-full sm:w-auto",
                        children: "Get Started",
                      }),
                    ],
                  }),
                ],
              }),
            });
          };
          s();
        } catch (e) {
          s(e);
        }
      });
    },
    98683: (e, t, i) => {
      i.d(t, { A: () => s });
      let s = (0, i(95255).A)("CheckCircle2", [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
      ]);
    },
  });
//# sourceMappingURL=4688.js.map
