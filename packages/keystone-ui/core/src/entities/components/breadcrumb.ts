import { LinkTarget } from './link';

export type BreadcrumbSize = 'md' | 'lg';

export interface BreadcrumbItem {
  value: string;
  active?: boolean;
  disabled?: boolean;
  target?: LinkTarget;
  href?: string;
}
export interface BreadcrumbDropdownItem {
  value: string;
  active?: boolean;
  disabled?: boolean;
  /** Trigger method for the dropdown */
  trigger?: 'click' | 'hover' | 'focus';
  children: (BreadcrumbItem & { id?: string })[];
}
