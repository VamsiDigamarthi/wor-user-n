import globals from "globals";

/** @type {import('eslint').Linter.Config} */
export default {
  // Define the environments
  env: {
    browser: true, // Enable browser global variables (window, document, etc.)
    es2021: true, // Support ECMAScript 2021 features
  },

  // Apply the configuration to specific file patterns
  files: ["**/*.{js,mjs,cjs,jsx}"],

  // Specify the language options, including global variables
  languageOptions: {
    globals: globals.browser, // Include browser-specific global variables
  },

  // Extend recommended ESLint and React rules
  extends: [
    "eslint:recommended", // Basic recommended ESLint rules
    "plugin:react/recommended", // React recommended linting rules
  ],

  // Plugins
  plugins: [
    "react", // React plugin to lint JSX and React-specific syntax
  ],

  // Parser options for ECMAScript 2021
  parserOptions: {
    ecmaVersion: 12, // Latest ECMAScript version
    sourceType: "module", // Enable ECMAScript modules (import/export)
    ecmaFeatures: {
      jsx: true, // Enable JSX syntax support
    },
  },

  // Custom rules for the project
  rules: {
    "react/react-in-jsx-scope": "off", // Disable rule to import React in scope for React 17+
    "no-unused-vars": "warn", // Warn about unused variables instead of erroring
    "no-console": "off", // Allow console statements (can be changed as needed)
  },

  // React settings
  settings: {
    react: {
      version: "detect", // Automatically detect the React version for linting
    },
  },
};
