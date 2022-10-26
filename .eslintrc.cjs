const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  globals: {
    ga: true,
    chrome: true,
    __DEV__: true,
  },
  // 解析 .vue 文件
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:json/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/prettier',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser', // 解析 .ts 文件
  },
  rules: {
    'no-console': isProd ? 'warn' : 'off',
    'no-debugger': isProd ? 'warn' : 'off',
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off',
  },
};
