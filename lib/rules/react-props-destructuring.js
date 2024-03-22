module.exports = {
  create(context) {
    return {
      ArrowFunctionExpression(node) {
        // console.log("params", params);
        const params = node.params;
        const findProps = params.filter(
          ({ typeAnnotation }) =>
            typeAnnotation.typeAnnotation.typeName.name === "Props"
        );
        if (findProps.length > 0 && findProps[0].properties.length > 3) {
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
