module.exports = {
  create(context) {
    const startWithTname = (node) => {
      if (node.id.name.includes("Props")) return true;
      return node.id.name.startsWith("I");
    };
    const startsWithPropsName = (node) => {
      return node.id.name.includes("Props") && node.id.name.startsWith("I");
    };
    const createObject = new Map();

    return {
      ArrowFunctionExpression(node) {
        if (node.async) {
          createObject.set(node, false);

          return;
        }
      },
      TSInterfaceDeclaration(node) {
        if (startsWithPropsName(node)) {
          createObject.set(node, true);
          return;
          // return context.report({
          //   node,
          //   messageId: "tsNamingInterface",
          // });
        }

        if (!startWithTname(node)) {
          createObject.set(node, true);
          return;
          // return context.report({
          //   node,
          //   messageId: "tsNamingInterface",
          // });
        }
      },
      "Program:exit"() {
        if (!createObject) return;
        if (createObject) {
          let count = 0;
          let createNode = null;
          for (const obj of createObject) {
            const [key, value] = obj;
            createNode = key;

            if (value) {
              count++;
            }
          }

          if (count === createObject.size && count > 0) {
            return context.report({
              node: createNode,
              messageId: "tsNamingInterface",
            });
          }
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
