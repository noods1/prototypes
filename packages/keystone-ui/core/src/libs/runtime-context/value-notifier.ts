/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { get } from 'lodash-es';
import { ContextCallback } from './context-request-event';

/**
 * A disposer function
 */
type Disposer = () => void;

interface CallbackInfo {
  disposer: Disposer;
  consumerHost: Element;
  path?: string[] | Promise<() => string[]>;
}

/**
 * A simple class which stores a value, and triggers registered callbacks when
 * the value is changed via its setter.
 *
 * An implementor might use other observable patterns such as MobX or Redux to
 * get behavior like this. But this is a pretty minimal approach that will
 * likely work for a number of use cases.
 */
export class ValueNotifier<T> {
  protected readonly subscriptions = new Map<ContextCallback<T>, CallbackInfo>();
  private _value!: T;
  get value(): T {
    return this._value;
  }
  set value(v: T) {
    this.setValue(v);
  }

  setValue(v: T, force = false) {
    const _oldValue = this._value;
    this._value = v;
    for (const [callback, { disposer, path }] of this.subscriptions) {
      if (!path) {
        // 没有路径，检查全值
        if (force || !Object.is(this._value, _oldValue)) {
          callback(this._value, disposer);
        }
      } else if (path instanceof Promise) {
        path.then((path) => {
          // 只在路径值变化时才触发回调
          const newValue = get(this._value, path());
          const oldValue = get(_oldValue, path());
          if (force || !Object.is(newValue, oldValue)) {
            callback(newValue, disposer);
          }
        });
      } else {
        // 路径已解析，比较路径值是否变化触发回调
        const newValue = get(this._value, path);
        const oldValue = get(_oldValue, path);
        if (force || !Object.is(newValue, oldValue)) {
          callback(newValue, disposer);
        }
      }
    }
  }

  constructor(defaultValue?: T) {
    if (defaultValue !== undefined) {
      this.value = defaultValue;
    }
  }

  addCallback(
    callback: ContextCallback<T>,
    consumerHost: Element,
    subscribe?: boolean,
    path?: string[] | Promise<() => string[]>,
  ): void {
    if (!subscribe) {
      // 如果不订阅，初始化后直接返回
      if (!path) {
        callback(this.value);
      } else if (path instanceof Promise) {
        path.then((path) => {
          const pathValue = get(this.value, path());
          callback(pathValue);
        });
      } else {
        const pathValue = get(this.value, path);
        callback(pathValue);
      }
      return;
    }

    if (!this.subscriptions.has(callback)) {
      this.subscriptions.set(callback, {
        disposer: () => {
          this.subscriptions.delete(callback);
        },
        consumerHost,
        path,
      });
    }
    const { disposer } = this.subscriptions.get(callback)!;

    if (!path) {
      callback(this.value, disposer);
    } else if (path instanceof Promise) {
      path.then((path) => {
        const pathValue = get(this.value, path());
        callback(pathValue, disposer);
      });
    } else {
      const pathValue = get(this.value, path);
      callback(pathValue, disposer);
    }
  }

  clearCallbacks(): void {
    this.subscriptions.clear();
  }
}
