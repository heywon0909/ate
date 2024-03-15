import * as mocha from "mocha";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../../../lib/rules/react-props-check.js";
// Set up cleanup after tests are done
RuleTester.afterAll = mocha.after;
const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
});
ruleTester.run("함수형 컴포넌트의 props 구조분해 할당", rule, {
    // valid case has no errors
    valid: [
        {
            code: `
      const Components1 = (props : Props) => {
 	const {title, color, size, colorType} = props   
 };
`,
        },
    ],
    invalid: [
        {
            code: `
       const Components1 = (props : Props) => {
 	const {title, color} = props   
 };
`,
            // for an invalid case we list which messageIds (or any other reported data) should be present
            errors: [
                {
                    messageId: "reactPropsCheck",
                },
            ],
        },
    ],
});
