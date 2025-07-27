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
    (e._sentryDebugIds[t] = "d83b1638-8297-4e3f-8b7e-ce3862ef3b33"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-d83b1638-8297-4e3f-8b7e-ce3862ef3b33"));
} catch (e) {}
(exports.id = 4630),
  (exports.ids = [4630]),
  (exports.modules = {
    8963: (e) => {
      function t(e) {
        var t = Error("Cannot find module '" + e + "'");
        throw ((t.code = "MODULE_NOT_FOUND"), t);
      }
      (t.keys = () => []), (t.resolve = t), (t.id = 8963), (e.exports = t);
    },
    15942: (e, t, r) => {
      "use strict";
      r.a(e, async (e, n) => {
        try {
          r.d(t, {
            Cq: () => c,
            GO: () => u,
            cn: () => d,
            lk: () => l,
            y8: () => h,
          });
          var o = r(85488);
          r(3477);
          var a = r(79029),
            i = r(58360),
            s = e([o]);
          function d(...e) {
            return (0, i.QP)((0, a.$)(e));
          }
          function l() {
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
          function c(e) {
            if (0 === e) return "0 Bytes";
            let t = Math.floor(Math.log(e) / Math.log(1024));
            return (
              parseFloat((e / Math.pow(1024, t)).toFixed(2)) +
              " " +
              ["Bytes", "KB", "MB", "GB", "TB"][t]
            );
          }
          o = (s.then ? (await s)() : s)[0];
          let u = async (e) => {
            let t = await fetch(e);
            if (!t.ok) {
              let e = Error("An error occurred while fetching the data.");
              try {
                e.info = await t.json();
              } catch (r) {
                e.info = t.statusText;
              }
              throw ((e.status = t.status), e);
            }
            return t.json();
          };
          function h(e) {
            return e.map((e) => {
              var t;
              return {
                ...e,
                content:
                  ((t = e.content),
                  "string" != typeof t
                    ? ""
                    : t.replace(/<has_function_call>/g, "")),
              };
            });
          }
          n();
        } catch (e) {
          n(e);
        }
      });
    },
    22630: (e, t, r) => {
      "use strict";
      let n;
      r.r(t),
        r.d(t, {
          default: () => b,
          dynamic: () => u,
          generateImageMetadata: () => v,
          generateMetadata: () => f,
          generateViewport: () => x,
          maxDuration: () => m,
          metadata: () => c,
          viewport: () => h,
        });
      var o = r(63033),
        a = r(35242);
      r(93206);
      var i = r(51433),
        s = r(59107),
        d = r(39862),
        l = r(60442);
      let c = {
          title: {
            default: "Hijraah - Navigate Your Immigration Journey",
            template: "%s | Hijraah",
          },
          metadataBase: new URL("https://hijraah.vercel.app"),
          description:
            "Navigate your immigration journey with AI guidance - Compare immigration policies across countries with intelligent insights",
          keywords: [
            "immigration",
            "visa",
            "comparison",
            "countries",
            "policies",
            "AI guidance",
            "immigration journey",
          ],
          authors: [{ name: "Hijraah Team" }],
          creator: "Hijraah",
          icons: { icon: "/Hijraah_logo.png", apple: "/Hijraah_logo.png" },
          openGraph: {
            type: "website",
            locale: "en_US",
            url: "https://hijraah.vercel.app",
            title: "Hijraah - Immigration Comparison",
            description:
              "Compare immigration policies across countries with AI-powered insights",
            siteName: "Hijraah",
            images: [
              {
                url: "/Hijraah_logo.png",
                width: 800,
                height: 800,
                alt: "Hijraah Logo",
              },
            ],
          },
          twitter: {
            card: "summary_large_image",
            title: "Hijraah - Immigration Comparison",
            description:
              "Compare immigration policies across countries with AI-powered insights",
            creator: "@hijraah",
            images: ["/Hijraah_logo.png"],
          },
          robots: { index: !0, follow: !0 },
        },
        h = {
          themeColor: [
            { media: "(prefers-color-scheme: light)", color: "white" },
            { media: "(prefers-color-scheme: dark)", color: "#18181b" },
          ],
          width: "device-width",
          initialScale: 1,
        },
        u = "force-dynamic",
        m = 60,
        p = { ...o },
        g =
          "workUnitAsyncStorage" in p
            ? p.workUnitAsyncStorage
            : "requestAsyncStorage" in p
              ? p.requestAsyncStorage
              : void 0;
      n = new Proxy(
        function ({ children: e }) {
          let t = { plugins: [] };
          return (0, a.jsxs)(a.Fragment, {
            children: [
              e,
              (0, a.jsx)(s.Analytics, {}),
              (0, a.jsx)(d.SpeedInsights, {}),
              t && (0, a.jsx)(i.StagewiseToolbar, { config: t }),
            ],
          });
        },
        {
          apply: (e, t, r) => {
            let n, o, a;
            try {
              let e = g?.getStore();
              (n = e?.headers.get("sentry-trace") ?? void 0),
                (o = e?.headers.get("baggage") ?? void 0),
                (a = e?.headers);
            } catch (e) {}
            return l
              .wrapServerComponentWithSentry(e, {
                componentRoute: "/",
                componentType: "Layout",
                sentryTraceHeader: n,
                baggageHeader: o,
                headers: a,
              })
              .apply(t, r);
          },
        },
      );
      let f = void 0,
        v = void 0,
        x = void 0,
        b = n;
    },
    26564: (e) => {
      function t(e) {
        var t = Error("Cannot find module '" + e + "'");
        throw ((t.code = "MODULE_NOT_FOUND"), t);
      }
      (t.keys = () => []), (t.resolve = t), (t.id = 26564), (e.exports = t);
    },
    28169: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 87113));
    },
    28191: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 84792)),
        Promise.resolve().then(r.bind(r, 66561)),
        Promise.resolve().then(r.bind(r, 25052));
    },
    28909: (e, t, r) => {
      "use strict";
      r.a(e, async (e, n) => {
        try {
          r.d(t, { $: () => l, r: () => c });
          var o = r(61268),
            a = r(86415),
            i = r(91635);
          r(84205);
          var s = r(15942),
            d = e([s]);
          s = (d.then ? (await d)() : d)[0];
          let c = (0, i.F)(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            {
              variants: {
                variant: {
                  default:
                    "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                  destructive:
                    "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                  outline:
                    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                  secondary:
                    "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                  ghost:
                    "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                  link: "text-primary underline-offset-4 hover:underline",
                },
                size: {
                  default: "h-9 px-4 py-2 has-[>svg]:px-3",
                  sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                  icon: "size-9",
                },
              },
              defaultVariants: { variant: "default", size: "default" },
            },
          );
          function l({
            className: e,
            variant: t,
            size: r,
            asChild: n = !1,
            ...i
          }) {
            let d = n ? a.DX : "button";
            return (0, o.jsx)(d, {
              "data-slot": "button",
              className: (0, s.cn)(c({ variant: t, size: r, className: e })),
              ...i,
            });
          }
          n();
        } catch (e) {
          n(e);
        }
      });
    },
    53974: (e, t, r) => {
      "use strict";
      let n;
      r.r(t),
        r.d(t, {
          default: () => m,
          generateImageMetadata: () => h,
          generateMetadata: () => c,
          generateViewport: () => u,
        });
      var o = r(63033),
        a = r(26394),
        i = r(60442),
        s = (0, a.registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\not-found.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
          "default",
        );
      let d = { ...o },
        l =
          "workUnitAsyncStorage" in d
            ? d.workUnitAsyncStorage
            : "requestAsyncStorage" in d
              ? d.requestAsyncStorage
              : void 0;
      n =
        "function" == typeof s
          ? new Proxy(s, {
              apply: (e, t, r) => {
                let n, o, a;
                try {
                  let e = l?.getStore();
                  (n = e?.headers.get("sentry-trace") ?? void 0),
                    (o = e?.headers.get("baggage") ?? void 0),
                    (a = e?.headers);
                } catch (e) {}
                return i
                  .wrapServerComponentWithSentry(e, {
                    componentRoute: "/",
                    componentType: "Not-found",
                    sentryTraceHeader: n,
                    baggageHeader: o,
                    headers: a,
                  })
                  .apply(t, r);
              },
            })
          : s;
      let c = void 0,
        h = void 0,
        u = void 0,
        m = n;
    },
    56460: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { default: () => a });
      var n = r(61268),
        o = r(89882);
      function a() {
        return (
          (0, o.useRouter)(),
          (0, n.jsxs)("div", {
            className:
              "flex flex-col items-center justify-center min-h-screen py-2",
            children: [
              (0, n.jsx)("h1", {
                className: "text-4xl font-bold",
                children: "Page Not Found",
              }),
              (0, n.jsx)("p", {
                className: "mt-3 text-xl",
                children: "Redirecting to home page...",
              }),
            ],
          })
        );
      }
      r(84205), r(58702);
    },
    58702: (e, t, r) => {
      "use strict";
      r.d(t, {
        IB: () => n,
        V8: () => s,
        XG: () => i,
        o0: () => a,
        q: () => o,
      });
      let n = ["en", "ar", "es", "fr"],
        o = "en",
        a = {
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
      function i(e) {
        return a[e] || a[o];
      }
      function s(e) {
        return "rtl" === i(e).direction;
      }
    },
    59059: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { default: () => n });
      let n = (0, r(26394).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\global-error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
        "default",
      );
    },
    59893: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 87447));
    },
    63017: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 59059));
    },
    69621: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 94745));
    },
    74619: (e) => {
      function t(e) {
        var t = Error("Cannot find module '" + e + "'");
        throw ((t.code = "MODULE_NOT_FOUND"), t);
      }
      (t.keys = () => []), (t.resolve = t), (t.id = 74619), (e.exports = t);
    },
    77032: (e, t, r) => {
      Promise.resolve().then(r.t.bind(r, 11299, 23)),
        Promise.resolve().then(r.t.bind(r, 81119, 23)),
        Promise.resolve().then(r.t.bind(r, 68259, 23)),
        Promise.resolve().then(r.t.bind(r, 36914, 23)),
        Promise.resolve().then(r.t.bind(r, 15142, 23)),
        Promise.resolve().then(r.t.bind(r, 98554, 23)),
        Promise.resolve().then(r.t.bind(r, 88424, 23)),
        Promise.resolve().then(r.t.bind(r, 64834, 23));
    },
    87113: (e, t, r) => {
      "use strict";
      r.a(e, async (e, n) => {
        try {
          r.r(t), r.d(t, { default: () => s });
          var o = r(61268);
          r(86896), r(84205);
          var a = r(28909),
            i = e([a]);
          function s({ error: e, reset: t }) {
            return (0, o.jsx)("html", {
              children: (0, o.jsx)("body", {
                children: (0, o.jsxs)("div", {
                  className:
                    "flex min-h-screen flex-col items-center justify-center p-4 text-center",
                  children: [
                    (0, o.jsx)("h1", {
                      className: "text-4xl font-bold mb-4",
                      children: "Something went wrong!",
                    }),
                    (0, o.jsx)("p", {
                      className: "text-xl mb-8",
                      children: e.message || "An unexpected error occurred",
                    }),
                    (0, o.jsxs)("div", {
                      className: "space-x-4",
                      children: [
                        (0, o.jsx)(a.$, {
                          onClick: () => t(),
                          children: "Try again",
                        }),
                        (0, o.jsx)(a.$, {
                          variant: "outline",
                          onClick: () => (window.location.href = "/"),
                          children: "Go home",
                        }),
                      ],
                    }),
                    !1,
                  ],
                }),
              }),
            });
          }
          (a = (i.then ? (await i)() : i)[0]), n();
        } catch (e) {
          n(e);
        }
      });
    },
    87447: (e, t, r) => {
      "use strict";
      r.a(e, async (e, n) => {
        try {
          r.r(t), r.d(t, { default: () => s });
          var o = r(61268);
          r(84205);
          var a = r(28909),
            i = e([a]);
          function s({ error: e, reset: t }) {
            return (0, o.jsx)("div", {
              className: "flex h-screen",
              children: (0, o.jsxs)("div", {
                className: "m-auto text-center space-y-4",
                children: [
                  (0, o.jsx)("h2", {
                    className: "text-2xl font-bold",
                    children: "Something went wrong!",
                  }),
                  (0, o.jsx)("p", {
                    className: "text-muted-foreground",
                    children: e.message,
                  }),
                  (0, o.jsx)(a.$, {
                    onClick: () => t(),
                    variant: "outline",
                    children: "Try again",
                  }),
                ],
              }),
            });
          }
          (a = (i.then ? (await i)() : i)[0]), n();
        } catch (e) {
          n(e);
        }
      });
    },
    89783: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 53974));
    },
    90184: (e, t, r) => {
      Promise.resolve().then(r.t.bind(r, 2938, 23)),
        Promise.resolve().then(r.t.bind(r, 65405, 23)),
        Promise.resolve().then(r.t.bind(r, 83573, 23)),
        Promise.resolve().then(r.t.bind(r, 35348, 23)),
        Promise.resolve().then(r.t.bind(r, 39308, 23)),
        Promise.resolve().then(r.t.bind(r, 4784, 23)),
        Promise.resolve().then(r.t.bind(r, 60830, 23)),
        Promise.resolve().then(r.t.bind(r, 84360, 23));
    },
    93206: () => {},
    94511: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 56460));
    },
    94745: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { default: () => n });
      let n = (0, r(26394).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
        "default",
      );
    },
    96708: (e) => {
      function t(e) {
        var t = Error("Cannot find module '" + e + "'");
        throw ((t.code = "MODULE_NOT_FOUND"), t);
      }
      (t.keys = () => []), (t.resolve = t), (t.id = 96708), (e.exports = t);
    },
    97927: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 51433)),
        Promise.resolve().then(r.bind(r, 59107)),
        Promise.resolve().then(r.bind(r, 39862));
    },
  });
//# sourceMappingURL=4630.js.map
