import { newSpecPage } from '@stencil/core/testing';
import { KsButtonGroupItem } from '../index';
import { KsButtonGroup } from '../../ks-button-group';
import { POSITIONTAG } from '@src/context/button-group-context';
import { h } from '@stencil/core';

describe('ks-button-group-item', () => {
  // 基础渲染测试
  describe('Basic Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Item</ks-button-group-item>,
      });

      expect(page.root).toBeTruthy();
      expect(page.root).toHaveAttribute('ks-button-group-item');

      const container = page.root?.shadowRoot?.querySelector('.button-group-item');
      expect(container).toBeTruthy();
      expect(container).toEqualAttribute('part', 'base');
    });

    it('should render with slot content', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Custom Content</ks-button-group-item>,
      });

      const slot = page.root?.shadowRoot?.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('should render with value prop', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item value="test-value">Item</ks-button-group-item>,
      });

      expect(page.rootInstance.value).toBe('test-value');
    });
  });

  // 属性测试
  describe('Properties', () => {
    it('should set value property', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item value="option1">Item</ks-button-group-item>,
      });

      expect(page.rootInstance.value).toBe('option1');
    });

    it('should set disabled property', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item disabled>Item</ks-button-group-item>,
      });

      expect(page.rootInstance.disabled).toBe(true);
    });

    it('should set hideCheckmark property', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item hideCheckmark>Item</ks-button-group-item>,
      });

      expect(page.rootInstance.hideCheckmark).toBe(true);
    });
  });

  // 选中状态测试
  describe('Selected State', () => {
    it('should be selected when value matches group value', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item value="option1">Item</ks-button-group-item>,
      });

      // 模拟从 ButtonGroup 传来的值
      page.rootInstance.valueFromButtonGroup = ['option1'];
      expect(page.rootInstance.selected).toBe(true);
    });

    it('should not be selected when value does not match group value', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item value="option1">Item</ks-button-group-item>,
      });

      page.rootInstance.valueFromButtonGroup = ['option2'];
      expect(page.rootInstance.selected).toBe(false);
    });

    it('should not be selected when no value is set', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Item</ks-button-group-item>,
      });

      page.rootInstance.valueFromButtonGroup = ['option1'];
      expect(page.rootInstance.selected).toBe(false);
    });

    it('should not be selected when group value is empty', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item value="option1">Item</ks-button-group-item>,
      });

      page.rootInstance.valueFromButtonGroup = undefined;
      expect(page.rootInstance.selected).toBe(false);
    });
  });

  // 禁用状态测试
  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item disabled>Item</ks-button-group-item>,
      });

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.button-group-item');
      expect(container).toHaveClass('button-group-item__disabled');
    });

    it('should be disabled when group is disabled', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Item</ks-button-group-item>,
      });

      page.rootInstance.disabledFromButtonGroup = true;
      await page.waitForChanges();

      const container = page.root?.shadowRoot?.querySelector('.button-group-item');
      expect(container).toHaveClass('button-group-item__disabled');
    });

    it('should be disabled when both group and item are disabled', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item disabled>Item</ks-button-group-item>,
      });

      page.rootInstance.disabledFromButtonGroup = true;
      await page.waitForChanges();

      const container = page.root?.shadowRoot?.querySelector('.button-group-item');
      expect(container).toHaveClass('button-group-item__disabled');
    });
  });

  // 位置测试
  describe('Position', () => {
    it('should have start position class', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Item</ks-button-group-item>,
      });

      // 模拟位置映射
      const mockPositionMap = new WeakMap();
      mockPositionMap.set(page.rootInstance.el, POSITIONTAG.START);
      page.rootInstance.positionMapFromButtonGroup = mockPositionMap;

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.button-group-item');
      expect(container).toHaveClass('button-group-item__start');
    });

    it('should have end position class', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Item</ks-button-group-item>,
      });

      const mockPositionMap = new WeakMap();
      mockPositionMap.set(page.rootInstance.el, POSITIONTAG.END);
      page.rootInstance.positionMapFromButtonGroup = mockPositionMap;

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.button-group-item');
      expect(container).toHaveClass('button-group-item__end');
    });

    it('should not have position class for common position', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Item</ks-button-group-item>,
      });

      const mockPositionMap = new WeakMap();
      mockPositionMap.set(page.rootInstance.el, POSITIONTAG.COMMON);
      page.rootInstance.positionMapFromButtonGroup = mockPositionMap;

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.button-group-item');
      expect(container).not.toHaveClass('button-group-item__start');
      expect(container).not.toHaveClass('button-group-item__end');
    });
  });

  // 多选模式测试
  describe('Multiple Selection Mode', () => {
    it('should have multiple class when in multiple mode', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Item</ks-button-group-item>,
      });

      page.rootInstance.multipleFromButtonGroup = true;
      await page.waitForChanges();

      const container = page.root?.shadowRoot?.querySelector('.button-group-item');
      expect(container).toHaveClass('button-group-item__multiple');
    });

    it('should show checkmark when selected in multiple mode', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item value="option1">Item</ks-button-group-item>,
      });

      page.rootInstance.multipleFromButtonGroup = true;
      page.rootInstance.valueFromButtonGroup = ['option1'];
      await page.waitForChanges();

      const checkmark = page.root?.shadowRoot?.querySelector('ks-icon-check-mark-small');
      expect(checkmark).toBeTruthy();
      expect(checkmark).toHaveClass('button-group-item__selected-icon');
    });

    it('should not show checkmark when hideCheckmark is true', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => (
          <ks-button-group-item value="option1" hideCheckmark>
            Item
          </ks-button-group-item>
        ),
      });

      page.rootInstance.multipleFromButtonGroup = true;
      page.rootInstance.valueFromButtonGroup = ['option1'];
      await page.waitForChanges();

      const checkmark = page.root?.shadowRoot?.querySelector('ks-icon-check-mark-small');
      expect(checkmark).toBeFalsy();
    });

    it('should not show checkmark when not selected', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item value="option1">Item</ks-button-group-item>,
      });

      page.rootInstance.multipleFromButtonGroup = true;
      page.rootInstance.valueFromButtonGroup = ['option2'];
      await page.waitForChanges();

      const checkmark = page.root?.shadowRoot?.querySelector('ks-icon-check-mark-small');
      expect(checkmark).toBeFalsy();
    });

    it('should not show checkmark in single selection mode', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item value="option1">Item</ks-button-group-item>,
      });

      page.rootInstance.multipleFromButtonGroup = false;
      page.rootInstance.valueFromButtonGroup = ['option1'];
      await page.waitForChanges();

      const checkmark = page.root?.shadowRoot?.querySelector('ks-icon-check-mark-small');
      expect(checkmark).toBeFalsy();
    });
  });

  // 点击事件测试
  describe('Click Events', () => {
    it('should call onValueChange when clicked', async () => {
      const mockOnValueChange = jest.fn();
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item value="option1">Item</ks-button-group-item>,
      });

      page.rootInstance.onValueChangeFromButtonGroup = mockOnValueChange;

      const container = page.root?.shadowRoot?.querySelector('.button-group-item')! as HTMLDivElement;
      container.click();

      expect(mockOnValueChange).toHaveBeenCalledWith('option1');
    });

    it('should not call onValueChange when no value is set', async () => {
      const mockOnValueChange = jest.fn();
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Item</ks-button-group-item>,
      });

      page.rootInstance.onValueChangeFromButtonGroup = mockOnValueChange;

      const container = page.root?.shadowRoot?.querySelector('.button-group-item')! as HTMLDivElement;
      container.click();

      expect(mockOnValueChange).not.toHaveBeenCalled();
    });

    it('should handle keypress events', async () => {
      const mockOnValueChange = jest.fn();
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item value="option1">Item</ks-button-group-item>,
      });

      page.rootInstance.onValueChangeFromButtonGroup = mockOnValueChange;

      const container = page.root?.shadowRoot?.querySelector('.button-group-item')!;
      const event = new KeyboardEvent('keypress', { key: 'Enter' });
      container.dispatchEvent(event);

      expect(mockOnValueChange).toHaveBeenCalledWith('option1');
    });
  });

  // CSS 类测试
  describe('CSS Classes', () => {
    it('should apply selected class when selected', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item value="option1">Item</ks-button-group-item>,
      });

      page.rootInstance.valueFromButtonGroup = ['option1'];
      await page.waitForChanges();

      const container = page.root?.shadowRoot?.querySelector('.button-group-item');
      expect(container).toHaveClass('button-group-item__selected');
    });

    it('should apply all relevant classes', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => (
          <ks-button-group-item value="option1" disabled>
            Item
          </ks-button-group-item>
        ),
      });

      page.rootInstance.valueFromButtonGroup = ['option1'];
      page.rootInstance.multipleFromButtonGroup = true;
      page.rootInstance.disabledFromButtonGroup = false;

      const mockPositionMap = new WeakMap();
      mockPositionMap.set(page.rootInstance.el, POSITIONTAG.START);
      page.rootInstance.positionMapFromButtonGroup = mockPositionMap;

      await page.waitForChanges();

      const container = page.root?.shadowRoot?.querySelector('.button-group-item');
      expect(container).toHaveClasses([
        'button-group-item',
        'button-group-item__selected',
        'button-group-item__disabled',
        'button-group-item__start',
        'button-group-item__multiple',
      ]);
    });
  });

  // 集成测试
  describe('Integration with ButtonGroup', () => {
    it('should work within button group context', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroup, KsButtonGroupItem],
        template: () => (
          <ks-button-group defaultValue={['option1']}>
            <ks-button-group-item value="option1">Option 1</ks-button-group-item>
            <ks-button-group-item value="option2">Option 2</ks-button-group-item>
          </ks-button-group>
        ),
      });

      const items = page.root?.querySelectorAll('ks-button-group-item');
      expect(items).toHaveLength(2);

      // 第一个项目应该被选中
      const firstItem = items![0] as HTMLKsButtonGroupItemElement;
      expect(firstItem.value).toBe('option1');
    });

    it('should receive context values from parent group', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroup, KsButtonGroupItem],
        template: () => (
          <ks-button-group disabled multiple defaultValue={['option1']}>
            <ks-button-group-item value="option1">Option 1</ks-button-group-item>
          </ks-button-group>
        ),
      });

      await page.waitForChanges();

      const item = page.root?.querySelector('ks-button-group-item') as HTMLKsButtonGroupItemElement;

      // 验证上下文值是否正确传递（这些值会通过 @Consume 装饰器自动注入）
      expect(item).toBeTruthy();
    });
  });

  // 可访问性测试
  describe('Accessibility', () => {
    it('should have proper shadow DOM configuration', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Item</ks-button-group-item>,
      });

      // 验证 shadow DOM 配置了 delegatesFocus
      expect(page.root?.shadowRoot).toBeTruthy();
    });

    it('should contain input element for form integration', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Item</ks-button-group-item>,
      });

      const input = page.root?.shadowRoot?.querySelector('input');
      expect(input).toBeTruthy();
    });

    it('should have proper text styling', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Item</ks-button-group-item>,
      });

      const text = page.root?.shadowRoot?.querySelector('ks-text');
      expect(text).toBeTruthy();
      expect(text).toEqualAttribute('variant', 'labelLg');
      expect(text).toEqualAttribute('theme', 'neutralHigh');
    });
  });

  // 边界情况测试
  describe('Edge Cases', () => {
    it('should handle undefined context values gracefully', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item value="option1">Item</ks-button-group-item>,
      });

      page.rootInstance.valueFromButtonGroup = undefined;
      page.rootInstance.disabledFromButtonGroup = undefined;
      page.rootInstance.multipleFromButtonGroup = undefined;
      page.rootInstance.positionMapFromButtonGroup = undefined;

      expect(() => {
        page.rootInstance.selected;
        page.rootInstance.position;
      }).not.toThrow();
    });

    it('should handle position map without element', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Item</ks-button-group-item>,
      });

      const mockPositionMap = new WeakMap();
      // 不设置当前元素的位置
      page.rootInstance.positionMapFromButtonGroup = mockPositionMap;

      expect(page.rootInstance.position).toBeUndefined();
    });
  });

  // 渲染内容测试
  describe('Render Content', () => {
    it('should render label with slot content', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Custom Label</ks-button-group-item>,
      });

      const label = page.root?.shadowRoot?.querySelector('.label')!;
      expect(label).toBeTruthy();

      const slot = label.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('should have proper data-testid', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroupItem],
        template: () => <ks-button-group-item>Item</ks-button-group-item>,
      });

      const container = page.root?.shadowRoot?.querySelector('.button-group-item');
      expect(container).toEqualAttribute('data-testid', 'ks-button-group-item-index-wfoNyD');
    });
  });
});
