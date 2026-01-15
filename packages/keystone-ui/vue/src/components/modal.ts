import { createApp, App, VNode, Component, h, isVue2, Vue2 } from 'vue-demi';
import { BaseModal, type BaseModalConfig } from '@fe-infra/keystone';
import { KsModal } from './KsModal';
import { isVNode } from '../utils';

export type ModalConfig = BaseModalConfig<string | VNode | Component>;

class Modal extends BaseModal<string | VNode | Component, ModalConfig> {
  private rootInfo: {
    app: App | any;
    element: HTMLDivElement;
    mounted: boolean;
  } | null = null;

  private getOrCreateRoot() {
    if (this.rootInfo) return this.rootInfo;

    const element = document.createElement('div');

    // Create Vue app instance for each container with dynamic rendering
    // The render function is bound to container-specific toast filtering
    let app: App | any;

    if (isVue2) {
      const ModalContainer = Vue2.extend({
        name: 'ModalContainer',
        // Vue 2 requires a single root node for components,
        // so an unstyled root element must be used to wrap and render fragments.
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        render: () => h('div', { style: { display: 'contents' } }, this.renderModalContainer()),
      });
      app = new ModalContainer();
    } else {
      app = createApp({
        name: 'ModalContainer',
        render: () => this.renderModalContainer(),
      });
    }

    this.container.appendChild(element);

    const rootInfo = { app, element, mounted: false };
    this.rootInfo = rootInfo;
    return rootInfo;
  }

  private renderModalContainer() {
    const modals = Array.from(this.queue.values());

    if (!modals.length) {
      return null;
    }

    // Create VNode array for toast elements with content type detection
    // Supports string, VNode, and Component content types
    return modals.map(({ id, config: { content, ...modalProps } }) => {
      const props = {
        ...modalProps,
        cbAfterDidLoad() {
          (this as HTMLKsModalElement).open();
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
        return h(KsModal, {
          key: id,
          props,
          on: {
            close: () => this.handleModalClose(id),
          },
          scopedSlots: slots,
        });
      } else {
        return h(
          KsModal,
          {
            key: id,
            ...props,
            onClose: () => this.handleModalClose(id),
          },
          slots,
        );
      }
    });
  }

  private renderModals() {
    const { app, element, mounted } = this.getOrCreateRoot();

    // Mount app on first render, update on subsequent renders
    // This maintains Vue reactivity while avoiding re-mounting
    if (!mounted) {
      if (isVue2) {
        // In Vue 2, directly calling `.$mount(element)` will replace the `element` on the DOM,
        // which can cause `onModalRemoved` to fail and lead to memory leaks.
        // Therefore, it is necessary to use manual mounting instead.
        const modals = app.$mount();
        element.appendChild(modals.$el);
      } else {
        app.mount(element);
      }
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.rootInfo.mounted = true;
    } else {
      isVue2 ? app.$forceUpdate() : app._instance?.update();
    }
  }

  protected normalizeConfig(config: string | VNode | Component | ModalConfig): ModalConfig {
    const defaultConfig: ModalConfig = {
      noHeader: false,
      noFooter: false,
    };

    if (typeof config === 'string' || isVNode(config)) {
      return { ...defaultConfig, content: config };
    }
    return config !== null && typeof config === 'object' ? { ...defaultConfig, ...config } : defaultConfig;
  }

  protected onModalAdded(): void {
    this.renderModals();
  }

  protected onModalRemoved(): void {
    // Re-render to sync Vue state with DOM changes made by Stencil components
    this.renderModals();

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const { app, element, mounted } = this.rootInfo;
    const hasToasts = this.queue.size > 0;

    if (!hasToasts) {
      if (mounted) {
        isVue2 ? app.$destroy() : app.unmount();
      }
      if (this.container.contains(element)) {
        this.container.removeChild(element);
      }
      this.rootInfo = null;
    }
  }

  protected onAllModalsClosed(): void {
    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    const { app, element, mounted } = this.rootInfo;

    if (mounted) {
      isVue2 ? app.$destroy() : app.unmount();
    }
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
 * Global modal popups manager for Vue applications.
 * Supports Vue components, VNodes, and standard modal configurations.
 *
 * @example
 * ```typescript
 * // Basic usage
 * modal.open('Data saved successfully!');
 * modal.default('Connection failed');
 *
 * // Vue component content
 * modal.open({
 *   content: CustomNotification,
 *   variant: 'success',
 *   duration: 5000
 * });
 *
 * // VNode content
 * import { h } from 'vue';
 * modal.open(h('div', 'Custom content'));
 */
export const modal = new Modal();
