import { convertPX2Num } from '../utils';

describe('convertPX2Num', () => {
  describe('number input', () => {
    it('should return the same number when input is a number', () => {
      expect(convertPX2Num(100)).toBe(100);
      expect(convertPX2Num(0)).toBe(0);
      expect(convertPX2Num(-50)).toBe(-50);
      expect(convertPX2Num(3.14)).toBe(3.14);
    });

    it('should handle edge number cases', () => {
      expect(convertPX2Num(Infinity)).toBe(Infinity);
      expect(convertPX2Num(-Infinity)).toBe(-Infinity);
      expect(convertPX2Num(NaN)).toBeNaN();
    });
  });

  describe('string input with px suffix', () => {
    it('should convert px string to number', () => {
      expect(convertPX2Num('100px')).toBe(100);
      expect(convertPX2Num('0px')).toBe(0);
      expect(convertPX2Num('50.5px')).toBe(50.5);
      expect(convertPX2Num('-25px')).toBe(-25);
    });
  });

  describe('string input without px suffix', () => {
    it('should convert numeric string to number', () => {
      expect(convertPX2Num('100')).toBe(100);
      expect(convertPX2Num('0')).toBe(0);
      expect(convertPX2Num('50.5')).toBe(50.5);
      expect(convertPX2Num('-25')).toBe(-25);
    });

    it('should handle non-numeric strings', () => {
      expect(convertPX2Num('auto')).toBeNaN();
      expect(convertPX2Num('inherit')).toBeNaN();
      expect(convertPX2Num('100%')).toBeNaN();
      expect(convertPX2Num('100em')).toBeNaN();
      expect(convertPX2Num('100rem')).toBeNaN();
      expect(convertPX2Num('100vh')).toBeNaN();
      expect(convertPX2Num('100vw')).toBeNaN();
    });

    it('should handle empty and whitespace strings', () => {
      expect(convertPX2Num('')).toBe(0);
      expect(convertPX2Num(' ')).toBe(0);
      expect(convertPX2Num('\t')).toBe(0);
      expect(convertPX2Num('\n')).toBe(0);
    });
  });

  describe('edge cases and special values', () => {
    it('should handle null and undefined (with optional chaining)', () => {
      // 由于函数使用了 length?.endsWith，这些值会被转换为字符串
      expect(convertPX2Num(null as any)).toBe(0); // Number('null') = NaN, but Number(null) = 0
      expect(convertPX2Num(undefined as any)).toBe(0); // Number('undefined') = NaN
    });
  });

  describe('CSS unit variations', () => {
    it('should only handle px suffix, not other CSS units', () => {
      expect(convertPX2Num('100em')).toBeNaN();
      expect(convertPX2Num('100rem')).toBeNaN();
      expect(convertPX2Num('100%')).toBeNaN();
      expect(convertPX2Num('100vh')).toBeNaN();
      expect(convertPX2Num('100vw')).toBeNaN();
      expect(convertPX2Num('100pt')).toBeNaN();
      expect(convertPX2Num('100pc')).toBeNaN();
      expect(convertPX2Num('100in')).toBeNaN();
      expect(convertPX2Num('100cm')).toBeNaN();
      expect(convertPX2Num('100mm')).toBeNaN();
    });

    it('should handle case sensitivity', () => {
      expect(convertPX2Num('100PX')).toBeNaN(); // 大写不匹配
      expect(convertPX2Num('100Px')).toBeNaN(); // 混合大小写不匹配
      expect(convertPX2Num('100pX')).toBeNaN(); // 混合大小写不匹配
    });
  });

  describe('complex string patterns', () => {
    it('should handle strings with px in the middle', () => {
      expect(convertPX2Num('100px200')).toBeNaN(); // px 不在末尾
      expect(convertPX2Num('px100')).toBeNaN(); // px 在开头
    });

    it('should handle multiple px occurrences', () => {
      expect(convertPX2Num('100pxpx')).toBeNaN(); // 多个 px
      expect(convertPX2Num('100px px')).toBeNaN(); // px 后有空格
    });

    it('should handle scientific notation', () => {
      expect(convertPX2Num('1e2')).toBe(100);
      expect(convertPX2Num('1e2px')).toBe(100);
      expect(convertPX2Num('1.5e1px')).toBe(15);
    });
  });

  describe('performance and boundary values', () => {
    it('should handle very large numbers', () => {
      const largeNumber = Number.MAX_SAFE_INTEGER;
      expect(convertPX2Num(largeNumber)).toBe(largeNumber);
      expect(convertPX2Num(`${largeNumber}px`)).toBe(largeNumber);
    });

    it('should handle very small numbers', () => {
      const smallNumber = Number.MIN_SAFE_INTEGER;
      expect(convertPX2Num(smallNumber)).toBe(smallNumber);
      expect(convertPX2Num(`${smallNumber}px`)).toBe(smallNumber);
    });

    it('should handle decimal precision', () => {
      expect(convertPX2Num('0.1px')).toBe(0.1);
      expect(convertPX2Num('0.123456789px')).toBe(0.123456789);
      expect(convertPX2Num('1.7976931348623157e+308px')).toBe(1.7976931348623157e308);
    });
  });
});
