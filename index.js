const allRules = require("./lib/rules");
const configAll = require("./configs/all");

// for legacy config system
const plugins = ["ate"];

module.exports = {
  rules: allRules,
  configs: {
    recommended: Object.assign({}, configAll, {
      parserOptions: configAll.languageOptions.parserOptions,
      plugins,
    }),
    all: Object.assign({}, configAll, {
      parserOptions: configAll.languageOptions.parserOptions,
      plugins,
    }),
  },
};
