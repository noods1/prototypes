import { Component, ComponentInterface, Element, Prop, Method, Event, h, EventEmitter, Host } from '@stencil/core';
import { dir } from '@src/utils/utils';
import { PopoverPropTrigger, PopoverSize } from '../../entities';
import { Slot, Slots } from '@src/utils/decorators';
import { sendDurationTracking, sendExposeTracking } from '@src/utils/tracking';
import { registerPluginManager } from '@src/utils/plugin';

import type { Placement, Strategy, ElementContext } from '@floating-ui/dom';

const prefix = 'popover';
const DEFAULT_TRIGGER = 'click';
const DEFAULT_PLACEMENT = 'top';
const DEFAULT_VISIBLE = false;

/**
 * @slot content - Slot for the main content to be displayed inside the popover. This is an alternative to using the `content` prop.
 * @slot body - Slot for more complex body content within the popover. Can be used if the `content` slot or prop is not sufficient.
 */
@Component({
  tag: 'ks-popover',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsPopover implements ComponentInterface {
  ['ks-name'] = 'ks-popover';
  // 组件内部变量 ----
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  pEl: Node;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  tooltipEl: HTMLKsTooltipElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsPopoverElement;
  // 组件props ----
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
  @Prop() enterDelay = 0;
  /**
   * @locale {en} Delay before the bubble card is hidden when triggered, in milliseconds.
   * @locale {zh} 触发后隐藏气泡卡片的延迟时间，以毫秒为单位。
   */
  @Prop() leaveDelay = 0;
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
   * @locale {en} The size of the bubble card. Can be one of the following values: `"sm"`, `"md"`, `"lg"`.
   * @locale {zh} 气泡卡片的大小。可以是以下值之一：`"sm"`、`"md"`、`"lg"`。
   */
  @Prop() size: PopoverSize = 'md';
  /**
   * @locale {en} The duration of the animation in milliseconds.
   * @locale {zh} 动画持续时间，以毫秒为单位。
   */
  @Prop() duration = 150;
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
   * @locale {en} The anchor element to which the bubble card is attached. Can be an HTMLElement or a function returning one.
   * @locale {zh} 气泡卡片附加的锚点元素。可以是一个 HTMLElement 或一个返回 HTMLElement 的函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() anchorEl: HTMLElement | (() => HTMLElement);
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

  /**
   * @locale {en} Method to update the bubble card properties or state.
   * @locale {zh} 更新气泡卡片属性或状态的方法。
   */
  @Method()
  async update() {
    await this.tooltipEl.update();
  }
  /**
   * @locale {en} Method to open the bubble card.
   * @locale {zh} 打开气泡卡片的方法。
   */
  @Method()
  async open() {
    this.tooltipEl.open();
  }
  /**
   * @locale {en} Method to close the bubble card.
   * @locale {zh} 关闭气泡卡片的方法。
   */
  @Method()
  async close() {
    this.tooltipEl.close();
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  // 组件渲染 ----
  render() {
    const width = this.size === 'sm' ? '240px' : this.size === 'md' ? '320px' : '480px';
    return (
      <Host dir={dir()} ks-popover>
        <ks-tooltip
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          ref={(el) => (this.tooltipEl = el)}
          size={this.size}
          defaultVisible={this.defaultVisible}
          visible={this.visible}
          content={this.content}
          placement={this.placement}
          trigger={this.trigger}
          enterDelay={this.enterDelay}
          leaveDelay={this.leaveDelay}
          color={this.color}
          fontColor={this.fontColor}
          highLight={this.highLight}
          unEmitOutClickEls={this.unEmitOutClickEls}
          noArrow={this.noArrow}
          strategy={this.strategy}
          gapOffset={this.gapOffset}
          startOffset={this.startOffset}
          duration={this.duration}
          anchorEl={this.anchorEl}
          autoShift={this.autoShift}
          elementContext={this.elementContext}
          hideOnAnchorExit={this.hideOnAnchorExit}
          onKsVisibleChange={(e) => {
            this.ksVisibleChange.emit(e.detail);
            if (e.detail) {
              sendExposeTracking(this.el, { eventType: 'popup' });
              sendDurationTracking(this.el, { eventType: 'popup', reset: true });
            } else {
              sendDurationTracking(this.el, { eventType: 'popup' });
            }
          }}
          onKsAfterClose={() => this.ksAfterClose.emit()}
          onKsAfterOpen={() => this.ksAfterOpen.emit()}
          contentStyle={{
            padding: 'var(--ks-spacing-400)',
            ...this.contentStyle,
            width,
          }}
          data-testid="ks-popover-index-nVvWcr"
          class={`${prefix}`}
        >
          {this.contentSlot && <slot name="content" slot="content"></slot>}
          {this.bodySlot && <slot name="body" slot="body"></slot>}
          <slot></slot>
        </ks-tooltip>
      </Host>
    );
  }
}
