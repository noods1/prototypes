import { Component, h, Prop, Event, EventEmitter, Host, State, Watch, Element } from '@stencil/core';
import classnames from 'classnames';
import { ks } from '@fe-infra/keystone-design-tokens';
import { dir } from '@src/utils/utils';
import { Slot, Slots } from '@src/utils/decorators';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking } from '@src/utils/tracking';
import { FormContextValueReconcile } from '@src/utils/form/utils';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';

const prefix = 'switch';

/**
 * @part self - Switch part
 * @slot description - Slot for the description text of the switch.
 * @slot title - The title slot for the switch label.
 */
@Component({
  tag: 'ks-switch',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsSwitch extends FormBaseComponent<boolean> {
  ['ks-name'] = 'ks-switch';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsSwitchElement;
  /**
   * @locale {en} The size of the switch. Can be 'sm' or 'md'.
   * @locale {zh} 开关的尺寸。可选值为 'sm' 或 'md'。
   */
  @Prop() size: 'sm' | 'md' = 'md';
  /**
   * @locale {en} Indicates whether the switch is disabled. When `true`, the switch cannot be toggled by the user.
   * @locale {zh} 指示开关是否被禁用。当为 `true` 时，用户无法切换开关。
   */
  @Prop() @FormContextValueReconcile() disabled = false;
  /**
   * @locale {en} Indicates whether the switch is currently checked.
   * @locale {zh} 指示开关当前是否被选中。
   */
  @Prop() @FormContextValueReconcile({ contextKey: 'valueFromContext' }) checked?: boolean;

  @State() _checked = false;
  /**
   * @locale {en} The default checked state of the switch when it is first rendered.
   * @locale {zh} 组件首次渲染时开关的默认选中状态。
   */
  @Prop() defaultChecked = false;
  /**
   * @locale {en} Indicates whether the switch is in a loading state. When `true`, a loading indicator will be shown.
   * @locale {zh} 指示开关是否处于加载状态。当为 `true` 时，将显示加载指示器。
   */
  @Prop() loading = false;
  /**
   * @locale {en} The style of the description for the switch. Can be one of the following values: `tooltip` or `label`.
   * @locale {zh} 开关描述的样式，可以是 tooltip 或 label。可选值为 `tooltip` 或 `label`。
   */
  @Prop() descriptionStyle: 'tooltip' | 'label' = 'label';
  /**
   * @locale {en} Content for a tag displayed next to the switch. Only visible when `size` is 'md'.
   * @locale {zh} 显示在开关旁边的标签内容。仅当 `size` 为 'md' 时可见。
   */
  @Prop() tagContent = '';
  /**
   * @locale {en} The position of the label relative to the switch can be either on the left or the right.
   * @locale {zh} label 相对开关的位置，可以是左边或者右边。
   */
  @Prop() labelPosition: 'left' | 'right' = 'left';
  /**
   * @locale {en} Custom event triggered when the checked state of the switch changes. This event can be used to execute additional actions upon change.
   * @locale {zh} 开关的选中状态更改时触发的自定义事件。此事件可用于在状态更改时执行额外的操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<boolean>;
  /**
   * @locale {en} The component that render the description of the switch.
   * @locale {zh} 开关描述的插槽。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'description' }) descriptionSlots: Slots;

  /**
   * @locale {en} The component that render the description of the switch.
   * @locale {zh} 开关描述的插槽。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'title' }) titleSlots: Slots;

  @Watch('checked')
  checkedWatcher(val: boolean) {
    this._checked = val;
  }

  @Watch('defaultChecked')
  defaultCheckedWatcher(val: boolean) {
    if (this.checked === undefined) {
      this._checked = val;
    }
  }

  constructor() {
    super();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  handleValueChange = () => {
    if (this.disabled || this.loading) {
      return;
    }
    this.ksChange.emit(!this._checked);
    if (this.checked === undefined) {
      this._checked = !this._checked;
    }
    sendActionTracking(this.el, { eventType: 'change', componentParams: { value: this._checked } });
  };
  handleLabelClick(event: Event) {
    if (event.target === event.currentTarget) {
      return;
    }
  }

  componentWillLoad() {
    if (this.checked === undefined) {
      this._checked = this.defaultChecked;
    } else {
      this._checked = this.checked;
    }
  }

  render() {
    const switchCls = classnames(prefix, `${prefix}--${this.size}`, {
      [`${prefix}--disabled`]: this.disabled || this.loading,
      [`${prefix}--checked`]: this._checked,
    });
    const renderSlot = this.el.childNodes.length > 0 || this.tagContent;
    const descriptionStyle = this.size === 'sm' ? 'tooltip' : this.descriptionStyle;
    return (
      <Host dir={dir()} ks-switch>
        <div class={`${prefix}__container`}>
          {this.titleSlots && (
            <div class={`${prefix}__title`}>
              <ks-text variant="titleMd">
                <slot name="title"></slot>
              </ks-text>
            </div>
          )}
          <div class={`${prefix}__content ${prefix}--${this.labelPosition}`}>
            <button
              id="switch"
              class={switchCls}
              part="self"
              role="switch"
              disabled={this.disabled || this.loading}
              aria-labelledby="label"
              aria-checked={String(this._checked)}
              onClick={this.handleValueChange}
              aria-describedby="desc"
              data-testid="ks-switch-index-pUsHmY"
            >
              <div class={classnames(`${prefix}__handle`, `${prefix}__handle--${this.size}`)} part="handle">
                {this.loading && <ks-icon-loading size="12" color={ks.color.neutral.fillLow} />}
              </div>
            </button>

            {renderSlot && (
              <div
                id="texts"
                class={`${prefix}__texts--${this.size} ${descriptionStyle === 'tooltip' ? `${prefix}__tooltip` : ''}`}
              >
                <label id="label" class={classnames({ disabled: this.disabled || this.loading })} htmlFor="switch">
                  <slot></slot>
                  {this.descriptionSlots && descriptionStyle !== 'tooltip' && (
                    <div id="desc" class="desc">
                      <slot name="description"></slot>
                    </div>
                  )}
                </label>
                {this.descriptionSlots && descriptionStyle === 'tooltip' && (
                  <ks-tooltip id="desc" class="tooltip">
                    <ks-icon-help size="14" />
                    <slot name="description" slot="content"></slot>
                  </ks-tooltip>
                )}
                {this.tagContent && this.size === 'md' && (
                  <ks-tag class="tag" variant="new" size="sm">
                    {this.tagContent}
                  </ks-tag>
                )}
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
