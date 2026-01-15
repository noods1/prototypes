import { Component, Prop, h, Host, State, Element } from '@stencil/core';
import { dir } from '@src/utils/utils';
import { Slot, Slots } from '@src/utils/decorators';

const prefix = 'inner-slider';

@Component({
  tag: 'ks-inner-slider',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsInnerSlider {
  ['ks-name'] = 'ks-inner-slider';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsInnerSliderElement;
  /** Show the component; triggers the enter or exit states */
  @Prop() listWidth = 0;

  @Prop() height = 0;

  @Prop() currentIndex = -1;

  @Prop() count = 0;

  @Prop() clickArrow: 'left' | 'right' | 'none' = 'none';

  @Prop() sliderWidth = 0;

  @Prop() slidesToShow = 1;

  @Prop() slidesToScroll = 1;

  @Prop() infinite = false;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: '_default' }) defaultSlot: Slots;

  @State() translateX = 0;

  @State() translation = '';

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private timer = null;

  private preIndex = -1;

  componentDidLoad() {
    this.preIndex = this.currentIndex;
    this.translateX = this.currentIndex * this.sliderWidth;
  }

  componentWillUpdate() {
    if (this.preIndex !== this.currentIndex || this.clickArrow === 'none') {
      if (this.currentIndex === 0 && this.preIndex > 0 && this.clickArrow === 'right') {
        this.translation = '';
        this.translateX =
          -Number(this.infinite) * this.sliderWidth * this.slidesToShow - this.currentIndex * this.sliderWidth;
      } else if (this.currentIndex > this.preIndex && this.clickArrow === 'left') {
        this.translation = '';
        this.translateX =
          -Number(this.infinite) * this.sliderWidth * this.slidesToShow - this.currentIndex * this.sliderWidth;
      } else {
        this.translateX =
          -Number(this.infinite) * this.sliderWidth * this.slidesToShow - this.currentIndex * this.sliderWidth;
      }
      this.preIndex = this.currentIndex;
    }
  }

  render() {
    const translateX = dir() === 'ltr' ? this.translateX : -this.translateX;
    return (
      <Host dir={dir()} ks-inner-slider>
        <div
          class={prefix}
          style={{
            width: `${this.listWidth}px`,
            transform: `translate3d(${translateX}px,0,0)`,
            transition: this.translation,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
