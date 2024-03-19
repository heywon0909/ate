import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleRecommendation } from "@typescript-eslint/utils/ts-eslint";
import {
  Identifier,
  CallExpression,
} from "@typescript-eslint/types/dist/generated/ast-spec.js";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://www.npmjs.com/package/eslint-plugin-ate/${name}`
);

// Type: RuleModule<"uppercase", ...>
export default createRule({
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

          if (!ex_i.name || !ex_call.callee) {
            context.report({
              node: expression,
              messageId: "reactEventHandler",
            });
          }
          if (ex_i.name && !ex_i.name?.startsWith("handle")) {
            context.report({
              node: expression,
              messageId: "reactEventHandler",
            });
          }

          if (
            ex_call.callee &&
            !(ex_call.callee as Identifier).name.startsWith("handle")
          ) {
            context.report({
              node: expression,
              messageId: "reactEventHandler",
            });
          }
        }
      },
    };
  },
  name: "react-event-handler",
  meta: {
    docs: {
      description:
        "리액트 이벤트 함수는 handle로 시작해야하며, 약자 사용은 불가합니다.",
      recommended: false as unknown as RuleRecommendation,
    },
    messages: {
      reactEventHandler:
        "리액트 이벤트 함수는 handle로 시작해야하며, 약자 사용은 불가합니다.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
});
