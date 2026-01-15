export type IDateValue = string | number | Date;

export type IMultipleDateValue = Array<IDateValue>;

export interface ICompareValue {
  source?: IMultipleDateValue;
  target?: IMultipleDateValue;
  isCompare?: boolean;
}
