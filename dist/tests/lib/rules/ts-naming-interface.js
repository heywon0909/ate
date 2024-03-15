import * as mocha from "mocha";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../../../lib/rules/ts-naming-interface.js";
// Set up cleanup after tests are done
RuleTester.afterAll = mocha.after;
const ruleTester = new RuleTester();
ruleTester.run("타입스크립트 네이밍:인터페이스 정의", rule, {
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
                    messageId: "tsNamingInterface",
                },
            ],
        },
    ],
});
