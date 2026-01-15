import { useContext, useEffect, useState } from 'react';
import { FormContextValue } from '@fe-infra/keystone';
import { Context } from '@byted-keystone/react-output-target/runtime';
import type { GeneralFormValue, FormValue } from '@fe-infra/keystone/dist/types/entities';

/**
 * @locale {en} Watch for changes to a field in the form and update the view.
 * If the form parameter is passed, it must be a stable reference to a form component instance,
 * otherwise the watch may not work properly.
 *
 * @locale {zh} 监听表单中某个字段的变化，并更新视图。
 * 如果传递了form参数，它必须是form组件实例的一个稳定引用，
 * 否则监听可能无法正常工作。
 *
 * @param path 监听的字段路径
 * @param form 表单实例
 * @returns 监听的字段值
 */
export const useWatch = <T extends GeneralFormValue>(
  path: string[] | string,
  form?: React.RefObject<HTMLKsFormElement>,
) => {
  if (!form) {
    const { callbacks } = useContext<FormContextValue<FormValue>>(
      Context as React.Context<FormContextValue<FormValue>>,
    );

    const [value, setValue] = useState<T>();

    useEffect(() => {
      if (!callbacks) {
        return;
      } else if (!callbacks._registerWatch) {
        return;
      } else {
        const cancelRegister = callbacks._registerWatch(path, (value) => {
          setValue(value as T);
        });
        return cancelRegister;
      }
    }, [callbacks, path]);

    return value;
  } else {
    const [value, setValue] = useState<T>();

    useEffect(() => {
      if (!form.current) {
        return;
      }
      const cancelRegister = ((form.current as any).context as FormContextValue<FormValue>).callbacks._registerWatch(
        path,
        (value) => {
          setValue(value as T);
        },
      );
      return cancelRegister;
    }, [form.current, path]);

    return value;
  }
};
