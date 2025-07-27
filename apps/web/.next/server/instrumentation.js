const CHUNK_PUBLIC_PATH = "server/instrumentation.js";
const runtime = require("./chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/sentry_server_config_ts_a56b8e42._.js");
runtime.loadChunk(
  "server/chunks/apps_web_src_instrumentation_ts_ca0e7495._.js",
);
runtime.getOrInstantiateRuntimeModule(
  "[project]/apps/web/src/instrumentation.ts [instrumentation-edge] (ecmascript)",
  CHUNK_PUBLIC_PATH,
);
module.exports = runtime.getOrInstantiateRuntimeModule(
  "[project]/apps/web/src/instrumentation.ts [instrumentation-edge] (ecmascript)",
  CHUNK_PUBLIC_PATH,
).exports;
