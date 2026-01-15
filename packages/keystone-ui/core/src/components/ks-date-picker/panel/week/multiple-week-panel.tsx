import { Component, h, Fragment, Element, Prop, State, Host, Event, EventEmitter, Watch } from '@stencil/core';
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
  getWeek,
  getWeeksInMonth,
  isSameMonth,
  eachWeekOfInterval,
  isSameWeek,
  getTime,
} from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { IMultipleDateValue } from '../../../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

const prefix = 'ks-week-panel';

/**
 * @slot preset - preset slot
 */
@Component({
  tag: 'ks-multiple-week-panel',
  styleUrl: 'week-panel.scss',
  shadow: true,
})
export class KsMultipleWeekPanel {
  ['ks-name'] = 'ks-multiple-week-panel';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsMultipleWeekPanelElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date) => boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() single: boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IMultipleDateValue;
  @Watch('value')
  valueWatcher() {
    this.generateDateRange();
  }

  /**
   * 值改变事件
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<IMultipleDateValue>;

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
    this.value = newValue;
    this.ksChange.emit(this.value);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() activeDate: number | Date = this.valueDate ? this.valueDate[this.valueDate.length - 1] : new Date();

  @State() days: Date[] = [];

  @State() weeks: Date[] = [];

  @State() showYearPicker = false;

  @State() showMonthPicker = false;

  generateDateRange(valueDate?: Date | number) {
    const date = valueDate || this.valueDate[this.valueDate.length - 1] || new Date();
    this.activeDate = date;
    const startDayInWeek = getDay(startOfMonth(date));
    const endDayInWeek = getDay(endOfMonth(date));
    // 当前月一共有几周
    const totalWeek = getWeeksInMonth(date);
    const weekDay = 7;
    const maxTotalWeek = 6;
    // 向前补位
    const needFillStartDay = startDayInWeek;
    // 向后补位, 如此复杂是因为有些月份不足6周，需要向后补一周
    const needFillEndDay = endDayInWeek - weekDay - (maxTotalWeek - totalWeek) * weekDay + 1;
    this.days = eachDayOfInterval({
      start: subDays(startOfMonth(date), needFillStartDay),
      end: subDays(endOfMonth(date), needFillEndDay),
    });
    this.weeks = eachWeekOfInterval({
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      start: this.days[0],
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      end: this.days[this.days.length - 1],
    });
  }

  componentWillLoad() {
    this.generateDateRange(new Date());
  }

  handleShowYearPicker() {
    this.showYearPicker = true;
  }

  handleShowMonthPicker() {
    this.showMonthPicker = true;
  }

  onYearChange(event: CustomEvent<IMultipleDateValue>) {
    const date = event.detail || [];
    const lastDate = date[date.length - 1];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.activeDate = new Date(lastDate);
    this.showYearPicker = false;
    this.showMonthPicker = true;
  }

  onMonthChange(event: CustomEvent<IMultipleDateValue>) {
    const date = event.detail || [];
    const lastDate = date[date.length - 1];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.activeDate = new Date(lastDate);
    this.showMonthPicker = false;
    this.generateDateRange(this.activeDate);
  }

  addDate(date: Date) {
    if (this.single) {
      this.valueDate = [date];
      return false;
    }

    const dateIndex = this.valueDate.findIndex((item) => isSameWeek(item, date));
    if (dateIndex < 0) {
      this.valueDate = [...this.valueDate, date];
    } else {
      const values = this.valueDate;
      values.splice(dateIndex, 1);
      this.valueDate = [...values];
    }

    return dateIndex >= 0;
  }

  jumpTo(date: Date) {
    const hasDate = this.addDate(date);
    if (!hasDate) {
      this.generateDateRange();
    }
  }

  headerLayout(
    payload: {
      content: HTMLElement;
      left: HTMLElement;
      right: HTMLElement;
    },
    onHeaderClick: (position: 'left' | 'right' | 'content') => void,
  ) {
    const { left, right, content } = payload;
    return (
      <div class={`${prefix}__header`}>
        <div
          class={`${prefix}__header-left`}
          onClick={(event: Event) => {
            event.stopPropagation();
            onHeaderClick('left');
          }}
          data-testid="week-multiple-week-panel-kxeAWB"
        >
          {left}
        </div>
        <div class={`${prefix}__header-content`}>{content}</div>
        <div
          class={`${prefix}__header-right`}
          onClick={(event: Event) => {
            event.stopPropagation();
            onHeaderClick('right');
          }}
          data-testid="week-multiple-week-panel-5Tjrex"
        >
          {right}
        </div>
      </div>
    );
  }

  renderDayContent() {
    return (
      <Fragment>
        <div class={`${prefix}__row`}>
          {this.days.slice(0, 7).map((date, index) => (
            <div key={index} class={`${prefix}__content-col`} data-testid={`week-multiple-week-panel-ibMAQb-${index}`}>
              {format(date, 'EEEEEE')}
            </div>
          ))}
        </div>
        {this.weeks.map((weekDate, index) => {
          const days = this.days.slice(index * 7, (index + 1) * 7);
          return (
            <div
              key={`${getTime(weekDate)}-${getWeek(weekDate)}`}
              class={classNames(`${prefix}__row`, {
                [`${prefix}__row--active`]: this.valueDate.find((item) => isSameWeek(item, weekDate)),
                [`${prefix}__row--disabled`]: days.every((day) => this.disabledDate?.(day)),
              })}
              data-testid={`week-multiple-week-panel-39q4Ke-${`${getTime(weekDate)}-${getWeek(weekDate)}`}`}
            >
              {days.map((date) => {
                const notActiveMonth = !isSameMonth(this.activeDate, date);
                const disabled = this.disabledDate?.(date);
                return (
                  <div
                    class={classNames(`${prefix}__content-col`, {
                      [`${prefix}__content-col-gray`]: notActiveMonth,
                    })}
                    key={getTime(date)}
                    onClick={() => {
                      if (!disabled) {
                        this.jumpTo(date);
                        if (notActiveMonth) {
                          this.generateDateRange(date);
                        }
                      }
                    }}
                    data-testid={`week-multiple-week-panel-75PfoF-${getTime(date)}`}
                  >
                    <div
                      class={classNames(`${prefix}__content-col-item`, {
                        [`${prefix}__content-col-item--disabled`]: disabled,
                      })}
                    >
                      {format(date, 'd')}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </Fragment>
    );
  }

  renderHeader() {
    return this.headerLayout(
      {
        left: <ks-icon-double-chevron-left size="14" />,
        right: <ks-icon-double-chevron-right size="14" />,
        content: this.headerLayout(
          {
            left: <ks-icon-chevron-left size="14" />,
            right: <ks-icon-chevron-right size="14" />,
            content: (
              <Fragment>
                <div
                  class={`${prefix}__header-title`}
                  onClick={() => this.handleShowMonthPicker()}
                  data-testid="week-multiple-week-panel-ackdri"
                >
                  {format(this.activeDate, 'MMM')}
                </div>
                <div
                  class={`${prefix}__header-title`}
                  onClick={() => this.handleShowYearPicker()}
                  data-testid="week-multiple-week-panel-6NHisS"
                >
                  {format(this.activeDate, 'yyyy')}
                </div>
              </Fragment>
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
        data-testid="week-multiple-week-panel-cRCBdW"
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
        data-testid="week-multiple-week-panel-f2Z9L9"
      ></ks-multiple-month-panel>
    );
  }

  render() {
    return (
      <Host dir={dir()} ks-multiple-week-panel>
        <div part="self" dir={dir()} class={`${prefix}`}>
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
                <div class={`${prefix}__week`}>
                  <div class={`${prefix}__week-left`}>
                    <div class={`${prefix}__title-section`}>周</div>
                    {this.weeks.map((weekDay, index) => {
                      const disabled = this.disabledDate?.(weekDay);
                      const weekItemClassName = classNames(`${prefix}__item`, {
                        [`${prefix}__content-cell-gray`]: !isSameMonth(this.activeDate, weekDay) && index !== 0,
                        [`${prefix}__item--active`]: this.valueDate.find((item) => isSameWeek(item, weekDay)),
                        [`${prefix}__item--disabled`]: disabled,
                      });
                      return (
                        <div
                          onClick={() => {
                            if (!disabled) {
                              this.jumpTo(weekDay);
                            }
                          }}
                          class={weekItemClassName}
                          data-testid="week-multiple-week-panel-hW2h7o"
                        >
                          {getWeek(weekDay)}
                        </div>
                      );
                    })}
                  </div>
                  <div class={`${prefix}__content`}>{this.renderDayContent()}</div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
