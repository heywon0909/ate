module.exports = {
  create(context) {
    return {
      ObjectPattern(node) {
        const name = node.typeAnnotation.typeAnnotation.typeName.name;
        if (node.properties.length > 3 && name === "Props") {
          context.report({
            node,
            messageId: "reactPropsDestructuring",
          });
        }
      },
    };
  },
  name: "react-props-desctructuring",
  meta: {
    docs: {
      description:
        "React functional Component which have props that counts under 4 should destructure in functional Component props.",
      recommended: true,
    },
    messages: {
      reactPropsDestructuring:
        "React functional Component which have props that counts under 4 should destructure in functional Component props.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
};
