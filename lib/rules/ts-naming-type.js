module.exports = {
  create(context) {
    const startWithTname = (node) => {
      console.log("node", node.id.name);
      if (node.id.name === "Story") return true;
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
      description: "This is typescript type naming about type.",
      recommended: true,
    },
    messages: {
      tsNamingType: "typescript type naming: Type should start with 'T'",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
};
