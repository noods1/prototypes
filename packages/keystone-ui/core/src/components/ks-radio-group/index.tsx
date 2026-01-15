import { Component, h, Prop, Event, EventEmitter, Element, State, Watch, Host, Method } from '@stencil/core';
import { Slot, Slots } from '@src/utils/decorators';
import classnames from 'classnames';
import { RadioValue, Orientation } from '../../entities';
import { dir } from '@src/utils/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';
import { FormContextValueReconcile } from '@src/utils/form/FormContextValueReconcile';

const prefix = 'radio-group';

@Component({
  tag: 'ks-radio-group',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsRadioGroup extends FormBaseComponent<RadioValue> {
  ['ks-name'] = 'ks-radio-group';
  /**
   * @locale {en} Indicates whether the entire radio group is disabled. When `true`, all radio buttons within the group will be inactive and unselectable.
   * @locale {zh} 指示整个单选框组是否被禁用。当为 `true` 时，组内的所有单选框将处于非活动状态，无法选择。
   */
  @Prop() @FormContextValueReconcile() disabled?: boolean;

  /**
   * @locale {en} The current value of the selected radio button in the group. This represents the selected option ID in the radio group.
   * @locale {zh} 当前单选框组中选中的单选框的值。表示单选框组中选中的选项 ID。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() @FormContextValueReconcile() value: RadioValue;
  /**
   * @locale {en} The default value of the radio group when the component is first rendered.
   * @locale {zh} 组件首次渲染时单选框组的默认值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() defaultValue: RadioValue;
  /**
   * @locale {en} Indicates whether the radio buttons in the group should be arranged vertically. When `true`, the radio buttons will be stacked in a vertical layout.
   * @locale {zh} 指示单选框组中的单选框是否应垂直排列。当为 `true` 时，单选框将以垂直布局堆叠。
   */
  @Prop() orientation: Orientation = 'horizontal';

  /**
   * @locale {en} The gap between radio buttons in the group.
   * @locale {zh} 单选框组中单选框之间的间距。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() gap: string | number;

  /**
   * @locale {en} Custom event triggered when the selected radio button in the group changes. This event can be used to execute additional actions upon selection change.
   * @locale {zh} 单选框组中选中项更改时触发的自定义事件。此事件可用于在选择状态更改时执行额外的操作。
   */
  @Event({ bubbles: false, composed: false }) ksChange!: EventEmitter<RadioValue>;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  // 内部变量 ----
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsRadioGroupElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default' }) defaultSlots: Slots;

  // 内部状态 ----
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() currentValue: RadioValue;
  @Watch('currentValue')
  currentValueWatcher(val: RadioValue) {
    this.el.dispatchEvent(
      new CustomEvent('ks-radio-broadcast', {
        detail: val,
      }),
    );
  }

  @Watch('value')
  valueWatcher(newVal: RadioValue) {
    this.currentValue = newVal;
  }

  @Watch('defaultValue')
  defaultValueWatcher(val: RadioValue) {
    if (this.value === undefined) {
      this.currentValue = val;
    }
  }

  @Watch('disabled')
  disabledWatcher(val: RadioValue) {
    this.dispatchPropsUpdate('disabled', val);
  }

  /**
   * @private 内部方法，勿用
   */
  @Method()
  async _change(val: RadioValue) {
    if (this.value === undefined) {
      this.currentValue = val;
    }
    this.ksChange?.emit(val);
  }
  _getValue(): RadioValue {
    return this.currentValue ?? this.value;
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  dispatchPropsUpdate(key: string, value) {
    this.el.dispatchEvent(
      new CustomEvent('ks-radio-props-broadcast', {
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
      <Host dir={dir()} ks-radio-group>
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
