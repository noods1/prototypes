import { Component, h, Event, EventEmitter, Prop, Element, Host, State, Watch, Method } from '@stencil/core';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { IDateValue, IMultipleDateValue, IDisabledTimeFn, IDisabledAmFn } from '../../../../entities';

const prefix = 'date-time-range-panel';
const DEFAULT_TIME = '00:00:00';
/**
 * @slot preset - preset slot
 */
@Component({
  tag: 'ks-date-time-range-panel',
  styleUrl: 'date-time-range-panel.scss',
  shadow: true,
})
export class KsDateTimeRangePanel {
  ['ks-name'] = 'ks-date-time-range-panel';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsDateTimeRangePanelElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  timePanelEl: HTMLKsTimePanelElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date, isStart?: boolean, currentStartDate?: Date | number) => boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IDateValue[];

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() offset: number;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() isHour12: boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() isStart: boolean;

  @Prop() showHour = true;

  @Prop() showMinute = true;

  @Prop() showSecond = false;

  @Prop() minuteStep = 1;

  @Prop() hourStep = 1;

  @Prop() secondStep = 1;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledHours: IDisabledTimeFn;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledMinutes: IDisabledTimeFn;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledSeconds: IDisabledTimeFn;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledAm: IDisabledAmFn;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() flagDate: Date;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() activeDate: IDateValue;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() currentHoverDate: Date;

  @State() position: 'left' | 'right' = 'left';

  @State() dateValue: IDateValue[] = [];

  @State() timeValue: string[] = [DEFAULT_TIME, DEFAULT_TIME];
  /**
   * 值改变事件
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<IDateValue[]>;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksDateChange: EventEmitter<IDateValue[]>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksTimeChange: EventEmitter<string[]>;

  @Watch('isStart')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  isStartChangeHandler(newVal) {
    if (newVal) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.flagDate = null;
    }
  }

  @Method()
  async setActiveDate(date: Date) {
    this.activeDate = date;
  }

  dateValueChange(event: CustomEvent<IMultipleDateValue>) {
    const { detail } = event;
    const dateValue = this.dateValue.slice();
    if (this.isStart) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      dateValue[0] = detail[0];
    } else {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      dateValue[1] = detail[0];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.flagDate = null;
    }
    if (this.value === undefined) {
      this.dateValue = dateValue;
    }
    this.ksDateChange.emit(dateValue);
  }

  @Watch('value')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  valueChangeHandler(newVal) {
    this.dateValue = newVal;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.dateValue.forEach((date: Date, index) => {
      if (date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        this.timeValue[index] = `${hours}:${minutes}:${seconds}`;
      } else {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.timeValue[index] = undefined;
      }
    });
  }

  @Method()
  async timePanelScrolltoTime() {
    this.timePanelEl?.gotoTime();
  }

  componentWillLoad() {
    this.value && this.valueChangeHandler(this.value);
  }

  render() {
    return (
      <Host dir={dir()} ks-date-time-range-panel>
        <div class={prefix}>
          <ks-multiple-date-panel
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            value={this.isStart ? [this.dateValue[0]] : this.dateValue}
            single={true}
            disabledDate={this.disabledDate}
            onKsChange={this.dateValueChange.bind(this)}
            onviewdatechange={(date) => {
              if (!this.activeDate || (this.activeDate as Date).getDay() !== date.getDay()) {
                this.setActiveDate(date);
              }
            }}
            range={!this.isStart}
            currentHoverDate={this.currentHoverDate}
            startDate={this.activeDate as Date}
            flagDate={this.flagDate}
            offset={this.offset}
            ondatehover={(date: Date) => {
              this.currentHoverDate = date;
              if (!this.isStart) this.flagDate = date;
            }}
            data-testid="range-date-time-range-panel-55cR35"
          ></ks-multiple-date-panel>
          <ks-divider orientation="vertical" />
          <ks-time-panel
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            ref={(el) => (this.timePanelEl = el)}
            isStart={this.isStart}
            disabledAm={this.disabledAm}
            disabledHours={this.disabledHours}
            disabledMinutes={this.disabledMinutes}
            disabledSeconds={this.disabledSeconds}
            hourStep={this.hourStep}
            minuteStep={this.minuteStep}
            secondStep={this.secondStep}
            showHour={this.showHour}
            showMinute={this.showMinute}
            showSecond={this.showSecond}
            value={this.isStart ? this.timeValue[0] : this.timeValue[1]}
            isHour12={this.isHour12}
            onKsChange={({ detail }) => {
              const timeValue = this.timeValue.slice();
              this.isStart ? (timeValue[0] = detail) : (timeValue[1] = detail);
              if (this.value === undefined) {
                this.timeValue = timeValue;
              }
              this.ksTimeChange.emit(timeValue);
            }}
            data-testid="range-date-time-range-panel-kgr7He"
          ></ks-time-panel>
        </div>
      </Host>
    );
  }
}
