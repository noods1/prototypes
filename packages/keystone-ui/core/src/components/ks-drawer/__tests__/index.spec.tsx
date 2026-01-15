import { newSpecPage } from '@stencil/core/testing';
import { KsDrawer } from '../index'; // 假设 index.tsx 定义了 KsDrawer
import { h } from '@stencil/core';

describe('ks-drawer spec tests for allowBackgroundInteraction', () => {
  it('should have underlay width "fit-content" and no mask when allowBackgroundInteraction is true', async () => {
    const page = await newSpecPage({
      components: [KsDrawer],
      template: () => <ks-drawer visible allowBackgroundInteraction={true} title-text="Test Drawer"></ks-drawer>,
    });

    const drawer = page.rootInstance as KsDrawer;
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const underlay = page.root.shadowRoot.querySelector('.drawer__underlay') as HTMLElement;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const mask = page.root.shadowRoot.querySelector('div[part="mask"]');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const overlay = page.root.shadowRoot.querySelector('ks-overlay');

    expect(drawer.allowBackgroundInteraction).toBe(true); // 确认 prop 的值
    expect(underlay.style.width).toBe('fit-content');
    expect(mask).toBeNull(); // 遮罩层不应被渲染
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(overlay.getAttribute('type')).toBe('popover');
  });

  it('should display normal when deprecatedDisableTopLayer is true', async () => {
    const page = await newSpecPage({
      components: [KsDrawer],
      template: () => (
        <ks-drawer
          deprecatedDisableTopLayer={true}
          allowBackgroundInteraction={true}
          visible={true}
          title-text="Test Drawer"
        ></ks-drawer>
      ),
    });

    const drawer = page.rootInstance as KsDrawer;
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const underlay = page.root.shadowRoot.querySelector('.drawer__underlay') as HTMLElement;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const overlay = page.root.shadowRoot.querySelector('ks-overlay');

    expect(drawer.allowBackgroundInteraction).toBe(true); // 确认 prop 的值
    expect(underlay.style.width).toBe('fit-content');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(overlay.getAttribute('type')).toBe('popover');
  });
});
