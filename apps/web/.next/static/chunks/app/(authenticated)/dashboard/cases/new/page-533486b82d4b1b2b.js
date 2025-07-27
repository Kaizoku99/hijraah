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
    (e._sentryDebugIds[s] = "ff443874-403d-40c4-9b50-942dd344a643"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-ff443874-403d-40c4-9b50-942dd344a643"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9931],
  {
    32707: (e, s, a) => {
      "use strict";
      a.d(s, { NewCaseForm: () => y });
      var i = a(30602),
        t = a(13575),
        l = a(71188),
        r = a(41960),
        n = a(85218),
        c = a(8053),
        d = a(5271),
        o = a(77413),
        p = a(4401),
        h = a(60070),
        u = a(61159),
        m = a(1805),
        x = a(47482);
      function y() {
        let e = (0, r.useRouter)(),
          { toast: s } = (0, x.d)(),
          [a, y] = (0, n.useState)(!1),
          [b, f] = (0, n.useState)({
            title: "",
            case_type: "",
            description: "",
            notes: "",
          }),
          v = (e, s) => {
            f((a) => ({ ...a, [e]: s }));
          },
          j = async (a) => {
            if ((a.preventDefault(), !b.title || !b.case_type))
              return void s({
                title: "Missing fields",
                description: "Please fill in all required fields.",
                variant: "destructive",
              });
            y(!0);
            try {
              let a = { ...b, status: "pending" },
                i = await c.pC.createCase(a);
              s({
                title: "Success",
                description: "Case created successfully.",
              }),
                e.push("/dashboard/cases/".concat(i.id));
            } catch (e) {
              console.error("Error creating case:", e),
                s({
                  title: "Error",
                  description: "Failed to create case. Please try again.",
                  variant: "destructive",
                });
            } finally {
              y(!1);
            }
          };
        return (0, i.jsxs)("div", {
          className: "container px-4 py-8 mx-auto",
          children: [
            (0, i.jsxs)("div", {
              className: "flex items-center mb-6",
              children: [
                (0, i.jsxs)(d.$, {
                  variant: "ghost",
                  onClick: () => e.back(),
                  className: "mr-2",
                  children: [
                    (0, i.jsx)(t.A, { className: "mr-2 h-4 w-4" }),
                    " Back",
                  ],
                }),
                (0, i.jsx)("h1", {
                  className: "text-2xl font-bold",
                  children: "New Case",
                }),
              ],
            }),
            (0, i.jsxs)(o.Zp, {
              children: [
                (0, i.jsxs)(o.aR, {
                  children: [
                    (0, i.jsx)(o.ZB, { children: "Create New Case" }),
                    (0, i.jsx)(o.BT, {
                      children:
                        "Fill out the form below to create a new immigration case",
                    }),
                  ],
                }),
                (0, i.jsxs)("form", {
                  onSubmit: j,
                  children: [
                    (0, i.jsxs)(o.Wu, {
                      className: "space-y-4",
                      children: [
                        (0, i.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, i.jsxs)(h.J, {
                              htmlFor: "title",
                              children: [
                                "Case Title ",
                                (0, i.jsx)("span", {
                                  className: "text-red-500",
                                  children: "*",
                                }),
                              ],
                            }),
                            (0, i.jsx)(p.p, {
                              id: "title",
                              placeholder: "Enter a title for this case",
                              value: b.title,
                              onChange: (e) => v("title", e.target.value),
                              required: !0,
                            }),
                          ],
                        }),
                        (0, i.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, i.jsxs)(h.J, {
                              htmlFor: "case_type",
                              children: [
                                "Case Type ",
                                (0, i.jsx)("span", {
                                  className: "text-red-500",
                                  children: "*",
                                }),
                              ],
                            }),
                            (0, i.jsxs)(u.l6, {
                              value: b.case_type,
                              onValueChange: (e) => v("case_type", e),
                              children: [
                                (0, i.jsx)(u.bq, {
                                  id: "case_type",
                                  children: (0, i.jsx)(u.yv, {
                                    placeholder: "Select case type",
                                  }),
                                }),
                                (0, i.jsx)(u.gC, {
                                  children: [
                                    {
                                      value: "green_card",
                                      label: "Green Card Application",
                                    },
                                    {
                                      value: "citizenship",
                                      label: "Citizenship Application",
                                    },
                                    {
                                      value: "visa_application",
                                      label: "Visa Application",
                                    },
                                    { value: "asylum", label: "Asylum" },
                                    {
                                      value: "work_permit",
                                      label: "Work Permit",
                                    },
                                    {
                                      value: "family_petition",
                                      label: "Family Petition",
                                    },
                                  ].map((e) =>
                                    (0, i.jsx)(
                                      u.eb,
                                      { value: e.value, children: e.label },
                                      e.value,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, i.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, i.jsx)(h.J, {
                              htmlFor: "description",
                              children: "Description",
                            }),
                            (0, i.jsx)(m.T, {
                              id: "description",
                              placeholder:
                                "Provide a brief description of this case",
                              value: b.description,
                              onChange: (e) => v("description", e.target.value),
                              rows: 3,
                            }),
                          ],
                        }),
                        (0, i.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, i.jsx)(h.J, {
                              htmlFor: "notes",
                              children: "Notes",
                            }),
                            (0, i.jsx)(m.T, {
                              id: "notes",
                              placeholder:
                                "Add any additional notes or information",
                              value: b.notes,
                              onChange: (e) => v("notes", e.target.value),
                              rows: 3,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, i.jsxs)(o.wL, {
                      className: "flex justify-between",
                      children: [
                        (0, i.jsx)(d.$, {
                          type: "button",
                          variant: "outline",
                          onClick: () => e.push("/dashboard/cases"),
                          disabled: a,
                          children: "Cancel",
                        }),
                        (0, i.jsxs)(d.$, {
                          type: "submit",
                          disabled: a,
                          children: [
                            a &&
                              (0, i.jsx)(l.A, {
                                className: "mr-2 h-4 w-4 animate-spin",
                              }),
                            "Create Case",
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
    39629: (e, s, a) => {
      Promise.resolve().then(a.bind(a, 32707));
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    e.O(0, [6593, 4223, 3209, 7358], () => s(39629)), (_N_E = e.O());
  },
]);
