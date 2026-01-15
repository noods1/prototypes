import { computed, reactive, Ref, ref, watch } from 'vue-demi';
import { useContext } from './useContext';
import type { FormContextValue, FormItemValue } from '@fe-infra/keystone';

export const useFormItemContext = <T extends FormItemValue>() => {
  const context = useContext<Ref<FormContextValue<T>>>();
  const pendingUnsubscribe = ref(false);

  if (!context || context.value?._provider !== 'formItem') {
    console.warn(
      'Cannot find FormItemContext. Please make sure you are using this composable under a FormItem component.',
    );
  }

  watch(
    () => context.value?.callbacks,
    (newCallbacks) => {
      if (pendingUnsubscribe.value && newCallbacks) {
        newCallbacks._unsubscribeContext?.();
        pendingUnsubscribe.value = false;
      }
    },
    { deep: true, immediate: true },
  );

  return reactive({
    value: computed(() => context.value?.value),
    status: computed(() => context.value?.status),

    onValueChange: (newValue: T) => {
      context.value?.callbacks?.onValueChange?.(newValue, []);
    },
    unsubscribe: () => {
      if (context.value?.callbacks) {
        context.value.callbacks._unsubscribeContext?.();
      } else {
        pendingUnsubscribe.value = true;
      }
    },
  });
};
