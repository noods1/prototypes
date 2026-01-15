import { Consume, Provide } from '@src/libs/runtime-context';
import { Component, ComponentInterface, Element, Prop, h, Host, Watch, State, Method } from '@stencil/core';
import type {
  FormItemValidationStates,
  FormItemValue,
  LabelAlign,
  NamePath,
  RuleItemExpand,
  Size,
  Status,
  Trigger,
  ValidationSingleState,
  ValidationStates,
} from '@src/entities';
import { FormContext, FormContextValue } from '@src/context/form-context';
import type { KsFormList } from '../ks-form-list';
import { STATUS_KEY } from '@src/entities';
import { immutableSet, parsePath } from '@src/utils/form/utils';
import classnames from 'classnames';
import { dir, t } from '@src/utils/utils';
import { formMessages } from '@fe-infra/keystone-locales';
import { Slot, Slots } from '@src/utils/decorators';

const prefix = 'form-item';

/**
 * @slot label - Allows customization of the form item's label. If not provided, the `label` prop will be used as content.
 */
@Component({
  tag: 'ks-form-item',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsFormItem implements ComponentInterface {
  ['ks-name'] = 'ks-form-item';
  @Element() el!: HTMLKsFormItemElement;

  /**
   * @locale {en} Callback after component willLoad completes, used to notify form that path is ready
   * @locale {zh} 组件 willLoad 执行的 fulfill 的 promise，用于通知 form，path 已经准备好
   */
  __propsReady: Promise<void> = new Promise((resolve) => {
    this.__propsReadyResolver = resolve;
  });
  __propsReadyResolver!: () => void;
  _relativePath({ name = this.name, _prefixPath = this._prefixPath } = {}): string[] {
    const path = parsePath(name);
    if (path.slice(0, _prefixPath.length).join('.') === _prefixPath.join('.')) {
      return path.slice(_prefixPath.length);
    } else {
      return path;
    }
  }

  @Provide({
    context: FormContext,
    callback: (instance: unknown) => {
      (instance as HTMLElement)?.dispatchEvent?.(new CustomEvent('context-change', { detail: instance }));
    },
  })
  private context: FormContextValue<FormItemValue, KsFormItem> = {
    _provider: 'formItem',
    _prefixPath: [],
    disabled: undefined,
    value: undefined,
    validationStates: {
      [STATUS_KEY]: null,
    },
    callbacks: {
      onValueChange: (value, path: string[] = [], originalPath?: string[]) => {
        const newItemValue = immutableSet(this.context.value, path, value, {});
        originalPath = originalPath || [...this._prefixPath, ...this._relativePath()];
        this.callbacksFromContext?.onValueChange(newItemValue, this._relativePath(), originalPath);
      },
      onBlur: (originalPath?: string[]) => {
        originalPath = originalPath || [...this._prefixPath, ...this._relativePath()];
        this.callbacksFromContext?.onBlur(originalPath);
      },
      onValidation: async (path: string[] = []) => {
        await this.validate(path || []);
      },
      _onValidationStatesChange: (validationStates: ValidationStates, path = []) => {
        const newStates = immutableSet<ValidationStates>(this.context.validationStates, path, validationStates);
        this.callbacksFromContext?._onValidationStatesChange(newStates, this._relativePath());
      },
      onResetValidation: async (path: string[] = []) => {
        await this.resetValidate(path || []);
      },
      _onComponentConnect: (instance: KsFormItem, path: string[] = []) => {
        this.callbacksFromContext?._onComponentConnect(instance, [...this._relativePath(), ...path]);
      },
      _onComponentDisconnect: (instance: KsFormItem, path: string[] = []) => {
        this.callbacksFromContext?._onComponentDisconnect(instance, [...this._relativePath(), ...path]);
      },
      _onPathChange: (instance: KsFormItem | KsFormList, pathFrom: string[], pathTo: string[]) => {
        this.callbacksFromContext?._onPathChange(instance, pathFrom, pathTo);
      },
      _registerWatch: (path, callback, shouldCallImmediately) =>
        this.callbacksFromContext?._registerWatch(path, callback, shouldCallImmediately),
      _unsubscribeContext: () => {
        this.context = {
          ...this.context,
          _provider: undefined,
        };
      },
    },
  };

  // prettier-ignore
  @Consume({
    context: FormContext,
    subscribe: true,
    path(this: KsFormItem) {
      /* istanbul ignore next */
      return ['value', ...this._relativePath()];
    },
  })
  @State() valueFromContext: FormContextValue<FormItemValue>['value'];
  @Watch('valueFromContext')
  updateContextValue() {
    this.context = {
      ...this.context,
      value: this.valueFromContext,
    };
  }

  // prettier-ignore
  @Consume({
    context: FormContext,
    subscribe: true,
    path(this: KsFormItem) {
      /* istanbul ignore next */
      return ['validationStates', ...this._relativePath()];
    },
  })
  @State() validationStateFromContext!: FormItemValidationStates;
  @Watch('validationStateFromContext')
  updateValidationState() {
    let status: FormContextValue<FormItemValue>['status'];
    const states = this.validationStateFromContext?.[STATUS_KEY] || [];
    if (states.length) {
      if (states.some(({ status }) => status === 'error')) {
        status = 'error';
      } else if (states.some(({ status }) => status === 'warning')) {
        status = 'warning';
      } else if (states.some(({ status }) => status === 'success')) {
        status = 'success';
      } else {
        status = 'default';
      }
    } else {
      status = 'default';
    }
    this.context = {
      ...this.context,
      status: this.validateStatus || status,
      validationStates: this.validationStateFromContext,
    };
    this.validateMessages = states.filter((message) => message.status === 'error' || message.status === 'warning');
  }
  @State() validateMessages: ValidationSingleState[] = [];

  // eslint-disable-next-line @stencil-community/no-unused-watch
  @Watch('validateStatus')
  validateStatusChange() {
    if (this.validateStatus) {
      this.context = {
        ...this.context,
        status: this.validateStatus,
      };
    }
  }

  // prettier-ignore
  @Consume({
    context: FormContext,
    subscribe: true,
    path: ['_prefixPath'],
  })
  @State() _prefixPath: FormContextValue<FormItemValue>['_prefixPath'] = [];
  // prettier-ignore
  @Consume({
    context: FormContext,
    subscribe: true,
    path: ['disabled'],
  })
  @State() disabledFromContext: FormContextValue<FormItemValue>['disabled'];
  // prettier-ignore
  @Consume({
    context: FormContext,
    subscribe: true,
    path: ['labelAlign'],
  })
  @State() labelAlignFromContext: FormContextValue<FormItemValue>['labelAlign'];
  // prettier-ignore
  @Consume({
    context: FormContext,
    subscribe: true,
    path: ['labelWidth'],
  })
  @State() labelWidthFromContext: FormContextValue<FormItemValue>['labelWidth'];

  @Watch('disabledFromContext')
  @Watch('labelWidthFromContext')
  @Watch('labelAlignFromContext')
  watchContextPropsChange() {
    this.context = {
      ...this.context,
      disabled: this.disabledFromContext,
      labelWidth: this.labelWidthFromContext,
      labelAlign: this.labelAlignFromContext,
    };
  }

  @Watch('_prefixPath')
  prefixChange(newPrefix: string[], oldPrefix: string[]) {
    this.context = {
      ...this.context,
      _prefixPath: [...this._prefixPath, ...this._relativePath()],
    };
    this.callbacksFromContext?._onPathChange?.(
      this,
      [...oldPrefix, ...this._relativePath()],
      [...newPrefix, ...this._relativePath()],
    );
  }

  // eslint-disable-next-line @stencil-community/no-unused-watch
  @Watch('name')
  nameChange(newName: string, oldName: string) {
    this.context = {
      ...this.context,
      _prefixPath: [...this._prefixPath, ...this._relativePath()],
    };
    this.callbacksFromContext._onPathChange?.(
      this,
      [...this._prefixPath, ...this._relativePath({ name: oldName })],
      [...this._prefixPath, ...this._relativePath({ name: newName })],
    );
  }

  @Consume({
    context: FormContext,
    subscribe: false,
    path: ['callbacks'],
  })
  callbacksFromContext!: FormContextValue<FormItemValue>['callbacks'];

  /**
   * @locale {en} The label text for the form item.
   * @locale {zh} 表单项的标签文本。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() label: string;
  /**
   * @locale {en} The width of the label in pixels.
   * @locale {zh} 标签的宽度，单位为像素。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() labelWidth: number;
  /**
   * @locale {en} The alignment of the label. Possible values are `left`, `right` and `center`.
   * @locale {zh} 标签的对齐方式。可选值为 `left`、`right` 和 `center`。
   */
  @Prop() labelAlign: LabelAlign = 'right';
  /**
   * @locale {en} Indicates whether to display a colon after the label. When `true`, a colon is displayed after the label.
   * @locale {zh} 指示标签后是否显示冒号。当值为 `true` 时，标签后将显示冒号。
   */
  @Prop() colon = false;
  /**
   * @locale {en} The size of the form item. Possible values are `"xs"`, `"sm"`, `"md"`, `"lg"` and `"xl"`.
   * @locale {zh} 表单项的大小。可选值为 `"xs"`、`"sm"`、`"md"`、`"lg"` 和 `"xl"`。
   */
  @Prop() size: Size = 'md';
  /**
   * @locale {en} The name of the field, which can be set as a chained property, such as:
   * - `name="user.name"`
   * - `name="name"`
   * - `name="arr[0].name"`
   * > Note: When using the chained property mode, it indicates that the field is a group, and the names of its subfields will be automatically appended to the parent field name, for example: `formModel = {user.name}`.
   * > If it is a non-chained property, the field name will be used directly, for example: `formModel = {name}`.
   * @locale {zh} 字段名，可以设置为链式属性，如：
   * - `name="user.name"`
   * - `name="name"`
   * - `name="arr[0].name"`
   * > 注意：当为链式属性模式时，证明该字段是一个组，其子字段的名称将自动添加到父字段的名称后面，如：`formModel = {user.name}`。
   * > 如果为非链式属性，则直接使用该字段的名称，如：`formModel = {name}`。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop({ attribute: 'name' }) name: NamePath;
  /**
   * @locale {en} An array of validation rules for the form field.
   * @locale {zh} 表单字段的校验规则数组。
   */
  @Prop() rules: RuleItemExpand[] = [];
  /**
   * @locale {en} Indicates whether the form field is required. When `true`, the field must be filled out.
   * @locale {zh} 指示表单字段是否为必填项。当值为 `true` 时，该字段必须填写。
   */
  @Prop() required = false;
  /**
   * @locale {en} The initial value of the form item. This value has a lower priority than the `initialValues` in `ks-form`.
   * @locale {zh} 表单项的初始值。此值的优先级低于 `ks-form` 中的 `initialValues`。
   */
  @Prop() initialValue: FormItemValue;
  /**
   * @locale {en} Used when there are dependencies between fields. If a field sets the `dependencies` property, it will automatically trigger validation when any of the dependent fields are updated.
   * A common scenario is the "Password" and "Confirm Password" fields in a user registration form.
   * @locale {zh} 当字段间存在依赖关系时使用。如果一个字段设置了 `dependencies` 属性，那么它所依赖的字段更新时，该字段将自动触发校验。
   * 一种常见的场景，就是注册用户表单的“密码”与“确认密码”字段。
   */
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  @Prop() dependencies: NamePath[];
  /**
   * @locale {en} The validation status of the form field. Possible values are `detault`, `"success"`, `"error"` and `"warning"`.
   * @locale {zh} 表单字段的校验状态。可选值为 `detault`、`"success"`、`"error"` 和 `"warning"`。
   */
  @Prop() validateStatus?: Status;
  /**
   * @locale {en} The event that triggers the form value change. Possible values are `blur` and `change`, default is `change`.
   * @locale {zh} 触发表单值改变的事件。可选值为 `blur`、`change`，默认为 `change`。
   */
  @Prop() trigger: Trigger = 'change';
  /**
   * @locale {en} The event(s) that trigger validation for the form field. Possible values are `blur` and `change`, default is `change`.
   * @locale {zh} 触发表单值改变的事件。可选值为 `blur`、`change`，默认为 `change`。
   */
  @Prop() validateTrigger: Trigger | Trigger[] = 'change';
  /**
   * @locale {en} Options to show additional information or configuration for the field.
   * @locale {zh} 显示额外信息或字段配置的选项。
   */
  @Prop() showOption = true;

  /**
   * @locale {en} The slot for customizing the label.
   * @locale {zh} 自定义标签的插槽。
   */
  @Slot({ slotname: 'label' }) labelSlot?: Slots;

  /**
   * INTERNAL FUNCTION
   * @locale {en} Collect rules for validation.
   * @locale {zh} 收集用于验证的规则。
   */
  public _collectRules(trigger: Trigger | true) {
    let rulesWithRequired: RuleItemExpand[];
    if (this.required && !this.rules.find((r) => r.required)) {
      rulesWithRequired = [{ required: true }, ...(this.rules || [])];
    } else {
      rulesWithRequired = this.rules || [];
    }

    return rulesWithRequired.filter((r) => {
      if (trigger === true) {
        return true;
      }
      const triggerFromRule = r.trigger || this.validateTrigger;
      return triggerFromRule === trigger || (Array.isArray(triggerFromRule) && triggerFromRule.includes(trigger));
    });
  }

  _disposers: Array<() => void> = [];
  _registerDependencies() {
    // register dependencies for validation
    if (Array.isArray(this.dependencies)) {
      this.dependencies.forEach((dependency) => {
        const disposer = this.callbacksFromContext._registerWatch(
          parsePath(dependency),
          (_) => {
            this.validate().catch(() => {
              /* DO NOTHING */
            });
          },
          false,
        );
        this._disposers.push(disposer);
      });
    }
  }
  _disposeDependencies() {
    this._disposers.forEach((disposer) => {
      disposer();
    });
  }

  connectedCallback(): void {
    this.__propsReady.then(() => {
      // on component connect callback
      this.callbacksFromContext?._onComponentConnect?.(this, this._relativePath());

      // register dependencies
      this._registerDependencies();
    });
  }

  disconnectedCallback(): void {
    this.callbacksFromContext._onComponentDisconnect?.(this, this._relativePath());
    this._disposeDependencies();
  }

  componentWillLoad(): Promise<void> | void {
    this.__propsReadyResolver();
    this.context = {
      ...this.context,
      _prefixPath: [...this._prefixPath, ...this._relativePath()],
      disabled: this.disabledFromContext,
      labelWidth: this.labelWidthFromContext,
      labelAlign: this.labelAlignFromContext,
      status: this.validateStatus,
    };
  }

  componentWillUpdate(): Promise<void> | void {
    this.__propsReadyResolver();
  }

  /**
   * @deprecated Please use `formRef.validate`
   * @locale {en} Validate the form field.
   * @locale {zh} 校验表单字段。
   * @param path 校验路径，为空则校验当前字段
   */
  @Method()
  async validate(path: string[] = []) {
    await this.callbacksFromContext?.onValidation([...this._relativePath(), ...path]);
  }
  /**
   * @deprecated Please use `formRef.resetValidate`
   * @locale {en} Reset the validation status of the form field.
   * @locale {zh} 重置表单字段的校验状态。
   * @param path 重置校验路径，为空则重置当前字段
   */
  @Method()
  async resetValidate(path: string[]) {
    this.callbacksFromContext?.onResetValidation([...this._relativePath(), ...path]);
  }

  render() {
    const labelAlign = this.labelAlign || this.labelAlignFromContext;
    const labelWidth = this.labelWidth || this.labelWidthFromContext;
    const showOption = this.showOption && !this.required && !this._collectRules(true).find((item) => item.required);
    return (
      <Host dir={dir()} ks-form-item>
        <div dir={dir()} class={classnames(prefix, `${prefix}--size-${this.size}`)} part="self">
          {(this.label || this.labelSlot) && (
            <label
              class={classnames(`${prefix}__label`, `${prefix}__label--align-${labelAlign}`)}
              style={{ width: `${labelWidth}px` }}
              part="label"
            >
              <slot name="label">{this.label}</slot>
              {this.colon && ':'}
              {showOption && <span class={`${prefix}__label--optional`}>{` · ${t(formMessages.optional)}`}</span>}
            </label>
          )}

          <div class={classnames(`${prefix}__control`)} part="control">
            <slot></slot>
            {(this.validateMessages.length && (
              <div class={classnames(`${prefix}__control__message`)} part="control-message">
                {this.validateMessages.map((state) => {
                  if (state.status === 'error' || state.status === 'warning') {
                    return (
                      <span
                        class={classnames(`${prefix}__control__message__text`, {
                          [`${prefix}__control__message__text--warning`]: state.status === 'warning',
                          [`${prefix}__control__message__text--error`]: state.status === 'error',
                        })}
                      >
                        <ks-status-message variant={state.status} richTextString={state.message} cta={state.cta} />
                      </span>
                    );
                  }
                })}
              </div>
            )) ||
              null}
          </div>
        </div>
      </Host>
    );
  }
}
