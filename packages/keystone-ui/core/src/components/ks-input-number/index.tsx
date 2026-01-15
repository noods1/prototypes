import {
  Component,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  State,
  Watch,
  ComponentInterface,
  Host,
  Fragment,
  Method,
} from '@stencil/core';
import classnames from 'classnames';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, t } from '@src/utils/utils';
import { InputStatus, InputNumberSize, EnumInputNumberActionType } from '../../entities';
import { formatToLocalizedNumber, parseLocalizedNumber, sanitizeLocalizedNumber } from '@src/utils/i18n/number';
import store from '@src/store';
import { sendActionTracking } from '@src/utils/tracking';
import { registerPluginManager } from '@src/utils/plugin';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { inputNumberMessages } from '@fe-infra/keystone-locales';

const prefix = 'input-number';

/** 虽然 value 类型限制为 number | null，但是处理传参时兼容处理更多类型 */
type LooseValue = string | number | undefined | null;

/**
 * @slot prefix - Slot for content to be displayed before the input field.
 * @slot suffix - Slot for content to be displayed after the input field.
 */
@Component({
  tag: 'ks-input-number',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsInputNumber implements ComponentInterface {
  ['ks-name'] = 'ks-input-number';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsInputNumberElement;
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
   * @locale {en} The value of the input field, which will be of type `number` or `string` based on the `valueType` setting. When the input field is empty, the value is always `null`.
   * @locale {zh} 输入框的值，类型根据 `valueType` 的设置为 `number` 或 `string`。当输入框为空时，值统一为 `null`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: number | string | null;
  /**
   * @locale {en} The default value of the input field when it is first rendered.
   * @locale {zh} 输入框首次渲染时的默认值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() defaultValue: number | string | null;
  /**
   * @locale {en} The type of the input value. When set to 'number', non-empty values will always be of type `number`. When set to 'string', non-empty values will always be of type `string` to preserve precision. Note that this only affects non-empty values; when the input field is empty, the value is always `null`.
   * @locale {zh} 输入框值的类型。设置为 'number' 时，非空值总是为 `number` 类型；设置为 'string' 时，非空值总是为 `string` 类型以保留精度。注意，这只影响非空值的类型，输入框为空时值统一为 `null`。
   */
  @Prop() valueType: 'number' | 'string' = 'number';
  /**
   * @locale {en} The size of the input field. Possible values are "sm" and "md".
   * @locale {zh} 输入框的大小。可选值为 "sm" 和 "md"。
   */
  @Prop() size: InputNumberSize = 'md';
  // /**
  //  * `-/+` 增减按钮的风格/位置，默认为 'none' 不展示
  //  */
  // @Prop() controls: InputNumberControlsType = EnumInputNumberControlsType.None;
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
  @Prop() disabled = false;
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
   * @locale {en} The minimum value that can be entered in the input field.
   * @locale {zh} 输入框中可以输入的最小值。
   */
  @Prop() min = -Infinity;
  /**
   * @locale {en} The maximum value that can be entered in the input field.
   * @locale {zh} 输入框中可以输入的最大值。
   */
  @Prop() max = Infinity;
  /**
   * @locale {en} The amount by which the value can be incremented or decremented.
   * @locale {zh} 值可以增加或减少的幅度。
   */
  @Prop() step = 1;
  /**
   * @locale {en} The number of decimal places to which the input value is rounded.
   * @locale {zh} 输入值四舍五入到的小数位数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() precision: number;
  /**
   * @locale {en} Explicitly sets the visibility of the increment/decrement control buttons. If this prop is not set (i.e., `undefined`), the visibility defaults to showing controls for the "sm" size and hiding them for the "md" size.
   * @locale {zh} 显式设置用于增加/减少值的控制按钮的可见性。如果未设置此属性（即 `undefined`），则按钮的可见性将根据 `size` 属性的默认行为决定：“sm” 尺寸显示控制按钮，“md” 尺寸则会隐藏。
   */
  @Prop() showControls?: boolean;
  /**
   * @locale {en} Custom event triggered when the value of the input field changes. The event detail contains the new value, which can be a `number` or `string` based on the `valueType` prop.
   * @locale {zh} 当输入框的值发生变化时触发的自定义事件。事件详细信息包含新值，根据 `valueType` 属性，其类型可以是 `number` 或 `string`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<number | string>;
  /**
   * @locale {en} A function used to filter out any text that does not meet the requirements in real-time. By default, this function filters based on numeric localization rules.
   * @locale {zh} 用于实时过滤输入框中不符合要求文本的函数属性。默认情况下，根据数字本地化规则进行过滤。
   */
  @Prop() sanitize: (value: string) => string = sanitizeLocalizedNumber;
  /**
   * @locale {en} A function used to parse the text in the input field into a numerical value in real-time. By default, this function parses based on numeric localization rules.
   * @locale {zh} 用于实时将输入框中的文本解析为数值的函数属性。默认情况下，根据数字本地化规则进行解析。
   */
  @Prop() parse: (value: string) => number | null = parseLocalizedNumber;
  /**
   * @locale {en} A function used to format the numeric text in the input field during initialization and when the field loses focus (blur). By default, it formats based on the precision and numeric localization rules.
   * @locale {zh} 用于在初始化和输入框失去焦点时格式化数字文本的函数。默认情况下，根据精确度和数字本地化规则进行格式化。
   */
  @Prop() format: (value: number, precision?: number) => string = formatToLocalizedNumber;
  /**
   * 内部value
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() numeralValue: number | null;

  locale = store.state.config.locale;

  @Watch('value')
  handleValuePropUpdate(value: LooseValue) {
    if (!value && value !== 0) {
      this.numeralValue = null;
      this.setInnerInputValue('');
    } else {
      const numeralValue = Number(value);
      if (numeralValue !== this.numeralValue) {
        this.numeralValue = numeralValue;
        const formatted = this.format(Number(value), this.precision);
        this.setInnerInputValue(formatted);
      }
    }
  }

  @Watch('defaultValue')
  handleDefaultValueUpdate(value: LooseValue) {
    if (this.value === undefined) {
      this.handleValuePropUpdate(value);
    }
  }

  @Watch('precision')
  handlePrecisionUpdate(precision?: number) {
    if (typeof precision === 'number' && this.numeralValue !== null) {
      const formatted = this.format(Number(this.value), this.precision);
      this.setInnerInputValue(formatted);
      // TODO re-emit in valueType string mode?
    }
  }

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

  getValueByType() {
    if (this.valueType === 'number') {
      return this.numeralValue;
    }

    if (this.numeralValue === null) {
      return '';
    } else if (typeof this.precision === 'number') {
      return Number(this.numeralValue).toFixed(this.precision);
    } else {
      return String(this.numeralValue);
    }
  }

  setInnerInputValue(value: string) {
    if (!this.inputEl) {
      return;
    }
    this.inputEl.value = value;
  }

  fixNumberWithLimits(value: number) {
    let fittedNumber = Math.max(Math.min(this.max, value), this.min);
    fittedNumber = typeof this.precision === 'number' ? Number(fittedNumber.toFixed(this.precision)) : fittedNumber;
    return fittedNumber;
  }

  handleBlur = () => {
    if (this.numeralValue === null) {
      this.setInnerInputValue('');
    } else {
      const numeralValue = this.fixNumberWithLimits(this.numeralValue);
      this.setInnerInputValue(this.format(numeralValue, this.precision));

      if (numeralValue !== this.numeralValue) {
        this.numeralValue = numeralValue;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.ksChange.emit(this.getValueByType());
        sendActionTracking(this.el, { eventType: 'change', componentParams: { value: this.getValueByType() } });
      }
    }
    sendActionTracking(this.el, { eventType: 'blur' });
  };

  handleFocus = () => {
    sendActionTracking(this.el, { eventType: 'focus' });
  };

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  handleInput = ({ detail }) => {
    const sanitizedValue = this.sanitize(detail || '');
    this.setInnerInputValue(sanitizedValue);

    let numeralValue = this.parse(sanitizedValue);
    if (!numeralValue && numeralValue !== 0) {
      numeralValue = null;
    }
    if (numeralValue !== null) {
      numeralValue = this.fixNumberWithLimits(numeralValue);
    }

    if (this.numeralValue !== numeralValue) {
      this.numeralValue = numeralValue;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.ksChange.emit(this.getValueByType());
      sendActionTracking(this.el, { eventType: 'change', componentParams: { value: this.getValueByType() } });
    }
  };

  updateNumeralValueAndFormat = (value: number) => {
    const numeralValue = this.fixNumberWithLimits(value);

    if (numeralValue !== this.numeralValue) {
      this.numeralValue = numeralValue;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.ksChange.emit(this.getValueByType());
      sendActionTracking(this.el, { eventType: 'change', componentParams: { value: this.getValueByType() } });
    }
    this.setInnerInputValue(String(this.format(this.numeralValue, this.precision)));
  };
  handleUpdateFromControls = (type: EnumInputNumberActionType) => {
    if (this.disabled) {
      return;
    }
    if (type === EnumInputNumberActionType.Increase) {
      if (Number(this.numeralValue) >= this.max) {
        return;
      }
      this.updateNumeralValueAndFormat((Number(this.numeralValue) || 0) + this.step);
    } else {
      if (Number(this.numeralValue) <= this.min) {
        return;
      }
      this.updateNumeralValueAndFormat((Number(this.numeralValue) || 0) - this.step);
    }
  };

  renderOutsetControls = () =>
    this.showControls && (
      <Fragment>
        <span slot="controls-end" class={classnames(`${prefix}__out-ctl-btn`)}>
          <span
            class={classnames(`${prefix}__out-ctl-btn-up`, {
              [`${prefix}__out-ctl-btn-up--disabled`]: Number(this.numeralValue) >= this.max || this.disabled,
            })}
            onClick={() => this.handleUpdateFromControls(EnumInputNumberActionType.Increase)}
            data-testid="ks-input-number-index-i5voqh"
          >
            <ks-icon-chevron-up size="14" />
          </span>
          <span
            class={classnames(`${prefix}__out-ctl-btn-down`, {
              [`${prefix}__out-ctl-btn-down--disabled`]: Number(this.numeralValue) <= this.min || this.disabled,
            })}
            onClick={() => this.handleUpdateFromControls(EnumInputNumberActionType.Decrease)}
            data-testid="ks-input-number-index-ew1ATE"
          >
            <ks-icon-chevron-down size="14" />
          </span>
        </span>
      </Fragment>
    );

  renderInsetControls = () =>
    (typeof this.showControls !== 'boolean' || this.showControls) && (
      <Fragment>
        {/* 加按钮 */}
        <span
          slot="controls-end"
          class={classnames(`${prefix}__controls-btn ${prefix}__controls-btn-end`, {
            [`${prefix}__controls-btn--disabled`]: Number(this.numeralValue) >= this.max || this.disabled,
          })}
          onClick={() => this.handleUpdateFromControls(EnumInputNumberActionType.Increase)}
          data-testid="ks-input-number-index-oevemz"
        >
          <ks-icon-plus size="14" />
        </span>
        {/* 减按钮 */}
        <span
          slot="controls-start"
          class={classnames(`${prefix}__controls-btn ${prefix}__controls-btn-start`, {
            [`${prefix}__controls-btn--disabled`]: Number(this.numeralValue) <= this.min || this.disabled,
          })}
          onClick={() => this.handleUpdateFromControls(EnumInputNumberActionType.Decrease)}
          data-testid="ks-input-number-index-2arrMJ"
        >
          <ks-icon-minus size="14" />
        </span>
      </Fragment>
    );

  componentDidLoad() {
    this.handleValuePropUpdate(this.value);
    if (this.defaultValue && this.value === undefined) {
      this.inputEl.value = this.defaultValue.toString();
    }
  }

  watchLocaleChange() {
    if (store.state.config.locale !== this.locale) {
      this.locale = store.state.config.locale;
      if (this.numeralValue !== null) {
        const formatted = this.format(Number(this.value), this.precision);
        this.setInnerInputValue(formatted);
      }
    }
  }

  render() {
    this.watchLocaleChange();

    return (
      <Host dir={dir()} ks-input-number>
        <ks-input
          exportparts="input: input, field: field"
          class={classnames(prefix, `${prefix}__has-controls`)}
          type="text"
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          ref={(inputRef) => (this.inputEl = inputRef)}
          disabled={this.disabled}
          clearable={this.clearable}
          status={this.status}
          placeholder={this.placeholder || t(inputNumberMessages.placeholder)}
          onKsChange={this.handleInput}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          data-testid="ks-input-number-index-sX1fTc"
        >
          {/* 输入框透传slot */}
          {this.prefixSlot && <slot slot="prefix" name="prefix"></slot>}
          {this.suffixSlot && <slot slot="suffix" name="suffix"></slot>}
          {/* 输入框操作 */}
          {this.size === 'md' ? this.renderOutsetControls() : this.renderInsetControls()}
        </ks-input>
      </Host>
    );
  }
}
