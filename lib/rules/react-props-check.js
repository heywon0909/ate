import { ESLintUtils } from "@typescript-eslint/utils";
const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);
// Type: RuleModule<"uppercase", ...>
const rule = createRule({
    create(context) {
        return {
            VariableDeclaration(node) {
                const init = node.declarations.filter((v) => v.init)[0];
                if (init.type === "ArrowFunctionExpression") {
                    const param = init.params[0];
                    if (param.type === "ObjectPattern" && param.properties.length > 3) {
                        context.report({
                            node,
                            messageId: "reactpropscheck",
                        });
                    }
                    console.log("init", init);
                    if (init.type === "TypeAnnotation" &&
                        init.name === "props") {
                        const body = init.body.body
                            .filter((v) => v.type === "VariableDeclaration")
                            .filter((v) => v.declarations[0].id.type ===
                            "ObjectPattern" &&
                            v.declarations[0].id.properties.length < 4);
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
