import {
  Component,
  Element,
  h,
  Method,
  Prop,
  State,
  Event,
  EventEmitter,
  Host,
  ComponentInterface,
} from '@stencil/core';
import classnames from 'classnames';
import { ks } from '@fe-infra/keystone-design-tokens';
import anime from 'animejs';
import { dir, t } from '@src/utils/utils';
import { Slot, type Slots } from '@src/utils/decorators';
import { registerPluginManager } from '@src/utils/plugin';
import { sendDurationTracking, sendExposeTracking } from '@src/utils/tracking';
import { ToastVariant, ToastSize, CSSProperties } from '../../entities';
import { commonMessages } from '@fe-infra/keystone-locales';

const presetIcons = {
  success: <ks-icon-filled-check innerColor={ks.color.success.onFillLow} color={ks.color.success.fillLow} />,
  warning: <ks-icon-filled-warning innerColor={ks.color.warning.onFillLow} color={ks.color.warning.fillLow} />,
  error: <ks-icon-filled-caution innerColor={ks.color.error.onFillLow} color={ks.color.error.fillLow} />,
  info: <ks-icon-filled-info innerColor={ks.color.primary.onFillLow} color={ks.color.primary.fillLow} />,
  loading: <ks-icon-loading color={ks.color.primary.fill} />,
};

const prefix = 'toast';

/**
 * @slot icon - Slot for the icon displayed in the toast body.
 * @slot body - Slot for the entire body of the toast, which includes the icon and main content.
 * @slot action - Slot for action elements, displayed at the end of the toast.
 * @slot closebtn - Slot for the content of the close button.
 */
@Component({
  tag: 'ks-toast',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsToast implements ComponentInterface {
  ['ks-name'] = 'ks-toast';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsToastElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  rootEl: HTMLElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() timer: number;

  // props   --------------------
  /**
   * @locale {en} The title of the global toast. This is the main heading of the toast.
   * @locale {zh} 全局通知的标题。此属性为通知的主要标题。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() title: string;
  /**
   * @locale {en} The content of the global toast. This provides additional information about the toast.
   * @locale {zh} 全局通知的内容。此属性提供有关通知的额外信息。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() content: string;
  /**
   * @locale {en} The name of the icon to be displayed in the toast. Can be one of the following values: `"success"`, `"warning"`, `"error"`, `"info"` or `"loading"`.
   * @locale {zh} 要在通知中显示的图标名称。可选值包括：`"success"`、`"warning"`、`"error"`、`"info"` 或 `"loading"`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() iconName: ToastVariant;
  /**
   * @locale {en} Indicates whether the icon should be displayed. When `true`, the icon will be shown.
   * @locale {zh} 指示是否应该显示图标。当值为 `true` 时，图标将被显示。
   */
  @Prop() showIcon = false;
  /**
   * @locale {en} The duration (in milliseconds) for which the toast will be displayed before automatically closing. If set to `0`, the toast will not close automatically.
   * @locale {zh} 通知将被显示的持续时间（以毫秒为单位），在自动关闭之前。如果设置为 `0`，则通知不会自动关闭。
   */
  @Prop() duration = 3000;
  /**
   * @locale {en} Indicates whether the toast can be closed by the user. When `true`, the close button will be shown.
   * @locale {zh} 指示用户是否可以关闭通知。当值为 `true` 时，将显示关闭按钮。
   */
  @Prop() closeable = false;
  /**
   * @locale {en} The visual variant of the toast. Can be one of the following values: `"success"`, `"warning"`, `"error"`, `"info"` or `"loading"`.
   * @locale {zh} 通知的视觉变体。可选值包括：`"success"`、`"warning"`、`"error"`、`"info"` 或 `"loading"`。
   */
  @Prop() variant: ToastVariant = 'info';
  /**
   * @locale {en} The size of the toast. Can be either `"sm"` or `"md"`.
   * @locale {zh} 通知的大小。可选值包括 `"sm"` 或 `"md"`。
   */
  @Prop() size: ToastSize = 'sm';
  /**
   *  @locale {en} The slot in the action area, at the end of the toast.
   *  @locale {zh} action 区域的插槽，在toast的末尾。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'action' }) actionSlots: Slots;

  // 生命周期 --------------------
  /**
   * @locale {en} A lifecycle method that is called before the toast opens. This can be used to perform any necessary preparations.
   * @locale {zh} 在通知打开之前调用的生命周期方法。这可以用于执行任何必要的准备工作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() beforeOpen: () => Promise<boolean> | boolean;
  /**
   * @locale {en} A lifecycle method that is called after the toast has opened. This can be used to perform any necessary actions after opening.
   * @locale {zh} 在通知打开之后调用的生命周期方法。这可以用于在打开后执行任何必要的操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() afterOpen: () => Promise<void> | void;
  /**
   * @locale {en} A lifecycle method that is called before the toast closes. This can be used to perform any necessary cleanup.
   * @locale {zh} 在通知关闭之前调用的生命周期方法。这可以用于执行任何必要的清理工作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() beforeClose: () => Promise<boolean> | boolean;
  /**
   * @locale {en} A lifecycle method that is called after the toast has closed. This can be used to perform any necessary actions after closing.
   * @locale {zh} 在通知关闭之后调用的生命周期方法。这可以用于在关闭后执行任何必要的操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() afterClose: () => Promise<void> | void;
  /**
   * @locale {en} Custom styles applied to the toast component. This allows for additional styling beyond the default.
   * @locale {zh} 应用到通知组件的自定义样式。这允许在默认样式之外进行额外的样式设置。
   */
  @Prop() customStyle: CSSProperties;
  /**
   * @locale {en} A callback function that is called after the toast has been fully loaded. This can be used to perform any necessary actions once loading is complete.
   * @locale {zh} 在通知完全加载后调用的回调函数。这可以用于在加载完成后执行任何必要的操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() cbAfterDidLoad: () => void;

  // 外部事件 --------------------
  /**
   * @locale {en} An event emitted when the toast is closed. This can be used to perform any necessary actions when the toast is closed.
   * @locale {zh} 当通知被关闭时触发的事件。这可以用于在通知关闭时执行任何必要的操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClose: EventEmitter;

  // 外部方法 --------------------
  /**
   * @locale {en} A method that opens the toast. This can be used to display the toast to the user.
   * @locale {zh} 一个方法，用于打开通知。这可以用于将通知显示给用户。
   */
  @Method()
  async open() {
    if (!((await this.beforeOpen?.()) ?? true)) {
      return;
    }
    await this.visibleByAnime(true);
    await this.afterOpen?.();
    this.aotuClose();
    sendExposeTracking(this.el, { eventType: 'popup' });
    sendDurationTracking(this.el, { eventType: 'popup', reset: true });
  }
  /**
   * @locale {en} A method that closes the toast. This can be used to hide the toast from the user.
   * @locale {zh} 一个方法，用于关闭通知。这可以用于隐藏通知给用户。
   */
  @Method()
  async close() {
    await this.closeHandler();
    sendDurationTracking(this.el, { eventType: 'popup' });
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  componentDidLoad(): void {
    this.cbAfterDidLoad?.();
  }

  // 内部方法 --------------------
  async closeHandler() {
    this.clearTimer();
    if (!((await this.beforeClose?.()) ?? true)) {
      return;
    }
    await this.visibleByAnime(false);
    await this.afterClose?.();
    this.ksClose.emit();
  }
  async visibleByAnime(val: boolean, isInit?: boolean) {
    return new Promise((resolve) => {
      anime({
        duration: isInit ? 0 : 200,
        targets: this.rootEl,
        easing: 'cubicBezier(0.4, 0, 0.2, 1)',
        translateY: val ? [{ value: '-8px', duration: 0 }, { value: '0' }] : '-8px',
        opacity: val ? 1 : 0,
        begin: () => {
          if (val) {
            this.rootEl.setAttribute('style-show', 'true');
          }
        },
        complete: () => {
          if (!val) {
            this.rootEl.removeAttribute('style-show');
          }
          resolve(val);
        },
      });
    });
  }
  aotuClose() {
    this.clearTimer();
    if (this.duration === 0) {
      return;
    }
    this.timer = window.setTimeout(async () => {
      await this.closeHandler();
      this.clearTimer();
    }, this.duration);
  }
  clearTimer() {
    clearTimeout(this.timer);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.timer = undefined;
  }

  render() {
    const classes = classnames([`${prefix}`], [`${prefix}--${this.size}`]);
    const iconClasses = classnames([`${prefix}__icon`, `${prefix}__icon--color-${this.variant}`]);
    const size = this.size === 'sm' ? 'xs' : this.size;
    return (
      <Host dir={dir()} ks-toast role="presentation">
        <div
          dir={dir()}
          class={classes}
          part="self"
          ref={(el) => {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.rootEl = el;
          }}
          style={this.customStyle}
        >
          <slot name="body">
            {this.showIcon && this.size === 'sm' && (
              <span part="icon" class={iconClasses}>
                <slot name="icon">{presetIcons[this.iconName] || null}</slot>
              </span>
            )}

            <div class={`${prefix}__wrapper`}>
              {this.size === 'md' && (
                <span class={`${prefix}__title__container`}>
                  {this.showIcon && (
                    <span part="icon" class={iconClasses}>
                      <slot name="icon">{presetIcons[this.iconName] || null}</slot>
                    </span>
                  )}
                  <span part="title" class={`${prefix}__title`}>
                    {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
                    {this.title || `${this.variant[0].toUpperCase()}${this.variant.slice(1)}`}
                  </span>
                </span>
              )}
              <span
                part="content"
                class={{
                  [`${prefix}__content`]: true,
                  [`${prefix}__content__withicon`]: this.showIcon && this.size === 'md',
                }}
              >
                <slot>{this.content ?? t(commonMessages.empty)}</slot>
              </span>
            </div>
          </slot>
          {this.actionSlots && <slot name="action"></slot>}
          {this.closeable && (
            <ks-button
              variant="text"
              shape="square"
              size={size}
              class={`${prefix}__close`}
              onClick={this.closeHandler.bind(this)}
              data-testid="ks-toast-index-stN5J3"
            >
              <slot name="closebtn">
                <ks-icon-close class={`${prefix}__close__icon`} size={this.size === 'sm' ? 14 : 16} />
              </slot>
            </ks-button>
          )}
        </div>
      </Host>
    );
  }
}
