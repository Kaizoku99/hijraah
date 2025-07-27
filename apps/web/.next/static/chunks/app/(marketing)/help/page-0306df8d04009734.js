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
    (e._sentryDebugIds[s] = "5b471887-dd42-4fac-abab-2c2048e7b288"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-5b471887-dd42-4fac-abab-2c2048e7b288"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [1791],
  {
    27544: (e, s, i) => {
      "use strict";
      i.r(s), i.d(s, { default: () => o });
      var a = i(30602),
        l = i(61511),
        n = i(97687),
        t = i.n(n),
        r = i(69727),
        d = i(5271),
        c = i(77413);
      function o() {
        return (0, a.jsxs)("div", {
          className: "container max-w-4xl py-8",
          children: [
            (0, a.jsx)("h1", {
              className: "text-3xl font-bold mb-6",
              children: "Help Center",
            }),
            (0, a.jsxs)("div", {
              className: "grid gap-6",
              children: [
                (0, a.jsxs)(c.Zp, {
                  className: "p-6",
                  children: [
                    (0, a.jsx)("h2", {
                      className: "text-xl font-semibold mb-4",
                      children: "Need Immediate Assistance?",
                    }),
                    (0, a.jsx)("p", {
                      className: "text-muted-foreground mb-4",
                      children:
                        "Our AI assistant is available 24/7 to help answer your questions.",
                    }),
                    (0, a.jsx)(d.$, {
                      asChild: !0,
                      children: (0, a.jsx)(t(), {
                        href: "/chat",
                        legacyBehavior: !0,
                        children: (0, a.jsxs)("a", {
                          children: [
                            (0, a.jsx)(l.A, { className: "mr-2 h-4 w-4" }),
                            "Start Chat",
                          ],
                        }),
                      }),
                    }),
                  ],
                }),
                (0, a.jsxs)("div", {
                  children: [
                    (0, a.jsx)("h2", {
                      className: "text-xl font-semibold mb-4",
                      children: "Frequently Asked Questions",
                    }),
                    (0, a.jsxs)(r.nD, {
                      type: "single",
                      collapsible: !0,
                      className: "w-full",
                      children: [
                        (0, a.jsxs)(r.As, {
                          value: "what-is",
                          children: [
                            (0, a.jsx)(r.$m, { children: "What is Hijraah?" }),
                            (0, a.jsx)(r.ub, {
                              children:
                                "Hijraah is an AI-powered immigration assistant that helps you navigate the complex immigration process. We provide personalized guidance, document assistance, and real-time support for your immigration journey.",
                            }),
                          ],
                        }),
                        (0, a.jsxs)(r.As, {
                          value: "how-works",
                          children: [
                            (0, a.jsx)(r.$m, { children: "How does it work?" }),
                            (0, a.jsx)(r.ub, {
                              children:
                                "Our AI analyzes your specific situation and provides tailored guidance based on current immigration laws and regulations. You can chat with our AI assistant, get document reviews, and receive step-by-step guidance throughout your immigration process.",
                            }),
                          ],
                        }),
                        (0, a.jsxs)(r.As, {
                          value: "features",
                          children: [
                            (0, a.jsx)(r.$m, {
                              children: "What features are available?",
                            }),
                            (0, a.jsx)(r.ub, {
                              children: (0, a.jsxs)("ul", {
                                className: "list-disc pl-4 space-y-2",
                                children: [
                                  (0, a.jsx)("li", {
                                    children: "24/7 AI Chat Support",
                                  }),
                                  (0, a.jsx)("li", {
                                    children: "Document Review and Analysis",
                                  }),
                                  (0, a.jsx)("li", {
                                    children: "Eligibility Assessment",
                                  }),
                                  (0, a.jsx)("li", {
                                    children:
                                      "Step-by-Step Immigration Guidance",
                                  }),
                                  (0, a.jsx)("li", {
                                    children:
                                      "Real-time Updates and Notifications",
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                        (0, a.jsxs)(r.As, {
                          value: "support",
                          children: [
                            (0, a.jsx)(r.$m, {
                              children: "How can I get support?",
                            }),
                            (0, a.jsxs)(r.ub, {
                              children: [
                                "You can get support through multiple channels:",
                                (0, a.jsxs)("ul", {
                                  className: "list-disc pl-4 space-y-2 mt-2",
                                  children: [
                                    (0, a.jsx)("li", {
                                      children:
                                        "Chat with our AI assistant 24/7",
                                    }),
                                    (0, a.jsx)("li", {
                                      children:
                                        "Email support at support@hijraah.com",
                                    }),
                                    (0, a.jsx)("li", {
                                      children:
                                        "Check our documentation for detailed guides",
                                    }),
                                    (0, a.jsx)("li", {
                                      children: "Join our community forum",
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
              ],
            }),
          ],
        });
      }
    },
    82570: (e, s, i) => {
      Promise.resolve().then(i.bind(i, 27544));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(82570)), (_N_E = e.O());
  },
]);
