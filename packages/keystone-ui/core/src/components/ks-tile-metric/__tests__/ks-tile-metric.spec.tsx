import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsTileMetric } from '../index';

describe('ks-tile-metric component', () => {
  it('should render title when title prop is provided', async () => {
    const page = await newSpecPage({
      components: [KsTileMetric],
      template: () => <ks-tile-metric title="Test Title"></ks-tile-metric>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.textContent).toContain('Test Title');
  });

  it('should render data when data prop is provided', async () => {
    const page = await newSpecPage({
      components: [KsTileMetric],
      template: () => <ks-tile-metric data={100}></ks-tile-metric>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.textContent).toContain('100');
  });

  it('should render currency when currency prop is provided', async () => {
    const page = await newSpecPage({
      components: [KsTileMetric],
      template: () => <ks-tile-metric data={100} currency="$"></ks-tile-metric>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.textContent).toContain('100$');
  });

  it('should render metric data when metric prop is provided', async () => {
    const page = await newSpecPage({
      components: [KsTileMetric],
      template: () => <ks-tile-metric metric={{ data: '10%', type: 'up' }}></ks-tile-metric>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.textContent).toContain('10%');
  });

  it('should render extra content when extra slot is provided', async () => {
    const page = await newSpecPage({
      components: [KsTileMetric],
      template: () => (
        <ks-tile-metric>
          <div slot="extra">Extra Content</div>
        </ks-tile-metric>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.innerHTML).toContain('Extra Content');
  });

  it('should render icon when icon slot is provided', async () => {
    const page = await newSpecPage({
      components: [KsTileMetric],
      template: () => (
        <ks-tile-metric>
          <div slot="icon">Icon</div>
        </ks-tile-metric>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.innerHTML).toContain('Icon');
  });

  describe('action types', () => {
    it('should not render any action element by default', async () => {
      const page = await newSpecPage({
        components: [KsTileMetric],
        template: () => <ks-tile-metric></ks-tile-metric>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('ks-radio')).toBeNull();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('ks-checkbox')).toBeNull();
    });

    it('should render checkbox when action is set to checkbox', async () => {
      const page = await newSpecPage({
        components: [KsTileMetric],
        template: () => <ks-tile-metric action="checkbox"></ks-tile-metric>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('ks-checkbox')).not.toBeNull();
    });

    it('should render radio button when action is set to radio', async () => {
      const page = await newSpecPage({
        components: [KsTileMetric],
        template: () => <ks-tile-metric action="radio"></ks-tile-metric>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('ks-radio')).not.toBeNull();
    });
  });

  describe('disabled state', () => {
    it('should apply disabled class when disabled prop is true', async () => {
      const page = await newSpecPage({
        components: [KsTileMetric],
        template: () => <ks-tile-metric disabled action="radio"></ks-tile-metric>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('.tile-metric--disabled')).not.toBeNull();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const radio = page.root.shadowRoot.querySelector('ks-radio');
      expect(radio).toHaveAttribute('disabled');
    });

    it('should disable the radio/checkbox when disabled prop is true', async () => {
      const page = await newSpecPage({
        components: [KsTileMetric],
        template: () => <ks-tile-metric disabled action="radio"></ks-tile-metric>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const radio = page.root.shadowRoot.querySelector('ks-radio');
      expect(radio).toHaveAttribute('disabled');
    });
  });

  describe('checked state', () => {
    it('should not be checked by default', async () => {
      const page = await newSpecPage({
        components: [KsTileMetric],
        template: () => <ks-tile-metric action="radio"></ks-tile-metric>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const radio = page.root.shadowRoot.querySelector('ks-radio');
      expect(radio).not.toHaveAttribute('checked');
    });

    it('should be checked when defaultChecked prop is true', async () => {
      const page = await newSpecPage({
        components: [KsTileMetric],
        template: () => <ks-tile-metric defaultChecked action="radio"></ks-tile-metric>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const radio = page.root.shadowRoot.querySelector('ks-radio');
      expect(radio).toHaveAttribute('checked');
    });

    it('should be controlled by checked prop when provided', async () => {
      const page = await newSpecPage({
        components: [KsTileMetric],
        template: () => <ks-tile-metric checked action="radio"></ks-tile-metric>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const radio = page.root.shadowRoot.querySelector('ks-radio');
      expect(radio).toHaveAttribute('checked');
    });
  });

  describe('events', () => {
    it('should emit ksChange event when radio value changes', async () => {
      const page = await newSpecPage({
        components: [KsTileMetric],
        template: () => <ks-tile-metric action="radio"></ks-tile-metric>,
      });

      const spy = jest.fn();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      page.root.addEventListener('ksChange', spy);

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const radio = page.root.shadowRoot.querySelector('ks-radio');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      radio.dispatchEvent(new CustomEvent('ksChange', { detail: true }));

      await page.waitForChanges();

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail).toBe(true);
    });
  });
});
