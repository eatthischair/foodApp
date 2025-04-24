module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended', // Optional: For TypeScript support
    'plugin:prettier/recommended', // Integrates Prettier for formatting
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint', // Optional: For TypeScript support
    'prettier',
  ],
  rules: {
    'react/prop-types': 'off', // Disable prop-types (common in TypeScript projects)
    'prettier/prettier': 'error', // Treat Prettier issues as ESLint errors
    'no-console': ['warn', { allow: ['error'] }], // Warn on console.log, allow console.error
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Optional: Less strict TypeScript rule
  },
  settings: {
    react: {
      version: 'detect', // Auto-detect React version
    },
  },
};