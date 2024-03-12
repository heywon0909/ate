import * as mocha from "mocha";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../../../lib/rules/react-function-check.js";
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
ruleTester.run("react function check", rule, {
    // valid case has no errors
    valid: [
        {
            code: `
      const Components1 = ({title, color, size} : Props) => {
    //...
}

const Components2 = (props : Props) => {
	    const {title, color, size, fullWidth} = props;
    //...
}`,
        },
    ],
    invalid: [
        {
            code: `
      const Components1 = ({title, color, size, colorType} : Props) => {
    //...
    }
const Components2 = (props : Props) => {
	  const {title, color} = props;
    //...
}`,
            // for an invalid case we list which messageIds (or any other reported data) should be present
            errors: [
                {
                    messageId: "reactfunctioncheck",
                },
            ],
        },
    ],
});
