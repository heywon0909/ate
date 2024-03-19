import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleRecommendation } from "@typescript-eslint/utils/ts-eslint";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://www.npmjs.com/package/eslint-plugin-ate/${name}`
);

// Type: RuleModule<"uppercase", ...>
export default createRule({
  create(context) {
    return {
      ArrowFunctionExpression(node) {
        const param = node.params.filter((v: any) => v.name == "props");
        // ObjectPattern 함수 추가
        const node_val = (node.body as any).body.filter(
          (v: any) => v.type === "VariableDeclaration"
        );
        const object = node_val[0].declarations.filter(
          (v: any) => v.id.type === "ObjectPattern"
        );

        if (
          param &&
          object[0].id.properties &&
          object[0].id.properties.length < 4 &&
          object[0].init.name === "props"
        ) {
          context.report({
            node,
            messageId: "reactPropsCheck",
          });
        }
      },
    };
  },
  name: "react-props-check",
  meta: {
    docs: {
      description:
        "함수형 컴포넌트의 props의 property갯수가 4개 이상인 경우 props 변수로 받아 구조분해 할당해야합니다.",
      recommended: false as unknown as RuleRecommendation,
    },
    messages: {
      reactPropsCheck:
        "함수형 컴포넌트의 props의 property갯수가 4개 이상인 경우 props 변수로 받아 구조분해 할당해야합니다.",
    },
    type: "suggestion",
    schema: [],
  },
  defaultOptions: [],
});
