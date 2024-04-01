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
      "Identifier",
    ];
    const checkEventHandler = (type) =>
      [
        "onClick",
        "onChange",
        "onKeyDown",
        "onKeyPress",
        "onKeyUp",
        "onFocus",
        "onBlur",
        "onInput",
        "onReset",
        "onSubmit",
      ].includes(type);
    return {
      JSXExpressionContainer({ expression }) {
        const parent = expression.parent || null;
        const realParent = parent.parent || null;
        const name = realParent.name || null;
        const realName = name == null ? null : name.name;

        if (realName != null) {
          if (checkEventHandler(expression.parent.parent.name.name)) {
            if (
              expression.name == null &&
              expression.type === "ArrowFunctionExpression"
            ) {
              return context.report({
                node: expression,
                messageId: "reactEventHandler",
              });
            }
            const exName = expression.name;

            if (exName && !exName.startsWith("handle")) {
              return context.report({
                node: expression,
                messageId: "reactEventHandler",
              });
            }
          }
        }
      },
    };
  },
  name: "react-event-handler",
  meta: {
    docs: {
      description:
        "React event handler must start with `handle`,abbreviation denied.",
      recommended: true,
    },
    messages: {
      reactEventHandler:
        "React event handler must start with `handle`,abbreviation denied.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
};
