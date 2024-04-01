"use strict";
// const mocha = require("mocha");
// const { RuleTester } = require("@typescript-eslint/rule-tester");
// const rule = require("../../../lib/rules/react-props-check.js");
// // Set up cleanup after tests are done
// RuleTester.afterAll = mocha.after;
// const ruleTester = new RuleTester({
//   parserOptions: {
//     ecmaVersion: 2018,
//     sourceType: "module",
//     ecmaFeatures: {
//       jsx: true,
//     },
//   },
// });
// ruleTester.run("react-props-check", rule, {
//   // valid case has no errors
//   valid: [
//     {
//       code: `
//       import React from 'react';
//          interface Props{
//           title:string;
//           color:string;
//           size:string;
//           colorType:string;
//         }
//         const Components1:React.FC<Props>=(props:Props)=>{
//           const {title, color, size, colorType} = props;
//           return (<div>
//           <div>{title}</div>
//           <div>{color}</div>
//           <div>{size}</div>
//           <div>{colorType}</div>
//           </div>)
//         }`,
//     },
//     {
//       code: `
//       import React from 'react';
//          interface Props{
//           title:string;
//           color:string;
//           size:string;
//         }
//         const Components1:React.FC<Props>=({title,color,size}:Props)=>{
//           return (<div>
//           <div>{title}</div>
//           <div>{color}</div>
//           <div>{size}</div>
//           </div>)
//         }`,
//     },
//   ],
//   invalid: [
//     {
//       code: `
//       import React from 'react';
//        interface Props{
//         title:string;
//         color:string;
//        }
//        const Components1:React.FC<Props>=(props:Props) =>{
//         const {title, color} = props;
//      return (<div>
//         <div>{title}</div>
//         <div>{color}</div>
//         </div>)
//  }
// `,
//       // for an invalid case we list which messageIds (or any other reported data) should be present
//       errors: [
//         {
//           messageId: "reactPropsCheck",
//         },
//       ],
//     },
//   ],
// });
