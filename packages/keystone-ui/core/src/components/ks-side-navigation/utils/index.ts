import { BaseTree } from '@src/utils/tree';
import type { TreeNode, TreeNodeId } from '@src/utils/tree';

export type NavigationTreeNode = TreeNode<{ level: number }>;

export class NavigationTree extends BaseTree<NavigationTreeNode> {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  protected getTreeNode(id: TreeNodeId, parentNode: TreeNode<NavigationTreeNode> | null): TreeNode<NavigationTreeNode> {
    return {
      id,
      parentId: parentNode ? parentNode.id : null,
      level: parentNode ? parentNode.level + 1 : -1,
      children: [],
    };
  }
}
