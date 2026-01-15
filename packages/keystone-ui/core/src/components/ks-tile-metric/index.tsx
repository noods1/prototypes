import { Component, h, Prop, Element, Host, State, Event, EventEmitter, Watch, forceUpdate } from '@stencil/core';
import classnames from 'classnames';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, getTargetParentComponent } from '@src/utils/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { Metric, TileAction, RadioValue, CheckboxGroupValue } from '../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

const prefix = 'tile-metric';

/**
 * @slot title - The slot for the title.
 * @slot icon - Slot for an icon, typically displayed at the top or alongside the action element.
 * @slot extra - Slot for extra content, usually displayed in the header area of the tile.
 */
@Component({
  tag: 'ks-tile-metric',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsTileMetric {
  ['ks-name'] = 'ks-tile-metric';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsTileMetricElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  parentEl: (HTMLKsRadioGroupElement | HTMLKsCheckboxGroupElement) & { _getValue: () => RadioValue };
  /**
   * @locale {en} The type of action associated with the tile card. Can be one of the following values:
   * - `none`: No action.
   * - `checkbox`: Display a checkbox.
   * - `radio`: Display a radio button.
   * @locale {zh} 与卡片关联的操作类型。可以是以下值之一：
   * - `none`: 无操作。
   * - `checkbox`: 显示复选框。
   * - `radio`: 显示单选按钮。
   */
  @Prop() action: TileAction = 'none';
  /**
   * @locale {en} The value associated with this tile, typically used when `action` is `checkbox` or `radio` to identify the tile within a group.
   * @locale {zh} 与此卡片关联的值，通常在 `action` 为 `checkbox` 或 `radio` 时用于在组内标识此卡片。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: string;
  /**
   * @locale {en} Indicates whether the tile is disabled. When `true`, the input field is disabled and cannot be interacted with.
   * @locale {zh} 指示tile 是否禁用。当值为 `true` 时，tile被禁用，无法进行交互。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /**
   * @locale {en} The data displayed within the tile.
   * @locale {zh} 显示在卡片中的数据。
   */
  @Prop() data: string | number = 0;
  /**
   * @locale {en} The currency symbol displayed alongside the value.
   * @locale {zh} 显示在数值旁边的货币符号。
   */
  @Prop() currency = '';
  /**
   * @locale {en} The title displayed at the top of the tile card.
   * @locale {zh} 显示在卡片顶部的标题。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop({ attribute: 'title' }) title: string;
  /**
   * @locale {en} The metric data object for the card. It contains two properties:
   * - `data`: the metric value displayed in the card.
   * - `type`: indicates the trend of the metric, can be one of the following values: `up` or `down`.
   * @locale {zh} 卡片的指标数据对象。包含两个属性：
   * - `data`：显示在卡片中的指标值。
   * - `type`：表示指标的趋势，可以是以下值之一：`up` 或 `down`。
   */
  @Prop() metric: Metric = { data: '', type: 'up' };
  /**
   * @locale {en} Extra slot at the head of the card
   * @locale {zh} 卡片头部Extra 的插槽
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'extra' }) extraSlot: Slots;
  /**
   * @locale {en} The slot for the top icon area.
   * @locale {zh} tile 头部icon的插槽。
   */

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'icon' }) iconSlot: Slots;

  /**
   * @locale {en} The slot for the title content. Overrides the `title` prop if provided.
   * @locale {zh} 用于标题内容的插槽。如果提供，则覆盖 `title` 属性。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'title' }) titleSlot: Slots;

  @State() _checked = false;
  /**
   * @locale {en} Specifies whether the tile card is checked by default.
   * @locale {zh} 指定卡片是否默认选中。
   */
  @Prop() defaultChecked = false;
  /**
   * @locale {en} Indicates whether the tile card is currently checked.
   * @locale {zh} 指示卡片当前是否被选中。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() checked: boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() parentValue: RadioValue | CheckboxGroupValue;

  /**
   * @locale {en} Custom event triggered when the tile card's checked state changes.
   * @locale {zh} 卡片的选中状态发生变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<boolean>; // 禁止冒泡，防止事件冒泡到radio group组件的valuechange事件

  @Watch('checked')
  checkedWatcher(val: boolean) {
    this._checked = val;
  }

  @Watch('defaultChecked')
  defaultCheckedWatcher(val: boolean) {
    if (this.checked === undefined) this._checked = val;
  }

  constructor() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  updateParentValue = (e: CustomEvent) => {
    this.parentValue = e.detail;
    forceUpdate(this.el);
  };

  handleValueChange(event: Event & { detail: boolean }) {
    this.ksChange?.emit(event.detail);
    if (this.checked === undefined) {
      this._checked = event.detail;
    }
  }
  addBroadcastEventListener() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.parentEl?.removeEventListener(`ks-${this.action}-broadcast`, this.updateParentValue);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.parentEl?.addEventListener(`ks-${this.action}-broadcast`, this.updateParentValue);
  }

  componentWillLoad() {
    if (this.checked === undefined) this._checked = this.defaultChecked;
    else this._checked = this.checked;
  }

  componentDidLoad() {
    // this.parentEl = getTargetParentComponent(this.el, 'ks-checkbox-group');
    if (this.action !== 'none') {
      this.parentEl = getTargetParentComponent(this.el, `ks-${this.action}-group`);
      if (this.parentEl) {
        const pValue = this.parentEl?._getValue?.();
        this.parentValue = pValue;
      }
      this.addBroadcastEventListener();
    }
  }

  connectedCallback() {
    if (this.action !== 'none') {
      this.addBroadcastEventListener();
    }
  }

  disconnectedCallback() {
    if (!this.el.isConnected && this.action !== 'none') {
      // 真实被删除
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.parentEl?.removeEventListener(`ks-${this.action}-broadcast`, this.updateParentValue);
    }
  }

  getTileAction() {
    let select = null;
    switch (this.action) {
      case 'checkbox':
        select = (
          <ks-checkbox
            disabled={this.disabled}
            value={this.value}
            checked={this._checked}
            onKsChange={this.handleValueChange.bind(this)}
            data-testid="ks-tile-metric-index-ktJ1ZY"
          ></ks-checkbox>
        );

        break;
      case 'radio':
        select = (
          <ks-radio
            disabled={this.disabled}
            value={this.value}
            checked={this._checked}
            onKsChange={this.handleValueChange.bind(this)}
            data-testid="ks-tile-metric-index-3dCf2W"
          ></ks-radio>
        );

        break;
      default:
        select = null;
    }
    return select;
  }

  render() {
    const cls = classnames(prefix, `${prefix}--metric`, {
      [`${prefix}--checked`]:
        this.action !== 'none' &&
        (this._checked ||
          (this.value &&
            (this.parentValue === this.value || (this.parentValue as CheckboxGroupValue)?.includes(this.value)))),
      [`${prefix}--action`]: this.action !== 'none',
      [`${prefix}--disabled`]: this.disabled,
    });
    const select = this.getTileAction();
    return (
      <Host dir={dir()} ks-tile-metric>
        <div
          dir={dir()}
          class={cls}
          part="self"
          onClick={() => {
            if (this.disabled) {
              return;
            }
            if (this.action === 'radio') {
              this.ksChange?.emit(true);
              if (this.checked === undefined) {
                this._checked = true;
              }
            } else {
              this.ksChange?.emit(!this._checked);
              if (this.checked === undefined) {
                this._checked = !this._checked;
              }
            }
            this.parentEl?._change(this.value);
          }}
          data-testid="ks-tile-metric-index-p5XzMZ"
        >
          {(this.iconSlot || this.action !== 'none') && (
            <div class={`${prefix}__icon`}>
              {this.iconSlot && <slot name="icon"></slot>}
              {select}
            </div>
          )}

          <div class={`${prefix}__container`}>
            <div class={classnames(`${prefix}__head`)} part="head">
              {(this.extraSlot || this.title || this.titleSlot) && (
                <div class={`${prefix}__head-title`}>
                  {(this.title || this.titleSlot) && (
                    <slot name="title">
                      <span class={'title'}>{this.title}</span>
                    </slot>
                  )}
                  {this.extraSlot && <slot name="extra"></slot>}
                </div>
              )}
            </div>
            <div class={`${prefix}__body`} part="body">
              <div class={`${prefix}__dataContainer`}>
                <span dir={dir()} class={`${prefix}__data`}>
                  {this.data || 0}
                </span>
                <span class={`${prefix}__currency`}>{this.currency}</span>
                {this.metric.data && (
                  <span dir={dir()} class={classnames(`${prefix}__metric`, `${prefix}__metric--${this.metric.type}`)}>
                    {this.metric.type === 'up' ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2.40625 5.25L6.69825 1.16236C6.86721 1.00144 7.13273 1.00144 7.3017 1.16236L11.5937 5.25"
                          stroke={this.disabled ? 'var(--ks-color-primary-onSurfaceDisabled)' : '#057E33'}
                          stroke-width="0.875"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />

                        <path
                          d="M7 1.75006L7 12.25"
                          stroke={this.disabled ? 'var(--ks-color-primary-onSurfaceDisabled)' : '#057E33'}
                          stroke-width="0.875"
                          stroke-linecap="round"
                        />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.5938 8.75L7.30175 12.8376C7.13279 12.9986 6.86727 12.9986 6.6983 12.8376L2.4063 8.75"
                          stroke={this.disabled ? 'var(--ks-color-primary-onSurfaceDisabled)' : '#CA242E'}
                          stroke-width="0.875"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />

                        <path
                          d="M7 12.2499L7 1.75"
                          stroke={this.disabled ? 'var(--ks-color-primary-onSurfaceDisabled)' : '#CA242E'}
                          stroke-width="0.875"
                          stroke-linecap="round"
                        />
                      </svg>
                    )}
                    <span class={`${prefix}__metric__data`}>{this.metric.data}</span>
                  </span>
                )}
              </div>
              <div class={`${prefix}__description`} part="body">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
