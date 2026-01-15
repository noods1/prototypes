/* eslint-disable no-undef */
import {
  Component,
  Host,
  h,
  Element,
  Prop,
  Watch,
  Event,
  type ComponentInterface,
  type EventEmitter,
} from '@stencil/core';
import anime from 'animejs';
import { dir, isRTL } from '@src/utils/utils';
import { sendActionTracking } from '@src/utils/tracking';
import { registerPluginManager } from '@src/utils/plugin';
import type { AnchorDisplay, AnchorItem } from '../../entities';

const prefix = 'anchor';

@Component({
  tag: 'ks-anchor',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsAnchor implements ComponentInterface {
  ['ks-name'] = 'ks-anchor';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsAnchorElement;

  /**
   * @locale {en} Title of the anchor component.
   * @locale {zh} 锚点的大标题。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() title: string;
  /**
   * @locale {en} Data configuration option content, support nesting through `items`.
   * @locale {zh} 数据化配置选项内容，支持通过 `items` 嵌套。
   */
  @Prop() items: AnchorItem[] = [];
  /**
   * @locale {en} Current active anchor item `value`.
   * @locale {zh} 当前激活的锚点项的 `value` 值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() activeItem: string;
  /**
   * @locale {en} Display mode of the anchor component. Can be one of the following values:
   * - `"always"`: Always visible.
   * - `"collapsible"`: Always visible but can be manually collapsed.
   * - `"hideable"`: Can be manually shown or hidden.
   * @locale {zh} 锚点组件的显示模式。可选值为：
   * - `"always"`：始终展示。
   * - `"collapsible"`：始终展示，但可以手动收缩。
   * - `"hideable"`：可以手动显示或隐藏。
   */
  @Prop() collapseType: AnchorDisplay = 'always';
  /**
   * @locale {en} Determines whether the anchor component is currently collapsed or hidden. Effective when `collapseType` is 'collapsible' or 'hideable'.
   * @locale {zh} 用于判断锚点组件当前是否已收缩或隐藏。当 `collapseType` 为 'collapsible' 或 'hideable' 时生效。
   */
  @Prop() collapsed = false;
  /**
   * @locale {en} Custom event triggered when an anchor item is clicked. Returns the `value` of the clicked item.
   * @locale {zh} 点击每个锚点项时触发的自定义事件。返回被点击项的 `value` 值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksAnchorItemClick: EventEmitter<string>;

  @Watch('collapsed')
  collapsedWatcher(val: boolean) {
    if (this.collapseType !== 'collapsible') {
      return;
    }

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const wrapperEl = this.el.shadowRoot.querySelector<HTMLUListElement>(`.${prefix}__wrapper`);
    anime({
      targets: wrapperEl,
      duration: 200,
      easing: 'cubicBezier(0.4, 0, 0.2, 1)',
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      height: val ? [wrapperEl.scrollHeight, 0] : [0, wrapperEl.scrollHeight],
      complete: () => {
        if (!val) {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          wrapperEl.removeAttribute('style-hidden');
        } else {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          wrapperEl.setAttribute('style-hidden', 'true');
        }

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        wrapperEl.style.height = '';
      },
    });
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  handleClickItem(item: AnchorItem) {
    this.activeItem = item.value;
    this.ksAnchorItemClick.emit(item.value);
    sendActionTracking(this.el, { eventType: 'click', componentParams: { value: item.value } });
  }

  renderItems(items: AnchorItem[], depth: number) {
    if (!Array.isArray(items)) {
      return null;
    }

    const cls = {
      [`${prefix}__content`]: true,
      [`${prefix}__sub`]: depth > 0,
    };

    const labelStyle = { [isRTL() ? 'paddingRight' : 'paddingLeft']: `${24 + depth * 12}px` };
    return (
      <ul class={cls} data-depth={depth}>
        {items.map((item) => {
          const labelClasses = {
            [`${prefix}__content-label`]: true,
            [`${prefix}__content-label--active`]: this.activeItem === item.value,
          };
          return (
            <li key={item.value} data-testid={`ks-anchor-index-eEfRyz-${item.value}`}>
              <a
                class={labelClasses}
                href={item.href}
                style={labelStyle}
                onClick={this.handleClickItem.bind(this, item)}
                data-testid="ks-anchor-index-5Kgkjg"
              >
                <span>{item.label}</span>
              </a>
              {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
              {this.renderItems(item.items, depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const classes = {
      [prefix]: true,
      [`${prefix}--${this.collapseType}`]: true,
      [`${prefix}--hidden`]: this.collapsed,
    };
    return (
      <Host dir={dir()} ks-anchor>
        <nav dir={dir()} class={classes} part="self">
          <div class={`${prefix}__title`}>
            <ks-text variant="titleMd" ellipsis>
              {this.title}
            </ks-text>
            {this.collapseType === 'collapsible' && (
              <ks-button
                size="xs"
                variant="text"
                onClick={() => {
                  this.collapsed = !this.collapsed;
                }}
                data-testid="ks-anchor-index-3JaHKw"
              >
                {this.collapsed ? <ks-icon-chevron-down size="14" /> : <ks-icon-chevron-up size="14" />}
              </ks-button>
            )}

            {this.collapseType === 'hideable' && (
              <ks-button
                size="xs"
                variant="text"
                onClick={() => {
                  this.collapsed = !this.collapsed;
                }}
                data-testid="ks-anchor-index-8mdmRx"
              >
                {this.collapsed ? <ks-icon-unfold size="14" /> : <ks-icon-fold size="14" />}
              </ks-button>
            )}
          </div>
          <div class={`${prefix}__wrapper`}>{this.renderItems(this.items, 0)}</div>
        </nav>
      </Host>
    );
  }
}
