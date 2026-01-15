import { Component, Host, h, Prop, type ComponentInterface } from '@stencil/core';
import { dir } from '@src/utils/utils';

import type { CalendarEventColor } from '../../../entities';

const prefix = 'calendar-event';

/**
 * @slot popover - Slot for the popover.
 */
@Component({
  tag: 'ks-calendar-event',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCalendarEvent implements ComponentInterface {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() label: string;
  @Prop() placeholder = false;
  @Prop() color: CalendarEventColor = 'purple';
  @Prop() hasTooltip = false;

  renderEvent() {
    const classes = {
      [`${prefix}__bar`]: true,
      [`${prefix}__bar--${this.color}`]: Boolean(this.color),
    };
    return (
      <div dir={dir()} class={classes}>
        <ks-text class={`${prefix}__label`} ellipsis variant="labelSm">
          {this.label}
        </ks-text>
      </div>
    );
  }

  render() {
    const classes = {
      [prefix]: true,
      [`${prefix}--placeholder`]: this.placeholder,
    };

    return (
      <Host dir={dir()} ks-name="ks-calendar-event">
        <div class={classes}>
          {!this.hasTooltip && this.renderEvent.bind(this)()}
          {this.hasTooltip && (
            <ks-tooltip placement="top">
              <div class={`${prefix}__popover`} slot="content">
                <slot name="popover"></slot>
              </div>

              {this.renderEvent.bind(this)()}
            </ks-tooltip>
          )}
        </div>
      </Host>
    );
  }
}
