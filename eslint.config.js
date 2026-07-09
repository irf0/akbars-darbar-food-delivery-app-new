// eslint.config.js
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  ...expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['node_modules/', '.expo/', 'dist/', 'build/', 'functions-v2/lib/'],
  },
  {
    rules: {
      'react-hooks/exhaustive-deps': 'warn',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-unused-vars': 'error',
    },
  },
];
