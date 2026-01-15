import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsFormItem } from '../index';

class MockForm extends HTMLElement {
  context = {
    value: {},
    validationStates: {},
    disabled: false,
    labelAlign: 'right',
    labelWidth: 100,
    _prefixPath: [], // 添加_prefixPath属性
    callbacks: {
      onValueChange: jest.fn(),
      onBlur: jest.fn(),
      onValidation: jest.fn(),
      onResetValidation: jest.fn(),
      _onComponentConnect: jest.fn(),
      _onComponentDisconnect: jest.fn(),
      _onPathChange: jest.fn(),
      _registerWatch: jest.fn(),
    },
  };
  ['ks-name'] = 'ks-form';
}

// 注册模拟组件
customElements.define('mock-form', MockForm);

const mockCallbacksFromContext = () => ({
  onValueChange: jest.fn(),
  onBlur: jest.fn(),
  onValidation: jest.fn(),
  onResetValidation: jest.fn(),
  _onComponentConnect: jest.fn(),
  _onComponentDisconnect: jest.fn(),
  _onValidationStatesChange: jest.fn(),
  _onPathChange: jest.fn(),
  _registerWatch: jest.fn(),
});

describe('ks-form-item component', () => {
  it('should render with default values', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => (
        <mock-form>
          <ks-form-item></ks-form-item>
        </mock-form>
      ),
    });

    await page.waitForChanges();

    expect(page.root).toBeTruthy();
    expect(page.root?.shadowRoot).toBeTruthy();
  });

  it('should render with label and name props', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item label="Username" name="username"></ks-form-item>,
    });

    expect(page.root?.['label']).toBe('Username');
    expect(page.root?.['name']).toBe('username');
    expect(page.root?.shadowRoot?.querySelector('.form-item__label')).toBeTruthy();
  });

  it('should render with labelWidth and labelAlign props', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item label="Username" labelWidth={150} labelAlign="left"></ks-form-item>,
    });

    expect(page.root?.['labelWidth']).toBe(150);
    expect(page.root?.['labelAlign']).toBe('left');
    const labelElement = page.root?.shadowRoot?.querySelector('.form-item__label');
    expect(labelElement).toBeTruthy();
    expect((labelElement as any).style.width).toBe('150px');
  });

  it('should render with initialValue prop', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item name="username" initialValue="test"></ks-form-item>,
    });

    expect(page.root?.['initialValue']).toBe('test');
  });

  it('should render with rules prop', async () => {
    const rules = [{ required: true, message: 'Please input username' }];
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item required name="username" rules={rules}></ks-form-item>,
    });

    expect(page.root?.['rules']).toEqual(rules);

    expect(page.rootInstance._collectRules()).toEqual([]);
    expect(page.rootInstance._collectRules(true)).toEqual(rules);
  });

  it('should render with required prop', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item required name="username"></ks-form-item>,
    });

    expect(page.rootInstance._collectRules()).toEqual([]);
    expect(page.rootInstance._collectRules(true)).toEqual([{ required: true }]);
  });

  it('should call on validation states change when _onValidationStatesChange is called', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item name="username"></ks-form-item>,
    });

    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();
    page.rootInstance.context.callbacks._onValidationStatesChange({ __status__: null });

    expect(page.rootInstance.callbacksFromContext._onValidationStatesChange).toHaveBeenCalled();
  });

  it('should call watchContextPropsChange when context props change', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item name="username"></ks-form-item>,
    });
    await page.waitForChanges();

    page.rootInstance._prefixPath = [];

    page.rootInstance.disabledFromContext = true;
    page.rootInstance.watchContextPropsChange();
    expect(page.rootInstance.context.disabled).toBe(true);

    page.rootInstance.disabledFromContext = false;
    page.rootInstance.watchContextPropsChange();
    expect(page.rootInstance.context.disabled).toBe(false);
  });

  it('should call _onPathChange when name changed', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item name="username"></ks-form-item>,
    });
    await page.waitForChanges();

    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();

    page.rootInstance.name = 'newName';
    expect(page.rootInstance.callbacksFromContext._onPathChange).toHaveBeenCalled();
  });

  it('should update validate messages when validationStateFromContext change', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item name="username"></ks-form-item>,
    });
    await page.waitForChanges();

    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();

    page.rootInstance.validationStateFromContext = {
      __status__: [],
    };

    page.rootInstance.updateValidationState();

    page.rootInstance.render();
    expect(page.rootInstance.validateMessages).toEqual([]);

    expect(page.rootInstance.context.status).toBe('default');

    page.rootInstance.validationStateFromContext = {
      __status__: [
        {
          status: 'error',
          message: 'Username is required',
        },
        {
          status: 'warning',
          message: 'Username is required',
        },
      ],
    };

    page.rootInstance.updateValidationState();

    page.rootInstance.render();
    expect(page.rootInstance.validateMessages).toEqual([
      {
        status: 'error',
        message: 'Username is required',
      },
      {
        status: 'warning',
        message: 'Username is required',
      },
    ]);

    expect(page.rootInstance.context.status).toBe('error');

    page.rootInstance.validationStateFromContext = {
      __status__: [
        {
          status: 'warning',
          message: 'Username is required',
        },
        {
          status: 'success',
          message: 'Username is required',
        },
      ],
    };

    page.rootInstance.updateValidationState();

    page.rootInstance.render();
    expect(page.rootInstance.validateMessages).toEqual([
      {
        status: 'warning',
        message: 'Username is required',
      },
    ]);

    expect(page.rootInstance.context.status).toBe('warning');

    page.rootInstance.validationStateFromContext = {
      __status__: [
        {
          status: 'success',
          message: 'Username is required',
        },
        {
          status: 'validating',
          message: 'Username is required',
        },
      ],
    };

    page.rootInstance.updateValidationState();

    page.rootInstance.render();
    expect(page.rootInstance.validateMessages).toEqual([]);

    expect(page.rootInstance.context.status).toBe('success');

    page.rootInstance.validationStateFromContext = {
      __status__: [
        {
          status: 'validating',
          message: 'Username is required',
        },
      ],
    };

    page.rootInstance.updateValidationState();

    page.rootInstance.render();
    expect(page.rootInstance.validateMessages).toEqual([]);

    expect(page.rootInstance.context.status).toBe('default');
  });

  it('should update value in context when valueFromContext change', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item name="username"></ks-form-item>,
    });
    await page.waitForChanges();

    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();

    page.rootInstance.valueFromContext = 'test';

    page.rootInstance.updateContextValue('test');

    expect(page.rootInstance.context.value).toEqual('test');
  });

  it('should call callbacks from context when self context function called', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item name="username"></ks-form-item>,
    });
    await page.waitForChanges();

    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();

    page.rootInstance.context.callbacks.onValueChange('test');
    expect(page.rootInstance.callbacksFromContext.onValueChange).toHaveBeenCalledWith(
      'test',
      ['username'],
      ['username'],
    );

    page.rootInstance.context.callbacks.onBlur();
    expect(page.rootInstance.callbacksFromContext.onBlur).toHaveBeenCalledWith(['username']);

    page.rootInstance.context.callbacks.onValidation();
    expect(page.rootInstance.callbacksFromContext.onValidation).toHaveBeenCalledWith(['username']);

    await page.rootInstance.context.callbacks.onResetValidation();
    expect(page.rootInstance.callbacksFromContext.onResetValidation).toHaveBeenCalledWith(['username']);

    page.rootInstance.context.callbacks._onComponentConnect(page.rootInstance);
    expect(page.rootInstance.callbacksFromContext._onComponentConnect).toHaveBeenCalledWith(page.rootInstance, [
      'username',
    ]);

    page.rootInstance.context.callbacks._onComponentDisconnect(page.rootInstance);
    expect(page.rootInstance.callbacksFromContext._onComponentDisconnect).toHaveBeenCalledWith(page.rootInstance, [
      'username',
    ]);

    page.rootInstance.context.value = {};

    page.rootInstance.context.callbacks._onPathChange(page.rootInstance, ['test1'], ['test2']);
    expect(page.rootInstance.callbacksFromContext._onPathChange).toHaveBeenCalledWith(
      page.rootInstance,
      ['test1'],
      ['test2'],
    );

    const cb = () => {};
    page.rootInstance.context.callbacks._registerWatch(['username'], cb);
    expect(page.rootInstance.callbacksFromContext._registerWatch).toHaveBeenCalledWith(['username'], cb, undefined);
  });

  it('dependencies should register watch', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item name="username"></ks-form-item>,
    });
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();
    page.rootInstance.dependencies = ['test1', 'test2'];

    await page.waitForChanges();

    page.rootInstance._registerDependencies();

    expect(page.rootInstance.callbacksFromContext._registerWatch).toHaveBeenCalledTimes(2);
    expect(page.rootInstance._disposers.length).toBe(2);
  });

  it('dependencies should register watch', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item name="username"></ks-form-item>,
    });
    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();
    page.rootInstance.callbacksFromContext._registerWatch = (_: never, cb: () => void) => cb();
    page.rootInstance.dependencies = ['test1', 'test2'];

    await page.waitForChanges();

    page.rootInstance._registerDependencies();

    expect(page.rootInstance.callbacksFromContext.onValidation).toHaveBeenCalledTimes(2);
  });

  it('dependencies should register watch', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item name="user.username"></ks-form-item>,
    });

    page.rootInstance._prefixPath = ['user'];

    expect(page.rootInstance._relativePath()).toEqual(['username']);

    page.rootInstance._prefixPath = ['xxx'];

    expect(page.rootInstance._relativePath()).toEqual(['user', 'username']);
  });

  it('should set context status when validation status changes', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item name="user.username"></ks-form-item>,
    });
    page.rootInstance._prefixPath = ['user'];
    page.rootInstance.validateStatus = 'error';
    expect(page.rootInstance.context.status).toBe('error');
  });

  it('should set _provider to undefined when _unsubscribeContext called', async () => {
    const page = await newSpecPage({
      components: [KsFormItem],
      template: () => <ks-form-item name="user.username"></ks-form-item>,
    });
    await page.waitForChanges();
    page.rootInstance._prefixPath = ['user'];
    page.rootInstance.context.callbacks._unsubscribeContext();
    expect(page.rootInstance.context._provider).toBe(undefined);
  });
});
