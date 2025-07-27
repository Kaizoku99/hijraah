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
    (e._sentryDebugIds[s] = "2d99d015-d5c7-4892-8a12-ddb3f32a5314"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-2d99d015-d5c7-4892-8a12-ddb3f32a5314"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8064],
  {
    22144: (e, s, l) => {
      Promise.resolve().then(l.bind(l, 25650));
    },
    25650: (e, s, l) => {
      "use strict";
      l.r(s), l.d(s, { default: () => b });
      var a = l(30602),
        i = l(48278),
        d = l(42582),
        n = l(83944),
        t = l(87793),
        r = l(40467),
        c = l(85218),
        m = l(11148),
        o = l(5271);
      let x = (e) => {
        let { mode: s = "single", selected: l, onSelect: i, className: d } = e;
        return (0, a.jsx)("div", { className: d });
      };
      var h = l(77413),
        u = l(4401),
        j = l(61159);
      let f = [
        {
          id: 1,
          name: "Dr. Sarah Johnson",
          specialization: "Immigration Law",
          rating: 4.9,
          reviews: 128,
          location: "New York, USA",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          availability: ["Monday", "Wednesday", "Friday"],
          hourlyRate: 150,
        },
      ];
      function b() {
        let [e, s] = (0, c.useState)(null),
          [l, b] = (0, c.useState)(void 0);
        return (0, a.jsxs)("div", {
          className: "container py-8",
          children: [
            (0, a.jsxs)("div", {
              className: "flex justify-between items-center mb-8",
              children: [
                (0, a.jsxs)("div", {
                  children: [
                    (0, a.jsx)("h1", {
                      className: "text-3xl font-bold",
                      children: "Immigration Experts",
                    }),
                    (0, a.jsx)("p", {
                      className: "text-muted-foreground",
                      children:
                        "Connect with verified immigration experts for personalized guidance",
                    }),
                  ],
                }),
                (0, a.jsxs)("div", {
                  className: "flex gap-4",
                  children: [
                    (0, a.jsxs)(j.l6, {
                      children: [
                        (0, a.jsx)(j.bq, {
                          className: "w-[180px]",
                          children: (0, a.jsx)(j.yv, {
                            placeholder: "Specialization",
                          }),
                        }),
                        (0, a.jsxs)(j.gC, {
                          children: [
                            (0, a.jsx)(j.eb, {
                              value: "law",
                              children: "Immigration Law",
                            }),
                            (0, a.jsx)(j.eb, {
                              value: "visa",
                              children: "Visa Processing",
                            }),
                            (0, a.jsx)(j.eb, {
                              value: "business",
                              children: "Business Immigration",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsx)(u.p, {
                      placeholder: "Search experts...",
                      className: "w-[200px]",
                    }),
                  ],
                }),
              ],
            }),
            (0, a.jsx)("div", {
              className: "grid md:grid-cols-2 gap-6",
              children: f.map((e) =>
                (0, a.jsx)(
                  h.Zp,
                  {
                    className: "p-6",
                    children: (0, a.jsxs)("div", {
                      className: "flex gap-4",
                      children: [
                        (0, a.jsx)(m.eu, {
                          className: "h-16 w-16",
                          children: (0, a.jsx)(r.default, {
                            src: e.image,
                            alt: e.name,
                            width: 64,
                            height: 64,
                            className: "rounded-full",
                          }),
                        }),
                        (0, a.jsxs)("div", {
                          className: "flex-1",
                          children: [
                            (0, a.jsxs)("div", {
                              className: "flex justify-between items-start",
                              children: [
                                (0, a.jsxs)("div", {
                                  children: [
                                    (0, a.jsx)("h3", {
                                      className: "font-semibold text-lg",
                                      children: e.name,
                                    }),
                                    (0, a.jsx)("p", {
                                      className:
                                        "text-sm text-muted-foreground",
                                      children: e.specialization,
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)("div", {
                                  className: "flex items-center",
                                  children: [
                                    (0, a.jsx)(i.A, {
                                      className:
                                        "w-4 h-4 text-yellow-400 fill-current",
                                    }),
                                    (0, a.jsxs)("span", {
                                      className: "ml-1 text-sm font-medium",
                                      children: [
                                        e.rating,
                                        " (",
                                        e.reviews,
                                        ")",
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, a.jsxs)("div", {
                              className:
                                "mt-2 flex items-center text-sm text-muted-foreground",
                              children: [
                                (0, a.jsx)(d.A, { className: "w-4 h-4 mr-1" }),
                                e.location,
                              ],
                            }),
                            (0, a.jsxs)("div", {
                              className:
                                "mt-4 flex justify-between items-center",
                              children: [
                                (0, a.jsxs)("div", {
                                  className: "flex items-center",
                                  children: [
                                    (0, a.jsx)(n.A, {
                                      className: "w-4 h-4 mr-1",
                                    }),
                                    (0, a.jsxs)("span", {
                                      className: "text-sm",
                                      children: [
                                        "Available ",
                                        e.availability.join(", "),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)("span", {
                                  className: "text-sm font-medium",
                                  children: ["$", e.hourlyRate, "/hour"],
                                }),
                              ],
                            }),
                            (0, a.jsxs)("div", {
                              className: "mt-4 flex gap-2",
                              children: [
                                (0, a.jsx)(o.$, {
                                  variant: "outline",
                                  className: "flex-1",
                                  onClick: () => s(e.id),
                                  children: "View Profile",
                                }),
                                (0, a.jsxs)(o.$, {
                                  className: "flex-1",
                                  children: [
                                    (0, a.jsx)(t.A, {
                                      className: "w-4 h-4 mr-2",
                                    }),
                                    "Book Consultation",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  },
                  e.id,
                ),
              ),
            }),
            e &&
              (0, a.jsx)("div", {
                className: "fixed inset-0 bg-background/80 backdrop-blur-sm",
                children: (0, a.jsxs)("div", {
                  className:
                    "fixed inset-y-0 right-0 w-full max-w-md border-l bg-background p-6 shadow-lg",
                  children: [
                    (0, a.jsx)("h2", {
                      className: "text-2xl font-bold mb-4",
                      children: "Book Consultation",
                    }),
                    (0, a.jsxs)("div", {
                      className: "space-y-4",
                      children: [
                        (0, a.jsx)(x, {
                          mode: "single",
                          selected: l,
                          onSelect: b,
                          className: "rounded-md border",
                        }),
                        (0, a.jsxs)(j.l6, {
                          children: [
                            (0, a.jsx)(j.bq, {
                              children: (0, a.jsx)(j.yv, {
                                placeholder: "Select time slot",
                              }),
                            }),
                            (0, a.jsxs)(j.gC, {
                              children: [
                                (0, a.jsx)(j.eb, {
                                  value: "9",
                                  children: "9:00 AM",
                                }),
                                (0, a.jsx)(j.eb, {
                                  value: "10",
                                  children: "10:00 AM",
                                }),
                                (0, a.jsx)(j.eb, {
                                  value: "11",
                                  children: "11:00 AM",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsx)(o.$, {
                          className: "w-full",
                          children: "Confirm Booking",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
          ],
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(22144)), (_N_E = e.O());
  },
]);
