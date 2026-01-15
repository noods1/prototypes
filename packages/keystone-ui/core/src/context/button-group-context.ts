import { createContext } from '@src/libs/runtime-context';

export const POSITIONTAG = {
  START: 'start',
  COMMON: 'common',
  END: 'end',
} as const;

export type POSITIONTAG = (typeof POSITIONTAG)[keyof typeof POSITIONTAG];

export interface ButtonGroupContextValue {
  htmlName: string;
  disabled?: boolean;
  value?: string[];
  positionMap?: WeakMap<HTMLKsButtonGroupItemElement, POSITIONTAG>;
  multiple?: boolean;
  onValueChange: (value: string) => void;
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue>('button-group-context');
