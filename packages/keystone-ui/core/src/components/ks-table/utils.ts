import { groupBy } from 'lodash-es';
import { defaultCompareFn } from '@src/utils/sort';
import type { IKsTableColumn } from '@src/entities';

export const getSortedDataSource = (dataSource: object[], columns: IKsTableColumn[]): object[] => {
  // currently only support one column to sort, so take the first sortOrder
  const columnToSort = columns.find((col) => col.sorter && col.sortOrder && col.dataIndex && col.sorter !== 'manual');

  if (!columnToSort) {
    return dataSource;
  }

  const { dataIndex, sortOrder, sorter } = columnToSort;

  const sortedData = [...dataSource].sort((rowA, rowB) => {
    let result = 0;
    if (typeof sorter === 'function') {
      result = sorter(rowA, rowB);
    } else if (dataIndex) {
      result = defaultCompareFn(rowA[dataIndex as keyof typeof rowA], rowB[dataIndex as keyof typeof rowB]);
    }
    return sortOrder === 'ascend' ? result : -result;
  });

  return sortedData;
};

export const getGroupedDataSource = (dataSource: object[], grouping: string[], columns: IKsTableColumn[]) => {
  if (grouping.length === 0) {
    return getSortedDataSource(dataSource, columns).map((row) => ({ type: 'data', data: row }));
  }

  const groupedData = groupBy(dataSource, (row) =>
    grouping.map((groupKey) => row[groupKey as keyof typeof row]).join('-'),
  );

  const result = [];
  for (const groupKey in groupedData) {
    const rows = groupedData[groupKey];
    const groupColumn = columns.find((c) => c.key === grouping[0]);
    result.push({
      type: 'group',
      groupKey,
      data: rows,
      groupColumn,
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      value: rows[0][groupColumn.dataIndex],
    });

    const sortedRows = getSortedDataSource(rows || [], columns);
    sortedRows.forEach((row) => result.push({ type: 'data', data: row }));
  }
  return result;
};
