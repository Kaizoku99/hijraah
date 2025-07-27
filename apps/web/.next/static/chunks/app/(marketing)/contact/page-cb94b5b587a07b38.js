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
    (e._sentryDebugIds[s] = "b7f4c57b-480e-4ac5-a4bb-aa909d189ab5"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-b7f4c57b-480e-4ac5-a4bb-aa909d189ab5"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4461],
  {
    337: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 30697));
    },
    30697: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => f });
      var l = a(30602),
        t = a(26515),
        r = a(61053),
        n = a(57626),
        i = a(42582),
        d = a(85218),
        c = a(72508),
        o = a(17967),
        m = a(47482),
        u = a(5271),
        h = a(77413),
        x = a(16873),
        j = a(4401),
        b = a(1805);
      let p = o.Ik({
        name: o.Yj().min(2, "Name must be at least 2 characters"),
        email: o.Yj().email("Invalid email address"),
        subject: o.Yj().min(5, "Subject must be at least 5 characters"),
        message: o.Yj().min(10, "Message must be at least 10 characters"),
      });
      function f() {
        let [e, s] = (0, d.useState)(!1),
          { toast: a } = (0, m.d)(),
          o = (0, c.mN)({
            resolver: (0, t.u)(p),
            defaultValues: { name: "", email: "", subject: "", message: "" },
          });
        async function f(e) {
          try {
            s(!0),
              await new Promise((e) => setTimeout(e, 1e3)),
              a({
                title: "Message sent!",
                description: "We'll get back to you as soon as possible.",
              }),
              o.reset();
          } catch (e) {
            a({
              title: "Error",
              description: "Something went wrong. Please try again.",
              variant: "destructive",
            });
          } finally {
            s(!1);
          }
        }
        return (0, l.jsx)("div", {
          className: "container py-12",
          children: (0, l.jsxs)("div", {
            className: "grid gap-8 md:grid-cols-2",
            children: [
              (0, l.jsxs)("div", {
                children: [
                  (0, l.jsx)("h1", {
                    className: "text-3xl font-bold mb-4",
                    children: "Contact Us",
                  }),
                  (0, l.jsx)("p", {
                    className: "text-muted-foreground mb-8",
                    children:
                      "Have questions about immigration? We're here to help. Fill out the form below and we'll get back to you as soon as possible.",
                  }),
                  (0, l.jsxs)("div", {
                    className: "space-y-6",
                    children: [
                      (0, l.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                          (0, l.jsx)(r.A, {
                            className: "w-5 h-5 text-muted-foreground",
                          }),
                          (0, l.jsxs)("div", {
                            children: [
                              (0, l.jsx)("h3", {
                                className: "font-medium",
                                children: "Email",
                              }),
                              (0, l.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children: "support@hijraah.com",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, l.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                          (0, l.jsx)(n.A, {
                            className: "w-5 h-5 text-muted-foreground",
                          }),
                          (0, l.jsxs)("div", {
                            children: [
                              (0, l.jsx)("h3", {
                                className: "font-medium",
                                children: "Phone",
                              }),
                              (0, l.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children: "+1 (555) 123-4567",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, l.jsxs)("div", {
                        className: "flex items-center gap-3",
                        children: [
                          (0, l.jsx)(i.A, {
                            className: "w-5 h-5 text-muted-foreground",
                          }),
                          (0, l.jsxs)("div", {
                            children: [
                              (0, l.jsx)("h3", {
                                className: "font-medium",
                                children: "Address",
                              }),
                              (0, l.jsxs)("p", {
                                className: "text-sm text-muted-foreground",
                                children: [
                                  "123 Immigration Street",
                                  (0, l.jsx)("br", {}),
                                  "New York, NY 10001",
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
              (0, l.jsx)(h.Zp, {
                className: "p-6",
                children: (0, l.jsxs)(x.lV, {
                  form: o,
                  onSubmit: o.handleSubmit(f),
                  className: "space-y-6",
                  children: [
                    (0, l.jsx)(x.zB, {
                      control: o.control,
                      name: "name",
                      render: (e) => {
                        let { field: s } = e;
                        return (0, l.jsxs)(x.eI, {
                          children: [
                            (0, l.jsx)(x.lR, { children: "Name" }),
                            (0, l.jsx)(x.MJ, {
                              children: (0, l.jsx)(j.p, {
                                placeholder: "Your name",
                                ...s,
                              }),
                            }),
                            (0, l.jsx)(x.C5, {}),
                          ],
                        });
                      },
                    }),
                    (0, l.jsx)(x.zB, {
                      control: o.control,
                      name: "email",
                      render: (e) => {
                        let { field: s } = e;
                        return (0, l.jsxs)(x.eI, {
                          children: [
                            (0, l.jsx)(x.lR, { children: "Email" }),
                            (0, l.jsx)(x.MJ, {
                              children: (0, l.jsx)(j.p, {
                                placeholder: "your@email.com",
                                type: "email",
                                ...s,
                              }),
                            }),
                            (0, l.jsx)(x.C5, {}),
                          ],
                        });
                      },
                    }),
                    (0, l.jsx)(x.zB, {
                      control: o.control,
                      name: "subject",
                      render: (e) => {
                        let { field: s } = e;
                        return (0, l.jsxs)(x.eI, {
                          children: [
                            (0, l.jsx)(x.lR, { children: "Subject" }),
                            (0, l.jsx)(x.MJ, {
                              children: (0, l.jsx)(j.p, {
                                placeholder: "How can we help?",
                                ...s,
                              }),
                            }),
                            (0, l.jsx)(x.C5, {}),
                          ],
                        });
                      },
                    }),
                    (0, l.jsx)(x.zB, {
                      control: o.control,
                      name: "message",
                      render: (e) => {
                        let { field: s } = e;
                        return (0, l.jsxs)(x.eI, {
                          children: [
                            (0, l.jsx)(x.lR, { children: "Message" }),
                            (0, l.jsx)(x.MJ, {
                              children: (0, l.jsx)(b.T, {
                                placeholder:
                                  "Tell us more about your inquiry...",
                                className: "min-h-[120px]",
                                ...s,
                              }),
                            }),
                            (0, l.jsx)(x.C5, {}),
                          ],
                        });
                      },
                    }),
                    (0, l.jsx)(u.$, {
                      type: "submit",
                      className: "w-full",
                      disabled: e,
                      children: e ? "Sending..." : "Send Message",
                    }),
                  ],
                }),
              }),
            ],
          }),
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [4223, 3209, 6593, 7358], () => s(337)), (_N_E = e.O());
  },
]);
