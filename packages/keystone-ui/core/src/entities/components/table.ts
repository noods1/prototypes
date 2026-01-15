export interface IKsTableColumn<T = unknown> {
  key: string;
  title: string | (() => HTMLElement | number | string | unknown);
  dataIndex?: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  fixed?: boolean;
  justify?: 'start' | 'center' | 'end';
  render?: (row: T, rowIndex: number) => HTMLElement | number | string | unknown;
  /**
   * Set to `true`, `'manual'`, or a custom sort function to enable sorting for this column.
   *
   * If set to `'manual'`, the column will not be sorted automatically but should implement sorting
   * manually via the `dataViewChange` event.
   */
  sorter?: ((a: T, b: T) => number) | boolean | 'manual';
  sortOrder?: 'ascend' | 'descend' | null;
  allowedSortOrders?: Array<'ascend' | 'descend' | null>;
  enableHiding?: boolean;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  renderGroupedCell?: (value, rows: T[]) => HTMLElement | number | string | unknown;
}
