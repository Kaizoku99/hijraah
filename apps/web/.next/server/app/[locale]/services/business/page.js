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
    (e._sentryDebugIds[r] = "7f1e4eba-088e-44d6-836a-12c4f9bf39ce"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-7f1e4eba-088e-44d6-836a-12c4f9bf39ce"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 1517),
    (e.ids = [1517]),
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
      19280: (e, r, s) => {
        Promise.resolve().then(s.bind(s, 72042));
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
      29008: (e, r, s) => {
        Promise.resolve().then(s.bind(s, 78552));
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
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
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
      66932: (e, r, s) => {
        "use strict";
        s.r(r),
          s.d(r, {
            GlobalError: () => i.default,
            __next_app__: () => d,
            pages: () => p,
            routeModule: () => c,
            tree: () => u,
          });
        var t = s(11610),
          o = s(51293),
          i = s(59059),
          n = s(17770),
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
        s.d(r, a);
        let u = {
            children: [
              "",
              {
                children: [
                  "[locale]",
                  {
                    children: [
                      "services",
                      {
                        children: [
                          "business",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(s.bind(s, 72042)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\services\\business\\page.tsx",
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
                      () => Promise.resolve().then(s.bind(s, 63249)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\layout.tsx",
                    ],
                    "not-found": [
                      () => Promise.resolve().then(s.bind(s, 47995)),
                      "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\not-found.tsx",
                    ],
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(s.bind(s, 22630)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\layout.tsx",
                ],
                error: [
                  () => Promise.resolve().then(s.bind(s, 94745)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
                ],
                "global-error": [
                  () => Promise.resolve().then(s.bind(s, 59059)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(s.bind(s, 53974)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
                ],
                forbidden: [
                  () => Promise.resolve().then(s.t.bind(s, 57382, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(s.t.bind(s, 87039, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          p = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\services\\business\\page.tsx",
          ],
          d = { require: s, loadChunk: () => Promise.resolve() },
          c = new t.AppPageRouteModule({
            definition: {
              kind: o.RouteKind.APP_PAGE,
              page: "/[locale]/services/business/page",
              pathname: "/[locale]/services/business",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: u },
          });
      },
      72042: (e, r, s) => {
        "use strict";
        let t;
        s.r(r),
          s.d(r, {
            default: () => x,
            generateImageMetadata: () => c,
            generateMetadata: () => d,
            generateViewport: () => l,
          });
        var o = s(63033),
          i = s(26394),
          n = s(60442),
          a = (0, i.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\[locale]\\\\services\\\\business\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\[locale]\\services\\business\\page.tsx",
            "default",
          );
        let u = { ...o },
          p =
            "workUnitAsyncStorage" in u
              ? u.workUnitAsyncStorage
              : "requestAsyncStorage" in u
                ? u.requestAsyncStorage
                : void 0;
        t =
          "function" == typeof a
            ? new Proxy(a, {
                apply: (e, r, s) => {
                  let t, o, i;
                  try {
                    let e = p?.getStore();
                    (t = e?.headers.get("sentry-trace") ?? void 0),
                      (o = e?.headers.get("baggage") ?? void 0),
                      (i = e?.headers);
                  } catch (e) {}
                  return n
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/[locale]/services/business",
                      componentType: "Page",
                      sentryTraceHeader: t,
                      baggageHeader: o,
                      headers: i,
                    })
                    .apply(r, s);
                },
              })
            : a;
        let d = void 0,
          c = void 0,
          l = void 0,
          x = t;
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
      78552: (e, r, s) => {
        "use strict";
        s.r(r), s.d(r, { default: () => i });
        var t = s(61268),
          o = s(89882);
        function i() {
          let e = (0, o.useParams)().locale || "en";
          return (0, t.jsxs)("div", {
            className: "p-4",
            children: [
              (0, t.jsx)("h1", {
                className: "text-2xl font-bold",
                children: "Business Immigration Page",
              }),
              (0, t.jsxs)("p", {
                children: ["Current Locale: ", e.toString()],
              }),
            ],
          });
        }
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
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
    });
  var r = require("../../../../webpack-runtime.js");
  r.C(e);
  var s = (e) => r((r.s = e)),
    t = r.X(
      0,
      [
        827, 6518, 2033, 4027, 2872, 7713, 5149, 8859, 1655, 8029, 9729, 3390,
        4990, 6188, 7911, 7401, 5124, 7272, 3042, 385, 7393, 4486, 7018, 4763,
        7333, 7145, 9207, 4630, 8264, 27, 7935,
      ],
      () => s(66932),
    );
  module.exports = t;
})();
//# sourceMappingURL=page.js.map
