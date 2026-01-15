import { Component, Prop, h, Host, Event, EventEmitter, Element } from '@stencil/core';
import { dir } from '@src/utils/utils';
import classNames from 'classnames';
import { ArrowPaginationValue } from '@src/entities';

const prefix = 'arrow-button';

@Component({
  tag: 'ks-arrow-button',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsArrowButton {
  ['ks-name'] = 'ks-arrow-button';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsArrowButtonElement;
  /** Show the component; triggers the enter or exit states */

  @Prop() currentIndex = -1;

  @Prop() count = 0;

  @Prop() slidesToShow = 1;

  @Prop() infinite = false;

  @Prop() orient: 'left' | 'right' = 'left';

  @Prop() disabled = false;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<ArrowPaginationValue>;

  render() {
    return (
      <Host dir={dir()} ks-arrow-button>
        <ks-button size="sm" variant="text" shape="square" disabled={this.disabled}>
          {this.orient === 'left' ? (
            <ks-icon-chevron-left class={classNames({ [`${prefix}--arrow`]: !this.disabled })} />
          ) : (
            <ks-icon-chevron-right class={classNames({ [`${prefix}--arrow`]: !this.disabled })} />
          )}
        </ks-button>
      </Host>
    );
  }
}
