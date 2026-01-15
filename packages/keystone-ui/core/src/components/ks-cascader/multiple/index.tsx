import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
  Host,
  State,
  Watch,
  forceUpdate,
  Method,
} from '@stencil/core';
import classnames from 'classnames';
import { dir, t } from '@src/utils/utils';
import { TreeMap, EnumTreeItemKeys, CheckStrategy, TreeItem } from '../../../utils/tree/treeMap';
import { isSameSetAndArray } from '@src/utils/cascader/utils';
import { SearchController } from '@src/utils/cascader/search';
import { Status, CascaderItemValue, CascaderItem, CascaderTreeItem, DataSourceMap, Size } from '../../../entities';
import { Slot, Slots } from '@src/utils/decorators';
import { isElement } from 'lodash-es';
import { FormContextValueReconcile, getReconciledFormContextData } from '@src/utils/form/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
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
  tag: 'ks-multiple-cascader',
  styleUrl: '../index.scss',
  shadow: true,
})
export class KsMultipleCascader extends FormBaseComponent<CascaderItemValue[]> {
  ['ks-name'] = 'ks-multiple-cascader';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsMultipleCascaderElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  popoverEl: HTMLKsTooltipElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  columnsEl: HTMLKsCascaderColumnsElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  presenterEl: HTMLKsFieldsPresenterElement;
  @Prop() valueKey = 'value';
  @Prop() labelKey = 'label';
  @Prop() childrenKey = 'children';
  @Prop() disabledKey = 'disabled';
  @Prop() needLoadKey = 'needLoad';
  @Prop() showAllKey = 'showAll';

  /**
   * 组件值
   */
  @Prop() @Vue2ValueFix() @FormContextValueReconcile() value: CascaderItemValue[] = [];
  /**
   * 是否支持搜索
   */
  @Prop() searchable = false;
  /**
   * 搜索默认文案
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() searchPlaceholder: string;
  /**
   * 自定义搜索方法
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
   * 搜索防抖时间
   */
  @Prop() searchDebounceTime = 0;
  /**
   * 是否忽略大小写
   */
  @Prop() ignoreCase = false;
  /**
   * 面板高度
   */
  @Prop() panelHeight = '192px';
  /**
   * TODO 面板样式
   */
  // @Prop() panelStyle: CSSProperties;
  /**
   * 数据
   */
  @Prop() dataSource: CascaderItem[] = [];
  /**
   * 选择后文案处理函数，默认展示当前项目的label
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() processSelected?: (fullLabel: Array<string>) => string = (fullLabel = []) => fullLabel[fullLabel.length - 1];
  /**
   * 渲染选择后头部
   */
  @Prop() renderSelected?: (value: TreeItem[]) => HTMLElement;
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
   * TODO 自定义搜索框 wrapper 的样式
   */
  // @Prop() searchInputProps;
  /**
   * 宽度设置
   */
  @Prop() width = '288px';
  /**
   * 列宽度设置
   */
  @Prop() columnMinWidth = '288px';
  /**
   * fullpath模式，当跨层级的value不唯一时，可以开启此模式以获取fullpath value
   */
  @Prop() fullpath = false;
  /**
   * TODO 弹层的样式
   */
  // @Prop() popoverStyle: CSSProperties;
  /**
   * 	选择框默认文字
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() placeholder: string;
  /**
   *	是否禁用
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /**
   *	是否支持清除
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() clearable: boolean;
  /**
   * 是否展示列全选按钮
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() showAll: boolean;
  /**
   *	加载子项资源
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() load: (parent: CascaderItem) => Promise<CascaderItem[]>;
  /**
   *	单列加载更多
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() loadMore: (parent?: CascaderItem) => Promise<CascaderItem[]>;
  /**
   * 选择模式，对于值集合的输出有影响
   */
  @Prop() checkStrategy: CheckStrategy = 'parent';
  /**
   * 级联头尺寸
   */
  @Prop() size: Size = 'md';
  /**
   * 状态
   */
  @Prop() status?: Status;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() datasourceMap: DataSourceMap;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() treeMap: TreeMap<CascaderItem>;
  /**
   * DOM2级事件，值改变时
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<CascaderItemValue[]>;
  /**
   * DOM2级事件，浮层显示/隐藏回调
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksVisibleChange: EventEmitter<boolean>;
  /**
   * @locale {en} Custom event triggered when the search input value changes in the cascader.
   * @locale {zh} 当级联选择器中的搜索输入值变化时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksSearchChange: EventEmitter<string>;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  // 初始化相关
  _treeMap: TreeMap<CascaderItem> = new TreeMap<CascaderItem>({
    fullpathMode: this.fullpath,
    valueKey: this.valueKey,
    labelKey: this.labelKey,
    childrenKey: this.childrenKey,
  });
  @State() _datasourceMap: DataSourceMap = this._treeMap.createData([]);
  @Watch('dataSource')
  datasourceWatcher(val: CascaderItem[]) {
    if (this.datasourceMap) {
      return;
    }
    this._datasourceMap = this._treeMap.createData(val);
    this.rectifySelectValue(this.selectedFullValue.size ? Array.from(this.selectedFullValue) : this.value);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.columnsEl?.initColumnList(Array.from(this.selectedFullValue)[0], this._datasourceMap, val);
  }

  @Watch('datasourceMap')
  datasourceMapWatcher(val: DataSourceMap) {
    this._datasourceMap = val;
  }

  @Watch('treeMap')
  treeMapWatcher(val: TreeMap<CascaderItem>) {
    this._treeMap = val;
  }

  @State() selectedFullValue: Set<CascaderItemValue> = new Set();
  @Watch('value')
  valueWatcher(val: CascaderItemValue[]) {
    const isSame = isSameSetAndArray(this.selectedFullValue, Array.isArray(val) ? val : [val]);
    if (!isSame) {
      this.rectifySelectValue(val);
    }
  }

  @Method()
  async initColumnList(
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    selectedFullValue: CascaderItemValue = Array.from(this.selectedFullValue)[0],
    datasourceMap = this._datasourceMap,
    datasource = this.dataSource,
  ) {
    this.columnsEl?.initColumnList(selectedFullValue, datasourceMap, datasource);
  }

  /**
   * @locale {en} Method to close the cascader options.
   * @locale {zh} 关闭级联选择的方法。
   */
  @Method()
  async close() {
    await this.popoverEl?.close();
  }

  rectifySelectValue(value: CascaderItemValue[]) {
    if (!(value instanceof Array)) {
      return;
    }
    this.selectedFullValue = new Set();
    value.forEach((item: CascaderItemValue) => {
      this._datasourceMap[item] && this.addSelectedFullValue(this._datasourceMap[item], true);
    });
    if (!isSameSetAndArray(this.selectedFullValue, value)) {
      // 经过校正后，如果校正值与原值不一样，需要触发一下change事件
      this.selectedFullValue = new Set(value);
      this.ksChange?.emit(value);
    }
  }
  // 选择相关
  addSelectedFullValue(addOption: CascaderTreeItem, isOutAction?: boolean) {
    this._treeMap.multipleAddSelect(addOption, this.selectedFullValue, this.checkStrategy);
    forceUpdate(this.el);
    !isOutAction && this.ksChange?.emit(Array.from(this.selectedFullValue));
  }
  removeSelectedFullValue(removeOption: CascaderTreeItem, isOutAction?: boolean) {
    this._treeMap.multipleRemoveSelect(removeOption, this.selectedFullValue, this.checkStrategy);
    forceUpdate(this.el);
    !isOutAction && this.ksChange?.emit(Array.from(this.selectedFullValue));
  }
  clearSelectFullValue() {
    this.selectedFullValue = new Set();
    this.ksChange?.emit([]);
  }
  // popover 相关
  @State() dropVisible = false;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  visibleChangeHandler({ detail }) {
    this.dropVisible = detail;
    this.ksVisibleChange?.emit(detail);
  }
  popoverAnimeFinished() {
    this.columnsEl?.updateScrollIntoView();
  }
  // 搜索相关
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

  renderDefaultSelected() {
    const oldSelectedSlotteds = this.el?.querySelectorAll('[slot=selected]');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    oldSelectedSlotteds?.forEach((el: HTMLElement) => {
      this.el?.removeChild(el);
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const selectedItems = [];
    this.selectedFullValue.forEach((item) => {
      selectedItems.push(this._datasourceMap[item]);
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const selectedSlotted = selectedItems.length ? this.renderSelected(selectedItems) : document.createElement('div');
    if (isElement(selectedSlotted)) {
      selectedSlotted.slot = 'selected';
      this.el?.appendChild(selectedSlotted);
    } else {
      throw Error('[Keystone]: Please ensure that renderSelected return is a valid dom node.');
    }
  }

  /**
   * slots input
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'prefix' }) prefixSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'show-icon' }) showIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'close-icon' }) clearIconSlot: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'suffix' }) suffixSlot: Slots;

  // 生命周期 ------------------
  componentDidLoad(): void {
    this._datasourceMap = this.datasourceMap || this._treeMap.createData(this.dataSource);
    this._treeMap = this.treeMap || this._treeMap;
    this.queryString = this.searchValue || this.queryString;
    Object.keys(this._datasourceMap).length && this.rectifySelectValue(this.value);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.columnsEl?.initColumnList(Array.from(this.selectedFullValue)[0], this._datasourceMap, this.dataSource);
  }

  render() {
    this.renderSelected !== undefined && this.renderDefaultSelected();
    const { disabled, status } = getReconciledFormContextData(this);
    return (
      <Host dir={dir()} ks-multiple-cascader>
        <ks-tooltip
          class={prefix}
          ref={(el) => {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.popoverEl = el;
          }}
          trigger="click"
          dir={dir()}
          placement="bottom-start"
          noArrow
          onKsVisibleChange={this.visibleChangeHandler.bind(this)}
          onKsAfterOpen={this.popoverAnimeFinished.bind(this)}
          part="self"
          data-testid="multiple-index-3cjbpS"
        >
          <div class={`${prefix}__panel`} slot="body" part="panel">
            <div>
              <slot name="panel-header"></slot>
            </div>
            {this.searchable
              ? [
                  <ks-input
                    class={`${prefix}__searchinput`}
                    value={this.queryString}
                    placeholder={this.searchPlaceholder ?? t(commonMessages.placeholder)}
                    onKsChange={this._searchController.searchChangeHandler}
                    part="search-input"
                    data-testid="multiple-index-jMeWjK"
                  >
                    <ks-icon-search size="14" slot="prefix" />
                  </ks-input>,
                  <ks-divider></ks-divider>,
                ]
              : undefined}
            <ks-cascader-searchlist
              style={{
                display: this.showSearchPanel() ? 'block' : 'none',
              }}
              multiple={true}
              queryString={this.queryString}
              disabled={disabled}
              valueKey={this.valueKey}
              labelKey={this.labelKey}
              disabledKey={this.disabledKey}
              displayWidth={this.width}
              panelHeight={this.panelHeight}
              checkStrategy={this.checkStrategy}
              treeMap={this._treeMap}
              dataSource={this.searchResultList}
              datasourceMap={this._datasourceMap}
              selectedFullValue={this.selectedFullValue}
              addSelectedFullValue={this.addSelectedFullValue.bind(this)}
              removeSelectedFullValue={this.removeSelectedFullValue.bind(this)}
            ></ks-cascader-searchlist>
            <ks-cascader-columns
              ref={(el) => {
                // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                this.columnsEl = el;
              }}
              style={{
                display: this.showSearchPanel() ? 'none' : 'block',
              }}
              class={`${prefix}__columns`}
              multiple={true}
              disabled={disabled}
              valueKey={this.valueKey}
              labelKey={this.labelKey}
              childrenKey={this.childrenKey}
              disabledKey={this.disabledKey}
              needLoadKey={this.needLoadKey}
              showAllKey={this.showAllKey}
              checkStrategy={this.checkStrategy}
              showAll={this.showAll}
              displayWidth={this.width}
              columnMinWidth={this.columnMinWidth}
              panelHeight={this.panelHeight}
              treeMap={this._treeMap}
              datasourceMap={this._datasourceMap}
              selectedFullValue={this.selectedFullValue}
              addSelectedFullValue={this.addSelectedFullValue.bind(this)}
              removeSelectedFullValue={this.removeSelectedFullValue.bind(this)}
              load={this.load}
              loadMore={this.loadMore}
              rectifySelectValue={() => {
                this.rectifySelectValue(Array.from(this.selectedFullValue));
              }}
            ></ks-cascader-columns>
            <div>
              <slot name="panel-footer"></slot>
            </div>
          </div>
          <div style={{ width: this.width }}>
            <slot>
              <ks-fields-presenter
                // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                ref={(el) => (this.presenterEl = el)}
                size={this.size}
                width={this.width}
                collapse={true}
                value={Array.from(this.selectedFullValue).map((item) => ({
                  key: item.toString(),
                  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                  label: this.processSelected(this._datasourceMap[item]?.[EnumTreeItemKeys.LABEL_FULL_PATH_KEY]),
                }))}
                focusElement={this.dropVisible}
                status={status}
                maxHeight={200}
                onKsRemove={({ detail }) => {
                  const tags = Array.isArray(detail) ? detail : [detail];
                  tags.forEach((tag) => {
                    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                    this.removeSelectedFullValue(this._datasourceMap[tag.key]);
                  });
                }}
                placeholder={this.placeholder ?? t(selectMessages.placeholder)}
                disabled={disabled}
                clearable={this.clearable}
                part="fields-presenter"
                onKsClear={() => {
                  this.clearSelectFullValue();
                }}
                data-testid="multiple-index-hngTH6"
              >
                {this.renderSelected !== undefined ? <slot name="selected"></slot> : undefined}
                {this.prefixSlot ? <slot name="prefix" slot="prefix"></slot> : undefined}

                <div slot="suffix" dir={dir()} class={`${prefix}__suffix--multiple`}>
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
