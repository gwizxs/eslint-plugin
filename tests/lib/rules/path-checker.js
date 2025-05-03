/**
 * @fileoverview fsd path checker
 * @author gwizxs
 */
"use strict";
const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;


const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  }
});
ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename: "C:/inclu/src/entities/Article",
      code: "import { addCommentFormReducer } from '../../model/slices/addCommentFormSlice'"
    }
  ],

  invalid: [
    {
      filename: "C:/inclu/src/entities/Article",
      code: "import { addCommentFormReducer } from 'entities/Article/model/slices/addCommentFormSlice'",
      errors: [{ messageId: "shouldBeRelativeMess" }]
    },
    {
      filename: "C:/inclu/src/entities/Article",
      code: "import { addCommentFormReducer } from '@/entities/Article/model/slices/addCommentFormSlice'",
      options: [{ alias: "@/" }],
      errors: [{ messageId: "shouldBeRelativeMess" }]
    }
  ]
});
