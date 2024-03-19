"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const createRule = utils_1.ESLintUtils.RuleCreator((name) => `https://www.npmjs.com/package/eslint-plugin-ate/${name}`);
// Type: RuleModule<"uppercase", ...>
const rule = createRule({
    create(context) {
        return {
            ArrowFunctionExpression(node) {
                const param = node.params.filter((v) => v.name == "props");
                // ObjectPattern 함수 추가
                const node_val = node.body.body.filter((v) => v.type === "VariableDeclaration");
                const object = node_val[0].declarations.filter((v) => v.id.type === "ObjectPattern");
                if (param &&
                    object[0].id.properties &&
                    object[0].id.properties.length < 4 &&
                    object[0].init.name === "props") {
                    context.report({
                        node,
                        messageId: "reactPropsCheck",
                    });
                }
            },
        };
    },
    name: "react-props-check",
    meta: {
        docs: {
            description: "함수형 컴포넌트의 props의 property갯수가 4개 이상인 경우 props 변수로 받아 구조분해 할당해야합니다.",
            recommended: false,
        },
        messages: {
            reactPropsCheck: "함수형 컴포넌트의 props의 property갯수가 4개 이상인 경우 props 변수로 받아 구조분해 할당해야합니다.",
        },
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
});
exports.default = rule;
function ObjectPattern(node) {
    throw new Error("Function not implemented.");
}
