import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleRecommendation } from "@typescript-eslint/utils/ts-eslint";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://www.npmjs.com/package/eslint-plugin-ate/${name}`
);

// Type: RuleModule<"uppercase", ...>
const rule = createRule({
  create(context) {
    const startWithTname = (node: any) => {
      return node.id.name.startsWith("I");
    };
    return {
      TSInterfaceDeclaration(node) {
        if (!startWithTname(node)) {
          context.report({
            node,
            messageId: "tsNamingInterface",
          });
        }
      },
    };
  },
  name: "ts-naming-interface",
  meta: {
    docs: {
      description: "타입스크립트 네이밍: 인터페이스는 I로 작성해야한다.",
      recommended: false as unknown as RuleRecommendation,
    },
    messages: {
      tsNamingInterface: "타입스크립트 네이밍: 인터페이스는 I로 작성해야한다.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
});
export default rule;
