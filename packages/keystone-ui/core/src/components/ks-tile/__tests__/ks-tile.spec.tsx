import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsTile } from '../index';

describe('ks-tile component', () => {
  it('should render title when title prop is provided', async () => {
    const page = await newSpecPage({
      components: [KsTile],
      template: () => <ks-tile title="Test Title"></ks-tile>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.shadowRoot.textContent).toContain('Test Title');
  });

  it('should render custom title when title slot is provided', async () => {
    const page = await newSpecPage({
      components: [KsTile],
      template: () => (
        <ks-tile>
          <div slot="title">Custom Title</div>
        </ks-tile>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.innerHTML).toContain('Custom Title');
  });

  it('should render extra content when extra slot is provided', async () => {
    const page = await newSpecPage({
      components: [KsTile],
      template: () => (
        <ks-tile>
          <div slot="extra">Extra Content</div>
        </ks-tile>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.innerHTML).toContain('Extra Content');
  });

  it('should render icon when icon slot is provided', async () => {
    const page = await newSpecPage({
      components: [KsTile],
      template: () => (
        <ks-tile>
          <div slot="icon">Icon</div>
        </ks-tile>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.innerHTML).toContain('Icon');
  });

  it('should render footer content when footer slot is provided', async () => {
    const page = await newSpecPage({
      components: [KsTile],
      template: () => (
        <ks-tile>
          <div slot="footer">Footer Content</div>
        </ks-tile>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.innerHTML).toContain('Footer Content');
  });

  describe('action types', () => {
    it('should render radio button when no action is specified', async () => {
      const page = await newSpecPage({
        components: [KsTile],
        template: () => <ks-tile></ks-tile>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('ks-radio')).not.toBeNull();
    });

    it('should render checkbox when action is set to checkbox', async () => {
      const page = await newSpecPage({
        components: [KsTile],
        template: () => <ks-tile action="checkbox"></ks-tile>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('ks-checkbox')).not.toBeNull();
    });

    it('should not render any action element when action is set to none', async () => {
      const page = await newSpecPage({
        components: [KsTile],
        template: () => <ks-tile action="none"></ks-tile>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('ks-radio')).toBeNull();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('ks-checkbox')).toBeNull();
    });
  });

  describe('orientation', () => {
    it('should apply horizontal class when no orientation is specified', async () => {
      const page = await newSpecPage({
        components: [KsTile],
        template: () => <ks-tile></ks-tile>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('.tile--horizontal')).not.toBeNull();
    });

    it('should apply vertical class when orientation is set to vertical', async () => {
      const page = await newSpecPage({
        components: [KsTile],
        template: () => <ks-tile orientation="vertical"></ks-tile>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('.tile--vertical')).not.toBeNull();
    });
  });

  describe('disabled state', () => {
    it('should apply disabled class when disabled prop is true', async () => {
      const page = await newSpecPage({
        components: [KsTile],
        template: () => <ks-tile disabled></ks-tile>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.shadowRoot.querySelector('.tile--disabled')).not.toBeNull();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const radio = page.root.shadowRoot.querySelector('ks-radio');
      expect(radio).toHaveAttribute('disabled');
    });

    it('should disable the radio/checkbox when disabled prop is true', async () => {
      const page = await newSpecPage({
        components: [KsTile],
        template: () => <ks-tile disabled></ks-tile>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const radio = page.root.shadowRoot.querySelector('ks-radio');
      expect(radio).toHaveAttribute('disabled');
    });
  });

  describe('checked state', () => {
    it('should not be checked by default', async () => {
      const page = await newSpecPage({
        components: [KsTile],
        template: () => <ks-tile></ks-tile>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const radio = page.root.shadowRoot.querySelector('ks-radio');
      expect(radio).not.toHaveAttribute('checked');
    });

    it('should be checked when defaultChecked prop is true', async () => {
      const page = await newSpecPage({
        components: [KsTile],
        template: () => <ks-tile defaultChecked></ks-tile>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const radio = page.root.shadowRoot.querySelector('ks-radio');
      expect(radio).toHaveAttribute('checked');
    });

    it('should be controlled by checked prop when provided', async () => {
      const page = await newSpecPage({
        components: [KsTile],
        template: () => <ks-tile checked></ks-tile>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const radio = page.root.shadowRoot.querySelector('ks-radio');
      expect(radio).toHaveAttribute('checked');
    });
  });

  describe('events', () => {
    it('should emit ksChange event when radio value changes', async () => {
      const page = await newSpecPage({
        components: [KsTile],
        template: () => <ks-tile></ks-tile>,
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
