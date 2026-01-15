import { Component, Host, h, Prop, Event, type EventEmitter, type ComponentInterface } from '@stencil/core';
import { isToday, isEqual, isBefore, isAfter, addDays, getMonth } from 'date-fns';
import store from '@src/store';
import { dir } from '@src/utils/utils';
import { getWeekArray, getWeekdays, isEventStarted, EventGroup, InternalRenderDynamicSlots } from '@src/utils/calendar';
import { getFirstDayOfWeek } from '@src/utils/i18n/date';

import type { CalendarContent, CalendarEvent, CalendarEventColor } from '../../../entities';
import dayjs from 'dayjs';

const prefix = 'calendar-month';

const WIDTH_FULL = 100;
const WIDTH_PADDING = 17; // 16px padding + 1px border
const MAX_EVENT_COUNT = 3;
const EVENT_COLORS: CalendarEventColor[] = ['purple', 'blue', 'pink'];

@Component({
  tag: 'ks-calendar-month',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCalendarMonth implements ComponentInterface {
  group = new EventGroup();

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() year: number;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() month: number;
  @Prop() selected: Date[] = [];
  @Prop() compact = false;
  @Prop() events: CalendarEvent[] = [];
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() renderContent: CalendarContent[];

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksDayClick: EventEmitter<Date>;

  renderEvent(event: CalendarEvent, day: Date, index: number, color: CalendarEventColor = 'purple') {
    let end = isEqual(day, event.end);
    let count = 1;
    for (let i = 1; i < 7 - index; i++) {
      const weekday = addDays(day, i);
      if (isEqual(event.end, weekday) || isAfter(event.end, weekday)) {
        count++;
        end = end || isEqual(weekday, event.end);
      } else {
        end = true;
        break;
      }
    }

    const width = `calc(${count * WIDTH_FULL}% + ${(count - 1) * WIDTH_PADDING}px)`;
    return <ks-calendar-event label={event.name} color={color} style={{ width }} />;
  }

  renderEventPlaceholder() {
    return <ks-calendar-event placeholder />;
  }

  renderEventMore(moreEvents: CalendarEvent[]) {
    return (
      <ks-calendar-event hasTooltip color="neutral" label={`+${moreEvents.length} events`}>
        {moreEvents.map((event) => [
          <ks-text variant="labelSm" slot="popover">
            {event.name}
          </ks-text>,
        ])}
      </ks-calendar-event>
    );
  }

  renderCalendarContent(content: CalendarContent) {
    return <slot name={`slot-content-${content.date.getTime()}`}></slot>;
  }

  static __internal_renderDynamicSlots(
    props: Partial<KsCalendarMonth>,
    wrapWithSlot: (slotName: string, children: unknown) => unknown,
  ) {
    return InternalRenderDynamicSlots(props, wrapWithSlot);
  }

  renderPanelItem(day: Date, index: number) {
    const displayDate = `${day.getDate()}`.padStart(2, '0');
    const classes = {
      [`${prefix}-day`]: true,
      [`${prefix}-day--today`]: isToday(day) && this.month === getMonth(day),
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      [`${prefix}-day--active`]: isEqual(day, this.selected[0]) || isEqual(day, this.selected[1]),
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      [`${prefix}-day--start`]: this.selected.length > 1 && isEqual(day, this.selected[0]),
      [`${prefix}-day--within`]:
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.selected.length > 1 && isAfter(day, this.selected[0]) && isBefore(day, this.selected[1]),
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      [`${prefix}-day--end`]: this.selected.length > 1 && isEqual(day, this.selected[1]),
      [`${prefix}-day--disabled`]: day.getMonth() !== this.month,
    };

    const eventEls: HTMLKsCalendarEventElement[] = [];
    if (!this.compact) {
      const locale = store.state.config.locale;
      const events = this.events.filter((event) => isEventStarted(event, day, getFirstDayOfWeek(locale) || 0));
      const moreEvents: CalendarEvent[] = [];

      const visuals = this.group.getEventVisual(events, day, index % 7);
      visuals.forEach((visual) => {
        while (eventEls.length < visual.column && eventEls.length < MAX_EVENT_COUNT) {
          eventEls.push(this.renderEventPlaceholder());

          if (eventEls.length >= MAX_EVENT_COUNT) {
            break;
          }
        }

        if (eventEls.length >= MAX_EVENT_COUNT) {
          moreEvents.push(visual.event);
          return;
        }

        const el = this.renderEvent(visual.event, day, index % 7, EVENT_COLORS[eventEls.length % EVENT_COLORS.length]);
        if (el) {
          eventEls.push(el);
        }
      });

      if (moreEvents.length > 0) {
        eventEls.push(this.renderEventMore(moreEvents));
      }
    }

    const date = dayjs(day).format('YYYY-MM-DD');

    const content = this.renderContent?.find((content) => {
      const curDate = dayjs(content.date).format('YYYY-MM-DD');
      return date === curDate;
    });
    return (
      <div
        class={classes}
        data-index={index % 7}
        onClick={() => {
          this.ksDayClick.emit(day);
        }}
        data-testid="calendar-month-index-vAM55M"
      >
        <span class={`${prefix}-day__label`}>{displayDate}</span>

        {!this.compact && (
          <div class={`${prefix}-day__events`}>{content ? this.renderCalendarContent(content) : eventEls}</div>
        )}
      </div>
    );
  }
  render() {
    const classes = {
      [prefix]: true,
      [`${prefix}--compact`]: this.compact,
      [`${prefix}--spacious`]: !this.compact,
    };

    const locale = store.state.config.locale;
    const dayLabels = getWeekdays(locale, this.compact ? 'narrow' : 'short');
    const daysInMonth = getWeekArray(locale, new Date(this.year, this.month)).flat();

    return (
      <Host dir={dir()} ks-calendar-month>
        <div dir={dir()} class={classes}>
          {dayLabels.map((day) => (
            <div class={`${prefix}__header`}>
              <span>{day}</span>
            </div>
          ))}

          {daysInMonth.map(this.renderPanelItem.bind(this))}
        </div>
      </Host>
    );
  }
}
