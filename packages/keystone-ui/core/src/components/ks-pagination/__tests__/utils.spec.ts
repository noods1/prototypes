import {
  getTotalPageCount,
  getPaginationWindowSize,
  getVisiblePaginationItemCount,
  getPaginationItemList,
} from '../utils';
import type { PaginationItem } from '../utils/helpers';

describe('ks-pagination utils', () => {
  describe('getTotalPageCount', () => {
    it('should calculate total pages correctly', () => {
      expect(getTotalPageCount(100, 10)).toBe(10);
      expect(getTotalPageCount(101, 10)).toBe(11);
      expect(getTotalPageCount(0, 10)).toBe(0);
    });

    it('should handle edge cases', () => {
      expect(getTotalPageCount(10, 0)).toBe(Infinity);
      expect(getTotalPageCount(-1, 10)).toBe(-0);
    });
  });

  describe('getPaginationWindowSize', () => {
    it('should calculate window size correctly', () => {
      expect(getPaginationWindowSize(1)).toBe(3); // 1 + 1 + 1
      expect(getPaginationWindowSize(2)).toBe(5); // 2 + 1 + 2
      expect(getPaginationWindowSize(0)).toBe(1); // 0 + 1 + 0
    });
  });

  describe('getVisiblePaginationItemCount', () => {
    it('should calculate visible items count correctly', () => {
      expect(getVisiblePaginationItemCount(1)).toBe(5); // window size (3) + first and last page (2)
      expect(getVisiblePaginationItemCount(2)).toBe(7); // window size (5) + first and last page (2)
    });
  });

  describe('getPaginationItemList', () => {
    const verifyPaginationItem = (results: PaginationItem[], expected: string[]) => {
      expect(results.map((item) => item.label).join(',')).toEqual(expected.join(','));
    };

    it('should return all pages when total pages is less than visible items count', () => {
      const result = getPaginationItemList({
        wrapNums: 1,
        currentPage: 1,
        totalPageCount: 3,
      });

      expect(result).toHaveLength(3);
      verifyPaginationItem(result, ['1', '2', '3']);
    });

    it('should show ellipsis when there are gaps', () => {
      const result = getPaginationItemList({
        wrapNums: 2,
        currentPage: 5,
        totalPageCount: 10,
      });

      verifyPaginationItem(result, ['1', '...', '3', '4', '5', '6', '7', '...', '10']);
    });

    it('should handle current page at the start', () => {
      const result = getPaginationItemList({
        wrapNums: 1,
        currentPage: 1,
        totalPageCount: 10,
      });

      verifyPaginationItem(result, ['1', '2', '3', '...', '10']);
    });

    it('should handle current page near the start', () => {
      const result = getPaginationItemList({
        wrapNums: 1,
        currentPage: 3,
        totalPageCount: 10,
      });

      verifyPaginationItem(result, ['1', '2', '3', '4', '...', '10']);
    });

    it('should handle current page at the end', () => {
      const result = getPaginationItemList({
        wrapNums: 2,
        currentPage: 10,
        totalPageCount: 10,
      });

      verifyPaginationItem(result, ['1', '...', '8', '9', '10']);
    });

    it('should handle large page numbers', () => {
      const result = getPaginationItemList({
        wrapNums: 2,
        currentPage: 50,
        totalPageCount: 100,
      });

      verifyPaginationItem(result, ['1', '...', '48', '49', '50', '51', '52', '...', '100']);
    });
  });
});
