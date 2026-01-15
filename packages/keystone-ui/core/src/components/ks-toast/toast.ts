import { isString, isObject } from 'lodash-es';
import { logger } from '@src/utils/logger';
import { assignment } from '@src/utils/utils';
import { BaseToast, type BaseToastConfig } from '@src/utils/toast';

export type ToastConfig = BaseToastConfig<string>;

/**
 * DOM-based Toast implementation. Extends `BaseToast` with native DOM rendering capabilities.
 */
export class Toast extends BaseToast<string, ToastConfig> {
  private toastBoxEl: HTMLKsToastBoxElement;

  constructor() {
    super();
    this.toastBoxEl = document.createElement('ks-toast-box');
  }

  private configureToastElement(element: HTMLKsToastElement, config: ToastConfig) {
    // Basic property assignment
    const { btm, btmConfig, customStyle, ...props } = config;
    Object.entries(props).forEach(([key, value]) => assignment(element, key, value));

    // Custom style assignment
    if (isObject(customStyle)) {
      element.customStyle = customStyle;
    }

    // BTM tracking attributes
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    element.setAttribute('data-btm', btm);
    if (btmConfig) {
      element.setAttribute('data-btm-config', isObject(btmConfig) ? JSON.stringify(btmConfig) : btmConfig.toString());
    }
  }

  private setupToastLifecycle(id: string, element: HTMLKsToastElement, container: HTMLElement) {
    // Auto-open toast after DOM is ready
    element.cbAfterDidLoad = () => {
      element.open();
    };

    // Handle toast close event and perform cleanup
    element.addEventListener('ksClose', () => {
      // Clean up toast box if using default container and queue is empty
      // This prevents memory leaks and maintains clean DOM structure
      if (container === this.container) {
        if (this.queue.size === 0 && this.container.contains(this.toastBoxEl)) {
          try {
            this.container.removeChild(this.toastBoxEl);
          } catch (error) {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            logger.warn('Failed to remove toast box:', error);
          }
        }
      }

      this.handleToastClose(id);
    });
  }

  protected normalizeConfig(config: string | ToastConfig): ToastConfig {
    if (isString(config)) {
      return { content: config };
    }
    return isObject(config) ? config : {};
  }

  protected onToastAdded(id: string, config: ToastConfig): void {
    const container = this.getContainer(config.container);

    // Create new toast box for custom containers, or use default one
    // This ensures proper isolation between different container contexts
    let toastBox: HTMLKsToastBoxElement;
    if (container !== this.container) {
      toastBox = document.createElement('ks-toast-box');
      if (!container.contains(toastBox)) {
        container.appendChild(toastBox);
      }
    } else {
      toastBox = this.toastBoxEl;
      if (!this.container.contains(this.toastBoxEl)) {
        this.container.appendChild(this.toastBoxEl);
      }
    }

    const toastEl: HTMLKsToastElement = document.createElement('ks-toast');
    toastEl.setAttribute('data-toast-id', id);
    this.configureToastElement(toastEl, config);

    try {
      toastBox.appendChild(toastEl);
      this.setupToastLifecycle(id, toastEl, toastBox);
    } catch (error) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      logger.error('Failed to create toast:', error);
    }
  }

  protected onToastRemoved(id: string): void {
    const element: HTMLKsToastElement | null = document.querySelector(`ks-toast[data-toast-id="${id}"]`);
    if (element && typeof element.close === 'function') {
      element.close();
    }
  }

  protected onAllToastsClosed(): void {
    // Clean up all toast boxes
    try {
      if (this.container.contains(this.toastBoxEl)) {
        this.container.removeChild(this.toastBoxEl);
      }
    } catch (error) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      logger.warn('Failed to remove toast box:', error);
    }
  }
}

/**
 * Global toast notification manager for native DOM applications.
 * Supports preset variants, custom configurations, and promise-based handling.
 *
 * @example
 * ```typescript
 * // Basic usage
 * toast.success('Operation completed!');
 * toast.error('Something went wrong');
 * toast.loading('Processing...');
 *
 * // Custom configuration
 * toast.open({
 *   content: 'Custom message',
 *   variant: 'info',
 *   duration: 5000
 * });
 *
 * // Promise handling
 * const instance = toast.loading('Please wait...');
 * instance.then(() => console.log('Closed'));
 * instance(); // Close manually
 * ```
 */
export const toast = new Toast();
