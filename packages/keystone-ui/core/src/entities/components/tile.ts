export type TileType = 'vertical' | 'horizontal';
export type TileAction = 'checkbox' | 'radio' | 'none';
export interface Metric {
  data: string;
  type: 'up' | 'down';
}
