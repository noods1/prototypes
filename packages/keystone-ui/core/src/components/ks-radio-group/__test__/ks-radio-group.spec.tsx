import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsRadioGroup } from '../index';
import { KsRadio } from '@src/components/ks-radio';

describe('KsCheckbox', () => {
  it('checkbox render success', async () => {
    const page = await newSpecPage({
      components: [KsRadioGroup, KsRadio],
      template: () => (
        <ks-radio-group>
          <ks-radio value={'1'}>1</ks-radio>
          <ks-radio value={'2'}>1</ks-radio>
        </ks-radio-group>
      ),
    });
    expect(page.root).toBeTruthy();
  });
});
