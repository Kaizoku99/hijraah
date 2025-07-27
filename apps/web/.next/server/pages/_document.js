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
    (e._sentryDebugIds[r] = "07739d9b-24a4-4eaf-bcb9-9f18f755660c"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-07739d9b-24a4-4eaf-bcb9-9f18f755660c"));
} catch (e) {}
("use strict");
(() => {
  var e = {};
  (e.id = 3220),
    (e.ids = [3220]),
    (e.modules = {
      8732: (e) => {
        e.exports = require("react/jsx-runtime");
      },
      33873: (e) => {
        e.exports = require("path");
      },
      40361: (e) => {
        e.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");
      },
      56472: (e) => {
        e.exports = require("@opentelemetry/api");
      },
      82015: (e) => {
        e.exports = require("react");
      },
    });
  var r = require("../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [584], () => t(68203));
  module.exports = s;
})();
//# sourceMappingURL=_document.js.map
