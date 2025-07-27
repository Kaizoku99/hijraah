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
    l = new e.Error().stack;
  l &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[l] = "32f1610c-4568-4ef9-9af8-9dd98a2774d5"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-32f1610c-4568-4ef9-9af8-9dd98a2774d5"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6627],
  {
    17183: (e, l, s) => {
      Promise.resolve().then(s.bind(s, 71687));
    },
    71687: (e, l, s) => {
      "use strict";
      s.r(l), s.d(l, { default: () => u });
      var a = s(30602),
        t = s(73382),
        n = s(85218),
        i = s(5271),
        r = s(77413),
        c = s(60070),
        d = s(61159);
      let o = {
        age: {
          "18-24": 15,
          "25-29": 25,
          "30-34": 20,
          "35-39": 15,
          "40-44": 10,
          "45-plus": 5,
        },
        education: { "high-school": 5, bachelors: 15, masters: 20, phd: 25 },
        experience: { "0-2": 5, "3-5": 10, "6-10": 15, "10-plus": 20 },
        language: { basic: 5, intermediate: 10, advanced: 15, native: 20 },
        adaptability: { none: 0, relative: 5, education: 10, work: 15 },
      };
      function u() {
        let [e, l] = (0, n.useState)({
            age: "0",
            education: "0",
            experience: "0",
            language: "0",
            adaptability: "0",
          }),
          s = () => Object.values(e).reduce((e, l) => e + Number(l), 0);
        return (0, a.jsx)("div", {
          className: "container max-w-2xl py-12",
          children: (0, a.jsxs)(r.Zp, {
            className: "p-6",
            children: [
              (0, a.jsxs)("div", {
                className: "flex items-center gap-3 mb-8",
                children: [
                  (0, a.jsx)(t.A, { className: "w-8 h-8" }),
                  (0, a.jsxs)("div", {
                    children: [
                      (0, a.jsx)("h1", {
                        className: "text-2xl font-bold",
                        children: "Points Calculator",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children:
                          "Calculate your points for skilled immigration programs",
                      }),
                    ],
                  }),
                ],
              }),
              (0, a.jsxs)("div", {
                className: "space-y-6",
                children: [
                  (0, a.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, a.jsx)(c.J, { children: "Age" }),
                      (0, a.jsxs)(d.l6, {
                        onValueChange: (s) => l({ ...e, age: s }),
                        defaultValue: "0",
                        children: [
                          (0, a.jsx)(d.bq, {
                            children: (0, a.jsx)(d.yv, {
                              placeholder: "Select age group",
                            }),
                          }),
                          (0, a.jsxs)(d.gC, {
                            children: [
                              (0, a.jsx)(d.eb, {
                                value: "0",
                                children: "Select age group",
                              }),
                              Object.entries(o.age).map((e) => {
                                let [l, s] = e;
                                return (0, a.jsxs)(
                                  d.eb,
                                  {
                                    value: s.toString(),
                                    children: [
                                      l.replace("-", " to "),
                                      " (",
                                      s,
                                      " points)",
                                    ],
                                  },
                                  l,
                                );
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, a.jsx)(c.J, { children: "Education" }),
                      (0, a.jsxs)(d.l6, {
                        onValueChange: (s) => l({ ...e, education: s }),
                        defaultValue: "0",
                        children: [
                          (0, a.jsx)(d.bq, {
                            children: (0, a.jsx)(d.yv, {
                              placeholder: "Select education level",
                            }),
                          }),
                          (0, a.jsxs)(d.gC, {
                            children: [
                              (0, a.jsx)(d.eb, {
                                value: "0",
                                children: "Select education level",
                              }),
                              Object.entries(o.education).map((e) => {
                                let [l, s] = e;
                                return (0, a.jsxs)(
                                  d.eb,
                                  {
                                    value: s.toString(),
                                    children: [
                                      l.replace("-", " "),
                                      " (",
                                      s,
                                      " points)",
                                    ],
                                  },
                                  l,
                                );
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, a.jsx)(c.J, { children: "Work Experience" }),
                      (0, a.jsxs)(d.l6, {
                        onValueChange: (s) => l({ ...e, experience: s }),
                        defaultValue: "0",
                        children: [
                          (0, a.jsx)(d.bq, {
                            children: (0, a.jsx)(d.yv, {
                              placeholder: "Select years of experience",
                            }),
                          }),
                          (0, a.jsxs)(d.gC, {
                            children: [
                              (0, a.jsx)(d.eb, {
                                value: "0",
                                children: "Select years of experience",
                              }),
                              Object.entries(o.experience).map((e) => {
                                let [l, s] = e;
                                return (0, a.jsxs)(
                                  d.eb,
                                  {
                                    value: s.toString(),
                                    children: [
                                      l.replace("-", " to "),
                                      " years (",
                                      s,
                                      " points)",
                                    ],
                                  },
                                  l,
                                );
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, a.jsx)(c.J, { children: "Language Proficiency" }),
                      (0, a.jsxs)(d.l6, {
                        onValueChange: (s) => l({ ...e, language: s }),
                        defaultValue: "0",
                        children: [
                          (0, a.jsx)(d.bq, {
                            children: (0, a.jsx)(d.yv, {
                              placeholder: "Select language level",
                            }),
                          }),
                          (0, a.jsxs)(d.gC, {
                            children: [
                              (0, a.jsx)(d.eb, {
                                value: "0",
                                children: "Select language level",
                              }),
                              Object.entries(o.language).map((e) => {
                                let [l, s] = e;
                                return (0, a.jsxs)(
                                  d.eb,
                                  {
                                    value: s.toString(),
                                    children: [l, " (", s, " points)"],
                                  },
                                  l,
                                );
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, a.jsx)(c.J, { children: "Adaptability Factors" }),
                      (0, a.jsxs)(d.l6, {
                        onValueChange: (s) => l({ ...e, adaptability: s }),
                        defaultValue: "0",
                        children: [
                          (0, a.jsx)(d.bq, {
                            children: (0, a.jsx)(d.yv, {
                              placeholder: "Select adaptability factors",
                            }),
                          }),
                          (0, a.jsxs)(d.gC, {
                            children: [
                              (0, a.jsx)(d.eb, {
                                value: "0",
                                children: "Select adaptability factors",
                              }),
                              Object.entries(o.adaptability).map((e) => {
                                let [l, s] = e;
                                return (0, a.jsxs)(
                                  d.eb,
                                  {
                                    value: s.toString(),
                                    children: [l, " (", s, " points)"],
                                  },
                                  l,
                                );
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className: "pt-6 border-t",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                          (0, a.jsx)("span", {
                            className: "text-lg font-semibold",
                            children: "Total Points:",
                          }),
                          (0, a.jsx)("span", {
                            className: "text-2xl font-bold",
                            children: s(),
                          }),
                        ],
                      }),
                      (0, a.jsx)("div", {
                        className: "text-sm text-muted-foreground",
                        children:
                          s() >= 67
                            ? (0, a.jsx)("p", {
                                className: "text-green-600 dark:text-green-400",
                                children:
                                  "You meet the minimum points requirement (67 points) for many skilled immigration programs.",
                              })
                            : (0, a.jsxs)("p", {
                                className:
                                  "text-yellow-600 dark:text-yellow-400",
                                children: [
                                  "You need ",
                                  67 - s(),
                                  " more points to meet the minimum requirement of 67 points.",
                                ],
                              }),
                      }),
                    ],
                  }),
                  (0, a.jsx)(i.$, {
                    className: "w-full",
                    onClick: () =>
                      l({
                        age: "0",
                        education: "0",
                        experience: "0",
                        language: "0",
                        adaptability: "0",
                      }),
                    children: "Reset Calculator",
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
  },
  (e) => {
    var l = (l) => e((e.s = l));
    e.O(0, [4223, 3209, 6593, 7358], () => l(17183)), (_N_E = e.O());
  },
]);
