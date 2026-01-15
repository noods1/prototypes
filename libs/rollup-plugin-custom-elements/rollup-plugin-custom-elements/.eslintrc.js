module.exports = {
  root: true,
  plugins: ['prettier'],
  rules: {
    // eslint-disable-next-line
    'prettier/prettier': 'error',
  },
  extends: [require.resolve('@byted-keystone/config/.eslintrc.node.js')],
};
