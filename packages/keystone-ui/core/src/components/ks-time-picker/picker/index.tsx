import { Component, h, Prop, Element, Event, EventEmitter, State, Host, Watch, forceUpdate } from '@stencil/core';
import { parse, format } from 'date-fns';
import { dir, t } from '@src/utils/utils';
import { Slot, Slots } from '@src/utils/decorators';
import { getLocalizedDateTime } from '@src/components/ks-date-picker/utils';
import { Status, InputSize, IDisabledTimeFn, IDisabledAmFn } from '../../../entities';
import classNames from 'classnames';
import store from '@src/store';
import { getReconciledFormContextData } from '@src/utils/form/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { commonMessages, timePickerMessages } from '@fe-infra/keystone-locales';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';

const NOOP = () => false;

const prefix = 'ks-time-picker';
const DEFAULT_FORMAT = 'HH:mm:ss';
/**
 * @slot prefix - Slot for custom prefix content.
 * @slot suffix - Slot for custom suffix content.
 * @slot show-icon - Slot for the expand indicator icon.
 * @slot close-icon - Slot for the clear icon.
 * @slot preset - Slot for preset time options, displayed in the picker panel.
 */
@Component({
  tag: 'ks-time-picker',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsTimePicker extends FormBaseComponent<string[] | string> {
  ['ks-name'] = 'ks-time-picker';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsTimePickerElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  timePanelEl: HTMLKsTimePanelElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popoverRef;

  /**
   * @locale {en} Custom prefix icon/content.
   * @locale {zh} 自定义前缀图标/内容。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'prefix' }) prefixSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'show-icon' }) showIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'close-icon' }) closeIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;

  /**
   * @locale {en} The selected time value. It should be a string, or an array of strings if `isRange` is true.
   * @locale {zh} 选定的时间值。如果 `isRange` 为 true，则应为字符串数组。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: string | string[];
  /**
   * @locale {en} The default time value, used when the component is initialized.
   * @locale {zh} 默认时间值，用于组件初始化时。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() defaultValue: string | string[];
  /**
   * @locale {en} Placement of the time picker popup relative to the input box. Can be one of the following values: `bottom-start`, `bottom`, `bottom-end`.
   * @locale {zh} 时间选择框相对于输入框的弹出位置。可以是以下值之一：`bottom-start`、`bottom`、`bottom-end`。
   */
  @Prop() placement: 'bottom-start' | 'bottom' | 'bottom-end' = 'bottom-start';
  /**
   * @locale {en} The format in which the time will be displayed and parsed (e.g., "HH:mm:ss").
   * @locale {zh} 显示和解析时间的格式（例如："HH:mm:ss"）。
   */
  @Prop() format = DEFAULT_FORMAT;
  /**
   * @locale {en} Step interval for hours. Determines the increment of the hour selection.
   * @locale {zh} 小时步长，决定小时选择的增量。
   */
  @Prop() hourStep = 1;
  /**
   * @locale {en} Step interval for minutes. Determines the increment of the minute selection.
   * @locale {zh} 分钟步长，决定分钟选择的增量。
   */
  @Prop() minuteStep = 1;
  /**
   * @locale {en} Step interval for seconds. Determines the increment of the second selection.
   * @locale {zh} 秒钟步长，决定秒钟选择的增量。
   */
  @Prop() secondStep = 1;
  /**
   * @locale {en} Whether the time picker is disabled.
   * @locale {zh} 是否禁用时间选择框。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /**
   * @locale {en} Whether the time picker allows selecting a range of time.
   * @locale {zh} 是否允许选择时间范围。
   */
  @Prop() isRange = false;
  /**
   * @locale {en} A function that disables specific hours from being selected.
   * @locale {zh} 禁用某些小时选择的函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledHours: IDisabledTimeFn;
  /**
   * @locale {en} A function that disables specific minutes from being selected.
   * @locale {zh} 禁用某些分钟选择的函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledMinutes: IDisabledTimeFn;
  /**
   * @locale {en} A function that disables specific seconds from being selected.
   * @locale {zh} 禁用某些秒钟选择的函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledSeconds: IDisabledTimeFn;
  /**
   * @locale {en} A function that disables specific AM/PM options from being selected. This is only applicable when using a 12-hour format.
   * @locale {zh} 禁用特定 AM/PM 选项选择的函数。仅在采用 12 小时制时适用。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledAm: IDisabledAmFn;
  /**
   * @locale {en} Placeholder text displayed in the input field.
   * @locale {zh} 输入框中显示的占位符文本。
   */
  @Prop() placeholder = '';
  /**
   * @locale {en} Determines where the time zone information is displayed, either in the picker input or in the panel.
   * @locale {zh} 决定时区信息的显示位置，可以在选择器输入框中或面板中显示。
   */
  @Prop() timeZoneDisplayPosition: 'picker' | 'panel' = 'picker';
  /**
   * @locale {en} Whether or not to show the timezone indicator.
   * @locale {zh} 是否显示时区指示器。
   */
  @Prop() hasTimezone = true;

  /**
   * @locale {en} Custom event emitted when the selected time value changes.
   * @locale {zh} 选定的时间值发生变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<string | string[]>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() dateValue: Date | Date[];

  @State() cur = -1;

  /**
   * @locale {en} Size of the time picker input field. Can be `"sm"` or `"md"`.
   * @locale {zh} 时间选择框输入框的尺寸。可以是 `"sm"` 或 `"md"`。
   */
  @Prop() size: InputSize = 'md';
  /**
   * @locale {en} A function that disables specific dates from being selected.
   * @locale {zh} 禁用某些日期选择的函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date) => boolean;
  /**
   * @locale {en} Whether the clear button is displayed to allow clearing the selected time.
   * @locale {zh} 是否显示清除按钮，以便清除选定的时间。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() clearable: boolean;
  /**
   * @locale {en} The status of the time picker, which indicates different validation or UI states. Can be one of the following values: `"default"`, `"success"`, `"warning"`, `"error"`.
   * @locale {zh} 时间选择框的状态，指示不同的验证或 UI 状态。可以是以下值之一：`"default"`、`"success"`、`"warning"`、`"error"`。
   */
  @Prop() status?: Status;
  /**
   * @locale {en} Timezone hint for the Timepicker. In TTAM, there is no need to set it manually; it will automatically read the account time zone.
   * @locale {zh} 时间选择器的时区提示。在 TTAM 上不需要手动设置，会自动读取账户时区。
   */
  @Prop() timeZone?: string;
  /**
   * @locale {en} The width of the time picker input field.
   * @locale {zh} 时间选择框输入框的宽度。
   */
  @Prop() width = 240;
  /**
   * @locale {en} Determines whether the hour selection is displayed in the time panel.
   * @locale {zh} 决定是否在时间面板中显示小时选择。
   */
  @Prop() showHour = true;
  /**
   * @locale {en} Determines whether the minute selection is displayed in the time panel.
   * @locale {zh} 决定是否在时间面板中显示分钟选择。
   */
  @Prop() showMinute = true;
  /**
   * @locale {en} Determines whether the second selection is displayed in the time panel.
   * @locale {zh} 决定是否在时间面板中显示秒选择。
   */
  @Prop() showSecond = false;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() popoverVisible: boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() panelValue: string;

  get locale() {
    return store.state.config.locale;
  }

  get timeFormatter() {
    return new Intl.DateTimeFormat(this.locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      calendar: 'gregory',
    });
  }

  @Watch('isRange')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  handleIsRangeChange(newValue) {
    if (newValue) {
      this.dateValue = [];
      forceUpdate(this.el);
    } else {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.dateValue = undefined;
    }
    this.panelValue = '';
  }
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private isHour12: boolean;
  componentWillLoad() {
    const date = getLocalizedDateTime(parse('23:00:00', 'HH:mm:ss', new Date()), this.locale);
    this.isHour12 = this.format && this.format !== DEFAULT_FORMAT ? this.format.includes('a') : /pm|am/i.test(date);
    if (this.value === undefined) {
      if (Array.isArray(this.defaultValue)) {
        this.dateValue = this.defaultValue.map((v) => parse(v, this.format, new Date()));
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.panelValue = this.defaultValue[0];
      } else {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.dateValue = this.defaultValue ? parse(this.defaultValue, this.format, new Date()) : null;
        this.panelValue = this.defaultValue;
      }
    } else {
      if (Array.isArray(this.value)) {
        this.dateValue = this.value.map((v) => parse(v, this.format, new Date()));
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.panelValue = this.value[0];
      } else {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.dateValue = this.value ? parse(this.value, this.format, new Date()) : null;
        this.panelValue = this.value;
      }
    }
  }

  @Watch('value')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  handleValueChange(value) {
    if (value) {
      if (Array.isArray(value)) {
        this.dateValue = value.map((v) => parse(v, this.format, new Date()));
      } else {
        this.dateValue = parse(value, this.format, new Date());
      }
    } else {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.dateValue = null;
    }

    this.updatePanelValue();
  }

  private updatePanelValue() {
    this.panelValue = this.dateValue
      ? this.isRange
        ? ((this.dateValue as Date[])[this.cur] && format((this.dateValue as Date[])[this.cur]!, this.format)) || ''
        : format(this.dateValue as Date, this.format)
      : '';
  }

  timeValueChange(value: string) {
    let dateValue,
      panelValue = '';
    if (this.isRange && value) {
      const preValue = this.value
        ? this.value
        : this.dateValue
          ? (this.dateValue as Date[]).map((v) => format(v, this.format))
          : [];
      const newValue = [...preValue];
      newValue[this.cur] = value;
      dateValue = newValue.map((v) => parse(v, this.format, new Date()));
      panelValue = value;
      this.ksChange?.emit(newValue);
    } else {
      this.ksChange?.emit(value);
      panelValue = value ? value : '';
      dateValue = value ? parse(value, this.format, new Date()) : null;
    }
    if (this.value === undefined) {
      this.panelValue = panelValue;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.dateValue = dateValue;
    }
  }

  @State() isVisible = false;

  render() {
    const { disabled, status } = getReconciledFormContextData(this);
    const inputWidth = Math.max(
      65,
      (this.format.toLocaleLowerCase().includes('a') ? 22 : 0) + 24 * this.format.split(':').length,
    );
    return (
      <Host dir={dir()} ks-time-picker>
        <ks-picker-base
          exportparts="field: field"
          timeZoneDisplayPosition={this.timeZoneDisplayPosition}
          width={this.width}
          placeholder={this.placeholder || t(timePickerMessages.placeholder)}
          startPlaceholder={t(timePickerMessages.startPlaceholder)}
          endPlaceholder={t(timePickerMessages.endPlaceholder)}
          status={status}
          isRange={this.isRange}
          format={this.format}
          hasTimezone={this.hasTimezone}
          inputWidth={inputWidth}
          size={this.size}
          onKsShow={(event) => {
            const { detail } = event;
            this.isVisible = true;
            this.updatePanelValue();
            this.cur = detail;
            this.popoverVisible = true;
            this.timePanelEl?.gotoTime();
          }}
          onKsHide={() => {
            this.isVisible = false;
            this.popoverVisible = false;
          }}
          onKsChange={({ detail }) => {
            this.timeValueChange(detail);
          }}
          clearable={this.clearable}
          disabled={disabled}
          value={
            this.dateValue
              ? Array.isArray(this.dateValue)
                ? this.dateValue.map((item) =>
                    this.format !== DEFAULT_FORMAT ? format(item, this.format) : this.timeFormatter.format(item),
                  )
                : this.format !== DEFAULT_FORMAT
                  ? format(this.dateValue, this.format)
                  : this.timeFormatter.format(this.dateValue)
              : ''
          }
          placement={this.placement}
          popoverRef={(el) => (this.popoverRef = el)}
          innerInputMinWidth={0}
          data-testid="picker-index-k258b4"
        >
          {this.showIconSlot && <slot name="show-icon" slot="show-icon"></slot>}
          <div
            slot="show-icon"
            part="show-icon"
            class={classNames(`${prefix}__icon`, { [`${prefix}__icon--disabled`]: disabled })}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <circle
                  cx="8.00015"
                  cy="8.00015"
                  r="6.50229"
                  transform="rotate(-180 8.00015 8.00015)"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />

                <path
                  d="M8 4.00342V8.00342L10 10.0034"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </div>
          {this.closeIconSlot && <slot name="close-icon" slot="close-icon"></slot>}
          {this.prefixSlot && <slot slot="prefix" name="prefix"></slot>}
          {this.popoverVisible && (
            <ks-time-panel
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              ref={(el) => (this.timePanelEl = el)}
              cur={this.cur}
              isStart={this.cur === 0}
              disabledHours={this.isVisible ? this.disabledHours : NOOP}
              disabledMinutes={this.isVisible ? this.disabledMinutes : NOOP}
              disabledSeconds={this.isVisible ? this.disabledSeconds : NOOP}
              format={this.format}
              showHour={this.showHour && this.format.toLocaleLowerCase().includes('h')}
              showMinute={this.showMinute && this.format.toLocaleLowerCase().includes('m')}
              showSecond={this.showHour && this.format.toLocaleLowerCase().includes('s')}
              hourStep={this.hourStep}
              minuteStep={this.minuteStep}
              secondStep={this.secondStep}
              isHour12={this.isHour12}
              onKsChange={(event) => {
                const { detail } = event;
                this.timeValueChange(detail);
              }}
              value={this.panelValue}
              data-testid="picker-index-6mxqZE"
            ></ks-time-panel>
          )}

          {this.popoverVisible && (
            <ks-button
              slot="footer"
              variant="primary"
              size="sm"
              onClick={() => {
                // this.timePanelEl?.dispatchValueChange.call(this.timePanelEl, ...args)
                if (this.cur === 0 && this.isRange) {
                  this.cur = 1;
                  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                  this.panelValue = this.dateValue[1] ? format(this.dateValue[1], this.format) : undefined;
                } else {
                  this.popoverVisible = false;
                }
              }}
              data-testid="picker-index-eaKfdx"
            >
              {t(commonMessages.confirm)}
            </ks-button>
          )}
        </ks-picker-base>
      </Host>
    );
  }
}
