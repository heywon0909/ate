module.exports = {
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
      recommended: true,
    },
    messages: {
      tsNamingType: "타입스크립트 네이밍: 타입은 T로 작성해야한다.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
};
