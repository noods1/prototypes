import {
  Component,
  ComponentInterface,
  h,
  Prop,
  State,
  Watch,
  Method,
  Event,
  EventEmitter,
  Host,
  Element,
} from '@stencil/core';
import anime from 'animejs';
import { dir, t } from '@src/utils/utils';
import { Slot, AllSlots } from '@src/utils/decorators';
import { modal } from './modal';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking, sendDurationTracking, sendExposeTracking } from '@src/utils/tracking';
import { ModalCloseReason, ModalSize } from '../../entities';
import { commonMessages } from '@fe-infra/keystone-locales';

// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
globalThis.KsUICDN && (globalThis.KsUICDN.Modal = modal);

const prefix = 'modal';

/**
 * @slot header - Allows customization of the modal's header content. If not provided, `titleText` prop will be used.
 * @slot description - Allows customization of the description text displayed below the title in the header. If not provided, `descriptionText` prop will be used.
 * @slot body - Allows customization of the main content area of the modal.
 * @slot body-container - Allows customization of the whole part of body
 * @slot footer - Allows customization of the modal's footer content. If not provided, default buttons (confirm/cancel) will be rendered based on props.
 * @slot footer-other - Allows customization of an area in the footer, typically to the left of the standard action buttons.
 * @slot cancel-btn - Allows customization of the cancel button's content. If not provided, `cancelText` prop or a default localized string will be used.
 * @slot confirm-btn - Allows customization of the confirm button's content. If not provided, `confirmText` prop or a default localized string will be used.
 * @slot close-btn - Allows customization of the close button (typically an 'X' icon) in the header.
 * @slot wrapper - Allows replacing the entire inner structure of the modal (advanced usage).
 */
@Component({
  tag: 'ks-modal',
  styleUrls: ['index.scss'],
  shadow: true,
})
export class KsModal implements ComponentInterface {
  ['ks-name'] = 'ks-modal';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsModalElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  underlayRef: HTMLElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  wrapperRef: HTMLElement;
  @State() innerVisible = false;
  @State() confirmLoading = false;
  @State() cancelLoading = false;
  /**
   * @locale {en} The slot for the header area.
   * @locale {zh} 头部区域的插槽。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'header' }) headerSlots: AllSlots;
  /**
   * @locale {en} Indicates whether the dialog is visible. When `true`, the dialog is shown.
   * @locale {zh} 指示对话框是否可见。当值为 `true` 时，对话框将显示。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() visible: boolean;
  /**
   * @locale {en} The size of the dialog. Can be one of the following values: `"sm"`, `"md"` or `"lg"`.
   * @locale {zh} 对话框的大小。可选值包括：`"sm"`、`"md"` 或 `"lg"`。
   */
  @Prop() size: ModalSize = 'md';
  /**
   * @locale {en} Indicates whether the dialog can be closed by clicking on the mask. When `true`, clicking the mask will close the dialog.
   * @locale {zh} 指示对话框是否可以通过单击遮罩来关闭。当值为 `true` 时，单击遮罩将关闭对话框。
   */
  @Prop() maskClosable = true;
  /**
   * @locale {en} Indicates whether the dialog has a confirm button. When `true`, a confirm button will be displayed.
   * @locale {zh} 指示对话框是否有确认按钮。当值为 `true` 时，将显示确认按钮。
   */
  @Prop() confirmable = true;
  /**
   * @locale {en} Indicates whether the dialog has a cancel button. When `true`, a cancel button will be displayed.
   * @locale {zh} 指示对话框是否有取消按钮。当值为 `true` 时，将显示取消按钮。
   */
  @Prop() cancelable = true;
  /**
   * @locale {en} Indicates whether the dialog can be closed by the user. When `true`, a close button will be shown.
   * @locale {zh} 指示用户是否可以关闭对话框。当值为 `true` 时，将显示关闭按钮。
   */
  @Prop() closeable = true;
  /**
   * @locale {en} The title text of the dialog. This is displayed at the top of the dialog. Used as fallback content for the `header` slot if the slot is not provided.
   * @locale {zh} 对话框的标题文本。此文本显示在对话框的顶部。如果未提供 `header` 插槽，则用作其后备内容。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() titleText: string;

  /**
   * @locale {en} The dialog box describes the text under the title. This is displayed at the top of the dialog. Used as fallback content for the `description` slot if the slot is not provided.
   * @locale {zh} 对话框的标题下描述文本。此文本显示在对话框的顶部。如果未提供 `description` 插槽，则用作其后备内容。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() descriptionText: string;
  /**
   * @locale {en} The text for the confirm button. This is displayed on the confirm button. Used as fallback content for the `confirm-btn` slot if the slot is not provided.
   * @locale {zh} 确认按钮的文本。此文本显示在确认按钮上。如果未提供 `confirm-btn` 插槽，则用作其后备内容。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() confirmText: string;
  /**
   * @locale {en} The text for the cancel button. This is displayed on the cancel button. Used as fallback content for the `cancel-btn` slot if the slot is not provided.
   * @locale {zh} 取消按钮的文本。此文本显示在取消按钮上。如果未提供 `cancel-btn` 插槽，则用作其后备内容。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() cancelText: string;
  /**
   * @locale {en} Indicates whether the confirm button is disabled. When `true`, the confirm button will be grayed out and not clickable.
   * @locale {zh} 指示确认按钮是否被禁用。当值为 `true` 时，确认按钮将变灰并且不可点击。
   */
  @Prop() confirmDisabled = false;
  /**
   * @locale {en} Indicates whether the cancel button is disabled. When `true`, the cancel button will be grayed out and not clickable.
   * @locale {zh} 指示取消按钮是否被禁用。当值为 `true` 时，取消按钮将变灰并且不可点击。
   */
  @Prop() cancelDisabled = false;
  /**
   * @locale {en} Indicates whether the dialog should be displayed without a header. When `true`, the header section will not be shown.
   * @locale {zh} 指示对话框是否应该没有标题。 当值为 `true` 时，标题部分将不显示。
   */
  @Prop() noHeader = false;
  /**
   * @locale {en} Indicates whether the dialog should be displayed without a footer. When `true`, the footer section will not be shown.
   * @locale {zh} 指示对话框是否应该没有底部。 当值为 `true` 时，底部部分将不显示。
   */
  @Prop() noFooter = false;
  /**
   * @locale {en} Indicates whether to add a divider between the content and the footer. When `true`, a divider will be shown.
   * @locale {zh} 指示是否在内容和底部之间添加分隔线。当值为 `true` 时，将显示分隔线。
   */
  @Prop() dividered = false;

  // Modal生命周期 --------------------
  /**
   * @locale {en} A lifecycle method that is called before the dialog opens. This can be used to perform any necessary preparations.
   * @locale {zh} 在对话框打开之前调用的生命周期方法。这可以用于执行任何必要的准备工作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() beforeOpen: () => Promise<boolean> | boolean | (Promise<void> | void);
  /**
   * @locale {en} A lifecycle method that is called after the dialog has opened. This can be used to perform any necessary actions after opening.
   * @locale {zh} 在对话框打开之后调用的生命周期方法。这可以用于在打开后执行任何必要的操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() afterOpen: () => Promise<void> | void;
  /**
   * @locale {en} A lifecycle method that is called before the dialog closes. Return `false` to prevent the close. This function won't be called if you manually call `KsModal.close()`.
   * @locale {zh} 在对话框关闭之前调用的生命周期方法，若返回 `false` 则阻止关闭。如果手动调用 `KsModal.close()` 不会触发该函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() beforeClose: (reason: ModalCloseReason) => Promise<boolean> | boolean | (Promise<void> | void);
  /**
   * @locale {en} A lifecycle method that is called after the dialog has closed. This can be used to perform any necessary actions after closing.
   * @locale {zh} 在对话框关闭之后调用的生命周期方法。这可以用于在关闭后执行任何必要的操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() afterClose: (reason: ModalCloseReason) => Promise<void> | void;
  /**
   * @locale {en} A callback function that is executed when the confirm button is clicked. This can be used to handle confirmation actions.
   * @locale {zh} 确认按钮点击时执行的回调函数。这可以用于处理确认操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() confirmCallback: () => Promise<boolean> | boolean | (Promise<void> | void);
  /**
   * @locale {en} A callback function that is executed when the cancel button is clicked. This can be used to handle cancellation actions.
   * @locale {zh} 取消按钮点击时执行的回调函数。这可以用于处理取消操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() cancelCallback: () => Promise<boolean> | boolean | (Promise<void> | void);
  /**
   * @locale {en} A callback function that is called after the dialog has been fully loaded. This can be used to perform any necessary actions once loading is complete.
   * @locale {zh} 对话框完全加载后调用的回调函数。这可以用于在加载完成后执行任何必要的操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() cbAfterDidLoad: () => void;
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
  @Prop() deprecatedZIndexOverride = 0;

  // watch --------------------
  @Watch('visible')
  watchVisible(newValue: boolean) {
    newValue ? this.open() : this.close('manual');
  }

  // 交互事件 --------------------
  /**
   * @locale {en} Custom event triggered when the confirm button is clicked.
   * @locale {zh} 确认按钮被点击时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksConfirm: EventEmitter;
  /**
   * @locale {en} Custom event triggered when the cancel button is clicked.
   * @locale {zh} 取消按钮被点击时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksCancel: EventEmitter;
  /**
   * @locale {en} Custom event triggered when the dialog is closed.
   * @locale {zh} 对话框关闭时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClose: EventEmitter<ModalCloseReason>;

  // Method --------------------
  /**
   * @locale {en} Opens the dialog, making it visible to the user.
   * @locale {zh} 打开对话框，使其对用户可见。
   */
  @Method()
  async open() {
    if (this.innerVisible) {
      return;
    }
    if ((await this.beforeOpen?.()) === false) {
      return;
    }
    await this.visibleByAnime(true);
    await this.afterOpen?.();
    sendExposeTracking(this.el, { eventType: 'popup' });
    sendDurationTracking(this.el, { eventType: 'popup', reset: true });
  }
  /**
   * @locale {en} Closes the dialog, hiding it from the user.
   * @locale {zh} 关闭对话框，使其对用户隐藏。
   */
  @Method()
  async close(reason: ModalCloseReason = 'manual') {
    if (!this.innerVisible) {
      return;
    }
    if (reason !== 'manual') {
      if ((await this.beforeClose?.(reason)) === false) {
        return;
      }
    }
    await this.visibleByAnime(false);
    this.ksClose.emit(reason);
    await this.afterClose?.(reason);
    sendDurationTracking(this.el, { eventType: 'popup' });
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  // 内部方法 --------------------
  async confirmHandler() {
    this.confirmLoading = true;
    try {
      const result = await this.confirmCallback?.();
      if (result !== false) {
        this.ksConfirm.emit();
        // TODO 在对迁移项目进行排查后修复受控模式
        await this.close('confirm');
      }
    } catch {
      //
    }

    this.confirmLoading = false;
    sendActionTracking(this.el, { eventType: 'confirm' });
  }
  async cancelHandler() {
    this.cancelLoading = true;
    try {
      const result = await this.cancelCallback?.();
      if (result !== false) {
        this.ksCancel.emit();
        await this.close('cancel');
      }
    } catch {
      //
    }
    this.cancelLoading = false;
    sendActionTracking(this.el, { eventType: 'cancel' });
  }
  async closeHandler() {
    this.cancelLoading = true;
    await this.close('close');
    this.cancelLoading = false;
    sendActionTracking(this.el, { eventType: 'close' });
  }

  visibleByAnime(val: boolean) {
    return new Promise((resolve) => {
      anime
        .timeline({
          targets: this.underlayRef,
          duration: 200,
          easing: 'cubicBezier(0.4, 0, 0.2, 1)',
          begin: () => {
            if (val) {
              this.underlayRef.setAttribute('visible', '');
              this.innerVisible = true;
              document.body?.classList.add('unscrollable');
            }
          },
          complete: () => {
            if (!val) {
              this.underlayRef.removeAttribute('visible');
              this.innerVisible = false;
              document.body?.classList.remove('unscrollable');
            } else {
              // TODO: 发现begin的回调偶尔会不执行，但是complete没有发现，所以在这里加上一个判断，后面需要继续排查具体原因
              if (this.innerVisible !== this.visible) {
                this.underlayRef.setAttribute('visible', '');
                this.innerVisible = true;
              }
            }
            resolve(val);
          },
        })
        .add({
          targets: this.underlayRef,
          opacity: val ? [{ value: 0 }, { value: 1 }] : 0,
        })
        .add(
          {
            targets: this.wrapperRef,
            scale: val ? [{ value: 0.92 }, { value: 1 }] : 0.92,
            opacity: val ? [{ value: 0 }, { value: 1 }] : 0,
          },
          0,
        );
    });
  }

  componentDidLoad() {
    this.visible ? this.open() : this.close('manual');
    this.cbAfterDidLoad?.();
  }

  disconnectedCallback(): void {
    document.body?.classList.remove('unscrollable');
  }

  render() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const noHeader = this.noHeader || (!this.closeable && !this.titleText && !this.headerSlots?.length);
    return (
      <Host dir={dir()} ks-modal>
        <ks-overlay
          open={this.innerVisible}
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          onClose={this.close.bind(this)}
          deprecatedDisableTopLayer={this.deprecatedDisableTopLayer}
          deprecatedZIndexOverride={this.deprecatedZIndexOverride}
          data-testid="ks-modal-index-4QLEVG"
        >
          {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
          <div ref={(el) => (this.underlayRef = el)} class={`${prefix}__underlay`}>
            <div
              class={`${prefix}__mask`}
              part="mask"
              onClick={() => {
                this.maskClosable && !this.cancelDisabled && this.closeHandler();
              }}
              data-testid="ks-modal-index-rWEpeV"
            />

            <div dir={dir()} class={prefix} part="self">
              <slot name="wrapper">
                <div
                  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                  ref={(el) => (this.wrapperRef = el)}
                  class={`${prefix}__wrapper ${prefix}__wrapper--${this.size}`}
                  part="wrapper"
                >
                  <div class={`${prefix}__header`} part="header" style={noHeader ? { display: 'none' } : {}}>
                    <div class={`${prefix}__header-title`}>
                      <div class={`${prefix}__header-title-content`}>
                        <slot name="header">{this.titleText}</slot>
                      </div>
                      <div class={`${prefix}__header-des`}>
                        <slot name="description">{this.descriptionText}</slot>
                      </div>
                    </div>
                  </div>

                  {this.closeable && (
                    <span class={`${prefix}__close`}>
                      <ks-button
                        size="md"
                        variant="text"
                        shape="square"
                        disabled={this.cancelLoading || this.cancelDisabled}
                        onClick={this.closeHandler.bind(this)}
                        data-testid="ks-modal-index-qPKzsp"
                      >
                        <slot name="close-btn">
                          <ks-icon-close />
                        </slot>
                      </ks-button>
                    </span>
                  )}

                  <ks-divider
                    class={{
                      ['divider']: true,
                      ['divider__shown']: this.dividered,
                    }}
                  />

                  <slot name="body-container">
                    <ks-scrollbar class={`${prefix}__scroll`} thin>
                      <div class={`${prefix}__body`} part="body">
                        <slot name="body">
                          <div class={`${prefix}__body-container`} part="body-container">
                            <slot>{t(commonMessages.empty)}</slot>
                          </div>
                        </slot>
                      </div>
                    </ks-scrollbar>
                  </slot>

                  <ks-divider
                    class={{
                      ['divider']: true,
                      ['divider__shown']: this.dividered,
                    }}
                  />

                  {!this.noFooter && (
                    <div class={`${prefix}__footer`} part="footer">
                      <slot name="footer">
                        <div class={`${prefix}__footer__other`}>
                          <slot name="footer-other"></slot>
                        </div>
                        <div class={`${prefix}__footer__btns`}>
                          {this.cancelable && (
                            <ks-button
                              disabled={this.cancelDisabled}
                              loading={this.cancelLoading}
                              onClick={this.cancelHandler.bind(this)}
                              data-testid="ks-modal-index-sMQyRp"
                            >
                              <slot name="cancel-btn">{this.cancelText ?? t(commonMessages.cancel)}</slot>
                            </ks-button>
                          )}

                          {this.confirmable && (
                            <ks-button
                              variant="primary"
                              disabled={this.confirmDisabled}
                              loading={this.confirmLoading}
                              onClick={this.confirmHandler.bind(this)}
                              data-testid="ks-modal-index-smNjSC"
                            >
                              <slot name="confirm-btn">{this.confirmText ?? t(commonMessages.confirm)}</slot>
                            </ks-button>
                          )}
                        </div>
                      </slot>
                    </div>
                  )}
                </div>
              </slot>
            </div>
          </div>
        </ks-overlay>
      </Host>
    );
  }
}
