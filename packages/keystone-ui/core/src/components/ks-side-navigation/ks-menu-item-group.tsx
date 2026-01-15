import { Component, Element, h, Host, Prop, State, type ComponentInterface } from '@stencil/core';
import { dir, getTargetParentComponent } from '@src/utils/utils';
import { Consume } from '@src/libs/runtime-context';
import { NavigationTreeContext, type NavigationContextValue } from '@src/context/navigation-context';

import type { NavigationTree } from './utils';

const PREFIX = 'menu-item-group';

/**
 * @slot title - Slot for the title.
 */
@Component({
  styleUrl: 'styles/ks-menu-item-group.scss',
  tag: 'ks-menu-item-group',
  shadow: true,
})
export class KsMenuItemGroup implements ComponentInterface {
  @Element() el!: HTMLKsMenuItemGroupElement;

  @State() level = 0;

  @Consume({ context: NavigationTreeContext })
  sharedTree?: NavigationContextValue<NavigationTree>['tree'];

  /**
   * The title of the menu-group.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() title: string;

  componentWillLoad() {
    const parentSubMenuEl = getTargetParentComponent<HTMLKsSubMenuElement>(this.el, 'ks-sub-menu');
    if (parentSubMenuEl) {
      this.level = (this.sharedTree?.findTreeNode(parentSubMenuEl.index)?.level ?? 0) + 1;
    }
  }

  render() {
    const { level, title } = this;

    return (
      <Host dir={dir()} ks-menu-item-group>
        <div class={PREFIX} style={{ '--ks-comp-side-navigation-level': `${level}` }}>
          <div class={{ [`${PREFIX}-title`]: true, [`${PREFIX}-title--root`]: level < 1 }}>
            <slot name="title">{title}</slot>
          </div>

          <slot />
        </div>
      </Host>
    );
  }
}
