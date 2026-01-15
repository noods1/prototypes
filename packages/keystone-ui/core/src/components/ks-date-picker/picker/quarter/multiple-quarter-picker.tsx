import { Component, Element, EventEmitter, Event, h, Prop, Host, Method, State } from '@stencil/core';
import { format, parse } from 'date-fns';
import { dir } from '@src/utils/utils';
import { Status, IMultipleDateValue } from '../../../../entities';
import { Slot, Slots } from '@src/utils/decorators';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { registerPluginManager } from '@src/utils/plugin';

const NOOP = () => false;
/**
 * @slot suffix - 后缀
 * @slot show-icon - 展开指示icon
 * @slot close-icon - 清除icon
 * @slot preset - preset slot
 */
@Component({
  tag: 'ks-multiple-quarter-picker',
  styleUrl: 'quarter-picker.scss',
  shadow: true,
})
export abstract class KsMultipleQuarterPickerComponent {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popperRef;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsMultipleQuarterPickerElement;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'show-icon' }) showIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'close-icon' }) closeIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IMultipleDateValue;
  /**
   * 展示日期格式化
   */
  @Prop() format = 'yyyy-QQQ';
  /**
   * 日期禁用
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date) => boolean;
  /**
   * 选择框的宽度
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() width: number;
  /**
   * 选择框默认文字
   * @default  请选择日期
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() placeholder: string;
  /**
   * 弹出框位置
   * @default  bottom-start
   * */
  @Prop() placement: 'bottom-start' | 'bottom' | 'bottom-end' = 'bottom-start';
  /**
   * 是否禁用
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /**
   * 是否可以清除
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() clearable: boolean;
  /**
   * 使用面性风格
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() filled: boolean;
  /**
   * 状态
   */
  @Prop() status?: Status;
  /**
   * 值改变事件
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<IMultipleDateValue>;
  /**
   * 弹层开启回调
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksShow: EventEmitter<void>;
  /**
   * 弹层关闭回调
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksHide: EventEmitter<void>;
  /**
   * 隐藏回调函数
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksVisibleChange: EventEmitter<boolean>;

  private get valueDate() {
    if (typeof this.value === 'string') {
      throw Error('Invalid value, value must be Array');
    }

    return (this.value || [])
      .filter((item) => !!item)
      .map((date) => {
        if (typeof date === 'string') {
          try {
            return parse(date, this.format, new Date());
          } catch (e) {
            return new Date(date);
          }
        }

        return date;
      });
  }

  private set valueDate(newValue) {
    this.value = newValue;
    this.ksChange.emit?.(this.value);
  }

  private get formattedDate() {
    return this.valueDate.map((value) => format(value, this.format));
  }

  handleValueChange(event: { detail: IMultipleDateValue }) {
    this.valueDate = event.detail as Array<Date | number>;
  }

  @Method()
  async closePanel() {
    this.popperRef?.close();
  }

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
      <Host dir={dir()} ks-multiple-quarter-picker>
        <ks-multiple-picker-base
          disabled={this.disabled}
          clearable={this.clearable}
          status={this.status}
          placeholder={this.placeholder}
          width={this.width}
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
          data-testid="quarter-multiple-quarter-picker-fvpXtG"
        >
          {this.showIconSlot && <slot name="show-icon" slot="show-icon"></slot>}
          {this.suffixSlot && <slot name="suffix" slot="suffix"></slot>}
          {this.closeIconSlot && <slot name="close-icon" slot="close-icon"></slot>}
          <ks-multiple-quarter-panel
            disabledDate={this.disabled ? () => true : this.isVisible ? this.disabledDate : NOOP}
            onKsChange={this.handleValueChange.bind(this)}
            value={this.valueDate}
            data-testid="quarter-multiple-quarter-picker-aFmvfG"
          >
            {this.presetSlot && (
              <div slot="preset">
                <slot name="preset"></slot>
              </div>
            )}
          </ks-multiple-quarter-panel>
        </ks-multiple-picker-base>
      </Host>
    );
  }
}
