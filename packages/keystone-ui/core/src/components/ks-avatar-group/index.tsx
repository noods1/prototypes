import { Component, Prop, h, Host, Element, Watch } from '@stencil/core';
import { dir } from '@src/utils/utils';
import { Slot, type Slots } from '@src/utils/decorators';
import { AvatarPropShape, AvatarSize } from '../../entities';

const prefix = 'avatar-group';

@Component({
  tag: 'ks-avatar-group',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsAvatar {
  ['ks-name'] = 'ks-avatar-group';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsAvatarGroupElement;

  /**
   * @locale {en} The maximum number of avatar components to display simultaneously in the avatar group. If the number of avatars exceeds this value, the remaining ones will be collapsed.
   * @locale {zh} 头像组中同时显示的最多头像数量。如果头像数量超过此值，多余的头像将被收起。
   */
  @Prop() max = 5;
  /**
   * @locale {en} The total number of avatars this group represents. If provided, this value is used to calculate the surplus count when the number of displayed avatars (up to `max`) is less than `total`. If not provided, `total` defaults to the actual number of slotted `ks-avatar` child components.
   * @locale {zh} 此头像组代表的头像总数。如果提供此值，当显示的头像数量（最多 `max` 个）少于 `total` 时，该值将用于计算超出部分的数量。如果未提供，`total` 将默认为实际插入的 `ks-avatar` 子组件的数量。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() total: number;
  /**
   * @locale {en} The size of the avatar components in the avatar group. This is the same as the `size` property of the individual avatars and can be one of the following values: `"sm"`, `"md"`, or `"lg"`.
   * @locale {zh} 头像组中头像的尺寸。这与单个头像的 `size` 属性相同，可选值为：`"sm"`、`"md"` 或 `"lg"`。
   */
  @Prop() size: AvatarSize = 'md';
  /**
   * @locale {en} The shape of the avatar components in the avatar group. This is the same as the `shape` property of the individual avatars and can be one of the following values: `"square"` or `"circle"`.
   * @locale {zh} 头像组中头像的形状。这与单个头像的 `shape` 属性相同，可选值为：`"square"` 或 `"circle"`。
   */
  @Prop() shape: AvatarPropShape = 'circle';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default', filter: (node: Element) => node['ks-name'] === 'ks-avatar' })
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  defaultSlots: Slots<HTMLKsAvatarElement>;

  componentWillLoad() {
    if (this.total === undefined) {
      this.total = this.defaultSlots?.length ?? 0;
    }

    this.maxWatcher(this.max);
    this.sizeWatcher(this.size);
    this.shapeWatcher(this.shape);
  }

  @Watch('max')
  maxWatcher(val: number) {
    this.defaultSlots?.forEach((item, index) => {
      if (index >= val) {
        item.setAttribute('style-hidden', '');
      } else {
        item.removeAttribute('style-hidden');
      }
    });
  }

  @Watch('size')
  sizeWatcher(val: AvatarSize) {
    this.defaultSlots?.forEach((item) => {
      item.size = val;
    });
  }

  @Watch('shape')
  shapeWatcher(val: AvatarPropShape) {
    this.defaultSlots?.forEach((item) => {
      item.shape = val;
    });
  }

  handleChangeSlot() {
    this.maxWatcher(this.max);
  }

  get hiddenAvatarCount() {
    return this.total - Math.min(this.max, this.defaultSlots?.length ?? 0);
  }

  render() {
    return (
      <Host dir={dir()} ks-avatar-group>
        <div dir={dir()} part="self" class={prefix}>
          <slot onSlotchange={this.handleChangeSlot.bind(this)} data-testid="ks-avatar-group-index-f3kCbx"></slot>
          {this.hiddenAvatarCount > 0 && (
            <ks-avatar
              class={`${prefix}__surplus avatar-host-group ${prefix}__surplus__${this.size}`}
              size={this.size}
              shape={this.shape}
            >
              +{this.hiddenAvatarCount}
            </ks-avatar>
          )}
        </div>
      </Host>
    );
  }
}
