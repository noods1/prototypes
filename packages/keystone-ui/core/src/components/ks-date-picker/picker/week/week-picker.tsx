import { Component, Element, h, Prop, Event, EventEmitter, Host, Method, State } from '@stencil/core';
import { format, parse } from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { Status, IDateValue } from '../../../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

// const prefix = 'ks-week-picker';

const NOOP = () => false;

/**
 * @slot prefix - Slot for prefix content.
 * @slot suffix - Slot for suffix content.
 * @slot show-icon - Slot for the expand indicator icon.
 * @slot close-icon - Slot for the clear icon.
 * @slot preset - Slot for preset week options.
 */
@Component({
  tag: 'ks-week-picker',
  styleUrl: 'week-picker.scss',
  shadow: true,
})
export abstract class KsWeekPickerComponent {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popperRef;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsWeekPickerElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;

  /**
   * @locale {en} Custom prefix icon.
   * @locale {zh} 自定义前缀图标。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'prefix' }) prefixSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'show-icon' }) showIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'close-icon' }) closeIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;

  /**
   * @locale {en} The currently selected week value. Represents the start date of the selected week.
   * @locale {zh} 当前选中的周值。代表选中周的开始日期。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IDateValue;
  /**
   * @locale {en} The format for displaying and parsing the selected week. Uses 'YYYY' for week-numbering year and 'ww' for week of year (e.g., "2023-52").
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
   * @locale {en} Event emitted when the selected week changes.
   * @locale {zh} 当选中的周发生变化时触发的事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<IDateValue>;
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
    if (typeof this.value === 'string') {
      return parse(this.value, this.format, new Date(), { useAdditionalWeekYearTokens: true });
    }
    return this.value;
  }

  private set valueDate(newValue) {
    this.value = newValue;
    this.ksChange.emit?.(
      this.valueDate ? format(this.valueDate, this.format, { useAdditionalWeekYearTokens: true }) : this.valueDate,
    );
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

  handleValueChange(event: { detail: string | number | Date }) {
    this.valueDate = event.detail as number;
    this.popperRef?.close?.();
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  @State() isVisible = false;

  render() {
    return (
      <Host dir={dir()} ks-week-picker>
        <ks-picker-base
          exportparts="field: field"
          disabled={this.disabled}
          clearable={this.clearable}
          placeholder={this.placeholder}
          width={this.width}
          value={this.valueDate ? format(this.valueDate, this.format, { useAdditionalWeekYearTokens: true }) : ''}
          placement={this.placement}
          onKsShow={() => {
            this.ksVisibleChange.emit(true);
            this.isVisible = true;
            this.ksShow?.emit?.();
          }}
          status={this.status}
          onKsHide={() => {
            this.ksVisibleChange.emit(false);
            this.isVisible = false;
            this.ksHide?.emit?.();
          }}
          popoverRef={(el) => (this.popperRef = el)}
          data-testid="week-week-picker-dNrohY"
        >
          {this.showIconSlot && <slot name="show-icon" slot="show-icon"></slot>}
          {this.suffixSlot && <slot name="suffix" slot="suffix"></slot>}
          {this.closeIconSlot && <slot name="close-icon" slot="close-icon"></slot>}
          {this.prefixSlot && <slot slot="prefix" name="prefix"></slot>}
          <ks-week-panel
            disabledDate={this.isVisible ? this.disabledDate : NOOP}
            onKsChange={this.handleValueChange.bind(this)}
            value={this.valueDate}
            data-testid="week-week-picker-2SzycQ"
          >
            {this.presetSlot && (
              <div slot="preset">
                <slot name="preset"></slot>
              </div>
            )}
          </ks-week-panel>
        </ks-picker-base>
      </Host>
    );
  }
}
