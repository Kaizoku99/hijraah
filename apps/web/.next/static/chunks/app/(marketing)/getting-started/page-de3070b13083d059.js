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
    (e._sentryDebugIds[t] = "89d8aef5-e8e4-4f2c-a767-3bc0f14b0567"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-89d8aef5-e8e4-4f2c-a767-3bc0f14b0567"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6753],
  {
    6833: (e, t, s) => {
      "use strict";
      s.r(t), s.d(t, { default: () => u });
      var i = s(30602),
        n = s(61511),
        r = s(62839),
        o = s(40972),
        a = s(33814),
        l = s(62408),
        c = s(97687),
        d = s.n(c),
        h = s(5271),
        m = s(77413);
      function u() {
        let e = [
          {
            title: "Start a Chat",
            description:
              "Begin by chatting with our AI assistant to understand your immigration options.",
            icon: n.A,
            href: "/chat",
            buttonText: "Start Chat",
          },
          {
            title: "Check Eligibility",
            description:
              "Use our assessment tool to check your eligibility for different immigration programs.",
            icon: r.A,
            href: "/assessment",
            buttonText: "Check Now",
          },
          {
            title: "Prepare Documents",
            description:
              "Get a personalized checklist of required documents for your immigration process.",
            icon: o.A,
            href: "/documents",
            buttonText: "View Checklist",
          },
          {
            title: "Join Community",
            description:
              "Connect with others who are also going through the immigration process.",
            icon: a.A,
            href: "/community",
            buttonText: "Join Now",
          },
        ];
        return (0, i.jsxs)("div", {
          className: "container max-w-4xl py-8",
          children: [
            (0, i.jsxs)("div", {
              className: "text-center mb-12",
              children: [
                (0, i.jsx)("h1", {
                  className: "text-4xl font-bold mb-4",
                  children: "Welcome to Hijraah",
                }),
                (0, i.jsx)("p", {
                  className: "text-xl text-muted-foreground",
                  children: "Let's get you started on your immigration journey",
                }),
              ],
            }),
            (0, i.jsx)("div", {
              className: "grid gap-6",
              children: e.map((e, t) =>
                (0, i.jsx)(
                  m.Zp,
                  {
                    className: "p-6",
                    children: (0, i.jsxs)("div", {
                      className: "flex items-start gap-4",
                      children: [
                        (0, i.jsx)("div", {
                          className:
                            "flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10",
                          children: (0, i.jsx)(e.icon, {
                            className: "h-6 w-6 text-primary",
                          }),
                        }),
                        (0, i.jsxs)("div", {
                          className: "flex-1",
                          children: [
                            (0, i.jsx)("h2", {
                              className: "text-xl font-semibold mb-2",
                              children: e.title,
                            }),
                            (0, i.jsx)("p", {
                              className: "text-muted-foreground mb-4",
                              children: e.description,
                            }),
                            (0, i.jsx)(h.$, {
                              asChild: !0,
                              children: (0, i.jsxs)(d(), {
                                href: e.href,
                                legacyBehavior: !0,
                                children: [
                                  e.buttonText,
                                  (0, i.jsx)(l.A, {
                                    className: "ml-2 h-4 w-4",
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  },
                  t,
                ),
              ),
            }),
          ],
        });
      }
    },
    15945: (e, t, s) => {
      Promise.resolve().then(s.bind(s, 6833));
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [6593, 4223, 3209, 7358], () => t(15945)), (_N_E = e.O());
  },
]);
