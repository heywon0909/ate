module.exports = {
  create(context) {
    const startWithTname = (node) => {
      return !node.id.name.includes("Props") && node.id.name.startsWith("I");
    };
    return {
      TSInterfaceDeclaration(node) {
        if (!startWithTname(node)) {
          context.report({
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
