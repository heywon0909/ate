import { ESLintUtils } from "@typescript-eslint/utils";
const createRule = ESLintUtils.RuleCreator((name) => `https://www.npmjs.com/package/eslint-plugin-ate/rule/${name}`);
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
                        messageId: "tsNamingType",
                    });
                }
            },
        };
    },
    name: "ts-naming-type",
    meta: {
        docs: {
            description: "타입스크립트 네이밍: 타입은 T로 작성해야한다.",
            recommended: false,
        },
        messages: {
            tsNamingType: "타입스크립트 네이밍: 타입은 T로 작성해야한다.",
        },
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
});
export default rule;
