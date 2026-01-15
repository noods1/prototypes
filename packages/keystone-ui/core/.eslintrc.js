const path = require('path');

module.exports = {
  root: true,

  extends: ['../../../.eslintrc.js'],

  overrides: [
    // TypeScript Rule
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: path.join(__dirname, './tsconfig.json'),
      },
      extends: ['plugin:@stencil-community/recommended'],
      rules: {
        'no-unsafe-optional-chaining': 'off',
        'prefer-promise-reject-errors': 'off',

        '@stencil-community/reserved-member-names': 'warn',
        '@stencil-community/decorators-style': ['warn', { state: 'ignore' }],

        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/prefer-promise-reject-errors': 'error',
        '@typescript-eslint/no-useless-constructor': 'off',
      },
    },
  ],

  ignorePatterns: [
    // Build targets
    'dist',
    'docsreadme',
    'loader',
    'www',

    // About build scripts
    'scripts',

    '**/.eslintrc.js',

    // Configuration files
    'stencil.config.ts',
    '**/*.spec.tsx',
    'jest.setup',
  ],
};
