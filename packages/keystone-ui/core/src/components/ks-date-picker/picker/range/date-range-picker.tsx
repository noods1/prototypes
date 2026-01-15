import { Component, Element, h, Prop, Event, EventEmitter, Host, Method, State } from '@stencil/core';
import {
  format,
  toDate,
  sub,
  startOfWeek,
  add,
  Day,
  startOfMonth,
  endOfMonth,
  isSameDay,
  endOfWeek,
  startOfDay,
} from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, t } from '@src/utils/utils';
import { Status, IMultipleDateValue } from '../../../../entities';
import store from '@src/store';
import { getLocalizedDate } from '@src/components/ks-date-picker/utils';
import { getFirstDayOfWeek, i18nRelativeTime } from '@src/utils/i18n/date';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FormContextValueReconcile, getReconciledFormContextData } from '@src/utils/form/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { registerPluginManager } from '@src/utils/plugin';
import { logger } from '@src/utils/logger';
import { commonMessages, datePickerMessages } from '@fe-infra/keystone-locales';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';

const DEFAULT_FORMAT = 'MMMM d, yyyy';

const NOOP = () => false;

/**
 * @slot prefix - Slot for prefix content.
 * @slot suffix - Slot for suffix content.
 * @slot show-icon - Slot for the expand indicator icon.
 * @slot close-icon - Slot for the clear icon.
 * @slot preset - Slot for preset date range options.
 * @slot footer - Slot for footer content in the picker panel.
 */
@Component({
  tag: 'ks-date-range-picker',
  styleUrl: 'date-range-picker.scss',
  shadow: true,
})
export class KsDateRangePicker extends FormBaseComponent<IMultipleDateValue> {
  ['ks-name'] = 'ks-date-range-picker';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popperRef;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsDateRangePickerElement;
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
   * @locale {en} The currently selected date range value. This should be an array of two dates representing the start and end of the range.
   * @locale {zh} 当前选中的日期范围值。这应该是一个包含两个日期的数组，表示范围的开始和结束。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() @FormContextValueReconcile() value: IMultipleDateValue;
  /**
   * @locale {en} The status of the date range picker. This can be used to indicate validation status such as 'success', 'warning', 'error', or 'default'.
   * @locale {zh} 日期范围选择器的状态。可用于指示验证状态，如“成功”、“警告”、“错误”或“默认”。
   */
  @Prop() status?: Status;
  /**
   * @locale {en} The format in which the selected date range is displayed. This can be specified using a string format (e.g., "yyyy-MM-dd") to customize the date representation.
   * @locale {zh} 显示所选日期范围的格式。可以使用字符串格式（例如 "yyyy-MM-dd"）来定制日期表示。
   */
  @Prop() format = DEFAULT_FORMAT;
  /**
   * @locale {en} The width of the date range picker input field.
   * @locale {zh} 日期范围选择器输入字段的宽度。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() width: number;
  /**
   * @locale {en} Placeholder text displayed in the input field when no date range is selected. If not provided, a default placeholder indicating start and end date selection will be used.
   * @locale {zh} 当未选择日期范围时，在输入字段中显示的占位符文本。如果未提供，将使用指示选择开始和结束日期的默认占位符。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() placeholder: string;
  /**
   * @locale {en} The position of the date range picker dropdown relative to the input field. Default: "bottom-start".
   * @locale {zh} 日期范围选择器下拉菜单相对于输入字段的位置。可选值为："bottom-start"、"bottom" 或 "bottom-end"。默认："bottom-start"。
   */
  @Prop() placement: 'bottom-start' | 'bottom' | 'bottom-end' = 'bottom-start';
  /**
   * @locale {en} Determines whether the date range picker is disabled. When set to `true`, users cannot interact with the date range picker.
   * @locale {zh} 确定日期范围选择器是否禁用。设置为 `true` 时，用户无法与日期范围选择器进行交互。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /**
   * @locale {en} Determines whether the clear button is displayed. When set to `true`, users can clear the selected date range by clicking the clear button.
   * @locale {zh} 确定是否显示清除按钮。设置为 `true` 时，用户可以通过单击清除按钮来清除所选日期范围。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() clearable: boolean;
  /**
   * @locale {en} Determines whether to use the filled style for the date range picker. When set to `true`, the date range picker will have a filled background.
   * @locale {zh} 确定是否为日期范围选择器使用填充样式。设置为 `true` 时，日期范围选择器将具有填充背景。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() filled: boolean;

  /**
   * @locale {en} Determine whether to show the preset date ranges. When set to `true`, preset date range options will be displayed.
   * @locale {zh} 用于确定是否显示预设日期范围。设置为 `true` 时，将显示预设日期范围选项。
   */
  @Prop() showPreset = false;

  /**
   * @locale {en} A function that determines which dates are disabled and cannot be selected. This function receives a date and an optional `isStart` flag (true if selecting the start date of a range) as arguments and should return `true` for dates that should be disabled.
   * @locale {zh} 一个函数，用于确定哪些日期被禁用并且不能被选中。该函数接收一个日期和一个可选的 `isStart` 标志（如果正在选择范围的开始日期，则为 true）作为参数，并应返回 `true` 表示该日期应该被禁用。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date, isStart?: boolean, startDate?: Date) => boolean;

  /**
   * @locale {en} The timezone to use for the date range picker. This affects how dates are displayed and interpreted.
   * @locale {zh} 日期范围选择器使用的时区。这会影响日期的显示和解释方式。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() timezone: string;

  /**
   * @locale {en} Whether or not to show the timezone indicator.
   * @locale {zh} 是否显示时区指示器。
   */
  @Prop() hasTimezone = true;

  /**
   * @locale {en} Additional quick options for date range selection. Each option includes a label, date range [startDate, endDate], and position: top/bottom where it should be displayed.
   * @locale {zh} 额外的日期范围快速选择项。每个选项包含标签、日期范围和显示位置（顶部/底部）。
   */
  @Prop() extraQuickOptions: Array<{ label: string; dates: Array<Date | string>; position: 'top' | 'bottom' }> = [];

  /**
   * @private Expose this API TEMPORARILY for urgent use cases.
   * After refactor, `value` will always be a dayjs object, so this won't be useful anymore.
   * @deprecated This prop will be refactored soon. Only use it after contacted the Keystone team.
   * 这个属性很快就要被重构了。请只在联系过 Keystone 团队的情况下使用它。
   * @locale {en} Whether or not to show the timezone indicator.
   * @locale {zh} 是否显示时区指示器。
   */
  @Prop() valueFormatInChangeEvent?: string;

  /**
   * @locale {en} Override the default presets, e.g. `['L1M', 'L3W', 'L5D']` represents displaying options for the last 1 month, last 3 weeks, and last 5 days.
   * @locale {zh} 用于覆盖默认的 preset 组合，如 `['L1M', 'L3W', 'L5D']` 代表显示最近 1 个月、最近 3 周和最近 5 天的选项。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() overridePreset: `L${number}${'M' | 'W' | 'D'}`[];

  /**
   * @locale {en} Determine whether the time zone is displayed in the time picker or in the time picker panel.
   * @locale {zh} 决定时区信息是显示在选择器输入框中还是在时间选择面板中。
   */
  @Prop() timeZoneDisplayPosition: 'picker' | 'panel' = 'picker';

  /**
   * @locale {en} A longer, more descriptive timezone string that might include offset information (e.g., "America/New_York (EST)"). Primarily for display purposes.
   * @locale {zh} 更长、更具描述性的时区字符串，可能包含偏移信息（例如："America/New_York (EST)"）。主要用于显示目的。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() longTimezone: string;
  /**
   * @locale {en} Whether the date selection needs to be confirmed by clicking the "confirm" button.
   * @locale {zh} 决定日期选择是否要在点击“确认”按钮后才生效。
   */
  @Prop() needConfirm = false;

  /**
   * @locale {en} Custom event triggered when the selected date range changes. It returns the new date range value, allowing the parent component to react to the change.
   * @locale {zh} 当所选日期范围发生变化时触发的自定义事件。返回新的日期范围值，允许父组件对变化做出反应。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<IMultipleDateValue>;
  /**
   * @locale {en} Custom event triggered when the date range picker dropdown is shown. This event can be used to execute additional logic when the date range picker is displayed to the user.
   * @locale {zh} 当日期范围选择器下拉菜单显示时触发的自定义事件。可以用于在日期范围选择器向用户显示时执行额外的逻辑。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksShow: EventEmitter<void>;
  /**
   * @locale {en} Custom event triggered when the date range picker dropdown is hidden. This event can be used to execute additional logic when the date range picker is hidden from the user.
   * @locale {zh} 当日期范围选择器下拉菜单隐藏时触发的自定义事件。可以用于在日期范围选择器从用户界面中隐藏时执行额外的逻辑。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksHide: EventEmitter<void>;
  /**
   * @locale {en} Custom event triggered when the visibility of the date range picker dropdown changes. It provides the new visibility state, allowing for dynamic adjustments in the parent component.
   * @locale {zh} 当日期范围选择器下拉菜单的可见性发生变化时触发的自定义事件。提供新的可见性状态，允许父组件进行动态调整。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksVisibleChange: EventEmitter<boolean>;

  /**
   * @locale {en} Custom event emitted when clicking the clear button.
   * @locale {zh} 当点击清除按钮时触发的事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClear: EventEmitter<void>;

  get locale() {
    return store.state.config.locale;
  }

  private get valueDate() {
    if (typeof this.value === 'string') {
      throw Error('Invalid value, value must be Array');
    }

    return (this.value || [])
      .filter((item) => !!item)
      .map((date) => {
        if (typeof date === 'string') {
          return dayjs(date).toDate();
        }

        return date;
      });
  }

  private set valueDate(newValue) {
    this.value = newValue;
    if (this.value?.length === 2) {
      if (this.valueFormatInChangeEvent) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.ksChange.emit(this.valueDate.map((value) => format(value, this.valueFormatInChangeEvent)));
      } else {
        this.ksChange.emit(this.formattedDate);
      }
      !this.needConfirm && this.popperRef.close();
    }
  }

  @State() previewDate?: Date[];

  private get formattedDate() {
    return this.valueDate.map((value) => format(value, this.format));
  }

  handleValueChange(event: { detail: IMultipleDateValue }) {
    if (this.needConfirm) {
      this.cacheValue(event.detail);
    } else {
      this.valueDate = event.detail as Array<Date | number>;
    }
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  dateRangePanelRef: HTMLKsDateRangePanelElement;
  @Method()
  async resetActiveView() {
    this.dateRangePanelRef?.resetActiveView();
  }

  /**
   * @locale {en} Closes the date range picker panel programmatically.
   * @locale {zh} 以编程方式关闭日期范围选择器面板。
   */
  @Method()
  async closePanel() {
    this.popperRef?.close();
  }

  /**
   * @locale {en} Opens the date range picker panel programmatically.
   * @locale {zh} 以编程方式打开日期范围选择器面板。
   */
  @Method()
  async openPanel() {
    this.popperRef?.open();
  }

  constructor() {
    super();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  formatValueDisplay() {
    if (!this.valueDate) {
      return '';
    }
    return this.valueDate
      .map((date) => {
        if (!this.format || this.format === DEFAULT_FORMAT) {
          return getLocalizedDate(toDate(date), this.locale);
        }
        return format(date, this.format);
      })
      .join(' – ');
  }

  get timeZoneToday() {
    const { timezoneOffset } = store.state.i18n;
    const today = new Date();
    const offset = (today.getTimezoneOffset() + timezoneOffset) * 60 * 1000;
    const localDate = new Date(today.getTime() + offset);
    return startOfDay(localDate);
  }

  getLastNDaysPreset(days: number) {
    return [sub(this.timeZoneToday, { days }), days ? sub(this.timeZoneToday, { days: 1 }) : this.timeZoneToday];
  }
  getLastNWeeksPreset(weeks: number) {
    let startDayOfWeek = startOfWeek(this.timeZoneToday, { weekStartsOn: (getFirstDayOfWeek(this.locale) % 7) as Day });
    let endDayOfWeek: Date;
    if (weeks > 1) {
      startDayOfWeek = sub(startDayOfWeek, { weeks });
      endDayOfWeek = sub(endOfWeek(this.timeZoneToday), { weeks: 1 });
    } else if (weeks !== 0) {
      startDayOfWeek = sub(startDayOfWeek, { weeks });
      endDayOfWeek = add(startDayOfWeek, { days: 6 });
    } else {
      endDayOfWeek = this.timeZoneToday;
    }
    return [startDayOfWeek, endDayOfWeek];
  }
  getLastNMonthsPreset(months: number) {
    let startDayOfMonth = startOfMonth(this.timeZoneToday);
    let endDayOfMonth: Date;
    if (months > 1) {
      startDayOfMonth = sub(startDayOfMonth, { months });
      endDayOfMonth = sub(endOfMonth(this.timeZoneToday), { months: 1 });
    } else if (months !== 0) {
      startDayOfMonth = sub(startDayOfMonth, { months });
      endDayOfMonth = endOfMonth(startDayOfMonth);
    } else {
      endDayOfMonth = this.timeZoneToday;
    }
    return [startDayOfMonth, endDayOfMonth];
  }

  checkExtraQuickOptions(options = this.extraQuickOptions) {
    if (!Array.isArray(options)) return [];

    return options
      .map((option) => {
        if (!Array.isArray(option.dates) || option.dates.length !== 2) {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          logger.warn('Invalid quick option format:', option);
          return null;
        }

        try {
          // Convert dates
          const processedDates = option.dates.map((date) => {
            if (typeof date === 'string') {
              const parsedDate = dayjs(date).toDate();
              if (isNaN(parsedDate.getTime())) {
                throw new Error(`Invalid date string: ${date}`);
              }
              return parsedDate;
            }

            if (date instanceof Date) {
              if (isNaN(date.getTime())) {
                throw new Error('Invalid Date object');
              }
              return date;
            }

            throw new Error(`Unsupported date type: ${typeof date}`);
          });

          return {
            ...option,
            dates: processedDates,
          };
        } catch (error) {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          logger.error('Error processing quick option:', error.message, option);
          return null;
        }
      })
      .filter(Boolean); // Filter out invalid options
  }

  getQuickOptionPreset() {
    const extraOptions = this.checkExtraQuickOptions();
    let preset: { label: string; dates: Date[] }[];

    if (this.overridePreset) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      preset = this.overridePreset.map((item) => {
        if (item.endsWith('M')) {
          const months = parseInt(item.replace('L', ''));
          if (months <= 1) {
            return {
              label: i18nRelativeTime(-months, 'months', this.locale),
              dates: this.getLastNMonthsPreset(months),
            };
          } else {
            return {
              label: t(datePickerMessages.lastNMonths, { months }),
              dates: this.getLastNMonthsPreset(months),
            };
          }
        } else if (item.endsWith('W')) {
          const weeks = parseInt(item.replace('L', ''));
          return {
            label: i18nRelativeTime(-weeks, 'weeks', this.locale),
            dates: this.getLastNWeeksPreset(weeks),
          };
        } else if (item.endsWith('D')) {
          const days = parseInt(item.replace('L', ''));
          if (days <= 1) {
            return {
              label: i18nRelativeTime(-days, 'days', this.locale),
              dates: this.getLastNDaysPreset(days),
            };
          } else {
            return {
              label: t(datePickerMessages.lastNDays, { days }),
              dates: this.getLastNDaysPreset(days),
            };
          }
        }
      });
    } else {
      preset = [
        {
          label: i18nRelativeTime(0, 'days', this.locale),
          dates: this.getLastNDaysPreset(0),
        },
        {
          label: i18nRelativeTime(-1, 'days', this.locale),
          dates: this.getLastNDaysPreset(1),
        },
        {
          label: t(datePickerMessages.lastNDays, { days: 7 }),
          dates: this.getLastNDaysPreset(7),
        },
        {
          label: t(datePickerMessages.lastNDays, { days: 14 }),
          dates: this.getLastNDaysPreset(14),
        },
        {
          label: t(datePickerMessages.lastNDays, { days: 30 }),
          dates: this.getLastNDaysPreset(30),
        },
        {
          label: i18nRelativeTime(0, 'weeks', this.locale),
          dates: this.getLastNWeeksPreset(0),
        },
        {
          label: i18nRelativeTime(-1, 'weeks', this.locale),
          dates: this.getLastNWeeksPreset(1),
        },
        {
          label: i18nRelativeTime(0, 'months', this.locale),
          dates: this.getLastNMonthsPreset(0),
        },
        {
          label: i18nRelativeTime(-1, 'months', this.locale),
          dates: this.getLastNMonthsPreset(1),
        },
      ];
    }

    return [
      ...extraOptions.filter((e) => e?.position === 'top'),
      ...preset,
      ...extraOptions.filter((e) => e?.position === 'bottom'),
    ];
  }

  hasCachedValue = false;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  cachedValue: IMultipleDateValue;
  cacheValue(value: IMultipleDateValue) {
    this.hasCachedValue = true;
    this.cachedValue = this.value;
    this.value = value;
  }
  confirmValue = () => {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.cachedValue = null;
    this.hasCachedValue = false;
    this.valueDate = this.value as Array<Date | number>;
    this.popperRef.close();
  };
  cancelValue = () => {
    if (this.hasCachedValue) {
      this.value = this.cachedValue;
      this.hasCachedValue = false;
    }
    this.popperRef.close();
  };

  @State() isVisible = false;

  render() {
    const { disabled, status } = getReconciledFormContextData(this);
    return (
      <Host dir={dir()} ks-date-range-picker>
        <ks-picker-base
          exportparts="field: field"
          timezone={this.timezone}
          hasTimezone={this.hasTimezone}
          timeZoneDisplayPosition={this.timeZoneDisplayPosition}
          readonly
          placeholder={this.placeholder || `${t(datePickerMessages.start)} – ${t(datePickerMessages.end)}`}
          startPlaceholder={t(datePickerMessages.start)}
          endPlaceholder={t(datePickerMessages.end)}
          disabled={disabled}
          status={status}
          width={this.width}
          clearable={this.clearable}
          value={this.formatValueDisplay()}
          placement={this.placement}
          longTimezone={this.longTimezone}
          showLongTimeZone={this.needConfirm}
          onKsShow={() => {
            this.ksVisibleChange.emit(true);
            this.ksShow?.emit?.();
            this.isVisible = true;
            this.resetActiveView();
          }}
          onKsHide={() => {
            this.ksVisibleChange.emit(false);
            this.isVisible = false;
            this.ksHide?.emit?.();
          }}
          onKsClear={() => {
            this.ksClear.emit();
            this.ksChange.emit(['', '']);
          }}
          popoverRef={(el) => (this.popperRef = el)}
          data-testid="range-date-range-picker-axGby2"
        >
          {this.prefixSlot && <slot slot="prefix" name="prefix"></slot>}
          {this.showIconSlot && <slot name="show-icon" slot="show-icon"></slot>}
          {this.suffixSlot && <slot name="suffix" slot="suffix"></slot>}
          {this.closeIconSlot && <slot name="close-icon" slot="close-icon"></slot>}
          <ks-date-range-panel
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            ref={(el) => (this.dateRangePanelRef = el)}
            onKsChange={this.handleValueChange.bind(this)}
            value={this.previewDate ?? this.valueDate}
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            disabledDate={this.isVisible ? this.disabledDate : NOOP}
            data-testid="range-date-range-picker-ecpvx2"
          >
            {(this.presetSlot || this.showPreset) && (
              <div slot="preset" class="preset-container">
                <slot name="preset">
                  {this.getQuickOptionPreset().map((option) => {
                    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                    const [startDay, endDay] = option.dates;
                    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                    const selected = isSameDay(startDay, this.valueDate[0]) && isSameDay(endDay, this.valueDate[1]);
                    const disabled =
                      this.isVisible &&
                      Boolean(
                        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                        this.disabledDate?.(startDay, true, startDay) || this.disabledDate?.(endDay, false, startDay),
                      );

                    return (
                      <div
                        class={classNames(
                          'quickOption',
                          selected && 'quickOption--selected',
                          disabled && 'quickOption--disabled',
                        )}
                        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                        onPointerEnter={() => !disabled && (this.previewDate = [startDay, endDay])}
                        onPointerLeave={() => (this.previewDate = undefined)}
                        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                        onClick={() => !disabled && this.handleValueChange({ detail: [startDay, endDay] })}
                        data-testid="range-date-range-picker-cMzMM4"
                      >
                        {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
                        {option.label}
                      </div>
                    );
                  })}
                </slot>
              </div>
            )}
          </ks-date-range-panel>
          <slot slot="footer" name="footer">
            {this.needConfirm && (
              <div class={`footer`}>
                <ks-button size="sm" onClick={this.cancelValue} data-testid="range-date-range-picker-7NehV7">
                  {t(commonMessages.cancel)}
                </ks-button>
                <ks-button
                  variant="primary"
                  size="sm"
                  onClick={this.confirmValue}
                  data-testid="range-date-range-picker-whjtJA"
                >
                  {t(commonMessages.confirm)}
                </ks-button>
              </div>
            )}
          </slot>
        </ks-picker-base>
      </Host>
    );
  }
}
