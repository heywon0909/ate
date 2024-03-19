/**
 * @fileoverview This is eslint-plugin for ate-Eight
 * @author ate-Eight
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import requireIndex from "requireindex";

// 동적 import()를 사용하여 모듈 가져오기
// 동적 import()를 사용하여 모듈 가져오기

const dirUrl = new URL(".", import.meta.url);

const script = new URL("rules/index.js", dirUrl);

export const rules = await import(script).then(requireIndex);
