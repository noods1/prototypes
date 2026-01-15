import { Component, h, Prop, Event, EventEmitter, Element, State, Watch, Host, Method } from '@stencil/core';
import { Slot, Slots } from '@src/utils/decorators';
import { FormContextValueReconcile } from '@src/utils/form/FormContextValueReconcile';
import classnames from 'classnames';
import { dir } from '@src/utils/utils';
import { CheckboxGroupValue, CheckboxValue, Orientation } from '../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';

const prefix = 'checkbox-group';

@Component({
  tag: 'ks-checkbox-group',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCheckboxGroup extends FormBaseComponent<CheckboxGroupValue> {
  ['ks-name'] = 'ks-checkbox-group';
  /**
   * @locale {en} Determine whether all checkboxes in the group are disabled. When set to `true`, none of the checkboxes can be interacted with by the user.
   * @locale {zh} 用于确定组中的所有多选框是否被禁用。设置为 `true` 时，用户无法与任何多选框进行交互。
   */
  @Prop() disabled = false;
  /**
   * @locale {en} An array of values representing the currently selected checkboxes in the group. This array contains the values of the checkboxes that are checked by the user.
   * @locale {zh} 表示当前选中多选框组中已选中的多选框的值数组。该数组包含用户所选中的多选框的值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() @FormContextValueReconcile() value: CheckboxGroupValue;
  /**
   * @locale {en} An array of values that sets the initial selected state of the checkboxes when the component is first rendered. This value does not change after the initial render.
   * @locale {zh} 一个值数组，用于设置组件首次渲染时多选框的初始选中状态。此值在初始渲染后不会改变。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() defaultValue: CheckboxGroupValue;
  /**
   * @locale {en} Determine the layout of the checkboxes. When set to `true`, the checkboxes are arranged vertically; when set to `false`, they are arranged horizontally.
   * @locale {zh} 用于确定多选框的布局。设置为 `true` 时，多选框垂直排列；设置为 `false` 时，水平排列。
   */
  @Prop() orientation: Orientation = 'horizontal';

  /**
   * @locale {en} The gap between checkboxes in the group.
   * @locale {zh} 多选框组中多选框之间的间距。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() gap: string | number;

  /**
   * @locale {en} Custom event triggered when the selected values in the checkbox group change. It returns the new array of selected values, allowing the parent component to react to the changes.
   * @locale {zh} 当多选框组中的选中值发生变化时触发的自定义事件。返回新的选中值数组，允许父组件对变化做出反应。
   */
  @Event({ bubbles: false, composed: false }) ksChange!: EventEmitter<CheckboxGroupValue>;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  // 内部变量 ----
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsCheckboxGroupElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default' }) defaultSlots: Slots;

  // 内部状态 ----
  @State() currentValue: CheckboxGroupValue = [];
  @Watch('currentValue')
  currentValueWatcher(val: CheckboxGroupValue) {
    this.el.dispatchEvent(
      new CustomEvent('ks-checkbox-broadcast', {
        detail: val,
      }),
    );
  }

  @Watch('value')
  valueWatcher(newVal: CheckboxGroupValue) {
    this.currentValue = newVal;
  }

  @Watch('defaultValue')
  defaultValueWatcher(val: CheckboxGroupValue) {
    if (this.value === undefined) {
      this.currentValue = val;
    }
  }

  @Watch('disabled')
  disabledWatcher(val: boolean) {
    this.dispatchPropsUpdate('disabled', val);
  }

  /**
   * @private 内部方法，勿用
   */
  @Method()
  async _change(val: CheckboxValue) {
    const currentValue = this.currentValue.slice();
    currentValue.includes(val) ? currentValue.splice(currentValue.indexOf(val), 1) : currentValue.push(val);
    this.ksChange.emit(currentValue);
    if (this.value === undefined) {
      this.currentValue = currentValue;
    }
  }
  /**
   * > 内部方法，勿用
   */
  _getValue() {
    return this.currentValue ?? this.value;
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  dispatchPropsUpdate(key: string, value) {
    this.el.dispatchEvent(
      new CustomEvent('ks-checkbox-props-broadcast', {
        detail: {
          [key]: value,
        },
      }),
    );
  }

  componentDidLoad() {
    // 此处生命周期必须用did load。因为will load在子组件will load前执行，而did load在子组件did load后执行，为了把有效值传入子组件，要保证子组件监听broadcast事件后触发emit
    this.currentValue = this.defaultValue;
    if (this.value !== undefined) {
      this.currentValue = this.value;
    }
    this.dispatchPropsUpdate('disabled', this.disabled);
  }

  render() {
    const classes = classnames([`${prefix}`, `${prefix}--${this.orientation}`]);
    return (
      <Host dir={dir()} ks-checkbox-group>
        <div
          dir={dir()}
          class={classes}
          style={{
            gap: typeof this.gap === 'number' ? `${this.gap}px` : this.gap,
          }}
          part="self"
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
