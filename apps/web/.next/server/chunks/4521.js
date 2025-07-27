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
    (e._sentryDebugIds[t] = "d98fb5f8-642a-4177-aff0-3b4f3f5d9302"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-d98fb5f8-642a-4177-aff0-3b4f3f5d9302"));
} catch (e) {}
("use strict");
(exports.id = 4521),
  (exports.ids = [4521]),
  (exports.modules = {
    5451: (e, t, r) => {
      r.a(e, async (e, a) => {
        try {
          r.d(t, {
            BT: () => m,
            Wu: () => f,
            ZB: () => u,
            Zp: () => d,
            aR: () => c,
            wL: () => p,
          });
          var s = r(61268),
            n = r(55728),
            i = r(84205),
            l = r(15942),
            o = e([l]);
          l = (o.then ? (await o)() : o)[0];
          let d = i.forwardRef(({ className: e, ...t }, r) =>
            (0, s.jsx)(n.P.div, {
              ref: r,
              className: (0, l.cn)(
                "rounded-lg border bg-card text-card-foreground shadow-sm",
                e,
              ),
              whileHover: {
                scale: 1.03,
                boxShadow:
                  "0px 7px 25px rgba(0,0,0,0.08), 0px 3px 10px rgba(0,0,0,0.04)",
              },
              transition: { type: "spring", stiffness: 300, damping: 20 },
              ...t,
            }),
          );
          d.displayName = "Card";
          let c = i.forwardRef(({ className: e, ...t }, r) =>
            (0, s.jsx)("div", {
              ref: r,
              className: (0, l.cn)("flex flex-col space-y-1.5 p-6", e),
              ...t,
            }),
          );
          c.displayName = "CardHeader";
          let u = i.forwardRef(({ className: e, ...t }, r) =>
            (0, s.jsx)("h3", {
              ref: r,
              className: (0, l.cn)(
                "text-2xl font-semibold leading-none tracking-tight",
                e,
              ),
              ...t,
            }),
          );
          u.displayName = "CardTitle";
          let m = i.forwardRef(({ className: e, ...t }, r) =>
            (0, s.jsx)("p", {
              ref: r,
              className: (0, l.cn)("text-sm text-muted-foreground", e),
              ...t,
            }),
          );
          m.displayName = "CardDescription";
          let f = i.forwardRef(({ className: e, ...t }, r) =>
            (0, s.jsx)("div", {
              ref: r,
              className: (0, l.cn)("p-6 pt-0", e),
              ...t,
            }),
          );
          f.displayName = "CardContent";
          let p = i.forwardRef(({ className: e, ...t }, r) =>
            (0, s.jsx)("div", {
              ref: r,
              className: (0, l.cn)("flex items-center p-6 pt-0", e),
              ...t,
            }),
          );
          (p.displayName = "CardFooter"), a();
        } catch (e) {
          a(e);
        }
      });
    },
    14521: (e, t, r) => {
      r.a(e, async (e, a) => {
        try {
          r.r(t), r.d(t, { ProfileSetup: () => I });
          var s = r(61268),
            n = r(97052),
            i = r(97713),
            l = r(65666),
            o = r(6130),
            d = r(98683),
            c = r(66135),
            u = r(84205),
            m = r(36322),
            f = r(98654),
            p = r(36352),
            x = r(16951),
            h = r(28909),
            g = r(5451),
            y = r(86183),
            j = r(67135),
            v = r(47182),
            b = r(61264),
            N = r(50144),
            w = e([h, g, y, v, b, N]);
          [h, g, y, v, b, N] = w.then ? (await w)() : w;
          let C = p.Ik({
              fullName: p
                .Yj()
                .min(2, {
                  message: "Full name must be at least 2 characters.",
                }),
              country: p
                .Yj()
                .min(1, { message: "Please select your country of origin." }),
              destinationCountry: p
                .Yj()
                .min(1, { message: "Please select your destination country." }),
              visaType: p.Yj().optional(),
              goals: p
                .Yj()
                .max(500, {
                  message: "Goals description must be 500 characters or less.",
                })
                .optional(),
              preferredLanguage: p.Yj().default("en"),
            }),
            I = () => {
              let { onboarding: e, completeStep: t, user: r } = (0, j.z)(),
                [a, p] = (0, u.useState)(!1),
                [w, I] = (0, u.useState)(!1),
                R = (0, x.Dv)("profile-setup"),
                Y = R?.profileSetupConfig,
                T = (0, i.createBrowserClient)(
                  "http://localhost:54321",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
                ),
                k = (0, m.mN)({
                  resolver: (0, n.u)(C),
                  defaultValues: {
                    fullName: "",
                    country: "",
                    destinationCountry: "",
                    visaType: "",
                    goals: "",
                    preferredLanguage:
                      Y?.languages.find((e) => "en" === e.value)?.value || "en",
                  },
                }),
                S =
                  e.isActive &&
                  "profile-setup" === e.currentStep &&
                  !e.hideForSession &&
                  !e.isCompleted;
              if (!S || !R || !Y) return null;
              let L = async (e) => {
                if (!r)
                  return void f.oR.error(
                    "User not authenticated. Please log in again.",
                  );
                if (!Y.actionKey)
                  return void f.oR.error(
                    "Configuration error: Missing action key for profile setup.",
                  );
                p(!0);
                try {
                  let { error: a } = await T.from("profiles").upsert(
                    {
                      id: r.id,
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
                  if (a) {
                    console.error("Error saving profile:", a),
                      f.oR.error(`Failed to save profile: ${a.message}`),
                      p(!1);
                    return;
                  }
                  fetch("/api/onboarding/actions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      actionKey: Y.actionKey,
                      isCompleted: !0,
                    }),
                  }).catch((e) => {
                    console.error(
                      "Failed to report profile setup completion:",
                      e,
                    );
                  }),
                    I(!0),
                    f.oR.success("Profile information saved!"),
                    setTimeout(() => {
                      t(R.id);
                    }, 1500);
                } catch (e) {
                  console.error("Error in profile setup submission:", e),
                    f.oR.error(
                      `An unexpected error occurred: ${e.message || "Unknown error"}`,
                    );
                } finally {
                  setTimeout(() => p(!1), 1600);
                }
              };
              return (0, s.jsx)(l.N, {
                children:
                  S &&
                  (0, s.jsx)("div", {
                    className:
                      "fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4",
                    children: (0, s.jsxs)(
                      o.P.div,
                      {
                        initial: { opacity: 0, scale: 0.95 },
                        animate: { opacity: 1, scale: 1 },
                        exit: { opacity: 0, scale: 0.9 },
                        className:
                          "bg-card border rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col",
                        children: [
                          (0, s.jsxs)(g.aR, {
                            children: [
                              (0, s.jsx)(g.ZB, {
                                className: "text-2xl",
                                children: R.title,
                              }),
                              (0, s.jsx)(g.BT, {
                                className: "text-base",
                                children: R.description,
                              }),
                            ],
                          }),
                          (0, s.jsx)(g.Wu, {
                            className: "flex-grow overflow-y-auto pr-2",
                            children: (0, s.jsx)(y.lV, {
                              ...k,
                              children: (0, s.jsxs)("form", {
                                onSubmit: k.handleSubmit(L),
                                className: "space-y-6",
                                children: [
                                  (0, s.jsx)(b.b, {
                                    form: k,
                                    countries: Y.countries,
                                  }),
                                  (0, s.jsx)(v.L, {
                                    form: k,
                                    destinations: Y.destinations,
                                  }),
                                  (0, s.jsx)(N.L, {
                                    form: k,
                                    languages: Y.languages,
                                  }),
                                ],
                              }),
                            }),
                          }),
                          (0, s.jsx)(g.wL, {
                            className: "flex justify-end border-t pt-6",
                            children: (0, s.jsx)(l.N, {
                              mode: "wait",
                              children: w
                                ? (0, s.jsxs)(
                                    o.P.div,
                                    {
                                      initial: { opacity: 0, y: 10 },
                                      animate: { opacity: 1, y: 0 },
                                      exit: { opacity: 0 },
                                      className:
                                        "flex items-center gap-2 text-primary font-medium",
                                      children: [
                                        (0, s.jsx)(d.A, { size: 18 }),
                                        " Saved!",
                                      ],
                                    },
                                    "completed-indicator",
                                  )
                                : (0, s.jsxs)(
                                    h.$,
                                    {
                                      type: "submit",
                                      disabled: a,
                                      onClick: k.handleSubmit(L),
                                      form: "profile-setup-form",
                                      children: [
                                        a
                                          ? (0, s.jsx)(c.A, {
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
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    16979: (e, t, r) => {
      r.a(e, async (e, a) => {
        try {
          r.d(t, { J: () => o });
          var s = r(61268),
            n = r(30595);
          r(84205);
          var i = r(15942),
            l = e([i]);
          function o({ className: e, ...t }) {
            return (0, s.jsx)(n.b, {
              "data-slot": "label",
              className: (0, i.cn)(
                "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                e,
              ),
              ...t,
            });
          }
          (i = (l.then ? (await l)() : l)[0]), a();
        } catch (e) {
          a(e);
        }
      });
    },
    37787: (e, t, r) => {
      r.a(e, async (e, a) => {
        try {
          r.d(t, { T: () => o });
          var s = r(61268),
            n = r(84205),
            i = r(15942),
            l = e([i]);
          i = (l.then ? (await l)() : l)[0];
          let o = n.forwardRef(({ className: e, ...t }, r) =>
            (0, s.jsx)("textarea", {
              className: (0, i.cn)(
                "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                e,
              ),
              ref: r,
              ...t,
            }),
          );
          (o.displayName = "Textarea"), a();
        } catch (e) {
          a(e);
        }
      });
    },
    47182: (e, t, r) => {
      r.a(e, async (e, a) => {
        try {
          r.d(t, { L: () => c });
          var s = r(61268);
          r(84205);
          var n = r(36352),
            i = r(86183),
            l = r(78337),
            o = r(95957),
            d = e([i, l, o]);
          ([i, l, o] = d.then ? (await d)() : d),
            n.Ik({
              destinationCountry: n
                .Yj()
                .min(1, { message: "Destination country is required" }),
              visaType: n.Yj().optional(),
            }),
            n.Ik({
              fullName: n.Yj().min(2, { message: "Full name is required" }),
              country: n
                .Yj()
                .min(1, { message: "Country of origin is required" }),
              destinationCountry: n
                .Yj()
                .min(1, { message: "Destination country is required" }),
              visaType: n.Yj().optional(),
              goals: n.Yj().optional(),
              preferredLanguage: n.Yj().default("en"),
            });
          let c = ({ form: e, destinations: t }) =>
            (0, s.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, s.jsx)("h3", {
                  className: "text-sm font-medium text-foreground",
                  children: "Immigration Status",
                }),
                (0, s.jsxs)("div", {
                  className: "grid gap-4 md:grid-cols-2",
                  children: [
                    (0, s.jsx)(i.zB, {
                      control: e.control,
                      name: "destinationCountry",
                      render: ({ field: e }) =>
                        (0, s.jsxs)(i.eI, {
                          children: [
                            (0, s.jsx)(i.lR, {
                              children: "Destination Country",
                            }),
                            (0, s.jsxs)(o.l6, {
                              onValueChange: e.onChange,
                              defaultValue: e.value,
                              children: [
                                (0, s.jsx)(i.MJ, {
                                  children: (0, s.jsx)(o.bq, {
                                    children: (0, s.jsx)(o.yv, {
                                      placeholder: "Select destination",
                                    }),
                                  }),
                                }),
                                (0, s.jsx)(o.gC, {
                                  children: t.map((e) =>
                                    (0, s.jsx)(
                                      o.eb,
                                      { value: e.value, children: e.label },
                                      e.value,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                            (0, s.jsx)(i.C5, {}),
                          ],
                        }),
                    }),
                    (0, s.jsx)(i.zB, {
                      control: e.control,
                      name: "visaType",
                      render: ({ field: e }) =>
                        (0, s.jsxs)(i.eI, {
                          children: [
                            (0, s.jsx)(i.lR, {
                              children: "Current/Target Visa Type (Optional)",
                            }),
                            (0, s.jsx)(i.MJ, {
                              children: (0, s.jsx)(l.p, {
                                placeholder:
                                  "e.g., Student, Work Permit, Tourist",
                                ...e,
                              }),
                            }),
                            (0, s.jsx)(i.C5, {}),
                          ],
                        }),
                    }),
                  ],
                }),
              ],
            });
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    50144: (e, t, r) => {
      r.a(e, async (e, a) => {
        try {
          r.d(t, { L: () => c });
          var s = r(61268);
          r(84205);
          var n = r(36352),
            i = r(86183),
            l = r(95957),
            o = r(37787),
            d = e([i, l, o]);
          ([i, l, o] = d.then ? (await d)() : d),
            n.Ik({
              goals: n.Yj().optional(),
              preferredLanguage: n.Yj().default("en"),
            }),
            n.Ik({
              fullName: n.Yj().min(2, { message: "Full name is required" }),
              country: n
                .Yj()
                .min(1, { message: "Country of origin is required" }),
              destinationCountry: n
                .Yj()
                .min(1, { message: "Destination country is required" }),
              visaType: n.Yj().optional(),
              goals: n.Yj().optional(),
              preferredLanguage: n.Yj().default("en"),
            });
          let c = ({ form: e, languages: t }) =>
            (0, s.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, s.jsx)("h3", {
                  className: "text-sm font-medium text-foreground",
                  children: "Goals & Preferences",
                }),
                (0, s.jsxs)("div", {
                  className: "grid gap-4 md:grid-cols-2",
                  children: [
                    (0, s.jsx)(i.zB, {
                      control: e.control,
                      name: "preferredLanguage",
                      render: ({ field: e }) =>
                        (0, s.jsxs)(i.eI, {
                          children: [
                            (0, s.jsx)(i.lR, {
                              children: "Preferred Language",
                            }),
                            (0, s.jsxs)(l.l6, {
                              onValueChange: e.onChange,
                              defaultValue: e.value,
                              children: [
                                (0, s.jsx)(i.MJ, {
                                  children: (0, s.jsx)(l.bq, {
                                    children: (0, s.jsx)(l.yv, {
                                      placeholder: "Select language",
                                    }),
                                  }),
                                }),
                                (0, s.jsx)(l.gC, {
                                  children: t.map((e) =>
                                    (0, s.jsx)(
                                      l.eb,
                                      { value: e.value, children: e.label },
                                      e.value,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                            (0, s.jsx)(i.C5, {}),
                          ],
                        }),
                    }),
                    (0, s.jsx)("div", {
                      className: "md:col-span-2",
                      children: (0, s.jsx)(i.zB, {
                        control: e.control,
                        name: "goals",
                        render: ({ field: e }) =>
                          (0, s.jsxs)(i.eI, {
                            children: [
                              (0, s.jsx)(i.lR, {
                                children: "Immigration Goals (Optional)",
                              }),
                              (0, s.jsx)(i.MJ, {
                                children: (0, s.jsx)(o.T, {
                                  placeholder:
                                    "Briefly describe your main immigration goals (e.g., permanent residency, studying abroad, joining family)...",
                                  className: "resize-none",
                                  rows: 3,
                                  ...e,
                                }),
                              }),
                              (0, s.jsx)(i.C5, {}),
                            ],
                          }),
                      }),
                    }),
                  ],
                }),
              ],
            });
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    61264: (e, t, r) => {
      r.a(e, async (e, a) => {
        try {
          r.d(t, { b: () => c });
          var s = r(61268);
          r(84205);
          var n = r(36352),
            i = r(86183),
            l = r(78337),
            o = r(95957),
            d = e([i, l, o]);
          ([i, l, o] = d.then ? (await d)() : d),
            n.Ik({
              fullName: n.Yj().min(2, { message: "Full name is required" }),
              country: n
                .Yj()
                .min(1, { message: "Country of origin is required" }),
            }),
            n.Ik({
              fullName: n.Yj().min(2, { message: "Full name is required" }),
              country: n
                .Yj()
                .min(1, { message: "Country of origin is required" }),
              destinationCountry: n
                .Yj()
                .min(1, { message: "Destination country is required" }),
              visaType: n.Yj().optional(),
              goals: n.Yj().optional(),
              preferredLanguage: n.Yj().default("en"),
            });
          let c = ({ form: e, countries: t }) =>
            (0, s.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, s.jsx)("h3", {
                  className: "text-sm font-medium text-foreground",
                  children: "Personal Information",
                }),
                (0, s.jsxs)("div", {
                  className: "grid gap-4 md:grid-cols-2",
                  children: [
                    (0, s.jsx)(i.zB, {
                      control: e.control,
                      name: "fullName",
                      render: ({ field: e }) =>
                        (0, s.jsxs)(i.eI, {
                          children: [
                            (0, s.jsx)(i.lR, { children: "Full Name" }),
                            (0, s.jsx)(i.MJ, {
                              children: (0, s.jsx)(l.p, {
                                placeholder: "Enter your full name",
                                ...e,
                              }),
                            }),
                            (0, s.jsx)(i.C5, {}),
                          ],
                        }),
                    }),
                    (0, s.jsx)(i.zB, {
                      control: e.control,
                      name: "country",
                      render: ({ field: e }) =>
                        (0, s.jsxs)(i.eI, {
                          children: [
                            (0, s.jsx)(i.lR, { children: "Country of Origin" }),
                            (0, s.jsxs)(o.l6, {
                              onValueChange: e.onChange,
                              defaultValue: e.value,
                              children: [
                                (0, s.jsx)(i.MJ, {
                                  children: (0, s.jsx)(o.bq, {
                                    children: (0, s.jsx)(o.yv, {
                                      placeholder: "Select country",
                                    }),
                                  }),
                                }),
                                (0, s.jsx)(o.gC, {
                                  children: t.map((e) =>
                                    (0, s.jsx)(
                                      o.eb,
                                      { value: e.value, children: e.label },
                                      e.value,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                            (0, s.jsx)(i.C5, {}),
                          ],
                        }),
                    }),
                  ],
                }),
              ],
            });
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    65666: (e, t, r) => {
      r.d(t, { N: () => g });
      var a = r(61268),
        s = r(84205),
        n = r(420),
        i = r(95988),
        l = r(88924),
        o = r(26997);
      class d extends s.Component {
        getSnapshotBeforeUpdate(e) {
          let t = this.props.childRef.current;
          if (t && e.isPresent && !this.props.isPresent) {
            let e = this.props.sizeRef.current;
            (e.height = t.offsetHeight || 0),
              (e.width = t.offsetWidth || 0),
              (e.top = t.offsetTop),
              (e.left = t.offsetLeft);
          }
          return null;
        }
        componentDidUpdate() {}
        render() {
          return this.props.children;
        }
      }
      function c({ children: e, isPresent: t }) {
        let r = (0, s.useId)(),
          n = (0, s.useRef)(null),
          i = (0, s.useRef)({ width: 0, height: 0, top: 0, left: 0 }),
          { nonce: l } = (0, s.useContext)(o.Q);
        return (
          (0, s.useInsertionEffect)(() => {
            let { width: e, height: a, top: s, left: o } = i.current;
            if (t || !n.current || !e || !a) return;
            n.current.dataset.motionPopId = r;
            let d = document.createElement("style");
            return (
              l && (d.nonce = l),
              document.head.appendChild(d),
              d.sheet &&
                d.sheet.insertRule(`
          [data-motion-pop-id="${r}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${a}px !important;
            top: ${s}px !important;
            left: ${o}px !important;
          }
        `),
              () => {
                document.head.removeChild(d);
              }
            );
          }, [t]),
          (0, a.jsx)(d, {
            isPresent: t,
            childRef: n,
            sizeRef: i,
            children: s.cloneElement(e, { ref: n }),
          })
        );
      }
      let u = ({
        children: e,
        initial: t,
        isPresent: r,
        onExitComplete: n,
        custom: o,
        presenceAffectsLayout: d,
        mode: u,
      }) => {
        let f = (0, i.M)(m),
          p = (0, s.useId)(),
          x = (0, s.useCallback)(
            (e) => {
              for (let t of (f.set(e, !0), f.values())) if (!t) return;
              n && n();
            },
            [f, n],
          ),
          h = (0, s.useMemo)(
            () => ({
              id: p,
              initial: t,
              isPresent: r,
              custom: o,
              onExitComplete: x,
              register: (e) => (f.set(e, !1), () => f.delete(e)),
            }),
            d ? [Math.random(), x] : [r, x],
          );
        return (
          (0, s.useMemo)(() => {
            f.forEach((e, t) => f.set(t, !1));
          }, [r]),
          s.useEffect(() => {
            r || f.size || !n || n();
          }, [r]),
          "popLayout" === u &&
            (e = (0, a.jsx)(c, { isPresent: r, children: e })),
          (0, a.jsx)(l.t.Provider, { value: h, children: e })
        );
      };
      function m() {
        return new Map();
      }
      var f = r(57751);
      let p = (e) => e.key || "";
      function x(e) {
        let t = [];
        return (
          s.Children.forEach(e, (e) => {
            (0, s.isValidElement)(e) && t.push(e);
          }),
          t
        );
      }
      var h = r(61267);
      let g = ({
        children: e,
        custom: t,
        initial: r = !0,
        onExitComplete: l,
        presenceAffectsLayout: o = !0,
        mode: d = "sync",
        propagate: c = !1,
      }) => {
        let [m, g] = (0, f.xQ)(c),
          y = (0, s.useMemo)(() => x(e), [e]),
          j = c && !m ? [] : y.map(p),
          v = (0, s.useRef)(!0),
          b = (0, s.useRef)(y),
          N = (0, i.M)(() => new Map()),
          [w, C] = (0, s.useState)(y),
          [I, R] = (0, s.useState)(y);
        (0, h.E)(() => {
          (v.current = !1), (b.current = y);
          for (let e = 0; e < I.length; e++) {
            let t = p(I[e]);
            j.includes(t) ? N.delete(t) : !0 !== N.get(t) && N.set(t, !1);
          }
        }, [I, j.length, j.join("-")]);
        let Y = [];
        if (y !== w) {
          let e = [...y];
          for (let t = 0; t < I.length; t++) {
            let r = I[t],
              a = p(r);
            j.includes(a) || (e.splice(t, 0, r), Y.push(r));
          }
          "wait" === d && Y.length && (e = Y), R(x(e)), C(y);
          return;
        }
        let { forceRender: T } = (0, s.useContext)(n.L);
        return (0, a.jsx)(a.Fragment, {
          children: I.map((e) => {
            let s = p(e),
              n = (!c || !!m) && (y === I || j.includes(s));
            return (0, a.jsx)(
              u,
              {
                isPresent: n,
                initial: (!v.current || !!r) && void 0,
                custom: n ? void 0 : t,
                presenceAffectsLayout: o,
                mode: d,
                onExitComplete: n
                  ? void 0
                  : () => {
                      if (!N.has(s)) return;
                      N.set(s, !0);
                      let e = !0;
                      N.forEach((t) => {
                        t || (e = !1);
                      }),
                        e &&
                          (null == T || T(),
                          R(b.current),
                          c && (null == g || g()),
                          l && l());
                    },
                children: e,
              },
              s,
            );
          }),
        });
      };
    },
    86183: (e, t, r) => {
      r.a(e, async (e, a) => {
        try {
          r.d(t, {
            C5: () => p,
            MJ: () => f,
            eI: () => u,
            lR: () => m,
            lV: () => x,
            zB: () => g,
          });
          var s = r(61268),
            n = r(86415),
            i = r(84205),
            l = r(36322),
            o = r(16979),
            d = r(15942),
            c = e([o, d]);
          [o, d] = c.then ? (await c)() : c;
          let x = l.Op,
            h = i.createContext({}),
            g = ({ ...e }) =>
              (0, s.jsx)(h.Provider, {
                value: { name: e.name },
                children: (0, s.jsx)(l.xI, { ...e }),
              }),
            y = () => {
              let e = i.useContext(h),
                t = i.useContext(j),
                { getFieldState: r } = (0, l.xW)(),
                a = (0, l.lN)({ name: e.name }),
                s = r(e.name, a);
              if (!e)
                throw Error("useFormField should be used within <FormField>");
              let { id: n } = t;
              return {
                id: n,
                name: e.name,
                formItemId: `${n}-form-item`,
                formDescriptionId: `${n}-form-item-description`,
                formMessageId: `${n}-form-item-message`,
                ...s,
              };
            },
            j = i.createContext({});
          function u({ className: e, ...t }) {
            let r = i.useId();
            return (0, s.jsx)(j.Provider, {
              value: { id: r },
              children: (0, s.jsx)("div", {
                "data-slot": "form-item",
                className: (0, d.cn)("grid gap-2", e),
                ...t,
              }),
            });
          }
          function m({ className: e, ...t }) {
            let { error: r, formItemId: a } = y();
            return (0, s.jsx)(o.J, {
              "data-slot": "form-label",
              "data-error": !!r,
              className: (0, d.cn)("data-[error=true]:text-destructive", e),
              htmlFor: a,
              ...t,
            });
          }
          function f({ ...e }) {
            let {
              error: t,
              formItemId: r,
              formDescriptionId: a,
              formMessageId: i,
            } = y();
            return (0, s.jsx)(n.DX, {
              "data-slot": "form-control",
              id: r,
              "aria-describedby": t ? `${a} ${i}` : `${a}`,
              "aria-invalid": !!t,
              ...e,
            });
          }
          function p({ className: e, ...t }) {
            let { error: r, formMessageId: a } = y(),
              n = r ? String(r?.message ?? "") : t.children;
            return n
              ? (0, s.jsx)("p", {
                  "data-slot": "form-message",
                  id: a,
                  className: (0, d.cn)("text-destructive text-sm", e),
                  ...t,
                  children: n,
                })
              : null;
          }
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    95957: (e, t, r) => {
      r.a(e, async (e, a) => {
        try {
          r.d(t, {
            bq: () => f,
            eb: () => x,
            gC: () => p,
            l6: () => u,
            yv: () => m,
          });
          var s = r(61268),
            n = r(81242),
            i = r(70753),
            l = r(415),
            o = r(84205),
            d = r(15942),
            c = e([d]);
          d = (c.then ? (await c)() : c)[0];
          let u = n.bL;
          n.YJ;
          let m = n.WT,
            f = o.forwardRef(({ className: e, children: t, ...r }, a) =>
              (0, s.jsxs)(n.l9, {
                ref: a,
                className: (0, d.cn)(
                  "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  e,
                ),
                ...r,
                children: [
                  t,
                  (0, s.jsx)(n.In, {
                    asChild: !0,
                    children: (0, s.jsx)(i.A, {
                      className: "h-4 w-4 opacity-50",
                    }),
                  }),
                ],
              }),
            );
          f.displayName = n.l9.displayName;
          let p = o.forwardRef(
            ({ className: e, children: t, position: r = "popper", ...a }, i) =>
              (0, s.jsx)(n.ZL, {
                children: (0, s.jsx)(n.UC, {
                  ref: i,
                  className: (0, d.cn)(
                    "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    "popper" === r &&
                      "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                    e,
                  ),
                  position: r,
                  ...a,
                  children: (0, s.jsx)(n.LM, {
                    className: (0, d.cn)(
                      "p-1",
                      "popper" === r &&
                        "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                    ),
                    children: t,
                  }),
                }),
              }),
          );
          (p.displayName = n.UC.displayName),
            (o.forwardRef(({ className: e, ...t }, r) =>
              (0, s.jsx)(n.JU, {
                ref: r,
                className: (0, d.cn)(
                  "py-1.5 pl-8 pr-2 text-sm font-semibold",
                  e,
                ),
                ...t,
              }),
            ).displayName = n.JU.displayName);
          let x = o.forwardRef(({ className: e, children: t, ...r }, a) =>
            (0, s.jsxs)(n.q7, {
              ref: a,
              className: (0, d.cn)(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                e,
              ),
              ...r,
              children: [
                (0, s.jsx)("span", {
                  className:
                    "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                  children: (0, s.jsx)(n.VF, {
                    children: (0, s.jsx)(l.A, { className: "h-4 w-4" }),
                  }),
                }),
                (0, s.jsx)(n.p4, { children: t }),
              ],
            }),
          );
          (x.displayName = n.q7.displayName),
            (o.forwardRef(({ className: e, ...t }, r) =>
              (0, s.jsx)(n.wv, {
                ref: r,
                className: (0, d.cn)("-mx-1 my-1 h-px bg-muted", e),
                ...t,
              }),
            ).displayName = n.wv.displayName),
            a();
        } catch (e) {
          a(e);
        }
      });
    },
    98683: (e, t, r) => {
      r.d(t, { A: () => a });
      let a = (0, r(95255).A)("CheckCircle2", [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
      ]);
    },
  });
//# sourceMappingURL=4521.js.map
