import { Component, Element, h, Prop, Event, EventEmitter, Host, Method, State } from '@stencil/core';
import { format, parse } from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { Status, IMultipleDateValue } from '../../../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

const NOOP = () => false;
/**
 * @slot suffix - Slot for suffix content.
 * @slot show-icon - Slot for the expand indicator icon.
 * @slot close-icon - Slot for the clear icon.
 * @slot preset - Slot for preset week options.
 */
@Component({
  tag: 'ks-multiple-week-picker',
  styleUrl: 'week-picker.scss',
  shadow: true,
})
export abstract class KsMultipleWeekPickerComponent {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popperRef;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsMultipleWeekPickerElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'show-icon' }) showIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'close-icon' }) closeIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;

  /**
   * @locale {en} The currently selected week values. This is an array of dates or timestamps representing the start of each selected week.
   * @locale {zh} 当前选中的周值。这是一个日期或时间戳的数组，代表每个选中周的开始。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IMultipleDateValue;
  /**
   * @locale {en} The format for displaying and parsing the selected weeks. Uses 'YYYY' for week-numbering year and 'ww' for week of year (e.g., "2023-52").
   * @locale {zh} 展示和解析选中周的格式。使用 'YYYY' 表示周年份，'ww' 表示年周数（例如："2023-52"）。
   */
  @Prop() format = 'YYYY-ww';
  /**
   * @locale {en} A function to disable specific dates/weeks. It receives a date object and should return true if the week containing that date should be disabled.
   * @locale {zh} 用于禁用特定日期/周的函数。它接收一个日期对象，如果包含该日期的周应被禁用，则返回 true。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date) => boolean;

  /**
   * @locale {en} The width of the selection box.
   * @locale {zh} 选择框的宽度。
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() width: number;
  /**
   * @locale {en} Placeholder text for the selection box. Default: "Please select date".
   * @locale {zh} 选择框默认文字。默认：“请选择日期”。
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() placeholder: string;
  /**
   * @locale {en} Position of the popover. Default: "bottom-start".
   * @locale {zh} 弹出框位置。默认：“bottom-start”。
   * */
  @Prop() placement: 'bottom-start' | 'bottom' | 'bottom-end' = 'bottom-start';
  /**
   * @locale {en} Whether the picker is disabled.
   * @locale {zh} 是否禁用。
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /**
   * @locale {en} Whether the selected value can be cleared.
   * @locale {zh} 是否可以清除。
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() clearable: boolean;
  /**
   * @locale {en} Whether to use the filled style.
   * @locale {zh} 是否使用面性风格。
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() filled: boolean;
  /**
   * @locale {en} The status of the picker (e.g., error, warning).
   * @locale {zh} 选择器的状态（例如，错误、警告）。
   */
  @Prop() status?: Status;
  /**
   * @locale {en} Event emitted when the selected week(s) change.
   * @locale {zh} 当选中的周发生变化时触发的事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<IMultipleDateValue>;
  /**
   * @locale {en} Event emitted when the picker panel is shown.
   * @locale {zh} 当选择器面板显示时触发的事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksShow: EventEmitter<void>;
  /**
   * @locale {en} Event emitted when the picker panel is hidden.
   * @locale {zh} 当选择器面板隐藏时触发的事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksHide: EventEmitter<void>;
  /**
   * @locale {en} Event emitted when the visibility of the picker panel changes.
   * @locale {zh} 当选择器面板的可见性发生变化时触发的事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksVisibleChange: EventEmitter<boolean>;

  private get valueDate() {
    if (this.value && !Array.isArray(this.value)) {
      throw Error('Invalid value, value must be Array');
    }

    return (this.value || [])
      .filter((item) => !!item)
      .map((date) => {
        if (typeof date === 'string') {
          return parse(date, this.format, new Date(), { useAdditionalWeekYearTokens: true });
        }

        return date;
      });
  }

  private set valueDate(newValue) {
    this.value = newValue;
    this.ksChange.emit(this.formattedDate);
  }

  private get formattedDate() {
    return this.valueDate.map((value) => format(value, this.format, { useAdditionalWeekYearTokens: true }));
  }

  handleValueChange(event: { detail: IMultipleDateValue }) {
    this.valueDate = event.detail as Array<Date | number>;
  }

  /**
   * @locale {en} Closes the picker panel.
   * @locale {zh} 关闭选择器面板。
   */
  @Method()
  async closePanel() {
    this.popperRef?.close();
  }

  /**
   * @locale {en} Opens the picker panel.
   * @locale {zh} 打开选择器面板。
   */
  @Method()
  async openPanel() {
    this.popperRef?.open();
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  @State() isVisible = false;

  render() {
    return (
      <Host dir={dir()} ks-multiple-week-picker>
        <ks-multiple-picker-base
          disabled={this.disabled}
          placeholder={this.placeholder}
          clearable={this.clearable}
          width={this.width}
          status={this.status}
          value={this.formattedDate}
          placement={this.placement}
          onKsShow={() => {
            this.ksVisibleChange.emit(true);
            this.isVisible = true;
            this.ksShow?.emit?.();
          }}
          onKsHide={() => {
            this.ksVisibleChange.emit(false);
            this.isVisible = false;
            this.ksHide?.emit?.();
          }}
          onKsChange={(value) => {
            this.handleValueChange(value);
          }}
          popoverRef={(el) => (this.popperRef = el)}
          data-testid="week-multiple-week-picker-fhxB28"
        >
          {this.showIconSlot && <slot name="show-icon" slot="show-icon"></slot>}
          {this.suffixSlot && <slot name="suffix" slot="suffix"></slot>}
          {this.closeIconSlot && <slot name="close-icon" slot="close-icon"></slot>}
          <ks-multiple-week-panel
            disabledDate={this.disabled ? () => true : this.isVisible ? this.disabledDate : NOOP}
            onKsChange={this.handleValueChange.bind(this)}
            value={this.valueDate}
            data-testid="week-multiple-week-picker-46ubBq"
          >
            {this.presetSlot && (
              <div slot="preset">
                <slot name="preset"></slot>
              </div>
            )}
          </ks-multiple-week-panel>
        </ks-multiple-picker-base>
      </Host>
    );
  }
}
