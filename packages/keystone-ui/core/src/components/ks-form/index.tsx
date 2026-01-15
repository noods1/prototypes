/* eslint-disable max-lines */
import {
  ComponentInterface,
  Component,
  Element,
  Prop,
  h,
  Event,
  EventEmitter,
  Watch,
  Host,
  Method,
  State,
} from '@stencil/core';
import { get, merge, set, unset } from 'lodash-es';
import { Provide } from '@src/libs/runtime-context';
import { type FormContextValue, FormContext } from '@src/context/form-context';
import { dir } from '@src/utils/utils';
import classnames from 'classnames';
import Schema, { RuleItem } from 'async-validator';
import { INSTANCE_KEY, STATUS_KEY } from '@src/entities';
import type {
  ErrorField,
  LabelAlign,
  FormValue,
  ValidationStates,
  FailedValidationSingleState,
  WarningValidationSingleState,
  GeneralFormValue,
  InstanceMap,
  ValidationState,
  WatchCallBack,
  Trigger,
  FormListValidationStates,
  FieldData,
} from '@src/entities';
import {
  getAllPaths,
  getResetBtns,
  getSubmitBtns,
  immutableSet,
  mountFunctionOnClick,
  parsePath,
} from '@src/utils/form/utils';
import type { KsFormItem } from '../ks-form-item';
import type { KsFormList } from '../ks-form-list';

const prefix = 'form';

const _EMPTY_CATCH_FUNC = () => {
  /* DO NOTHING */
};

@Component({
  tag: 'ks-form',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsForm implements ComponentInterface {
  ['ks-name'] = 'ks-form';
  @Element() el!: HTMLKsFormElement;

  @Provide({
    context: FormContext,
    callback: (instance: unknown) => {
      // callback for runtime context change
      (instance as HTMLElement)?.dispatchEvent?.(new CustomEvent('context-change', { detail: instance }));
    },
  })
  private context: FormContextValue<FormValue> = {
    _prefixPath: [],
    disabled: false,
    value: {},
    validationStates: {
      [STATUS_KEY]: null,
    },
    callbacks: {
      onValueChange: (value, path, originalPath) => {
        this._onValueChangeAlreadyCalled = true;
        const newVal = immutableSet<FormValue>(this.context.value, path, value);
        this.context = {
          ...this.context,
          value: newVal,
        };
        this._validateField(originalPath || [], { validateTrigger: 'change' }).catch(_EMPTY_CATCH_FUNC);
        this.ksValueChange?.emit(this.context.value);
        queueMicrotask(() => this._notifyWatch(originalPath || []));
      },
      onBlur: (originalPath = []) => {
        if (
          this.validateTrigger === 'blur' ||
          (Array.isArray(this.validateTrigger) && this.validateTrigger.includes('blur'))
        ) {
          this._validateField(originalPath, { validateTrigger: 'blur' }).catch(_EMPTY_CATCH_FUNC);
        }
      },
      onValidation: async (path = []) => {
        await this.validateField(path).catch(_EMPTY_CATCH_FUNC);
      },
      _onValidationStatesChange: (validationStates: ValidationStates, path = []) => {
        const newStates = immutableSet<ValidationStates>(this.context.validationStates, path, validationStates);
        this.context = {
          ...this.context,
          validationStates: newStates,
        };
      },
      onResetValidation: async (path = []) => {
        await this.resetValidate(path);
      },

      _onComponentConnect: (instance, path = []) => {
        this._updateInstanceMap(instance, path);
        this._initialValuesFromInstance = immutableSet(this._initialValuesFromInstance, path, instance.initialValue);
      },
      _onComponentDisconnect: (instance, path: string[] = []) => {
        if (Object.is(instance, get(this._instanceMap, [...path, INSTANCE_KEY]))) {
          unset(this._instanceMap, [...path, INSTANCE_KEY]);
          unset(this._initialValuesFromInstance, path);
        }
      },
      _onPathChange: (instance, pathFrom, pathTo) => {
        if (Object.is(instance, get(this._instanceMap, [...pathFrom, INSTANCE_KEY]))) {
          unset(this._instanceMap, [...pathFrom, INSTANCE_KEY]);
          unset(this._initialValuesFromInstance, pathFrom);
        }

        this._updateInstanceMap(instance, pathTo);
        this._initialValuesFromInstance = immutableSet(this._initialValuesFromInstance, pathTo, instance.initialValue);
      },
      _registerWatch: (path, callback, shouldCallImmediately) => {
        if (typeof path === 'string') {
          path = parsePath(path);
        }
        return this._registerWatch(path, callback, shouldCallImmediately);
      },
    },
  };

  /**
   * @locale {en} The initial values of the form. This has the highest priority. When calling `reset`, the form will use these values as the original values, which differs from `setFieldValue`.
   * @locale {zh} 表单初始值的对象。此属性具有最高优先级，调用 `reset` 后，表单将以这些值作为原始值，这与 `setFieldValue` 不同。
   */
  @Prop() initialValues: FormValue = {};
  @State() _initialValuesFromInstance: FormValue = {};
  /**
   * @locale {en} The width of the label in the form. This can be specified in pixels or percentage.
   * @locale {zh} 表单中标签的宽度。可以用像素或百分比指定。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() labelWidth: number;
  /**
   * @locale {en} The alignment of the label in the form. Possible values are `right` and `left`.
   * @locale {zh} 表单中标签的对齐方式。可选值为 `right` 和 `left`。
   */
  @Prop() labelAlign: LabelAlign = 'right';
  /**
   * @locale {en} Indicates whether the form is disabled. When `true`, the form is disabled and cannot be interacted with.
   * @locale {zh} 指示表单是否被禁用。当值为 `true` 时，表单将被禁用，无法与之交互。
   */
  @Prop() disabled = false;
  /**
   * @locale {en} The event(s) that trigger form validation. This can be a string or an array of strings.
   * @locale {zh} 触发表单验证的事件。可以是字符串或字符串数组。
   */
  @Prop() validateTrigger: Trigger | Trigger[] = 'change';
  /**
   * @locale {en} Boolean, Invoke `callback` when the first validation rule generates an error, no more validation rules are processed. If your validation involves multiple asynchronous calls (for example, database queries) and you only need the first error use this option.
   * @locale {zh} 布尔值，当第一个验证规则生成错误时调用 `callback`，不再处理更多验证规则。如果您的验证涉及多个异步调用（例如数据库查询），并且只需要第一个错误，请使用此选项。
   */
  @Prop() first = false;
  /**
   * @locale {en} Invoke callback when the first validation rule of the specified field generates an error, no more validation rules of the same field are processed. true means all fields.
   * @locale {zh} 调用 `callback` 时，当指定字段的第一个验证规则生成错误时，不再处理相同字段的更多验证规则。true 表示所有字段。
   */
  @Prop() firstFields?: boolean | string[];

  // ---- 暴露到组件外部的事件 ----
  /**
   * @locale {en} Custom event triggered when the data in the form changes.
   * @locale {zh} 当表单中的数据变化时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksValueChange?: EventEmitter<FormValue>;
  /**
   * @locale {en} Custom event triggered when the form submission is completed successfully.
   * @locale {zh} 当表单提交成功完成时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksFinish?: EventEmitter<FormValue>;
  /**
   * @locale {en} Custom event triggered when the form submission fails.
   * @locale {zh} 当表单提交失败时触发的自定义事件。
   */
  @Event({ bubbles: false, composed: false }) ksFinishFailed?: EventEmitter<{
    values: FormValue;
    errorFields: ErrorField[];
  }>;

  @Watch('disabled')
  @Watch('labelWidth')
  @Watch('labelAlign')
  watchContextPropsChange() {
    this.context = {
      ...this.context,
      disabled: this.disabled,
      labelWidth: this.labelWidth,
      labelAlign: this.labelAlign,
    };
  }

  @Watch('_initialValuesFromInstance')
  watchInitialValuesFromInstanceChange() {
    if (!this._onValueChangeAlreadyCalled) {
      this._resetFields();
    }
  }

  componentWillLoad(): Promise<void> | void {
    this.context = {
      ...this.context,
      disabled: this.disabled,
      labelWidth: this.labelWidth,
      labelAlign: this.labelAlign,
      value: this.initialValues,
    };
  }

  private _disposeSubmitBtnsClick?: () => void;
  private _disposeResetBtnsClick?: () => void;
  componentDidLoad(): void {
    this._disposeSubmitBtnsClick = mountFunctionOnClick(getSubmitBtns(this.el), this.submit.bind(this));
    this._disposeResetBtnsClick = mountFunctionOnClick(getResetBtns(this.el), () => this.resetFields());
  }
  disconnectedCallback(): void {
    this._disposeSubmitBtnsClick?.();
    this._disposeResetBtnsClick?.();
  }

  private _instanceMap: InstanceMap = {
    [INSTANCE_KEY]: null,
  };
  _updateInstanceMap(instance: KsFormItem | KsFormList, path: string[]) {
    if (instance['ks-name'] === 'ks-form-item') {
      set(this._instanceMap, [...path, INSTANCE_KEY], instance);
    } else if (instance['ks-name'] === 'ks-form-list') {
      if (!get(this._instanceMap, path)) {
        set(this._instanceMap, path, []);
      }
      set(this._instanceMap, [...path, INSTANCE_KEY], instance);
    }
  }

  private _watchMap: Map<string, WatchCallBack[]> = new Map();
  _registerWatch(path: string[], callback: WatchCallBack, shouldCallImmediately = true) {
    // Call the callback with the current value when register.
    shouldCallImmediately && callback(get(this.context.value, path));

    const key = path.join('.');
    if (!this._watchMap.has(key)) {
      this._watchMap.set(key, []);
    }
    this._watchMap.get(key)?.push(callback);
    return () => {
      this._watchMap.set(key, this._watchMap.get(key)?.filter((cb) => cb !== callback) || []);
    };
  }
  private _notifyWatch(path: string[]) {
    const changedKey = path.join('.');
    this._watchMap.forEach((callbacks, k) => {
      if (k.startsWith(changedKey)) {
        callbacks.forEach((cb) => cb(get(this.context.value, k)));
      }
    });
  }

  /**
   * @locale {en} Submits the form, triggering validation and then processing the submission.
   * @locale {zh} 提交表单，触发验证并处理提交。
   */
  @Method()
  async submit() {
    return this.submitSync();
  }

  submitSync() {
    this._validateField([], { validateTrigger: true, recursive: true })
      .then((res) => {
        this.ksFinish?.emit(res);
      })
      .catch((res) => {
        this.ksFinishFailed?.emit(res);
      });
  }

  /**
   * @locale {en} Retrieves the values for a set of field names, returning them in the corresponding structure. By default, it returns the current field values. Calling `getFieldsValue()` will return all values.
   * @locale {zh} 获取一组字段名对应的值，按照对应结构返回。默认返回现存字段值，当调用 `getFieldsValue()` 时返回所有值。
   * @param names 要获取值的字段名数组。
   */
  @Method()
  async getFieldsValue<T>(names?: Array<string | string[]>) {
    return this.getFieldsValueSync<T>(names);
  }
  getFieldsValueSync<T>(names?: Array<string | string[]>) {
    if (!names) {
      return this.context.value as T;
    } else {
      return names.map((name) => get(this.context.value, name)) as T;
    }
  }

  /**
   * @locale {en} Retrieves the value of a specific field in the form.
   * @locale {zh} 获取表单中特定字段的值。
   * @param name 要获取值的字段名数组。
   * @returns 字段值数组。
   */
  @Method()
  async getFieldValue<T>(name: string | string[]) {
    return this.getFieldValueSync<T>(name);
  }
  getFieldValueSync<T>(name: string | string[]) {
    return get(this.context.value, name) as T;
  }

  /**
   * @locale {en} Sets the values for specific fields in the form.
   * @locale {zh} 设置表单中特定字段的值。
   * @param values 要设置的字段值对象。
   */
  @Method()
  async setFieldsValue(values: FormValue) {
    this.context.callbacks.onValueChange(values, [], []);
  }

  /**
   * @locale {en} Sets the value of a specific field in the form.
   * @locale {zh} 设置表单中特定字段的值。
   */
  @Method()
  async setFieldValue(name: string | string[], value: GeneralFormValue) {
    this.setFieldValueSync(name, value);
  }
  setFieldValueSync(name: string | string[], value: GeneralFormValue) {
    const path = name instanceof Array ? name : parsePath(name);
    this.context.callbacks.onValueChange(value as FormValue, path, path);
  }

  /**
   * @locale {en} Retrieves the instance of a specific field in the form.
   * @locale {zh} 获取表单中特定字段的实例。
   * @param name 要获取实例的字段名称。
   */
  @Method()
  async getFieldInstance(name: string | string[] = []): Promise<HTMLKsFormItemElement | HTMLKsFormListElement> {
    return this.getFieldInstanceSync(name);
  }
  getFieldInstanceSync(name: string | string[] = []): HTMLKsFormItemElement | HTMLKsFormListElement {
    const path = name instanceof Array ? name : parsePath(name);
    return get(this._instanceMap, [...path, INSTANCE_KEY]);
  }

  _getFieldError(path: string[]) {
    const validationState: ValidationState = get(this.context.validationStates, [...path, STATUS_KEY]);
    return validationState.filter((v) => v.status === 'error').map((v) => v.message);
  }
  /**
   * @locale {en} Retrieves the error for a specific field in the form.
   * @locale {zh} 获取表单中特定字段的错误。
   * @param name 要获取错误的字段名称。
   */
  @Method()
  async getFieldError(name: string | string[]) {
    return this.getFieldErrorSync(name);
  }
  getFieldErrorSync(name: string | string[]) {
    const path = typeof name === 'string' ? parsePath(name) : name;
    return this._getFieldError(path);
  }

  /**
   * @locale {en} Retrieves an array of errors for all fields in the form.
   * @locale {zh} 获取表单中所有字段的错误数组。
   * @param names 要获取错误的字段名称数组。
   */
  @Method()
  async getFieldsError(names: Array<string | string[]>) {
    return this.getFieldsErrorSync(names);
  }
  getFieldsErrorSync(names: Array<string | string[]>) {
    return names.map((name) => {
      if (typeof name === 'string') {
        name = parsePath(name);
      }
      return {
        name,
        errors: this._getFieldError(name),
      };
    });
  }

  /**
   * @locale {en} Validate form fields.
   * @locale {zh} 验证表单字段。
   */
  @Method()
  async validateFields() {
    return await this._validateField([], { validateTrigger: true, recursive: true });
  }

  /**
   * @locale {en} Validate form field on path.
   * @locale {zh} 验证路径上的表单字段。
   * @param path 要验证的字段路径。
   */
  @Method()
  async validateField(
    path: string[] | string = [],
    cfgs?: {
      validateTrigger?: true | Trigger;
      recursive?: boolean;
    },
  ) {
    if (typeof path === 'string') {
      path = parsePath(path);
    }
    return await this._validateField(path, cfgs || {});
  }

  /**
   * @locale {en} Get validation descriptor.
   * @locale {zh} 获取验证描述符。
   */
  private getValidationDescriptor = (
    paths: Array<string[]>,
    cfgs: {
      validateTrigger?: true | Trigger;
      recursive?: boolean;
    },
  ) => {
    const { validateTrigger = true, recursive = false } = cfgs;

    const pathsToValidate = recursive
      ? paths.reduce<Array<string[]>>((acc, path) => {
          if (path.length) {
            acc.push(
              ...getAllPaths(get(this._instanceMap, path), new RegExp(INSTANCE_KEY)).map((p) => [...path, ...p]),
            );
          } else {
            acc.push(...getAllPaths(this._instanceMap, new RegExp(INSTANCE_KEY)));
          }
          return acc;
        }, [])
      : paths;

    return pathsToValidate.reduce<{
      values: Record<string, GeneralFormValue>;
      descriptors: Record<string, RuleItem[]>;
    }>(
      ({ values, descriptors }, p) => {
        const instance: KsFormList | KsFormItem = get(this._instanceMap, [...p, INSTANCE_KEY]);
        if (instance) {
          if (
            // validateTrigger === true 直接校验
            validateTrigger === true ||
            (Array.isArray(instance.validateTrigger)
              ? // 是 array 时，包含则校验
                instance.validateTrigger.includes(validateTrigger)
              : // 不是 array 时，相等则校验
                instance.validateTrigger === validateTrigger)
          ) {
            return {
              values: {
                ...values,
                [p.join('.')]: get(this.context.value, p),
              },
              descriptors: {
                ...descriptors,
                [p.join('.')]: instance._collectRules(validateTrigger) || [],
              },
            };
          }
        }
        return {
          values,
          descriptors,
        };
      },
      {
        values: {},
        descriptors: {},
      },
    );
  };

  _currentValidationId = -1;
  private async _validateField(
    path: string[],
    cfgs: {
      validateTrigger?: true | Trigger;
      recursive?: boolean;
    },
  ) {
    const { validateTrigger = true, recursive = false } = cfgs;
    const validationId = ++this._currentValidationId;

    const { values, descriptors } = this.getValidationDescriptor([path], { validateTrigger, recursive });
    if (!Object.keys(descriptors).length) {
      return get(this.context.value, path, this.context.value);
    }
    const validator = new Schema(descriptors);
    try {
      await validator.validate(values, {
        first: this.first,
        firstFields: this.firstFields,
      });

      // If code goes here, it means validation succeed
      if (this._currentValidationId === validationId) {
        let validationStates: ValidationStates = this.context.validationStates;
        Object.keys(values).forEach((p) => {
          // get instance type
          const path = parsePath(p);
          const instance = get(this._instanceMap, [...path, INSTANCE_KEY]);

          if (instance['ks-name'] === 'ks-form-list' && !get(validationStates, path)) {
            // If list status is not exist, create it
            // We need it to be an array to store list item status
            const listStatus = [] as unknown as FormListValidationStates;
            listStatus[STATUS_KEY] = [{ status: 'success' }];
            validationStates = immutableSet(validationStates, path, listStatus);
          } else {
            validationStates = immutableSet(validationStates, [...path, STATUS_KEY], [{ status: 'success' }]);
          }
        });
        this.context = {
          ...this.context,
          validationStates,
        };
        return get(this.context.value, path, this.context.value);
      }
    } catch (error) {
      const { errors } = error as {
        errors: Array<{
          field: string;
          message: string;
          rule: RuleItem;
        }>;
      };
      // eslint-disable-next-line @stencil-community/strict-boolean-conditions, no-autofix/@typescript-eslint/no-unnecessary-condition
      if (!errors?.length) {
        throw error;
      }

      if (this._currentValidationId === validationId) {
        let validationStates: ValidationStates = this.context.validationStates;

        // if block, we throw error to block submission
        let block = false;
        const errorRes: ErrorField[] = [];

        const errMap = errors.reduce<Record<string, Array<{ message: string; rule: RuleItem }>>>(
          (errs, { field, message, rule }) => ({
            ...errs,
            [field]: [...(errs[field] || []), { message, rule }],
          }),
          {},
        );

        Object.entries(errMap).forEach(([field, errs]) => {
          // UPDATE CONTEXT VALIDATION STATES
          const validationStateList: Array<FailedValidationSingleState | WarningValidationSingleState> = errs.map(
            ({ message, rule }) => {
              const isWarning = (rule as any).warningOnly;

              // IF NOT WARNING, BLOCK THE VALIDATION PROCESS BY THROWING AN ERROR
              if (!isWarning) {
                block = true;
              }

              const validationState: FailedValidationSingleState | WarningValidationSingleState = {
                status: isWarning ? 'warning' : 'error',
                message,
                cta: (rule as any).messageCta,
              };
              return validationState;
            },
          );

          const path = parsePath(field);
          const instance = get(this._instanceMap, [...path, INSTANCE_KEY]);

          if (instance['ks-name'] === 'ks-form-list' && !get(validationStates, path)) {
            // If list status is not exist, create it
            // We need it to be an array to store list item status
            const listStatus = [] as unknown as FormListValidationStates;
            listStatus[STATUS_KEY] = validationStateList;
            validationStates = immutableSet(validationStates, path, listStatus);
          } else {
            validationStates = immutableSet(validationStates, [...path, STATUS_KEY], validationStateList);
          }

          // PREPARE ERROR RES
          errorRes.push({
            name: field,
            errors: validationStateList.filter((item) => item.status === 'error').map((item) => item.message),
            warnings: validationStateList.filter((item) => item.status === 'warning').map((item) => item.message),
          });
        });

        this.context = {
          ...this.context,
          validationStates,
        };

        const values = get(this.context.value, path, this.context.value);
        if (block) {
          return Promise.reject({ errorFields: errorRes, values } as unknown as Error);
        } else {
          return values;
        }
      }
    }
  }

  /**
   * 是否已经调用了 onValueChange 方法
   * 子组件使用 onValueChange 后，再有子组件改变 _initialValuesFromInstance，就不调用 _resetFields 了
   */
  _onValueChangeAlreadyCalled = false;
  /**
   * @locale {en} Resets all fields in the form to their initial values.
   * @locale {zh} 重置表单中的所有字段为初始值。
   */
  @Method()
  async resetFields(fields: Array<string | string[]> = []) {
    this._resetFields(fields);
  }
  private _resetFields(fields: Array<string | string[]> = []) {
    const initialValues = merge({}, this._initialValuesFromInstance, this.initialValues);
    if (!fields.length) {
      this.context = {
        ...this.context,
        value: initialValues,
      };
      this.resetValidate();
    } else {
      let { value } = this.context;
      fields.forEach((field) => {
        value = immutableSet(value, field, get(initialValues, field));
        this.resetValidate(field);
      });
      this.context = {
        ...this.context,
        value,
      };
    }
    this.ksValueChange?.emit(this.context.value);
    queueMicrotask(() => this._notifyWatch([]));
  }

  /**
   * @locale {en} Scrolls the form to the specified field.
   * @locale {zh} 将表单滚动到指定字段。
   * @param name 要滚动到的字段名称。
   */
  @Method()
  async scrollToField(name: string) {
    const instance = await this.getFieldInstance(name);
    instance.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * @locale {en} Scrolls the form to the first error field.
   * @locale {zh} 将表单滚动到第一个错误字段。
   */
  @Method()
  async scrollToFirstError() {
    const elements = this.el.querySelectorAll<HTMLKsFormItemElement>('[ks-form-item]');
    for (let i = 0; i < elements.length; i++) {
      const e = elements[i];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      if (e['ks-name'] === 'ks-form-item' && e._validateStatus === 'error') {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        e.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
  }

  /**
   * @locale {en} Reset the validation status of the form.
   * @locale {zh} 重置表单的验证状态。
   * @param path 清空校验路径
   * @returns `Promise<void>`
   */
  @Method()
  async resetValidate(path: string | string[] = []) {
    if (!path.length) {
      this.context = {
        ...this.context,
        validationStates: {
          [STATUS_KEY]: null,
        },
      };
      return;
    }
    let validationStates: ValidationStates = this.context.validationStates;
    path = typeof path === 'string' ? parsePath(path) : path;

    const instance = get(this._instanceMap, [...path, INSTANCE_KEY]);
    if (instance['ks-name'] === 'ks-form-list' && !get(validationStates, path)) {
      // If list status is not exist, create it
      // We need it to be an array to store list item status
      const listStatus = [] as unknown as FormListValidationStates;
      listStatus[STATUS_KEY] = null;
      validationStates = immutableSet(validationStates, path, listStatus);
    } else {
      validationStates = immutableSet(validationStates, [...path, STATUS_KEY], null);
    }

    this.context = {
      ...this.context,
      validationStates,
    };
  }

  render() {
    return (
      <Host dir={dir()} ks-form>
        <form dir={dir()} class={classnames(prefix)} part="self">
          <slot></slot>
        </form>
      </Host>
    );
  }

  //////////////////// DEPRECATED FUNCTIONS ////////////////////
  /**
   * @deprecated
   * @locale {en} Scrolls the form to the specified field.
   * @locale {zh} 将表单滚动到指定字段。
   */
  // istanbul ignore next
  _scrollToField = (name: string) => {
    const instance = this.getFieldInstanceSync(name);
    instance?.scrollIntoView({ behavior: 'smooth' });
  };
  /**
   * @deprecated
   * @locale {en} Sets the value of a specific field in the form.
   * @locale {zh} 设置表单中特定字段的值。
   */
  // istanbul ignore next
  _setFieldValue = (name: string, value: unknown) => {
    this.setFieldValueSync(name, value as GeneralFormValue);
  };
  /**
   * @deprecated
   * @locale {en} Sets the values and validation status for specific fields in the form, intended for use with view rendering. This is applied when adding new fields (form items), and the template rendering is determined by the user. It can be used in conjunction with form data for dynamic rendering.
   * @locale {zh} 设置表单中特定字段的值和验证状态，旨在与视图渲染配合使用。此方法应用于新增字段（表单项），模板渲染由用户决定。可以配合表单数据实现动态渲染。
   */
  // istanbul ignore next
  _setFields = (fields: FieldData[]) => {
    fields.forEach((field) => {
      this.setFieldValueSync(field.name, field.value);
    });
  };
  /**
   * @deprecated
   * @locale {en} Sets the values for specific fields in the form.
   * @locale {zh} 设置表单中特定字段的值。
   */
  // istanbul ignore next
  _setFieldsValue = (values: Record<string, unknown>) => {
    Object.keys(values).forEach((key) => {
      this.setFieldValueSync(key, values[key] as GeneralFormValue);
    });
  };
  /**
   * @deprecated
   * @locale {en} Submits the form, triggering validation and then processing the submission.
   * @locale {zh} 提交表单，触发验证并处理提交。
   */
  // istanbul ignore next
  _submit = () => {
    this.submitSync();
  };
  /**
   * @deprecated
   * @locale {en} Validates all fields in the form and returns a promise that resolves if valid.
   * @locale {zh} 验证表单中的所有字段，并返回一个在有效时解析的 Promise。
   */
  // istanbul ignore next
  _validateFields = () => this.validateFields();
  /**
   * @deprecated
   * @locale {en} watch the form field change and execute the callback function
   * @locale {zh} watch 表单字段变化,并执行回调函数
   */
  // istanbul ignore next
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  useWatch = (name: string, cb: (value) => void) => {
    this._registerWatch(parsePath(name), cb);
  };
}
