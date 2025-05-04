/**
 * @fileoverview Проверка правильности импортов между слоями FSD архитектуры
 * @author Bilal
 */
"use strict";

const path = require('path');
// eslint-disable-next-line n/no-unpublished-require
const micromatch = require('micromatch');

// Вспомогательная функция для проверки относительного пути
function isPathRelative(p) {
  return p === "." || p.startsWith("./") || p.startsWith("../");
}

module.exports = {
  meta: {
    type: "problem", // Исправлено с null на "problem"
    docs: {
      description: "Проверка правильности импортов между слоями FSD архитектуры",
      category: "FSD",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
          ignoreImportPatterns: {
            type: 'array',
          }
        },
      }
    ],
    messages: {
      invalidLayerImport: 'Слой может импортировать в себя только нижележащие слои (shared, entities, features, widgets, pages, app)'
    }
  },

  create(context) {
    const layers = {
      'app': ['pages', 'widgets', 'features', 'shared', 'entities'],
      'pages': ['widgets', 'features', 'shared', 'entities'],
      'widgets': ['features', 'shared', 'entities'],
      'features': ['shared', 'entities'],
      'entities': ['shared', 'entities'],
      'shared': ['shared'],
    }

    const availableLayers = {
      'app': 'app',
      'entities': 'entities',
      'features': 'features',
      'shared': 'shared',
      'pages': 'pages',
      'widgets': 'widgets',
    }

    const {alias = '', ignoreImportPatterns = []} = context.options[0] ?? {};

    const getCurrentFileLayer = () => {
      const currentFilePath = context.getFilename();

      const normalizedPath = path.toNamespacedPath(currentFilePath);
      const projectPath = normalizedPath?.split('src')[1];
      const segments = projectPath?.split('\\')

      return segments?.[1];
    }

    const getImportLayer = (value) => {
      const importPath = alias ? value.replace(`${alias}/`, '') : value;
      const segments = importPath?.split('/')

      return segments?.[0]
    }

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value
        const currentFileLayer = getCurrentFileLayer()
        const importLayer = getImportLayer(importPath)

        if(isPathRelative(importPath)) {
          return;
        }

        if(!availableLayers[importLayer] || !availableLayers[currentFileLayer]) {
          return;
        }

        const isIgnored = ignoreImportPatterns.some(pattern => {
          return micromatch.isMatch(importPath, pattern)
        });

        if(isIgnored) {
          return;
        }

        if(!layers[currentFileLayer]?.includes(importLayer)) {
          context.report({
            node,
            messageId: 'invalidLayerImport'
          });
        }
      }
    };
  },
};