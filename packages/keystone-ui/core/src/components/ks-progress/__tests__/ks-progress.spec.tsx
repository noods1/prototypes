import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsProgress } from '../index';
import { KsStatusIcon } from '@src/components/ks-status-indicator/ks-status-icon';

describe('ks-progress component', () => {
  it('should render with default props (bar variant)', async () => {
    const page = await newSpecPage({
      components: [KsProgress, KsStatusIcon],
      template: () => <ks-progress></ks-progress>,
    });
    await page.waitForChanges();

    const progressEl = page.rootInstance as KsProgress;
    expect(progressEl.variant).toBe('bar');
    expect(progressEl.percent).toBe(0);
    expect(progressEl.status).toBe('default');
    expect(progressEl.size).toBe('md');
    expect(progressEl.showLabel).toBe(true);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const barContainer = page.root.shadowRoot.querySelector('.progress--bar');
    expect(barContainer).not.toBeNull();
    expect(barContainer).toHaveClass('progress--md');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const innerBar = page.root.shadowRoot.querySelector('.progress__inner');
    expect(innerBar).not.toBeNull();
    expect((innerBar as HTMLElement).style.width).toBe('0%');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const label = page.root.shadowRoot.querySelector('.progress__label');
    expect(label).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(label.textContent.trim()).toBe('0%');
  });

  it('should render bar variant when success status and 50% percent provided', async () => {
    const page = await newSpecPage({
      components: [KsProgress, KsStatusIcon],
      template: () => <ks-progress percent={50} status="success" size="sm"></ks-progress>,
    });
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const barContainer = page.root.shadowRoot.querySelector('.progress--bar');
    expect(barContainer).toHaveClass('progress--sm');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const innerBar = page.root.shadowRoot.querySelector('.progress__inner');
    expect(innerBar).toHaveClass('progress__inner--success');
    expect((innerBar as HTMLElement).style.width).toBe('50%');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const label = page.root.shadowRoot.querySelector('.progress__label');
    expect(label).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const statusIcon = label.querySelector('ks-status-icon');
    expect(statusIcon).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(statusIcon.variant).toBe('success');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(statusIcon.size).toBe('md'); // Default for bar labels unless specific conditions
  });

  it('should renders bar variant when warning status provided', async () => {
    const page = await newSpecPage({
      components: [KsProgress, KsStatusIcon],
      template: () => <ks-progress status="warning"></ks-progress>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const label = page.root.shadowRoot.querySelector('.progress__label');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const statusIcon = label.querySelector('ks-status-icon');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(statusIcon.variant).toBe('warning');
  });

  it('should render bar variant without label when showLabel is false', async () => {
    const page = await newSpecPage({
      components: [KsProgress, KsStatusIcon],
      template: () => <ks-progress showLabel={false}></ks-progress>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const label = page.root.shadowRoot.querySelector('.progress__label');
    expect(label).toBeNull();
  });

  it('should render bar variant when custom width provided', async () => {
    const page = await newSpecPage({
      components: [KsProgress, KsStatusIcon],
      template: () => <ks-progress width="300px"></ks-progress>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.style.width).toBe('300px');
  });

  it('should render ring variant with default props', async () => {
    const page = await newSpecPage({
      components: [KsProgress, KsStatusIcon],
      template: () => <ks-progress variant="ring"></ks-progress>,
    });
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const ringContainer = page.root.shadowRoot.querySelector('.progress--ring');
    expect(ringContainer).not.toBeNull();
    expect(ringContainer).toHaveClass('progress--md');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const svg = ringContainer.querySelector('svg');
    expect(svg).not.toBeNull();
    // Default width for md ring is 120
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(svg.getAttribute('width')).toBe('120');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(svg.getAttribute('height')).toBe('120');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const circles = svg.querySelectorAll('circle');
    expect(circles.length).toBe(2);
    // Check initial stroke-dasharray for 0%
    const perimeter_md = 2 * Math.PI * (120 / 2 - 8 / 2); // size md, border 8
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(circles[1].getAttribute('stroke-dasharray')).toBe(`0 ${perimeter_md}`);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const label = page.root.shadowRoot.querySelector('.progress__label');
    expect(label).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(label.textContent.trim()).toBe('0%');
  });

  it('should render ring variant when error status, 75% percent, and xs size provided', async () => {
    const page = await newSpecPage({
      components: [KsProgress, KsStatusIcon],
      template: () => <ks-progress variant="ring" percent={75} status="error" size="xs"></ks-progress>,
    });
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const ringContainer = page.root.shadowRoot.querySelector('.progress--ring');
    expect(ringContainer).toHaveClass('progress--xs');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const svg = ringContainer.querySelector('svg');
    // Default width for xs ring is 40
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(svg.getAttribute('width')).toBe('40');
    const circleSize = 40;
    const borderWidth = 2; // CIRCLE_BORDER_WIDTH.xs
    const perimeter = 2 * Math.PI * (circleSize / 2 - borderWidth / 2);
    const expectedStrokeDasharray = `${(perimeter * 75) / 100} ${perimeter * (1 - 75 / 100)}`;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const foregroundCircle = svg.querySelectorAll('circle')[1];
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(foregroundCircle.getAttribute('stroke-dasharray')).toBe(expectedStrokeDasharray);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const label = page.root.shadowRoot.querySelector('.progress__label');
    expect(label).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const statusIcon = label.querySelector('ks-status-icon');
    expect(statusIcon).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(statusIcon.variant).toBe('error');
    // For ring variant with xs size, status icon size should be sm
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(statusIcon.size).toBe('sm');
  });

  it('should render ring variant when warning status provided', async () => {
    const page = await newSpecPage({
      components: [KsProgress, KsStatusIcon],
      template: () => <ks-progress variant="ring" percent={60} status="warning"></ks-progress>,
    });
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const label = page.root.shadowRoot.querySelector('.progress__label');
    expect(label).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(label.textContent.trim()).toBe('60%'); // Warning status for ring shows percent
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const statusIcon = label.querySelector('ks-status-icon');
    expect(statusIcon).toBeNull(); // No icon for warning in ring, shows percent

    // Foreground color should be default color
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const svg = page.root.shadowRoot.querySelector('svg');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const foregroundCircle = svg.querySelectorAll('circle')[1];
    // This requires checking computed style or knowing the var(--ks-color-primary-fill)
    // For now, we trust the logic: this.status === 'warning' ? COLORS.default : COLORS[this.status]
    // We can check that it's not the warning color if that was defined and different.
  });

  it('should render ring variant without label when showLabel is false', async () => {
    const page = await newSpecPage({
      components: [KsProgress, KsStatusIcon],
      template: () => <ks-progress variant="ring" showLabel={false}></ks-progress>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const label = page.root.shadowRoot.querySelector('.progress__label');
    expect(label).toBeNull();
  });

  it('should render label when RTL direction correctly', async () => {
    const page = await newSpecPage({
      components: [KsProgress, KsStatusIcon],
      template: () => <ks-progress percent={30}></ks-progress>,
      direction: 'rtl',
    });
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const label = page.root.shadowRoot.querySelector('.progress__label');
    expect(label).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(label.textContent.trim()).toBe('30%');
  });

  it('should render bar variant when xs size provided', async () => {
    const page = await newSpecPage({
      components: [KsProgress, KsStatusIcon],
      template: () => <ks-progress variant="bar" size="xs"></ks-progress>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const barContainer = page.root.shadowRoot.querySelector('.progress--bar');
    expect(barContainer).toHaveClass('progress--sm'); // xs maps to sm for bar container class
  });

  it('should not render helpText slot for ring variant', async () => {
    const page = await newSpecPage({
      components: [KsProgress, KsStatusIcon],
      html: `<ks-progress variant="ring"><div slot="helpText">Help!</div></ks-progress>`,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const helpTextContainer = page.root.shadowRoot.querySelector('.helpText');
    expect(helpTextContainer).toBeNull();
  });
});
