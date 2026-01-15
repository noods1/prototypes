import {
  getPaginationItem,
  getPaginationPlaceholder,
  getPaginationIntervalItemList,
  type PaginationItem,
} from './helpers';

export const getTotalPageCount = (total: number, pageSize: number) => Math.ceil(total / pageSize);
export const getPaginationWindowSize = (wrapNums: number) => wrapNums * 2 + 1;
export const getVisiblePaginationItemCount = (wrapNums: number) => getPaginationWindowSize(wrapNums) + 2;

/**
 * Generates a list of pagination items with ellipsis for large page ranges.
 * The function creates a pagination list that shows:
 * - First page
 * - Last page
 * - A window of pages around the current page
 * - Ellipsis (...) when there are gaps in the sequence
 *
 * @param visiblePagesAroundCurrent - Number of pages to show on each side of the current page
 * @param totalPages - Total number of pages
 * @param currentPage - Current active page (1-based)
 * @returns Array of pagination items including numbers and ellipsis
 */
export const getPaginationItemList = ({
  wrapNums: visiblePagesAroundCurrent,
  currentPage,
  totalPageCount,
}: {
  wrapNums: number;
  currentPage: number;
  totalPageCount: number;
}): PaginationItem[] => {
  const windowSize = getPaginationWindowSize(visiblePagesAroundCurrent);
  const visibleItemCount = getVisiblePaginationItemCount(visiblePagesAroundCurrent);

  // If total pages is small, show all pages
  if (totalPageCount <= visibleItemCount) {
    return getPaginationIntervalItemList(1, totalPageCount);
  }

  const paginationItemList: PaginationItem[] = [];
  const windowStart = Math.max(currentPage - visiblePagesAroundCurrent, 1);
  const windowEnd = Math.min(windowStart + windowSize - 1, totalPageCount);

  // Add first page if it's not in the current window
  if (windowStart > 1) {
    paginationItemList.push(getPaginationItem(1));
  }

  // Add ellipsis if there's a gap after first page
  if (windowStart > 2) {
    paginationItemList.push(getPaginationPlaceholder(windowStart - 1));
  }

  // Add pages in the current window
  paginationItemList.push(...getPaginationIntervalItemList(windowStart, windowEnd));

  // Add ellipsis if there's a gap before last page
  if (windowEnd < totalPageCount - 1) {
    paginationItemList.push(getPaginationPlaceholder(windowEnd + 1));
  }

  // Add last page if it's not in the current window
  if (windowEnd < totalPageCount) {
    paginationItemList.push(getPaginationItem(totalPageCount));
  }

  return paginationItemList;
};
