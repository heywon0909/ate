import * as mocha from "mocha";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../../../lib/rules/react-event-handler.js";
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
ruleTester.run("리액트 이벤트 함수", rule, {
    // valid case has no errors
    valid: [
        {
            code: `export default function MyComponent(){
            
            const handleMove= ()=>{}

                return (
                <div>
                    <div onClick={handleMove}></div>
                </div> 
                ) 
}`,
        },
    ],
    invalid: [
        {
            code: `export default function MyComponent(){
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
