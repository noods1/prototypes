import { computed, reactive, Ref } from 'vue-demi';
import { useContext } from './useContext';
import type { FormContextValue, FormListValue } from '@fe-infra/keystone';

export const useFormListContext = <T extends FormListValue>() => {
  const context = useContext<Ref<FormContextValue<T>>>();

  if (!context || context.value?._provider !== 'formList') {
    console.warn(
      'Cannot find FormItemContext. Please make sure you are using this composable under a FormItem component.',
    );
  }

  return reactive({
    value: computed(() => context?.value?.value),
    onValueChange: (newValue: T) => {
      context.value?.callbacks?.onValueChange?.(newValue, []);
    },
    status: computed(() => context?.value?.status),
    // `fields` is derived from `value`, so `computed` is ideal here.
    // It will automatically update when `context.value` changes.
    fields: computed(() => context.value?.listUtils?._mapValueToFields?.(context.value?.value)),
    add: computed(() => context.value?.listUtils?.add),
    remove: computed(() => context.value?.listUtils?.remove),
    move: computed(() => context.value?.listUtils?.move),
  });
};
