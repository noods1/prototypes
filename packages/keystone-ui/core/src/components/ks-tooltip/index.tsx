/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  ComponentInterface,
  Element,
  Prop,
  Method,
  State,
  Listen,
  Event,
  Watch,
  h,
  EventEmitter,
  Host,
} from '@stencil/core';
import { isElement, debounce, isBoolean } from 'lodash-es';
import {
  computePosition,
  Placement,
  autoUpdate,
  flip,
  shift,
  offset,
  arrow,
  Strategy,
  ElementContext,
  hide,
} from '@floating-ui/dom';
import classnames from 'classnames';
import anime from 'animejs';
import outclick from '@src/utils/outclick';
import { Slot, Slots } from '@src/utils/decorators';
import documentobserve from '@src/utils/documentobserve';
import { registerPluginManager } from '@src/utils/plugin';
import { sendDurationTracking, sendExposeTracking } from '@src/utils/tracking';
import { dir, watchTargetElRemoved, isConnected, cancellableDelay, CancellableDelayPromise } from '@src/utils/utils';
import { PopoverPropTrigger, TooltipSize, PopoverOpenParam } from '../../entities';

const prefix = 'tooltip';
const DEFAULT_TRIGGER = 'hover';
const DEFAULT_PLACEMENT = 'top';
const DEFAULT_VISIBLE = false;
const DEFAULT_TRANSITION_OFFSET = 4;

const slotRangeCache = new WeakMap();

/**
 * @slot body - popper body
 * @slot content - popover content
 */
@Component({
  tag: 'ks-tooltip',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsTooltip implements ComponentInterface {
  ['ks-name'] = 'ks-tooltip';
  // 组件内部变量 ----
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  pEl: Node;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popperRef: HTMLElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  anchorSlotRef: HTMLSlotElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  arrowRef: HTMLElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  bodyWrapRef: HTMLElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  mutationObserver: MutationObserver;
  // eslint-disable-next-line no-undef
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsTooltipElement;
  /**
   * @locale {en} The default visibility of the bubble card when the component is first rendered.
   * @locale {zh} 组件首次渲染时气泡卡片的默认可见性。
   */
  @Prop() defaultVisible: boolean = DEFAULT_VISIBLE;
  /**
   * @locale {en} Controls the visibility of the bubble card. When `true`, the bubble card is visible.
   * @locale {zh} 控制气泡卡片的可见性。当为 `true` 时，气泡卡片可见。
   */
  @Prop() visible: boolean | undefined;
  /**
   * @locale {en} Controls whether bubbles are disabled. When true, the bubble card is not visible.
   * @locale {zh} 控制是否禁用气泡。当为 `true` 时，气泡卡片不可见。
   */
  @Prop() disabled: boolean | undefined;
  /**
   * @locale {en} The content displayed inside the bubble card.
   * @locale {zh} 显示在气泡卡片内部的内容。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() content: string;
  /**
   * @locale {en} The placement of the bubble card relative to the target element. Can be one of the following values:
   * `top`, `right`, `bottom`, `left`, `top-start`, `top-end`,
   * `right-start`, `right-end`, `bottom-start`, `bottom-end`,
   * `left-start` or `left-end`.
   * @locale {zh} 气泡卡片相对于目标元素的位置。可选值包括
   * `top`、`right`、`bottom`、`left`、`top-start`、`top-end`、
   * `right-start`、`right-end`、`bottom-start`、`bottom-end`、
   * `left-start` 或 `left-end`。
   */
  @Prop() placement: Placement = DEFAULT_PLACEMENT;
  /**
   * @locale {en} The trigger method for showing the bubble card. Can be one of the following values: `click`, `hover`, `focus` or `manual`.
   * @locale {zh} 显示气泡卡片的触发方式。可以是以下值之一：`click`、`hover`、`focus` 或 `manual`。
   */
  @Prop() trigger: PopoverPropTrigger = DEFAULT_TRIGGER;
  /**
   * @locale {en} Delay before the bubble card is shown when triggered, in milliseconds.
   * @locale {zh} 触发后显示气泡卡片的延迟时间，以毫秒为单位。
   */
  @Prop() enterDelay = 200;
  /**
   * @locale {en} Delay before the bubble card is hidden when triggered, in milliseconds.
   * @locale {zh} 触发后隐藏气泡卡片的延迟时间，以毫秒为单位。
   */
  @Prop() leaveDelay = 200;
  /**
   * @locale {en} The background color of the bubble card.
   * @locale {zh} 气泡卡片的背景颜色。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() color: string;
  /**
   * @locale {en} The font color of the text inside the bubble card.
   * @locale {zh} 气泡卡片内部文本的字体颜色。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() fontColor: string;
  /**
   * @locale {en} Indicates whether to highlight the bubble card. When `true`, the bubble card will have a highlighted appearance.
   * @locale {zh} 指示是否高亮气泡卡片。当为 `true` 时，气泡卡片将呈现高亮效果。
   */
  @Prop() highLight = false;
  /**
   * @locale {en} Elements that should not trigger an out-click event.These elements are excluded from the out-click detection.
   * @locale {zh} 不应触发 out-click 事件的元素。这些元素在 out-click 检测中被排除。
   */
  @Prop() unEmitOutClickEls: HTMLElement[] = [];
  /**
   * @locale {en} Indicates whether to display an arrow pointing to the target element. When `true`, the arrow will not be displayed.
   * @locale {zh} 指示是否显示指向目标元素的箭头。当为 `true` 时，箭头将不会显示。
   */
  @Prop() noArrow = false;
  /**
   * @locale {en} The positioning strategy for the bubble card. Can be either `"absolute"` or `"fixed"`.
   * @locale {zh} 气泡卡片的定位策略。可以是 `"absolute"` 或 `"fixed"`。
   */
  @Prop() strategy: Strategy = 'fixed';
  /**
   * @locale {en} The offset between the bubble card and the target element.
   * @locale {zh} 气泡卡片与目标元素之间的偏移量。
   */
  @Prop() gapOffset = 0;
  /**
   * @locale {en} The offset for positioning the bubble card at the start.
   * @locale {zh} 在起始位置上定位气泡卡片的偏移量。
   */
  @Prop() startOffset = 0;
  /**
   * @locale {en} The size of the bubble card. Can be one of the following values: `"auto"`, `"sm"`, `"md"`, `"lg"`.
   * @locale {zh} 气泡卡片的大小。可以是以下值之一：`"auto"`, `"sm"`、`"md"`、`"lg"`。
   */
  @Prop() size: TooltipSize = 'auto';
  /**
   * @locale {en} The duration of the animation in milliseconds.
   * @locale {zh} 动画持续时间，以毫秒为单位。
   */
  @Prop() duration = 150;
  /**
   * @locale {en} It is triggered when the mouse clicks on something other than the tooltip element,It will be triggered once when the bubble card is opened.
   * @locale {zh} 当鼠标点击 tooltip 元素之外的时触发,当气泡卡片打开后会触发一次。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksOutClick: EventEmitter<void>;
  /**
   * @locale {en} Custom event that triggers when the visibility of the bubble card changes.
   * @locale {zh} 自定义事件，当气泡卡片的可见性发生变化时触发。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksVisibleChange: EventEmitter<boolean>;
  /**
   * @locale {en} Custom event triggered after the bubble card has opened.
   * @locale {zh} 当气泡卡片打开后触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksAfterOpen: EventEmitter<void>;
  /**
   * @locale {en} Custom event triggered after the bubble card has closed.
   * @locale {zh} 当气泡卡片关闭后触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksAfterClose: EventEmitter<void>;
  /**
   * @locale {en} The anchor element to which the bubble card is attached.
   * @locale {zh} 气泡卡片附加的锚点元素。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() anchorEl: HTMLElement | (() => HTMLElement); // TODO 支持内外键用法切换的场景
  /**
   * @locale {en} Indicates whether the bubble card should automatically shift position based on available space.
   * @locale {zh} 指示气泡卡片是否应根据可用空间自动调整位置。
   */
  @Prop() autoShift = true;
  /**
   * @locale {en} The style of the bubble card content.
   * @locale {zh} 气泡卡片内容的样式。
   */
  @Prop() contentStyle = {};

  /**
   * @deprecated Only for compatibility with non-Keystone overlay components.
   * @locale {en} Disable the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer) API with `position: fixed`.
   * @locale {zh} 禁用 [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer) API 并用 `position: fixed` 替代。
   */
  @Prop() deprecatedDisableTopLayer = false;
  /**
   * @deprecated Only for compatibility with non-Keystone overlay components.
   * @locale {en} Override the zIndex setting, effective only with `deprecatedDisableTopLayer = true`.
   * @locale {zh} 覆盖 zIndex 设置, 仅当 `deprecatedDisableTopLayer = true` 时生效。
   */
  @Prop() deprecatedZIndexOverride = 1;
  /**
   * @locale {en} By default, the floating element is the one being checked for overflow.But you can also change the context to 'reference' to instead check its overflow relative to its clipping boundary.
   * @locale {zh} 默认情况下，要检查的是浮动元素是否溢出。但你也可以将上下文更改为‘reference’，以检查其相对于其剪切边界的溢出。
   */
  @Prop() elementContext: ElementContext = 'floating';
  /**
   * @locale {en} Whether the tooltip is visible when the reference element is hidden.
   * @locale {zh} 当参考元素隐藏时，气泡卡片是否可见。
   */
  @Prop() hideOnAnchorExit = false;
  /**
   * @locale {en} The slot for the bubble card content.
   * @locale {zh} 气泡卡片内容的插槽。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'content' }) contentSlot: Slots;
  /**
   * @locale {en} The slot for the bubble card body.
   * @locale {zh} 气泡卡片主体的插槽。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'body' }) bodySlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() fromPropPopcornRef: HTMLElement;

  // 组件内部状态 ----
  @State() innerVisible: boolean = DEFAULT_VISIBLE;
  @State() innerVisibleByAnchor: boolean = DEFAULT_VISIBLE;
  @State() translateDir: 'translateX' | 'translateY' = 'translateY';
  @State() translateOffset: number = DEFAULT_TRANSITION_OFFSET;

  private hasComputedPosition = false;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private intersectionObserver: IntersectionObserver;

  @Watch('disabled')
  watchDisabled(newValue: boolean) {
    newValue && this.setInnerVisible(false);
  }

  @Watch('visible')
  watchVisible(newValue: boolean) {
    if (newValue) {
      this.trigger === 'click' && this.addOutclickQueue();
    }
    this.setInnerVisible(newValue);
  }

  @Watch('defaultVisible')
  watchDefaultVisible(newValue: boolean) {
    if (this.visible === undefined) {
      if (newValue) {
        this.trigger === 'click' && this.addOutclickQueue();
      }
      this.setInnerVisible(newValue);
    }
  }

  @Watch('innerVisibleByAnchor')
  async watchInnerVisible(newValue: boolean) {
    if (!this.popperRef) {
      return;
    }
    this.watchDocumentChange(newValue);
    await this.visibleByAnime();
    if (newValue) {
      this.addEmitOutClickQueue();
      this.computePosition();
      sendExposeTracking(this.el, { eventType: 'popup' });
      sendDurationTracking(this.el, { eventType: 'popup', reset: true });
    } else {
      sendDurationTracking(this.el, { eventType: 'popup' });
    }
  }
  @Watch('placement')
  watchPlacement() {
    this.computedPopperPosition();
  }

  cancelAutoUpdate?: () => void;

  @Watch('anchorEl')
  setupAnchorEl() {
    this.hydratePropPopcornRef();
    this.hasComputedPosition = false;
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  resolveSlotContent(slotEl: HTMLSlotElement): Range | undefined {
    if (slotRangeCache.has(slotEl)) {
      return slotRangeCache.get(slotEl);
    }
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const getSlotRange = (slotEl) => {
      // 过滤掉空字符串的 Text node 这个会导致位置计算错误
      const assignedNode = slotEl
        ?.assignedNodes({ flatten: true })
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        .filter((node) => !(node.nodeType === Node.TEXT_NODE && !node.wholeText));
      if (assignedNode?.length) {
        if (assignedNode.length === 1 && !(assignedNode[0] instanceof Text)) {
          return assignedNode[0];
        } else {
          const range = document.createRange();
          range.setStartBefore(assignedNode[0]);
          range.setEndAfter(assignedNode[assignedNode.length - 1]);
          return range;
        }
      }
    };
    const range = getSlotRange(slotEl);
    slotRangeCache.set(slotEl, range);
    return range;
  }

  removeSlotRangeCache = () => {
    slotRangeCache.delete(this.anchorSlotRef);
  };

  computePosition() {
    this.cancelAutoUpdate?.();
    if (this.popperRef) {
      this.cancelAutoUpdate = autoUpdate(this.currentPopcornRef, this.popperRef, () => {
        requestAnimationFrame(() => this.computedPopperPosition());
      });
      this.hasComputedPosition = true;
    }
  }

  get currentPopcornRef() {
    const ref = this.fromPropPopcornRef || this.resolveSlotContent(this.anchorSlotRef);
    return ref;
  }
  get currentTriggerRef() {
    return this.fromPropPopcornRef ? this.fromPropPopcornRef : this.el;
  }
  get isOutTriggerMode() {
    return this.fromPropPopcornRef;
  }

  // 组件内部监听的事件 ----
  clickHandler() {
    if (this.trigger !== 'click') {
      return;
    }
    if (this.innerVisible) {
      this.triggerHandler(false);
    } else {
      this.triggerHandler(true);
      this.addOutclickQueue();
    }
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  hoverTimer: number;
  @Listen('pointerenter')
  pointerenterHandler() {
    if (this.trigger !== 'hover') {
      return;
    }
    clearTimeout(this.hoverTimer);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.hoverTimer = undefined;
    this.triggerHandler(true);
  }

  @Listen('pointerleave')
  pointerleaveHandler() {
    if (this.trigger !== 'hover') {
      return;
    }
    this.hoverTimer = window.setTimeout(() => {
      this.triggerHandler(false);
    }, 50);
  }

  @Listen('focus', { capture: true })
  focusHandler() {
    if (this.trigger !== 'focus') {
      return;
    }
    this.triggerHandler(true);
  }

  @Listen('blur', { capture: true })
  blurHandler() {
    if (this.trigger !== 'focus') {
      return;
    }
    this.triggerHandler(false);
  }

  // 暴露给组件外部的方法 ----
  /**
   * @locale {en} Method to update the bubble card properties or state.
   * @locale {zh} 更新气泡卡片属性或状态的方法。
   */
  @Method()
  async update() {
    await this.computedPopperPosition();
  }
  /**
   * @locale {en} Method to open the bubble card.
   * @locale {zh} 打开气泡卡片的方法。
   */
  @Method()
  async open(opts?: PopoverOpenParam) {
    this.setInnerVisible(true);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    opts?.canOutclick && this.addOutclickQueue(opts?.unEmitOutClickEls || []);
    // 考虑到大部分使用场景在外部调用open时希望触发change事件，所以此处内部触发了ksVisibleChange。
    this.ksVisibleChange.emit(true);
  }
  /**
   * @locale {en} Method to close the bubble card.
   * @locale {zh} 关闭气泡卡片的方法。
   */
  @Method()
  async close() {
    this.setInnerVisible(false);
    // 考虑到大部分使用场景在外部调用close时希望触发change事件，所以此处内部触发了ksVisibleChange。
    this.ksVisibleChange.emit(false);
  }

  // 组件内部方法 ----
  /**
   * 节流 document 上的 MutationObserver 频繁触发，以提高位组件移除性能
   */
  pElRemovedObFn = watchTargetElRemoved(
    () => this.currentTriggerRef,
    () => {
      this.el.parentNode?.removeChild(this.el);
    },
  );
  hidePopper = () => {
    this.triggerHandler(false);
  };
  addOutclickQueue(unEmitOutClickEls = []) {
    outclick.on(
      this.el, // 原始区域
      this.hidePopper, // outclick回调函数
      [
        ...this.unEmitOutClickEls, // 组件props中不触发outclick的元素
        ...unEmitOutClickEls, // 自定义不触发outclick的元素
        this.el, // 当前元素不触发outclick
        this.fromPropPopcornRef, // 外部模式时，触发器不触发outclick
      ],
    );
  }

  addEmitOutClickQueue() {
    outclick.on(
      this.el, // 原始区域
      this.emitOutClick, // outclick回调函数
      [
        ...this.unEmitOutClickEls, // 组件props中不触发outclick的元素
        this.el, // 当前元素不触发outclick
        this.fromPropPopcornRef, // 外部模式时，触发器不触发outclick
      ],
    );
  }

  delayedAction?: CancellableDelayPromise;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  async triggerHandler(newVisible) {
    if (!this.hasComputedPosition) {
      this.computePosition();
    }
    this.delayedAction?.cancel();
    const delay = newVisible ? this.enterDelay : this.leaveDelay;
    if (delay) {
      try {
        await (this.delayedAction = cancellableDelay(this.enterDelay));
      } catch {
        return;
      }
    }
    this.changeVisibleState(newVisible);
  }
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  changeVisibleState(newVisible) {
    this.ksVisibleChange.emit(newVisible);
    if (!isBoolean(this.visible)) {
      this.setInnerVisible(newVisible);
    }
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  setInnerVisible(innerVisible) {
    this.innerVisible = this.disabled ? false : innerVisible;
    this.innerVisibleByAnchor = this.innerVisible;
    if (this.hideOnAnchorExit && this.innerVisible) {
      if (!this.intersectionObserver) {
        this.initIntersectionObserver();
      }
      this.intersectionObserver.observe(this.currentPopcornRef);
    } else if (this.hideOnAnchorExit && !this.innerVisible) {
      this.intersectionObserver?.disconnect();
    }
    if (!innerVisible) {
      outclick.off(this.hidePopper);
    }
  }

  computedPopperPosition = async (must?: boolean) => {
    if ((!this.innerVisible && !must) || !this.popperRef) {
      return;
    }
    const state = await computePosition(this.currentPopcornRef, this.popperRef, {
      placement: this.placement,
      strategy: this.strategy,
      middleware: [
        offset({
          mainAxis: (this.noArrow ? 4 : 10) + this.gapOffset,
          crossAxis: this.startOffset,
        }),
        flip(),
        this.autoShift &&
          shift({
            elementContext: this.elementContext,
            padding: 8,
          }),
        arrow({
          element: this.arrowRef,
          padding: 12,
        }),
        hide(),
      ].filter(Boolean),
    });
    const { x, y, placement, middlewareData } = state;
    if (this.hideOnAnchorExit) {
      if (middlewareData.hide?.referenceHidden) {
        this.innerVisibleByAnchor = false;
        return;
      } else {
        this.innerVisibleByAnchor = this.innerVisible;
      }
    }
    this.popperRef.setAttribute('data-popper-placement', placement);
    Object.assign(this.popperRef.style, {
      position: this.strategy,
      left: 0,
      top: 0,
      transform: `translate3d(${x}px, ${y}px, 0)`,
    });

    if (middlewareData.arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow;
      Object.assign(this.arrowRef.style, {
        left: arrowX !== null ? `${arrowX}px` : '',
        top: arrowY !== null ? `${arrowY}px` : '',
      });
    }

    if (/top/.test(placement)) {
      this.translateDir = 'translateY';
      this.translateOffset = DEFAULT_TRANSITION_OFFSET;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.bodyWrapRef.style.transformOrigin = `${middlewareData.arrow.x}px bottom`;
    }
    if (/bottom/.test(placement)) {
      this.translateDir = 'translateY';
      this.translateOffset = -DEFAULT_TRANSITION_OFFSET;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.bodyWrapRef.style.transformOrigin = `${middlewareData.arrow.x}px top`;
    }
    if (/left/.test(placement)) {
      this.translateDir = 'translateX';
      this.translateOffset = DEFAULT_TRANSITION_OFFSET;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.bodyWrapRef.style.transformOrigin = `right ${middlewareData.arrow.y}px`;
    }
    if (/right/.test(placement)) {
      this.translateDir = 'translateX';
      this.translateOffset = -DEFAULT_TRANSITION_OFFSET;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.bodyWrapRef.style.transformOrigin = `left ${middlewareData.arrow.y}px`;
    }
  };
  /**
   * 节流 document 上的 MutationObserver 频繁触发，以提高位置更新性能
   */
  computedPopperPositionObFn: () => void = debounce(
    () => {
      requestAnimationFrame(() => this.computedPopperPosition());
    },
    400,
    {
      leading: true,
    },
  );

  watchDocumentChange(val: boolean) {
    if (val) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.isOutTriggerMode && documentobserve.add(this.pElRemovedObFn);
      // FIXME remove any in the future
      documentobserve.add(this.computedPopperPositionObFn);
    } else {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.isOutTriggerMode && documentobserve.remove(this.pElRemovedObFn);
      documentobserve.remove(this.computedPopperPositionObFn);
    }
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  tl;
  initAnime() {
    this.tl = anime.timeline({
      targets: this.popperRef,
      duration: this.duration,
      easing: 'cubicBezier(0.5, 0, 0.5, 1)',
      begin: () => {
        if (this.innerVisibleByAnchor && this.popperRef.isConnected) {
          !this.deprecatedDisableTopLayer && this.popperRef.showPopover();
          this.popperRef.style.display = 'block';
          this.ksAfterOpen.emit();
          this.update();
        }
      },
      complete: () => {
        if (!this.innerVisibleByAnchor && this.popperRef.isConnected) {
          !this.deprecatedDisableTopLayer && this.popperRef.hidePopover();
          this.popperRef.style.display = 'none';
          this.ksAfterClose.emit();
        }
      },
    });
  }

  async visibleByAnime() {
    await this.computedPopperPosition(true);
    !this.tl && this.initAnime();
    this.tl.remove();
    this.tl.add(
      {
        targets: this.bodyWrapRef,
        easing: 'cubicBezier(0.5, 0, 0.5, 1)',
        [this.translateDir]: this.translateOffset,
        opacity: 0,
      },
      0,
    );
    this.tl.reverse();
    this.tl.restart();
    await this.tl.finished;
  }

  effectDestroyers: (() => void)[] = [];
  hydratePropPopcornRef() {
    while (this.effectDestroyers.length) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.effectDestroyers.pop()();
    }

    this.fromPropPopcornRef = typeof this.anchorEl === 'function' ? this.anchorEl() : this.anchorEl;
    if (isElement(this.fromPropPopcornRef)) {
      const targetEl = this.fromPropPopcornRef;
      ['click', 'pointerenter', 'pointerleave', 'focus', 'blur'].forEach((eventName) => {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const callback = this[`${eventName}Handler`].bind(this);
        targetEl.addEventListener(eventName, callback);
        this.effectDestroyers.push(() => targetEl.removeEventListener(eventName, callback));
      });
    }
  }

  emitOutClick = () => {
    this.ksOutClick.emit();
  };

  // 组件内部什么周期 ----
  componentDidLoad() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.pEl = this.el.parentNode;
    this.setupAnchorEl();
    if (this.visible || this.defaultVisible) {
      // FIXME:这里加异步的原因是 @Watch('innerVisible') 在tooltip 组件是生效的，但在 dropdown menu 中首次监听不到，所以加一个异步
      Promise.resolve().then(() => {
        this.setInnerVisible(true);
      });
      this.trigger === 'click' && this.addOutclickQueue();
      this.addEmitOutClickQueue();
      this.computePosition();
    }
  }
  initIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(
      debounce(
        () => {
          requestAnimationFrame(() => this.computedPopperPosition(true));
        },
        400,
        {
          leading: true,
        },
      ),
      {
        root: document.body,
        threshold: 0.1,
      },
    );
  }
  connectedCallback(): void {
    if (this.hideOnAnchorExit) {
      this.initIntersectionObserver();
      if (this.innerVisible) {
        this.intersectionObserver.observe(this.currentPopcornRef);
      }
    }
  }

  // TODO DOM 位置移动是否触发验证一下
  disconnectedCallback() {
    if (!isConnected(this.el)) {
      while (this.effectDestroyers.length) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.effectDestroyers.pop()();
      }
      this.innerVisible = false;
      this.watchDocumentChange(false);
      outclick.off(this.hidePopper);
      outclick.off(this.emitOutClick);
    }
    this.cancelAutoUpdate?.();
    this.intersectionObserver?.disconnect?.();
  }

  // 组件渲染 ----
  render() {
    const classes = classnames([
      `${prefix}__popper`,
      {
        [`${prefix}__popper--highlight`]: this.highLight,
        [`${prefix}__popper--size-${this.size}`]: this.size,
      },
    ]);
    const styles = {
      color: this.fontColor ? `${this.fontColor}` : undefined,
      // TODO: disabled 可以性能优化，直接不渲染节点
      visibility: this.disabled || (!this.content && !this.contentSlot && !this.bodySlot) ? 'hidden' : undefined,
      display: this.deprecatedDisableTopLayer ? (this.innerVisibleByAnchor ? 'block' : 'none') : undefined,
      zIndex: this.deprecatedDisableTopLayer ? String(this.deprecatedZIndexOverride) : undefined,
    };
    const arrowStyles = { display: this.noArrow ? 'none' : 'block' };
    return (
      <Host dir={dir()} ks-tooltip>
        <div dir={dir()} class={`${prefix}`} part="self">
          {
            <div
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              ref={(el) => (this.popperRef = el)}
              class={classes}
              style={styles}
              popover={this.deprecatedDisableTopLayer ? undefined : 'manual'}
            >
              {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
              <div class={`${prefix}__popper__bodywrap`} part="bodywrap" ref={(el) => (this.bodyWrapRef = el)}>
                <div
                  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                  ref={(el) => (this.arrowRef = el)}
                  part="arrow"
                  data-popper-arrow
                  class={`${prefix}__popper__arrow`}
                  style={arrowStyles}
                >
                  <span style={{ color: this.color }}></span>
                </div>
                <div class={`${prefix}__popper__body`} part="body" style={{ backgroundColor: this.color }}>
                  <slot name="body">
                    <div class={`${prefix}__popper__body__content`} style={this.contentStyle} part="content">
                      <slot name="content">{this.content}</slot>
                    </div>
                  </slot>
                </div>
              </div>
            </div>
          }

          <div
            class={`${prefix}__popcorn`}
            onClick={this.clickHandler.bind(this)}
            data-testid="ks-tooltip-index-6MxUFk"
          >
            <slot
              onSlotchange={this.removeSlotRangeCache}
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              ref={(el: HTMLSlotElement) => (this.anchorSlotRef = el)}
              data-testid="ks-tooltip-index-jmy8aK"
            ></slot>
          </div>
        </div>
      </Host>
    );
  }
}
