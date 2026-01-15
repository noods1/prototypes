import { createContext } from '@src/libs/runtime-context';
import type { BaseTree } from '@src/utils/tree';

export interface NavigationContextValue<T extends BaseTree = BaseTree> {
  tree: T;
  activeIndex: string;
}

export const NavigationTreeContext = createContext<NavigationContextValue['tree']>('navigation-context:tree');
export const NavigationActiveIndexContext = createContext<NavigationContextValue['activeIndex']>(
  'navigation-context:active-index',
);
