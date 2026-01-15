/* eslint-disable */
// @ts-nocheck
import { Plugin } from 'rollup';
import generate from '@babel/generator';
import * as t from '@babel/types';
import { TRANS_TAG_NAME, createDefaultTTNFn, StencilOutputAsset } from './utils';

/*
 * 组件全部define的函数（增加 index-define.js）
 */
function createDefineAllFile(allComponentDefines: string[] = []) {
  // 1. 创建导入
  const importDeclaration = t.importDeclaration(
    allComponentDefines.map((componentDefine) =>
      t.importSpecifier(t.identifier(componentDefine), t.identifier(componentDefine)),
    ),
    t.stringLiteral('./index.js'),
  );
  // 2. 创建函数体
  const funcName = 'defineCustomElements'; // 函数名
  const paramIdentifier = TRANS_TAG_NAME; // 参数名
  const funcParam = t.identifier(paramIdentifier); // 创建标识符节点
  const funcParams = [funcParam]; // 参数列表
  // 函数体
  const funcBody = t.blockStatement([
    // 参数调整
    createDefaultTTNFn(),
    // 组件define
    ...allComponentDefines.map((componentDefine) =>
      t.expressionStatement(t.callExpression(t.identifier(componentDefine), [t.identifier(TRANS_TAG_NAME)])),
    ),
  ]);
  const funcDeclaration = t.functionDeclaration(t.identifier(funcName), funcParams, funcBody);

  // 3. 创建导出函数
  const exportDeclaration = t.exportNamedDeclaration(funcDeclaration, []);

  const program = t.program([importDeclaration, exportDeclaration]);
  const file = t.file(program);
  const { code } = generate(file);
  return {
    fileName: 'index-define.js',
    imports: ['index.js'],
    exports: [funcName],
    isDynamicEntry: false,
    isEntry: true,
    name: 'index-define',
    type: 'chunk',
    code,
  };
}

/*
 * 插件入口
 */
function outputDefineAllHelperOfStencilCustomElements(): Plugin {
  return {
    name: 'output-defineall-helper-of-stencil-custom-elements',
    // @ts-expect-error ignore
    generateBundle(options, bundle: { [key: string]: StencilOutputAsset }) {
      // 通过以下条件筛出components下的target
      if (options.format === 'es' && options.hoistTransitiveImports === false) {
        const componentDefines = (bundle['index.js']?.exports || []).filter((export$1) =>
          /^defineCustomElement/.test(export$1),
        );
        // @ts-expect-error ignore
        bundle['index-define.js'] = createDefineAllFile(componentDefines);
      }
    },
  };
}

export { outputDefineAllHelperOfStencilCustomElements };
