import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleRecommendation } from "@typescript-eslint/utils/ts-eslint";
import {
  Identifier,
  CallExpression,
} from "@typescript-eslint/types/dist/generated/ast-spec.js";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

// Type: RuleModule<"uppercase", ...>
const rule = createRule({
  create(context) {
    const invalidExp = [
      "ArrowFunctionExpression",
      "FunctionExpression",
      "CallExpression",
    ];
    return {
      JSXExpressionContainer({ expression }) {
        if (invalidExp.includes(expression.type)) {
          const ex_i = expression as unknown as Identifier;
          const ex_call = expression as unknown as CallExpression;
          console.log("ex_I", ex_i.name);
          console.log("ex_call", ex_call.callee);
          if (!ex_i.name || !ex_call.callee) {
            context.report({
              node: expression,
              messageId: "reactfunctioncheck",
            });
          }
          if (ex_i.name && !ex_i.name?.startsWith("handle")) {
            context.report({
              node: expression,
              messageId: "reactfunctioncheck",
            });
          }

          if (
            ex_call.callee &&
            !(ex_call.callee as Identifier).name.startsWith("handle")
          ) {
            context.report({
              node: expression,
              messageId: "reactfunctioncheck",
            });
          }
        }
      },
    };
  },
  name: "react-function-check",
  meta: {
    docs: {
      description:
        "react-function should be inline function which start with `handle`.",
      recommended: false as unknown as RuleRecommendation,
    },
    messages: {
      reactfunctioncheck:
        "react-function should be inline function which start with `handle`.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
});
export default rule;
