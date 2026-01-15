import { Context } from '@byted-keystone/react-output-target/runtime';
import { FormContextValue } from '@fe-infra/keystone';
import { FormItemValue, GeneralFormValue } from '@fe-infra/keystone/dist/types/entities';
import { useCallback, useContext, useMemo } from 'react';

export const useFormItemContext = <T extends FormItemValue>() => {
  const { _provider, value, callbacks, status } = useContext<FormContextValue<T>>(
    Context as React.Context<FormContextValue<T>>,
  );

  if (_provider !== 'formItem') {
    // throw new Error(
    //   'Cannot find FormItemContext. Please make sure you are using FormItemContext under FormItem'
    // );
  }
  const onValueChange = useCallback(
    (value: T) => {
      callbacks?.onValueChange?.(value, []);
    },
    [callbacks],
  );

  return {
    value: value as T,
    onValueChange,
    status,
    unsubscribe: callbacks?._unsubscribeContext,
  };
};

export const useFormListContext = <T extends GeneralFormValue>() => {
  const { _provider, value, callbacks, listUtils, status } = useContext<FormContextValue<T[]>>(
    Context as React.Context<FormContextValue<T[]>>,
  );

  if (_provider !== 'formList') {
    // throw new Error(
    //   'Cannot find FormListContext. Please make sure you are using FormListContext under FormList'
    // );
  }
  const { add, remove, move, _mapValueToFields } = listUtils || {};

  const fields = useMemo(() => _mapValueToFields?.(value), [value, _mapValueToFields]);

  const onValueChange = useCallback(
    (value: T[]) => {
      callbacks?.onValueChange?.(value, []);
    },
    [callbacks],
  );

  return {
    value,
    onValueChange,
    status,
    fields,
    add,
    remove,
    move,
  };
};
