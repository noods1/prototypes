import { ComponentInterface } from '@stencil/core';

/**
 * @deprecated FIXME This is a temp solution for Vue 2 dom patch bug of force conversion of `.value` to string.
 * Long-term fix should be implemented with Stencil runtime modification.
 * https://github.com/vuejs/vue/blob/223a9e9f2ecf013e6ee5dbf98cbaa8cadf9daf50/src/platforms/web/runtime/modules/dom-props.ts#L46
 * Also see hydration/vue/vue-component-lib/utils.ts
 */
export function Vue2ValueFix() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (target: ComponentInterface, name: string) => {
    const cachedValueMap = new WeakMap<ComponentInterface, unknown>();
    Object.defineProperty(target, '_valueFix', {
      get() {
        return cachedValueMap.get(this);
      },

      set(value) {
        this.value = value;
        cachedValueMap.set(this, value);
      },
    });
  };
}
