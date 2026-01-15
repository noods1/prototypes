export interface CropRect {
  x?: number;
  y?: number;
  width: number;
  height: number;
}

export type DragType =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'move';

export type CropRectRatio = 'custom' | '1:1' | '16:9' | '9:16';

export type ImageType = 'image/png' | 'image/jpeg' | 'image/webp';
