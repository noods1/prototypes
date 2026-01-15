import {
  Component,
  h,
  Prop,
  EventEmitter,
  Event,
  Watch,
  State,
  ComponentInterface,
  Host,
  Element,
  Fragment,
} from '@stencil/core';
import { ks } from '@fe-infra/keystone-design-tokens';
import { Slot, Slots } from '@src/utils/decorators';
import anime from 'animejs';
import { dir } from '@src/utils/utils';
import { InlineAlertVariant, InfoOrientation, ItemType, BackgroundVariant, InfoSize } from '../../entities';
import { InternalRenderDynamicSlots } from '@src/utils/inline-alert/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking } from '@src/utils/tracking';
import { SvgFilledTips } from './SvgFilledTips';

const prefix = 'inline-alert';
const DIVIDER_VARIANT = 'neutral';

const getIcon = (variant: string) => {
  switch (variant) {
    case 'success':
      return <ks-icon-filled-check innerColor={ks.color.success.onFillLow} />;
    case 'warning':
      return <ks-icon-filled-warning innerColor={ks.color.warning.onFillLow} />;
    case 'error':
      return <ks-icon-filled-caution innerColor={ks.color.error.onFillLow} />;
    default:
      return <ks-icon-filled-info innerColor={ks.color.primary.onFillLow} />;
  }
};

/**
 * @slot icon - Allows customization of the icon displayed in the inline-alert.
 * @slot message - The main content section that displays the alert message text.;
 * @slot close-btn - Allows customization of the close button.
 * @slot title - Allows customization of the title area of the inline-alert.
 * @slot action - Allows customization of the action area of the inline-alert.
 */
@Component({
  tag: 'ks-inline-alert',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsInlineAlert implements ComponentInterface {
  ['ks-name'] = 'ks-inline-alert';
  // eslint-disable-next-line no-undef
  @Element() el!: HTMLKsInlineAlertElement;
  /**
   * @locale {en} The variant of the info message. Possible values include `"info"`, `"warning"`, `"error"`, `"success"` and `"suggestion"`.
   * @locale {zh} 提示信息的变体。可选值包括 `"info"`、`"warning"`、`"error"`、`"success"` 和 `"suggestion"`。
   */
  @Prop() variant: InlineAlertVariant = 'info';
  /**
   * @locale {en} The background variant of the info message. Possible values are `"normal"` (gray background) and `"inverse"` (white background for better contrast on dark themes).
   * @locale {zh} 提示信息的背景颜色，默认为灰色，当inverse为true时为切换为白色为深色背景提供对比。
   */
  @Prop() background: BackgroundVariant = 'normal';
  /**
   * @locale {en} Controls the visibility of the alert. Defaults to `true` when undefined. When set to `true`, the alert will be displayed and cannot be closed by clicking the close button (if present).
   * @locale {zh} 控制提示信息的可见性。未定义时默认为 `true`。当设置为 `true` 时，提示信息将强制显示且无法通过关闭按钮（如果存在）关闭，此设置会覆盖默认的显示/隐藏行为。
   */
  @Prop() visible?: boolean;
  /**
   * @locale {en} Indicates whether to show an icon in the info message. When `true`, an icon is displayed.
   * @locale {zh} 指示是否在提示信息中显示图标。当值为 `true` 时，显示图标。
   */
  @Prop() showIcon = true;
  /**
   * @locale {en} The size of the inlineAlert.
   * Possible values are `"md"` (default) or `"sm"`.
   * @locale {zh} 内联提示信息的尺寸。
   * 可选值为 `"md"` (默认) 或 `"sm"`。
   */
  @Prop() size: InfoSize = 'md';
  /**
   * @locale {en} Indicates whether the info message has a close button. When `true`, a close button is displayed.
   * @locale {zh} 指示提示信息是否具有关闭按钮。当值为 `true` 时，显示关闭按钮。
   */
  @Prop() closeable = true;
  /**
   * @locale {en} Indicates whether to disable animations for the info message. When `true`, animations are disabled.
   * @locale {zh} 指示是否禁用提示信息的动画效果。当值为 `true` 时，禁用动画。
   */
  @Prop() disableAnimation = false;
  /**
   * @locale {en} An array of inline-alert content objects. Each object represents a piece of inline-alert information,
   * which can include an ID, link, and other relevant data. This is used to render multiple inline-alert items.
   * @locale {zh} 引导内容对象数组。每个对象代表一条引导信息，可包含 ID、链接和其他相关数据，用于渲染多个引导项。
   */
  @Prop() items: ItemType[] = [];
  /**
   * @locale {en} Indicates whether to show the "View more/less" functionality.
   * When `true`, a "View more/less" link will be displayed if there is collapsible content.
   * @locale {zh} 指示是否显示“查看更多/更少”功能。当值为 `true` 时，如果存在可折叠内容，将显示“查看更多/更少”链接。
   */
  @Prop() collapsible = false;
  /**
   * @locale {en} Indicates whether the inline-alert content is collapsed.
   * When `true`, the collapsible part of the inline-alert content will be hidden, has higher priority than default collapsing behavior.
   * @locale {zh} 指示引导内容是否处于折叠状态。当值为 `true` 时，引导内容的可折叠部分将被强制隐藏， 优先级高于默认的collapse行为。
   */
  @Prop() collapsed?: boolean;
  /**
   * @locale {en} The orientation of the info message. Possible values are `horizontal` or `vertical`. If `items` is provided and has items, the orientation will be forced to `vertical`. Default: `vertical`.
   * @locale {zh} 提示信息的方向。可选值为 `horizontal` 或 `vertical`。如果提供了 `items` 且包含项目，则方向将强制为 `vertical`。默认：`vertical`。
   */
  @Prop() orientation: InfoOrientation = 'vertical';
  /**
   * @locale {en} The ARIA role attribute for accessibility support.
   * @locale {zh} 用于无障碍访问(a11y)支持的 ARIA role 属性。
   */
  // 不要使用 @Prop 装饰器，因为 HTMLElement 已经有 role 属性
  // @Prop() role = 'alert';

  /**
   * @locale {en} Custom event triggered when the info message is closed.
   * @locale {zh} 当提示信息被关闭时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksClose!: EventEmitter<void>;
  /**
   * @locale {en} Custom event triggered when the info message is clicked.
   * @locale {zh} 当提示信息被点击时触发的自定义事件。
   */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  @Event({ bubbles: false, composed: false }) ksLinkClick!: EventEmitter<void | number | string>;
  /**
   * @locale {en} Custom event triggered after the info message has closed.
   * @locale {zh} 当提示信息关闭后触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksAfterClose!: EventEmitter<void>;
  /**
   * @locale {en} Custom event triggered after the info message has closed.
   * @locale {zh} 当提示信息关闭后触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksCollapseChange!: EventEmitter<boolean>;

  /**
   * @locale {en} The title of the inline-alert, which is displayed prominently at the top.
   * @locale {zh} inline-alert 的标题，显示在顶部。
   */
  @Slot({ slotname: 'title' }) titleSlot?: Slots;
  /**
   * @locale {en} The action area of the inline-alert, which is displayed prominently at the end.
   * @locale {zh} inline-alert 的操作区域，显示在末尾。
   */
  @Slot({ slotname: 'action' }) actionSlot?: Slots;

  @Slot({ slotname: 'message' }) messageSlot?: Slots;

  @Slot({ slotname: 'icon' }) iconSlot?: Slots;

  /**
   * 控制动画显隐
   */
  @State() __visible: boolean = this.visible ?? true;
  @State() __collapsed = false;
  @Watch('visible')
  handleWatch(val: boolean) {
    if (this.disableAnimation) {
      this.__visible = val;
      return;
    }
    anime({
      targets: this.el,
      height: val ? '' : 0,
      opacity: val ? 1 : 0,
      duration: 200,
      easing: 'cubicBezier(0.4, 0, 0.2, 1)',
      complete: () => {
        if (val) {
          // Reset height to empty string to ensure proper animation on subsequent transitions.
          this.el.style.height = '';
        }

        this.__visible = val;

        if (!val) {
          this.ksAfterClose.emit();
        }
      },
    });
  }
  @Watch('collapsed')
  handleCollapse() {
    if (this.collapsed) this.__collapsed = this.collapsed;
  }

  constructor() {
    registerPluginManager(this.el);
  }

  handleClose = () => {
    // presented visible has higher priority
    if (typeof this.visible !== 'boolean') {
      this.__visible = false;
    }
    // still triggers the close event
    this.ksClose?.emit();
    sendActionTracking(this.el, { eventType: 'close' });
  };

  handleCollapseChange() {
    // presented collapsed has higher priority
    if (typeof this.collapsed !== 'boolean') {
      this.__collapsed = !this.__collapsed;
    }
    // still triggers the collapse change event
    this.ksCollapseChange.emit(this.__collapsed);
  }

  static __internal_renderDynamicSlots(
    props: Partial<KsInlineAlert>,
    wrapWithSlot: (slotName: string, children: unknown) => unknown,
  ) {
    return InternalRenderDynamicSlots(props, wrapWithSlot);
  }

  componentWillLoad(): void {
    this.__visible = this.visible ?? true;
    this.__collapsed = this.collapsed ?? false;
  }

  render() {
    const variant = this.variant === 'info' ? 'primary' : this.variant === 'suggestion' ? 'support' : this.variant;
    const multiLayout = this.items.length > 0;
    const orientation = this.items.length > 0 ? 'vertical' : this.orientation;
    const isVertical = orientation === 'vertical';
    const leftFrameCls = {
      [`${prefix}__frame`]: true,
      [`${prefix}--${variant}_frame-normal`]: this.background === 'normal',
      [`${prefix}--${variant}_frame-inverse`]: this.background === 'inverse',
    };
    const contentCls = {
      [prefix]: true,
      [`${prefix}--${orientation}`]: true,
      [`${prefix}--${this.background}`]: true,
      [`${prefix}--${variant}`]: true,
      [`${prefix}--compact`]: this.size === 'sm',
    };
    const content = multiLayout ? (
      <div class={{ ['content']: true, ['content-close']: this.__collapsed }}>
        <div class={{ ['content-container']: true, ['content-container-close-multiple']: this.__collapsed }}>
          {this.items.map((info, index) => (
            <Fragment>
              {info.content?.() && (
                <div
                  class={`${prefix}__body-content ${this.titleSlot && index === 0 ? '' : `${prefix}__body-content-no_title`}`}
                  part="content"
                >
                  <slot name={`slot-content-${info.id}`}></slot>
                </div>
              )}
              {info.link?.() && (
                <div class={`${prefix}__body-link`} part="action">
                  <ks-link
                    onClick={() => {
                      this.ksLinkClick?.emit(info.id);
                      sendActionTracking(this.el, {
                        eventType: 'click',
                        subEventType: 'info',
                        componentParams: { id: info.id },
                      });
                    }}
                    data-testid="ks-inline-alert-index-w1UGyK"
                    size="sm"
                  >
                    <slot name={`slot-link-${info.id}`}></slot>
                  </ks-link>
                </div>
              )}
              {(index !== this.items.length - 1 || this.collapsible) && <ks-divider variant={DIVIDER_VARIANT} />}
            </Fragment>
          ))}
        </div>
        {this.collapsible && (
          <div class={`${prefix}__link`} part="action">
            <slot name="action">
              <ks-link
                onClick={() => {
                  this.handleCollapseChange();
                  const text = this.actionSlot?.map((item) => item.textContent).join('\n');
                  sendActionTracking(this.el, {
                    eventType: 'click',
                    componentParams: { text },
                  });
                }}
                size="sm"
                data-testid="ks-inline-alert-index-4FuCAx"
              >
                <span class={{ [`${prefix}__link-view`]: true, [`${prefix}__link-view-rotate`]: !this.__collapsed }}>
                  View {this.__collapsed ? 'more' : 'less'}
                  <ks-icon-chevron-down class={'chevron'} size={14}></ks-icon-chevron-down>
                </span>
              </ks-link>
            </slot>
          </div>
        )}
      </div>
    ) : (
      <Fragment>
        {this.messageSlot && (
          <div
            class={{
              ['content-container-close']: this.__collapsed,
              [`${prefix}__body-content`]: true,
            }}
            part="content"
          >
            <slot name="message"></slot>
          </div>
        )}
        {this.actionSlot && (!this.collapsible || !isVertical) && (
          <div class={`${prefix}__links-container`} part="action">
            <slot name="action"></slot>
          </div>
        )}
        {this.collapsible && (
          <div class={`${prefix}__link`} part="action">
            <ks-link
              onClick={() => {
                this.handleCollapseChange();
                const text = this.actionSlot?.map((item) => item.textContent).join('\n');
                sendActionTracking(this.el, {
                  eventType: 'click',
                  componentParams: { text },
                });
              }}
              size="sm"
              data-testid="ks-inline-alert-index-mQ4tVh"
            >
              <slot name="action">
                <span class={{ [`${prefix}__link-view`]: true, [`${prefix}__link-view-rotate`]: !this.__collapsed }}>
                  View {this.__collapsed ? 'more' : 'less'}
                  <ks-icon-chevron-down class={'chevron'} size={14}></ks-icon-chevron-down>
                </span>
              </slot>
            </ks-link>
          </div>
        )}
      </Fragment>
    );

    return (
      <Host dir={dir()} ks-inline-alert role="alert">
        {this.__visible ? (
          <div dir={dir()} class={leftFrameCls} part="frame">
            <div class={contentCls} part="base">
              {this.showIcon && (
                <div class={`${prefix}__icon ${this.titleSlot ? `${prefix}__icon-title` : ``}`}>
                  <slot name="icon">{variant === 'support' ? <SvgFilledTips /> : getIcon(variant)}</slot>
                </div>
              )}
              <div
                class={`${prefix}__body ${this.size === 'sm' && isVertical ? `${prefix}__body-compact` : ''}`}
                part="body"
              >
                {this.titleSlot && (
                  <div class={`${prefix}__body-title`} part="title">
                    <slot name="title"></slot>
                  </div>
                )}
                {content}
              </div>
              {this.closeable && (
                <div class={`${prefix}__close`} onClick={this.handleClose} data-testid="ks-inline-alert-index-iQPhqh">
                  <slot name="close-btn">
                    <ks-button variant="text" shape="square" size="xs">
                      <ks-icon-close size="14" />
                    </ks-button>
                  </slot>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </Host>
    );
  }
}
