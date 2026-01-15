import { ComponentOptionsMixin } from 'vue-demi';
import { FormContextValue, FormListValue, Status } from '@fe-infra/keystone';
import { FormListField, GeneralFormValue } from '@fe-infra/keystone/dist/types/entities';

type FormListContext = FormContextValue<FormListValue>;

export const formListMixin: ComponentOptionsMixin = {
  inject: ['__context__'],
  computed: {
    value(): FormListValue {
      const context = this.__context__ as FormListContext;
      return context?.value;
    },
    status(): Status | undefined {
      const context = this.__context__ as FormListContext;
      return context?.status;
    },
    fields(): FormListField[] {
      const context = this.__context__ as FormListContext;
      return context?.listUtils?._mapValueToFields?.(context?.value) || [];
    },
  },
  methods: {
    onValueChange(value: FormListValue) {
      const context = this.__context__ as FormListContext;
      context?.callbacks?.onValueChange?.(value, []);
    },
    add(defaultValue?: GeneralFormValue, index?: number) {
      const context = this.__context__ as FormListContext;
      context?.listUtils?.add?.(defaultValue, index);
    },
    remove(index: number) {
      const context = this.__context__ as FormListContext;
      context?.listUtils?.remove?.(index);
    },
    move(from: number, to: number) {
      const context = this.__context__ as FormListContext;
      context?.listUtils?.move?.(from, to);
    },
  },
};
