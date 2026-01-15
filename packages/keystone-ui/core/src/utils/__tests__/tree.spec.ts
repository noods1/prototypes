import { BaseTree } from '@src/utils/tree';

describe('BaseTree', () => {
  let tree: BaseTree;

  beforeEach(() => {
    tree = new BaseTree();
  });

  describe('getTree', () => {
    it('should return the root node', () => {
      const root = tree.getTree();
      expect(root).toBeDefined();
      expect(root.children).toEqual([]);
    });
  });

  describe('resetTree', () => {
    it('should reset the tree to initial state', () => {
      tree.addTreeNode('1');
      tree.addTreeNode('2', '1');

      tree.resetTree();

      const root = tree.getTree();
      expect(root.children).toEqual([]);
    });
  });

  describe('findTreeNode', () => {
    it('should find a node by id', () => {
      tree.addTreeNode('1');
      const node = tree.findTreeNode('1');
      expect(node).toBeDefined();
      expect(node?.id).toBe('1');
    });

    it('should return null for non-existent node', () => {
      const node = tree.findTreeNode('non-existent');
      expect(node).toBeNull();
    });

    it('should find deeply nested nodes', () => {
      tree.addTreeNode('1');
      tree.addTreeNode('2', '1');
      tree.addTreeNode('3', '2');

      const node = tree.findTreeNode('3');
      expect(node).toBeDefined();
      expect(node?.id).toBe('3');
    });
  });

  describe('addTreeNode', () => {
    it('should add a node to the root when no parent is specified', () => {
      const node = tree.addTreeNode('1');
      expect(node.id).toBe('1');
      expect(tree.getTree().children).toContain(node);
    });

    it('should add a node to the specified parent', () => {
      tree.addTreeNode('1');
      const node = tree.addTreeNode('2', '1');

      const parent = tree.findTreeNode('1');
      expect(parent?.children).toContain(node);
    });

    it('should throw error when parent node is not found', () => {
      expect(() => {
        tree.addTreeNode('2', 'non-existent-parent');
      }).toThrow('Parent node with id non-existent-parent not found');
    });
  });

  describe('hasDescendant', () => {
    it('should return true when target is a direct child', () => {
      tree.addTreeNode('1');
      tree.addTreeNode('2', '1');

      expect(tree.hasDescendant('1', '2')).toBe(true);
    });

    it('should return true when target is a nested descendant', () => {
      tree.addTreeNode('1');
      tree.addTreeNode('2', '1');
      tree.addTreeNode('3', '2');

      expect(tree.hasDescendant('1', '3')).toBe(true);
    });

    it('should return false when target is not a descendant', () => {
      tree.addTreeNode('1');
      tree.addTreeNode('2');

      expect(tree.hasDescendant('1', '2')).toBe(false);
    });

    it('should return false when node does not exist', () => {
      expect(tree.hasDescendant('non-existent', '2')).toBe(false);
    });

    it('should handle complex tree structures', () => {
      tree.addTreeNode('1');
      tree.addTreeNode('2', '1');
      tree.addTreeNode('3', '1');
      tree.addTreeNode('4', '2');
      tree.addTreeNode('5', '2');
      tree.addTreeNode('6', '3');

      expect(tree.hasDescendant('1', '4')).toBe(true);
      expect(tree.hasDescendant('1', '6')).toBe(true);
      expect(tree.hasDescendant('2', '5')).toBe(true);
      expect(tree.hasDescendant('3', '4')).toBe(false);
      expect(tree.hasDescendant('2', '6')).toBe(false);
    });
  });
});
