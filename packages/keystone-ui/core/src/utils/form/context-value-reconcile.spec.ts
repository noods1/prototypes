// @ts-nocheck
import { FormContextValueReconcile } from './FormContextValueReconcile';

describe('FormContextValueReconcile', () => {
  // 测试基本功能
  it('should create property descriptors correctly', () => {
    // 创建一个模拟的组件类
    const target = {};
    const propertyKey = 'testProperty';

    // 先定义一个原始的属性描述符
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      value: undefined,
      writable: true,
    });

    // 应用装饰器
    const decorator = FormContextValueReconcile();
    decorator(target, propertyKey);

    // 验证属性描述符是否被正确创建
    const valueDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const contextValueDescriptor = Object.getOwnPropertyDescriptor(target, `${propertyKey}FromContext`);

    expect(valueDescriptor).toBeDefined();
    expect(valueDescriptor.configurable).toBe(true);
    expect(valueDescriptor.enumerable).toBe(true);
    expect(typeof valueDescriptor.set).toBe('function');

    expect(contextValueDescriptor).toBeDefined();
    expect(contextValueDescriptor.configurable).toBe(true);
    expect(contextValueDescriptor.enumerable).toBe(true);
    expect(typeof contextValueDescriptor.set).toBe('function');
  });

  // 测试当 originalValueDescriptor 为空时直接返回
  it('should return early if originalValueDescriptor is undefined', () => {
    // 创建一个没有属性描述符的对象
    const target = {};
    const propertyKey = 'nonExistentProperty';

    // 应用装饰器
    const decorator = FormContextValueReconcile();
    decorator(target, propertyKey);

    // 验证没有创建新的属性描述符
    const valueDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    const contextValueDescriptor = Object.getOwnPropertyDescriptor(target, `${propertyKey}FromContext`);

    expect(valueDescriptor).toBeUndefined();
    expect(contextValueDescriptor).toBeUndefined();
  });

  // 测试自定义 contextKey
  it('should use custom contextKey if provided', () => {
    // 创建一个模拟的组件类
    const target = {};
    const propertyKey = 'testProperty';
    const customContextKey = 'customContextKey';

    // 先定义一个原始的属性描述符
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      value: undefined,
      writable: true,
    });

    // 应用装饰器，使用自定义 contextKey
    const decorator = FormContextValueReconcile({ contextKey: customContextKey });
    decorator(target, propertyKey);

    // 验证是否使用了自定义的 contextKey
    const contextValueDescriptor = Object.getOwnPropertyDescriptor(target, customContextKey);

    expect(contextValueDescriptor).toBeDefined();
    expect(contextValueDescriptor.configurable).toBe(true);
    expect(contextValueDescriptor.enumerable).toBe(true);
    expect(typeof contextValueDescriptor.set).toBe('function');
  });

  // 测试当原始值为 undefined 时，使用 contextValue 更新属性值
  it('should update property value when original value is undefined', () => {
    // 创建一个模拟的组件类
    const propertyKey = 'testProperty';
    const target = {
      _provider: 'formItem',
      [propertyKey]: undefined,
    };

    let value = undefined;

    // 先定义一个原始的属性描述符
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      set(newValue) {
        value = newValue;
      },
      get() {
        return value;
      },
    });

    // 应用装饰器
    const decorator = FormContextValueReconcile();
    decorator(target, propertyKey);

    // 调用 contextValue 的 set 方法
    target[`${propertyKey}FromContext`] = 'context-value';

    // 验证原始的 set 方法是否被调用
    expect(target[propertyKey]).toBe('context-value');
  });

  // 测试当原始值不为 undefined 时，不使用 contextValue 更新属性值
  it('should not update property value when original value is not undefined', () => {
    // 创建一个模拟的组件类
    const propertyKey = 'testProperty';
    const target = {
      _provider: 'formItem',
      [propertyKey]: undefined,
    };

    let value = undefined;

    // 先定义一个原始的属性描述符
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      set(newValue) {
        value = newValue;
      },
      get() {
        return value;
      },
    });

    // 应用装饰器
    const decorator = FormContextValueReconcile();
    decorator(target, propertyKey);

    // 先模拟受控组件用户为 propertyKey 赋值
    target[propertyKey] = 'some value';

    // 调用 contextValue 的 set 方法
    target[`${propertyKey}FromContext`] = 'context-value';

    // 验证原始的 set 方法是否没有被调用，propertyKey 的值保持为 'some value'
    expect(target[propertyKey]).toBe('some value');
  });

  // 测试当 _provider 不是 'formItem' 时，不使用 contextValue 更新属性值
  it('should not update property value when _provider is not formItem', () => {
    // 创建一个模拟的组件类，_provider 为 'form'
    const propertyKey = 'testProperty';
    const target = {
      _provider: 'form',
      [propertyKey]: undefined,
    };

    let value = undefined;

    // 先定义一个原始的属性描述符
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      set(newValue) {
        value = newValue;
      },
      get() {
        return value;
      },
    });

    // 应用装饰器
    const decorator = FormContextValueReconcile();
    decorator(target, propertyKey);

    // 调用 contextValue 的 set 方法
    target[`${propertyKey}FromContext`] = 'context-value';

    // 验证原始的 set 方法是否没有被调用，propertyKey 的值保持为 undefined
    expect(target[propertyKey]).toBe(undefined);
  });
});
