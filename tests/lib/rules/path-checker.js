/**
 * @fileoverview fsd path checker
 * @author gwizxs
 */
"use strict";
const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;


const ruleTester = new RuleTester();
ruleTester.run("path-checker", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "asf",
      errors: [{ messageId: "Fill me in.", type: "Me too" }],
    },
  ],
});
