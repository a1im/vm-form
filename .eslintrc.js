module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': [2, { props: false }],
    indent: [2, 4],
    'linebreak-style': [2],
    radix: ['error', 'as-needed'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: ['try'] },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'never', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
    'import/no-unresolved': 0, // FIXME
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    codeFrame: false,
  },
  overrides: [
    {
      files: ['*.js', '*.vue'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/extensions': 'off',
        'import/first': 'off',
        'no-unused-vars': 'off',
        'max-len': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-mixed-operators': 'off',
        'no-multi-assign': 'off',
        'no-console': 'off',
        'no-bitwise': 'off',
        'no-return-await': 'off',
        'no-return-assign': 'off',
        'consistent-return': 'off',
        'no-nested-ternary': 'off',
        'no-unused-expressions': 'off',
        'no-empty': 'off',
        'no-continue': 'off',
        'no-restricted-syntax': 'off',
        'no-useless-concat': 'off',
        'no-throw-literal': 'off',
        'func-names': 'off',
        'no-underscore-dangle': 'off',
        camelCase: {
          ignoreDestructuring: true,
        },
        // 'prefer-destructuring': {
        //   object: true,
        //   array: false,
        // },
      },
    },
  ],
};
