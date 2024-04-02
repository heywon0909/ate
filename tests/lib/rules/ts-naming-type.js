const mocha = require("mocha");
const { RuleTester } = require("@typescript-eslint/rule-tester");
const rule = require("../../../lib/rules/ts-naming-type.js");

// Set up cleanup after tests are done
RuleTester.afterAll = mocha.after;

const ruleTester = new RuleTester();

ruleTester.run("타입스크립트 네이밍:타입 정의", rule, {
  // valid case has no errors
  valid: [
    {
      code: `type TAnimal = 'cat' | 'dog';`,
    },
    {
      code: `import '@emotion/react';

import theme from '../styles/theme';

type ExtendedTheme = typeof theme;

declare module '@emotion/react' {
    export interface Theme extends ExtendedTheme {}
}`,
    },
    {
      code: `declare module '@emotion/react' {
    export interface Theme extends ExtendedTheme {}
}
`,
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
