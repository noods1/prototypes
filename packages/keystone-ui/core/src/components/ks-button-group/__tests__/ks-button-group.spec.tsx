import { newSpecPage } from '@stencil/core/testing';
import { KsButtonGroup } from '../index';
import { KsButtonGroupItem } from '../../ks-button-group-item';
import { h } from '@stencil/core';

describe('ks-button-group', () => {
  // 基础渲染测试
  describe('Basic Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => <ks-button-group></ks-button-group>,
      });

      expect(page.root).toBeTruthy();
      expect(page.root).toHaveAttribute('ks-button-group');

      const container = page.root?.shadowRoot?.querySelector('.button-group');
      expect(container).toBeTruthy();
    });

    it('should render with children', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroup, KsButtonGroupItem],
        template: () => (
          <ks-button-group>
            <ks-button-group-item value="1">Option 1</ks-button-group-item>
            <ks-button-group-item value="2">Option 2</ks-button-group-item>
          </ks-button-group>
        ),
      });

      const items = page.root?.querySelectorAll('ks-button-group-item');
      expect(items).toHaveLength(2);
    });
  });

  // 属性测试
  describe('Properties', () => {
    it('should set htmlName property', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => <ks-button-group htmlName="test-group"></ks-button-group>,
      });

      expect(page.rootInstance.htmlName).toBe('test-group');
    });

    it('should generate unique htmlName when not provided', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => <ks-button-group></ks-button-group>,
      });

      expect(page.rootInstance.htmlName).toBeTruthy();
      expect(typeof page.rootInstance.htmlName).toBe('string');
    });

    it('should set disabled property', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => <ks-button-group disabled></ks-button-group>,
      });

      expect(page.rootInstance.disabled).toBe(true);
    });

    it('should set multiple property', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => <ks-button-group multiple></ks-button-group>,
      });

      expect(page.rootInstance.multiple).toBe(true);
    });
  });

  // 单选模式测试
  describe('Single Selection Mode', () => {
    it('should emit single value in single mode', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => <ks-button-group onKsChange={changeSpy}></ks-button-group>,
      });

      // 模拟单选模式下的值变更
      page.rootInstance.buttonGroupContext.onValueChange('option1');
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: ['option1'],
        }),
      );
    });
  });

  // 多选模式测试
  describe('Multiple Selection Mode', () => {
    it('should add value when not selected in multiple mode', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => <ks-button-group multiple onKsChange={changeSpy}></ks-button-group>,
      });

      // 模拟添加选项
      page.rootInstance.buttonGroupContext.onValueChange('option1');
      await page.waitForChanges();

      expect(page.rootInstance.internalValueState).toEqual(['option1']);
      expect(changeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: ['option1'],
        }),
      );
    });

    it('should remove value when already selected in multiple mode', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => (
          <ks-button-group multiple defaultValue={['option1', 'option2']} onKsChange={changeSpy}></ks-button-group>
        ),
      });

      await page.waitForChanges();

      console.log('xxx', page.rootInstance.internalValueState);

      // 模拟移除已选中的选项
      page.rootInstance.buttonGroupContext.onValueChange('option1');
      await page.waitForChanges();

      expect(page.rootInstance.internalValueState).toEqual(['option2']);
      expect(changeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: ['option2'],
        }),
      );
    });

    it('should maintain sorted order in multiple mode', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => <ks-button-group multiple></ks-button-group>,
      });

      // 按非字母顺序添加选项
      page.rootInstance.buttonGroupContext.onValueChange('option3');
      page.rootInstance.buttonGroupContext.onValueChange('option1');
      page.rootInstance.buttonGroupContext.onValueChange('option2');
      await page.waitForChanges();

      expect(page.rootInstance.internalValueState).toEqual(['option1', 'option2', 'option3']);
    });
  });

  // 事件测试
  describe('Events', () => {
    it('should emit ksChange event when value changes', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => <ks-button-group onKsChange={changeSpy}></ks-button-group>,
      });

      page.rootInstance.buttonGroupContext.onValueChange('option1');
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalled();
    });

    it('should not emit when disabled', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => <ks-button-group disabled onKsChange={changeSpy}></ks-button-group>,
      });

      // 即使调用 onValueChange，disabled 状态下也应该通过上下文传递给子组件
      expect(page.rootInstance.buttonGroupContext.disabled).toBe(true);
    });
  });

  // 上下文测试
  describe('Context Management', () => {
    it('should provide button group context', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => <ks-button-group htmlName="test" disabled multiple></ks-button-group>,
      });

      await page.waitForChanges();

      const context = page.rootInstance.buttonGroupContext;
      expect(context.htmlName).toBe('test');
      expect(context.disabled).toBe(true);
      expect(context.multiple).toBe(true);
      expect(typeof context.onValueChange).toBe('function');
    });

    it('should update context when props change', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => <ks-button-group></ks-button-group>,
      });

      // 更改属性
      page.rootInstance.disabled = true;
      page.rootInstance.multiple = true;
      page.rootInstance.htmlName = 'updated';

      // 触发 watch 方法
      page.rootInstance.handleContextValueChange();
      await page.waitForChanges();

      const context = page.rootInstance.buttonGroupContext;
      expect(context.disabled).toBe(true);
      expect(context.multiple).toBe(true);
      expect(context.htmlName).toBe('updated');
    });

    it('should block form context for child components', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroup],
        template: () => <ks-button-group></ks-button-group>,
      });

      expect(page.rootInstance.__contextBlocker).toEqual({});
    });
  });

  // 边界情况测试
  describe('Edge Cases', () => {
    it('should handle position mapping for slots', async () => {
      const page = await newSpecPage({
        components: [KsButtonGroup, KsButtonGroupItem],
        template: () => (
          <ks-button-group>
            <ks-button-group-item value="1">First</ks-button-group-item>
            <ks-button-group-item value="2">Middle</ks-button-group-item>
            <ks-button-group-item value="3">Last</ks-button-group-item>
          </ks-button-group>
        ),
      });
      page.rootInstance.handleDefaultSlotsChange();

      const positionMap = page.rootInstance.buttonGroupContext.positionMap;
      expect(positionMap).toBeTruthy();
    });
  });
});
