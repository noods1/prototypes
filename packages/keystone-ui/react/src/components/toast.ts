'use client';

import React from 'react';
import { BaseToast, type BaseToastConfig, type ToastItem } from '@fe-infra/keystone';
import KsToast from './KsToast';
import KsToastBox from './KsToastBox';
import { createReactRoot, type ReactRootCompat } from '../utils/compat';

export type ToastConfig = BaseToastConfig<React.ReactNode>;

class Toast extends BaseToast<React.ReactNode, ToastConfig> {
  private roots = new Map<HTMLElement, { root: ReactRootCompat; element: HTMLDivElement }>();

  private getOrCreateRoot(container: HTMLElement) {
    if (this.roots.has(container)) {
      return this.roots.get(container)!;
    }

    // Create React root for each container with version compatibility
    // This ensures proper isolation and concurrent rendering when available
    const element = document.createElement('div');
    const root = createReactRoot(element);
    container.appendChild(element);

    const rootInfo = { root, element };
    this.roots.set(container, rootInfo);
    return rootInfo;
  }

  private renderToasts(container: HTMLElement) {
    const { root } = this.getOrCreateRoot(container);

    // Filter toasts that belong to this specific container
    const toasts = this.getToastsByContainer(container);

    if (!toasts.length) {
      root.render(null);
      return;
    }

    // Create React elements with proper lifecycle integration
    const toastElements = toasts.map(({ id, config: { content, ...toastProps } }) =>
      React.createElement(
        KsToast,
        {
          key: id,
          ...toastProps,
          cbAfterDidLoad() {
            // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
            (this as HTMLKsToastElement).open();
          },
          onClose: () => this.handleToastClose(id),
        },
        content,
      ),
    );

    root.render(React.createElement(KsToastBox, {}, toastElements));
  }

  protected normalizeConfig(config: React.ReactNode | ToastConfig): ToastConfig {
    if (typeof config === 'string' || React.isValidElement(config)) {
      return { content: config };
    }
    return config !== null && typeof config === 'object' ? (config as ToastConfig) : {};
  }

  protected onToastAdded(_id: string, config: ToastConfig): void {
    const container = this.getContainer(config.container);
    this.renderToasts(container);
  }

  protected onToastRemoved(_id: string, item: ToastItem<ToastConfig>): void {
    const container = this.getContainer(item.config.container);
    // Re-render to sync React state with DOM changes made by Stencil components
    this.renderToasts(container);

    // Remove React roots that no longer have active toasts
    // This prevents memory leaks from unused container roots
    this.roots.forEach(({ root, element }, container) => {
      const hasToasts = this.getToastsByContainer(container).length > 0;

      if (!hasToasts) {
        root.unmount();
        if (container.contains(element)) {
          container.removeChild(element);
        }
        this.roots.delete(container);
      }
    });
  }

  protected onAllToastsClosed(): void {
    // Clean up all roots
    this.roots.forEach(({ root, element }, _container) => {
      root.unmount();
      if (element.parentNode) {
        try {
          element.parentNode.removeChild(element);
        } catch (error) {
          console.warn('Failed to remove toast container:', error);
        }
      }
    });

    this.roots.clear();
  }
}

/**
 * Global toast notification manager for React applications.
 * Supports React elements, JSX components, and standard toast configurations.
 *
 * @example
 * ```typescript
 * // Basic usage
 * toast.success('User created successfully!');
 * toast.error('Failed to save changes');
 * toast.loading('Uploading files...');
 *
 * // React element content
 * toast.success(<div><strong>Success!</strong></div>);
 *
 * // Custom configuration
 * toast.open({
 *   content: <CustomComponent />,
 *   variant: 'info',
 *   duration: 4000
 * });
 *
 * // Promise handling
 * const instance = toast.loading('Processing...');
 * instance.then(() => console.log('Completed'));
 * ```
 */
export default new Toast();
