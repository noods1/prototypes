import { Component, h, Prop, Host, Element, ComponentInterface } from '@stencil/core';
import classnames from 'classnames';
import { dir } from '@src/utils/utils';
import { SpinnerSize, SpinnerLayout } from '../../entities/components/spinner';

const prefix = 'spinner';

@Component({
  tag: 'ks-spinner',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsSpinner implements ComponentInterface {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsSpinnerElement;

  ['ks-name'] = 'ks-spinner';

  /**
   * @locale {en} Indicates whether the loading spinner should use an inverse color scheme. When `true`, the spinner will display in inverse colors.
   * @locale {zh} 指示加载旋转器是否使用反转颜色方案。当为 `true` 时，旋转器将以反转颜色显示。
   */
  @Prop() inverse = false;
  /**
   * @locale {en} The layout orientation of the loading spinner. Can be either `vertical` or `horizontal`.
   * @locale {zh} 加载旋转器的布局方向。可以是 `vertical` 或 `horizontal`。
   */
  @Prop() layout?: SpinnerLayout = 'horizontal';
  /**
   * @locale {en} The size of the loading spinner. Can be either `"md"` or `"lg"`.
   * @locale {zh} 加载旋转器的大小。可以是 `"md"` 或 `"lg"`。
   */
  @Prop() size?: SpinnerSize = 'md';
  /**
   * @locale {en} Indicates whether the loading spinner should be automatically centered within its container. This can be a boolean value or the string `fixed`.
   * When `true`, the component is centered.
   * When `fixed`, the component is centered with fixed positioning.
   * @locale {zh} 指示加载旋转器是否应自动在其容器内居中。此属性可以是布尔值或字符串 `fixed`。
   * 当值为 `true` 时，组件将居中显示。
   * 当值为 `fixed` 时，组件将使用固定定位居中。
   */
  @Prop() autoCenter: boolean | 'fixed' = false;

  render() {
    const className = classnames(
      `${prefix}`,
      `${prefix}--${this.layout}`,
      `${prefix}--${this.size}`,
      this.inverse && `${prefix}--inverse`,
    );

    const size = this.size === 'md' ? 16 : 32;

    return (
      <Host dir={dir()} ks-spinner ks-auto-center={String(this.autoCenter || false)}>
        <div dir={dir()} class={className}>
          <ks-icon-loading size={size} class={`${prefix}__icon`} />
          <span class={`${prefix}__description`}>
            <slot></slot>
          </span>
        </div>
      </Host>
    );
  }
}
