import { Component, h, Event, EventEmitter, Prop, State, Element, Host, Method } from '@stencil/core';
import { subYears } from 'date-fns';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { IDateValue, IMultipleDateValue } from '../../../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

const prefix = 'ks-month-range-panel';

/**
 * @slot preset - preset slot
 */
@Component({
  tag: 'ks-month-range-panel',
  styleUrl: 'month-range-panel.scss',
  shadow: true,
})
export class KsMonthRangePanel {
  ['ks-name'] = 'ks-month-range-panel';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsMonthRangePanelElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IMultipleDateValue;

  /**
   * 值改变事件
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<IMultipleDateValue>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date, isStart?: boolean, currentStartDate?: Date | number) => boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() offset: number;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() flagDate: Date;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() activeDate: IDateValue;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() currentHoverDate: Date;

  valueChange(event: CustomEvent<IMultipleDateValue>) {
    const { detail } = event;
    this.value = detail;
    if (detail.length === 2) {
      this.ksChange.emit(this.value);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.flagDate = null;
    }
  }

  @Method()
  async resetActiveView() {
    const [startDate] = this.value || [];
    this.activeDate = startDate || new Date();
  }
  componentWillLoad() {
    this.resetActiveView();
  }

  render() {
    return (
      <Host dir={dir()} ks-month-range-panel>
        <div dir={dir()} part="self" class={`${prefix}`}>
          <div class={`${prefix}__left-range`}>
            <ks-multiple-month-range-panel
              value={this.value}
              onviewdatechange={(date) => {
                this.activeDate = date;
              }}
              disabledDate={this.disabledDate}
              range={true}
              currentHoverDate={this.currentHoverDate}
              startDate={this.activeDate as Date}
              flagDate={this.flagDate}
              offset={this.offset}
              position="left"
              ondatehover={(date: Date) => {
                this.currentHoverDate = date;
                if (this.value?.length === 1) {
                  this.flagDate = date;
                } else {
                  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                  this.flagDate = null;
                }
              }}
              onKsChange={this.valueChange.bind(this)}
              data-testid="month-range-index-vpHTzA"
            >
              {this.presetSlot && <slot slot="preset" name="preset"></slot>}
            </ks-multiple-month-range-panel>
          </div>
          <div class={`${prefix}__right-range`}>
            <ks-multiple-month-range-panel
              value={this.value}
              disabledDate={this.disabledDate}
              flagDate={this.flagDate}
              range={true}
              offset={this.offset}
              currentHoverDate={this.currentHoverDate}
              onviewdatechange={(date) => {
                this.activeDate = subYears(date, 1);
              }}
              startDate={subYears((this.activeDate as Date) || new Date(), -1)}
              position="right"
              ondatehover={(date: Date) => {
                this.currentHoverDate = date;
                if (this.value?.length === 1) {
                  this.flagDate = date;
                } else {
                  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                  this.flagDate = null;
                }
              }}
              onKsChange={this.valueChange.bind(this)}
              data-testid="month-range-index-mF6ruf"
            ></ks-multiple-month-range-panel>
          </div>
        </div>
      </Host>
    );
  }
}
