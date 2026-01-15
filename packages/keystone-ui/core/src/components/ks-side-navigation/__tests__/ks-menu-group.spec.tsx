import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KsSubMenu } from '../ks-sub-menu';
import { KsMenuItem } from '../ks-menu-item';
import { KsMenuItemGroup } from '../ks-menu-item-group';
import { KsSideNavigation } from '../ks-side-navigation';

describe('KsMenuItemGroup', () => {
  it('should handle level correctly when nested', async () => {
    const page = await newSpecPage({
      components: [KsSideNavigation, KsMenuItemGroup, KsSubMenu, KsMenuItem],
      template: () => (
        <ks-side-navigation>
          <ks-sub-menu index="1" title="SubMenu 1">
            <ks-menu-item-group title="Group 1">
              <ks-menu-item index="1">Item 1</ks-menu-item>
            </ks-menu-item-group>
          </ks-sub-menu>
        </ks-side-navigation>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const menuItemGroup = page.root
      .querySelector('ks-menu-item-group')
      .shadowRoot.querySelector<HTMLDivElement>('.menu-item-group');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(menuItemGroup.style.getPropertyValue('--ks-comp-side-navigation-level')).toBe('1');
  });
});
