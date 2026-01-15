import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
  State,
  Watch,
  forceUpdate,
  Host,
  Listen,
} from '@stencil/core';
import classnames from 'classnames';
import { dir, getTargetParentComponent } from '@src/utils/utils';
import { CheckboxGroupValue, Status } from '../../entities';
import { SvgCheck, SvgCheckIndeterminate } from './SvgCheck';
import { Slot, Slots } from '@src/utils/decorators';
import { FormContextValueReconcile } from '@src/utils/form/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking } from '@src/utils/tracking';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';

const prefix = 'checkbox';

/**
 * @slot label - The slot for a custom structure of the entire label area, including the checkbox visual and text.
 * @slot description - The slot for providing descriptive text for the checkbox.
 * @slot suffix - The slot for the suffix.
 */
@Component({
  tag: 'ks-checkbox',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCheckbox extends FormBaseComponent<boolean> {
  ['ks-name'] = 'ks-checkbox';
  @Element() el!: HTMLKsCheckboxElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  inputEl: HTMLElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  parentEl: HTMLKsCheckboxGroupElement & { _getValue: () => CheckboxGroupValue };
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() parentValue: CheckboxGroupValue;

  /**
   * @locale {en} Determine whether the checkbox is disabled. When set to `true`, the checkbox cannot be interacted with by the user.
   * @locale {zh} 用于确定多选框是否被禁用。设置为 `true` 时，用户无法与该多选框进行交互。
   */
  @Prop({ mutable: true }) @FormContextValueReconcile() disabled?: boolean;
  /**
   * @locale {en} The status of the checkbox. Can be one of the following values: `success`, `error`, `warning`, `default`.
   * @locale {zh} 多选框的状态。可以是以下值之一：`success`、`error`、`warning`、`default`。
   */
  @Prop() @FormContextValueReconcile() status?: Status;
  /**
   * @locale {en} Indicate whether the checkbox is currently checked.
   * @locale {zh} 表示多选框当前是否被选中。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @FormContextValueReconcile({ contextKey: 'valueFromContext' }) checked: boolean;
  /**
   * @locale {en} Set the initial checked state of the checkbox when the component is first rendered. This does not change after the initial render.
   * @locale {zh} 用于设置多选框在组件首次渲染时的初始选中状态。此值在初始渲染后不会改变。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() defaultChecked: boolean;
  /**
   * @locale {en} Indicate whether the checkbox is in an indeterminate state. If `true`, the checkbox appears in a partially checked state, typically used for representing a mixed selection.
   * @locale {zh} 表示多选框是否处于半选状态。如果为 `true`，则多选框显示为部分选中状态，通常用于表示混合选择。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() indeterminate: boolean;
  /**
   * @locale {en} Determine checkbox's alignment, can choose `flex-start` | `center`
   * @locale {zh} 确定复选框的对齐方式，可以选择 `flex-start` | `center`
   */
  @Prop() align: 'flex-start' | 'center' = 'center';
  /**
   * @locale {en} The style of the description for the checkbox. Can be one of the following values: `tooltip` or `label`.
   * @locale {zh} 多选框描述的样式，可以是 tooltip 或 label。可选值为 `tooltip` 或 `label`。
   */
  @Prop() descriptionStyle: 'tooltip' | 'label' = 'label';
  /**
   * @locale {en} size of checkbox
   * @locale {zh} checkbox的尺寸
   */
  @Prop() size: 'md' | 'sm' = 'md';
  /**
   * @locale {en} The value associated with the checkbox. This is the data that will be returned when the checkbox is checked. It is used to identify the checkbox in the context of the form or group.
   * @locale {zh} 与多选框关联的值。当多选框被选中时，将返回此数据。用于在表单或组的上下文中识别该多选框。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: string | number;
  /**
   * @locale {en} Whether to force the checkbox to ignore the KsCheckboxGroup management. If set to `true`, the checkbox's checked state can be independently controlled, even if it is nested within a KsCheckboxGroup.
   * @locale {zh} 是否强制多选框脱离 KsCheckboxGroup 的管理。如果为 `true`，则该 Checkbox 的选中状态可以独立控制，即使其祖先组件中存在 KsCheckboxGroup。
   */
  @Prop() forceIgnoreGroup = false;
  /**
   * @locale {en} Custom event triggered when the checked state of the checkbox changes. It returns the new value of the checkbox, allowing the parent component to react to the change.
   * @locale {zh} 当多选框的选中状态发生变化时触发的自定义事件。返回多选框的新值，允许父组件对变化做出反应。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<boolean>; // 禁止冒泡，防止事件冒泡到group组件的valuechange事件
  @Listen('ksChange')
  onKsChange(event: CustomEvent<boolean>) {
    sendActionTracking(this.el, { eventType: 'change', componentParams: { value: event.detail } });

    // FIXME: stencil extend does not support 2 listener on same event
    this.onKsChangeForForm(event);
  }

  @State() _checked = false;

  /**
   * @locale {en} Used to fully customize the label part
   * @locale {zh} 用于完全自定义label部分
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'label' }) labelSlot: Slots;
  /**
   * @locale {en} The slot for the description of the checkbox.
   * @locale {zh} 多选框描述的插槽。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'description' }) descriptionSlots: Slots;
  /**
   * @locale {en} The slot for the suffix of the checkbox.
   * @locale {zh} 多选框后缀的插槽。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;

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
    registerPluginManager(this.el);
  }

  /**
   * 用于阻止 description 的点击事件被劫持，只触发 handleValueChange
   * @param event 事件对象
   */
  preventDefault(event: Event) {
    event.preventDefault();
  }

  handleValueChange = (event: Event) => {
    if (this.disabled) {
      return;
    }
    const value = (event.target as HTMLInputElement).checked;
    this.ksChange.emit(value);
    !this.forceIgnoreGroup && this.parentEl?._change(this.value);
    if (this.checked === undefined) {
      this._checked = value;
    }
    sendActionTracking(this.el, { eventType: 'change', componentParams: { value } });
    forceUpdate(this.el);
  };

  updateParentValue = (e: CustomEvent) => {
    this.parentValue = e.detail;
    forceUpdate(this.el);
  };

  watchParentProps = (e: CustomEvent) => {
    this.disabled = e.detail?.disabled || this.disabled;
  };

  addBroadcastEventListener() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.parentEl?.removeEventListener('ks-checkbox-broadcast', this.updateParentValue);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.parentEl?.addEventListener('ks-checkbox-broadcast', this.updateParentValue);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.parentEl?.removeEventListener('ks-checkbox-props-broadcast', this.watchParentProps);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.parentEl?.addEventListener('ks-checkbox-props-broadcast', this.watchParentProps);
  }

  componentWillLoad() {
    this.parentEl = getTargetParentComponent(this.el, 'ks-checkbox-group');
    if (this.parentEl) {
      this.parentValue = this.parentEl?._getValue?.();
    }
    this._checked = this.defaultChecked;
    if (this.checked !== undefined) {
      this._checked = this.checked;
    }
    this.addBroadcastEventListener();
  }

  override connectedCallback() {
    super.connectedCallback?.();
    this.addBroadcastEventListener();
  }

  disconnectedCallback() {
    if (!this.el.isConnected) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.parentEl?.removeEventListener('ks-checkbox-broadcast', this.updateParentValue);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.parentEl?.removeEventListener('ks-checkbox-props-broadcast', this.watchParentProps);
    }
  }

  componentDidLoad() {
    if (this.parentEl) {
      this.disabled = this.parentEl?.disabled || this.disabled;
    }
  }

  render() {
    const checked =
      this.parentValue !== undefined && !this.forceIgnoreGroup ? this.parentValue.includes(this.value) : this._checked;
    const classes = classnames(`${prefix}`, `${prefix}--${this.size}`, {
      [`${prefix}--disabled`]: this.disabled,
      [`${prefix}--checked`]: checked,
      [`${prefix}--${this.status}`]: this.status,
      [`${prefix}--indeterminate`]: this.indeterminate,
      [`${prefix}--align-${this.align}`]: this.align,
    });
    const displayClassPrefix = `${prefix}__display`;
    return (
      <Host
        dir={dir()}
        ks-checkbox
        role="checkbox"
        aria-checked={this.indeterminate && this._checked ? 'mixed' : `${this._checked}`}
      >
        <label dir={dir()} class={classes} part="self">
          <input
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            ref={(el) => (this.inputEl = el)}
            onChange={this.handleValueChange}
            class={`${prefix}__input`}
            type="checkbox"
            disabled={this.disabled}
            checked={checked}
            data-testid="ks-checkbox-index-hCMjrk"
          />

          <span class={`${displayClassPrefix}`} part="display">
            {checked && !this.indeterminate && <SvgCheck className={`${`${displayClassPrefix}`}__icon`} />}
            {this.indeterminate && <SvgCheckIndeterminate className={`${`${displayClassPrefix}`}__icon`} />}
          </span>
          <slot name="label">
            <div class={`${prefix}__label`}>
              <span part="label" id="content">
                <slot></slot>
                {this.descriptionSlots && this.descriptionStyle === 'tooltip' && (
                  <ks-tooltip id="desc" class="tooltip">
                    <ks-icon-help size={this.size === 'sm' ? 14 : 16} />
                    <slot name="description" slot="content"></slot>
                  </ks-tooltip>
                )}

                {this.suffixSlot && <slot name="suffix"></slot>}
              </span>
              {this.descriptionSlots && this.descriptionStyle !== 'tooltip' && (
                <ks-text
                  variant="labelSm"
                  theme="neutral"
                  onClick={this.preventDefault.bind(this)}
                  data-testid="ks-checkbox-index-daBaBq"
                >
                  <slot name="description"></slot>
                </ks-text>
              )}
            </div>
          </slot>
        </label>
      </Host>
    );
  }
}
