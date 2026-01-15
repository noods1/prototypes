import { Component, Prop, h, Host, Event, State, EventEmitter, Element } from '@stencil/core';
import { dir } from '@src/utils/utils';
import classNames from 'classnames';

const prefix = 'dots';

@Component({
  tag: 'ks-dots',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsDots {
  ['ks-name'] = 'ks-dots';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsDotsElement;
  /** Show the component; triggers the enter or exit states */
  @Prop() currentIndex = -1;

  @Prop() count = 0;

  @State() translateX = 0;

  @State() translation = '';

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<number>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksDotsOver: EventEmitter;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksDotsLeave: EventEmitter;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksDotsEnter: EventEmitter;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  getWidth(index) {
    // TODO: finish dots animate
    const current = this.currentIndex - 1;
    const { count } = this;
    if (count > 6) {
      if (current > 3) {
        if (index === current - 3 && current < count - 3) {
          return 4;
        } else if (current >= count - 3 && index === count - 6) {
          return 4;
        }
      }
      if (current < count - 3) {
        if (current < 4) {
          if (index === 5) {
            return 4;
          }
        } else if (index === current + 2) {
          return 4;
        }
      }
    }
    return 6;
  }

  render() {
    return (
      <Host dir={dir()} ks-dots>
        <ul class={classNames(`${prefix}`)}>
          {Array.from({ length: Math.min(this.count, 6) }).map((_, index) => (
            <li
              style={{ width: `${this.getWidth(index)}px`, height: `${this.getWidth(index)}px` }}
              class={classNames(`${prefix}_dot`, { active: index + 1 === this.currentIndex })}
              onClick={() => {
                this.ksChange.emit(index + 1 - this.currentIndex);
              }}
              onMouseOver={() => this.ksDotsOver.emit()}
              onMouseLeave={() => this.ksDotsLeave.emit()}
              onMouseEnter={() => this.ksDotsEnter.emit()}
              data-testid="dots-index-ivURKL"
            >
              <button></button>
            </li>
          ))}
        </ul>
      </Host>
    );
  }
}
