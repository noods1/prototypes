import { logger } from '@src/utils/logger';

const ROOT_TREE_NODE_ID = Symbol('root');

export type TreeNodeId = string | symbol;
/**
 * TreeNode is a generic type that represents a node in a tree. It has a basic structure of `id`, `parentId`, and
 * `children` array.
 *
 * The T generic type is used to represent the type of the node's extended data.
 *
 * @example type LevelTreeNode = TreeNode<{ level: number }>;
 */
export type TreeNode<T = unknown> = {
  id: TreeNodeId;
  parentId: TreeNodeId | null;
  children: TreeNode<T>[];
} & T;

export class BaseTree<T = unknown> {
  private tree: TreeNode<T> = this.getTreeNode(ROOT_TREE_NODE_ID, null);

  protected getTreeNode(id: TreeNodeId, parentNode: TreeNode<T> | null): TreeNode<T> {
    return { id, parentId: parentNode ? parentNode.id : null, children: [] } as TreeNode<T>;
  }

  /**
   * Traverse the tree using breadth-first search.
   *
   * @param startNode - The node to start traversal from
   * @param predicate - A function that takes a node and returns true if the traversal should stop
   * @returns The first node that satisfies the predicate, or null if none found
   */
  private traverseTree(startNode: TreeNode<T>, predicate: (node: TreeNode<T>) => boolean): TreeNode<T> | null {
    const queue: TreeNode<T>[] = [startNode];

    while (queue.length > 0) {
      const current = queue.shift();

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      if (predicate(current)) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        return current;
      }

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      if (current.children.length > 0) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        queue.push(...current.children);
      }
    }

    return null;
  }

  /**
   * Returns the root node of the tree.
   *
   * @returns The root tree node containing the entire tree structure
   */
  getTree() {
    return this.tree;
  }

  /**
   * Reset the tree to its initial state by creating a new root node.
   * This will clear all existing nodes and their relationships in the tree.
   */
  resetTree() {
    this.tree = this.getTreeNode(ROOT_TREE_NODE_ID, null);
  }

  /**
   * Find a tree node by its id in the tree.
   *
   * @param id - The id of the tree node to find
   * @returns The found tree node, or null if not found
   */
  findTreeNode(id: TreeNodeId): TreeNode<T> | null {
    return this.traverseTree(this.tree, (node) => node.id === id);
  }

  /**
   * Add a tree node to the tree. If the `parentId` is not provided or not found, the tree node will be added to the
   * root of the tree.
   *
   * @param id - The id of the tree node to add.
   * @param parentId - The id of the parent tree node.
   * @returns The added tree node.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  addTreeNode(id: TreeNodeId, parentId: TreeNode<T>['parentId'] = null) {
    const parentNode = parentId ? this.findTreeNode(parentId) : this.tree;
    if (!parentNode) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      logger.error(`Parent node with id ${String(parentId)} not found`);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      logger.debug(`Current tree: ${JSON.stringify(this.tree)}`);

      throw new Error(`Parent node with id ${String(parentId)} not found`);
    }

    const node = this.getTreeNode(id, parentNode);
    parentNode.children.push(node);
    return node;
  }

  /**
   * Check if a node has a specific descendant node.
   * Uses breadth-first search for better performance with wide trees.
   *
   * @param nodeId - The id of the node to check
   * @param targetId - The id of the target descendant node
   * @returns Whether the node has the target descendant
   */
  hasDescendant(nodeId: TreeNodeId, targetId: TreeNodeId): boolean {
    const node = this.findTreeNode(nodeId);
    if (!node) return false;

    return this.traverseTree(node, (current) => current.id === targetId) !== null;
  }
}
