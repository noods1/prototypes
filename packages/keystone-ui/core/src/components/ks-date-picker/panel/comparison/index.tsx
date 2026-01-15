import { Component, h, Event, EventEmitter, Prop, State, Element, Host, Fragment } from '@stencil/core';
import { format, differenceInDays } from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { ICompareValue, IDateValue } from '../../../../entities';
import classNames from 'classnames';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

/**
 * @slot source-preset - source-preset slot
 * @slot target-preset - target-preset slot
 */
@Component({
  tag: 'ks-date-comparison-panel',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsDateComparisonPanel {
  ['ks-name'] = 'ks-date-comparison-panel';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsDateComparisonPanelElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'source-preset' }) sourcePresets: Slots;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'target-preset' }) targetPresets: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: ICompareValue;

  /**
   * 源日期偏移
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() sourceOffset: number;

  /**
   * 目标日期偏移
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() targetOffset: number;

  @Prop() hideComparisonSwitch = false;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() getDefaultTargetBySource: (source: Date[]) => Date[];

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() getTargetPresets: (sourceValue: Date[], offset: number | null) => Date[];

  /**
   * 值改变事件
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<ICompareValue>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date) => boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() activeDate: IDateValue;

  @State() active: 'start' | 'end' = 'start';

  get startDateRange() {
    const { source } = this.value || {};
    return source?.map?.((date) => (typeof date === 'string' ? date : format(date, 'yyyy-MM-dd')))?.join?.(' - ');
  }

  get endDateRange() {
    const { target } = this.value || {};
    return target?.map?.((date) => (typeof date === 'string' ? date : format(date, 'yyyy-MM-dd')))?.join?.(' - ');
  }

  get offset() {
    if (this.active === 'start') {
      return this.sourceOffset || 0;
    }

    const { source } = this.value || {};
    const [start = new Date(), end = new Date()] = source || [];

    return (
      this.targetOffset ||
      differenceInDays(
        typeof end === 'string' ? new Date(end) : end,
        typeof start === 'string' ? new Date(start) : start,
      )
    );
  }

  valueChange(value: ICompareValue) {
    if (this.value) {
      this.value = { ...this.value, ...value };
    } else {
      this.value = { ...value };
    }
    this.ksChange.emit(this.value);
  }

  activeChange(state: 'start' | 'end') {
    this.active = state;
  }

  render() {
    return (
      <Host dir={dir()} ks-date-comparison-panel>
        <div dir={dir()} part="self" class={'date-comparison-panel'}>
          <div class="panel__header" part="header">
            <div class="panel__header-left" part="header-left">
              <div
                onClick={() => this.activeChange('start')}
                class={classNames('header__date--item', { ['header__date--item-active']: this.active === 'start' })}
                data-testid="comparison-index-5iJj3o"
              >
                {
                  this.startDateRange
                    ? this.startDateRange
                    : 'date-comparison.placeholder' /* FIXME missing translation */
                }
              </div>
              {this.value?.isCompare && (
                <Fragment>
                  <div class="header__date--divider">{'date-comparison.compare' /* FIXME missing translation */}</div>
                  <div
                    onClick={() => this.activeChange('end')}
                    class={classNames('header__date--item', { ['header__date--item-active']: this.active === 'end' })}
                    data-testid="comparison-index-gnWDmc"
                  >
                    {
                      this.endDateRange
                        ? this.endDateRange
                        : 'date-comparison.placeholder' /* FIXME missing translation */
                    }
                  </div>
                </Fragment>
              )}
            </div>
            {!this.hideComparisonSwitch && (
              <div class="panel__header-right" part="header-right">
                <span>{'date-comparison.compare' /* FIXME missing translation */}</span>
                <ks-switch
                  checked={this.value?.isCompare}
                  disabled={!this.startDateRange}
                  onKsChange={(event) => {
                    const { detail } = event;
                    const payload: ICompareValue = { isCompare: detail };

                    if (!detail) {
                      this.active = 'start';
                      payload.target = [];
                    }

                    this.valueChange(payload);
                  }}
                  data-testid="comparison-index-qhwsZJ"
                ></ks-switch>
              </div>
            )}
          </div>
          <div class="panel__content">
            <ks-date-range-panel
              offset={this.offset}
              onKsChange={(event) => {
                const { detail } = event;
                if (this.active === 'start') {
                  this.valueChange({ source: detail, target: [] });
                } else {
                  this.valueChange({ target: detail });
                }
              }}
              value={this.active === 'start' ? this.value?.source : this.value?.target}
              data-testid="comparison-index-nqNcnT"
            >
              {this.sourcePresets && this.active === 'start' && (
                <slot key="start" name="source-preset" slot="preset" data-testid="comparison-index-5VjdcN"></slot>
              )}

              {this.targetPresets && this.active === 'end' && (
                <slot key="end" name="target-preset" slot="preset" data-testid="comparison-index-aosT7q"></slot>
              )}
            </ks-date-range-panel>
          </div>
        </div>
      </Host>
    );
  }
}
