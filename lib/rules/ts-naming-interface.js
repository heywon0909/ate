module.exports = {
  create(context) {
    const startWithTname = (node) => {
      if (node.id.name.includes("Props")) return true;
      return node.id.name.startsWith("I");
    };
    const startsWithPropsName = (node) => {
      return node.id.name.includes("Props") && node.id.name.startsWith("I");
    };
    return {
      TSInterfaceDeclaration(node) {
        if (!startsWithPropsName(node)) {
          return context.report({
            node,
            messageId: "tsNamingInterface",
          });
        }

        if (!startWithTname(node)) {
          return context.report({
            node,
            messageId: "tsNamingInterface",
          });
        }
      },
    };
  },
  name: "ts-naming-interface",
  meta: {
    docs: {
      description: "This is typescript type naming about Interface.",
      recommended: true,
    },
    messages: {
      tsNamingInterface:
        "typescript type naming: Interface should start with 'I'",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
};
