try {
  let s =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
          ? global
          : "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self
              ? self
              : {},
    e = new s.Error().stack;
  e &&
    ((s._sentryDebugIds = s._sentryDebugIds || {}),
    (s._sentryDebugIds[e] = "957855bf-e914-4f59-85ff-45a4340a56d1"),
    (s._sentryDebugIdIdentifier =
      "sentry-dbid-957855bf-e914-4f59-85ff-45a4340a56d1"));
} catch (s) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6888],
  {
    15116: (s, e, a) => {
      Promise.resolve().then(a.bind(a, 32964));
    },
    32964: (s, e, a) => {
      "use strict";
      a.r(e), a.d(e, { default: () => x });
      var l = a(30602),
        i = a(78179),
        t = a(61511),
        r = a(90630),
        n = a(40467),
        c = a(85218),
        d = a(11148),
        o = a(5271),
        m = a(77413),
        h = a(86697);
      let u = [
        {
          id: 1,
          author: {
            name: "John Doe",
            image:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
          },
          title: "My Immigration Success Story",
          content: "After 2 years of hard work and dedication...",
          likes: 42,
          comments: 12,
          category: "success-stories",
        },
      ];
      function x() {
        let [s, e] = (0, c.useState)("all");
        return (0, l.jsxs)("div", {
          className: "container py-8",
          children: [
            (0, l.jsxs)("div", {
              className: "flex justify-between items-center mb-8",
              children: [
                (0, l.jsxs)("div", {
                  children: [
                    (0, l.jsx)("h1", {
                      className: "text-3xl font-bold",
                      children: "Community",
                    }),
                    (0, l.jsx)("p", {
                      className: "text-muted-foreground",
                      children:
                        "Connect with others on their immigration journey",
                    }),
                  ],
                }),
                (0, l.jsx)(o.$, { children: "Create Post" }),
              ],
            }),
            (0, l.jsxs)("div", {
              className: "grid md:grid-cols-3 gap-6",
              children: [
                (0, l.jsx)("div", {
                  className: "md:col-span-2",
                  children: (0, l.jsxs)(h.Tabs, {
                    defaultValue: "all",
                    className: "mb-6",
                    children: [
                      (0, l.jsxs)(h.TabsList, {
                        children: [
                          (0, l.jsx)(h.TabsTrigger, {
                            value: "all",
                            children: "All Posts",
                          }),
                          (0, l.jsx)(h.TabsTrigger, {
                            value: "success-stories",
                            children: "Success Stories",
                          }),
                          (0, l.jsx)(h.TabsTrigger, {
                            value: "questions",
                            children: "Questions",
                          }),
                          (0, l.jsx)(h.TabsTrigger, {
                            value: "resources",
                            children: "Resources",
                          }),
                        ],
                      }),
                      (0, l.jsx)(h.TabsContent, {
                        value: "all",
                        className: "space-y-4",
                        children: u.map((s) =>
                          (0, l.jsx)(
                            m.Zp,
                            {
                              className: "p-6",
                              children: (0, l.jsxs)("div", {
                                className: "flex items-start gap-4",
                                children: [
                                  (0, l.jsx)(d.eu, {
                                    children: (0, l.jsx)(n.default, {
                                      src: s.author.image,
                                      alt: s.author.name,
                                      width: 40,
                                      height: 40,
                                      className: "rounded-full",
                                    }),
                                  }),
                                  (0, l.jsxs)("div", {
                                    className: "flex-1",
                                    children: [
                                      (0, l.jsx)("div", {
                                        className:
                                          "flex justify-between items-start",
                                        children: (0, l.jsxs)("div", {
                                          children: [
                                            (0, l.jsx)("h3", {
                                              className: "font-semibold",
                                              children: s.title,
                                            }),
                                            (0, l.jsxs)("p", {
                                              className:
                                                "text-sm text-muted-foreground",
                                              children: [
                                                "Posted by ",
                                                s.author.name,
                                              ],
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, l.jsx)("p", {
                                        className: "mt-2",
                                        children: s.content,
                                      }),
                                      (0, l.jsxs)("div", {
                                        className: "mt-4 flex gap-4",
                                        children: [
                                          (0, l.jsxs)(o.$, {
                                            variant: "ghost",
                                            size: "sm",
                                            children: [
                                              (0, l.jsx)(i.A, {
                                                className: "w-4 h-4 mr-2",
                                              }),
                                              s.likes,
                                            ],
                                          }),
                                          (0, l.jsxs)(o.$, {
                                            variant: "ghost",
                                            size: "sm",
                                            children: [
                                              (0, l.jsx)(t.A, {
                                                className: "w-4 h-4 mr-2",
                                              }),
                                              s.comments,
                                            ],
                                          }),
                                          (0, l.jsxs)(o.$, {
                                            variant: "ghost",
                                            size: "sm",
                                            children: [
                                              (0, l.jsx)(r.A, {
                                                className: "w-4 h-4 mr-2",
                                              }),
                                              "Share",
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            },
                            s.id,
                          ),
                        ),
                      }),
                    ],
                  }),
                }),
                (0, l.jsxs)("div", {
                  className: "space-y-6",
                  children: [
                    (0, l.jsxs)(m.Zp, {
                      className: "p-6",
                      children: [
                        (0, l.jsx)("h3", {
                          className: "font-semibold mb-4",
                          children: "Popular Topics",
                        }),
                        (0, l.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, l.jsx)(o.$, {
                              variant: "outline",
                              className: "w-full justify-start",
                              children: "#VisaApplication",
                            }),
                            (0, l.jsx)(o.$, {
                              variant: "outline",
                              className: "w-full justify-start",
                              children: "#StudyAbroad",
                            }),
                            (0, l.jsx)(o.$, {
                              variant: "outline",
                              className: "w-full justify-start",
                              children: "#WorkPermit",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, l.jsxs)(m.Zp, {
                      className: "p-6",
                      children: [
                        (0, l.jsx)("h3", {
                          className: "font-semibold mb-4",
                          children: "Community Guidelines",
                        }),
                        (0, l.jsxs)("ul", {
                          className: "space-y-2 text-sm text-muted-foreground",
                          children: [
                            (0, l.jsx)("li", {
                              children: "Be respectful and supportive",
                            }),
                            (0, l.jsx)("li", {
                              children: "Share accurate information",
                            }),
                            (0, l.jsx)("li", {
                              children: "Protect personal information",
                            }),
                            (0, l.jsx)("li", {
                              children: "No spam or self-promotion",
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
  },
  (s) => {
    var e = (e) => s((s.s = e));
    s.O(0, [6593, 4223, 3209, 7358], () => e(15116)), (_N_E = s.O());
  },
]);
