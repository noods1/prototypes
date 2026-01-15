import { Component, h, Event, EventEmitter, Prop, Element, Host } from '@stencil/core';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { IDateValue, IMultipleDateValue } from '../../../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

/**
 * @slot preset - preset slot
 */
@Component({
  tag: 'ks-date-panel',
  styleUrl: 'date-panel.scss',
  shadow: true,
})
export class KsDatePanel {
  ['ks-name'] = 'ks-date-panel';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsDatePanelElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date, isStart?: boolean, currentStartDate?: Date | number) => boolean;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IDateValue;
  /**
   * 值改变事件
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksChange: EventEmitter<IDateValue>;

  valueChange(event: CustomEvent<IMultipleDateValue>) {
    const { detail } = event;
    const [date] = detail;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    this.value = date;
    this.ksChange.emit(this.value);
  }

  render() {
    return (
      <Host dir={dir()} ks-date-panel>
        <ks-multiple-date-panel
          value={[this.value]}
          disabledDate={this.disabledDate}
          single={true}
          onKsChange={this.valueChange.bind(this)}
          data-testid="day-date-panel-8DqR8j"
        >
          {this.presetSlot && <slot slot="preset" name="preset"></slot>}
        </ks-multiple-date-panel>
      </Host>
    );
  }
}
