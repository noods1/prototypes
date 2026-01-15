import { LinkTarget } from './link';
export type InlineAlertVariant = 'warning' | 'info' | 'error' | 'success' | 'suggestion';
export type BackgroundVariant = 'normal' | 'inverse';
export type GlobalAlertVariant = 'warning' | 'info' | 'error';
export type InfoOrientation = 'horizontal' | 'vertical';
export type InfoSize = 'md' | 'sm';
export type InfoVariant = 'warning' | 'info-high' | 'error' | 'success' | 'info-low' | 'support';

export interface Info {
  content: string;
  variant: GlobalAlertVariant;
  title: string;
  link: {
    href: string;
    content: string;
    target?: LinkTarget;
  };
}

export interface ItemType {
  content: () => HTMLElement | number | string | unknown;
  link?: () => HTMLElement | number | string | unknown;
  id: string | number;
}

export interface GuidanceContent {
  content: () => HTMLElement | number | string | unknown;
  link?: () => HTMLElement | number | string | unknown;
  id: string | number;
}
