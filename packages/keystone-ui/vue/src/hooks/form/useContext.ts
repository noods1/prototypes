import { inject } from 'vue-demi';

export const useContext = <T>() => {
  const context = inject<T>('__context__');
  if (!context) {
    throw new Error('useFormContext must be used within a component provided with FormContext');
  }
  return context;
};
