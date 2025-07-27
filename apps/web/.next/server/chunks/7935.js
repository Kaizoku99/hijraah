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
    (e._sentryDebugIds[t] = "82b7900a-ea9c-4520-a09e-98b383947bda"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-82b7900a-ea9c-4520-a09e-98b383947bda"));
} catch (e) {}
(exports.id = 7935),
  (exports.ids = [7935]),
  (exports.modules = {
    2963: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { O: () => b });
          var o = r(61268),
            s = r(44803),
            n = r(13274),
            i = r(23734),
            l = r(17362),
            d = r(28909),
            c = r(78337),
            u = r(98383),
            m = r(16176),
            p = r(33713),
            h = r(82389),
            f = e([i, l, d, c, u, m, p, h]);
          function b({
            children: e,
            title: t = "Dashboard",
            breadcrumbs: r = [],
            heroSection: a,
          }) {
            return (0, o.jsxs)(o.Fragment, {
              children: [
                (0, o.jsxs)("header", {
                  className:
                    "sticky top-0 z-40 flex h-16 items-center border-b border-border bg-background/95 backdrop-blur-sm px-4 transition-[width,height] ease-linear",
                  children: [
                    (0, o.jsxs)("div", {
                      className: "flex items-center gap-2 mr-4",
                      children: [
                        (0, o.jsx)(p.SidebarTrigger, { className: "-ml-1" }),
                        (0, o.jsx)(m.Separator, {
                          orientation: "vertical",
                          className: "h-4 mr-2",
                        }),
                        (0, o.jsx)(l.Qp, {
                          children: (0, o.jsxs)(l.AB, {
                            children: [
                              r.map((e, t) =>
                                (0, o.jsxs)(
                                  l.J5,
                                  {
                                    className: "hidden md:block",
                                    children: [
                                      e.href
                                        ? (0, o.jsx)(l.w1, {
                                            href: e.href,
                                            children: e.title,
                                          })
                                        : (0, o.jsx)(l.tJ, {
                                            children: e.title,
                                          }),
                                      t < r.length - 1 && (0, o.jsx)(l.tH, {}),
                                    ],
                                  },
                                  t,
                                ),
                              ),
                              0 === r.length &&
                                (0, o.jsx)(l.J5, {
                                  children: (0, o.jsx)(l.tJ, { children: t }),
                                }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    (0, o.jsxs)("div", {
                      className: "ml-auto flex items-center gap-4",
                      children: [
                        (0, o.jsxs)("div", {
                          className: "relative hidden md:block w-72",
                          children: [
                            (0, o.jsx)(s.A, {
                              className:
                                "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
                            }),
                            (0, o.jsx)(c.p, {
                              type: "search",
                              placeholder: "Search...",
                              className:
                                "w-full rounded-full bg-background pl-8 md:w-60 lg:w-72",
                            }),
                          ],
                        }),
                        (0, o.jsxs)(d.$, {
                          size: "icon",
                          variant: "ghost",
                          className: "relative",
                          children: [
                            (0, o.jsx)(n.A, {
                              className: "h-5 w-5 text-muted-foreground",
                            }),
                            (0, o.jsx)("span", {
                              className:
                                "absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground",
                              children: "3",
                            }),
                          ],
                        }),
                        (0, o.jsx)(u.A, {}),
                        (0, o.jsx)(h.ThemeToggle, {}),
                        (0, o.jsx)(i.eu, {
                          className: "h-8 w-8 border border-border",
                          children: (0, o.jsx)("span", {
                            className: "font-medium text-sm",
                            children: "U",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                a &&
                  (0, o.jsx)("div", {
                    className: "bg-sidebar-background text-sidebar-foreground",
                    children: a,
                  }),
                (0, o.jsx)("div", {
                  className: "flex-1",
                  children: (0, o.jsx)("div", {
                    className: "container py-6 max-w-full px-6",
                    children: e,
                  }),
                }),
              ],
            });
          }
          ([i, l, d, c, u, m, p, h] = f.then ? (await f)() : f), a();
        } catch (e) {
          a(e);
        }
      });
    },
    3184: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { ErrorBoundary: () => u });
          var o = r(61268),
            s = r(61950),
            n = r(63091),
            i = r(84205),
            l = r(44619),
            d = r(28909),
            c = e([l, d]);
          [l, d] = c.then ? (await c)() : c;
          class u extends i.Component {
            constructor(e) {
              super(e), (this.state = { hasError: !1, error: null });
            }
            static getDerivedStateFromError(e) {
              return { hasError: !0, error: e };
            }
            componentDidCatch(e) {
              console.error("Error caught by boundary:", e),
                this.props.onError?.(e);
            }
            render() {
              return this.state.hasError
                ? this.props.fallback
                  ? this.props.fallback
                  : (0, o.jsxs)(l.Fc, {
                      variant: "destructive",
                      className: "my-8",
                      children: [
                        (0, o.jsx)(s.A, { className: "h-4 w-4" }),
                        (0, o.jsx)(l.XL, { children: "Something went wrong" }),
                        (0, o.jsxs)(l.TN, {
                          className: "mt-2 flex flex-col gap-4",
                          children: [
                            (0, o.jsx)("p", {
                              children:
                                this.state.error?.message ||
                                "An unexpected error occurred",
                            }),
                            (0, o.jsxs)(d.$, {
                              variant: "outline",
                              size: "sm",
                              className: "w-fit gap-2",
                              onClick: () => {
                                this.setState({ hasError: !1, error: null }),
                                  window.location.reload();
                              },
                              children: [
                                (0, o.jsx)(n.A, { className: "h-4 w-4" }),
                                "Try again",
                              ],
                            }),
                          ],
                        }),
                      ],
                    })
                : this.props.children;
            }
          }
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    5357: (e, t, r) => {
      "use strict";
      r.d(t, { IB: () => a.IB, o0: () => a.o0, s9: () => o.useI18n });
      var a = r(58702),
        o = r(70724);
      r(3452);
    },
    8309: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.r(t), r.d(t, { default: () => c });
          var o = r(61268),
            s = r(31655),
            n = r.n(s),
            i = r(95124),
            l = r(2963),
            d = e([l]);
          function c() {
            let e = "Page Not Found",
              t = "The page you are looking for does not exist.",
              r = "Back to Home";
            try {
              let a = (0, i.useTranslations)("errors");
              return (0, o.jsx)(l.O, {
                children: (0, o.jsxs)("div", {
                  className:
                    "flex flex-col items-center justify-center min-h-screen py-2",
                  children: [
                    (0, o.jsx)("h1", {
                      className: "text-4xl font-bold",
                      children: a("notFound", { fallback: e }),
                    }),
                    (0, o.jsx)("p", {
                      className: "mt-3 text-xl mb-6",
                      children: a("pageNotFound", { fallback: t }),
                    }),
                    (0, o.jsx)(n(), {
                      href: "/",
                      className:
                        "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                      legacyBehavior: !0,
                      children: a("backHome", { fallback: r }),
                    }),
                  ],
                }),
              });
            } catch (a) {
              return (
                console.error("Translation error in not-found page:", a),
                (0, o.jsx)(l.O, {
                  children: (0, o.jsxs)("div", {
                    className:
                      "flex flex-col items-center justify-center min-h-screen py-2",
                    children: [
                      (0, o.jsx)("h1", {
                        className: "text-4xl font-bold",
                        children: e,
                      }),
                      (0, o.jsx)("p", {
                        className: "mt-3 text-xl mb-6",
                        children: t,
                      }),
                      (0, o.jsx)(n(), {
                        href: "/",
                        className:
                          "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                        legacyBehavior: !0,
                        children: r,
                      }),
                    ],
                  }),
                })
              );
            }
          }
          (l = (d.then ? (await d)() : d)[0]), a();
        } catch (e) {
          a(e);
        }
      });
    },
    9032: (e, t, r) => {
      "use strict";
      r.d(t, { IntlClientProvider: () => a });
      let a = (0, r(26394).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call IntlClientProvider() from the server but IntlClientProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\client-providers.tsx",
        "IntlClientProvider",
      );
    },
    12126: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { AM: () => l, Wv: () => d, hl: () => c });
          var o = r(61268),
            s = r(96229);
          r(84205);
          var n = r(15942),
            i = e([n]);
          function l({ ...e }) {
            return (0, o.jsx)(s.bL, { "data-slot": "popover", ...e });
          }
          function d({ ...e }) {
            return (0, o.jsx)(s.l9, { "data-slot": "popover-trigger", ...e });
          }
          function c({
            className: e,
            align: t = "center",
            sideOffset: r = 4,
            ...a
          }) {
            return (0, o.jsx)(s.ZL, {
              children: (0, o.jsx)(s.UC, {
                "data-slot": "popover-content",
                align: t,
                sideOffset: r,
                className: (0, n.cn)(
                  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-hidden",
                  e,
                ),
                ...a,
              }),
            });
          }
          (n = (i.then ? (await i)() : i)[0]), a();
        } catch (e) {
          a(e);
        }
      });
    },
    13242: (e, t, r) => {
      "use strict";
      r.d(t, { F: () => o });
      var a = r(61268);
      r(84205);
      let o = ({ children: e, className: t, ...r }) =>
        (0, a.jsx)("div", {
          className: `overflow-auto ${t || ""}`,
          ...r,
          children: e,
        });
    },
    16714: (e, t, r) => {
      "use strict";
      r.d(t, { AppSidebar: () => a });
      let a = (0, r(26394).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call AppSidebar() from the server but AppSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\app-sidebar.tsx",
        "AppSidebar",
      );
    },
    16951: (e, t, r) => {
      "use strict";
      r.d(t, {
        B5: () => h,
        Dv: () => p,
        Yk: () => f,
        ZH: () => b,
        Zj: () => u,
        m_: () => m,
      });
      var a = r(58882),
        o = r(14677),
        s = r(99793),
        n = r(92663),
        i = r(80305),
        l = r(3745),
        d = r(15012),
        c = r(52327);
      r(84205);
      let u = [
          {
            id: "welcome",
            title: "Welcome to Hijraah",
            description:
              "Your journey to simplified immigration starts here. We'll guide you through the process step by step.",
            component: "WelcomeModal",
          },
          {
            id: "profile-setup",
            title: "Profile Setup",
            description:
              "Tell us about your immigration goals and preferences so we can personalize your experience.",
            component: "ProfileSetup",
            profileSetupConfig: {
              actionKey: "profile_setup_completed",
              countries: [
                { value: "us", label: "United States" },
                { value: "ca", label: "Canada" },
                { value: "uk", label: "United Kingdom" },
                { value: "in", label: "India" },
                { value: "ng", label: "Nigeria" },
                { value: "cn", label: "China" },
                { value: "other", label: "Other" },
              ],
              destinations: [
                { value: "us", label: "United States" },
                { value: "ca", label: "Canada" },
                { value: "uk", label: "United Kingdom" },
                { value: "au", label: "Australia" },
                { value: "nz", label: "New Zealand" },
                { value: "de", label: "Germany" },
                { value: "other", label: "Other" },
              ],
              languages: [
                { value: "en", label: "English" },
                { value: "es", label: "Spanish" },
                { value: "fr", label: "French" },
                { value: "ar", label: "Arabic" },
              ],
            },
            features: [
              {
                id: "personal-info",
                title: "Personal Information",
                description:
                  "Securely store your basic information to streamline document completion.",
              },
              {
                id: "immigration-status",
                title: "Immigration Status",
                description:
                  "Help us understand your current situation and destination plans.",
              },
              {
                id: "preferences",
                title: "Preferences",
                description:
                  "Set your preferences for language, notifications, and more.",
              },
            ],
          },
          {
            id: "feature-tour",
            title: "Feature Tour",
            description:
              "Discover the powerful tools Hijraah offers to simplify your immigration journey.",
            component: "FeatureTour",
            actionKey: "feature_tour_completed",
            tourStops: [
              {
                target: '[data-tour="dashboard"]',
                placement: "bottom",
                title: "Your Dashboard",
                content: "Overview of your cases, documents, and progress.",
              },
              {
                target: '[data-tour="profile"]',
                placement: "right",
                title: "Profile Settings",
                content:
                  "Manage your personal information and preferences here.",
              },
              {
                target: '[data-tour="documents"]',
                placement: "left",
                title: "Document Management",
                content:
                  "Upload, organize, and access your important documents securely.",
              },
              {
                target: '[data-tour="cases"]',
                placement: "top",
                title: "Case Tracking",
                content:
                  "Track the status and progress of your immigration cases.",
              },
              {
                target: '[data-tour="help"]',
                placement: "bottom",
                title: "Help & Support",
                content:
                  "Find guides, FAQs, and contact support if you need help.",
              },
            ],
            features: [
              {
                id: "document-management",
                title: "Document Management",
                description:
                  "Upload, organize, and securely store all your important immigration documents in one place.",
                imageUrl: "/images/features/document-management.svg",
              },
              {
                id: "case-tracking",
                title: "Case Tracking",
                description:
                  "Monitor the progress of your immigration applications with real-time status updates.",
                imageUrl: "/images/features/case-tracking.svg",
              },
              {
                id: "ai-assistance",
                title: "AI Assistance",
                description:
                  "Get personalized guidance and answers to your immigration questions with our AI assistant.",
                imageUrl: "/images/features/ai-assistance.svg",
              },
              {
                id: "deadline-reminders",
                title: "Deadline Reminders",
                description:
                  "Never miss an important date with automated reminders for application deadlines and appointments.",
                imageUrl: "/images/features/deadline-reminders.svg",
              },
            ],
          },
          {
            id: "first-task",
            title: "Complete Your First Task",
            description:
              "Choose one task to get started and experience a core feature of Hijraah.",
            component: "FirstTask",
            tasks: [
              {
                id: "upload",
                title: "Upload Your First Document",
                description:
                  "Start by uploading an important immigration document to keep it secure and accessible.",
                cta: "Upload Document",
                icon: a.A,
                actionKey: "first_task_upload",
              },
              {
                id: "consult",
                title: "Schedule a Consultation",
                description:
                  "Book a session with an immigration expert to discuss your specific situation.",
                cta: "Book Consultation",
                icon: o.A,
                actionKey: "first_task_consult",
              },
              {
                id: "application",
                title: "Start an Application/Case",
                description:
                  "Begin your first immigration case setup with our guided process.",
                cta: "Start Case",
                icon: s.A,
                actionKey: "first_task_application",
              },
            ],
            features: [
              {
                id: "create-case",
                title: "Create Your First Case",
                description:
                  "Set up your first immigration case to track your progress and manage documents.",
              },
              {
                id: "upload-document",
                title: "Upload Your First Document",
                description:
                  "Securely upload and store your first immigration document.",
              },
            ],
          },
          {
            id: "resources",
            title: "Explore Resources",
            description:
              "Discover helpful guides, tools, and community support for your immigration journey.",
            component: "Resources",
            actionKey: "resources_viewed",
            resourceCategories: [
              {
                id: "guides",
                title: "Guides",
                icon: n.A,
                resources: [
                  {
                    icon: n.A,
                    title: "Getting Started Guide",
                    description:
                      "A comprehensive guide on how to use Hijraah for your immigration journey.",
                    link: "/guides/getting-started",
                  },
                  {
                    icon: i.A,
                    title: "Country-Specific Guides",
                    description:
                      "Detailed guides for the most popular immigration destinations.",
                    link: "/guides/countries",
                  },
                  {
                    icon: o.A,
                    title: "Immigration Timeline",
                    description:
                      "Learn about typical immigration process timelines and milestones.",
                    link: "/guides/timeline",
                  },
                  {
                    icon: l.A,
                    title: "Frequently Asked Questions",
                    description:
                      "Find answers to common questions about immigration processes.",
                    link: "/help/faq",
                  },
                ],
              },
              {
                id: "documents",
                title: "Documents",
                icon: s.A,
                resources: [
                  {
                    icon: s.A,
                    title: "Document Checklist Tool",
                    description:
                      "Use our tool to generate a checklist of essential documents for your specific case.",
                    link: "/tools/document-checklist",
                  },
                  {
                    icon: s.A,
                    title: "Sample Templates",
                    description:
                      "View sample templates for common immigration forms and letters.",
                    link: "/documents/templates",
                  },
                  {
                    icon: s.A,
                    title: "Legal Resources",
                    description:
                      "Links to official government immigration sites and legal aid information.",
                    link: "/resources/legal",
                  },
                  {
                    icon: s.A,
                    title: "Form Filling Guides",
                    description:
                      "Step-by-step guides for filling out common immigration forms accurately.",
                    link: "/guides/forms",
                  },
                ],
              },
              {
                id: "videos",
                title: "Videos",
                icon: d.A,
                resources: [
                  {
                    icon: d.A,
                    title: "Platform Tutorial",
                    description:
                      "Watch a comprehensive video tutorial on using the Hijraah platform features.",
                    link: "/videos/tutorial",
                  },
                  {
                    icon: d.A,
                    title: "Immigration Process Explained",
                    description:
                      "Video overview of typical immigration processes and common steps involved.",
                    link: "/videos/process",
                  },
                  {
                    icon: d.A,
                    title: "Expert Interviews",
                    description:
                      "Watch interviews with immigration lawyers and consultants sharing insights.",
                    link: "/videos/experts",
                  },
                  {
                    icon: d.A,
                    title: "User Success Stories",
                    description:
                      "Hear from users who successfully navigated their immigration journey with Hijraah.",
                    link: "/videos/success-stories",
                  },
                ],
              },
              {
                id: "community",
                title: "Community & Support",
                icon: c.A,
                resources: [
                  {
                    icon: c.A,
                    title: "Community Forum",
                    description:
                      "Join discussions, ask questions, and share experiences with fellow users.",
                    link: "/community/forums",
                  },
                  {
                    icon: c.A,
                    title: "Find an Expert",
                    description:
                      "Connect with verified immigration experts and consultants through our network.",
                    link: "/experts",
                  },
                  {
                    icon: o.A,
                    title: "Events & Webinars",
                    description:
                      "Find upcoming webinars, workshops, and Q&A sessions related to immigration.",
                    link: "/community/events",
                  },
                  {
                    icon: l.A,
                    title: "Get Support",
                    description:
                      "Access our help center or contact our support team for assistance.",
                    link: "/help",
                  },
                ],
              },
            ],
            features: [
              {
                id: "immigration-guides",
                title: "Immigration Guides",
                description:
                  "Step-by-step guides for different visa types and immigration processes.",
                imageUrl: "/images/features/guides.svg",
              },
              {
                id: "country-information",
                title: "Country Information",
                description:
                  "Detailed information about immigration policies, requirements, and cultural insights for different countries.",
                imageUrl: "/images/features/country-info.svg",
              },
              {
                id: "document-templates",
                title: "Document Templates",
                description:
                  "Access professionally designed templates for common immigration documents and letters.",
                imageUrl: "/images/features/templates.svg",
              },
              {
                id: "community-support",
                title: "Community Support",
                description:
                  "Connect with others on similar immigration journeys to share experiences and advice.",
                imageUrl: "/images/features/community.svg",
              },
            ],
          },
        ],
        m = (e) => {
          if (!(e < 0) && !(e >= u.length)) return u[e];
        },
        p = (e) => u.find((t) => t.id === e),
        h = (e) => u.findIndex((t) => t.id === e),
        f = () => u.length,
        b = u.map((e) => e.id);
    },
    17362: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, {
            AB: () => c,
            J5: () => u,
            Qp: () => d,
            tH: () => h,
            tJ: () => p,
            w1: () => m,
          });
          var o = r(61268),
            s = r(86415),
            n = r(12335);
          r(84205);
          var i = r(15942),
            l = e([i]);
          function d({ ...e }) {
            return (0, o.jsx)("nav", {
              "aria-label": "breadcrumb",
              "data-slot": "breadcrumb",
              ...e,
            });
          }
          function c({ className: e, ...t }) {
            return (0, o.jsx)("ol", {
              "data-slot": "breadcrumb-list",
              className: (0, i.cn)(
                "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
                e,
              ),
              ...t,
            });
          }
          function u({ className: e, ...t }) {
            return (0, o.jsx)("li", {
              "data-slot": "breadcrumb-item",
              className: (0, i.cn)("inline-flex items-center gap-1.5", e),
              ...t,
            });
          }
          function m({ asChild: e, className: t, ...r }) {
            let a = e ? s.DX : "a";
            return (0, o.jsx)(a, {
              "data-slot": "breadcrumb-link",
              className: (0, i.cn)(
                "hover:text-foreground transition-colors",
                t,
              ),
              ...r,
            });
          }
          function p({ className: e, ...t }) {
            return (0, o.jsx)("span", {
              "data-slot": "breadcrumb-page",
              role: "link",
              "aria-disabled": "true",
              "aria-current": "page",
              className: (0, i.cn)("text-foreground font-normal", e),
              ...t,
            });
          }
          function h({ children: e, className: t, ...r }) {
            return (0, o.jsx)("li", {
              "data-slot": "breadcrumb-separator",
              role: "presentation",
              "aria-hidden": "true",
              className: (0, i.cn)("[&>svg]:size-3.5", t),
              ...r,
              children: e ?? (0, o.jsx)(n.A, {}),
            });
          }
          (i = (l.then ? (await l)() : l)[0]), a();
        } catch (e) {
          a(e);
        }
      });
    },
    19085: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { default: () => l });
          var o = r(61268),
            s = r(77285);
          r(84205);
          var n = r(94812),
            i = e([n]);
          n = (i.then ? (await i)() : i)[0];
          let d = (0, s.default)(async () => {}, {
            loadableGenerated: {
              modules: [
                "components\\ui\\language-switcher-wrapper.tsx -> ./language-switcher",
              ],
            },
            ssr: !1,
            loading: () =>
              (0, o.jsx)(n.E, {
                className: "h-9 w-9 rounded-full",
                "aria-label": "Loading language switcher",
              }),
          });
          function l() {
            return (0, o.jsx)(d, {});
          }
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    20716: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { cn: () => d, lk: () => c, p1: () => u });
          var o = r(85488),
            s = r(31399),
            n = r(63775),
            i = r(54710),
            l = e([o]);
          function d(...e) {
            return (0, i.QP)((0, n.$)(e));
          }
          function c() {
            return "undefined" != typeof crypto && crypto.randomUUID
              ? crypto.randomUUID()
              : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                  /[xy]/g,
                  function (e) {
                    let t = (16 * Math.random()) | 0;
                    return ("x" === e ? t : (3 & t) | 8).toString(16);
                  },
                );
          }
          function u() {
            var e = (0, o.generateId)(12);
            let t = (0, s.uP)(10);
            return (0, s.Y8)(e, t);
          }
          (o = (l.then ? (await l)() : l)[0]), a();
        } catch (e) {
          a(e);
        }
      });
    },
    26179: (e, t, r) => {
      "use strict";
      r.d(t, { Search: () => a });
      let a = (0, r(26394).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call Search() from the server but Search is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\search.tsx",
        "Search",
      );
    },
    27675: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { NotificationButton: () => f });
          var o = r(61268),
            s = r(94763),
            n = r(13274),
            i = r(84205),
            l = r(46532),
            d = r(28909),
            c = r(12126),
            u = r(13242),
            m = r(3519),
            p = r(32367),
            h = e([l, d, c]);
          function f() {
            let { user: e } = (0, m.useAuth)(),
              t = (0, p.Iw)(),
              [r, a] = (0, i.useState)([]),
              [h, f] = (0, i.useState)(0),
              [b, g] = (0, i.useState)(!1),
              [x, v] = (0, i.useState)(null),
              [y, w] = (0, i.useState)(!1),
              j = async (r) => {
                if (e && t)
                  try {
                    let { error: o } = await t
                      .from("notifications")
                      .update({ is_read: !0 })
                      .eq("id", r)
                      .eq("user_id", e.id);
                    if (o) throw o;
                    a((e) =>
                      e.map((e) =>
                        e.id !== r || e.is_read
                          ? e
                          : (f((e) => Math.max(0, e - 1)),
                            { ...e, is_read: !0 }),
                      ),
                    );
                  } catch (e) {
                    console.error("Error marking notification as read:", e);
                  }
              },
              C = async () => {
                if (e && t && 0 !== h)
                  try {
                    let { error: r } = await t
                      .from("notifications")
                      .update({ is_read: !0 })
                      .eq("user_id", e.id)
                      .eq("is_read", !1);
                    if (r) throw r;
                    a((e) => e.map((e) => ({ ...e, is_read: !0 }))), f(0);
                  } catch (e) {
                    console.error(
                      "Error marking all notifications as read:",
                      e,
                    );
                  }
              };
            return (0, o.jsxs)(c.AM, {
              open: y,
              onOpenChange: w,
              children: [
                (0, o.jsx)(c.Wv, {
                  asChild: !0,
                  children: (0, o.jsxs)(d.$, {
                    variant: "ghost",
                    size: "icon",
                    className: "relative",
                    children: [
                      (0, o.jsx)(n.A, { className: "h-5 w-5" }),
                      h > 0 &&
                        (0, o.jsx)(l.E, {
                          variant: "destructive",
                          className:
                            "absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs",
                          children: h,
                        }),
                      (0, o.jsx)("span", {
                        className: "sr-only",
                        children: "Notifications",
                      }),
                    ],
                  }),
                }),
                (0, o.jsxs)(c.hl, {
                  className: "w-80 p-0",
                  children: [
                    (0, o.jsxs)("div", {
                      className:
                        "flex items-center justify-between border-b p-4",
                      children: [
                        (0, o.jsx)("h3", {
                          className: "font-semibold",
                          children: "Notifications",
                        }),
                        h > 0 &&
                          (0, o.jsx)(d.$, {
                            variant: "link",
                            size: "sm",
                            onClick: C,
                            className: "h-auto p-0",
                            children: "Mark all as read",
                          }),
                      ],
                    }),
                    (0, o.jsx)(u.F, {
                      className: "h-[300px]",
                      children: b
                        ? (0, o.jsx)("p", {
                            className:
                              "p-4 text-center text-sm text-muted-foreground",
                            children: "Loading...",
                          })
                        : x
                          ? (0, o.jsx)("p", {
                              className:
                                "p-4 text-center text-sm text-destructive",
                              children: x,
                            })
                          : 0 === r.length
                            ? (0, o.jsx)("p", {
                                className:
                                  "p-4 text-center text-sm text-muted-foreground",
                                children: "No new notifications",
                              })
                            : (0, o.jsx)("div", {
                                children: r.map((e) =>
                                  (0, o.jsxs)(
                                    "div",
                                    {
                                      className: `flex flex-col items-start gap-1 p-4 border-b last:border-0 cursor-pointer hover:bg-muted/50 ${!e.is_read ? "bg-blue-50 dark:bg-blue-900/20 font-medium" : ""}`,
                                      onClick: () => j(e.id),
                                      role: "button",
                                      tabIndex: 0,
                                      onKeyDown: (t) =>
                                        "Enter" === t.key && j(e.id),
                                      children: [
                                        (0, o.jsx)("p", {
                                          className: "text-sm leading-tight",
                                          children:
                                            e.message || "No message content",
                                        }),
                                        (0, o.jsx)("p", {
                                          className:
                                            "text-xs text-muted-foreground",
                                          children: (0, s.m)(
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
          ([l, d, c] = h.then ? (await h)() : h), a();
        } catch (e) {
          a(e);
        }
      });
    },
    28683: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 9032)),
        Promise.resolve().then(r.bind(r, 37805)),
        Promise.resolve().then(r.bind(r, 16714)),
        Promise.resolve().then(r.bind(r, 95394)),
        Promise.resolve().then(r.bind(r, 32119)),
        Promise.resolve().then(r.bind(r, 73451)),
        Promise.resolve().then(r.bind(r, 92421)),
        Promise.resolve().then(r.bind(r, 26179)),
        Promise.resolve().then(r.bind(r, 66822)),
        Promise.resolve().then(r.bind(r, 98699)),
        Promise.resolve().then(r.bind(r, 71531)),
        Promise.resolve().then(r.bind(r, 59107)),
        Promise.resolve().then(r.t.bind(r, 53320, 23)),
        Promise.resolve().then(r.bind(r, 10781));
    },
    28964: (e, t, r) => {
      "use strict";
      r.d(t, { IB: () => a, Wk: () => i, XG: () => n, q: () => o });
      let a = ["en", "ar", "es", "fr"],
        o = "en",
        s = {
          en: {
            nativeName: "English",
            englishName: "English",
            direction: "ltr",
            dateFormat: "MM/DD/YYYY",
            flag: "\uD83C\uDDFA\uD83C\uDDF8",
            htmlLang: "en",
            calendar: "gregory",
            number: { decimal: ".", thousands: "," },
          },
          ar: {
            nativeName: "العربية",
            englishName: "Arabic",
            direction: "rtl",
            dateFormat: "DD/MM/YYYY",
            flag: "\uD83C\uDDF8\uD83C\uDDE6",
            htmlLang: "ar",
            calendar: "islamic",
            fontClass: "font-arabic",
            number: { decimal: "٫", thousands: "٬" },
          },
          fr: {
            nativeName: "Fran\xe7ais",
            englishName: "French",
            direction: "ltr",
            dateFormat: "DD/MM/YYYY",
            flag: "\uD83C\uDDEB\uD83C\uDDF7",
            htmlLang: "fr",
            calendar: "gregory",
            number: { decimal: ",", thousands: " " },
          },
          es: {
            nativeName: "Espa\xf1ol",
            englishName: "Spanish",
            direction: "ltr",
            dateFormat: "DD/MM/YYYY",
            flag: "\uD83C\uDDEA\uD83C\uDDF8",
            htmlLang: "es",
            calendar: "gregory",
            number: { decimal: ",", thousands: "." },
          },
        };
      function n(e) {
        return s[e] || s[o];
      }
      function i(e) {
        return n(e).fontClass;
      }
    },
    30205: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, {
            Cf: () => h,
            Es: () => b,
            L3: () => g,
            c7: () => f,
            lG: () => c,
            rr: () => x,
            zM: () => u,
          });
          var o = r(61268),
            s = r(33459),
            n = r(90495),
            i = r(84205),
            l = r(15942),
            d = e([l]);
          l = (d.then ? (await d)() : d)[0];
          let c = s.bL,
            u = s.l9,
            m = s.ZL;
          s.bm;
          let p = i.forwardRef(({ className: e, ...t }, r) =>
            (0, o.jsx)(s.hJ, {
              ref: r,
              className: (0, l.cn)(
                "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                e,
              ),
              ...t,
            }),
          );
          p.displayName = s.hJ.displayName;
          let h = i.forwardRef(({ className: e, children: t, ...r }, a) =>
            (0, o.jsxs)(m, {
              children: [
                (0, o.jsx)(p, {}),
                (0, o.jsxs)(s.UC, {
                  ref: a,
                  className: (0, l.cn)(
                    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                    e,
                  ),
                  ...r,
                  children: [
                    t,
                    (0, o.jsxs)(s.bm, {
                      className:
                        "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                      children: [
                        (0, o.jsx)(n.A, { className: "h-4 w-4" }),
                        (0, o.jsx)("span", {
                          className: "sr-only",
                          children: "Close",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          );
          h.displayName = s.UC.displayName;
          let f = ({ className: e, ...t }) =>
            (0, o.jsx)("div", {
              className: (0, l.cn)(
                "flex flex-col space-y-1.5 text-center sm:text-left",
                e,
              ),
              ...t,
            });
          f.displayName = "DialogHeader";
          let b = ({ className: e, ...t }) =>
            (0, o.jsx)("div", {
              className: (0, l.cn)(
                "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
                e,
              ),
              ...t,
            });
          b.displayName = "DialogFooter";
          let g = i.forwardRef(({ className: e, ...t }, r) =>
            (0, o.jsx)(s.hE, {
              ref: r,
              className: (0, l.cn)(
                "text-lg font-semibold leading-none tracking-tight",
                e,
              ),
              ...t,
            }),
          );
          g.displayName = s.hE.displayName;
          let x = i.forwardRef(({ className: e, ...t }, r) =>
            (0, o.jsx)(s.VY, {
              ref: r,
              className: (0, l.cn)("text-sm text-muted-foreground", e),
              ...t,
            }),
          );
          (x.displayName = s.VY.displayName), a();
        } catch (e) {
          a(e);
        }
      });
    },
    32119: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { Footer: () => a });
      let a = (0, r(26394).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call Footer() from the server but Footer is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\footer\\index.tsx",
        "Footer",
      );
    },
    35581: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { Search: () => b });
          var o = r(61268),
            s = r(44803),
            n = r(19688),
            i = r(66135),
            l = r(84205),
            d = r(65307),
            c = r(28909),
            u = r(48598),
            m = r(78337),
            p = r(96756),
            h = r(15942),
            f = e([c, u, m, p, h]);
          function b() {
            let [e, t] = l.useState(!1),
              r = l.useRef(null),
              {
                query: a,
                setQuery: f,
                isLoading: b,
                suggestions: g,
                aiSuggestions: x,
                handleSearch: v,
                clearSearch: y,
              } = (0, p.$)();
            (0, d.vC)(["meta+k", "ctrl+k"], (e) => {
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
            let w = async (e) => {
              e.preventDefault(), await v(e), r.current?.blur();
            };
            return (0, o.jsxs)(o.Fragment, {
              children: [
                (0, o.jsxs)("form", {
                  onSubmit: w,
                  className:
                    "relative flex w-full max-w-sm items-center space-x-2",
                  role: "search",
                  children: [
                    (0, o.jsx)(m.p, {
                      ref: r,
                      type: "search",
                      placeholder: "Search documents, requirements...",
                      value: a,
                      onChange: (e) => f(e.target.value),
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
                    (0, o.jsx)(s.A, {
                      className:
                        "absolute left-2.5 h-4 w-4 text-muted-foreground",
                      "aria-hidden": "true",
                    }),
                    a &&
                      !b &&
                      (0, o.jsx)(c.$, {
                        type: "button",
                        variant: "ghost",
                        size: "icon",
                        className: "absolute right-2 h-6 w-6",
                        onClick: y,
                        "aria-label": "Clear search",
                        children: (0, o.jsx)(n.A, { className: "h-4 w-4" }),
                      }),
                    b &&
                      (0, o.jsx)(i.A, {
                        className: "absolute right-2 h-4 w-4 animate-spin",
                        "aria-hidden": "true",
                      }),
                    (0, o.jsx)("span", {
                      className: "sr-only",
                      id: "search-desc",
                      children: "Press ⌘K to open search",
                    }),
                  ],
                }),
                (0, o.jsxs)(u.Gj, {
                  open: e,
                  onOpenChange: t,
                  children: [
                    (0, o.jsx)(u.G7, {
                      placeholder: "Type a command or search...",
                      value: a,
                      onValueChange: f,
                    }),
                    (0, o.jsxs)(u.oI, {
                      id: "search-results",
                      children: [
                        (0, o.jsx)(u.xL, { children: "No results found." }),
                        b
                          ? (0, o.jsx)("div", {
                              className:
                                "flex items-center justify-center py-6",
                              children: (0, o.jsx)(i.A, {
                                className: "h-4 w-4 animate-spin",
                              }),
                            })
                          : (0, o.jsxs)(o.Fragment, {
                              children: [
                                g.length > 0 &&
                                  (0, o.jsx)(u.L$, {
                                    heading: "Quick Links",
                                    children: g.map((e) =>
                                      (0, o.jsx)(
                                        u.h_,
                                        { onSelect: () => f(e), children: e },
                                        e,
                                      ),
                                    ),
                                  }),
                                x.length > 0 &&
                                  (0, o.jsxs)(o.Fragment, {
                                    children: [
                                      (0, o.jsx)(u.fx, {}),
                                      (0, o.jsx)(u.L$, {
                                        heading: "AI Suggestions",
                                        children: x.map((e) =>
                                          (0, o.jsx)(
                                            u.h_,
                                            {
                                              onSelect: () => f(e),
                                              children: e,
                                            },
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
          ([c, u, m, p, h] = f.then ? (await f)() : f), a();
        } catch (e) {
          a(e);
        }
      });
    },
    37805: (e, t, r) => {
      "use strict";
      r.d(t, { Providers: () => a });
      let a = (0, r(26394).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call Providers() from the server but Providers is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\providers.tsx",
        "Providers",
      );
    },
    41575: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { Footer: () => b });
      var a = r(61268),
        o = r(14480),
        s = r(15800),
        n = r(43128),
        i = r(56302),
        l = r(90867),
        d = r(31655),
        c = r.n(d),
        u = r(89882),
        m = r(79029),
        p = r(58360);
      let h = [
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
        f = [
          { name: "GitHub", href: "https://github.com/hijraah", icon: o.A },
          { name: "Twitter", href: "https://twitter.com/hijraah", icon: s.A },
          { name: "Email", href: "mailto:hello@hijraah.com", icon: n.A },
        ];
      function b() {
        let e = (0, u.usePathname)(),
          t = new Date().getFullYear();
        return (0, a.jsx)("footer", {
          className:
            "border-t border-border bg-background/50 backdrop-blur-sm w-full mt-auto print:hidden",
          "data-slot": "footer",
          children: (0, a.jsxs)("div", {
            className: "container py-10 px-4 sm:px-6 lg:px-8 mx-auto",
            "data-slot": "footer-content",
            children: [
              (0, a.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12",
                children: [
                  (0, a.jsxs)("div", {
                    className: "flex flex-col space-y-4",
                    "data-slot": "footer-brand",
                    children: [
                      (0, a.jsx)(c(), {
                        href: "/",
                        className: "flex items-center",
                        "aria-label": "Hijraah Home",
                        children: (0, a.jsx)("span", {
                          className: "font-bold text-xl",
                          children: "Hijraah",
                        }),
                      }),
                      (0, a.jsx)("p", {
                        className: "text-sm text-muted-foreground max-w-xs",
                        children:
                          "Compare immigration policies across countries with AI-powered insights and personalized guidance.",
                      }),
                      (0, a.jsx)("div", {
                        className: "flex space-x-3 pt-2",
                        "data-slot": "footer-social",
                        children: f.map((e) =>
                          (0, a.jsx)(
                            "a",
                            {
                              href: e.href,
                              className:
                                "text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent/50 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              "aria-label": e.name,
                              "data-slot": "social-link",
                              children: (0, a.jsx)(e.icon, {
                                className: "h-5 w-5",
                              }),
                            },
                            e.name,
                          ),
                        ),
                      }),
                    ],
                  }),
                  h.map((t) =>
                    (0, a.jsxs)(
                      "div",
                      {
                        className: "flex flex-col space-y-4",
                        "data-slot": "footer-links-section",
                        children: [
                          (0, a.jsx)("h3", {
                            className:
                              "font-semibold text-sm tracking-wider uppercase text-foreground",
                            children: t.title,
                          }),
                          (0, a.jsx)("ul", {
                            className: "flex flex-col space-y-2.5",
                            "data-slot": "footer-links",
                            children: t.links.map((t) =>
                              (0, a.jsx)(
                                "li",
                                {
                                  "data-slot": "footer-link-item",
                                  children: (0, a.jsx)(c(), {
                                    href: t.href,
                                    className: (function (...e) {
                                      return (0, p.QP)((0, m.$)(e));
                                    })(
                                      "text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5",
                                      e === t.href &&
                                        "text-foreground font-medium",
                                    ),
                                    "data-active":
                                      e === t.href ? "true" : void 0,
                                    children: (0, a.jsxs)(a.Fragment, {
                                      children: [
                                        t.name,
                                        e === t.href &&
                                          (0, a.jsx)("span", {
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
              (0, a.jsxs)("div", {
                className:
                  "flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-border text-center md:text-left",
                "data-slot": "footer-bottom",
                children: [
                  (0, a.jsxs)("div", {
                    className:
                      "flex items-center text-sm text-muted-foreground mb-3 md:mb-0",
                    "data-slot": "footer-copyright",
                    children: [
                      (0, a.jsx)(i.A, { className: "h-4 w-4 mr-2" }),
                      (0, a.jsxs)("span", {
                        children: [t, " Hijraah. All rights reserved."],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className:
                      "flex items-center text-sm text-muted-foreground",
                    "data-slot": "footer-tagline",
                    children: [
                      (0, a.jsx)("span", { children: "Made with" }),
                      (0, a.jsx)(l.A, {
                        className:
                          "h-4 w-4 mx-1.5 text-destructive animate-pulse",
                      }),
                      (0, a.jsx)("span", { children: "by Hijraah Team" }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
    44619: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { Fc: () => l, TN: () => c, XL: () => d });
          var o = r(61268),
            s = r(91635);
          r(84205);
          var n = r(15942),
            i = e([n]);
          n = (i.then ? (await i)() : i)[0];
          let u = (0, s.F)(
            "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
            {
              variants: {
                variant: {
                  default: "bg-background text-foreground",
                  destructive:
                    "text-destructive-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-foreground/80",
                },
              },
              defaultVariants: { variant: "default" },
            },
          );
          function l({ className: e, variant: t, ...r }) {
            return (0, o.jsx)("div", {
              "data-slot": "alert",
              role: "alert",
              className: (0, n.cn)(u({ variant: t }), e),
              ...r,
            });
          }
          function d({ className: e, ...t }) {
            return (0, o.jsx)("div", {
              "data-slot": "alert-title",
              className: (0, n.cn)(
                "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
                e,
              ),
              ...t,
            });
          }
          function c({ className: e, ...t }) {
            return (0, o.jsx)("div", {
              "data-slot": "alert-description",
              className: (0, n.cn)(
                "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
                e,
              ),
              ...t,
            });
          }
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    46532: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { E: () => d });
          var o = r(61268),
            s = r(86415),
            n = r(91635);
          r(84205);
          var i = r(15942),
            l = e([i]);
          i = (l.then ? (await l)() : l)[0];
          let c = (0, n.F)(
            "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
            {
              variants: {
                variant: {
                  default:
                    "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
                  secondary:
                    "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
                  destructive:
                    "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                  outline:
                    "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
                },
              },
              defaultVariants: { variant: "default" },
            },
          );
          function d({ className: e, variant: t, asChild: r = !1, ...a }) {
            let n = r ? s.DX : "span";
            return (0, o.jsx)(n, {
              "data-slot": "badge",
              className: (0, i.cn)(c({ variant: t }), e),
              ...a,
            });
          }
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    47995: (e, t, r) => {
      "use strict";
      let a;
      r.r(t),
        r.d(t, {
          default: () => p,
          generateImageMetadata: () => u,
          generateMetadata: () => c,
          generateViewport: () => m,
        });
      var o = r(63033),
        s = r(26394),
        n = r(60442),
        i = (0, s.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\[locale]\\\\not-found.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\not-found.tsx",
          "default",
        );
      let l = { ...o },
        d =
          "workUnitAsyncStorage" in l
            ? l.workUnitAsyncStorage
            : "requestAsyncStorage" in l
              ? l.requestAsyncStorage
              : void 0;
      a =
        "function" == typeof i
          ? new Proxy(i, {
              apply: (e, t, r) => {
                let a, o, s;
                try {
                  let e = d?.getStore();
                  (a = e?.headers.get("sentry-trace") ?? void 0),
                    (o = e?.headers.get("baggage") ?? void 0),
                    (s = e?.headers);
                } catch (e) {}
                return n
                  .wrapServerComponentWithSentry(e, {
                    componentRoute: "/[locale]",
                    componentType: "Not-found",
                    sentryTraceHeader: a,
                    baggageHeader: o,
                    headers: s,
                  })
                  .apply(t, r);
              },
            })
          : i;
      let c = void 0,
        u = void 0,
        m = void 0,
        p = a;
    },
    48598: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, {
            G7: () => p,
            Gj: () => m,
            L$: () => b,
            fx: () => g,
            h_: () => x,
            oI: () => h,
            uB: () => u,
            xL: () => f,
          });
          var o = r(61268),
            s = r(8166),
            n = r(44803),
            i = r(84205),
            l = r(15942),
            d = r(30205),
            c = e([l, d]);
          [l, d] = c.then ? (await c)() : c;
          let u = i.forwardRef(({ className: e, ...t }, r) =>
            (0, o.jsx)(s.uB, {
              ref: r,
              className: (0, l.cn)(
                "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
                e,
              ),
              ...t,
            }),
          );
          u.displayName = s.uB.displayName;
          let m = ({ children: e, ...t }) =>
              (0, o.jsx)(d.lG, {
                ...t,
                children: (0, o.jsx)(d.Cf, {
                  className: "overflow-hidden p-0 shadow-lg",
                  children: (0, o.jsx)(u, {
                    className:
                      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
                    children: e,
                  }),
                }),
              }),
            p = i.forwardRef(({ className: e, ...t }, r) =>
              (0, o.jsxs)("div", {
                className: "flex items-center border-b px-3",
                "cmdk-input-wrapper": "",
                children: [
                  (0, o.jsx)(n.A, {
                    className: "mr-2 h-4 w-4 shrink-0 opacity-50",
                  }),
                  (0, o.jsx)(s.uB.Input, {
                    ref: r,
                    className: (0, l.cn)(
                      "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                      e,
                    ),
                    ...t,
                  }),
                ],
              }),
            );
          p.displayName = s.uB.Input.displayName;
          let h = i.forwardRef(({ className: e, ...t }, r) =>
            (0, o.jsx)(s.uB.List, {
              ref: r,
              className: (0, l.cn)(
                "max-h-[300px] overflow-y-auto overflow-x-hidden",
                e,
              ),
              ...t,
            }),
          );
          h.displayName = s.uB.List.displayName;
          let f = i.forwardRef((e, t) =>
            (0, o.jsx)(s.uB.Empty, {
              ref: t,
              className: "py-6 text-center text-sm",
              ...e,
            }),
          );
          f.displayName = s.uB.Empty.displayName;
          let b = i.forwardRef(({ className: e, ...t }, r) =>
            (0, o.jsx)(s.uB.Group, {
              ref: r,
              className: (0, l.cn)(
                "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
                e,
              ),
              ...t,
            }),
          );
          b.displayName = s.uB.Group.displayName;
          let g = i.forwardRef(({ className: e, ...t }, r) =>
            (0, o.jsx)(s.uB.Separator, {
              ref: r,
              className: (0, l.cn)("-mx-1 h-px bg-border", e),
              ...t,
            }),
          );
          g.displayName = s.uB.Separator.displayName;
          let x = i.forwardRef(({ className: e, ...t }, r) =>
            (0, o.jsx)(s.uB.Item, {
              ref: r,
              className: (0, l.cn)(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                e,
              ),
              ...t,
            }),
          );
          (x.displayName = s.uB.Item.displayName), a();
        } catch (e) {
          a(e);
        }
      });
    },
    53585: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 8309));
    },
    59644: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { M: () => u });
          var o = r(61268),
            s = r(84205),
            n = r(16951),
            i = r(70079),
            l = r(61277),
            d = r(67135),
            c = e([l]);
          l = (c.then ? (await c)() : c)[0];
          let m = (0, s.lazy)(() =>
              Promise.all([r.e(3749), r.e(4688)])
                .then(r.bind(r, 92307))
                .then((e) => ({ default: e.WelcomeModal })),
            ),
            p = (0, s.lazy)(() =>
              Promise.all([
                r.e(5728),
                r.e(6867),
                r.e(1502),
                r.e(7052),
                r.e(3749),
                r.e(4521),
              ])
                .then(r.bind(r, 14521))
                .then((e) => ({ default: e.ProfileSetup })),
            ),
            h = (0, s.lazy)(() =>
              Promise.all([r.e(3749), r.e(6659)])
                .then(r.bind(r, 6659))
                .then((e) => ({ default: e.FeatureTour })),
            ),
            f = (0, s.lazy)(() =>
              Promise.all([r.e(5728), r.e(3749), r.e(7414)])
                .then(r.bind(r, 47414))
                .then((e) => ({ default: e.FirstTask })),
            ),
            b = (0, s.lazy)(() =>
              Promise.all([r.e(5728), r.e(3749), r.e(4712)])
                .then(r.bind(r, 64712))
                .then((e) => ({ default: e.Resources })),
            ),
            g = {
              welcome: m,
              "profile-setup": p,
              "feature-tour": h,
              "first-task": f,
              resources: b,
            },
            x = () => {
              let { onboarding: e, isLoading: t } = (0, d.z)();
              if (e.isCompleted || e.hideForSession || !e.isActive) return null;
              let r = e.currentStep,
                a = g[r];
              return a
                ? (n.Zj.find((e) => e.id === r),
                  (0, o.jsx)(s.Suspense, {
                    fallback: (0, o.jsx)("div", {
                      children: "Loading onboarding step...",
                    }),
                    children: (0, o.jsx)(a, {}),
                  }))
                : (console.warn(
                    `[Onboarding] No component mapped for step ID: ${r}`,
                  ),
                  null);
            };
          function u({ children: e }) {
            return (0, o.jsxs)(d.X, {
              children: [
                e,
                (0, o.jsx)(x, {}),
                (0, o.jsx)(l.N, {}),
                (0, o.jsx)(i.r, {}),
              ],
            });
          }
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    61277: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { N: () => m });
          var o = r(61268),
            s = r(90495),
            n = r(12335);
          r(84205);
          var i = r(16951),
            l = r(28909),
            d = r(92256),
            c = r(67135),
            u = e([l, d]);
          [l, d] = u.then ? (await u)() : u;
          let m = () => {
            let {
              onboarding: e,
              hideOnboardingForSession: t,
              resetOnboarding: r,
              nextStep: a,
            } = (0, c.z)();
            if (!e.isActive || e.hideForSession || e.isCompleted) return null;
            let u = (0, i.Dv)(e.currentStep),
              m = (0, i.B5)(e.currentStep),
              p = (0, i.Yk)(),
              h = Array.from({ length: p }, (e, t) => (0, i.m_)(t)).filter(
                (e) => void 0 !== e,
              );
            if (!u) return null;
            let f = "profile-setup" === e.currentStep;
            return (0, o.jsxs)("div", {
              className: `${f ? "fixed bottom-4 right-4 z-30" : "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30"} bg-card shadow-lg rounded-lg p-4 w-full max-w-md border flex flex-col gap-3`,
              children: [
                (0, o.jsxs)("div", {
                  className: "flex items-center justify-between",
                  children: [
                    (0, o.jsx)("h3", {
                      className: "font-medium",
                      children: "Your Onboarding Progress",
                    }),
                    (0, o.jsx)(l.$, {
                      variant: "ghost",
                      size: "icon",
                      className: "h-6 w-6",
                      onClick: t,
                      "aria-label": "Dismiss",
                      children: (0, o.jsx)(s.A, { className: "h-4 w-4" }),
                    }),
                  ],
                }),
                (0, o.jsxs)("div", {
                  className: "space-y-3",
                  children: [
                    (0, o.jsxs)("div", {
                      className: "flex items-center justify-between text-sm",
                      children: [
                        (0, o.jsxs)("p", {
                          children: [e.progress, "% Completed"],
                        }),
                        (0, o.jsxs)("p", { children: [m + 1, "/", p] }),
                      ],
                    }),
                    (0, o.jsx)(d.k, { value: e.progress, className: "h-2" }),
                    (0, o.jsx)("div", {
                      className: "flex flex-wrap gap-2",
                      children: h.map((e, t) =>
                        (0, o.jsx)(
                          "div",
                          {
                            className: `
                                px-3 py-1 text-xs rounded-full border 
                                ${t < m ? "bg-primary/20 border-primary/30 text-primary-foreground" : t === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                            `,
                            children: e.title,
                          },
                          e.id,
                        ),
                      ),
                    }),
                  ],
                }),
                u.features &&
                  u.features.length > 0 &&
                  (0, o.jsxs)("div", {
                    className: "mt-2 space-y-2",
                    children: [
                      (0, o.jsxs)("h4", {
                        className: "text-sm font-medium",
                        children: [u.title, " Features:"],
                      }),
                      (0, o.jsx)("ul", {
                        className: "space-y-1",
                        children: u.features.map((e) =>
                          (0, o.jsxs)(
                            "li",
                            {
                              className: "text-xs flex items-start gap-2",
                              children: [
                                (0, o.jsx)(n.A, {
                                  className:
                                    "h-3 w-3 mt-0.5 flex-shrink-0 text-primary",
                                }),
                                (0, o.jsx)("span", {
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
                (0, o.jsxs)("div", {
                  className: "flex justify-between mt-2",
                  children: [
                    (0, o.jsx)(l.$, {
                      variant: "outline",
                      size: "sm",
                      onClick: r,
                      children: "Restart",
                    }),
                    (0, o.jsx)(l.$, {
                      variant: "default",
                      size: "sm",
                      onClick: a,
                      children: "Continue",
                    }),
                  ],
                }),
              ],
            });
          };
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    62962: (e, t, r) => {
      "use strict";
      r.d(t, { w: () => a.Footer });
      var a = r(32119);
    },
    63249: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          let P;
          r.r(t),
            r.d(t, {
              default: () => B,
              generateImageMetadata: () => H,
              generateMetadata: () => F,
              generateStaticParams: () => A,
              generateViewport: () => M,
              validateLocale: () => E,
            });
          var o = r(63033),
            s = r(35242),
            n = r(59107),
            i = r(53202),
            l = r.n(i),
            d = r(57145),
            c = r(29073),
            u = r(10781),
            m = r(16714),
            p = r(95394),
            h = r(62962),
            f = r(73451),
            b = r(92421),
            g = r(26179),
            x = r(66822),
            v = r(98699),
            y = r(71531),
            w = r(28964),
            j = r(20716),
            C = r(9032),
            S = r(37805),
            N = r(60442),
            k = e([j]);
          function A() {
            return w.IB.map((e) => ({ locale: e }));
          }
          async function E(e) {
            return w.IB.includes(e) || (0, c.notFound)(), e;
          }
          j = (k.then ? (await k)() : k)[0];
          let R = new Map();
          async function I(e) {
            if (R.has(e)) return R.get(e);
            try {
              let t = (await r(98728)(`./${e}.json`)).default;
              return R.set(e, t), t;
            } catch (t) {
              if (
                (console.error(`Failed to load messages for locale: ${e}`, t),
                "en" !== e)
              )
                try {
                  let t = (await r.e(8517).then(r.t.bind(r, 28517, 19)))
                    .default;
                  return (
                    R.set("en", t),
                    console.warn(
                      `Falling back to en locale for missing locale: ${e}`,
                    ),
                    t
                  );
                } catch (e) {
                  console.error("Failed to load fallback locale messages", e);
                }
              return {};
            }
          }
          async function T({ children: e, params: t }) {
            let r = (await Promise.resolve(t)).locale,
              a = await E(r),
              o = await I(a),
              i = (0, w.XG)(a).direction,
              c = (0, w.Wk)(a);
            return (0, s.jsxs)("html", {
              lang: a,
              suppressHydrationWarning: !0,
              className: "h-full",
              dir: i,
              children: [
                (0, s.jsx)("head", {
                  children: (0, s.jsx)("link", {
                    rel: "manifest",
                    href: "/manifest.json",
                  }),
                }),
                (0, s.jsx)("body", {
                  suppressHydrationWarning: !0,
                  className: (0, j.cn)(
                    l().className,
                    c,
                    "h-full m-0 p-0 overflow-x-hidden antialiased",
                  ),
                  children: (0, s.jsx)(u.NuqsAdapter, {
                    children: (0, s.jsxs)(C.IntlClientProvider, {
                      locale: a,
                      messages: o,
                      timeZone: "UTC",
                      children: [
                        (0, s.jsx)(p.ErrorBoundary, {
                          children: (0, s.jsx)(S.Providers, {
                            children: (0, s.jsxs)(v.SidebarProvider, {
                              defaultOpen: !0,
                              children: [
                                (0, s.jsx)(m.AppSidebar, {}),
                                (0, s.jsxs)(v.SidebarInset, {
                                  className:
                                    "flex flex-col min-h-screen w-full",
                                  children: [
                                    (0, s.jsxs)("header", {
                                      className:
                                        "flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-blue-800/20 bg-gradient-to-r from-blue-950/95 to-indigo-950/95 dark:from-blue-950/95 dark:to-indigo-950/95 backdrop-blur-sm",
                                      children: [
                                        (0, s.jsxs)("div", {
                                          className:
                                            "flex items-center gap-2 px-4",
                                          children: [
                                            (0, s.jsx)(v.SidebarTrigger, {
                                              className: "-ml-1 text-blue-100",
                                              children: (0, s.jsx)("span", {
                                                className: "sr-only",
                                                children: "Toggle Sidebar",
                                              }),
                                            }),
                                            (0, s.jsx)(x.Separator, {
                                              orientation: "vertical",
                                              className:
                                                "shrink-0 bg-blue-700/30 w-[1px] mr-2 h-4",
                                            }),
                                            (0, s.jsx)(d.default, {
                                              src: "/Hijraah_logo.png",
                                              alt: "Hijraah",
                                              width: 32,
                                              height: 32,
                                              className: "h-8 w-8 mr-2",
                                              priority: !0,
                                            }),
                                            (0, s.jsx)("span", {
                                              className:
                                                "font-semibold text-lg hidden md:inline-block text-blue-100",
                                              children: "Hijraah",
                                            }),
                                          ],
                                        }),
                                        (0, s.jsxs)("div", {
                                          className:
                                            "ml-auto flex items-center gap-4 px-4",
                                          children: [
                                            (0, s.jsx)(g.Search, {}),
                                            (0, s.jsx)(
                                              b.NotificationButton,
                                              {},
                                            ),
                                            (0, s.jsx)(f.default, {}),
                                            (0, s.jsx)(y.ThemeToggle, {}),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, s.jsxs)("main", {
                                      className: "flex-1 flex flex-col",
                                      children: [e, (0, s.jsx)(h.w, {})],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        }),
                        (0, s.jsx)(n.Analytics, {}),
                      ],
                    }),
                  }),
                }),
              ],
            });
          }
          let _ = { ...o },
            D =
              "workUnitAsyncStorage" in _
                ? _.workUnitAsyncStorage
                : "requestAsyncStorage" in _
                  ? _.requestAsyncStorage
                  : void 0;
          P = new Proxy(T, {
            apply: (e, t, r) => {
              let a, o, s;
              try {
                let e = D?.getStore();
                (a = e?.headers.get("sentry-trace") ?? void 0),
                  (o = e?.headers.get("baggage") ?? void 0),
                  (s = e?.headers);
              } catch (e) {}
              return N.wrapServerComponentWithSentry(e, {
                componentRoute: "/[locale]",
                componentType: "Layout",
                sentryTraceHeader: a,
                baggageHeader: o,
                headers: s,
              }).apply(t, r);
            },
          });
          let F = void 0,
            H = void 0,
            M = void 0,
            B = P;
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    66537: (e, t, r) => {
      "use strict";
      r.d(t, { IntlClientProvider: () => n });
      var a = r(61268),
        o = r(95124),
        s = r(58702);
      function n({
        locale: e,
        messages: t,
        timeZone: r = "UTC",
        now: n = new Date(),
        children: i,
      }) {
        let l = (0, s.XG)(e);
        return (0, a.jsx)(o.NextIntlClientProvider, {
          locale: e,
          messages: t,
          timeZone: r,
          now: n,
          onError: (e) => {
            e.code === o.IntlErrorCode.MISSING_MESSAGE ||
              console.error("Translation error:", e);
          },
          getMessageFallback: ({ namespace: e, key: t, error: r }) => {
            let a =
              t.charAt(0).toUpperCase() + t.slice(1).replace(/([A-Z])/g, " $1");
            return e ? `${a}` : a;
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
                hour12: "en" === l.htmlLang,
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
          children: i,
        });
      }
    },
    66822: (e, t, r) => {
      "use strict";
      r.d(t, { Separator: () => a });
      let a = (0, r(26394).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call Separator() from the server but Separator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\separator.tsx",
        "Separator",
      );
    },
    67135: (e, t, r) => {
      "use strict";
      r.d(t, { X: () => m, z: () => u });
      var a = r(61268),
        o = r(97713),
        s = r(84205),
        n = r(98654),
        i = r(16951),
        l = r(32367);
      let d = {
          currentStep: "welcome",
          progress: 0,
          isCompleted: !1,
          isActive: !1,
          hideForSession: !1,
        },
        c = (0, s.createContext)(void 0),
        u = () => {
          let e = (0, s.useContext)(c);
          if (!e)
            throw Error(
              "useOnboarding must be used within an OnboardingProvider",
            );
          return e;
        },
        m = ({ children: e }) => {
          let [t, r] = (0, s.useState)({ hideForSession: !1 }),
            [u, m] = (0, s.useState)(null),
            p = (0, o.createBrowserClient)(
              "http://localhost:54321",
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
            );
          (0, s.useEffect)(() => {
            (async () => {
              let { data: e } = await p.auth.getUser();
              m(e.user);
            })();
            let { data: e } = p.auth.onAuthStateChange(async (e, t) => {
              m(t?.user ?? null),
                ("SIGNED_IN" === e || "SIGNED_OUT" === e) &&
                  r((e) => ({ ...e, hideForSession: !1 }));
            });
            return () => {
              e.subscription.unsubscribe();
            };
          }, [p]);
          let {
              onboardingState: h,
              updateOnboardingState: f,
              isLoading: b,
            } = (function (e) {
              let [t, r] = (0, s.useState)(d),
                [a, o] = (0, s.useState)(!0),
                i = (0, l.Iw)(),
                c = (0, s.useCallback)(
                  async (a) => {
                    if (!e) return;
                    let o = { ...t, ...a };
                    if ((r(o), o.isActive))
                      try {
                        let { error: t } = await i
                          .from("user_onboarding")
                          .upsert({
                            user_id: e.id,
                            current_step: o.currentStep,
                            progress: o.progress,
                            is_completed: o.isCompleted,
                            updated_at: new Date().toISOString(),
                          });
                        t &&
                          (console.error(
                            "[OnboardingPersistence] updateOnboardingState: Upsert error:",
                            t,
                          ),
                          n.oR.error("Failed to save onboarding progress."));
                      } catch (e) {
                        console.error(
                          "[OnboardingPersistence] updateOnboardingState: Unexpected upsert error:",
                          e,
                        ),
                          n.oR.error(
                            "An error occurred while saving onboarding progress.",
                          );
                      }
                  },
                  [e, i, t],
                );
              return {
                onboardingState: t,
                updateOnboardingState: c,
                isLoading: a,
              };
            })(u),
            g = (0, s.useMemo)(
              () => ({ ...h, hideForSession: t.hideForSession }),
              [h, t.hideForSession],
            ),
            x = (e) => {
              let t = (0, i.Yk)();
              return t <= 1 ? 100 : Math.round((e / (t - 1)) * 100);
            },
            v = (0, s.useCallback)(() => {
              let e = (0, i.B5)(g.currentStep),
                t = (0, i.Yk)();
              if (e < t - 1) {
                let t = e + 1;
                f({ currentStep: i.ZH[t], progress: x(t), isCompleted: !1 });
              } else
                e === t - 1 &&
                  (f({ progress: 100, isCompleted: !0, isActive: !1 }),
                  n.oR.success("Onboarding complete! You're all set."));
            }, [g.currentStep, f]),
            y = (0, s.useCallback)(() => {
              let e = (0, i.B5)(g.currentStep);
              if (e > 0) {
                let t = e - 1;
                f({ currentStep: i.ZH[t], progress: x(t), isCompleted: !1 });
              }
            }, [g.currentStep, f]),
            w = (0, s.useCallback)(() => {
              f({ progress: 100, isCompleted: !0, isActive: !1 }),
                n.oR.info("Onboarding skipped.");
            }, [f]),
            j = (0, s.useCallback)(() => {
              r((e) => ({ ...e, hideForSession: !0 }));
            }, []),
            C = (0, s.useCallback)(() => {
              f({
                currentStep: i.ZH[0],
                progress: 0,
                isCompleted: !1,
                isActive: !0,
                hideForSession: !1,
              }),
                r({ hideForSession: !1 }),
                n.oR.info("Onboarding restarted.");
            }, [g, f]),
            S = (0, s.useCallback)(
              (e) => {
                if (g.currentStep === e && !g.isCompleted) {
                  let t = i.Zj.find((t) => t.id === e);
                  t?.actionKey &&
                    fetch("/api/onboarding/actions", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        actionKey: t.actionKey,
                        isCompleted: !0,
                      }),
                    }).catch((r) => {
                      console.error(
                        `Failed to mark step ${e} action ${t.actionKey} as completed:`,
                        r,
                      );
                    }),
                    v();
                }
              },
              [g.currentStep, g.isCompleted, v],
            );
          return (0, a.jsx)(c.Provider, {
            value: {
              onboarding: g,
              isLoading: b,
              user: u,
              nextStep: v,
              previousStep: y,
              skipOnboarding: w,
              hideOnboardingForSession: j,
              resetOnboarding: C,
              completeStep: S,
            },
            children: e,
          });
        };
    },
    67866: (e, t, r) => {
      "use strict";
      r.d(t, { b: () => l });
      var a = r(61268),
        o = r(84205);
      let s = {
        isActive: !1,
        activity: [],
        sources: [],
        currentDepth: 1,
        maxDepth: 3,
        completedSteps: 0,
        totalExpectedSteps: 10,
        sessionId: null,
      };
      function n(e, t) {
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
              a = e.completedSteps,
              o = e.totalExpectedSteps;
            return (
              "number" == typeof t.payload.completedSteps &&
                "number" == typeof t.payload.totalSteps &&
                ((a = t.payload.completedSteps), (o = t.payload.totalSteps)),
              {
                ...e,
                activity: [...e.activity, r],
                completedSteps: a,
                totalExpectedSteps: o,
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
            return { ...s, activity: [], sources: [] };
          default:
            return e;
        }
      }
      let i = (0, o.createContext)(void 0);
      function l({ children: e }) {
        let [t, r] = (0, o.useReducer)(n, s),
          l = (0, o.useCallback)(() => {
            r({ type: "TOGGLE_ACTIVE" });
          }, []),
          d = (0, o.useCallback)((e) => {
            r({ type: "SET_ACTIVE", payload: e });
          }, []),
          c = (0, o.useCallback)((e) => {
            r({ type: "ADD_ACTIVITY", payload: e });
          }, []),
          u = (0, o.useCallback)((e) => {
            r({ type: "ADD_SOURCE", payload: e });
          }, []),
          m = (0, o.useCallback)((e, t) => {
            r({ type: "SET_DEPTH", payload: { current: e, max: t } });
          }, []),
          p = (0, o.useCallback)((e, t) => {
            r({
              type: "INIT_PROGRESS",
              payload: { maxDepth: e, totalSteps: t },
            });
          }, []),
          h = (0, o.useCallback)((e, t) => {
            r({ type: "UPDATE_PROGRESS", payload: { completed: e, total: t } });
          }, []),
          f = (0, o.useCallback)((e) => {
            r({ type: "SET_SESSION_ID", payload: e });
          }, []),
          b = (0, o.useCallback)(() => {
            r({ type: "CLEAR_STATE" });
          }, []);
        return (0, a.jsx)(i.Provider, {
          value: {
            state: t,
            toggleActive: l,
            setActive: d,
            addActivity: c,
            addSource: u,
            setDepth: m,
            initProgress: p,
            updateProgress: h,
            setSessionId: f,
            clearState: b,
          },
          children: e,
        });
      }
    },
    70079: (e, t, r) => {
      "use strict";
      r.d(t, { r: () => n }), r(61268);
      var a = r(97713),
        o = r(84205),
        s = r(67135);
      function n() {
        let { onboarding: e, resetOnboarding: t } = (0, s.z)(),
          [r, n] = (0, o.useState)(!1);
        return (
          (0, a.createBrowserClient)(
            "http://localhost:54321",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
          ),
          null
        );
      }
    },
    70724: (e, t, r) => {
      "use strict";
      r.r(t),
        r.d(t, {
          useGlobalTranslate: () => i,
          useI18n: () => s,
          useTranslate: () => n,
        });
      var a = r(95124),
        o = r(58702);
      function s() {
        let e = (0, a.useLocale)(),
          t = (0, a.useTranslations)(),
          r = (0, a.useFormatter)(),
          s = (0, a.useTimeZone)(),
          n = (0, a.useNow)(),
          i = (0, o.XG)(e),
          l = i.direction;
        return {
          t,
          format: r,
          locale: e,
          timeZone: s,
          now: n,
          config: i,
          direction: l,
          isRtl: "rtl" === l,
          formatDate: (e, t) => r.dateTime(e, t),
          formatRelativeTime: (e) => r.relativeTime(e),
          formatCurrency: (e, t = "USD") =>
            r.number(e, { style: "currency", currency: t }),
          formatNumber: (e, t) => r.number(e, t),
        };
      }
      function n(e) {
        return (0, a.useTranslations)(e);
      }
      function i() {
        return (0, a.useTranslations)();
      }
    },
    71531: (e, t, r) => {
      "use strict";
      r.d(t, { ThemeToggle: () => a });
      let a = (0, r(26394).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call ThemeToggle() from the server but ThemeToggle is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\theme-toggle.tsx",
        "ThemeToggle",
      );
    },
    73451: (e, t, r) => {
      "use strict";
      r.d(t, { default: () => a });
      let a = (0, r(26394).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\components\\\\ui\\\\language-switcher-wrapper.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\language-switcher-wrapper.tsx",
        "default",
      );
    },
    73767: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { Providers: () => f });
          var o = r(61268),
            s = r(96106);
          r(84205);
          var n = r(22688),
            i = r(98654),
            l = r(59644),
            d = r(3519),
            c = r(67866),
            u = r(96756),
            m = r(87216),
            p = r(89284),
            h = e([l, u, m, p]);
          [l, u, m, p] = h.then ? (await h)() : h;
          let b = ({ error: e }) =>
            (0, o.jsxs)("div", {
              className:
                "p-4 bg-red-50 border border-red-200 rounded text-red-800",
              children: [
                (0, o.jsx)("h2", {
                  className: "text-lg font-bold",
                  children: "Something went wrong",
                }),
                (0, o.jsx)("p", { children: e.message }),
              ],
            });
          function f({ children: e }) {
            return (0, o.jsx)(n.tH, {
              FallbackComponent: b,
              children: (0, o.jsx)(d.AuthProvider, {
                children: (0, o.jsx)(s.N, {
                  attribute: "class",
                  defaultTheme: "system",
                  enableSystem: !0,
                  disableTransitionOnChange: !0,
                  children: (0, o.jsx)(p.Bc, {
                    children: (0, o.jsx)(u.Y, {
                      children: (0, o.jsxs)(c.b, {
                        children: [
                          (0, o.jsx)(m.Ck, {
                            children: (0, o.jsx)(l.M, { children: e }),
                          }),
                          (0, o.jsx)(i.l$, {
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
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    73927: (e, t, r) => {
      "use strict";
      r.r(t),
        r.d(t, { "4055c9f9dce3c849928e65e87017b3609674121d00": () => a.M });
      var a = r(29997);
    },
    82389: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { ThemeToggle: () => h });
          var o = r(61268),
            s = r(78077),
            n = r(48098),
            i = r(39067),
            l = r(96106),
            d = r(84205),
            c = r(28909),
            u = r(93336),
            m = r(15942),
            p = e([c, u, m]);
          function h({ variant: e = "default" }) {
            let { theme: t, setTheme: r } = (0, l.D)(),
              [a, p] = (0, d.useState)(!1),
              h = "sidebar" === e;
            return (0, o.jsxs)(u.rI, {
              children: [
                (0, o.jsx)(u.ty, {
                  asChild: !0,
                  children: (0, o.jsxs)(c.$, {
                    variant: "ghost",
                    size: "icon",
                    className: (0, m.cn)(
                      "h-9 w-9 rounded-full bg-background hover:bg-accent hover:text-accent-foreground",
                      "border border-border/40 shadow-sm transition-all duration-200",
                      "hover:shadow-md data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                      "focus-visible:ring-offset-0 focus-visible:border-primary/50",
                      a && "animate-in fade-in-50 duration-300",
                      h && "h-8 w-8 rounded-md",
                    ),
                    children: [
                      (0, o.jsx)(s.A, {
                        className: (0, m.cn)(
                          "h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
                          h && "h-4 w-4",
                        ),
                      }),
                      (0, o.jsx)(n.A, {
                        className: (0, m.cn)(
                          "absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
                          h && "h-4 w-4",
                        ),
                      }),
                      (0, o.jsx)("span", {
                        className: "sr-only",
                        children: "Toggle theme",
                      }),
                    ],
                  }),
                }),
                (0, o.jsxs)(u.SQ, {
                  align: "end",
                  className:
                    "animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                  children: [
                    (0, o.jsxs)(u._2, {
                      onClick: () => r("light"),
                      className: (0, m.cn)(
                        "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                        "light" === t &&
                          "bg-accent font-medium text-accent-foreground",
                      ),
                      children: [
                        (0, o.jsx)(s.A, { className: "h-4 w-4" }),
                        (0, o.jsx)("span", { children: "Light" }),
                      ],
                    }),
                    (0, o.jsxs)(u._2, {
                      onClick: () => r("dark"),
                      className: (0, m.cn)(
                        "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                        "dark" === t &&
                          "bg-accent font-medium text-accent-foreground",
                      ),
                      children: [
                        (0, o.jsx)(n.A, { className: "h-4 w-4" }),
                        (0, o.jsx)("span", { children: "Dark" }),
                      ],
                    }),
                    (0, o.jsxs)(u._2, {
                      onClick: () => r("system"),
                      className: (0, m.cn)(
                        "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                        "system" === t &&
                          "bg-accent font-medium text-accent-foreground",
                      ),
                      children: [
                        (0, o.jsx)(i.A, { className: "h-4 w-4" }),
                        (0, o.jsx)("span", { children: "System" }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          }
          ([c, u, m] = p.then ? (await p)() : p), a();
        } catch (e) {
          a(e);
        }
      });
    },
    87216: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { Ck: () => b, dj: () => g });
          var o = r(61268),
            s = r(24419),
            n = r(91635),
            i = r(90495),
            l = r(61950),
            d = r(38568),
            c = r(89123),
            u = r(84205),
            m = r.n(u),
            p = r(15942),
            h = e([p]);
          p = (h.then ? (await h)() : h)[0];
          let v = (0, u.createContext)(void 0);
          s.Kq,
            (m().forwardRef(({ className: e, ...t }, r) =>
              (0, o.jsx)(s.LM, {
                ref: r,
                className: (0, p.cn)(
                  "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
                  e,
                ),
                ...t,
              }),
            ).displayName = s.LM.displayName);
          let y = (0, n.F)(
            "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
            {
              variants: {
                variant: {
                  default: "border bg-background text-foreground",
                  destructive:
                    "destructive group border-destructive bg-destructive text-destructive-foreground",
                },
              },
              defaultVariants: { variant: "default" },
            },
          );
          function f({
            title: e,
            description: t,
            variant: r = "default",
            onClose: a,
          }) {
            let s = {
              default: null,
              destructive: l.A,
              success: d.A,
              info: c.A,
            }[r];
            return (0, o.jsxs)("div", {
              className: `max-w-md rounded-lg border shadow-lg p-4 flex items-start gap-3 animate-slide-up-fade ${{ default: "bg-white border-gray-200", destructive: "bg-red-50 border-red-200 text-red-700", success: "bg-green-50 border-green-200 text-green-700", info: "bg-blue-50 border-blue-200 text-blue-700" }[r]}`,
              role: "alert",
              children: [
                s && (0, o.jsx)(s, { className: "h-5 w-5 flex-shrink-0" }),
                (0, o.jsxs)("div", {
                  className: "flex-1",
                  children: [
                    (0, o.jsx)("h3", { className: "font-medium", children: e }),
                    t &&
                      (0, o.jsx)("p", {
                        className: "text-sm mt-1 opacity-90",
                        children: t,
                      }),
                  ],
                }),
                (0, o.jsx)("button", {
                  onClick: a,
                  className: "flex-shrink-0 rounded-full p-1 hover:bg-gray-100",
                  "aria-label": "Close",
                  children: (0, o.jsx)(i.A, { className: "h-4 w-4" }),
                }),
              ],
            });
          }
          function b({ children: e }) {
            let [t, r] = (0, u.useState)([]),
              a = (0, u.useRef)(0),
              s = (0, u.useCallback)((e) => {
                r((t) => t.filter((t) => t.id !== e));
              }, []),
              n = (0, u.useCallback)(
                (e) => {
                  let t = `toast-${a.current++}`,
                    o = { ...e, id: t };
                  r((e) => [...e, o]),
                    setTimeout(() => {
                      s(t);
                    }, e.duration || 5e3);
                },
                [s],
              ),
              i = (0, u.useMemo)(
                () => ({ toast: n, toasts: t, removeToast: s }),
                [n, t, s],
              );
            return (0, o.jsxs)(v.Provider, {
              value: i,
              children: [e, (0, o.jsx)(x, {})],
            });
          }
          function g() {
            let e = (0, u.useContext)(v);
            if (!e)
              throw Error("useToast must be used within a CustomToastProvider");
            return e;
          }
          function x() {
            let { toasts: e, removeToast: t } = g();
            return (0, o.jsx)("div", {
              className: "fixed bottom-0 right-0 p-4 space-y-2 z-50",
              children: e.map((e) =>
                (0, o.jsx)(f, { ...e, onClose: () => t(e.id) }, e.id),
              ),
            });
          }
          (m().forwardRef(({ className: e, variant: t, ...r }, a) =>
            (0, o.jsx)(s.bL, {
              ref: a,
              className: (0, p.cn)(y({ variant: t }), e),
              ...r,
            }),
          ).displayName = s.bL.displayName),
            (m().forwardRef(({ className: e, ...t }, r) =>
              (0, o.jsx)(s.rc, {
                ref: r,
                className: (0, p.cn)(
                  "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
                  e,
                ),
                ...t,
              }),
            ).displayName = s.rc.displayName),
            (m().forwardRef(({ className: e, ...t }, r) =>
              (0, o.jsx)(s.bm, {
                ref: r,
                className: (0, p.cn)(
                  "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
                  e,
                ),
                "toast-close": "",
                ...t,
                children: (0, o.jsx)(i.A, { className: "h-4 w-4" }),
              }),
            ).displayName = s.bm.displayName),
            (m().forwardRef(({ className: e, ...t }, r) =>
              (0, o.jsx)(s.hE, {
                ref: r,
                className: (0, p.cn)("text-sm font-semibold", e),
                ...t,
              }),
            ).displayName = s.hE.displayName),
            (m().forwardRef(({ className: e, ...t }, r) =>
              (0, o.jsx)(s.VY, {
                ref: r,
                className: (0, p.cn)("text-sm opacity-90", e),
                ...t,
              }),
            ).displayName = s.VY.displayName),
            a();
        } catch (e) {
          a(e);
        }
      });
    },
    88355: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 66537)),
        Promise.resolve().then(r.bind(r, 73767)),
        Promise.resolve().then(r.bind(r, 43851)),
        Promise.resolve().then(r.bind(r, 3184)),
        Promise.resolve().then(r.bind(r, 41575)),
        Promise.resolve().then(r.bind(r, 19085)),
        Promise.resolve().then(r.bind(r, 27675)),
        Promise.resolve().then(r.bind(r, 35581)),
        Promise.resolve().then(r.bind(r, 16176)),
        Promise.resolve().then(r.bind(r, 33713)),
        Promise.resolve().then(r.bind(r, 82389)),
        Promise.resolve().then(r.bind(r, 66561)),
        Promise.resolve().then(r.t.bind(r, 37018, 23)),
        Promise.resolve().then(r.bind(r, 2056));
    },
    88433: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 47995));
    },
    92256: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { k: () => d });
          var o = r(61268),
            s = r(49917),
            n = r(84205),
            i = r(15942),
            l = e([i]);
          i = (l.then ? (await l)() : l)[0];
          let d = n.forwardRef(({ className: e, value: t, ...r }, a) =>
            (0, o.jsx)(s.bL, {
              ref: a,
              className: (0, i.cn)(
                "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
                e,
              ),
              ...r,
              children: (0, o.jsx)(s.C1, {
                className: "h-full w-full flex-1 bg-primary transition-all",
                style: { transform: `translateX(-${100 - (t || 0)}%)` },
              }),
            }),
          );
          (d.displayName = s.bL.displayName), a();
        } catch (e) {
          a(e);
        }
      });
    },
    92421: (e, t, r) => {
      "use strict";
      r.d(t, { NotificationButton: () => a });
      let a = (0, r(26394).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call NotificationButton() from the server but NotificationButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\notification-button.tsx",
        "NotificationButton",
      );
    },
    95394: (e, t, r) => {
      "use strict";
      r.d(t, { ErrorBoundary: () => o });
      var a = r(26394);
      let o = (0, a.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call ErrorBoundary() from the server but ErrorBoundary is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\error-boundary.tsx",
        "ErrorBoundary",
      );
      (0, a.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call withErrorBoundary() from the server but withErrorBoundary is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\error-boundary.tsx",
        "withErrorBoundary",
      );
    },
    96756: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { $: () => c, Y: () => d });
          var o = r(61268),
            s = r(15324),
            n = r(89882),
            i = r(84205),
            l = e([s]);
          s = (l.then ? (await l)() : l)[0];
          let u = [
              "/",
              "/documents",
              "/chat",
              "/requirements",
              "/calculator",
              "/notifications",
              "/profile",
              "/settings",
            ],
            m = (0, i.createContext)(void 0);
          function d({ children: e }) {
            let t = (0, n.useRouter)(),
              [r, a] = (0, i.useState)(""),
              [l, d] = (0, i.useState)([]),
              {
                completion: c,
                complete: p,
                isLoading: h,
              } = (0, s.sQ)({ api: "/api/search", onResponse: (e) => {} }),
              f = async (e) => {
                e.preventDefault();
                let a = r.trim();
                if (a)
                  try {
                    let e = await p(a);
                    e && u.includes(e)
                      ? t.push(e)
                      : t.push(`/search?q=${encodeURIComponent(a)}`);
                  } catch (e) {
                    console.error("Search error:", e);
                  }
              };
            return (0, o.jsx)(m.Provider, {
              value: {
                query: r,
                setQuery: a,
                isLoading: h,
                suggestions: l,
                aiSuggestions: c ? [c] : [],
                handleSearch: f,
                clearSearch: () => {
                  a(""), d([]);
                },
              },
              children: e,
            });
          }
          function c() {
            let e = (0, i.useContext)(m);
            if (void 0 === e)
              throw Error(
                "useSearchContext must be used within a SearchProvider",
              );
            return e;
          }
          a();
        } catch (e) {
          a(e);
        }
      });
    },
    98383: (e, t, r) => {
      "use strict";
      r.a(e, async (e, a) => {
        try {
          r.d(t, { A: () => p });
          var o = r(61268),
            s = r(32300),
            n = r(89882),
            i = r(84205),
            l = r(5357),
            d = r(15942),
            c = r(28909),
            u = r(93336),
            m = e([d, c, u]);
          function p({ variant: e = "default" }) {
            let { locale: t, t: r } = (0, l.s9)(),
              a = (0, n.usePathname)(),
              [m, p] = (0, i.useTransition)(),
              h = "sidebar" === e,
              f = a.replace(`/${t}`, "") || "/",
              b = (e) => {
                m ||
                  e === t ||
                  p(() => {
                    let t = `/${e}${f.startsWith("/") ? f : `/${f}`}`,
                      r = l.o0[e];
                    (document.documentElement.dir = r.direction),
                      r.fontClass &&
                        (document.documentElement.classList.forEach((e) => {
                          e.startsWith("font-") &&
                            document.documentElement.classList.remove(e);
                        }),
                        document.documentElement.classList.add(r.fontClass)),
                      localStorage.setItem("NEXT_LOCALE", e),
                      (window.location.href = t);
                  });
              };
            return (0, o.jsxs)(u.rI, {
              children: [
                (0, o.jsx)(u.ty, {
                  asChild: !0,
                  children: (0, o.jsxs)(c.$, {
                    variant: "ghost",
                    size: "icon",
                    className: (0, d.cn)(
                      "relative h-9 w-9 rounded-full bg-background hover:bg-accent hover:text-accent-foreground",
                      "border border-border/40 shadow-sm transition-all duration-200",
                      "hover:shadow-md data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                      "focus-visible:ring-offset-0 focus-visible:border-primary/50",
                      h && "h-8 w-8 rounded-md",
                      m && "opacity-50 cursor-not-allowed",
                    ),
                    disabled: m,
                    "aria-label": r("common.switchLanguage"),
                    children: [
                      (0, o.jsx)(s.A, {
                        className: (0, d.cn)(
                          "h-[1.2rem] w-[1.2rem]",
                          h && "h-4 w-4",
                        ),
                      }),
                      (0, o.jsx)("span", {
                        className: "sr-only",
                        children: r("common.switchLanguage"),
                      }),
                      m &&
                        (0, o.jsx)("div", {
                          className:
                            "absolute inset-0 flex items-center justify-center bg-background/50 rounded-full",
                          children: (0, o.jsx)("div", {
                            className:
                              "h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin",
                          }),
                        }),
                    ],
                  }),
                }),
                (0, o.jsx)(u.SQ, {
                  align: "end",
                  className: (0, d.cn)(
                    "animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                    "min-w-[150px]",
                  ),
                  children: l.IB.map((e) => {
                    let r = l.o0[e],
                      a = t === e;
                    return (0, o.jsxs)(
                      u._2,
                      {
                        onClick: () => !m && b(e),
                        className: (0, d.cn)(
                          "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          a && "bg-accent font-medium text-accent-foreground",
                          m && "opacity-50 cursor-not-allowed",
                        ),
                        disabled: m,
                        children: [
                          (0, o.jsx)("span", {
                            className: "text-base",
                            children: r.flag,
                          }),
                          (0, o.jsx)("span", {
                            className: (0, d.cn)(
                              "flex-1",
                              "ar" === e && "font-arabic text-right",
                            ),
                            children: r.nativeName,
                          }),
                          a &&
                            (0, o.jsx)("div", {
                              className: "h-2 w-2 rounded-full bg-primary",
                            }),
                        ],
                      },
                      e,
                    );
                  }),
                }),
              ],
            });
          }
          ([d, c, u] = m.then ? (await m)() : m), a();
        } catch (e) {
          a(e);
        }
      });
    },
    98699: (e, t, r) => {
      "use strict";
      r.d(t, {
        SidebarInset: () => o,
        SidebarProvider: () => s,
        SidebarTrigger: () => n,
      });
      var a = r(26394);
      (0, a.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call Sidebar() from the server but Sidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
        "Sidebar",
      ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarContent() from the server but SidebarContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarContent",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarFooter() from the server but SidebarFooter is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarFooter",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarGroup() from the server but SidebarGroup is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarGroup",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarGroupAction() from the server but SidebarGroupAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarGroupAction",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarGroupContent() from the server but SidebarGroupContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarGroupContent",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarGroupLabel() from the server but SidebarGroupLabel is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarGroupLabel",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarHeader() from the server but SidebarHeader is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarHeader",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarInput() from the server but SidebarInput is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarInput",
        );
      let o = (0, a.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call SidebarInset() from the server but SidebarInset is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
        "SidebarInset",
      );
      (0, a.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call SidebarMenu() from the server but SidebarMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
        "SidebarMenu",
      ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarMenuAction() from the server but SidebarMenuAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarMenuAction",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarMenuBadge() from the server but SidebarMenuBadge is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarMenuBadge",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarMenuButton() from the server but SidebarMenuButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarMenuButton",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarMenuItem() from the server but SidebarMenuItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarMenuItem",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarMenuSkeleton() from the server but SidebarMenuSkeleton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarMenuSkeleton",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarMenuSub() from the server but SidebarMenuSub is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarMenuSub",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarMenuSubButton() from the server but SidebarMenuSubButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarMenuSubButton",
        ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarMenuSubItem() from the server but SidebarMenuSubItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarMenuSubItem",
        );
      let s = (0, a.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call SidebarProvider() from the server but SidebarProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
        "SidebarProvider",
      );
      (0, a.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call SidebarRail() from the server but SidebarRail is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
        "SidebarRail",
      ),
        (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call SidebarSeparator() from the server but SidebarSeparator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
          "SidebarSeparator",
        );
      let n = (0, a.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call SidebarTrigger() from the server but SidebarTrigger is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
        "SidebarTrigger",
      );
      (0, a.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call useSidebar() from the server but useSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\components\\ui\\sidebar.tsx",
        "useSidebar",
      );
    },
    98728: (e, t, r) => {
      var a = {
        "./ar.json": [39221, 9221],
        "./en.json": [28517, 8517],
        "./es.json": [34026, 4026],
        "./fr.json": [53586, 3586],
      };
      function o(e) {
        if (!r.o(a, e))
          return Promise.resolve().then(() => {
            var t = Error("Cannot find module '" + e + "'");
            throw ((t.code = "MODULE_NOT_FOUND"), t);
          });
        var t = a[e],
          o = t[0];
        return r.e(t[1]).then(() => r.t(o, 19));
      }
      (o.keys = () => Object.keys(a)), (o.id = 98728), (e.exports = o);
    },
  });
//# sourceMappingURL=7935.js.map
