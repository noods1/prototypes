import {
  Component,
  h,
  Prop,
  State,
  Host,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Watch,
  Listen,
} from '@stencil/core';
import classnames from 'classnames';
import { dir, t } from '@src/utils/utils';
import { IKsTableColumn } from '../../entities';
import { isEqual, findLastIndex, throttle } from 'lodash-es';
import { Slot, Slots } from '@src/utils/decorators';
import { sendActionTracking } from '@src/utils/tracking';
import { registerPluginManager } from '@src/utils/plugin';
import { logger } from '@src/utils/logger';
import { commonMessages } from '@fe-infra/keystone-locales';
import { getGroupedDataSource } from './utils';

const prefix = 'ks-table';

const fixedCheckboxColumnWidth = 52;

/**
 * @slot empty - Content to display when the table has no data.
 */
@Component({
  tag: 'ks-table',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsTable implements ComponentInterface {
  ['ks-name'] = 'ks-table';
  @Element() el!: HTMLKsTableElement;

  /**
   * @locale {en} The size of the table. Can be either `"sm"` or `"md"`.
   * @locale {zh} 表格的大小。可以是 `"sm"` 或 `"md"`。
   */
  @Prop() size: 'sm' | 'md' = 'md';
  /**
   * @locale {en} An array of objects defining the columns of the table.
   * @locale {zh} 定义表格列的对象数组。
   */
  @Prop() columns: IKsTableColumn[] = []; // FIXME 拖拽时事件通知父组件?
  /**
   * @locale {en} An array of objects representing the data to be displayed in the table.
   * @locale {zh} 表格中要显示的数据对象数组。
   */
  @Prop() dataSource: object[] = [];
  /**
   * @locale {en} Specifies the columns to group by.
   * @locale {zh} 指定用于分组的列。
   */
  @Prop() grouping: string[] = [];
  /**
   * @locale {en} Specifies the border style of the table. Can be one of the following values:
   * - `bottomOnly`: Show only the bottom border.
   * - `allSides`: Show borders on all sides.
   * @locale {zh} 指定表格的边框样式。可能的值有：
   * - `bottomOnly`: 仅显示底部边框。
   * - `allSides`: 在所有侧面显示边框。
   */
  @Prop() border: 'bottomOnly' | 'allSides' = 'bottomOnly';
  /**
   * @locale {en} Indicates whether the table is in a loading state. When `true`, and have `estimatedCount` & `estimatedRowHeight` set, a loading spinner will be displayed.
   * @locale {zh} 指示表格是否处于加载状态。当为 `true`，且设置了 `estimatedCount` 和 `estimatedRowHeight` 时，将显示加载指示器。
   */
  @Prop() loading = false;
  /**
   * @locale {en} Estimated number of table rows, applied to the number of row skeletons during loading.
   * @locale {zh} 预估的列表行数，作用于 loading 时 skeleton 的数量。
   */
  @Prop() estimatedCount?: number;
  /**
   * @locale {en} Estimated height (px) of each row in the list, applied to the height of the row skeleton during loading.
   * @locale {zh} 列表每行的预估高度（px），作用于 loading 时 skeleton 的高度。
   */
  @Prop() estimatedRowHeight?: number;
  /**
   * @locale {en} The table-layout attribute of a table element, set to fixed, indicates that the content will not affect the layout of the columns
   * @locale {zh} 表格元素的 table-layout 属性，设为 fixed 表示内容不会影响列的布局
   */
  @Prop() tableLayout?: 'auto' | 'fixed' = 'fixed';
  /**
   * @locale {en} Indicates whether to show the header of the table. When `true`, the header will be displayed.
   * @locale {zh} 指示是否显示表格的标题。当为 `true` 时，将显示标题。
   */
  @Prop() showHeader = true;
  /**
   * @locale {en} Indicates whether to display row checkboxes for selection. **This should also specify the `rowKey` prop.**
   * @locale {zh} 指示是否显示行复选框以进行选择。**这也应指定 `rowKey` 属性。**
   */
  @Prop() selectable = false;
  /**
   * @locale {en} A unique key for each row, used for row identification.
   * @locale {zh} 每行的唯一键，用于行识别。
   */
  @Prop() rowKey?: string;
  /**
   * @locale {en} An array of keys representing the currently selected rows.
   * @locale {zh} 代表当前选中行的键数组。
   */
  @Prop() selectedRowKeys: (string | number)[] = [];
  /**
   * @private Internal prop for render layer, please don't use.
   */
  @Prop() __internal_bridged_dynamic_slot_render = false;
  /**
   * @locale {en} Returns a Boolean value indicating whether the row can be selected. `true` means optional, `false` means not optional.
   * @locale {zh} 返回一个布尔值，表示该行是否可以选择。`true` 表示可选，`false` 表示不可选。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() rowSelectable: (row: object, rowIndex: number) => boolean;
  /**
   * @locale {en} Custom class name for table rows. This string will be applied as a class to each row (`<tr>`) in the table body.
   * @locale {zh} 表格行的自定义类名。该字符串会作为 class 应用于表格主体中的每一行（`<tr>`）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() rowClassName: string;
  /**
   * @private
   * @deprecated This prop is no longer needed and will be removed in the future.
   */
  @Prop() deprecatedHideLastBorder = false;
  /**
   * @deprecated
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() deprecatedSelectionChecked: boolean;
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
   * @deprecated
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() deprecatedSelectionIntermediate: boolean;
  /**
   * @locale {en} Custom event triggered when a row is selected. This event can be used to execute additional actions upon row selection.
   * @locale {zh} 行被选中时触发的自定义事件。此事件可用于在选中行时执行额外的操作。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksRowSelect: EventEmitter<(string | number)[]>;
  /**
   * @locale {en} Custom event triggered when the hovered row changes. This event returns the index of the hovered row, or `null` when no row is hovered.
   * @locale {zh} 被 hover 的行变化时触发的自定义事件。该事件返回被 hover 的行的 index，或当没有行被 hover 时返回 `null`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksRowHover: EventEmitter<number | null>;
  /**
   * @locale {en} Custom event triggered when a row is clicked.
   * @locale {zh} 行被点击时触发的自定义事件。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksRowClick: EventEmitter<object>;
  /**
   * @locale {en} Event triggered when the data view of the table changes, such as when the sortOrder changes.
   * @locale {zh} 表格的视图（而非数据本身）改变时触发的事件，如排序方式变更。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksDataViewChange: EventEmitter<{
    columns: IKsTableColumn[];
    sortOrders: { key: string; sortOrder: IKsTableColumn['sortOrder'] }[];
    triggeredBy: 'sortOrder';
  }>;
  /**
   * @locale {en} Custom event triggered when a sorter is clicked.
   * @locale {zh} 排序器被点击时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksSorterClick!: EventEmitter<{
    id: unknown;
    direction: false | 'descend' | 'ascend';
  }>;

  @Watch('rowKey')
  @Watch('selectable')
  handleRowSelectionDepsChange() {
    let selectedRowKeys: (string | number)[];
    if (this.selectable) {
      const validRowKeys = this.dataSource.map((_, rowIndex) => this.getRowKeyOf(rowIndex));
      selectedRowKeys = this.selectedRowKeys.filter((rowKey) => validRowKeys.includes(rowKey));
    } else {
      selectedRowKeys = [];
    }
    if (!isEqual(selectedRowKeys, this.selectedRowKeys)) {
      this.ksRowSelect.emit(selectedRowKeys);
      sendActionTracking(this.el, {
        eventType: 'select',
        subEventType: 'row',
        componentParams: { value: selectedRowKeys },
      });
    }
  }

  @Watch('dataSource')
  @Watch('loading')
  @Watch('columns')
  handleDataChange() {
    this.setDynamicRenderDeps?.(KsTable.__internal_renderDynamicSlots(this, this.wrapWithSlot));
  }

  /**
   * @locale {en} Indicates whether rows can be dragged and dropped. When `true`, rows will be draggable.
   * @locale {zh} 指示行是否可以拖放。当为 `true` 时，行将可拖动。
   */
  @Prop() draggable = false; // FIXME drag 以后需要事件通知外部更新 `column`！！否则 th 动态插槽可能失效

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'empty' }) emptySlot: Slots;

  @State() draggingColumnIndex = -1;
  @State() draggingOffsetX = 0;
  @State() draggingColumnWidth = 0;
  @State() dropIndex = 0;

  @State() resizingIndex = -1;
  resizeStartX = 0;
  resizeStartWidth = 0;
  @State() resizeIndicatorX = 0;
  isDraggingResize = false;

  dragStartX = 0;
  dragStartClientX = 0;
  columnsOffsetX: number[] = [];

  handleSimulatedDragStart = (event: MouseEvent, index: number) => {
    this.draggingColumnIndex = index;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const currentTable = this.el.shadowRoot.querySelector('table') as HTMLTableElement;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const currentTh = this.el.shadowRoot.querySelector(
      `th:nth-child(${index + 1 + (this.selectable ? 1 : 0)})`,
    ) as HTMLElement;

    this.columnsOffsetX = [];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const ths = this.el.shadowRoot.querySelectorAll('th');
    ths.forEach((th) => this.columnsOffsetX.push(th.offsetLeft));

    if (this.selectable) {
      this.columnsOffsetX.shift();
    }

    this.dragStartX =
      currentTable.getBoundingClientRect().left + (event.clientX - currentTh.getBoundingClientRect().left);
    this.dragStartClientX = event.clientX;
    this.draggingColumnWidth = currentTh?.offsetWidth;

    this.handleSimulatedDragging(event);
  };
  handleSimulatedDragging = (event: MouseEvent) => {
    if (this.draggingColumnIndex === -1) {
      return;
    }
    this.draggingOffsetX = event.clientX - this.dragStartX;

    let dropIndex: number;
    if (Math.abs(event.clientX - this.dragStartClientX) < this.draggingColumnWidth / 2) {
      dropIndex = this.draggingColumnIndex;
    } else {
      dropIndex = 0;
      for (const offsetX of this.columnsOffsetX) {
        if (offsetX > this.draggingOffsetX) {
          break;
        }
        dropIndex++;
      }
    }
    if (!this.columns[dropIndex]?.fixed) {
      this.dropIndex = dropIndex;
    }
  };
  handleSimulatedDragEnd = () => {
    if (this.dropIndex > this.draggingColumnIndex) {
      this.dropIndex -= 1;
    }

    if (this.dropIndex !== this.draggingColumnIndex) {
      const [movedColumn] = this.columns.splice(this.draggingColumnIndex, 1);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.columns.splice(this.dropIndex, 0, movedColumn);
      this.columns = [...this.columns];
      // TODO 这个变化也可以通过 `dataViewChange` 通知外部，让外部能够更新 `columns`
    }

    this.draggingColumnIndex = -1;
    this.dropIndex = -1;
  };

  @Watch('loading')
  checkLoadingRequiredParams() {
    if (this.loading && (!this.estimatedCount || !this.estimatedRowHeight)) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      logger.error(
        '(<KsTable>) You should use `estimatedCount` and `estimatedRowHeight` together with `loading=true` to show skeleton!',
      );
    }
  }

  @State() scrollDistanceX = 0;
  @Listen('scroll')
  handleScroll(event: Event) {
    const updateScrollDistanceX = throttle(() => {
      this.scrollDistanceX = (event.target as HTMLElement).scrollLeft;
    }, 200);

    updateScrollDistanceX();
  }

  constructor() {
    registerPluginManager(this.el);
  }

  handleMouseMove = (event: MouseEvent) => {
    if (this.resizingIndex === -1) {
      return;
    }

    const newWidth = this.resizeStartWidth + (event.pageX - this.resizeStartX);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const currentTh = this.el.shadowRoot.querySelector(`.th-cell-${this.resizingIndex}`) as HTMLElement;
    currentTh.style.width = `${newWidth}px`;

    this.resizeIndicatorX = currentTh.offsetLeft + newWidth - 2;
  };

  handleMouseUp = () => {
    this.resizingIndex = -1;
    this.isDraggingResize = false;
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  connectedCallback(): void {
    document.addEventListener('mouseup', this.handleSimulatedDragEnd);
    document.addEventListener('mousemove', this.handleSimulatedDragging);
  }
  disconnectedCallback(): void {
    document.removeEventListener('mouseup', this.handleSimulatedDragEnd);
    document.removeEventListener('mousemove', this.handleSimulatedDragging);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  getRowKeyOf(rowIndex) {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return this.rowKey ? this.dataSource[rowIndex][this.rowKey] : rowIndex;
  }
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  isRowSelected(rowIndex) {
    return this.selectedRowKeys.includes(this.getRowKeyOf(rowIndex));
  }
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  toggleRowSelection(rowIndex, selected) {
    const rowKey = this.getRowKeyOf(rowIndex);
    if (selected) {
      this.ksRowSelect.emit([...this.selectedRowKeys, rowKey]);
      sendActionTracking(this.el, {
        eventType: 'select',
        subEventType: 'row',
        componentParams: { value: [...this.selectedRowKeys, rowKey] },
      });
    } else {
      this.ksRowSelect.emit(this.selectedRowKeys.filter((item) => item !== rowKey));
      sendActionTracking(this.el, {
        eventType: 'select',
        subEventType: 'row',
        componentParams: { value: this.selectedRowKeys.filter((item) => item !== rowKey) },
      });
    }
  }

  _fixedColumnWidths: number[] = [];
  columnStyle(column: IKsTableColumn, columnIndex: number) {
    const style: Record<string, string> = {};
    if (column.width) {
      this._fixedColumnWidths[columnIndex] = column.width;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      style.width = style.minWidth = style.maxWidth = `${column.width}px`;
    }
    if (column.minWidth) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      style.minWidth = `${column.minWidth}px`;
    }
    if (column.maxWidth) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      style.maxWidth = `${column.maxWidth}px`;
    }
    if (column.fixed) {
      let insetInlineStart = this._fixedColumnWidths.slice(0, columnIndex).reduce((acc, cur) => acc + cur, 0);
      if (this.selectable) {
        insetInlineStart += fixedCheckboxColumnWidth;
      }
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      style.position = 'sticky';
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      style.insetInlineStart = `${insetInlineStart}px`;
    }

    if (column.fixed && (!column.width || !column.minWidth)) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      logger.error('Fixed column of <KsTable> should also specify the `column.width`.');
    }

    return style;
  }
  selectionColumnStyle() {
    const style: Record<string, string> = {};
    if (this.columns.some((column) => column.fixed)) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      style.position = 'sticky';
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      style.zIndex = '1';
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      style.insetInlineStart = '0';
    }
    return style;
  }

  _hoveredRowIndex = null;
  handleRowHoverChange(rowIndex: number | null) {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this._hoveredRowIndex = rowIndex;

    if (rowIndex === null) {
      // 这是为了在鼠标在离开一行的同时移入另一行时, 不会触发中间态的值为 `null` 的事件.
      setTimeout(() => {
        if (this._hoveredRowIndex === null) {
          this.ksRowHover.emit(null);
        }
      });
    } else {
      this.ksRowHover.emit(rowIndex);
    }
  }

  static __internal_renderDynamicSlots(
    { loading, estimatedCount, estimatedRowHeight, columns = [], dataSource = [], grouping = [] }: Partial<KsTable>,
    wrapWithSlot: (slotName: string, children: unknown) => unknown,
  ) {
    const displaySkeleton = Boolean(loading && estimatedCount && estimatedRowHeight);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const renderedNodes = [];

    columns.map((column) => {
      if (typeof column.title === 'function') {
        const slotName = `th-${column.key}`;
        renderedNodes.push(wrapWithSlot(slotName, column.title()));
      }
    });

    if (!displaySkeleton) {
      getGroupedDataSource(dataSource, grouping, columns).map((row, rowIndex) => {
        if (row.type === 'group' && 'groupColumn' in row && row.groupColumn) {
          const { groupColumn, value, data } = row;
          const slotName = `cell-grouped-${groupColumn.key}-${rowIndex}`;
          if (typeof groupColumn.renderGroupedCell === 'function') {
            renderedNodes.push(wrapWithSlot(slotName, groupColumn.renderGroupedCell(value, data || [])));
          }
        }
      });

      dataSource.map((row, rowIndex) =>
        columns.map((column) => {
          if (column.render) {
            const slotName = `cell-${rowIndex}-${column.key}`;
            renderedNodes.push(wrapWithSlot(slotName, column.render(row, rowIndex)));
          }
        }),
      );
    }

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return renderedNodes;
  }

  handleSort(column: IKsTableColumn) {
    if (!column.sorter) {
      return;
    }

    if (column.sorter !== 'manual' && !column.dataIndex) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      logger.error(
        "(<KsTable>) You cannot use `sorter` without `dataIndex`, unless you set `sorter: 'manul'` and implement sorting manually.",
      );
    }

    const { key, sortOrder, allowedSortOrders = ['ascend', 'descend', null] } = column;

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const currentSortOrderIndex = allowedSortOrders.indexOf(sortOrder);
    let nextSortOrder: IKsTableColumn['sortOrder'];
    if (currentSortOrderIndex < allowedSortOrders.length - 1) {
      nextSortOrder = allowedSortOrders[currentSortOrderIndex + 1];
    } else {
      nextSortOrder = allowedSortOrders[0] || null;
    }

    if (nextSortOrder !== sortOrder) {
      const columns = this.columns.map((column) => {
        if (column.key !== key) {
          if (nextSortOrder && column.sortOrder) {
            // 由于目前只支持单列排序, 所以当一列启用排序时需要将其他列的 sortOrder 清空
            return { ...column, sortOrder: null };
          }
          return column;
        }
        return { ...column, sortOrder: nextSortOrder };
      });
      this.ksDataViewChange.emit({
        columns,
        sortOrders: columns.map(({ key, sortOrder }) => ({ key, sortOrder })),
        triggeredBy: 'sortOrder',
      });

      // TODO 埋点事件
      // sendActionTracking(this.el, {
      //   eventType: 'sort',
      //   componentParams: { sorters: newActiveSorters },
      // });
    }

    this.ksSorterClick.emit({ id: key, direction: nextSortOrder || false });
  }

  render() {
    const displaySkeleton = Boolean(this.loading && this.estimatedCount && this.estimatedRowHeight);
    const skeletons = Array(this.estimatedCount).fill({});
    const processedDataSource = getGroupedDataSource(this.dataSource, this.grouping, this.columns);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const allRowKeys = this.dataSource.map((x) => x[this.rowKey]);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const lastFixedColumnIndex = findLastIndex(this.columns, (column) => column.fixed);

    const isAllSelected =
      this.selectedRowKeys.length > 0 && allRowKeys.every((key) => this.selectedRowKeys.includes(key));
    const isSomeSelected = !isAllSelected && allRowKeys.some((key) => this.selectedRowKeys.includes(key));

    return (
      <Host dir={dir()} ks-table>
        <table
          dir={dir()}
          style={{
            tableLayout: this.tableLayout,
          }}
          class={classnames(prefix, `${prefix}--${this.size}`, {
            [`${prefix}-allSides-bordered`]: this.border === 'allSides',
            [`${prefix}-hide-last-border`]: this.border === 'bottomOnly' && this.deprecatedHideLastBorder,
            [`${prefix}-empty`]: !displaySkeleton && processedDataSource.length === 0,
          })}
        >
          {this.showHeader && (
            <thead class={classnames(this.draggingColumnIndex !== -1 && 'dragging')}>
              <tr class={'th-border'}>
                {this.selectable && (
                  <th class="th-cell th-select" style={this.selectionColumnStyle()}>
                    <div>
                      <ks-checkbox
                        checked={this.deprecatedSelectionChecked || isAllSelected}
                        indeterminate={this.deprecatedSelectionIntermediate || isSomeSelected}
                        disabled={
                          displaySkeleton ||
                          !this.dataSource?.length ||
                          (this.rowSelectable && !this.dataSource.some(this.rowSelectable))
                        }
                        onKsChange={(event) => {
                          if (event.detail) {
                            this.ksRowSelect.emit(this.dataSource.map((_, rowIndex) => this.getRowKeyOf(rowIndex)));
                            sendActionTracking(this.el, {
                              eventType: 'select',
                              subEventType: 'row',
                              componentParams: {
                                value: this.dataSource.map((_, rowIndex) => this.getRowKeyOf(rowIndex)),
                              },
                            });
                          } else {
                            this.ksRowSelect.emit([]);
                            sendActionTracking(this.el, {
                              eventType: 'select',
                              subEventType: 'row',
                              componentParams: { value: [] },
                            });
                          }
                        }}
                        data-testid="ks-table-index-s7e62T"
                      />
                    </div>
                  </th>
                )}

                {this.columns.map((column, columnIndex) => {
                  const slotName = `th-${column.key}`;
                  return column.enableHiding ? null : (
                    <th
                      class={classnames(
                        'th-cell',
                        `th-cell-${columnIndex}`,
                        column.fixed && 'th-cell--fixed',
                        columnIndex === lastFixedColumnIndex && 'th-cell--fixed-last',
                        this.scrollDistanceX > 0 &&
                          columnIndex === lastFixedColumnIndex &&
                          'th-cell--fixed-last--shadow',
                        `th-cell--justify-${column.justify || 'start'}`,
                        this.draggingColumnIndex !== -1 && columnIndex === this.dropIndex && 'indicator-border',
                      )}
                      style={this.columnStyle(column, columnIndex)}
                    >
                      <div>
                        {this.draggable && !column.fixed && (
                          <ks-icon-drag-item
                            class="drag-handle"
                            size={this.size === 'md' ? 'sm' : 'xs'}
                            onMouseDown={(event: any) => this.handleSimulatedDragStart(event, columnIndex)}
                            data-testid="ks-table-index-tLaCVo"
                          />
                        )}

                        {typeof column.title === 'function' ? <slot name={slotName}></slot> : column.title}

                        {column.sorter && (
                          <div class="th-sorter-container">
                            <ks-button
                              variant="text"
                              size="xs"
                              shape="square"
                              onClick={() => this.handleSort(column)}
                              data-testid="ks-table-index-4BjgeS"
                            >
                              {column.sortOrder === 'ascend' ? (
                                <ks-icon-ascend-up size="14" />
                              ) : column.sortOrder === 'descend' ? (
                                <ks-icon-ascend-down size="14" />
                              ) : (
                                <ks-icon-ascend size="14" />
                              )}
                            </ks-button>
                          </div>
                        )}
                        {this.border === 'allSides' && (
                          <div
                            class="resize-handle"
                            onMouseEnter={() => {
                              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                              const th = this.el.shadowRoot.querySelector(`.th-cell-${columnIndex}`) as HTMLElement;
                              this.resizingIndex = columnIndex;
                              this.resizeIndicatorX = th.offsetLeft + th.offsetWidth - 2;
                            }}
                            onMouseLeave={() => {
                              if (this.isDraggingResize) {
                                return;
                              }
                              this.resizingIndex = -1;
                            }}
                            onMouseDown={(event) => {
                              this.resizingIndex = columnIndex;
                              this.resizeStartX = event.clientX;
                              this.resizeStartWidth = (
                                this.el.shadowRoot?.querySelector(`.th-cell-${columnIndex}`) as HTMLElement
                              ).offsetWidth;
                              this.isDraggingResize = true;

                              this.handleMouseMove(event);

                              document.addEventListener('mousemove', this.handleMouseMove);
                              document.addEventListener('mouseup', this.handleMouseUp);
                            }}
                            data-testid="ks-table-index-5dtQLw"
                          />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
              {this.draggingColumnIndex !== -1 && (
                <div
                  class="simulated-dragged-column"
                  style={{
                    left: `${this.draggingOffsetX}px`,
                    width: `${this.draggingColumnWidth}px`,
                  }}
                >
                  <div class="th-cell">
                    <div>
                      <ks-icon-drag-item class="drag-handle" size={this.size === 'md' ? 'sm' : 'xs'} />
                      {(() => {
                        const column = this.columns[this.draggingColumnIndex];
                        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                        return typeof column.title === 'function' ? (
                          // FIXME 多个同名 slot 不生效所以自定义标题目前渲染不出来，
                          // 这里需要把 dragging 中的 column 再用另一个新的 slot 渲染一遍
                          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                          <slot name={`th-${column.key}`}></slot>
                        ) : (
                          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                          column.title
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {this.resizingIndex !== -1 && (
                <div
                  class="resize-indicator"
                  style={{
                    left: `${this.resizeIndicatorX}px`,
                  }}
                />
              )}
            </thead>
          )}

          <tbody class={`${prefix}__body`}>
            {(displaySkeleton ? skeletons : processedDataSource).map((item, index) => {
              if (item.type === 'group') {
                const { groupColumn, value } = item;
                return (
                  <tr class="tr-group" data-testid="ks-table-index-b25iMd">
                    <td
                      colSpan={this.columns.filter((column) => !column.enableHiding).length + (this.selectable ? 1 : 0)}
                    >
                      <div class="group-cell">
                        {groupColumn?.renderGroupedCell ? (
                          <slot name={`cell-grouped-${groupColumn.key}-${index}`} />
                        ) : (
                          value
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }

              const row = item.data;
              const rowIndex = this.dataSource.indexOf(row); // [IMPORTANT] 这里的 rowIndex 需要以排序前用户传入的 dataSource 为准
              const disabled = this.rowSelectable ? !this.rowSelectable(row, rowIndex) : false;
              return (
                <tr
                  part={`row-${rowIndex}`}
                  class={classnames(
                    !displaySkeleton && !disabled && this.isRowSelected(rowIndex) && 'tr-checked',
                    disabled && 'tr-disabled',
                    this.rowClassName,
                  )}
                  onClick={() => this.ksRowClick.emit(row)}
                  onMouseEnter={() => !displaySkeleton && !disabled && this.handleRowHoverChange(rowIndex)}
                  onMouseLeave={() => !displaySkeleton && !disabled && this.handleRowHoverChange(null)}
                  data-testid="ks-table-index-jvqzM4"
                >
                  {this.selectable && (
                    <td class="td-cell" style={this.selectionColumnStyle()}>
                      <div>
                        {displaySkeleton ? (
                          <div class="ks-skeleton checkbox-skeleton" />
                        ) : (
                          <ks-checkbox
                            checked={this.isRowSelected(rowIndex)}
                            onKsChange={(event) => this.toggleRowSelection(rowIndex, event.detail)}
                            disabled={disabled}
                            data-testid="ks-table-index-eGFe3b"
                          />
                        )}
                      </div>
                    </td>
                  )}

                  {displaySkeleton &&
                    this.columns.map((column, columnIndex) =>
                      column.enableHiding ? null : (
                        <td
                          class={classnames(
                            this.draggingColumnIndex !== -1 && columnIndex === this.dropIndex && 'indicator-border',
                          )}
                        >
                          <div style={{ height: `${this.estimatedRowHeight}px` }}>
                            <div class="ks-skeleton cell-skeleton" />
                          </div>
                        </td>
                      ),
                    )}
                  {!displaySkeleton &&
                    this.columns.map((column, columnIndex) => {
                      const slotName = `cell-${rowIndex}-${column.key}`;
                      return column.enableHiding ? null : (
                        <td
                          class={classnames(
                            'td-cell',
                            column.fixed && 'td-cell--fixed',
                            columnIndex === lastFixedColumnIndex && 'td-cell--fixed-last',
                            this.scrollDistanceX > 0 &&
                              columnIndex === lastFixedColumnIndex &&
                              'td-cell--fixed-last--shadow',
                            this.draggingColumnIndex !== -1 && columnIndex === this.dropIndex && 'indicator-border',
                          )}
                          style={this.columnStyle(column, columnIndex)}
                        >
                          <div class={classnames(`td-cell--justify-${column.justify || 'start'}`)}>
                            {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
                            {column.render ? <slot name={slotName}></slot> : row[column.dataIndex]}
                          </div>
                        </td>
                      );
                    })}
                </tr>
              );
            })}
            {!displaySkeleton && processedDataSource.length === 0 && (
              <tr class={`${prefix}__empty`}>
                <td colSpan={this.columns.filter((column) => !column.enableHiding).length + (this.selectable ? 1 : 0)}>
                  <div class={`${prefix}__empty__wrap`}>
                    {this.emptySlot ? (
                      <slot name="empty"></slot>
                    ) : (
                      <ks-empty-states title={t(commonMessages.empty)}></ks-empty-states>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Host>
    );
  }
}
