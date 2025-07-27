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
    n = new e.Error().stack;
  n &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[n] = "590b7720-fd79-412d-a190-f4e207f5c405"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-590b7720-fd79-412d-a190-f4e207f5c405"));
} catch (e) {}
("use strict");
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6719],
  {
    76719: (e, n, r) => {
      r.r(n), r.d(n, { ProfileSetup: () => w });
      var s = r(30602),
        i = r(26515),
        a = r(2960),
        l = r(4194),
        t = r(17957),
        o = r(62839),
        d = r(71188),
        c = r(85218),
        u = r(72508),
        m = r(36839),
        g = r(17967),
        j = r(10190),
        f = r(5271),
        p = r(77413),
        x = r(16873),
        h = r(20731),
        y = r(4401),
        v = r(61159);
      g.Ik({
        destinationCountry: g
          .Yj()
          .min(1, { message: "Destination country is required" }),
        visaType: g.Yj().optional(),
      }),
        g.Ik({
          fullName: g.Yj().min(2, { message: "Full name is required" }),
          country: g.Yj().min(1, { message: "Country of origin is required" }),
          destinationCountry: g
            .Yj()
            .min(1, { message: "Destination country is required" }),
          visaType: g.Yj().optional(),
          goals: g.Yj().optional(),
          preferredLanguage: g.Yj().default("en"),
        });
      let b = (e) => {
        let { form: n, destinations: r } = e;
        return (0, s.jsxs)("div", {
          className: "space-y-4",
          children: [
            (0, s.jsx)("h3", {
              className: "text-sm font-medium text-foreground",
              children: "Immigration Status",
            }),
            (0, s.jsxs)("div", {
              className: "grid gap-4 md:grid-cols-2",
              children: [
                (0, s.jsx)(x.zB, {
                  control: n.control,
                  name: "destinationCountry",
                  render: (e) => {
                    let { field: n } = e;
                    return (0, s.jsxs)(x.eI, {
                      children: [
                        (0, s.jsx)(x.lR, { children: "Destination Country" }),
                        (0, s.jsxs)(v.l6, {
                          onValueChange: n.onChange,
                          defaultValue: n.value,
                          children: [
                            (0, s.jsx)(x.MJ, {
                              children: (0, s.jsx)(v.bq, {
                                children: (0, s.jsx)(v.yv, {
                                  placeholder: "Select destination",
                                }),
                              }),
                            }),
                            (0, s.jsx)(v.gC, {
                              children: r.map((e) =>
                                (0, s.jsx)(
                                  v.eb,
                                  { value: e.value, children: e.label },
                                  e.value,
                                ),
                              ),
                            }),
                          ],
                        }),
                        (0, s.jsx)(x.C5, {}),
                      ],
                    });
                  },
                }),
                (0, s.jsx)(x.zB, {
                  control: n.control,
                  name: "visaType",
                  render: (e) => {
                    let { field: n } = e;
                    return (0, s.jsxs)(x.eI, {
                      children: [
                        (0, s.jsx)(x.lR, {
                          children: "Current/Target Visa Type (Optional)",
                        }),
                        (0, s.jsx)(x.MJ, {
                          children: (0, s.jsx)(y.p, {
                            placeholder: "e.g., Student, Work Permit, Tourist",
                            ...n,
                          }),
                        }),
                        (0, s.jsx)(x.C5, {}),
                      ],
                    });
                  },
                }),
              ],
            }),
          ],
        });
      };
      g.Ik({
        fullName: g.Yj().min(2, { message: "Full name is required" }),
        country: g.Yj().min(1, { message: "Country of origin is required" }),
      }),
        g.Ik({
          fullName: g.Yj().min(2, { message: "Full name is required" }),
          country: g.Yj().min(1, { message: "Country of origin is required" }),
          destinationCountry: g
            .Yj()
            .min(1, { message: "Destination country is required" }),
          visaType: g.Yj().optional(),
          goals: g.Yj().optional(),
          preferredLanguage: g.Yj().default("en"),
        });
      let C = (e) => {
        let { form: n, countries: r } = e;
        return (0, s.jsxs)("div", {
          className: "space-y-4",
          children: [
            (0, s.jsx)("h3", {
              className: "text-sm font-medium text-foreground",
              children: "Personal Information",
            }),
            (0, s.jsxs)("div", {
              className: "grid gap-4 md:grid-cols-2",
              children: [
                (0, s.jsx)(x.zB, {
                  control: n.control,
                  name: "fullName",
                  render: (e) => {
                    let { field: n } = e;
                    return (0, s.jsxs)(x.eI, {
                      children: [
                        (0, s.jsx)(x.lR, { children: "Full Name" }),
                        (0, s.jsx)(x.MJ, {
                          children: (0, s.jsx)(y.p, {
                            placeholder: "Enter your full name",
                            ...n,
                          }),
                        }),
                        (0, s.jsx)(x.C5, {}),
                      ],
                    });
                  },
                }),
                (0, s.jsx)(x.zB, {
                  control: n.control,
                  name: "country",
                  render: (e) => {
                    let { field: n } = e;
                    return (0, s.jsxs)(x.eI, {
                      children: [
                        (0, s.jsx)(x.lR, { children: "Country of Origin" }),
                        (0, s.jsxs)(v.l6, {
                          onValueChange: n.onChange,
                          defaultValue: n.value,
                          children: [
                            (0, s.jsx)(x.MJ, {
                              children: (0, s.jsx)(v.bq, {
                                children: (0, s.jsx)(v.yv, {
                                  placeholder: "Select country",
                                }),
                              }),
                            }),
                            (0, s.jsx)(v.gC, {
                              children: r.map((e) =>
                                (0, s.jsx)(
                                  v.eb,
                                  { value: e.value, children: e.label },
                                  e.value,
                                ),
                              ),
                            }),
                          ],
                        }),
                        (0, s.jsx)(x.C5, {}),
                      ],
                    });
                  },
                }),
              ],
            }),
          ],
        });
      };
      var N = r(1805);
      g.Ik({
        goals: g.Yj().optional(),
        preferredLanguage: g.Yj().default("en"),
      }),
        g.Ik({
          fullName: g.Yj().min(2, { message: "Full name is required" }),
          country: g.Yj().min(1, { message: "Country of origin is required" }),
          destinationCountry: g
            .Yj()
            .min(1, { message: "Destination country is required" }),
          visaType: g.Yj().optional(),
          goals: g.Yj().optional(),
          preferredLanguage: g.Yj().default("en"),
        });
      let I = (e) => {
          let { form: n, languages: r } = e;
          return (0, s.jsxs)("div", {
            className: "space-y-4",
            children: [
              (0, s.jsx)("h3", {
                className: "text-sm font-medium text-foreground",
                children: "Goals & Preferences",
              }),
              (0, s.jsxs)("div", {
                className: "grid gap-4 md:grid-cols-2",
                children: [
                  (0, s.jsx)(x.zB, {
                    control: n.control,
                    name: "preferredLanguage",
                    render: (e) => {
                      let { field: n } = e;
                      return (0, s.jsxs)(x.eI, {
                        children: [
                          (0, s.jsx)(x.lR, { children: "Preferred Language" }),
                          (0, s.jsxs)(v.l6, {
                            onValueChange: n.onChange,
                            defaultValue: n.value,
                            children: [
                              (0, s.jsx)(x.MJ, {
                                children: (0, s.jsx)(v.bq, {
                                  children: (0, s.jsx)(v.yv, {
                                    placeholder: "Select language",
                                  }),
                                }),
                              }),
                              (0, s.jsx)(v.gC, {
                                children: r.map((e) =>
                                  (0, s.jsx)(
                                    v.eb,
                                    { value: e.value, children: e.label },
                                    e.value,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          (0, s.jsx)(x.C5, {}),
                        ],
                      });
                    },
                  }),
                  (0, s.jsx)("div", {
                    className: "md:col-span-2",
                    children: (0, s.jsx)(x.zB, {
                      control: n.control,
                      name: "goals",
                      render: (e) => {
                        let { field: n } = e;
                        return (0, s.jsxs)(x.eI, {
                          children: [
                            (0, s.jsx)(x.lR, {
                              children: "Immigration Goals (Optional)",
                            }),
                            (0, s.jsx)(x.MJ, {
                              children: (0, s.jsx)(N.T, {
                                placeholder:
                                  "Briefly describe your main immigration goals (e.g., permanent residency, studying abroad, joining family)...",
                                className: "resize-none",
                                rows: 3,
                                ...n,
                              }),
                            }),
                            (0, s.jsx)(x.C5, {}),
                          ],
                        });
                      },
                    }),
                  }),
                ],
              }),
            ],
          });
        },
        Y = g.Ik({
          fullName: g
            .Yj()
            .min(2, { message: "Full name must be at least 2 characters." }),
          country: g
            .Yj()
            .min(1, { message: "Please select your country of origin." }),
          destinationCountry: g
            .Yj()
            .min(1, { message: "Please select your destination country." }),
          visaType: g.Yj().optional(),
          goals: g
            .Yj()
            .max(500, {
              message: "Goals description must be 500 characters or less.",
            })
            .optional(),
          preferredLanguage: g.Yj().default("en"),
        }),
        w = () => {
          var e;
          let { onboarding: n, completeStep: r, user: g } = (0, h.z)(),
            [y, v] = (0, c.useState)(!1),
            [N, w] = (0, c.useState)(!1),
            S = (0, j.Dv)("profile-setup"),
            T = null == S ? void 0 : S.profileSetupConfig,
            k = (0, a.createBrowserClient)(
              "http://localhost:54321",
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
            ),
            _ = (0, u.mN)({
              resolver: (0, i.u)(Y),
              defaultValues: {
                fullName: "",
                country: "",
                destinationCountry: "",
                visaType: "",
                goals: "",
                preferredLanguage:
                  (null == T ||
                  null == (e = T.languages.find((e) => "en" === e.value))
                    ? void 0
                    : e.value) || "en",
              },
            }),
            q =
              n.isActive &&
              "profile-setup" === n.currentStep &&
              !n.hideForSession &&
              !n.isCompleted;
          if (!q || !S || !T) return null;
          let R = async (e) => {
            if (!g)
              return void m.oR.error(
                "User not authenticated. Please log in again.",
              );
            if (!T.actionKey)
              return void m.oR.error(
                "Configuration error: Missing action key for profile setup.",
              );
            v(!0);
            try {
              let { error: n } = await k
                .from("profiles")
                .upsert(
                  {
                    id: g.id,
                    first_name: e.fullName.split(" ")[0],
                    last_name: e.fullName.split(" ").slice(1).join(" "),
                    country_of_residence: e.country,
                    country_of_interest: e.destinationCountry,
                    visa_type: e.visaType,
                    immigration_goals: e.goals,
                    language: e.preferredLanguage,
                    updated_at: new Date().toISOString(),
                  },
                  { onConflict: "id" },
                );
              if (n) {
                console.error("Error saving profile:", n),
                  m.oR.error("Failed to save profile: ".concat(n.message)),
                  v(!1);
                return;
              }
              fetch("/api/onboarding/actions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  actionKey: T.actionKey,
                  isCompleted: !0,
                }),
              }).catch((e) => {
                console.error("Failed to report profile setup completion:", e);
              }),
                w(!0),
                m.oR.success("Profile information saved!"),
                setTimeout(() => {
                  r(S.id);
                }, 1500);
            } catch (e) {
              console.error("Error in profile setup submission:", e),
                m.oR.error(
                  "An unexpected error occurred: ".concat(
                    e.message || "Unknown error",
                  ),
                );
            } finally {
              setTimeout(() => v(!1), 1600);
            }
          };
          return (0, s.jsx)(l.N, {
            children:
              q &&
              (0, s.jsx)("div", {
                className:
                  "fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4",
                children: (0, s.jsxs)(
                  t.P.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    exit: { opacity: 0, scale: 0.9 },
                    className:
                      "bg-card border rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col",
                    children: [
                      (0, s.jsxs)(p.aR, {
                        children: [
                          (0, s.jsx)(p.ZB, {
                            className: "text-2xl",
                            children: S.title,
                          }),
                          (0, s.jsx)(p.BT, {
                            className: "text-base",
                            children: S.description,
                          }),
                        ],
                      }),
                      (0, s.jsx)(p.Wu, {
                        className: "flex-grow overflow-y-auto pr-2",
                        children: (0, s.jsx)(x.lV, {
                          ..._,
                          children: (0, s.jsxs)("form", {
                            onSubmit: _.handleSubmit(R),
                            className: "space-y-6",
                            children: [
                              (0, s.jsx)(C, {
                                form: _,
                                countries: T.countries,
                              }),
                              (0, s.jsx)(b, {
                                form: _,
                                destinations: T.destinations,
                              }),
                              (0, s.jsx)(I, {
                                form: _,
                                languages: T.languages,
                              }),
                            ],
                          }),
                        }),
                      }),
                      (0, s.jsx)(p.wL, {
                        className: "flex justify-end border-t pt-6",
                        children: (0, s.jsx)(l.N, {
                          mode: "wait",
                          children: N
                            ? (0, s.jsxs)(
                                t.P.div,
                                {
                                  initial: { opacity: 0, y: 10 },
                                  animate: { opacity: 1, y: 0 },
                                  exit: { opacity: 0 },
                                  className:
                                    "flex items-center gap-2 text-primary font-medium",
                                  children: [
                                    (0, s.jsx)(o.A, { size: 18 }),
                                    " Saved!",
                                  ],
                                },
                                "completed-indicator",
                              )
                            : (0, s.jsxs)(
                                f.$,
                                {
                                  type: "submit",
                                  disabled: y,
                                  onClick: _.handleSubmit(R),
                                  form: "profile-setup-form",
                                  children: [
                                    y
                                      ? (0, s.jsx)(d.A, {
                                          className:
                                            "mr-2 h-4 w-4 animate-spin",
                                        })
                                      : null,
                                    "Save and Continue",
                                  ],
                                },
                                "submit-button",
                              ),
                        }),
                      }),
                    ],
                  },
                  "profile-setup-modal",
                ),
              }),
          });
        };
    },
  },
]);
