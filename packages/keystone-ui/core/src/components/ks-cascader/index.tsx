import { Component, h, Prop, Event, EventEmitter, Element, Host, State, Watch, Method } from '@stencil/core';
import classnames from 'classnames';
import { dir, t } from '@src/utils/utils';
import { SearchController } from '@src/utils/cascader/search';
import { TreeMap, EnumTreeItemKeys, EnumCheckStrategy, TreeItem } from '../../utils/tree/treeMap';
import { Status, CascaderItemValue, CascaderItem, CascaderTreeItem, DataSourceMap, Size } from '../../entities';
import { Slot, Slots } from '@src/utils/decorators';
import { isElement } from 'lodash-es';
import { FormContextValueReconcile, getReconciledFormContextData } from '@src/utils/form/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { registerPluginManager } from '@src/utils/plugin';
import { sendActionTracking, sendExposeTracking, sendDurationTracking } from '@src/utils/tracking';
import { commonMessages, selectMessages } from '@fe-infra/keystone-locales';
import { FormBaseComponent } from '@src/utils/form/FormBaseComponent';

const prefix = 'cascader';

/**
 * @slot panel-header - Slot for content at the top of the dropdown panel.
 * @slot panel-footer - Slot for content at the bottom of the dropdown panel.
 * @slot prefix - Slot for prefix content before the input display.
 * @slot show-icon - Slot for a custom expansion indicator icon.
 * @slot close-icon - Slot for a custom clear icon.
 * @slot suffix - Slot for suffix content after the input display (overrides show-icon & close-icon).
 * @slot selected - Slot for selected content.
 *
 * @part self - 此组件shadow内根元素为popover，所以此part指popover组件
 * @part panel - 下拉框
 * @part search-input - search-input组件
 * @part fields-presenter - fields-presenter组件
 * @part columns-panel - 列的容器
 * @part column-panel - 某列的容器
 * @part item - 每一项
 * @part item-left - 每一项flex左边容器
 */
@Component({
  tag: 'ks-cascader',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCascader extends FormBaseComponent<CascaderItemValue> {
  ['ks-name'] = 'ks-cascader';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsCascaderElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popoverEl: HTMLKsTooltipElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  columnsEl: HTMLKsCascaderColumnsElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  fieldPresenterEl: HTMLKsFieldsPresenterElement;

  /**
   * @locale {en} The key used to retrieve the value from each option in the cascade selection. This should match the property name of the options' value.
   * @locale {zh} 用于从级联选择中的每个选项检索值的键。应与选项值的属性名称匹配。
   */
  @Prop() valueKey = 'value';
  /**
   * @locale {en} The key used to retrieve the display label for each option in the cascade selection. This should match the property name of the options' label.
   * @locale {zh} 用于从级联选择中的每个选项检索显示标签的键。应与选项标签的属性名称匹配。
   */
  @Prop() labelKey = 'label';
  /**
   * @locale {en} The key used to retrieve the children options for each option in the cascade selection. This should match the property name for nested options.
   * @locale {zh} 用于从级联选择中的每个选项检索子选项的键。应与嵌套选项的属性名称匹配。
   */
  @Prop() childrenKey = 'children';
  /**
   * @locale {en} The key used to determine whether an option is disabled. This should match the property name that indicates the disabled state of the options.
   * @locale {zh} 用于确定选项是否被禁用的键。应与指示选项禁用状态的属性名称匹配。
   */
  @Prop() disabledKey = 'disabled';
  /**
   * @locale {en} The key used to determine whether an option needs to be loaded asynchronously. This should match the property name that indicates if the option requires loading.
   * @locale {zh} 用于确定选项是否需要异步加载的键。应与指示选项是否需要加载的属性名称匹配。
   */
  @Prop() needLoadKey = 'needLoad';
  /**
   * @locale {en} The current value of the cascade selection. This represents the selected option(s) and should match the corresponding keys defined by `valueKey`.
   * @locale {zh} 级联选择框的当前值。它表示选定的选项，并应与 `valueKey` 定义的相应键匹配。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() @FormContextValueReconcile() value: CascaderItemValue;
  /**
   * @locale {en} The default value of the cascade selection. This value will be pre-selected when the component is initially rendered.
   * @locale {zh} 级联选择框的默认值。此值将在组件首次渲染时被预先选中。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() defaultValue: CascaderItemValue;
  /**
   * @locale {en} Determines whether the cascade selection allows searching. If set to `true`, a search input will be displayed to filter options.
   * @locale {zh} 决定级联选择框是否允许搜索。如果设置为 `true`，将显示一个搜索输入框以过滤选项。
   */
  @Prop() searchable = false;
  /**
   * @locale {en} The placeholder text displayed in the search input field when `searchable` is enabled. It provides a hint about what users can search for.
   * @locale {zh} 启用 `searchable` 时在搜索输入框中显示的占位符文本，用于提示用户可以搜索的内容。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() searchPlaceholder: string;
  /**
   * @locale {en} A custom search method used to filter options based on the query. It receives two arguments: `query` (the search input) and `option` (the option to be evaluated). This method should return `true` if the option matches the query.
   * @locale {zh} 自定义搜索方法，用于根据查询过滤选项。它接收两个参数：`query`（搜索输入）和 `option`（要评估的选项）。如果选项与查询匹配，则该方法应返回 `true`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() search: (query: string, option: CascaderTreeItem) => boolean;
  /**
   * @locale {en} The current value of the search input in the cascader.
   * @locale {zh} 级联选择器中搜索输入框的当前值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() searchValue: string;
  /**
   * @locale {en} Determines whether the search should be case-insensitive. If set to `true`, the search will ignore letter casing when matching the query with options.
   * @locale {zh} 决定搜索是否忽略大小写。如果设置为 `true`，搜索在匹配查询与选项时将忽略字母大小写。
   */
  @Prop() ignoreCase = false;
  /**
   * @locale {en} The height of the dropdown panel that displays the cascade options. Enabling scrolling if the content exceeds the height.
   * @locale {zh} 显示级联选项的下拉面板的高度。如果内容超过此高度，则启用滚动。
   */
  @Prop() panelHeight = '248px';
  /**
   * TODO 面板样式
   */
  // @Prop() panelStyle: CSSProperties;
  /**
   * @locale {en} The data source for the cascade selection options. It should be an array of objects where each object represents an option.
   * @locale {zh} 级联选择框选项的数据源。它应该是一个对象数组，其中每个对象表示一个选项。
   */
  @Prop() dataSource: CascaderItem[] = [];
  /**
   * @locale {en} A function used to process the selected option's label after selection. By default, it concatenates the full path of selected labels with a `/` separator. You can customize this function to define how the selected label(s) should be displayed.
   * @locale {zh} 用于处理选中选项的标签文本的函数。默认情况下，它使用 `/` 分隔符拼接所选标签的完整路径。您可以自定义此函数，以定义选中标签的展示方式。
   */
  @Prop() processSelected?: (fullLabel: Array<string>) => string = (fullLabel = []) => fullLabel.join('/');
  /**
   * @locale {en} A custom rendering function for displaying the selected option(s). This function allows you to customize how the selected values are displayed in the component.
   * @locale {zh} 自定义渲染选中选项的函数。该函数允许您自定义选中值在组件中的显示方式。
   */
  @Prop() renderSelected?: (value: TreeItem) => HTMLElement;
  /**
   * TODO 子项渲染方法
   */
  // @Prop() renderItem: (data: CascaderItem) => HTMLElement;
  /**
   * TODO 搜索子项渲染方法
   */
  // @Prop() renderSearchItem: (data: CascaderItem) => HTMLElement;
  /**
   * TODO 面板子项渲染方法
   */
  // @Prop() renderPanelItem: (data: CascaderItem) => HTMLElement;
  /**
   * TODO(待验证) 自定义搜索框Props
   */
  // @Prop() searchInputProps;
  /**
   * @locale {en} The width of the cascade selection component. This sets the total width of the component, including the dropdown panel.
   * @locale {zh} 级联选择框组件的宽度。设置组件的总宽度，包括下拉面板。
   */
  @Prop() width = '288px';
  /**
   * @locale {en} The minimum width for each column in the cascade dropdown panel. If the content exceeds this width, the column will expand accordingly.
   * @locale {zh} 级联下拉面板中每一列的最小宽度。如果内容超过此宽度，列将相应扩展。
   */
  @Prop() columnMinWidth = '288px';
  /**
   * @locale {en} Enables full path mode to obtain the full path value when the `value` is not unique across levels. This mode ensures that the complete path of the selected option is returned.
   * @locale {zh} 当跨层级的 `value` 不唯一时，启用 fullpath 模式以获取完整路径的值。此模式确保返回选中选项的完整路径。
   */
  @Prop() fullpath = false;
  /**
   * TODO 弹层的样式
   */
  // @Prop() popoverStyle: CSSProperties;
  /**
   * @locale {en} The debounce time for the search input in milliseconds. This delays the search function to prevent excessive execution when users type quickly.
   * @locale {zh} 搜索输入的防抖时间，以毫秒为单位。此属性延迟搜索函数的执行，以防止用户快速输入时过度执行。
   */
  @Prop() searchDebounceTime = 0;
  /**
   * @locale {en} The placeholder text displayed in the input field when no option is selected. It provides a hint about the expected input or selection.
   * @locale {zh} 当没有选中任何选项时，在输入框中显示的占位符文本，用于提示预期的输入或选择。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() placeholder: string;
  /**
   * @locale {en} A boolean that determines whether the cascade selection is disabled. When set to `true`, the component is not interactive.
   * @locale {zh} 一个布尔值，用于决定级联选择框是否被禁用。设置为 `true` 时，组件不可交互。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /**
   * @locale {en} Determines whether the cascade selection is clearable. If set to `true`, a clear button will appear, allowing users to reset the selection.
   * @locale {zh} 决定级联选择框是否可清除。如果设置为 `true`，将显示一个清除按钮，允许用户重置选择。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() clearable: boolean;
  /**
   * @locale {en} A function used to load child item resources dynamically. It accepts a single parameter, `parent`, which represents the currently selected parent option. This function should return the child items based on the parent item.
   * @locale {zh} 用于动态加载子项资源的函数。它接受一个参数 `parent`，表示当前选中的父选项。该函数应根据父项返回子项。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() load: (parent: CascaderItem) => Promise<CascaderItem[]>;
  /**
   * @locale {en} A function used to load more options in a single column dynamically. This function can be called when the user scrolls to the end of the list, allowing additional options to be fetched and displayed.
   * @locale {zh} 用于动态加载单列选项的更多函数。当用户滚动到列表末尾时，可以调用该函数，以获取和显示额外的选项。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() loadMore: (parent?: CascaderItem) => Promise<CascaderItem[]>;
  /**
   * @locale {en} Defines the selection strategy for checking options in the cascade selection. It determines how parent and child nodes are affected when a node is selected. Can be one of the following values: `all`, `parent`, `child` or `independent`.
   * @locale {zh} 定义级联选择框中选中选项的策略，决定在选中一个节点时父节点和子节点如何受到影响。可选值为 `all`、`parent`、`child` 或 `independent`。
   */
  @Prop() checkStrategy?: EnumCheckStrategy.INDEPENDENT | undefined;
  /**
   * @locale {en} The size of the cascade selection component. Can be one of the following values: `"xs"`, `"sm"`, `"md"`, `"lg"` or `"xl"`.
   * @locale {zh} 级联选择框组件的尺寸。可选值为 `"xs"`、`"sm"`、`"md"`、`"lg"` 或 `"xl"`。
   */
  @Prop() size: Size = 'md';
  /**
   * @locale {en} The current status of the cascade selection. It is used to define the visual appearance of the component, can be one of the following values: `"default"`, `"success"`, `"warning"` or `"error"`.
   * @locale {zh} 级联选择框的当前状态。用于定义组件的视觉外观，可选值为 `"default"`, `"success"`, `"warning"` 或 `"error"`。
   */
  @Prop() status?: Status;
  /**
   * @locale {en} Custom event triggered when the selected value changes. It returns the new value selected by the user.
   * @locale {zh} 当选中的值发生变化时触发的自定义事件。返回用户选择的新值。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<CascaderItemValue>;
  /**
   * @locale {en} Custom event triggered when the visibility of the cascade selection component changes. This event can be used to detect when the dropdown is opened or closed.
   * @locale {zh} 当级联选择框组件的可见性发生变化时触发的自定义事件。此事件可用于检测下拉菜单何时打开或关闭。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksVisibleChange: EventEmitter<boolean>;
  /**
   * @locale {en} Custom event triggered when the search input value changes in the cascader.
   * @locale {zh} 当级联选择器中的搜索输入值变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksSearchChange: EventEmitter<string>;

  @State() dropVisible = false;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  treeMap: TreeMap<CascaderItem>;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() datasourceMap: DataSourceMap;
  @Watch('dataSource')
  datasourceWatcher(val: CascaderItem[]) {
    this.datasourceMap = this.treeMap?.createData(val);
    this.columnsEl?.initColumnList(this.value, this.datasourceMap, val);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() selectedFullValue: CascaderItemValue;
  @Watch('value')
  valueWatcher(val: CascaderItemValue) {
    if (this.selectedFullValue !== val) {
      this.selectedFullValue = val;
      this.columnsEl?.initColumnList(val, this.datasourceMap, this.dataSource);
    }
  }

  @Watch('defaultValue')
  defaultValueWatcher(val: CascaderItemValue) {
    if (this.value === undefined && this.selectedFullValue !== val) {
      this.selectedFullValue = val;
      this.columnsEl?.initColumnList(val, this.datasourceMap, this.dataSource);
    }
  }

  /**
   * @locale {en} Method to close the cascader options.
   * @locale {zh} 关闭级联选择的方法。
   */
  @Method()
  async close() {
    await this.popoverEl?.close();
  }

  constructor() {
    super();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    registerPluginManager(this.el);
  }

  async updateSelectedFullValue(selectOption: CascaderTreeItem) {
    try {
      if (this.value === undefined) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.selectedFullValue = await this.treeMap.singleSelect(selectOption, this.checkStrategy);
      }
      this.ksChange?.emit(selectOption[EnumTreeItemKeys.FULL_VALUE_KEY]);
      this.popoverEl?.close();
      sendActionTracking(this.el, {
        eventType: 'change',
        componentParams: { value: selectOption[EnumTreeItemKeys.FULL_VALUE_KEY] },
      });
    } catch (error) {
      // 兼容在其他面板（如：搜索面板），点击非可选节点时，打开对应columns面板
      this.columnsEl.updateColumnList(selectOption);
      this.queryString = '';
    }
  }
  clearSelectFullValue() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.selectedFullValue = undefined;
    this.ksChange?.emit(undefined);
    sendActionTracking(this.el, { eventType: 'change', componentParams: { value: undefined } });
  }
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  visibleChangeHandler({ detail }) {
    this.dropVisible = detail;
    this.ksVisibleChange?.emit(detail);
    if (detail) {
      sendExposeTracking(this.el, { eventType: 'popup' });
      sendDurationTracking(this.el, { eventType: 'popup', reset: true });
    } else {
      sendDurationTracking(this.el, { eventType: 'popup' });
    }
  }
  popoverAnimeFinished() {
    this.columnsEl?.updateScrollIntoView();
  }

  @State() queryString = '';
  @State() searchResultList: Array<CascaderTreeItem> = [];

  @Watch('searchValue')
  searchValueWatcher(val: string) {
    this.queryString = val;
  }

  @Watch('queryString')
  queryStringWatcher(val: string) {
    this._searchController.debouncedSearch(val);
  }
  private _searchController = new SearchController(this);
  showSearchPanel() {
    return this.searchable && this.queryString;
  }

  @State() inputMouseEnter = false;
  /**
   * @locale {en} The slot for the prefix text.
   * @locale {zh} 用于前缀文本的slot
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'prefix' }) prefixSlot: Slots;
  /**
   * @locale {en} The slot for the icon.
   * @locale {zh} 用于展示的icon的slot
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'show-icon' }) showIconSlot: Slots;
  /**
   * @locale {en} The slot for the clear icon.
   * @locale {zh} 用于展示清除 icon 的slot
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'close-icon' }) clearIconSlot: Slots;
  /**
   * @locale {en} The slot for the suffix text.
   * @locale {zh} 用于后缀文本的slot
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private fieldPresenterWidth;

  renderDefaultSelected() {
    const oldSelectedSlotteds = this.el?.querySelectorAll('[slot=selected]');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    oldSelectedSlotteds?.forEach((el: HTMLElement) => {
      this.el?.removeChild(el);
    });
    const selectedItem = this.datasourceMap[this.selectedFullValue];
    const selectedSlotted =
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      selectedItem !== undefined ? this.renderSelected(selectedItem) : document.createElement('div');
    if (isElement(selectedSlotted)) {
      selectedSlotted.slot = 'selected';
      this.el?.appendChild(selectedSlotted);
    } else {
      throw Error('[Keystone]: Please ensure that renderSelected return is a valid dom node.');
    }
  }

  // 生命周期 ------------------
  componentWillLoad() {
    this.treeMap = new TreeMap<CascaderItem>({
      fullpathMode: this.fullpath,
      valueKey: this.valueKey,
      labelKey: this.labelKey,
      childrenKey: this.childrenKey,
    });
    this.datasourceMap = this.treeMap.createData([]);
  }

  componentDidLoad(): Promise<void> | void {
    this.datasourceWatcher(this.dataSource);
    if (this.value !== undefined) {
      this.valueWatcher(this.value);
    } else {
      this.valueWatcher(this.defaultValue);
    }
    this.queryString = this.searchValue || this.queryString;
    requestAnimationFrame(() => {
      this.fieldPresenterWidth = this.fieldPresenterEl?.getBoundingClientRect().width + 'px';
    });
  }

  render() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const selectedLabelText = this.processSelected(
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.datasourceMap[this.selectedFullValue]?.[EnumTreeItemKeys.LABEL_FULL_PATH_KEY],
    );
    this.renderSelected !== undefined && this.renderDefaultSelected();
    const { disabled, status } = getReconciledFormContextData(this);
    return (
      <Host dir={dir()} ks-cascader>
        <ks-tooltip
          ref={(el) => {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.popoverEl = el;
          }}
          trigger="click"
          dir={dir()}
          class={prefix}
          placement="bottom-start"
          noArrow
          onKsVisibleChange={this.visibleChangeHandler.bind(this)}
          onKsAfterOpen={this.popoverAnimeFinished.bind(this)}
          part="self"
          data-testid="ks-cascader-index-d5vzY1"
        >
          <div slot="body" part="panel">
            <div>
              <slot name="panel-header"></slot>
            </div>
            {this.searchable
              ? [
                  <ks-input
                    // {...this.searchInputProps}
                    class={`${prefix}__searchinput`}
                    value={this.queryString}
                    placeholder={this.searchPlaceholder ?? t(commonMessages.placeholder)}
                    onKsChange={this._searchController.searchChangeHandler}
                    part="search-input"
                    data-testid="ks-cascader-index-dkaEii"
                  >
                    <ks-icon-search size="14" slot="suffix" />
                  </ks-input>,
                  <ks-divider class={`${prefix}__divider`}></ks-divider>,
                ]
              : undefined}
            <ks-cascader-searchlist
              style={{
                display: this.showSearchPanel() ? 'block' : 'none',
              }}
              queryString={this.queryString}
              disabled={disabled}
              valueKey={this.valueKey}
              labelKey={this.labelKey}
              disabledKey={this.disabledKey}
              displayWidth={this.fieldPresenterWidth}
              panelHeight={this.panelHeight}
              treeMap={this.treeMap}
              dataSource={this.searchResultList}
              datasourceMap={this.datasourceMap}
              selectedFullValue={this.selectedFullValue}
              updateSelectedFullValue={this.updateSelectedFullValue.bind(this)}
            ></ks-cascader-searchlist>
            <ks-cascader-columns
              class={`${prefix}__columns`}
              ref={(el) => {
                // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                this.columnsEl = el;
              }}
              style={{
                display: this.showSearchPanel() ? 'none' : 'block',
              }}
              disabled={disabled}
              valueKey={this.valueKey}
              labelKey={this.labelKey}
              childrenKey={this.childrenKey}
              disabledKey={this.disabledKey}
              needLoadKey={this.needLoadKey}
              displayWidth={this.fieldPresenterWidth}
              columnMinWidth={this.columnMinWidth}
              panelHeight={this.panelHeight}
              treeMap={this.treeMap}
              datasourceMap={this.datasourceMap}
              selectedFullValue={this.selectedFullValue}
              updateSelectedFullValue={this.updateSelectedFullValue.bind(this)}
              load={this.load}
              loadMore={this.loadMore}
            ></ks-cascader-columns>
            <div>
              <slot name="panel-footer"></slot>
            </div>
          </div>
          <div style={{ width: this.width }}>
            <slot>
              <ks-fields-presenter
                // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                ref={(el) => (this.fieldPresenterEl = el)}
                size={this.size}
                width={this.width}
                collapse={true}
                value={
                  this.selectedFullValue ? [{ key: this.selectedFullValue.toString(), label: selectedLabelText }] : []
                }
                focusElement={this.dropVisible}
                status={status}
                maxHeight={256}
                removable={false}
                renderTag={(item) => (
                  <ks-text variant="bodySm" ellipsis>
                    {item.label}
                  </ks-text>
                )}
                placeholder={this.placeholder ?? t(selectMessages.placeholder)}
                clearable={this.clearable}
                disabled={disabled}
                innerPaddingUse
                onKsClear={() => {
                  this.clearSelectFullValue();
                }}
                data-testid="ks-cascader-index-afp1uc"
              >
                <slot name="selected">
                  <div class={`${prefix}__selected-box`}>{selectedLabelText}</div>
                </slot>
                {this.prefixSlot ? <slot name="prefix" slot="prefix"></slot> : undefined}

                <div slot="suffix" dir={dir()} class={`${prefix}__suffix`}>
                  {this.suffixSlot && <slot name="suffix" />}
                  {this.showIconSlot ? (
                    <slot name="show-icon"></slot>
                  ) : (
                    <ks-icon-chevron-down
                      size="xs"
                      class={classnames(`${prefix}__arrow`, {
                        [`${prefix}__arrow--open`]: this.dropVisible,
                      })}
                    />
                  )}
                </div>
                {this.clearIconSlot && <slot name="close-icon" slot="close-icon"></slot>}
              </ks-fields-presenter>
            </slot>
          </div>
        </ks-tooltip>
      </Host>
    );
  }
}
