import type { Components } from '../../components';
import type { CustomRenderFn } from './dropdown';

export type TreeItemValue = string | number;
export interface TreeDataNode {
  key: TreeItemValue;
  label: string;
  disabled?: boolean;
  selectable?: boolean;
  visible?: boolean;
  children?: TreeDataNode[];
  loading?: boolean;
  renderOptions?: TreeViewRenderOptions;
}

type TreeViewPopoverProps = Omit<
  Components.KsPopover & { render: CustomRenderFn },
  'anchorEl' | 'close' | 'getContainer' | 'open' | 'visible' | 'defaultVisible' | 'trigger'
>;
export interface TreeViewRenderOptions {
  popover?: Partial<TreeViewPopoverProps>;
}

export interface FlattenedNode extends TreeDataNode {
  level: number;
  parent: string | number | null;
  isExpanded: boolean;
  isLeaf: boolean;
}

export interface TreeViewCheckParams {
  checked: boolean;
  node: FlattenedNode;
  checkedKeys: FlattenedNode['key'][];
  checkedNodes: FlattenedNode[];
  halfCheckedKeys: FlattenedNode['key'][];
}
export interface TreeViewToggleExpandParams {
  expanded: boolean;
  node: FlattenedNode;
  expandedKeys: FlattenedNode['key'][];
}
