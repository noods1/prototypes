import { Component, Element, EventEmitter, h, Prop, State, Event, Host } from '@stencil/core';
import classNames from 'classnames';
import { Status, IPresenterValue } from '../../entities';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, t } from '@src/utils/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { datePickerMessages } from '@fe-infra/keystone-locales';

const prefix = 'ks-picker-base';

/**
 * @slot suffix - Slot for content to be displayed as a suffix within the picker input area. This content is rendered if the component detects content provided to this slot.
 * @slot show-icon - Slot for a custom icon to indicate the picker can be opened. This content is rendered if the component detects content provided to this slot, otherwise a default calendar icon is used.
 * @slot close-icon - Slot for a custom icon to clear the selected value(s). This content is rendered if the component detects content provided to this slot.
 * @slot content - Slot for the main content displayed within the popover when the picker is open. The default unnamed slot is also available within this slot.
 * @slot selected - Slot for selected content.
 */
@Component({
  tag: 'ks-multiple-picker-base',
  styleUrl: 'picker-base.scss',
  shadow: true,
})
export abstract class KsMultiplePickerBaseComponent {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popperRef;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsMultiplePickerBaseElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() contentEl;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'prefix' }) prefixSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'show-icon' }) showIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'close-icon' }) closeIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;

  /**
   * @locale {en} A function to get a reference to the internal `ks-tooltip` (popover) element.
   * @locale {zh} 用于获取内部 `ks-tooltip` (弹出框) 元素引用的函数。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() popoverRef: (el?: HTMLKsTooltipElement) => void;
  /**
   * @locale {en} The placement of the popover relative to the picker input.
   * @locale {zh} 弹出框相对于选择器输入框的位置。
   * @default bottom-start
   */
  @Prop() placement: 'bottom-start' | 'bottom' | 'bottom-end' = 'bottom-start';
  /**
   * @locale {en} An array of strings representing the currently selected values.
   * @locale {zh} 代表当前选中值的字符串数组。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: string[];
  /**
   * @locale {en} If true, the picker is non-interactive and visually styled as disabled.
   * @locale {zh} 如果为 true，选择器将不可交互，并在视觉上呈现为禁用状态。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /**
   * @locale {en} The placeholder text to display in the picker input when no values are selected. Defaults to the localized string for "date-picker.placeholder" (e.g., "Please select date").
   * @locale {zh} 当未选择任何值时，在选择器输入框中显示的占位文本。默认为 "date-picker.placeholder" 的本地化字符串（例如“请选择日期”）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() placeholder: string;

  /**
   * @locale {en} The width of the picker input component in pixels.
   * @locale {zh} 选择器输入组件的宽度，单位为像素。
   */
  @Prop() width = 200;

  /**
   * @locale {en} Sets the validation status of the input, affecting its visual style (e.g., 'error', 'warning').
   * @locale {zh} 设置输入的校验状态，影响其视觉样式（例如 'error', 'warning'）。
   */
  @Prop() status?: Status;
  /**
   * @locale {en} If true, a clear button is shown (via the internal `ks-fields-presenter`), allowing the user to deselect all values.
   * @locale {zh} 如果为 true，则显示清除按钮（通过内部 `ks-fields-presenter` 组件），允许用户取消选择所有值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() clearable: boolean;

  /**
   * @locale {en} A function that takes an array of selected values and returns an HTMLElement to be displayed as the custom selected representation in the input area.
   * @locale {zh} 一个函数，接收选中的值数组并返回一个 HTMLElement，用作在输入区域中自定义显示已选内容。
   */
  @Prop() renderSelected?: (value: string[]) => HTMLElement;

  /**
   * @locale {en} If true, displays a count of selected items within the picker input when multiple items are selected and collapsed (functionality provided by `ks-fields-presenter`).
   * @locale {zh} 如果为 true，当选择了多个项目并折叠显示时，在选择器输入框内显示已选项目的计数（功能由 `ks-fields-presenter` 提供）。
   */
  @Prop() showCount = true;

  /**
   * @locale {en} If true, the picker input is read-only (functionality provided by `ks-fields-presenter`). The user cannot type into it, but can still interact with the popover to change selection.
   * @locale {zh} 如果为 true，选择器输入框为只读状态（功能由 `ks-fields-presenter` 提供）。用户无法在其中输入，但仍可与弹出框交互以更改选择。
   */
  @Prop() readonly = false;

  /**
   * @locale {en} Custom event emitted when the popover is shown.
   * @locale {zh} 当弹出框显示时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksShow: EventEmitter<void>;

  /**
   * @locale {en} Custom event emitted when the popover is hidden.
   * @locale {zh} 当弹出框隐藏时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksHide: EventEmitter<void>;

  @State() focusElement = false;
  /**
   * @locale {en} Custom event emitted when the selected value(s) change. Emits an array of selected string values.
   * @locale {zh} 当选中的值发生改变时触发的自定义事件。发出一个包含选中字符串值的数组。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<string[]>;

  private insertSelectedElement() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const element = this.renderSelected(this.value);
    element.slot = 'selected';
    const oldElements = this.el.querySelectorAll('*[slot="selected"]') || [];
    oldElements.forEach((el) => this.el.removeChild(el));

    this.el.appendChild(element);
  }

  render() {
    const containerClassName = classNames(`${prefix}`);
    return (
      <Host dir={dir()} ks-multiple-picker-base>
        <div dir={dir()} class={containerClassName}>
          <ks-tooltip
            ref={this.popoverRef}
            trigger={'click'}
            placement={this.placement}
            visible={false}
            noArrow
            gapOffset={0}
            unEmitOutClickEls={[this.el]}
            onKsVisibleChange={(event) => {
              const { detail } = event;
              if (detail) {
                this.ksShow?.emit?.();
              } else {
                this.ksHide?.emit?.();
              }
              this.focusElement = !this.focusElement;
            }}
            data-testid="ks-base-picker-multiple-picker-base-k38pHY"
          >
            <ks-fields-presenter
              exportparts="field: field"
              width={this.width}
              collapse={true}
              value={this.value.map((item) => ({ label: item, key: item }))}
              focusElement={this.focusElement}
              status={this.status}
              clearable={this.clearable}
              maxHeight={200}
              innerPaddingUse
              onKsRemove={(event: CustomEvent<IPresenterValue | IPresenterValue[]>) => {
                const tag = event.detail;
                let tags = tag;

                if (!Array.isArray(tags)) {
                  tags = [tags];
                }

                this.value = this.value.filter((item) => !(tags as IPresenterValue[]).find((tag) => tag.key === item));
                this.ksChange.emit?.(this.value);
              }}
              onKsChange={(event) => {
                if (this.clearable) {
                  this.ksChange.emit(event.detail.map((item) => item.key as string));
                }
              }}
              placeholder={this.placeholder || t(datePickerMessages.placeholder)}
              disabled={this.disabled}
              data-testid="ks-base-picker-multiple-picker-base-d1G1BZ"
            >
              {this.showIconSlot ? (
                <slot name="show-icon" slot="show-icon"></slot>
              ) : (
                <ks-icon-calendar size="14" slot="show-icon" />
              )}

              {this.suffixSlot && <slot name="suffix" slot="suffix"></slot>}
              {this.closeIconSlot && <slot name="close-icon" slot="close-icon"></slot>}
              {this.renderSelected && this.value && this.value?.length > 0 && (
                <slot name="selected">{this.insertSelectedElement()}</slot>
              )}
            </ks-fields-presenter>
            <div ref={(el) => (this.contentEl = el)} slot="body">
              <slot name="content">
                <slot></slot>
              </slot>
            </div>
          </ks-tooltip>
        </div>
      </Host>
    );
  }
}
