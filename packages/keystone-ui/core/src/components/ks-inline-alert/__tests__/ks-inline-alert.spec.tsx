import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KsInlineAlert } from '../index';

const items = [
  { id: '1', content: () => 'First step: Create your account', link: () => 'Sign up now' },
  { id: '2', content: () => 'Second step: Complete your profile', link: () => <span>Edit profile</span> },
  { id: '3', content: () => 'Third step: Call us at', link: () => 12903812330 },
  {
    id: '4',
    content: () => 'Fourth step: Check this link',
    link: () => <span>Check this link</span>,
  },
];

describe('Basics', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert />,
    });

    const alert = page.root?.shadowRoot?.querySelector('.inline-alert');
    expect(alert).toBeTruthy();
    expect(alert).toHaveClass('inline-alert--vertical');
    expect(alert).toHaveClass('inline-alert--primary');
    expect(alert).toHaveClass('inline-alert--normal');
  });

  it('should render with warning variant', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => (
        <div>
          <ks-inline-alert variant="warning" />
        </div>
      ),
    });
    const alerts = page.root?.shadowRoot?.querySelectorAll('.inline-alert');
    expect(alerts?.[0]?.classList.contains('inline-alert--warning')).toBeTruthy();
  });

  it('should render with suggestion variant', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => (
        <div>
          <ks-inline-alert variant="suggestion" />
        </div>
      ),
    });
    const alerts = page.root?.shadowRoot?.querySelectorAll('.inline-alert');
    expect(alerts?.[0]?.classList.contains('inline-alert--support')).toBeTruthy();
  });

  it('should render with error variant', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => (
        <div>
          <ks-inline-alert variant="error" />
        </div>
      ),
    });
    const alerts = page.root?.shadowRoot?.querySelectorAll('.inline-alert');
    expect(alerts?.[0]?.classList.contains('inline-alert--error')).toBeTruthy();
  });

  it('should render with info variant', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => (
        <div>
          <ks-inline-alert variant="info" />
        </div>
      ),
    });
    const alerts = page.root?.shadowRoot?.querySelectorAll('.inline-alert');
    expect(alerts?.[0]?.classList.contains('inline-alert--primary')).toBeTruthy();
  });

  it('should render with success variant', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => (
        <div>
          <ks-inline-alert variant="success" />
        </div>
      ),
    });
    const alerts = page.root?.shadowRoot?.querySelectorAll('.inline-alert');
    expect(alerts?.[0]?.classList.contains('inline-alert--success')).toBeTruthy();
  });

  it('should render with inverse background', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert background="inverse" />,
    });

    const alert = page.root?.shadowRoot?.querySelector('.inline-alert');
    expect(alert?.classList.contains('inline-alert--inverse')).toBeTruthy();
  });

  it('should render with horizontal orientation', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert orientation="horizontal" />,
    });

    const alert = page.root?.shadowRoot?.querySelector('.inline-alert');
    expect(alert?.classList.contains('inline-alert--horizontal')).toBeTruthy();
  });

  it('should not show icon when showIcon is false', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert showIcon={false} />,
    });

    const icon = page.root?.shadowRoot?.querySelector('.inline-alert__icon');
    expect(icon).toBeFalsy();
  });

  it('should not show close button when closeable is false', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert closeable={false} />,
    });

    const closeButton = page.root?.shadowRoot?.querySelector('.inline-alert__close');
    expect(closeButton).toBeFalsy();
  });

  it('should render with small size', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert size="sm" />,
    });

    const alert = page.root?.shadowRoot?.querySelector('.inline-alert');
    expect(alert?.classList.contains('inline-alert--compact')).toBeTruthy();
  });

  it('should render with custom icon slot', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => (
        <ks-inline-alert>
          <span slot="icon">Custom Icon</span>
        </ks-inline-alert>
      ),
    });

    const icon = page.root?.shadowRoot?.querySelector('.inline-alert__icon');
    expect(icon).toBeTruthy();
  });

  it('should render with custom close button slot', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => (
        <ks-inline-alert>
          <button slot="close-btn">Custom Close</button>
        </ks-inline-alert>
      ),
    });

    const closeButton = page.root?.shadowRoot?.querySelector('.inline-alert__close');
    expect(closeButton).toBeTruthy();
  });

  it('should emit ksClose event when close button is clicked', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert />,
    });

    const closeSpy = jest.fn();
    page.root?.addEventListener('ksClose', closeSpy);

    page.rootInstance.handleClose();
    await page.waitForChanges();

    expect(closeSpy).toHaveBeenCalled();
  });
});

describe('Visibility', () => {
  it('should not render when visible is false', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert visible={false} />,
    });

    expect(page.root?.shadowRoot?.querySelector('.inline-alert')).toBeFalsy();
  });

  it('should render when visible is true', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert visible={true} />,
    });

    expect(page.root?.shadowRoot?.querySelector('.inline-alert')).toBeTruthy();
  });

  it('should be controlled by visible prop', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert disableAnimation visible={true} />,
    });
    const alert = page.root?.shadowRoot?.querySelector('.inline-alert');
    expect(alert).toBeTruthy();
    page.rootInstance.visible = false;
    await page.waitForChanges();
    const alertAfter = page.root?.shadowRoot?.querySelector('.inline-alert');
    expect(alertAfter).toBeFalsy();
    page.rootInstance.visible = true;
    await page.waitForChanges();
    const alertReappear = page.root?.shadowRoot?.querySelector('.inline-alert');
    expect(alertReappear).toBeTruthy();
  });

  it('should be controlled by visible prop with animation', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert visible={true} />,
    });
    const alert = page.root?.shadowRoot?.querySelector('.inline-alert');
    expect(alert).toBeTruthy();
    page.rootInstance.visible = false;
    await page.waitForChanges();
    const alertAfter = page.root?.shadowRoot?.querySelector('.inline-alert');
    expect(alertAfter).toBeFalsy();
    page.rootInstance.visible = true;
    await page.waitForChanges();
    const alertReappear = page.root?.shadowRoot?.querySelector('.inline-alert');
    expect(alertReappear).toBeTruthy();
  });
});

describe('KsInlineAlert MultiLayout', () => {
  it('should render with multi layout', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert items={items} />,
    });

    const content = page.root?.shadowRoot?.querySelector('.content');
    expect(content).toBeTruthy();
    const link = page.root?.shadowRoot?.querySelectorAll('.inline-alert__body-link');
    const contentText = page.root?.shadowRoot?.querySelectorAll('.inline-alert__body-content');
    expect(link?.length).toBe(4);
    expect(contentText?.length).toBe(4);
  });
  it('should be controlled by collapsed for multiLayout', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert items={items} collapsible={true} />,
    });
    const linkView = page.root?.shadowRoot?.querySelector('.inline-alert__link-view');
    expect(linkView).toBeTruthy();
    expect(linkView?.textContent?.trim().includes('View less')).toBeTruthy();
    page.rootInstance.collapsed = true;
    await page.waitForChanges();
    const linkViewAfter = page.root?.shadowRoot?.querySelector('.inline-alert__link-view');
    expect(linkViewAfter).toBeTruthy();
    expect(linkViewAfter?.textContent?.trim().includes('View more')).toBeTruthy();
    expect(linkViewAfter?.textContent?.trim().includes('View less')).toBeFalsy();
  });
});

describe('collapse function related', () => {
  // Test collapse functionality
  it('should toggle collapsed state when handleCollapseChange is called', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      html: `<ks-inline-alert collapsible="true"></ks-inline-alert>`,
    });

    const inlineAlert = page.rootInstance;
    const spy = jest.spyOn(inlineAlert.ksCollapseChange, 'emit');

    // Initial state should be expanded
    expect(inlineAlert.__collapsed).toBe(false);

    // Call collapse method
    inlineAlert.handleCollapseChange();
    await page.waitForChanges();

    // State should change to collapsed
    expect(inlineAlert.__collapsed).toBe(true);
    expect(spy).toHaveBeenCalledWith(true);

    // Call collapse method again
    inlineAlert.handleCollapseChange();
    await page.waitForChanges();

    // State should change back to expanded
    expect(inlineAlert.__collapsed).toBe(false);
    expect(spy).toHaveBeenCalledWith(false);
  });

  // Test external control of collapse state
  it('should respect collapsed prop when provided', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      html: `<ks-inline-alert collapsible="true" collapsed="true"></ks-inline-alert>`,
    });

    const inlineAlert = page.rootInstance;
    const spy = jest.spyOn(inlineAlert.ksCollapseChange, 'emit');

    // Initial state should be collapsed
    expect(inlineAlert.__collapsed).toBe(true);

    // Call collapse method
    inlineAlert.handleCollapseChange();
    await page.waitForChanges();

    // State should not change, but event should be emitted
    expect(inlineAlert.__collapsed).toBe(true);
    expect(spy).toHaveBeenCalledWith(true);
  });

  // Test collapse button display and functionality
  it('should show and handle collapse button when collapsible is true', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert collapsible={true} />,
    });

    // Check if "View more/less" link exists
    const viewLink = page.root?.shadowRoot?.querySelector('[data-testid="ks-inline-alert-index-mQ4tVh"]');
    expect(viewLink).not.toBeNull();

    const inlineAlert = page.rootInstance;
    const collapseChangeSpy = jest.spyOn(inlineAlert.ksCollapseChange, 'emit');

    // Initial state should show "View less"
    const linkText = page.root?.shadowRoot?.querySelector('.inline-alert__link-view');
    expect(linkText?.textContent?.trim()).toContain('View less');

    // Click collapse button
    viewLink?.dispatchEvent(new Event('click'));
    await page.waitForChanges();

    // State should change to collapsed, text should change to "View more"
    expect(inlineAlert.__collapsed).toBe(true);
    expect(collapseChangeSpy).toHaveBeenCalledWith(true);
    expect(linkText?.textContent?.trim()).toContain('View more');
  });
  it('should render with collapsible content', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert collapsible={true} />,
    });

    const link = page.root?.shadowRoot?.querySelector('.inline-alert__link');
    expect(link).toBeTruthy();
  });

  it('should render with collapsed content', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert collapsible={true} collapsed={true} />,
    });

    const linkView = page.root?.shadowRoot?.querySelector('.inline-alert__link-view');
    expect(linkView).toBeTruthy();
    expect(linkView?.textContent?.trim().includes('View more')).toBeTruthy();
    const content = page.root?.shadowRoot?.querySelector('.content');
    expect(content).toBeFalsy();
  });

  it('should be controlled by collapsed prop', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert collapsible={true} />,
    });

    const linkView = page.root?.shadowRoot?.querySelector('.inline-alert__link-view');
    expect(linkView).toBeTruthy();
    expect(linkView?.textContent?.trim().includes('View less')).toBeTruthy();
    page.rootInstance.collapsed = true;
    await page.waitForChanges();
    const linkViewAfter = page.root?.shadowRoot?.querySelector('.inline-alert__link-view');
    expect(linkViewAfter).toBeTruthy();
    expect(linkViewAfter?.textContent?.trim().includes('View less')).toBeFalsy();
    expect(linkViewAfter?.textContent?.trim().includes('View more')).toBeTruthy();
    // page.rootInstance.collapsed = false;
    // await page.waitForChanges();
    // const linkViewReExpand = page.root!.shadowRoot!.querySelector('.inline-alert__link-view');
    // expect(linkViewReExpand).toBeTruthy();
    // expect(linkViewReExpand?.textContent?.trim().includes('View less')).toBeTruthy();
    // expect(linkViewReExpand?.textContent?.trim().includes('View more')).toBeFalsy();
  });
});

describe('Events', () => {
  // Test multi-content layout and link clicks
  it('should render items and handle link clicks', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      html: `<ks-inline-alert></ks-inline-alert>`,
    });

    const inlineAlert = page.rootInstance;
    const linkClickSpy = jest.spyOn(inlineAlert.ksLinkClick, 'emit');

    // Set items property
    inlineAlert.items = [
      { id: 'item1', content: () => 'Content 1', link: () => 'Link 1' },
      { id: 'item2', content: () => 'Content 2', link: () => 'Link 2' },
    ];
    await page.waitForChanges();

    // Find link elements
    const links = page.root?.shadowRoot?.querySelectorAll('ks-link');
    expect(links?.length).toBeGreaterThan(0);

    // Simulate click on first link
    links?.[0]?.dispatchEvent(new Event('click'));
    await page.waitForChanges();

    // Verify event emission
    expect(linkClickSpy).toHaveBeenCalledWith('item1');
  });
  it('should emit ksCollapseChange event when collapse link is clicked', async () => {
    const page = await newSpecPage({
      components: [KsInlineAlert],
      template: () => <ks-inline-alert items={items} collapsible={true} />,
    });
    const collapseSpy = jest.fn();
    page.root?.addEventListener('ksCollapseChange', collapseSpy);
    const linkView = page.root?.shadowRoot?.querySelector('[data-testid="ks-inline-alert-index-4FuCAx"]');
    expect(linkView).toBeTruthy();
    linkView?.dispatchEvent(new Event('click'));
    expect(collapseSpy).toHaveBeenCalled();
  });
});
describe('Slots', () => {
  it('should apply renderDynamicSlots', async () => {
    const slots = KsInlineAlert.__internal_renderDynamicSlots({ items: [] }, () => {});
    expect(slots.length).toEqual(0);
  });
});
