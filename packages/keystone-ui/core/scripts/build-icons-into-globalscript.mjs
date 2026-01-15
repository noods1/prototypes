/**
 * The purpose of this script is to statically analyze all the
 * used icons and generate `src/globalscript/load-icons.ts`.
 */
import fs from 'node:fs';
import ts from 'typescript';
import path from 'node:path';
import { uniq, camelCase } from 'lodash-es';

const ICON_PREFIX = 'ks-icon';
const IGNORE_DIRS = ['__tests__', '__test__'];

const COMPONENTS_DIR_PATH = path.resolve('src/components');
const GLOBALSCRIPT_DIR_PATH = path.resolve('src/globalscript');

function parseIconTagNames(root) {
  const tagNames = [];

  function traverse(node) {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const openingElement = ts.isJsxElement(node) ? node.openingElement : node;
      if (ts.isIdentifier(openingElement.tagName)) tagNames.push(openingElement.tagName.text);
    }

    ts.forEachChild(node, traverse);
  }

  traverse(root);

  return tagNames;
}

function generateLoadIconFile(icons) {
  const content = [];

  const defineIconMethods = icons.map((icon) => camelCase(`define-custom-element-${icon}`));

  content.push('/** Code auto generated. DO NOT EDIT. */');
  content.push(`import { ${defineIconMethods.join(',')} } from '@fe-infra/keystone-icons/components';`);
  content.push('');
  content.push(`export default function () {`);
  content.push(...defineIconMethods.map((method) => `  ${method}();`));
  content.push('}');

  return content.join('\n');
}

(() => {
  function shouldParse(file) {
    const ignoreRegex = new RegExp(`(${IGNORE_DIRS.join('|')})`, 'g');
    return file.endsWith('.tsx') && !ignoreRegex.test(file);
  }

  const iconTagNames = fs
    .readdirSync(COMPONENTS_DIR_PATH)
    .map((dir) => {
      const dirPath = path.join(COMPONENTS_DIR_PATH, dir);

      const stats = fs.statSync(dirPath);
      if (!stats.isDirectory()) return [];

      const tsxFiles = fs.readdirSync(dirPath, { recursive: true }).filter(shouldParse);

      return tsxFiles.reduce((pre, cur) => {
        const tsxFilePath = path.join(dirPath, cur);
        const sourceFile = ts.createSourceFile(
          cur,
          fs.readFileSync(tsxFilePath, 'utf8'),
          ts.ScriptTarget.Latest,
          true,
          ts.ScriptKind.TSX,
        );

        return pre.concat(parseIconTagNames(sourceFile));
      }, []);
    })
    .flat()
    .filter((name) => name.startsWith(ICON_PREFIX))
    .sort((a, b) => a.length - b.length);
  const uniqIconTagNames = uniq(iconTagNames);

  const loadIconsFilePath = path.join(GLOBALSCRIPT_DIR_PATH, 'load-icons.ts');
  fs.writeFileSync(loadIconsFilePath, generateLoadIconFile(uniqIconTagNames));
})();
