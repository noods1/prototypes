import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsInputSelector } from '..';

const dataSourceItems = [
  { type: 'single' as const, id: '1', content: 'Option 1' },
  { type: 'single' as const, id: '2', content: 'Option 2' },
  { type: 'single' as const, id: '3', content: 'Option 3' },
];

describe('KsInputSelector', () => {
  it('selector instance open and close method behave well', async () => {
    const page = await newSpecPage({
      components: [KsInputSelector],
      template: () => <ks-input-selector dataSource={{ type: 'list', items: dataSourceItems }} />,
    });

    await page.waitForChanges();
    expect(page.rootInstance).toBeTruthy();
    const inputSelectorInstance = page.rootInstance as KsInputSelector;

    expect(inputSelectorInstance.dropdownVisible).toBe(false);

    await inputSelectorInstance.open();
    expect(inputSelectorInstance.dropdownVisible).toBe(true);

    await inputSelectorInstance.close();
    expect(inputSelectorInstance.dropdownVisible).toBe(false);
  });
});
