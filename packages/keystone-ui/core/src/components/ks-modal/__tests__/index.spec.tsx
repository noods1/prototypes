import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { KsModal } from '../index';

describe('KsModal', () => {
  it('should render the modal when visible is true', async () => {
    const page = await newSpecPage({
      components: [KsModal],
      template: () => <ks-modal visible={true} title-text="Test Modal"></ks-modal>,
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
    // 检查模态框是否在 DOM 中
    const modal = page.root;
    expect(modal).not.toBeNull();

    // 检查模态框的标题是否正确渲染
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const title = modal.shadowRoot.querySelector('.modal__header-title');
    expect(title).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(title.textContent).toContain('Test Modal');

    // 检查模态框的可见性样式
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const underlay = modal.shadowRoot.querySelector('.modal__underlay');
    expect(underlay).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(underlay.hasAttribute('visible')).toBe(true);
  });

  it('should not render the modal when visible is false', async () => {
    const page = await newSpecPage({
      components: [KsModal],
      html: `<ks-modal visible="false" title-text="Test Modal"></ks-modal>`,
    });

    // 检查模态框是否在 DOM 中，但不可见
    const modal = page.root;
    expect(modal).not.toBeNull();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const underlay = modal.shadowRoot.querySelector('.modal__underlay');
    expect(underlay).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(underlay.classList.contains('modal__underlay--visible')).toBe(false);
  });

  it('should add and remove "unscrollable" class from document.body when modal visibility changes', async () => {
    const page = await newSpecPage({
      components: [KsModal],
      html: `<ks-modal title-text="Test Modal"></ks-modal>`,
    });

    const modalElement = page.root as HTMLKsModalElement;

    // 初始状态，body 不应该有这个类
    expect(document.body.classList.contains('unscrollable')).toBe(false);

    // 打开 modal
    modalElement.visible = true;
    await page.waitForChanges(); // 等待 @Watch('visible') 和 open() 方法执行

    // 等待 animejs 动画执行完成，特别是 begin 回调
    // 在实际测试中，如果动画时间较长或不稳定，可能需要更可靠的方式等待，
    // 例如监听一个内部事件或使用 mock/spy 控制 animejs
    await new Promise((resolve) => setTimeout(resolve, 300)); // 假设动画时间大约 200ms + buffer

    expect(document.body.classList.contains('unscrollable')).toBe(true);

    // 关闭 modal
    modalElement.visible = false;
    await page.waitForChanges(); // 等待 @Watch('visible') 和 close() 方法执行

    // 等待 animejs 动画执行完成，特别是 complete 回调
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(document.body.classList.contains('unscrollable')).toBe(false);
  });

  it('should trigger inner close function with confirmButton', async () => {
    const page = await newSpecPage({
      components: [KsModal],
      html: `<ks-modal title-text="Test Modal"></ks-modal>`,
    });
    const modalElement = page.root as HTMLKsModalElement;
    const closeSpy = jest.fn();

    // 监听 close 事件
    modalElement.addEventListener('ksClose', closeSpy);
    modalElement.visible = true;
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 300));
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const confirmButton = modalElement.shadowRoot.querySelector('[data-testid="ks-modal-index-smNjSC"]') as HTMLElement;
    confirmButton.click();
    await page.waitForChanges(); // 等待 @Watch('visible') 和 close() 方法执行

    // 等待 animejs 动画执行完成，特别是 complete 回调
    await new Promise((resolve) => setTimeout(resolve, 300));
    // 检查 close 事件是否被触发
    expect(closeSpy).toHaveBeenCalled();

    // 移除事件监听器，避免测试间干扰
    modalElement.removeEventListener('ksClose', closeSpy);
  });

  it('should trigger inner close function with cancelButton', async () => {
    const page = await newSpecPage({
      components: [KsModal],
      html: `<ks-modal title-text="Test Modal"></ks-modal>`,
    });
    const modalElement = page.root as HTMLKsModalElement;
    const closeSpy = jest.fn();

    // 监听 close 事件
    modalElement.addEventListener('ksClose', closeSpy);
    modalElement.visible = true;
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 300));
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const cancelButton = modalElement.shadowRoot.querySelector('[data-testid="ks-modal-index-sMQyRp"]') as HTMLElement;
    cancelButton.click();
    await page.waitForChanges(); // 等待 @Watch('visible') 和 close() 方法执行

    // 等待 animejs 动画执行完成，特别是 complete 回调
    await new Promise((resolve) => setTimeout(resolve, 300));
    // 检查 close 事件是否被触发
    expect(closeSpy).toHaveBeenCalled();

    // 移除事件监听器，避免测试间干扰
    modalElement.removeEventListener('ksClose', closeSpy);
  });
});
