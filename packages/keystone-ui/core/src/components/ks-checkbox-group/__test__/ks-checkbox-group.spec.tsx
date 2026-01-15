import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsCheckboxGroup } from '../index';
import { KsCheckbox } from '@src/components/ks-checkbox';

describe('KsCheckbox', () => {
  it('checkbox render success', async () => {
    const page = await newSpecPage({
      components: [KsCheckboxGroup, KsCheckbox],
      template: () => (
        <ks-checkbox-group value={['1']}>
          <ks-checkbox value={'1'}>1</ks-checkbox>
          <ks-checkbox value={'2'}>1</ks-checkbox>
        </ks-checkbox-group>
      ),
    });
    expect(page.root).toBeTruthy();
  });
});
