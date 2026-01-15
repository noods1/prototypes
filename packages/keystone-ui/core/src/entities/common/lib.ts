export type { Locale } from '@fe-infra/keystone-locales';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type UpLoadSize = 'sm' | 'md';
export type InputSize = 'sm' | 'md';
export type SkeletonSize = 'sm' | 'md' | 'lg';
export type InputNumberSize = 'sm' | 'md';
export type Direction = 'ltr' | 'rtl';
export type TextType = 'headline' | 'title' | 'body' | 'label';
// TODO prettier this type
export type Status = 'default' | 'success' | 'warning' | 'error';
export type Orientation = 'horizontal' | 'vertical';
export type InputStatus = 'default' | 'warning' | 'error';
export type Theme =
  | 'default'
  | 'primary'
  | 'support'
  | 'error'
  | 'warning'
  | 'success'
  | 'info'
  | 'neutral'
  | 'neutralHigh'
  | 'neutralLow';
export type UploadIconType = 'plus' | 'upload';
export interface LockScroll {
  enabled?: boolean;
  container?: HTMLElement;
}
export interface ZIndex {
  modal?: number;
  message?: number;
}
