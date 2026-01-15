'use client';

import React from 'react';
import { BaseModal, type BaseModalConfig } from '@fe-infra/keystone';
import KsModal from './KsModal';
import { createReactRoot, type ReactRootCompat } from '../utils/compat';

export type ModalConfig = BaseModalConfig<React.ReactNode>;

class Modal extends BaseModal<React.ReactNode, ModalConfig> {
  private rootInfo: { root: ReactRootCompat; element: HTMLDivElement } | null = null;

  private getOrCreateRoot() {
    if (this.rootInfo) return this.rootInfo;

    // Create React root for each container with version compatibility
    // This ensures proper isolation and concurrent rendering when available
    const element = document.createElement('div');
    const root = createReactRoot(element);
    this.container.appendChild(element);

    const rootInfo = { root, element };
    this.rootInfo = rootInfo;
    return rootInfo;
  }

  private renderModals() {
    const { root } = this.getOrCreateRoot();

    const modals = Array.from(this.queue.values());

    if (!modals.length) {
      root.render(null);
      return;
    }

    // Create React elements with proper lifecycle integration
    const modalElements = modals.map(({ id, config: { content, ...modalProps } }) =>
      React.createElement(
        KsModal,
        {
          key: id,
          ...modalProps,
          cbAfterDidLoad() {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            (this as HTMLKsModalElement).open();
          },
          onClose: () => this.handleModalClose(id),
        },
        content,
      ),
    );

    root.render(React.createElement(React.Fragment, {}, ...modalElements));
  }

  protected normalizeConfig(config: React.ReactNode | ModalConfig): ModalConfig {
    const defaultConfig: ModalConfig = {
      noHeader: false,
      noFooter: false,
    };

    if (typeof config === 'string' || React.isValidElement(config)) {
      return { ...defaultConfig, content: config };
    }
    return config !== null && typeof config === 'object' ? { ...defaultConfig, ...config } : defaultConfig;
  }

  protected onModalAdded(): void {
    this.renderModals();
  }

  protected onModalRemoved(): void {
    // Re-render to sync React state with DOM changes made by Stencil components
    this.renderModals();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const { root, element } = this.rootInfo;
    // Remove React roots that no longer have active modals
    // This prevents memory leaks from unused container roots
    const hasModals = this.queue.size > 0;

    if (!hasModals) {
      root.unmount();
      if (this.container.contains(element)) {
        this.container.removeChild(element);
      }
      this.rootInfo = null;
    }
  }

  protected onAllModalsClosed(): void {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const { root, element } = this.rootInfo;
    // Clean up root
    root.unmount();
    if (element.parentNode) {
      try {
        element.parentNode.removeChild(element);
      } catch (error) {
        console.warn('Failed to remove modal container:', error);
      }
    }

    this.rootInfo = null;
  }
}

/**
 * Global modal popups manager for React applications.
 * Supports React elements, JSX components, and standard modal configurations.
 *
 * @example
 * ```typescript
 * // Basic usage
 * modal.open('User created successfully!');
 * modal.default('Failed to save changes');
 *
 * // React element content
 * modal.open(<div><strong>Success!</strong></div>);
 *
 * // Custom configuration
 * modal.open({
 *   content: <CustomComponent />,
 *   variant: 'info',
 *   duration: 4000
 * });
 * ```
 */
export default new Modal();
