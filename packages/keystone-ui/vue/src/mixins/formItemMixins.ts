import { ComponentOptionsMixin } from 'vue-demi';
import { FormContextValue, FormItemValue, Status } from '@fe-infra/keystone';

type FormItemContext = FormContextValue<FormItemValue>;

export const formItemMixin: ComponentOptionsMixin = {
  inject: ['__context__'],
  data() {
    return {
      __pendingUnsubscribe: false,
    };
  },
  computed: {
    value(): FormItemValue {
      const context = this.__context__ as FormItemContext;
      return context?.value;
    },
    status(): Status | undefined {
      const context = this.__context__ as FormItemContext;
      return context?.status;
    },
  },
  methods: {
    onValueChange(value: FormItemValue) {
      const context = this.__context__ as FormItemContext;
      context?.callbacks?.onValueChange?.(value, []);
    },
    unsubscribe() {
      const context = this.__context__ as FormItemContext;
      if (context?.callbacks) {
        // context ready
        context.callbacks._unsubscribeContext?.();
      } else {
        // context not ready, mark __pendingUnsubscribe
        this.__pendingUnsubscribe = true;
      }
    },
  },
  watch: {
    __context__: {
      handler(newContext: FormItemContext) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        if (this.__pendingUnsubscribe && newContext) {
          newContext.callbacks?._unsubscribeContext?.();
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          this.__pendingUnsubscribe = false;
        }
      },
      immediate: true,
    },
  },
};
