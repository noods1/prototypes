import { createApp, App, VNode, Component, h, isVue2, Vue2 } from 'vue-demi';
import { BaseToast, type BaseToastConfig, type ToastItem } from '@fe-infra/keystone';
import { KsToastBox } from './KsToastBox';
import { KsToast } from './KsToast';
import { isVNode } from '../utils';

export type ToastConfig = BaseToastConfig<string | VNode | Component>;

class Toast extends BaseToast<string | VNode | Component, ToastConfig> {
  private roots = new Map<
    HTMLElement,
    {
      app: App | any;
      element: HTMLDivElement;
      mounted: boolean;
    }
  >();

  private getOrCreateRoot(container: HTMLElement) {
    if (this.roots.has(container)) {
      return this.roots.get(container)!;
    }

    const element = document.createElement('div');

    // Create Vue app instance for each container with dynamic rendering
    // The render function is bound to container-specific toast filtering
    let app: App | any;

    if (isVue2) {
      const ToastContainer = Vue2.extend({
        name: 'ToastContainer',
        render: () => this.renderToastContainer(container),
      });
      app = new ToastContainer();
    } else {
      app = createApp({
        name: 'ToastContainer',
        render: () => this.renderToastContainer(container),
      });
    }

    container.appendChild(element);

    const rootInfo = { app, element, mounted: false };
    this.roots.set(container, rootInfo);
    return rootInfo;
  }

  private renderToastContainer(container: HTMLElement) {
    const toasts = this.getToastsByContainer(container);

    if (!toasts.length) {
      return null;
    }

    // Create VNode array for toast elements with content type detection
    // Supports string, VNode, and Component content types
    const toastVNodes = toasts.map(({ id, config: { content, ...toastProps } }) => {
      const props = {
        ...toastProps,
        cbAfterDidLoad() {
          (this as HTMLKsToastElement).open();
        },
      };

      const slots = {
        default: () => {
          if (typeof content === 'string') {
            return content;
          } else if (isVNode(content)) {
            return content;
          } else if (content && typeof content === 'object') {
            // Component object
            return h(content as Component);
          }
          return null;
        },
      };

      if (isVue2) {
        return h(KsToast, {
          key: id,
          props,
          on: {
            close: () => this.handleToastClose(id),
          },
          scopedSlots: slots,
        });
      } else {
        return h(
          KsToast,
          {
            key: id,
            ...props,
            onClose: () => this.handleToastClose(id),
          },
          slots,
        );
      }
    });

    return h(KsToastBox, {}, toastVNodes);
  }

  private renderToasts(container: HTMLElement) {
    const rootInfo = this.getOrCreateRoot(container);

    // Mount app on first render, update on subsequent renders
    // This maintains Vue reactivity while avoiding re-mounting
    if (!rootInfo.mounted) {
      if (isVue2) {
        // In Vue 2, directly calling `.$mount(element)` will replace the `element` on the DOM,
        // which can cause `onModalRemoved` to fail and lead to memory leaks.
        // Therefore, it is necessary to use manual mounting instead.
        const toasts = rootInfo.app.$mount();
        rootInfo.element.appendChild(toasts.$el);
      } else {
        rootInfo.app.mount(rootInfo.element);
      }
      rootInfo.mounted = true;
    } else {
      isVue2 ? rootInfo.app.$forceUpdate() : rootInfo.app._instance?.update();
    }
  }

  protected normalizeConfig(config: string | VNode | Component | ToastConfig): ToastConfig {
    if (typeof config === 'string' || isVNode(config)) {
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
    // Re-render to sync Vue state with DOM changes made by Stencil components
    this.renderToasts(container);

    this.roots.forEach((rootInfo, container) => {
      const hasToasts = this.getToastsByContainer(container).length > 0;

      if (!hasToasts) {
        if (rootInfo.mounted) {
          isVue2 ? rootInfo.app.$destroy() : rootInfo.app.unmount();
        }
        if (container.contains(rootInfo.element)) {
          container.removeChild(rootInfo.element);
        }
        this.roots.delete(container);
      }
    });
  }

  protected onAllToastsClosed(): void {
    this.roots.forEach((rootInfo, _container) => {
      if (rootInfo.mounted) {
        isVue2 ? rootInfo.app.$destroy() : rootInfo.app.unmount();
      }
      if (rootInfo.element.parentNode) {
        try {
          rootInfo.element.parentNode.removeChild(rootInfo.element);
        } catch (error) {
          console.warn('Failed to remove toast container:', error);
        }
      }
    });

    this.roots.clear();
  }
}

/**
 * Global toast notification manager for Vue applications.
 * Supports Vue components, VNodes, and standard toast configurations.
 *
 * @example
 * ```typescript
 * // Basic usage
 * toast.success('Data saved successfully!');
 * toast.error('Connection failed');
 * toast.loading('Processing request...');
 *
 * // Vue component content
 * toast.open({
 *   content: CustomNotification,
 *   variant: 'success',
 *   duration: 5000
 * });
 *
 * // VNode content
 * import { h } from 'vue';
 * toast.info(h('div', 'Custom content'));
 *
 * // Promise handling
 * const instance = toast.loading('Processing...');
 * instance.then(() => console.log('Completed'));
 * ```
 */
export const toast = new Toast();
