import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsCascaderColumns } from '../index';
import { EnumTreeItemKeys } from '@src/utils/tree/treeMap';

describe('KsCascaderColumns', () => {
  // 基础渲染测试
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [KsCascaderColumns],
      template: () => <ks-cascader-columns />,
    });

    expect(page.root).toBeTruthy();
  });

  // 测试 updateColumnList 方法重置滚动位置
  it('should reset scrollTopMap when updateColumnList is called with option having children', async () => {
    const page = await newSpecPage({
      components: [KsCascaderColumns],
      template: () => <ks-cascader-columns />,
    });

    // 模拟组件实例
    const columnsInstance = page.rootInstance;

    // 设置初始状态
    columnsInstance.columnList = [
      { [EnumTreeItemKeys.FLOOR_KEY]: -1, children: [{ id: 'child1' }] },
      { [EnumTreeItemKeys.FLOOR_KEY]: 0, children: [{ id: 'child2' }] },
      { [EnumTreeItemKeys.FLOOR_KEY]: 1, children: [{ id: 'child3' }] },
    ];

    // 设置初始滚动位置
    columnsInstance.scrollTopMap = {
      [-1]: 100,
      0: 200,
      1: 300,
    };

    // 模拟 updateVisibleRange 方法
    columnsInstance.updateVisibleRange = jest.fn();

    // 调用 updateColumnList 方法
    const activeOption = {
      [EnumTreeItemKeys.FLOOR_KEY]: 0,
      children: [{ id: 'newChild' }],
      needLoad: false,
    };

    await columnsInstance.updateColumnList(activeOption);

    // 手动调用 componentDidUpdate 确保 updateScrollIntoView 被执行
    columnsInstance.componentDidUpdate();

    // 验证滚动位置是否被重置
    expect(columnsInstance.scrollTopMap[0]).toBe(0);
    expect(columnsInstance.scrollTopMap[1]).toBe(0);
    expect(columnsInstance.scrollTopMap[-1]).toBe(100); // 当前层级之前的不应被重置

    // 验证 isColumnAdded 标志是否被设置
    expect(columnsInstance.isColumnAdded).toBe(false);
  });

  // 测试 updateColumnList 方法在没有子节点时重置滚动位置
  it('should reset scrollTopMap when updateColumnList is called with option having no children', async () => {
    const page = await newSpecPage({
      components: [KsCascaderColumns],
      template: () => <ks-cascader-columns />,
    });

    // 模拟组件实例
    const columnsInstance = page.rootInstance;

    // 设置初始状态
    columnsInstance.columnList = [
      { [EnumTreeItemKeys.FLOOR_KEY]: 0, children: [{ id: 'child1' }] },
      { [EnumTreeItemKeys.FLOOR_KEY]: 1, children: [{ id: 'child2' }] },
    ];

    // 设置初始滚动位置，确保只有 0 和 1 这两个键，对应 winEl.children 中的索引 1 和 2
    columnsInstance.scrollTopMap = {
      0: 100,
      1: 200,
      // 不要添加 2 或更高的键，因为 winEl.children 中没有对应的元素
    };

    // 模拟 needHasChildren 方法返回 false
    columnsInstance.needHasChildren = jest.fn().mockReturnValue(false);

    // 模拟 updateVisibleRange 方法
    columnsInstance.updateVisibleRange = jest.fn();

    // 调用 updateColumnList 方法
    const activeOption = {
      [EnumTreeItemKeys.FLOOR_KEY]: 1,
      children: [],
    };

    await columnsInstance.updateColumnList(activeOption);

    // 验证 isColumnAdded 标志是否被设置
    expect(columnsInstance.isColumnAdded).toBe(true);

    // 手动调用 componentDidUpdate 确保 updateScrollIntoView 被执行
    columnsInstance.componentDidUpdate();

    // 验证滚动位置是否被重置
    expect(columnsInstance.scrollTopMap[1]).toBe(0);
    expect(columnsInstance.scrollTopMap[0]).toBe(100); // 当前层级之前的不应被重置

    // 验证 isColumnAdded 标志是否被设置
    expect(columnsInstance.isColumnAdded).toBe(false);
  });

  // 测试 componentDidUpdate 方法调用 updateScrollIntoView
  it('should call updateScrollIntoView in componentDidUpdate when isColumnAdded is true', async () => {
    const page = await newSpecPage({
      components: [KsCascaderColumns],
      template: () => <ks-cascader-columns />,
    });

    // 模拟组件实例
    const columnsInstance = page.rootInstance;

    // 模拟 updateScrollIntoView 方法
    columnsInstance.updateScrollIntoView = jest.fn();

    // 设置 isColumnAdded 为 true
    columnsInstance.isColumnAdded = true;

    // 手动调用 componentDidUpdate
    columnsInstance.componentDidUpdate();

    // 验证 updateScrollIntoView 是否被调用
    expect(columnsInstance.updateScrollIntoView).toHaveBeenCalled();

    // 验证 isColumnAdded 是否被重置为 false
    expect(columnsInstance.isColumnAdded).toBe(false);
  });

  // 测试 DOM 元素滚动位置重置
  it('should reset DOM element scrollTop in updateColumnList', async () => {
    const page = await newSpecPage({
      components: [KsCascaderColumns],
      template: () => <ks-cascader-columns />,
    });

    // 模拟组件实例
    const columnsInstance = page.rootInstance;

    // 创建模拟 DOM 元素
    const mockColumnEl1 = { scrollTop: 100 };
    const mockColumnEl2 = { scrollTop: 200 };
    const mockColumnEl3 = { scrollTop: 300 };

    // 模拟 winEl 和其子元素
    columnsInstance.winEl = {
      children: [null, mockColumnEl1, mockColumnEl2, mockColumnEl3], // 第一个元素是标题行，所以从索引 1 开始
    };

    // 设置初始状态
    columnsInstance.columnList = [
      { [EnumTreeItemKeys.FLOOR_KEY]: -1, children: [{ id: 'child1' }] },
      { [EnumTreeItemKeys.FLOOR_KEY]: 0, children: [{ id: 'child2' }] },
    ];

    // 设置初始滚动位置
    columnsInstance.scrollTopMap = {
      [-1]: 100,
      0: 200,
    };

    // 模拟 requestAnimationFrame
    const originalRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = jest.fn((cb) => {
      cb(performance.now());
      return 1;
    });

    // 模拟 needHasChildren 方法返回 true
    columnsInstance.needHasChildren = jest.fn().mockReturnValue(true);

    // 模拟 updateVisibleRange 方法
    columnsInstance.updateVisibleRange = jest.fn();

    // 调用 updateColumnList 方法
    const activeOption = {
      [EnumTreeItemKeys.FLOOR_KEY]: -1,
      children: [{ id: 'newChild' }],
    };

    // 在调用 updateColumnList 后
    await columnsInstance.updateColumnList(activeOption);

    // 手动调用 componentDidUpdate 确保 updateScrollIntoView 被执行
    columnsInstance.componentDidUpdate();

    // 验证 DOM 元素的 scrollTop 是否被重置
    expect(mockColumnEl1.scrollTop).toBe(0);

    // 恢复原始的 requestAnimationFrame
    window.requestAnimationFrame = originalRAF;
  });

  // 测试 activeOption 没有变化，不应该设置为0
  it('should not set scrollTopMap to 0 when activeOption does not change', async () => {
    const page = await newSpecPage({
      components: [KsCascaderColumns],
      template: () => <ks-cascader-columns />,
    });

    // 模拟组件实例
    const columnsInstance = page.rootInstance;

    const activeOption = {
      [EnumTreeItemKeys.FLOOR_KEY]: 0,
      children: [{ id: 'child1' }],
    };

    // 设置初始状态
    columnsInstance.columnList = [{ [EnumTreeItemKeys.FLOOR_KEY]: -1, children: [{ id: 'child1' }] }, activeOption];

    // 设置初始滚动位置
    columnsInstance.scrollTopMap = {
      0: 100,
      1: 200,
    };

    // 模拟 needHasChildren 方法返回 false
    columnsInstance.needHasChildren = jest.fn().mockReturnValue(false);

    // 模拟 updateVisibleRange 方法
    columnsInstance.updateVisibleRange = jest.fn();

    // 在调用 updateColumnList 后
    await columnsInstance.updateColumnList(activeOption);

    // 验证 DOM 元素的 scrollTop 是否被重置
    expect(columnsInstance.scrollTopMap[0]).toBe(100);
    expect(columnsInstance.scrollTopMap[1]).toBe(200);
  });
});
