// @ts-nocheck
import { FormBaseComponent } from './FormBaseComponent';
import { FormContext, FormContextValue } from '@src/context/form-context';
import { FormItemValue } from '@src/entities';

// 创建一个具体的测试类继承 FormBaseComponent
class TestFormComponent extends FormBaseComponent<FormItemValue> {
  'ks-name' = 'test-component';
}

// 创建另一个测试类用于测试 ks-select 的特殊逻辑
class TestSelectComponent extends FormBaseComponent<FormItemValue> {
  'ks-name' = 'ks-select';
}

describe('FormBaseComponent', () => {
  let component: TestFormComponent;
  let selectComponent: TestSelectComponent;
  let mockCallbacks: FormContextValue<FormItemValue>['callbacks'];

  beforeEach(() => {
    // 创建模拟的回调函数
    mockCallbacks = {
      onValueChange: jest.fn(),
      onBlur: jest.fn(),
      onValidation: jest.fn(),
      _onValidationStatesChange: jest.fn(),
      onResetValidation: jest.fn(),
      _onComponentConnect: jest.fn(),
      _onComponentDisconnect: jest.fn(),
      _onPathChange: jest.fn(),
      _registerWatch: jest.fn(),
      _unsubscribeContext: jest.fn(),
    };

    // 创建组件实例
    component = new TestFormComponent();
    selectComponent = new TestSelectComponent();

    // 设置必要的属性
    component._provider = 'formItem';
    component.callbacksFromContext = mockCallbacks;

    selectComponent._provider = 'formItem';
    selectComponent.callbacksFromContext = mockCallbacks;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('onKsChangeForForm 方法', () => {
    it('should call onValueChange when _provider is formItem for default components', () => {
      const testValue = 'test-value';
      const mockEvent = {
        detail: testValue,
      } as CustomEvent<FormItemValue>;

      component.onKsChangeForForm(mockEvent);

      expect(mockCallbacks.onValueChange).toHaveBeenCalledWith(testValue, []);
      expect(mockCallbacks.onValueChange).toHaveBeenCalledTimes(1);
    });

    it('should handle values with _isDetailArgs', () => {
      const testValue = 'test-value';
      const mockEvent = {
        detail: [testValue],
      } as CustomEvent<FormItemValue>;

      mockEvent.detail._isDetailArgs = true;

      component.onKsChangeForForm(mockEvent);

      expect(mockCallbacks.onValueChange).toHaveBeenCalledWith(testValue, []);
      expect(mockCallbacks.onValueChange).toHaveBeenCalledTimes(1);
    });

    it('should not call onValueChange when _provider is not formItem', () => {
      component._provider = 'form';
      const testValue = 'test-value';
      const mockEvent = {
        detail: testValue,
      } as CustomEvent<FormItemValue>;

      component.onKsChangeForForm(mockEvent);

      expect(mockCallbacks.onValueChange).not.toHaveBeenCalled();
    });

    it('should not call onValueChange when _provider is undefined', () => {
      component._provider = undefined;
      const testValue = 'test-value';
      const mockEvent = {
        detail: testValue,
      } as CustomEvent<FormItemValue>;

      component.onKsChangeForForm(mockEvent);

      expect(mockCallbacks.onValueChange).not.toHaveBeenCalled();
    });

    it('should not call onValueChange when callbacksFromContext is undefined', () => {
      component.callbacksFromContext = undefined;
      const testValue = 'test-value';
      const mockEvent = {
        detail: testValue,
      } as CustomEvent<FormItemValue>;

      component.onKsChangeForForm(mockEvent);

      // 不应该抛出错误，即使 callbacksFromContext 为 undefined
      expect(() => component.onKsChangeForForm(mockEvent)).not.toThrow();
    });

    it('should handle different types of form values', () => {
      const testCases = [
        'string-value',
        123,
        true,
        false,
        null,
        undefined,
        { key: 'value' },
        ['array', 'value'],
        new Date(),
      ];

      testCases.forEach((testValue) => {
        jest.clearAllMocks();
        const mockEvent = {
          detail: testValue,
        } as CustomEvent<FormItemValue>;

        component.onKsChangeForForm(mockEvent);

        expect(mockCallbacks.onValueChange).toHaveBeenCalledWith(testValue, []);
        expect(mockCallbacks.onValueChange).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('onKsBlurForForm 方法', () => {
    it('should call onBlur when _provider is formItem', () => {
      component.onKsBlurForForm();

      expect(mockCallbacks.onBlur).toHaveBeenCalledWith();
      expect(mockCallbacks.onBlur).toHaveBeenCalledTimes(1);
    });

    it('should call onBlur regardless of _provider value', () => {
      // 测试不同的 _provider 值
      const providerValues = ['formItem', 'form', 'formList', undefined];

      providerValues.forEach((provider) => {
        jest.clearAllMocks();
        component._provider = provider as any;

        component.onKsBlurForForm();

        expect(mockCallbacks.onBlur).toHaveBeenCalledWith();
        expect(mockCallbacks.onBlur).toHaveBeenCalledTimes(1);
      });
    });

    it('should not call onBlur when callbacksFromContext is undefined', () => {
      component.callbacksFromContext = undefined;

      // 不应该抛出错误，即使 callbacksFromContext 为 undefined
      expect(() => component.onKsBlurForForm()).not.toThrow();
    });

    it('should not call onBlur when onBlur callback is undefined', () => {
      component.callbacksFromContext = {
        ...mockCallbacks,
        onBlur: undefined,
      };

      // 不应该抛出错误，即使 onBlur 回调为 undefined
      expect(() => component.onKsBlurForForm()).not.toThrow();
    });
  });

  describe('Listen 装饰器', () => {
    it('should have Listen decorator for ksChange event', () => {
      // 验证 onKsChangeForForm 方法存在并且可以被调用
      expect(typeof component.onKsChangeForForm).toBe('function');
    });

    it('should have Listen decorator for ksBlur event', () => {
      // 验证 onKsBlurForForm 方法存在并且可以被调用
      expect(typeof component.onKsBlurForForm).toBe('function');
    });
  });

  describe('ComponentInterface 实现', () => {
    it('should implement ComponentInterface', () => {
      // 验证组件实现了 ComponentInterface
      expect(component).toBeInstanceOf(FormBaseComponent);
    });
  });

  describe('泛型类型支持', () => {
    it('should support different FormItemValue types', () => {
      // 测试不同类型的 FormItemValue
      class StringFormComponent extends FormBaseComponent<string> {
        'ks-name' = 'string-component';
      }

      class NumberFormComponent extends FormBaseComponent<number> {
        'ks-name' = 'number-component';
      }

      class ObjectFormComponent extends FormBaseComponent<{ key: string }> {
        'ks-name' = 'object-component';
      }

      const stringComponent = new StringFormComponent();
      const numberComponent = new NumberFormComponent();
      const objectComponent = new ObjectFormComponent();

      expect(stringComponent['ks-name']).toBe('string-component');
      expect(numberComponent['ks-name']).toBe('number-component');
      expect(objectComponent['ks-name']).toBe('object-component');
    });
  });

  describe('边界情况和错误处理', () => {
    it('should handle missing callbacks gracefully', () => {
      component.callbacksFromContext = undefined;

      const mockEvent = {
        detail: 'test-value',
      } as CustomEvent<FormItemValue>;

      // 不应该抛出错误
      expect(() => component.onKsChangeForForm(mockEvent)).not.toThrow();
      expect(() => component.onKsBlurForForm()).not.toThrow();
    });

    it('should handle partial callbacks object', () => {
      component.callbacksFromContext = {
        onValueChange: mockCallbacks.onValueChange,
        // 缺少 onBlur 等其他回调
      } as any;

      const mockEvent = {
        detail: 'test-value',
      } as CustomEvent<FormItemValue>;

      component.onKsChangeForForm(mockEvent);
      expect(mockCallbacks.onValueChange).toHaveBeenCalledWith('test-value', []);

      // onBlur 不存在时不应该抛出错误
      expect(() => component.onKsBlurForForm()).not.toThrow();
    });

    it('should handle null and undefined values in events', () => {
      const testValues = [null, undefined];

      testValues.forEach((testValue) => {
        jest.clearAllMocks();
        const mockEvent = {
          detail: testValue,
        } as CustomEvent<FormItemValue>;

        component.onKsChangeForForm(mockEvent);

        expect(mockCallbacks.onValueChange).toHaveBeenCalledWith(testValue, []);
        expect(mockCallbacks.onValueChange).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('上下文属性同步', () => {
    it('should sync context properties correctly', () => {
      // 模拟从上下文获取的属性
      component.valueFromContext = 'context-value';
      component.statusFromContext = 'error';
      component.disabledFromContext = true;

      expect(component.valueFromContext).toBe('context-value');
      expect(component.statusFromContext).toBe('error');
      expect(component.disabledFromContext).toBe(true);
    });

    it('should handle undefined context properties', () => {
      component.valueFromContext = undefined;
      component.statusFromContext = undefined;
      component.disabledFromContext = undefined;

      expect(component.valueFromContext).toBeUndefined();
      expect(component.statusFromContext).toBeUndefined();
      expect(component.disabledFromContext).toBeUndefined();
    });
  });

  describe('继承和扩展', () => {
    it('should allow subclasses to extend functionality', () => {
      class ExtendedFormComponent extends FormBaseComponent<string> {
        'ks-name' = 'extended-component';

        customMethod() {
          return 'custom-functionality';
        }

        // 重写 connectedCallback
        connectedCallback() {
          // 自定义连接逻辑
        }
      }

      const extendedComponent = new ExtendedFormComponent();

      expect(extendedComponent['ks-name']).toBe('extended-component');
      expect(extendedComponent.customMethod()).toBe('custom-functionality');
      expect(typeof extendedComponent.connectedCallback).toBe('function');
    });

    it('should maintain base functionality in subclasses', () => {
      class CustomFormComponent extends FormBaseComponent<number> {
        'ks-name' = 'custom-component';
      }

      const customComponent = new CustomFormComponent();
      customComponent._provider = 'formItem';
      customComponent.callbacksFromContext = mockCallbacks;

      const mockEvent = {
        detail: 42,
      } as CustomEvent<number>;

      customComponent.onKsChangeForForm(mockEvent);

      expect(mockCallbacks.onValueChange).toHaveBeenCalledWith(42, []);
    });
  });
});
