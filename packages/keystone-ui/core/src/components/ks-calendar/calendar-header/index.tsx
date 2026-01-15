import { Component, Host, h, Prop, Event, type EventEmitter, type ComponentInterface } from '@stencil/core';
import { dir, isRTL, t } from '@src/utils/utils';

import type { CalendarViewMode } from '../../../entities';
import { calendarMessages } from '@fe-infra/keystone-locales';

const prefix = 'calendar-header';

@Component({
  tag: 'ks-calendar-header',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCalendarHeader implements ComponentInterface {
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() title: string;
  @Prop() viewMode: CalendarViewMode = 'month';

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksPreviousClick: EventEmitter<MouseEvent>;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksNextClick: EventEmitter<MouseEvent>;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksTodayClick: EventEmitter<MouseEvent>;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Event({ bubbles: false, composed: false }) ksViewModeChange: EventEmitter<CalendarViewMode>;

  render() {
    const yearLabel = t(calendarMessages.year);
    const monthLabel = t(calendarMessages.month);

    return (
      <Host dir={dir()} ks-calendar-header>
        <header dir={dir()} class={prefix}>
          <div class={`${prefix}__current`}>
            <ks-button
              size="sm"
              variant="text"
              shape="square"
              onClick={this.ksPreviousClick.emit}
              data-testid="calendar-header-index-gYYzrZ"
            >
              {isRTL() ? <ks-icon-chevron-right size={16} /> : <ks-icon-chevron-left size={16} />}
            </ks-button>
            <ks-text variant="labelLg">{this.title}</ks-text>
            <ks-button
              size="sm"
              variant="text"
              shape="square"
              onClick={this.ksNextClick.emit}
              data-testid="calendar-header-index-odbW2y"
            >
              {isRTL() ? <ks-icon-chevron-left size={16} /> : <ks-icon-chevron-right size={16} />}
            </ks-button>
          </div>
          <ks-button onClick={this.ksTodayClick.emit} data-testid="calendar-header-index-5YqnnD">
            {t(calendarMessages.today)}
          </ks-button>

          <div class={`${prefix}__spacer`} />

          <ks-segmented-group
            value={this.viewMode}
            onKsChange={({ detail }: { detail: string | number }) => {
              const _viewMode = detail as CalendarViewMode;

              this.viewMode = _viewMode;
              this.ksViewModeChange.emit(_viewMode);
            }}
            data-testid="calendar-header-index-15KiQb"
          >
            <ks-segmented-item value="month">{monthLabel}</ks-segmented-item>
            <ks-segmented-item value="year">{yearLabel}</ks-segmented-item>
          </ks-segmented-group>
        </header>
      </Host>
    );
  }
}
