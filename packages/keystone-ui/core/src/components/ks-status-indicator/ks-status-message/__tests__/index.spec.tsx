import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsStatusMessage } from '../index';

describe('ks-status-message component', () => {
  // it('should render basic status message', async () => {
  //   const page = await newSpecPage({
  //     components: [KsStatusMessage],
  //     template: () => <ks-status-message>Test Message</ks-status-message>,
  //   });
  //   console.log(page.root.shadowRoot.innerHTML);
  //   expect(page.root.shadowRoot.querySelector('ks-text')).toBeTruthy();
  //   expect(page.root.shadowRoot.querySelector('ks-text').textContent).toBe('Test Message');
  // });

  it('should render cta button when cta prop is provided', async () => {
    const ctaProps = { label: 'Retry', onClick: jest.fn() };
    const page = await newSpecPage({
      components: [KsStatusMessage],
      template: () => <ks-status-message cta={ctaProps}>Error Occurred</ks-status-message>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const ctaButton = page.root.shadowRoot.querySelector('ks-button');
    expect(ctaButton).toBeTruthy();
    // The button text includes the icon, so we check if the label is part of the text content.
    // The actual rendered text might be something like "<ks-icon-refresh size="14"></ks-icon-refresh>Retry"
    // So we use toContain instead of toEqual
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(ctaButton.textContent).toContain(ctaProps.label);

    // Simulate click
    (ctaButton as HTMLElement).click();
    expect(ctaProps.onClick).toHaveBeenCalledTimes(1);
  });

  // it('should render richTextString when provided', async () => {
  //   const richText = 'You can <a href="#">learn more</a>.';
  //   const page = await newSpecPage({
  //     components: [KsStatusMessage],
  //     template: () => <ks-status-message richTextString={richText}></ks-status-message>,
  //   });
  //   const ksText = page.root.shadowRoot.querySelector('ks-text');
  //   expect(ksText).toBeTruthy();
  //   expect(ksText.richTextString).toEqual(richText);
  // });

  // it('should apply variant class and pass variant to ks-status-icon and ks-text', async () => {
  //   const page = await newSpecPage({
  //     components: [KsStatusMessage],
  //     template: () => <ks-status-message variant="success">Success!</ks-status-message>,
  //   });

  //   const statusIcon = page.root.shadowRoot.querySelector('ks-status-icon');
  //   const ksText = page.root.shadowRoot.querySelector('ks-text');

  //   expect(statusIcon.variant).toBe('success');
  //   expect(ksText.theme).toBe('success');
  // });
});
