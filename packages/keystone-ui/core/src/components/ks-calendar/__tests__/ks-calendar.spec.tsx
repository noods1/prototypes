import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsCalendar } from '../index';
import { KsCalendarHeader } from '../calendar-header';
import { KsCalendarMonth } from '../calendar-month';
import { KsCalendarEvent } from '../canlendar-event';
import { KsCalendarYear } from '../calendar-year';
import type { CalendarContent } from '@src/entities';

const mockEvents = [
  {
    start: new Date(2025, 5, 15),
    end: new Date(2025, 5, 17),
    name: 'Test Event',
  },
];

describe('ks-calendar component', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => new Date(2025, 5, 25).getTime());
  });

  afterAll(() => {
    jest.spyOn(Date, 'now').mockRestore();
  });

  it('should render with default values', async () => {
    const page = await newSpecPage({
      components: [KsCalendar, KsCalendarHeader, KsCalendarYear],
      template: () => <ks-calendar></ks-calendar>,
    });

    expect(page.root).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('ks-calendar-header')).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('ks-calendar-month')).toBeTruthy();
  });

  it('should initialize with current date', async () => {
    const page = await newSpecPage({
      components: [KsCalendar, KsCalendarHeader, KsCalendarYear],
      template: () => <ks-calendar></ks-calendar>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const month = page.root.shadowRoot.querySelector('ks-calendar-month');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(month.getAttribute('year')).toBe('2025');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(month.getAttribute('month')).toBe('5');
  });

  it('should switch between month and year view', async () => {
    const page = await newSpecPage({
      components: [KsCalendar, KsCalendarHeader, KsCalendarYear],
      template: () => <ks-calendar></ks-calendar>,
    });

    // Initially in month view
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('ks-calendar-month')).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('ks-calendar-year')).toBeFalsy();

    // Switch to year view
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const viewModeToggle = page.root.shadowRoot.querySelector('ks-calendar-header');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    viewModeToggle.dispatchEvent(new CustomEvent('ksViewModeChange', { detail: 'year' }));
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('ks-calendar-year')).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('ks-calendar-month')).toBeFalsy();
  });

  it('should navigate between months', async () => {
    const page = await newSpecPage({
      components: [KsCalendar, KsCalendarHeader],
      template: () => <ks-calendar></ks-calendar>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const header = page.root.shadowRoot.querySelector('ks-calendar-header');

    // Go to previous month
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    header.dispatchEvent(new CustomEvent('ksPreviousClick'));
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const monthAfterPrev = page.root.shadowRoot.querySelector('ks-calendar-month');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(monthAfterPrev.getAttribute('month')).toBe('4'); // May (0-indexed)

    // Go to next month
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    header.dispatchEvent(new CustomEvent('ksNextClick'));
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const monthAfterNext = page.root.shadowRoot.querySelector('ks-calendar-month');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(monthAfterNext.getAttribute('month')).toBe('5'); // Back to June
  });

  it('should display events', async () => {
    const page = await newSpecPage({
      components: [KsCalendar, KsCalendarHeader, KsCalendarMonth, KsCalendarEvent],
      template: () => <ks-calendar events={mockEvents}></ks-calendar>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const eventElement = page.root.shadowRoot
      .querySelector('[data-testid=ks-calendar-index-7QxssV]')
      .shadowRoot.querySelector('ks-calendar-event');
    expect(eventElement).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(eventElement.shadowRoot.textContent).toContain('Test Event');
  });

  it('should handle custom content', async () => {
    const customContent: CalendarContent[] = [
      {
        date: new Date(2025, 5, 15),
        content: () => 'Custom Content',
      },
    ];

    const page = await newSpecPage({
      components: [KsCalendar, KsCalendarHeader],
      template: () => <ks-calendar renderContent={customContent}></ks-calendar>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const slot = page.root.shadowRoot.querySelector('slot');
    expect(slot).toBeTruthy();
  });
});
