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
    (e._sentryDebugIds[t] = "1ad8743d-bbb7-4e85-9496-8e4cc3efcebd"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-1ad8743d-bbb7-4e85-9496-8e4cc3efcebd"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 4172),
    (e.ids = [4172]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3745: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("HelpCircle", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          [
            "path",
            { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" },
          ],
          ["path", { d: "M12 17h.01", key: "p32p05" }],
        ]);
      },
      5112: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => a.default,
            __next_app__: () => l,
            pages: () => c,
            routeModule: () => u,
            tree: () => d,
          });
        var i = r(11610),
          s = r(51293),
          a = r(59059),
          o = r(17770),
          n = {};
        for (let e in o)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (n[e] = () => o[e]);
        r.d(t, n);
        let d = {
            children: [
              "",
              {
                children: [
                  "(authenticated)",
                  {
                    children: [
                      "dashboard",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 70551)),
                              "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\page.tsx",
                            ],
                          },
                        ],
                      },
                      {
                        layout: [
                          () => Promise.resolve().then(r.bind(r, 73856)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\layout.tsx",
                        ],
                        loading: [
                          () => Promise.resolve().then(r.bind(r, 97020)),
                          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\loading.tsx",
                        ],
                      },
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(r.bind(r, 72967)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\layout.tsx",
                    ],
                    forbidden: [
                      () => Promise.resolve().then(r.t.bind(r, 57382, 23)),
                      "next/dist/client/components/forbidden-error",
                    ],
                    unauthorized: [
                      () => Promise.resolve().then(r.t.bind(r, 87039, 23)),
                      "next/dist/client/components/unauthorized-error",
                    ],
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(r.bind(r, 22630)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\layout.tsx",
                ],
                error: [
                  () => Promise.resolve().then(r.bind(r, 94745)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
                ],
                "global-error": [
                  () => Promise.resolve().then(r.bind(r, 59059)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(r.bind(r, 53974)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
                ],
                forbidden: [
                  () => Promise.resolve().then(r.t.bind(r, 57382, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(r.t.bind(r, 87039, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          c = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\page.tsx",
          ],
          l = { require: r, loadChunk: () => Promise.resolve() },
          u = new i.AppPageRouteModule({
            definition: {
              kind: s.RouteKind.APP_PAGE,
              page: "/(authenticated)/dashboard/page",
              pathname: "/dashboard",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11997: (e) => {
        "use strict";
        e.exports = require("punycode");
      },
      14677: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("Calendar", [
          ["path", { d: "M8 2v4", key: "1cmpym" }],
          ["path", { d: "M16 2v4", key: "4m81vk" }],
          [
            "rect",
            {
              width: "18",
              height: "18",
              x: "3",
              y: "4",
              rx: "2",
              key: "1hopcy",
            },
          ],
          ["path", { d: "M3 10h18", key: "8toen8" }],
        ]);
      },
      15012: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("Video", [
          ["path", { d: "m22 8-6 4 6 4V8Z", key: "50v9me" }],
          [
            "rect",
            {
              width: "14",
              height: "12",
              x: "2",
              y: "6",
              rx: "2",
              ry: "2",
              key: "1rqjg6",
            },
          ],
        ]);
      },
      16951: (e, t, r) => {
        "use strict";
        r.d(t, {
          B5: () => h,
          Dv: () => m,
          Yk: () => g,
          ZH: () => f,
          Zj: () => u,
          m_: () => p,
        });
        var i = r(58882),
          s = r(14677),
          a = r(99793),
          o = r(92663),
          n = r(80305),
          d = r(3745),
          c = r(15012),
          l = r(52327);
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
                  icon: i.A,
                  actionKey: "first_task_upload",
                },
                {
                  id: "consult",
                  title: "Schedule a Consultation",
                  description:
                    "Book a session with an immigration expert to discuss your specific situation.",
                  cta: "Book Consultation",
                  icon: s.A,
                  actionKey: "first_task_consult",
                },
                {
                  id: "application",
                  title: "Start an Application/Case",
                  description:
                    "Begin your first immigration case setup with our guided process.",
                  cta: "Start Case",
                  icon: a.A,
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
                  icon: o.A,
                  resources: [
                    {
                      icon: o.A,
                      title: "Getting Started Guide",
                      description:
                        "A comprehensive guide on how to use Hijraah for your immigration journey.",
                      link: "/guides/getting-started",
                    },
                    {
                      icon: n.A,
                      title: "Country-Specific Guides",
                      description:
                        "Detailed guides for the most popular immigration destinations.",
                      link: "/guides/countries",
                    },
                    {
                      icon: s.A,
                      title: "Immigration Timeline",
                      description:
                        "Learn about typical immigration process timelines and milestones.",
                      link: "/guides/timeline",
                    },
                    {
                      icon: d.A,
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
                  icon: a.A,
                  resources: [
                    {
                      icon: a.A,
                      title: "Document Checklist Tool",
                      description:
                        "Use our tool to generate a checklist of essential documents for your specific case.",
                      link: "/tools/document-checklist",
                    },
                    {
                      icon: a.A,
                      title: "Sample Templates",
                      description:
                        "View sample templates for common immigration forms and letters.",
                      link: "/documents/templates",
                    },
                    {
                      icon: a.A,
                      title: "Legal Resources",
                      description:
                        "Links to official government immigration sites and legal aid information.",
                      link: "/resources/legal",
                    },
                    {
                      icon: a.A,
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
                  icon: c.A,
                  resources: [
                    {
                      icon: c.A,
                      title: "Platform Tutorial",
                      description:
                        "Watch a comprehensive video tutorial on using the Hijraah platform features.",
                      link: "/videos/tutorial",
                    },
                    {
                      icon: c.A,
                      title: "Immigration Process Explained",
                      description:
                        "Video overview of typical immigration processes and common steps involved.",
                      link: "/videos/process",
                    },
                    {
                      icon: c.A,
                      title: "Expert Interviews",
                      description:
                        "Watch interviews with immigration lawyers and consultants sharing insights.",
                      link: "/videos/experts",
                    },
                    {
                      icon: c.A,
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
                  icon: l.A,
                  resources: [
                    {
                      icon: l.A,
                      title: "Community Forum",
                      description:
                        "Join discussions, ask questions, and share experiences with fellow users.",
                      link: "/community/forums",
                    },
                    {
                      icon: l.A,
                      title: "Find an Expert",
                      description:
                        "Connect with verified immigration experts and consultants through our network.",
                      link: "/experts",
                    },
                    {
                      icon: s.A,
                      title: "Events & Webinars",
                      description:
                        "Find upcoming webinars, workshops, and Q&A sessions related to immigration.",
                      link: "/community/events",
                    },
                    {
                      icon: d.A,
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
          p = (e) => {
            if (!(e < 0) && !(e >= u.length)) return u[e];
          },
          m = (e) => u.find((t) => t.id === e),
          h = (e) => u.findIndex((t) => t.id === e),
          g = () => u.length,
          f = u.map((e) => e.id);
      },
      17362: (e, t, r) => {
        "use strict";
        r.a(e, async (e, i) => {
          try {
            r.d(t, {
              AB: () => l,
              J5: () => u,
              Qp: () => c,
              tH: () => h,
              tJ: () => m,
              w1: () => p,
            });
            var s = r(61268),
              a = r(86415),
              o = r(12335);
            r(84205);
            var n = r(15942),
              d = e([n]);
            function c({ ...e }) {
              return (0, s.jsx)("nav", {
                "aria-label": "breadcrumb",
                "data-slot": "breadcrumb",
                ...e,
              });
            }
            function l({ className: e, ...t }) {
              return (0, s.jsx)("ol", {
                "data-slot": "breadcrumb-list",
                className: (0, n.cn)(
                  "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
                  e,
                ),
                ...t,
              });
            }
            function u({ className: e, ...t }) {
              return (0, s.jsx)("li", {
                "data-slot": "breadcrumb-item",
                className: (0, n.cn)("inline-flex items-center gap-1.5", e),
                ...t,
              });
            }
            function p({ asChild: e, className: t, ...r }) {
              let i = e ? a.DX : "a";
              return (0, s.jsx)(i, {
                "data-slot": "breadcrumb-link",
                className: (0, n.cn)(
                  "hover:text-foreground transition-colors",
                  t,
                ),
                ...r,
              });
            }
            function m({ className: e, ...t }) {
              return (0, s.jsx)("span", {
                "data-slot": "breadcrumb-page",
                role: "link",
                "aria-disabled": "true",
                "aria-current": "page",
                className: (0, n.cn)("text-foreground font-normal", e),
                ...t,
              });
            }
            function h({ children: e, className: t, ...r }) {
              return (0, s.jsx)("li", {
                "data-slot": "breadcrumb-separator",
                role: "presentation",
                "aria-hidden": "true",
                className: (0, n.cn)("[&>svg]:size-3.5", t),
                ...r,
                children: e ?? (0, s.jsx)(o.A, {}),
              });
            }
            (n = (d.then ? (await d)() : d)[0]), i();
          } catch (e) {
            i(e);
          }
        });
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      25626: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 72337));
      },
      26216: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("Menu", [
          ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
          ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
          ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }],
        ]);
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      34631: (e) => {
        "use strict";
        e.exports = require("tls");
      },
      36242: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 70551));
      },
      36686: (e) => {
        "use strict";
        e.exports = require("diagnostics_channel");
      },
      36798: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("Settings", [
          [
            "path",
            {
              d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
              key: "1qme2f",
            },
          ],
          ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
        ]);
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      38568: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("CheckCircle", [
          ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
          ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
        ]);
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42414: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => d });
        var i,
          s = r(84205),
          a = r(66130),
          o =
            (i || (i = r.t(s, 2)))[" useId ".trim().toString()] ||
            (() => void 0),
          n = 0;
        function d(e) {
          let [t, r] = s.useState(o());
          return (
            (0, a.N)(() => {
              e || r((e) => e ?? String(n++));
            }, [e]),
            e || (t ? `radix-${t}` : "")
          );
        }
      },
      43202: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("Map", [
          [
            "polygon",
            {
              points: "3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21",
              key: "ok2ie8",
            },
          ],
          ["line", { x1: "9", x2: "9", y1: "3", y2: "18", key: "w34qz5" }],
          ["line", { x1: "15", x2: "15", y1: "6", y2: "21", key: "volv9a" }],
        ]);
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      46299: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("Briefcase", [
          [
            "rect",
            {
              width: "20",
              height: "14",
              x: "2",
              y: "7",
              rx: "2",
              ry: "2",
              key: "eto64e",
            },
          ],
          [
            "path",
            { d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "zwj3tp" },
          ],
        ]);
      },
      46532: (e, t, r) => {
        "use strict";
        r.a(e, async (e, i) => {
          try {
            r.d(t, { E: () => c });
            var s = r(61268),
              a = r(86415),
              o = r(91635);
            r(84205);
            var n = r(15942),
              d = e([n]);
            n = (d.then ? (await d)() : d)[0];
            let l = (0, o.F)(
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
            function c({ className: e, variant: t, asChild: r = !1, ...i }) {
              let o = r ? a.DX : "span";
              return (0, s.jsx)(o, {
                "data-slot": "badge",
                className: (0, n.cn)(l({ variant: t }), e),
                ...i,
              });
            }
            i();
          } catch (e) {
            i(e);
          }
        });
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      52327: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("Users", [
          [
            "path",
            { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" },
          ],
          ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
          ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
          ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }],
        ]);
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      55591: (e) => {
        "use strict";
        e.exports = require("https");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57896: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("Home", [
          [
            "path",
            {
              d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
              key: "y5dka4",
            },
          ],
          ["polyline", { points: "9 22 9 12 15 12 15 22", key: "e2us08" }],
        ]);
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      58882: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("Upload", [
          [
            "path",
            { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" },
          ],
          ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
          ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }],
        ]);
      },
      61950: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("AlertCircle", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
          [
            "line",
            { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" },
          ],
        ]);
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      67135: (e, t, r) => {
        "use strict";
        r.d(t, { X: () => p, z: () => u });
        var i = r(61268),
          s = r(97713),
          a = r(84205),
          o = r(98654),
          n = r(16951),
          d = r(32367);
        let c = {
            currentStep: "welcome",
            progress: 0,
            isCompleted: !1,
            isActive: !1,
            hideForSession: !1,
          },
          l = (0, a.createContext)(void 0),
          u = () => {
            let e = (0, a.useContext)(l);
            if (!e)
              throw Error(
                "useOnboarding must be used within an OnboardingProvider",
              );
            return e;
          },
          p = ({ children: e }) => {
            let [t, r] = (0, a.useState)({ hideForSession: !1 }),
              [u, p] = (0, a.useState)(null),
              m = (0, s.createBrowserClient)(
                "http://localhost:54321",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
              );
            (0, a.useEffect)(() => {
              (async () => {
                let { data: e } = await m.auth.getUser();
                p(e.user);
              })();
              let { data: e } = m.auth.onAuthStateChange(async (e, t) => {
                p(t?.user ?? null),
                  ("SIGNED_IN" === e || "SIGNED_OUT" === e) &&
                    r((e) => ({ ...e, hideForSession: !1 }));
              });
              return () => {
                e.subscription.unsubscribe();
              };
            }, [m]);
            let {
                onboardingState: h,
                updateOnboardingState: g,
                isLoading: f,
              } = (function (e) {
                let [t, r] = (0, a.useState)(c),
                  [i, s] = (0, a.useState)(!0),
                  n = (0, d.Iw)(),
                  l = (0, a.useCallback)(
                    async (i) => {
                      if (!e) return;
                      let s = { ...t, ...i };
                      if ((r(s), s.isActive))
                        try {
                          let { error: t } = await n
                            .from("user_onboarding")
                            .upsert({
                              user_id: e.id,
                              current_step: s.currentStep,
                              progress: s.progress,
                              is_completed: s.isCompleted,
                              updated_at: new Date().toISOString(),
                            });
                          t &&
                            (console.error(
                              "[OnboardingPersistence] updateOnboardingState: Upsert error:",
                              t,
                            ),
                            o.oR.error("Failed to save onboarding progress."));
                        } catch (e) {
                          console.error(
                            "[OnboardingPersistence] updateOnboardingState: Unexpected upsert error:",
                            e,
                          ),
                            o.oR.error(
                              "An error occurred while saving onboarding progress.",
                            );
                        }
                    },
                    [e, n, t],
                  );
                return {
                  onboardingState: t,
                  updateOnboardingState: l,
                  isLoading: i,
                };
              })(u),
              y = (0, a.useMemo)(
                () => ({ ...h, hideForSession: t.hideForSession }),
                [h, t.hideForSession],
              ),
              b = (e) => {
                let t = (0, n.Yk)();
                return t <= 1 ? 100 : Math.round((e / (t - 1)) * 100);
              },
              x = (0, a.useCallback)(() => {
                let e = (0, n.B5)(y.currentStep),
                  t = (0, n.Yk)();
                if (e < t - 1) {
                  let t = e + 1;
                  g({ currentStep: n.ZH[t], progress: b(t), isCompleted: !1 });
                } else
                  e === t - 1 &&
                    (g({ progress: 100, isCompleted: !0, isActive: !1 }),
                    o.oR.success("Onboarding complete! You're all set."));
              }, [y.currentStep, g]),
              v = (0, a.useCallback)(() => {
                let e = (0, n.B5)(y.currentStep);
                if (e > 0) {
                  let t = e - 1;
                  g({ currentStep: n.ZH[t], progress: b(t), isCompleted: !1 });
                }
              }, [y.currentStep, g]),
              k = (0, a.useCallback)(() => {
                g({ progress: 100, isCompleted: !0, isActive: !1 }),
                  o.oR.info("Onboarding skipped.");
              }, [g]),
              w = (0, a.useCallback)(() => {
                r((e) => ({ ...e, hideForSession: !0 }));
              }, []),
              A = (0, a.useCallback)(() => {
                g({
                  currentStep: n.ZH[0],
                  progress: 0,
                  isCompleted: !1,
                  isActive: !0,
                  hideForSession: !1,
                }),
                  r({ hideForSession: !1 }),
                  o.oR.info("Onboarding restarted.");
              }, [y, g]),
              j = (0, a.useCallback)(
                (e) => {
                  if (y.currentStep === e && !y.isCompleted) {
                    let t = n.Zj.find((t) => t.id === e);
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
                      x();
                  }
                },
                [y.currentStep, y.isCompleted, x],
              );
            return (0, i.jsx)(l.Provider, {
              value: {
                onboarding: y,
                isLoading: f,
                user: u,
                nextStep: x,
                previousStep: v,
                skipOnboarding: k,
                hideOnboardingForSession: w,
                resetOnboarding: A,
                completeStep: j,
              },
              children: e,
            });
          };
      },
      70551: (e, t, r) => {
        "use strict";
        let i;
        r.r(t),
          r.d(t, {
            default: () => m,
            generateImageMetadata: () => u,
            generateMetadata: () => l,
            generateViewport: () => p,
          });
        var s = r(63033),
          a = r(26394),
          o = r(60442),
          n = (0, a.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(authenticated)\\\\dashboard\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(authenticated)\\dashboard\\page.tsx",
            "default",
          );
        let d = { ...s },
          c =
            "workUnitAsyncStorage" in d
              ? d.workUnitAsyncStorage
              : "requestAsyncStorage" in d
                ? d.requestAsyncStorage
                : void 0;
        i =
          "function" == typeof n
            ? new Proxy(n, {
                apply: (e, t, r) => {
                  let i, s, a;
                  try {
                    let e = c?.getStore();
                    (i = e?.headers.get("sentry-trace") ?? void 0),
                      (s = e?.headers.get("baggage") ?? void 0),
                      (a = e?.headers);
                  } catch (e) {}
                  return o
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(authenticated)/dashboard",
                      componentType: "Page",
                      sentryTraceHeader: i,
                      baggageHeader: s,
                      headers: a,
                    })
                    .apply(t, r);
                },
              })
            : n;
        let l = void 0,
          u = void 0,
          p = void 0,
          m = i;
      },
      72337: (e, t, r) => {
        "use strict";
        r.a(e, async (e, i) => {
          try {
            r.r(t), r.d(t, { default: () => x });
            var s = r(61268),
              a = r(89882),
              o = r(84205),
              n = r(43851),
              d = r(94507),
              c = r(28539),
              l = r(20149),
              u = r(8435),
              p = r(81774),
              m = r(67135),
              h = r(15090),
              g = r(3519),
              f = r(17362),
              y = r(77001),
              b = e([n, d, c, l, u, p, f, y]);
            function x() {
              let [e, t] = (0, o.useState)([]),
                [r, i] = (0, o.useState)([]),
                [b, x] = (0, o.useState)(!0),
                [v, k] = (0, o.useState)("cases"),
                { user: w } = (0, g.useAuth)(),
                { toast: A } = (0, h.d)();
              (0, a.useRouter)();
              let { onboarding: j, resetOnboarding: S } = (0, m.z)(),
                C = (0, o.useCallback)(async () => {
                  if (w)
                    try {
                      x(!0);
                      let [e, r] = await Promise.all([
                        fetch(`/api/cases?user_id=${w.id}`),
                        fetch(`/api/documents?user_id=${w.id}`),
                      ]);
                      if (!e.ok)
                        throw Error(`Failed to fetch cases: ${e.status}`);
                      if (!r.ok)
                        throw Error(`Failed to fetch documents: ${r.status}`);
                      let s = await e.json(),
                        a = await r.json();
                      t(s), i(a);
                    } catch (e) {
                      console.error("Error loading data:", e),
                        A({
                          variant: "destructive",
                          title: "Error",
                          description: "Failed to load data",
                        });
                    } finally {
                      x(!1);
                    }
                }, [w, A]),
                q = async (e) => {
                  try {
                    if (!e.title) throw Error("Title is required");
                    let t = await fetch("/api/cases", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ ...e, user_id: w.id }),
                    });
                    if (!t.ok) {
                      let e = await t.json();
                      throw Error(
                        e.error || `Failed to create case: ${t.status}`,
                      );
                    }
                    await C(),
                      A({
                        title: "Success",
                        description: "Case created successfully",
                      });
                  } catch (e) {
                    console.error("Error creating case:", e),
                      A({
                        variant: "destructive",
                        title: "Error",
                        description:
                          e instanceof Error
                            ? e.message
                            : "Failed to create case",
                      });
                  }
                },
                _ = async (e) => {
                  try {
                    if (!e.name || !e.file)
                      throw Error("Name and file are required");
                    let t = new FormData();
                    t.append("file", e.file),
                      t.append("name", e.name),
                      t.append("case_id", e.case_id || "default"),
                      t.append("user_id", w.id),
                      e.description && t.append("description", e.description);
                    let r = await fetch("/api/documents", {
                      method: "POST",
                      body: t,
                    });
                    if (!r.ok) {
                      let e = await r.json();
                      throw Error(
                        e.error || `Failed to upload document: ${r.status}`,
                      );
                    }
                    await C(),
                      A({
                        title: "Success",
                        description: "Document uploaded successfully",
                      });
                  } catch (e) {
                    console.error("Error uploading document:", e),
                      A({
                        variant: "destructive",
                        title: "Error",
                        description:
                          e instanceof Error
                            ? e.message
                            : "Failed to upload document",
                      });
                  }
                };
              return w
                ? b
                  ? (0, s.jsx)(l.O, {})
                  : (0, s.jsxs)("div", {
                      className: "flex flex-col h-screen",
                      children: [
                        (0, s.jsx)("div", {
                          className:
                            "flex items-center justify-between px-4 py-2 border-b",
                          children: (0, s.jsx)(f.Qp, {
                            children: (0, s.jsxs)(f.AB, {
                              children: [
                                (0, s.jsx)(f.J5, {
                                  children: (0, s.jsx)(f.w1, {
                                    href: "/",
                                    children: "Home",
                                  }),
                                }),
                                (0, s.jsx)(f.tH, {}),
                                (0, s.jsx)(f.J5, {
                                  children: (0, s.jsx)(f.tJ, {
                                    children: "Dashboard",
                                  }),
                                }),
                              ],
                            }),
                          }),
                        }),
                        (0, s.jsxs)("div", {
                          className: "flex flex-1 overflow-hidden",
                          children: [
                            (0, s.jsx)(n.AppSidebar, { className: "h-screen" }),
                            (0, s.jsx)("div", {
                              className: "flex-1 overflow-auto",
                              children: (0, s.jsx)("div", {
                                className: "container mx-auto p-6",
                                children: (0, s.jsxs)(y.Tabs, {
                                  defaultValue: v,
                                  "data-tour": "dashboard",
                                  children: [
                                    (0, s.jsxs)("div", {
                                      className:
                                        "mb-6 flex items-center justify-between",
                                      children: [
                                        (0, s.jsxs)(y.TabsList, {
                                          children: [
                                            (0, s.jsx)(y.TabsTrigger, {
                                              value: "cases",
                                              onClick: () => k("cases"),
                                              children: "Cases",
                                            }),
                                            (0, s.jsx)(y.TabsTrigger, {
                                              value: "documents",
                                              onClick: () => k("documents"),
                                              children: "Documents",
                                            }),
                                            (0, s.jsx)(y.TabsTrigger, {
                                              value: "analytics",
                                              onClick: () => k("analytics"),
                                              children: "Analytics",
                                            }),
                                          ],
                                        }),
                                        (0, s.jsx)(c.c, {
                                          activeTab: v,
                                          cases: e,
                                          onCreateCase: q,
                                          onUploadDocument: _,
                                        }),
                                      ],
                                    }),
                                    (0, s.jsx)(u.G, {
                                      cases: e,
                                      documents: r,
                                      activeTab: v,
                                    }),
                                    (0, s.jsx)(y.TabsContent, {
                                      value: "cases",
                                      className: "space-y-4",
                                      "data-tour": "applications",
                                      children: (0, s.jsx)(d.G, {
                                        cases: e,
                                        onCaseUpdated: C,
                                      }),
                                    }),
                                    (0, s.jsx)(y.TabsContent, {
                                      value: "documents",
                                      className: "space-y-4",
                                      "data-tour": "documents",
                                      children: (0, s.jsx)(p.P, {
                                        documents: r,
                                        onDocumentUpdated: C,
                                      }),
                                    }),
                                    (0, s.jsx)(y.TabsContent, {
                                      value: "analytics",
                                      className: "space-y-4",
                                      children: (0, s.jsx)("div", {
                                        className:
                                          "h-[400px] w-full rounded-md border border-dashed flex items-center justify-center",
                                        children: (0, s.jsx)("p", {
                                          className:
                                            "text-center text-muted-foreground",
                                          children:
                                            "Analytics view coming soon",
                                        }),
                                      }),
                                    }),
                                  ],
                                }),
                              }),
                            }),
                          ],
                        }),
                      ],
                    })
                : (0, s.jsx)("div", {
                    className: "flex min-h-screen items-center justify-center",
                    children: (0, s.jsx)("p", {
                      className: "text-lg",
                      children: "Please sign in to access the dashboard",
                    }),
                  });
            }
            ([n, d, c, l, u, p, f, y] = b.then ? (await b)() : b), i();
          } catch (e) {
            i(e);
          }
        });
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      73927: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, { "4055c9f9dce3c849928e65e87017b3609674121d00": () => i.M });
        var i = r(29997);
      },
      74075: (e) => {
        "use strict";
        e.exports = require("zlib");
      },
      74998: (e) => {
        "use strict";
        e.exports = require("perf_hooks");
      },
      75919: (e) => {
        "use strict";
        e.exports = require("node:worker_threads");
      },
      76760: (e) => {
        "use strict";
        e.exports = require("node:path");
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
      },
      79428: (e) => {
        "use strict";
        e.exports = require("buffer");
      },
      79551: (e) => {
        "use strict";
        e.exports = require("url");
      },
      79646: (e) => {
        "use strict";
        e.exports = require("child_process");
      },
      80305: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("Flag", [
          [
            "path",
            {
              d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",
              key: "i9b6wo",
            },
          ],
          ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }],
        ]);
      },
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      81630: (e) => {
        "use strict";
        e.exports = require("http");
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      91645: (e) => {
        "use strict";
        e.exports = require("net");
      },
      92663: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("BookOpen", [
          [
            "path",
            { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", key: "vv98re" },
          ],
          [
            "path",
            { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", key: "1cyq3y" },
          ],
        ]);
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
      99793: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        let i = (0, r(95255).A)("FileText", [
          [
            "path",
            {
              d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
              key: "1rqfz7",
            },
          ],
          ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
          ["path", { d: "M10 9H8", key: "b1mrlr" }],
          ["path", { d: "M16 13H8", key: "t4e002" }],
          ["path", { d: "M16 17H8", key: "z1uh3a" }],
        ]);
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    i = t.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 5728, 9729,
        3390, 4990, 6188, 7911, 7401, 5124, 7272, 3042, 385, 1578, 4630, 8264,
        27, 6536, 7251, 6491,
      ],
      () => r(5112),
    );
  module.exports = i;
})();
//# sourceMappingURL=page.js.map
