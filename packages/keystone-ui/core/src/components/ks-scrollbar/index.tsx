import { Component, h, Host, Element, Prop } from '@stencil/core';

@Component({
  tag: 'ks-scrollbar',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsScrollbar {
  ['ks-name'] = 'ks-scrollbar';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsScrollbarElement;

  /**
   * @locale {en} Specifies if the scrollbar should use the thin [scrollbar-width](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width) to save space.
   * @locale {zh} 指定滚动条是否应为细宽度样式（[scrollbar-width](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width)）来节省空间。
   */
  @Prop() thin = false;

  render() {
    return (
      <Host ks-scrollbar ks-thin={this.thin}>
        <slot></slot>
      </Host>
    );
  }
}
