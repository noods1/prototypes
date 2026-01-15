import type { Components } from '../../components';
import type { TabType } from './tabs';

export interface LoadFailedOption {
  title?: string;
  description?: string;
}

export type CustomRenderFn = () => HTMLElement | Element | number | string | unknown;
export type RenderContentFn = (searchQuery?: string) => ReturnType<CustomRenderFn>;

export interface DropdownMenuItem {
  id: number | string;
  disabled?: boolean;
  content?: string;
  renderContent?: RenderContentFn;
  renderOptions?: DropdownMenuItemRenderOptions;
  dataAttrs?: Record<`data-${string}`, string | boolean>;
  groupId?: string | number;
}

type DropdownMenuItemRenderOptionValue<T> = T | ((item: DropdownMenuItem) => T);
type DropdownMenuItemPopoverProps = Omit<
  Components.KsPopover & { render: CustomRenderFn },
  'anchorEl' | 'close' | 'getContainer' | 'open' | 'visible' | 'defaultVisible' | 'trigger'
>;
export interface DropdownMenuItemRenderOptions {
  avatar?: DropdownMenuItemRenderOptionValue<Partial<Components.KsAvatar>>;
  description?: string | CustomRenderFn;
  popover?: Partial<DropdownMenuItemPopoverProps>;
  extra?: CustomRenderFn;
}

export type DropdownSingleItem = DropdownMenuItem & { type: 'single' };

export interface DropdownGroupItem {
  disabled?: boolean;
  type: 'group';
  id?: string | number;
  title?: string;
  avatarUrl?: string;
  avatarIcon?: () => HTMLElement | Element | number | string | unknown;
  renderTitle?: () => HTMLElement | Element | number | string | unknown;
  description?: string;
  descriptionStyle?: 'tooltip' | 'label';
  children: DropdownMenuItem[];
}

export type DropdownItem = DropdownSingleItem | DropdownGroupItem;

export type DropdownItemType = DropdownItem['type'];

export type DropdownMenuType = DropdownMenu['type'];

export interface DropdownTab {
  tabId: string;
  label?: string;
  renderTab?: CustomRenderFn;
  items: DropdownItem[];
}

export interface DropdownListMenu {
  type: 'list';
  items: DropdownItem[];
}
export interface DropdownTabMenu {
  type: 'tabs';
  tabs: DropdownTab[];
  tabType?: TabType;
}

export type DropdownMenu = DropdownListMenu | DropdownTabMenu;
