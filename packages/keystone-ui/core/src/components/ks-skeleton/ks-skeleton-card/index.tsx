import { Component, h, Prop, Element, Host } from '@stencil/core';
import classnames from 'classnames';
import { dir } from '@src/utils/utils';

const prefix = 'skeleton-card';

@Component({
  tag: 'ks-skeleton-card',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsSkeletonCard {
  ['x-name'] = 'ks-skeleton-card';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsSkeletonCardElement;

  /**
   * @locale {en} The width of the skeleton card (e.g., "100px", "50%", "100%").
   * @locale {zh} 骨架屏卡片的宽度（例如 "100px", "50%", "100%"）。
   */
  @Prop() width = '100%';

  /**
   * @locale {en} The height of the skeleton card (e.g., "100px", "50%", "100%").
   * @locale {zh} 骨架屏卡片的高度（例如 "100px", "50%", "100%"）。
   */
  @Prop() height = '100%';

  render() {
    const cls = classnames('ks-skeleton', prefix);
    return (
      <Host dir={dir()} x-name="ks-skeleton-card">
        <div style={{ width: this.width, height: this.height }} class={cls}></div>
      </Host>
    );
  }
}
