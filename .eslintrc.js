"use strict";

export default {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:import/recommended",
    "plugin:airbnb-base/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-esliint", "babel-eslint"],
  env: {
    node: true,
    es2020: true,
    broswer: true,
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ["tests/**/*.js", "tests/**/*.ts"],
      env: { mocha: true },
      // parser: "babel-eslint",
      // parserOptions: {
      //   ecmaVersion: 2020,
      //   ecmaFeatures: {
      //     jsx: true,
      //   },
      //   jsxPragma: null,
      //   presets: ["@babel/preset-react", "@babel/preset-typescript"],
      // },
    },
  ],
  rules: {
    "node/no-extraneous-import": "1",
    "import/no-unused-modules": "1",
  },
};
