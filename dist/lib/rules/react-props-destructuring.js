import { ESLintUtils } from "@typescript-eslint/utils";
const createRule = ESLintUtils.RuleCreator((name) => `https://www.npmjs.com/package/eslint-plugin-ate/${name}`);
// Type: RuleModule<"uppercase", ...>
const rule = createRule({
    create(context) {
        return {
            ObjectPattern(node) {
                const name = node.typeAnnotation?.typeAnnotation.typeName.name;
                if (node.properties.length > 3 && name === "Props") {
                    context.report({
                        node,
                        messageId: "reactPropsDestructuring",
                    });
                }
            },
        };
    },
    name: "react-props-desctructuring",
    meta: {
        docs: {
            description: "함수형 컴포넌트의 props의 property갯수가 3개 이하인 경우 함수형 컴포넌트 parameter에서 구조분해 할당해야 합니다.",
            recommended: false,
        },
        messages: {
            reactPropsDestructuring: "함수형 컴포넌트의 props의 property갯수가 3개 이하인 경우 함수형 컴포넌트 parameter에서 구조분해 할당해야 합니다.",
        },
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
});
export default rule;
