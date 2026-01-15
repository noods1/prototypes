import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsPaginationJumper } from '../ks-pagination-jumper';

describe('KsPaginationJumper', () => {
  it('should not emit ksJump event when input is empty', async () => {
    let flag = 0;

    const page = await newSpecPage({
      components: [KsPaginationJumper],
      template: () => (
        <ks-pagination-jumper
          onKsJump={function ({ detail }: CustomEvent<number>) {
            flag = detail;
          }}
          data-testid="__tests__-ks-pagination-jumper.spec-dpG2hL"
        >
          Go
        </ks-pagination-jumper>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector<HTMLKsInputElement>('[data-testid=ks-pagination-index-iuKszv]');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', bubbles: true }));
    await page.waitForChanges();

    expect(flag).toBe(0);
  });

  it('should not emit ksJump event when input is disabled', async () => {
    let flag = 0;

    const page = await newSpecPage({
      components: [KsPaginationJumper],
      template: () => (
        <ks-pagination-jumper
          disabled
          onKsJump={function ({ detail }: CustomEvent<number>) {
            flag = detail;
          }}
          data-testid="__tests__-ks-pagination-jumper.spec-k86q2A"
        >
          Go
        </ks-pagination-jumper>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector<HTMLKsInputElement>('[data-testid=ks-pagination-index-iuKszv]');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', bubbles: true }));
    await page.waitForChanges();

    expect(flag).toBe(0);
  });

  it('should not emit ksJump event when input is not a number', async () => {
    let flag = 0;

    const page = await newSpecPage({
      components: [KsPaginationJumper],
      template: () => (
        <ks-pagination-jumper
          onKsJump={function ({ detail }: CustomEvent<number>) {
            flag = detail;
          }}
          data-testid="__tests__-ks-pagination-jumper.spec-15hvny"
        >
          Go
        </ks-pagination-jumper>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector<HTMLKsInputElement>('[data-testid=ks-pagination-index-iuKszv]');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.dispatchEvent(new CustomEvent('ksChange', { detail: 'a' }));
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', bubbles: true }));
    await page.waitForChanges();

    expect(flag).toBe(0);
  });

  it('should emit ksJump event when pressing Enter key', async () => {
    let flag = 0;

    const page = await newSpecPage({
      components: [KsPaginationJumper],
      template: () => (
        <ks-pagination-jumper
          onKsJump={function ({ detail }: CustomEvent<number>) {
            flag = detail;
          }}
          data-testid="__tests__-ks-pagination-jumper.spec-vifkhZ"
        >
          Go
        </ks-pagination-jumper>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector<HTMLKsInputElement>('[data-testid=ks-pagination-index-iuKszv]');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.dispatchEvent(new CustomEvent('ksChange', { detail: '3' }));
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', bubbles: true }));
    await page.waitForChanges();

    expect(flag).toBe(3);
  });
});
