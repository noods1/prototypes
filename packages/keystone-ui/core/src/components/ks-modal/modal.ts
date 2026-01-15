import { isString, isObject } from 'lodash-es';
import { logger } from '@src/utils/logger';
import { assignment } from '@src/utils/utils';
import { BaseModal, type BaseModalConfig } from '@src/utils/modal';

export type ModalConfig = BaseModalConfig<string>;

/**
 * DOM-based Modal implementation. Extends `BaseModal` with native DOM rendering capabilities.
 */
class Modal extends BaseModal<string, ModalConfig> {
  private configureModalElement(element: HTMLKsModalElement, config: ModalConfig) {
    // Basic property assignment
    const { btm, btmConfig, content, ...props } = config;
    Object.entries(props).forEach(([key, value]) => assignment(element, key, value));

    // Content is a string, append it as a text node
    if (isString(content)) {
      element.appendChild(document.createTextNode(content));
    }

    // BTM tracking attributes
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    element.setAttribute('data-btm', btm);
    if (btmConfig) {
      element.setAttribute('data-btm-config', isObject(btmConfig) ? JSON.stringify(btmConfig) : btmConfig.toString());
    }
  }

  private setupModalLifecycle(id: string, element: HTMLKsModalElement) {
    // Auto-open modal after DOM is ready
    element.cbAfterDidLoad = () => {
      element.open();
    };

    // Handle modal close event and perform cleanup
    element.addEventListener('ksClose', () => this.handleModalClose(id));
  }

  protected normalizeConfig(config: string | ModalConfig): ModalConfig {
    const defaultConfig: ModalConfig = {
      noHeader: false,
      noFooter: false,
    };

    if (isString(config)) {
      return { ...defaultConfig, content: config };
    }
    return isObject(config) ? { ...defaultConfig, ...config } : defaultConfig;
  }

  protected onModalAdded(id: string, config: ModalConfig): void {
    const modalEl: HTMLKsModalElement = document.createElement('ks-modal');
    modalEl.setAttribute('data-modal-id', id);
    this.configureModalElement(modalEl, config);

    try {
      this.container.appendChild(modalEl);
      this.setupModalLifecycle(id, modalEl);
    } catch (error) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      logger.error('Failed to create modal:', error);
    }
  }

  protected onModalRemoved(id: string): void {
    try {
      const element: HTMLKsModalElement | null = document.querySelector(`ks-modal[data-modal-id="${id}"]`);
      if (this.container.contains(element)) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        this.container.removeChild(element);
      }
    } catch (error) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      logger.warn('Failed to remove modal element:', error);
    }
  }

  protected onAllModalsClosed(): void {
    try {
      const remainingModals = this.container.querySelectorAll('ks-modal[data-modal-id]');
      remainingModals.forEach((modal) => {
        if (this.container.contains(modal)) {
          this.container.removeChild(modal);
        }
      });
    } catch (error) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      logger.warn('Failed to clean up modal elements:', error);
    }
  }
}

/**
 * Global modal popup manager for native DOM applications.
 * Supports preset variants, custom configurations, and promise-based handling.
 *
 * @example
 * ```typescript
 * // Basic usage
 * modal.open('Operation completed!');
 * modal.default('Something went wrong');
 *
 * // Custom configuration
 * modal.open({
 *   content: 'Custom message',
 *   noHeader: true,
 *   noFooter: true
 * });
 *
 * // Promise handling
 * const instance = modal.open('Please wait...');
 * instance.then(() => console.log('Closed'));
 * instance(); // Close manually
 * ```
 */
export const modal = new Modal();
