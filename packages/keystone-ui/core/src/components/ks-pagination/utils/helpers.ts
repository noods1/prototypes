export interface PaginationItem {
  label: string;
  value: number;
}

export const getPaginationItem = (value: number, label?: string): PaginationItem => ({
  value,
  label: label || `${value}`,
});
export const getPaginationPlaceholder = (value: number): PaginationItem => getPaginationItem(value, '...');
export const getPaginationIntervalItemList = (start: number, end: number): PaginationItem[] => {
  const items: PaginationItem[] = [];
  for (let i = start; i <= end; i++) {
    items.push(getPaginationItem(i));
  }
  return items;
};
