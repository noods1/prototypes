import { Component, Prop, h, Host, Event, EventEmitter, Element } from '@stencil/core';
import { dir } from '@src/utils/utils';
import classNames from 'classnames';
import { ArrowPaginationValue } from '@src/entities';
import { hasMoreSlide } from '@src/utils/carousel/utils';

const prefix = 'arrow-button-group';

@Component({
  tag: 'ks-arrow-button-group',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsArrowButtonGroup {
  ['ks-name'] = 'ks-arrow-button';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsArrowButtonGroupElement;
  /** Show the component; triggers the enter or exit states */

  @Prop() currentIndex = -1;

  @Prop() count = 0;

  @Prop() slidesToShow = 1;

  @Prop() infinite = false;

  @Prop() orient: 'left' | 'right' = 'left';

  @Prop() disabled = false;

  @Prop() arrows: boolean | 'overlay' = false;

  @Prop() bulletinMode = false;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<ArrowPaginationValue>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksArrowOver: EventEmitter;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksArrowLeave: EventEmitter;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksArrowEnter: EventEmitter;

  render() {
    return (
      <Host dir={dir()} ks-arrow-button-group>
        <ks-arrow-button
          class={classNames(`${prefix}`, `${prefix}__left`, {
            [`${prefix}__overlay--left`]: this.arrows === 'overlay',
            [`${prefix}__overlay--left-bulletin`]: this.bulletinMode,
          })}
          dir={dir()}
          onClick={() => this.ksChange.emit('left')}
          disabled={!this.infinite && this.currentIndex === 0}
          orient={dir() === 'ltr' ? 'left' : 'right'}
          onMouseOver={() => this.ksArrowOver.emit()}
          onMouseLeave={() => this.ksArrowLeave.emit()}
          onMouseEnter={() => this.ksArrowEnter.emit()}
          data-testid="arrow-button-group-index-j5TiPk"
        />

        <ks-arrow-button
          class={classNames(`${prefix}`, `${prefix}__right`, {
            [`${prefix}__overlay--right`]: this.arrows === 'overlay',
            [`${prefix}__overlay--right-bulletin`]: this.bulletinMode,
          })}
          dir={dir()}
          onClick={() => this.ksChange.emit('right')}
          disabled={!this.infinite && hasMoreSlide(this)}
          orient={dir() === 'rtl' ? 'left' : 'right'}
          onMouseOver={() => {
            this.ksArrowOver.emit();
          }}
          onMouseLeave={() => {
            this.ksArrowLeave.emit();
          }}
          onMouseEnter={() => {
            this.ksArrowEnter.emit();
          }}
          data-testid="arrow-button-group-index-fu7y55"
        />
      </Host>
    );
  }
}
