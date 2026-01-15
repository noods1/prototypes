import { Component, h, Prop, State, Element, Host, Event, EventEmitter, Watch } from '@stencil/core';
import classNames from 'classnames';
import { getYear, subYears, isSameMonth, eachMonthOfInterval, getTime, toDate } from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { IMultipleDateValue } from '../../../../entities';
import { getLocalizedMonth } from '@src/components/ks-date-picker/utils';
import store from '@src/store';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

const prefix = 'ks-month-panel';

/**
 * @slot preset - preset slot
 */
@Component({
  tag: 'ks-multiple-month-panel',
  styleUrl: 'month-panel.scss',
  shadow: true,
})
export abstract class KsMultipleMonthPanel {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsMultipleMonthPanelElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date) => boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IMultipleDateValue;

  @Watch('value')
  valueWatcher() {
    this.generateMonthRange();
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() single: boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() startDate: Date;

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
  @State() activeDate: number | Date =
    this.valueDate && this.valueDate.length > 0 ? this.valueDate[this.valueDate.length - 1] : new Date();

  @State() months: Date[] = [];

  @State() showYearPicker = false;

  get locale() {
    return store.state.config.locale;
  }

  componentWillLoad() {
    this.generateMonthRange();
    if (this.startDate) {
      this.activeDate = this.startDate;
    }
  }

  addDate(date: Date) {
    if (this.single) {
      this.valueDate = [date];
      return false;
    }

    const dateIndex = this.valueDate.findIndex((item) => isSameMonth(item, date));
    if (dateIndex < 0) {
      this.valueDate = [...this.valueDate, date];
    } else {
      const values = this.valueDate;
      values.splice(dateIndex, 1);
      this.valueDate = [...values];
    }

    return dateIndex >= 0;
  }

  generateMonthRange(date?: number | Date) {
    const currentYear = getYear(date || this.startDate || this.valueDate[(this.valueDate.length = 1)] || new Date());
    if (date) {
      this.activeDate = date;
    }

    this.months = eachMonthOfInterval({
      start: new Date(`${currentYear}-1-1`).setFullYear(currentYear),
      end: new Date(`${currentYear}-12-1`).setFullYear(currentYear),
    });
  }

  jumpTo(date: Date) {
    const hasDate = this.addDate(date);
    const year = getYear(date);
    this.showYearPicker = false;
    const [startMonth] = this.months;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    if (!hasDate && year !== getYear(startMonth)) {
      this.generateMonthRange();
    }
  }

  handleShowYearPicker() {
    this.showYearPicker = true;
  }

  onYearChange(event: CustomEvent<IMultipleDateValue>) {
    const date = event.detail || [];
    const lastDate = date[date.length - 1];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.activeDate = new Date(lastDate).setFullYear(getYear(lastDate as number));
    this.showYearPicker = false;
    this.generateMonthRange(this.activeDate);
  }

  renderInnerContent() {
    const contentClassName = classNames(`${prefix}__grid`, `${prefix}__content`);

    if (this.showYearPicker) {
      return (
        <div class={`${prefix}__inner`}>
          <ks-multiple-year-panel
            value={this.value}
            startDate={this.activeDate as Date}
            onKsChange={(value) => {
              this.onYearChange(value);
            }}
            data-testid="month-multiple-month-panel-bX4fi4"
          ></ks-multiple-year-panel>
        </div>
      );
    } else {
      return (
        <div class={`${prefix}__inner`}>
          <div class={`${prefix}__header`}>
            <div
              class={`${prefix}__header-left`}
              onClick={(event: Event) => {
                event.stopPropagation();
                this.generateMonthRange(subYears(this.activeDate, 1));
              }}
              data-testid="month-multiple-month-panel-42fPYe"
            >
              <ks-icon-double-chevron-left size="14" />
            </div>
            <div class={`${prefix}__header-content`}>
              <div
                class={`${prefix}__header-title`}
                onClick={() => this.handleShowYearPicker()}
                data-testid="month-multiple-month-panel-uHXWqy"
              >
                {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
                {getYear(this.months[0])}
              </div>
            </div>
            <div
              class={`${prefix}__header-right`}
              onClick={(event: Event) => {
                event.stopPropagation();
                this.generateMonthRange(subYears(this.activeDate, -1));
              }}
              data-testid="month-multiple-month-panel-n4fXXz"
            >
              <ks-icon-double-chevron-right size="14" />
            </div>
          </div>
          <div class={contentClassName}>
            {this.months.map((date) => {
              const disabled = this.disabledDate?.(date);
              return (
                <div
                  key={getTime(date)}
                  onClick={() => {
                    if (!disabled) {
                      this.jumpTo(date);
                    }
                  }}
                  class={classNames(`${prefix}__item`, {
                    [`${prefix}__item--active`]: this.valueDate.find((item) => isSameMonth(item, date)),
                    [`${prefix}__item--disabled`]: disabled,
                  })}
                  data-testid={`month-multiple-month-panel-jBxPSt-${getTime(date)}`}
                >
                  <div class={`${prefix}__item-inner`}>{getLocalizedMonth(toDate(date), this.locale)}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <Host dir={dir()} ks-multiple-month-panel>
        <div dir={dir()} class={`${prefix}`} part="self">
          {this.presetSlot && (
            <div class={`${prefix}-preset`}>
              <slot name="preset"></slot>
            </div>
          )}

          {this.renderInnerContent()}
        </div>
      </Host>
    );
  }
}
