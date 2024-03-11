import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../../../lib/rules/type-check.js";
import Mocha from "mocha";
RuleTester.afterAll = Mocha.after;
const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2015,
    tsconfigRootDir: import.meta.url,
    project: "./tsconfig.json",
  },
});
ruleTester.run("api-enum-property-best-practices", rule, {
  // valid case has no errors
  valid: [
    {
      code: `enum MyEnum{
                ValA,
                ValB
            }

            class MyClass {
                @ApiProperty({
                    enumName: "MyEnum",
                    enum: MyEnum,
                })
                public myProperty!:MyEnum
            }`,
    },
  ],
  invalid: [
    {
      code: `enum MyEnum{
                ValA,
                ValB
            }

            class MyClass {
                @ApiProperty({
                    type: MyEnum,
                    enum: MyEnum,
                })
                public myProperty!:MyEnum
            }`,
      // for an invalid case we list which messageIds (or any other reported data) should be present
      errors: [],
    },
  ],
});
