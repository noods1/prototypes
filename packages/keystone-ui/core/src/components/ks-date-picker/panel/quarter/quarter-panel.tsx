import { Component, h, Prop, Element, Host, Event, EventEmitter } from '@stencil/core';
import { Slot, Slots } from '@src/utils/decorators';
import { dir } from '@src/utils/utils';
import { IDateValue, IMultipleDateValue } from '../../../../entities';
import { Vue2ValueFix } from '@src/utils/decorators/vue2ValueFix';

// const prefix = 'ks-quarter-panel';

/**
 * @slot preset - preset slot
 */
@Component({
  tag: 'ks-quarter-panel',
  styleUrl: 'quarter-panel.scss',
  shadow: true,
})
export class KsQuarterPanel {
  ['ks-name'] = 'ks-quarter-panel';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Element() el: HTMLKsQuarterPanelElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Slot({ slotname: 'preset' }) presetSlot: Slots;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() @Vue2ValueFix() value: IDateValue;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() startDate: Date;

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() disabledDate: (date: Date) => boolean;
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
      <Host dir={dir()} ks-quarter-panel>
        <ks-multiple-quarter-panel
          value={[this.value]}
          startDate={this.startDate}
          disabledDate={this.disabledDate}
          single={true}
          onKsChange={this.valueChange.bind(this)}
          data-testid="quarter-quarter-panel-6eJdmd"
        >
          {this.presetSlot && <slot slot="preset" name="preset"></slot>}
        </ks-multiple-quarter-panel>
      </Host>
    );
  }
}
