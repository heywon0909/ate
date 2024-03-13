import { ESLintUtils } from "@typescript-eslint/utils";
const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);
// Type: RuleModule<"uppercase", ...>
const rule = createRule({
    create(context) {
        return {
            ObjectPattern(node) {
                var _a;
                const name = ((_a = node.typeAnnotation) === null || _a === void 0 ? void 0 : _a.typeAnnotation).typeName.name;
                if (node.properties.length > 3 && name === "Props") {
                    context.report({
                        node,
                        messageId: "reactpropsdestructuring",
                    });
                }
            },
        };
    },
    name: "react-props-check",
    meta: {
        docs: {
            description: "react-function should be inline function which start with `handle`.",
            recommended: false,
        },
        messages: {
            reactpropsdestructuring: "react-function should be inline function which start with `handle`.",
        },
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
});
export default rule;
