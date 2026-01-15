import { Size } from '../common';

export type AvatarPropShape = 'circle' | 'square';
export type AvatarSize = Exclude<Size, 'xl'>;
