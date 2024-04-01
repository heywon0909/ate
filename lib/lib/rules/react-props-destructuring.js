"use strict";
module.exports = {
    create(context) {
        return {
            ArrowFunctionExpression(node) {
                // memo 되어 있을 시
                if (node.parent.type === "CallExpression" &&
                    node.parent.callee.name === "memo") {
                    const params = node.params;
                    if (params.length > 0) {
                        const findProps = params.filter((v) => {
                            if (v.typeAnnotation) {
                                return (v.typeAnnotation.typeAnnotation.typeName &&
                                    v.typeAnnotation.typeAnnotation.typeName.name === "Props");
                            }
                        });
                        if (findProps.length > 0 &&
                            Array.isArray(findProps[0].properties) &&
                            findProps[0].properties.length > 3) {
                            return context.report({
                                node,
                                messageId: "reactPropsDestructuring",
                            });
                        }
                        if (findProps.length > 0 &&
                            Array.isArray(findProps[0].properties) &&
                            findProps[0].properties.length <= 3) {
                            return;
                        }
                    }
                }
                // memo 없을 시
                else {
                    const params = node.params;
                    if (params.length > 0) {
                        const findProps = params.filter((v) => {
                            if (v.typeAnnotation) {
                                return (v.typeAnnotation.typeAnnotation.typeName &&
                                    v.typeAnnotation.typeAnnotation.typeName.name === "Props");
                            }
                        });
                        if (findProps.length > 0 &&
                            Array.isArray(findProps[0].properties) &&
                            findProps[0].properties.length > 3) {
                            context.report({
                                node,
                                messageId: "reactPropsDestructuring",
                            });
                        }
                    }
                }
            },
        };
    },
    name: "react-props-desctructuring",
    meta: {
        docs: {
            description: "React functional Component which have props that counts under 4 should destructure in functional Component props.",
            recommended: true,
        },
        messages: {
            reactPropsDestructuring: "React functional Component which have props that counts under 4 should destructure in functional Component props.",
        },
        type: "suggestion",
        schema: [],
    },
    defaultOptions: [],
};
