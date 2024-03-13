import { ESLintUtils } from "@typescript-eslint/utils";
const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);
// Type: RuleModule<"uppercase", ...>
const rule = createRule({
    create(context) {
        const startWithTname = (node) => {
            console.log("node", node.id.name);
            return node.id.name.startsWith("T");
        };
        return {
            TSTypeAliasDeclaration(node) {
                if (!startWithTname(node)) {
                    context.report({
                        node,
                        messageId: "typecheck",
                    });
                }
            },
        };
    },
    name: "type-check option",
    meta: {
        docs: {
            description: "Type name should start with `T`",
            recommended: false,
        },
        messages: {
            typecheck: "Type name should start with `T`",
        },
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
});
export default rule;
