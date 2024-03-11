import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleRecommendation } from "@typescript-eslint/utils/ts-eslint";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

// Type: RuleModule<"uppercase", ...>
const rule = createRule({
  create(context) {
    return {
      FunctionDeclaration(node) {
        if (node.id != null) {
          if (/^[a-z]/.test(node.id.name)) {
            context.report({
              messageId: "uppercase",
              node: node.id,
            });
          }
        }
      },
    };
  },
  name: "uppercase-first-declarations",
  meta: {
    docs: {
      description:
        "Function declaration names should start with an upper-case letter.",
      recommended: false as unknown as RuleRecommendation,
    },
    messages: {
      uppercase: "Start this name with an upper-case letter.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
});
export default rule;
