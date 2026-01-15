import { ComponentInterface } from '@stencil/core';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __brand: unique symbol;
/**
 * Simulate nominal typing within TypeScript's structurally-typed system,
 * for cases where a type can't be reliable defined using structural typing.
 * Google "Branded Types" for reference.
 */
export type Branded<Type, BrandFlag extends string> = Type & { [__brand]: BrandFlag };

export type SetDynamicSlotsDepsFn<T> = (newDepsOrAction: T | ((prevDeps?: Partial<T>) => Partial<T>)) => void;
export type RenderDynamicSlotsFn<T, ThisArg> = (
  this: ThisArg,
  options: {
    props: ThisArg | null;
    createInSlot: (slotName: string, children: unknown) => unknown;
    dependencies?: Partial<T>;
  },
) => unknown[];

export interface DynamicSlottableComponent<T> extends ComponentInterface {
  $setDynamicSlotsDeps?: SetDynamicSlotsDepsFn<T>;
  $renderDynamicSlots: RenderDynamicSlotsFn<T, unknown>;
}
