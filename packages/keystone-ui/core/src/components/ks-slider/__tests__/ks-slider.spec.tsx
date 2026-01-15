import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsSlider } from '../';

describe('ks-slider component', () => {
  it('should initialize with provided value', async () => {
    const page = await newSpecPage({
      components: [KsSlider],
      template: () => <ks-slider value={50}></ks-slider>,
    });

    expect(page.rootInstance.currentValue).toBe(50);
  });

  it('should initialize with default value when value is not provided', async () => {
    const page = await newSpecPage({
      components: [KsSlider],
      template: () => <ks-slider defaultValue={30}></ks-slider>,
    });

    expect(page.rootInstance.currentValue).toBe(30);
  });

  it('should update value when value prop changes', async () => {
    const page = await newSpecPage({
      components: [KsSlider],
      template: () => <ks-slider value={20}></ks-slider>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.value = 40;
    await page.waitForChanges();

    expect(page.rootInstance.currentValue).toBe(40);
  });

  it('should update default value when default value prop changes', async () => {
    const page = await newSpecPage({
      components: [KsSlider],
      template: () => <ks-slider defaultValue={20}></ks-slider>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.defaultValue = 60;
    await page.waitForChanges();

    expect(page.rootInstance.currentValue).toBe(60);
  });

  it('should not update value when disabled', async () => {
    const page = await newSpecPage({
      components: [KsSlider],
      template: () => <ks-slider value={20} disabled></ks-slider>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const slider = page.root.shadowRoot.querySelector('.slider');
    const event = new MouseEvent('mousedown');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    slider.dispatchEvent(event);

    // Try to simulate drag
    const moveEvent = new MouseEvent('mousemove', { clientX: 100 });
    document.dispatchEvent(moveEvent);

    await page.waitForChanges();

    expect(page.rootInstance.currentValue).toBe(20);
  });

  it('should display marks when enabled', async () => {
    const page = await newSpecPage({
      components: [KsSlider],
      template: () => <ks-slider marks></ks-slider>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const marks = page.root.shadowRoot.querySelectorAll('.slider__mark');
    expect(marks.length).toBeGreaterThan(0);
  });

  it('should display custom marks when provided', async () => {
    const marks = [
      { value: 0, label: '0%' },
      { value: 50, label: '50%' },
      { value: 100, label: '100%' },
    ];

    const page = await newSpecPage({
      components: [KsSlider],
      template: () => <ks-slider marks={marks}></ks-slider>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const markElements = page.root.shadowRoot.querySelectorAll('.slider__mark');
    expect(markElements.length).toBe(marks.length);
  });

  it('should update value when clicking on track', async () => {
    const changeSpy = jest.fn();
    const page = await newSpecPage({
      components: [KsSlider],
      template: () => <ks-slider onKsChange={changeSpy}></ks-slider>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const slider = page.root.shadowRoot.querySelector('.slider');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const rect = slider.getBoundingClientRect();

    // Simulate click in the middle of the slider
    const clickEvent = new MouseEvent('mousedown', {
      clientX: rect.left + rect.width / 2,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    slider.dispatchEvent(clickEvent);
    await page.waitForChanges();

    expect(changeSpy).toHaveBeenCalled();
  });

  it('should handle range slider with multiple values', async () => {
    const page = await newSpecPage({
      components: [KsSlider],
      template: () => <ks-slider value={[20, 80]}></ks-slider>,
    });

    expect(Array.isArray(page.rootInstance.currentValue)).toBe(true);
    expect(page.rootInstance.currentValue).toEqual([20, 80]);
  });

  it('should update range slider values correctly', async () => {
    const page = await newSpecPage({
      components: [KsSlider],
      template: () => <ks-slider value={[20, 80]}></ks-slider>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.value = [30, 70];
    await page.waitForChanges();

    expect(page.rootInstance.currentValue).toEqual([30, 70]);
  });

  it('should display tooltips when enabled', async () => {
    const page = await newSpecPage({
      components: [KsSlider],
      template: () => <ks-slider marks tooltipContent={['1']}></ks-slider>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const tooltip = page.root.shadowRoot.querySelector('ks-tooltip');
    expect(tooltip).not.toBeNull();
  });

  it('should apply correct status class', async () => {
    const page = await newSpecPage({
      components: [KsSlider],
      template: () => <ks-slider status="error"></ks-slider>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const slider = page.root.shadowRoot.querySelector('.slider');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(slider.classList.contains('slider--error')).toBe(true);
  });
});
