import { TreeMap, EnumCheckStrategy, EnumTreeItemKeys, type TreeItem } from '@src/utils/tree/treeMap';
import type { TreeItemValue } from '@src/entities';

describe('TreeMap', () => {
  // Sample tree data for testing
  const sampleData = [
    {
      value: 'node1',
      label: 'Node 1',
      children: [
        {
          value: 'node1-1',
          label: 'Node 1-1',
          children: [
            { value: 'node1-1-1', label: 'Node 1-1-1' },
            { value: 'node1-1-2', label: 'Node 1-1-2' },
          ],
        },
        { value: 'node1-2', label: 'Node 1-2' },
      ],
    },
    {
      value: 'node2',
      label: 'Node 2',
      children: [
        { value: 'node2-1', label: 'Node 2-1' },
        { value: 'node2-2', label: 'Node 2-2' },
      ],
    },
  ];

  describe('Initialization', () => {
    it('should initialize with default options', () => {
      const treeMap = new TreeMap({});
      expect(treeMap).toBeInstanceOf(TreeMap);
      expect(treeMap.fullpathMode).toBe(false);
      expect(treeMap.valueKey).toBe('value');
      expect(treeMap.labelKey).toBe('label');
      expect(treeMap.childrenKey).toBe('children');
    });

    it('should initialize with custom options', () => {
      const treeMap = new TreeMap({
        fullpathMode: true,
        valueKey: 'id',
        labelKey: 'name',
        childrenKey: 'items',
      });
      expect(treeMap.fullpathMode).toBe(true);
      expect(treeMap.valueKey).toBe('id');
      expect(treeMap.labelKey).toBe('name');
      expect(treeMap.childrenKey).toBe('items');
    });
  });

  describe('createData', () => {
    it('should create tree data structure', () => {
      const treeMap = new TreeMap({});
      const data = treeMap.createData(sampleData);

      // Verify root nodes are created
      expect(data['node1']).toBeDefined();
      expect(data['node2']).toBeDefined();

      // Verify nested nodes are created with correct properties
      expect(data['node1-1']).toBeDefined();
      expect(data['node1-1-1']).toBeDefined();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(data['node1-1-1'][EnumTreeItemKeys.FLOOR_KEY]).toBe(2);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(data['node1-1-1'][EnumTreeItemKeys.PARENT_KEY][EnumTreeItemKeys.FULL_VALUE_KEY]).toBe('node1-1');
    });

    it('should handle fullpath mode', () => {
      const treeMap = new TreeMap({ fullpathMode: true });
      const data = treeMap.createData(sampleData);

      // Verify full paths are created correctly
      expect(data['node1/node1-1/node1-1-1']).toBeDefined();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(data['node1/node1-1/node1-1-1'][EnumTreeItemKeys.FULL_VALUE_KEY]).toBe('node1/node1-1/node1-1-1');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(data['node1/node1-1/node1-1-1'][EnumTreeItemKeys.FULL_LABEL_KEY]).toBe('Node 1/Node 1-1/Node 1-1-1');
    });
  });

  describe('Selection', () => {
    describe('Single Selection', () => {
      it('should select single node in independent mode', async () => {
        const treeMap = new TreeMap({});
        treeMap.createData(sampleData);
        const node = treeMap.data['node1-1-1'];

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const result = await treeMap.singleSelect(node, EnumCheckStrategy.INDEPENDENT);
        expect(result).toBe('node1-1-1');
      });

      it('should allow selection of non-leaf node in independent mode', async () => {
        const treeMap = new TreeMap({});
        treeMap.createData(sampleData);
        const node = treeMap.data['node1-1'];

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const result = await treeMap.singleSelect(node, EnumCheckStrategy.INDEPENDENT);
        expect(result).toBe('node1-1');
      });
    });

    describe('Multiple Selection', () => {
      it('should select node in independent mode', () => {
        const treeMap = new TreeMap({});
        treeMap.createData(sampleData);
        const node = treeMap.data['node1-1-1'];
        const selected = new Set<TreeItemValue>();

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        treeMap.multipleAddSelect(node, selected, EnumCheckStrategy.INDEPENDENT);
        expect(selected.has('node1-1-1')).toBe(true);
        expect(selected.size).toBe(1);
      });

      it('should select all leaf descendants in child mode', () => {
        const treeMap = new TreeMap({});
        treeMap.createData(sampleData);
        const node = treeMap.data['node1'];
        const selected = new Set<TreeItemValue>();

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        treeMap.multipleAddSelect(node, selected, EnumCheckStrategy.CHILD);

        // In child mode, all leaf descendants should be selected
        // node1 has 3 leaf descendants: node1-1-1, node1-1-2, and node1-2
        expect(selected.has('node1-1-1')).toBe(true);
        expect(selected.has('node1-1-2')).toBe(true);
        expect(selected.has('node1-2')).toBe(true);
        expect(selected.has('node1-1')).toBe(false); // Parent should not be selected in child mode
        expect(selected.has('node1')).toBe(false); // Current node should not be selected in child mode
        expect(selected.size).toBe(6); // All leaf descendants
      });

      it('should select parent when all children are selected in parent mode', () => {
        const treeMap = new TreeMap({});
        treeMap.createData(sampleData);
        const node1 = treeMap.data['node1-1-1'];
        const node2 = treeMap.data['node1-1-2'];
        const selected = new Set<TreeItemValue>();

        // Select both children of node1-1
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        treeMap.multipleAddSelect(node1, selected, EnumCheckStrategy.PARENT);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        treeMap.multipleAddSelect(node2, selected, EnumCheckStrategy.PARENT);

        // In parent mode, when all children are selected, the parent should be selected instead
        expect(selected.has('node1-1-1')).toBe(false);
        expect(selected.has('node1-1-2')).toBe(false);
        expect(selected.has('node1-1')).toBe(true);
      });

      it('should select all descendants in all mode', () => {
        const treeMap = new TreeMap({});
        treeMap.createData(sampleData);
        const node = treeMap.data['node1'];
        const selected = new Set<TreeItemValue>();

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        treeMap.multipleAddSelect(node, selected, EnumCheckStrategy.ALL);

        // In all mode, all descendants should be selected
        expect(selected.has('node1')).toBe(true);
        expect(selected.has('node1-1')).toBe(true);
        expect(selected.has('node1-1-1')).toBe(true);
        expect(selected.has('node1-1-2')).toBe(true);
        expect(selected.has('node1-2')).toBe(true);
      });
    });
  });

  describe('isSelectedInMultipleMode', () => {
    it('should return correct selection state for independent mode', () => {
      const treeMap = new TreeMap({});
      treeMap.createData(sampleData);
      const node = treeMap.data['node1-1-1'];
      const selected = new Set(['node1-1-1']);

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const result = treeMap.isSelectedInMultipleMode(node, selected, EnumCheckStrategy.INDEPENDENT);
      expect(result.selected).toBe(true);
      expect(result.isIndeterminate).toBe(false);
    });

    it('should return correct selection state for parent mode', () => {
      const treeMap = new TreeMap({});
      treeMap.createData(sampleData);

      // Select all children of node1-1
      const selected = new Set<TreeItemValue>(['node1-1-1', 'node1-1-2']);

      const parentNode = treeMap.data['node1-1'];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const result = treeMap.isSelectedInMultipleMode(parentNode, selected, EnumCheckStrategy.PARENT);

      expect(result.selected).toBe(false);
      expect(result.isIndeterminate).toBe(true);
    });

    it('should return indeterminate state when some children are selected', () => {
      const treeMap = new TreeMap({});
      treeMap.createData(sampleData);
      const node = treeMap.data['node1-1'];
      const selected = new Set(['node1-1-1']);

      // Only one child is selected
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const result = treeMap.isSelectedInMultipleMode(node, selected, EnumCheckStrategy.PARENT);
      expect(result.selected).toBe(false);
      expect(result.isIndeterminate).toBe(true);
    });
  });

  describe('Node Insertion', () => {
    it('should insert new nodes into existing tree', () => {
      const treeMap = new TreeMap({});
      treeMap.createData(sampleData);

      const newNode = {
        value: 'node1-3',
        label: 'Node 1-3',
        children: [{ value: 'node1-3-1', label: 'Node 1-3-1' }],
      };

      const parentNode = treeMap.data['node1'];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      treeMap.insertNode([newNode], parentNode);

      // Verify new node and its children are added
      expect(treeMap.data['node1-3']).toBeDefined();
      expect(treeMap.data['node1-3-1']).toBeDefined();

      // Verify parent-child relationship
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const node1Children = parentNode.children.map((child: TreeItem) => child.value);
      expect(node1Children).toContain('node1-3');
    });
  });
});
