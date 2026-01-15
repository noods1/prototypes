export type IPresenterInputSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export interface IPresenterValue {
  label: string;
  key: string | number;
  disabled?: boolean;
}

export type IPresenterKey = string | number;

export interface IPresenteInnerValue {
  label: string;
  key: string | number;
  visibility: boolean;
  width?: number;
  disabled?: boolean;
}
