import { ESLintUtils } from "@typescript-eslint/utils";
const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);
// Type: RuleModule<"uppercase", ...>
const rule = createRule({
    create(context) {
        return {
            ArrowFunctionExpression(node) {
                const param = node.params.filter((v) => v.name == "props");
                console.log("param", param[0]);
                // ObjectPattern 함수 추가
                const node_val = node.body.body.filter((v) => v.type === "VariableDeclaration");
                const object = node_val[0].declarations.filter((v) => v.id.type === "ObjectPattern");
                console.log("object", object[0]);
                if (object[0].id.properties &&
                    object[0].id.properties.length < 4 &&
                    object[0].init.name === "props") {
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
            description: "react-function should be inline function which start with `handle`.",
            recommended: false,
        },
        messages: {
            reactpropscheck: "react-function should be inline function which start with `handle`.",
        },
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
});
export default rule;
function ObjectPattern(node) {
    throw new Error("Function not implemented.");
}
