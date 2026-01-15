import { Component, Element, h, Prop, Event, EventEmitter, Host, Method, State } from '@stencil/core';
import { format } from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { Status, IDateValue } from '../../../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

const NOOP = () => false;

// const prefix = 'ks-year-picker';

/**
 * @slot prefix - Slot for prefix content.
 * @slot suffix - Slot for suffix content.
 * @slot show-icon - Slot for the expand indicator icon.
 * @slot close-icon - Slot for the clear icon.
 * @slot preset - Slot for preset year options.
 */
@Component({
  tag: 'ks-year-picker',
  styleUrl: 'year-picker.scss',
  shadow: true,
})
export abstract class KsYearPickerComponent {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popperRef;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsYearPickerElement;
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
   * @locale {en} The format for displaying the selected year.
   * @locale {zh} 展示选中年份的格式。
   */
  @Prop() format = 'yyyy';
  /**
   * @locale {en} A function to disable specific years. It receives a date object (representing the first day of a year) and should return true if the year should be disabled.
   * @locale {zh} 用于禁用特定年份的函数。它接收一个日期对象（代表某年的第一天），如果该年份应被禁用，则返回 true。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date) => boolean;

  /**
   * @locale {en} The currently selected year value. Represents the start date of the selected year.
   * @locale {zh} 当前选中的年份值。代表选中年份的开始日期。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IDateValue;
  /**
   * @locale {en} Whether to use the filled style.
   * @locale {zh} 是否使用面性风格。
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() filled: boolean;
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
   * @locale {en} The status of the picker (e.g., error, warning).
   * @locale {zh} 选择器的状态（例如，错误、警告）。
   */
  @Prop() status?: Status;
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
   * @locale {en} Event emitted when the selected year changes.
   * @locale {zh} 当选中的年份发生变化时触发的事件。
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
      return new Date(this.value);
    }

    return this.value;
  }

  private set valueDate(newValue) {
    this.value = newValue;
    this.ksChange.emit?.(this.valueDate ? format(this.valueDate, this.format) : this.valueDate);
  }

  handleValueChange(event: { detail: string | number | Date }) {
    this.valueDate = event.detail as number;
    this.popperRef?.close?.();
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
      <Host dir={dir()} ks-year-picker>
        <ks-picker-base
          exportparts="field: field"
          clearable={this.clearable}
          width={this.width}
          disabled={this.disabled}
          status={this.status}
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
          placeholder={this.placeholder}
          value={this.valueDate ? format(this.valueDate, this.format) : ''}
          placement={this.placement}
          popoverRef={(el) => (this.popperRef = el)}
          data-testid="year-year-picker-oi2Nmh"
        >
          {this.prefixSlot && <slot slot="prefix" name="prefix"></slot>}
          {this.showIconSlot && <slot name="show-icon" slot="show-icon"></slot>}
          {this.suffixSlot && <slot name="suffix" slot="suffix"></slot>}
          {this.closeIconSlot && <slot name="close-icon" slot="close-icon"></slot>}
          <ks-year-panel
            disabledDate={this.isVisible ? this.disabledDate : NOOP}
            onKsChange={this.handleValueChange.bind(this)}
            value={this.valueDate}
            data-testid="year-year-picker-vWRqHU"
          >
            {this.presetSlot && <slot slot="preset" name="preset"></slot>}
          </ks-year-panel>
        </ks-picker-base>
      </Host>
    );
  }
}
