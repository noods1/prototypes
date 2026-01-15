// @ts-nocheck
import {
  mountFunctionOnClick,
  getSubmitBtns,
  getResetBtns,
  getReconciledFormContextData,
  move,
  parsePath,
  immutableSet,
  getAllPaths,
} from './utils';

describe('form utils', () => {
  describe('mountFunctionOnClick', () => {
    it('should add click event listeners to elements', () => {
      // 创建测试元素
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      const elements = [element1, element2];

      // 创建间谍函数
      const clickHandler = jest.fn();
      const stopPropagationSpy = jest.spyOn(Event.prototype, 'stopPropagation');

      // 调用被测试函数
      mountFunctionOnClick(elements, clickHandler);

      // 模拟点击事件
      const event = new Event('click');
      element1.dispatchEvent(event);

      // 验证结果
      expect(stopPropagationSpy).toHaveBeenCalled();
      expect(clickHandler).toHaveBeenCalledWith(event);

      // 清理
      stopPropagationSpy.mockRestore();
    });
  });

  describe('getSubmitBtns', () => {
    it('should return buttons with submit attribute', () => {
      // 创建测试 DOM
      const form = document.createElement('form');

      const submitBtn1 = document.createElement('button');
      submitBtn1['ks-name'] = 'ks-button';
      submitBtn1.setAttribute('html-type', 'submit');
      form.appendChild(submitBtn1);

      const submitBtn2 = document.createElement('button');
      submitBtn2['ks-name'] = 'ks-button';
      (submitBtn2 as any).htmlType = 'submit';
      form.appendChild(submitBtn2);

      const resetBtn = document.createElement('button');
      resetBtn['ks-name'] = 'ks-button';
      resetBtn.setAttribute('html-type', 'reset');
      form.appendChild(resetBtn);

      const normalBtn = document.createElement('button');
      normalBtn['ks-name'] = 'ks-button';
      form.appendChild(normalBtn);

      // 调用被测试函数
      const result = getSubmitBtns(form);

      // 验证结果
      expect(result).toHaveLength(2);
      expect(result).toContain(submitBtn1);
      expect(result).toContain(submitBtn2);
      expect(result).not.toContain(resetBtn);
      expect(result).not.toContain(normalBtn);
    });
  });

  describe('getResetBtns', () => {
    it('should return buttons with reset attribute', () => {
      // 创建测试 DOM
      const form = document.createElement('form');

      const resetBtn1 = document.createElement('button');
      resetBtn1['ks-name'] = 'ks-button';
      resetBtn1.setAttribute('html-type', 'reset');
      form.appendChild(resetBtn1);

      const resetBtn2 = document.createElement('button');
      resetBtn2['ks-name'] = 'ks-button';
      (resetBtn2 as any).htmlType = 'reset';
      form.appendChild(resetBtn2);

      const submitBtn = document.createElement('button');
      submitBtn['ks-name'] = 'ks-button';
      submitBtn.setAttribute('html-type', 'submit');
      form.appendChild(submitBtn);

      const normalBtn = document.createElement('button');
      normalBtn['ks-name'] = 'ks-button';
      form.appendChild(normalBtn);

      // 调用被测试函数
      const result = getResetBtns(form);

      // 验证结果
      expect(result).toHaveLength(2);
      expect(result).toContain(resetBtn1);
      expect(result).toContain(resetBtn2);
      expect(result).not.toContain(submitBtn);
      expect(result).not.toContain(normalBtn);
    });
  });

  describe('getReconciledFormContextData', () => {
    it('should return correct values for formItem provider', () => {
      const node = {
        _provider: 'formItem' as const,
        disabled: true,
        disabledFromContext: false,
        status: 'error' as const,
        statusFromContext: 'warning' as const,
      };

      const result = getReconciledFormContextData(node);

      expect(result).toEqual({
        disabled: true,
        status: 'error',
      });
    });

    it('should use context values when local values are undefined for formItem', () => {
      const node = {
        _provider: 'formItem' as const,
        disabledFromContext: true,
        statusFromContext: 'warning' as const,
      };

      const result = getReconciledFormContextData(node);

      expect(result).toEqual({
        disabled: true,
        status: 'warning',
      });
    });

    it('should handle non-formItem providers', () => {
      const node = {
        _provider: 'formList' as const,
        disabled: undefined,
        disabledFromContext: true,
        status: undefined,
        statusFromContext: 'warning' as const,
      };

      const result = getReconciledFormContextData(node);

      expect(result).toEqual({
        disabled: true,
        status: 'warning',
      });
    });
  });

  describe('move', () => {
    it('should move an item from one position to another (left)', () => {
      const array = [1, 2, 3, 4, 5];
      const result = move(array, 3, 1);

      expect(result).toEqual([1, 4, 2, 3, 5]);
      // 原数组不变
      expect(array).toEqual([1, 2, 3, 4, 5]);
    });

    it('should move an item from one position to another (right)', () => {
      const array = [1, 2, 3, 4, 5];
      const result = move(array, 1, 3);

      expect(result).toEqual([1, 3, 4, 2, 5]);
    });

    it('should return the original array if indices are the same', () => {
      const array = [1, 2, 3, 4, 5];
      const result = move(array, 2, 2);

      expect(result).toBe(array); // 应该是同一个引用
    });

    it('should return the original array if indices are out of bounds', () => {
      const array = [1, 2, 3, 4, 5];

      expect(move(array, -1, 2)).toBe(array);
      expect(move(array, 5, 2)).toBe(array);
      expect(move(array, 2, -1)).toBe(array);
      expect(move(array, 2, 5)).toBe(array);
    });
  });

  describe('parsePath', () => {
    it('should parse simple path', () => {
      expect(parsePath('a.b.c')).toEqual(['a', 'b', 'c']);
    });

    it('should parse path with array indices', () => {
      expect(parsePath('a[0].b[1].c')).toEqual(['a', '0', 'b', '1', 'c']);
    });

    it('should parse path with mixed notation', () => {
      expect(parsePath('a.b[0].c.d[1][2]')).toEqual(['a', 'b', '0', 'c', 'd', '1', '2']);
    });

    it('should handle edge cases', () => {
      expect(parsePath('')).toEqual([]);
      expect(parsePath('a')).toEqual(['a']);
      expect(parsePath('[0]')).toEqual(['0']);
    });
  });

  describe('immutableSet', () => {
    it('should set a value at a simple path', () => {
      const obj = { a: { b: { c: 1 } } };
      const result = immutableSet(obj, 'a.b.c', 2);

      expect(result).not.toBe(obj); // 不是同一个引用
      expect(result.a.b.c).toBe(2);
      expect(obj.a.b.c).toBe(1); // 原对象不变
    });

    it('should set a value at a path with array indices', () => {
      const obj = { a: [{ b: 1 }, { b: 2 }] };
      const result = immutableSet(obj, 'a[1].b', 3);

      expect(result).not.toBe(obj);
      expect(result.a[1].b).toBe(3);
      expect(obj.a[1].b).toBe(2); // 原对象不变
    });

    it('should handle array path', () => {
      const obj = { a: { b: { c: 1 } } };
      const result = immutableSet(obj, ['a', 'b', 'c'], 2);

      expect(result.a.b.c).toBe(2);
    });

    it('should throw error for non-object values', () => {
      expect(() => immutableSet(123, 'a.b', 1)).toThrow();
    });

    it('should return the value to set if path is empty', () => {
      expect(immutableSet({}, [], 'value')).toBe('value');
    });

    it('should use defaultValue when originalValue is undefined', () => {
      const result = immutableSet(undefined, 'a.b', 1, {});
      expect(result).toEqual({ a: { b: 1 } });
    });

    it('should create a new array copy when originalValue is an array', () => {
      const originalArray = [1, 2, 3];
      const result = immutableSet(originalArray, '0', 4);

      expect(result).not.toBe(originalArray); // should be a new array
      expect(result).toEqual([4, 2, 3]);
      expect(originalArray).toEqual([1, 2, 3]); // original array unchanged
    });

    it('should handle array with object elements', () => {
      const originalArray = [{ a: 1 }, { b: 2 }];
      const result = immutableSet(originalArray, '1.b', 3);

      expect(result).not.toBe(originalArray);
      expect(result[1].b).toBe(3);
      expect(originalArray[1].b).toBe(2); // original array unchanged
    });
  });

  describe('getAllPaths', () => {
    it('should get all paths in an object', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: [3, 4],
        },
      };

      const paths = getAllPaths(obj);

      expect(paths).toContainEqual(['a']);
      expect(paths).toContainEqual(['b']);
      expect(paths).toContainEqual(['b', 'c']);
      expect(paths).toContainEqual(['b', 'd']);
      expect(paths).toContainEqual(['b', 'd', '0']);
      expect(paths).toContainEqual(['b', 'd', '1']);
    });

    it('should exclude paths matching the regex', () => {
      const obj = {
        a: 1,
        _private: 2,
        b: [1, 2, 3],
      };

      const paths = getAllPaths(obj, /^_/);

      expect(paths).toContainEqual(['a']);
      expect(paths).toContainEqual(['b']);
      expect(paths).toContainEqual(['b', '0']);
      expect(paths).toContainEqual(['b', '1']);
      expect(paths).toContainEqual(['b', '2']);
      expect(paths).not.toContainEqual(['_private']);
    });

    it('should exclude array indices matching the regex', () => {
      const obj = {
        a: [10, 20, 30, 40, 50],
      };

      // 排除索引为偶数的数组元素
      const paths = getAllPaths(obj, /^[02]$/);

      expect(paths).toContainEqual(['a']);
      expect(paths).not.toContainEqual(['a', '0']); // 排除索引 0
      expect(paths).toContainEqual(['a', '1']);
      expect(paths).not.toContainEqual(['a', '2']); // 排除索引 2
      expect(paths).toContainEqual(['a', '3']);
      expect(paths).toContainEqual(['a', '4']);
    });

    it('should handle empty objects', () => {
      expect(getAllPaths({})).toEqual([]);
    });

    it('should handle null and primitive values', () => {
      expect(getAllPaths(null)).toEqual([]);
    });
  });
});
