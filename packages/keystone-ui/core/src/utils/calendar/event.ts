import {
  isBefore,
  isAfter,
  isSameDay,
  getDay,
  max as maxDate,
  min as minDate,
  differenceInMilliseconds,
  areIntervalsOverlapping,
} from 'date-fns';

import type { CalendarEvent } from '../../entities';

/**
 * Determines if a given date is within the time range of a calendar event
 * @param event - The calendar event to check
 * @param date - The date to check
 * @returns {boolean} - True if the date is within the event's time range, false otherwise
 */
export const isEventOngoing = (event: CalendarEvent, date: Date) =>
  (isAfter(date, event.start) || isSameDay(date, event.start)) &&
  (isBefore(date, event.end) || isSameDay(date, event.end));

/**
 * Determines if a given date is after the start time of a calendar event or if the date is on the same day of the week as the start date of the event and is within the event's time range
 * @param event - The calendar event to check
 * @param date - The date to check
 * @param firstWeekday - The first day of the week (0-6, where 0 is Sunday and 6 is Saturday). Default is 1
 * @returns {boolean} - True if the date is after the event's start time or if the date is on the same day of the week as the start date of the event and is within the event's time range, false otherwise
 */
export const isEventStarted = (event: CalendarEvent, date: Date, firstWeekday = 1) =>
  isSameDay(date, event.start) || (firstWeekday === getDay(date) && isEventOngoing(event, date));

/**
 * Check if two date intervals overlap or are adjacent
 *
 * This function takes four parameters representing the start and end times of two date intervals,
 * and checks whether the two intervals overlap or are adjacent. If the two intervals overlap,
 * the function returns true. If the two intervals are adjacent, that is, the end time of one
 * interval is equal to the start time of the other interval, the function also returns true.
 * If the two intervals do not overlap or are not adjacent, the function returns false.
 *
 * @param s0 The start time of the first date interval
 * @param e0 The end time of the first date interval
 * @param s1 The start time of the second date interval
 * @param e1 The end time of the second date interval
 * @return True if the two date intervals overlap or are adjacent, false otherwise
 */
export const isOverlapped = (s0: Date | number, e0: Date | number, s1: Date | number, e1: Date | number) =>
  areIntervalsOverlapping({ start: s0, end: e0 }, { start: s1, end: e1 }) || isSameDay(s0, e1) || isSameDay(s1, e0);

/**
 * Sort events based on either their starting time or their ending time
 *
 * This function takes an array of CalendarEvent objects and sorts them in ascending order
 * based on the difference in milliseconds between their start times and a given starting point.
 * If the start times are the same or there is no difference, it uses the difference in
 * milliseconds between their end times.
 *
 * @param events An array of CalendarEvent objects to be sorted
 * @param start The starting point in milliseconds to calculate the time difference from. Default is 0.
 * @returns The sorted array of CalendarEvent objects
 */
export const sortEvents = (events: CalendarEvent[], start: Date | number = 0) =>
  events.sort(
    (a, b) =>
      differenceInMilliseconds(maxDate([start, a.start]), maxDate([start, b.start])) ||
      differenceInMilliseconds(b.end, a.end),
  );

export class EventGroup {
  min: Date | number = -1;
  max: Date | number = -1;
  groups = [];

  reset() {
    this.groups = [];
    this.min = this.max = -1;
  }

  setColumnCount() {
    this.groups.forEach((group) => {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      group.visuals.forEach((groupVisual) => {
        groupVisual.columnCount = this.groups.length;
      });
    });
  }

  getOpenGroup(start: Date | number, end: Date | number) {
    for (let i = 0; i < this.groups.length; i++) {
      const group = this.groups[i];
      let intersected = false;

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      if (isOverlapped(start, end, group.start, group.end)) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        for (let k = 0; k < group.visuals.length; k++) {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          const groupVisual = group.visuals[k];
          const groupStart = groupVisual.event.start;
          const groupEnd = groupVisual.event.end;

          if (isOverlapped(start, end, groupStart, groupEnd)) {
            intersected = true;
            break;
          }
        }
      }

      if (!intersected) {
        return i;
      }
    }

    return -1;
  }

  getEventVisual(events: CalendarEvent[], day: Date, index: number) {
    if (index === 0) {
      this.reset();
    }

    const visuals = sortEvents(events, day).map((event) => ({
      event,
      columnCount: 0,
      column: 0,
    }));

    visuals.forEach((visual) => {
      const { start } = visual.event;
      const { end } = visual.event;

      if (this.groups.length > 0 && !isOverlapped(start, end, this.min, this.max)) {
        this.setColumnCount();
        this.reset();
      }

      let targetGroup = this.getOpenGroup(start, end);

      if (targetGroup === -1) {
        targetGroup = this.groups.length;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.groups.push({ start, end, visuals: [] });
      }

      const target = this.groups[targetGroup];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      target.visuals.push(visual);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      target.start = minDate([target.start, start]).getTime();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      target.end = maxDate([target.end, end]).getTime();

      visual.column = targetGroup;

      if (this.min === -1) {
        this.min = start;
        this.max = end;
      } else {
        this.min = minDate([this.min, start]);
        this.max = maxDate([this.max, end]);
      }
    });

    this.setColumnCount();

    return visuals;
  }
}
