import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsMultipleGlobalAlert } from '../index';
import { Info } from '@src/entities/components/info';

describe('ks-multiple-global-alert component', () => {
  const infos = [
    {
      variant: 'info',
      title: 'Information Alert',
      content: 'This is an information alert message',
      link: { content: 'Learn more', href: '#', target: '_blank' },
    },
    {
      variant: 'warning',
      title: 'Warning Alert',
      content: 'This is a warning alert message',
      link: { content: 'Add Address', href: '#', target: '_blank' },
    },
    {
      variant: 'error',
      title: 'Error Alert',
      content: 'This is an error alert message',
      link: { content: 'Appeal', href: '#', target: '_blank' },
    },
  ];

  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [KsMultipleGlobalAlert],
      template: () => <ks-multiple-global-alert infos={infos as Info[]}>Alert Content</ks-multiple-global-alert>,
    });
    expect(page.root?.shadowRoot?.querySelector('ks-global-alert')).toBeTruthy();
  });
});
