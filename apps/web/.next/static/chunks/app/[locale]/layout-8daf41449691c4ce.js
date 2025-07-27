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
    (e._sentryDebugIds[t] = "2091d632-4a13-4b5d-af7d-4c6b72bca4b0"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-2091d632-4a13-4b5d-af7d-4c6b72bca4b0"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8450],
  {
    5164: (e, t, r) => {
      "use strict";
      r.d(t, { $: () => d, Y: () => c });
      var s = r(30602),
        a = r(1756),
        n = r(41960),
        i = r(85218);
      let l = [
          "/",
          "/documents",
          "/chat",
          "/requirements",
          "/calculator",
          "/notifications",
          "/profile",
          "/settings",
        ],
        o = (0, i.createContext)(void 0);
      function c(e) {
        let { children: t } = e,
          r = (0, n.useRouter)(),
          [c, d] = (0, i.useState)(""),
          [u, m] = (0, i.useState)([]),
          {
            completion: h,
            complete: p,
            isLoading: x,
          } = (0, a.sQ)({ api: "/api/search", onResponse: (e) => {} }),
          f = async (e) => {
            e.preventDefault();
            let t = c.trim();
            if (t)
              try {
                let e = await p(t);
                e && l.includes(e)
                  ? r.push(e)
                  : r.push("/search?q=".concat(encodeURIComponent(t)));
              } catch (e) {
                console.error("Search error:", e);
              }
          };
        return (0, s.jsx)(o.Provider, {
          value: {
            query: c,
            setQuery: d,
            isLoading: x,
            suggestions: u,
            aiSuggestions: h ? [h] : [],
            handleSearch: f,
            clearSearch: () => {
              d(""), m([]);
            },
          },
          children: t,
        });
      }
      function d() {
        let e = (0, i.useContext)(o);
        if (void 0 === e)
          throw Error("useSearchContext must be used within a SearchProvider");
        return e;
      }
    },
    11255: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { Footer: () => f });
      var s = r(30602),
        a = r(85989),
        n = r(82365),
        i = r(61053),
        l = r(36519),
        o = r(80922),
        c = r(97687),
        d = r.n(c),
        u = r(41960),
        m = r(98181),
        h = r(52544);
      let p = [
          {
            title: "Product",
            links: [
              { name: "Features", href: "/features" },
              { name: "Pricing", href: "/pricing" },
              { name: "Compare", href: "/compare" },
              { name: "Countries", href: "/countries" },
            ],
          },
          {
            title: "Resources",
            links: [
              { name: "Documentation", href: "/docs" },
              { name: "Blog", href: "/blog" },
              { name: "FAQs", href: "/faqs" },
              { name: "Support", href: "/support" },
            ],
          },
          {
            title: "Company",
            links: [
              { name: "About", href: "/about" },
              { name: "Team", href: "/team" },
              { name: "Careers", href: "/careers" },
              { name: "Contact", href: "/contact" },
            ],
          },
        ],
        x = [
          { name: "GitHub", href: "https://github.com/hijraah", icon: a.A },
          { name: "Twitter", href: "https://twitter.com/hijraah", icon: n.A },
          { name: "Email", href: "mailto:hello@hijraah.com", icon: i.A },
        ];
      function f() {
        let e = (0, u.usePathname)(),
          t = new Date().getFullYear();
        return (0, s.jsx)("footer", {
          className:
            "border-t border-border bg-background/50 backdrop-blur-sm w-full mt-auto print:hidden",
          "data-slot": "footer",
          children: (0, s.jsxs)("div", {
            className: "container py-10 px-4 sm:px-6 lg:px-8 mx-auto",
            "data-slot": "footer-content",
            children: [
              (0, s.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12",
                children: [
                  (0, s.jsxs)("div", {
                    className: "flex flex-col space-y-4",
                    "data-slot": "footer-brand",
                    children: [
                      (0, s.jsx)(d(), {
                        href: "/",
                        className: "flex items-center",
                        "aria-label": "Hijraah Home",
                        children: (0, s.jsx)("span", {
                          className: "font-bold text-xl",
                          children: "Hijraah",
                        }),
                      }),
                      (0, s.jsx)("p", {
                        className: "text-sm text-muted-foreground max-w-xs",
                        children:
                          "Compare immigration policies across countries with AI-powered insights and personalized guidance.",
                      }),
                      (0, s.jsx)("div", {
                        className: "flex space-x-3 pt-2",
                        "data-slot": "footer-social",
                        children: x.map((e) =>
                          (0, s.jsx)(
                            "a",
                            {
                              href: e.href,
                              className:
                                "text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent/50 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              "aria-label": e.name,
                              "data-slot": "social-link",
                              children: (0, s.jsx)(e.icon, {
                                className: "h-5 w-5",
                              }),
                            },
                            e.name,
                          ),
                        ),
                      }),
                    ],
                  }),
                  p.map((t) =>
                    (0, s.jsxs)(
                      "div",
                      {
                        className: "flex flex-col space-y-4",
                        "data-slot": "footer-links-section",
                        children: [
                          (0, s.jsx)("h3", {
                            className:
                              "font-semibold text-sm tracking-wider uppercase text-foreground",
                            children: t.title,
                          }),
                          (0, s.jsx)("ul", {
                            className: "flex flex-col space-y-2.5",
                            "data-slot": "footer-links",
                            children: t.links.map((t) =>
                              (0, s.jsx)(
                                "li",
                                {
                                  "data-slot": "footer-link-item",
                                  children: (0, s.jsx)(d(), {
                                    href: t.href,
                                    className: (function () {
                                      for (
                                        var e = arguments.length,
                                          t = Array(e),
                                          r = 0;
                                        r < e;
                                        r++
                                      )
                                        t[r] = arguments[r];
                                      return (0, h.QP)((0, m.$)(t));
                                    })(
                                      "text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5",
                                      e === t.href &&
                                        "text-foreground font-medium",
                                    ),
                                    "data-active":
                                      e === t.href ? "true" : void 0,
                                    children: (0, s.jsxs)(s.Fragment, {
                                      children: [
                                        t.name,
                                        e === t.href &&
                                          (0, s.jsx)("span", {
                                            className:
                                              "size-1.5 rounded-full bg-foreground/70",
                                          }),
                                      ],
                                    }),
                                  }),
                                },
                                t.name,
                              ),
                            ),
                          }),
                        ],
                      },
                      t.title,
                    ),
                  ),
                ],
              }),
              (0, s.jsxs)("div", {
                className:
                  "flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-border text-center md:text-left",
                "data-slot": "footer-bottom",
                children: [
                  (0, s.jsxs)("div", {
                    className:
                      "flex items-center text-sm text-muted-foreground mb-3 md:mb-0",
                    "data-slot": "footer-copyright",
                    children: [
                      (0, s.jsx)(l.A, { className: "h-4 w-4 mr-2" }),
                      (0, s.jsxs)("span", {
                        children: [t, " Hijraah. All rights reserved."],
                      }),
                    ],
                  }),
                  (0, s.jsxs)("div", {
                    className:
                      "flex items-center text-sm text-muted-foreground",
                    "data-slot": "footer-tagline",
                    children: [
                      (0, s.jsx)("span", { children: "Made with" }),
                      (0, s.jsx)(o.A, {
                        className:
                          "h-4 w-4 mx-1.5 text-destructive animate-pulse",
                      }),
                      (0, s.jsx)("span", { children: "by Hijraah Team" }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
    13802: (e, t, r) => {
      "use strict";
      r.d(t, { ErrorBoundary: () => c });
      var s = r(30602),
        a = r(58261),
        n = r(59834),
        i = r(85218),
        l = r(20435),
        o = r(5271);
      class c extends i.Component {
        static getDerivedStateFromError(e) {
          return { hasError: !0, error: e };
        }
        componentDidCatch(e) {
          var t, r;
          console.error("Error caught by boundary:", e),
            null == (t = (r = this.props).onError) || t.call(r, e);
        }
        render() {
          if (this.state.hasError) {
            var e;
            return this.props.fallback
              ? this.props.fallback
              : (0, s.jsxs)(l.Fc, {
                  variant: "destructive",
                  className: "my-8",
                  children: [
                    (0, s.jsx)(a.A, { className: "h-4 w-4" }),
                    (0, s.jsx)(l.XL, { children: "Something went wrong" }),
                    (0, s.jsxs)(l.TN, {
                      className: "mt-2 flex flex-col gap-4",
                      children: [
                        (0, s.jsx)("p", {
                          children:
                            (null == (e = this.state.error)
                              ? void 0
                              : e.message) || "An unexpected error occurred",
                        }),
                        (0, s.jsxs)(o.$, {
                          variant: "outline",
                          size: "sm",
                          className: "w-fit gap-2",
                          onClick: () => {
                            this.setState({ hasError: !1, error: null }),
                              window.location.reload();
                          },
                          children: [
                            (0, s.jsx)(n.A, { className: "h-4 w-4" }),
                            "Try again",
                          ],
                        }),
                      ],
                    }),
                  ],
                });
          }
          return this.props.children;
        }
        constructor(e) {
          super(e), (this.state = { hasError: !1, error: null });
        }
      }
    },
    26051: (e, t, r) => {
      "use strict";
      r.d(t, { IntlClientProvider: () => i });
      var s = r(30602),
        a = r(73974),
        n = r(13868);
      function i(e) {
        let {
            locale: t,
            messages: r,
            timeZone: i = "UTC",
            now: l = new Date(),
            children: o,
          } = e,
          c = (0, n.XG)(t);
        return (0, s.jsx)(a.NextIntlClientProvider, {
          locale: t,
          messages: r,
          timeZone: i,
          now: l,
          onError: (e) => {
            e.code === a.IntlErrorCode.MISSING_MESSAGE ||
              console.error("Translation error:", e);
          },
          getMessageFallback: (e) => {
            let { namespace: t, key: r, error: s } = e,
              a =
                r.charAt(0).toUpperCase() +
                r.slice(1).replace(/([A-Z])/g, " $1");
            return t ? "".concat(a) : a;
          },
          formats: {
            dateTime: {
              short: { day: "2-digit", month: "2-digit", year: "numeric" },
              medium: { day: "numeric", month: "short", year: "numeric" },
              long: { day: "numeric", month: "long", year: "numeric" },
              full: {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              },
              time: {
                hour: "2-digit",
                minute: "2-digit",
                hour12: "en" === c.htmlLang,
              },
            },
            number: {
              precise: { maximumFractionDigits: 2, minimumFractionDigits: 2 },
              compact: { notation: "compact" },
              percent: { style: "percent", maximumFractionDigits: 2 },
              currency: { style: "currency", currency: "USD" },
            },
            list: {
              enumeration: { style: "long", type: "conjunction" },
              or: { style: "long", type: "disjunction" },
            },
          },
          children: o,
        });
      }
    },
    38749: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 26051)),
        Promise.resolve().then(r.bind(r, 43881)),
        Promise.resolve().then(r.bind(r, 11558)),
        Promise.resolve().then(r.bind(r, 13802)),
        Promise.resolve().then(r.bind(r, 11255)),
        Promise.resolve().then(r.bind(r, 83077)),
        Promise.resolve().then(r.bind(r, 61615)),
        Promise.resolve().then(r.bind(r, 95879)),
        Promise.resolve().then(r.bind(r, 56753)),
        Promise.resolve().then(r.bind(r, 60211)),
        Promise.resolve().then(r.bind(r, 4473)),
        Promise.resolve().then(r.bind(r, 74045)),
        Promise.resolve().then(r.t.bind(r, 45584, 23)),
        Promise.resolve().then(r.t.bind(r, 2296, 23)),
        Promise.resolve().then(r.bind(r, 79294));
    },
    43881: (e, t, r) => {
      "use strict";
      r.d(t, { Providers: () => T });
      var s = r(30602),
        a = r(61670),
        n = r(85218),
        i = r(17904),
        l = r(36839),
        o = r(10190),
        c = r(2960),
        d = r(20731);
      function u() {
        let { onboarding: e, resetOnboarding: t } = (0, d.z)(),
          [r, s] = (0, n.useState)(!1);
        return (
          (0, c.createBrowserClient)(
            "http://localhost:54321",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          ),
          null
        );
      }
      var m = r(36350),
        h = r(87758),
        p = r(5271),
        x = r(33511);
      let f = () => {
          let {
            onboarding: e,
            hideOnboardingForSession: t,
            resetOnboarding: r,
            nextStep: a,
          } = (0, d.z)();
          if (!e.isActive || e.hideForSession || e.isCompleted) return null;
          let n = (0, o.Dv)(e.currentStep),
            i = (0, o.B5)(e.currentStep),
            l = (0, o.Yk)(),
            c = Array.from({ length: l }, (e, t) => (0, o.m_)(t)).filter(
              (e) => void 0 !== e,
            );
          if (!n) return null;
          let u = "profile-setup" === e.currentStep;
          return (0, s.jsxs)("div", {
            className: "".concat(
              u
                ? "fixed bottom-4 right-4 z-30"
                : "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30",
              " bg-card shadow-lg rounded-lg p-4 w-full max-w-md border flex flex-col gap-3",
            ),
            children: [
              (0, s.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                  (0, s.jsx)("h3", {
                    className: "font-medium",
                    children: "Your Onboarding Progress",
                  }),
                  (0, s.jsx)(p.$, {
                    variant: "ghost",
                    size: "icon",
                    className: "h-6 w-6",
                    onClick: t,
                    "aria-label": "Dismiss",
                    children: (0, s.jsx)(m.A, { className: "h-4 w-4" }),
                  }),
                ],
              }),
              (0, s.jsxs)("div", {
                className: "space-y-3",
                children: [
                  (0, s.jsxs)("div", {
                    className: "flex items-center justify-between text-sm",
                    children: [
                      (0, s.jsxs)("p", {
                        children: [e.progress, "% Completed"],
                      }),
                      (0, s.jsxs)("p", { children: [i + 1, "/", l] }),
                    ],
                  }),
                  (0, s.jsx)(x.k, { value: e.progress, className: "h-2" }),
                  (0, s.jsx)("div", {
                    className: "flex flex-wrap gap-2",
                    children: c.map((e, t) =>
                      (0, s.jsx)(
                        "div",
                        {
                          className:
                            "\n                                px-3 py-1 text-xs rounded-full border \n                                ".concat(
                              t < i
                                ? "bg-primary/20 border-primary/30 text-primary-foreground"
                                : t === i
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground",
                              "\n                            ",
                            ),
                          children: e.title,
                        },
                        e.id,
                      ),
                    ),
                  }),
                ],
              }),
              n.features &&
                n.features.length > 0 &&
                (0, s.jsxs)("div", {
                  className: "mt-2 space-y-2",
                  children: [
                    (0, s.jsxs)("h4", {
                      className: "text-sm font-medium",
                      children: [n.title, " Features:"],
                    }),
                    (0, s.jsx)("ul", {
                      className: "space-y-1",
                      children: n.features.map((e) =>
                        (0, s.jsxs)(
                          "li",
                          {
                            className: "text-xs flex items-start gap-2",
                            children: [
                              (0, s.jsx)(h.A, {
                                className:
                                  "h-3 w-3 mt-0.5 flex-shrink-0 text-primary",
                              }),
                              (0, s.jsx)("span", {
                                className: "flex-1",
                                children: e.title,
                              }),
                            ],
                          },
                          e.id,
                        ),
                      ),
                    }),
                  ],
                }),
              (0, s.jsxs)("div", {
                className: "flex justify-between mt-2",
                children: [
                  (0, s.jsx)(p.$, {
                    variant: "outline",
                    size: "sm",
                    onClick: r,
                    children: "Restart",
                  }),
                  (0, s.jsx)(p.$, {
                    variant: "default",
                    size: "sm",
                    onClick: a,
                    children: "Continue",
                  }),
                ],
              }),
            ],
          });
        },
        g = (0, n.lazy)(() =>
          Promise.all([r.e(4223), r.e(508)])
            .then(r.bind(r, 60508))
            .then((e) => ({ default: e.WelcomeModal })),
        ),
        b = (0, n.lazy)(() =>
          Promise.all([r.e(4223), r.e(6719)])
            .then(r.bind(r, 76719))
            .then((e) => ({ default: e.ProfileSetup })),
        ),
        j = (0, n.lazy)(() =>
          Promise.all([r.e(4223), r.e(3209), r.e(1921)])
            .then(r.bind(r, 41921))
            .then((e) => ({ default: e.FeatureTour })),
        ),
        y = {
          welcome: g,
          "profile-setup": b,
          "feature-tour": j,
          "first-task": (0, n.lazy)(() =>
            Promise.all([r.e(4223), r.e(5312)])
              .then(r.bind(r, 15312))
              .then((e) => ({ default: e.FirstTask })),
          ),
          resources: (0, n.lazy)(() =>
            Promise.all([r.e(4223), r.e(346)])
              .then(r.bind(r, 80346))
              .then((e) => ({ default: e.Resources })),
          ),
        },
        v = () => {
          let { onboarding: e, isLoading: t } = (0, d.z)();
          if (e.isCompleted || e.hideForSession || !e.isActive) return null;
          let r = e.currentStep,
            a = y[r];
          return a
            ? (o.Zj.find((e) => e.id === r),
              (0, s.jsx)(n.Suspense, {
                fallback: (0, s.jsx)("div", {
                  children: "Loading onboarding step...",
                }),
                children: (0, s.jsx)(a, {}),
              }))
            : (console.warn(
                "[Onboarding] No component mapped for step ID: ".concat(r),
              ),
              null);
        };
      function N(e) {
        let { children: t } = e;
        return (0, s.jsxs)(d.X, {
          children: [
            t,
            (0, s.jsx)(v, {}),
            (0, s.jsx)(f, {}),
            (0, s.jsx)(u, {}),
          ],
        });
      }
      var w = r(84418);
      let S = {
        isActive: !1,
        activity: [],
        sources: [],
        currentDepth: 1,
        maxDepth: 3,
        completedSteps: 0,
        totalExpectedSteps: 10,
        sessionId: null,
      };
      function C(e, t) {
        switch (t.type) {
          case "TOGGLE_ACTIVE":
            return { ...e, isActive: !e.isActive };
          case "SET_ACTIVE":
            return { ...e, isActive: t.payload };
          case "ADD_ACTIVITY": {
            let r = {
                ...t.payload,
                timestamp: t.payload.timestamp || new Date().toISOString(),
              },
              s = e.completedSteps,
              a = e.totalExpectedSteps;
            return (
              "number" == typeof t.payload.completedSteps &&
                "number" == typeof t.payload.totalSteps &&
                ((s = t.payload.completedSteps), (a = t.payload.totalSteps)),
              {
                ...e,
                activity: [...e.activity, r],
                completedSteps: s,
                totalExpectedSteps: a,
              }
            );
          }
          case "ADD_SOURCE":
            if (e.sources.some((e) => e.url === t.payload.url)) return e;
            return { ...e, sources: [...e.sources, t.payload] };
          case "SET_DEPTH":
            return {
              ...e,
              currentDepth: t.payload.current,
              maxDepth: t.payload.max,
            };
          case "INIT_PROGRESS":
            return {
              ...e,
              maxDepth: t.payload.maxDepth,
              totalExpectedSteps: t.payload.totalSteps,
              completedSteps: 0,
            };
          case "UPDATE_PROGRESS":
            return {
              ...e,
              completedSteps: t.payload.completed,
              totalExpectedSteps: t.payload.total,
            };
          case "SET_SESSION_ID":
            return { ...e, sessionId: t.payload };
          case "CLEAR_STATE":
            return { ...S, activity: [], sources: [] };
          default:
            return e;
        }
      }
      let E = (0, n.createContext)(void 0);
      function k(e) {
        let { children: t } = e,
          [r, a] = (0, n.useReducer)(C, S),
          i = (0, n.useCallback)(() => {
            a({ type: "TOGGLE_ACTIVE" });
          }, []),
          l = (0, n.useCallback)((e) => {
            a({ type: "SET_ACTIVE", payload: e });
          }, []),
          o = (0, n.useCallback)((e) => {
            a({ type: "ADD_ACTIVITY", payload: e });
          }, []),
          c = (0, n.useCallback)((e) => {
            a({ type: "ADD_SOURCE", payload: e });
          }, []),
          d = (0, n.useCallback)((e, t) => {
            a({ type: "SET_DEPTH", payload: { current: e, max: t } });
          }, []),
          u = (0, n.useCallback)((e, t) => {
            a({
              type: "INIT_PROGRESS",
              payload: { maxDepth: e, totalSteps: t },
            });
          }, []),
          m = (0, n.useCallback)((e, t) => {
            a({ type: "UPDATE_PROGRESS", payload: { completed: e, total: t } });
          }, []),
          h = (0, n.useCallback)((e) => {
            a({ type: "SET_SESSION_ID", payload: e });
          }, []),
          p = (0, n.useCallback)(() => {
            a({ type: "CLEAR_STATE" });
          }, []);
        return (0, s.jsx)(E.Provider, {
          value: {
            state: r,
            toggleActive: i,
            setActive: l,
            addActivity: o,
            addSource: c,
            setDepth: d,
            initProgress: u,
            updateProgress: m,
            setSessionId: h,
            clearState: p,
          },
          children: t,
        });
      }
      var A = r(5164),
        _ = r(39931),
        I = r(9795);
      let D = (e) => {
        let { error: t } = e;
        return (0, s.jsxs)("div", {
          className: "p-4 bg-red-50 border border-red-200 rounded text-red-800",
          children: [
            (0, s.jsx)("h2", {
              className: "text-lg font-bold",
              children: "Something went wrong",
            }),
            (0, s.jsx)("p", { children: t.message }),
          ],
        });
      };
      function T(e) {
        let { children: t } = e;
        return (0, s.jsx)(i.tH, {
          FallbackComponent: D,
          children: (0, s.jsx)(w.AuthProvider, {
            children: (0, s.jsx)(a.N, {
              attribute: "class",
              defaultTheme: "system",
              enableSystem: !0,
              disableTransitionOnChange: !0,
              children: (0, s.jsx)(I.Bc, {
                children: (0, s.jsx)(A.Y, {
                  children: (0, s.jsxs)(k, {
                    children: [
                      (0, s.jsx)(_.Ck, {
                        children: (0, s.jsx)(N, { children: t }),
                      }),
                      (0, s.jsx)(l.l$, {
                        position: "top-right",
                        toastOptions: {
                          style: {
                            background: "var(--background)",
                            color: "var(--foreground)",
                          },
                          className: "border border-border",
                        },
                        closeButton: !0,
                        richColors: !0,
                      }),
                    ],
                  }),
                }),
              }),
            }),
          }),
        });
      }
    },
    61615: (e, t, r) => {
      "use strict";
      r.d(t, { NotificationButton: () => h });
      var s = r(30602),
        a = r(68454),
        n = r(52219),
        i = r(85218),
        l = r(26600),
        o = r(5271),
        c = r(78137),
        d = r(79430),
        u = r(84418),
        m = r(14985);
      function h() {
        let { user: e } = (0, u.useAuth)(),
          t = (0, m.Iw)(),
          [r, h] = (0, i.useState)([]),
          [p, x] = (0, i.useState)(0),
          [f, g] = (0, i.useState)(!1),
          [b, j] = (0, i.useState)(null),
          [y, v] = (0, i.useState)(!1);
        (0, i.useEffect)(() => {
          if (!e || !t) return;
          let r = async () => {
            g(!0), j(null);
            try {
              let { data: r, error: s } = await t
                .from("notifications")
                .select("*")
                .eq("user_id", e.id)
                .order("created_at", { ascending: !1 })
                .limit(10);
              if (s) throw s;
              h(r || []);
              let a = (r || []).filter((e) => !e.is_read).length;
              x(a);
            } catch (e) {
              console.error(
                "Error fetching notifications (raw):",
                e,
                "Error fetching notifications (JSON):",
                JSON.stringify(e, Object.getOwnPropertyNames(e)),
              ),
                j("Failed to load notifications"),
                h([]),
                x(0);
            } finally {
              g(!1);
            }
          };
          r();
          let s = t
            .channel("public:notifications")
            .on(
              "postgres_changes",
              {
                event: "INSERT",
                schema: "public",
                table: "notifications",
                filter: "user_id=eq.".concat(e.id),
              },
              (e) => {
                h((t) => [e.new, ...t].slice(0, 10)), x((e) => e + 1);
              },
            )
            .on(
              "postgres_changes",
              {
                event: "UPDATE",
                schema: "public",
                table: "notifications",
                filter: "user_id=eq.".concat(e.id),
              },
              (e) => {
                let t = e.new;
                h((e) => e.map((e) => (e.id === t.id ? t : e))), r();
              },
            )
            .subscribe();
          return () => {
            t &&
              s &&
              t
                .removeChannel(s)
                .catch((e) => console.error("Error removing channel:", e));
          };
        }, [e, t]);
        let N = async (r) => {
            if (e && t)
              try {
                let { error: s } = await t
                  .from("notifications")
                  .update({ is_read: !0 })
                  .eq("id", r)
                  .eq("user_id", e.id);
                if (s) throw s;
                h((e) =>
                  e.map((e) =>
                    e.id !== r || e.is_read
                      ? e
                      : (x((e) => Math.max(0, e - 1)), { ...e, is_read: !0 }),
                  ),
                );
              } catch (e) {
                console.error("Error marking notification as read:", e);
              }
          },
          w = async () => {
            if (e && t && 0 !== p)
              try {
                let { error: r } = await t
                  .from("notifications")
                  .update({ is_read: !0 })
                  .eq("user_id", e.id)
                  .eq("is_read", !1);
                if (r) throw r;
                h((e) => e.map((e) => ({ ...e, is_read: !0 }))), x(0);
              } catch (e) {
                console.error("Error marking all notifications as read:", e);
              }
          };
        return (0, s.jsxs)(c.AM, {
          open: y,
          onOpenChange: v,
          children: [
            (0, s.jsx)(c.Wv, {
              asChild: !0,
              children: (0, s.jsxs)(o.$, {
                variant: "ghost",
                size: "icon",
                className: "relative",
                children: [
                  (0, s.jsx)(n.A, { className: "h-5 w-5" }),
                  p > 0 &&
                    (0, s.jsx)(l.E, {
                      variant: "destructive",
                      className:
                        "absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs",
                      children: p,
                    }),
                  (0, s.jsx)("span", {
                    className: "sr-only",
                    children: "Notifications",
                  }),
                ],
              }),
            }),
            (0, s.jsxs)(c.hl, {
              className: "w-80 p-0",
              children: [
                (0, s.jsxs)("div", {
                  className: "flex items-center justify-between border-b p-4",
                  children: [
                    (0, s.jsx)("h3", {
                      className: "font-semibold",
                      children: "Notifications",
                    }),
                    p > 0 &&
                      (0, s.jsx)(o.$, {
                        variant: "link",
                        size: "sm",
                        onClick: w,
                        className: "h-auto p-0",
                        children: "Mark all as read",
                      }),
                  ],
                }),
                (0, s.jsx)(d.F, {
                  className: "h-[300px]",
                  children: f
                    ? (0, s.jsx)("p", {
                        className:
                          "p-4 text-center text-sm text-muted-foreground",
                        children: "Loading...",
                      })
                    : b
                      ? (0, s.jsx)("p", {
                          className: "p-4 text-center text-sm text-destructive",
                          children: b,
                        })
                      : 0 === r.length
                        ? (0, s.jsx)("p", {
                            className:
                              "p-4 text-center text-sm text-muted-foreground",
                            children: "No new notifications",
                          })
                        : (0, s.jsx)("div", {
                            children: r.map((e) =>
                              (0, s.jsxs)(
                                "div",
                                {
                                  className:
                                    "flex flex-col items-start gap-1 p-4 border-b last:border-0 cursor-pointer hover:bg-muted/50 ".concat(
                                      e.is_read
                                        ? ""
                                        : "bg-blue-50 dark:bg-blue-900/20 font-medium",
                                    ),
                                  onClick: () => N(e.id),
                                  role: "button",
                                  tabIndex: 0,
                                  onKeyDown: (t) =>
                                    "Enter" === t.key && N(e.id),
                                  children: [
                                    (0, s.jsx)("p", {
                                      className: "text-sm leading-tight",
                                      children:
                                        e.message || "No message content",
                                    }),
                                    (0, s.jsx)("p", {
                                      className:
                                        "text-xs text-muted-foreground",
                                      children: (0, a.m)(
                                        new Date(e.created_at),
                                        { addSuffix: !0 },
                                      ),
                                    }),
                                  ],
                                },
                                e.id,
                              ),
                            ),
                          }),
                }),
              ],
            }),
          ],
        });
      }
    },
    83077: (e, t, r) => {
      "use strict";
      r.d(t, { default: () => l });
      var s = r(30602),
        a = r(72793);
      r(85218);
      var n = r(88542);
      let i = (0, a.default)(() => r.e(4223).then(r.bind(r, 37518)), {
        loadableGenerated: { webpack: () => [37518] },
        ssr: !1,
        loading: () =>
          (0, s.jsx)(n.E, {
            className: "h-9 w-9 rounded-full",
            "aria-label": "Loading language switcher",
          }),
      });
      function l() {
        return (0, s.jsx)(i, {});
      }
    },
    95879: (e, t, r) => {
      "use strict";
      r.d(t, { Search: () => p });
      var s = r(30602),
        a = r(72170),
        n = r(38027),
        i = r(71188),
        l = r(85218),
        o = r(33399),
        c = r(5271),
        d = r(59487),
        u = r(4401),
        m = r(5164),
        h = r(30311);
      function p() {
        let [e, t] = l.useState(!1),
          r = l.useRef(null),
          {
            query: p,
            setQuery: x,
            isLoading: f,
            suggestions: g,
            aiSuggestions: b,
            handleSearch: j,
            clearSearch: y,
          } = (0, m.$)();
        (0, o.vC)(["meta+k", "ctrl+k"], (e) => {
          e.preventDefault(), t((e) => !e);
        }),
          l.useEffect(() => {
            let e = (e) => {
              "k" === e.key &&
                (e.metaKey || e.ctrlKey) &&
                (e.preventDefault(), t((e) => !e));
            };
            return (
              document.addEventListener("keydown", e),
              () => document.removeEventListener("keydown", e)
            );
          }, []);
        let v = async (e) => {
          var t;
          e.preventDefault(), await j(e), null == (t = r.current) || t.blur();
        };
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsxs)("form", {
              onSubmit: v,
              className: "relative flex w-full max-w-sm items-center space-x-2",
              role: "search",
              children: [
                (0, s.jsx)(u.p, {
                  ref: r,
                  type: "search",
                  placeholder: "Search documents, requirements...",
                  value: p,
                  onChange: (e) => x(e.target.value),
                  className: (0, h.cn)(
                    "h-9 w-9 rounded-full pl-8 pr-4 focus-visible:w-64 xl:w-64",
                    "transition-all duration-300 ease-in-out",
                    "focus-visible:rounded-md",
                  ),
                  "aria-label": "Search",
                  "aria-expanded": e,
                  "aria-controls": "search-results",
                  "aria-describedby": "search-desc",
                }),
                (0, s.jsx)(a.A, {
                  className: "absolute left-2.5 h-4 w-4 text-muted-foreground",
                  "aria-hidden": "true",
                }),
                p &&
                  !f &&
                  (0, s.jsx)(c.$, {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "absolute right-2 h-6 w-6",
                    onClick: y,
                    "aria-label": "Clear search",
                    children: (0, s.jsx)(n.A, { className: "h-4 w-4" }),
                  }),
                f &&
                  (0, s.jsx)(i.A, {
                    className: "absolute right-2 h-4 w-4 animate-spin",
                    "aria-hidden": "true",
                  }),
                (0, s.jsx)("span", {
                  className: "sr-only",
                  id: "search-desc",
                  children: "Press ⌘K to open search",
                }),
              ],
            }),
            (0, s.jsxs)(d.Gj, {
              open: e,
              onOpenChange: t,
              children: [
                (0, s.jsx)(d.G7, {
                  placeholder: "Type a command or search...",
                  value: p,
                  onValueChange: x,
                }),
                (0, s.jsxs)(d.oI, {
                  id: "search-results",
                  children: [
                    (0, s.jsx)(d.xL, { children: "No results found." }),
                    f
                      ? (0, s.jsx)("div", {
                          className: "flex items-center justify-center py-6",
                          children: (0, s.jsx)(i.A, {
                            className: "h-4 w-4 animate-spin",
                          }),
                        })
                      : (0, s.jsxs)(s.Fragment, {
                          children: [
                            g.length > 0 &&
                              (0, s.jsx)(d.L$, {
                                heading: "Quick Links",
                                children: g.map((e) =>
                                  (0, s.jsx)(
                                    d.h_,
                                    { onSelect: () => x(e), children: e },
                                    e,
                                  ),
                                ),
                              }),
                            b.length > 0 &&
                              (0, s.jsxs)(s.Fragment, {
                                children: [
                                  (0, s.jsx)(d.fx, {}),
                                  (0, s.jsx)(d.L$, {
                                    heading: "AI Suggestions",
                                    children: b.map((e) =>
                                      (0, s.jsx)(
                                        d.h_,
                                        { onSelect: () => x(e), children: e },
                                        e,
                                      ),
                                    ),
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
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [6593, 4223, 3209, 7358], () => t(38749)), (_N_E = e.O());
  },
]);
