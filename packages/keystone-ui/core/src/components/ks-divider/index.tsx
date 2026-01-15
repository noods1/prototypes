import { Component, h, Prop, Host } from '@stencil/core';
import classnames from 'classnames';
import { dir } from '@src/utils/utils';
import type { DividerOrientation, DividerType, DividerVariant } from '../../entities';

const prefix = 'divider';
/**
 * @part self - KsDivider component shadow root element.
 * @part vertical - This is the shadow root element of the KsDivider component when type === 'vertical'.
 */
@Component({
  tag: 'ks-divider',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsDivider {
  ['ks-name'] = 'ks-divider';
  /**
   * @locale {en} Determine whether the divider line is dashed. When set to `true`, the divider will display as a dashed line.
   * @locale {zh} 用于确定分割线是否为虚线。设置为 `true` 时，分割线将显示为虚线。
   */
  @Prop() dashed = false;
  /**
   * @locale {en} Orientation of the divider's content. Can be one of the following values: `left`, `center`, or `right`. This applies only when the `orientation` is `horizontal` and there is content in the default slot.
   * @locale {zh} 分割线内容的对齐方式。可选值为：`left`、`center` 或 `right`。仅当 `orientation` 为 `horizontal` 且默认插槽中有内容时适用。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() textAlign: DividerOrientation;
  /**
   * @locale {en} The type of the divider, determining its orientation. Can be `horizontal` or `vertical`.
   * @locale {zh} 分割线的类型，决定其方向。可选值为 `horizontal` 或 `vertical`。
   */
  @Prop() orientation: DividerType = 'horizontal';
  /**
   * @locale {en} The variant of the divider, specifying the color scheme. Can be one of the following values: `"success"`, `"warning"`, `"error"`, `"primary"`, `"support"`, or `"neutral"`.
   * @locale {zh} 分割线的样式变体，指定其颜色方案。可选值为 `"success"`、`"warning"`、`"error"`、`"primary"`、`"support"`或`"neutral"`。
   */
  @Prop() variant: DividerVariant = 'neutral';

  render() {
    const className = classnames(prefix, {
      [`${prefix}--${this.orientation}`]: this.orientation && !this.textAlign,
      [`${prefix}--orientation`]: this.textAlign,
      [`${prefix}--orientation-${this.textAlign}`]: this.textAlign,
      [`${prefix}--dashed`]: this.dashed,
    });

    if (this.orientation === 'vertical') {
      return (
        <Host dir={dir()} ks-divider ks-color={this.variant} role="separator" aria-orientation="vertical">
          <hr class={className} part="vertical" />
        </Host>
      );
    }

    return (
      <Host dir={dir()} ks-divider ks-color={this.variant} role="separator" aria-orientation="horizontal">
        <hr dir={dir()} class={className} part="self">
          <div class={`${prefix}__innertext`}>
            <slot></slot>
          </div>
        </hr>
      </Host>
    );
  }
}
