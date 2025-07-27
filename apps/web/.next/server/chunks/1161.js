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
    s = new e.Error().stack;
  s &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[s] = "226f58d4-969a-4b66-b056-2573e38bde84"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-226f58d4-969a-4b66-b056-2573e38bde84"));
} catch (e) {}
("use strict");
(exports.id = 1161),
  (exports.ids = [1161]),
  (exports.modules = {
    61161: (e, s, t) => {
      t.r(s),
        t.d(s, {
          author: () => u,
          bugs: () => y,
          default: () => j,
          dependencies: () => m,
          description: () => a,
          devDependencies: () => f,
          engines: () => w,
          exports: () => p,
          homepage: () => g,
          keywords: () => h,
          license: () => c,
          main: () => n,
          name: () => i,
          repository: () => b,
          scripts: () => o,
          type: () => l,
          types: () => r,
          version: () => d,
        });
      var i = "@mendable/firecrawl-js",
        d = "1.26.0",
        a = "JavaScript SDK for Firecrawl API",
        n = "dist/index.js",
        r = "dist/index.d.ts",
        p = {
          "./package.json": "./package.json",
          ".": { import: "./dist/index.js", default: "./dist/index.cjs" },
        },
        l = "module",
        o = {
          build: "tsup",
          "build-and-publish": "npm run build && npm publish --access public",
          "publish-beta":
            "npm run build && npm publish --access public --tag beta",
          test: "NODE_OPTIONS=--experimental-vm-modules jest --verbose src/__tests__/v1/**/*.test.ts",
        },
        b = {
          type: "git",
          url: "git+https://github.com/mendableai/firecrawl.git",
        },
        u = "Mendable.ai",
        c = "MIT",
        m = {
          "typescript-event-target": "^1.1.1",
          zod: "^3.23.8",
          "zod-to-json-schema": "^3.23.0",
          axios: "^1.6.8",
        },
        y = { url: "https://github.com/mendableai/firecrawl/issues" },
        g = "https://github.com/mendableai/firecrawl#readme",
        f = {
          "@jest/globals": "^29.7.0",
          "@types/axios": "^0.14.0",
          "@types/dotenv": "^8.2.0",
          "@types/jest": "^29.5.14",
          "@types/mocha": "^10.0.6",
          "@types/node": "^20.12.12",
          "@types/uuid": "^9.0.8",
          dotenv: "^16.4.5",
          jest: "^29.7.0",
          "ts-jest": "^29.2.2",
          tsup: "^8.2.4",
          typescript: "^5.4.5",
          uuid: "^9.0.1",
        },
        h = [
          "firecrawl",
          "mendable",
          "crawler",
          "web",
          "scraper",
          "api",
          "sdk",
        ],
        w = { node: ">=22.0.0" },
        j = {
          name: i,
          version: d,
          description: a,
          main: n,
          types: r,
          exports: p,
          type: l,
          scripts: o,
          repository: b,
          author: u,
          license: c,
          dependencies: m,
          bugs: y,
          homepage: g,
          devDependencies: f,
          keywords: h,
          engines: w,
        };
    },
  });
//# sourceMappingURL=1161.js.map
