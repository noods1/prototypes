import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsTag } from '../index';
import { TagVariant, TagSize } from '../../../entities';

const VariantMap = {
  info: 'primary',
  new: 'support',
  neutral: 'neutral',
  success: 'success',
  error: 'error',
  warning: 'warning',
};

describe('ks-tag component', () => {
  const variants: TagVariant[] = ['info', 'new', 'neutral', 'success', 'error', 'warning'];
  variants.forEach((variant) => {
    it(`should render with variant ${variant}`, async () => {
      const page = await newSpecPage({
        components: [KsTag],
        template: () => <ks-tag variant={variant}>Variant Tag</ks-tag>,
      });
      await page.waitForChanges();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const tagDiv = page.root.shadowRoot.querySelector('.tag');
      expect(tagDiv).toHaveClass(`tag--${VariantMap[variant]}`);
    });
  });

  const sizes: TagSize[] = ['sm', 'md', 'lg'];
  sizes.forEach((size) => {
    it(`should render with size ${size}`, async () => {
      const page = await newSpecPage({
        components: [KsTag],
        template: () => <ks-tag size={size}>Size Tag</ks-tag>,
      });
      await page.waitForChanges();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const tagDiv = page.root.shadowRoot.querySelector('.tag');
      expect(tagDiv).toHaveClass(`tag--${size}`);
    });
  });

  it('should render when disabled', async () => {
    const page = await newSpecPage({
      components: [KsTag],
      template: () => <ks-tag disabled>Disabled Tag</ks-tag>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const tagDiv = page.root.shadowRoot.querySelector('.tag');
    expect(tagDiv).toHaveClass('tag--disabled');
    expect(page.root).toHaveAttribute('aria-disabled');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.getAttribute('aria-disabled')).toBe('true');
  });

  it('should render with indicator', async () => {
    const page = await newSpecPage({
      components: [KsTag],
      template: () => <ks-tag indicator>Indicator Tag</ks-tag>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const tagDiv = page.root.shadowRoot.querySelector('.tag');
    expect(tagDiv).toHaveClass('tag--indicator');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const indicatorEl = page.root.shadowRoot.querySelector('.indicator');
    expect(indicatorEl).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(indicatorEl.innerHTML).toContain('svg');
  });

  it('should close event called when closeable and on ksClose event emit', async () => {
    const ksCloseSpy = jest.fn();
    const page = await newSpecPage({
      components: [KsTag],
      template: () => <ks-tag closeable>Closeable Tag</ks-tag>,
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.addEventListener('ksClose', ksCloseSpy);
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const tagDiv = page.root.shadowRoot.querySelector('.tag');
    expect(tagDiv).toHaveClass('tag--closeable');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const closeIconWrapper = page.root.shadowRoot.querySelector('.tag__close-icon');
    expect(closeIconWrapper).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(closeIconWrapper.getAttribute('part')).toBe('close-icon');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(closeIconWrapper.querySelector('ks-icon-close-small')).not.toBeNull();

    (closeIconWrapper as HTMLElement).click();
    await page.waitForChanges();
    expect(ksCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('should not emit ksClose event when disabled and closeable', async () => {
    const ksCloseSpy = jest.fn();
    const page = await newSpecPage({
      components: [KsTag],
      template: () => (
        <ks-tag closeable disabled>
          Disabled Closeable Tag
        </ks-tag>
      ),
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.addEventListener('ksClose', ksCloseSpy);
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const closeIconWrapper = page.root.shadowRoot.querySelector('.tag__close-icon');
    expect(closeIconWrapper).not.toBeNull();

    (closeIconWrapper as HTMLElement).click();
    await page.waitForChanges();
    expect(ksCloseSpy).not.toHaveBeenCalled();
  });

  it('should not render close icon when not closeable', async () => {
    const page = await newSpecPage({
      components: [KsTag],
      template: () => <ks-tag>Not Closeable Tag</ks-tag>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const closeIconWrapper = page.root.shadowRoot.querySelector('.tag__close-icon');
    expect(closeIconWrapper).toBeNull();
  });

  it('should startDrag event called when showDrag and on ksStartDrag event emit', async () => {
    const ksDragSpy = jest.fn();
    const page = await newSpecPage({
      components: [KsTag],
      template: () => (
        <ks-tag draggable variant="neutral">
          Draggable Tag
        </ks-tag>
      ),
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.addEventListener('ksStartDrag', ksDragSpy);
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const tagDiv = page.root.shadowRoot.querySelector('.tag');

    expect(tagDiv).not.toBeNull();

    const mouseDownEvent = new MouseEvent('mousedown');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    tagDiv.dispatchEvent(mouseDownEvent);
    await page.waitForChanges();
    expect(ksDragSpy).toHaveBeenCalledTimes(1);
  });

  it('should not emit ksStartDrag event when disabled ', async () => {
    const ksDragSpy = jest.fn();
    const page = await newSpecPage({
      components: [KsTag],
      template: () => (
        <ks-tag draggable disabled>
          Disabled Closeable Tag
        </ks-tag>
      ),
    });
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.addEventListener('ksStartDrag', ksDragSpy);
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const tagDiv = page.root.shadowRoot.querySelector('.tag');

    const mouseDownEvent = new MouseEvent('mousedown');

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    tagDiv.dispatchEvent(mouseDownEvent);
    await page.waitForChanges();
    expect(ksDragSpy).not.toHaveBeenCalled();
  });

  it('should render when custom width and maxWidth provided', async () => {
    const page = await newSpecPage({
      components: [KsTag],
      template: () => (
        <ks-tag width="100px" maxWidth="150px">
          Styled Tag
        </ks-tag>
      ),
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const tagDiv = page.root.shadowRoot.querySelector('.tag') as HTMLElement;
    expect(tagDiv.style.width).toBe('100px');
    expect(tagDiv.style.maxWidth).toBe('150px');
  });

  it('should render default slot content correctly', async () => {
    const page = await newSpecPage({
      components: [KsTag],
      template: () => <ks-tag>Hello World</ks-tag>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const defaultSlot = page.root.shadowRoot.querySelector('slot:not([name])');
    expect(defaultSlot).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.textContent).toBe('Hello World');
  });

  it('should close icon size changes based on tag size', async () => {
    // Test for 'sm' size
    let page = await newSpecPage({
      components: [KsTag],
      template: () => (
        <ks-tag closeable size="sm">
          Small Tag
        </ks-tag>
      ),
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    let closeIcon = page.root.shadowRoot.querySelector('ks-icon-close-small');
    expect(closeIcon).toHaveAttribute('size');

    // Test for 'md' size
    page = await newSpecPage({
      components: [KsTag],
      template: () => (
        <ks-tag closeable size="md">
          Medium Tag
        </ks-tag>
      ),
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    closeIcon = page.root.shadowRoot.querySelector('ks-icon-close-small');
    expect(closeIcon).toHaveAttribute('size');

    // Test for 'lg' size
    page = await newSpecPage({
      components: [KsTag],
      template: () => (
        <ks-tag closeable size="lg">
          Large Tag
        </ks-tag>
      ),
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    closeIcon = page.root.shadowRoot.querySelector('ks-icon-close-small');
    expect(closeIcon).toHaveAttribute('size'); // lg also uses 16 as per component logic
  });

  it('should not have aria-disabled when not disabled', async () => {
    const page = await newSpecPage({
      components: [KsTag],
      template: () => <ks-tag>Test Tag</ks-tag>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(page.root.hasAttribute('aria-disabled')).toBe(false);
  });
});
