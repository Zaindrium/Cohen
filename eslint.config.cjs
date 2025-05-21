const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const globals = require('globals');
const prettierPlugin = require('eslint-plugin-prettier');
const promisePlugin = require('eslint-plugin-promise'); // Assuming this is okay
const reactPlugin = require('eslint-plugin-react');

// Mimic __dirname for ES modules if not available (though this is a .cjs file, so it should be)
const path = require('path');
const dirname = __dirname; // In CommonJS, __dirname is available

const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: js.configs.recommended,
  // resolvePluginsRelativeTo: dirname, // This might be needed for some plugins
});

module.exports = [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      // Add other ignores here
    ],
  },
  // ESLint recommended rules
  js.configs.recommended,

  // React plugin configuration
  // Using FlatCompat because eslint-plugin-react still primarily uses eslintrc format for its shared configs
  ...compat.extends('plugin:react/recommended', 'plugin:react/jsx-runtime'),

  // Promise plugin configuration
  ...compat.extends('plugin:promise/recommended'),

  // Prettier plugin configuration (must be last to override other formatting rules)
  {
    plugins: {
      prettier: prettierPlugin,
      // react: reactPlugin, // reactPlugin is used via compat.extends for now
    },
    rules: {
      'prettier/prettier': 'error',
      'react/prop-types': 'off', // Often managed by TypeScript or explicit validation, can be noisy
    },
  },

  // Global and language options for most of the project
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'], // Ensure ESLint targets these files
    plugins: {
      // react: reactPlugin, // Already included via compat.extends for rules, but can be listed if directly using its processors/etc.
      promise: promisePlugin, // Listing it here if we want to configure specific rules from it not in 'recommended'
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      // 'no-console': 'warn',
    },
  },

  // Specific overrides for Firebase Functions (if they are CommonJS)
  {
    files: ['src/firebaseFunctions/**.js'], // Adjust as necessary
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
];
