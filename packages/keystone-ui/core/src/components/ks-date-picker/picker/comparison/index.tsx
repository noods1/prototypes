import { Component, Element, h, Prop, Event, State, EventEmitter, Host, Method, Watch } from '@stencil/core';
import { format } from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, t } from '@src/utils/utils';
import { Status, ICompareValue, IDateValue, IMultipleDateValue } from '../../../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { commonMessages } from '@fe-infra/keystone-locales';

/**
 * @slot prefix - Slot for prefix content.
 * @slot suffix - Slot for suffix content.
 * @slot show-icon - Slot for the expand indicator icon.
 * @slot close-icon - Slot for the clear icon.
 * @slot source-preset - Slot for source preset options.
 * @slot target-preset - Slot for target preset options.
 */
@Component({
  tag: 'ks-date-comparison-picker',
  styleUrl: 'index.scss',
  shadow: true,
})
export abstract class KsDateComparisonPickerComponent {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popperRef;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsDateComparisonPickerElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'source-preset' }) sourcePresets: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'target-preset' }) targetPresets: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'show-icon' }) showIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'close-icon' }) closeIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;
  /**
   * @locale {en} Custom prefix icon.
   * @locale {zh} 自定义前缀图标。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'prefix' }) prefixSlot: Slots;

  /**
   * @locale {en} The currently selected comparison value.
   * @locale {zh} 当前选中的对比值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: ICompareValue;
  /**
   * @locale {en} The status of the picker (e.g., error, warning).
   * @locale {zh} 选择器的状态（例如，错误、警告）。
   */
  @Prop() status?: Status;
  /**
   * @locale {en} The format for displaying dates.
   * @locale {zh} 展示日期格式化。
   */
  @Prop() format = 'yyyy-MM-dd';
  /**
   * @locale {en} The width of the selection box.
   * @locale {zh} 选择框的宽度。
   * */
  @Prop() width = 300;
  /**
   * @locale {en} Placeholder text for the selection box. Default: "Please select date".
   * @locale {zh} 选择框默认文字。默认：“请选择日期”。
   * */
  @Prop() placeholder = 'date-comparison.placeholder' /* FIXME missing translation */;
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
   * @locale {en} Event emitted when the value changes.
   * @locale {zh} 值改变事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<ICompareValue>;
  /**
   * @locale {en} Callback when the popover is shown.
   * @locale {zh} 弹层开启回调。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksShow: EventEmitter<void>;
  /**
   * @locale {en} Callback when the popover is hidden.
   * @locale {zh} 弹层关闭回调。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksHide: EventEmitter<void>;
  /**
   * @locale {en} Event emitted when the visibility of the popover changes.
   * @locale {zh} 弹层显示状态改变回调函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksVisibleChange: EventEmitter<boolean>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() nativeDate: ICompareValue;

  @Watch('value')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  watchValue(newValue) {
    this.nativeDate = newValue;
  }

  private parseDate(value: IDateValue) {
    return typeof value === 'string' ? new Date(value) : value;
  }

  private formatToString(dateValues: IMultipleDateValue) {
    return dateValues ? dateValues.map((date) => format(this.parseDate(date), this.format)).join(' ~ ') : '';
  }

  private get valueDate() {
    const { isCompare, source, target } = this.value || {};
    if (isCompare) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      return [this.formatToString(source), this.formatToString(target)].filter((date) => !!date);
    } else {
      return source ? [this.formatToString(source)] : [];
    }
  }

  handleValueChange(event: { detail: ICompareValue }) {
    this.nativeDate = event.detail;
  }

  confirm() {
    if (this.nativeDate) {
      this.ksChange?.emit(this.nativeDate);
    }
    this.popperRef.close?.();
  }

  cancel() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.nativeDate = null;
    this.popperRef.close?.();
  }

  /**
   * @locale {en} Closes the date picker panel.
   * @locale {zh} 关闭日期选择器面板。
   */
  @Method()
  async closePanel() {
    this.popperRef?.close();
  }

  /**
   * @locale {en} Opens the date picker panel.
   * @locale {zh} 打开日期选择器面板。
   */
  @Method()
  async openPanel() {
    this.popperRef?.open();
  }

  render() {
    return (
      <Host dir={dir()} ks-date-comparison-picker>
        <ks-multiple-picker-base
          placeholder={this.placeholder}
          disabled={this.disabled}
          status={this.status}
          width={this.width}
          showCount={false}
          value={this.valueDate}
          placement={this.placement}
          clearable={this.clearable}
          renderSelected={(value) => {
            const selectedElement = document.createElement('div');
            selectedElement.className = 'picker__selected-container';
            const [start, end] = value;
            const { isCompare } = this.value;
            if (isCompare) {
              const sourceElement = document.createElement('div');
              const targetElement = document.createElement('div');

              sourceElement.className = 'picker__selected-source';
              targetElement.className = 'picker__selected-target';
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              sourceElement.innerText = start;
              targetElement.innerText = `${'date-comparison.compare-text' /* FIXME missing translation */} ${end}`;

              selectedElement.appendChild(sourceElement);
              selectedElement.appendChild(targetElement);
            } else {
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              selectedElement.innerText = start;
            }

            return selectedElement;
          }}
          onKsShow={() => {
            this.ksVisibleChange.emit(true);
            this.ksShow?.emit?.();
          }}
          onKsHide={() => {
            this.ksVisibleChange.emit(false);
            this.ksHide?.emit?.();
          }}
          popoverRef={(el) => (this.popperRef = el)}
          data-testid="comparison-index-nWavfq"
        >
          {this.prefixSlot && <slot slot="prefix" name="prefix"></slot>}
          {this.showIconSlot && <slot name="show-icon" slot="show-icon"></slot>}
          {this.suffixSlot && <slot name="suffix" slot="suffix"></slot>}
          {this.closeIconSlot && <slot name="close-icon" slot="close-icon"></slot>}
          <div class="picker__panel">
            <ks-date-comparison-panel
              onKsChange={this.handleValueChange.bind(this)}
              value={this.value}
              data-testid="comparison-index-7hnX7e"
            >
              {this.sourcePresets && (
                <slot
                  slot="source-preset"
                  key="start"
                  name="source-preset"
                  data-testid="comparison-index-rw6zNQ"
                ></slot>
              )}
              {this.targetPresets && (
                <slot
                  slot="target-preset"
                  key="target"
                  name="target-preset"
                  data-testid="comparison-index-aH14EE"
                ></slot>
              )}
            </ks-date-comparison-panel>
            <div class={'picker__footer'} part="footer">
              {this.nativeDate?.isCompare &&
                Array.isArray(this.nativeDate.target) &&
                this.nativeDate.target.length === 0 && (
                  <div class="error__tips">{'date-comparison.error-target' /* FIXME missing translation */}</div>
                )}

              <ks-button
                variant="text"
                size="sm"
                onClick={() => {
                  this.cancel();
                }}
                data-testid="comparison-index-n4J3cG"
              >
                {t(commonMessages.cancel)}
              </ks-button>
              <ks-button
                variant="primary"
                size="sm"
                disabled={
                  this.nativeDate?.isCompare &&
                  Array.isArray(this.nativeDate.target) &&
                  this.nativeDate.target.length === 0
                }
                onClick={() => {
                  this.confirm();
                }}
                data-testid="comparison-index-5pzG5q"
              >
                {t(commonMessages.apply)}
              </ks-button>
            </div>
          </div>
        </ks-multiple-picker-base>
      </Host>
    );
  }
}
