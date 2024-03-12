import { ESLintUtils } from "@typescript-eslint/utils";
const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);
// Type: RuleModule<"uppercase", ...>
const rule = createRule({
    create(context) {
        const startWithTname = (node) => {
            return node.id.name.startsWith("I");
        };
        return {
            TSInterfaceDeclaration(node) {
                if (!startWithTname(node)) {
                    context.report({
                        node,
                        messageId: "interfacecheck",
                    });
                }
            },
        };
    },
    name: "interface-check option",
    meta: {
        docs: {
            description: "Interface name should start with `I`",
            recommended: false,
        },
        messages: {
            interfacecheck: "Interface name should start with `I`",
        },
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
});
export default rule;
