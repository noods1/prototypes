import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsLoadingContainer } from '../index';
import { KsSpinner } from '@src/components/ks-spinner';

describe('ks-loading-container', () => {
  it('renders default slot content and is visible when not loading', async () => {
    const page = await newSpecPage({
      components: [KsLoadingContainer, KsSpinner],
      template: () => (
        <ks-loading-container>
          <ks-spinner slot="loading"></ks-spinner>
          <div>content</div>
        </ks-loading-container>
      ),
    });
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const contentWrapper = page.root.shadowRoot.querySelector('.loading-container');
    expect(contentWrapper).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(contentWrapper.getAttribute('style')).toContain('opacity: 1');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const slot = contentWrapper.querySelector('slot:not([name])') as HTMLSlotElement;
    const assignedNodes = slot.assignedNodes();
    expect(assignedNodes.length).toBeGreaterThan(0);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(assignedNodes[0].textContent).toBe('content');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const loadingWrapper = page.root.shadowRoot.querySelector('.loading-container__loading');
    expect(loadingWrapper).toBeNull();
  });

  it('hides default slot and shows loading slot when loading', async () => {
    const page = await newSpecPage({
      components: [KsLoadingContainer, KsSpinner],
      template: () => (
        <ks-loading-container loading={true}>
          <ks-spinner slot="loading"></ks-spinner>
          <div>content should be hidden</div>
        </ks-loading-container>
      ),
    });
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const contentWrapper = page.root.shadowRoot.querySelector('.loading-container');
    expect(contentWrapper).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(contentWrapper.getAttribute('style')).toContain('opacity: 0');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const loadingWrapper = page.root.shadowRoot.querySelector('.loading-container__loading');
    expect(loadingWrapper).not.toBeNull();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const loadingSlot = loadingWrapper.querySelector('slot[name="loading"]') as HTMLSlotElement;
    expect(loadingSlot).not.toBeNull();

    const assignedElements = loadingSlot.assignedElements();
    expect(assignedElements.length).toBe(1);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(assignedElements[0].tagName.toLowerCase()).toBe('ks-spinner');
  });
});
