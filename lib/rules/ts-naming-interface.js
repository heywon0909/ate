module.exports = {
  create(context) {
    const startWithTname = (node) => {
      return node.id.name.startsWith("I");
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
      description: "타입스크립트 네이밍: 인터페이스는 I로 작성해야한다.",
      recommended: true,
    },
    messages: {
      tsNamingInterface: "타입스크립트 네이밍: 인터페이스는 I로 작성해야한다.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
};
