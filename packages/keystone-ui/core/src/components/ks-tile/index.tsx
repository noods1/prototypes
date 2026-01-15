import {
  Component,
  h,
  Prop,
  Element,
  EventEmitter,
  Host,
  State,
  Event,
  forceUpdate,
  Watch,
  ComponentInterface,
} from '@stencil/core';
import classnames from 'classnames';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, getTargetParentComponent } from '@src/utils/utils';
import { registerPluginManager } from '@src/utils/plugin';
import { TileType, RadioValue, CheckboxGroupValue, TileAction } from '../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

const prefix = 'tile';
/**
 * @slot title - The slot for the title.
 * @slot extra - The slot for the extra content, which is displayed prominently at the top.
 * @slot icon - The slot for the top icon area.
 * @slot footer - The slot for the footer content.
 */
@Component({
  tag: 'ks-tile',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsTile implements ComponentInterface {
  ['ks-name'] = 'ks-tile';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsTileElement;
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
  @Prop() action: TileAction = 'radio';
  /**
   * @locale {en} Is clickable instead of just displaying the card
   * @locale {zh} 是否可点击而不是纯展示卡片
   */
  @Prop() clickable = false;
  /**
   * @locale {en} The layout style of the tile card. Can be one of the following values: `vertical`, `horizontal` or `metric`.
   * @locale {zh} 卡片的布局样式。可以是以下值之一：`vertical`、`horizontal` 或 `metric`。
   */
  @Prop() orientation: TileType = 'horizontal';
  /**
   * @locale {en} The value displayed within the tile card. Used when `action` is `checkbox` or `radio`.
   * @locale {zh} 卡片中显示的值。当 `action` 为 `checkbox` 或 `radio` 时使用。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: string;
  // /**
  //  * @locale {en} Custom width for the tile card.
  //  * @locale {zh} 卡片的自定义宽度。
  //  */
  // @Prop() width = 'auto';
  /**
   * @locale {en} The title displayed at the top of the tile card.
   * @locale {zh} 显示在卡片顶部的标题。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop({ attribute: 'title' }) title: string;
  /**
   * @locale {en} Indicates whether the tile is disabled. When `true`, the input field is disabled and cannot be interacted with.
   * @locale {zh} 指示tile 是否禁用。当值为 `true` 时，tile被禁用，无法进行交互。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /**
   * @locale {en} The slot for the title content. Overrides the `title` prop if provided.
   * @locale {zh} 用于标题内容的插槽。如果提供，则覆盖 `title` 属性。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'title' }) titleSlot: Slots;
  /**
   * @locale {en} Extra slot at the head of the card
   * @locale {zh} 卡片头部Extra 的插槽
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'extra' }) extraSlot: Slots;
  /**
   * @locale {en} The slot for the footer area.
   * @locale {zh} tile 页脚的插槽。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'footer' }) footerSlot: Slots;
  /**
   * @locale {en} The slot for the top icon area.
   * @locale {zh} tile 头部icon的插槽。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'icon' }) iconSlot: Slots;

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

  handleValueChange(event: Partial<Event> & { detail: boolean }) {
    this.ksChange?.emit(event.detail);
    if (this.checked === undefined && !this.parentEl) {
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
            data-testid="ks-tile-index-sGQ2F1"
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
            data-testid="ks-tile-index-rQbW3C"
          ></ks-radio>
        );

        break;
      default:
        select = null;
    }
    return select;
  }

  render() {
    const cls = classnames(prefix, `${prefix}--${this.orientation}`, {
      [`${prefix}--checked`]:
        this.action !== 'none' &&
        (this._checked ||
          (this.value &&
            (this.parentValue === this.value || (this.parentValue as CheckboxGroupValue)?.includes(this.value)))),
      [`${prefix}--action`]: this.action !== 'none',
      [`${prefix}--clickable`]: this.clickable,
      [`${prefix}--disabled`]: this.disabled,
    });
    const select = this.getTileAction();
    return (
      <Host dir={dir()} ks-tile>
        <div
          dir={dir()}
          class={cls}
          part="self"
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (
              this.disabled ||
              target.getAttribute('ks-checkbox') !== null ||
              target.getAttribute('ks-radio') !== null
            ) {
              return;
            }
            this.parentEl?._change(this.value);
            const detail = this.action === 'checkbox' ? !this._checked : true;
            this.handleValueChange({ detail });
          }}
          data-testid="ks-tile-index-3TTQAz"
        >
          {this.orientation === 'vertical' && (
            <div class={`${prefix}__icon`}>
              <div>{this.iconSlot && <slot name="icon"></slot>}</div>
              <span class={`${prefix}__select`}>{select}</span>
            </div>
          )}

          <div class={`${prefix}__container`}>
            <div class={classnames(`${prefix}__head ${prefix}__header`)} part="head">
              <div>
                {(this.extraSlot || this.title || this.titleSlot || this.iconSlot) && (
                  <div class={`${prefix}__head-title`}>
                    {this.iconSlot && this.orientation === 'horizontal' && <slot name="icon"></slot>}
                    {(this.title || this.titleSlot) && (
                      <slot name="title">
                        <span class={'title'}>{this.title}</span>
                      </slot>
                    )}

                    {this.extraSlot && <slot name="extra"></slot>}
                  </div>
                )}
              </div>
              {(this.orientation === 'horizontal' && (
                <div class={`${prefix}__icon`}>
                  <span class={`${prefix}__select`}>{select}</span>
                </div>
              )) ||
                null}
            </div>
            {
              <div class={`${prefix}__description`} part="body">
                <slot />
              </div>
            }

            {this.footerSlot && (
              <div class={classnames(`${prefix}__footer`)} part="footer">
                <slot name="footer"></slot>
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
