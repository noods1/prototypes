import { Component, h, Prop, Element, Event, EventEmitter, State, Watch, Host, Method } from '@stencil/core';
import classnames from 'classnames';
import { Slot, Slots } from '@src/utils/decorators';
import { t, dir, convertNum2PX, convertPX2Num } from '@src/utils/utils';
import { CSSProperties, Status } from '../../entities';
import { throttle } from 'lodash-es';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { inputMessages } from '@fe-infra/keystone-locales';
import { FormContextValueReconcile } from '@src/utils/form/FormContextValueReconcile';
import { Uncontrollable } from '@src/utils/decorators/uncontrollable';
import { sendActionTracking } from '@src/utils/tracking';
import { scheduleLowPriorityTask } from '@src/utils/input';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';

const prefix = 'text-field';

const COUNT_HEIGHT = 20;

/**
 * @slot prefix - Slot for content to be displayed before the input field.
 * @slot suffix - Slot for content to be displayed after the input field.
 */
@Component({
  tag: 'ks-text-field',
  styleUrl: 'index.scss',
  shadow: {
    delegatesFocus: true,
  },
})
export class KsTextField extends FormBaseComponent<string> {
  ['ks-name'] = 'ks-input-text-field';
  @Element() el!: HTMLKsTextFieldElement;

  inputEl!: HTMLTextAreaElement;
  innerEl!: HTMLDivElement;
  suffixSpanEl?: HTMLSpanElement;
  countContainerEl?: HTMLDivElement;

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
  @Prop() autoComplete?: HTMLTextAreaElement['autocomplete'];
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
   * @locale {en} The status of the input field. Possible values include `"default"`, `"warning"` and `"error"`.
   * @locale {zh} 输入框的状态。可选值包括 `"default"`、`"warning"` 和 `"error"`。
   */
  @Prop() @FormContextValueReconcile() status?: Status;
  /**
   * @locale {en} (Textarea only) Specifies whether the textarea is resizable by the user.
   * @locale {zh} （仅限 textarea）指定用户是否可以拖动调整文本区域的大小。
   */
  @Prop() resize: 'vertical' | 'horizontal' | 'both' | 'none' = 'none';
  /**
   * @locale {en} Indicates whether to show the character count of the input field. This can be a boolean value or a function returning an number.
   * @locale {zh} 指示是否显示输入框的字符计数。此属性可以是布尔值或返回 number 的函数。
   */
  @Prop() showCount?: boolean | ((value: string) => number);
  /**
   * @locale {en} The maximum length of the input value. If exceeded, the character count will be highlighted in red.
   * @locale {zh} 输入值的最大长度限制。超出后，文本计数将以红色显示。
   */
  @Prop() maxLength?: number;
  @Prop() height?: string | number | { min?: string | number; max?: string | number };
  /**
   * @locale {en} Custom event triggered when the value of the input field changes.
   * @locale {zh} 当输入框的值发生变化时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksChange!: EventEmitter<string>;
  /**
   * @locale {en} Custom event triggered when the clear button is clicked to clear the input field.
   * @locale {zh} 当点击清除按钮以清空输入框时触发的自定义事件。
   */
  // @Event({ bubbles: false, composed: false }) ksClear!: EventEmitter;
  /**
   * @locale {en} Custom event triggered when the input field is clicked.
   * @locale {zh} 当输入框被点击时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksClick!: EventEmitter<MouseEvent>;
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

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  override connectedCallback() {
    super.connectedCallback?.();
  }

  /**
   * @locale {en} Indicates whether the input field is currently focused.
   * @locale {zh} 指示输入框当前是否获得焦点。
   */
  @State() isFocus = false;

  private composition = false;

  get count() {
    return typeof this.showCount === 'function'
      ? this.showCount(this.internalValueState || '')
      : this.internalValueState
        ? [...this.internalValueState].length
        : 0;
  }

  @State() selection: [number | null, number | null] = [null, null];

  handleInput = (e: Event) => {
    if (this.disabled || this.composition) {
      return;
    }
    const value = (e.target as HTMLTextAreaElement).value;
    this.selection = [this.inputEl.selectionStart, this.inputEl.selectionEnd];

    this.internalValueState = value;

    throttle(() => sendActionTracking(this.el, { eventType: 'change', componentParams: { value } }), 500);
  };

  handleFocus = (e: FocusEvent) => {
    this.isFocus = true;
    this.ksFocus?.emit(e);
  };

  handleBlur = (e: FocusEvent) => {
    this.isFocus = false;
    this.ksBlur?.emit(e);
  };

  // handleClear = () => {
  //   this.ksClear?.emit();
  //   this.internalValueState = '';
  //   sendActionTracking(this.el, { eventType: 'change', componentParams: { value: '' } });
  // };

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

  @Watch('selection')
  handleSelectionChange() {
    this.inputEl?.setSelectionRange?.(...this.selection);
  }
  private syncValue() {
    if (this.inputEl && this.inputEl.value !== this.internalValueState && !this.composition) {
      this.inputEl.value = this.internalValueState || '';
    }
  }
  @Watch('internalValueState')
  handleInternalValueStateChange() {
    this.syncValue();
    this.autoResizeTextarea();
  }

  componentDidRender(): void {
    // sync internalValueState with inputEl.value
    scheduleLowPriorityTask(this.el, () => this.syncValue());

    // calculate and assign paddingRight
    this.resizePaddingRight();
  }

  componentDidLoad() {
    this.handleInternalValueStateChange();
  }

  /**
   * 获取 TextArea 的右边距。由于设计希望在有后缀图标时，TextArea 的 scroll bar 在最右侧，
   * 所以需要根据后缀图标是否存在，来动态计算 TextArea 的右边距。
   */
  private resizePaddingRight() {
    const paddingRight = this.suffixSlot ? convertNum2PX(this.suffixSpanEl!.offsetWidth + 20) : 'var(--ks-spacing-300)';
    this.inputEl.style.paddingRight = paddingRight;
    this.showCount && (this.countContainerEl!.style.paddingRight = paddingRight);
  }

  private autoResizeTextarea() {
    if (!this.inputEl) {
      return;
    }
    const adjustPx = 16;
    const countPx = this.showCount ? COUNT_HEIGHT : 0;
    const innerHeightStyle: CSSProperties = {};
    this.innerEl.style.height = '20px';
    if (typeof this.height === 'object') {
      const { min = 20 + adjustPx + countPx, max = 40 + adjustPx + countPx } = this.height;
      innerHeightStyle['minHeight'] = convertNum2PX(convertPX2Num(min) - adjustPx);
      innerHeightStyle['maxHeight'] = convertNum2PX(convertPX2Num(max) - adjustPx);
      innerHeightStyle['height'] = convertNum2PX(this.inputEl.scrollHeight + countPx);
    } else if (this.height) {
      innerHeightStyle['height'] = convertNum2PX(convertPX2Num(this.height) - adjustPx);
    } else {
      innerHeightStyle['height'] = convertNum2PX(Math.min(40, this.inputEl.scrollHeight) + countPx);
    }
    Object.assign(this.innerEl.style, innerHeightStyle);
  }

  render() {
    const showCount = this.showCount || (typeof this.maxLength === 'number' && this.showCount !== false);
    const status =
      showCount && this.maxLength && this.maxLength < [...(this.inputEl?.value || '')].length ? 'error' : this.status;
    const cls = classnames(`${prefix}__wrapper`, { [`${prefix}__wrapper--disabled`]: this.disabled });
    return (
      <Host dir={dir()} ks-textarea>
        <span dir={dir()} class={cls}>
          <label
            class={classnames(`${prefix}__inner`, {
              [`${prefix}__inner--focus`]: this.isFocus,
              [`${prefix}__inner--disabled`]: this.disabled,
              [`${prefix}__inner--${status}`]: status,
            })}
          >
            {this.prefixSlot && (
              <span class={classnames(`${prefix}__prefix`, `${prefix}__addon`)} part="prefix">
                <slot name="prefix"></slot>
              </span>
            )}

            <div ref={(el) => (this.innerEl = el!)} class={`${prefix}__inner__column`}>
              <textarea
                part="textarea"
                class={classnames(prefix)}
                ref={(el) => (this.inputEl = el as HTMLTextAreaElement)}
                autoFocus={this.autoFocus}
                readOnly={this.readOnly}
                autoComplete={this.autoComplete}
                disabled={this.disabled}
                placeholder={this.placeholder || t(inputMessages.placeholder)}
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
                    this.ksClick.emit(e);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    this.ksKeydownEnter.emit(e);
                  }
                }}
                style={{ resize: this.resize }}
                data-testid="ks-text-field-index-aZM5M2"
              />

              {showCount && (
                <div class={`${prefix}__count`} ref={(el) => (this.countContainerEl = el!)}>
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
            </div>
            {this.suffixSlot && (
              <span
                ref={
                  // istanbul ignore next
                  (el) => (this.suffixSpanEl = el!)
                }
                class={classnames(`${prefix}__suffix`, `${prefix}__addon`)}
                part="suffix"
              >
                <slot name="suffix"></slot>
              </span>
            )}
          </label>
        </span>
      </Host>
    );
  }
}
