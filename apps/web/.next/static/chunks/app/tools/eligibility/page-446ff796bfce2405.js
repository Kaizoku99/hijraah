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
    a = new e.Error().stack;
  a &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[a] = "77ebe15b-85ff-4e97-bca4-c6ea5161b498"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-77ebe15b-85ff-4e97-bca4-c6ea5161b498"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9512],
  {
    19628: (e, a, s) => {
      Promise.resolve().then(s.bind(s, 66033));
    },
    66033: (e, a, s) => {
      "use strict";
      s.r(a), s.d(a, { default: () => j });
      var l = s(30602),
        i = s(26515),
        t = s(62839),
        r = s(38027),
        n = s(85218),
        o = s(72508),
        c = s(17967),
        d = s(5271),
        u = s(77413),
        m = s(16873),
        b = s(33511),
        h = s(6277),
        x = s(91554),
        g = s(30311);
      function p(e) {
        let { className: a, ...s } = e;
        return (0, l.jsx)(h.bL, {
          "data-slot": "radio-group",
          className: (0, g.cn)("grid gap-3", a),
          ...s,
        });
      }
      function v(e) {
        let { className: a, ...s } = e;
        return (0, l.jsx)(h.q7, {
          "data-slot": "radio-group-item",
          className: (0, g.cn)(
            "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            a,
          ),
          ...s,
          children: (0, l.jsx)(h.C1, {
            "data-slot": "radio-group-indicator",
            className: "relative flex items-center justify-center",
            children: (0, l.jsx)(x.A, {
              className:
                "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2",
            }),
          }),
        });
      }
      let f = [
          {
            id: "age",
            question: "What is your age group?",
            options: [
              { value: "18-24", label: "18-24 years" },
              { value: "25-34", label: "25-34 years" },
              { value: "35-44", label: "35-44 years" },
              { value: "45-plus", label: "45 years or older" },
            ],
          },
          {
            id: "education",
            question: "What is your highest level of education?",
            options: [
              { value: "high-school", label: "High School" },
              { value: "bachelors", label: "Bachelor&apos;s Degree" },
              { value: "masters", label: "Master&apos;s Degree" },
              { value: "phd", label: "PhD or Doctorate" },
            ],
          },
          {
            id: "experience",
            question: "How many years of work experience do you have?",
            options: [
              { value: "0-2", label: "0-2 years" },
              { value: "3-5", label: "3-5 years" },
              { value: "6-10", label: "6-10 years" },
              { value: "10-plus", label: "10+ years" },
            ],
          },
          {
            id: "language",
            question: "What is your English language proficiency?",
            options: [
              { value: "basic", label: "Basic" },
              { value: "intermediate", label: "Intermediate" },
              { value: "advanced", label: "Advanced" },
              { value: "native", label: "Native/Bilingual" },
            ],
          },
        ],
        y = c.Ik({
          age: c.Yj(),
          education: c.Yj(),
          experience: c.Yj(),
          language: c.Yj(),
        });
      function j() {
        let [e, a] = (0, n.useState)(0),
          [s, c] = (0, n.useState)(!1),
          h = (0, o.mN)({ resolver: (0, i.u)(y) }),
          x = ((e + 1) / f.length) * 100,
          g = (e) => {
            let a = 0;
            return (
              "25-34" === e.age && (a += 25),
              ("masters" === e.education || "phd" === e.education) && (a += 25),
              ("6-10" === e.experience || "10-plus" === e.experience) &&
                (a += 25),
              ("advanced" === e.language || "native" === e.language) &&
                (a += 25),
              a
            );
          };
        return (0, l.jsx)("div", {
          className: "container max-w-2xl py-12",
          children: (0, l.jsx)(u.Zp, {
            className: "p-6",
            children: s
              ? (0, l.jsxs)("div", {
                  className: "text-center",
                  children: [
                    (0, l.jsxs)("div", {
                      className: "mb-6",
                      children: [
                        g(h.getValues()) >= 75
                          ? (0, l.jsx)(t.A, {
                              className:
                                "w-16 h-16 text-green-500 mx-auto mb-4",
                            })
                          : (0, l.jsx)(r.A, {
                              className: "w-16 h-16 text-red-500 mx-auto mb-4",
                            }),
                        (0, l.jsx)("h2", {
                          className: "text-2xl font-bold mb-2",
                          children: "Assessment Results",
                        }),
                        (0, l.jsx)("p", {
                          className: "text-muted-foreground",
                          children:
                            "Based on your responses, here's your eligibility assessment:",
                        }),
                      ],
                    }),
                    (0, l.jsxs)("div", {
                      className: "mb-8",
                      children: [
                        (0, l.jsxs)("div", {
                          className: "text-4xl font-bold mb-2",
                          children: [g(h.getValues()), "%"],
                        }),
                        (0, l.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children: "Eligibility Score",
                        }),
                      ],
                    }),
                    (0, l.jsxs)("div", {
                      className: "space-y-4",
                      children: [
                        (0, l.jsx)("p", {
                          className: "text-sm",
                          children:
                            g(h.getValues()) >= 75
                              ? "You appear to be eligible for immigration programs. We recommend proceeding with your application."
                              : "You might need to improve certain aspects to increase your eligibility. Consider consulting with an immigration expert.",
                        }),
                        (0, l.jsx)(d.$, {
                          onClick: () => {
                            c(!1), a(0), h.reset();
                          },
                          children: "Start Over",
                        }),
                      ],
                    }),
                  ],
                })
              : (0, l.jsxs)(l.Fragment, {
                  children: [
                    (0, l.jsxs)("div", {
                      className: "mb-8",
                      children: [
                        (0, l.jsx)("h1", {
                          className: "text-2xl font-bold mb-2",
                          children: "Eligibility Assessment",
                        }),
                        (0, l.jsx)(b.k, { value: x, className: "h-2" }),
                        (0, l.jsxs)("p", {
                          className: "text-sm text-muted-foreground mt-2",
                          children: ["Question ", e + 1, " of ", f.length],
                        }),
                      ],
                    }),
                    (0, l.jsx)(m.lV, {
                      ...h,
                      children: (0, l.jsxs)("form", {
                        onSubmit: h.handleSubmit((s) => {
                          e < f.length - 1 ? a(e + 1) : c(!0);
                        }),
                        className: "space-y-6",
                        children: [
                          (0, l.jsx)(m.zB, {
                            control: h.control,
                            name: f[e].id,
                            render: (a) => {
                              let { field: s } = a;
                              return (0, l.jsxs)(m.eI, {
                                className: "space-y-3",
                                children: [
                                  (0, l.jsx)(m.lR, { children: f[e].question }),
                                  (0, l.jsx)(m.MJ, {
                                    children: (0, l.jsx)(p, {
                                      onValueChange: s.onChange,
                                      defaultValue: s.value,
                                      className: "flex flex-col space-y-1",
                                      children: f[e].options.map((e) =>
                                        (0, l.jsxs)(
                                          m.eI,
                                          {
                                            className:
                                              "flex items-center space-x-3 space-y-0",
                                            children: [
                                              (0, l.jsx)(m.MJ, {
                                                children: (0, l.jsx)(v, {
                                                  value: e.value,
                                                }),
                                              }),
                                              (0, l.jsx)(m.lR, {
                                                className: "font-normal",
                                                children: e.label,
                                              }),
                                            ],
                                          },
                                          e.value,
                                        ),
                                      ),
                                    }),
                                  }),
                                ],
                              });
                            },
                          }),
                          (0, l.jsx)(d.$, {
                            type: "submit",
                            children: e === f.length - 1 ? "Submit" : "Next",
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
          }),
        });
      }
    },
  },
  (e) => {
    var a = (a) => e((e.s = a));
    e.O(0, [4223, 3209, 6593, 7358], () => a(19628)), (_N_E = e.O());
  },
]);
