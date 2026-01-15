import { scheduleLowPriorityTask } from '../scheduleLowPriorityTask';

// Mock global functions
const mockRequestIdleCallback = jest.fn();
const mockCancelIdleCallback = jest.fn();
const mockSetTimeout = jest.fn();
const mockClearTimeout = jest.fn();
const mockConsoleError = jest.fn();

describe('scheduleLowPriorityTask', () => {
  let originalRequestIdleCallback: any;
  let originalCancelIdleCallback: any;
  let originalSetTimeout: any;
  let originalClearTimeout: any;
  let originalConsoleError: any;

  beforeEach(() => {
    // Store original functions
    originalRequestIdleCallback = global.requestIdleCallback;
    originalCancelIdleCallback = global.cancelIdleCallback;
    originalSetTimeout = global.setTimeout;
    originalClearTimeout = global.clearTimeout;
    originalConsoleError = console.error;

    // Clear all mocks
    jest.clearAllMocks();

    // Mock console.error
    console.error = mockConsoleError;

    // Reset mock implementations
    mockRequestIdleCallback.mockImplementation((callback, options) => {
      // Use original setTimeout to avoid recursion
      originalSetTimeout(() => {
        callback({ didTimeout: false, timeRemaining: () => 50 });
      }, 0);
      return 123; // Mock callback ID
    });

    mockCancelIdleCallback.mockImplementation((id) => {
      // Mock cancel implementation
    });

    mockSetTimeout.mockImplementation((callback, delay) => {
      // Use original setTimeout to avoid recursion
      originalSetTimeout(() => {
        callback({ didTimeout: true, timeRemaining: () => 0 });
      }, delay || 0);
      return 456; // Mock timeout ID
    });

    mockClearTimeout.mockImplementation((id) => {
      // Mock clear implementation
    });
  });

  afterEach(() => {
    // Restore original functions
    global.requestIdleCallback = originalRequestIdleCallback;
    global.cancelIdleCallback = originalCancelIdleCallback;
    global.setTimeout = originalSetTimeout;
    global.clearTimeout = originalClearTimeout;
    console.error = originalConsoleError;
  });

  describe('when requestIdleCallback is supported', () => {
    beforeEach(() => {
      global.requestIdleCallback = mockRequestIdleCallback;
      global.cancelIdleCallback = mockCancelIdleCallback;
    });

    it('should use requestIdleCallback when available', async () => {
      const element = document.createElement('div');
      const callback = jest.fn();
      const options = { timeout: 1000 };

      scheduleLowPriorityTask(element, callback, options);

      expect(mockRequestIdleCallback).toHaveBeenCalledWith(expect.any(Function), options);
      expect(mockSetTimeout).not.toHaveBeenCalled();

      // Wait for async execution
      await new Promise((resolve) => originalSetTimeout(resolve, 10));
      expect(callback).toHaveBeenCalledWith({
        didTimeout: false,
        timeRemaining: expect.any(Function),
      });
    });

    it('should cancel previous callback when scheduling new one for same element', () => {
      const element = document.createElement('div');
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      // Schedule first callback
      scheduleLowPriorityTask(element, callback1);
      expect(mockRequestIdleCallback).toHaveBeenCalledTimes(1);

      // Schedule second callback for same element
      scheduleLowPriorityTask(element, callback2);
      expect(mockCancelIdleCallback).toHaveBeenCalledWith(123);
      expect(mockRequestIdleCallback).toHaveBeenCalledTimes(2);
    });

    it('should not cancel callback when scheduling for different elements', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('span');
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      scheduleLowPriorityTask(element1, callback1);
      scheduleLowPriorityTask(element2, callback2);

      expect(mockCancelIdleCallback).not.toHaveBeenCalled();
      expect(mockRequestIdleCallback).toHaveBeenCalledTimes(2);
    });

    it('should handle callback execution errors gracefully', async () => {
      const element = document.createElement('div');
      const error = new Error('Test error');
      const callback = jest.fn().mockImplementation(() => {
        throw error;
      });

      scheduleLowPriorityTask(element, callback);

      // Wait for async execution
      await new Promise((resolve) => originalSetTimeout(resolve, 10));

      expect(callback).toHaveBeenCalled();
      expect(mockConsoleError).toHaveBeenCalledWith('Error in scheduled low priority task:', error);
    });

    it('should clean up callback ID after execution', async () => {
      const element = document.createElement('div');
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      // Schedule and execute first callback
      scheduleLowPriorityTask(element, callback1);
      await new Promise((resolve) => originalSetTimeout(resolve, 10));

      // Schedule second callback - should not cancel anything
      scheduleLowPriorityTask(element, callback2);
      expect(mockCancelIdleCallback).not.toHaveBeenCalled();
    });

    it('should pass options to requestIdleCallback', () => {
      const element = document.createElement('div');
      const callback = jest.fn();
      const options = { timeout: 2000 };

      scheduleLowPriorityTask(element, callback, options);

      expect(mockRequestIdleCallback).toHaveBeenCalledWith(expect.any(Function), options);
    });

    it('should work without options', () => {
      const element = document.createElement('div');
      const callback = jest.fn();

      scheduleLowPriorityTask(element, callback);

      expect(mockRequestIdleCallback).toHaveBeenCalledWith(expect.any(Function), undefined);
    });
  });

  describe('when requestIdleCallback is not supported', () => {
    beforeEach(() => {
      global.requestIdleCallback = undefined as unknown as typeof global.requestIdleCallback;
      global.cancelIdleCallback = undefined as unknown as typeof global.cancelIdleCallback;
      global.setTimeout = mockSetTimeout as unknown as typeof global.setTimeout;
      global.clearTimeout = mockClearTimeout;
    });

    it('should fallback to setTimeout when requestIdleCallback is not available', async () => {
      const element = document.createElement('div');
      const callback = jest.fn();

      scheduleLowPriorityTask(element, callback);

      expect(mockSetTimeout).toHaveBeenCalledWith(expect.any(Function), 16);
      expect(mockRequestIdleCallback).not.toHaveBeenCalled();

      // Wait for async execution
      await new Promise((resolve) => originalSetTimeout(resolve, 20));
      expect(callback).toHaveBeenCalledWith({
        didTimeout: true,
        timeRemaining: expect.any(Function),
      });
    });

    it('should use clearTimeout to cancel previous callbacks', () => {
      const element = document.createElement('div');
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      // Schedule first callback
      scheduleLowPriorityTask(element, callback1);
      expect(mockSetTimeout).toHaveBeenCalledTimes(1);

      // Schedule second callback for same element
      scheduleLowPriorityTask(element, callback2);
      expect(mockClearTimeout).toHaveBeenCalledWith(456);
      expect(mockSetTimeout).toHaveBeenCalledTimes(2);
    });

    it('should handle errors in setTimeout fallback', async () => {
      const element = document.createElement('div');
      const error = new Error('Timeout error');
      const callback = jest.fn().mockImplementation(() => {
        throw error;
      });

      scheduleLowPriorityTask(element, callback);

      // Wait for async execution
      await new Promise((resolve) => originalSetTimeout(resolve, 20));

      expect(callback).toHaveBeenCalled();
      expect(mockConsoleError).toHaveBeenCalledWith('Error in scheduled low priority task:', error);
    });
  });

  describe('edge cases and browser compatibility', () => {
    it('should handle when requestIdleCallback exists but is not a function', () => {
      global.requestIdleCallback = 'not a function' as unknown as typeof global.requestIdleCallback;
      global.cancelIdleCallback = 'not a function' as unknown as typeof global.cancelIdleCallback;
      global.setTimeout = mockSetTimeout as unknown as typeof global.setTimeout;
      global.clearTimeout = mockClearTimeout;

      const element = document.createElement('div');
      const callback = jest.fn();

      scheduleLowPriorityTask(element, callback);

      expect(mockSetTimeout).toHaveBeenCalledWith(expect.any(Function), 16);
    });

    it('should handle multiple rapid scheduling for same element', () => {
      global.requestIdleCallback = mockRequestIdleCallback;
      global.cancelIdleCallback = mockCancelIdleCallback;

      const element = document.createElement('div');
      const callbacks = [jest.fn(), jest.fn(), jest.fn()];

      // Rapidly schedule multiple callbacks
      callbacks.forEach((callback) => {
        scheduleLowPriorityTask(element, callback);
      });

      // Should cancel previous callbacks
      expect(mockCancelIdleCallback).toHaveBeenCalledTimes(2);
      expect(mockRequestIdleCallback).toHaveBeenCalledTimes(3);
    });

    it('should handle element cleanup with WeakMap', () => {
      global.requestIdleCallback = mockRequestIdleCallback;
      global.cancelIdleCallback = mockCancelIdleCallback;

      let element: Element | null = document.createElement('div');
      const callback = jest.fn();

      scheduleLowPriorityTask(element, callback);

      // Simulate element being garbage collected
      element = null;

      // Force garbage collection (in real scenario)
      // The WeakMap should automatically clean up the reference

      const newElement = document.createElement('div');
      scheduleLowPriorityTask(newElement, callback);

      // Should not try to cancel anything for the new element
      expect(mockRequestIdleCallback).toHaveBeenCalledTimes(2);
    });

    it('should handle callback that modifies DOM', async () => {
      global.requestIdleCallback = mockRequestIdleCallback;

      const element = document.createElement('div');
      document.body.appendChild(element);

      const callback = jest.fn().mockImplementation(() => {
        element.textContent = 'Modified';
        element.style.color = 'red';
      });

      scheduleLowPriorityTask(element, callback);

      // Wait for async execution
      await new Promise((resolve) => originalSetTimeout(resolve, 10));

      expect(callback).toHaveBeenCalled();
      expect(element.textContent).toBe('Modified');
      expect(element.style.color).toBe('red');

      document.body.removeChild(element);
    });

    it('should handle scheduling with null/undefined callback', () => {
      global.requestIdleCallback = mockRequestIdleCallback;

      const element = document.createElement('div');

      expect(() => {
        scheduleLowPriorityTask(element, null as any);
      }).not.toThrow();

      expect(() => {
        scheduleLowPriorityTask(element, undefined as any);
      }).not.toThrow();
    });
  });

  describe('performance and memory considerations', () => {
    it('should not leak memory with many elements', () => {
      global.requestIdleCallback = mockRequestIdleCallback;

      const elements = Array.from({ length: 1000 }, () => document.createElement('div'));
      const callback = jest.fn();

      elements.forEach((element) => {
        scheduleLowPriorityTask(element, callback);
      });

      expect(mockRequestIdleCallback).toHaveBeenCalledTimes(1000);
    });

    it('should handle high frequency scheduling', () => {
      global.requestIdleCallback = mockRequestIdleCallback;
      global.cancelIdleCallback = mockCancelIdleCallback;

      const element = document.createElement('div');
      const callback = jest.fn();

      // Schedule 100 times rapidly
      for (let i = 0; i < 100; i++) {
        scheduleLowPriorityTask(element, callback);
      }

      // Should cancel 99 times and schedule 100 times
      expect(mockCancelIdleCallback).toHaveBeenCalledTimes(99);
      expect(mockRequestIdleCallback).toHaveBeenCalledTimes(100);
    });
  });

  describe('integration scenarios', () => {
    it('should work with real DOM elements', async () => {
      global.requestIdleCallback = mockRequestIdleCallback;

      const input = document.createElement('input');
      const div = document.createElement('div');
      const span = document.createElement('span');

      document.body.appendChild(input);
      document.body.appendChild(div);
      document.body.appendChild(span);

      const callbacks = [jest.fn(), jest.fn(), jest.fn()];

      scheduleLowPriorityTask(input, callbacks[0] as unknown as IdleRequestCallback);
      scheduleLowPriorityTask(div, callbacks[1] as unknown as IdleRequestCallback);
      scheduleLowPriorityTask(span, callbacks[2] as unknown as IdleRequestCallback);

      // Wait for async execution
      await new Promise((resolve) => originalSetTimeout(resolve, 10));

      callbacks.forEach((callback) => {
        expect(callback).toHaveBeenCalled();
      });

      document.body.removeChild(input);
      document.body.removeChild(div);
      document.body.removeChild(span);
    });

    it('should handle mixed support scenarios', () => {
      // Test scenario where requestIdleCallback is available but cancelIdleCallback is not
      global.requestIdleCallback = mockRequestIdleCallback;
      global.cancelIdleCallback = undefined as unknown as typeof global.cancelIdleCallback;
      global.clearTimeout = mockClearTimeout;

      const element = document.createElement('div');
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      scheduleLowPriorityTask(element, callback1);
      scheduleLowPriorityTask(element, callback2);

      // Should still work, using clearTimeout as fallback
      expect(mockClearTimeout).toHaveBeenCalledWith(123);
    });
  });

  describe('synchronous behavior tests', () => {
    it('should handle immediate callback execution', () => {
      // Mock requestIdleCallback to execute immediately
      const immediateCallback = jest.fn().mockImplementation((callback) => {
        callback({ didTimeout: false, timeRemaining: () => 50 });
        return 789;
      });

      global.requestIdleCallback = immediateCallback;
      global.cancelIdleCallback = mockCancelIdleCallback;

      const element = document.createElement('div');
      const callback = jest.fn();

      scheduleLowPriorityTask(element, callback);

      expect(callback).toHaveBeenCalledWith({
        didTimeout: false,
        timeRemaining: expect.any(Function),
      });
    });

    it('should handle immediate setTimeout execution', () => {
      // Mock setTimeout to execute immediately
      const immediateTimeout = jest.fn().mockImplementation((callback) => {
        callback({ didTimeout: true, timeRemaining: () => 0 });
        return 999;
      });

      global.requestIdleCallback = undefined as unknown as typeof global.requestIdleCallback;
      global.cancelIdleCallback = undefined as unknown as typeof global.cancelIdleCallback;
      global.setTimeout = immediateTimeout as unknown as typeof global.setTimeout;
      global.clearTimeout = mockClearTimeout;

      const element = document.createElement('div');
      const callback = jest.fn();

      scheduleLowPriorityTask(element, callback);

      expect(callback).toHaveBeenCalledWith({
        didTimeout: true,
        timeRemaining: expect.any(Function),
      });
    });
  });
});
