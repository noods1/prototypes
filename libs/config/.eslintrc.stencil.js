module.exports = {
  root: true,
  extends: ['plugin:@stencil-community/recommended'],
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
  ],
};
