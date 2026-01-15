export interface AssetTileContent {
  title?: string;
  description?: string;
  detailInfos?: string[];
  avatar?: string;
}

export interface AdditionalTags {
  recommendation?: boolean;
  ai?: boolean;
  others?: string[];
}

export type AssetTileMediaType = 'video' | 'carousel' | 'image';

export interface TagsType {
  type: 'recommend' | 'ai' | 'normal';
  content?: string;
}
