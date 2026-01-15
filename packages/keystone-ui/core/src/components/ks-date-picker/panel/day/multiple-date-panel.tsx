import { Component, h, Fragment, Element, Prop, State, Event, EventEmitter, Watch, Host } from '@stencil/core';
import classNames from 'classnames';
import {
  subMonths,
  format,
  subYears,
  startOfMonth,
  getDay,
  endOfMonth,
  eachDayOfInterval,
  subDays,
  getWeeksInMonth,
  isSameMonth,
  isSameDay,
  isBefore,
  min,
  max,
  isAfter,
  getTime,
  startOfDay,
  isValid,
  toDate,
} from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir, isRTL } from '@src/utils/utils';
import { IMultipleDateValue } from '../../../../entities';
import store from '@src/store';
import {
  getLocalizedMonth,
  getLocalizedWeekday,
  getLocalizedMonthYear,
  getLocalizedYear,
} from '@src/components/ks-date-picker/utils';
import { getFirstDayOfWeek } from '@src/utils/i18n/date';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

const prefix = 'panel';

/**
 * @slot preset - preset slot
 */
@Component({
  tag: 'ks-multiple-date-panel',
  styleUrl: 'date-panel.scss',
  shadow: true,
})
export class KsMultipleDatePanel {
  ['ks-name'] = 'ks-multiple-date-panel';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsMultipleDatePanelElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IMultipleDateValue;

  @Watch('value')
  valueWatcher() {
    this.generateDateRange();
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() single: boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date, isStart?: boolean, currentStartDate?: Date | number) => boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() startDate: Date;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() offset: number;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() range: boolean;
  /**
   * 值改变事件
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<IMultipleDateValue>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() flagDate: Date;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() ondatehover: (date: Date) => void;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksDateHover: EventEmitter<Date>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() onviewdatechange: (date: Date) => void;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksViewDateChange: EventEmitter<Date>;

  private get valueDate() {
    if (typeof this.value === 'string') {
      throw Error('Invalid value, value must be Array');
    }

    return (this.value || [])
      .filter((item) => !!item)
      .map((date) => {
        if (typeof date === 'string') {
          return new Date(date);
        }

        return date;
      });
  }

  private set valueDate(newValue) {
    // this.value = newValue;
    this.ksChange?.emit?.(newValue);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() activeDate: number | Date = this.valueDate ? this.valueDate[this.valueDate.length - 1] : new Date();

  @State() days: Date[] = [];

  @State() showYearPicker = false;

  @State() showMonthPicker = false;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() currentHoverDate: Date;

  @Prop() position?: 'left' | 'right' = 'left';

  get locale() {
    return store.state.config.locale;
  }

  @Watch('startDate')
  watchStartDate(newValue: Date, oldValue: Date) {
    if (!isSameDay(newValue, oldValue)) {
      this.generateDateRange();
    }
  }

  generateDateRange(valueDate?: number | Date) {
    const date = valueDate || this.startDate || this.valueDate[this.valueDate.length - 1] || new Date();
    this.activeDate = date;
    const endDayInWeek = getDay(endOfMonth(date));
    // 当前月一共有几周
    const totalWeek = getWeeksInMonth(date);
    const weekDay = 7;
    const maxTotalWeek = 6;
    const firstDayOfWeek = getFirstDayOfWeek(this.locale);
    // 向前补位
    let needFillStartDay = getDay(startOfMonth(date));
    // 向后补位, 如此复杂是因为有些月份不足6周，需要向后补一周
    let needFillEndDay = endDayInWeek - weekDay - (maxTotalWeek - totalWeek) * weekDay + 1;

    if (firstDayOfWeek === 1) {
      if (needFillStartDay > 0) {
        needFillStartDay -= 1;
        needFillEndDay -= 1;
      } else {
        needFillStartDay += 7;
        needFillEndDay += 7;
      }
    } else if (firstDayOfWeek === 6) {
      needFillStartDay += 1;
      needFillEndDay += 1;
    }

    this.days = eachDayOfInterval({
      start: subDays(startOfMonth(date), needFillStartDay),
      end: subDays(endOfMonth(date), needFillEndDay),
    });
    this.ksViewDateChange?.emit?.(date as Date);
    this.onviewdatechange?.(date as Date);
  }

  componentWillLoad() {
    this.generateDateRange();
  }

  handleShowYearPicker() {
    this.showYearPicker = true;
  }

  handleShowMonthPicker() {
    this.showMonthPicker = true;
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  onYearChange(event: CustomEvent<IMultipleDateValue>) {
    const date = event.detail || [];
    this.showYearPicker = false;
    this.showMonthPicker = true;

    if (date.length === 0) {
      return false;
    }
    const lastDate = date[date.length - 1];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.activeDate = new Date(lastDate);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  onMonthChange(event: CustomEvent<IMultipleDateValue>) {
    const date = event.detail || [];
    this.showMonthPicker = false;

    if (date.length === 0) {
      return false;
    }

    const lastDate = date[date.length - 1];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.activeDate = new Date(lastDate);
    this.generateDateRange(this.activeDate);
  }

  jumpTo(date: Date) {
    const hasDate = this.addDate(date);
    if (!hasDate) {
      this.generateDateRange();
    }
  }

  addDate(date: Date) {
    if (this.single) {
      this.valueDate = [date];
      return false;
    }
    const offset = Math.abs(this.offset);
    if (offset > 0) {
      this.valueDate = [date, subDays(date, -offset)];
      return false;
    }

    if (this.range) {
      const [startDate, endDate] = this.valueDate || [];
      if ((!startDate && !endDate) || (startDate && endDate)) {
        this.valueDate = [date];
      } else {
        const dateRange = [startDate, endDate, date].filter((item) => !!item);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.valueDate = [min(dateRange), max(dateRange)];
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.flagDate = null;
      }

      return false;
    }

    const dateIndex = this.valueDate.findIndex((item) => isSameDay(item, date));
    if (dateIndex < 0) {
      this.valueDate = [...this.valueDate, date];
    } else {
      const values = this.valueDate;
      values.splice(dateIndex, 1);
      this.valueDate = [...values];
    }

    return dateIndex >= 0;
  }

  get timeZoneToday() {
    const { timezoneOffset } = store.state.i18n;
    const today = new Date();
    const offset = (today.getTimezoneOffset() + timezoneOffset) * 60 * 1000;
    const localDate = new Date(today.getTime() + offset);
    return startOfDay(localDate);
  }

  headerLayout(
    payload: {
      content: HTMLElement;
      left: HTMLElement;
      right: HTMLElement;
      extraHeaderClass?: string;
      position?: 'left' | 'right';
    },
    onHeaderClick: (position: 'left' | 'right' | 'content') => void,
  ) {
    const { left, right, content, extraHeaderClass, position } = payload;

    return (
      <div
        class={classNames(`${prefix}__header`, `${prefix}__header--${position}`, {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          [extraHeaderClass]: extraHeaderClass,
        })}
        part="header"
      >
        <div
          class={`${prefix}__header-left`}
          onClick={(event: Event) => {
            event.stopPropagation();
            onHeaderClick('left');
          }}
          part="left"
          data-testid="day-multiple-date-panel-rf6YNj"
        >
          {left}
        </div>
        <div class={`${prefix}__header-content`} part="header-content">
          {content}
        </div>
        <div
          class={`${prefix}__header-right`}
          part="right"
          onClick={(event: Event) => {
            event.stopPropagation();
            onHeaderClick('right');
          }}
          data-testid="day-multiple-date-panel-cG9mro"
        >
          {right}
        </div>
      </div>
    );
  }

  private dateInRange(startDate: Date | number, endDateValue: Date | number, currentDate: Date) {
    if (!startDate || !endDateValue || !isValid(startDate) || !isValid(endDateValue)) {
      return false;
    }
    // 这里可以用isWithinInterval方法优化一下
    const endDate = endDateValue ? startOfDay(endDateValue) : endDateValue;
    return (
      (isBefore(currentDate, startDate) && isAfter(currentDate, endDate)) ||
      (isBefore(currentDate, endDate) && isAfter(currentDate, startDate))
    );
  }

  calculateDateInRange(date: Date) {
    if (this.valueDate.length >= 1) {
      const [startDate, endDate] = this.valueDate || [];
      const flagDate = this.flagDate || endDate;

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      return this.dateInRange(startDate, flagDate, date);
    }

    return false;
  }

  inOffset(date: Date) {
    if (!this.currentHoverDate) {
      return false;
    }
    const startDate = subDays(this.currentHoverDate, 1);
    const endDate = subDays(this.currentHoverDate, -Math.abs(this.offset) - 1);

    return this.dateInRange(startDate, endDate, date);
  }

  renderDayContent() {
    const offset = Math.abs(this.offset);

    return (
      <Fragment>
        {this.days.slice(0, 7).map((date, index) => (
          <div
            class={`${prefix}__content-cell ${prefix}__content-week`}
            key={index}
            data-testid={`day-multiple-date-panel-deSFLA-${index}`}
          >
            {getLocalizedWeekday(date, this.locale)}
          </div>
        ))}
        {this.days.map((date, index) => {
          const notActiveMonth = !isSameMonth(this.activeDate, date);
          const disabled = this.disabledDate?.(date, !this.range, this.valueDate?.[0]);
          const inRange = this.calculateDateInRange(date) && !disabled;
          const active =
            !notActiveMonth &&
            (this.valueDate.find((item) => isSameDay(item, date)) || (this.flagDate && isSameDay(this.flagDate, date)));

          return (
            <div
              part="content-cell"
              key={getTime(date)}
              onMouseEnter={() => {
                if (!disabled) {
                  this.currentHoverDate = date;
                  this.ksDateHover.emit(date);
                  this.ondatehover?.(date);
                }
              }}
              class={classNames(`${prefix}__content-cell`, {
                [`${prefix}__content-cell--disabled`]: disabled,
                [`${prefix}__content-cell-gray`]: notActiveMonth,
                [`${prefix}__content-cell-${isRTL() ? 'start' : 'end'}`]: (index + 1) % 7 === 0,
                [`${prefix}__content-cell-${!isRTL() ? 'start' : 'end'}`]: index % 7 === 0,
                [`${prefix}__content-in-range`]: this.range && !notActiveMonth && inRange,
                [`${prefix}__content-offset`]: this.inOffset(date) && !notActiveMonth,
                [`${prefix}__content-offset--${!isRTL() ? 'first' : 'last'}`]:
                  this.inOffset(date) && isSameDay(date, this.currentHoverDate) && !notActiveMonth,
                [`${prefix}__content-offset--${isRTL() ? 'first' : 'last'}`]:
                  this.inOffset(date) && isSameDay(date, subDays(this.currentHoverDate, -offset)) && !notActiveMonth,
              })}
              onClick={() => {
                if (!disabled) {
                  this.jumpTo(date);
                  if (notActiveMonth) {
                    this.generateDateRange(date);
                  }
                }
              }}
              data-testid={`day-multiple-date-panel-f6WGiY-${getTime(date)}`}
            >
              <div
                class={classNames({
                  [`${prefix}__item`]: !notActiveMonth,
                  [`${prefix}__gray-item`]: notActiveMonth,
                  [`${prefix}__item--disabled`]: disabled,
                  [`${prefix}__item--today`]: isSameDay(this.timeZoneToday, date),
                  [`${prefix}__item--active-${!isRTL() ? 'first' : 'second'}`]:
                    active &&
                    this.range &&
                    ((this.valueDate.length >= 2 && this.valueDate.findIndex((item) => isSameDay(item, date)) === 0) ||
                      (this.valueDate.length === 1 &&
                        this.flagDate &&
                        // 如果鼠标移动日期(flagDate)在已选日期之前，判断当前日期(date)和移动日期(flagDate)相等
                        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                        ((isAfter(this.valueDate[0], this.flagDate) && isSameDay(date, this.flagDate)) ||
                          // 如果鼠标移动日期(flagDate)在已选日期之后，判断当前日期(date)和已选日期相等
                          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                          (isBefore(this.valueDate[0], this.flagDate) && isSameDay(this.valueDate[0], date))))),
                  [`${prefix}__item--active-${isRTL() ? 'first' : 'second'}`]:
                    active &&
                    this.range &&
                    ((this.valueDate.length >= 2 && this.valueDate.findIndex((item) => isSameDay(item, date)) === 1) ||
                      (this.valueDate.length === 1 &&
                        this.flagDate &&
                        // 如果鼠标移动日期(flagDate)在已选日期之后，判断当前日期和移动日期相等
                        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                        ((isAfter(this.flagDate, this.valueDate[0]) && isSameDay(date, this.flagDate)) ||
                          // 如果鼠标移动日期(flagDate)在已选日期之前，判断已选日期和当前日期相等
                          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                          (isBefore(this.flagDate, this.valueDate[0]) && isSameDay(this.valueDate[0], date))))),
                  [`${prefix}__item--active`]: active,
                })}
              >
                {format(date, 'd')}
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  }

  renderHeader() {
    const date = getLocalizedMonthYear(toDate(this.activeDate), this.locale);
    const isYearFirst = /^\d+/.test(date);

    return this.headerLayout(
      {
        left: <ks-icon-double-chevron-left size="14" class={`${prefix}__header-icon`} />,
        right: <ks-icon-double-chevron-right size="14" class={`${prefix}__header-icon`} />,
        content: this.headerLayout(
          {
            left: <ks-icon-chevron-left size="14" class={`${prefix}__header-icon`} />,
            right: <ks-icon-chevron-right size="14" class={`${prefix}__header-icon`} />,
            extraHeaderClass: `${prefix}__header--center`,
            content: (
              <div
                class={classNames(`${prefix}__header-title-container`, {
                  [`${prefix}__header-title-container--year-first`]: isYearFirst,
                })}
              >
                <div
                  class={`${prefix}__header-title`}
                  onClick={() => this.handleShowMonthPicker()}
                  data-testid="day-multiple-date-panel-86Kvoa"
                >
                  {getLocalizedMonth(toDate(this.activeDate), this.locale)}
                </div>
                <div
                  class={`${prefix}__header-title`}
                  onClick={() => this.handleShowYearPicker()}
                  data-testid="day-multiple-date-panel-nxRoAU"
                >
                  {getLocalizedYear(toDate(this.activeDate), this.locale)}
                </div>
              </div>
            ),
          },
          (position) => {
            if (position === 'left') {
              this.generateDateRange(subMonths(this.activeDate, 1));
            }

            if (position === 'right') {
              this.generateDateRange(subMonths(this.activeDate, -1));
            }
          },
        ),
        position: this.position,
      },
      (position) => {
        if (position === 'left') {
          this.generateDateRange(subYears(this.activeDate, 1));
        }

        if (position === 'right') {
          this.generateDateRange(subYears(this.activeDate, -1));
        }
      },
    );
  }

  renderYearPanel() {
    return (
      <ks-multiple-year-panel
        value={this.valueDate}
        startDate={this.activeDate as Date}
        onKsChange={(value) => {
          this.onYearChange(value);
        }}
        data-testid="day-multiple-date-panel-mpiiQ4"
      ></ks-multiple-year-panel>
    );
  }

  renderMonthPanel() {
    return (
      <ks-multiple-month-panel
        value={this.valueDate}
        startDate={this.activeDate as Date}
        onKsChange={(value) => {
          this.onMonthChange(value);
        }}
        data-testid="day-multiple-date-panel-akrpxX"
      ></ks-multiple-month-panel>
    );
  }

  render() {
    return (
      <Host dir={dir()} ks-multiple-date-panel>
        <div dir={dir()} class={`${prefix}`} part="self">
          {this.presetSlot && (
            <div class={`${prefix}-preset`}>
              <slot name="preset"></slot>
            </div>
          )}

          <div class={`${prefix}-inner`}>
            {this.showMonthPicker && this.renderMonthPanel()}
            {this.showYearPicker && this.renderYearPanel()}
            {!this.showYearPicker && !this.showMonthPicker && (
              <Fragment>
                {this.renderHeader()}
                <div class={`${prefix}__content`} part="content">
                  {this.renderDayContent()}
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
