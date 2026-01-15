import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsMultipleInput } from '../index';
import { KsFieldsPresenter } from '../../ks-fields-presenter';

describe('ks-multiple-input', () => {
  it('should render correctly without any initial values', async () => {
    const page = await newSpecPage({
      components: [KsMultipleInput, KsFieldsPresenter],
      template: () => <ks-multiple-input></ks-multiple-input>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const fieldsPresenter = page.root.shadowRoot.querySelector('ks-fields-presenter');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(JSON.stringify(fieldsPresenter.value)).toEqual('[]');
  });

  it('should render correctly with initial values', async () => {
    const page = await newSpecPage({
      components: [KsMultipleInput, KsFieldsPresenter],
      template: () => <ks-multiple-input value={['tag1', 'tag2']}></ks-multiple-input>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const fieldsPresenter = page.root.shadowRoot.querySelector('ks-fields-presenter');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(JSON.stringify(fieldsPresenter.value)).toEqual(
      JSON.stringify([
        { label: 'tag1', key: 'tag1' },
        { label: 'tag2', key: 'tag2' },
      ]),
    );
  });

  it('should render in a disabled state', async () => {
    const page = await newSpecPage({
      components: [KsMultipleInput, KsFieldsPresenter],
      template: () => <ks-multiple-input disabled></ks-multiple-input>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const fieldsPresenter = page.root.shadowRoot.querySelector('ks-fields-presenter');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(fieldsPresenter.disabled).toBe(true);
  });

  it('should emit ksFocus and ksBlur events', async () => {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const page = await newSpecPage({
      components: [KsMultipleInput, KsFieldsPresenter],
      template: () => <ks-multiple-input onKsBlur={onBlur} disabled></ks-multiple-input>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const fieldsPresenter = page.root.shadowRoot.querySelector('ks-fields-presenter');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    fieldsPresenter.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    expect(onBlur).toHaveBeenCalled();
  });
});
