// lib/rules/react-props-check.js

/**
 * @fileoverview test
 * @author heywon0909
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  create(context) {
    return {
      ArrowFunctionExpression(node) {
        // console.log("node", node);
        const params = node.params.filter((v) => v.name == "props");
        if (params.length > 0 && node.parent.type === "VariableDeclarator") {
          const param = params[0];
          if (param.typeAnnotation.typeAnnotation.typeName === "Props") {
            console.log("param", param);
          }
        }

        // // ObjectPattern 함수 추가
        // const node_val = node.body.body.filter(
        //   (v) => v.type === "VariableDeclaration"
        // );
        // const object =
        //   node_val[0].declarations &&
        //   node_val[0].declarations.filter((v) => v.id.type === "ObjectPattern");

        // if (
        //   param &&
        //   object[0].id.properties &&
        //   object[0].id.properties.length < 4 &&
        //   object[0].init.name === "props"
        // ) {
        //   context.report({
        //     node,
        //     messageId: "reactPropsCheck",
        //   });
        // }
      },
    };
  },
  name: "react-props-check",
  meta: {
    docs: {
      description:
        "React functional Component which have props that counts over 4 should destructure.",
      recommended: true,
    },
    messages: {
      reactPropsCheck:
        "React functional Component which have props that counts over 4 should destructure.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
};
