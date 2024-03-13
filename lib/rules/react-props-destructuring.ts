import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleRecommendation } from "@typescript-eslint/utils/ts-eslint";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

// Type: RuleModule<"uppercase", ...>
const rule = createRule({
  create(context) {
    return {
      ObjectPattern(node) {
        const name = (node.typeAnnotation?.typeAnnotation as any).typeName.name;
        if (node.properties.length > 3 && name === "Props") {
          context.report({
            node,
            messageId: "reactpropsdestructuring",
          });
        }
      },
    };
  },
  name: "react-props-check",
  meta: {
    docs: {
      description:
        "react-function should be inline function which start with `handle`.",
      recommended: false as unknown as RuleRecommendation,
    },
    messages: {
      reactpropsdestructuring:
        "react-function should be inline function which start with `handle`.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
});
export default rule;
