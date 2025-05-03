/**
 * @fileoverview fsd path checker
 * @author gwizxs
 */
"use strict";

const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "fsd path checker",
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [
      {
        type: "object",
        properties: {
          alias: {
            type: "string",
          },
        },
      },
    ],
    messages: {
      shouldBeRelativeMess: "Within a single slice, all paths should be relative",
    },
  },

  create(context) {
    const alias = context.options[0]?.alias || "";

    return {
      ImportDeclaration(node) {
        const importTo = alias ? node.source.value.replace(alias, "") : node.source.value;
        const fromFilename = context.getFilename();

        if (!shouldIgnoreFile(fromFilename) && shouldBeRelative(fromFilename, importTo)) {
          context.report({
            node,
            messageId: "shouldBeRelativeMess",
          });
        }
      },
    };
  },
};

function isPathRelative(p) {
  return p === "." || p.startsWith("./") || p.startsWith("../");
}

const layers = {
  entities: "entities",
  features: "features",
  widgets: "widgets",
  pages: "pages",
  shared: "shared",
  app: "app",
};

const ignoredFiles = [".test.ts", ".test.tsx", ".stories.ts", ".stories.tsx"];

function shouldIgnoreFile(filename) {
  return ignoredFiles.some((ext) => filename.endsWith(ext));
}

function shouldBeRelative(from, to) {
  if (isPathRelative(to)) {
    return false;
  }

  const toArray = to.split("/");
  const toLayer = toArray[0];
  const toSlice = toArray[1];

  if (!toLayer || !toSlice || !layers[toLayer]) {
    return false;
  }

  const normalizedPath = path.normalize(from);
  const projectFrom = normalizedPath.split("src")[1];
  if (!projectFrom) return false;

  const fromArray = projectFrom.split(path.sep);
  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if (!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }

  return fromSlice === toSlice && toLayer === fromLayer;
}
