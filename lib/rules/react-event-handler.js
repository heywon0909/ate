// lib/rules/react-event-handler.js

/**
 * @fileoverview test
 * @author heywon0909
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */

module.exports = {
  create(context) {
    const invalidExp = [
      "ArrowFunctionExpression",
      "FunctionExpression",
      "CallExpression",
    ];
    return {
      JSXExpressionContainer({ expression }) {
        if (invalidExp.includes(expression.type)) {
          const ex = expression;

          if (!ex.name || !ex.callee) {
            context.report({
              node: expression,
              messageId: "reactEventHandler",
            });
          }
          if (ex.name && !ex.name?.startsWith("handle")) {
            context.report({
              node: expression,
              messageId: "reactEventHandler",
            });
          }

          if (ex.callee && !ex.callee.name.startsWith("handle")) {
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
      recommended: true,
    },
    messages: {
      reactEventHandler:
        "리액트 이벤트 함수는 handle로 시작해야하며, 약자 사용은 불가합니다.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
};
