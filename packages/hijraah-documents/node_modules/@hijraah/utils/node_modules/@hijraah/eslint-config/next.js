/** ESLint configuration for Next.js applications in Hijraah */
module.exports = {
  extends: ["./index.js", "eslint-config-next"].map(require.resolve),
  rules: {
    // Next.js specific rules
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-img-element": "warn",
  },
  env: {
    browser: true,
    node: true,
  },
};
