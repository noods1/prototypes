type ScheduleLowPriorityTask = (el: Element, callback: IdleRequestCallback, options?: IdleRequestOptions) => void;

/**
 * SAFATI 不支持 requestIdleCallback 时的回退方案。
 * @param callback 空闲回调函数，当浏览器空闲时执行。
 * @param options 可选的配置对象，用于定制 requestIdleCallback 的行为。
 * @returns 如果浏览器支持 requestIdleCallback，则返回 requestIdleCallback 的调用结果；否则返回 setTimeout 的调用结果。
 */
const safeRequestIdleCallback = (callback: IdleRequestCallback, options?: IdleRequestOptions) => {
  if (typeof requestIdleCallback === 'function') {
    return requestIdleCallback(callback, options);
  } else {
    return setTimeout(callback, 16);
  }
};

const safeCancelIdleCallback = (id: number) => {
  if (typeof cancelIdleCallback === 'function') {
    cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

/**
 * 创建一个防抖版的 requestIdleCallback。
 * @returns 一个函数，用于调度防抖的空闲回调。
 */
function createDebouncedIdleCallback(): ScheduleLowPriorityTask {
  const callbackIdMap = new WeakMap<Element, number>();

  /**
   * 调度一个防抖的空闲回调。
   * 如果已经有一个回调在等待执行，它将被取消，并用新的回调替换。
   * @param el - 要关联的元素，用于取消之前的回调。
   * @param callback - 当浏览器空闲时要执行的函数。
   * @param options - requestIdleCallback 的可选配置对象。
   */
  return function (el: Element, callback: IdleRequestCallback, options?: IdleRequestOptions): void {
    // 检查是否已有待执行的回调，如果有则取消
    const existingCallbackId = callbackIdMap.get(el);
    if (existingCallbackId !== undefined) {
      safeCancelIdleCallback(existingCallbackId);
      callbackIdMap.delete(el);
    }

    const idleCallbackId = safeRequestIdleCallback((deadline: IdleDeadline) => {
      callbackIdMap.delete(el);
      try {
        callback(deadline);
      } catch (error) {
        console.error('Error in scheduled low priority task:', error);
      }
    }, options);

    callbackIdMap.set(el, idleCallbackId);
  };
}

export const scheduleLowPriorityTask = createDebouncedIdleCallback();
