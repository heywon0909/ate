"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha = __importStar(require("mocha"));
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const react_event_handler_js_1 = __importDefault(require("../../../lib/rules/react-event-handler.js"));
// Set up cleanup after tests are done
rule_tester_1.RuleTester.afterAll = mocha.after;
const ruleTester = new rule_tester_1.RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
});
ruleTester.run("리액트 이벤트 함수", react_event_handler_js_1.default, {
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
