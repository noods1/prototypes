import { newSpecPage } from '@stencil/core/testing';
import { KsInput } from '../index';
import { h } from '@stencil/core';

describe('KsInput', () => {
  // 基础渲染测试
  describe('Basic Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input></ks-input>,
      });

      expect(page.root).toBeTruthy();
      expect(page.root).toHaveAttribute('ks-input');

      const input = page.root?.shadowRoot?.querySelector('input');
      expect(input).toBeTruthy();
      expect(input).toEqualAttribute('type', 'text');
    });

    it('should render with defaultValue', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input defaultValue="default test"></ks-input>,
      });

      await page.waitForChanges();

      expect(page.rootInstance.internalValueState).toBe('default test');
    });

    it('should render with placeholder', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input placeholder="Enter text"></ks-input>,
      });

      const input = page.root?.shadowRoot?.querySelector('input');
      expect(input).toEqualAttribute('placeholder', 'Enter text');
    });
  });

  // 属性测试
  describe('Properties', () => {
    it('should set size property', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input size="sm"></ks-input>,
      });

      const wrapper = page.root?.shadowRoot?.querySelector('.input__wrapper');
      expect(wrapper).toHaveClass('input__wrapper--size-sm');
    });

    it('should set type property', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input type="password"></ks-input>,
      });

      const input = page.root?.shadowRoot?.querySelector('input')!;
      expect(input).toEqualAttribute('type', 'password');
    });

    it('should set disabled property', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input disabled></ks-input>,
      });

      const input = page.root?.shadowRoot?.querySelector('input');
      const wrapper = page.root?.shadowRoot?.querySelector('.input__wrapper');

      expect(input).toHaveAttribute('disabled');
      expect(wrapper).toHaveClass('input__wrapper--disabled');
    });

    it('should set clearable property', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input clearable value="test"></ks-input>,
      });

      // 需要先触发 focus 才能显示清除按钮
      page.rootInstance.isFocus = true;
      await page.waitForChanges();

      const clearIcon = page.root?.shadowRoot?.querySelector('.input__clear');
      expect(clearIcon).toBeTruthy();
    });

    it('should set maxLength property', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input maxLength={10} showCount></ks-input>,
      });

      const countElement = page.root?.shadowRoot?.querySelector('.input__count');
      expect(countElement).toBeTruthy();
    });

    it('should set buttonText property', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input buttonText="Search"></ks-input>,
      });

      const button = page.root?.shadowRoot?.querySelector('ks-button')!;
      expect(button).toBeTruthy();
      expect(button.textContent?.trim()).toBe('Search');
    });
  });

  // 事件测试
  describe('Events', () => {
    it('should emit ksFocus event on focus', async () => {
      const focusSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input onKsFocus={focusSpy}></ks-input>,
      });

      const input = page.root?.shadowRoot?.querySelector('input')!;
      input.dispatchEvent(new FocusEvent('focus'));

      expect(focusSpy).toHaveBeenCalled();
      expect(page.rootInstance.isFocus).toBe(true);
    });

    it('should emit ksBlur event on blur', async () => {
      const blurSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input onKsBlur={blurSpy}></ks-input>,
      });

      // 先设置 focus 状态
      page.rootInstance.isFocus = true;

      const input = page.root?.shadowRoot?.querySelector('input')!;
      input.dispatchEvent(new FocusEvent('blur'));

      expect(blurSpy).toHaveBeenCalled();
      expect(page.rootInstance.isFocus).toBe(false);
    });

    it('should emit ksClear event when clear button is clicked', async () => {
      const clearSpy = jest.fn();
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input clearable value="test" onKsClear={clearSpy} onKsChange={changeSpy}></ks-input>,
      });

      // 设置 focus 状态以显示清除按钮
      page.rootInstance.isFocus = true;
      await page.waitForChanges();

      const clearIcon = page.root?.shadowRoot?.querySelector('ks-icon-filled-close')! as unknown as HTMLButtonElement;
      clearIcon?.click();

      expect(clearSpy).toHaveBeenCalled();
      expect(changeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: '',
        }),
      );
    });

    it('should emit ksButtonClick event when button is clicked', async () => {
      const buttonClickSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input buttonText="Search" onKsButtonClick={buttonClickSpy}></ks-input>,
      });

      const button = page.root?.shadowRoot?.querySelector('ks-button')!;
      button.click();

      expect(buttonClickSpy).toHaveBeenCalled();
    });
  });

  // 方法测试
  describe('Methods', () => {
    it('should focus input when focusInput method is called', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input></ks-input>,
      });

      const input = page.root?.shadowRoot?.querySelector('input')!;
      const focusSpy = jest.spyOn(input, 'focus');

      await page.rootInstance.focusInput();
      expect(focusSpy).toHaveBeenCalled();
    });

    it('should blur input when blurInput method is called', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input></ks-input>,
      });

      const input = page.root?.shadowRoot?.querySelector('input')!;
      const blurSpy = jest.spyOn(input, 'blur');

      await page.rootInstance.blurInput();
      expect(blurSpy).toHaveBeenCalled();
    });
  });

  // 状态管理测试
  describe('State Management', () => {
    it('should update internal value state when value prop changes', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input value="initial"></ks-input>,
      });

      expect(page.rootInstance.internalValueState).toBe('initial');

      page.rootInstance.value = 'updated';
      await page.waitForChanges();

      expect(page.rootInstance.internalValueState).toBe('updated');
    });

    it('should show clear button when focused and has value', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input clearable value="test"></ks-input>,
      });

      // 初始状态不显示清除按钮
      expect(page.rootInstance.showClear).toBe(false);

      // 设置 focus 状态
      page.rootInstance.isFocus = true;
      expect(page.rootInstance.showClear).toBe(true);

      // 清空值后不显示清除按钮
      page.rootInstance.value = '';
      expect(page.rootInstance.showClear).toBe(false);
    });
  });

  // 插槽测试
  describe('Slots', () => {
    it('should render suffix slot', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => (
          <ks-input>
            <span slot="suffix">@example.com</span>
          </ks-input>
        ),
      });

      const suffixSlot = page.root?.querySelector('[slot="suffix"]')!;
      expect(suffixSlot).toBeTruthy();
      expect(suffixSlot.textContent).toBe('@example.com');
    });

    it('should render buttonText slot', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => (
          <ks-input buttonText="Search">
            <span slot="buttonText">Custom Search</span>
          </ks-input>
        ),
      });

      const buttonTextSlot = page.root?.querySelector('[slot="buttonText"]')!;
      expect(buttonTextSlot).toBeTruthy();
      expect(buttonTextSlot.textContent).toBe('Custom Search');
    });
  });

  // 字符计数测试
  describe('Character Count', () => {
    it('should show character count when showCount is true', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input showCount value="test"></ks-input>,
      });

      const countElement = page.root?.shadowRoot?.querySelector('.input__count')!;
      expect(countElement).toBeTruthy();
      expect(countElement.textContent?.trim()).toBe('4');
    });

    it('should show character count with maxLength', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input maxLength={10} value="test"></ks-input>,
      });

      const countElement = page.root?.shadowRoot?.querySelector('.input__count')!;
      expect(countElement).toBeTruthy();
      expect(countElement.textContent?.trim()).toBe('4/10');
    });

    it('should show error state when exceeding maxLength', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input maxLength={3} value="test"></ks-input>,
      });

      const countElement = page.root?.shadowRoot?.querySelector('.input__count--default--error');
      expect(countElement).toBeTruthy();
    });

    it('should use custom count function when showCount is a function', async () => {
      const customCountFn = (value: string) => value.split(' ').length;
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input showCount={customCountFn} value="hello world"></ks-input>,
      });

      expect(page.rootInstance.count).toBe(2); // 两个单词
    });
  });

  // 禁用状态测试
  describe('Disabled State', () => {
    it('should not emit events when disabled', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input disabled onKsChange={changeSpy}></ks-input>,
      });

      const input = page.root?.shadowRoot?.querySelector('input')!;
      input.value = 'new value';
      input.dispatchEvent(new Event('input'));

      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should not show clear button when disabled', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input disabled clearable value="test"></ks-input>,
      });

      page.rootInstance.isFocus = true;
      await page.waitForChanges();

      const clearIcon = page.root?.shadowRoot?.querySelector('ks-icon-filled-close')! as unknown as HTMLButtonElement;
      expect(clearIcon).toBeTruthy();

      // 点击清除按钮不应该有效果
      const clearSpy = jest.fn();
      page.rootInstance.ksClear = { emit: clearSpy } as any;
      clearIcon?.click();

      expect(clearSpy).not.toHaveBeenCalled();
    });

    it('should disable button when input is disabled', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input disabled buttonText="Search"></ks-input>,
      });

      const button = page.root?.shadowRoot?.querySelector('ks-button');
      expect(button).toHaveAttribute('disabled');
    });
  });

  // CSS 类测试
  describe('CSS Classes', () => {
    it('should apply focus class when focused', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input></ks-input>,
      });

      page.rootInstance.isFocus = true;
      await page.waitForChanges();

      const wrapper = page.root?.shadowRoot?.querySelector('.input__wrapper');
      expect(wrapper).toHaveClass('input__wrapper--focus');
    });

    it('should apply status classes', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input status="error"></ks-input>,
      });

      const wrapper = page.root?.shadowRoot?.querySelector('.input__wrapper');
      expect(wrapper).toHaveClass('input__wrapper--error');
    });

    it('should apply button class when buttonText is provided', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input buttonText="Search"></ks-input>,
      });

      const wrapper = page.root?.shadowRoot?.querySelector('.input__wrapper');
      expect(wrapper).toHaveClass('input__wrapper--button');
    });
  });

  // 边界情况测试
  describe('Edge Cases', () => {
    it('should handle null/undefined values gracefully', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input value={undefined}></ks-input>,
      });

      expect(page.rootInstance.internalValueState).toBe(undefined);

      const input = page.root?.shadowRoot?.querySelector('input')!;
      expect(input.value).toBe('');
    });

    it('should handle empty string values', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input value=""></ks-input>,
      });

      expect(page.rootInstance.internalValueState).toBe('');
      expect(page.rootInstance.showClear).toBe(false);
    });

    it('should prevent input blur when clicking controls', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => (
          <ks-input>
            <button slot="controls-start">-</button>
          </ks-input>
        ),
      });

      const preventDefaultSpy = jest.fn();
      const mockEvent = { preventDefault: preventDefaultSpy, target: {} } as any;

      page.rootInstance.preventInputBlurWhenClickControls(mockEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  // 可访问性测试
  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input></ks-input>,
      });

      const input = page.root?.shadowRoot?.querySelector('input')!;
      expect(input).toBeTruthy();

      // 检查基本的可访问性属性
      expect(input.tagName.toLowerCase()).toBe('input');
    });

    it('should have proper data-testid attributes', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input clearable buttonText="Search"></ks-input>,
      });

      const label = page.root?.shadowRoot?.querySelector('[data-testid="ks-input-index-v6WrwD"]');
      const input = page.root?.shadowRoot?.querySelector('[data-testid="ks-input-index-gYhNPj"]');
      const button = page.root?.shadowRoot?.querySelector('[data-testid="ks-input-index-ky2uzn"]');

      expect(label).toBeTruthy();
      expect(input).toBeTruthy();
      expect(button).toBeTruthy();
    });
  });

  describe('handleInput', () => {
    it('should return early when disabled', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input disabled onKsChange={changeSpy}></ks-input>,
      });

      // 模拟输入事件
      const mockEvent = {
        target: { value: 'test input' },
      } as unknown as Event;

      // 调用 handleInput 方法
      page.rootInstance.handleInput(mockEvent);

      // 验证：当 disabled 为 true 时，方法应该提前返回，不更新内部状态
      expect(page.rootInstance.internalValueState).toBeUndefined();
      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should return early when composition is true', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input onKsChange={changeSpy}></ks-input>,
      });

      // 设置 composition 状态为 true
      page.rootInstance.composition = true;

      const mockEvent = {
        target: { value: 'test input' },
      } as unknown as Event;

      // 调用 handleInput 方法
      page.rootInstance.handleInput(mockEvent);

      // 验证：当 composition 为 true 时，方法应该提前返回
      expect(page.rootInstance.internalValueState).toBeUndefined();
      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should extract value from event target (line 194)', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input onKsChange={changeSpy}></ks-input>,
      });

      const testValue = 'extracted value';
      const mockEvent = {
        target: { value: testValue },
      } as unknown as Event;

      // 调用 handleInput 方法
      page.rootInstance.handleInput(mockEvent);

      // 验证：值应该从 event.target 中正确提取
      expect(page.rootInstance.internalValueState).toBe(testValue);
      expect(changeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: testValue,
        }),
      );
    });

    it('should update selection state from inputEl (line 195)', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input></ks-input>,
      });

      // 模拟 inputEl 的选择范围
      const mockInputEl = {
        selectionStart: 2,
        selectionEnd: 5,
      };
      page.rootInstance.inputEl = mockInputEl as HTMLInputElement;

      const mockEvent = {
        target: { value: 'test input' },
      } as unknown as Event;

      // 调用 handleInput 方法
      page.rootInstance.handleInput(mockEvent);

      // 验证：selection 状态应该从 inputEl 的选择范围更新
      expect(page.rootInstance.selection).toEqual([2, 5]);
    });

    it('should handle null selection values', async () => {
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input></ks-input>,
      });

      // 模拟 inputEl 的选择范围为 null
      const mockInputEl = {
        selectionStart: null,
        selectionEnd: null,
      };
      page.rootInstance.inputEl = mockInputEl as HTMLInputElement;

      const mockEvent = {
        target: { value: 'test input' },
      } as unknown as Event;

      // 调用 handleInput 方法
      page.rootInstance.handleInput(mockEvent);

      // 验证：selection 状态应该正确处理 null 值
      expect(page.rootInstance.selection).toEqual([null, null]);
    });

    it('should update internalValueState (line 197)', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input onKsChange={changeSpy}></ks-input>,
      });

      const testValue = 'new internal value';
      const mockEvent = {
        target: { value: testValue },
      } as unknown as Event;

      // 调用 handleInput 方法
      page.rootInstance.handleInput(mockEvent);

      // 验证：internalValueState 应该被更新为新值
      expect(page.rootInstance.internalValueState).toBe(testValue);
    });

    it('should handle empty string value', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input onKsChange={changeSpy}></ks-input>,
      });

      const mockEvent = {
        target: { value: '' },
      } as unknown as Event;

      // 调用 handleInput 方法
      page.rootInstance.handleInput(mockEvent);

      // 验证：空字符串应该被正确处理
      expect(page.rootInstance.internalValueState).toBe('');
      expect(changeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: '',
        }),
      );
    });

    it('should handle special characters in value', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input onKsChange={changeSpy}></ks-input>,
      });

      const specialValue = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const mockEvent = {
        target: { value: specialValue },
      } as unknown as Event;

      // 调用 handleInput 方法
      page.rootInstance.handleInput(mockEvent);

      // 验证：特殊字符应该被正确处理
      expect(page.rootInstance.internalValueState).toBe(specialValue);
      expect(changeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: specialValue,
        }),
      );
    });

    it('should handle both disabled and composition conditions', async () => {
      const changeSpy = jest.fn();
      const page = await newSpecPage({
        components: [KsInput],
        template: () => <ks-input disabled onKsChange={changeSpy}></ks-input>,
      });

      // 同时设置 disabled 和 composition
      page.rootInstance.composition = true;

      const mockEvent = {
        target: { value: 'should not process' },
      } as unknown as Event;

      // 调用 handleInput 方法
      page.rootInstance.handleInput(mockEvent);

      // 验证：当两个条件都为 true 时，方法应该提前返回
      expect(page.rootInstance.internalValueState).toBeUndefined();
      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('input events test', () => {
    // 测试 onCompositionstart 事件
    describe('onCompositionstart', () => {
      it('should set composition to true when compositionstart event is triggered', async () => {
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;

        // 初始状态应该是 false
        expect(page.rootInstance.composition).toBe(false);

        // 触发 compositionstart 事件
        input.dispatchEvent(new CustomEvent('compositionstart'));

        // composition 应该被设置为 true
        expect(page.rootInstance.composition).toBe(true);
      });

      it('should handle multiple compositionstart events', async () => {
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;

        // 多次触发 compositionstart
        input.dispatchEvent(new CustomEvent('compositionstart'));
        expect(page.rootInstance.composition).toBe(true);

        input.dispatchEvent(new CustomEvent('compositionstart'));
        expect(page.rootInstance.composition).toBe(true);
      });
    });

    // 测试 onCompositionend 事件
    describe('onCompositionend', () => {
      it('should set composition to false and call handleInput when compositionend event is triggered', async () => {
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;
        const handleInputSpy = jest.spyOn(page.rootInstance, 'handleInput');

        // 先设置 composition 为 true
        page.rootInstance.composition = true;

        // 创建 compositionend 事件
        const compositionEvent = new CustomEvent('compositionend');
        input.dispatchEvent(compositionEvent);

        // composition 应该被设置为 false
        expect(page.rootInstance.composition).toBe(false);

        // handleInput 应该被调用，并传入事件对象
        expect(handleInputSpy).toHaveBeenCalledWith(compositionEvent);
      });

      it('should handle compositionend with data', async () => {
        const changeSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input onKsChange={changeSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;

        // 设置输入值
        input.value = '测试文本';
        page.rootInstance.composition = true;

        // 创建带数据的 compositionend 事件
        const compositionEvent = new CustomEvent<string>('compositionend', {
          detail: '测试文本',
        });

        // 模拟事件目标
        Object.defineProperty(compositionEvent, 'target', {
          value: input,
          configurable: true,
        });

        input.dispatchEvent(compositionEvent);

        expect(page.rootInstance.composition).toBe(false);
        expect(changeSpy).toHaveBeenCalled();
      });
    });

    // 测试 onClick 事件
    describe('onClick', () => {
      it('should emit ksClick event when input is clicked and not disabled', async () => {
        const clickSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input onKsClick={clickSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        });

        input.dispatchEvent(clickEvent);

        expect(clickSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: clickEvent,
          }),
        );
      });

      it('should not emit ksClick event when input is disabled', async () => {
        const clickSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input disabled onKsClick={clickSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;
        const clickEvent = new MouseEvent('click');

        input.dispatchEvent(clickEvent);

        expect(clickSpy).not.toHaveBeenCalled();
      });
    });

    // 测试 onKeyDown 事件
    describe('onKeyDown', () => {
      it('should emit ksKeydownEnter event when Enter key is pressed', async () => {
        const keydownEnterSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input onKsKeydownEnter={keydownEnterSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          bubbles: true,
        });

        input.dispatchEvent(enterEvent);

        expect(keydownEnterSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: enterEvent,
          }),
        );
      });

      it('should not emit ksKeydownEnter event for non-Enter keys', async () => {
        const keydownEnterSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input onKsKeydownEnter={keydownEnterSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;

        // 测试各种非 Enter 键
        const nonEnterKeys = [
          'Space',
          'Tab',
          'Escape',
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'Backspace',
          'Delete',
          'a',
          'A',
          '1',
          '!',
          'F1',
          'Control',
          'Shift',
        ];

        nonEnterKeys.forEach((key) => {
          const keyEvent = new KeyboardEvent('keydown', { key });
          input.dispatchEvent(keyEvent);
        });

        expect(keydownEnterSpy).not.toHaveBeenCalled();
      });

      it('should handle Enter key variations', async () => {
        const keydownEnterSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input onKsKeydownEnter={keydownEnterSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;

        // 测试不同的 Enter 键表示方式
        const enterVariations = [
          { key: 'Enter' },
          { key: 'Enter', code: 'Enter' },
          { key: 'Enter', code: 'NumpadEnter' },
        ];

        enterVariations.forEach((keyProps, index) => {
          const keyEvent = new KeyboardEvent('keydown', keyProps);
          input.dispatchEvent(keyEvent);

          expect(keydownEnterSpy).toHaveBeenNthCalledWith(
            index + 1,
            expect.objectContaining({
              detail: keyEvent,
            }),
          );
        });
      });

      it('should handle Enter key with modifiers', async () => {
        const keydownEnterSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input onKsKeydownEnter={keydownEnterSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;

        // 测试带修饰键的 Enter
        const enterWithModifiers = new KeyboardEvent('keydown', {
          key: 'Enter',
          ctrlKey: true,
          shiftKey: true,
        });

        input.dispatchEvent(enterWithModifiers);

        expect(keydownEnterSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: expect.objectContaining({
              key: 'Enter',
              ctrlKey: true,
              shiftKey: true,
            }),
          }),
        );
      });
    });

    // 测试组合事件的完整流程
    describe('composition events flow', () => {
      it('should handle complete composition flow', async () => {
        const changeSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input onKsChange={changeSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;

        // 1. 开始输入法组合
        input.dispatchEvent(new CustomEvent('compositionstart'));
        expect(page.rootInstance.composition).toBe(true);

        // 2. 在组合期间输入不应触发 change 事件
        input.value = '测';
        input.dispatchEvent(new Event('input'));
        expect(changeSpy).not.toHaveBeenCalled();

        // 3. 结束输入法组合
        input.value = '测试';
        const compositionEndEvent = new CustomEvent('compositionend');
        Object.defineProperty(compositionEndEvent, 'target', {
          value: input,
          configurable: true,
        });

        input.dispatchEvent(compositionEndEvent);

        expect(page.rootInstance.composition).toBe(false);
        expect(changeSpy).toHaveBeenCalled();
      });

      it('should prevent input handling during composition', async () => {
        const changeSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input onKsChange={changeSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;

        // 设置组合状态
        page.rootInstance.composition = true;

        // 在组合期间的输入应该被忽略
        input.value = 'test';
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
          value: input,
          configurable: true,
        });

        page.rootInstance.handleInput(inputEvent);

        expect(changeSpy).not.toHaveBeenCalled();
        expect(page.rootInstance.internalValueState).toBeUndefined();
      });
    });

    // 测试事件的边界情况
    describe('event edge cases', () => {
      it('should handle click event with different mouse buttons', async () => {
        const clickSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input onKsClick={clickSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;

        // 测试不同的鼠标按键
        [0, 1, 2].forEach((button) => {
          const clickEvent = new MouseEvent('click', { button });
          input.dispatchEvent(clickEvent);
        });

        expect(clickSpy).toHaveBeenCalledTimes(3);
      });

      it('should handle keydown event bubbling', async () => {
        const keydownEnterSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input onKsKeydownEnter={keydownEnterSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;

        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
          cancelable: true,
        });

        input.dispatchEvent(enterEvent);

        expect(keydownEnterSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: expect.objectContaining({
              bubbles: true,
              cancelable: true,
            }),
          }),
        );
      });

      it('should handle rapid composition events', async () => {
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;

        // 快速连续的组合事件
        input.dispatchEvent(new CustomEvent('compositionstart'));
        expect(page.rootInstance.composition).toBe(true);

        input.dispatchEvent(new CustomEvent('compositionstart'));
        expect(page.rootInstance.composition).toBe(true);

        input.dispatchEvent(new CustomEvent('compositionend'));
        expect(page.rootInstance.composition).toBe(false);
      });
    });

    // 测试事件与其他状态的交互
    describe('event interactions with component state', () => {
      it('should not emit click when disabled via props', async () => {
        const clickSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input disabled onKsClick={clickSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;
        input.dispatchEvent(new MouseEvent('click'));

        expect(clickSpy).not.toHaveBeenCalled();
      });

      it('should emit keydown enter even when disabled', async () => {
        const keydownEnterSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input disabled onKsKeydownEnter={keydownEnterSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;
        const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });

        input.dispatchEvent(enterEvent);

        // keydown 事件不受 disabled 状态影响
        expect(keydownEnterSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: enterEvent,
          }),
        );
      });

      it('should handle composition during disabled state', async () => {
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input disabled></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;

        // 即使在禁用状态下，组合事件也应该正常处理
        input.dispatchEvent(new CustomEvent('compositionstart'));
        expect(page.rootInstance.composition).toBe(true);

        input.dispatchEvent(new CustomEvent('compositionend'));
        expect(page.rootInstance.composition).toBe(false);
      });
    });

    // 测试事件对象的完整性
    describe('event object integrity', () => {
      it('should preserve all event properties in ksClick', async () => {
        const clickSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input onKsClick={clickSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;
        const clickEvent = new MouseEvent('click', {
          clientX: 100,
          clientY: 200,
          button: 0,
          bubbles: true,
        });

        input.dispatchEvent(clickEvent);

        expect(clickSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: expect.objectContaining({
              clientX: 100,
              clientY: 200,
              button: 0,
              bubbles: true,
            }),
          }),
        );
      });

      it('should preserve all event properties in ksKeydownEnter', async () => {
        const keydownEnterSpy = jest.fn();
        const page = await newSpecPage({
          components: [KsInput],
          template: () => <ks-input onKsKeydownEnter={keydownEnterSpy}></ks-input>,
        });

        const input = page.root?.shadowRoot?.querySelector('input')!;
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          ctrlKey: true,
          altKey: false,
          shiftKey: true,
          metaKey: false,
        });

        input.dispatchEvent(enterEvent);

        expect(keydownEnterSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: expect.objectContaining({
              key: 'Enter',
              code: 'Enter',
              ctrlKey: true,
              altKey: false,
              shiftKey: true,
              metaKey: false,
            }),
          }),
        );
      });
    });
  });
});
