/* eslint-disable */
// @ts-nocheck
import { Plugin } from 'rollup';
import * as parser from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import {
  TRANS_TAG_NAME,
  createTTNFn,
  createDefaultTTNFn,
  camelToDash,
  STENCIL_PROXY_CUSTOMELEMENT_FN_NAME,
  STENCIL_H_FUNCTION_NAME,
  StencilOutputAsset,
} from './utils';

interface TransDefineFunctionComponent {
  componentName?: string;
  className?: string;
}
interface StencilTransTagNameOfStencilCustomElementsOptions {
  transDefineFunctionComponents?: Array<TransDefineFunctionComponent>;
}

/*
 * 组件transTagName转换方法
 */
function wrapComponentTransTagName(
  code: string,
  components: Array<string> = [],
  transDefineFunctionComponent: TransDefineFunctionComponent = {},
) {
  const tags = components.map((componentName) => camelToDash(componentName));
  const ast = parser.parse(code, {
    sourceType: 'module',
  });

  // web component tag name
  let tagName = null;
  /**
   * 包装函数的ast node。
   */
  let proxyWrapfunctionExpression: t.FunctionExpression = null;
  /**
   * 组件的入口define函数名。
   */
  let defineFunctionExpression: string = null;
  /**
   * - 原proxyComponent函数执行的赋值变量名 `XButton$1` = proxyCustomElement(...);
   * - 同时可以通过这个字段来判断是否修改了类的包装函数
   */
  let proxyCustomElementName: string = null;
  /**
   * 新proxyComponent函数执行的赋值变量名 `innerXButton$1` = proxyCustomElement(...);
   * 用来作为proxyWrapfunctionExpression函数的返回值用。
   */
  let newProxyCustomElementName: string = null;
  /**
   * 收集 FunctionalComponent 的变量名
   */
  const functionalComponents: Set<string> = new Set();

  // 识别 FunctionalComponent - 寻找箭头函数形式的组件定义和 import 的 PascalCase 变量
  traverse(ast, {
    // 检测 import 语句中的 PascalCase 变量
    ImportDeclaration(path) {
      const { node } = path;
      if (node.specifiers) {
        node.specifiers.forEach((specifier) => {
          if (
            specifier.type === 'ImportSpecifier' &&
            specifier.imported?.type === 'Identifier' &&
            specifier.local?.type === 'Identifier'
          ) {
            const importedName = specifier.imported.name;
            const localName = specifier.local.name;

            // 检查是否是 PascalCase 的变量（大写字母开头）并排除 Fragment
            if ((/^[A-Z]/.test(importedName) || /^[A-Z]/.test(localName)) && localName !== 'Fragment') {
              // 将 import 的 PascalCase 变量也认定为 FunctionalComponent
              functionalComponents.add(localName);
            }
          } else if (specifier.type === 'ImportDefaultSpecifier' && specifier.local?.type === 'Identifier') {
            const localName = specifier.local.name;
            // 检查默认导入的变量名是否是 PascalCase 并排除 Fragment
            if (/^[A-Z]/.test(localName) && localName !== 'Fragment') {
              functionalComponents.add(localName);
            }
          }
        });
      }
    },
    VariableDeclaration(path) {
      const { node } = path;
      if (node.declarations?.length === 1) {
        const declarator = node.declarations[0];
        if (
          declarator.type === 'VariableDeclarator' &&
          declarator.id?.type === 'Identifier' &&
          declarator.init?.type === 'ArrowFunctionExpression'
        ) {
          const funcName = declarator.id.name;
          const arrowFunc = declarator.init;

          // 检查是否是 JSX 组件模式 - 必须为大写字母开头，返回 h(...) 调用
          if (/^[A-Z]/.test(funcName)) {
            let isComponent = false;

            // 检查直接返回 h(...) 调用的情况
            if (
              arrowFunc.body?.type === 'CallExpression' &&
              arrowFunc.body.callee?.type === 'Identifier' &&
              arrowFunc.body.callee.name === 'h'
            ) {
              isComponent = true;
            }

            // 检查有函数体且返回 h(...) 调用的情况
            if (
              arrowFunc.body?.type === 'BlockStatement' &&
              arrowFunc.body.body?.some(
                (stmt) =>
                  stmt.type === 'ReturnStatement' &&
                  stmt.argument?.type === 'CallExpression' &&
                  stmt.argument.callee?.type === 'Identifier' &&
                  stmt.argument.callee.name === 'h',
              )
            ) {
              isComponent = true;
            }

            if (isComponent && funcName !== 'Fragment') {
              // 这是一个 FunctionalComponent
              functionalComponents.add(funcName);
            }
          }
        }
      }
    },
  });

  // 包装proxyCustomElement，以保证将define函数的`transTagName`函数可被传入到proxyCustomElement变量作用域中。
  traverse(ast, {
    VariableDeclaration(path) {
      const { node } = path;
      // 下面条件命中 STENCIL_PROXY_CUSTOMELEMENT_FN_NAME(proxyCustomElement) 函数块，处理包装函数
      if (
        node.declarations?.[0].type === 'VariableDeclarator' &&
        node.declarations?.[0]?.init?.type === 'CallExpression' &&
        (node.declarations?.[0]?.init?.callee as t.V8IntrinsicIdentifier)?.name ===
          STENCIL_PROXY_CUSTOMELEMENT_FN_NAME &&
        tags.includes(
          ((node.declarations?.[0]?.init?.arguments?.[1] as t.ArrayExpression)?.elements?.[1] as t.StringLiteral)
            ?.value,
        )
      ) {
        proxyCustomElementName = (node.declarations[0].id as t.Identifier).name;
        const proxyCustomElementInit = node.declarations[0].init;
        newProxyCustomElementName = `inner${proxyCustomElementName}`;
        // 获取proxyCustomElement的2个实参，1、web component class；2、stencil component compactMeta
        const wcCstr = proxyCustomElementInit.arguments[0];
        const compactMeta = proxyCustomElementInit.arguments[1];

        // 修改 class 内部对 FunctionalComponent 的调用 - 稍后在主遍历中处理

        // 处理 compactMeta 第二个参数（也就是组件名）
        if (compactMeta.type === 'ArrayExpression' && compactMeta.elements?.length >= 2) {
          tagName = compactMeta.elements[1];
          compactMeta.elements[1] = createTTNFn(t.stringLiteral((compactMeta.elements[1] as t.StringLiteral)?.value));
        }
        // 删除原来的 @__PURE__
        delete proxyCustomElementInit.leadingComments;
        // 创建原proxyCustomElementInit的节点指向一个变量。
        const constProxyCustomElementInit = t.variableDeclaration('const', [
          t.variableDeclarator(t.identifier(newProxyCustomElementName), proxyCustomElementInit),
        ]);
        // constProxyCustomElementInit.declarations[0].init = proxyCustomElementInit;
        // 创建函数表达式
        proxyWrapfunctionExpression = t.functionExpression(
          // 函数名
          null,
          // 形参
          [t.identifier(TRANS_TAG_NAME)],
          // 函数体
          t.blockStatement([
            // 第一行，参数校正，默认函数
            createDefaultTTNFn(),
            //
            constProxyCustomElementInit,
            // 返回值，将原来proxyCustomElement函数返回
            t.returnStatement(t.identifier(newProxyCustomElementName)),
          ]),
        );
        // 函数前添加tree shake注释
        t.addComment(proxyWrapfunctionExpression, 'leading', '@__PURE__', false);
        // 创建变量声明节点
        const variableDeclarator = t.variableDeclarator(
          t.identifier(`Get${proxyCustomElementName}`),
          proxyWrapfunctionExpression,
        );
        const variableDeclaration = t.variableDeclaration('const', [
          variableDeclarator,
          t.variableDeclarator(
            t.identifier(proxyCustomElementName),
            t.callExpression(t.identifier(`Get${proxyCustomElementName}`), []),
          ),
        ]);
        // 用新的节点替换旧的节点
        path.replaceWith(variableDeclaration);
      }
    },
  });

  // 转换 FunctionalComponent 为高阶函数
  traverse(ast, {
    VariableDeclaration(path) {
      const { node } = path;
      if (node.declarations?.length === 1) {
        const declarator = node.declarations[0];
        if (
          declarator.type === 'VariableDeclarator' &&
          declarator.id?.type === 'Identifier' &&
          functionalComponents.has(declarator.id.name) &&
          declarator.init?.type === 'ArrowFunctionExpression'
        ) {
          const funcName = declarator.id.name;
          const originalArrowFunc = declarator.init;

          // 创建新的高阶函数: (transTagName) => originalArrowFunction
          const newArrowFunc = t.arrowFunctionExpression([t.identifier(TRANS_TAG_NAME)], originalArrowFunc);

          // 替换原来的函数定义
          declarator.init = newArrowFunc;
          tagName = true;
        }
      }
    },
  });

  if (tagName) {
    // 将class中h函数的x-[component]包装为`transTagName(x-[component])`。
    traverse(ast, {
      CallExpression(path) {
        const callee = path.get('callee');
        if (callee.isIdentifier({ name: 'h' })) {
          const firstArg = path.node?.arguments?.[0];
          if (tags.includes((firstArg as t.StringLiteral)?.value)) {
            path.node.arguments[0] = createTTNFn(t.stringLiteral((firstArg as t.StringLiteral)?.value));
          } else if (
            t.isExpression(firstArg) &&
            !t.isStringLiteral(firstArg) &&
            !(t.isIdentifier(firstArg) && (firstArg.name === 'Host' || firstArg.name === 'Fragment'))
          ) {
            // 检查是否是 FunctionalComponent
            if (t.isIdentifier(firstArg) && functionalComponents.has(firstArg.name)) {
              // 对于 FunctionalComponent，调用它并传入 transTagName
              path.node.arguments[0] = t.callExpression(firstArg, [t.identifier(TRANS_TAG_NAME)]);
            } else if (
              t.isCallExpression(firstArg) &&
              firstArg.callee?.type === 'Identifier' &&
              firstArg.callee.name === TRANS_TAG_NAME
            ) {
              // 检查是否是 transTagName(FunctionalComponent, ...) 的调用形式
              const firstTransTagNameArg = firstArg.arguments?.[0];
              if (t.isIdentifier(firstTransTagNameArg) && functionalComponents.has(firstTransTagNameArg.name)) {
                // 将 transTagName(FunctionalComponent, ...) 转换为 FunctionalComponent(transTagName)
                path.node.arguments[0] = t.callExpression(firstTransTagNameArg, [t.identifier(TRANS_TAG_NAME)]);
              }
            } else if (
              t.isCallExpression(firstArg) &&
              t.isIdentifier(firstArg.callee) &&
              functionalComponents.has(firstArg.callee.name)
            ) {
              // 如果已经是调用形式，确保传入了 transTagName
              if (firstArg.arguments.length === 0) {
                firstArg.arguments.push(t.identifier(TRANS_TAG_NAME));
              }
            } else {
              path.node.arguments[0] = createTTNFn(firstArg);
            }
          }
        }
      },
    });
    // define入口函数增加形参、实参（transTagName）
    traverse(ast, {
      FunctionDeclaration(path) {
        const { node } = path;
        // 匹配组件入口define函数: function defineCustomElement[$]() {}, 如果形参有TRANS_TAG_NAME则跳过
        if (
          /^defineCustomElement/.test(node.id.name) &&
          !node.params.some((param: t.Identifier) => param.name === TRANS_TAG_NAME)
        ) {
          defineFunctionExpression = node.id.name;
          node.params.push(t.identifier(TRANS_TAG_NAME));
          node.body.body.unshift(createDefaultTTNFn());
        }
      },
      CallExpression(path) {
        const callee = path.get('callee');
        // 匹配依赖define函数调用: defineCustomElement[$](), 如果有实参则跳过
        if (
          /^defineCustomElement/.test((path.node.callee as t.V8IntrinsicIdentifier).name) &&
          !path.node.arguments?.length
        ) {
          path.node.arguments[0] = t.identifier(TRANS_TAG_NAME);
        }
        // 匹配 customElements.get || customElements.define
        if (
          callee.isMemberExpression() &&
          (callee.get('property').isIdentifier({ name: 'get' }) ||
            callee.get('property').isIdentifier({ name: 'define' }))
        ) {
          const object = callee.get('object');
          if (object.isIdentifier({ name: 'customElements' })) {
            const propertyName = (callee.node.property as t.Identifier).name;
            const tagName = path.get('arguments.0');
            if (
              t.isCallExpression(tagName) &&
              t.isIdentifier(((tagName as NodePath<t.Node>).node as t.CallExpression)?.callee, { name: TRANS_TAG_NAME })
            ) {
              // 如果已经包装过transTagName()就跳过
              return;
            }
            const newTagName = t.callExpression(t.identifier(TRANS_TAG_NAME), [(tagName as any).node]);
            const newCallee = t.memberExpression(object.node, t.identifier(propertyName));
            path.node.callee = newCallee;
            path.node.arguments[0] = newTagName;
            if (propertyName === 'define' && path.node.arguments[1]?.type === 'Identifier') {
              path.node.arguments[1] = t.callExpression(t.identifier(`Get${proxyCustomElementName}`), [
                t.identifier(TRANS_TAG_NAME),
              ]);
            }
          }
        }
      },
    });
    // 将自定义的decorate（eg: @Slot等类原型上的拓展），移动到包装函数中`proxyWrapfunctionExpression`。
    traverse(ast, {
      CallExpression(path: any) {
        if (/__decorate/.test(path.node.callee.name)) {
          if (!path.parentPath?.parentPath?.isProgram()) {
            // 匹配不处于全局作用域中的 __decorate.*?(), 排除已移动过的。
            return;
          }
          const proxyWrapfunctionExpressionReturn = proxyWrapfunctionExpression?.body.body.pop();
          proxyWrapfunctionExpression?.body.body.push(path.node, t.emptyStatement());
          proxyWrapfunctionExpression?.body.body.push(proxyWrapfunctionExpressionReturn);
          if (
            path.node.arguments[1]?.type === 'MemberExpression' &&
            path.node.arguments[1]?.object?.name === proxyCustomElementName
          ) {
            path.node.arguments[1].object.name = newProxyCustomElementName;
          }
          path.remove();
        }
      },
    });
  }

  // 处理 Modal、Message类，初始化define
  const TAG_HASH_SUFFIX = 'tagHashSuffix';
  transDefineFunctionComponent.className &&
    traverse(ast, {
      ClassDeclaration(path: any) {
        if (path.node?.id?.name === transDefineFunctionComponent.className) {
          // 查找类的构造函数
          const constructorPath = path
            .get('body')
            .get('body')
            .find((method: any) => method.isClassMethod() && method.get('key').isIdentifier({ name: 'constructor' }));
          if (!constructorPath) {
            return;
          }
          const { body } = constructorPath.node;
          if (!t.isBlockStatement(body)) {
            return;
          }
          // 插入组件define语句到构造函数的最后一行
          body.body.push(
            // @ts-expect-error
            t.logicalExpression(
              '&&',
              t.identifier(TAG_HASH_SUFFIX),
              t.callExpression(t.identifier(defineFunctionExpression), [
                t.functionExpression(
                  null,
                  [t.identifier('cName')],
                  t.blockStatement([t.returnStatement(t.identifier('`${cName}-${tagHashSuffix}`'))]),
                ),
              ]),
            ),
          );
        }
      },
      NewExpression(path) {
        const callee = path.node?.callee;
        if (callee?.type === 'Identifier' && callee?.name === transDefineFunctionComponent.className) {
          path.node.arguments[0] = t.identifier(TAG_HASH_SUFFIX);
          const astProgramBody = ast.program.body || [];
          for (let i = 0; i < astProgramBody.length || 0; i++) {
            // @ts-expect-error
            if (
              astProgramBody[i]?.type === 'FunctionDeclaration' &&
              astProgramBody[i]?.id?.name === defineFunctionExpression
            ) {
              // @ts-expect-error
              astProgramBody.splice(i + 1, 0, path.parentPath.parentPath.node);
              path.parentPath.parentPath.remove();
              break;
            }
          }
        }
      },
    });

  // 额外处理：将所有 transTagName(FunctionalComponent, ...) 转换为 FunctionalComponent(transTagName)
  traverse(ast, {
    CallExpression(path) {
      if (
        path.node.callee?.type === 'Identifier' &&
        path.node.callee.name === TRANS_TAG_NAME &&
        path.node.arguments?.length > 0
      ) {
        const firstArg = path.node.arguments[0];
        if (t.isIdentifier(firstArg) && functionalComponents.has(firstArg.name)) {
          // 将 transTagName(FunctionalComponent, ...) 转换为 FunctionalComponent(transTagName)
          path.replaceWith(t.callExpression(firstArg, [t.identifier(TRANS_TAG_NAME)]));
        }
      }
    },
  });

  const output = generate(ast, { retainLines: true }, code);
  return output.code;
}

/*
 * 插件入口
 */
function transTagNameOfStencilCustomElements(options: StencilTransTagNameOfStencilCustomElementsOptions = {}): Plugin {
  const { transDefineFunctionComponents = [] } = options;
  return {
    name: 'trans-tagname-of-stencil-custom-elements',
    generateBundle(options, bundle: { [key: string]: StencilOutputAsset }) {
      // 通过以下条件筛出components下的target
      if (options.format === 'es' && options.hoistTransitiveImports === false) {
        const componentDefines = (bundle['index.js']?.exports || []).filter((export$1) =>
          /^defineCustomElement/.test(export$1),
        );
        const components = componentDefines.map((componentDefine) =>
          componentDefine.replace('defineCustomElement', ''),
        );
        Object.keys(bundle).forEach((fileName) => {
          const componentName = fileName.replace(/(.*)\.js$/, (_$1, $2) => $2);
          // 命中包含导出组件/组件define的文件
          if (
            (bundle[fileName].importedBindings?.['@stencil/core/internal/client'] || []).some(
              (importedBinding) =>
                importedBinding === STENCIL_PROXY_CUSTOMELEMENT_FN_NAME || importedBinding === STENCIL_H_FUNCTION_NAME,
            )
          ) {
            bundle[fileName].code = wrapComponentTransTagName(
              bundle[fileName].code,
              components,
              transDefineFunctionComponents.find((tdfc) => tdfc.componentName === componentName),
            );
          }
        });
      }
    },
  };
}

export { transTagNameOfStencilCustomElements };
