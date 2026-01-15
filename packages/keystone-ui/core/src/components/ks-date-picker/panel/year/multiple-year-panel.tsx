import { Component, Element, h, Host, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import classNames from 'classnames';
import { getYear, eachYearOfInterval, format, isSameYear, getTime } from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { IMultipleDateValue } from '../../../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

const prefix = 'ks-year-panel';

/**
 * @slot preset - preset slot
 */
@Component({
  tag: 'ks-multiple-year-panel',
  styleUrl: 'year-panel.scss',
  shadow: true,
})
export abstract class KsMultipleYearPanelComponent {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsMultipleYearPanelElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;

  @Prop() format: (date: Date) => string = (date: Date) => format(date, 'yyyy');

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IMultipleDateValue;

  @Watch('value')
  valueWatcher() {
    this.generateYearRange();
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date) => boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() startDate: Date;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() single: boolean;

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

  @State() years: Date[] = [];

  componentWillLoad() {
    this.generateYearRange();
  }

  addDate(date: Date) {
    if (this.single) {
      this.valueDate = [date];
      return false;
    }

    const dateIndex = this.valueDate.findIndex((item) => isSameYear(item, date));
    if (dateIndex < 0) {
      this.valueDate = [...this.valueDate, date];
    } else {
      const values = this.valueDate;
      values.splice(dateIndex, 1);
      this.valueDate = [...values];
    }

    return dateIndex >= 0;
  }

  generateYearRange(date?: Date) {
    const currentYear = getYear(date || this.startDate || this.valueDate[this.valueDate.length - 1] || new Date());
    const start = currentYear - (currentYear % 10) - 1;
    const end = start + 11;

    this.years = [
      ...eachYearOfInterval({
        start: new Date(start, 1, 1).setFullYear(start),
        end: new Date(end, 1, 1).setFullYear(end),
      }),
    ];
  }

  jumpTo(date: Date) {
    const hasDate = this.addDate(date);
    const yearIndex = this.years.findIndex((dateItem) => isSameYear(dateItem, date));

    if (!hasDate && ([0, this.years.length - 1].includes(yearIndex) || yearIndex < 0)) {
      this.generateYearRange();
    }
  }

  render() {
    const contentClassName = classNames(`${prefix}__grid`, `${prefix}__content`);
    return (
      <Host dir={dir()} ks-multiple-year-panel>
        <div class={`${prefix}`} dir={dir()} part="self">
          {this.presetSlot && (
            <div class={`${prefix}-preset`}>
              <slot name="preset"></slot>
            </div>
          )}

          <div class={`${prefix}-inner`}>
            <div class={`${prefix}__header`}>
              <div
                class={`${prefix}__header-left`}
                onClick={(event: Event) => {
                  event.stopPropagation();
                  this.generateYearRange(this.years[0]);
                }}
                data-testid="year-multiple-year-panel-d3J8GE"
              >
                <ks-icon-double-chevron-left size="14" />
              </div>
              <div class={`${prefix}__header-content`}>
                {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
                {getYear(this.years[1])}～{getYear(this.years[this.years.length - 2])}
              </div>
              <div
                class={`${prefix}__header-right`}
                onClick={(event: Event) => {
                  event.stopPropagation();
                  this.generateYearRange(this.years[this.years.length - 1]);
                }}
                data-testid="year-multiple-year-panel-3N4yBY"
              >
                <ks-icon-double-chevron-right size="14" />
              </div>
            </div>
            <div class={contentClassName}>
              {this.years.map((date, index) => {
                const isStart = index === 0;
                const isLast = index === this.years.length - 1;
                const disabled = this.disabledDate?.(date);
                return (
                  <div
                    onClick={() => {
                      if (!disabled) {
                        this.jumpTo(date);
                      }
                    }}
                    key={getTime(date)}
                    class={classNames(`${prefix}__item`, {
                      [`${prefix}__item--active`]:
                        this.valueDate.find((item) => isSameYear(item, date)) && !isStart && !isLast,
                      [`${prefix}__item--disabled`]: disabled,
                    })}
                    data-testid={`year-multiple-year-panel-va1Bzm-${getTime(date)}`}
                  >
                    <div class={`${prefix}__item-inner`}>{this.format(date)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
