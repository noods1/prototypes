import { Component, Element, h, Prop, Event, EventEmitter, Host, State, Watch } from '@stencil/core';
import { format, parse } from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, t } from '@src/utils/utils';
import { IDateValue, Status } from '../../../../entities';
import { getLocalizedDateTime } from '@src/components/ks-date-picker/utils';
import store from '@src/store';
import { i18nRelativeTime } from '@src/utils/i18n/date';
import dayjs from 'dayjs';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { commonMessages, datePickerMessages } from '@fe-infra/keystone-locales';

const DEFAULT_FORMAT = 'MMMM d, yyyy HH:mm:ss';
const DEFAULT_TIME = '00:00:00';
const NOOP = () => false;
/**
 * @slot prefix - Slot for prefix content.
 * @slot suffix - Slot for suffix content.
 * @slot show-icon - Slot for the expand indicator icon.
 * @slot close-icon - Slot for the clear icon.
 * @slot preset - Slot for preset date and time options.
 * @slot footer - Slot for footer content in the picker panel.
 */
@Component({
  tag: 'ks-date-time-picker',
  styleUrl: 'day-picker.scss',
  shadow: true,
})
export abstract class KsDateTimePickerComponent {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popperRef;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsDateTimePickerElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  dateTimePanelEl: HTMLKsDateTimePanelElement;
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
   * @locale {en} The currently selected date and time value. This can be a timestamp (number), a date string, or a Date object.
   * @locale {zh} 当前选中的日期和时间值。这可以是一个时间戳 (number)、日期字符串或 Date 对象。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: number | string | Date;
  /**
   * @locale {en} The width of the date picker input field.
   * @locale {zh} 日期选择框输入字段的宽度。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() width: number;
  // /**
  //  * @locale {en} Placeholder text displayed in the input field when no date is selected. This provides a hint to the user about what to input.
  //  * @locale {zh} 当未选择日期时，在输入字段中显示的占位符文本。它为用户提供有关输入内容的提示。
  //  */
  // @Prop() placeholder: string;
  /**
   * @locale {en} The position of the date picker dropdown relative to the input field. Can be one of the following values: `"bottom-start"`, `"bottom"` or `"bottom-end"`. Default: "bottom-start".
   * @locale {zh} 日期选择框下拉菜单相对于输入字段的位置。可选值为："bottom-start"、"bottom" 或 "bottom-end"。默认："bottom-start"。
   * */
  @Prop() placement: 'bottom-start' | 'bottom' | 'bottom-end' = 'bottom-start';
  /**
   * @locale {en} Determine whether the date picker is disabled. When set to `true`, users cannot interact with the date picker.
   * @locale {zh} 用于确定日期选择框是否禁用。设置为 `true` 时，用户无法与日期选择框进行交互。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /**
   * @locale {en} The format for displaying the selected date and time. Default: "MMMM d, yyyy HH:mm:ss".
   * @locale {zh} 显示所选日期和时间的格式。默认："MMMM d, yyyy HH:mm:ss"。
   */
  @Prop() format = DEFAULT_FORMAT;
  /**
   * @locale {en} A function that determines which dates are disabled and cannot be selected. This function receives a date as an argument and should return `true` for dates that should be disabled.
   * @locale {zh} 一个函数，用于确定哪些日期被禁用并且不能被选中。该函数接收一个日期作为参数，并应返回 `true` 表示该日期应该被禁用。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date) => boolean;
  /**
   * @locale {en} determine whether the hour is displayed
   * @locale {zh} 确定是否显示小时
   */
  @Prop() showHour = true;
  /**
   * @locale {en} determine whether the minute is displayed
   * @locale {zh} 确定是否显示分钟
   */
  @Prop() showMinute = true;
  /**
   * @locale {en} determine whether the second is displayed
   * @locale {zh} 确定是否显示秒
   */
  @Prop() showSecond = false;
  /**
   * @locale {en} The step of the minute
   * @locale {zh} 分钟的步长
   */
  @Prop() minuteStep = 1;
  /**
   * @locale {en} The step of the hour
   * @locale {zh} 小时的步长
   */
  @Prop() hourStep = 1;
  /**
   * @locale {en} The step of the second
   * @locale {zh} 秒的步长
   */

  @Prop() secondStep = 1;
  /**
   * @locale {en} A function to disable specific hours. It receives the hour (0-23) and the currently selected time string (HH:mm:ss) as arguments and should return true if the hour should be disabled.
   * @locale {zh} 用于禁用特定小时的函数。它接收小时数 (0-23) 和当前选中的时间字符串 (HH:mm:ss) 作为参数，如果该小时应被禁用，则返回 true。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledHours: (v: number, selectedTime: string) => boolean;
  /**
   * @locale {en} A function to disable specific minutes. It receives the minute (0-59) and the currently selected time string (HH:mm:ss) as arguments and should return true if the minute should be disabled.
   * @locale {zh} 用于禁用特定分钟的函数。它接收分钟数 (0-59) 和当前选中的时间字符串 (HH:mm:ss) 作为参数，如果该分钟应被禁用，则返回 true。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledMinutes: (v: number, selectedTime: string) => boolean;
  /**
   * @locale {en} A function to disable specific seconds. It receives the second (0-59) and the currently selected time string (HH:mm:ss) as arguments and should return true if the second should be disabled.
   * @locale {zh} 用于禁用特定秒数的函数。它接收秒数 (0-59) 和当前选中的时间字符串 (HH:mm:ss) 作为参数，如果该秒数应被禁用，则返回 true。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledSeconds: (v: number, selectedTime: string) => boolean;
  /**
   * @locale {en} A function to disable AM/PM selection. It receives the AM/PM string ('AM' or 'PM') and the currently selected time string (HH:mm:ss) as arguments and should return true if the selection should be disabled. This is relevant when `isHour12` is true.
   * @locale {zh} 用于禁用 AM/PM 选择的函数。它接收 AM/PM 字符串 ('AM' 或 'PM') 和当前选中的时间字符串 (HH:mm:ss) 作为参数，如果该选择应被禁用，则返回 true。当 `isHour12` 为 true 时相关。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledAm: (v: string, selectedTime: string) => boolean;
  /**
   * @locale {en} Display the time zone in the time picker or in the time picker panel.
   * @locale {zh} 在时间选择器或时间选择器面板中显示时区。
   */
  @Prop() timeZoneDisplayPosition: 'picker' | 'panel' = 'picker';

  /**
   * @locale {en} The timezone to be used for date and time calculations and display (e.g., "America/New_York", "UTC").
   * @locale {zh} 用于日期和时间计算及显示的时区 (例如："America/New_York", "UTC")。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() timezone: string;

  /**
   * @locale {en} The long format of the timezone, often used for display purposes (e.g., "Eastern Standard Time").
   * @locale {zh} 时区的长格式，通常用于显示目的 (例如："Eastern Standard Time")。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() longTimezone: string;
  /**
   * @locale {en} Determine whether the clear button is displayed. When set to `true`, users can clear the selected date by clicking the clear button.
   * @locale {zh} 用于确定是否显示清除按钮。设置为 `true` 时，用户可以通过单击清除按钮来清除所选日期。
   */
  @Prop() clearable = true;

  /**
   * @locale {en} Custom event triggered when the selected date and time changes. It returns the new date value as a formatted string according to the `format` prop, or an empty string if cleared/intermediately changed.
   * @locale {zh} 当所选日期和时间发生变化时触发的自定义事件。它返回根据 `format` 属性格式化后的新日期值字符串，或者在清除/中间更改时返回空字符串。
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
   * @locale {en} The status of the DateTimePicker, can be used to indicate validation states like 'error', 'warning', etc.
   * @locale {zh} DateTimePicker 的状态，可用于指示验证状态，如 'error'、'warning' 等。
   */
  @Prop() status?: Status;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() dateTimeValue: string;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private isHour12: boolean;

  get locale() {
    return store.state.config.locale;
  }

  private valueTime = DEFAULT_TIME;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private valueDate;

  @Watch('value')
  valueWatcher(val: number | string | Date) {
    if (typeof val === 'string') {
      if (val === '') {
        this.valueDate = undefined;
        this.valueTime = DEFAULT_TIME;
        this.dateTimeValue = '';
      } else {
        this.valueDate = dayjs(val).toDate();
        const hour = dayjs(val).hour();
        const minute = dayjs(val).minute();
        const second = dayjs(val).second();
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const pad = (val) => String(val).padStart(2, '0');
        this.valueTime = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
      }
    } else if (val instanceof Date) {
      this.valueDate = val;
      this.valueTime = format(val, 'HH:mm:ss');
    } else {
      this.valueDate = new Date(val);
      this.valueTime = format(new Date(val), 'HH:mm:ss');
    }
    this.formatValueDisplay();
  }

  handleValueChange(event: { detail: string | number | Date }) {
    if (this.value === undefined) {
      this.dateTimeValue = '';
      this.valueDate = event.detail as Date;
      this.valueTime = DEFAULT_TIME;
    }
    this.ksChange.emit?.('');
    this.popperRef?.close?.();
  }

  get timeZoneToday() {
    const { timezoneOffset } = store.state.i18n;
    const today = new Date();
    const offset = (today.getTimezoneOffset() + timezoneOffset) * 60 * 1000;
    const localDate = new Date(today.getTime() + offset);
    return localDate;
  }

  setToday() {
    const today = this.timeZoneToday;
    this.valueDate = today;
    this.dateTimePanelEl.setActiveDate(today);
    this.valueTime = format(today, 'HH:mm:ss');
    if (this.value === undefined) {
      this.formatValueDisplay();
    }
    this.ksChange.emit?.(this.valueDate ? format(this.valueDate, this.format) : this.valueDate);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  formatDate(valueDate) {
    return parse(this.valueTime, 'HH:mm:ss', valueDate);
  }

  formatValueDisplay() {
    if (!this.valueDate) {
      return;
    }
    if (!this.format || this.format === DEFAULT_FORMAT) {
      this.dateTimeValue =
        this.valueDate && getLocalizedDateTime(parse(this.valueTime, 'HH:mm:ss', this.valueDate), this.locale);
    } else {
      this.dateTimeValue = this.valueDate && format(parse(this.valueTime, 'HH:mm:ss', this.valueDate), this.format);
    }
  }

  componentWillLoad() {
    const date = getLocalizedDateTime(parse('23:00:00', 'HH:mm:ss', new Date()), this.locale);
    this.isHour12 = this.format && this.format !== DEFAULT_FORMAT ? this.format.includes('a') : /pm|am/i.test(date);
    if (this.value) {
      this.valueWatcher(this.value);
    }
  }

  @State() isVisible = false;

  render() {
    return (
      <Host dir={dir()} ks-date-time-picker>
        <ks-picker-base
          exportparts="field: field"
          timeZoneDisplayPosition={this.timeZoneDisplayPosition}
          timezone={this.timezone}
          longTimezone={this.longTimezone}
          placement={this.placement}
          width={this.width}
          placeholder={t(datePickerMessages.placeholder)}
          startPlaceholder={t(datePickerMessages.start)}
          endPlaceholder={t(datePickerMessages.end)}
          status={this.status}
          onKsShow={() => {
            this.ksShow?.emit?.();
            this.ksVisibleChange.emit(true);
            this.isVisible = true;
            this.dateTimePanelEl?.timePanelScrolltoTime();
          }}
          onKsHide={() => {
            this.ksVisibleChange.emit(false);
            this.isVisible = false;
            this.ksHide?.emit?.();
          }}
          clearable={this.clearable}
          disabled={this.disabled}
          onKsChange={(value) => {
            this.handleValueChange(value);
          }}
          value={this.dateTimeValue}
          popoverRef={(el) => (this.popperRef = el)}
          readonly
          data-testid="day-day-time-picker-ky5bJs"
        >
          {this.showIconSlot && <slot name="show-icon" slot="show-icon"></slot>}
          {this.suffixSlot && <slot name="suffix" slot="suffix"></slot>}
          {this.closeIconSlot && <slot name="close-icon" slot="close-icon"></slot>}
          {this.prefixSlot && <slot slot="prefix" name="prefix"></slot>}
          <ks-date-time-panel
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            ref={(el) => (this.dateTimePanelEl = el)}
            disabledDate={this.isVisible ? this.disabledDate : NOOP}
            onKsDateChange={(event) => {
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              const valueDate = this.formatDate(event.detail[0]);
              if (this.value === undefined) {
                this.valueDate = valueDate;
                this.formatValueDisplay();
              }
              this.ksChange.emit?.(format(valueDate, this.format));
            }}
            onKsTimeChange={(event) => {
              const valueTime = event.detail;
              const valueDate = this.valueDate && parse(valueTime, 'HH:mm:ss', this.valueDate);
              if (this.value === undefined) {
                this.valueTime = valueTime;
                this.valueDate = valueDate;
                this.formatValueDisplay();
              }
              valueDate && this.ksChange.emit?.(format(valueDate, this.format));
            }}
            value={this.valueDate}
            isHour12={this.isHour12}
            disabledAm={this.disabledAm}
            disabledHours={this.isVisible ? this.disabledHours : NOOP}
            disabledMinutes={this.isVisible ? this.disabledMinutes : NOOP}
            disabledSeconds={this.isVisible ? this.disabledSeconds : NOOP}
            hourStep={this.hourStep}
            minuteStep={this.minuteStep}
            secondStep={this.secondStep}
            showHour={this.showHour}
            showMinute={this.showMinute}
            showSecond={this.showSecond}
            data-testid="day-day-time-picker-idFkcy"
          >
            {this.presetSlot && (
              <div slot="preset">
                <slot name="preset"></slot>
              </div>
            )}
          </ks-date-time-panel>
          <slot name="footer" slot="footer">
            <ks-button
              size="sm"
              onClick={() => {
                this.setToday();
              }}
              data-testid="day-day-time-picker-n3roRv"
            >
              {i18nRelativeTime(0, 'days', this.locale)}
            </ks-button>
            <ks-button
              variant="primary"
              size="sm"
              onClick={() => {
                this.popperRef.close();
              }}
              data-testid="day-day-time-picker-m1iCYw"
            >
              {t(commonMessages.confirm)}
            </ks-button>
          </slot>
        </ks-picker-base>
      </Host>
    );
  }
}
