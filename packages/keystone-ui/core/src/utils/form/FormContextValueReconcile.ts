import { ComponentInterface } from '@stencil/core';

export function FormContextValueReconcile({
  providerKey = '_provider',
  contextKey,
}: {
  providerKey?: string;
  contextKey?: string;
} = {}) {
  return (target: ComponentInterface, propertyKey: string) => {
    contextKey = contextKey || `${propertyKey}FromContext`;
    const originalValueDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const originalContextValueDescriptor = Object.getOwnPropertyDescriptor(target, contextKey);
    // Should use a map to distinguish different components
    const isUpdatingInternalStateMap = new WeakMap<ComponentInterface, boolean>();

    if (!originalValueDescriptor) {
      return;
    }

    // original value from user
    const valueMap = new WeakMap<HTMLElement, unknown>();
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      set(value) {
        if (isUpdatingInternalStateMap.get(this)) {
          originalValueDescriptor.set?.call(this, value);
          return;
        }
        // 劫持 value 变化，记录原始值
        valueMap.set(this, value);
        originalValueDescriptor.set?.call(this, value);
      },
    });
    Object.defineProperty(target, contextKey, {
      configurable: true,
      enumerable: true,
      set(value) {
        isUpdatingInternalStateMap.set(this, true);

        // 劫持 contextValue 变化，并在 value 原始值是 undefined 时改变 value
        originalContextValueDescriptor?.set?.call(this, value);
        if (this[providerKey] === 'formItem') {
          const uncontrollable = valueMap.get(this) === undefined;
          if (uncontrollable) {
            this[propertyKey] = value;
          }
        }

        isUpdatingInternalStateMap.set(this, false);
      },
    });
  };
}
