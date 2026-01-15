import {
  Component,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  State,
  ComponentInterface,
  Host,
  Fragment,
  Method,
} from '@stencil/core';
import classnames from 'classnames';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { InputStatus, InputSize } from '../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { sendActionTracking } from '@src/utils/tracking';
import { registerPluginManager } from '@src/utils/plugin';

const prefix = 'input-password';

/**
 * @slot prefix - Slot for content to be displayed before the password input field.
 * @slot suffix - Slot for content to be displayed after the password input field.
 */
@Component({
  tag: 'ks-input-password',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsInputPassword implements ComponentInterface {
  ['ks-name'] = 'ks-input-password';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsInputPasswordElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  inputEl: HTMLKsInputElement;
  /**
   * @locale {en} The component that display in the suffix area
   * @locale {zh} 后缀图标的区域
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;

  /**
   * @locale {en} The component that display in the prefix area
   * @locale {zh} 前缀图标的区域
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'prefix' }) prefixSlot: Slots;
  /**
   * @locale {en} The value of the password input field. This is a string representing the current password.
   * @locale {zh} 密码输入框的值。该属性为表示当前密码的字符串。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: string | null;
  /**
   * @locale {en} The default value of the password input field when it is first rendered.
   * @locale {zh} 密码输入框首次渲染时的默认值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() defaultValue: string;
  /**
   * @locale {en} The size of the input field. Possible values include `"sm"` and `"md"`.
   * @locale {zh} 输入框的大小。可选值包括 `"sm"` 和 `"md"`。
   */
  @Prop() size: InputSize = 'md';
  /**
   * @locale {en} Placeholder text displayed in the input field when it is empty.
   * @locale {zh} 输入框为空时显示的占位符文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() placeholder: string;
  /**
   * @locale {en} Indicates whether the input field is disabled. When `true`, the input field is disabled and cannot be interacted with.
   * @locale {zh} 指示输入框是否禁用。当值为 `true` 时，输入框被禁用，无法进行交互。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled;
  /**
   * @locale {en} Indicates whether the input field can be cleared by the user. When `true`, a clear button is displayed to clear the input value.
   * @locale {zh} 指示用户是否可以清除输入框的内容。当值为 `true` 时，将显示一个清除按钮以清空输入值。
   */
  @Prop() clearable = false;
  /**
   * @locale {en} The status of the input field. Possible values include `"default"`, `"warning"` and `"error"`.
   * @locale {zh} 输入框的状态。可选值包括 `"default"`、`"warning"` 和 `"error"`。
   */
  @Prop() status?: InputStatus;

  /**
   * @locale {en} Custom event triggered when the value of the input field changes.
   * @locale {zh} 当输入框的值发生变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<number | string | null>;
  /**
   * 是否展示密码
   */
  @State() visibleIcon = false;

  /**
   * @locale {en} Focuses the input element.
   * @locale {zh} 聚焦输入元素。
   */
  // eslint-disable-next-line require-await
  @Method()
  async focusInput() {
    this.inputEl.focusInput();
  }
  /**
   * @locale {en} Blurs the input element.
   * @locale {zh} 使输入元素失焦。
   */
  // eslint-disable-next-line require-await
  @Method()
  async blurInput() {
    this.inputEl.blurInput();
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  renderPasswordIcon = () => (
    <Fragment>
      <span dir={dir()} slot="controls-end" class={classnames(`${prefix}__icon`)}>
        <span
          class={classnames(`${prefix}__icon-btn`, { [`${prefix}__icon-btn--disabled`]: this.disabled })}
          onClick={() => {
            if (this.disabled) {
              return;
            }
            this.visibleIcon = !this.visibleIcon;
          }}
          data-testid="ks-input-password-index-bRmxXi"
        >
          {this.visibleIcon ? <ks-icon-preview-open size="14" /> : <ks-icon-preview-close size="14" />}
        </span>
      </span>
    </Fragment>
  );

  render() {
    return (
      <Host dir={dir()} ks-input-password>
        <ks-input
          defaultValue={this.defaultValue}
          exportparts="input: input"
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          value={this.value}
          class={classnames(prefix)}
          type={this.visibleIcon ? 'text' : 'password'}
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          ref={(inputRef) => (this.inputEl = inputRef)}
          disabled={this.disabled}
          clearable={this.clearable}
          status={this.status}
          size={this.size}
          placeholder={this.placeholder}
          onKsChange={({ detail }) => {
            this.ksChange.emit(detail);
          }}
          onFocus={() => sendActionTracking(this.el, { eventType: 'focus' })}
          onBlur={() => sendActionTracking(this.el, { eventType: 'blur' })}
          data-testid="ks-input-password-index-gAgUJ3"
        >
          {/* 输入框透传slot */}
          {this.prefixSlot && <slot slot="prefix" name="prefix"></slot>}
          {this.suffixSlot && <slot slot="suffix" name="suffix"></slot>}
          {/* 输入框操作 */}
          {this.renderPasswordIcon()}
        </ks-input>
      </Host>
    );
  }
}
