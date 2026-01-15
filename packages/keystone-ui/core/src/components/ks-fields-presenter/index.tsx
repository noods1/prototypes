import { Component, h, Prop, Element, Event, EventEmitter, State, Host, Watch, forceUpdate } from '@stencil/core';
import classnames from 'classnames';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, t } from '@src/utils/utils';
import { Status, IPresenterInputSize, IPresenterValue, IPresenteInnerValue, GeneralFormValue } from '../../entities';
import outclick from '@src/utils/outclick';
import { getReconciledFormContextData } from '@src/utils/form/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { inputMessages } from '@fe-infra/keystone-locales';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';

const prefix = 'fields-presenter';
const wrapperHeightMap = {
  md: '36px',
  sm: '24px',
};

const contentHeightMap = {
  md: '28px',
  sm: '22px',
};

const tagSizeMap = {
  md: 'lg',
  sm: 'sm',
};

const PADDING = 48;
const PADDING_WITH_ICON = 62;
const ICON_WITH = 19;
const SCROLLBAR_WIDTH = 4;
const ICON_MARGIN = 8;
/**
 * @slot prefix - Slot for prefix content.
 * @slot suffix - Slot for suffix content.
 * @slot close-icon - Slot for the clear icon.
 * @slot placeholder - Slot for custom placeholder content. Overrides the `placeholder` prop.
 */
@Component({
  tag: 'ks-fields-presenter',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsFieldsPresenter extends FormBaseComponent<GeneralFormValue> {
  // TODO
  ['ks-name'] = 'ks-fields-presenter';
  // eslint-disable-next-line no-undef
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsFieldsPresenterElement;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  contentEl: HTMLElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  inputEl: HTMLInputElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  containerEl: HTMLElement;
  /**
   * @locale {en} The component that display in the suffix area
   * @locale {zh} 后缀图标的区域
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;

  /**
   * @locale {en} The component that display in the prefix area
   * @locale {zh} 前缀图标的区域。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'prefix' }) prefixSlot: Slots;
  /**
   * @locale {en} The current value of the fields presenter, an array of objects representing selected items.
   * @locale {zh} 当前字段展示器的值，一个表示所选项目的对象数组。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IPresenterValue[];
  /**
   * @locale {en} The default value of the fields presenter, an array of objects representing initially selected items. Used if `value` is not provided.
   * @locale {zh} 字段展示器的默认值，一个表示初始选中项目的对象数组。如果未提供 `value`，则使用此值。
   */
  @Prop() defaultValue: IPresenterValue[] = [];
  /**
   * @locale {en} Placeholder text to display when no items are selected.
   * @locale {zh} 未选择任何项目时显示的占位符文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() placeholder: string;
  /**
   * @locale {en} The size of the input field. Can be `'md'` or `'sm'`. Default: `'md'`.
   * @locale {zh} 输入框的尺寸。可选值为 `'md'` 或 `'sm'`。默认：`'md'`。
   */
  @Prop() size: IPresenterInputSize = 'md';

  /**
   * @locale {en} The width of the input field. Can be a number (in pixels) or a string (e.g., '100%').
   * @locale {zh} 输入框的宽度。可以是数字（像素单位）或字符串（例如 '100%'）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() width: number | string; // FIXME 为什么作为表单类组件默认不是 100% 宽度
  /**
   * @locale {en} The maximum height of the input field in pixels.
   * @locale {zh} 输入框的最大高度，单位为像素。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() maxHeight: number;
  /**
   * @locale {en} Whether the fields presenter is disabled. If `true`, interaction is not allowed.
   * @locale {zh} 字段展示器是否禁用。如果为 `true`，则不允许交互。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /**
   * @locale {en} Whether to display a clear button to remove all selected items.
   * @locale {zh} 是否显示清除按钮以移除所有选中的项目。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() clearable: boolean;
  /**
   * @locale {en} Whether to collapse multiple selected items into a summary view. Default: `true`.
   * @locale {zh} 是否将多个选中的项目折叠成摘要视图。默认：`true`。
   */
  @Prop() collapse = true;

  /**
   * @locale {en} Whether to use inner padding for the presenter. Default: `false`.
   * @locale {zh} 是否为展示器使用内部边距。默认：`false`。
   */
  @Prop() innerPaddingUse = false;

  /**
   * @locale {en} An array of HTML elements that should not trigger the "outclick" behavior (closing or collapsing the presenter).
   * @locale {zh} 一个 HTML 元素数组，这些元素不应触发“外部点击”行为（关闭或折叠展示器）。
   */
  @Prop() unEmitOutClickEls: HTMLElement[] = [];

  /**
   * 自定义渲染tag函数
   * @private
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() renderTag: (value: IPresenterValue) => HTMLElement;
  /**
   * 自定义placeholder
   */
  @Prop() renderPlaceholder: () => HTMLElement = () => (
    <div class={`${prefix}__placeholder`}>{this.placeholder ?? t(inputMessages.placeholder)}</div>
  );

  /**
   * @locale {en} Emitted when the selected items change. The event detail contains an array of the new selected items.
   * @locale {zh} 当选中的项目更改时发出。事件详细信息包含新选中项目的数组。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<IPresenterValue[]>;

  /**
   * @locale {en} Whether the fields presenter should automatically attempt to focus.
   * @locale {zh} 字段展示器是否应自动尝试获取焦点。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() focusElement: boolean;
  /**
   * @locale {en} Whether individual selected items can be removed. Default: `true`.
   * @locale {zh} 是否可以移除单个选中的项目。默认：`true`。
   */
  @Prop() removable = true;
  /**
   * @locale {en} A function to transform the raw data item into the `IPresenteInnerValue` format used internally.
   * @locale {zh} 一个函数，用于将原始数据项转换为内部使用的 `IPresenteInnerValue` 格式。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() generateKeyValue: (context: unknown) => IPresenteInnerValue;
  /**
   * @locale {en} Whether to display a count of the selected items.
   * @locale {zh} 是否显示选中项目的计数。
   */
  // @Prop() showCount: boolean;
  /**
   * @locale {en} The validation status of the input field. Can be `'success'`, `'warning'`, `'error'`, or `undefined`.
   * @locale {zh} 输入框的验证状态。可以是 `'success'`、`'warning'`、`'error'` 或 `undefined`。
   */
  @Prop() status?: Status;

  /**
   * @locale {en} Whether to show an actual input field for adding new items. Default: `false`.
   * @locale {zh} 是否显示一个实际的输入字段以添加新项目。默认：`false`。
   */
  @Prop() showInput = false;

  /**
   * @locale {en} Emitted when an item or items are removed. The event detail contains an array of the removed items.
   * @locale {zh} 当一个或多个项目被移除时发出。事件详细信息包含被移除项目的数组。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksRemove: EventEmitter<IPresenterValue[]>;
  /**
   * @locale {en} Emitted when the clear button is clicked. The event detail contains the item(s) that were cleared.
   * @locale {zh} 当清除按钮被点击时发出。事件详细信息包含被清除的项目。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksClear: EventEmitter<IPresenterValue | IPresenterValue[]>;

  @State() placeholderShowable = true;

  @State() moreCount = 0;

  @State() renderValue: IPresenteInnerValue[] = [];

  @State() expand = true;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  handleValueChange(newValue: IPresenterValue[] = []) {
    const renderValueList = [];
    if (newValue.length === 1) {
      renderValueList.push({
        ...newValue[0],
        visibility: true,
      });
    } else {
      for (const value of newValue) {
        const { key } = value;
        const newRenderValue = this.renderValue.find((item) => item.key === key);
        if (newRenderValue) {
          renderValueList.push(newRenderValue);
        } else {
          renderValueList.push({
            ...value,
            visibility: (this.expand && this.showInput) || !this.collapse,
          });
        }
      }
    }
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.renderValue = renderValueList;
  }

  @Watch('value')
  watchValueChange(newValue: IPresenterValue[]) {
    const isNotArray = !Array.isArray(newValue);
    if (isNotArray) return;
    const firstItemInvalid =
      (newValue[0] && (newValue[0] as IPresenterValue)?.key === undefined) ||
      (newValue[0] as IPresenterValue)?.key === null;
    if (firstItemInvalid) {
      return;
    }
    this.handleValueChange(newValue);
  }

  @Watch('defaultValue')
  watchDefaultValueChange(newValue: IPresenterValue[]) {
    if (this.value) {
      return;
    }
    this.handleValueChange(newValue);
  }

  componentDidLoad() {
    if (this.showInput) {
      this.addOutclickQueue();
    }
    setTimeout(() => {
      // TODO: 非常奇怪value改变了但是 watchValueChange 会无法执行，通过setTimeout才能拿到最新的value
      this.watchValueChange(this.value);
    });
  }

  addOutclickQueue() {
    if (this.expand && this.collapse) {
      outclick.on(
        this.containerEl, // 原始区域
        this.handleOutClick, // outclick回调函数
        [
          this.containerEl, // 当前元素不触发outclick
        ],
      );
    }
  }

  handleOutClick = () => {
    if (this.expand) {
      if (this.renderValue.length !== 0) {
        this.expand = false;
      }
      requestAnimationFrame(() => {
        this.updateMore();
      });
    }
  };

  @Watch('renderValue')
  handleRenderValueChange() {
    if (this.currentValue.length === 0) this.expand = true;
  }

  get currentValue() {
    return this.renderValue;
  }

  get currentClearable() {
    const { disabled } = getReconciledFormContextData(this);
    return this.clearable && this.currentValue.length && !disabled;
  }

  removeTag(tag: IPresenterValue, index: number) {
    const { disabled } = getReconciledFormContextData(this);
    if (disabled || !this.removable) {
      return;
    }
    const values = [...this.currentValue];
    values.splice(index, 1);
    if (!this.value) {
      this.renderValue = values;
    }
    this.ksChange?.emit?.(values);
    this.ksRemove?.emit([tag]);
  }

  clearTag() {
    const disabledValues = this.value ? [...this.value.filter((val) => val.disabled)] : [];
    const enabledValues = this.value ? [...this.value.filter((val) => !val.disabled)] : [];
    this.ksClear?.emit(disabledValues);
    this.ksRemove?.emit(enabledValues);
    this.ksChange?.emit?.(disabledValues);
    if (this.value === undefined) {
      this.renderValue = [];
    }
  }

  updateMore() {
    const containerWidth = this?.contentEl?.offsetWidth;
    const tags = this?.contentEl?.querySelectorAll('[ks-tag]');
    let tagWidth = 0;
    let more = 0;
    if (tags && tags.length) {
      for (let i = 0; i < this.renderValue.length; i++) {
        if (!tags[i]) {
          break;
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        } else if (tagWidth + tags[i].scrollWidth > containerWidth) {
          for (let j = i; j >= 0; j--) {
            more = this.renderValue.length - j;
            const moreLength = 10 * (more.toString().length + 1) + 16;
            if (tagWidth + moreLength <= containerWidth) {
              break;
            } else {
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              tagWidth -= tags[j].scrollWidth + 4;
            }
          }
          break;
        } else {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          tagWidth += tags[i].scrollWidth + 4;
        }
      }
      for (let i = 0; i < this.renderValue.length; i++) {
        if (i < this.renderValue.length - more) {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          this.renderValue[i].visibility = true;
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          this.renderValue[i].width = undefined;
        } else {
          if (i === 0) {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.renderValue[i].visibility = true;
            more -= 1;
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.renderValue[i].width = containerWidth - 10 * (more.toString().length + 1) - 16;
          } else {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.renderValue[i].visibility = false;
          }
        }
      }
      let needRender = false;
      for (let i = 0; i < this.renderValue.length; i++) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        if (this.renderValue[i].visibility !== (tags[i].clientHeight !== 0)) {
          needRender = true;
        }
      }
      if (more === this.moreCount && needRender) {
        forceUpdate(this.el);
      }
      this.moreCount = more;
    }
  }

  handleInputChange() {
    if (this.inputEl.value) {
      const newRenderValue = [
        ...this.renderValue,
        { key: this.inputEl.value, label: this.inputEl.value, visibility: true },
      ];

      this.ksChange.emit(newRenderValue);
      if (this.value === undefined) {
        this.renderValue = newRenderValue;
      }
      this.inputEl.value = '';
    }
  }

  componentDidRender() {
    if (this.collapse && (!this.expand || !this.showInput)) {
      requestAnimationFrame(() => {
        this.updateMore();
      });
    }
  }

  disconnectedCallback() {
    if (this.showInput) {
      outclick.off(this.handleOutClick);
    }
  }

  get verticalPadding() {
    return this.size === 'sm' ? 1 : 4;
  }

  render() {
    const { disabled, status } = getReconciledFormContextData(this);
    const focus = this.focusElement;
    const value = typeof this.value !== 'undefined' ? this.value : this.renderValue || [];
    const className = classnames(`${prefix}`, `${prefix}--${this.size}`, {
      [`${prefix}--collapse`]: this.collapse,
      [`${prefix}--scroll`]: !this.collapse,
      [`${prefix}--focus`]: focus,
      [`${prefix}--disabled`]: disabled,
      [`${prefix}--${this.status}`]: status,
      [`${prefix}--${this.status}--focus`]: focus,
    });
    let contentStyle = {};
    if (this.collapse) {
      if (this.expand && this.showInput) {
        contentStyle = {
          height: 'auto',
          flexWrap: 'wrap',
          maxHeight: 'fit-content',
        };
      } else {
        contentStyle = {
          maxHeight: this.maxHeight && `${this.maxHeight - 2 * this.verticalPadding}px`,
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          height: contentHeightMap[this.size],
          flexWrap: 'nowrap',
          width:
            typeof this.width === 'string'
              ? `calc(${this.width} - ${this.currentClearable ? PADDING_WITH_ICON : PADDING}px)`
              : `${this.width - (this.currentClearable ? PADDING_WITH_ICON : PADDING)}px`,
        };
      }
    } else {
      contentStyle = {
        maxHeight: this.maxHeight && `${this.maxHeight - 2 * this.verticalPadding}px`,
        flexWrap: 'wrap',
        [dir() === 'ltr' ? 'paddingRight' : 'paddingLeft']:
          `${ICON_MARGIN + SCROLLBAR_WIDTH + (this.currentClearable ? 2 * ICON_WITH : ICON_WITH)}px`,
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        minHeight: contentHeightMap[this.size],
      };
    }
    return (
      <Host
        dir={dir()}
        style={{ width: typeof this.width === 'string' ? this.width : `${this.width}px` }}
        class={prefix}
        ks-fields-presenter
      >
        <div
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          ref={(el) => (this.containerEl = el)}
          onClick={() => {
            if (!this.showInput) {
              return;
            }
            this.expand = true;
            this.addOutclickQueue();
            this.renderValue.forEach((item) => (item.visibility = true));
            this.moreCount = 0;
            requestAnimationFrame(() => {
              this.inputEl.focus();
            });
          }}
          dir={dir()}
          class={className}
          part="self field"
          style={{
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            height: this.showInput || !this.collapse ? '' : wrapperHeightMap[this.size],
            padding: this.innerPaddingUse ? 'var(--ks-spacing-100) var(--ks-spacing-300)' : '',
          }}
          data-testid="ks-fields-presenter-index-ui4XiB"
        >
          {this.prefixSlot && (
            <span class={`${prefix}__prefix`} part="prefix">
              <slot name="prefix"></slot>
            </span>
          )}

          <div
            class={classnames(`${prefix}__content`, 'ks-scrollbar-thin', {
              [`${prefix}__content--empty`]: !this.currentValue?.length,
            })}
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            ref={(el) => (this.contentEl = el)}
            part="content"
            style={contentStyle}
          >
            {Array.isArray(this.currentValue) &&
              this.currentValue.map((item, index) =>
                this.renderTag ? (
                  this.renderTag(item)
                ) : (
                  <ks-tag
                    closeable={!disabled}
                    part="tag-item"
                    onKsClose={() => {
                      this.removeTag(item, index);
                    }}
                    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                    size={tagSizeMap[this.size]}
                    style={{
                      opacity: item.visibility ? '1' : '0',
                      height: item.visibility ? 'auto' : '0',
                      position: item.visibility ? 'relative' : 'absolute',
                      width: item.width ? `${item.width}px` : undefined,
                    }}
                    disabled={item.disabled}
                    data-testid="ks-fields-presenter-index-k1bCQS"
                  >
                    <ks-text
                      theme={item.disabled ? 'neutralLow' : 'neutral'}
                      ellipsis
                      variant="labelLg"
                      style={{ width: '100%' }}
                    >
                      {item.label}
                    </ks-text>
                  </ks-tag>
                ),
              )}
            {this.moreCount > 0 && (
              <ks-tooltip
                content={this.renderValue
                  .slice(this.renderValue.length - this.moreCount, this.renderValue.length)
                  .map((item) => item.label)
                  .join(',')}
              >
                <ks-tag
                  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                  size={tagSizeMap[this.size]}
                  style={{
                    opacity: this.moreCount > 0 ? '1' : '0',
                    position: this.moreCount > 0 ? 'relative' : 'absolute',
                  }}
                  closeable={false}
                  part="tag-item"
                >
                  {`+${this.moreCount}`}
                </ks-tag>
              </ks-tooltip>
            )}

            {(this.showInput || value.length === 0) && (
              <div class={`${prefix}-input`}>
                {this.showInput ? (
                  <input
                    type={this.expand ? 'text' : 'hidden'}
                    placeholder={this.placeholder ?? t(inputMessages.placeholder)}
                    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                    ref={(el) => (this.inputEl = el)}
                    onKeyDown={(event) => {
                      if (event.code === 'Enter' && !event.isComposing) {
                        event.preventDefault();
                        this.handleInputChange();
                      }
                    }}
                    onBlur={() => {
                      this.handleInputChange();
                    }}
                    data-testid="ks-fields-presenter-index-6QbNGo"
                  />
                ) : (
                  <ks-text
                    theme="neutralLow"
                    ellipsis
                    style={{
                      marginLeft: this.innerPaddingUse ? '0px' : '',
                    }}
                    class={classnames(`${prefix}__placeholder`)}
                  >
                    <slot name="placeholder">{this.placeholder ?? t(inputMessages.placeholder)}</slot>
                  </ks-text>
                )}
              </div>
            )}
          </div>
          <div
            class={`${prefix}__suffix`}
            part="suffix"
            style={{
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              height: contentHeightMap[this.size],
            }}
          >
            {(this.currentClearable && (
              <div
                part="suffix-icon"
                onClick={(event) => {
                  this.clearTag();
                  event.stopPropagation();
                }}
                class={classnames({ [`${prefix}__clear`]: this.currentClearable })}
                data-testid="ks-fields-presenter-index-kukHPu"
              >
                {focus && (
                  <slot name="close-icon">
                    <ks-icon-filled-close size="16" />
                  </slot>
                )}
              </div>
            )) ||
              null}
            <slot name="suffix"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
