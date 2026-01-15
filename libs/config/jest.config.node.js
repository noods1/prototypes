/**
 * @type {import('jest')}
 */
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': [
      require.resolve('@swc/jest'),
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            jsx: true,
          },
        },
      },
    ],
  },
};
