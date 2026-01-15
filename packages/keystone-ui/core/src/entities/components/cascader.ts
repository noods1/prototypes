import { TreeItem, TreeItemValue } from '../../utils/tree/treeMap';

export { CheckStrategy, EnumCheckStrategy, EnumTreeItemKeys } from '../../utils/tree/treeMap';

export type CascaderItemValue = TreeItemValue;

export interface CascaderItem extends TreeItem {
  /** 选项名称 可以通过组件 labelKey指定访问此key */
  label?: string;
  /** 选项值 可以通过组件 valueKey指定访问此key */
  value?: CascaderItemValue;
  /** 是否禁用选项 */
  disabled?: boolean;
  /** 是否只读选项 */
  readonly?: boolean;
  /** 是否支持勾选 */
  selectable?: boolean;
  /** 是否支持子项全选，多选时生效 */
  showAll?: boolean;
  /** 是否需要异步拉取子项数据 */
  needLoad?: boolean;
  /** 子项列表 */
  children?: CascaderTreeItem[];
}

export type CascaderTreeItem = CascaderItem & TreeItem;

export type DataSourceMap = Record<string, CascaderTreeItem>;
