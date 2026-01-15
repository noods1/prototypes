import { Component, Host, h, Prop, Event, type EventEmitter, type ComponentInterface } from '@stencil/core';
import store from '@src/store';
import { dir } from '@src/utils/utils';
import { getMonths, upperFirst } from '@src/utils/calendar';

import type { CalendarEvent } from '../../../entities';

const prefix = 'calendar-year';

@Component({
  tag: 'ks-calendar-year',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCalendarYear implements ComponentInterface {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() year: number;
  @Prop() selected: Date[] = [];
  @Prop() events: CalendarEvent[] = [];

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksDayClick: EventEmitter<Date>;

  render() {
    const locale = store.state.config.locale;
    const monthsInYear = getMonths(locale);

    return (
      <Host dir={dir()} ks-calendar-year>
        <div dir={dir()} class={prefix}>
          {monthsInYear.map((month, index) => (
            <div>
              <div class={`${prefix}__header`}>
                <span>{upperFirst(month, locale)}</span>
              </div>

              <div class={`${prefix}__panel`}>
                <ks-calendar-month
                  compact
                  month={index}
                  year={this.year}
                  events={this.events}
                  selected={this.selected}
                  onKsDayClick={({ detail }) => {
                    this.ksDayClick.emit(detail);
                  }}
                  data-testid="calendar-year-index-5H4RW5"
                />
              </div>
            </div>
          ))}
        </div>
      </Host>
    );
  }
}
