"use strict";

export default {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:import/recommended",
    "plugin:airbnb-base/recommended",
  ],
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
  },
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    ecmaVersion: "es2019",
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
      parser: "babel-eslint",
      parserOptions: {},
    },
  ],
  rules: {
    "node/no-extraneous-import": "1",
    "import/no-unused-modules": "1",
  },
};
