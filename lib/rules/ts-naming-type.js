module.exports = {
  create(context) {
    const isExportModule = (name) => {
      // 외부 모듈인지 check
      let exportsArr = ["theme"];
      return exportsArr.includes(name);
    };
    const startWithTname = (node) => {
      if (node.id.name === "Story") return true;
      return node.id.name.startsWith("T");
    };
    return {
      TSTypeAliasDeclaration(node) {
        if (node.typeAnnotation.exprName && node.typeAnnotation.exprName.name) {
          if (isExportModule(node.typeAnnotation.exprName.name)) return;
        }
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
