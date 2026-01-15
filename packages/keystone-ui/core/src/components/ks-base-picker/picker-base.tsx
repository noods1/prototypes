import { Component, Element, EventEmitter, h, Prop, Event, Host, State } from '@stencil/core';
import classNames from 'classnames';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, t } from '@src/utils/utils';
import { getTimeZoneNameFromOffset } from '@src/utils/i18n/date';
import { Status, InputSize } from '../../entities';
import store from '@src/store';
import { isString } from 'lodash-es';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { commonMessages, datePickerMessages } from '@fe-infra/keystone-locales';

const prefix = 'ks-picker-base';

/**
 * @slot show-icon - Custom icon to display in the picker input, typically for opening the picker. Replaces the default calendar icon if provided.
 * @slot content - The main content area within the popover when the picker is open. The default unnamed slot is rendered within this slot.
 * @slot footer - Custom content to be displayed in the footer section of the picker's popover.
 */
@Component({
  tag: 'ks-picker-base',
  styleUrl: 'picker-base.scss',
  shadow: true,
})
export abstract class KsPickerBaseComponent {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsPickerBaseElement;

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
   * @locale {en} The width of the picker input component.
   * @locale {zh} 选择器输入组件的宽度。
   */
  @Prop() width = 400;

  /**
   * @locale {en} A function to get a reference to the internal `ks-tooltip` (popover) element.
   * @locale {zh} 用于获取内部 `ks-tooltip` (弹出框) 元素引用的函数。
   */
  @Prop() popoverRef?: (el?: HTMLKsTooltipElement) => void;
  /**
   * @locale {en} Sets the validation status of the input, affecting its visual style (e.g., 'error', 'warning').
   * @locale {zh} 设置输入的校验状态，影响其视觉样式（例如 'error', 'warning'）。
   */
  @Prop() status?: Status;
  /**
   * @locale {en} The placement of the popover relative to the picker input.
   * @locale {zh} 弹出框相对于选择器输入框的位置。
   * @default bottom-start
   */
  @Prop() placement: 'bottom-start' | 'bottom' | 'bottom-end' = 'bottom-start';
  /**
   * @locale {en} The current selected value(s). Can be a single string or an array of strings for range selection.
   * @locale {zh} 当前选中的值。对于范围选择，可以是单个字符串或字符串数组。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: string | string[];

  /**
   * @locale {en} The size of the picker input.
   * @locale {zh} 选择器输入框的尺寸。
   */
  @Prop() size: InputSize = 'md';
  /**
   * @locale {en} If true, a clear button is shown, allowing the user to deselect the value(s).
   * @locale {zh} 如果为 true，则显示清除按钮，允许用户取消选择值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() clearable: boolean;
  /**
   * @locale {en} If true, the picker is non-interactive and visually styled as disabled.
   * @locale {zh} 如果为 true，选择器将不可交互，并在视觉上呈现为禁用状态。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean | [boolean, boolean];
  /**
   * @locale {en} The placeholder text to display in the picker input when no value is selected (for single input). Defaults to a localized string (e.g., "Please select date").
   * @locale {zh} 当未选择任何值时，在选择器输入框中显示的占位文本（用于单输入框）。默认为本地化字符串（例如“请选择日期”）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() placeholder: string;

  /**
   * @locale {en} The placeholder text for the start input of a range picker.
   * @locale {zh} 范围选择器起始输入框的占位文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() startPlaceholder: string;

  /**
   * @locale {en} The placeholder text for the end input of a range picker.
   * @locale {zh} 范围选择器结束输入框的占位文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() endPlaceholder: string;

  /**
   * @locale {en} If true, the picker operates in range selection mode, typically showing two input fields.
   * @locale {zh} 如果为 true，选择器将以范围选择模式运行，通常显示两个输入框。
   */
  @Prop() isRange = false;

  /**
   * @locale {en} The format string used for displaying and parsing dates/times. Specific usage depends on the derived picker component (e.g., date picker, time picker).
   * @locale {zh} 用于显示和解析日期/时间的格式字符串。具体用法取决于派生的选择器组件（例如日期选择器、时间选择器）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() format: string;

  /**
   * @locale {en} The width of individual input fields when `isRange` is true.
   * @locale {zh} 当 `isRange` 为 true 时，单个输入框的宽度。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() inputWidth: number | string;

  /**
   * @locale {en} The timezone string (e.g., "UTC+08:00", "America/New_York"). If not provided, defaults to the global timezone offset from the store.
   * @locale {zh} 时区字符串（例如 "UTC+08:00", "America/New_York"）。如果未提供，则默认为来自存储的全局时区偏移量。
   */
  @Prop() timezone?: string;

  /**
   * @locale {en} Whether or not to show the timezone indicator.
   * @locale {zh} 是否显示时区指示器。
   */
  @Prop() hasTimezone = true;

  /**
   * @locale {en} A longer, more descriptive timezone string (e.g., "(UTC+08:00) Beijing Time"). If not provided, it's derived from `timezone` and locale settings.
   * @locale {zh} 更长、更具描述性的时区字符串（例如“(UTC+08:00) 北京时间”）。如果未提供，则根据 `timezone` 和区域设置派生。
   */
  @Prop() longTimezone?: string;

  /**
   * @locale {en} If true, the picker input is read-only. The user cannot type into it but can still interact with the popover to change selection.
   * @locale {zh} 如果为 true，选择器输入框为只读状态。用户无法在其中输入，但仍可与弹出框交互以更改选择。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() readonly: boolean;
  /**
   * @locale {en} Determines where the timezone information is displayed: 'picker' (in the input field), 'panel' (in the popover panel), or 'none'.
   * @locale {zh} 决定时区信息的显示位置：'picker'（在输入框中）、'panel'（在弹出面板中）或 'none'（不显示）。
   */
  @Prop() timeZoneDisplayPosition: 'picker' | 'panel' | 'none' = 'picker';

  @Prop() showLongTimeZone = false;

  /**
   * @locale {en} The width of the content area within the popover.
   * @locale {zh} 弹出框内容区域的宽度。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() contentWidth: string;

  /** @private Overrides the min-width of the inner input */
  @Prop() innerInputMinWidth?: number | string;

  /**
   * @locale {en} Custom event emitted when the popover is shown. Emits an index (0 or 1) if a specific input in a range picker is focused, otherwise no payload.
   * @locale {zh} 当弹出框显示时触发的自定义事件。如果范围选择器中的特定输入框获得焦点，则发出索引（0 或 1），否则无载荷。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksShow: EventEmitter<number>;

  /**
   * @locale {en} Custom event emitted when the popover is hidden. Emits an index (0 or 1) if a specific input in a range picker was active, otherwise no payload.
   * @locale {zh} 当弹出框隐藏时触发的自定义事件。如果范围选择器中的特定输入框之前是活动的，则发出索引（0 或 1），否则无载荷。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksHide: EventEmitter<number>;

  /**
   * @locale {en} Custom event emitted when the selected value changes. Emits the new value as a string (or an empty string if cleared).
   * @locale {zh} 当选中的值发生改变时触发的自定义事件。发出新值（字符串类型，如果清除则为空字符串）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<string>;

  /**
   * @locale {en} Custom event emitted when clicking the clear button.
   * @locale {zh} 当点击清除按钮时触发的事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClear: EventEmitter<string>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() focusElement: boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() visible: boolean;

  @State() cur = -1;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'footer' }) footerSlot: Slots;

  tooltipEl?: HTMLKsTooltipElement;

  get locale() {
    return store.state.config.locale;
  }

  get resolvedTimezone(): string {
    if (isString(this.timezone)) {
      return this.timezone;
    }

    const { timezoneOffset } = store.state.i18n;
    const timezone = `UTC${timezoneOffset >= 0 ? '+' : '-'}${String(Math.floor(Math.abs(timezoneOffset / 60))).padStart(
      2,
      '0',
    )}:${String(Math.abs(timezoneOffset % 60)).padStart(2, '0')}`;

    return timezone;
  }

  get resolvedLongTimeZone() {
    if (isString(this.longTimezone)) {
      return this.longTimezone;
    }

    try {
      const timeZoneName = getTimeZoneNameFromOffset(store.state.i18n.timezoneName, this.locale);
      return `(${this.resolvedTimezone}) ${timeZoneName}`;
    } catch (e) {
      return `(${this.resolvedTimezone}) ${store.state.i18n.timezoneName || ''}`;
    }
  }

  setTooltipRef = (el: HTMLKsTooltipElement) => {
    this.popoverRef?.(el);
    this.tooltipEl = el;
  };

  get allDisabled() {
    return Array.isArray(this.disabled) ? this.disabled[0] && this.disabled[1] : this.disabled;
  }

  render() {
    const containerClassName = classNames(`${prefix}`);

    const showTimezoneInPanel =
      (this.hasTimezone && this.timeZoneDisplayPosition === 'panel') || this.longTimezone || this.showLongTimeZone;

    return (
      <Host dir={dir()} ks-picker-base>
        <div class={containerClassName}>
          <ks-tooltip
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            ref={this.setTooltipRef}
            size="auto"
            trigger={'click'}
            placement={this.placement}
            visible={this.allDisabled ? false : this.visible}
            noArrow
            gapOffset={0}
            unEmitOutClickEls={[this.el]}
            onKsVisibleChange={(event) => {
              const { detail } = event;
              this.visible = detail;
              if (detail) {
                this.ksShow?.emit?.();
              } else {
                this.ksHide?.emit?.();
              }
              this.focusElement = !this.focusElement;
            }}
            data-testid="ks-base-picker-picker-base-ag5gwW"
          >
            <ks-pick-presenter
              exportparts="field: field"
              width={this.width}
              inputWidth={this.inputWidth}
              value={
                Array.isArray(this.value)
                  ? this.value.map((item) => ({ label: item, key: item }))
                  : this.value
                    ? [{ label: this.value, key: this.value }]
                    : []
              }
              status={this.status}
              clearable={this.clearable}
              isRange={this.isRange}
              size={this.size}
              isFocus={this.allDisabled ? false : this.visible}
              timezone={(this.timeZoneDisplayPosition === 'picker' && this.resolvedTimezone) || ''}
              hasTimezone={this.hasTimezone}
              onKsClear={() => {
                if (this.clearable) {
                  this.ksChange.emit('');
                  this.ksClear.emit();
                }
              }}
              onKsClickPost={() => {
                if (this.cur !== 1) {
                  this.visible = !this.visible;
                } else {
                  this.visible = true;
                }
                this.cur = 0;
                if (this.visible) {
                  this.ksShow?.emit?.(1);
                } else {
                  this.ksHide.emit(1);
                }
              }}
              onKsClickPre={() => {
                if (this.cur !== 0) {
                  this.visible ? this.tooltipEl?.close() : this.tooltipEl?.open();
                } else {
                  this.tooltipEl?.open();
                }
                this.cur = 1;
                if (this.visible) {
                  this.ksShow?.emit?.(0);
                } else {
                  this.ksHide.emit(0);
                }
              }}
              placeholder={this.placeholder}
              startPlaceholder={this.startPlaceholder}
              endPlaceholder={this.endPlaceholder}
              disabled={this.disabled}
              readonly={this.readonly}
              innerInputMinWidth={this.innerInputMinWidth}
              data-testid="ks-base-picker-picker-base-iyJLLd"
            >
              {this.showIconSlot ? (
                <slot name="show-icon" slot="show-icon"></slot>
              ) : (
                <ks-icon-calendar size="md" slot="show-icon" />
              )}
            </ks-pick-presenter>
            <div class={`${prefix}__popover`} slot="body">
              <slot name="content">
                <slot></slot>
              </slot>
              {(this.footerSlot || showTimezoneInPanel) && (
                <div class={`${prefix}__popover-footer`} style={{ width: this.contentWidth }}>
                  {showTimezoneInPanel && (
                    <ks-tooltip size="md">
                      <div class={`${prefix}__timezone__container`}>
                        <ks-text class={`${prefix}__timezone`} variant="labelSm">
                          {this.resolvedLongTimeZone}
                        </ks-text>
                      </div>
                      <ks-text
                        variant="labelSm"
                        slot="content"
                        richTextString={`${t(datePickerMessages.timezoneTip)} ${this.resolvedLongTimeZone} <a size="sm" href="https://ads.tiktok.com/help/article/about-timezone-converter-in-tiktok-ads-manager">${t(commonMessages.learnMore)}</a>`}
                      />
                    </ks-tooltip>
                  )}
                  {this.footerSlot && (
                    <div class={`${prefix}__popover-footer-slot`} part="footer">
                      <slot name="footer"></slot>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ks-tooltip>
        </div>
      </Host>
    );
  }
}
