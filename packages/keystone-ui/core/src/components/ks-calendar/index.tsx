import { Component, Host, h, State, Prop, Event, type EventEmitter, type ComponentInterface } from '@stencil/core';
import { isAfter, getYear, getMonth, startOfMonth, endOfMonth } from 'date-fns';
import store from '@src/store';
import { dir } from '@src/utils/utils';
import { InternalRenderDynamicSlots, upperFirst } from '@src/utils/calendar';
import type { CalendarViewMode, CalendarEvent, CalendarContent } from '../../entities';
import { KsCalendarMonth } from './calendar-month';

const prefix = 'calendar';

/**
 * @slot header - Allows customization of the calendar header area.
 */
@Component({
  tag: 'ks-calendar',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCalendar implements ComponentInterface {
  ['ks-name'] = 'ks-calendar';

  @State() year: number = getYear(Date.now());
  @State() month: number = getMonth(Date.now());
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() startDate: Date;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() endDate: Date;
  @State() viewMode: CalendarViewMode = 'month';

  /**
   * @locale {en} Indicates whether the calendar allows the selection of a date range. If set to `true`, users can select a start date and an end date.
   * @locale {zh} 指示日历是否允许选择日期范围。如果设置为 `true`，用户可以选择开始日期和结束日期。
   */
  @Prop() range = false;
  /**
   * @locale {en} An array of events to be displayed on the calendar. Each event should include `start`, `end`, and `name`.
   * @locale {zh} 要在日历上显示的事件数组。每个事件应包括 `start`、`end` 和 `name`。
   */
  @Prop() events: CalendarEvent[] = [];
  /**
   * @locale {en} Custom content to display on the calendar. Takes precedence over events.
   * @locale {zh} 要在日历上显示的自定义内容。优先级高于事件。
   */
  @Prop() renderContent: CalendarContent[] = [];

  /**
   * @locale {en} Custom event triggered when the currently displayed month changes. This event returns the start and end dates of the new month.
   * @locale {zh} 当当前显示的月份改变时触发的自定义事件。此事件返回新月份的起始日期和结束日期。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksMonthChange: EventEmitter<{ start: Date; end: Date }>;
  /**
   * @locale {en} Custom event triggered when a date is selected. If `range` is `false`, it emits the selected `Date`. If `range` is `true`, it emits an object `{ start: Date; end: Date }` when a valid date range is completed.
   * @locale {zh} 当选择日期时触发的自定义事件。如果 `range` 为 `false`，则发出所选的 `Date`。如果 `range` 为 `true`，则在完成有效日期范围选择时发出一个对象 `{ start: Date; end: Date }`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksSelect: EventEmitter<Date | { start: Date; end: Date }>;

  static __internal_renderDynamicSlots(
    props: Partial<KsCalendarMonth>,
    wrapWithSlot: (slotName: string, children: unknown) => unknown,
  ) {
    return InternalRenderDynamicSlots(props, wrapWithSlot);
  }

  get selectedDate() {
    if (!this.range) {
      return [this.startDate];
    }

    return this.startDate && this.endDate ? [this.startDate, this.endDate] : this.startDate ? [this.startDate] : [];
  }

  handleClickDay({ detail }: { detail: Date }) {
    if (this.startDate && this.endDate) {
      this.startDate = detail;
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.endDate = undefined;
    } else if (this.startDate && isAfter(detail, this.startDate)) {
      this.ksSelect.emit({ start: this.startDate, end: detail });
      this.endDate = detail;
    } else {
      this.startDate = detail;
    }
  }

  renderSlot() {
    return this.renderContent?.map((content) => {
      const slot = `slot-content-${content.date.getTime()}`;

      return <slot key={slot} name={slot} slot={slot} data-testid={`ks-calendar-index-gskf28-${slot}`}></slot>;
    });
  }

  render() {
    const classes = {
      [prefix]: true,
      [`${prefix}--year`]: this.viewMode === 'year',
      [`${prefix}--month`]: this.viewMode === 'month',
    };

    const locale = store.state.config.locale || 'en-US';
    const formattedTitle = upperFirst(
      Intl.DateTimeFormat(
        locale,
        this.viewMode === 'month' ? { month: 'short', year: 'numeric' } : { year: 'numeric' },
      ).format(new Date(this.year, this.month)),
      locale,
    );

    return (
      <Host dir={dir()} ks-calendar>
        <div dir={dir()} class={classes}>
          <slot name="header">
            <ks-calendar-header
              title={formattedTitle}
              viewMode={this.viewMode}
              onKsPreviousClick={() => {
                let newYear = this.year;
                let newMonth = this.month;

                if (this.viewMode === 'year') {
                  newYear -= 1;
                } else {
                  newMonth -= 1;
                  if (newMonth < 0) {
                    newMonth = (newMonth + 12) % 12;
                    newYear -= 1;
                  }

                  const newDate = new Date(newYear, newMonth);
                  this.ksMonthChange.emit({ start: startOfMonth(newDate), end: endOfMonth(newDate) });
                }

                this.year = newYear;
                this.month = newMonth;
              }}
              onKsNextClick={() => {
                let newYear = this.year;
                let newMonth = this.month;

                if (this.viewMode === 'year') {
                  newYear += 1;
                } else {
                  newMonth += 1;
                  if (newMonth >= 12) {
                    newMonth %= 12;
                    newYear += 1;
                  }

                  const newDate = new Date(newYear, newMonth);
                  this.ksMonthChange.emit({ start: startOfMonth(newDate), end: endOfMonth(newDate) });
                }

                this.year = newYear;
                this.month = newMonth;
              }}
              onKsTodayClick={() => {
                if (getMonth(Date.now()) !== this.month) {
                  this.ksMonthChange.emit({ start: startOfMonth(Date.now()), end: endOfMonth(Date.now()) });
                }

                this.year = getYear(Date.now());
                this.month = getMonth(Date.now());
              }}
              onKsViewModeChange={({ detail }) => {
                this.viewMode = detail;
              }}
              data-testid="ks-calendar-index-rLdnF3"
            />
          </slot>

          <div class={`${prefix}__container`}>
            {this.viewMode === 'year' && (
              <ks-calendar-year
                year={this.year}
                events={this.events}
                selected={this.selectedDate}
                onKsDayClick={this.handleClickDay.bind(this)}
                data-testid="ks-calendar-index-qzEsdX"
              />
            )}

            {this.viewMode === 'month' && (
              <ks-calendar-month
                year={this.year}
                month={this.month}
                events={this.events}
                selected={this.selectedDate}
                renderContent={this.renderContent}
                onKsDayClick={this.handleClickDay.bind(this)}
                data-testid="ks-calendar-index-7QxssV"
              >
                {this.renderContent && this.renderSlot()}
              </ks-calendar-month>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
