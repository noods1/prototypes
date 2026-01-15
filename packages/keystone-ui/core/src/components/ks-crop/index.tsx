/* eslint-disable @stencil-community/prefer-vdom-listener */
/* eslint-disable max-lines */
import { CropRect, CropRectRatio, DragType, ImageType } from '@src/entities/components/crop';
import { Component, ComponentInterface, Host, h, Prop, State, Watch, Method, Listen } from '@stencil/core';

const prefix = 'crop';

@Component({
  tag: 'ks-crop',
  styleUrl: 'index.scss',
  shadow: true,
})
export class KsCrop implements ComponentInterface {
  ['ks-name'] = 'ks-crop';
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private el: HTMLDivElement;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private imageRef: HTMLImageElement;

  /**
   * @locale {en} The URL of the image to be cropped. This is a required property.
   * @locale {zh} 需要裁剪的图片的 URL。这是一个必填属性。
   */
  @Prop() src = '';

  /**
   * @locale {en} The initial crop rectangle (x, y, width, height).
   * If `ratio` is set to a specific aspect ratio (e.g., '16:9'), the height of this initial rectangle might be adjusted to match the ratio based on its width.
   * If not provided, a default crop rectangle will be used.
   * @locale {zh} 初始裁剪区域的坐标和尺寸 (x, y, width, height)。
   * 如果 `ratio` 被设置为特定的宽高比（例如 '16:9'），则此初始矩形的高度可能会根据其宽度和指定的比例进行调整。
   * 如果未提供，则使用默认的裁剪区域。
   */
  @Prop() initialCropRect?: CropRect;

  /**
   * @locale {en} The desired aspect ratio for the crop selection box.
   * Accepts predefined ratios like '16:9', '4:3', '1:1', or 'custom' for free-form cropping.
   * When a specific ratio is set, the selection box will maintain this ratio during resize.
   * Default is '16:9'.
   * @locale {zh} 裁剪选框的目标宽高比。
   * 接受预定义的宽高比，如 '16:9'、'9:16'、'1:1'，或 'custom' 以进行自由裁剪。
   * 设置特定宽高比后，选框在调整大小时将保持此比例。
   * 默认为 '16:9'。
   */
  @Prop() ratio: CropRectRatio = 'custom';

  /**
   * @locale {en} The MIME type of the output image (e.g., 'image/png', 'image/jpeg', 'image/webp').
   * Default is 'image/jpeg'.
   * @locale {zh} 输出图片的 MIME 类型（例如 'image/png', 'image/jpeg', 'image/webp'）。
   * 默认为 'image/jpeg'。
   */
  @Prop() imageType: ImageType = 'image/jpeg';

  /**
   * @locale {en} The quality of the output image, a number between 0 and 1.
   * This property is only applicable when `imageType` is 'image/jpeg' or 'image/webp'.
   * Default is 0.9.
   * @locale {zh} 输出图片的质量，一个0到1之间的数字。
   * 此属性仅在 `imageType` 为 'image/jpeg' 或 'image/webp' 时适用。
   * 默认为 0.9。
   */
  @Prop() imageQuality = 0.9;

  /**
   * @locale {en} How the image size inside the Crop is limited by the container (by height or width)
   * Default is 'width'.
   * @locale {zh} Crop内部图片尺寸受容器限制的方式（受高度或者宽度）
   * 默认为 'width'。
   */
  @Prop() sizeMode: 'height' | 'width' = 'width';
  /**
   * @locale {en} Fixed Crop internal cropping box size
   * @locale {zh} 固定Crop内部裁剪框尺寸
   */
  @Prop() fixedRect = false;
  /**
   * @locale {en} Crop cropping frame area highlighting method
   * @locale {zh} Crop裁剪框区域高亮方式
   */
  @Prop() circle = false;

  @State() cropRect: CropRect = {
    width: 120,
    height: 120,
  };

  private initCrop: CropRect = { width: 120, height: 120 };
  private isDragging = false;
  private isResizing = false;
  private moving = false;
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  private resizeObserver: ResizeObserver = null;

  @State() minWidth = 38;
  @State() minHeight = 38;
  @State() resizeHandle: string | null = null;
  @State() startX = 0;
  @State() startY = 0;
  @State() _ratio: CropRectRatio = 'custom';

  /**
   * @locale {en} Captures the currently selected crop area as an image data URL.
   * The output format and quality are determined by `imageType` and `imageQuality` props.
   * @locale {zh} 将当前选定的裁剪区域捕获为图像数据 URL。
   * 输出格式和质量由 `imageType` 和 `imageQuality` 属性决定。
   */
  @Method()
  async screenshot() {
    const canvas = document.createElement('canvas');
    const scale = this.imageRef.naturalWidth / this.imageRef.width;
    const { x, y, width, height } = this.cropRect;
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    ctx.drawImage(
      this.imageRef,
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      x * scale,
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      y * scale,
      width * scale,
      height * scale,
      0,
      0,
      width * scale,
      height * scale,
    );
    const dataURL = await new Promise<string>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const dataURL = URL.createObjectURL(blob);
            resolve(dataURL);
          }
        },
        this.imageType,
        this.imageQuality,
      );
    });
    return dataURL;
  }

  /**
   * @locale {en} Retrieves the current crop rectangle's dimensions and position, scaled relative to the original image's natural dimensions.
   * This is useful for obtaining the crop parameters for server-side processing or other manipulations based on the original image.
   * @locale {zh} 获取当前裁剪框的尺寸和位置，这些值是相对于原始图片的自然尺寸进行缩放的。
   * 这对于获取用于服务器端处理或基于原始图像进行其他操作的裁剪参数非常有用。
   */
  @Method()
  async getCropRect() {
    const scale = this.imageRef.naturalWidth / this.imageRef.width || 1;
    const { x, y, width, height } = this.cropRect;
    return {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      x: x * scale,
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      y: y * scale,
      width: width * scale,
      height: height * scale,
    };
  }

  private handleMouseDown = (e: MouseEvent, type: DragType) => {
    if (this.resizeHandle) return;
    e.stopPropagation();
    e.preventDefault();
    switch (type) {
      case 'move':
        this.isDragging = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        break;
      case 'topLeft':
      case 'top':
      case 'topRight':
      case 'left':
      case 'right':
      case 'bottomLeft':
      case 'bottom':
      case 'bottomRight':
        this.isResizing = true;
        this.resizeHandle = type;
        this.startX = e.clientX;
        this.startY = e.clientY;
        break;
      default:
    }
  };

  private handleDefaultLeftDrag = (deltaX: number, width: number, x: number) => {
    let targetXPath = 0;
    if (deltaX > 0) {
      const distanceX = width - this.minWidth;
      targetXPath = deltaX < distanceX ? deltaX : distanceX;
    }
    if (deltaX < 0) {
      const distanceX = x;
      targetXPath = -deltaX < distanceX ? deltaX : -distanceX;
    }
    return targetXPath;
  };

  private handleDefaultRightDrag = (deltaX: number, width: number, x: number) => {
    let targetXPath = 0;
    if (deltaX > 0) {
      const distanceX = this.el.clientWidth - width - x;
      targetXPath = deltaX < distanceX ? deltaX : distanceX;
    }
    if (deltaX < 0) {
      const distanceX = width - this.minWidth;
      targetXPath = -deltaX < distanceX ? deltaX : -distanceX;
    }
    return targetXPath;
  };

  private handleDefaultTopDrag = (deltaY: number, height: number, y: number) => {
    let targetYPath = 0;
    if (deltaY > 0) {
      const distanceY = height - this.minHeight;
      targetYPath = deltaY < distanceY ? deltaY : distanceY;
    }
    if (deltaY < 0) {
      const distanceY = y;
      targetYPath = -deltaY < distanceY ? deltaY : -distanceY;
    }
    return targetYPath;
  };

  private handleDefaultBottomDrag = (deltaY: number, height: number, y: number) => {
    let targetYPath = 0;
    if (deltaY > 0) {
      const distanceY = this.el.clientHeight - height - y;
      targetYPath = deltaY < distanceY ? deltaY : distanceY;
    }
    if (deltaY < 0) {
      const distanceY = height - this.minHeight;
      targetYPath = -deltaY < distanceY ? deltaY : -distanceY;
    }
    return targetYPath;
  };

  private get getRatioRes() {
    const nums = this._ratio.split(':').map((num) => parseInt(num));
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return nums[0] / nums[1];
  }

  private handleRatioLeftDrag = (deltaX: number, width: number, x: number, height: number, y: number) => {
    let targetXPath = 0;
    if (deltaX > 0) {
      const distanceX = width - this.minWidth;
      targetXPath = deltaX < distanceX ? deltaX : distanceX;
    }
    if (deltaX < 0) {
      const distanceX = x;
      const distanceY = Math.max(y, this.el.clientHeight - y - height) * 2;
      const pathX = -deltaX < distanceX ? deltaX : -distanceX;
      const computedY = Math.round(distanceY / this.getRatioRes);
      if (-pathX > computedY) {
        targetXPath = -Math.round(computedY * this.getRatioRes);
      } else {
        targetXPath = pathX;
      }
    }

    return [targetXPath, targetXPath * this.getRatioRes];
  };

  private handleRatioRightDrag = (deltaX: number, width: number, x: number, height: number, y: number) => {
    let targetXPath = 0;
    if (deltaX < 0) {
      targetXPath = this.handleDefaultRightDrag(deltaX, width, x);
    }
    if (deltaX > 0) {
      const distanceX = this.el.clientWidth - x - width;
      const distanceY = Math.max(y, this.el.clientHeight - y - height) * 2;
      const pathX = deltaX < distanceX ? deltaX : distanceX;
      const computedY = Math.round(distanceY / this.getRatioRes);
      if (pathX > computedY) {
        targetXPath = Math.round(computedY * this.getRatioRes);
      } else {
        targetXPath = pathX;
      }
    }

    return [targetXPath, targetXPath * this.getRatioRes];
  };

  private handleRatioTopDrag = (deltaY: number, height: number, y: number, width: number, x: number) => {
    let targetYPath = 0;
    if (deltaY > 0) targetYPath = this.handleDefaultTopDrag(deltaY, height, y);
    else {
      const distanceY = y;
      const distanceX = Math.max(x, this.el.clientWidth - x - width) * 2;
      const pathY = -deltaY < distanceY ? deltaY : -distanceY;
      const computedX = Math.round(distanceX / this.getRatioRes);
      if (-pathY > computedX) {
        targetYPath = -Math.round(computedX * this.getRatioRes);
      } else {
        targetYPath = pathY;
      }
    }
    return [targetYPath, targetYPath / this.getRatioRes];
  };

  private handleRatioBottomDrag = (deltaY: number, height: number, y: number, width: number, x: number) => {
    let targetYPath = 0;
    if (deltaY < 0) targetYPath = this.handleDefaultBottomDrag(deltaY, height, y);
    else {
      const distanceY = this.el.clientHeight - y - height;
      const distanceX = Math.max(x, this.el.clientWidth - x - width) * 2;
      const pathY = deltaY < distanceY ? deltaY : distanceY;
      const computedX = Math.round(distanceX / this.getRatioRes);
      if (pathY > computedX) {
        targetYPath = Math.round(computedX * this.getRatioRes);
      } else {
        targetYPath = pathY;
      }
    }
    return [targetYPath, targetYPath / this.getRatioRes];
  };

  private handleDragMove(deltaX: number, deltaY: number) {
    let { x, y } = this.cropRect;
    const { width, height } = this.cropRect;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    x += deltaX;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    y += deltaY;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    if (x < 0) x = 0;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    if (y < 0) y = 0;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    if (x + width > this.el.clientWidth) x = this.el.clientWidth - width;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    if (y + height > this.el.clientHeight) y = this.el.clientHeight - height;
    this.cropRect = {
      x,
      y,
      width,
      height,
    };
  }

  private handleResizeMoveCustom(deltaX: number, deltaY: number) {
    let { x, y, width, height } = this.cropRect;
    switch (this.resizeHandle) {
      case 'topLeft': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const targetYPath = this.handleDefaultTopDrag(deltaY, height, y);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        y += targetYPath;
        height -= targetYPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const targetXPath = this.handleDefaultLeftDrag(deltaX, width, x);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        x += targetXPath;
        width -= targetXPath;
        break;
      }
      case 'top': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const targetYPath = this.handleDefaultTopDrag(deltaY, height, y);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        y += targetYPath;
        height -= targetYPath;
        break;
      }
      case 'topRight': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const targetYPath = this.handleDefaultTopDrag(deltaY, height, y);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        y += targetYPath;
        height -= targetYPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        width += this.handleDefaultRightDrag(deltaX, width, x);
        break;
      }
      case 'left': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const targetPath = this.handleDefaultLeftDrag(deltaX, width, x);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        x += targetPath;
        width -= targetPath;
        break;
      }
      case 'right': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        width += this.handleDefaultRightDrag(deltaX, width, x);
        break;
      }
      case 'bottomLeft': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        height += this.handleDefaultBottomDrag(deltaY, height, y);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const targetPath = this.handleDefaultLeftDrag(deltaX, width, x);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        x += targetPath;
        width -= targetPath;
        break;
      }
      case 'bottom': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        height += this.handleDefaultBottomDrag(deltaY, height, y);
        break;
      }
      case 'bottomRight': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        height += this.handleDefaultBottomDrag(deltaY, height, y);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        width += this.handleDefaultRightDrag(deltaX, width, x);
        break;
      }
      default:
    }
    this.cropRect = {
      x,
      y,
      width: Math.max(this.minWidth, width),
      height: Math.max(this.minHeight, height),
    };
  }

  private handleResizeMoveRatio(deltaX: number, deltaY: number) {
    let { x, y, width, height } = this.cropRect;

    switch (this.resizeHandle) {
      case 'topLeft': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const [targetXPath, targetYPath] = this.handleRatioLeftDrag(deltaX, width, x, height, y);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        x += targetXPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        width -= targetXPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        height -= targetYPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        y += targetYPath / 2;
        break;
      }
      case 'top': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const [targetYPath, targetXPath] = this.handleRatioTopDrag(deltaY, height, y, width, x);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        y += targetYPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        height -= targetYPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        x += targetXPath / 2;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        width -= targetXPath;
        break;
      }
      case 'topRight': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const [targetXPath, targetYPath] = this.handleRatioRightDrag(deltaX, width, x, height, y);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        width += targetXPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        height += targetYPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        y -= targetYPath / 2;
        break;
      }
      case 'left': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const [targetXPath, targetYPath] = this.handleRatioLeftDrag(deltaX, width, x, height, y);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        x += targetXPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        width -= targetXPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        height -= targetYPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        y += targetYPath / 2;
        break;
      }
      case 'right': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const [targetXPath, targetYPath] = this.handleRatioRightDrag(deltaX, width, x, height, y);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        width += targetXPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        height += targetYPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        y -= targetYPath / 2;
        break;
      }
      case 'bottomLeft': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const [targetXPath, targetYPath] = this.handleRatioLeftDrag(deltaX, width, x, height, y);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        x += targetXPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        width -= targetXPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        height -= targetYPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        y += targetYPath / 2;
        break;
      }
      case 'bottom': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const [targetYPath, targetXPath] = this.handleRatioBottomDrag(deltaY, height, y, width, x);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        width += targetXPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        height += targetYPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        x -= targetXPath / 2;
        break;
      }
      case 'bottomRight': {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        const [targetXPath, targetYPath] = this.handleRatioRightDrag(deltaX, width, x, height, y);
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        width += targetXPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        height += targetYPath;
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        y -= targetYPath / 2;
        break;
      }
      default:
    }
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    if (x + width > this.el.clientWidth) x = this.el.clientWidth - width;
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    if (y + height > this.el.clientHeight) y = this.el.clientHeight - height;
    this.cropRect = {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      x: Math.max(x, 0),
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      y: Math.max(y, 0),
      width: Math.max(this.minWidth, width),
      height: Math.max(this.minHeight, height),
    };
  }

  private handleMouseMove = (e: MouseEvent) => {
    if (this.moving || (!this.isResizing && !this.isDragging)) return;
    this.moving = true;
    if (this.isDragging) {
      this.handleDragMove(e.clientX - this.startX, e.clientY - this.startY);
      this.startX = e.clientX;
      this.startY = e.clientY;
    } else if (this.isResizing && this.resizeHandle) {
      const { clientX, clientY } = e;
      const deltaX = clientX - this.startX;
      const deltaY = clientY - this.startY;
      this.startX = clientX;
      this.startY = clientY;
      if (this._ratio === 'custom') {
        this.handleResizeMoveCustom(deltaX, deltaY);
      } else {
        this.handleResizeMoveRatio(deltaX, deltaY);
      }
    }
    this.moving = false;
  };

  private handleMouseUp = () => {
    this.isDragging = false;
    this.isResizing = false;
    this.resizeHandle = null;
  };

  @Watch('ratio')
  onRatioChange() {
    if (this.circle) {
      this._ratio = '1:1';
    } else {
      this._ratio = this.ratio;
    }
    if (this._ratio !== 'custom') {
      if (this.getRatioRes > 1) {
        this.minWidth = 38;
        this.minHeight = this.getRatioRes * this.minWidth;
      } else if (this.getRatioRes < 1) {
        this.minHeight = 38;
        this.minWidth = this.minHeight / this.getRatioRes;
      }
    }
    this.onInitialCropRectChange();
  }

  @Watch('initialCropRect')
  onInitialCropRectChange() {
    const initialCropRect = { ...this.initCrop, ...this.initialCropRect };
    if (this._ratio !== 'custom') {
      const height = initialCropRect.width * this.getRatioRes;
      initialCropRect.height = height;
    }
    const { x, y, width, height } = initialCropRect;
    if (x === undefined || y === undefined) {
      initialCropRect.x = (this.imageRef.clientWidth - width) / 2;
      initialCropRect.y = (this.imageRef.clientHeight - height) / 2;
    }
    this.cropRect = initialCropRect;
  }

  @Watch('src')
  onSrcChange() {
    this.onRatioChange();
  }

  @Listen('mousemove', { target: 'document' })
  onMouseMove(e: MouseEvent) {
    this.handleMouseMove(e);
  }
  @Listen('mouseup', { target: 'document' })
  onMouseUp() {
    this.handleMouseUp();
  }

  private renderDotDrag(position: DragType) {
    return (
      <svg
        onMouseDown={(e) => {
          this.handleMouseDown(e, position);
        }}
        class={`${prefix}-handle handle-${this.camelToKebab(position)}`}
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        data-testid="ks-crop-index-odoH6v"
      >
        <path
          d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
          fill="white"
          stroke="#121415"
        />
      </svg>
    );
  }

  private camelToKebab(camelCaseString: string): string {
    return camelCaseString.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  private renderHorizontalSideDrag(position: DragType) {
    return (
      <svg
        onMouseDown={(e) => {
          this.handleMouseDown(e, position);
        }}
        class={`${prefix}-handle handle-${position}-center`}
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="8"
        viewBox="0 0 26 8"
        fill="none"
        data-testid="ks-crop-index-22LCrK"
      >
        <path
          d="M22 7C23.6569 7 25 5.65685 25 4C25 2.34315 23.6569 1 22 1L4 1C2.34315 1 1 2.34315 1 4C1 5.65685 2.34315 7 4 7L22 7Z"
          fill="white"
          stroke="#121415"
        />
      </svg>
    );
  }

  private renderVerticalSideDrag(position: DragType) {
    return (
      <svg
        onMouseDown={(e) => {
          this.handleMouseDown(e, position);
        }}
        class={`${prefix}-handle handle-middle-${position}`}
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="25"
        viewBox="0 0 8 25"
        fill="none"
        data-testid="ks-crop-index-qHkLJh"
      >
        <path
          d="M7 3.5C7 1.84315 5.65685 0.5 4 0.5C2.34315 0.5 1 1.84315 1 3.5L1 21.5C1 23.1569 2.34315 24.5 4 24.5C5.65685 24.5 7 23.1569 7 21.5L7 3.5Z"
          fill="white"
          stroke="#121415"
        />
      </svg>
    );
  }

  componentDidLoad(): Promise<void> | void {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.imageRef.clientHeight && this.imageRef.clientWidth) {
        this.onRatioChange();
      }
    });
    this.resizeObserver.observe(this.imageRef);
  }

  render() {
    const r = this.cropRect.width / 2;
    const clipPathValue = this.circle
      ? // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        `circle(${r}px at ${this.cropRect.x + r}px ${this.cropRect.y + r}px)`
      : // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        `rect(${this.cropRect.y}px ${this.cropRect.x + this.cropRect.width}px ${this.cropRect.y + this.cropRect.height}px ${this.cropRect.x}px)`;

    const imagestyle = { clipPath: clipPathValue };

    // 裁剪选区的内联样式
    const cropSelectionStyle = {
      position: 'absolute',
      left: `${this.cropRect.x}px`,
      top: `${this.cropRect.y}px`,
      width: `${this.cropRect.width}px`,
      height: `${this.cropRect.height}px`,
    };
    return (
      <Host ks-name="ks-crop">
        {/* @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf */}
        <div ref={(el) => (this.el = el)} class={`${prefix}-container ${prefix}-container-${this.sizeMode}`}>
          <div class={`${prefix}-image-container`}>
            <img
              src={this.src}
              class={`${prefix}-source-image ${prefix}-source-image-${this.sizeMode} image-background`}
            />

            <img
              // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
              ref={(el) => (this.imageRef = el)}
              style={imagestyle}
              src={this.src}
              class={`${prefix}-source-image ${prefix}-source-image-${this.sizeMode} image-upper`}
              crossOrigin="anonymous"
              data-testid="ks-crop-index-tPTwK9"
            />
          </div>

          <div
            class={`${prefix}-selection-box`}
            onMouseDown={(e) => {
              this.handleMouseDown(e, 'move');
            }}
            style={cropSelectionStyle}
            data-testid="ks-crop-index-aWNikt"
          >
            <div class={`${prefix}-grid`}>
              <div class="grid-line vertical-1"></div>
              <div class="grid-line vertical-2"></div>
              <div class="grid-line horizontal-1"></div>
              <div class="grid-line horizontal-2"></div>
            </div>

            {!this.fixedRect && [
              this.renderDotDrag('topLeft'),
              this.renderDotDrag('topRight'),
              this.renderDotDrag('bottomLeft'),
              this.renderDotDrag('bottomRight'),
              this.renderHorizontalSideDrag('top'),
              this.renderHorizontalSideDrag('bottom'),
              this.renderVerticalSideDrag('left'),
              this.renderVerticalSideDrag('right'),
            ]}
          </div>
        </div>
      </Host>
    );
  }
}
