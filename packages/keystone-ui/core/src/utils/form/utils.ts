import { Status } from '@src/entities';
import { HTMLCustomElement } from '../utils';
export { FormContextValueReconcile } from './FormContextValueReconcile';

/**
 * @locale {en} Mount click event handlers on elements
 * @locale {zh} 在元素上绑定点击事件处理函数
 * @param elements 元素数组
 * @param func 点击事件回调
 */
export function mountFunctionOnClick(elements: HTMLElement[], func: (e: Event) => void) {
  const handler = (e: Event) => {
    e.stopPropagation();
    func(e);
  };

  elements.forEach((element) => {
    element.addEventListener('click', handler);
  });

  const dispose = () => {
    elements.forEach((element) => {
      element.removeEventListener('click', handler);
    });
  };

  return dispose;
}

/**
 * @locale {en} Get buttons with submit attribute under form
 * @locale {zh} 获取 form 下具有 submit 属性的按钮
 * @param node form 元素
 */
export function getSubmitBtns(node: HTMLElement): HTMLElement[] {
  return Array.prototype.filter.call(
    node.querySelectorAll('*'),
    (item: HTMLCustomElement) =>
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      item['ks-name'] === 'ks-button' && (item.getAttribute('html-type') ?? item.htmlType) === 'submit',
  );
}

/**
 * @locale {en} Get buttons with reset attribute under form
 * @locale {zh} 获取 form 下具有 reset 属性的按钮
 * @param node form 元素
 */
export function getResetBtns(node: HTMLElement): HTMLElement[] {
  return Array.prototype.filter.call(
    node.querySelectorAll('*'),
    (item: HTMLCustomElement) =>
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      item['ks-name'] === 'ks-button' && (item.getAttribute('html-type') ?? item.htmlType) === 'reset',
  );
}

/**
 * @locale {en} Get
 * @locale {zh} 获取 form 子元素各值
 * @param node form child 元素
 */
export function getReconciledFormContextData(node: {
  _provider?: 'formItem' | 'formList' | 'form';
  disabled?: boolean;
  status?: Status;
  disabledFromContext?: boolean;
  statusFromContext?: Status;
}) {
  const disabled = node?.disabled === undefined ? node?.disabledFromContext : node?.disabled;
  const status = node?.status === undefined ? node?.statusFromContext : node?.status;
  return {
    disabled,
    status,
  };
}

/**
 * Moves an array item from one position in an array to another.
 *
 * Note: This is a pure function so a new array will be returned, instead
 * of altering the array argument.
 *
 * @param array         Array in which to move an item.         (required)
 * @param moveIndex     The index of the item to move.          (required)
 * @param toIndex       The index to move item at moveIndex to. (required)
 */
export function move<T>(array: T[], moveIndex: number, toIndex: number) {
  const { length } = array;
  if (moveIndex < 0 || moveIndex >= length || toIndex < 0 || toIndex >= length) {
    return array;
  }
  const item = array[moveIndex] as T;
  const diff = moveIndex - toIndex;

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length),
    ];
  }
  if (diff < 0) {
    // move right
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, toIndex + 1),
      item,
      ...array.slice(toIndex + 1, length),
    ];
  }
  return array;
}

/**
 * Parse lodash-style path string
 * @locale {en} Parse lodash-style path string
 * @locale {zh} 解析 lodash 风格的路径字符串
 * @param {string} pathStr - 例如 'a[0].b.c'
 * @returns {string[]} - 例如 ['a', '0', 'b', 'c']
 */
export function parsePath(pathStr: string): string[] {
  const pathRegex = /\[(\d+)\]|\.?([a-zA-Z0-9_]+)/g;
  const result: string[] = [];
  let match: RegExpExecArray | null = null;
  while ((match = pathRegex.exec(pathStr)) !== null) {
    result.push(match[1] || match[2]!);
  }
  return result;
}

/**
 * Immutably set deep property value of an object
 * @locale {en} Immutably set deep property value of an object
 * @locale {zh} 不可变地设置对象深层属性值
 * @param {T} originalValue - 原始对象或数组
 * @param {string | string[]} path - lodash 风格的路径
 * @param {T} valueToSet - 要设置的新值
 * @returns {T} - 返回一个全新的对象或数组
 */
export const immutableSet = <T>(
  originalValue: T,
  path: string | string[],
  valueToSet: unknown,
  defaultValue?: T,
): T => {
  const keys = Array.isArray(path) ? path : parsePath(path);

  if (keys.length === 0) {
    return valueToSet as T;
  }

  if (originalValue === undefined) {
    originalValue = defaultValue as T;
  }
  if (!(originalValue instanceof Object)) {
    throw new Error(`immutableSet path: ${path}: originalValue must be an object or array`);
  }

  // shallow clone originalValue
  // Object.is(newValue, originalValue) --> false
  // Object.is(newValue[xxx], originalValue[xxx]) --> true
  const newValue: T = Array.isArray(originalValue)
    ? Object.keys(originalValue).reduce((acc, key) => {
        // @ts-expect-error supress any type error
        acc[key] = originalValue[key];
        return acc;
      }, [] as T)
    : Object.assign({}, originalValue);

  let current: unknown = newValue;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    const nextKey = keys[i + 1] || '';

    // @ts-expect-error supress any type error
    const nextNode = current[key];

    let newNode: unknown;
    if (Number.isInteger(parseInt(nextKey)) || Array.isArray(nextNode)) {
      newNode = [];
      if (nextNode) {
        Object.keys(nextNode).forEach((key) => {
          // @ts-expect-error supress any type error
          newNode[key] = nextNode[key];
        });
      }
    } else {
      newNode = typeof nextNode === 'object' && nextNode !== null ? { ...nextNode } : {};
    }

    // @ts-expect-error supress any type error
    current[key] = newNode;
    current = newNode;
  }

  const lastKey = keys[keys.length - 1]!;
  // @ts-expect-error supress any type error
  current[lastKey] = valueToSet;

  return newValue;
};

/**
 * Get all paths in an object, each path is a lodash-style array
 * @param obj The object to analyze
 * @returns Array containing all paths, excluding the root path
 */
export function getAllPaths(obj: Readonly<object>, excludes?: RegExp): Array<string[]> {
  const result: Array<string[]> = [];

  function traverse(currentObj: Readonly<unknown> | undefined, currentPath: string[] = []) {
    if (currentPath.length > 0) {
      result.push([...currentPath]);
    }

    if (currentObj !== null && typeof currentObj === 'object') {
      if (Array.isArray(currentObj)) {
        currentObj.forEach((item, index) => {
          if (excludes && excludes.test(index.toString())) {
            return;
          }
          const newPath = [...currentPath, index.toString()];
          traverse(item, newPath);
        });
      } else {
        for (const key in currentObj) {
          if (Object.prototype.hasOwnProperty.call(currentObj, key)) {
            if (excludes && excludes.test(key)) {
              continue;
            }
            const newPath = [...currentPath, key];
            // @ts-expect-error supress any type error
            traverse(currentObj[key], newPath);
          }
        }
      }
    }
  }

  traverse(obj);
  return result;
}
