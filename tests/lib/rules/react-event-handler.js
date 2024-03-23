const mocha = require("mocha");
const rule = require("../../../lib/rules/react-event-handler.js");
const { RuleTester } = require("@typescript-eslint/rule-tester");

// Set up cleanup after tests are done
RuleTester.afterAll = mocha.after;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run("react-event-handler", rule, {
  // valid case has no errors
  valid: [
    {
      code: `const MyComponent=()=>{

            const handleMove= ()=>{}

                return (<div>
                    <div onClick={handleMove}></div>
                    </div>)
}
`,
    },
  ],
  invalid: [
    {
      code: `const MyComponent=()=>{
        const myFunc = () => {}
        const onHandle = () => () => {}

        return (
                <div>
                    <div onClick={() => {}}></div>
                </div>
                )
}`,
      // for an invalid case we list which messageIds (or any other reported data) should be present
      errors: [
        {
          messageId: "reactEventHandler",
        },
      ],
    },
    {
      code: `const MyComponent=()=>{
        const myFunc = () => {}
        const onHandle = () => () => {}

        return (
                <div>
                   <div onClick={myFunc}></div>
                </div>
                )
}`,
      // for an invalid case we list which messageIds (or any other reported data) should be present
      errors: [
        {
          messageId: "reactEventHandler",
        },
      ],
    },
    {
      code: `const MyComponent=()=>{
        const myFunc = () => {}
        const onHandle = () => () => {}

        return (
                <div>
                 <div onClick={onHandle}></div>;
                </div>
                )
}`,
      // for an invalid case we list which messageIds (or any other reported data) should be present
      errors: [
        {
          messageId: "reactEventHandler",
        },
      ],
    },
  ],
});
