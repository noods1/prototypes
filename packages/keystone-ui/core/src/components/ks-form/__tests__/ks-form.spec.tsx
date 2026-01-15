// @ts-nocheck
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsForm } from '../index';

// 创建一个模拟的FormItem组件
class MockFormItem extends HTMLElement {
  initialValue = undefined;
  validateTrigger = 'change';
  _collectRules = () => [];
  ['ks-name'] = 'ks-form-item';
}

// 创建一个模拟的FormList组件
class MockFormList extends HTMLElement {
  initialValue = undefined;
  validateTrigger = 'change';
  _collectRules = () => [];
  ['ks-name'] = 'ks-form-list';
}

// 注册模拟组件
customElements.define('mock-form-item', MockFormItem);
customElements.define('mock-form-list', MockFormList);

describe('ks-form component', () => {
  describe('Basic Rendering and Properties', () => {
    it('should render with default values', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form></ks-form>,
      });

      expect(page.root).toBeTruthy();
      expect(page.root.shadowRoot?.querySelector('.form')).toBeTruthy();
    });

    it('should render with labelWidth and labelAlign props', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form labelWidth={120} labelAlign="right"></ks-form>,
      });

      expect(page.root.labelWidth).toBe(120);
      expect(page.root.labelAlign).toBe('right');
    });

    it('should render with initialValues', async () => {
      const initialValues = { username: 'test', email: 'test@example.com' };
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={initialValues}></ks-form>,
      });

      expect(page.root.initialValues).toEqual(initialValues);
      expect(page.root.getFieldsValue()).resolves.toEqual(initialValues);
    });

    it('should test watchContextPropsChange', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form disabled={true} initialValues={{ username: 'test' }}></ks-form>,
      });

      page.root.disabled = false;
      await page.waitForChanges();

      expect(page.rootInstance.context.disabled).toBe(false);
    });
  });

  describe('Form Value Management', () => {
    it('should update form values with setFieldsValue', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form></ks-form>,
      });

      const newValues = { username: 'updated', email: 'updated@example.com' };
      await page.root.setFieldsValue(newValues);
      await page.waitForChanges();

      expect(page.root.getFieldsValue()).resolves.toEqual(newValues);
    });

    it('should get fields value on path', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form></ks-form>,
      });

      const newValues = { username: 'updated', email: 'updated@example.com' };
      await page.root.setFieldsValue(newValues);
      await page.waitForChanges();

      expect(page.root.getFieldsValue(['username'])).resolves.toEqual(['updated']);
    });

    it('should update single field value with setFieldValue', async () => {
      const initialValues = { username: 'test', email: 'test@example.com' };
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={initialValues}></ks-form>,
      });

      await page.root.setFieldValue('username', 'updated');
      await page.waitForChanges();

      expect(page.root.getFieldValue('username')).resolves.toBe('updated');
      expect(page.root.getFieldValue('email')).resolves.toBe('test@example.com');
    });

    it('should reset fields to initial values', async () => {
      const initialValues = { username: 'test', email: 'test@example.com' };
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={initialValues}></ks-form>,
      });

      await page.root.setFieldsValue({ username: 'updated', email: 'updated@example.com' });
      await page.waitForChanges();

      await page.root.resetFields();
      await page.waitForChanges();

      expect(page.root.getFieldsValue()).resolves.toEqual(initialValues);
    });

    it('should reset specific fields when fields array is provided (lines 647-655)', async () => {
      const initialValues = { username: 'test', email: 'test@example.com', phone: '123456' };
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={initialValues}></ks-form>,
      });

      // 创建模拟的FormItem实例并设置到instanceMap
      const mockFormItemUsername = new MockFormItem();
      mockFormItemUsername.initialValue = 'test';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItemUsername, ['username']);

      const mockFormItemEmail = new MockFormItem();
      mockFormItemEmail.initialValue = 'test@example.com';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItemEmail, ['email']);

      const mockFormItemPhone = new MockFormItem();
      mockFormItemPhone.initialValue = '123456';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItemPhone, ['phone']);

      await page.waitForChanges();

      // 设置新的值
      await page.root.setFieldsValue({ username: 'updated', email: 'updated@example.com', phone: 'updated-phone' });
      await page.waitForChanges();

      // 模拟 resetValidate 方法
      const resetValidateSpy = jest.spyOn(page.rootInstance, 'resetValidate');

      // 只重置特定字段 - 这将触发第647-655行的代码
      await page.root.resetFields(['username', 'email']);
      await page.waitForChanges();

      // 验证只有指定的字段被重置
      const currentValues = await page.root.getFieldsValue();
      expect(currentValues.username).toBe('test');
      expect(currentValues.email).toBe('test@example.com');
      expect(currentValues.phone).toBe('updated-phone'); // 这个字段不应该被重置

      // 验证 resetValidate 被调用了正确的次数（每个字段一次）
      expect(resetValidateSpy).toHaveBeenCalledTimes(2);
      expect(resetValidateSpy).toHaveBeenCalledWith('username');
      expect(resetValidateSpy).toHaveBeenCalledWith('email');

      resetValidateSpy.mockRestore();
    });

    it('should reset nested field paths when fields array contains nested paths (lines 647-655)', async () => {
      const initialValues = {
        user: {
          profile: { name: 'test', age: 25 },
          settings: { theme: 'dark' },
        },
        other: 'value',
      };
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={initialValues}></ks-form>,
      });

      // 创建模拟的FormItem实例并设置到instanceMap
      const mockFormItemName = new MockFormItem();
      mockFormItemName.initialValue = 'test';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItemName, ['user', 'profile', 'name']);

      const mockFormItemAge = new MockFormItem();
      mockFormItemAge.initialValue = 25;
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItemAge, ['user', 'profile', 'age']);

      const mockFormItemSettings = new MockFormItem();
      mockFormItemSettings.initialValue = { theme: 'dark' };
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItemSettings, ['user', 'settings']);

      const mockFormItemOther = new MockFormItem();
      mockFormItemOther.initialValue = 'value';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItemOther, ['other']);

      await page.waitForChanges();

      // 设置新的值
      await page.root.setFieldsValue({
        user: {
          profile: { name: 'updated', age: 30 },
          settings: { theme: 'light' },
        },
        other: 'updated-value',
      });
      await page.waitForChanges();

      const resetValidateSpy = jest.spyOn(page.rootInstance, 'resetValidate');

      // 重置嵌套字段路径 - 这将触发第647-655行的代码
      await page.root.resetFields([
        ['user', 'profile', 'name'],
        ['user', 'settings'],
      ]);
      await page.waitForChanges();

      const currentValues = await page.root.getFieldsValue();

      // 验证指定的嵌套字段被重置
      expect(currentValues.user.profile.name).toBe('test');
      expect(currentValues.user.settings.theme).toBe('dark');

      // 验证未指定的字段保持更新后的值
      expect(currentValues.user.profile.age).toBe(30);
      expect(currentValues.other).toBe('updated-value');

      // 验证 resetValidate 被调用了正确的次数
      expect(resetValidateSpy).toHaveBeenCalledTimes(2);
      expect(resetValidateSpy).toHaveBeenCalledWith(['user', 'profile', 'name']);
      expect(resetValidateSpy).toHaveBeenCalledWith(['user', 'settings']);

      resetValidateSpy.mockRestore();
    });

    it('should handle immutableSet correctly when resetting fields (lines 647-655)', async () => {
      const initialValues = { field1: 'initial1', field2: 'initial2', field3: 'initial3' };
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={initialValues}></ks-form>,
      });

      // 创建模拟的FormItem实例并设置到instanceMap
      const mockFormItem1 = new MockFormItem();
      mockFormItem1.initialValue = 'initial1';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem1, ['field1']);

      const mockFormItem2 = new MockFormItem();
      mockFormItem2.initialValue = 'initial2';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem2, ['field2']);

      const mockFormItem3 = new MockFormItem();
      mockFormItem3.initialValue = 'initial3';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem3, ['field3']);

      await page.waitForChanges();

      // 设置新的值
      await page.root.setFieldsValue({ field1: 'updated1', field2: 'updated2', field3: 'updated3' });
      await page.waitForChanges();

      // 监听 context 变化
      const originalContext = page.rootInstance.context;

      // 重置部分字段 - 这将触发第647-655行的代码中的 immutableSet 逻辑
      await page.root.resetFields(['field1', 'field3']);
      await page.waitForChanges();

      // 验证 context 被正确更新
      expect(page.rootInstance.context).not.toBe(originalContext); // 应该是新的对象
      expect(page.rootInstance.context.value.field1).toBe('initial1');
      expect(page.rootInstance.context.value.field2).toBe('updated2'); // 未重置
      expect(page.rootInstance.context.value.field3).toBe('initial3');
    });
  });

  describe('Event Handling', () => {
    it('should emit ksValueChange event when form values change', async () => {
      const valueChangeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form onKsValueChange={valueChangeSpy}></ks-form>,
      });

      const newValues = { username: 'test' };
      await page.root.setFieldsValue(newValues);
      await page.waitForChanges();

      expect(valueChangeSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: newValues }));
    });

    it('should register and notify watchers for field changes', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form></ks-form>,
      });

      // 等待组件初始化完成
      await page.waitForChanges();

      const watchCallback = jest.fn();
      const path = 'username';

      // 确保 context 和 callbacks 已初始化
      if (page.rootInstance && page.rootInstance.context && page.rootInstance.context.callbacks) {
        // 通过暴露的context.callbacks._registerWatch注册watcher
        const unregister = page.rootInstance.context.callbacks._registerWatch(path, watchCallback);
        expect(watchCallback).toHaveBeenCalledWith(undefined);
        expect(watchCallback).toHaveBeenCalledTimes(1);

        await page.root.setFieldValue('username', 'test');
        await page.waitForChanges();

        expect(watchCallback).toHaveBeenCalledWith('test');

        // 测试取消注册
        unregister();
        await page.root.setFieldValue('username', 'updated');
        await page.waitForChanges();

        // 应该仍然只被多调用一次
        expect(watchCallback).toHaveBeenCalledTimes(2);
      }
    });
  });

  describe('Form Submission', () => {
    it('should handle form submission with submit method', async () => {
      const finishSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsForm],
        template: () => (
          <ks-form onKsFinish={finishSpy} initialValues={{ username: 'test', list: [{ item: 'test' }] }}></ks-form>
        ),
      });
      await page.waitForChanges();
      expect(page.root).toBeTruthy();

      const mockFormItem = new MockFormItem();
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);

      const mockFormList = new MockFormList();
      page.rootInstance.context.callbacks._onComponentConnect(mockFormList, ['list']);

      await page.rootInstance.submit();
      await page.waitForChanges();

      expect(finishSpy).toHaveBeenCalledWith(
        expect.objectContaining({ detail: { username: 'test', list: [{ item: 'test' }] } }),
      );
    });

    it('should throw error when submit validation fails', async () => {
      const finishFailSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form onKsFinishFailed={finishFailSpy} initialValues={{ username: 'test' }}></ks-form>,
      });

      const mockFormItem = new MockFormItem();
      mockFormItem['_collectRules'] = () => [{ validator: () => Promise.reject('test error') }];
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);
      await page.waitForChanges();

      await page.rootInstance.submit();
      await page.waitForChanges();

      expect(finishFailSpy).toHaveBeenCalled();
    });

    it('should not throw error when submit validation only throw warning', async () => {
      const finishFailSpy = jest.fn();
      const finishSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsForm],
        template: () => (
          <ks-form
            onKsFinishFailed={finishFailSpy}
            onKsFinish={finishSpy}
            initialValues={{ username: 'test' }}
          ></ks-form>
        ),
      });

      const mockFormItem = new MockFormItem();
      mockFormItem['_collectRules'] = () => [{ validator: () => Promise.reject('test error'), warningOnly: true }];
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);
      await page.waitForChanges();

      await page.rootInstance.submit();
      await page.waitForChanges();

      expect(finishFailSpy).not.toHaveBeenCalled();
      expect(finishSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: { username: 'test' } }));
    });
  });

  describe('Component Lifecycle Management', () => {
    it('should handle component connection and disconnection', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form></ks-form>,
      });

      // 创建模拟的FormItem实例
      const mockFormItem = new MockFormItem();
      mockFormItem.initialValue = 'test';

      // 模拟组件连接
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);
      await page.waitForChanges();

      // 验证实例是否被正确注册
      expect(page.rootInstance.getFieldInstance('username')).resolves.toBe(mockFormItem);

      // 模拟组件断开连接
      page.rootInstance.context.callbacks._onComponentDisconnect(mockFormItem, ['username']);
      await page.waitForChanges();

      // 验证实例是否被正确移除
      expect(page.root.getFieldInstance('username')).resolves.toBeUndefined();
    });

    it('should test _onPathChange', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form validateTrigger="blur" initialValues={{ username: 'test' }}></ks-form>,
      });

      const mockFormItem = new MockFormItem();
      mockFormItem.validateTrigger = 'blur';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);
      await page.waitForChanges();

      const mockFormItem2 = new MockFormItem();
      mockFormItem2.validateTrigger = 'blur';
      mockFormItem2['name'] = 'NAME_FOR_TEST';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem2, ['username2']);
      await page.waitForChanges();

      page.rootInstance.context.callbacks._onPathChange(mockFormItem2, ['username2'], ['username']);
      await page.waitForChanges();

      const n = (await page.rootInstance.getFieldInstance('username'))['name'];
      expect(n).toBe('NAME_FOR_TEST');
    });
  });

  describe('Form Validation', () => {
    it('should call validation on blur when validateTrigger is blur', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form validateTrigger="blur" initialValues={{ username: 'test' }}></ks-form>,
      });

      const mockFormItem = new MockFormItem();
      mockFormItem.validateTrigger = 'blur';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);
      await page.waitForChanges();

      const validator = jest.fn();
      mockFormItem['_collectRules'] = () => [{ validator }];
      page.rootInstance.context.callbacks.onBlur(['username']);
      await page.waitForChanges();

      expect(validator).toHaveBeenCalled();
    });

    it('should set validationStates to error when validation fails', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form validateTrigger="blur" initialValues={{ username: 'test' }}></ks-form>,
      });

      const mockFormItem = new MockFormItem();
      mockFormItem.validateTrigger = 'blur';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);
      await page.waitForChanges();

      const validator = jest.fn().mockRejectedValue('test error');
      mockFormItem['_collectRules'] = () => [{ validator }];
      page.rootInstance.context.callbacks.onValidation(['username']);
      await page.waitForChanges();

      expect(page.rootInstance.context.validationStates.username['__status__'][0].status).toBe('error');
    });

    it('should test _onValidationStatesChange', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form validateTrigger="blur" initialValues={{ username: 'test' }}></ks-form>,
      });

      page.rootInstance.context.callbacks._onValidationStatesChange({
        username: { __status__: [{ status: 'error' }] },
      });

      expect(page.rootInstance.context.validationStates.username['__status__'][0].status).toBe('error');
    });

    it('should call resetValidate with arg path when on reset validation', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form validateTrigger="blur" initialValues={{ username: 'test' }}></ks-form>,
      });

      const resetValidate = jest.fn();
      page.rootInstance.resetValidate = resetValidate;

      page.rootInstance.context.callbacks.onResetValidation(['username']);

      expect(resetValidate).toHaveBeenCalledWith(['username']);
    });
  });

  describe('Error Handling and Status Retrieval', () => {
    it('should set validationStates to error when validation fails', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form validateTrigger="blur" initialValues={{ username: 'test' }}></ks-form>,
      });

      const mockFormItem = new MockFormItem();
      mockFormItem.validateTrigger = 'blur';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);
      await page.waitForChanges();

      const validator = jest.fn().mockRejectedValue('test error');
      mockFormItem['_collectRules'] = () => [{ validator }];
      page.rootInstance.context.callbacks.onValidation(['username']);
      await page.waitForChanges();

      const status = await page.rootInstance.getFieldsError(['username']);
      expect(status).toEqual([
        {
          name: ['username'],
          errors: ['test error'],
        },
      ]);
    });

    it('should set validationStates to error when validation fails', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form validateTrigger="blur" initialValues={{ username: 'test' }}></ks-form>,
      });

      const mockFormItem = new MockFormItem();
      mockFormItem.validateTrigger = 'blur';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);
      await page.waitForChanges();

      const validator = jest.fn().mockRejectedValue('test error');
      mockFormItem['_collectRules'] = () => [{ validator }];
      page.rootInstance.context.callbacks.onValidation(['username']);
      await page.waitForChanges();

      const status = await page.rootInstance.getFieldError('username');
      expect(status).toEqual(['test error']);
    });

    it('should return 2 messages when there are 2 errors', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form validateTrigger="blur" initialValues={{ username: 'test' }}></ks-form>,
      });

      const mockFormItem = new MockFormItem();
      mockFormItem.validateTrigger = 'blur';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);
      await page.waitForChanges();

      const validator1 = jest.fn().mockRejectedValue('test error1');
      const validator2 = jest.fn().mockRejectedValue('test error2');
      mockFormItem['_collectRules'] = () => [{ validator: validator1 }, { validator: validator2 }];
      page.rootInstance.context.callbacks.onValidation(['username']);
      await page.waitForChanges();

      const status = await page.rootInstance.getFieldError('username');
      expect(status).toEqual(['test error1', 'test error2']);
    });

    it('should not return warning messages', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form validateTrigger="blur" initialValues={{ username: 'test' }}></ks-form>,
      });

      const mockFormItem = new MockFormItem();
      mockFormItem.validateTrigger = 'blur';
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);
      await page.waitForChanges();

      const validator1 = jest.fn().mockRejectedValue('test error1');
      const validator2 = jest.fn().mockRejectedValue('test error2');
      mockFormItem['_collectRules'] = () => [{ validator: validator1 }, { validator: validator2, warningOnly: true }];
      page.rootInstance.context.callbacks.onValidation(['username']);
      await page.waitForChanges();

      const status = await page.rootInstance.getFieldError('username');
      expect(status).toEqual(['test error1']);
    });
  });

  describe('Scrolling and Navigation', () => {
    it('should call scroll to view on instance when calling scroll into field', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form validateTrigger="blur" initialValues={{ username: 'test' }}></ks-form>,
      });

      const mockFormItem = new MockFormItem();
      mockFormItem.validateTrigger = 'blur';
      mockFormItem.scrollIntoView = jest.fn();
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);
      await page.waitForChanges();

      await page.rootInstance.scrollToField('username');
      expect(mockFormItem.scrollIntoView).toHaveBeenCalled();
    });

    it('should scroll to first error field when calling scrollToFirstError', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form></ks-form>,
      });

      // Mock form elements with error status
      const mockErrorElement = {
        'ks-name': 'ks-form-item',
        _validateStatus: 'error',
        scrollIntoView: jest.fn(),
      };
      const mockValidElement = {
        'ks-name': 'ks-form-item',
        _validateStatus: 'valid',
        scrollIntoView: jest.fn(),
      };

      // Mock querySelectorAll to return our mock elements
      page.rootInstance.el.querySelectorAll = jest.fn().mockReturnValue([mockValidElement, mockErrorElement]);

      await page.rootInstance.scrollToFirstError();

      expect(mockErrorElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
      expect(mockValidElement.scrollIntoView).not.toHaveBeenCalled();
    });
  });

  describe('Validation Reset Functionality', () => {
    it('should only set validation states on path when reset validate is called on path', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={{ username: 'test' }}></ks-form>,
      });

      const mockFormItem1 = new MockFormItem();
      const mockFormItem2 = new MockFormItem();

      // Connect two form items with different paths
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem1, ['username']);
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem2, ['email']);
      await page.waitForChanges();

      // Set error states for both fields
      const validator = jest.fn().mockRejectedValue('test error');
      mockFormItem1['_collectRules'] = () => [{ validator }];
      mockFormItem2['_collectRules'] = () => [{ validator }];

      await page.rootInstance.context.callbacks.onValidation(['username']);
      await page.rootInstance.context.callbacks.onValidation(['email']);
      await page.waitForChanges();

      // Verify both fields have error states initially
      expect(page.rootInstance.context.validationStates.username['__status__'][0].status).toBe('error');
      expect(page.rootInstance.context.validationStates.email['__status__'][0].status).toBe('error');

      // Reset validation only for username path
      await page.rootInstance.resetValidate(['username']);
      await page.waitForChanges();

      // Verify only username's validation was reset
      expect(page.rootInstance.context.validationStates.username['__status__']).toBe(null);
      expect(page.rootInstance.context.validationStates.email['__status__'][0].status).toBe('error');
    });

    it('should reset all fields when called without argument', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={{ username: 'test' }}></ks-form>,
      });

      const mockFormItem1 = new MockFormItem();
      const mockFormItem2 = new MockFormItem();

      // Connect two form items with different paths
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem1, ['username']);
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem2, ['email']);
      await page.waitForChanges();

      // Set error states for both fields
      const validator = jest.fn().mockRejectedValue('test error');
      mockFormItem1['_collectRules'] = () => [{ validator }];
      mockFormItem2['_collectRules'] = () => [{ validator }];

      await page.rootInstance.context.callbacks.onValidation(['username']);
      await page.rootInstance.context.callbacks.onValidation(['email']);
      await page.waitForChanges();

      // Verify both fields have error states initially
      expect(page.rootInstance.context.validationStates.username['__status__'][0].status).toBe('error');
      expect(page.rootInstance.context.validationStates.email['__status__'][0].status).toBe('error');

      // Reset validation only for username path
      await page.rootInstance.resetValidate();
      await page.waitForChanges();

      // Verify only username's validation was reset
      expect(page.rootInstance.context.validationStates.username?.['__status__']).toBeFalsy();
      expect(page.rootInstance.context.validationStates.email?.['__status__']).toBeFalsy();
    });

    it('should create array validation state for FormList when resetValidate is called on non-existing validation state', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={{ list: [{ item: 'test1' }, { item: 'test2' }] }}></ks-form>,
      });

      // 创建一个模拟的FormList实例
      const mockFormList = new MockFormList();

      // 连接FormList到表单，但不设置任何验证状态
      page.rootInstance.context.callbacks._onComponentConnect(mockFormList, ['list']);
      await page.waitForChanges();

      // 验证初始状态：FormList路径上没有验证状态
      expect(page.rootInstance.context.validationStates.list).toBeUndefined();

      // 调用resetValidate方法，这会触发第655-657行的逻辑
      await page.rootInstance.resetValidate(['list']);
      await page.waitForChanges();

      // 验证结果：
      // 1. 验证状态应该是一个数组（因为是FormList）
      expect(Array.isArray(page.rootInstance.context.validationStates.list)).toBe(true);

      // 2. 数组应该有STATUS_KEY属性，值为null
      expect(page.rootInstance.context.validationStates.list['__status__']).toBe(null);

      // 3. 验证immutableSet被正确调用，创建了新的验证状态对象
      expect(page.rootInstance.context.validationStates).toHaveProperty('list');
    });

    it('should handle resetValidate for FormList with existing validation state', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={{ list: [{ item: 'test1' }] }}></ks-form>,
      });

      const mockFormList = new MockFormList();
      page.rootInstance.context.callbacks._onComponentConnect(mockFormList, ['list']);
      await page.waitForChanges();

      // 先设置一个错误状态
      const validator = jest.fn().mockRejectedValue('test error');
      mockFormList['_collectRules'] = () => [{ validator }];
      await page.rootInstance.context.callbacks.onValidation(['list']);
      await page.waitForChanges();

      // 验证有错误状态
      expect(page.rootInstance.context.validationStates.list['__status__'][0].status).toBe('error');

      // 调用resetValidate - 这次不会进入第655-657行的if分支
      await page.rootInstance.resetValidate(['list']);
      await page.waitForChanges();

      // 验证状态被重置为null
      expect(page.rootInstance.context.validationStates.list['__status__']).toBe(null);
    });

    it('should not create array validation state for non-FormList components', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={{ username: 'test' }}></ks-form>,
      });

      // 创建一个模拟的FormItem实例（不是FormList）
      const mockFormItem = new MockFormItem();
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);
      await page.waitForChanges();

      // 调用resetValidate - 不应该进入第655-657行的if分支
      await page.rootInstance.resetValidate(['username']);
      await page.waitForChanges();

      // 验证状态应该是普通对象，不是数组
      expect(Array.isArray(page.rootInstance.context.validationStates.username)).toBe(false);
      expect(page.rootInstance.context.validationStates.username['__status__']).toBe(null);
    });
  });

  describe('Field Validation Functionality', () => {
    it('should set success status for FormItem when validation passes', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={{ username: 'test' }}></ks-form>,
      });

      const mockFormItem = new MockFormItem();
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['username']);
      await page.waitForChanges();

      const validator = jest.fn().mockResolvedValue(true);
      mockFormItem['_collectRules'] = () => [{ validator }];

      await page.rootInstance.validateField('username');
      await page.waitForChanges();

      expect(page.rootInstance.context.validationStates.username['__status__'][0].status).toBe('success');
    });

    it('should set success status for FormList when validation passes', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={{ list: [{ item: 'test' }] }}></ks-form>,
      });

      const mockFormList = new MockFormList();
      page.rootInstance.context.callbacks._onComponentConnect(mockFormList, ['list']);
      await page.waitForChanges();

      const validator = jest.fn().mockResolvedValue(true);
      mockFormList['_collectRules'] = () => [{ validator }];

      await page.rootInstance.validateField(['list']);
      await page.waitForChanges();

      expect(Array.isArray(page.rootInstance.context.validationStates.list)).toBe(true);
      expect(page.rootInstance.context.validationStates.list['__status__'][0].status).toBe('success');
    });

    it('should return form values when validation passes', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={{ username: 'test', email: 'test@example.com' }}></ks-form>,
      });

      const mockFormItem1 = new MockFormItem();
      const mockFormItem2 = new MockFormItem();
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem1, ['username']);
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem2, ['email']);
      await page.waitForChanges();

      // 模拟验证通过的情况
      const validator = jest.fn().mockResolvedValue(true);
      mockFormItem1['_collectRules'] = () => [{ validator }];
      mockFormItem2['_collectRules'] = () => [{ validator }];

      const result = await page.rootInstance.validateFields();
      await page.waitForChanges();

      expect(result).toEqual({ username: 'test', email: 'test@example.com' });
    });

    it('should handle nested path validation status correctly', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={{ user: { name: 'test', email: 'test@example.com' } }}></ks-form>,
      });

      const mockFormItem = new MockFormItem();
      page.rootInstance.context.callbacks._onComponentConnect(mockFormItem, ['user', 'name']);
      await page.waitForChanges();

      const validator = jest.fn().mockResolvedValue(true);
      mockFormItem['_collectRules'] = () => [{ validator }];

      await page.rootInstance.validateField(['user', 'name']);
      await page.waitForChanges();

      expect(page.rootInstance.context.validationStates.user.name['__status__'][0].status).toBe('success');
    });

    it('should throw error when list validation fails', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={{ list: [{ item: 'test' }] }}></ks-form>,
      });

      const mockFormList = new MockFormList();
      page.rootInstance.context.callbacks._onComponentConnect(mockFormList, ['list']);
      await page.waitForChanges();

      const validator = jest.fn().mockRejectedValue('test error');
      mockFormList['_collectRules'] = () => [{ validator }];

      await expect(page.rootInstance.validateField(['list'])).rejects.toEqual(
        expect.objectContaining({
          errorFields: expect.arrayContaining([
            expect.objectContaining({
              name: 'list',
              errors: ['test error'],
              warnings: [],
            }),
          ]),
          values: [{ item: 'test' }],
        }),
      );
    });

    it('should throw error when list validation fails nested list', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={{ item: { list: [{ item: 'test' }] } }}></ks-form>,
      });

      const mockFormList = new MockFormList();
      page.rootInstance.context.callbacks._onComponentConnect(mockFormList, ['item', 'list']);
      await page.waitForChanges();

      const validator = jest.fn().mockRejectedValue('test error');
      mockFormList['_collectRules'] = () => [{ validator }];

      await expect(page.rootInstance.validateField('item', { recursive: true })).rejects.toEqual(
        expect.objectContaining({
          errorFields: expect.arrayContaining([
            expect.objectContaining({
              name: 'item.list',
              errors: ['test error'],
              warnings: [],
            }),
          ]),
          values: { list: [{ item: 'test' }] },
        }),
      );
    });

    it('should return value when validation only throws warnings', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={{ item: { list: [{ item: 'test' }] } }}></ks-form>,
      });

      const mockFormList = new MockFormList();
      page.rootInstance.context.callbacks._onComponentConnect(mockFormList, ['item', 'list']);
      await page.waitForChanges();

      const validator = jest.fn().mockRejectedValue('test error');
      mockFormList['_collectRules'] = () => [{ validator, warningOnly: true }];

      const value = await page.rootInstance.validateField('item');
      expect(value).toEqual({ list: [{ item: 'test' }] });
    });
  });

  describe('watchInitialValuesFromInstanceChange', () => {
    it('should call _resetFields when _onValueChangeAlreadyCalled is false', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form></ks-form>,
      });

      const form = page.rootInstance;
      const resetFieldsSpy = jest.spyOn(form, '_resetFields');

      // 确保 _onValueChangeAlreadyCalled 为 false
      form._onValueChangeAlreadyCalled = false;

      // 触发 _initialValuesFromInstance 变化
      form._initialValuesFromInstance = { field1: 'new value' };
      await page.waitForChanges();

      expect(resetFieldsSpy).toHaveBeenCalled();
      resetFieldsSpy.mockRestore();
    });

    it('should not call _resetFields when _onValueChangeAlreadyCalled is true', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form></ks-form>,
      });

      const form = page.rootInstance;
      const resetFieldsSpy = jest.spyOn(form, '_resetFields');

      // 设置 _onValueChangeAlreadyCalled 为 true
      form._onValueChangeAlreadyCalled = true;

      // 触发 _initialValuesFromInstance 变化
      form._initialValuesFromInstance = { field1: 'new value' };
      await page.waitForChanges();

      expect(resetFieldsSpy).not.toHaveBeenCalled();
      resetFieldsSpy.mockRestore();
    });

    it('should reset _onValueChangeAlreadyCalled to false after calling _resetFields', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form></ks-form>,
      });

      const form = page.rootInstance;

      // 确保 _onValueChangeAlreadyCalled 为 false
      form._onValueChangeAlreadyCalled = false;

      // 触发 _initialValuesFromInstance 变化
      form._initialValuesFromInstance = { field1: 'new value' };
      await page.waitForChanges();

      // 验证 _onValueChangeAlreadyCalled 仍然为 false（因为 _resetFields 不会改变它）
      expect(form._onValueChangeAlreadyCalled).toBe(false);
    });

    it('should merge _initialValuesFromInstance with initialValues in _resetFields', async () => {
      const page = await newSpecPage({
        components: [KsForm],
        template: () => <ks-form initialValues={{ field2: 'initial' }}></ks-form>,
      });

      const form = page.rootInstance;
      form._onValueChangeAlreadyCalled = false;

      // 触发 _initialValuesFromInstance 变化
      form._initialValuesFromInstance = { field1: 'from instance' };
      await page.waitForChanges();

      // 验证 context.value 包含合并后的值
      expect(form.context.value).toEqual({
        field1: 'from instance',
        field2: 'initial',
      });
    });
  });
});
