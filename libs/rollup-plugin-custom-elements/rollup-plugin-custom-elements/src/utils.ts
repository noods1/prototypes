import * as t from '@babel/types';
import { OutputAsset } from 'rollup';

export interface StencilOutputAsset extends OutputAsset {
  exports?: string[];
  importedBindings?: { [key: string]: string[] };
  code?: string;
}

// 运行时转换函数的名称。
const TRANS_TAG_NAME = 'transTagName';

const STENCIL_PROXY_CUSTOMELEMENT_FN_NAME = 'proxyCustomElement';
const STENCIL_H_FUNCTION_NAME = 'h';

// 创建一个`TRANS_TAG_NAME`的执行函数。transTagName(x-[component])
function createTTNFn(node: t.Expression) {
  return t.callExpression(
    t.identifier(TRANS_TAG_NAME),
    t.isStringLiteral(node) ? [node] : [node, t.booleanLiteral(true)],
  );
}

// 创建一个`TRANS_TAG_NAME`的默认函数表达式。transTagName = transTagName || function(tagName) { return tagName }
function createDefaultTTNFn() {
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.identifier(TRANS_TAG_NAME),
      t.logicalExpression(
        '||',
        t.identifier(TRANS_TAG_NAME),
        t.functionExpression(
          null,
          [t.identifier('tagName')],
          t.blockStatement([t.returnStatement(t.identifier('tagName'))]),
        ),
      ),
    ),
  );
}

function camelToDash(str: string) {
  return str.replace(/[A-Z]/g, (match, index) => {
    if (index !== 0) {
      // 将大写字母替换为 "-[小写字母]"
      return `-${match.toLowerCase()}`;
    } else {
      // 如果是开头的大写字母，则直接转换为小写字母
      return match.toLowerCase();
    }
  });
}

function likeComponentName(str: string, components: Array<string> = []) {
  const regExp = /^([a-zA-Z][a-zA-Z0-9]*)(\$.*)?$/;
  const match = str?.match(regExp);
  if (!match?.[1]) {
    return false;
  }

  return components.includes(match[1]);
}

export {
  TRANS_TAG_NAME,
  STENCIL_PROXY_CUSTOMELEMENT_FN_NAME,
  STENCIL_H_FUNCTION_NAME,
  createTTNFn,
  createDefaultTTNFn,
  camelToDash,
  likeComponentName,
};
