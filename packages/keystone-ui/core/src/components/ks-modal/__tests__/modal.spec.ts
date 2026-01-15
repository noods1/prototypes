import { modal } from '../modal';
import { KsModal } from '../index';
import { newSpecPage } from '@stencil/core/testing';

describe('modal api', () => {
  // 清理函数，确保在每个测试后移除可能存在的 modal 元素和 body class
  afterEach(async () => {
    // 关闭所有由 modal API 创建的弹窗
    modal.closeAll();
    // 等待 DOM 更新
    await new Promise((resolve) => setTimeout(resolve, 0));
    // 移除 body 上的 class
    document.body.classList.remove('unscrollable');
    // 移除所有 ks-modal 元素
    document.querySelectorAll('ks-modal').forEach((el) => el.remove());
  });

  it('should create a modal with string content and default options', async () => {
    const page = await newSpecPage({
      components: [KsModal],
      html: ``, // 初始 HTML 为空
    });
    const contentText = 'Hello Modal';
    const closeModal = modal.default(contentText);
    await page.waitForChanges(); // 等待 stencil 组件渲染

    const modalElement = document.body.querySelector('ks-modal');
    expect(modalElement).not.toBeNull();
    // 默认情况下，内容会作为 textNode 添加
    // 注意：modal.ts 的实现是将 string content 直接作为子节点
    // 如果 KsModal 内部有特定的 slot 或容器来显示简单文本，则需要调整此断言
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(modalElement.textContent).toContain(contentText);

    // 验证 modal 是否可见 (ks-modal 内部逻辑会添加这个类到 body)
    // 等待 modal 的 open 动画和内部状态更新
    await new Promise((resolve) => setTimeout(resolve, 300)); // 根据 modal 动画时间调整
    expect(document.body.classList.contains('unscrollable')).toBe(true);

    // 关闭 modal
    closeModal();
    await new Promise((resolve) => setTimeout(resolve, 300)); // 等待关闭动画和 promise 解析
    expect(document.body.querySelector('ks-modal')).toBeNull();
    expect(document.body.classList.contains('unscrollable')).toBe(false);
  });

  it('should create a modal with ModalProps', async () => {
    const page = await newSpecPage({
      components: [KsModal],
      html: ``,
    });
    const titleText = 'Test Title';
    const contentText = 'This is modal content from props.';
    const closeModal = modal.default({
      titleText: titleText,
      content: contentText,
      noFooter: true,
    });
    await page.waitForChanges();

    const modalElement = document.body.querySelector('ks-modal');
    expect(modalElement).not.toBeNull();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(modalElement.titleText).toBe(titleText);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(modalElement.noFooter).toBe(true);
    // 同样，检查内容是否按预期渲染
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(modalElement.textContent).toContain(contentText);

    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(document.body.classList.contains('unscrollable')).toBe(true);

    closeModal();
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(document.body.querySelector('ks-modal')).toBeNull();
    expect(document.body.classList.contains('unscrollable')).toBe(false);
  });

  it('should resolve promise when modal is closed', async () => {
    const page = await newSpecPage({
      components: [KsModal],
      html: ``,
    });
    const closeModalFn = modal.default('Promise test');
    await page.waitForChanges();

    const modalElement = document.body.querySelector('ks-modal');
    expect(modalElement).not.toBeNull();

    let promiseResolved = false;
    closeModalFn.then(() => {
      promiseResolved = true;
    });

    // 手动触发关闭，或者等待 modal 内部的关闭事件
    // closeModalFn() 实际上会调用 el.close()
    closeModalFn();

    // 等待 promise 解析和 modal 移除
    await new Promise((resolve) => setTimeout(resolve, 300)); // 动画和清理时间

    expect(promiseResolved).toBe(true);
    expect(document.body.querySelector('ks-modal')).toBeNull();
  });

  it('should close all modals when closeAll is called', async () => {
    const page = await newSpecPage({
      components: [KsModal],
      html: ``,
    });

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const closeModal1 = modal.default('Modal 1');
    await page.waitForChanges(); // 确保第一个 modal 渲染
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const closeModal2 = modal.default('Modal 2');
    await page.waitForChanges(); // 确保第二个 modal 渲染

    // 等待 modal 动画和内部状态更新
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(document.body.querySelectorAll('ks-modal').length).toBe(2);
    // 假设最后一个打开的 modal 会设置这个 class
    expect(document.body.classList.contains('unscrollable')).toBe(true);

    modal.closeAll();
    // 等待所有关闭动画和清理
    await new Promise((resolve) => setTimeout(resolve, 500)); // 可能需要更长时间确保所有都关闭

    expect(document.body.querySelectorAll('ks-modal').length).toBe(0);
    expect(document.body.classList.contains('unscrollable')).toBe(false);
  });
});
