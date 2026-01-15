import { Component, Element, h, Host, Prop, type ComponentInterface } from '@stencil/core';
import { Consume } from '@src/libs/runtime-context';
import { dir, getTargetParentComponent } from '@src/utils/utils';
import {
  NavigationTreeContext,
  NavigationActiveIndexContext,
  type NavigationContextValue,
} from '@src/context/navigation-context';
import { sendActionTracking } from '@src/utils/tracking';
import { registerPluginManager } from '@src/utils/plugin';

import type { NavigationTree } from './utils';

const PREFIX = 'menu-item';

/**
 * @slot prefix - Slot for content to be placed before the main menu item text, typically an icon.
 * @slot suffix - Slot for content to be placed after the main menu item text.
 */
@Component({
  styleUrl: 'styles/ks-menu-item.scss',
  tag: 'ks-menu-item',
  shadow: true,
})
export class KsMenuItem implements ComponentInterface {
  @Element() el!: HTMLKsMenuItemElement;

  @Consume({ context: NavigationTreeContext })
  sharedTree?: NavigationContextValue<NavigationTree>['tree'];
  @Consume({ context: NavigationActiveIndexContext, subscribe: true })
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  sharedActiveIndex: NavigationContextValue['activeIndex'];

  /**
   * Unique identifier for the menu item.
   */
  @Prop() index = '';
  /**
   * Whether the menu item is disabled.
   */
  @Prop() disabled = false;

  constructor() {
    registerPluginManager(this.el);
  }

  componentWillLoad() {
    const parentSubMenuEl = getTargetParentComponent<HTMLKsSubMenuElement>(this.el, 'ks-sub-menu');
    this.sharedTree?.addTreeNode(this.index, parentSubMenuEl ? parentSubMenuEl.index : null);
  }

  private handleClick = () => {
    if (this.disabled) return;

    this.el.dispatchEvent(
      new CustomEvent('ks-side-navigation:set-active-index', { bubbles: true, composed: true, detail: this.index }),
    );

    sendActionTracking(this.el, { eventType: 'click', componentParams: { value: this.index } });
  };

  render() {
    const { index, disabled } = this;

    const isActive = this.sharedActiveIndex === index;
    const { level = 0 } = this.sharedTree?.findTreeNode(index) ?? {};

    return (
      <Host dir={dir()} ks-menu-item>
        <div
          class={{
            [PREFIX]: true,
            [`${PREFIX}--active`]: isActive,
            [`${PREFIX}--root`]: level < 1,
            [`${PREFIX}--disabled`]: disabled,
          }}
          style={{ '--ks-comp-side-navigation-level': `${level}` }}
          onClick={this.handleClick}
          data-testid="ks-menu-item-index-3Vpe2J"
        >
          <slot name="prefix" />

          <div class={`${PREFIX}-content`}>
            <slot />
          </div>

          <slot name="suffix" />
        </div>
      </Host>
    );
  }
}
