import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsSearch } from '../index';
// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
import { KsButton } from '@src/components/ks-button';

describe('KsSearch', () => {
  it('should render success', async () => {
    const page = await newSpecPage({
      components: [KsSearch],
      template: () => <ks-search></ks-search>,
    });

    expect(page.root).toBeTruthy();
  });

  it('should render with categories and emit event when category changed', async () => {
    const categories = [
      { key: '1', label: 'Category 1' },
      { key: '2', label: 'Category 2' },
    ];
    const page = await newSpecPage({
      components: [KsSearch],
      template: () => <ks-search categories={categories}></ks-search>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const inputSelector = page.root.shadowRoot.querySelector('ks-input-selector');
    expect(inputSelector).toBeTruthy();

    const ksCategoryChange = jest.fn();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.addEventListener('ksCategoryChange', ksCategoryChange);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    inputSelector.dispatchEvent(new CustomEvent('ksChange', { detail: '2' }));
    await page.waitForChanges();

    expect(ksCategoryChange).toHaveBeenCalledWith(expect.objectContaining({ detail: '2' }));
  });
});
