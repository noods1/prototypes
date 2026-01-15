import { Component, h, Prop, Element, Host } from '@stencil/core';
import classnames from 'classnames';
import { dir } from '@src/utils/utils';
import { AvatarPropShape, AvatarSize } from '../../../entities';

const prefix = 'skeleton-avatar';

@Component({
  tag: 'ks-skeleton-avatar',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsSkeletonAvatar {
  ['x-name'] = 'ks-skeleton-avatar';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsSkeletonAvatarElement;

  /**
   * @locale {en} The shape of the skeleton avatar.
   * @locale {zh} 骨架屏头像的形状。
   */
  @Prop() shape: AvatarPropShape = 'circle';
  /**
   * @locale {en} The size of the skeleton avatar.
   * @locale {zh} 骨架屏头像的尺寸。
   */
  @Prop() size: AvatarSize = 'md';

  render() {
    const classes = classnames('ks-skeleton', `${prefix}`, `${prefix}--${this.shape}`, `${prefix}--${this.size}`);
    return (
      <Host dir={dir()} x-name="ks-skeleton">
        <span class={classes}></span>
      </Host>
    );
  }
}
