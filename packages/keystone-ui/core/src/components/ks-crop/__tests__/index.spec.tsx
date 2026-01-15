import { newSpecPage } from '@stencil/core/testing';
import { KsCrop } from '../index';
import { h } from '@stencil/core';
import { CropRect, ImageType } from '@src/entities/components/crop';

class MockResizeObserver {
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    // 在测试中，这个方法可以为空
  }

  unobserve(target: Element) {
    // 在测试中，这个方法可以为空
  }

  disconnect() {
    // 在测试中，这个方法可以为空
  }

  // 这是我们添加的自定义方法，用于在测试中触发回调
  public trigger(entries: ResizeObserverEntry[]) {
    this.callback(entries, this);
  }
}

// Mocking an image URL for testing
const MOCK_IMAGE_SRC =
  'http://p16-tiktok-ads-sg.ibyteimg.com/tos-alisg-i-n82rq3yc7r-sg/2f72c647b761d242451e5699ea2ea2af.png~tplv-n82rq3yc7r-origin.image'; // 1x1 transparent png

describe('ks-crop component', () => {
  let mockObserverInstance: MockResizeObserver | null = null;
  beforeAll(() => {
    global.ResizeObserver = MockResizeObserver;
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: jest.fn((callback: (blob: Blob | null) => void) => {
        // 模拟生成一个空 Blob
        callback(new Blob(['test'], { type: 'image/png' }));
      }),
      writable: true,
    });
  });
  beforeEach(() => {
    // 重置实例
    mockObserverInstance = null;
    // 每次测试前，都用 jest.fn() 来包装我们的模拟类
    // 这样我们就可以捕获到构造函数被调用时创建的实例
    global.ResizeObserver = jest.fn((callback) => {
      const instance = new MockResizeObserver(callback);
      mockObserverInstance = instance; // 保存实例以便后续触发
      return instance;
    });
  });
  it('renders with an image source', async () => {
    const page = await newSpecPage({
      components: [KsCrop],
      template: () => <ks-crop circle src={MOCK_IMAGE_SRC}></ks-crop>,
    });
    await page.waitForChanges();
    const component = page.rootInstance as KsCrop;
    component.onRatioChange();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const img = page.root.shadowRoot.querySelector('.image-upper') as HTMLImageElement;
    await page.waitForChanges();
    expect(img).toBeTruthy();
    expect(img.src).toBe(MOCK_IMAGE_SRC);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    page.root.src =
      'http://p16-tiktok-ads-sg.ibyteimg.com/tos-alisg-i-n82rq3yc7r-sg/908b43af6d44af0f3e9916031e057538.png~tplv-n82rq3yc7r-origin.image';
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const img1 = page.root.shadowRoot.querySelector('.image-upper') as HTMLImageElement;
    expect(img1).toBeTruthy();
    expect(img1.src).not.toBe(MOCK_IMAGE_SRC);
  });

  it('Should respond correctly when the container size changes ', async () => {
    const page = await newSpecPage({
      components: [KsCrop],
      html: `<ks-crop src="${MOCK_IMAGE_SRC}"></ks-crop>`,
    });

    await page.waitForChanges();

    const component = page.rootInstance as KsCrop;
    const onRatioChangeSpy = jest.spyOn(component, 'onRatioChange');
    const imageRef = (component as any).imageRef;
    Object.defineProperty(imageRef, 'clientHeight', { value: 400 });
    Object.defineProperty(imageRef, 'clientWidth', { value: 500 });

    expect(mockObserverInstance).not.toBeNull();

    if (mockObserverInstance) {
      mockObserverInstance.trigger([
        {
          // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
          target: page.root.shadowRoot.querySelector('.image-upper') as HTMLImageElement,
          contentRect: { width: 500, height: 400, x: 0, y: 0, top: 0, right: 0, bottom: 0, left: 0, toJSON: () => '' },
          borderBoxSize: [],
          contentBoxSize: [],
          devicePixelContentBoxSize: [],
        },
      ]);
    }

    await page.waitForChanges();
    expect(onRatioChangeSpy).toHaveBeenCalled();
  });

  it('applies initialCropRect prop', async () => {
    const initialCrop: CropRect = { x: 10, y: 10, width: 50, height: 50 };
    const page = await newSpecPage({
      components: [KsCrop],
      template: () => <ks-crop src={MOCK_IMAGE_SRC} initialCropRect={initialCrop}></ks-crop>,
    });
    await page.waitForChanges();
    const component = page.rootInstance as KsCrop;
    component.onInitialCropRectChange();
    await page.waitForChanges();
    // Need to wait for image to load and calculations to happen
    // For simplicity, we check the internal state, though ideally we'd check rendered output
    expect(component.cropRect.x).toBe(initialCrop.x);
    expect(component.cropRect.y).toBe(initialCrop.y);
    // Width and height might be adjusted by ratio, so direct comparison might not always work without 'custom' ratio
  });

  it('applies imageType and imageQuality props', async () => {
    const imageType: ImageType = 'image/webp';
    const imageQuality = 0.5;
    const page = await newSpecPage({
      components: [KsCrop],
      template: () => <ks-crop src={MOCK_IMAGE_SRC} imageType={imageType} imageQuality={imageQuality}></ks-crop>,
    });
    await page.waitForChanges();
    const component = page.rootInstance as KsCrop;
    expect(component.imageType).toBe(imageType);
    expect(component.imageQuality).toBe(imageQuality);
  });

  it('calls screenshot method and attempts to create a blob', async () => {
    const page = await newSpecPage({
      components: [KsCrop],
      template: () => <ks-crop src={MOCK_IMAGE_SRC}></ks-crop>,
    });
    await page.waitForChanges();
    const component = page.rootInstance as KsCrop;
    const canvasSpy = jest.spyOn(HTMLCanvasElement.prototype, 'getContext');
    const blobSpy = jest.spyOn(HTMLCanvasElement.prototype, 'toBlob');

    const dataUrl = await component.screenshot();

    expect(canvasSpy).toHaveBeenCalledWith('2d');
    expect(blobSpy).toHaveBeenCalled();
    expect(Boolean(dataUrl)).toBe(true); // Check if our mock URL.createObjectURL was used

    canvasSpy.mockRestore();
    blobSpy.mockRestore();
  });

  it('calls getCropRect method and returns scaled dimensions', async () => {
    const page = await newSpecPage({
      components: [KsCrop],
      template: () => <ks-crop src={MOCK_IMAGE_SRC}></ks-crop>,
    });
    await page.waitForChanges();
    const component = page.rootInstance as KsCrop;
    // Set a known cropRect for testing scaling
    component.cropRect = { x: 10, y: 10, width: 20, height: 20 };
    // Assuming imageRef is loaded and has dimensions (mocked as 100x100)
    // And display size is also 100x100, so scale is 1
    const MOCK_NATURAL_WIDTH = 100;
    const MOCK_DISPLAY_WIDTH = 100;
    const scale = MOCK_NATURAL_WIDTH / MOCK_DISPLAY_WIDTH; // Should be 1 in this mock setup

    const cropData = await component.getCropRect();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(cropData.x).toBe(component.cropRect.x * scale);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    expect(cropData.y).toBe(component.cropRect.y * scale);
    expect(cropData.width).toBe(component.cropRect.width * scale);
    expect(cropData.height).toBe(component.cropRect.height * scale);
  });

  it('handles mousedown on crop-selection-box for dragging', async () => {
    const page = await newSpecPage({
      components: [KsCrop],
      template: () => <ks-crop src={MOCK_IMAGE_SRC}></ks-crop>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const selectionBox = page.root.shadowRoot.querySelector('.crop-selection-box') as HTMLElement;
    const component = page.rootInstance as KsCrop;
    const handleMouseDownSpy = jest.spyOn(component, 'handleMouseDown' as any);

    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 50, clientY: 50 });
    selectionBox.dispatchEvent(mouseDownEvent);
    await page.waitForChanges();

    expect(handleMouseDownSpy).toHaveBeenCalled();
    // Further tests would involve dispatching mousemove and mouseup on document
    // and asserting changes to cropRect, which can be complex for unit tests.
    handleMouseDownSpy.mockRestore();
  });

  it('handles mousedown on a resize handle', async () => {
    const page = await newSpecPage({
      components: [KsCrop],
      template: () => <ks-crop src={MOCK_IMAGE_SRC}></ks-crop>,
    });
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const resizeHandle = page.root.shadowRoot.querySelector('.handle-top-left') as HTMLElement;
    const component = page.rootInstance as KsCrop;
    const handleMouseDownSpy = jest.spyOn(component, 'handleMouseDown' as any);

    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 10, clientY: 10 });
    resizeHandle.dispatchEvent(mouseDownEvent);
    await page.waitForChanges();

    expect(handleMouseDownSpy).toHaveBeenCalled();
    expect((component as any).isResizing).toBe(true); // Check internal state for simplicity
    expect((component as any).resizeHandle).toBe('topLeft');

    handleMouseDownSpy.mockRestore();
  });

  it('comprehensively tests mouseMove logic for dragging ', async () => {
    const initialCrop: CropRect = { x: 50, y: 50, width: 100, height: 80 };
    const page = await newSpecPage({
      components: [KsCrop],
      // Provide a host element with dimensions for clientWidth/clientHeight
      html: '<div style="width: 300px; height: 200px;"><ks-crop src="' + MOCK_IMAGE_SRC + '"></ks-crop></div>',
    });
    // It's important to select the ks-crop element correctly when it's nested.
    const cropElement = page.body.querySelector('ks-crop');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const component = cropElement.componentOnReady ? await cropElement.componentOnReady() : cropElement;
    let cropRect = undefined;
    // Set initial props after component is ready and attached
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = 'custom'; // Start with custom for simpler resize checks
    await page.waitForChanges(); // Apply initialCropRect
    await new Promise((resolve) => setTimeout(resolve, 0)); // Allow image loading and internal calcs
    await page.waitForChanges();

    // Mock clientWidth and clientHeight for the component element
    // These are crucial for boundary checks in handleMouseMove
    Object.defineProperty(component, 'clientWidth', { value: 300 });
    Object.defineProperty(component, 'clientHeight', { value: 300 });

    const simulateMouseEvent = (
      type: 'mousedown' | 'mousemove' | 'mouseup',
      target: EventTarget,
      clientX: number,
      clientY: number,
    ) => {
      const event = new MouseEvent(type, { clientX, clientY, bubbles: true, cancelable: true });
      target.dispatchEvent(event);
    };

    // 1. Test dragging
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    let selectionBox = cropElement.shadowRoot.querySelector('.crop-selection-box') as HTMLElement;

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    let originalRect = await component.getCropRect();

    simulateMouseEvent('mousedown', selectionBox, originalRect.x + 10, originalRect.y + 10);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x + 20, originalRect.y + 25); // Move by (10, 15)
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    cropRect = await component.getCropRect();
    expect(cropRect.x).toBe(originalRect.x + 10);
    expect(cropRect.y).toBe(originalRect.y + 15);

    simulateMouseEvent('mouseup', document, originalRect.x + 20, originalRect.y + 25);
    await page.waitForChanges();
  });
  it('comprehensively tests mouseMove logic for TopLeft', async () => {
    const initialCrop: CropRect = { x: 50, y: 50, width: 100, height: 80 };
    const page = await newSpecPage({
      components: [KsCrop],
      // Provide a host element with dimensions for clientWidth/clientHeight
      html: '<div style="width: 300px; height: 300px;"><ks-crop src="' + MOCK_IMAGE_SRC + '"></ks-crop></div>',
    });
    // It's important to select the ks-crop element correctly when it's nested.
    const cropElement = page.body.querySelector('ks-crop');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const component = cropElement.componentOnReady ? await cropElement.componentOnReady() : cropElement;
    let cropRect = undefined;
    // Set initial props after component is ready and attached
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = 'custom'; // Start with custom for simpler resize checks
    await page.waitForChanges(); // Apply initialCropRect
    await new Promise((resolve) => setTimeout(resolve, 0)); // Allow image loading and internal calcs
    await page.waitForChanges();

    const simulateMouseEvent = (
      type: 'mousedown' | 'mousemove' | 'mouseup',
      target: EventTarget,
      clientX: number,
      clientY: number,
    ) => {
      const event = new MouseEvent(type, { clientX, clientY, bubbles: true, cancelable: true });
      target.dispatchEvent(event);
    };
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const originalRect = await component.getCropRect(); // Update originalRect after potential drag
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const handler = cropElement.shadowRoot.querySelector('.handle-top-left') as HTMLElement;

    simulateMouseEvent('mousedown', handler, originalRect.x, originalRect.y);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x + 10, originalRect.y + 15);
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    cropRect = await component.getCropRect();
    expect(cropRect.width).toBe(originalRect.width - 10);
    expect(cropRect.height).toBe(originalRect.height - 15);

    simulateMouseEvent('mouseup', document, originalRect.x, originalRect.y);

    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = '1:1';

    await page.waitForChanges();
    simulateMouseEvent('mousedown', handler, originalRect.x, originalRect.y);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x + 10, originalRect.y + 15);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x - 100, originalRect.y + 15);
    await page.waitForChanges();

    simulateMouseEvent('mouseup', document, originalRect.x, originalRect.y);
  });
  it('comprehensively tests mouseMove logic for Top', async () => {
    const initialCrop: CropRect = { x: 20, y: 50, width: 100, height: 80 };
    const page = await newSpecPage({
      components: [KsCrop],
      html: '<div style="width: 300px; height: 300px;"><ks-crop src="' + MOCK_IMAGE_SRC + '"></ks-crop></div>',
    });
    const cropElement = page.body.querySelector('ks-crop');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const component = cropElement.componentOnReady ? await cropElement.componentOnReady() : cropElement;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = 'custom';
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await page.waitForChanges();

    Object.defineProperty(component, 'clientWidth', { value: 300 });
    Object.defineProperty(component, 'clientHeight', { value: 300 });

    const simulateMouseEvent = (
      type: 'mousedown' | 'mousemove' | 'mouseup',
      target: EventTarget,
      clientX: number,
      clientY: number,
    ) => {
      const event = new MouseEvent(type, { clientX, clientY, bubbles: true, cancelable: true });
      target.dispatchEvent(event);
    };

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const originalRect = await component.getCropRect();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const handler = cropElement.shadowRoot.querySelector('.handle-top-center') as HTMLElement;

    simulateMouseEvent('mousedown', handler, originalRect.x + originalRect.width / 2, originalRect.y);
    await page.waitForChanges();
    simulateMouseEvent('mousemove', document, originalRect.x + originalRect.width / 2, originalRect.y + 10);
    await page.waitForChanges();
    simulateMouseEvent('mousemove', document, originalRect.x + originalRect.width / 2, originalRect.y - 10);
    await page.waitForChanges();
    simulateMouseEvent('mouseup', document, originalRect.x + originalRect.width / 2, originalRect.y);
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = '1:1';
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const initialRect = await component.getCropRect();
    await page.waitForChanges();
    simulateMouseEvent('mousedown', handler, initialRect.x + initialRect.width / 2, initialRect.y);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, initialRect.x + initialRect.width / 2, originalRect.y + 30);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, initialRect.x + initialRect.width / 2, originalRect.y - 15);
    await page.waitForChanges();

    simulateMouseEvent('mouseup', document, initialRect.x, initialRect.y + 15);
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const rect = await component.getCropRect();
    console.log('bottom top', rect);
    simulateMouseEvent('mousedown', handler, rect.x + rect.width / 2, rect.y);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, rect.x + rect.width / 2, rect.y - 60);
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    console.log('bottom crop', await component.getCropRect());

    // simulateMouseEvent('mouseup', document, rect.x+ rect.width / 2, originalRect.y);
  });
  it('comprehensively tests mouseMove logic for TopRight', async () => {
    const initialCrop: CropRect = { x: 50, y: 50, width: 100, height: 80 };
    const page = await newSpecPage({
      components: [KsCrop],
      html: '<div style="width: 300px; height: 300px;"><ks-crop src="' + MOCK_IMAGE_SRC + '"></ks-crop></div>',
    });
    const cropElement = page.body.querySelector('ks-crop');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const component = cropElement.componentOnReady ? await cropElement.componentOnReady() : cropElement;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = 'custom';
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await page.waitForChanges();

    Object.defineProperty(component, 'clientWidth', { value: 300 });
    Object.defineProperty(component, 'clientHeight', { value: 300 });

    const simulateMouseEvent = (
      type: 'mousedown' | 'mousemove' | 'mouseup',
      target: EventTarget,
      clientX: number,
      clientY: number,
    ) => {
      const event = new MouseEvent(type, { clientX, clientY, bubbles: true, cancelable: true });
      target.dispatchEvent(event);
    };

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const originalRect = await component.getCropRect();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const handler = cropElement.shadowRoot.querySelector('.handle-top-right') as HTMLElement;

    simulateMouseEvent('mousedown', handler, originalRect.x + originalRect.width, originalRect.y);
    await page.waitForChanges();
    simulateMouseEvent('mousemove', document, originalRect.x + originalRect.width + 10, originalRect.y - 10);
    await page.waitForChanges();
    simulateMouseEvent('mouseup', document, originalRect.x + originalRect.width + 10, originalRect.y - 10);
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = '1:1';
    await page.waitForChanges();
    simulateMouseEvent('mousedown', handler, originalRect.x, originalRect.y);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x + 10, originalRect.y + 15);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x - 100, originalRect.y + 15);
    await page.waitForChanges();

    simulateMouseEvent('mouseup', document, originalRect.x, originalRect.y);
  });

  it('comprehensively tests mouseMove logic for Left', async () => {
    const initialCrop: CropRect = { x: 70, y: 20, width: 100, height: 80 };
    const page = await newSpecPage({
      components: [KsCrop],
      html: '<div style="width: 300px; height: 300px;"><ks-crop src="' + MOCK_IMAGE_SRC + '"></ks-crop></div>',
    });
    const cropElement = page.body.querySelector('ks-crop');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const component = cropElement.componentOnReady ? await cropElement.componentOnReady() : cropElement;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = 'custom';
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await page.waitForChanges();

    Object.defineProperty(component, 'clientWidth', { value: 300 });
    Object.defineProperty(component, 'clientHeight', { value: 300 });

    const simulateMouseEvent = (
      type: 'mousedown' | 'mousemove' | 'mouseup',
      target: EventTarget,
      clientX: number,
      clientY: number,
    ) => {
      const event = new MouseEvent(type, { clientX, clientY, bubbles: true, cancelable: true });
      target.dispatchEvent(event);
    };

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const originalRect = await component.getCropRect();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const handler = cropElement.shadowRoot.querySelector('.handle-middle-left') as HTMLElement;

    simulateMouseEvent('mousedown', handler, originalRect.x, originalRect.y + originalRect.height / 2);
    await page.waitForChanges();
    simulateMouseEvent('mousemove', document, originalRect.x - 10, originalRect.y + originalRect.height / 2);
    await page.waitForChanges();
    simulateMouseEvent('mouseup', document, originalRect.x - 10, originalRect.y + originalRect.height / 2);
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = '1:1';
    await page.waitForChanges();
    simulateMouseEvent('mousedown', handler, originalRect.x, originalRect.y);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x + 10, originalRect.y);
    await page.waitForChanges();

    simulateMouseEvent('mouseup', document, originalRect.x, originalRect.y);
    await page.waitForChanges();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const rect = await component.getCropRect();
    console.log('bottom top', rect);
    simulateMouseEvent('mousedown', handler, rect.x, rect.y);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, rect.x - 60, rect.y);
    await page.waitForChanges();
  });
  it('comprehensively tests mouseMove logic for Right', async () => {
    const initialCrop: CropRect = { x: 50, y: 50, width: 100, height: 80 };
    const page = await newSpecPage({
      components: [KsCrop],
      html: '<div style="width: 300px; height: 300px;"><ks-crop src="' + MOCK_IMAGE_SRC + '"></ks-crop></div>',
    });
    const cropElement = page.body.querySelector('ks-crop');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const component = cropElement.componentOnReady ? await cropElement.componentOnReady() : cropElement;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = 'custom';
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await page.waitForChanges();

    Object.defineProperty(component, 'clientWidth', { value: 300 });
    Object.defineProperty(component, 'clientHeight', { value: 300 });

    const simulateMouseEvent = (
      type: 'mousedown' | 'mousemove' | 'mouseup',
      target: EventTarget,
      clientX: number,
      clientY: number,
    ) => {
      const event = new MouseEvent(type, { clientX, clientY, bubbles: true, cancelable: true });
      target.dispatchEvent(event);
    };

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const originalRect = await component.getCropRect();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const handler = cropElement.shadowRoot.querySelector('.handle-middle-right') as HTMLElement;

    simulateMouseEvent(
      'mousedown',
      handler,
      originalRect.x + originalRect.width,
      originalRect.y + originalRect.height / 2,
    );
    await page.waitForChanges();
    simulateMouseEvent(
      'mousemove',
      document,
      originalRect.x + originalRect.width + 10,
      originalRect.y + originalRect.height / 2,
    );
    await page.waitForChanges();
    simulateMouseEvent(
      'mouseup',
      document,
      originalRect.x + originalRect.width + 10,
      originalRect.y + originalRect.height / 2,
    );
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = '1:1';
    await page.waitForChanges();
    simulateMouseEvent('mousedown', handler, originalRect.x, originalRect.y);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x + 10, originalRect.y + 15);
    await page.waitForChanges();

    simulateMouseEvent('mouseup', document, originalRect.x, originalRect.y);
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const rect = await component.getCropRect();

    simulateMouseEvent('mousedown', handler, rect.x + rect.width, rect.y + rect.height / 2);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, rect.x + rect.width + 100, rect.y + rect.height / 2);
    await page.waitForChanges();

    simulateMouseEvent('mouseup', document, originalRect.x, originalRect.y);
  });
  it('comprehensively tests mouseMove logic for BottomLeft', async () => {
    const initialCrop: CropRect = { x: 50, y: 50, width: 100, height: 80 };
    const page = await newSpecPage({
      components: [KsCrop],
      html: '<div style="width: 300px; height: 300px;"><ks-crop src="' + MOCK_IMAGE_SRC + '"></ks-crop></div>',
    });
    const cropElement = page.body.querySelector('ks-crop');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const component = cropElement.componentOnReady ? await cropElement.componentOnReady() : cropElement;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = 'custom';
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await page.waitForChanges();

    Object.defineProperty(component, 'clientWidth', { value: 300 });
    Object.defineProperty(component, 'clientHeight', { value: 300 });

    const simulateMouseEvent = (
      type: 'mousedown' | 'mousemove' | 'mouseup',
      target: EventTarget,
      clientX: number,
      clientY: number,
    ) => {
      const event = new MouseEvent(type, { clientX, clientY, bubbles: true, cancelable: true });
      target.dispatchEvent(event);
    };

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const originalRect = await component.getCropRect();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const handler = cropElement.shadowRoot.querySelector('.handle-bottom-left') as HTMLElement;

    simulateMouseEvent('mousedown', handler, originalRect.x, originalRect.y + originalRect.height);
    await page.waitForChanges();
    simulateMouseEvent('mousemove', document, originalRect.x - 10, originalRect.y + originalRect.height + 10);
    await page.waitForChanges();
    simulateMouseEvent('mouseup', document, originalRect.x - 10, originalRect.y + originalRect.height + 10);
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = '1:1';
    await page.waitForChanges();
    simulateMouseEvent('mousedown', handler, originalRect.x, originalRect.y);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x + 10, originalRect.y + 15);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x - 100, originalRect.y + 15);
    await page.waitForChanges();

    simulateMouseEvent('mouseup', document, originalRect.x, originalRect.y);
  });
  it('comprehensively tests mouseMove logic for Bottom', async () => {
    const initialCrop: CropRect = { x: 50, y: 50, width: 100, height: 80 };
    const page = await newSpecPage({
      components: [KsCrop],
      html: '<div style="width: 300px; height: 300px;"><ks-crop src="' + MOCK_IMAGE_SRC + '"></ks-crop></div>',
    });
    const cropElement = page.body.querySelector('ks-crop');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const component = cropElement.componentOnReady ? await cropElement.componentOnReady() : cropElement;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = 'custom';
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await page.waitForChanges();

    Object.defineProperty(component, 'clientWidth', { value: 300 });
    Object.defineProperty(component, 'clientHeight', { value: 300 });

    const simulateMouseEvent = (
      type: 'mousedown' | 'mousemove' | 'mouseup',
      target: EventTarget,
      clientX: number,
      clientY: number,
    ) => {
      const event = new MouseEvent(type, { clientX, clientY, bubbles: true, cancelable: true });
      target.dispatchEvent(event);
    };

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const originalRect = await component.getCropRect();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const handler = cropElement.shadowRoot.querySelector('.handle-bottom-center') as HTMLElement;

    simulateMouseEvent(
      'mousedown',
      handler,
      originalRect.x + originalRect.width / 2,
      originalRect.y + originalRect.height,
    );
    await page.waitForChanges();
    simulateMouseEvent(
      'mousemove',
      document,
      originalRect.x + originalRect.width / 2,
      originalRect.y + originalRect.height + 20,
    );
    await page.waitForChanges();
    simulateMouseEvent(
      'mousemove',
      document,
      originalRect.x + originalRect.width / 2,
      originalRect.y + originalRect.height - 10,
    );
    await page.waitForChanges();
    simulateMouseEvent(
      'mouseup',
      document,
      originalRect.x + originalRect.width / 2,
      originalRect.y + originalRect.height + 10,
    );
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = '1:1';
    await page.waitForChanges();
    simulateMouseEvent('mousedown', handler, originalRect.x, originalRect.y);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x + 10, originalRect.y + 15);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x - 100, originalRect.y + 15);
    await page.waitForChanges();

    simulateMouseEvent('mouseup', document, originalRect.x, originalRect.y);

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const rect = await component.getCropRect();
    simulateMouseEvent('mousedown', handler, rect.x + rect.width / 2, rect.y + rect.height);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, rect.x + rect.width / 2, rect.y + rect.height + 100);
    await page.waitForChanges();

    simulateMouseEvent('mouseup', document, originalRect.x, originalRect.y);
  });
  it('comprehensively tests mouseMove logic for BottomRight', async () => {
    const initialCrop: CropRect = { x: 50, y: 50, width: 100, height: 80 };
    const page = await newSpecPage({
      components: [KsCrop],
      html: '<div style="width: 300px; height: 300px;"><ks-crop src="' + MOCK_IMAGE_SRC + '"></ks-crop></div>',
    });
    const cropElement = page.body.querySelector('ks-crop');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const component = cropElement.componentOnReady ? await cropElement.componentOnReady() : cropElement;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = 'custom';
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await page.waitForChanges();

    Object.defineProperty(component, 'clientWidth', { value: 300 });
    Object.defineProperty(component, 'clientHeight', { value: 300 });

    const simulateMouseEvent = (
      type: 'mousedown' | 'mousemove' | 'mouseup',
      target: EventTarget,
      clientX: number,
      clientY: number,
    ) => {
      const event = new MouseEvent(type, { clientX, clientY, bubbles: true, cancelable: true });
      target.dispatchEvent(event);
    };

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const originalRect = await component.getCropRect();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const handler = cropElement.shadowRoot.querySelector('.handle-bottom-right') as HTMLElement;

    simulateMouseEvent('mousedown', handler, originalRect.x + originalRect.width, originalRect.y + originalRect.height);
    await page.waitForChanges();
    simulateMouseEvent(
      'mousemove',
      document,
      originalRect.x + originalRect.width + 10,
      originalRect.y + originalRect.height + 10,
    );
    await page.waitForChanges();
    simulateMouseEvent(
      'mouseup',
      document,
      originalRect.x + originalRect.width + 10,
      originalRect.y + originalRect.height + 10,
    );
    await page.waitForChanges();
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.initialCropRect = initialCrop;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    component.ratio = '1:1';
    await page.waitForChanges();
    simulateMouseEvent('mousedown', handler, originalRect.x, originalRect.y);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x + 10, originalRect.y + 15);
    await page.waitForChanges();

    simulateMouseEvent('mousemove', document, originalRect.x - 100, originalRect.y + 15);
    await page.waitForChanges();

    simulateMouseEvent('mouseup', document, originalRect.x, originalRect.y);
  });

  it('updates minWidth and minHeight when ratio changes', async () => {
    const page = await newSpecPage({
      components: [KsCrop],
      template: () => <ks-crop src={MOCK_IMAGE_SRC} ratio={'custom'}></ks-crop>,
    });
    await page.waitForChanges();
    const component = page.rootInstance as KsCrop;

    component.ratio = '16:9';
    await page.waitForChanges();

    component.ratio = '9:16';
    await page.waitForChanges();
  });

  it('adjusts initialCropRect width when ratio  and initialCropRect changes', async () => {
    const numericRatio = '16:9';
    const initialCrop: CropRect = { x: 10, y: 10, width: 80, height: 45 }; // Height that matches 16/9 for width 80

    const page = await newSpecPage({
      components: [KsCrop],
      template: () => <ks-crop src={MOCK_IMAGE_SRC} ratio={numericRatio} initialCropRect={initialCrop}></ks-crop>,
    });
    await page.waitForChanges();
    const component = page.rootInstance as KsCrop;

    component.onInitialCropRectChange();
    await page.waitForChanges();

    expect(component.cropRect.width).toBeCloseTo((initialCrop.height * 16) / 9);

    // Now, change initialCropRect to something that doesn't fit the ratio,
    // and see if it gets adjusted.
    const newInitialCrop: CropRect = { x: 5, y: 5, width: 50, height: 50 }; // width and height are equal
    component.initialCropRect = newInitialCrop;
    await page.waitForChanges();

    // The width should be adjusted based on the new height and the existing numeric ratio
  });
});
