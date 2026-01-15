import { isElement } from 'lodash-es';
/**
 * 通过给document挂载mousedown事件，来触发关闭已经打开的popper、dialog等。
 */
export function isIn(parentNodes: (HTMLElement | ShadowRoot)[], event: MouseEvent) {
  // 兼容shadow dom
  parentNodes = (parentNodes || [])
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    .concat(parentNodes.map((el) => (el as HTMLElement)?.shadowRoot))
    .filter((el) => !!el);
  for (let i = 0, il = parentNodes.length; i < il; i += 1) {
    /*
     * 兼容 触发器在 shadow root中，e.target 指向web component本身 https://javascript.info/shadow-dom-events
     * 因此弃用：// import { contains } from './utils'; if (contains(parentNodes[i], event.target)) return true;
     */
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    if (targetInRootEventPath(event, parentNodes[i])) {
      return true;
    }
  }
  return false;
}
/**
 * 获取事件冒泡路径，兼容 IE11，Edge，Chrome，Firefox，Safari
 */
export function getEventPath(event: MouseEvent & { path?: Node[] }) {
  const { target } = event;
  const path = (event.composedPath && event.composedPath()) || event.path;
  if (path) {
    return path.indexOf(window) < 0 ? path.concat(window) : path;
  }
  if (target === window) {
    return [window];
  }
  const getParents = (node: HTMLElement | EventTarget, memo: Node[]) => {
    const { parentNode } = node as HTMLElement;
    if (!parentNode) {
      return memo;
    } else {
      return getParents(parentNode, memo.concat(parentNode));
    }
  };
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  return [target].concat(getParents(target, []), window);
}
export function targetInRootEventPath(event: MouseEvent, rootEl: HTMLElement | ShadowRoot) {
  const pathes = getEventPath(event);
  return pathes.indexOf(rootEl) > -1;
}

type OutclickListener = (opts?: { e?: MouseEvent; isOutClick?: boolean }) => void;
class Outclick {
  handlers: Map<
    OutclickListener,
    {
      root: HTMLElement;
      fn: OutclickListener;
      el: HTMLElement[] | HTMLElement;
    }
  > = new Map();
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  constructor(warper) {
    // outclick 优先 click 执行
    (warper ?? document).addEventListener('click', this.clickHandler.bind(this), true);
  }
  clickHandler(e: MouseEvent) {
    this.handlers.forEach((handler) => {
      let els = handler.el as HTMLElement[];
      if (isElement(handler.el)) {
        els = [handler.el as HTMLElement];
      }
      if (!targetInRootEventPath(e, handler.root) && !isIn(els, e)) {
        handler.fn({ e, isOutClick: true });
        this.handlers.delete(handler.fn);
      }
    });
  }
  /**
   * @root 为原始触发click区域，默认作为out相对位置。如：popover组件的话，popover本身默认就是root。必传。没有root就没有out一说！！
   * @fn outclick的回调，必传。也作为卸载的唯一标识。
   * @el 排除触发outclick的元素。
   */
  on(root: HTMLElement, fn: OutclickListener, el?: HTMLElement[] | HTMLElement) {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.handlers.set(fn, { root, fn, el });
  }
  off(fn: OutclickListener) {
    this.handlers.delete(fn);
  }
}

export default new Outclick(document);
