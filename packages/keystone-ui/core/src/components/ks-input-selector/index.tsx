/* eslint-disable max-lines */
import { Component, h, Prop, Element, Event, EventEmitter, State, Host, Watch, Method } from '@stencil/core';
import { Slot, Slots } from '@src/utils/decorators';
import outclick from '@src/utils/outclick';
import { dir, t } from '@src/utils/utils';
import {
  InputType,
  DropdownMenuItem,
  IPresenterValue,
  InputStatus,
  InputSize,
  DropdownMenu,
  IPresenterKey,
  DropdownItem,
  DropdownMenuItemRenderOptions,
  DropdownGroupItem,
  LoadFailedOption,
} from '../../entities';
import classNames from 'classnames';
import { internalRenderDynamicSlots, flattenDropdownItems } from '@src/utils/dropdown';
import { type KsDropdownMenu } from '../ks-dropdown-menu';
import { uniqBy } from 'lodash-es';
import { FormContextValueReconcile } from '@src/utils/form/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking, sendDurationTracking, sendExposeTracking } from '@src/utils/tracking';
import { inputSelectorMessages } from '@fe-infra/keystone-locales';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';

const prefix = 'input-selector';

const convertMenuItem2PresenterValue = (item: DropdownMenuItem): IPresenterValue => ({
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  label: item.content,
  key: item.id,
  disabled: item.disabled,
});

/**
 * @slot prefix - Allows customization of the content displayed before the input area.
 * @slot suffix - Allows customization of the content displayed after the input area, typically for icons.
 * @slot header - Slot for custom header content within the dropdown panel.
 * @slot listHeader - Slot for custom list header content within the dropdown panel.
 * @slot footer - Allows customization of the content displayed at the bottom of the dropdown panel.
 * @slot empty - Allows customization of the content displayed when the dropdown panel has no items to show.
 * @slot loadFailCtas - Slot for cta button to display when the dropdown panel is load fail
 * @slot error - Slot for error message.
 * @slot field - Slot for custom field content.
 */
@Component({
  tag: 'ks-input-selector',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsInputSelector extends FormBaseComponent<string | string[]> {
  ['ks-name'] = 'ks-input-selector';
  @Element() el!: HTMLKsInputSelectorElement;

  inputEl!: HTMLKsInputElement;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  contentEl: HTMLInputElement;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  dropdownEl: HTMLKsDropdownMenuElement;

  /**
   * @locale {en} An object representing the dropdown menu configuration. It contains a `type` property, which can be one of the following values:
   * - `list`: Indicates that the menu is displayed as a list.
   * - `tabs`: Indicates that the menu is displayed as tabs.
   * @locale {zh} 表示下拉菜单配置的对象。包含一个 `type` 属性，可能的值有：
   * - `list`：表示菜单以列表形式展示。
   * - `tabs`：表示菜单以标签形式展示。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() dataSource: DropdownMenu;
  /**
   * @locale {en} The ID of the currently active tab in the dropdown menu. This property is effective only when the `menu.type` is `tabs`.
   * @locale {zh} 下拉菜单中当前激活标签的 ID。当 `menu.type` 为 `tabs` 时，该属性有效。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() activeTabId: string;
  /**
   * @locale {en} The status of the input field. Possible values include `"default"`, `"warning"` and `"error"`.
   * @locale {zh} 输入框的状态。可选值包括 `"default"`、`"warning"` 和 `"error"`。
   */
  @Prop() @FormContextValueReconcile() status?: InputStatus;

  /**
   * @locale {en} The component that display in the suffix area
   * @locale {zh} 后缀图标的区域
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;

  /**
   * @locale {en} The component that display in the prefix area
   * @locale {zh} 前缀图标的区域
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'prefix' }) prefixSlot: Slots;
  /**
   * @locale {en} The component that display in empty area
   * @locale {zh} empty的区域
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'empty' }) emptySlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'footer' }) footerSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'header' }) headerSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'listHeader' }) listHeaderSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default' }) defaultSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'error' }) errorSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'loadFailCtas' }) loadFailCtasSlot: Slots;

  // FIXME do not need label here
  /**
   * @locale {en} The current value of the input field.
   * @locale {zh} 输入框的当前值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() @FormContextValueReconcile() value: IPresenterKey[] | IPresenterKey;
  /**
   * @locale {en} The selected option of the input selector.
   * @locale {zh} 输入框的当前选中的选项。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() selectedOptions: IPresenterValue[];
  /**
   * @locale {en} The default value of the input field when it is first rendered.
   * @locale {zh} 输入框首次渲染时的默认值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() defaultValue: IPresenterKey[] | IPresenterKey;
  /**
   * @private 私有参数，外部慎用
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() readonly: boolean;
  /**
   * @locale {en} The size of the input field. Possible values include `"sm"` and `"md"`.
   * @locale {zh} 输入框的大小。可选值包括 `"sm"` 和 `"md"`。
   */
  @Prop() size: InputSize = 'md';
  /**
   * @locale {en} The type of the input field, corresponding to the HTML input type attribute.
   * @locale {zh} 输入框的类型，对应 HTML 输入标签的 type 属性。
   */
  @Prop() type: InputType = 'text';
  /**
   * @locale {en} Placeholder text displayed in the input field when it is empty.
   * @locale {zh} 输入框为空时显示的占位符文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() placeholder: string;
  /**
   * @locale {en} Indicates whether the input field is disabled. When `true`, the input field is disabled and cannot be interacted with.
   * @locale {zh} 指示输入框是否禁用。当值为 `true` 时，输入框被禁用，无法进行交互。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @FormContextValueReconcile() disabled: boolean;
  /**
   * @locale {en} Indicates whether the input field can be cleared by the user. When `true`, a clear button is displayed to clear the input value.
   * @locale {zh} 指示用户是否可以清除输入框的内容。当值为 `true` 时，将显示一个清除按钮以清空输入值。
   */
  @Prop() clearable = false;
  // /**
  //  * @locale {en} A reference to the input element that will receive focus when the dropdown is opened.
  //  * @locale {zh} 当下拉菜单打开时，将接收焦点的输入元素的引用。
  //  */
  // @Prop() focusElement: boolean = false;
  /**
   * @locale {en} Indicates whether the dropdown allows multiple selections. When `true`, users can select multiple options.
   * @locale {zh} 指示下拉选择框是否允许多选。当值为 `true` 时，用户可以选择多个选项。
   */
  @Prop() isMultiple = false;

  /**
   * @locale {en} Placeholder text for the search input in the dropdown menu.
   * @locale {zh} 下拉菜单中搜索输入框的占位符文本。
   */
  @Prop() searchPlaceholder = '';
  /**
   * @locale {en} Indicates whether support search. When `true`, users can search through the options.
   * @locale {zh} 指示是否支持搜索能力。当值为 `true` 时，用户可以在选项中进行搜索。
   */
  @Prop() searchable = false;

  /**
   * @locale {en} A custom search method used to filter options based on the query. It receives two arguments: `query` (the search input) and `option` (the option to be evaluated). This method should return `true` if the option matches the query.
   * @locale {zh} 自定义搜索方法，用于根据查询过滤选项。它接收两个参数：`query`（搜索输入）和 `option`（要评估的选项）。如果选项与查询匹配，则该方法应返回 `true`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() search: (query: string, data: DropdownMenuItem) => boolean;
  /**
   * @locale {en} The width of the dropdown select component.
   * @locale {zh} 下拉选择框组件的宽度。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() width: string;

  /**
   * @locale {en} The width of the dropdown panel. Can be a CSS value (e.g., '200px', '100%'). Defaults to 'auto', which typically matches the input width.
   * @locale {zh} 下拉面板的宽度。可以是 CSS 值（例如 '200px', '100%'）。默认为 'auto'，通常与输入框宽度一致。
   */
  @Prop() dropdownWidth = 'auto';
  /**
   * @private experimental version for internal use only
   */
  @Prop() virtual = false;
  /**
   * @locale {en} Optional suffix, providing additional information or context.
   * @locale {zh} 可选的后缀，提供额外的信息或上下文。
   */
  @Prop() suffix = '';

  /**
   * @locale {en} The options to display when the loading fails.
   * @locale {zh} 加载失败时要显示的选项。
   */
  @Prop() loadFailedOptions: LoadFailedOption = {};

  @Prop() __internal_bridged_dynamic_slot_render = false;

  /**
   * @locale {en} Triggered when the content in the drop-down menu reaches the bottom
   * @locale {zh} 当下拉菜单中内容触底时触发
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() loadMore: (errorHandler: () => void) => unknown;
  /**
   * @locale {en} Whether to display the avatar in the option when selecting a single option
   * @locale {zh} 单选时是否展示选项中的头像
   */
  @Prop() showAvatar = false;

  /**
   * @private Internal prop for render layer, please don't use.
   */
  @Prop() wrapWithSlot: (slotName: string, children: unknown) => unknown = (slotName: string, children: unknown) =>
    children;

  /**
   * @private Internal prop for render layer, please don't use.
   */
  @Prop() setDynamicRenderDeps?: (items: unknown[]) => void;

  /**
   * @locale {en} The current value of the search input in the dropdown menu.
   * @locale {zh} 下拉菜单中搜索输入框的当前值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() searchValue;
  /**
   * The estimated height (px) of each item in the list, used for virtual scroll, and when virtual is true, the height applied to each item, used for placeholder.
   */
  @Prop() estimatedItemHeight?: number;
  /**
   * @locale {en} Display the Item loaded at the end
   * @locale {zh} 展示末尾加载的Item
   */
  @Prop() loadItems = false;
  /**
   * @locale {en} Indicates whether the entire menu is loaded.
   * @locale {zh} 指示整个菜单是否加载状态
   */
  @Prop() loading = false;

  /**
   * @locale {en} Indicates whether the loading has failed.
   * @locale {zh} 指示加载是否失败
   */
  @Prop() loadFailed = false;

  /**
   * @private 即将废弃
   * @deprecated 请使用更通用的 `overlayHeight="auto"` 替代
   * @locale {en} The list has a default maximum height, but when `listAutoHeight` is set to `true`, the maximum height is no longer restricted.
   * @locale {zh} 列表有默认最大高度，但当 `listAutoHeight` 设为 `true` 时，将不再限制最大高度。
   */
  @Prop() listAutoHeight = false;
  /**
   * @locale {en} The list has a default height, available for `overlayHeight` to override. If `"auto"` is passed, the height will be auto-scaled.
   * @locale {zh} 列表有默认最大高度，可用 `overlayHeight` 覆盖。若传入 `"auto"`，则高度为不限。
   */
  @Prop() overlayHeight: string | number | { min?: string | number; max?: string | number } = { max: 381 };

  // /**
  //  * 回车后对输入值进行处理，返回false则不触发onChange
  //  */
  // @Prop() onFilter: (keyword: string, value: Menu[]) => boolean;
  /**
   * @deprecated This event is deprecated.
   * @locale {en} Custom event triggered when the input value changes in the dropdown select. (Deprecated)
   * @locale {zh} （已废弃）当下拉选择框中的输入值发生变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksInputChange: EventEmitter<string>;
  /**
   * @locale {en} Custom event triggered when an item is removed from the selection.
   * @locale {zh} 当从选择中移除项目时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksRemove: EventEmitter<IPresenterKey | IPresenterKey[]>;
  /**
   * @locale {en} Custom event triggered when the selection changes in the dropdown select.
   * @locale {zh} 当下拉选择框中的选择发生变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<IPresenterKey[] | IPresenterKey>;
  /**
   * @locale {en} Custom event triggered when the value changes in the dropdown menu.
   * @locale {zh} 当下拉菜单中的值变化时触发的自定义事件只发送key。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksKeyChange: EventEmitter<(number | string)[]>;
  /**
   * @locale {en} Custom event triggered when the dropdown menu opens or closes.
   * @locale {zh} 当下拉菜单打开或关闭时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksVisibleChange: EventEmitter<boolean>; // FIXME very weird solution here

  /**
   * @locale {en} Custom event triggered when the search input value changes in the dropdown menu.
   * @locale {zh} 当下拉菜单中的搜索输入值变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksSearchChange: EventEmitter<string>;

  /**
   * @locale {en} Custom event triggered when the active tab changes in the dropdown menu.
   * @locale {zh} 当下拉菜单中的活动标签变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksTabsChange: EventEmitter<string>;

  @State() focus = false;

  @State() placeholderShowable = true;

  @State() composition = false;

  @State() dropdownVisible = false;

  @State() renderValue: IPresenterValue[] = [];

  @State() renderVisItem = [];

  @State() avatar: DropdownMenuItemRenderOptions['avatar'];

  @Watch('value')
  watchValueChange(newValue: IPresenterKey[] | IPresenterKey) {
    if (!this.selectedOptions) {
      this.renderValue = Array.isArray(newValue) ? this.getValueItemList(newValue) : this.getValueItemList([newValue]);
    }
  }

  @Watch('selectedOptions')
  watchOptionChange(newValues: IPresenterValue[]) {
    this.renderValue = newValues;
  }

  @Watch('dataSource')
  watchDataSourceChange() {
    if (this.value !== undefined) {
      this.watchValueChange(this.value);
    } else if (this.defaultValue !== undefined) {
      this.watchValueChange(this.defaultValue);
    }
  }

  /**
   * @locale {en} Method to open the dropdown select.
   * @locale {zh} 打开下拉选择的方法。
   */
  @Method()
  async open() {
    if (!this.disabled) {
      this.dropdownVisible = true;
      this.ksVisibleChange.emit(true);
    }
  }

  /**
   * @locale {en} Method to close the dropdown select.
   * @locale {zh} 关闭下拉选择的方法。
   */
  @Method()
  async close() {
    this.dropdownVisible = false;
    this.ksVisibleChange.emit(false);
  }

  constructor() {
    super();
    registerPluginManager(this.el);
  }

  static __internal_renderDynamicSlots(
    props: Partial<KsDropdownMenu>,
    wrapWithSlot: (slotName: string, children: unknown) => unknown,
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    renderVisItem,
    searchValue = '',
  ) {
    // FIXME 目前无论 searchValue 是什么都会 trigger 列表所有项的 `renderContent`，需要过滤下改善性能
    return internalRenderDynamicSlots(props, wrapWithSlot, renderVisItem, searchValue);
  }

  renderSlot() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const renderedNodes = [];
    const createSlot = (type: string, itemId: string | number, groupId?: string | number, tabId?: string) => {
      const slotName = `slot-${type}-${itemId}${groupId ? '-' + groupId : ''}${tabId ? '-' + tabId : ''}`;
      return (
        <slot
          key={slotName}
          name={slotName}
          slot={slotName}
          data-testid={`ks-input-selector-index-fnTrNY-${slotName}`}
        />
      );
    };
    const createAvatarIconSlot = (type: string, itemId: string | number) => {
      const slotName = `slot-${type}-${itemId}`;
      // FIXME 缺失一个 item hover 状态的参数，Ads Creation 2.0 中比较常用
      return (
        <slot
          key={slotName}
          name={slotName}
          slot={slotName}
          data-testid={`ks-input-selector-index-fnTrNY-${slotName}`}
        />
      );
    };
    const pushRenderedNode = (item: DropdownMenuItem, tabId?: string) => {
      const slotConfigs = [
        { renderFn: item.renderContent, type: 'content' },
        { renderFn: item.renderOptions?.description, type: 'des' },
        { renderFn: item.renderOptions?.popover?.render, type: 'pop' },
        { renderFn: item.renderOptions?.extra, type: 'extra' },
      ];

      slotConfigs.forEach(({ renderFn, type }) => {
        if (typeof renderFn === 'function') {
          renderedNodes.push(createSlot(type, item.id, item.groupId, tabId));
        }
      });
    };
    const pushRenderedAvatarIcon = (item: DropdownGroupItem) => {
      const slotConfigs = [{ renderFn: item.avatarIcon, type: 'avatar-icon' }];
      slotConfigs.forEach(({ renderFn, type }) => {
        if (typeof renderFn === 'function') {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          renderedNodes.push(createAvatarIconSlot(type, item.id));
        }
      });
    };
    const pushRenderedTitle = (item: DropdownGroupItem, tabId?: string) => {
      if (typeof item.renderTitle === 'function') {
        const slotName = `slot-title-${item.id}${tabId ? '-' + tabId : ''}`;
        renderedNodes.push(
          <slot
            key={slotName}
            name={slotName}
            slot={slotName}
            data-testid={`ks-input-selector-index-7EqYBq-${slotName}`}
          />,
        );
      }
    };
    const pushDropdownItem = (item: DropdownItem, tabId?: string) => {
      if (item.type === 'group') {
        pushRenderedAvatarIcon(item);
        pushRenderedTitle(item, tabId);
        item.children.forEach((child) => {
          pushRenderedNode(child, tabId);
        });
      } else {
        pushRenderedNode(item, tabId);
      }
    };

    const getDropdownItemList = (dropdownItem: DropdownItem[]) => {
      let list = [];
      if (this.virtual) {
        const items = flattenDropdownItems(dropdownItem);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        list = items.filter((item) => typeof item !== 'string' && this.renderVisItem.includes(item?.id));
      } else {
        list = dropdownItem;
      }
      return list;
    };
    if (this.dataSource?.type === 'list') {
      const items = getDropdownItemList(this.dataSource?.items);
      items.forEach((item) => {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        pushDropdownItem(item);
      });
    } else {
      this.dataSource?.tabs.forEach((tab) => {
        if (typeof tab.renderTab === 'function') {
          renderedNodes.push(<slot name={`slot-tab-${tab.tabId}`} slot={`slot-tab-${tab.tabId}`}></slot>);
        }
        const list = getDropdownItemList(tab.items);
        list.forEach((item) => {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          pushDropdownItem(item, tab.tabId);
        });
      });
    }
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return renderedNodes;
  }

  @Watch('defaultValue')
  watchDefaultValueChange(newValue: IPresenterKey[] | IPresenterKey) {
    if (this.value === undefined) {
      this.watchValueChange(newValue);
    }
  }

  toggleFocusState() {
    this.focus = false;
    outclick.off(this.toggleFocusState.bind(this));
  }

  componentWillLoad() {
    if (this.selectedOptions) {
      this.renderValue = this.selectedOptions;
    } else if (this.defaultValue !== undefined && this.value === undefined) {
      this.renderValue = Array.isArray(this.defaultValue)
        ? this.getValueItemList(this.defaultValue)
        : this.getValueItemList([this.defaultValue]);
    } else {
      this.renderValue = Array.isArray(this.value)
        ? this.getValueItemList(this.value)
        : this.getValueItemList([this.value]);
    }
  }

  private _eventListenerEstablished = false;
  private _onDropMenuItemUpdate = (e: CustomEvent) => {
    this.el.dispatchEvent(new CustomEvent('dropMenuItemUpdate', e));
    this.renderVisItem = e.detail.items || [];
  };
  componentDidLoad() {
    this._eventListenerEstablished = true;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.dropdownEl.addEventListener('dropMenuItemUpdate', this._onDropMenuItemUpdate);
  }
  override connectedCallback() {
    super.connectedCallback?.();
    if (this._eventListenerEstablished) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.dropdownEl.addEventListener('dropMenuItemUpdate', this._onDropMenuItemUpdate);
    }
  }
  disconnectedCallback() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.dropdownEl.removeEventListener('dropMenuItemUpdate', this._onDropMenuItemUpdate);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  getValueItem = (value) => {
    let res: DropdownMenuItem;
    if (this.dataSource?.type === 'list') {
      for (const item of this.dataSource.items) {
        if (item.type === 'single') {
          if (item.id === value) {
            res = item;
            break;
          }
        } else {
          for (const child of item.children) {
            if (child.id === value) {
              res = child;
              break;
            }
          }
        }
      }
    } else if (this.dataSource?.type === 'tabs') {
      this.dataSource.tabs.forEach((tab) => {
        for (const item of tab.items) {
          if (item.type === 'single') {
            if (item.id === value) {
              res = item;
              break;
            }
          } else {
            for (const child of item.children) {
              if (child.id === value) {
                res = child;
                break;
              }
            }
          }
        }
      });
    }
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return res ? { key: res.id, label: res.content, disabled: res.disabled } : undefined;
  };

  getValueItemList = (valueList: IPresenterKey[]) => {
    const res: IPresenterValue[] = [];
    if (this.dataSource?.type === 'list') {
      for (const item of this.dataSource.items) {
        if (item.type === 'single') {
          if (valueList.includes(item.id)) {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            res.push({ key: item.id, label: item.content, disabled: item.disabled });
          }
        } else {
          for (const child of item.children) {
            if (valueList.includes(child.id)) {
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              res.push({ key: child.id, label: child.content, disabled: item.disabled });
            }
          }
        }
        if (res.length === valueList.length) {
          break;
        }
      }
    } else if (this.dataSource?.type === 'tabs') {
      this.dataSource.tabs.forEach((tab) => {
        for (const item of tab.items) {
          if (item.type === 'single') {
            if (valueList.includes(item.id)) {
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              res.push({ key: item.id, label: item.content, disabled: item.disabled });
            }
          } else {
            item.children.forEach((_item) => {
              if (valueList.includes(_item.id)) {
                // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                res.push({ key: _item.id, label: _item.content, disabled: item.disabled });
              }
            });
          }
          if (res.length === valueList.length) {
            break;
          }
        }
      });
    }
    return uniqBy(res, 'key');
  };

  renderFieldsPresenter = () => (
    <ks-fields-presenter
      exportparts="field: field"
      width={this.width}
      value={this.renderValue}
      size={this.size}
      onClick={() => {
        if (this.disabled) {
          return;
        }
        this.inputEl?.focus?.();
      }}
      focusElement={this.dropdownVisible}
      status={this.status}
      // filled={this.filled}
      // maxHeight={this.maxHeight}
      // collapse={this.collapse}
      // showCount={this.collapse}
      placeholder={this.placeholder ?? t(inputSelectorMessages.placeholder)}
      clearable={this.clearable}
      onKsChange={(event) => {
        const { detail } = event;
        if (this.value === undefined) {
          this.renderValue = detail;
        }
        const keys = detail.map((item) => item.key);
        if (this.isMultiple) {
          this.ksChange.emit(keys);
        } else {
          this.ksChange.emit(keys[0] || '');
        }
      }}
      onKsRemove={(event) => {
        const { detail } = event;
        const keys = detail.map((item) => item.key);
        if (this.isMultiple) {
          this.ksRemove.emit(keys);
        } else {
          this.ksRemove.emit(keys[0] || '');
        }
      }}
      disabled={this.disabled}
      renderTag={
        !this.isMultiple
          ? (item) => (
              <ks-text
                style={{
                  [`margin-${dir() === 'ltr' ? 'left' : 'right'}`]: `var(--ks-spacing-${this.size === 'md' ? 200 : 100})`,
                }}
                dir={dir()}
                ellipsis={{ tooltip: true, maxline: 1 }}
                variant={this.size === 'md' ? 'bodySm' : 'labelSm'}
              >
                {item.label}
              </ks-text>
            )
          : undefined
      }
      data-testid="ks-input-selector-index-ovQ4jw"
    >
      {/* 输入框透传slot */}
      {this.prefixSlot && <slot slot="prefix" name="prefix"></slot>}
      <div slot="suffix" dir={dir()} class={classNames(`${prefix}__suffix`)}>
        {<slot name="suffix">{this.suffix}</slot>}
        <ks-icon-chevron-up
          size={`${this.size === 'md' ? 16 : 14}`}
          class={classNames('icon', {
            ['icon-down']: !this.dropdownVisible,
          })}
        />
      </div>
      {this.defaultSlot && <slot></slot>}
    </ks-fields-presenter>
  );

  render() {
    const activeId = this.renderValue ? this.renderValue.map((item) => item.key) : [];
    const dropdownWidth =
      this.dropdownWidth === 'auto'
        ? this.width !== 'auto'
          ? this.width
          : this.size === 'sm'
            ? '144px'
            : 'auto'
        : this.dropdownWidth;
    const width = this.width || '100%';
    return (
      <Host dir={dir()} ks-multiple-input style={{ width }}>
        <ks-dropdown-menu
          class={{ [`${prefix}__dropdown-with-loadMore`]: Boolean(this.loadMore) }}
          estimatedItemHeight={this.estimatedItemHeight}
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          ref={(el) => (this.dropdownEl = el)}
          virtual={this.virtual}
          dataSource={this.dataSource}
          searchValue={this.searchValue}
          searchable={this.searchable}
          search={this.search}
          value={activeId}
          activeTabId={this.activeTabId}
          loading={this.loading}
          loadItems={this.loadItems}
          wrapWithSlot={this.wrapWithSlot}
          setDynamicRenderDeps={this.setDynamicRenderDeps}
          listAutoHeight={this.listAutoHeight}
          overlayHeight={this.overlayHeight}
          width={dropdownWidth}
          onKsTabsChange={({ detail }) => this.ksTabsChange.emit(detail)}
          searchPlaceholder={this.searchPlaceholder}
          loadFailed={this.loadFailed}
          loadFailedOptions={this.loadFailedOptions}
          onKsSearchChange={({ detail }) => this.ksSearchChange.emit(detail)}
          onKsVisibleChange={({ detail }) => {
            if (this.disabled) {
              return;
            }
            this.dropdownVisible = detail;
            this.ksVisibleChange.emit(detail);

            if (detail) {
              sendExposeTracking(this.el, { eventType: 'popup' });
              sendDurationTracking(this.el, { eventType: 'popup', reset: true });
            } else {
              sendDurationTracking(this.el, { eventType: 'popup' });
            }
          }}
          onKsValueChange={({ detail }) => {
            const values = detail.map(convertMenuItem2PresenterValue);
            if (!this.isMultiple) {
              this.dropdownVisible = false;
              if (values[0]) {
                if (typeof this.value === 'undefined') {
                  this.renderValue = values;
                }
                this.ksChange.emit(values[0].key);
              }
            } else {
              if (typeof this.value === 'undefined') {
                this.renderValue = values;
              }
              this.ksChange.emit(values.map((item) => item.key));
            }

            sendActionTracking(this.el, { eventType: 'change', componentParams: { value: values } });
          }}
          __internal_bridged_dynamic_slot_render={true}
          onKsKeyChange={({ detail }) => {
            this.ksKeyChange.emit(detail);
          }}
          onKsHitBottom={({ detail }) => {
            sendActionTracking(this.el, { eventType: 'scroll', subEventType: 'hitBottom' });
            this.loadMore?.(detail);
          }}
          visible={this.dropdownVisible}
          isMultiple={this.isMultiple}
          data-testid="ks-input-selector-index-jrakkc"
        >
          <slot name="field">
            <div class={classNames(prefix, { [`${prefix}__disabled`]: this.disabled })} style={{ width: this.width }}>
              {this.renderFieldsPresenter()}
            </div>
          </slot>
          {this.headerSlot && <slot name="header" slot="header"></slot>}
          {this.listHeaderSlot && <slot name="listHeader" slot="listHeader"></slot>}
          {this.footerSlot && <slot name="footer" slot="footer"></slot>}
          {this.emptySlot && <slot name="empty" slot="empty"></slot>}
          {this.errorSlot && <slot name="error" slot="error"></slot>}
          {this.loadFailCtasSlot && <slot name="loadFailCtas" slot="loadFailCtas"></slot>}
          {/* 具名插槽允许自定义 */}
          {this.renderSlot()}
        </ks-dropdown-menu>
      </Host>
    );
  }
}
