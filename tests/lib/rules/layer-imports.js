/**
 * @fileoverview Тесты для правила layer-imports
 * @author Bilal
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/layer-imports"),
    RuleTester = require("eslint").RuleTester;

const aliasOptions = [
  {
    alias: '@'
  }
];

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  }
});

ruleTester.run("layer-imports", rule, {
  valid: [
    {
      filename: 'C:\\inclu\\src\\features\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",
      options: aliasOptions,
    },
    {
      filename: 'C:\\inclu\\src\\features\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      options: aliasOptions,
    },
    {
      filename: 'C:\\inclu\\src\\app\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
      options: aliasOptions,
    },
    {
      filename: 'C:\\inclu\\src\\widgets\\pages',
      code: "import { useLocation } from 'react-router-dom'",
      options: aliasOptions,
    },
    {
      filename: 'C:\\inclu\\src\\app\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'redux'",
      options: aliasOptions,
    },
    {
      filename: 'C:\\inclu\\src\\index.tsx',
      code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
      options: aliasOptions,
    },
    {
      filename: 'C:\\inclu\\src\\entities\\Article.tsx',
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      options: [
        {
          alias: '@',
          ignoreImportPatterns: ['**/StoreProvider']
        }
      ],
    },
  ],

  invalid: [
    {
      filename: 'C:\\inclu\\src\\entities\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Articl'",
      errors: [{ messageId: "invalidLayerImport" }],
      options: aliasOptions,
    },
    {
      filename: 'C:\\inclu\\src\\features\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
      errors: [{ messageId: "invalidLayerImport" }],
      options: aliasOptions,
    },
    {
      filename: 'C:\\inclu\\src\\entities\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
      errors: [{ messageId: "invalidLayerImport" }],
      options: aliasOptions,
    },
  ],
});