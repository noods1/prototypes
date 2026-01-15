import { Component, h, Prop, Element, Event, EventEmitter, State, Host, Fragment } from '@stencil/core';
import classnames from 'classnames';
import { dir, t } from '@src/utils/utils';
import { Status, IPresenterInputSize, IPresenterValue } from '../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { commonMessages, datePickerMessages } from '@fe-infra/keystone-locales';

const prefix = 'pick-presenter';
/**
 * @slot show-icon - Custom icon to display in the suffix area, typically indicating an action like opening a picker. This icon is displayed when no clear or status icon is active.
 */
@Component({
  tag: 'ks-pick-presenter',
  styleUrl: 'pick-presenter.scss',
  shadow: true,
})
export class KsPickPresenter {
  ['ks-name'] = 'ks-pick-presenter';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsPickPresenterElement;
  /**
   * @locale {en} The current values to display in the input field(s). Each object in the array typically contains a `label` to display.
   * @locale {zh} 在输入框中显示的当前值。数组中的每个对象通常包含一个用于显示的 `label`。
   */
  @Prop() @Vue2ValueFix() value: IPresenterValue[] = [];

  /**
   * @locale {en} If true, the presenter will display two input fields for a range. If false, a single input field is displayed.
   * @locale {zh} 如果为 true，则呈现器将显示两个用于范围选择的输入框。如果为 false，则显示单个输入框。
   */
  @Prop() isRange = true;

  /**
   * @locale {en} Placeholder text for the input field when `isRange` is false and no value is present.
   * @locale {zh} 当 `isRange` 为 false 且没有值时，输入框的占位文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() placeholder: string;

  /**
   * @locale {en} Placeholder text for the start input field when `isRange` is true and no start value is present.
   * @locale {zh} 当 `isRange` 为 true 且没有起始值时，起始输入框的占位文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() startPlaceholder: string;

  /**
   * @locale {en} Placeholder text for the end input field when `isRange` is true and no end value is present.
   * @locale {zh} 当 `isRange` 为 true 且没有结束值时，结束输入框的占位文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() endPlaceholder: string;
  /**
   * @locale {en} The size of the input field(s).
   * @locale {zh} 输入框的尺寸。
   */
  @Prop() size: IPresenterInputSize = 'lg';

  /**
   * @locale {en} The total width of the component. Can be a number (in pixels) or a string (e.g., '100%').
   * @locale {zh} 组件的总宽度。可以是数字（像素单位）或字符串（例如 '100%'）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() width: number | string;
  /**
   * @locale {en} The width of individual input fields when `isRange` is true. Can be a number (in pixels) or a string.
   * @locale {zh} 当 `isRange` 为 true 时，单个输入框的宽度。可以是数字（像素单位）或字符串。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() inputWidth: number | string;
  /**
   * 输入框最大高度 (Note: This prop appears to be unused in the current component rendering logic.)
   * (注意：此属性当前似乎未在组件的渲染逻辑中使用。)
   */
  // @Prop() maxHeight: number;
  /**
   * @locale {en} If true, the input field(s) will be disabled and non-interactive.
   * @locale {zh} 如果为 true，输入框将被禁用且不可交互。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean | [boolean, boolean];
  /**
   * @locale {en} If true, a clear button is shown when the input has a value and is focused, allowing the user to clear the content.
   * @locale {zh} 如果为 true，当输入框有值且获得焦点时，会显示一个清除按钮，允许用户清除内容。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() clearable: boolean;
  /**
   * @locale {en} Sets the validation status of the input, affecting its visual style (e.g., 'error', 'warning').
   * @locale {zh} 设置输入的校验状态，影响其视觉样式（例如 'error', 'warning'）。
   */
  @Prop() status?: Status;

  /**
   * @locale {en} If true, the input field(s) will be read-only. Users cannot type into them.
   * @locale {zh} 如果为 true，输入框将为只读状态。用户无法在其中键入内容。
   */
  @Prop() readonly = false;

  /**
   * @locale {en} The timezone string to display if `hasTimezone` is true.
   * @locale {zh} 当 `hasTimezone` 为 true 时要显示的时区字符串。
   */
  @Prop() timezone?: string;

  /**
   * @locale {en} Whether or not to show the timezone indicator.
   * @locale {zh} 是否显示时区指示器。
   */
  @Prop() hasTimezone = true;

  /** @private Overrides the min-width of the inner input */
  @Prop() innerInputMinWidth?: number | string;

  /**
   * @locale {en} Emitted when the clear button is clicked.
   * @locale {zh} 当清除按钮被点击时触发。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClear: EventEmitter<void>;

  /**
   * @locale {en} Emitted when the first (or only) input field is clicked.
   * @locale {zh} 当第一个（或唯一的）输入框被点击时触发。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClickPre: EventEmitter<void>;

  /**
   * @locale {en} Emitted when the second input field (in range mode) is clicked.
   * @locale {zh} 当第二个输入框（在范围模式下）被点击时触发。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClickPost: EventEmitter<void>;

  @State() placeholderShowable = true;

  @State() moreCount = 0;

  /**
   * @locale {en} Indicates whether the component currently has focus. This affects the display of the clear button and styling.
   * @locale {zh} 指示组件当前是否拥有焦点。这会影响清除按钮的显示和样式。
   */
  @Prop() isFocus = false;

  get currentClearable() {
    return this.isFocus && this.clearable && this.value.length && !(this.startDisabled || this.endDisabled);
  }

  clear() {
    if (this.currentClearable) {
      this.ksClear?.emit();
    }
  }

  renderIcon() {
    if (this.currentClearable) {
      return (
        <div
          part="suffix-icon"
          onClick={(event) => {
            event.stopPropagation();
            this.clear();
          }}
          class={classnames({ [`${prefix}__clear`]: this.currentClearable })}
          data-testid="ks-base-picker-pick-presenter-9CRHAV"
        >
          <ks-icon-filled-close />
        </div>
      );
    } else {
      return <slot name="show-icon"></slot>;
    }
  }

  get startDisabled() {
    return Array.isArray(this.disabled) ? this.disabled[0] : this.disabled;
  }
  get endDisabled() {
    return Array.isArray(this.disabled) ? this.disabled[1] : this.disabled;
  }

  render() {
    const className = classnames(`${prefix}`, {
      [`${prefix}--disabled`]: this.startDisabled && this.endDisabled,
      [`${prefix}--${this.status}`]: this.status,
      [`${prefix}--focus`]: this.isFocus,
    });

    return (
      <Host dir={dir()} class={prefix} ks-fields-presenter>
        <div
          dir={dir()}
          class={className}
          part="self field"
          style={{ width: typeof this.width === 'string' ? this.width : `${this.width}px` }}
        >
          <div
            class={classnames(`${prefix}__content`, `${prefix}__content__${this.size}`, {
              [`${prefix}__content--empty`]: !this.value?.length,
            })}
            style={{
              minWidth:
                typeof this.innerInputMinWidth === 'number' ? `${this.innerInputMinWidth}px` : this.innerInputMinWidth,
            }}
            part="content"
          >
            <input
              type="text"
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              style={this.isRange ? { width: `${this.inputWidth}px` } : null}
              disabled={this.startDisabled}
              readOnly={true}
              onClick={(e) => {
                e.stopPropagation();
                this.ksClickPre?.emit();
              }}
              placeholder={this.isRange ? this.startPlaceholder : this.placeholder}
              class={classnames(`${prefix}__input`, {
                [`${prefix}__input--disabled`]: this.startDisabled,
                [`${prefix}__input--range`]: this.isRange,
              })}
              value={this.value[0]?.label || ''}
              data-testid="ks-base-picker-pick-presenter-gHeDow"
            />

            {this.isRange && (
              <Fragment>
                <span class={`${prefix}__divider`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 7.66671C4 7.48261 4.09949 7.33337 4.22222 7.33337H11.7778C11.9005 7.33337 12 7.48261 12 7.66671V8.33337C12 8.51747 11.9005 8.66671 11.7778 8.66671H4.22222C4.09949 8.66671 4 8.51747 4 8.33337V7.66671Z"
                      fill="#A9ABAD"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  disabled={this.endDisabled}
                  readOnly={true}
                  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                  style={this.isRange ? { width: `${this.inputWidth}px` } : null}
                  placeholder={this.endPlaceholder}
                  class={classnames(`${prefix}__input`, `${prefix}__input--range`, {
                    [`${prefix}__input--disabled`]: this.endDisabled,
                  })}
                  value={this.value[1]?.label || ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.ksClickPost?.emit();
                  }}
                  data-testid="ks-base-picker-pick-presenter-fNPVg7"
                />
              </Fragment>
            )}
          </div>
          {this.hasTimezone && this.timezone && (
            <ks-tooltip size="md">
              <div class={`${prefix}__timezone`}>{this.timezone}</div>
              <ks-text
                variant="labelSm"
                slot="content"
                richTextString={`${t(datePickerMessages.timezoneTip)} <a size="sm" href="https://ads.tiktok.com/help/article/about-timezone-converter-in-tiktok-ads-manager">${t(commonMessages.learnMore)}</a>`}
              />
            </ks-tooltip>
          )}

          <div class={`${prefix}__suffix`} part="suffix">
            {this.renderIcon()}
          </div>
        </div>
      </Host>
    );
  }
}
