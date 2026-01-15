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
} from '@stencil/core';
import { ks } from '@fe-infra/keystone-design-tokens';
import classnames from 'classnames';
import { Slot, Slots } from '@src/utils/decorators';
import anime from 'animejs';
import { dir } from '@src/utils/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { GlobalAlertVariant, InfoOrientation } from '../../entities';
import { sendActionTracking, sendExposeTracking } from '@src/utils/tracking';

const prefix = 'global-alert';

/**
 * @slot icon - Slot for a custom icon. If not provided, a default icon based on the `variant` prop is displayed if `showIcon` is true.
 * @slot closebtn - Slot for a custom close button. If not provided, a default close button is displayed if `hasClose` is true.
 * @slot title - Slot for the title of the global alert. Displayed above the main content.
 * @slot content - Slot for additional descriptive content. Displayed below the default slot content if both are used, or as the main content if the default slot is empty.
 * @slot append - Slot for content appended to the right of the main body, often used for actions or links. The `link` slot is typically placed here.
 * @slot link - Slot for the link text or interactive element within the clickable link area. This area becomes active if the `append` or `link` slot has content.
 * @slot pagination - Slot for pagination controls, typically used when this banner is part of a series (e.g., in `ks-multiple-global-alert`).
 */
@Component({
  tag: 'ks-global-alert',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsGlobalAlert implements ComponentInterface {
  ['ks-name'] = 'ks-global-alert';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsGlobalAlertElement;
  /**
   * @locale {en} The variant of the info message. Possible values include `"info"`, `"warning"`, `"error"`.
   * @locale {zh} 提示信息的变体。可选值包括 `"info"`、`"warning"`、`"error"`。
   */
  @Prop() variant: GlobalAlertVariant = 'info';
  /**
   * @deprecated vertical variation is now removed and orientation should always be horizontal.
   * @locale {en} The orientation of the info message. Possible value is `horizontal` or `vertical`. This also affects the default icon size.
   * @locale {zh} 提示信息的方向。可选值为 `horizontal` 或 `vertical`。此属性也会影响默认图标的大小。
   */
  @Prop() orientation: InfoOrientation = 'horizontal';
  /**
   * @locale {en} Indicates whether the info message is currently visible. When `true`, the info message is displayed.
   * @locale {zh} 指示提示信息当前是否可见。当值为 `true` 时，提示信息显示。
   */
  @Prop() visible = true;
  /**
   * @locale {en} Indicates whether to show an icon in the info message. When `true`, an icon is displayed.
   * @locale {zh} 指示是否在提示信息中显示图标。当值为 `true` 时，显示图标。
   */
  @Prop() showIcon = true;
  /**
   * @locale {en} Indicates whether the info message has a close button. When `true`, a close button is displayed.
   * @locale {zh} 指示提示信息是否具有关闭按钮。当值为 `true` 时，显示关闭按钮。
   */
  @Prop() hasClose = true;
  /**
   * @locale {en} Indicates whether to disable animations for the info message. When `true`, animations are disabled.
   * @locale {zh} 指示是否禁用提示信息的动画效果。当值为 `true` 时，禁用动画。
   */
  @Prop() disableAnimation = false;
  /**
   * @locale {en} Custom event triggered when the info message is closed.
   * @locale {zh} 当提示信息被关闭时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClose: EventEmitter<void>;
  /**
   * @locale {en} Custom event triggered when the link display area is clicked.
   * @locale {zh} 当链接显示区域被点击时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksLinkClick: EventEmitter<void>;
  /**
   * @locale {en} Custom event triggered after the info message has closed.
   * @locale {zh} 当提示信息关闭后触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksAfterClose: EventEmitter<void>;
  /**
   * @locale {en} Slot for the title of the global alert. Content provided here will be rendered as the title.
   * @locale {zh} 用于 global alert 标题的插槽。此处提供的内容将作为标题呈现。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'title' }) titleSlot: Slots;
  /**
   * @locale {en} Slot for content to be appended, typically displayed to the right or after the main content, often housing links or actions. Controls visibility of the link area along with `linkSlot`.
   * @locale {zh} 用于附加内容的插槽，通常显示在主要内容的右侧或之后，常用于放置链接或操作按钮。与 `linkSlot` 一同控制链接区域的可见性。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'append' }) appendSlot: Slots;
  /**
   * @locale {en} Slot for the link content within the global alert. Clicking this area triggers the `ksLinkClick` event. Its content is also used for tracking purposes.
   * @locale {zh} 用于 global alert 中链接内容的插槽。点击此区域会触发 `ksLinkClick` 事件。其内容也会用于埋点追踪。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'link' }) linkSlot: Slots;
  /**
   * 控制动画显隐
   */
  @State() _visible: boolean = this.visible;

  @State() size = 16;

  private renderIcon() {
    switch (this.variant) {
      case 'info':
        return <ks-icon-filled-info size={this.size} innerColor={ks.color.neutral.onFillLow} />;
      case 'warning':
        return <ks-icon-filled-warning size={this.size} innerColor={ks.color.warning.onFillLow} />;
      case 'error':
        return <ks-icon-filled-caution size={this.size} innerColor={ks.color.error.onFillLow} />;
      default:
        return null;
    }
  }

  @Watch('visible')
  handleWatch(val: boolean) {
    if (this.disableAnimation) {
      this._visible = val;
      return;
    }
    anime({
      targets: this.el,
      height: val ? 'auto' : 0,
      opacity: val ? 1 : 0,
      duration: 200,
      easing: 'cubicBezier(0.4, 0, 0.2, 1)',
      complete: () => {
        this._visible = val;

        if (!val) {
          this.ksAfterClose.emit();
        } else {
          sendExposeTracking(this.el, { eventType: 'visible' });
        }
      },
    });
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  componentWillLoad() {
    this._visible = this.visible;
  }

  handleClick() {
    this.ksLinkClick.emit();
    sendActionTracking(this.el, {
      eventType: 'click',
      subEventType: 'link',
      componentParams: { link: this.linkSlot.map((item) => item.textContent).join('\n') },
    });
  }

  handleClose() {
    this.ksClose.emit();
    sendActionTracking(this.el, { eventType: 'close' });
  }

  render() {
    const cls = classnames(prefix, `${prefix}--${this.orientation}`, `${prefix}--${this.variant}`);
    return (
      <Host dir={dir()} ks-global-alert role="alert">
        {this._visible ? (
          <div dir={dir()} class={cls} part="self">
            <slot name="pagination"></slot>
            {this.showIcon && <slot name="icon">{this.renderIcon()}</slot>}
            <div class={`${prefix}__body`} part="body">
              {this.titleSlot && (
                <div class={`${prefix}__body-title`} part="title">
                  <slot name="title"></slot>
                </div>
              )}

              <div class={`${prefix}__body-content`} part="content">
                <slot></slot>
                <slot name="content"></slot>
              </div>
              {(this.linkSlot || this.appendSlot) && (
                <slot name="append">
                  <div
                    class={`${prefix}__body-link`}
                    part="link"
                    onClick={this.handleClick.bind(this)}
                    data-testid="ks-global-alert-index-22C6cW"
                  >
                    <ks-link variant={this.variant === 'info' ? 'primary' : this.variant}>
                      <slot name="link"></slot>
                    </ks-link>
                  </div>
                </slot>
              )}
            </div>
            {this.hasClose && (
              <div
                class={`${prefix}__close`}
                onClick={this.handleClose.bind(this)}
                data-testid="ks-global-alert-index-8kHUB3"
              >
                <slot name="closebtn">
                  <ks-button variant="text" shape="square" size="xs">
                    <ks-icon-close size="14" />
                  </ks-button>
                </slot>
              </div>
            )}
          </div>
        ) : null}
      </Host>
    );
  }
}
