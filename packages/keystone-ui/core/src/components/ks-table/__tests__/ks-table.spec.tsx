import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsTable } from '../';
import { KsCheckbox } from '@src/components/ks-checkbox';
import { KsButton } from '@src/components/ks-button';
import { KsEmptyStates } from '@src/components/ks-empty-states';

// Mock data for testing
const mockColumns = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age',
    sorter: true,
    sortOrder: null,
  },
  {
    key: 'address',
    title: 'Address',
    dataIndex: 'address',
    width: 200,
    fixed: true,
  },
];

const mockData = [
  { name: 'John', age: 30, address: 'New York' },
  { name: 'Jane', age: 25, address: 'Los Angeles' },
  { name: 'Doe', age: 35, address: 'Chicago' },
];

describe('ks-table component', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [KsTable, KsEmptyStates],
      template: () => <ks-table columns={mockColumns} dataSource={mockData} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const table = page.root.shadowRoot.querySelector('table');
    expect(table).not.toBeNull();
    expect(table).toHaveClass('ks-table--md');
  });

  it('should apply correct size and border classes', async () => {
    const page = await newSpecPage({
      components: [KsTable],
      template: () => <ks-table size="sm" border="allSides" columns={mockColumns} dataSource={mockData} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const table = page.root.shadowRoot.querySelector('table');
    expect(table).toHaveClass('ks-table--sm');
    expect(table).toHaveClass('ks-table-allSides-bordered');
  });

  it('should display loading skeletons when loading is true', async () => {
    const page = await newSpecPage({
      components: [KsTable],
      template: () => (
        <ks-table loading estimatedCount={3} estimatedRowHeight={40} columns={mockColumns} dataSource={mockData} />
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const skeletons = page.root.shadowRoot.querySelectorAll('.ks-skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should display empty state when no data', async () => {
    const page = await newSpecPage({
      components: [KsTable, KsEmptyStates],
      template: () => <ks-table columns={mockColumns} dataSource={[]} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const emptyState = page.root.shadowRoot.querySelector('ks-empty-states');
    expect(emptyState).not.toBeNull();
  });

  it('should support custom empty state via slot', async () => {
    const page = await newSpecPage({
      components: [KsTable],
      template: () => (
        <ks-table columns={mockColumns} dataSource={[]}>
          <div slot="empty" class="custom-empty">
            No data available
          </div>
        </ks-table>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const customEmpty = page.root.querySelector('.custom-empty');
    expect(customEmpty).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(customEmpty.textContent).toContain('No data available');
  });

  it('should render all columns and rows correctly', async () => {
    const page = await newSpecPage({
      components: [KsTable],
      template: () => <ks-table columns={mockColumns} dataSource={mockData} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const headers = page.root.shadowRoot.querySelectorAll('th');
    expect(headers.length).toBe(mockColumns.length);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const rows = page.root.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockData.length);
  });

  it('should include rowClassName on every row', async () => {
    const page = await newSpecPage({
      components: [KsTable],
      template: () => <ks-table columns={mockColumns} dataSource={mockData} rowClassName="custom-class" />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const rows = page.root.shadowRoot.querySelectorAll('tbody tr');
    rows.forEach((rowEl) => {
      expect(rowEl).toHaveClass('custom-class');
    });
  });

  it('should support sorting when sorter is provided', async () => {
    const page = await newSpecPage({
      components: [KsTable, KsButton],
      template: () => (
        <ks-table
          columns={mockColumns}
          dataSource={mockData}
          onKsDataViewChange={function ({ detail }) {
            console.log('detail', detail);
            if (detail.triggeredBy === 'sortOrder') {
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              this.columns = detail.columns;
            }
          }}
        />
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const sortButton: HTMLKsButtonElement = page.root.shadowRoot.querySelector('[data-testid="ks-table-index-4BjgeS"]');
    expect(sortButton).not.toBeNull();

    sortButton.click();
    await page.waitForChanges();

    // Verify the first row after sorting (should be Jane as age 25 is the smallest)
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const firstRow = page.root.shadowRoot.querySelectorAll('tbody tr')[0];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(firstRow.textContent).toContain('Jane');

    sortButton.click();
    await page.waitForChanges();

    // Verify the first row after sorting (should be Doe as age 35 is the largest)
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const firstRowAfterSort = page.root.shadowRoot.querySelectorAll('tbody tr')[0];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(firstRowAfterSort.textContent).toContain('Doe');
  });

  it('should support row selection when selectable is true', async () => {
    const page = await newSpecPage({
      components: [KsTable, KsCheckbox],
      template: () => (
        <ks-table selectable rowKey="name" columns={mockColumns} dataSource={mockData} selectedRowKeys={['John']} />
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const checkboxes = page.root.shadowRoot.querySelectorAll('ks-checkbox');
    expect(checkboxes.length).toBe(mockData.length + 1); // +1 for header checkbox

    // Verify header checkbox state
    const headerCheckbox = checkboxes[0];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(headerCheckbox.indeterminate).not.toBeNull();

    // Verify selected row is checked
    const firstRowCheckbox = checkboxes[1];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(firstRowCheckbox.checked).not.toBeNull();
  });

  it('should emit row select event when checkbox is clicked', async () => {
    const rowSelectSpy = jest.fn();
    const page = await newSpecPage({
      components: [KsTable, KsCheckbox],
      template: () => (
        <ks-table selectable rowKey="name" columns={mockColumns} dataSource={mockData} onKsRowSelect={rowSelectSpy} />
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const firstCheckbox = page.root.shadowRoot.querySelector('ks-checkbox');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    firstCheckbox.dispatchEvent(new CustomEvent('ksChange', { detail: true }));
    await page.waitForChanges();

    expect(rowSelectSpy).toHaveBeenCalled();
  });

  it('should support fixed columns', async () => {
    const page = await newSpecPage({
      components: [KsTable],
      template: () => <ks-table columns={mockColumns} dataSource={mockData} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const fixedColumn = page.root.shadowRoot.querySelector('.th-cell--fixed');
    expect(fixedColumn).not.toBeNull();
  });

  it('should handle row hover events', async () => {
    const rowHoverSpy = jest.fn();
    const page = await newSpecPage({
      components: [KsTable],
      template: () => <ks-table columns={mockColumns} dataSource={mockData} onKsRowHover={rowHoverSpy} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const firstRow = page.root.shadowRoot.querySelector('tbody tr');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    firstRow.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    expect(rowHoverSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: 0 }));

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    firstRow.dispatchEvent(new Event('mouseleave'));
    await page.waitForChanges();

    // The hover event is debounced, so we need to wait for the next tick
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(rowHoverSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: null }));
  });

  it('should handle row click events', async () => {
    const rowClickSpy = jest.fn();
    const page = await newSpecPage({
      components: [KsTable],
      template: () => <ks-table columns={mockColumns} dataSource={mockData} onKsRowClick={rowClickSpy} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const firstRow = page.root.shadowRoot.querySelector<HTMLTableRowElement>('tbody tr');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    firstRow.click();
    await page.waitForChanges();

    expect(rowClickSpy).toHaveBeenCalled();
  });
});
