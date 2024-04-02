const allRules = require("../lib/index");
module.exports = {
  plugin: {
    ate: {
      rules: allRules,
    },
  },
  rules: allRules,
  languageOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
};

// this is so the `languageOptions` property won't be warned in the new config system
Object.defineProperty(module.exports, "languageOptions", { enumerable: false });
