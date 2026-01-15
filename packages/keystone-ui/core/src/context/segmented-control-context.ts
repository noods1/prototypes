import { createContext } from '@src/libs/runtime-context';

export interface SegmentedControlContextValue {
  value: string | number;
  disabled: boolean;
  updateValue?: (value: string | number) => void;
}

export const SegmentedControlContext = createContext<SegmentedControlContextValue>('segmented-control-context');
