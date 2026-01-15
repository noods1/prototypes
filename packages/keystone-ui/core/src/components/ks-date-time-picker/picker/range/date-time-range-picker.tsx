import { Component, Element, h, Prop, Event, EventEmitter, Host, Method, State, Watch } from '@stencil/core';
import { format, parse } from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, t } from '@src/utils/utils';
import { Status, IMultipleDateValue, IDisabledAmFn, IDisabledTimeFn } from '../../../../entities';
import store from '@src/store';
import { getLocalizedDateTime } from '@src/components/ks-date-picker/utils';
import { i18nRelativeTime } from '@src/utils/i18n/date';
import dayjs from 'dayjs';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { commonMessages, datePickerMessages } from '@fe-infra/keystone-locales';
// import classNames from 'classnames';

const DEFAULT_FORMAT = 'MMMM d, yyyy HH:mm:ss';
const prefix = 'ks-date-time-range-picker';

const NOOP = () => false;

const DEFAULT_TIME = '00:00:00';
/**
 * @slot prefix - Slot for prefix content.
 * @slot suffix - Slot for suffix content.
 * @slot show-icon - Slot for the expand indicator icon.
 * @slot close-icon - Slot for the clear icon.
 * @slot preset - Slot for preset date and time range options.
 * @slot footer - Slot for footer content in the picker panel.
 */
@Component({
  tag: 'ks-date-time-range-picker',
  styleUrl: 'date-time-range-picker.scss',
  shadow: true,
})
export class KsDateTimeRangePicker {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popperRef;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsDateTimeRangePickerElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  dateTimeRangePanelRef: HTMLKsDateTimeRangePanelElement;
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
   * @locale {en} The currently selected date range values. This is an array of dates or timestamps representing the start and end of the selected range.
   * @locale {zh} 当前选中的日期范围值。这是一个日期或时间戳的数组，代表选中范围的开始和结束。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IMultipleDateValue;
  /**
   * @locale {en} The status of the date picker. This can be used to indicate the validation status of the date picker, such as 'success', 'warning', 'error', or 'default'.
   * @locale {zh} 日期选择器的状态。可用于指示日期选择器的验证状态，如“成功”、“警告”、“错误”或“默认”。
   */
  @Prop() status?: Status;
  /**
   * @locale {en} The format in which the selected date is displayed. This can be specified using a string format (e.g., "yyyy-MM-DD HH:mm:ss") to customize the date representation. Default: "MMMM d, yyyy HH:mm:ss".
   * @locale {zh} 显示所选日期的格式。可以使用字符串格式（例如 "yyyy-MM-DD HH:mm:ss"）来定制日期表示。默认："MMMM d, yyyy HH:mm:ss"。
   */
  @Prop() format = DEFAULT_FORMAT;
  /**
   * @locale {en} The width of the date picker input field. Default: 500.
   * @locale {zh} 日期选择器输入字段的宽度。默认：500。
   */
  @Prop() width = 500;
  /**
   * @locale {en} Placeholder text for the start date input field.
   * @locale {zh} 开始日期输入字段的占位符文本。
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() startPlaceholder: string;
  /**
   * @locale {en} Placeholder text for the end date input field.
   * @locale {zh} 结束日期输入字段的占位符文本。
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() endPlaceholder: string;
  /**
   * @locale {en} The position of the date picker dropdown relative to the input field. Can be one of the following values: `"bottom-start"`, `"bottom"` or `"bottom-end"`. Default: "bottom-start".
   * @locale {zh} 日期选择器下拉菜单相对于输入字段的位置。可选值为："bottom-start"、"bottom" 或 "bottom-end"。默认："bottom-start"。
   * */
  @Prop() placement: 'bottom-start' | 'bottom' | 'bottom-end' = 'bottom-start';
  /**
   * @locale {en} Determine whether the date picker is disabled. When set to `true`, users cannot interact with the date picker.
   * @locale {zh} 确定日期选择器是否禁用。设置为 `true` 时，用户无法与日期选择器进行交互。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean | [boolean, boolean];
  /**
   * @locale {en} Whether to show the clear icon. Default: true.
   * @locale {zh} 是否显示清除图标。默认：true。
   * */
  @Prop() clearable = true;
  /**
   * @locale {en} Whether to show the preset options. Default: false.
   * @locale {zh} 是否显示预设选项。默认：false。
   */
  @Prop() showPreset = false;
  /**
   * @locale {en} A function that determines which dates are disabled and cannot be selected. This function receives a date and a boolean `isStart` (true if selecting the start date) as arguments and should return `true` for dates that should be disabled.
   * @locale {zh} 一个函数，用于确定哪些日期被禁用并且不能被选中。该函数接收一个日期和一个布尔值 `isStart`（如果选择的是开始日期则为 true）作为参数，并应返回 `true` 表示该日期应该被禁用。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date, isStart: boolean) => boolean;

  /**
   * @locale {en} Determine whether the hour selection is displayed. Default: true.
   * @locale {zh} 确定是否显示小时选择。默认：true。
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
   * @locale {en} A function to disable specific hours. It receives the date, a boolean `isStart` (true if selecting for the start date/time), and the currently selected time string (HH:mm:ss) as arguments. Should return `true` if the hour should be disabled.
   * @locale {zh} 用于禁用特定小时的函数。它接收日期、一个布尔值 `isStart`（如果为开始日期/时间选择则为 true）和当前选中的时间字符串 (HH:mm:ss) 作为参数。如果该小时应被禁用，则返回 `true`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledHours: IDisabledTimeFn;

  /**
   * @locale {en} A function to disable specific minutes. It receives the date, a boolean `isStart` (true if selecting for the start date/time), and the currently selected time string (HH:mm:ss) as arguments. Should return `true` if the minute should be disabled.
   * @locale {zh} 用于禁用特定分钟的函数。它接收日期、一个布尔值 `isStart`（如果为开始日期/时间选择则为 true）和当前选中的时间字符串 (HH:mm:ss) 作为参数。如果该分钟应被禁用，则返回 `true`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledMinutes: IDisabledTimeFn;
  /**
   * @locale {en} A function to disable specific seconds. It receives the date, a boolean `isStart` (true if selecting for the start date/time), and the currently selected time string (HH:mm:ss) as arguments. Should return `true` if the second should be disabled.
   * @locale {zh} 用于禁用特定秒数的函数。它接收日期、一个布尔值 `isStart`（如果为开始日期/时间选择则为 true）和当前选中的时间字符串 (HH:mm:ss) 作为参数。如果该秒数应被禁用，则返回 `true`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledSeconds: IDisabledTimeFn;
  /**
   * @locale {en} A function to disable AM/PM selection. It receives the AM/PM string ('AM' or 'PM'), a boolean `isStart` (true if selecting for the start date/time), and the currently selected time string (HH:mm:ss) as arguments. Should return `true` if the selection should be disabled. This is relevant when `isHour12` is true.
   * @locale {zh} 用于禁用 AM/PM 选择的函数。它接收 AM/PM 字符串 ('AM' 或 'PM')、一个布尔值 `isStart`（如果为开始日期/时间选择则为 true）和当前选中的时间字符串 (HH:mm:ss) 作为参数。如果该选择应被禁用，则返回 `true`。当 `isHour12` 为 true 时相关。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledAm: IDisabledAmFn;

  /**
   * @locale {en} Display the time zone in the time picker or in the time picker panel. Default: 'picker'.
   * @locale {zh} 在时间选择器或时间选择器面板中显示时区。默认：'picker'。
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
   * @locale {en} Whether to show the footer in the picker panel. Default: false.
   * @locale {zh} 是否在选择器面板中显示页脚。默认：false。
   */
  @Prop() showFooter = false;

  /**
   * @locale {en} Custom event triggered when the selected date changes. It returns the new date value, allowing the parent component to react to the change.
   * @locale {zh} 当所选日期发生变化时触发的自定义事件。返回新的日期值，允许父组件对变化做出反应。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<IMultipleDateValue>;
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

  @Event({ bubbles: false, composed: false }) ksClear!: EventEmitter<void>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() dateTimeValue: string[];
  get locale() {
    return store.state.config.locale;
  }

  private valueTime = [DEFAULT_TIME, DEFAULT_TIME];

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() valueDate: Date[];

  @State() isStartTime = true;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private isHour12: boolean;

  @Watch('value')
  valueWatcher(value: IMultipleDateValue) {
    value ||= ['', ''];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const valueDate = [];
    if (typeof value[0] === 'string') {
      value.forEach?.((val, index) => {
        if (val === '') {
          if (this.dateTimeValue) {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.dateTimeValue[index] = undefined;
          }
          if (this.valueDate) {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.valueDate[index] = undefined;
          }
          this.valueTime[index] = DEFAULT_TIME;
          return;
        } else {
          valueDate[index] = dayjs(val).toDate();
          const hour = dayjs(val).hour();
          const minute = dayjs(val).minute();
          const second = dayjs(val).second();
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          const pad = (val) => String(val).padStart(2, '0');
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          this.valueDate = valueDate;
          this.valueTime[index] = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
        }
      });
    } else if (value[0] instanceof Date) {
      this.valueDate = value as Array<Date>;
      this.valueTime = value.map((val) => format(val, 'HH:mm:ss'));
    } else {
      this.valueDate = value.map((val) => new Date(val));
      this.valueTime = value.map((val) => format(new Date(val), 'HH:mm:ss'));
    }
    this.formatValueDisplay();
  }

  /**
   * @locale {en} Closes the date time range picker panel programmatically.
   * @locale {zh} 以编程方式关闭日期时间范围选择器面板。
   */
  @Method()
  async closePanel() {
    this.popperRef?.close();
  }

  /**
   * @locale {en} Opens the date time range picker panel programmatically.
   * @locale {zh} 以编程方式打开日期时间范围选择器面板。
   */
  @Method()
  async openPanel() {
    this.popperRef?.open();
  }

  get timeZoneToday() {
    const { timezoneOffset } = store.state.i18n;
    const today = new Date();
    const offset = (today.getTimezoneOffset() + timezoneOffset) * 60 * 1000;
    const localDate = new Date(today.getTime() + offset);
    return localDate;
  }

  setTodayRange() {
    const today = this.timeZoneToday;
    const valueDate = [today, today];
    this.valueTime = ['00:00:00', '23:59:59'];
    valueDate.forEach((item, index) => {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      valueDate[index] = parse(this.valueTime[index], 'HH:mm:ss', item);
    });
    this.dateTimeRangePanelRef.setActiveDate(today);
    this.valueDate = valueDate;
    this.formatValueDisplay();
    this.emitFormatedDate(valueDate);
  }

  formatValueDisplay() {
    if (!this.format || this.format === DEFAULT_FORMAT) {
      this.dateTimeValue =
        this.valueDate && this.valueDate.map((item) => (item ? getLocalizedDateTime(item, this.locale) : ''));
    } else {
      this.dateTimeValue = this.valueDate && this.valueDate.map((item) => (item ? format(item, this.format) : ''));
    }
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  formateDate(valueDate, valueTime) {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    valueDate = valueDate.map((item, index) => (item ? parse(valueTime[index], 'HH:mm:ss', item) : null));
    if (!this.startDisabled && !this.endDisabled) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      valueDate = valueDate.sort((a, b) => a?.getTime() - b?.getTime());
    }
    return valueDate;
  }

  componentWillLoad() {
    const date = getLocalizedDateTime(parse('23:00:00', 'HH:mm:ss', new Date()), this.locale);
    this.isHour12 = this.format && this.format !== DEFAULT_FORMAT ? this.format.includes('a') : /pm|am/i.test(date);
    if (this.value) {
      this.valueWatcher(this.value);
    }
  }

  handleValueChange(detail: string) {
    //TODO: 暂时不支持清空之外的事件
    if (!detail) {
      if (this.value === undefined) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.dateTimeValue = undefined;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.valueDate = [null, null];
        this.valueTime = [DEFAULT_TIME, DEFAULT_TIME];
      }
      this.ksChange.emit?.(['', '']);
      this.popperRef?.close?.();
    }
  }

  emitFormatedDate(valueDate: Date[]) {
    const value = valueDate.map((item) => (item ? format(item, this.format) : ''));
    if (valueDate.length === 2) {
      this.ksChange.emit(value);
    } else {
      this.ksChange.emit(value.concat(''));
    }
  }

  getFooterWidth() {
    const count =
      (this.showHour ? 0 : 1) + (this.showMinute ? 0 : 1) + (this.showSecond ? 0 : 1) + (this.isHour12 ? 0 : 1);
    return 536 - count * 65;
  }

  get startDisabled() {
    return Array.isArray(this.disabled) ? this.disabled[0] : this.disabled;
  }
  get endDisabled() {
    return Array.isArray(this.disabled) ? this.disabled[1] : this.disabled;
  }

  @State() isVisible = false;

  render() {
    return (
      <Host dir={dir()} ks-date-range-picker>
        <ks-picker-base
          exportparts="field: field"
          readonly
          timezone={this.timezone}
          longTimezone={this.isStartTime ? this.longTimezone : ''}
          isRange
          placeholder={t(datePickerMessages.placeholder)}
          startPlaceholder={this.startPlaceholder || t(datePickerMessages.start)}
          endPlaceholder={this.endPlaceholder || t(datePickerMessages.end)}
          disabled={this.disabled}
          status={this.status}
          width={this.width}
          clearable={this.clearable}
          value={this.dateTimeValue}
          placement={this.placement}
          contentWidth={this.getFooterWidth() + 'px'}
          onKsShow={({ detail }) => {
            this.ksVisibleChange.emit(true);
            this.isVisible = true;
            this.ksShow?.emit?.();
            if (detail === 1 && (this.startDisabled || this.dateTimeValue?.[0])) {
              this.isStartTime = false;
              this.valueDate?.[1] && this.dateTimeRangePanelRef.setActiveDate(this.valueDate[1]);
            } else if (!this.startDisabled) {
              this.isStartTime = true;
              this.valueDate?.[0] && this.dateTimeRangePanelRef.setActiveDate(this.valueDate[0]);
            }
            this.dateTimeRangePanelRef?.timePanelScrolltoTime();
          }}
          onKsHide={() => {
            this.ksVisibleChange.emit(false);
            this.isVisible = false;
            this.ksHide?.emit?.();
          }}
          onKsClear={() => {
            this.ksChange.emit(['', '']);
            this.ksClear.emit();
          }}
          onKsChange={({ detail }) => {
            this.handleValueChange(detail);
          }}
          popoverRef={(el) => (this.popperRef = el)}
          timeZoneDisplayPosition={this.timeZoneDisplayPosition}
          data-testid="range-date-time-range-picker-jM1Fne"
        >
          {this.prefixSlot && <slot slot="prefix" name="prefix"></slot>}
          {this.showIconSlot && <slot name="show-icon" slot="show-icon"></slot>}
          {this.suffixSlot && <slot name="suffix" slot="suffix"></slot>}
          {this.closeIconSlot && <slot name="close-icon" slot="close-icon"></slot>}
          <ks-date-time-range-panel
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            ref={(el) => (this.dateTimeRangePanelRef = el)}
            isStart={this.isStartTime}
            onKsDateChange={({ detail }) => {
              const valueDate = this.formateDate(detail, this.valueTime);
              if (this.value === undefined) {
                this.valueDate = valueDate;
                this.formatValueDisplay();
              }
              this.emitFormatedDate(valueDate);
            }}
            onKsTimeChange={(event) => {
              const valueTime = event.detail.map((item) => item || DEFAULT_TIME);
              const valueDate = this.valueDate && this.formateDate(this.valueDate, valueTime);
              if (this.value === undefined) {
                this.valueTime = valueTime;
                this.valueDate = valueDate;
                this.formatValueDisplay();
              }
              valueDate && this.emitFormatedDate(valueDate);
            }}
            value={this.valueDate}
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            disabledDate={this.isVisible ? this.disabledDate : NOOP}
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
            data-testid="range-date-time-range-picker-vV5RnX"
          ></ks-date-time-range-panel>
          <slot slot="footer" name="footer">
            <div
              class={`${prefix}__footer`}
              style={{
                justifyContent: this.isStartTime ? 'end' : 'space-between',
                width: this.isStartTime ? 'fit-content' : this.getFooterWidth() - 24 + 'px',
              }}
            >
              <div>
                {!this.isStartTime && (
                  <ks-button
                    size="sm"
                    onClick={() => {
                      this.isStartTime = true;
                    }}
                    disabled={this.startDisabled}
                    data-testid="range-date-time-range-picker-eUZLHj"
                  >
                    {t(commonMessages.back)}
                  </ks-button>
                )}
              </div>
              <div class={`${prefix}__footer__btns`}>
                <ks-button
                  size="sm"
                  onClick={() => {
                    this.setTodayRange();
                  }}
                  disabled={this.startDisabled || this.endDisabled}
                  data-testid="range-date-time-range-picker-8rkX9G"
                >
                  {i18nRelativeTime(0, 'days', this.locale)}
                </ks-button>
                <ks-button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    this.isStartTime && !this.endDisabled ? (this.isStartTime = false) : this.popperRef.close();
                  }}
                  data-testid="range-date-time-range-picker-1xBwYA"
                >
                  {this.isStartTime && !this.endDisabled ? t(commonMessages.next) : t(commonMessages.confirm)}
                </ks-button>
              </div>
            </div>
          </slot>
        </ks-picker-base>
      </Host>
    );
  }
}
