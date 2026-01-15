import { Component, Host, Prop, h, Event, type ComponentInterface, Watch, type EventEmitter } from '@stencil/core';
import { dir } from '@src/utils/utils';

const prefix = 'overlay';

@Component({
  tag: 'ks-overlay',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsOverlay implements ComponentInterface {
  ['ks-name'] = 'ks-overlay';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  el: HTMLDialogElement | HTMLDivElement;

  /**
   * @locale {en} Controls whether the overlay is open (visible) or closed (hidden).
   * @locale {zh} 控制浮层是否打开（可见）或关闭（隐藏）。
   */
  @Prop() open = false;

  /**
   * @locale {en} Defines the type of the overlay. Can be 'dialog' to use the HTML `<dialog>` element or 'popover' to use the Popover API.
   * @locale {zh} 定义浮层的类型。可以是 'dialog' 以使用 HTML `<dialog>` 元素，或 'popover' 以使用 Popover API。
   */
  @Prop() type: 'dialog' | 'popover' = 'dialog';

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

  /**
   * @locale {en} Emitted when the overlay is closed, either by user interaction (e.g., pressing Escape for a dialog) or programmatically.
   * @locale {zh} 当浮层关闭时发出，无论是通过用户交互（例如，对话框按下 Escape 键）还是通过编程方式关闭。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false }) close: EventEmitter<void>;

  @Watch('open')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  openWatcher(open) {
    if (open) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    if (this.type === 'dialog') {
      if ('showModal' in this.el) {
        this.el.showModal();
      }
    } else {
      if ('showPopover' in this.el && !this.deprecatedDisableTopLayer) {
        this.el.showPopover();
      }
    }
  }
  hide() {
    if (this.type === 'dialog') {
      if ('close' in this.el) {
        this.el.close();
      }
    } else {
      if ('hidePopover' in this.el && !this.deprecatedDisableTopLayer) {
        this.el.hidePopover();
      }
    }
  }

  private _eventListenerEstablished = false;
  private _onClose = () => {
    this.close.emit();
    this.hide();
  };
  componentDidLoad() {
    if (this.open) {
      this.show();
    }

    this._eventListenerEstablished = true;
    this.el.addEventListener('close', this._onClose);
  }
  connectedCallback() {
    if (this._eventListenerEstablished) {
      this.el.addEventListener('close', this._onClose);
    }
  }
  disconnectedCallback() {
    this.el.removeEventListener('close', this._onClose);
  }

  renderAsDialog() {
    if (this.deprecatedDisableTopLayer) {
      return (
        <div
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          ref={(el) => (this.el = el)}
          dir={dir()}
          class={prefix}
          part="self"
          style={{ display: this.open ? 'flex' : 'none', zIndex: String(this.deprecatedZIndexOverride) || '' }}
        >
          <slot />
        </div>
      );
    }

    return (
      <dialog
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        ref={(el) => (this.el = el)}
        dir={dir()}
        class={prefix}
        part="self"
        style={{ display: this.open ? 'flex' : 'none' }}
      >
        <slot />
      </dialog>
    );
  }

  renderAsPopover() {
    if (this.deprecatedDisableTopLayer) {
      return (
        <div
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          ref={(el) => (this.el = el)}
          dir={dir()}
          class={prefix}
          part="self"
          style={{ display: this.open ? 'flex' : 'none', zIndex: String(this.deprecatedZIndexOverride) || '' }}
        >
          <slot />
        </div>
      );
    }
    return (
      <div
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        ref={(el) => (this.el = el)}
        dir={dir()}
        class={prefix}
        part="self"
        popover="manual"
        style={{ display: this.open ? 'flex' : 'none' }}
      >
        <slot />
      </div>
    );
  }

  render() {
    return (
      <Host dir={dir()} ks-overlay>
        {this.type === 'dialog' && this.renderAsDialog()}
        {this.type === 'popover' && this.renderAsPopover()}
      </Host>
    );
  }
}
