import { ESLintUtils } from "@typescript-eslint/utils";
const createRule = ESLintUtils.RuleCreator((name) => `https://www.npmjs.com/package/eslint-plugin-ate/${name}`);
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
                var _a;
                if (invalidExp.includes(expression.type)) {
                    const ex_i = expression;
                    const ex_call = expression;
                    if (!ex_i.name || !ex_call.callee) {
                        context.report({
                            node: expression,
                            messageId: "reactEventHandler",
                        });
                    }
                    if (ex_i.name && !((_a = ex_i.name) === null || _a === void 0 ? void 0 : _a.startsWith("handle"))) {
                        context.report({
                            node: expression,
                            messageId: "reactEventHandler",
                        });
                    }
                    if (ex_call.callee &&
                        !ex_call.callee.name.startsWith("handle")) {
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
            description: "리액트 이벤트 함수는 handle로 시작해야하며, 약자 사용은 불가합니다.",
            recommended: false,
        },
        messages: {
            reactEventHandler: "리액트 이벤트 함수는 handle로 시작해야하며, 약자 사용은 불가합니다.",
        },
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
});
export default rule;