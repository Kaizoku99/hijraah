import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'graphql/schema/schema.graphql',
  documents: ['app/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    './graphql/generated/': {
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false
      },
      config: {
        scalars: {
          DateTime: 'string',
          Date: 'string',
          JSON: 'Record<string, any>',
          Upload: 'File'
        },
        withHooks: true,
        withRefetchFn: true,
        dedupeFragments: true,
        skipTypename: false,
        enumsAsTypes: true
      }
    }
  }
};

export default config;