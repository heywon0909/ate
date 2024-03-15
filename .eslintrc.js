"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
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
    },
  ],
  rules: {
    "node/no-extraneous-import": 0,
  },
};
