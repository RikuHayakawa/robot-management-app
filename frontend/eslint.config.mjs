import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    ignores: ['**/cdk.out/'],
  },

  eslintConfigPrettier,

  {
    files: ['**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'],

    languageOptions: {
      parser: tsParser,
    },

    plugins: {
      import: importPlugin,
      '@typescript-eslint': tseslint,
      'unused-imports': unusedImports,
    },

    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
        },
      ],
      'prefer-arrow-callback': 'error',
    },
  },
];
