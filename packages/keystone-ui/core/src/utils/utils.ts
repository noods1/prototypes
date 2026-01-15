import { resolveMessage, LocalizedMessage } from '@fe-infra/keystone-locales';
import store from '@src/store';
import { toPath, get, isEqual, isUndefined, isElement } from 'lodash-es';
/**
 * 判断是否包含
 */
export function contains(parentNode: Node, childNode: Node | EventTarget) {
  if (!isElement(parentNode) || !isElement(childNode)) {
    return false;
  }
  const fn =
    Node.prototype.contains ||
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    function (childNode) {
      while (childNode) {
        if (childNode === parentNode) {
          return true;
        }
        childNode = childNode.parentNode;
      }
    };
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  return fn.call(parentNode, childNode);
}

export type CancellableDelayPromise = Promise<void> & { cancel: () => void };
export function cancellableDelay(ms: number): CancellableDelayPromise {
  let cancel: () => void;
  let timerId: ReturnType<typeof setTimeout>;

  const promise = new Promise((resolve, reject) => {
    timerId = setTimeout(resolve, ms);
    cancel = () => {
      clearTimeout(timerId);
      return reject(new Error('cancelled'));
    };
  }) as CancellableDelayPromise;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  promise.cancel = cancel;
  return promise;
}

/**
 * Resolve a localized message to the given locale. e.g.
 * ```typescript
 * import { datePickerMessages } from '@fe-infra/keystone-locales';
 * t(datePickerMessages.start);
 * t(datePickerMessages.lastNDays, { days: 30 });
 * ```
 * @param localizedMessage The localized message to resolve.
 * @param maybeInterpolation The interpolation values to use if the message contains placeholders. e.g. `{ days: 30 }`.
 */
export function t<T extends LocalizedMessage<Record<string, string | number> | never>>(
  localizedMessage: T,
  ...maybeInterpolation: T['__interpolation'] extends never ? [] : [T['__interpolation']]
): string {
  const { locale } = store.get('config');
  return resolveMessage(locale, 'en', localizedMessage, ...maybeInterpolation);
}

/**
 * 是否是RTL
 */
export function isRTL() {
  return dir() === 'rtl';
}

/**
 * 获取 rtl dir
 */
export function dir() {
  return store.get('config').locale === 'ar' ? 'rtl' : 'ltr';
}
/**
 * 获取 store 配置
 */
export function getGlobalConfig(key?: string) {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  return key !== undefined ? store.get('config')[key] : store.get('config');
}
/**
 * 锁定/解锁滚动
 */
export function lockScroll(visible: boolean) {
  const { lockScroll } = getGlobalConfig();
  lockScroll.enabled && (lockScroll.container.style.overflow = visible ? 'hidden' : 'unset');
}

export const zIndexFromStore = store.get('config').zIndex;

/**
 * 获取target 父组件
 */

export function getTargetParentComponent<T extends HTMLElement>(node: HTMLElement, componentName: string): T {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  function find(node) {
    if (!node) {
      return undefined;
    }
    if (node.hasAttribute && node.hasAttribute(componentName)) {
      return node;
    }
    return find(node?.parentNode || node?.host);
  }

  return find(node);
}

/**
 * 兼容CSS数字/字符串尺寸
 * @param length
 * @returns
 */
export function convertNum2PX(length: number | string) {
  if (typeof length === 'string') {
    if (!isNaN(Number(length))) {
      return `${length}px`;
    }
    return length;
  }
  return `${length}px`;
}

/**
 * 转换尺寸 px 为数字
 * @param length
 * @returns
 */
export function convertPX2Num(length: string | number = 0): number {
  if (typeof length === 'number') {
    return length;
  } else {
    if (length?.endsWith('px')) {
      return Number(length.replace('px', ''));
    }
    return Number(length);
  }
}

/**
 * 矫正由transform 影响的位置
 */
export function redressFixed(el: Node) {
  // const stackingContextAttrs = {
  // transform: 'none',
  // perspective: 'none',
  // 'will-change': undefined
  // };
  function findTargetEl(el: Node | ShadowRoot) {
    if (!el || el === document || (!isElement(el) && !isElement((el as ShadowRoot)?.host))) {
      return undefined;
    }
    const cEl = (el as ShadowRoot).host ?? el;
    if (window.getComputedStyle?.(cEl as HTMLElement).transform !== 'none') {
      return cEl;
    } else {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      return findTargetEl((cEl as HTMLElement).assignedSlot?.parentNode || cEl.parentNode);
    }
  }
  const targetEl = findTargetEl(el);
  return (targetEl as HTMLElement)?.getBoundingClientRect?.() ?? { left: 0, top: 0 };
}

export interface HTMLCustomElement extends HTMLElement {
  [key: string]: unknown;
}

/**
 * 根据条件获取目标元素集合
 * @param node
 * @param filter
 * @param endif
 * @returns
 */
export function getTargetDescendantNodes(
  node: HTMLCustomElement,
  filter: (node: HTMLCustomElement) => boolean = () => true,
  endif: (node: HTMLCustomElement) => boolean = (node: HTMLCustomElement) => !node.children?.length,
) {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  function bfsFindNode(queue) {
    const targetNodes = [];
    while (queue.length) {
      const currentNode = queue.shift();
      if (filter(currentNode)) {
        targetNodes.push(currentNode);
      }
      if (!endif(currentNode)) {
        queue.push(...currentNode.children);
      }
    }
    return targetNodes;
  }
  return bfsFindNode([node]);
}

/**
 * 监听某个元素子节点、孙子节点的增删方法
 * @param node 某元素
 * @param cb 增删的回调
 * @param filter 筛选函数
 * @param endif 跳过函数
 * @returns
 */
export function watchTargetDescendantNodesEffect(
  node: HTMLCustomElement,
  cb: (newNodes: HTMLCustomElement[], oldNodes: HTMLCustomElement[]) => void,
  filter: (node: HTMLCustomElement) => boolean = () => true,
  endif: (node: HTMLCustomElement) => boolean = (node: HTMLCustomElement) => !node.children?.length,
): MutationObserver {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  let oldNodes = [];
  function effectEmit() {
    const newNodes = getTargetDescendantNodes(node, filter, endif);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    cb(newNodes, oldNodes);
    oldNodes = newNodes;
  }

  const mutationObserver = new MutationObserver(() => {
    effectEmit();
  });
  mutationObserver.observe(node, {
    childList: true,
    subtree: true,
  });
  effectEmit();
  return mutationObserver;
}

/**
 * 弥补 loadash.unset 不能删除数组项的unset
 * @param object
 * @param namePath
 */
export function unset(object: object, namePath: string) {
  const path = toPath(namePath);
  const pathEnd = path.pop();
  const targetObject = get(object, path);
  if (!targetObject) {
    return;
  }
  if (targetObject instanceof Array) {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    targetObject.splice(Number(pathEnd[0]), 1);
  } else {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    delete targetObject[pathEnd[0]];
  }
}

/**
 * unset map with object (map key is namePath); 根据结构化对象，删除以namePath为key的对象属性。
 * @param object
 * @param namePath
 * @param handle 新旧key改变后触发的回调
 * @returns
 *
 * @eg
 * 'a[0].b.c'
 * 'a[1].b.c'
 * 'a[2].b.c'
 * 'a[3]'
 * 'a[4].b.c'
 * - 'a[2]'
 */
export function unsetObject(
  map: Record<string, unknown>,
  object: object,
  namePath: string,
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  handle?: (oldName: string, newName: string, currentV) => void,
) {
  if (!map[namePath]) {
    return;
  }
  const path = toPath(namePath);
  if (path.length <= 1) {
    delete map[namePath];
    return;
  }

  const prePath = path.slice(0, path.length - 1);
  const endPath = path.slice(path.length - 1);
  const targetObject = get(object, prePath);
  const namePaths = Object.keys(map);
  if (!map[namePath]) {
    return;
  }
  namePaths.forEach((namePath$1) => {
    const path$1 = toPath(namePath$1);
    const preNamePathIndex = getPreNamePathIndex(namePath);
    let namePath$2 = namePath$1.substring(0, preNamePathIndex);
    if (namePath$1.startsWith(namePath)) {
      // 精准匹配到目标项及子项
      delete map[namePath$1];
    } else if (
      path$1.length >= path.length &&
      isEqual(prePath, path$1.slice(0, prePath.length)) &&
      targetObject instanceof Array
    ) {
      // 匹配数组同级项目，以进行下标前移
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      if (namePath$1[preNamePathIndex] === '[') {
        namePath$2 =
          namePath$2 +
          namePath$1
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            .substring(preNamePathIndex)
            .replace(/\[([^\]]+)\]/, ($1, $2) => (Number(endPath) < Number($2) ? `[${Number($2) - 1}]` : $1));
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      } else if (namePath$1[preNamePathIndex] === '.') {
        namePath$2 =
          namePath$2 +
          namePath$1
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            .substring(preNamePathIndex)
            .replace(/([^\.]*)[\.]/, ($1, $2) => (Number(endPath) < Number($2) ? `${Number($2) - 1}.` : $1));
      }
      if (namePath$1 !== namePath$2) {
        // 说明下标前移了
        const currentV = map[namePath$1];
        map[namePath$2] = currentV;
        delete map[namePath$1];
        handle?.(namePath$1, namePath$2, currentV);
      }
    }
  });
  function getPreNamePathIndex(namePath: string) {
    const endName = namePath.substring(namePath.length - 1);
    let preNamePathIndex;
    if (endName === ']') {
      for (let i = namePath.length - 1; i--; i >= 0) {
        if (namePath[i] === '[') {
          preNamePathIndex = i;
          break;
        }
      }
    } else {
      for (let i = namePath.length - 1; i--; i >= 0) {
        if (namePath[i] === '.') {
          preNamePathIndex = i;
          break;
        }
      }
    }
    return preNamePathIndex;
  }
}

export const assignment = <T extends HTMLElement, E>(el: T, key: string, value: E) => {
  if (!isUndefined(value)) {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    el[key] = value;
  }
};

export function getBase64(img: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!img) {
      return resolve('');
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.addEventListener('error', reject);
    reader.readAsDataURL(img);
  });
}

export function getImageWxH(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
  });
}

/**
 * 问题：position: fixed，会受dom堆叠上下文(eg：transform: !none、perspective: !none、will-change: any)影响，从而定位不是相对于viewport而是上下文元素。
 * 解释：一般组件库modal会选择插入到body中，为什么wc不采用。
 * 原因：
 * 1、wc组件无法真正监听组件卸载，所以当组件插入到body中，就脱离了原来上下文关系，当父组件卸载后子组件无法感知从而无法删除对应的modal dom。
 * 2、wc样式隔离，modal组件处于业务shadow dom中时样式会被隔离掉；
 * 3、组件改变了dom嵌套关系，业务开发时css 关系错乱。
 * 方案：添加一个空div，用来感知组件相对于body的left、top的真实距离，然后矫正。
 */
export function modalRedressFixed(calibrationElement: HTMLElement, sniffingEl?: HTMLElement) {
  sniffingEl = sniffingEl || calibrationElement;
  const { top, left } = sniffingEl.getBoundingClientRect?.();

  calibrationElement.style.left = `calc(${calibrationElement.style.left}-${left}px)`;
  calibrationElement.style.top = `calc(${calibrationElement.style.top}-${top}px)`;
}

/**
 * 监听某节点删除，回调
 * */
export function watchTargetElRemoved(targetEl: () => HTMLElement | Node, fn: () => void) {
  return (mutations: MutationRecord[]) => {
    mutations
      .filter((mutation) => mutation.type === 'childList' && mutation.removedNodes?.length)
      .forEach((mutation) => {
        function find(node: Node) {
          if (!node || node === document || (!isElement(node) && !isElement((node as ShadowRoot)?.host))) {
            return undefined;
          }
          if (Array.from(mutation.removedNodes).includes(node)) {
            return node;
          }
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          return find(node?.parentNode);
        }
        if (find(targetEl?.()) && !isConnected(targetEl?.())) {
          // 查找到removeNodeList中包含目标元素，并且该元素已经不存在dom tree上了。
          fn?.();
        }
      });
  };
}

/**
 * RegExp.escape
 */
export function escapeRegExp(string: string) {
  return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/**
 * @deprecated 该方法冗余，不要使用，应当直接用 el.isConnected 代替
 * 用来判断元素是否存活在dom tree上
 * @param el
 * @returns
 */
export function isConnected(el: HTMLElement | Node) {
  if ('isConnected' in el) {
    return el.isConnected;
  } else {
    return contains(document.body, el);
  }
}

/**
 * 该方法能有效的避免clone web component时丢失#shadow-root
 * @param original
 * @returns
 */
export function cloneNodeOrWebComponent(original: Element, deep = true) {
  if (customElements.get(original.localName) && original.shadowRoot) {
    // 导入 Web Component 元素和其所有子元素
    const imported = document.importNode(original, deep);

    // 获取原始 #shadow-root 和新的 #shadow-root
    const originalShadowRoot = original.shadowRoot;
    const newShadowRoot = imported.shadowRoot;

    // 将原始 #shadow-root 中的所有元素复制到新的 #shadow-root
    requestAnimationFrame(() => {
      // 使用requestAnimationFrame()来调度一个回调函数，以确保我们的组件在 shadow-root 确实就绪后再运行。这样，在新节点完成加载之前，组件将不会运行。
      // 您的代码在新的 shadow-root 中运行的时间点
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      if (newShadowRoot.children.length === 0) {
        Array.from(originalShadowRoot.children).forEach((child) => {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          newShadowRoot.appendChild(cloneNodeOrWebComponent(child, true));
        });
      }
    });

    return imported;
  } else {
    return original.cloneNode(deep);
  }
}

export function removeChildNodes(parentNode: HTMLElement) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}

export function scrollTo(container: HTMLElement, opts: { left?: number; top?: number; duration?: number }) {
  const { duration = 100 } = opts;

  const dirs = {
    left: 'scrollLeft',
    top: 'scrollTop',
  };

  for (const dirKey in dirs) {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const to = opts[dirKey];
    if (typeof to === 'number' && to !== 0) {
      if (typeof duration === 'number' && duration >= 0) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        run(dirs[dirKey], to, duration);
      } else {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        container[dirKey] = to;
      }
    }
  }

  function run(scrollDir: string, to: number, duration: number) {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const offset = to - container[scrollDir];
    const frame = (offset / duration) * 10;

    requestAnimationFrame(() => {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      container[scrollDir] += frame;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      if (container[scrollDir] === to) {
        return;
      }
      run(scrollDir, to, duration - 10);
    });
  }
}

/**
 * 生成唯一ID
 */
export function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
}
