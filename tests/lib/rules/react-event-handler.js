const rule = require("../../../lib/rules/react-event-handler.js");
const { RuleTester } = require("eslint");

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
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

                return (
                <div>
                    <div onClick={handleMove}></div>
                </div> 
                ) 
}
`,
    },
  ],
  invalid: [
    {
      code: `const MyComponent=()=>{
        const myFunc = () => {}
        const myCurry = () => () => {}
                
        return (
                <div>
                    <div onClick={() => {}}></div>
                    <div onClick={myFunc}></div>
                    <div onClick={myCurry}></div>
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
