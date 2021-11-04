module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/extensions': 0,
    'lines-between-class-members': 0,
    'no-unused-vars': ['error', {
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_',
    }],
    'no-underscore-dangle': 'off',
    'func-names': ['error', 'never'],
    'linebreak-style': 0,
  },
  extends: 'airbnb-base',
};
