import { Branded } from './type-utils';

// @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
const basicCompareFn = (valA: unknown, valB: unknown) => (valA > valB ? 1 : valA < valB ? -1 : 0);

type NumericString = Branded<string, 'NumericString'>;
// Empty and whitespace-only string is considered as `0`
const isNumericString = (val: unknown): val is NumericString => typeof val === 'string' && !Number.isNaN(Number(val));
// Numeric strings are commonly used to avoid precision loss.
// We should compare them without converting to numbers to preserve accuracy.
const numericStringCompareFn = (valA: NumericString, valB: NumericString) => {
  const [integerPartOfA, fractionPartOfA = ''] = valA.split('.');
  const [integerPartOfB, fractionPartOfB = ''] = valB.split('.');

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  const integerPartCompareResult = basicCompareFn(BigInt(integerPartOfA), BigInt(integerPartOfB));

  if (integerPartCompareResult !== 0) {
    return integerPartCompareResult;
  } else {
    return basicCompareFn(BigInt(fractionPartOfA), BigInt(fractionPartOfB));
  }
};

export const defaultCompareFn = (valA: unknown, valB: unknown): 1 | -1 | 0 => {
  if (isNumericString(valA) && isNumericString(valB)) {
    return numericStringCompareFn(valA, valB);
  }

  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  return valA > valB ? 1 : valA < valB ? -1 : 0;
};
