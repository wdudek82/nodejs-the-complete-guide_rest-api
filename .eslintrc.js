module.exports = {
  extends: 'airbnb/base',
  plugins: ['babel'],
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    /* Best Practices */
    'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
        caughtErrors: 'all',
      },
    ],

    /* ECMAScript 6 */
    'arrow-body-style': 0,
    'arrow-parens': ['error', 'always'],
    'function-paren-newline': ['error', 'consistent'],
    'no-confusing-arrow': 0,

    /* Stylistic */
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'space-before-function-paren': 0,
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-underscore-dangle': 0,
    'operator-linebreak': 0,
    'implicit-arrow-linebreak': 0,
    'object-curly-newline': ['error', { consistent: true }],
  },
};
