import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleRecommendation } from "@typescript-eslint/utils/ts-eslint";
import { Identifier } from "@typescript-eslint/types/dist/generated/ast-spec.js";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

// Type: RuleModule<"uppercase", ...>
const rule = createRule({
  create(context) {
    return {
      ArrowFunctionExpression(node) {
        const param = node.params.filter((v: any) => v.name == "props");
        // ObjectPattern 함수 추가
        const node_val = (node.body as any).body.filter(
          (v: any) => v.type === "VariableDeclaration"
        );
        const object = node_val[0].declarations.filter(
          (v: any) => v.id.type === "ObjectPattern"
        );

        if (
          param &&
          object[0].id.properties &&
          object[0].id.properties.length < 4 &&
          object[0].init.name === "props"
        ) {
          context.report({
            node,
            messageId: "reactpropscheck",
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
      reactpropscheck:
        "react-function should be inline function which start with `handle`.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
});
export default rule;
function ObjectPattern(node: unknown) {
  throw new Error("Function not implemented.");
}
