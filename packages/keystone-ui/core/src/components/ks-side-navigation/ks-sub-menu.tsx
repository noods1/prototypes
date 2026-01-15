import {
  Component,
  h,
  Host,
  State,
  Prop,
  Element,
  Watch,
  Event,
  type ComponentInterface,
  type EventEmitter,
} from '@stencil/core';
import { Consume } from '@src/libs/runtime-context';
import { dir, getTargetParentComponent } from '@src/utils/utils';
import {
  NavigationTreeContext,
  NavigationActiveIndexContext,
  type NavigationContextValue,
} from '@src/context/navigation-context';

import type { NavigationTree } from './utils';
import { sendActionTracking } from '@src/utils/tracking';

const PREFIX = 'sub-menu';

/**
 * @slot prefix - Slot for content to be placed before the sub-menu title, typically an icon.
 * @slot title - Slot for the main text content of the sub-menu title.
 * @slot suffix - Slot for content to be placed after the sub-menu title.
 */
@Component({
  styleUrl: 'styles/ks-sub-menu.scss',
  tag: 'ks-sub-menu',
  shadow: true,
})
export class KsSubMenu implements ComponentInterface {
  private isControlled = false;

  @Element() el!: HTMLKsSubMenuElement;

  @State() internalExpanded = false;

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
   * Whether the sub-menu is disabled.
   */
  @Prop() disabled = false;
  /**
   * The title of the sub-menu.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() title: string;
  /**
   * Indicates whether the sub-menu is expanded by default. If set to `true`, the sub-menu will be in expanded state
   * when first rendered.
   */
  @Prop() defaultExpanded = false;
  /**
   * Indicates whether the sub-menu is expanded. If set to `true`, the sub-menu will be in expanded state.
   * This prop is controlled externally and will override the internal state.
   */
  @Prop() expanded?: boolean;
  @Watch('expanded')
  expandedWatcher(expanded: boolean) {
    if (this.isControlled && expanded !== undefined) {
      this.internalExpanded = expanded;
    }
  }

  /**
   * Emits when the sub-menu's expanded state changes. The event carries a boolean value indicating the new expanded
   * state.
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event() ksChange: EventEmitter<boolean>;

  componentWillLoad() {
    this.isControlled = this.expanded !== undefined;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.internalExpanded = this.isControlled ? this.expanded : this.defaultExpanded;

    const parentSubMenuEl = getTargetParentComponent<HTMLKsSubMenuElement>(this.el, 'ks-sub-menu');
    this.sharedTree?.addTreeNode(this.index, parentSubMenuEl ? parentSubMenuEl.index : null);
  }

  private handleClick = () => {
    if (this.disabled) return;

    const nextExpanded = !this.internalExpanded;

    if (!this.isControlled) {
      this.internalExpanded = nextExpanded;
    }

    this.ksChange.emit(nextExpanded);

    sendActionTracking(this.el, { eventType: 'click' });
  };

  render() {
    const { internalExpanded, index, disabled, title } = this;

    const { level = 0 } = this.sharedTree?.findTreeNode(index) ?? {};
    const isActive = this.sharedTree?.hasDescendant(index, this.sharedActiveIndex) ?? false;

    return (
      <Host dir={dir()} ks-sub-menu>
        <div class={`${PREFIX}-container`} style={{ '--ks-comp-side-navigation-level': `${level}` }}>
          <div
            class={{
              [`${PREFIX}`]: true,
              [`${PREFIX}--active`]: isActive,
              [`${PREFIX}--root`]: level < 1,
              [`${PREFIX}--disabled`]: disabled,
            }}
            onClick={this.handleClick}
            data-testid="ks-sub-menu-index-arucq7"
          >
            <slot name="prefix" />

            <div class={`${PREFIX}-title`}>
              <slot name="title">{title}</slot>
            </div>

            <slot name="suffix" />

            <ks-icon-chevron-down
              size="14"
              class={{ [`${PREFIX}-chevron`]: true, [`${PREFIX}-chevron--rotate`]: internalExpanded }}
            />
          </div>

          <ks-collapse-transition in={internalExpanded}>
            <div class={`${PREFIX}-items`}>
              <slot />
            </div>
          </ks-collapse-transition>
        </div>
      </Host>
    );
  }
}
