import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsScrollbar } from '../index';

describe('ks-scrollbar component', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [KsScrollbar],
      html: `<ks-scrollbar><div id="content">Hello World</div></ks-scrollbar>`,
    });
    expect(page.root).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot).toBeTruthy();
    // Check default thin value
    expect(page.rootInstance.thin).toBe(false);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.getAttribute('ks-thin')).toBeFalsy();

    // Check slot content
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const slotContent = page.root.querySelector('#content');
    expect(slotContent).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(slotContent.textContent).toBe('Hello World');
  });

  it('should set thin property correctly', async () => {
    const page = await newSpecPage({
      components: [KsScrollbar],
      html: `<ks-scrollbar thin="true"><div id="content">Thin Scrollbar</div></ks-scrollbar>`,
    });
    expect(page.rootInstance.thin).toBe(true);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.hasAttribute('ks-thin')).toBe(true);
  });

  it('should reflect thin property change', async () => {
    const page = await newSpecPage({
      components: [KsScrollbar],
      html: `<ks-scrollbar><div id="content">Test</div></ks-scrollbar>`,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.hasAttribute('ks-thin')).toBe(false);

    page.rootInstance.thin = true;
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.hasAttribute('ks-thin')).toBe(true);

    page.rootInstance.thin = false;
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.hasAttribute('ks-thin')).toBe(false);
  });

  it('should render slot content', async () => {
    const page = await newSpecPage({
      components: [KsScrollbar],
      template: () => (
        <ks-scrollbar>
          <span class="test-content">Slotted Content</span>
        </ks-scrollbar>
      ),
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const slottedElement = page.root.querySelector('.test-content');
    expect(slottedElement).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(slottedElement.textContent).toBe('Slotted Content');
  });
});
