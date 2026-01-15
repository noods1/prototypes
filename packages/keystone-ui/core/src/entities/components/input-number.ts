// eslint-disable-next-line @stencil-community/ban-exported-const-enums
export enum EnumInputNumberControlsType {
  Outset = 'left-right',
  Inset = 'right',
  None = 'none',
}

// eslint-disable-next-line @stencil-community/ban-exported-const-enums
export enum EnumInputNumberActionType {
  Increase,
  Decrease,
}

export type InputNumberControlsType = `${EnumInputNumberControlsType}`;
