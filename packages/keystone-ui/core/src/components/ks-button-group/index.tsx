import { ButtonGroupContext, ButtonGroupContextValue, POSITIONTAG } from '@src/context/button-group-context';
import { FormContext } from '@src/context/form-context';
import { Provide } from '@src/libs/runtime-context';
import { Slot, Slots } from '@src/utils/decorators';
import { Uncontrollable } from '@src/utils/decorators/uncontrollable';
import { generateUniqueId } from '@src/utils/utils';
import {
  Component,
  type ComponentInterface,
  Element,
  Event,
  type EventEmitter,
  Host,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';
const prefix = 'button-group';

@Component({
  tag: 'ks-button-group',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsButtonGroup implements ComponentInterface {
  ['ks-name'] = 'ks-button-group';
  @Element() el!: HTMLKsButtonGroupElement;

  /**
   * @locale {en} Used to block subcomponents from getting the form context
   * @locale {zh} 用于阻止子组件获取到表单上下文
   */
  @Provide({
    context: FormContext,
  })
  __contextBlocker = {};

  @Provide({
    context: ButtonGroupContext,
  })
  buttonGroupContext: ButtonGroupContextValue = {
    htmlName: '',
    disabled: undefined,
    value: undefined,
    onValueChange: (value: string) => {
      if (this.multiple) {
        if (this.internalValueState?.includes(value)) {
          this.internalValueState = this.internalValueState.filter((item) => item !== value);
        } else {
          this.internalValueState = [...(this.internalValueState || []), value].sort();
        }
      } else {
        this.internalValueState = [value];
      }
    },
  };

  /**
   * @locale {en} The htmlname of the group button.
   * @locale {zh} 组合按钮的 html 名称。
   */
  @Prop() htmlName: string = generateUniqueId();
  /**
   * @locale {en} Indicates whether the group button is disabled. When `true`, the user will not be able to interact with the buttons.
   * @locale {zh} 指示组合按钮是否被禁用。当为 `true` 时，用户将无法与按钮进行交互。
   */
  @Prop() disabled?: boolean;
  /**
   * @locale {en} The default value of the group button when the component is first rendered.
   * @locale {zh} 组件首次渲染时的默认值。
   */
  @Prop() defaultValue?: string[];
  /**
   * @locale {en} The current value of the group button. This determines the selected item(s) in the group.
   * @locale {zh} 组合按钮的当前值。此属性决定组中已选中的项。
   */
  @Prop() value?: string[];

  @Uncontrollable('value', 'defaultValue', 'ksChange') @State() internalValueState?: string[];
  /**
   * @locale {en} The current value of the group button.
   * @locale {zh} 组合按钮是否可多选。
   */
  @Prop() multiple = false;
  /**
   * @deprecated please use `multiple` instead
   * @locale {en} [DEPRECATED] The current value of the group button.
   * @locale {zh} [DEPRECATED] 组合按钮是否可多选。
   */
  @Prop() isMultiple?: boolean;

  @Watch('isMultiple')
  handleIsMultipleChange() {
    this.isMultiple !== undefined && (this.multiple = this.isMultiple);
  }

  /**
   * @locale {en} Custom event triggered when the selected value changes. This event can be used to execute additional actions when the selection is modified.
   * @locale {zh} 选中的值更改时触发的自定义事件。此事件可用于在选择更改时执行额外的操作。
   */
  @Event() ksChange!: EventEmitter<string[]>;

  @Slot({ slotname: '_default' }) defaultSlots?: Slots;

  @Watch('htmlName')
  @Watch('disabled')
  @Watch('multiple')
  @Watch('internalValueState')
  handleContextValueChange() {
    this.buttonGroupContext = {
      ...this.buttonGroupContext,
      htmlName: this.htmlName,
      disabled: this.disabled,
      value: this.internalValueState,
      multiple: this.multiple,
    };
  }

  handleDefaultSlotsChange() {
    const positionMap = (this.defaultSlots || []).reduce<WeakMap<HTMLKsButtonGroupItemElement, POSITIONTAG>>(
      (prev, cur, idx, slots) => {
        const currentGroupItem = cur as HTMLKsButtonGroupItemElement;
        if (idx === 0) {
          prev.set(currentGroupItem, POSITIONTAG.START);
        } else if (idx === slots.length - 1) {
          prev.set(currentGroupItem, POSITIONTAG.END);
        } else {
          prev.set(currentGroupItem, POSITIONTAG.COMMON);
        }
        return prev;
      },
      new WeakMap(),
    );
    this.buttonGroupContext = {
      ...this.buttonGroupContext,
      positionMap,
    };
  }

  componentWillLoad(): Promise<void> | void {
    this.handleContextValueChange();

    this.handleIsMultipleChange();
  }

  componentDidLoad(): void {
    this.handleDefaultSlotsChange();
  }

  render() {
    return (
      <Host ks-button-group>
        <div class={prefix} part="base">
          <slot />
        </div>
      </Host>
    );
  }
}
