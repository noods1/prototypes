export interface TimelineItem {
  title: string;
  description?: string;
  content?: string;
  disabled?: boolean;
  status?: 'default' | 'error';
}
