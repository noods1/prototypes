import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
// import { KsFormList } from '../index';

jest.mock('../../../utils/input', () => {
  const originalModule = jest.requireActual('../../../utils/input');
  return {
    ...originalModule,
    scheduleLowPriorityTask: (_: Element, task: () => void) => task(),
  };
});

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

describe('ks-form-list component', () => {
  let KsFormList: typeof import('../index').KsFormList;

  beforeEach(async () => {
    // Reset modules before each test to ensure mocks are applied
    jest.resetModules();
    // Dynamically import the component AFTER modules have been reset
    KsFormList = (await import('../index')).KsFormList;
  });
  it('should render with default values', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => (
        <mock-form>
          <ks-form-list name="list"></ks-form-list>
        </mock-form>
      ),
    });

    await page.waitForChanges();

    expect(page.root).toBeTruthy();
    expect(page.root?.shadowRoot).toBeTruthy();
  });

  it('should render with label and name props', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list label="Username" name="username"></ks-form-list>,
    });

    expect(page.root?.['label']).toBe('Username');
    expect(page.root?.['name']).toBe('username');
    expect(page.root?.shadowRoot?.querySelector('.form-list__label')).toBeTruthy();
  });

  it('should render with labelWidth and labelAlign props', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="list" label="Username" labelWidth={150} labelAlign="left"></ks-form-list>,
    });

    expect(page.root?.['labelWidth']).toBe(150);
    expect(page.root?.['labelAlign']).toBe('left');
    const labelElement = page.root?.shadowRoot?.querySelector('.form-list__label');
    expect(labelElement).toBeTruthy();
    expect((labelElement as any).style.width).toBe('150px');
  });

  it('should render with initialValue prop', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="username" initialValue={['test']}></ks-form-list>,
    });

    expect(page.root?.['initialValue']).toEqual(['test']);
  });

  it('should render with rules prop', async () => {
    const rules = [{ required: true, message: 'Please input username' }];
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list required name="username" rules={rules}></ks-form-list>,
    });

    expect(page.root?.['rules']).toEqual(rules);

    expect(page.rootInstance._collectRules()).toEqual([]);
    expect(page.rootInstance._collectRules(true)).toEqual(rules);
  });

  it('should render with required prop', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list required name="username"></ks-form-list>,
    });

    expect(page.rootInstance._collectRules()).toEqual([]);
    expect(page.rootInstance._collectRules(true)).toEqual([{ required: true }]);
  });

  it('should call on validation states change when _onValidationStatesChange is called', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="username"></ks-form-list>,
    });

    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();
    page.rootInstance.context.callbacks._onValidationStatesChange({ __status__: null });

    expect(page.rootInstance.callbacksFromContext._onValidationStatesChange).toHaveBeenCalled();
  });

  it('should call watchContextPropsChange when context props change', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="username"></ks-form-list>,
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
      components: [KsFormList],
      template: () => <ks-form-list name="username"></ks-form-list>,
    });
    await page.waitForChanges();

    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();

    page.rootInstance.name = 'newName';
    expect(page.rootInstance.callbacksFromContext._onPathChange).toHaveBeenCalled();
  });

  it('should update validate messages when validationStateFromContext change', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="username"></ks-form-list>,
    });
    await page.waitForChanges();

    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();

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
      components: [KsFormList],
      template: () => <ks-form-list name="username"></ks-form-list>,
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
      components: [KsFormList],
      template: () => <ks-form-list name="username"></ks-form-list>,
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

    page.rootInstance.context.callbacks._onPathChange(page.rootInstance, ['test1'], ['test2']);
    expect(page.rootInstance.callbacksFromContext._onPathChange).toHaveBeenCalledWith(
      page.rootInstance,
      ['test1'],
      ['test2'],
    );

    const cb = () => {};
    page.rootInstance.context.callbacks._registerWatch(['username'], cb, false);
    expect(page.rootInstance.callbacksFromContext._registerWatch).toHaveBeenCalledWith(['username'], cb, false);
  });

  it('dependencies should register watch', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="username"></ks-form-list>,
    });
    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();
    page.rootInstance.dependencies = ['test1', 'test2'];

    await page.waitForChanges();

    page.rootInstance._registerDependencies();

    expect(page.rootInstance.callbacksFromContext._registerWatch).toHaveBeenCalledTimes(2);
    expect(page.rootInstance._disposers.length).toBe(2);
  });

  it('dependencies should register watch', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="username"></ks-form-list>,
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
      components: [KsFormList],
      template: () => <ks-form-list name="user.username"></ks-form-list>,
    });

    page.rootInstance._prefixPath = ['user'];

    expect(page.rootInstance._relativePath()).toEqual(['username']);

    page.rootInstance._prefixPath = ['xxx'];

    expect(page.rootInstance._relativePath()).toEqual(['user', 'username']);
  });

  it('should map value to fields with correct keys', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="test"></ks-form-list>,
    });

    page.rootInstance._keyManager = {
      keys: [],
      id: 0,
    };

    const value = ['item1', 'item2', 'item3'];
    const result = page.rootInstance._mapValueToFields(value);

    expect(result).toEqual([
      { name: 0, key: 0 },
      { name: 1, key: 1 },
      { name: 2, key: 2 },
    ]);
    expect(page.rootInstance._keyManager.keys).toEqual([0, 1, 2]);
    expect(page.rootInstance._keyManager.id).toBe(3);
  });

  it('should reuse existing keys when available', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="test"></ks-form-list>,
    });

    page.rootInstance._keyManager = {
      keys: [10, 20],
      id: 30,
    };

    const value = ['item1', 'item2', 'item3'];
    const result = page.rootInstance._mapValueToFields(value);

    expect(result).toEqual([
      { name: 0, key: 10 },
      { name: 1, key: 20 },
      { name: 2, key: 30 },
    ]);
    expect(page.rootInstance._keyManager.keys).toEqual([10, 20, 30]);
    expect(page.rootInstance._keyManager.id).toBe(31);
  });

  it('should handle empty value array', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="test"></ks-form-list>,
    });

    page.rootInstance._keyManager = {
      keys: [],
      id: 0,
    };

    const result = page.rootInstance._mapValueToFields([]);
    expect(result).toEqual([]);
    expect(page.rootInstance._keyManager.keys).toEqual([]);
    expect(page.rootInstance._keyManager.id).toBe(0);
  });

  it('should add item to form list correctly', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="test"></ks-form-list>,
    });

    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();
    page.rootInstance.valueFromContext = ['item1'];
    page.rootInstance._keyManager = { keys: [1], id: 2 };
    page.rootInstance.validationStateFromContext = [[{ status: 'error' }]];

    // Test adding at end
    page.rootInstance.add('item2');
    page.rootInstance.contextEffect();
    expect(page.rootInstance.callbacksFromContext.onValueChange).toHaveBeenCalledWith(
      ['item1', 'item2'],
      ['test'],
      ['test'],
    );
    expect(page.rootInstance._keyManager.keys).toEqual([1, 2]);
    expect(page.rootInstance.callbacksFromContext._onValidationStatesChange).toHaveBeenCalledWith(
      [[{ status: 'error' }], []],
      ['test'],
    );

    page.rootInstance.valueFromContext = ['item1', 'item2'];
    page.rootInstance.validationStateFromContext = [[{ status: 'error' }], [{ status: 'warning' }]];

    page.rootInstance.callbacksFromContext.onValueChange.mockClear();
    // Test adding at specific index
    page.rootInstance.add('item3', 1);
    page.rootInstance.contextEffect();
    expect(page.rootInstance.callbacksFromContext.onValueChange).toHaveBeenCalledWith(
      ['item1', 'item3', 'item2'],
      ['test'],
      ['test'],
    );
    expect(page.rootInstance._keyManager.keys).toEqual([1, 3, 2]);
    expect(page.rootInstance.callbacksFromContext._onValidationStatesChange).toHaveBeenCalledWith(
      [[{ status: 'error' }], [], [{ status: 'warning' }]],
      ['test'],
    );
  });

  it('should remove item from form list correctly', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="test"></ks-form-list>,
    });

    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();
    page.rootInstance.valueFromContext = ['item1', 'item2', 'item3'];
    page.rootInstance._keyManager = { keys: [1, 2, 3], id: 4 };
    page.rootInstance.validationStateFromContext = [
      [{ status: 'error' }],
      [{ status: 'warning' }],
      [{ status: 'error' }],
    ];

    // Test removing single item
    page.rootInstance.remove(1);
    page.rootInstance.contextEffect();
    expect(page.rootInstance.callbacksFromContext.onValueChange).toHaveBeenCalledWith(
      ['item1', 'item3'],
      ['test'],
      ['test'],
    );
    expect(page.rootInstance._keyManager.keys).toEqual([1, 3]);
    expect(page.rootInstance.callbacksFromContext._onValidationStatesChange).toHaveBeenCalledWith(
      [[{ status: 'error' }], [{ status: 'error' }]],
      ['test'],
    );

    page.rootInstance.valueFromContext = ['item1', 'item3'];

    // Test removing multiple items
    page.rootInstance.remove([0, 1]);
    page.rootInstance.contextEffect();
    expect(page.rootInstance.callbacksFromContext.onValueChange).toHaveBeenCalledWith([], ['test'], ['test']);
    expect(page.rootInstance._keyManager.keys).toEqual([]);
  });

  it('should not remove item from form list when empty', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="test"></ks-form-list>,
    });

    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();
    page.rootInstance.valueFromContext = [];
    page.rootInstance._keyManager = { keys: [], id: 4 };

    // Test removing single item
    page.rootInstance.remove([]);
    expect(page.rootInstance.callbacksFromContext.onValueChange).toHaveBeenCalledTimes(0);
  });

  it('should move items in form list correctly', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="test"></ks-form-list>,
    });

    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();
    page.rootInstance.valueFromContext = ['item1', 'item2', 'item3'];
    page.rootInstance._keyManager = { keys: [1, 2, 3], id: 4 };
    page.rootInstance.validationStateFromContext = [
      [{ status: 'error' }],
      [{ status: 'warning' }],
      [{ status: 'error' }],
    ];

    // Test moving item
    page.rootInstance.move(0, 2);
    page.rootInstance.contextEffect();
    expect(page.rootInstance.callbacksFromContext.onValueChange).toHaveBeenCalledWith(
      ['item2', 'item3', 'item1'],
      ['test'],
      ['test'],
    );
    expect(page.rootInstance._keyManager.keys).toEqual([2, 3, 1]);
    expect(page.rootInstance.callbacksFromContext._onValidationStatesChange).toHaveBeenCalledWith(
      [[{ status: 'warning' }], [{ status: 'error' }], [{ status: 'error' }]],
      ['test'],
    );

    page.rootInstance.valueFromContext = ['item2', 'item3', 'item1'];

    // Test moving to same position (no change)
    const prevValue = [...page.rootInstance.valueFromContext];
    const prevKeys = [...page.rootInstance._keyManager.keys];
    page.rootInstance.move(1, 1);
    expect(page.rootInstance.valueFromContext).toEqual(prevValue);
    expect(page.rootInstance._keyManager.keys).toEqual(prevKeys);
  });

  it('move out of bound should not call value on change', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="test"></ks-form-list>,
    });

    page.rootInstance._prefixPath = [];
    page.rootInstance.callbacksFromContext = mockCallbacksFromContext();
    page.rootInstance.valueFromContext = ['item1', 'item2', 'item3'];
    page.rootInstance._keyManager = { keys: [1, 2, 3], id: 4 };

    // Test moving item out of bound
    page.rootInstance.move(0, 5);
    expect(page.rootInstance.callbacksFromContext.onValueChange).toHaveBeenCalledTimes(0);
  });

  it('should set context status when validation status changes', async () => {
    const page = await newSpecPage({
      components: [KsFormList],
      template: () => <ks-form-list name="user.username"></ks-form-list>,
    });
    page.rootInstance._prefixPath = ['user'];
    page.rootInstance.validateStatus = 'error';
    expect(page.rootInstance.context.status).toBe('error');
  });
});
