import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsText } from '../index';

describe('ks-text component', () => {
  it('should render with default values', async () => {
    const page = await newSpecPage({
      components: [KsText],
      template: () => <ks-text>Test content</ks-text>,
    });

    expect(page.root).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.textContent).toBe('Test content');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.getAttribute('ks-variant')).toBe('bodyMd');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.getAttribute('ks-theme')).toBe('default');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.hasAttribute('ks-ellipsis')).toBe(false);
  });

  it('should render with custom variant and theme', async () => {
    const page = await newSpecPage({
      components: [KsText],
      template: () => (
        <ks-text variant="headlineLg" theme="primary">
          Headline
        </ks-text>
      ),
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.getAttribute('ks-variant')).toBe('headlineLg');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.getAttribute('ks-theme')).toBe('primary');
  });

  it('should render rich text string', async () => {
    const richText = 'Click <a href="https://example.com">here</a> for more info';
    const page = await newSpecPage({
      components: [KsText],
      template: () => <ks-text richTextString={richText}></ks-text>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const link = page.root.shadowRoot.querySelector('ks-link');
    expect(link).toBeTruthy();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(link.textContent).toBe('here');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(link.getAttribute('href')).toBe('https://example.com');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(link.getAttribute('target')).toBe('_blank');
  });

  it('should enable ellipsis when ellipsis prop is true', async () => {
    const page = await newSpecPage({
      components: [KsText],
      template: () => <ks-text ellipsis>Long text that should be truncated</ks-text>,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.hasAttribute('ks-ellipsis')).toBe(true);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.hasAttribute('ks-maxline')).toBe(false);
  });

  it('should enable multi-line ellipsis with maxline', async () => {
    const page = await newSpecPage({
      components: [KsText],
      template: () => <ks-text ellipsis={{ maxline: 2, tooltip: true }}>{'A'.repeat(1000)}</ks-text>,
    });

    expect(page.root).toHaveAttribute('ks-ellipsis');
    expect(page.root).toHaveAttribute('ks-maxline');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.style.getPropertyValue('-webkit-line-clamp')).toBe('2');
  });

  it('should not show tooltip when text does not overflow', async () => {
    const page = await newSpecPage({
      components: [KsText],
      template: () => <ks-text ellipsis={{ tooltip: true }}>Short text</ks-text>,
    });

    // Trigger pointer enter to check overflow
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.dispatchEvent(new Event('pointerenter'));
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const tooltip = page.root.querySelector('ks-tooltip');
    expect(tooltip).toBeFalsy();
  });

  it('should render definition text', async () => {
    const page = await newSpecPage({
      components: [KsText],
      template: () => <ks-text definition="Definition info">Text with definition</ks-text>,
    });

    await page.waitForChanges();

    const text = page.root;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(text.hasAttribute('ks-definition')).toBe(true);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(text.innerText).toBe('Text with definition');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const definitionTooltip = page.root.shadowRoot.querySelector('ks-tooltip');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(definitionTooltip.innerText).toBe('Definition info');
  });
});
