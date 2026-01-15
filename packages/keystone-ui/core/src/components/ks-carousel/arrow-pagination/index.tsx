import { Component, Prop, h, Host, Event, EventEmitter, Element } from '@stencil/core';
import { dir } from '@src/utils/utils';
import classNames from 'classnames';
import { ArrowPaginationValue } from '@src/entities';

const prefix = 'arrow-pagination';

@Component({
  tag: 'ks-arrow-pagination',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsArrowPagination {
  ['ks-name'] = 'ks-arrow-pagination';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsArrowPaginationElement;
  /** Show the component; triggers the enter or exit states */

  @Prop() currentIndex = -1;

  @Prop() count = 0;

  @Prop() slidesToShow = 1;

  @Prop() infinite = false;

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
      <Host dir={dir()} ks-arrow-pagination>
        <ks-arrow-button
          onClick={() => {
            this.ksChange.emit('left');
          }}
          disabled={!this.infinite && this.currentIndex === 1}
          orient={dir() === 'ltr' ? 'left' : 'right'}
          onMouseOver={() => this.ksArrowOver.emit()}
          onMouseLeave={() => this.ksArrowLeave.emit()}
          onMouseEnter={() => this.ksArrowEnter.emit()}
          data-testid="arrow-pagination-index-8oDNEL"
        />

        <span class={`${prefix}--text`}>{`${this.currentIndex} / ${this.count}`}</span>
        <ks-arrow-button
          onClick={() => {
            this.ksChange.emit('right');
          }}
          class={classNames(`${prefix}--arrow`, `${prefix}--arrow__right`)}
          disabled={!this.infinite && this.currentIndex >= this.count}
          orient={dir() === 'ltr' ? 'right' : 'left'}
          onMouseOver={() => this.ksArrowOver.emit()}
          onMouseLeave={() => this.ksArrowLeave.emit()}
          onMouseEnter={() => this.ksArrowEnter.emit()}
          data-testid="arrow-pagination-index-fFZtcb"
        />
      </Host>
    );
  }
}
