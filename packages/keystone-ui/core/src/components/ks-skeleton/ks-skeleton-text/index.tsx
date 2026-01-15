import { Component, h, Prop, Element, Host } from '@stencil/core';
import classnames from 'classnames';
import { dir } from '@src/utils/utils';
import { SkeletonSize, TextType } from '../../../entities';

const prefix = 'skeleton-text';

// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
@Component({
  tag: 'ks-skeleton-text',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsSkeletonText {
  ['x-name'] = 'ks-skeleton-text';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsSkeletonTextElement;

  /**
   * @locale {en} The size of the skeleton text.
   * @locale {zh} 骨架屏文本的尺寸。
   */
  @Prop() size: SkeletonSize = 'md';

  /**
   * @locale {en} The type of the skeleton text, affecting its style (e.g., headline, paragraph).
   * @locale {zh} 骨架屏文本的类型，影响其样式（例如，标题、段落）。
   */
  @Prop() type: TextType = 'headline';

  /**
   * @locale {en} Custom width for the skeleton text (e.g., "100px", "50%", "60%").
   * @locale {zh} 骨架屏文本的自定义宽度（例如 "100px", "50%", "60%"）。
   */
  @Prop() width = '60%';

  render() {
    const cls = classnames('ks-skeleton', prefix, `${prefix}-${this.type}-${capitalizeFirstLetter(this.size)}`);
    return (
      <Host dir={dir()} x-name="x-skeleton-text">
        {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
        <span style={this.width ? { width: this.width } : null} class={cls}></span>
      </Host>
    );
  }
}
