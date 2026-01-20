import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../api/src/presentation/graphql/schema/schema.graphql',
  documents: ['src/api/graphql/operations/**/*.graphql'],
  config: {
    scalars: {
      DateTime: 'string',
    },
  },
  generates: {
    'src/api/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    },
  },
};

export default config;
