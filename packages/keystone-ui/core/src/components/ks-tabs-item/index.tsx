import { Component, h, Prop, Host, ComponentInterface, Element } from '@stencil/core';
import { Slot, Slots } from '@src/utils/decorators';
import { getTargetParentComponent, dir } from '@src/utils/utils';

/**
 * @slot header - Content for the tab's header/label. This content will be displayed in the tab bar by the parent `ks-tabs` component.
 */
@Component({
  tag: 'ks-tabs-item',
  shadow: true,
})
export class KsTabsItem implements ComponentInterface {
  ['ks-name'] = 'ks-tabs-item';

  // eslint-disable-next-line no-undef
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsTabsItemElement;
  /**
   * @locale {en} The unique ID of the current tab.
   * @locale {zh} 当前选项卡的唯一 ID。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() tabId: string;
  /**
   * @locale {en} Indicates whether the current tab is disabled. When `true`, the user will not be able to interact with the tab.
   * @locale {zh} 指示当前选项卡是否被禁用。当为 `true` 时，用户将无法与选项卡交互。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabled: boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'header' }) headerSlot: Slots<HTMLElement & { tabid?: string }>;

  componentDidLoad(): void {
    const parent = getTargetParentComponent<HTMLElement>(this.el, 'ks-tabs');
    if (parent?.querySelectorAll('slot[name="header"]').length > 0) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      parent.removeChild(parent.querySelectorAll('slot[name="header"]'));
    }

    this.headerSlot?.map((item) => {
      item.slot = this.tabId;
      item.id = this.tabId;
      const children = Array.from(parent?.childNodes);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const child = children.find((item) => item?.id === this.tabId);
      if (child) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        parent.removeChild(parent.querySelector(`#${this.tabId}`));
      }
      parent?.appendChild(item);
    });
  }

  render() {
    return (
      <Host dir={dir()} ks-tabs-item role="tabpanel">
        <slot name="header"></slot>
        <slot></slot>
      </Host>
    );
  }
}
