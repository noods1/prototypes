import { Component, h, Prop, Event, EventEmitter, Element, Host } from '@stencil/core';
import { IDateValue, IMultipleDateValue } from '../../../../entities';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

/**
 * @slot preset - preset slot
 */
@Component({
  tag: 'ks-week-panel',
  styleUrl: 'week-panel.scss',
  shadow: true,
})
export class KsWeekPanel {
  ['ks-name'] = 'ks-week-panel';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsWeekPanelElement;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date) => boolean;

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
      <Host dir={dir()} ks-week-panel>
        <ks-multiple-week-panel
          value={[this.value]}
          disabledDate={this.disabledDate}
          single={true}
          onKsChange={this.valueChange.bind(this)}
          data-testid="week-week-panel-o1VKwd"
        >
          {this.presetSlot && <slot slot="preset" name="preset"></slot>}
        </ks-multiple-week-panel>
      </Host>
    );
  }
}
