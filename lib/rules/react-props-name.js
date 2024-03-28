module.exports = {
  create(context) {
    return {
      ArrowFunctionExpression(node) {
        // memo 되어 있을 시

        if (
          node.parent.type === "CallExpression" &&
          node.parent.callee.name === "memo"
        ) {
          const params = node.params;
          if (params.length > 0) {
            const findProps = params.filter((v) => {
              if (v.typeAnnotation) {
                return (
                  v.typeAnnotation.typeAnnotation.typeName &&
                  v.typeAnnotation.typeAnnotation.typeName.name === "Props"
                );
              }
            });
            if (findProps.length > 0) return;
            if (findProps.length === 0) {
              return context.report({
                node,
                messageId: "reactPropsName",
              });
            }
          }
          return;
        }
      },
      VariableDeclarator(node) {
        if (
          node.init &&
          node.init.type === "ArrowFunctionExpression" &&
          node.parent.parent.type === "Program"
        ) {
          if (node.parent && node.parent.type === "VariableDeclaration") {
            const params = node.init.params;
            if (params.length > 0) {
              const findProps = params.filter((v) => {
                if (v.typeAnnotation) {
                  return (
                    v.typeAnnotation.typeAnnotation.typeName &&
                    v.typeAnnotation.typeAnnotation.typeName.name === "Props"
                  );
                }
              });
              if (findProps.length > 0) return;
              if (findProps.length === 0) {
                return context.report({
                  node,
                  messageId: "reactPropsName",
                });
              }
            }
          }
        }
      },
    };
  },
  name: "react-props-name",
  meta: {
    docs: {
      description:
        "React functional Component which have props that should name `Props`",
      recommended: true,
    },
    messages: {
      reactPropsName:
        "React functional Component which have props that should name `Props`",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
};
