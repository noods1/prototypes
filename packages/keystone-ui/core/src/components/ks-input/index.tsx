import { Component, h, Prop, Element, Event, EventEmitter, State, Method, Host, Watch } from '@stencil/core';
import classnames from 'classnames';
import { Slot, Slots } from '@src/utils/decorators';
import { t, dir } from '@src/utils/utils';
import { InputSize, InputStatus } from '../../entities';
import { throttle } from 'lodash-es';
import { FormContextValueReconcile } from '@src/utils/form/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking } from '@src/utils/tracking';
import { inputMessages } from '@fe-infra/keystone-locales';
import { Uncontrollable } from '@src/utils/decorators/uncontrollable';
import { scheduleLowPriorityTask } from '@src/utils/input';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';

const prefix = 'input';

/**
 * @slot prefix - Slot for content to be displayed before the input field.
 * @slot suffix - Slot for content to be displayed after the input field.
 * @slot controls-start - Slot for content to be displayed before the input field.
 * @slot controls-end - Slot for content to be displayed after the input field.
 * @slot buttonText -  Slot for text to be displayed in the input button
 */

@Component({
  tag: 'ks-input',
  styleUrl: 'index.scss',
  shadow: {
    delegatesFocus: true,
  },
})
export class KsInput extends FormBaseComponent<string> {
  ['ks-name'] = 'ks-input';
  @Element() el!: HTMLKsInputElement;
  inputEl!: HTMLInputElement;

  /**
   * @locale {en} Whether the input field should be automatically focused when the page loads.
   * @locale {zh} 输入框是否在页面加载时自动获取焦点。
   */
  @Prop() autoFocus?: boolean;
  /**
   * @locale {en} Whether the input field is read-only. When `true`, the input field cannot be edited by the user.
   * @locale {zh} 输入框是否只读。当值为 `true` 时，输入框无法被用户编辑。
   */
  @Prop() readOnly?: boolean;
  /**
   * @locale {en} The autocomplete attribute of the input field, which controls whether the browser should offer autocomplete options.
   * @locale {zh} 输入框的 autocomplete 属性，用于控制浏览器是否提供自动完成选项。
   */
  @Prop() autoComplete?: HTMLInputElement['autocomplete'];
  /**
   * @locale {en} The current value of the input field.
   * @locale {zh} 输入框的当前值。
   */
  @Prop() @Vue2ValueFix() @FormContextValueReconcile() value?: string;
  /**
   * @locale {en} The default value of the input field when it is first rendered.
   * @locale {zh} 输入框首次渲染时的默认值。
   */
  @Prop() defaultValue?: string;
  @Uncontrollable('value', 'defaultValue', 'ksChange') @State() internalValueState?: string;
  /**
   * @locale {en} The size of the input field. Possible values include `"sm"` and `"md"`.
   * @locale {zh} 输入框的大小。可选值包括 `"sm"` 和 `"md"`。
   */
  @Prop() size: InputSize = 'md';
  /**
   * @locale {en} The type of the input field, corresponding to the HTML input type attribute.
   * @locale {zh} 输入框的类型，对应 HTML 输入标签的 type 属性。
   */
  @Prop() type: HTMLInputElement['type'] = 'text';
  /**
   * @locale {en} Placeholder text displayed in the input field when it is empty.
   * @locale {zh} 输入框为空时显示的占位符文本。
   */
  @Prop() placeholder?: string;
  /**
   * @locale {en} Indicates whether the input field is disabled. When `true`, the input field is disabled and cannot be interacted with.
   * @locale {zh} 指示输入框是否禁用。当值为 `true` 时，输入框被禁用，无法进行交互。
   */
  @Prop() @FormContextValueReconcile() disabled?: boolean;
  /**
   * @locale {en} Indicates whether the input field can be cleared by the user. When `true`, a clear button is displayed to clear the input value.
   * @locale {zh} 指示用户是否可以清除输入框的内容。当值为 `true` 时，将显示一个清除按钮以清空输入值。
   */
  @Prop() clearable = false;
  /**
   * @locale {en} The status of the input field. Possible values include `"default"`, `"warning"` and `"error"`.
   * @locale {zh} 输入框的状态。可选值包括 `"default"`、`"warning"` 和 `"error"`。
   */
  @Prop() @FormContextValueReconcile() status?: InputStatus;
  /**
   * @locale {en} Indicates whether to show the character count of the input field. This can be a boolean value or a function returning a number.
   * @locale {zh} 指示是否显示输入框的字符计数。此属性可以是布尔值或返回 number 的函数。
   */
  @Prop() showCount?: boolean | ((value: string) => number);
  /**
   * @locale {en} The maximum length of the input value. If exceeded, the character count will be highlighted in red.
   * @locale {zh} 输入值的最大长度限制。超出后，文本计数将以红色显示。
   */
  @Prop() maxLength?: number;
  /**
   * @locale {en} Text content for the built-in action button
   * @locale {zh} 内置操作按钮的文本内容
   */
  @Prop() buttonText = '';

  /**
   * @locale {en} Custom event triggered when the value of the input field changes.
   * @locale {zh} 当输入框的值发生变化时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksChange!: EventEmitter<string>;
  /**
   * @locale {en} Custom event triggered when the input field is clicked.
   * @locale {zh} 当输入框被点击时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksClick!: EventEmitter<MouseEvent>;
  /**
   * @locale {en} Custom event triggered when the clear button is clicked to clear the input field.
   * @locale {zh} 当点击清除按钮以清空输入框时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksClear!: EventEmitter<void>;
  /**
   * @locale {en} Custom event triggered when the button has a value and is clicked.
   * @locale {zh} 当button有值并且点击时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksButtonClick!: EventEmitter<void>;
  /**
   * @locale {en} Custom event triggered when the input field gains focus.
   * @locale {zh} 当输入框获得焦点时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksFocus!: EventEmitter<FocusEvent>;
  /**
   * @locale {en} Custom event triggered when the input field loses focus.
   * @locale {zh} 当输入框失去焦点时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksBlur!: EventEmitter<FocusEvent>;
  /**
   * @locale {en} Custom event triggered when the input field is pressed down the enter key.
   * @locale {zh} 当输入框按下 enter 键时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksKeydownEnter!: EventEmitter<KeyboardEvent>;

  /**
   * @locale {en} The component that display in the suffix area
   * @locale {zh} 后缀图标的区域
   */
  @Slot({ slotname: 'suffix' }) suffixSlot?: Slots;
  /**
   * @locale {en} The component that display in the prefix area
   * @locale {zh} 前缀图标的区域
   */
  @Slot({ slotname: 'prefix' }) prefixSlot?: Slots;
  /**
   * @private
   * 控制器位置（eg: InputNumber +/-） 预留位置（首）
   */
  @Slot({ slotname: 'controls-start' }) controlStartSlot?: Slots;
  /**
   * @private
   * 控制器位置（eg: InputNumber +/-） 预留位置（尾）
   */
  @Slot({ slotname: 'controls-end' }) controlEndSlot?: Slots;

  @State() isFocus = false;

  private composition = false;

  @State() selection: [number | null, number | null] = [null, null];

  /**
   * @locale {en} Focues the input element.
   * @locale {zh} 聚焦输入元素。
   */
  // eslint-disable-next-line require-await
  @Method()
  async focusInput() {
    this.inputEl.focus();
    this.isFocus = true;
  }
  /**
   * @locale {en} Blurs the input element.
   * @locale {zh} 使输入元素失焦。
   */
  // eslint-disable-next-line require-await
  @Method()
  async blurInput() {
    this.inputEl.blur();
    this.isFocus = false;
  }

  constructor() {
    super();
    registerPluginManager(this.el);
  }

  override connectedCallback() {
    super.connectedCallback?.();
  }

  get showClear() {
    const hasValue = !!this.internalValueState;
    return this.clearable && this.isFocus && hasValue;
  }

  handleInput = (e: Event) => {
    if (this.disabled || this.composition) {
      return;
    }
    const value = (e.target as HTMLInputElement).value;
    this.selection = [this.inputEl.selectionStart, this.inputEl.selectionEnd];

    this.internalValueState = value;

    throttle(() => sendActionTracking(this.el, { eventType: 'change', componentParams: { value } }), 500);
  };

  handleFocus = (e: FocusEvent) => {
    this.isFocus = true;
    this.ksFocus.emit(e);
    sendActionTracking(this.el, { eventType: 'focus' });
  };

  handleBlur = (e: FocusEvent) => {
    this.isFocus = false;
    this.ksBlur.emit(e);
    sendActionTracking(this.el, { eventType: 'blur' });
  };

  handleClear = () => {
    this.ksClear?.emit();
    this.internalValueState = '';
    sendActionTracking(this.el, { eventType: 'change', componentParams: { value: '' } });
  };

  get count() {
    return typeof this.showCount === 'function'
      ? this.showCount(this.internalValueState || '')
      : this.internalValueState
        ? [...this.internalValueState].length
        : 0;
  }

  preventInputBlurWhenClickControls = (e: MouseEvent) => {
    if (e.target === this.inputEl) return;
    e.preventDefault();
    if (document.activeElement !== this.inputEl) {
      this.inputEl.focus();
    }
  };

  @Watch('selection')
  handleSelectionChange() {
    this.inputEl?.setSelectionRange(...this.selection);
  }
  @Watch('internalValueState')
  handleInternalValueStateChange() {
    if (this.inputEl && this.inputEl.value !== this.internalValueState && !this.composition) {
      this.inputEl.value = this.internalValueState || '';
    }
  }

  componentDidRender(): void {
    scheduleLowPriorityTask(this.el, () => this.handleInternalValueStateChange());
  }

  render() {
    const showCount = this.showCount || (typeof this.maxLength === 'number' && this.showCount !== false);
    const status =
      showCount && this.maxLength && this.maxLength < [...(this.inputEl?.value || '')].length ? 'error' : this.status;
    const cls = classnames(`${prefix}__wrapper`, `${prefix}__wrapper--size-${this.size}`, {
      [`${prefix}__wrapper--disabled`]: this.disabled,
      [`${prefix}__wrapper--focus`]: this.isFocus,
      [`${prefix}__wrapper--${status}`]: status,
      [`${prefix}__wrapper--${status}--focus`]: status && this.isFocus,
      [`${prefix}__wrapper--button`]: this.buttonText,
    });
    return (
      <Host dir={dir()} ks-input>
        <span dir={dir()} class={cls} part="self field">
          <label
            part="label"
            class={classnames(`${prefix}__inner`)}
            onMouseDown={this.preventInputBlurWhenClickControls}
            data-testid="ks-input-index-v6WrwD"
          >
            {this.controlStartSlot && [
              <span class={`${prefix}__addon`} part="controls-start" data-testid="ks-input-index-op3WnV">
                <slot name="controls-start"></slot>
              </span>,
              <div class={`${prefix}__divider`} part="controls-start-divider"></div>,
            ]}

            <div class={classnames(`${prefix}__content`)} part="content">
              {this.prefixSlot && (
                <span class={classnames(`${prefix}__prefix`, `${prefix}__addon`)} part="prefix">
                  <ks-text variant="bodySm">
                    <slot name="prefix"></slot>
                  </ks-text>
                </span>
              )}

              <input
                part="input"
                class={classnames(prefix)}
                type={this.type}
                ref={(el) => (this.inputEl = el as HTMLInputElement)}
                disabled={this.disabled}
                autoFocus={this.autoFocus}
                readOnly={this.readOnly}
                autoComplete={this.autoComplete}
                placeholder={this.placeholder ?? t(inputMessages.placeholder)}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onInput={this.handleInput}
                onCompositionstart={() => {
                  this.composition = true;
                }}
                onCompositionend={(event) => {
                  this.composition = false;
                  this.handleInput(event);
                }}
                onClick={(e) => {
                  if (!this.disabled) {
                    this.ksClick?.emit(e);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    this.ksKeydownEnter?.emit(e);
                  }
                }}
                data-testid="ks-input-index-gYhNPj"
              />

              {this.showClear && (
                <div class={classnames(`${prefix}__clear ${prefix}__clear__disabled`)}>
                  <ks-icon-filled-close
                    onClick={() => {
                      if (this.disabled) return;
                      this.handleClear();
                    }}
                    size="16"
                    data-testid="ks-input-index-wc26aV"
                  />
                </div>
              )}

              {showCount && (
                <div class={`${prefix}__count`}>
                  <div
                    class={classnames(`${prefix}__count--default`, {
                      [`${prefix}__count--default--error`]:
                        typeof this.maxLength === 'number' && this.maxLength < this.count,
                    })}
                  >
                    {this.count + (typeof this.maxLength === 'number' ? `/${this.maxLength}` : '')}
                  </div>
                </div>
              )}

              {this.suffixSlot && (
                <span class={classnames(`${prefix}__suffix`, `${prefix}__addon`)} part="suffix">
                  <ks-text variant="bodySm">
                    <slot name="suffix"></slot>
                  </ks-text>
                </span>
              )}
            </div>
            {this.controlEndSlot && [
              <span class={`${prefix}__addon`} part="controls-end" data-testid="ks-input-index-9cLsnh">
                <slot name="controls-end"></slot>
              </span>,
            ]}
          </label>
        </span>
        {this.buttonText && (
          <ks-button
            variant="text"
            disabled={this.disabled}
            class={`${prefix}__button ${this.disabled ? `${prefix}__button--disabled` : ''}`}
            onClick={() => {
              this.ksButtonClick?.emit();
              sendActionTracking(this.el, {
                eventType: 'click',
                subEventType: 'button',
                componentParams: { text: this.buttonText },
              });
            }}
            data-testid="ks-input-index-ky2uzn"
          >
            <slot name="buttonText">{this.buttonText}</slot>
          </ks-button>
        )}
      </Host>
    );
  }
}
