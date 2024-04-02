const allRules = require("../lib/rules");
const fromEntries = require("object.fromentries");

/**
 * @param {object} rules - rules object mapping rule name to rule module
 * @returns {Record<string, 2>}
 */
function configureAsError(rules) {
  return fromEntries(Object.keys(rules).map((key) => [`ate/${key}`, 2]));
}
const activeRulesConfig = configureAsError(allRules);

module.exports = {
  plugins: {
    ate: {
      rules: allRules,
    },
  },
  rules: activeRulesConfig,
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
