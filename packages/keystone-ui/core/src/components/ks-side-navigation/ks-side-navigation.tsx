import {
  Component,
  h,
  Host,
  Prop,
  Element,
  Event,
  Watch,
  Listen,
  type ComponentInterface,
  type EventEmitter,
} from '@stencil/core';
import { dir } from '@src/utils/utils';
import { Provide } from '@src/libs/runtime-context';
import { Slot, type Slots } from '@src/utils/decorators';
import { registerPluginManager } from '@src/utils/plugin';
import {
  NavigationTreeContext,
  NavigationActiveIndexContext,
  type NavigationContextValue,
} from '@src/context/navigation-context';
import { logger } from '@src/utils/logger';
import { NavigationTree } from './utils';

const PREFIX = 'side-navigation';

/**
 * @slot title - Slot for the main title text of the side navigation.
 * @slot banner - Slot for placing additional components between the title section and the main navigation content.
 * @slot footer - Slot for content to be placed at the bottom of the side navigation panel.
 */
@Component({
  styleUrl: 'styles/ks-side-navigation.scss',
  tag: 'ks-side-navigation',
  shadow: true,
})
export class KsSideNavigation implements ComponentInterface {
  private isControlled = false;

  @Element() el!: HTMLKsSideNavigationElement;

  @Provide({ context: NavigationTreeContext })
  sharedTree: NavigationContextValue<NavigationTree>['tree'] = new NavigationTree();
  @Provide({ context: NavigationActiveIndexContext }) sharedActiveIndex: NavigationContextValue['activeIndex'] = '';

  /**
   * The index of the menu-item that is selected by default
   */
  @Prop() defaultActive = '';
  /**
   * The index of the menu-item that is selected
   */
  @Prop() active?: string;
  @Watch('active')
  activeWatcher(active: string) {
    if (this.isControlled && active !== undefined) {
      this.sharedActiveIndex = active;
    }
  }
  /**
   * Wether to show title
   */
  @Prop() showTitle = true;
  /**
   * The title of the side-navigation
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() title: string;

  /**
   * Triggered when a menu item is selected
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event() ksSelect: EventEmitter<string>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'title' }) titleSlots: Slots;
  @Slot({
    slotname: '_default',
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    filter: (node) => node.hasAttribute('ks-sub-menu') || node.hasAttribute('ks-menu-item'),
  })
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  defaultSlots: Slots<HTMLKsSubMenuElement | HTMLKsMenuItemElement>;

  @Listen('ks-side-navigation:set-active-index')
  protected setActiveIndex(e: CustomEvent<string>) {
    e.stopPropagation();

    if (!this.isControlled) {
      this.sharedActiveIndex = e.detail;
    }

    this.ksSelect.emit(e.detail);
  }

  constructor() {
    registerPluginManager(this.el);
  }

  componentWillLoad() {
    this.isControlled = this.active !== undefined;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.sharedActiveIndex = this.isControlled ? this.active : this.defaultActive;
  }

  componentDidLoad() {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    logger.debug(`KsSideNavigation componentDidLoad, the tree is: ${JSON.stringify(this.sharedTree.getTree())}`);
  }

  render() {
    const { showTitle, title, titleSlots } = this;

    return (
      <Host dir={dir()} ks-side-navigation>
        <div class={PREFIX}>
          {(title || titleSlots) && (
            <div class={{ [`${PREFIX}-title`]: true, [`${PREFIX}-title--hide`]: !showTitle }}>
              <slot name="title">{title}</slot>
            </div>
          )}

          <slot name="banner" />

          <div class={`${PREFIX}-content`}>
            <slot />
          </div>

          <slot name="footer" />
        </div>
      </Host>
    );
  }
}
