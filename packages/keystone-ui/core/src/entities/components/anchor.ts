export type AnchorDisplay = 'always' | 'collapsible' | 'hideable';
export interface AnchorItem {
  label: string;
  value: string;
  href?: string;
  items?: AnchorItem[];
}
