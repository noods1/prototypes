import { Component, Element, h, Prop, Event, EventEmitter, Host, State } from '@stencil/core';
import { format, toDate } from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, t } from '@src/utils/utils';
import { Status, IDateValue } from '../../../../entities';
import { getLocalizedDate } from '@src/components/ks-date-picker/utils';
import store from '@src/store';
import dayjs from 'dayjs';
import { FormContextValueReconcile, getReconciledFormContextData } from '@src/utils/form/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking, sendExposeTracking, sendDurationTracking } from '@src/utils/tracking';
import { datePickerMessages } from '@fe-infra/keystone-locales';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';

const DEFAULT_FORMAT = 'MMMM d, yyyy';
const NOOP = () => false;

/**
 * @slot prefix - Slot for prefix content.
 * @slot suffix - Slot for suffix content.
 * @slot show-icon - Slot for the expand indicator icon.
 * @slot close-icon - Slot for the clear icon.
 * @slot preset - Slot for preset date options.
 * @slot footer - Slot for footer content in the picker panel.
 */
@Component({
  tag: 'ks-date-picker',
  styleUrl: 'day-picker.scss',
  shadow: true,
})
export abstract class KsDatePickerComponent extends FormBaseComponent<IDateValue> {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popperRef;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsDatePickerElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'show-icon' }) showIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'close-icon' }) closeIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'prefix' }) prefixSlot: Slots;

  /**
   * @locale {en} The currently selected date value. This can be a single date or an array of dates, depending on the configuration of the date picker. It represents the date(s) that the user has selected.
   * @locale {zh} 当前选中的日期值。根据日期选择框的配置，这可以是单个日期或日期数组。它表示用户所选择的日期。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() @FormContextValueReconcile() value: number | string | Date;
  /**
   * @locale {en} The width of the date picker input field.
   * @locale {zh} 日期选择框输入字段的宽度。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() width: number;
  /**
   * @locale {en} Placeholder text displayed in the input field when no date is selected. This provides a hint to the user about what to input.
   * @locale {zh} 当未选择日期时，在输入字段中显示的占位符文本。它为用户提供有关输入内容的提示。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() placeholder: string;
  /**
   * @locale {en} The position of the date picker dropdown relative to the input field. Can be one of the following values: `"bottom-start"`, `"bottom"` or `"bottom-end"`.
   * @locale {zh} 日期选择框下拉菜单相对于输入字段的位置。可选值为：`"bottom-start"`, `"bottom"` 或 `"bottom-end"`。
   */
  @Prop() placement: 'bottom-start' | 'bottom' | 'bottom-end' = 'bottom-start';
  /**
   * @locale {en} Determine whether the date picker is disabled. When set to `true`, users cannot interact with the date picker.
   * @locale {zh} 用于确定日期选择框是否禁用。设置为 `true` 时，用户无法与日期选择框进行交互。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /**
   * @locale {en} The format in which the selected date is displayed. This can be specified using a string format (e.g., "yyyy-MM-DD") to customize the date representation.
   * @locale {zh} 显示所选日期的格式。可以使用字符串格式（例如 "yyyy-MM-DD"）来定制日期表示。
   */
  @Prop() format = DEFAULT_FORMAT;
  /**
   * @locale {en} A function that determines which dates are disabled and cannot be selected. This function receives a date as an argument and should return `true` for dates that should be disabled.
   * @locale {zh} 一个函数，用于确定哪些日期被禁用并且不能被选中。该函数接收一个日期作为参数，并应返回 `true` 表示该日期应该被禁用。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date) => boolean;
  /**
   * @locale {en} Determine whether the time zone is displayed in the time picker or in the time picker panel.
   * @locale {zh} 决定时区信息是显示在选择器输入框中还是在时间选择面板中。
   */
  @Prop() timeZoneDisplayPosition: 'picker' | 'panel' = 'picker';

  /**
   * @locale {en} The IANA timezone string (e.g., "America/New_York", "Asia/Shanghai"). This is used for date calculations and display.
   * @locale {zh} IANA 时区字符串（例如："America/New_York", "Asia/Shanghai"）。用于日期计算和显示。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() timezone: string;

  /**
   * @locale {en} A longer, more descriptive timezone string that might include offset information (e.g., "America/New_York (EST)"). Primarily for display purposes.
   * @locale {zh} 更长、更具描述性的时区字符串，可能包含偏移信息（例如："America/New_York (EST)"）。主要用于显示目的。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() longTimezone: string;

  /**
   * @locale {en} Determine whether the clear button is displayed. When set to `true`, users can clear the selected date by clicking the clear button.
   * @locale {zh} 用于确定是否显示清除按钮。设置为 `true` 时，用户可以通过单击清除按钮来清除所选日期。
   */
  @Prop() clearable = true;

  /**
   * @locale {en} Custom event triggered when the selected date changes. It returns the new date value, allowing the parent component to react to the change.
   * @locale {zh} 当所选日期发生变化时触发的自定义事件。返回新的日期值，允许父组件对变化做出反应。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<IDateValue>;
  /**
   * @locale {en} Custom event triggered when the date picker is shown. This event can be used to execute additional logic when the date picker is displayed to the user.
   * @locale {zh} 当日期选择框显示时触发的自定义事件。可以用于在日期选择框向用户显示时执行额外的逻辑。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksShow: EventEmitter<void>;
  /**
   * @locale {en} Custom event triggered when the date picker is hidden. This event can be used to execute additional logic when the date picker is hidden from the user.
   * @locale {zh} 当日期选择框隐藏时触发的自定义事件。可以用于在日期选择框从用户界面中隐藏时执行额外的逻辑。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksHide: EventEmitter<void>;
  /**
   * @locale {en} Custom event triggered when the visibility of the date picker changes. It provides the new visibility state, allowing for dynamic adjustments in the parent component.
   * @locale {zh} 当日期选择框的可见性发生变化时触发的自定义事件。提供新的可见性状态，允许父组件进行动态调整。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksVisibleChange: EventEmitter<boolean>;

  /**
   * @locale {en} The status of the picker (e.g., error, warning).
   * @locale {zh} 选择器的状态（例如，错误、警告）。
   */
  @Prop() status?: Status;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'footer' }) footerSlot: Slots;

  get locale() {
    return store.state.config.locale;
  }

  private get valueDate() {
    if (typeof this.value === 'string') {
      return dayjs(this.value).toDate();
    }
    return this.value;
  }

  private set valueDate(newValue) {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.value = newValue || undefined;

    const emitValue = this.valueDate ? format(this.valueDate, this.format) : this.valueDate;
    this.ksChange.emit?.(emitValue);
    sendActionTracking(this.el, { eventType: 'change', componentParams: { value: emitValue } });
  }

  constructor() {
    super();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  handleValueChange(event: { detail: string | number | Date }) {
    this.valueDate = event.detail as number;
    this.popperRef?.close?.();
  }

  // @Method()
  // async closePanel() {
  //   this.popperRef?.close();
  // }

  // @Method()
  // async openPanel() {
  //   this.popperRef?.open();
  // }

  formatValueDisplay() {
    if (!this.valueDate) {
      return '';
    }
    if (!this.format || this.format === DEFAULT_FORMAT) {
      return getLocalizedDate(toDate(this.valueDate), this.locale);
    }
    return format(this.valueDate, this.format);
  }

  @State() isVisible = false;

  render() {
    const { disabled, status } = getReconciledFormContextData(this);
    return (
      <Host dir={dir()} ks-date-picker>
        <ks-picker-base
          exportparts="field: field"
          width={this.width}
          timezone={this.timezone}
          longTimezone={this.longTimezone}
          placeholder={this.placeholder || t(datePickerMessages.placeholder)}
          startPlaceholder={t(datePickerMessages.start)}
          endPlaceholder={t(datePickerMessages.end)}
          status={status}
          timeZoneDisplayPosition={this.timeZoneDisplayPosition}
          onKsShow={() => {
            this.ksShow?.emit?.();
            this.isVisible = true;
            this.ksVisibleChange.emit(true);
            sendExposeTracking(this.el, { eventType: 'popup' });
            sendDurationTracking(this.el, { eventType: 'popup', reset: true });
          }}
          onKsHide={() => {
            this.ksVisibleChange.emit(false);
            this.isVisible = false;
            this.ksHide?.emit?.();
            sendDurationTracking(this.el, { eventType: 'popup' });
          }}
          clearable={this.clearable}
          disabled={disabled}
          onKsChange={(value) => {
            this.handleValueChange(value);
          }}
          value={this.formatValueDisplay()}
          placement={this.placement}
          popoverRef={(el) => (this.popperRef = el)}
          readonly={true}
          data-testid="day-day-picker-t9gaVg"
        >
          {this.showIconSlot && <slot name="show-icon" slot="show-icon"></slot>}
          {this.suffixSlot && <slot name="suffix" slot="suffix"></slot>}
          {this.closeIconSlot && <slot name="close-icon" slot="close-icon"></slot>}
          {this.prefixSlot && <slot slot="prefix" name="prefix"></slot>}
          <ks-date-panel
            disabledDate={this.disabled ? () => true : this.isVisible ? this.disabledDate : NOOP}
            onKsChange={this.handleValueChange.bind(this)}
            value={this.valueDate}
            data-testid="day-day-picker-3V8Byt"
          >
            {this.presetSlot && (
              <div slot="preset">
                <slot name="preset"></slot>
              </div>
            )}
          </ks-date-panel>
          {this.footerSlot && <slot slot="footer" name="footer"></slot>}
        </ks-picker-base>
      </Host>
    );
  }
}
