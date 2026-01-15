export type PopoverPropTrigger = 'click' | 'hover' | 'focus' | 'manual'; // manual手动方式，外控通过open、close方法。
export type TooltipSize = 'auto' | 'sm' | 'md' | 'lg';
// FIXME auto?
export type PopoverSize = 'sm' | 'md' | 'lg';
export interface PopoverOpenParam {
  canOutclick?: boolean;
  unEmitOutClickEls?: HTMLElement[];
}
