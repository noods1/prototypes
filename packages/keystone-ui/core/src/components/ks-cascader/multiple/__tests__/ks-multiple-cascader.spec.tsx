import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsMultipleCascader } from '../index';
import { KsCascaderSearchlist } from '../../searchlist';
import { KsCascaderColumns } from '../../columns';
import { KsInput } from '@src/components/ks-input';

describe('KsMultipleCascader', () => {
  // 基础渲染测试
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [KsMultipleCascader, KsCascaderColumns],
      template: () => <ks-multiple-cascader />,
    });

    // 模拟 columnsEl
    page.rootInstance.columnsEl = {
      initColumnList: jest.fn(),
    };

    expect(page.root).toBeTruthy();
  });

  // 测试 searchValue 属性
  it('should set queryString when searchValue prop is provided', async () => {
    const page = await newSpecPage({
      components: [KsMultipleCascader, KsInput, KsCascaderSearchlist, KsCascaderColumns],
      template: () => <ks-multiple-cascader searchable={true} searchValue="test" />,
    });

    expect(page.rootInstance.queryString).toBe('test');
  });

  // 测试 searchValue 属性变化
  it('should update queryString when searchValue prop changes', async () => {
    const page = await newSpecPage({
      components: [KsMultipleCascader, KsInput, KsCascaderSearchlist, KsCascaderColumns],
      template: () => <ks-multiple-cascader searchable={true} searchValue="test" />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.searchValue = 'updated';
    await page.waitForChanges();

    expect(page.rootInstance.queryString).toBe('updated');
  });

  // 测试 ksSearchChange 事件
  it('should emit ksSearchChange event when search input changes', async () => {
    const page = await newSpecPage({
      components: [KsMultipleCascader, KsInput, KsCascaderSearchlist, KsCascaderColumns],
      template: () => <ks-multiple-cascader searchable={true} />,
    });

    const searchChangeHandler = jest.fn();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.addEventListener('ksSearchChange', searchChangeHandler);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const searchInput = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    searchInput.dispatchEvent(new CustomEvent('ksChange', { detail: 'search text' }));
    await page.waitForChanges();

    expect(searchChangeHandler).toHaveBeenCalled();
    expect(searchChangeHandler.mock.calls[0][0].detail).toBe('search text');
  });

  // 测试 close 方法
  it('should close the popover when close method is called', async () => {
    const page = await newSpecPage({
      components: [KsMultipleCascader, KsInput, KsCascaderSearchlist, KsCascaderColumns],
      template: () => <ks-multiple-cascader />,
    });

    // 模拟 popoverEl
    page.rootInstance.popoverEl = {
      close: jest.fn().mockResolvedValue(undefined),
    };

    await page.rootInstance.close();
    expect(page.rootInstance.popoverEl.close).toHaveBeenCalled();
  });

  // 测试受控模式下的 searchValue
  it('should not update queryString when searchValue is controlled', async () => {
    const page = await newSpecPage({
      components: [KsMultipleCascader, KsInput, KsCascaderSearchlist, KsCascaderColumns],
      template: () => <ks-multiple-cascader searchable={true} searchValue="controlled" />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const searchInput = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    searchInput.dispatchEvent(new CustomEvent('ksChange', { detail: 'new value' }));
    await page.waitForChanges();

    // queryString 不应该更新，因为 searchValue 是受控的
    expect(page.rootInstance.queryString).toBe('controlled');
  });
});
