import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsPagination } from '../ks-pagination';
import { KsPaginationJumper } from '../ks-pagination-jumper';
import { KsInputSelector } from '@src/components/ks-input-selector';
import type { DropdownListMenu } from '@src/entities';

describe('KsPagination', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [KsPagination],
      template: () => <ks-pagination total={100} />,
    });

    expect(page.root).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.pager')).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('[data-testid=ks-pagination-index-gKfSFW-page-1]')).toHaveClass(
      'pager__item--active',
    );
  });

  it('should render in simple mode', async () => {
    const page = await newSpecPage({
      components: [KsPagination],
      template: () => <ks-pagination size="sm" total={100} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.pager__item--simple')).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.pager__item').textContent).toEqual('1/10');
  });

  it('should render in dropdown mode', async () => {
    const page = await newSpecPage({
      components: [KsPagination, KsInputSelector],
      template: () => <ks-pagination size="dropdown" total={100} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const select = page.root.shadowRoot.querySelector<HTMLKsInputSelectorElement>(
      '[data-testid=ks-pagination-ks-pagination-1tGBm2]',
    );
    expect(select).toBeTruthy();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const dataSource = select.dataSource as DropdownListMenu;
    expect(dataSource.items).toHaveLength(10);
  });

  it('should navigate between pages when clicking prev/next buttons in simple mode', async () => {
    const page = await newSpecPage({
      components: [KsPagination],
      template: () => <ks-pagination size="sm" total={100} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const nextButton = page.root.shadowRoot.querySelector<HTMLKsButtonElement>(
      '[data-testid=ks-pagination-index-4C8Rxx]',
    );

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    nextButton.click();
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.pager__item').textContent).toEqual('2/10');
  });

  it('should navigate between pages when clicking prev/next buttons', async () => {
    const page = await newSpecPage({
      components: [KsPagination],
      template: () => <ks-pagination total={100} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const nextButton = page.root.shadowRoot.querySelector<HTMLKsButtonElement>(
      '[data-testid=ks-pagination-index-4C8Rxx]',
    );

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    nextButton.click();
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('[data-testid=ks-pagination-index-gKfSFW-page-2]')).toHaveClass(
      'pager__item--active',
    );
  });

  it('should navigate between pages when clicking dropdown items', async () => {
    const page = await newSpecPage({
      components: [KsPagination, KsInputSelector],
      template: () => <ks-pagination size="dropdown" total={100} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const select = page.root.shadowRoot.querySelector<HTMLKsInputSelectorElement>(
      '[data-testid=ks-pagination-ks-pagination-1tGBm2]',
    );
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    select.dispatchEvent(new CustomEvent('ksChange', { detail: 3 }));
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(select.value).toBe(3);
  });

  it('should handle page size changes', async () => {
    const page = await newSpecPage({
      components: [KsPagination, KsInputSelector],
      template: () => <ks-pagination total={100} defaultPageSize={20} pageSizeList={[10, 20, 50]} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const pageSizeSelector = page.root.shadowRoot.querySelector<HTMLKsInputSelectorElement>(
      '[data-testid=ks-pagination-index-dx4Jv9]',
    );

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(pageSizeSelector.value).toBe(20);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    pageSizeSelector.dispatchEvent(new CustomEvent('ksChange', { detail: 10 }));
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(pageSizeSelector.value).toBe(10);
  });

  it('should handle page size changes with onKsPageSizeChange', async () => {
    const page = await newSpecPage({
      components: [KsPagination, KsInputSelector],
      template: () => (
        <ks-pagination
          total={100}
          pageSize={20}
          pageSizeList={[10, 20, 50]}
          onKsPageSizeChange={function ({ detail }: CustomEvent<{ page: number; pageSize: number }>) {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            const pagination = this as HTMLKsPaginationElement;
            pagination.page = detail.page;
            pagination.pageSize = detail.pageSize;
          }}
          data-testid="__tests__-ks-pagination.spec-dBboPY"
        />
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const pageSizeSelector = page.root.shadowRoot.querySelector<HTMLKsInputSelectorElement>(
      '[data-testid=ks-pagination-index-dx4Jv9]',
    );

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(pageSizeSelector.value).toBe(20);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    pageSizeSelector.dispatchEvent(new CustomEvent('ksChange', { detail: 10 }));
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(pageSizeSelector.value).toBe(10);
  });

  it('should show total count when showTotal is true', async () => {
    const page = await newSpecPage({
      components: [KsPagination],
      template: () => <ks-pagination total={100} showTotal />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.pager__record')).toBeTruthy();
  });

  it('should show jump feature when showJump is true and pages exceed threshold', async () => {
    const page = await newSpecPage({
      components: [KsPagination],
      template: () => <ks-pagination total={1000} showJump />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.pager__jumper')).toBeTruthy();
  });

  it('should work as a uncontrolled component', async () => {
    const page = await newSpecPage({
      components: [KsPagination, KsPaginationJumper],
      template: () => <ks-pagination showJump total={100} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const jumper = page.root.shadowRoot.querySelector<HTMLKsPaginationJumperElement>(
      '[data-testid=ks-pagination-ks-pagination-baTEqF]',
    );

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    jumper.dispatchEvent(new CustomEvent('ksJump', { detail: 3 }));
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('[data-testid=ks-pagination-index-gKfSFW-page-3]')).toHaveClass(
      'pager__item--active',
    );
  });

  it('should work as a controlled component', async () => {
    const page = await newSpecPage({
      components: [KsPagination],
      template: () => (
        <ks-pagination
          page={1}
          total={100}
          onKsPageChange={function ({ detail }: CustomEvent<number>) {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            (this as HTMLKsPaginationElement).page = detail;
          }}
          data-testid="__tests__-ks-pagination.spec-pghLyy"
        />
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const nextButton = page.root.shadowRoot.querySelector<HTMLKsButtonElement>(
      '[data-testid=ks-pagination-index-4C8Rxx]',
    );

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    nextButton.click();
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('[data-testid=ks-pagination-index-gKfSFW-page-2]')).toHaveClass(
      'pager__item--active',
    );
  });

  it('should use custom renderTotal function when provided', async () => {
    const page = await newSpecPage({
      components: [KsPagination],
      template: () => <ks-pagination total={100} showTotal renderTotal={(total: number) => `Total: ${total} items`} />,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('.pager__record').textContent).toBe('Total: 100 items');
  });
});
