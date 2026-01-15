import { newSpecPage } from '@stencil/core/testing';
import { KsTextField } from '../index';
import { h } from '@stencil/core';

describe('KsTextField', () => {
  // 基础渲染测试
  describe('Basic Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field></ks-text-field>,
      });

      expect(page.root).toBeTruthy();
      expect(page.root).toHaveAttribute('ks-textarea');

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
      expect(textarea).toBeTruthy();
      expect(textarea).toEqualAttribute('part', 'textarea');
    });

    it('should render with value', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field value="test value"></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
      expect(textarea.value).toBe('test value');
      expect(page.rootInstance.internalValueState).toBe('test value');
    });

    it('should render with defaultValue', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field defaultValue="default test"></ks-text-field>,
      });

      expect(page.rootInstance.internalValueState).toBe('default test');
    });

    it('should render with placeholder', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field placeholder="Enter text"></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea');
      expect(textarea).toEqualAttribute('placeholder', 'Enter text');
    });
  });

  // 属性测试
  describe('Properties', () => {
    it('should set disabled property', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field disabled></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea');
      const wrapper = page.root?.shadowRoot?.querySelector('.text-field__wrapper');

      expect(textarea).toHaveAttribute('disabled');
      expect(wrapper).toHaveClass('text-field__wrapper--disabled');
    });

    it('should set readOnly property', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field readOnly></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea');
      expect(textarea).toHaveAttribute('readonly');
    });

    it('should set autoFocus property', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field autoFocus></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea');
      expect(textarea).toHaveAttribute('autofocus');
    });

    it('should set autoComplete property', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field autoComplete="on"></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea');
      expect(textarea).toEqualAttribute('autocomplete', 'on');
    });

    it('should set resize property', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field resize="vertical"></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
      expect(textarea.style.resize).toBe('vertical');
    });

    it('should set maxLength property', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field maxLength={100} showCount></ks-text-field>,
      });

      const countElement = page.root?.shadowRoot?.querySelector('.text-field__count');
      expect(countElement).toBeTruthy();
    });

    it('should set height property as string', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field height="200px"></ks-text-field>,
      });

      expect(page.rootInstance.height).toBe('200px');
    });

    it('should set height property as object', async () => {
      const heightConfig = { min: '100px', max: '300px' };
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field height={heightConfig}></ks-text-field>,
      });

      expect(page.rootInstance.height).toEqual(heightConfig);
    });
  });

  // 事件测试
  describe('Events', () => {
    it('should emit ksChange event on input', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field onKsChange={changeSpy}></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
      textarea.value = 'new value';
      textarea.dispatchEvent(new Event('input'));

      await page.waitForChanges();
      expect(changeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: 'new value',
        }),
      );
    });

    it('should emit ksFocus event on focus', async () => {
      const focusSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field onKsFocus={focusSpy}></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
      textarea.dispatchEvent(new FocusEvent('focus'));

      expect(focusSpy).toHaveBeenCalled();
      expect(page.rootInstance.isFocus).toBe(true);
    });

    it('should emit ksBlur event on blur', async () => {
      const blurSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field onKsBlur={blurSpy}></ks-text-field>,
      });

      page.rootInstance.isFocus = true;

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
      textarea.dispatchEvent(new FocusEvent('blur'));

      expect(blurSpy).toHaveBeenCalled();
      expect(page.rootInstance.isFocus).toBe(false);
    });

    it('should emit ksClick event when textarea is clicked', async () => {
      const clickSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field onKsClick={clickSpy}></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
      const clickEvent = new MouseEvent('click');
      textarea.dispatchEvent(clickEvent);

      expect(clickSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: clickEvent,
        }),
      );
    });

    it('should emit ksKeydownEnter event when Enter key is pressed', async () => {
      const keydownEnterSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field onKsKeydownEnter={keydownEnterSpy}></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      textarea.dispatchEvent(enterEvent);

      expect(keydownEnterSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: enterEvent,
        }),
      );
    });
  });

  // 方法测试
  describe('Methods', () => {
    it('should focus textarea when focusInput method is called', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
      const focusSpy = jest.spyOn(textarea, 'focus');

      await page.rootInstance.focusInput();
      expect(focusSpy).toHaveBeenCalled();
      expect(page.rootInstance.isFocus).toBe(true);
    });

    it('should blur textarea when blurInput method is called', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
      const blurSpy = jest.spyOn(textarea, 'blur');

      await page.rootInstance.blurInput();
      expect(blurSpy).toHaveBeenCalled();
      expect(page.rootInstance.isFocus).toBe(false);
    });
  });

  // 状态管理测试
  describe('State Management', () => {
    it('should update internal value state when value prop changes', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field value="initial"></ks-text-field>,
      });

      expect(page.rootInstance.internalValueState).toBe('initial');

      page.rootInstance.value = 'updated';
      await page.waitForChanges();

      expect(page.rootInstance.internalValueState).toBe('updated');
    });

    it('should handle composition events correctly', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field onKsChange={changeSpy}></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;

      // 开始输入法组合
      textarea.dispatchEvent(new CustomEvent('compositionstart'));
      expect(page.rootInstance.composition).toBe(true);

      // 在组合期间输入不应触发 change 事件
      textarea.value = 'test';
      textarea.dispatchEvent(new Event('input'));
      expect(changeSpy).not.toHaveBeenCalled();

      // 结束输入法组合
      textarea.dispatchEvent(new CustomEvent('compositionend'));
      expect(page.rootInstance.composition).toBe(false);
    });
  });

  // 字符计数测试
  describe('Character Count', () => {
    it('should show character count when showCount is true', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field showCount value="test"></ks-text-field>,
      });

      const countElement = page.root?.shadowRoot?.querySelector('.text-field__count')!;
      expect(countElement).toBeTruthy();
      expect(countElement.textContent?.trim()).toBe('4');
    });

    it('should show character count with maxLength', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field showCount maxLength={10} value="test"></ks-text-field>,
      });

      await page.waitForChanges();

      const countElement = page.root?.shadowRoot?.querySelector('.text-field__count')!;
      expect(countElement).toBeTruthy();
      expect(countElement.textContent?.trim()).toBe('4/10');
    });

    it('should show error state when exceeding maxLength', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field showCount maxLength={3} value="test"></ks-text-field>,
      });

      const countElement = page.root?.shadowRoot?.querySelector('.text-field__count--default--error');
      expect(countElement).toBeTruthy();
    });

    it('should use custom count function when showCount is a function', async () => {
      const customCountFn = (value: string) => value.split(' ').length;
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field showCount={customCountFn} value="hello world"></ks-text-field>,
      });

      expect(page.rootInstance.count).toBe(2); // 两个单词
    });
  });

  // 禁用状态测试
  describe('Disabled State', () => {
    it('should not emit events when disabled', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field disabled onKsChange={changeSpy}></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
      textarea.value = 'new value';
      textarea.dispatchEvent(new Event('input'));

      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  // textarea 特有的事件测试
  describe('textarea events test', () => {
    // 测试 onCompositionstart 事件
    describe('onCompositionstart', () => {
      it('should set composition to true when compositionstart event is triggered', async () => {
        const page = await newSpecPage({
          components: [KsTextField],
          template: () => <ks-text-field></ks-text-field>,
        });

        const textarea = page.root?.shadowRoot?.querySelector('textarea')!;

        expect(page.rootInstance.composition).toBe(false);

        textarea.dispatchEvent(new CustomEvent('compositionstart'));

        expect(page.rootInstance.composition).toBe(true);
      });
    });

    // 测试 onCompositionend 事件
    describe('onCompositionend', () => {
      it('should set composition to false and call handleInput when compositionend event is triggered', async () => {
        const page = await newSpecPage({
          components: [KsTextField],
          template: () => <ks-text-field></ks-text-field>,
        });

        const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
        const handleInputSpy = jest.spyOn(page.rootInstance, 'handleInput');

        page.rootInstance.composition = true;

        const compositionEvent = new CustomEvent('compositionend');
        textarea.dispatchEvent(compositionEvent);

        expect(page.rootInstance.composition).toBe(false);
        expect(handleInputSpy).toHaveBeenCalledWith(compositionEvent);
      });
    });

    // 测试 onClick 事件
    describe('onClick', () => {
      it('should emit ksClick event when textarea is clicked', async () => {
        const clickSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsTextField],
          template: () => <ks-text-field onKsClick={clickSpy}></ks-text-field>,
        });

        const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        });

        textarea.dispatchEvent(clickEvent);

        expect(clickSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: clickEvent,
          }),
        );
      });
    });

    // 测试 onKeyDown 事件
    describe('onKeyDown', () => {
      it('should emit ksKeydownEnter event when Enter key is pressed', async () => {
        const keydownEnterSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsTextField],
          template: () => <ks-text-field onKsKeydownEnter={keydownEnterSpy}></ks-text-field>,
        });

        const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          bubbles: true,
        });

        textarea.dispatchEvent(enterEvent);

        expect(keydownEnterSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: enterEvent,
          }),
        );
      });

      it('should not emit ksKeydownEnter event for non-Enter keys', async () => {
        const keydownEnterSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsTextField],
          template: () => <ks-text-field onKsKeydownEnter={keydownEnterSpy}></ks-text-field>,
        });

        const textarea = page.root?.shadowRoot?.querySelector('textarea')!;

        const nonEnterKeys = ['Space', 'Tab', 'Escape', 'ArrowUp', 'a', '1'];

        nonEnterKeys.forEach((key) => {
          const keyEvent = new KeyboardEvent('keydown', { key });
          textarea.dispatchEvent(keyEvent);
        });

        expect(keydownEnterSpy).not.toHaveBeenCalled();
      });
    });

    // 测试组合事件的完整流程
    describe('composition events flow', () => {
      it('should handle complete composition flow', async () => {
        const changeSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsTextField],
          template: () => <ks-text-field onKsChange={changeSpy}></ks-text-field>,
        });

        const textarea = page.root?.shadowRoot?.querySelector('textarea')!;

        // 1. 开始输入法组合
        textarea.dispatchEvent(new CustomEvent('compositionstart'));
        expect(page.rootInstance.composition).toBe(true);

        // 2. 在组合期间输入不应触发 change 事件
        textarea.value = '测';
        textarea.dispatchEvent(new Event('input'));
        expect(changeSpy).not.toHaveBeenCalled();

        // 3. 结束输入法组合
        textarea.value = '测试';
        const compositionEndEvent = new CustomEvent('compositionend');
        Object.defineProperty(compositionEndEvent, 'target', {
          value: textarea,
          configurable: true,
        });

        textarea.dispatchEvent(compositionEndEvent);

        expect(page.rootInstance.composition).toBe(false);
        expect(changeSpy).toHaveBeenCalled();
      });
    });
  });

  // CSS 类测试
  describe('CSS Classes', () => {
    it('should apply focus class when focused', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field></ks-text-field>,
      });

      page.rootInstance.isFocus = true;
      await page.waitForChanges();

      const inner = page.root?.shadowRoot?.querySelector('.text-field__inner');
      expect(inner).toHaveClass('text-field__inner--focus');
    });

    it('should apply status classes', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field status="error"></ks-text-field>,
      });

      const inner = page.root?.shadowRoot?.querySelector('.text-field__inner');
      expect(inner).toHaveClass('text-field__inner--error');
    });

    it('should apply disabled class when disabled', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field disabled></ks-text-field>,
      });

      const wrapper = page.root?.shadowRoot?.querySelector('.text-field__wrapper');
      const inner = page.root?.shadowRoot?.querySelector('.text-field__inner');

      expect(wrapper).toHaveClass('text-field__wrapper--disabled');
      expect(inner).toHaveClass('text-field__inner--disabled');
    });
  });

  // 高度管理测试
  describe('Height Management', () => {
    it('should handle string height property', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field height="200px"></ks-text-field>,
      });

      expect(page.rootInstance.height).toBe('200px');
    });

    it('should handle object height property with min and max', async () => {
      const heightConfig = { min: '100px', max: '300px' };
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field height={heightConfig}></ks-text-field>,
      });

      expect(page.rootInstance.height).toEqual(heightConfig);
    });
  });

  // 边界情况测试
  describe('Edge Cases', () => {
    it('should handle null/undefined values gracefully', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field value={undefined}></ks-text-field>,
      });

      expect(page.rootInstance.internalValueState).toBe(undefined);

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
      expect(textarea.value).toBe(undefined);
    });

    it('should handle empty string values', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field value=""></ks-text-field>,
      });

      expect(page.rootInstance.internalValueState).toBe('');
    });

    it('should handle multiline text correctly', async () => {
      const multilineText = 'Line 1\nLine 2\nLine 3';
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field value={multilineText}></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea')!;
      expect(textarea.value).toBe(multilineText);
      expect(page.rootInstance.internalValueState).toBe(multilineText);
    });
  });

  // 可访问性测试
  describe('Accessibility', () => {
    it('should have proper shadow DOM configuration', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field></ks-text-field>,
      });

      expect(page.root?.shadowRoot).toBeTruthy();
    });

    it('should have proper data-testid attributes', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('[data-testid="ks-text-field-index-aZM5M2"]');
      expect(textarea).toBeTruthy();
    });

    it('should support autoFocus for accessibility', async () => {
      const page = await newSpecPage({
        components: [KsTextField],
        template: () => <ks-text-field autoFocus></ks-text-field>,
      });

      const textarea = page.root?.shadowRoot?.querySelector('textarea');
      expect(textarea).toHaveAttribute('autofocus');
    });
  });
});
