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
    (e._sentryDebugIds[s] = "9f389add-77a3-4e86-aee0-73144730706d"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-9f389add-77a3-4e86-aee0-73144730706d"));
} catch (e) {}
("use strict");
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [508],
  {
    60508: (e, s, i) => {
      i.r(s), i.d(s, { WelcomeModal: () => o });
      var a = i(30602),
        t = i(17957),
        l = i(62839);
      i(85218);
      var n = i(10190),
        d = i(5271),
        c = i(14315),
        r = i(20731);
      let o = () => {
        let { onboarding: e, nextStep: s, skipOnboarding: i } = (0, r.z)(),
          o = (0, n.Dv)("welcome"),
          m =
            e.isActive &&
            "welcome" === e.currentStep &&
            !e.hideForSession &&
            !e.isCompleted;
        if (!m || !o) return null;
        let p = o.features || [];
        return (0, a.jsx)(c.lG, {
          open: m,
          onOpenChange: (e) => !e && i(),
          children: (0, a.jsxs)(c.Cf, {
            className: "sm:max-w-[500px]",
            children: [
              (0, a.jsxs)(c.c7, {
                children: [
                  (0, a.jsx)(t.P.div, {
                    initial: { y: -20, opacity: 0 },
                    animate: { y: 0, opacity: 1 },
                    transition: { duration: 0.5 },
                    children: (0, a.jsxs)(c.L3, {
                      className: "text-2xl font-bold text-center",
                      children: [o.title, " "],
                    }),
                  }),
                  (0, a.jsx)(t.P.div, {
                    initial: { y: 20, opacity: 0 },
                    animate: { y: 0, opacity: 1 },
                    transition: { duration: 0.5, delay: 0.2 },
                    children: (0, a.jsxs)(c.rr, {
                      className: "text-center pt-2",
                      children: [o.description, " "],
                    }),
                  }),
                ],
              }),
              (0, a.jsx)("div", {
                className: "py-6",
                children: (0, a.jsx)(t.P.div, {
                  initial: { scale: 0.9, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { duration: 0.4, delay: 0.4 },
                  className: "space-y-4",
                  children: p.map((e, s) =>
                    (0, a.jsxs)(
                      "div",
                      {
                        className: "flex items-start space-x-3",
                        children: [
                          (0, a.jsx)(t.P.div, {
                            initial: { scale: 0, opacity: 0 },
                            animate: { scale: 1, opacity: 1 },
                            transition: { duration: 0.3, delay: 0.5 + 0.1 * s },
                            className: "mt-0.5",
                            children: (0, a.jsx)(l.A, {
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
              (0, a.jsxs)(c.Es, {
                className: "sm:justify-between flex-col sm:flex-row gap-2",
                children: [
                  (0, a.jsx)(d.$, {
                    variant: "outline",
                    onClick: i,
                    className: "w-full sm:w-auto",
                    children: "Skip Tour",
                  }),
                  (0, a.jsx)(d.$, {
                    onClick: s,
                    className: "w-full sm:w-auto",
                    children: "Get Started",
                  }),
                ],
              }),
            ],
          }),
        });
      };
    },
  },
]);
