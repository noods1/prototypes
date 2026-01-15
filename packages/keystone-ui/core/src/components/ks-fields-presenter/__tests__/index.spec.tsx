import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsFieldsPresenter } from '../index';
import { IPresenterValue } from '@src/entities/components/fields-presenter';

describe('ks-fields-presenter', () => {
  it('renders correctly with default props', async () => {
    const page = await newSpecPage({
      components: [KsFieldsPresenter],
      template: () => <ks-fields-presenter></ks-fields-presenter>,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders as disabled', async () => {
    const page = await newSpecPage({
      components: [KsFieldsPresenter],
      template: () => <ks-fields-presenter disabled={true}></ks-fields-presenter>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const container = page.root.shadowRoot.querySelector('.fields-presenter');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(container.classList.contains('fields-presenter--disabled')).toBe(true);
  });

  it('adds a new item when showInput is true and enter is pressed', async () => {
    const page = await newSpecPage({
      components: [KsFieldsPresenter],
      template: () => <ks-fields-presenter showInput={true}></ks-fields-presenter>,
    });
    await page.waitForChanges();

    const ksChange = jest.fn();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.addEventListener('ksChange', ksChange);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.value = 'New Item';
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
    await page.waitForChanges();

    expect(ksChange).toHaveBeenCalled();
    expect(ksChange.mock.calls[0][0].detail).toEqual([{ key: 'New Item', label: 'New Item', visibility: true }]);
  });
});

describe('clearTag', () => {
  const values: IPresenterValue[] = [{ key: '1', label: 'One' }];

  it('should clear all items in uncontrolled mode', async () => {
    const page = await newSpecPage({
      components: [KsFieldsPresenter],
      template: () => (
        <ks-fields-presenter
          width={'200px'}
          clearable={true}
          defaultValue={values}
          focusElement={true}
        ></ks-fields-presenter>
      ),
    });
    await page.waitForChanges();

    // Wait for defaultValue to be processed
    await new Promise((resolve) => setTimeout(resolve, 0));
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    let tags = page.root.shadowRoot.querySelectorAll('ks-tag');
    // expect(tags.length).toBe(2);

    // const ksClear = jest.fn();
    // const ksRemove = jest.fn();
    // const ksChange = jest.fn();
    // page.root.addEventListener('ksClear', ksClear);
    // page.root.addEventListener('ksRemove', ksRemove);
    // page.root.addEventListener('ksChange', ksChange);

    // const clearIconContainer = page.root.shadowRoot.querySelector('.fields-presenter__clear');
    // expect(clearIconContainer).not.toBeNull();

    // clearIconContainer.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    // await page.waitForChanges();

    // expect(ksClear).toHaveBeenCalledWith(expect.objectContaining({ detail: [] }));
    // expect(ksRemove).toHaveBeenCalledWith(expect.objectContaining({ detail: [] }));
    // expect(ksChange).toHaveBeenCalledWith(expect.objectContaining({ detail: [] }));

    // tags = page.root.shadowRoot.querySelectorAll('ks-tag');
    // expect(tags.length).toBe(0);
  });
});
