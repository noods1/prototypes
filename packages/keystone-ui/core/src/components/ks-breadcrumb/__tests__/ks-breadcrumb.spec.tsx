import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsBreadcrumb } from '../ks-breadcrumb';
import type { BreadcrumbItem, BreadcrumbDropdownItem } from '@src/entities/components/breadcrumb';

describe('ks-breadcrumb component', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb></ks-breadcrumb>,
      });

      expect(page.root).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(page.root.tagName).toEqual('KS-BREADCRUMB');
      expect(page.root).toHaveAttribute('dir');
    });

    it('should render proper HTML structure', async () => {
      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const nav = page.root.shadowRoot.querySelector('nav');
      expect(nav).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(nav.tagName).toEqual('NAV');
      expect(nav).toHaveClasses(['breadcrumb', 'breadcrumb--md']);
      expect(nav).toEqualAttribute('part', 'self');
      expect(nav).toEqualAttribute('aria-label', 'breadcrumb');
    });

    it('should render wrapper element', async () => {
      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const wrapper = page.root.shadowRoot.querySelector('.breadcrumb__wrapper');
      expect(wrapper).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(wrapper.tagName).toEqual('OL');
    });

    it('should not render any items when value is empty', async () => {
      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const items = page.root.shadowRoot.querySelectorAll('a');
      expect(items).toHaveLength(0);
    });

    it('should not render any items when value is undefined', async () => {
      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={undefined}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const items = page.root.shadowRoot.querySelectorAll('a');
      expect(items).toHaveLength(0);
    });
  });

  // Single Item Tests
  describe('Single Item', () => {
    it('should render single breadcrumb item', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const breadcrumbItems = page.root.shadowRoot.querySelectorAll('li.breadcrumb-item');
      expect(breadcrumbItems).toHaveLength(1);

      const item = breadcrumbItems[0];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const itemLink = item.querySelector('a');
      expect(item).toHaveClass('breadcrumb-item');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(item.textContent).toEqual('Home');
      expect(itemLink).toEqualAttribute('href', '/home');
    });

    it('should render back arrow for single item by default', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const backArrow = page.root.shadowRoot.querySelector('.breadcrumb__back-arrow');
      expect(backArrow).toBeTruthy();
      expect(backArrow).toEqualAttribute('aria-hidden', 'true');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const icon = backArrow.querySelector('ks-icon-chevron-left');
      expect(icon).toBeTruthy();
      expect(icon).toEqualAttribute('size', '14');
    });

    it('should hide back arrow when hideBackArrow is true', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items} hideBackArrow></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const backArrow = page.root.shadowRoot.querySelector('.breadcrumb__separator');
      expect(backArrow).toBeFalsy();
    });

    it('should not render back arrow for multiple items', async () => {
      const items: BreadcrumbItem[] = [
        { value: 'Home', href: '/home' },
        { value: 'Products', href: '/products' },
      ];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const backArrow = page.root.shadowRoot.querySelector('ks-icon-chevron-left');
      expect(backArrow).toBeFalsy();
    });
  });

  // Multiple Items Tests
  describe('Multiple Items', () => {
    it('should render multiple breadcrumb items', async () => {
      const items: BreadcrumbItem[] = [
        { value: 'Home', href: '/home' },
        { value: 'Products', href: '/products' },
        { value: 'Category', href: '/products/category' },
      ];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const breadcrumbItems = page.root.shadowRoot.querySelectorAll('li.breadcrumb-item');
      expect(breadcrumbItems).toHaveLength(3);

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(breadcrumbItems[0].textContent).toEqual('Home');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(breadcrumbItems[1].textContent).toEqual('Products');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(breadcrumbItems[2].textContent).toEqual('Category');
    });

    it('should render separators between items', async () => {
      const items: BreadcrumbItem[] = [
        { value: 'Home', href: '/home' },
        { value: 'Products', href: '/products' },
        { value: 'Category', href: '/products/category' },
      ];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const separators = page.root.shadowRoot.querySelectorAll('.breadcrumb__separator');
      expect(separators).toHaveLength(2); // 2 separators for 3 items

      separators.forEach((separator) => {
        expect(separator).toEqualAttribute('aria-hidden', 'true');
        const icon = separator.querySelector('ks-icon-chevron-right');
        expect(icon).toBeTruthy();
        expect(icon).toEqualAttribute('size', '14');
      });
    });

    it('should not render separator after last item', async () => {
      const items: BreadcrumbItem[] = [
        { value: 'Home', href: '/home' },
        { value: 'Products', href: '/products' },
      ];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const separators = page.root.shadowRoot.querySelectorAll('.breadcrumb__separator');
      expect(separators).toHaveLength(1); // 1 separator for 2 items
    });
  });

  describe('Dropdown Items', () => {
    it('should render dropdown breadcrumb item', async () => {
      const items: (BreadcrumbItem | BreadcrumbDropdownItem)[] = [
        { value: 'Dashboard', href: '#' },
        {
          value: 'Dropdown',
          children: [
            { value: 'Home', href: '/home' },
            { value: 'Products', href: '/products' },
            { value: 'Category', href: '/products/category' },
          ],
        },
      ];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const breadcrumbItems = page.root.shadowRoot.querySelectorAll('.breadcrumb-item');

      expect(breadcrumbItems[1]?.tagName).toBe('DIV');
    });

    it('should expand dropdown items when click', async () => {
      const items: (BreadcrumbItem | BreadcrumbDropdownItem)[] = [
        { value: 'Dashboard', href: '#' },
        {
          value: 'Dropdown',
          children: [
            { value: 'Home', href: '/home' },
            { value: 'Products', href: '/products' },
            { value: 'Category', href: '/products/category' },
          ],
        },
      ];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const breadcrumbDropdownItems = page.root.shadowRoot.querySelectorAll('ks-dropdown-menu');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      breadcrumbDropdownItems[0].dispatchEvent(new CustomEvent('ksVisibleChange', { detail: true }));
      await page.waitForChanges();

      expect(breadcrumbDropdownItems[0]).toHaveClass('breadcrumb-item--expanded');

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      breadcrumbDropdownItems[0].dispatchEvent(new CustomEvent('ksVisibleChange', { detail: false }));
      await page.waitForChanges();

      expect(breadcrumbDropdownItems[0]).not.toHaveClass('breadcrumb-item--expanded');
    });

    it('should emit ksClickDropdownItem event when click dropdown item', async () => {
      const items: (BreadcrumbItem | BreadcrumbDropdownItem)[] = [
        { value: 'Dashboard', href: '#' },
        {
          value: 'Dropdown',
          children: [
            { value: 'Home', href: '/home' },
            { value: 'Products', href: '/products' },
            { value: 'Category', href: '/products/category' },
          ],
        },
      ];

      const clickSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items} onKsClickDropdownItem={clickSpy}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const breadcrumbItems = page.root.shadowRoot.querySelectorAll('ks-dropdown-menu');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      breadcrumbItems[0].dispatchEvent(new CustomEvent('ksValueChange', { detail: [{ id: 'Home' }] }));
      await page.waitForChanges();

      expect(clickSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: 'Home' }));
    });
  });

  // Item States Tests
  describe('Item States', () => {
    it('should render active item correctly', async () => {
      const items: BreadcrumbItem[] = [
        { value: 'Home', href: '/home' },
        { value: 'Products', href: '/products', active: true },
      ];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const breadcrumbItems = page.root.shadowRoot.querySelectorAll('li.breadcrumb-item');
      expect(breadcrumbItems[0]).not.toHaveClass('breadcrumb-item--active');
      expect(breadcrumbItems[1]).toHaveClass('breadcrumb-item--active');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(breadcrumbItems[1].querySelector('a')).toEqualAttribute('aria-current', 'page');
    });

    it('should render disabled item correctly', async () => {
      const items: BreadcrumbItem[] = [
        { value: 'Home', href: '/home' },
        { value: 'Products', href: '/products', disabled: true },
      ];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const breadcrumbItems = page.root.shadowRoot.querySelectorAll('li.breadcrumb-item');
      expect(breadcrumbItems[0]).not.toHaveClass('breadcrumb-item--disabled');
      expect(breadcrumbItems[1]).toHaveClass('breadcrumb-item--disabled');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(breadcrumbItems[1].querySelector('a')).toHaveAttribute('aria-disabled');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(breadcrumbItems[1].querySelector('a')).not.toHaveAttribute('href');
    });

    it('should handle item with both active and disabled states', async () => {
      const items: BreadcrumbItem[] = [
        { value: 'Home', href: '/home' },
        { value: 'Products', href: '/products', active: true, disabled: true },
      ];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const breadcrumbItems = page.root.shadowRoot.querySelectorAll('li.breadcrumb-item');
      const item = breadcrumbItems[1];
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const itemLink = item.querySelector('a');
      expect(item).toHaveClasses(['breadcrumb-item--active', 'breadcrumb-item--disabled']);
      expect(itemLink).toEqualAttribute('aria-current', 'page');
      expect(itemLink).toHaveAttribute('aria-disabled');
      expect(itemLink).not.toHaveAttribute('href');
    });
  });

  // Href and Target Tests
  describe('Href and Target', () => {
    it('should render href attribute when provided', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(item.getAttribute('href')).toEqual('/home');
    });

    it('should not render href attribute when not provided', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      expect(item).not.toHaveAttribute('href');
    });

    it('should not render href attribute when disabled', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home', disabled: true }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      expect(item).not.toHaveAttribute('href');
    });

    it('should render target attribute when provided', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home', target: '_blank' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(item.getAttribute('target')).toEqual('_blank');
    });

    it('should default to _self target when href is provided but target is not', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(item.getAttribute('target')).toEqual('_self');
    });

    it('should not render target attribute when href is not provided', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', target: '_blank' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      expect(item).not.toHaveAttribute('target');
    });
  });

  // Target Values Tests
  describe('Target Values', () => {
    const targets = ['_self', '_blank', '_parent', '_top', 'framename'];

    targets.forEach((target) => {
      it(`should render ${target} target correctly`, async () => {
        const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home', target: target as any }];

        const page = await newSpecPage({
          components: [KsBreadcrumb],
          template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
        });

        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const item = page.root.shadowRoot.querySelector('a');
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        expect(item.getAttribute('target')).toEqual(target);
      });
    });
  });

  // CSS Class Logic Tests
  describe('CSS Class Logic', () => {
    it('should apply base breadcrumb-item class', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('li.breadcrumb-item');
      expect(item).toHaveClass('breadcrumb-item');
    });

    it('should apply active class when item is active', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home', active: true }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('li.breadcrumb-item');
      expect(item).toHaveClasses(['breadcrumb-item', 'breadcrumb-item--active']);
    });

    it('should apply disabled class when item is disabled', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home', disabled: true }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('li.breadcrumb-item');
      expect(item).toHaveClasses(['breadcrumb-item', 'breadcrumb-item--disabled']);
    });

    it('should combine active and disabled classes', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home', active: true, disabled: true }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('li.breadcrumb-item');
      expect(item).toHaveClasses(['breadcrumb-item', 'breadcrumb-item--active', 'breadcrumb-item--disabled']);
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('should have proper nav element with aria-label', async () => {
      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const nav = page.root.shadowRoot.querySelector('nav');
      expect(nav).toEqualAttribute('aria-label', 'breadcrumb');
    });

    it('should have proper part attribute on nav', async () => {
      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const nav = page.root.shadowRoot.querySelector('nav');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(nav.getAttribute('part')).toEqual('self');
    });

    it('should have proper part attribute on items', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(item.getAttribute('part')).toEqual('self');
    });

    it('should have aria-current attribute for active items', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home', active: true }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      expect(item).toEqualAttribute('aria-current', 'page');
    });

    it('should have aria-disabled attribute for disabled items', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home', disabled: true }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      expect(item).toHaveAttribute('aria-disabled');
    });

    it('should have aria-hidden attribute on separator icons', async () => {
      const items: BreadcrumbItem[] = [
        { value: 'Home', href: '/home' },
        { value: 'Products', href: '/products' },
      ];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const separator = page.root.shadowRoot.querySelector('.breadcrumb__separator');
      expect(separator).toEqualAttribute('aria-hidden', 'true');
    });

    it('should have aria-hidden attribute on back arrow icon', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const backArrow = page.root.shadowRoot.querySelector('.breadcrumb__back-arrow');
      expect(backArrow).toBeTruthy();
      expect(backArrow).toEqualAttribute('aria-hidden', 'true');
    });
  });

  // RTL Support Tests
  describe('RTL Support', () => {
    it('should have dir attribute on host element', async () => {
      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb></ks-breadcrumb>,
      });

      expect(page.root).toHaveAttribute('dir');
    });

    it('should have dir attribute on nav element', async () => {
      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const nav = page.root.shadowRoot.querySelector('nav');
      expect(nav).toHaveAttribute('dir');
    });

    it('should have dir attribute on breadcrumb items', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      expect(item).toHaveAttribute('dir');
    });
  });

  // Complex Scenarios
  describe('Complex Scenarios', () => {
    it('should handle complex breadcrumb trail', async () => {
      const items: BreadcrumbItem[] = [
        { value: 'Home', href: '/home' },
        { value: 'Products', href: '/products' },
        { value: 'Electronics', href: '/products/electronics' },
        { value: 'Smartphones', href: '/products/electronics/smartphones', active: true },
      ];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const breadcrumbItems = page.root.shadowRoot.querySelectorAll('li.breadcrumb-item');
      expect(breadcrumbItems).toHaveLength(4);

      // Check separators
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const separators = page.root.shadowRoot.querySelectorAll('.breadcrumb__separator');
      expect(separators).toHaveLength(3); // 3 separators for 4 items

      // Check active item
      expect(breadcrumbItems[3]).toHaveClass('breadcrumb-item--active');
    });

    it('should handle items with various states and targets', async () => {
      const items: BreadcrumbItem[] = [
        { value: 'Home', href: '/home', target: '_self' },
        { value: 'Products', href: '/products', target: '_blank' },
        { value: 'Category', disabled: true },
        { value: 'Current', active: true },
      ];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const breadcrumbItems = page.root.shadowRoot.querySelectorAll('a');

      // Check first item
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(breadcrumbItems[0].getAttribute('target')).toEqual('_self');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(breadcrumbItems[0].getAttribute('href')).toEqual('/home');

      // Check second item
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(breadcrumbItems[1].getAttribute('target')).toEqual('_blank');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(breadcrumbItems[1].getAttribute('href')).toEqual('/products');

      // Check disabled item
      expect(breadcrumbItems[2]).toHaveAttribute('aria-disabled');
      expect(breadcrumbItems[2]).not.toHaveAttribute('href');

      // Check active item
      expect(breadcrumbItems[3]).toEqualAttribute('aria-current', 'page');
    });

    it('should handle single item with hideBackArrow', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home', active: true }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items} hideBackArrow></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const breadcrumbItems = page.root.shadowRoot.querySelectorAll('li');
      expect(breadcrumbItems).toHaveLength(1);

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const backArrow = page.root.shadowRoot.querySelector('.breadcrumb__separator');
      expect(backArrow).toBeFalsy();

      // Check active item
      expect(breadcrumbItems[0]).toHaveClass('breadcrumb-item--active');
    });

    it('should handle empty array', async () => {
      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={[]}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const breadcrumbItems = page.root.shadowRoot.querySelectorAll('a');
      expect(breadcrumbItems).toHaveLength(0);

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const separators = page.root.shadowRoot.querySelectorAll('.breadcrumb__separator');
      expect(separators).toHaveLength(0);
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should handle item with empty value', async () => {
      const items: BreadcrumbItem[] = [{ value: '', href: '/home' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      expect(item).toBeTruthy();
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(item.textContent).toEqual('');
    });

    it('should handle item with undefined href', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: undefined }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      expect(item).not.toHaveAttribute('href');
      expect(item).not.toHaveAttribute('target');
    });

    it('should handle item with null href', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: null as any }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      expect(item).not.toHaveAttribute('href');
      expect(item).not.toHaveAttribute('target');
    });

    it('should handle item with empty href', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '' }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(item.getAttribute('href')).toEqual('');
    });

    it('should handle item with undefined target', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home', target: undefined }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(item.getAttribute('target')).toEqual('_self'); // Should default to _self
    });

    it('should handle item with null target', async () => {
      const items: BreadcrumbItem[] = [{ value: 'Home', href: '/home', target: null as any }];

      const page = await newSpecPage({
        components: [KsBreadcrumb],
        template: () => <ks-breadcrumb value={items}></ks-breadcrumb>,
      });

      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      const item = page.root.shadowRoot.querySelector('a');
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(item.getAttribute('target')).toEqual('_self'); // Should default to _self
    });
  });
});
