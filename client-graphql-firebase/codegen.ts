import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../server/schema.graphql',
  documents: ['src/graphql/queries.ts'],
  config: { skipTypename: true },
  generates: {
    './src/generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
      },
    },
  },
};

export default config;
