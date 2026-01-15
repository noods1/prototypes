export type ThumbnailSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ThumbnailMediaType = 'image' | 'video' | 'audio';

export type ThumbnailRatioType = 'square' | 'rectangle';

export interface ThumbnailAction {
  id: string | number;
  render: () => HTMLElement | number | string | unknown;
}

export interface ThumbnailGroupItemType {
  src: string;
  poster?: string;
  value: string;
  duration?: string;
  resolution?: string;
  title?: string;
  disabled?: boolean;
}
