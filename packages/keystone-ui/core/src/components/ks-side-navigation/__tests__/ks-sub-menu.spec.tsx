import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KsSubMenu } from '../ks-sub-menu';
import { KsMenuItem } from '../ks-menu-item';
import { KsSideNavigation } from '../ks-side-navigation';

describe('KsSubMenu', () => {
  it('should handle default expanded submenus', async () => {
    const page = await newSpecPage({
      components: [KsSideNavigation, KsSubMenu, KsMenuItem],
      template: () => (
        <ks-side-navigation>
          <ks-sub-menu defaultExpanded index="1" title="SubMenu 1">
            <ks-menu-item index="1-1">Item 1-1</ks-menu-item>
          </ks-sub-menu>
        </ks-side-navigation>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const subMenu = page.root.querySelector('ks-sub-menu');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const shadowSubMenu = subMenu.shadowRoot.querySelector<HTMLDivElement>('[data-testid=ks-sub-menu-index-arucq7]');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(subMenu.shadowRoot.querySelector('.sub-menu-chevron')).toHaveClass('sub-menu-chevron--rotate');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    shadowSubMenu.click();
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(subMenu.shadowRoot.querySelector('.sub-menu-chevron')).not.toHaveClass('sub-menu-chevron--rotate');
  });

  it('should not handle submenu selection when disabled', async () => {
    const page = await newSpecPage({
      components: [KsSideNavigation, KsSubMenu, KsMenuItem],
      template: () => (
        <ks-side-navigation>
          <ks-sub-menu disabled index="1" title="SubMenu 1">
            <ks-menu-item index="1-1">Item 1-1</ks-menu-item>
          </ks-sub-menu>
        </ks-side-navigation>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const subMenu = page.root.querySelector('ks-sub-menu');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const shadowSubMenu = subMenu.shadowRoot.querySelector<HTMLDivElement>('[data-testid=ks-sub-menu-index-arucq7]');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    shadowSubMenu.click();
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(subMenu.shadowRoot.querySelector('.sub-menu-chevron')).not.toHaveClass('sub-menu-chevron--rotate');
  });

  it('should not handle submenu selection when controlled', async () => {
    const page = await newSpecPage({
      components: [KsSideNavigation, KsSubMenu, KsMenuItem],
      template: () => (
        <ks-side-navigation>
          <ks-sub-menu expanded={false} index="1" title="SubMenu 1">
            <ks-menu-item index="1-1">Item 1-1</ks-menu-item>
          </ks-sub-menu>
        </ks-side-navigation>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const subMenu = page.root.querySelector('ks-sub-menu');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const shadowSubMenu = subMenu.shadowRoot.querySelector<HTMLDivElement>('[data-testid=ks-sub-menu-index-arucq7]');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    shadowSubMenu.click();
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(subMenu.shadowRoot.querySelector('.sub-menu-chevron')).not.toHaveClass('sub-menu-chevron--rotate');
  });

  it('should handle submenu selection and show expanded state', async () => {
    const page = await newSpecPage({
      components: [KsSideNavigation, KsSubMenu, KsMenuItem],
      template: () => (
        <ks-side-navigation>
          <ks-sub-menu
            index="1"
            title="SubMenu 1"
            expanded={false}
            onKsChange={function ({ detail }: CustomEvent<boolean>) {
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              (this as HTMLKsSubMenuElement).expanded = detail;
            }}
          >
            <ks-menu-item index="1-1">Item 1-1</ks-menu-item>
          </ks-sub-menu>
        </ks-side-navigation>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const subMenu = page.root.querySelector('ks-sub-menu');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const shadowSubMenu = subMenu.shadowRoot.querySelector<HTMLDivElement>('[data-testid=ks-sub-menu-index-arucq7]');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    shadowSubMenu.click();
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(subMenu.shadowRoot.querySelector('.sub-menu-chevron')).toHaveClass('sub-menu-chevron--rotate');
  });
});
