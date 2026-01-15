import { Component, h, Prop, Element, Host } from '@stencil/core';
import classnames from 'classnames';
import { dir } from '@src/utils/utils';
import { BtnSize, BtnShape } from '../../../entities';

const prefix = 'skeleton-button';

@Component({
  tag: 'ks-skeleton-button',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsSkeletonButton {
  ['x-name'] = 'ks-skeleton-button';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsSkeletonButtonElement;

  /**
   * @locale {en} The size of the skeleton button.
   * @locale {zh} 骨架屏按钮的尺寸。
   */
  @Prop() size: BtnSize = 'md';

  /**
   * @locale {en} The shape of the skeleton button.
   * @locale {zh} 骨架屏按钮的形状。
   */
  @Prop() shape: BtnShape = 'angle';

  /**
   * @locale {en} Custom width for the skeleton button (e.g., "100px", "50%").
   * @locale {zh} 骨架屏按钮的自定义宽度（例如 "100px", "50%"）。
   */
  @Prop() width = '';

  render() {
    // const cls = classnames('ks-skeleton', prefix, `${prefix}`);
    return (
      <Host dir={dir()} x-name="ks-skeleton">
        <div
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          style={this.width ? { width: this.width } : null}
          class={classnames(prefix, `${prefix}--${this.size}`, `${prefix}--${this.shape}`)}
        ></div>
      </Host>
    );
  }
}
