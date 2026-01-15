import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  Watch,
  ComponentInterface,
  Element,
  State,
  forceUpdate,
  Host,
} from '@stencil/core';
import classnames from 'classnames';
import { Slot, Slots } from '@src/utils/decorators';
import { TabSize, TabType, TabPosition } from '../../entities';
import { dir, isRTL } from '@src/utils/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking } from '@src/utils/tracking';

const prefix = 'tabs';

/**
 * @slot extra - Slot for extra content to be displayed on the right side of the tab bar.
 */
@Component({
  tag: 'ks-tabs',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsTabs implements ComponentInterface {
  ['ks-name'] = 'ks-tabs';
  // eslint-disable-next-line no-undef
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsTabsElement;
  /**
   * @locale {en} The size of the tabs. Can be one of the following values: `"md"`, `"lg"`.
   * @locale {zh} 标签页的尺寸。可选值为 `"md"`, `"lg"`。
   */
  @Prop() size: TabSize = 'md';
  /**
   * @locale {en} The ID of the currently active tab. Controls which tab is displayed.
   * @locale {zh} 当前激活选项卡的 ID。控制显示哪个选项卡。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() activeId: string;
  /**
   * @locale {en} The position of the tabs. Can be one of the following values: `top`, `bottom`, `left`, `right`.
   * @locale {zh} 选项卡的位置。可选值为 `top`, `bottom`, `left`, `right`。
   */
  @Prop() tabPosition: TabPosition = 'top';
  /**
   * @locale {en} The type of tabs, which defines the style and behavior of the tabs. Can be one of the following values: `"default"`, `lite`, `sub-tab`.
   * @locale {zh} 选项卡的类型，定义样式和行为。可选值为 `"default"`, `lite`, `sub-tab`。
   */
  @Prop() type: TabType = 'default';
  /**
   * @locale {en} Indicates whether the tabs are disabled. When `true`, the tabs are not interactive.
   * @locale {zh} 指示选项卡是否被禁用。当为 `true` 时，选项卡不可交互。
   */
  @Prop() disabled = false;
  /**
   * @locale {en} A function that is called before the active tab is changed. Can be used to cancel or delay the tab change.
   * @locale {zh} 在激活选项卡更改之前调用的函数。可用于取消或延迟选项卡的更改。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() beforeActiveChange: (tabId: string) => boolean | Promise<boolean>;
  /**
   * @locale {en} Custom event triggered when a tab is clicked. This event can be used to handle actions when a tab is clicked.
   * @locale {zh} 点击选项卡时触发的自定义事件。此事件可用于处理点击选项卡时的操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksTabClick: EventEmitter<string>;
  /**
   * @private Internal prop for dropdown usage, please don't use.
   */
  @Prop() __dropdownHeaderSticky = false;

  @Slot({
    slotname: '_default',
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    filter: (node: Element) => node['ks-name'] === 'ks-tabs-item',
  })
  // eslint-disable-next-line no-undef
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  children: Slots<HTMLKsTabsItemElement>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() activeEl: HTMLElement = null;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() headerEl: HTMLElement = null;

  tabEls: HTMLElement[] = [];

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private observer: MutationObserver;

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  get direction() {
    return this.tabPosition === 'left' || this.tabPosition === 'right' ? 'vertical' : 'horizontal';
  }

  get correctTabPosition() {
    if (this.direction === 'vertical' && isRTL()) {
      if (this.tabPosition === 'left') {
        return 'right';
      } else if (this.tabPosition === 'right') {
        return 'left';
      }
    }
    return this.tabPosition;
  }

  renderSlotContent() {
    this.children?.forEach((item) => {
      item.style.display = this.activeId === item.tabId ? 'block' : 'none';
    });
  }

  componentDidLoad() {
    this.tabEls = Array.from(this.el?.querySelectorAll('[role=tab]'));

    this.renderSlotContent();

    this.observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          this.renderSlotContent();
        }
      }
    });

    this.observer.observe(this.el, {
      childList: true, // 监听子元素的变化
    });

    const resizeObserver = new ResizeObserver(() => {
      forceUpdate(this.el);
    });

    resizeObserver.observe(this.headerEl);
  }

  @Watch('activeId')
  handleChange() {
    this.renderSlotContent();
  }

  handleClick = async (item: HTMLKsTabsItemElement) => {
    const switchable = !this.beforeActiveChange || (await this.beforeActiveChange(item.tabId));
    if (this.disabled || item.disabled || !switchable) {
      return;
    }

    this.ksTabClick.emit(item.tabId);
    sendActionTracking(this.el, { eventType: 'click', componentParams: { id: item.tabId } });
  };

  handleKeydown = (event: KeyboardEvent) => {
    let flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.moveFocusToPreviousTab(event.currentTarget);
        flag = true;
        break;

      case 'ArrowRight':
        this.moveFocusToNextTab(event.currentTarget);
        flag = true;
        break;

      case 'Home':
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.tabEls[0].focus();
        flag = true;
        break;

      case 'End':
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.tabEls[this.tabEls.length - 1].focus();
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  moveFocusToPreviousTab(currentTab) {
    const index = this.tabEls.indexOf(currentTab);
    if (index < 1) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.tabEls[this.tabEls.length - 1].focus();
    } else {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.tabEls[index - 1].focus();
    }
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  moveFocusToNextTab(currentTab) {
    const index = this.tabEls.indexOf(currentTab);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.tabEls[(index + 1) % this.tabEls.length].focus();
  }

  renderTabHeader() {
    return (
      <div class={classnames(`${prefix}__bar`, `${prefix}__bar--${this.type}`)} part="header">
        {/*  tab 头部  */}
        {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
        <div class={`${prefix}__bar-content`} ref={(el) => (this.headerEl = el)}>
          {this.children?.map((item) => {
            const isActive = item.tabId === this.activeId;
            const isDisabled = this.disabled || item.disabled;
            const ariaAttributes = Object.assign(
              {
                role: 'tab',
                'aria-selected': `${isActive}`,
              },
              !isActive ? { tabindex: -1 } : undefined,
            );
            return (
              <button
                {...ariaAttributes}
                ref={(el) => {
                  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                  this.tabEls.push(el);
                  if (isActive) {
                    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                    this.activeEl = el;
                  }
                }}
                data-tab-item={item.tabId}
                onClick={() => this.handleClick(item)}
                onKeyDown={this.handleKeydown}
                part={isActive ? 'item-active' : 'item'}
                class={classnames(`${prefix}__bar-item`, `${prefix}__bar-item--${this.size}`, {
                  [`${prefix}__bar-item--active`]: isActive,
                  [`${prefix}__bar-item--disabled`]: isDisabled,
                })}
                data-testid="ks-tabs-index-m22yjM"
              >
                <slot name={item.tabId}></slot>
              </button>
            );
          })}
        </div>
        {/* 右边额外元素 */}
        <slot name="extra"></slot>
      </div>
    );
  }

  render() {
    return (
      <Host dir={dir()} ks-tabs role="tablist">
        <div class={classnames(prefix, `${prefix}--${this.tabPosition}`, `${prefix}--${this.direction}`)} part="self">
          <div
            class={classnames(prefix, `${prefix}--${this.tabPosition}`, `${prefix}--${this.direction}`, {
              [`${prefix}--sticky`]: this.__dropdownHeaderSticky,
            })}
          >
            {/*  tab 头部  */}
            {this.renderTabHeader()}
            {/*  分割线  */}
            {this.type === 'default' && (
              <ks-divider
                orientation={this.direction}
                style={{ [`margin-${this.correctTabPosition}`]: '-1px' }}
                part="divider"
              />
            )}
          </div>
          {/*  tab 内容区  */}
          <div class={`${prefix}__content`} part="content">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
