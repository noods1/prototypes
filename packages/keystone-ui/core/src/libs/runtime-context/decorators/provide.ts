/**
 * @license
 * Copyright 2024 ByteDance Inc.
 */

import { ComponentInterface, getElement } from '@stencil/core';
import { Context } from '../create-context';
import { ContextProvider } from '../controllers/context-provider';

type StencilComponentRef = unknown;

/**
 * A property decorator that marks a component property as a context provider.
 * The decorated property value will be provided to consuming components through the context system.
 *
 * @param options Configuration options
 * @param options.context Context identifier created via createContext
 *
 * @example
 * ```ts
 * import { Component } from '@stencil/core';
 * import { Provide } from '@src/core/context/decorators/provide';
 * import { themeContext } from '@src/context/theme-context';
 *
 * @Component({
 *   tag: 'theme-provider'
 * })
 * export class ThemeProvider {
 *   @Provide({ context: themeContext })
 *   theme = 'light';
 * }
 * ```
 */
export function Provide<ValueType>({
  context,
  callback,
}: {
  context: Context<unknown, ValueType>;
  callback?: (instance: StencilComponentRef, value: ValueType) => void;
}) {
  return (target: ComponentInterface, propertyKey: string) => {
    // Store mapping between component instances and their ContextProvider controllers
    const controllerMap = new WeakMap<HTMLElement, ContextProvider<Context<unknown, ValueType>>>();
    // Store pending values before component connection
    const pendingValueMap = new WeakMap<HTMLElement, ValueType>();

    const originalConnectedCallback = target.connectedCallback;
    const originalDisconnectedCallback = target.disconnectedCallback;

    target.connectedCallback = function () {
      // Create and initialize ContextProvider
      const controller = new ContextProvider(getElement(this), { context, initialValue: this[propertyKey] });
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.controller = controller;
      controllerMap.set(getElement(this), controller);

      // If there's a pending value, set it to the provider
      const pendingValue = pendingValueMap.get(getElement(this));
      if (pendingValue !== undefined) {
        controller.setValue(pendingValue);
        pendingValueMap.delete(getElement(this));
      }

      controller.hostConnected();

      // Call original connectedCallback
      if (originalConnectedCallback) {
        originalConnectedCallback.call(this);
      }
    };

    target.disconnectedCallback = function () {
      const currentController = controllerMap.get(getElement(this));
      if (currentController) {
        currentController.hostDisconnected();
        controllerMap.delete(getElement(this));
      }

      // Call original disconnectedCallback
      if (originalDisconnectedCallback) {
        originalDisconnectedCallback.call(this);
      }
    };

    // Create accessor for the target property
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    let newDescriptor: PropertyDescriptor;
    if (descriptor === undefined) {
      // If property has no descriptor, create new accessors
      const valueMap = new WeakMap<HTMLElement, ValueType>();
      newDescriptor = {
        get(this: StencilComponentRef) {
          return valueMap.get(getElement(this));
        },
        set(this: StencilComponentRef, value: ValueType) {
          const controller = controllerMap.get(getElement(this));
          if (controller) {
            controller.setValue(value);
          } else {
            // If controller is not yet created, store value in pending map
            pendingValueMap.set(getElement(this), value);
          }
          valueMap.set(getElement(this), value);
          callback?.(this, value);
        },
        configurable: true,
        enumerable: true,
      };
    } else {
      // If property has descriptor, preserve existing behavior and add value update logic
      const oldSetter = descriptor.set;
      newDescriptor = {
        ...descriptor,
        set(this: HTMLElement, value: ValueType) {
          controllerMap.get(getElement(this))!.setValue(value);
          oldSetter?.call(this, value);
          callback?.(this, value);
        },
      };
    }
    Object.defineProperty(target, propertyKey, newDescriptor);
  };
}
