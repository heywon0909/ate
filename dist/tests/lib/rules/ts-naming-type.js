import * as mocha from "mocha";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../../../lib/rules/ts-naming-type.js";
// Set up cleanup after tests are done
RuleTester.afterAll = mocha.after;
const ruleTester = new RuleTester();
ruleTester.run("타입스크립트 네이밍:타입 정의", rule, {
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
                    messageId: "tsNamingType",
                },
            ],
        },
    ],
});
