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
    (e._sentryDebugIds[s] = "38f9f52b-d601-4af7-ae1a-714a1bfb54a8"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-38f9f52b-d601-4af7-ae1a-714a1bfb54a8"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9275],
  {
    57891: (e, s, a) => {
      "use strict";
      a.r(s), a.d(s, { default: () => h });
      var t = a(30602),
        n = a(58879),
        i = a(45414),
        l = a(85218),
        c = a(5271),
        r = a(77413),
        o = a(77590),
        d = a(60070),
        m = a(61159);
      let u = {
        student: {
          name: "Student Visa",
          documents: [
            "Valid passport",
            "Acceptance letter from educational institution",
            "Proof of financial support",
            "Academic transcripts",
            "Language proficiency test results",
            "Passport-size photographs",
            "Medical examination results",
            "Police clearance certificate",
          ],
        },
        work: {
          name: "Work Visa",
          documents: [
            "Valid passport",
            "Job offer letter",
            "Employment contract",
            "Educational credentials",
            "Work experience letters",
            "Language proficiency test results",
            "Medical examination results",
            "Police clearance certificate",
            "Resume/CV",
            "Professional qualifications",
          ],
        },
        family: {
          name: "Family Sponsorship",
          documents: [
            "Valid passport",
            "Birth certificates",
            "Marriage certificate (if applicable)",
            "Proof of relationship",
            "Sponsor's documents",
            "Financial documents",
            "Medical examination results",
            "Police clearance certificate",
            "Photographs",
            "Affidavit of support",
          ],
        },
      };
      function h() {
        let [e, s] = (0, l.useState)(""),
          [a, h] = (0, l.useState)([]),
          p = (e) => {
            h((s) => (s.includes(e) ? s.filter((s) => s !== e) : [...s, e]));
          };
        return (0, t.jsx)("div", {
          className: "container max-w-2xl py-12",
          children: (0, t.jsxs)(r.Zp, {
            className: "p-6",
            children: [
              (0, t.jsxs)("div", {
                className: "flex items-center gap-3 mb-8",
                children: [
                  (0, t.jsx)(n.A, { className: "w-8 h-8" }),
                  (0, t.jsxs)("div", {
                    children: [
                      (0, t.jsx)("h1", {
                        className: "text-2xl font-bold",
                        children: "Document Checklist Generator",
                      }),
                      (0, t.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children:
                          "Generate a personalized document checklist for your immigration application",
                      }),
                    ],
                  }),
                ],
              }),
              (0, t.jsxs)("div", {
                className: "space-y-6",
                children: [
                  (0, t.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, t.jsx)(d.J, {
                        children: "Select Visa/Immigration Type",
                      }),
                      (0, t.jsxs)(m.l6, {
                        onValueChange: (e) => {
                          s(e), h([]);
                        },
                        children: [
                          (0, t.jsx)(m.bq, {
                            children: (0, t.jsx)(m.yv, {
                              placeholder: "Choose visa type",
                            }),
                          }),
                          (0, t.jsx)(m.gC, {
                            children: Object.entries(u).map((e) => {
                              let [s, a] = e;
                              return (0, t.jsx)(
                                m.eb,
                                { value: s, children: a.name },
                                s,
                              );
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  e &&
                    (0, t.jsxs)(t.Fragment, {
                      children: [
                        (0, t.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, t.jsx)("h2", {
                              className: "font-semibold",
                              children: "Required Documents:",
                            }),
                            u[e].documents.map((e) =>
                              (0, t.jsxs)(
                                "div",
                                {
                                  className: "flex items-center space-x-2",
                                  children: [
                                    (0, t.jsx)(o.S, {
                                      id: e,
                                      checked: a.includes(e),
                                      onCheckedChange: () => p(e),
                                    }),
                                    (0, t.jsx)("label", {
                                      htmlFor: e,
                                      className:
                                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                      children: e,
                                    }),
                                  ],
                                },
                                e,
                              ),
                            ),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "pt-6 border-t",
                          children: [
                            (0, t.jsxs)("div", {
                              className:
                                "flex justify-between items-center mb-4",
                              children: [
                                (0, t.jsx)("span", {
                                  className: "text-sm font-medium",
                                  children: "Progress:",
                                }),
                                (0, t.jsxs)("span", {
                                  className: "text-sm",
                                  children: [
                                    a.length,
                                    " of ",
                                    u[e].documents.length,
                                    " complete",
                                  ],
                                }),
                              ],
                            }),
                            (0, t.jsx)("div", {
                              className:
                                "w-full bg-secondary rounded-full h-2.5",
                              children: (0, t.jsx)("div", {
                                className:
                                  "bg-primary rounded-full h-2.5 transition-all",
                                style: {
                                  width: "".concat(
                                    (a.length / u[e].documents.length) * 100,
                                    "%",
                                  ),
                                },
                              }),
                            }),
                          ],
                        }),
                        (0, t.jsxs)(c.$, {
                          className: "w-full",
                          onClick: () => {
                            let s = new Blob(
                                [
                                  "".concat(
                                    u[e].name,
                                    " Document Checklist\n\n",
                                  ) +
                                    u[e].documents
                                      .map((e) =>
                                        "["
                                          .concat(
                                            a.includes(e) ? "x" : " ",
                                            "] ",
                                          )
                                          .concat(e),
                                      )
                                      .join("\n"),
                                ],
                                { type: "text/plain" },
                              ),
                              t = URL.createObjectURL(s),
                              n = document.createElement("a");
                            (n.href = t),
                              (n.download = "immigration-checklist.txt"),
                              document.body.appendChild(n),
                              n.click(),
                              document.body.removeChild(n),
                              URL.revokeObjectURL(t);
                          },
                          disabled: !e,
                          children: [
                            (0, t.jsx)(i.A, { className: "w-4 h-4 mr-2" }),
                            "Download Checklist",
                          ],
                        }),
                      ],
                    }),
                ],
              }),
            ],
          }),
        });
      }
    },
    74021: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 57891));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [4223, 3209, 6593, 7358], () => s(74021)), (_N_E = e.O());
  },
]);
