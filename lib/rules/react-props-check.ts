import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleRecommendation } from "@typescript-eslint/utils/ts-eslint";
import {
  BaseNode,
  ArrowFunctionExpression,
  BlockStatement,
  Node,
  Identifier,
  ObjectPattern,
  ObjectExpression,
} from "@typescript-eslint/types/dist/generated/ast-spec.js";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

// Type: RuleModule<"uppercase", ...>
const rule = createRule({
  create(context) {
    return {
      VariableDeclaration(node) {
        const init = node.declarations.filter((v) => v.init)[0] as BaseNode;
        if (init.type === "ArrowFunctionExpression") {
          const param = (init as ArrowFunctionExpression).params[0];
          if (param.type === "ObjectPattern" && param.properties.length > 3) {
            context.report({
              node,
              messageId: "reactpropscheck",
            });
          }
          console.log("init", init);
          if (
            (init as any).type === "TypeAnnotation" &&
            (init as Identifier).name === "props"
          ) {
            const body = (
              (init as BlockStatement).body as unknown as BlockStatement
            ).body
              .filter((v) => v.type === "VariableDeclaration")
              .filter(
                (v) =>
                  ((v as any).declarations[0].id as any).type ===
                    "ObjectPattern" &&
                  ((v as any).declarations[0].id as any).properties.length < 4
              );
            console.log("body", body);
            if (body.length > 0) {
              context.report({
                node,
                messageId: "reactpropscheck",
              });
            }
          }
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
