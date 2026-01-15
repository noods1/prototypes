export type CalendarViewMode = 'month' | 'year';
export interface CalendarEvent {
  name: string;
  start: Date;
  end: Date;
}
export interface CalendarEventVisual {
  event: CalendarEvent;
  column: number;
  columnCount: number;
}
export type CalendarEventColor = 'purple' | 'blue' | 'pink' | 'neutral';
export interface CalendarContent {
  content: () => HTMLElement | number | string | unknown;
  date: Date;
}
