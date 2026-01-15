import { isVue3 } from 'vue-demi';

/** The native isVNode is only available in Vue 3, thus we need a customized version to also support Vue 2. */
export function isVNode(value: any) {
  return Boolean(value && (isVue3 ? value.__v_isVNode : Object.prototype.hasOwnProperty.call(value, 'fnScopeId')));
}
