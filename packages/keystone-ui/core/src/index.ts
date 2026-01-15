import { ErrorField } from './entities';

// Components
export * from './components';
export type * from './context/form-context';
export { toast, type ToastConfig } from './components/ks-toast/toast';
export { modal, type ModalConfig } from './components/ks-modal/modal';
// Utils
export { dir } from './utils/utils';
export { TreeMap } from './utils/tree/treeMap';
export { setGlobalConfig } from './utils/globalConfig';
export { BaseToast, type BaseToastConfig, type ToastItem } from './utils/toast';
export { BaseModal, type BaseModalConfig, type ModalItem } from './utils/modal';
// Types
export type * as Entities from './entities';
// External
export { ks } from '@fe-infra/keystone-design-tokens';
export { isSupportedLocale } from '@fe-infra/keystone-locales';

declare module './components' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Components {
    interface KsForm {
      /**
       * @locale {en} Retrieves the values for a set of field names, returning them in the corresponding structure. By default, it returns the current field values. Calling `getFieldsValue()` will return all values.
       * @locale {zh} 获取一组字段名对应的值，按照对应结构返回。默认返回现存字段值，当调用 `getFieldsValue()` 时返回所有值。
       * @param names 要获取值的字段名数组。
       */
      getFieldsValueSync: <T>(names?: Array<string | string[]>) => T;
      /**
       * @locale {en} Retrieves the value of a specific field in the form.
       * @locale {zh} 获取表单中特定字段的值。
       * @param name 要获取值的字段名数组。
       * @returns 字段值数组。
       */
      getFieldValueSync: <T>(name: string | string[]) => T;
      /**
       * @locale {en} Retrieves the instance of a specific field in the form.
       * @locale {zh} 获取表单中特定字段的实例。
       * @param name 要获取实例的字段名称。
       */
      getFieldInstanceSync: (name: string | string[]) => HTMLKsFormItemElement | HTMLKsFormListElement;
      /**
       * @locale {en} Retrieves the error for a specific field in the form.
       * @locale {zh} 获取表单中特定字段的错误。
       * @param name 要获取错误的字段名称。
       */
      getFieldErrorSync: (name: string | string[]) => string[];
      /**
       * @locale {en} Retrieves an array of errors for all fields in the form.
       * @locale {zh} 获取表单中所有字段的错误数组。
       * @param names 要获取错误的字段名称数组。
       */
      getFieldsErrorSync: (names: Array<string | string[]>) => {
        name: string[];
        errors: string[];
      }[];

      //////////////////// DEPRECATED FUNCTIONS ////////////////////
      /**
       * @deprecated use `resetFields` instead
       * @locale {en} Resets all fields in the form to their initial values.
       * @locale {zh} 将表单中的所有字段重置为初始值。
       */
      _resetFields: (fields?: string[]) => void;
      /**
       * @deprecated use `scrollToField` instead
       * @locale {en} Scrolls the form to the specified field.
       * @locale {zh} 将表单滚动到指定字段。
       */
      _scrollToField: (name: string) => void;
      /**
       * @deprecated use `setFieldValue` instead
       * @locale {en} Sets the value of a specific field in the form.
       * @locale {zh} 设置表单中特定字段的值。
       */
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      _setFieldValue: (name: string, value, validate?: boolean) => void;
      /**
       * @deprecated use `setFieldsValue` instead
       * @locale {en} Sets the values for specific fields in the form.
       * @locale {zh} 设置表单中特定字段的值。
       */
      _setFieldsValue: (values: Record<string, unknown>) => void;
      /**
       * @deprecated use `submit` instead
       * @locale {en} Submits the form, triggering validation and then processing the submission.
       * @locale {zh} 提交表单，触发验证并处理提交。
       */
      _submit: () => void;
      /**
       * @deprecated use `validateFields` instead
       * @locale {en} Validates all fields in the form and returns a promise that resolves if valid.
       * @locale {zh} 验证表单中的所有字段，并返回一个在有效时解析的 Promise。
       */
      _validateFields: () => FormData | { values: FormData; errorFields: ErrorField[] }[];
      /**
       * @deprecated use `useWatch` from `@fe-infra/keystone-react` instead
       * @locale {en} watch the form field change and execute the callback function
       * @locale {zh} watch 表单字段变化,并执行回调函数
       */
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      useWatch: (name: string, cb: (value) => void) => void;
    }
  }
}
