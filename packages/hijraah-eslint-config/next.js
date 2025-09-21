module.exports = {
  extends: [
    './index.js',
    'next/core-web-vitals',
    'next/typescript'
  ],
  rules: {
    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': 'off'
  }
};
