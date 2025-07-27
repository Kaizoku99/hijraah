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
    r = new e.Error().stack;
  r &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[r] = "3b23085b-d45d-4196-91f1-16d98f71307d"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-3b23085b-d45d-4196-91f1-16d98f71307d"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 5334),
    (e.ids = [5334]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
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
      36686: (e) => {
        "use strict";
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      43581: (e, r, t) => {
        "use strict";
        let s;
        t.r(r),
          t.d(r, {
            default: () => x,
            generateImageMetadata: () => c,
            generateMetadata: () => u,
            generateViewport: () => l,
          });
        var o = t(63033),
          i = t(26394),
          n = t(60442),
          a = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\[locale]\\\\admin\\\\scraping-sources\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\admin\\scraping-sources\\page.tsx",
            "default",
          );
        let p = { ...o },
          d =
            "workUnitAsyncStorage" in p
              ? p.workUnitAsyncStorage
              : "requestAsyncStorage" in p
                ? p.requestAsyncStorage
                : void 0;
        s =
          "function" == typeof a
            ? new Proxy(a, {
                apply: (e, r, t) => {
                  let s, o, i;
                  try {
                    let e = d?.getStore();
                    (s = e?.headers.get("sentry-trace") ?? void 0),
                      (o = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return n
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/[locale]/admin/scraping-sources",
                      componentType: "Page",
                      sentryTraceHeader: s,
                      baggageHeader: o,
                      headers: i,
                    })
                    .apply(r, t);
                },
              })
            : a;
        let u = void 0,
          c = void 0,
          l = void 0,
          x = s;
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      46008: (e, r, t) => {
        "use strict";
        t.r(r),
          t.d(r, {
            GlobalError: () => i.default,
            __next_app__: () => u,
            pages: () => d,
            routeModule: () => c,
            tree: () => p,
          });
        var s = t(11610),
          o = t(51293),
          i = t(59059),
          n = t(17770),
          a = {};
        for (let e in n)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (a[e] = () => n[e]);
        t.d(r, a);
        let p = {
            children: [
              "",
              {
                children: [
                  "[locale]",
                  {
                    children: [
                      "admin",
                      {
                        children: [
                          "scraping-sources",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(t.bind(t, 43581)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\admin\\scraping-sources\\page.tsx",
                                ],
                              },
                            ],
                          },
                          {},
                        ],
                      },
                      {},
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(t.bind(t, 63249)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\layout.tsx",
                    ],
                    "not-found": [
                      () => Promise.resolve().then(t.bind(t, 47995)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\not-found.tsx",
                    ],
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(t.bind(t, 22630)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\layout.tsx",
                ],
                error: [
                  () => Promise.resolve().then(t.bind(t, 94745)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
                ],
                "global-error": [
                  () => Promise.resolve().then(t.bind(t, 59059)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(t.bind(t, 53974)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
                ],
                forbidden: [
                  () => Promise.resolve().then(t.t.bind(t, 57382, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(t.t.bind(t, 87039, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          d = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\admin\\scraping-sources\\page.tsx",
          ],
          u = { require: t, loadChunk: () => Promise.resolve() },
          c = new s.AppPageRouteModule({
            definition: {
              kind: o.RouteKind.APP_PAGE,
              page: "/[locale]/admin/scraping-sources/page",
              pathname: "/[locale]/admin/scraping-sources",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: p },
          });
      },
      46745: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 47747));
      },
      47747: (e, r, t) => {
        "use strict";
        t.r(r), t.d(r, { default: () => n });
        var s = t(61268),
          o = t(89882);
        t(84205);
        var i = t(64012);
        function n() {
          let e = (0, o.useParams)().locale || "en",
            { isAdmin: r, isLoading: t } = (0, i.h)();
          return t || !r
            ? (0, s.jsx)("div", {
                className: "p-4",
                children: "Loading or checking admin status...",
              })
            : (0, s.jsxs)("div", {
                className: "p-4",
                children: [
                  (0, s.jsx)("h1", {
                    className: "text-2xl font-bold",
                    children: "Admin: Scraping Sources Page",
                  }),
                  (0, s.jsxs)("p", {
                    children: ["Current Locale: ", e.toString()],
                  }),
                ],
              });
        }
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
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
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
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
      93945: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 43581));
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
    });
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 9729, 3390,
        4990, 6188, 7911, 7401, 5124, 7272, 3042, 385, 7393, 4486, 7018, 4763,
        7333, 7145, 9207, 4630, 8264, 27, 7935,
      ],
      () => t(46008),
    );
  module.exports = s;
})();
//# sourceMappingURL=page.js.map
