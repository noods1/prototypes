import {
  Component,
  h,
  Prop,
  Element,
  Host,
  State,
  ComponentInterface,
  forceUpdate,
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  Event,
  Method,
} from '@stencil/core';
import classnames from 'classnames';
import { TreeMap, EnumTreeItemKeys, CheckStrategy } from '../../../utils/tree/treeMap';
import { CascaderItemValue, CascaderItem, CascaderTreeItem, DataSourceMap } from '../../../entities';
import { t, scrollTo, isRTL } from '@src/utils/utils';
import { throttle } from 'lodash-es';
import { commonMessages, selectMessages } from '@fe-infra/keystone-locales';

const prefix = 'cascader-columns';
const ITEM_HEIGHT = 40;
const GAP_HEIGHT = 2;
const OVERSCAN_COUNT = 5;

@Component({
  tag: 'ks-cascader-columns',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCascaderColumns implements ComponentInterface {
  ['ks-name'] = 'ks-cascader-columns';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsCascaderColumnsElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  winEl: HTMLElement;
  @Prop() valueKey = 'value';
  @Prop() labelKey = 'label';
  @Prop() childrenKey = 'children';
  @Prop() disabledKey = 'disabled';
  @Prop() needLoadKey = 'needLoad';
  @Prop() showAllKey = 'showAll';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() displayWidth: string;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() columnMinWidth: string;
  @Prop() maxViewColumns = 3;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() panelHeight: string;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() treeMap: TreeMap<CascaderItem>;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() datasourceMap: DataSourceMap;
  @Prop() multiple = false;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() showAll: boolean;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() checkStrategy: CheckStrategy;
  @Prop() selectedFullValue?: CascaderItemValue | Set<CascaderItemValue>; // 单选 & 多选
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;
  /** 单选时更新值 */
  @Prop() updateSelectedFullValue?: (selectOption: CascaderItem) => void;
  /** 多选时更新值 */
  @Prop() addSelectedFullValue?: (selectOption: CascaderItem) => void;
  @Prop() removeSelectedFullValue?: (selectOption: CascaderItem) => void;
  /**
   *	加载子项资源
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() load: (parent: CascaderItem) => Promise<CascaderItem[]>;
  /**
   *	加载当前列更多资源
   * */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() loadMore: (parent?: CascaderItem) => Promise<CascaderItem[]>;
  @Prop() rectifySelectValue?: () => void;
  @Prop() renderColumnTitle?: HTMLElement[] | ((column: CascaderItem, index: number) => HTMLElement);

  @State() columnList: CascaderTreeItem[] = [];
  @State() columnLoadingMap: Record<string, boolean> = {};
  @State() isColumnAdded = false;
  @State() loadMoreIngs: Record<string, boolean> = {};

  // virtusla-scroll related states
  @State() private scrollTopMap = {};
  @State() private viewportHeight = 0;
  // virtual-scroll related variables
  private startIndexMap = {};
  private endIndexMap = {};

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private resizeObserver: ResizeObserver;

  @Method()
  async initColumnList(
    originValue: CascaderItemValue,
    datasourceMap: Record<string, CascaderTreeItem>,
    datasource: CascaderItem[],
  ) {
    const firstColumn = { ...this.treeMap.createRootNode(), [this.childrenKey]: datasource };
    this.columnList = [];
    const v = originValue;
    if (v !== undefined && v !== null && v !== '') {
      let option = datasourceMap[v];
      if (option === undefined) {
        this.columnList.unshift(firstColumn);
      } else {
        while (option !== undefined) {
          this.columnList.unshift(option);
          option = (option[EnumTreeItemKeys.PARENT_KEY] as CascaderTreeItem) ?? undefined;
        }
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        datasourceMap[v][this.childrenKey] && this.columnList.push(datasourceMap[v][this.childrenKey]);
        this.columnList.pop();
      }
    } else {
      this.columnList.unshift(firstColumn);
    }
  }

  @Method()
  async updateColumnList(activeOption: CascaderTreeItem) {
    // 如果 activeColumn 不变，直接返回
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    if (this.columnList[activeOption[EnumTreeItemKeys.FLOOR_KEY] + 1] === activeOption) {
      return;
    }

    if (this.needHasChildren(activeOption)) {
      const currentFloor = activeOption[EnumTreeItemKeys.FLOOR_KEY];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      for (let i = currentFloor; i < this.columnList.length - 1; i++) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.scrollTopMap[i] = 0;
      }
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.columnList?.splice(activeOption[EnumTreeItemKeys.FLOOR_KEY] + 1, this.columnList?.length, activeOption);
    } else {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.scrollTopMap[activeOption[EnumTreeItemKeys.FLOOR_KEY]] = 0;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.columnList?.splice(activeOption[EnumTreeItemKeys.FLOOR_KEY] + 1, this.columnList?.length);
    }
    this.columnList.forEach((column) => this.updateVisibleRange(column));
    /** 直接修改原引用类型数据是无法触发视图更新的，所以显式调用forceUpdate */
    forceUpdate(this.el);
    this.isColumnAdded = true;
  }

  updateDatasourceMap(res: CascaderItem[], target: CascaderTreeItem) {
    if (!res?.length) {
      return;
    }
    this.datasourceMap = this.treeMap.insertNode(res, target);
    this.updateVisibleRange(target);
  }

  activeItem(activeOption: CascaderTreeItem) {
    // 展开 + load sub column
    this.updateColumnList(activeOption);
    if (activeOption[this.needLoadKey]) {
      this.loadSubHandler(activeOption);
    }
  }

  multipleChangeItem(changeOption: CascaderTreeItem, checked: boolean) {
    checked ? this.addSelectedFullValue?.(changeOption) : this.removeSelectedFullValue?.(changeOption);
  }

  multipleActiveItem(activeOption: CascaderTreeItem) {
    this.activeItem(activeOption);
  }

  singleActiveItem(activeOption: CascaderTreeItem, disabled: boolean) {
    this.activeItem(activeOption);
    !disabled &&
      (activeOption.selectable || activeOption.selectable === undefined) &&
      this.updateSelectedFullValue?.(activeOption);
  }

  columnScrollHandler(e: Event, focusColumn: CascaderTreeItem) {
    if (!e.target) {
      return;
    }
    const { scrollTop, offsetHeight, scrollHeight } = e.target as HTMLElement;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    if (scrollTop + offsetHeight >= scrollHeight && this.loadMore) {
      this.loadMoreHandler(focusColumn);
    }
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.scrollTopMap[focusColumn[EnumTreeItemKeys.FLOOR_KEY]] = scrollTop;
    this.updateVisibleRange(focusColumn);
  }

  updateVisibleRange(focusColumn: CascaderTreeItem) {
    if (!this.winEl) {
      return;
    }
    const FLOOR_KEY = focusColumn[EnumTreeItemKeys.FLOOR_KEY];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const scrollTop: number = this.scrollTopMap[FLOOR_KEY] || 0;
    const visibleStartIndex = Math.floor(scrollTop / (ITEM_HEIGHT + GAP_HEIGHT));
    const visibleEndIndex = Math.ceil((scrollTop + this.viewportHeight) / (ITEM_HEIGHT + GAP_HEIGHT));
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.startIndexMap[FLOOR_KEY] = Math.max(0, visibleStartIndex - OVERSCAN_COUNT);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.endIndexMap[FLOOR_KEY] = Math.min(
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      focusColumn[this.childrenKey]?.length || 0,
      visibleEndIndex + OVERSCAN_COUNT,
    );
    forceUpdate(this.el);
  }

  async loadSubHandler(activeOption: CascaderTreeItem) {
    try {
      const res = await this.load?.(activeOption);
      this.updateDatasourceMap(res, activeOption);
      activeOption[this.needLoadKey] = false;
      this.multiple ? this.rectifySelectValue?.() : forceUpdate(this.el);
    } catch (e) {
      this.columnList.pop();
      forceUpdate(this.el);
    }
  }

  async loadMoreHandler(focusColumn: CascaderTreeItem) {
    const floor = focusColumn[EnumTreeItemKeys.FLOOR_KEY];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    if (this.loadMoreIngs[floor]) {
      return;
    }
    try {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.loadMoreIngs[floor] = true;
      forceUpdate(this.el);
      const res = await this.loadMore(
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        focusColumn[EnumTreeItemKeys.FLOOR_KEY] > this.treeMap.rootFloor ? focusColumn : undefined,
      );
      this.updateDatasourceMap(res, focusColumn);
      this.multiple ? this.rectifySelectValue?.() : forceUpdate(this.el);
    } catch (e) {
      // load more failed
    } finally {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.loadMoreIngs[floor] = false;
      forceUpdate(this.el);
    }
  }

  @Method()
  async updateScrollIntoView() {
    const { scrollWidth, clientWidth } = this.winEl;
    if (scrollWidth > clientWidth) {
      scrollTo(this.winEl, { left: !isRTL() ? scrollWidth - clientWidth : clientWidth - scrollWidth });
    }

    // scroll columns according to scrollTopMap
    Object.keys(this.scrollTopMap).forEach((key) => {
      const floor = Number(key);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const scrollTop = this.scrollTopMap[floor];
      const columnEl = this.winEl.children[floor + 1] as HTMLElement;
      if (columnEl) {
        columnEl.scrollTop = scrollTop;
      }
    });
  }

  componentDidUpdate(): void {
    this.isColumnAdded && this.updateScrollIntoView();
    this.isColumnAdded = false;
  }

  componentDidLoad(): void {
    this.viewportHeight = this.winEl.scrollHeight;
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.winEl) {
          this.viewportHeight = entry.contentRect.height;
          this.columnList.forEach((column) => this.updateVisibleRange(column));
        }
      }
    });
    this.resizeObserver.observe(this.winEl);
  }

  needHasChildren(option: CascaderTreeItem) {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return option[this.needLoadKey] || option[this.childrenKey]?.length > 0;
  }

  renderItem(option: CascaderTreeItem, index: number, startIndex: number) {
    const classPrefix = `${prefix}__column__item`;
    const actived = this.columnList.some(
      (item) => item[EnumTreeItemKeys.FULL_VALUE_KEY] === option[EnumTreeItemKeys.FULL_VALUE_KEY],
    );
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const ancestryDisabled = option[EnumTreeItemKeys.FULL_PATH_KEY].some(
      (parentFullValue) => this.datasourceMap[parentFullValue]?.[this.disabledKey],
    );
    const disabled = option[this.disabledKey] || this.disabled || ancestryDisabled;
    if (this.multiple && (option.selectable || option.selectable === undefined)) {
      const { selected, isIndeterminate, count } = this.treeMap.isSelectedInMultipleMode(
        option,
        this.selectedFullValue as Set<CascaderItemValue>,
        this.checkStrategy,
      );
      return (
        <div
          class={classnames(`${classPrefix}`, {
            [`${classPrefix}--selected`]: selected || isIndeterminate,
            [`${classPrefix}--active`]: actived,
            [`${classPrefix}--disabled`]: disabled,
          })}
          style={{
            position: 'absolute',
            top: `${(startIndex + index) * (ITEM_HEIGHT + GAP_HEIGHT)}px`,
            left: '0',
            width: '100%',
            height: `${ITEM_HEIGHT}px`,
          }}
          onClick={() => {
            this.multipleActiveItem(option);
          }}
          part="item"
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          key={option[this.valueKey]}
          data-testid={`columns-index-9GZZbr-${option[this.valueKey]}`}
        >
          <div
            class={classnames(`${classPrefix}__left`, {
              [`${classPrefix}__left--fulllabel`]: !this.needHasChildren(option),
              [`${classPrefix}__left__multiple`]: this.multiple,
            })}
            part="item-left"
          >
            <ks-checkbox
              checked={selected}
              indeterminate={isIndeterminate}
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onKsChange={({ detail }) => {
                this.multipleChangeItem(option, detail);
              }}
              data-testid="columns-index-35z2cm"
            >
              {!this.needHasChildren(option) ? (
                <ks-text variant="bodySm" ellipsis>
                  {option[this.labelKey]}
                </ks-text>
              ) : undefined}
            </ks-checkbox>
            {this.needHasChildren(option) ? (
              <ks-text variant="bodySm" ellipsis>
                {option[this.labelKey]}
              </ks-text>
            ) : undefined}
          </div>
          {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
          {this.needHasChildren(option) && (selected || isIndeterminate) && count > 0 && (
            <sup class={`${classPrefix}--count`}>{count}</sup>
          )}

          {this.needHasChildren(option) ? (
            <ks-icon-chevron-right size="14" class={`${classPrefix}__nexticon`} />
          ) : undefined}
        </div>
      );
    } else {
      const selected = this.treeMap.isSelectedInSingleMode(option, this.selectedFullValue as CascaderItemValue);
      let childIsSelected: boolean;
      if (typeof this.selectedFullValue === 'string' || typeof this.selectedFullValue === 'number') {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        childIsSelected = this.datasourceMap[this.selectedFullValue as CascaderItemValue]?.[
          EnumTreeItemKeys.FULL_PATH_KEY
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        ]?.includes(option[EnumTreeItemKeys.FULL_VALUE_KEY]);
      } else if (this.selectedFullValue instanceof Set) {
        childIsSelected = false;
        this.selectedFullValue.forEach((item) => {
          if (
            this.datasourceMap[item]?.[EnumTreeItemKeys.FULL_PATH_KEY]?.includes(
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              option[EnumTreeItemKeys.FULL_VALUE_KEY],
            )
          ) {
            childIsSelected = true;
          }
        });
      }
      return (
        <div
          class={classnames(`${classPrefix}`, {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            [`${classPrefix}--selected`]: selected || childIsSelected,
            [`${classPrefix}--active`]: actived,
            [`${classPrefix}--disabled`]: disabled,
          })}
          onClick={() => {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.singleActiveItem(option, disabled);
          }}
          style={{
            position: 'absolute',
            top: `${(startIndex + index) * (ITEM_HEIGHT + GAP_HEIGHT)}px`,
            left: '0',
            width: '100%',
            height: `${ITEM_HEIGHT}px`,
          }}
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          key={option[this.valueKey]}
          part="item"
          data-testid={`columns-index-vUccWm-${option[this.valueKey]}`}
        >
          <ks-text variant="bodySm" ellipsis class={classnames(`${classPrefix}__left`)} part="item-left">
            {option[this.labelKey]}
          </ks-text>
          {this.needHasChildren(option) ? (
            <ks-icon-chevron-right size="14" class={`${classPrefix}__nexticon`} />
          ) : undefined}
        </div>
      );
    }
  }

  renderSelectAllInColumn(column: CascaderTreeItem) {
    const classPrefix = `${prefix}__column__item`;
    if (this.multiple && (this.showAll || column[this.showAllKey])) {
      const { selected, isIndeterminate } = this.treeMap.isSelectedInMultipleMode(
        column,
        this.selectedFullValue as Set<CascaderItemValue>,
        this.checkStrategy,
      );
      return (
        <div class={classnames(`${classPrefix}`, `${classPrefix}__left--fulllabel`)}>
          <ks-checkbox
            checked={selected}
            indeterminate={isIndeterminate}
            onKsChange={({ detail }) => {
              this.multipleChangeItem(column, detail);
            }}
            data-testid="columns-index-1ngUug"
          >
            {t(selectMessages.selectAll)}
          </ks-checkbox>
        </div>
      );
    }
  }

  renderColumn(column: CascaderTreeItem) {
    const floor = column[EnumTreeItemKeys.FLOOR_KEY];
    const classPrefix = `${prefix}__column`;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    if (column[this.childrenKey]?.length) {
      return [
        this.renderSelectAllInColumn(column),
        <div
          style={{
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            height: `${ITEM_HEIGHT * column[this.childrenKey].length}px`,
            position: 'relative',
          }}
        >
          {[
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            ...column[this.childrenKey]
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              .slice(this.startIndexMap[floor] || 0, this.endIndexMap[floor] || 0)
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              .map((option, index) => this.renderItem(option, index, this.startIndexMap[floor])),
          ]}
        </div>,
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.loadMore ? (
          <div class={classnames(`${classPrefix}__loadmore`)}>
            {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
            {this.loadMoreIngs[floor] ? (
              <ks-icon-loading size="14" class={classnames(`${classPrefix}__loadmore__loading`)} />
            ) : (
              <span
                class={classnames(`${classPrefix}__loadmore__toload`)}
                onClick={() => {
                  this.loadMoreHandler(column);
                }}
                data-testid="columns-index-1aatpR"
              >
                {/* FIXME missing t? */}
                more <ks-icon-chevron-down size="14" />
              </span>
            )}
          </div>
        ) : undefined,
      ];
    } else {
      if (column[this.needLoadKey]) {
        return (
          <div class={classnames(`${classPrefix}__loading`)}>
            <ks-icon-loading size="14" />
          </div>
        );
      } else {
        return <ks-empty-states title={t(commonMessages.empty)}></ks-empty-states>;
      }
    }
  }

  render() {
    const columnW = `max(calc(${this.displayWidth} / ${this.columnList?.length || 1}), ${this.columnMinWidth})`;
    const columnstyle = {
      width: columnW,
    };
    return (
      <Host>
        <div
          ref={(el) => {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.winEl = el;
          }}
          class={classnames(`${prefix}`)}
          style={{
            maxWidth: `calc(${columnW} * ${this.maxViewColumns})`,
            maxHeight: this.panelHeight,
          }}
          part="columns-panel"
        >
          {this.columnList
            .filter((item) => item)
            .map((column, index) => (
              <div
                style={columnstyle}
                class={`${prefix}__column`}
                onScroll={throttle((e) => {
                  this.columnScrollHandler(e, column);
                }, 100)}
                part="column-panel"
                data-testid="columns-index-ntx7Yr"
              >
                {typeof this.renderColumnTitle === 'function'
                  ? this.renderColumnTitle(column, index)
                  : Array.isArray(this.renderColumnTitle)
                    ? this.renderColumnTitle[index]
                    : null}
                <div class={`${prefix}__column-wrapper`}>{this.renderColumn(column)}</div>
              </div>
            ))}
          {!this.columnList.length && (
            <div style={{ ...columnstyle }} class={classnames(`${prefix}__column`)}>
              <ks-empty-states title={t(commonMessages.empty)}></ks-empty-states>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
