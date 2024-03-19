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
const ts_naming_type_js_1 = __importDefault(require("../../../lib/rules/ts-naming-type.js"));
// Set up cleanup after tests are done
rule_tester_1.RuleTester.afterAll = mocha.after;
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run("타입스크립트 네이밍:타입 정의", ts_naming_type_js_1.default, {
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
