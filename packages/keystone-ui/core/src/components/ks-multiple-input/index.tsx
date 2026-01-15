import { Component, h, Prop, Element, Event, EventEmitter, State, Host, Watch } from '@stencil/core';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, t } from '@src/utils/utils';
import { Status } from '../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { inputMessages } from '@fe-infra/keystone-locales';
import { FormContextValueReconcile, getReconciledFormContextData } from '@src/utils/form/utils';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';

const prefix = 'multiple-input';

/**
 * @slot prefix - Allows customization of the content displayed before the input field area.
 * @slot suffix - Allows customization of the content displayed after the input field area.
 */
@Component({
  tag: 'ks-multiple-input',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsMultipleInput extends FormBaseComponent<string[]> {
  ['ks-name'] = 'ks-multiple-input';
  @Element() el!: HTMLKsMultipleInputElement;

  inputEl!: HTMLInputElement;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  contentEl: HTMLInputElement;

  /**
   * @locale {en} Represents the 'prefix' slot, allowing custom content to be placed before the main input area.
   * @locale {zh} 代表 'prefix' 插槽，允许在主输入区域之前放置自定义内容。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'prefix' }) prefixSlot: Slots;
  /**
   * @locale {en} Represents the 'suffix' slot, allowing custom content to be placed after the main input area.
   * @locale {zh} 代表 'suffix' 插槽，允许在主输入区域之后放置自定义内容。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;
  /**
   * @locale {en} Represents the default slot, used for passing through content to an underlying presenter component.
   * @locale {zh} 代表默认插槽，用于将内容传递给底层的呈现器组件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default' }) defaultSlot: Slots;

  /**
   * @locale {en} The current values entered in the multiple input field. It's an array of strings.
   * @locale {zh} 多项输入框中当前已输入的值。它是一个字符串数组。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() @FormContextValueReconcile() value: string[];
  /**
   * @locale {en} Placeholder text displayed in the input area when it's empty and no values have been added.
   * @locale {zh} 当输入区域为空且尚未添加任何值时显示的占位符文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() placeholder: string;
  // /**
  //  * @locale {en} Indicates whether the input field should automatically receive focus when the component loads.
  //  * @locale {zh} 指示输入框是否在组件加载时自动获取焦点。
  //  */
  // @Prop() autoFocus = false;

  /**
   * @locale {en} The width of the multiple input component. Can be a number (in pixels) or a string (e.g., '100%').
   * @locale {zh} 多项输入组件的宽度。可以是数字（像素单位）或字符串（例如 '100%'）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() width: number | string;
  /**
   * @locale {en} The maximum height (in pixels) the input area can expand to when multiple values are present.
   * @locale {zh} 当存在多个值时，输入区域可扩展到的最大高度（像素单位）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() maxHeight: number;
  /**
   * @locale {en} Indicates whether the multiple input field is disabled. When `true`, interaction is not possible.
   * @locale {zh} 指示多项输入框是否禁用。当值为 `true` 时，无法进行交互。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;

  /**
   * @locale {en} Indicates whether a clear button is available to remove all entered values.
   * @locale {zh} 指示是否提供清除按钮以移除所有已输入的值。
   */
  @Prop() clearable = false;
  /**
   * @locale {en} Indicates whether to collapse the display of multiple selected values into a summary (e.g., "2 items selected").
   * @locale {zh} 指示是否将多个选定值的显示折叠为摘要（例如“已选2项”）。
   */
  @Prop() collapse = false;

  /**
   * @description 私有参数，外部慎用
   */
  @Prop() readonly = false;

  /**
   * @locale {en} Emitted when the array of selected values changes (item added or removed via clearable/backspace on tag). The event detail is the new array of values.
   * @locale {zh} 当选定值的数组发生更改（通过可清除按钮或在标签上按退格键添加或移除项目）时发出。事件详细信息是新的值数组。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<string[]>;
  /**
   * @locale {en} The validation status of the input field (e.g., "error", "warning").
   * @locale {zh} 输入框的验证状态（例如 "error"、"warning"）。
   */
  @Prop() status?: Status;

  /**
   * @locale {en} Controls whether the input element should be focused, managed by an external state.
   * @locale {zh} 控制输入元素是否应获得焦点，由外部状态管理。
   */
  @Prop() focusElement = false;

  /**
   * @locale {en} Emitted when a single value (tag) is removed, typically by pressing Backspace on an empty input field when tags are present. The event detail is the value of the removed tag.
   * @locale {zh} 当单个值（标签）被移除时发出，通常是在存在标签时在空输入字段上按退格键。事件详细信息是被移除标签的值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksRemove: EventEmitter<string[]>;
  /**
   * @locale {en} Custom event triggered when the input field loses focus.
   * @locale {zh} 当输入框失去焦点时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksBlur: EventEmitter<FocusEvent>;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  @State() focus = false;

  @State() placeholderShowable = true;

  @State() composition = false;

  @State() renderValue = [];

  @Watch('value')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  watchValue(val) {
    if (val) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.renderValue = val.map((item) => ({ label: item, key: item }));
    } else {
      this.renderValue = [];
    }
  }

  componentWillLoad() {
    this.watchValue(this.value);
  }

  render() {
    const { disabled, status } = getReconciledFormContextData(this);
    const focus = this.focusElement || this.focus;

    return (
      <Host dir={dir()} ks-multiple-input>
        <ks-fields-presenter
          exportparts="field: field"
          class={prefix}
          width={this.width}
          value={this.renderValue}
          innerPaddingUse
          onClick={() => {
            if (disabled) {
              return;
            }
            this.inputEl?.focus?.();
            this.focus = true;
          }}
          onBlur={(e) => {
            // 因为点击 clear 的时候会触发blur，导致focus=false，所以需要延迟200ms
            setTimeout(() => {
              this.focus = false;
            }, 200);
            this.ksBlur.emit(e);
          }}
          onKsRemove={({ detail }) => this.ksRemove.emit(detail.map((item) => item.label))}
          showInput={true}
          focusElement={focus}
          status={status}
          maxHeight={this.maxHeight}
          collapse={this.collapse}
          placeholder={this.placeholder ?? t(inputMessages.placeholder)}
          clearable={this.clearable}
          onKsChange={(event) => {
            const { detail } = event;
            if (!this.value) {
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              this.renderValue = detail;
            }
            this.ksChange.emit(detail.map((item) => item.key.toString()));
          }}
          disabled={disabled}
          data-testid="ks-multiple-input-index-32FQss"
        >
          {/* 输入框透传slot */}
          {this.prefixSlot && <slot slot="prefix" name="prefix"></slot>}
          {this.suffixSlot && <slot slot="suffix" name="suffix"></slot>}
          {this.defaultSlot && <slot></slot>}
        </ks-fields-presenter>
      </Host>
    );
  }
}
