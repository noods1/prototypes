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
import { Size, RadioValue, Status } from '../../entities';
import { Slot, Slots } from '@src/utils/decorators';
import { FormContextValueReconcile } from '@src/utils/form/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking } from '@src/utils/tracking';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';

const prefix = 'radio';

/**
 * @slot description - Slot for providing additional descriptive text for the radio option.
 * @slot content - Slot for adding custom functional components or complex structures alongside the radio button.
 * @slot label - Slot for the label.
 * @slot suffix - Slot for the suffix.
 */
@Component({
  tag: 'ks-radio',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsRadio extends FormBaseComponent<boolean> {
  ['ks-name'] = 'ks-radio';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsRadioElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  parentEl: HTMLKsRadioGroupElement & { _getValue: () => RadioValue };
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() parentValue: RadioValue;
  // /**
  //  * switch 尺寸
  //  */
  // @Prop() size: Size = 'md';
  // 只有 md 尺寸的设计
  size: Size = 'md';
  /**
   * @locale {en} Determines the vertical alignment of the radio button and its label/content. Can be 'flex-start' or 'center'.
   * @locale {zh} 决定单选按钮及其标签/内容的垂直对齐方式。可选值为 'flex-start' 或 'center'。
   */
  @Prop() align: 'flex-start' | 'center' = 'flex-start';
  /**
   * @locale {en} Indicates whether the radio button is disabled. When `true`, the radio button will be inactive and unselectable.
   * @locale {zh} 指示单选框是否被禁用。当为 `true` 时，单选框将处于非激活状态，无法选择。
   */
  @Prop({ mutable: true }) @FormContextValueReconcile() disabled?: boolean;
  /**
   * @locale {en} The status of the radio. Can be one of the following values: `success`, `error`, `warning`, `default`.
   * @locale {zh} 单选框的状态。可以是以下值之一：`success`、`error`、`warning`、`default`。
   */
  @Prop() @FormContextValueReconcile() status?: Status;
  /**
   * @locale {en} Indicates whether the radio button is currently checked. When true, the radio button will be selected.
   * @locale {zh} 指示单选框当前是否被选中。当为 true 时，单选框将被选中。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @FormContextValueReconcile({ contextKey: 'valueFromContext' }) checked: boolean;

  @State() _checked = false;
  /**
   * @locale {en} The default checked state of the radio button when the component is first rendered.
   * @locale {zh} 组件首次渲染时的默认选中状态。
   */
  @Prop() defaultChecked = false;
  /**
   * @locale {en} The value of the radio button, typically representing the ID of the current option in a radio group.
   * @locale {zh} 单选框的值，通常表示在单选框组中的当前选项的 ID。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: RadioValue;
  /**
   * @locale {en} The style of the description for the radio button. Can be one of the following values: `tooltip` or `label`.
   * @locale {zh} 单选框描述的样式，可以是 tooltip 或 label。可选值为 `tooltip` 或 `label`。
   */
  @Prop() descriptionStyle: 'tooltip' | 'label' = 'label';
  /**
   * @locale {en} Custom event triggered when the checked state of the radio button changes. This event can be used to execute additional actions upon selection change.
   * @locale {zh} 单选框选中状态更改时触发的自定义事件。此事件可用于在选择状态更改时执行额外的操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<boolean>; // 禁止冒泡，防止事件冒泡到radio group组件的valuechange事件
  @Listen('ksChange')
  onKsChange(event: CustomEvent<boolean>) {
    sendActionTracking(this.el, { eventType: 'change', componentParams: { value: event.detail } });

    // FIXME: stencil extend does not support 2 listener on same event
    this.onKsChangeForForm(event);
  }
  /**
   * @locale {en} The slot for the description of the radio button.
   * @locale {zh} 单选框描述的插槽。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'description' }) descriptionSlots: Slots;
  /**
   * @locale {en} Used to fully customize the label part
   * @locale {zh} 用于完全自定义label部分
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'label' }) labelSlot: Slots;
  /**
   * @locale {en} Used to customize and add some functional components
   * @locale {zh} 用于自定义添加一些功能组件
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'content' }) contentSlot: Slots;
  /**
   * @locale {en} The slot for the suffix of the radio button.
   * @locale {zh} 单选框后缀的插槽。
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
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  get mergedChecked() {
    return this.parentValue !== undefined ? this.parentValue === this.value : this._checked;
  }

  handleValueChange(event: Event & { target: HTMLInputElement }) {
    const value = event.target.checked;
    // 原生 HTML 元素本身是非受控的，因此其状态必须被手动与受控状态同步，否则可能导致受控模式失灵
    event.target.checked = this.mergedChecked;
    if (this.disabled) {
      return;
    }
    this.ksChange?.emit(value);
    this.parentEl?._change(this.value);
    if (this.checked === undefined) {
      this._checked = value;
    }
    sendActionTracking(this.el, { eventType: 'change', componentParams: { value } });
    forceUpdate(this.el);
  }

  updateParentValue = (e: CustomEvent) => {
    this.parentValue = e.detail;
    forceUpdate(this.el);
  };

  watchParentProps = (e: CustomEvent) => {
    this.disabled = e.detail?.disabled;
  };

  addBroadcastEventListener() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.parentEl?.removeEventListener('ks-radio-broadcast', this.updateParentValue);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.parentEl?.addEventListener('ks-radio-broadcast', this.updateParentValue);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.parentEl?.removeEventListener('ks-radio-props-broadcast', this.watchParentProps);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.parentEl?.addEventListener('ks-radio-props-broadcast', this.watchParentProps);
  }

  async componentDidLoad() {
    this.parentEl = getTargetParentComponent(this.el, 'ks-radio-group');
    this.addBroadcastEventListener();
    const pValue = this.parentEl?._getValue?.();
    this.parentValue = pValue;
    this._checked = this.defaultChecked;
    if (this.checked !== undefined) {
      this._checked = this.checked;
    }
    if (this.parentEl) {
      this.disabled = this.parentEl?.disabled;
    }
  }

  override connectedCallback() {
    super.connectedCallback?.();
    this.addBroadcastEventListener();
  }

  disconnectedCallback() {
    if (!this.el.isConnected) {
      // 真实被删除
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.parentEl?.removeEventListener('ks-radio-broadcast', this.updateParentValue);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.parentEl?.removeEventListener('ks-radio-props-broadcast', this.watchParentProps);
    }
  }

  render() {
    const checked = this.mergedChecked;
    const displayClassPrefix = `${prefix}__display`;
    const classes = classnames(`${prefix}`, `${prefix}--size-${this.size}`, {
      [`${prefix}--disabled`]: this.disabled,
      [`${prefix}--checked`]: checked,
      [`${prefix}--${this.status}`]: this.status,
      [displayClassPrefix]: true,
    });
    const containerClasses = classnames('container', {
      ['radio-disabled']: this.disabled,
      [`${prefix}--align-${this.align}`]: this.align,
    });
    return (
      <Host dir={dir()} ks-radio>
        <div class={containerClasses}>
          <input
            part="self"
            id="input"
            class={classes}
            type="radio"
            aria-labelledby="label"
            aria-describedby="desc"
            disabled={this.disabled}
            checked={checked}
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            onChange={this.handleValueChange.bind(this)}
            data-testid="ks-radio-index-8AA75q"
          />

          <slot name="label">
            <div>
              <div id="texts" class={classnames({ disabled: this.disabled })}>
                <label id="label" htmlFor="input">
                  <slot></slot>
                  {this.descriptionSlots && this.descriptionStyle !== 'tooltip' && (
                    <span id="desc" class={`contentDesc ${this.disabled ? 'desc-disabled' : ''}`}>
                      <slot name="description"></slot>
                    </span>
                  )}
                </label>
                {this.descriptionSlots && this.descriptionStyle === 'tooltip' && (
                  <ks-tooltip visible={this.disabled ? false : undefined} id="desc" class="tooltip">
                    <ks-icon-help size="14" />
                    <slot name="description" slot="content"></slot>
                  </ks-tooltip>
                )}
                {this.suffixSlot && <slot name="suffix"></slot>}
              </div>
              {this.contentSlot && (
                <div class={'content-slot'}>
                  <slot name="content"></slot>
                </div>
              )}
            </div>
          </slot>
        </div>
      </Host>
    );
  }
}
