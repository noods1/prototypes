import { FormContext, FormContextValue } from '@src/context/form-context';
import { FormItemValue } from '@src/entities';
import { Consume, Provide } from '@src/libs/runtime-context';
import { ComponentInterface, Listen, State } from '@stencil/core';

export abstract class FormBaseComponent<T extends FormItemValue> implements ComponentInterface {
  abstract ['ks-name']: string;

  connectedCallback?(): void;
  /**
   * @locale {en} Used to block subcomponents from getting the form context
   * @locale {zh} 用于阻止子组件获取到表单上下文
   */
  @Provide({
    context: FormContext,
  })
  __contextBlocker: undefined;

  @Consume({
    context: FormContext,
    subscribe: true,
    path: ['_provider'],
  })
  _provider: FormContextValue<T>['_provider'];
  @Consume({
    context: FormContext,
    path: ['callbacks'],
  })
  callbacksFromContext?: FormContextValue<T>['callbacks'];
  // prettier-ignore
  @Consume({
    context: FormContext,
    subscribe: true,
    path: ['value'],
  })
  @State() valueFromContext?: FormContextValue<T>['value'];
  // prettier-ignore
  @Consume({
    context: FormContext,
    subscribe: true,
    path: ['status'],
  })
  @State() statusFromContext: FormContextValue<T>['status'];
  // prettier-ignore
  @Consume({
    context: FormContext,
    subscribe: true,
    path: ['disabled'],
  })
  @State() disabledFromContext: FormContextValue<T>['disabled'];

  @Listen('ksChange')
  onKsChangeForForm({ detail }: { detail: T & { _isDetailArgs?: boolean } }) {
    if (this._provider === 'formItem') {
      if (detail?._isDetailArgs) {
        const [value] = (detail || []) as unknown as [T];
        this.callbacksFromContext?.onValueChange?.(value as T, []);
      } else {
        this.callbacksFromContext?.onValueChange?.(detail, []);
      }
    }
  }

  @Listen('ksBlur')
  onKsBlurForForm() {
    this.callbacksFromContext?.onBlur?.();
  }
}
