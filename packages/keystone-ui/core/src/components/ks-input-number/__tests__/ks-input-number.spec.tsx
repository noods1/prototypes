import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsInputNumber } from '../';
import { KsInput } from '@src/components/ks-input';

describe('ks-input-number', () => {
  it('should render with default values', async () => {
    const page = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => <ks-input-number></ks-input-number>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    expect(input).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.type).toBe('text');
  });

  it('should initialize with provided value', async () => {
    const page = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => <ks-input-number value={42}></ks-input-number>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.value).toBe('42');
  });

  it('should initialize with default value when value is not provided', async () => {
    const page = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => <ks-input-number default-value={10}></ks-input-number>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.value).toBe('10');
  });

  it('should update value when value prop changes', async () => {
    const page = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => <ks-input-number value={5}></ks-input-number>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.value = 10;
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.value).toBe('10');
  });

  it('should format value with specified precision', async () => {
    const page = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => <ks-input-number precision={2} value={5}></ks-input-number>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.value).toBe('5.00');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.value = '7.5';
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.value).toBe('7.50');
  });

  it('should handle increase and decrease controls', async () => {
    const page = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => <ks-input-number value={5} step={2} showControls></ks-input-number>,
    });

    // Test increase
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const increaseBtn = page.root.shadowRoot.querySelector<HTMLElement>('[data-testid="ks-input-number-index-i5voqh"]');
    increaseBtn?.click();
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('ks-input').value).toBe('7');

    // Test decrease
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const decreaseBtn = page.root.shadowRoot.querySelector<HTMLElement>('[data-testid="ks-input-number-index-ew1ATE"]');
    decreaseBtn?.click();
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.querySelector('ks-input').value).toBe('5');
  });

  it('should disable controls when min/max is reached', async () => {
    const page = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => <ks-input-number min={0} max={10} value={0} showControls></ks-input-number>,
    });

    // Decrease button should be disabled at min
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const decreaseBtn = page.root.shadowRoot.querySelector('[data-testid="ks-input-number-index-ew1ATE"]');
    expect(decreaseBtn).toHaveClass('input-number__out-ctl-btn-down--disabled');

    // Set to max and check increase button
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.value = 10;
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const increaseBtn = page.root.shadowRoot.querySelector('[data-testid="ks-input-number-index-i5voqh"]');
    expect(increaseBtn).toHaveClass('input-number__out-ctl-btn-up--disabled');
  });

  it('should emit change event when value changes', async () => {
    const changeSpy = jest.fn();
    const page = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => <ks-input-number onKsChange={changeSpy}></ks-input-number>,
    });

    // Simulate input change
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.value = '42';
    const event = new CustomEvent('ksChange', { detail: '42' });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.dispatchEvent(event);
    await page.waitForChanges();

    expect(changeSpy).toHaveBeenCalled();
  });

  it('should handle disabled state', async () => {
    const page = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => <ks-input-number disabled value={5}></ks-input-number>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.disabled).toBe(true);

    // Try to interact with controls
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const increaseBtn = page.root.shadowRoot.querySelector<HTMLElement>('[data-testid="ks-input-number-index-i5voqh"]');
    increaseBtn?.click();
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.value).toBe('5'); // Value shouldn't change when disabled
  });

  it('should handle clearable prop', async () => {
    const page = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => <ks-input-number clearable value={5}></ks-input-number>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.clearable).toBe(true);
  });

  it('should handle different sizes', async () => {
    // Test md size (default)
    const pageMd = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => <ks-input-number size="md"></ks-input-number>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(pageMd.root.shadowRoot.querySelector('.input-number')).toHaveClass('input-number__has-controls');

    // Test sm size
    const pageSm = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => <ks-input-number size="sm"></ks-input-number>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(pageSm.root.shadowRoot.querySelector('.input-number')).toHaveClass('input-number__has-controls');
  });

  it('should handle valueType prop', async () => {
    const changeSpy = jest.fn();
    const page = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => <ks-input-number value-type="string" onKsChange={changeSpy}></ks-input-number>,
    });

    // Set a value that would be affected by precision if it were a number
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.value = '5.5';
    const event = new CustomEvent('ksChange', { detail: '5.5' });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.dispatchEvent(event);
    await page.waitForChanges();

    // Should emit the string value as-is
    expect(changeSpy.mock.calls[0][0].detail).toBe('5.5');
  });

  it('should handle custom formatter and parser', async () => {
    const customFormat = (value: number) => `$${value.toFixed(2)}`;
    const customParse = (value: string) => {
      const num = parseFloat(value.replace(/[^0-9.-]+/g, ''));
      return isNaN(num) ? null : num;
    };

    const page = await newSpecPage({
      components: [KsInputNumber, KsInput],
      template: () => (
        <ks-input-number
          value={5}
          format={customFormat}
          parse={customParse}
          onKsChange={function ({ detail }: CustomEvent<string | number>) {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            this.value = detail;
          }}
        ></ks-input-number>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const input = page.root.shadowRoot.querySelector('ks-input');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(input.value).toBe('$5.00');

    // Test custom parser on input
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.value = '$10.50';
    const event = new CustomEvent('ksChange', { detail: '$10.50' });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    input.dispatchEvent(event);
    await page.waitForChanges();

    // Should parse back to number correctly
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.value).toBe(10.5);
  });
});
