import { Component, Prop, h, Host } from '@stencil/core';
import classnames from 'classnames';
import { dir, convertNum2PX } from '@src/utils/utils';

const prefix = 'space';

// type D = never extends unknown ? boolean : never;

@Component({
  tag: 'ks-space',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsSpace {
  ['ks-name'] = 'ks-space';
  /**
   * @locale {en} The direction items are placed. Can be 'horizontal' or 'vertical'.
   * @locale {zh} 子元素排列方向。可选值为 'horizontal'（水平）或 'vertical'（垂直）。
   */
  @Prop() direction: 'vertical' | 'horizontal' = 'horizontal';

  /**
   * @locale {en} Whether to use compact layout, which removes the gap between items. If true, the `gap` prop is ignored.
   * @locale {zh} 是否使用紧凑布局，紧凑布局会移除子元素之间的间距。如果为 true，则忽略 `gap` 属性。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() compact: boolean;

  /**
   * @locale {en} The gap between items. This prop is only effective when `compact` is not true. Can be a number (in pixels) or a string (e.g., "8px", "1rem").
   * @locale {zh} 子元素之间的间距。此属性仅在 `compact` 不为 true 时生效。可以是一个数字（单位为像素）或一个字符串（例如 "8px", "1rem"）。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() gap: string | number;

  render() {
    const classes = classnames([`${prefix}`, `${prefix}--${this.direction}`], {
      [`${prefix}--compact`]: this.compact,
    });
    const styles = {
      gap: this.compact ? 'none' : convertNum2PX(this.gap),
    };
    return (
      <Host ks-avatar>
        <div class={classes} style={styles} dir={dir()}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
