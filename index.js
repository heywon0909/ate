const allRules = require("./lib/index");
const configAll = require("./configs/all");

// for legacy config system
const plugins = ["ate"];

module.exports = {
  rules: allRules,
  configs: {
    all: Object.assign({}, configAll, {
      parserOptions: configAll.languageOptions.parserOptions,
      plugins,
    }),
  },
};
