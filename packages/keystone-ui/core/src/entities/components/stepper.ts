/* eslint-disable @typescript-eslint/no-explicit-any */
export type StepperOrientation = 'horizontal' | 'vertical';

export interface StepperItem {
  disabled?: boolean;
  title?: string | (() => any);
  icon?: () => any;
  description?: string | (() => any);
}
