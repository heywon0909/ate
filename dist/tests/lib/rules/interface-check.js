import * as mocha from "mocha";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../../../lib/rules/interface-check.js";
// Set up cleanup after tests are done
RuleTester.afterAll = mocha.after;
const ruleTester = new RuleTester();
ruleTester.run("type-check option", rule, {
    // valid case has no errors
    valid: [
        {
            code: `interface IProps{
        name:string
      }`,
        },
    ],
    invalid: [
        {
            code: `interface Props{
        name:string
      }`,
            // for an invalid case we list which messageIds (or any other reported data) should be present
            errors: [
                {
                    messageId: "interfacecheck",
                },
            ],
        },
    ],
});
