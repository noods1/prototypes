/**
 * @license
 * Copyright 2024 ByteDance Inc.
 */

import { ComponentInterface, getElement } from '@stencil/core';
import { Context } from '../create-context';
import { ContextConsumer } from '../controllers/context-consumer';

/**
 * A property decorator that marks a component property as a context consumer.
 * The decorated property will automatically receive values from the nearest context provider.
 *
 * @param options Configuration options
 * @param options.context Context identifier created via createContext
 * @param options.subscribe Whether to subscribe to context value changes, defaults to false.
 *                         If set to true, the property will automatically update when the context value changes
 * @param options.path Optional path string to specify which part of the context value to subscribe to
 *
 * @example
 * ```ts
 * import { Component } from '@stencil/core';
 * import { Consume } from '@src/core/context/decorators/consume';
 * import { themeContext } from '@src/context/theme-context';
 *
 * @Component({
 *   tag: 'theme-consumer'
 * })
 * export class ThemeConsumer {
 *   @Consume({ context: themeContext, subscribe: true, path: 'theme.current' })
 *   theme!: string;
 *
 *   render() {
 *     return <div class={this.theme}>Themed content</div>;
 *   }
 * }
 * ```
 */
export function Consume<ValueType>({
  context,
  subscribe = false,
  path,
}: {
  context: Context<unknown, ValueType>;
  subscribe?: boolean;
  path?: string[] | (() => string[]);
}) {
  return (target: ComponentInterface & { __propsReady?: Promise<void> }, propertyKey: string) => {
    const originalConnectedCallback = target.connectedCallback;
    const originalDisconnectedCallback = target.disconnectedCallback;

    const consumerMap = new WeakMap<HTMLElement, ContextConsumer<Context<unknown, ValueType>, HTMLElement>>();

    target.connectedCallback = function () {
      // Create and initialize ContextConsumer
      const consumer = new ContextConsumer(getElement(this), {
        context,
        callback: (value) => {
          this[propertyKey] = value;
        },
        subscribe,
        path:
          typeof path === 'function'
            ? new Promise<() => string[]>((res) => {
                if (this.__propsReady) {
                  this.__propsReady.then(() => res(path.bind(this)));
                } else {
                  res(path.bind(this));
                }
              })
            : path,
      });
      consumerMap.set(getElement(this), consumer);

      consumer.hostConnected();

      // Call original connectedCallback
      if (originalConnectedCallback) {
        originalConnectedCallback.call(this);
      }
    };

    target.disconnectedCallback = function () {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      consumerMap.get(getElement(this)).hostDisconnected();
      consumerMap.delete(getElement(this));

      // Call original disconnectedCallback
      if (originalDisconnectedCallback) {
        originalDisconnectedCallback.call(this);
      }
    };
  };
}
