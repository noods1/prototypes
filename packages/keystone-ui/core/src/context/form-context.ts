import { createContext } from '@src/libs/runtime-context';
import {
  FormItemValue,
  FormListField,
  FormListValue,
  GeneralFormValue,
  Status,
  ValidationStates,
  WatchCallBack,
} from '@src/entities';
import type { KsFormItem } from '@src/components/ks-form-item';
import type { KsFormList } from '@src/components/ks-form-list';

export interface FormListUtils {
  /**
   * @locale {en} Add a new item to the form list.
   * @locale {zh} 向表单列表添加新项。
   * @param defaultValue 新增的默认值
   * @param index 新增的位置
   * @returns void
   */
  add: (defaultValue?: GeneralFormValue, index?: number) => void;
  /**
   * @locale {en} Remove items from the form list.
   * @locale {zh} 从表单列表中移除项。
   * @param index 移除的项的索引
   * @returns void
   */
  remove: (index: number | number[]) => void;
  /**
   * @locale {en} Move items in the form list.
   * @locale {zh} 移动表单列表中的项。
   * @param from 要移动的项的索引
   * @param to 目标位置的索引
   * @returns void
   */
  move: (from: number, to: number) => void;
  /**
   * @locale {en} Map the value of the form list to the fields of the form.
   * @locale {zh} 将表单列表的值映射到表单的字段。
   * @param value 表单列表值
   * @returns FormListField[]
   */
  _mapValueToFields: (value: FormListValue) => FormListField[];
}

export interface FormContextValue<
  T extends GeneralFormValue = GeneralFormValue,
  E extends KsFormItem | KsFormList = KsFormItem | KsFormList,
> {
  _provider?: E extends KsFormItem ? 'formItem' : E extends KsFormList ? 'formList' : 'form';
  /**
   * @locale {en} The prefix path of the form.
   * @locale {zh} 表单的前缀路径。
   */
  _prefixPath: string[];
  /**
   * @locale {en} Whether the form is disabled.
   * @locale {zh} 表单是否禁用。
   */
  disabled?: boolean;
  /**
   * @locale {en} The validation status of the form.
   * @locale {zh} 表单的校验状态。
   */
  status?: Status;
  /**
   * @locale {en} The width px of the label in the form.
   * @locale {zh} 表单标签的像素宽度。
   */
  labelWidth?: number;
  /**
   * @locale {en} The label alignment of the form.
   * @locale {zh} 表单标签的对齐方式。
   */
  labelAlign?: 'left' | 'right';
  /**
   * @locale {en} The value of the form.
   * @locale {zh} 表单的值。
   */
  value: T;
  /**
   * @locale {en} The validation status of the form.
   * @locale {zh} 表单的校验状态。
   */
  validationStates: ValidationStates;
  /**
   * @locale {en} callback functions for child components.
   * @locale {zh} 提供给子组件的回调函数。
   */
  callbacks: {
    /**
     * @locale {en} The callback function that is called when the form value changes.
     * @locale {zh} 表单值变化时调用的回调函数。
     * @param value 表单值
     * @param valuePath 表单值路径
     * @param originalPath 触发值变化的原始路径
     */
    onValueChange: (value: T, path: string[], originalPath?: string[]) => void;
    /**
     * @locale {en} The callback function that is called when the form child blur.
     * @locale {zh} 表单子组件 blur 时调用的回调函数。
     * @param originalPath 触发 blur 的原始路径
     */
    onBlur: (originalPath?: string[]) => void;
    /**
     * @locale {en} The callback function that is called when the form is validated.
     * @locale {zh} 表单校验时调用的回调函数。
     * @param path 表单值路径
     */
    onValidation: (path?: string[]) => Promise<void>;
    /**
     * @locale {en} The callback function that is called when the validation status of the form changes.
     * @locale {zh} 表单校验状态变化时调用的回调函数。
     */
    _onValidationStatesChange: (validationStates: ValidationStates, path?: string[]) => void;
    /**
     * @locale {en} Reset the validation status of the form.
     * @locale {zh} 重置表单的验证状态。
     * @param path 清空校验路径
     * @returns void
     */
    onResetValidation: (path?: string[]) => void;
    /**
     * @locale {en} The callback function that is called when the child component is connected.
     * @locale {zh} 子组件连接时调用的回调函数。
     * @param instance 子组件实例
     * @returns void
     */
    _onComponentConnect: (instance: E, path?: string[]) => void;
    /**
     * @locale {en} The callback function that is called when the child component is disconnected.
     * @locale {zh} 子组件断开连接时调用的回调函数。
     * @param instance 子组件实例
     * @returns void
     */
    _onComponentDisconnect: (instance: E, path?: string[]) => void;
    /**
     * @locale {en} The callback function that is called when the path of the child component changes.
     * @locale {zh} 子组件路径变化时调用的回调函数。
     */
    _onPathChange: (instance: E, pathFrom: string[], pathTo: string[]) => void;
    /**
     * @locale {en} The callback function that is called when the child component is unsubscribed.
     * @locale {zh} 子组件主动触发取消订阅的函数。
     * @returns void
     */
    _onComponentUnsubscribe?: () => void;
    /**
     * @locale {en} Register watch callback.
     * @locale {zh} 注册监听回调。
     */
    _registerWatch: (path: string[] | string, callback: WatchCallBack, shouldCallImmediately?: boolean) => () => void;
    /**
     * @locale {en} Unsubscribe context.
     * @locale {zh} 取消订阅上下文。
     */
    _unsubscribeContext?: T extends FormItemValue ? () => void : never;
  };
  /**
   * @locale {en} Utilities for form list operations.
   * @locale {zh} 表单列表操作的工具函数。
   */
  listUtils?: T extends FormListValue ? FormListUtils : never;
}

export const FormContext = createContext<FormContextValue>('form-context');
