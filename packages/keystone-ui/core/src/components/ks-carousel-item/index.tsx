import { Component, h, Host, Element } from '@stencil/core';
import { dir } from '@src/utils/utils';

@Component({
  tag: 'ks-carousel-item',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCarouselItem {
  ['ks-name'] = 'ks-carousel-item';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsCarouselItemElement;

  render() {
    return (
      <Host dir={dir()} ks-carousel-item>
        <slot></slot>
      </Host>
    );
  }
}
