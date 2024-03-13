import * as mocha from "mocha";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../../../lib/rules/type-check.js";
// Set up cleanup after tests are done
RuleTester.afterAll = mocha.after;
const ruleTester = new RuleTester();
ruleTester.run("type-check option", rule, {
    // valid case has no errors
    valid: [
        {
            code: `type TAnimal = 'cat' | 'dog';`,
        },
    ],
    invalid: [
        {
            code: `type Animal = 'cat' | 'dog';`,
            // for an invalid case we list which messageIds (or any other reported data) should be present
            errors: [
                {
                    messageId: "typecheck",
                },
            ],
        },
    ],
});
