const mocha = require("mocha");
const { RuleTester } = require("@typescript-eslint/rule-tester");
const rule = require("../../../lib/rules/ts-naming-interface.js");

// Set up cleanup after tests are done
RuleTester.afterAll = mocha.after;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run("typescript interface definition", rule, {
  // valid case has no errors
  valid: [
    {
      code: `interface IUserInfo{
        name:string
      }`,
    },
  ],
  invalid: [
    {
      code: `interface UserInfo{
        name:string
      }`,
      // for an invalid case we list which messageIds (or any other reported data) should be present
      errors: [
        {
          messageId: "tsNamingInterface",
        },
      ],
    },
    {
      code: `
         interface Props {
          foo: string;
        }
        const Hello = ({foo}: Props) => {
            return <div>Hello {foo}</div>;
        };`,
      // for an invalid case we list which messageIds (or any other reported data) should be present
      errors: [
        {
          messageId: "tsNamingInterface",
        },
      ],
    },
  ],
});
