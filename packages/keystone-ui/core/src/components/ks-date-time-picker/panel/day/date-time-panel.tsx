import { Component, h, Event, EventEmitter, Prop, Element, Host, State, Watch, Method } from '@stencil/core';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';
import { IDateValue, IDisabledTimeFn, IDisabledAmFn } from '../../../../entities';

const prefix = 'date-time-panel';
/**
 * @slot preset - preset slot
 */
@Component({
  tag: 'ks-date-time-panel',
  styleUrl: 'date-time-panel.scss',
  shadow: true,
})
export class KsDateTimePanel {
  ['ks-name'] = 'ks-date-panel';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsDateTimePanelElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  timePanelEl;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date, isStart?: boolean, currentStartDate?: Date | number) => boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IDateValue;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() offset: number;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() isHour12: boolean;

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
  @State() activeDate: IDateValue;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() currentHoverDate: Date;

  @State() position: 'left' | 'right' = 'left';

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() dateValue: IDateValue;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() timeValue: string;
  /**
   * 值改变事件
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksDateChange: EventEmitter<IDateValue>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksTimeChange: EventEmitter<string>;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @State() dateTimeValue: Date;

  @Watch('value')
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  valueChangeHandler(newVal) {
    this.dateValue = newVal;
    if (newVal) {
      const hours = newVal.getHours().toString().padStart(2, '0');
      const minutes = newVal.getMinutes().toString().padStart(2, '0');
      const seconds = newVal.getSeconds().toString().padStart(2, '0');
      this.timeValue = `${hours}:${minutes}:${seconds}`;
    } else {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.timeValue = undefined;
    }
  }
  componentWillLoad() {
    this.value && this.valueChangeHandler(this.value);
  }
  @Method()
  async setActiveDate(date: Date) {
    this.activeDate = date;
  }

  @Method()
  async timePanelScrolltoTime() {
    this.timePanelEl?.gotoTime();
  }
  render() {
    return (
      <Host dir={dir()} ks-date-panel>
        <div class={prefix}>
          <ks-multiple-date-panel
            value={[this.dateValue]}
            disabledDate={this.disabledDate}
            single={true}
            onKsChange={({ detail }) => {
              if (this.value === undefined) {
                // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
                this.dateValue = detail;
              }
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              this.ksDateChange.emit(detail);
            }}
            onviewdatechange={(date) => {
              if (!this.activeDate || (this.activeDate as Date).getDay() !== date.getDay()) {
                this.setActiveDate(date);
              }
            }}
            currentHoverDate={this.currentHoverDate}
            startDate={this.activeDate as Date}
            offset={this.offset}
            data-testid="day-date-time-panel-iZ6vJT"
          ></ks-multiple-date-panel>
          <ks-divider orientation="vertical" />
          <ks-time-panel
            ref={(el) => (this.timePanelEl = el)}
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
            value={this.timeValue}
            isHour12={this.isHour12}
            onKsChange={({ detail }) => {
              if (this.value === undefined) {
                this.timeValue = detail;
              }
              this.ksTimeChange.emit(detail);
            }}
            data-testid="day-date-time-panel-naZKUd"
          ></ks-time-panel>
        </div>
      </Host>
    );
  }
}
