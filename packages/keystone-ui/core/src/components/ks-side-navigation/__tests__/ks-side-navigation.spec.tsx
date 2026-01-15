import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KsMenuItem } from '../ks-menu-item';
import { KsSideNavigation } from '../ks-side-navigation';

describe('KsSideNavigation', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [KsSideNavigation],
      template: () => <ks-side-navigation></ks-side-navigation>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.side-navigation')).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.side-navigation-content')).toBeTruthy();
  });

  it('should not show title when showTitle is false', async () => {
    const page = await newSpecPage({
      components: [KsSideNavigation],
      template: () => <ks-side-navigation showTitle={false}></ks-side-navigation>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.side-navigation-title')).toBeFalsy();
  });

  it('should render title prop correctly', async () => {
    const title = 'Test Title';
    const page = await newSpecPage({
      components: [KsSideNavigation],
      template: () => <ks-side-navigation title={title} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.side-navigation-title').textContent).toBe(title);
  });

  it('should render banner and footer slots', async () => {
    const page = await newSpecPage({
      components: [KsSideNavigation],
      template: () => (
        <ks-side-navigation>
          <div slot="banner">Banner Content</div>
          <div slot="footer">Footer Content</div>
        </ks-side-navigation>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('slot[name="banner"]')).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('slot[name="footer"]')).toBeTruthy();
  });

  it('should set default active item', async () => {
    const page = await newSpecPage({
      components: [KsSideNavigation, KsMenuItem],
      template: () => (
        <ks-side-navigation defaultActive="2">
          <ks-menu-item index="1">Item 1</ks-menu-item>
          <ks-menu-item index="2">Item 2</ks-menu-item>
        </ks-side-navigation>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const menuItem = page.root.querySelectorAll('ks-menu-item');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(menuItem[1].shadowRoot.querySelector('.menu-item')).toHaveClass('menu-item--active');
  });

  it('should set active state when manually set active prop', async () => {
    const page = await newSpecPage({
      components: [KsSideNavigation, KsMenuItem],
      template: () => (
        <ks-side-navigation active="1">
          <ks-menu-item index="1">Item 1</ks-menu-item>
          <ks-menu-item index="2">Item 2</ks-menu-item>
        </ks-side-navigation>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const menuItem = page.root.querySelectorAll('ks-menu-item');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(menuItem[0].shadowRoot.querySelector('.menu-item')).toHaveClass('menu-item--active');

    const sideNavigation = page.root as HTMLKsSideNavigationElement;
    sideNavigation.active = '2';
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(menuItem[1].shadowRoot.querySelector('.menu-item')).toHaveClass('menu-item--active');
  });

  it('should handle menu item selection and show active state', async () => {
    const page = await newSpecPage({
      components: [KsSideNavigation, KsMenuItem],
      template: () => (
        <ks-side-navigation>
          <ks-menu-item index="1">Item 1</ks-menu-item>
        </ks-side-navigation>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const menuItem = page.root.querySelector('ks-menu-item');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const shadowMenuItem = menuItem.shadowRoot.querySelector<HTMLDivElement>('[data-testid=ks-menu-item-index-3Vpe2J]');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    shadowMenuItem.click();
    await page.waitForChanges();

    expect(shadowMenuItem).toHaveClass('menu-item--active');
  });

  it('should not handle menu item selection when disabled', async () => {
    const page = await newSpecPage({
      components: [KsSideNavigation, KsMenuItem],
      template: () => (
        <ks-side-navigation>
          <ks-menu-item disabled index="1">
            Item 1
          </ks-menu-item>
        </ks-side-navigation>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const menuItem = page.root.querySelector('ks-menu-item');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const shadowMenuItem = menuItem.shadowRoot.querySelector<HTMLDivElement>('[data-testid=ks-menu-item-index-3Vpe2J]');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    shadowMenuItem.click();
    await page.waitForChanges();

    expect(shadowMenuItem).not.toHaveClass('menu-item--active');
  });
});
