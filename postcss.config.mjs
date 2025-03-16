const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          'postcss-preset-env': {
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
            features: {
              'custom-properties': false,
              'nesting-rules': true,
            },
          },
          'postcss-discard-duplicates': {},
          'postcss-merge-rules': {},
          cssnano: {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
                discardDuplicates: true,
                discardEmpty: true,
                reduceIdents: false,
                minifyFontValues: true,
                normalizeWhitespace: true,
              },
            ],
          },
        }
      : {}),
  },
};

export default config;