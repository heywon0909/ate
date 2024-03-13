import * as mocha from "mocha";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../../../lib/rules/react-props-destructuring.js";
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
ruleTester.run("react props destructuring", rule, {
    // valid case has no errors
    valid: [
        {
            code: `
      const Components1 = ({title, color, size} : Props) => {
};
`,
        },
    ],
    invalid: [
        {
            code: `
      const Components1 = ({title, color, size, colorType} : Props) => {
    };
`,
            // for an invalid case we list which messageIds (or any other reported data) should be present
            errors: [
                {
                    messageId: "reactpropsdestructuring",
                },
            ],
        },
    ],
});
