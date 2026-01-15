import { BODYEL } from './constants';
import type { Components } from '../components';
import type { ToastVariant } from '../entities';

export interface BaseToastConfig<TContent>
  extends Partial<Omit<Components.KsToast, 'cbAfterDidLoad' | 'open' | 'close' | 'content'>> {
  btm?: string;
  btmConfig?: string | Record<string, unknown>;
  container?: HTMLElement;
  content?: TContent;
}

export interface ToastItem<TConfig> {
  id: string;
  config: TConfig;
  resolve: () => void;
}

export interface ToastInstance {
  (): void;
  then: <T = void>(
    onfulfilled?: (value: undefined) => T | PromiseLike<T>,
    onrejected?: (reason: unknown) => T | PromiseLike<T>,
  ) => Promise<T>;
  catch: <T = void>(onrejected?: (reason: unknown) => T | PromiseLike<T>) => Promise<T>;
}

/**
 * Abstract base class for toast notification management.
 * Provides common functionality that can be extended by different rendering implementations.
 */
export abstract class BaseToast<
  TContent = string,
  TConfig extends BaseToastConfig<TContent> = BaseToastConfig<TContent>,
> {
  private idCounter = 0;

  protected container: HTMLElement;
  protected queue = new Map<string, ToastItem<TConfig>>();

  constructor(container: HTMLElement = BODYEL) {
    this.container = container;
  }

  private findTopLayerContainer(): Element | null {
    const topLayerComponents = Array.from(
      document.querySelectorAll<HTMLKsModalElement | HTMLKsDrawerElement>('[ks-modal], [ks-drawer]'),
    );

    for (const comp of topLayerComponents) {
      const overlayEl = comp.shadowRoot?.querySelector<HTMLKsOverlayElement>('[ks-overlay]');
      if (overlayEl?.open) {
        const container = overlayEl.shadowRoot?.children?.[0];
        if (container) return container;
      }
    }

    return null;
  }

  private createVariantMethod(variant: ToastVariant, iconName: ToastVariant) {
    return (params: TContent | TConfig): ToastInstance => {
      const defaultConfig = {
        iconName,
        variant,
        showIcon: true,
      } as TConfig;

      const normalizedConfig = this.normalizeConfig(params);
      return this.open({ ...defaultConfig, ...normalizedConfig });
    };
  }

  /**
   * Normalize input configuration - to be overridden by subclasses for different content types.
   */
  protected abstract normalizeConfig(config: TContent | TConfig): TConfig;
  /**
   * Called when a toast is added - to be implemented by subclasses.
   */
  protected abstract onToastAdded(id: string, config: TConfig): void;
  /**
   * Called when a toast is removed - to be implemented by subclasses.
   */
  protected abstract onToastRemoved(id: string, item: ToastItem<TConfig>): void;
  /**
   * Called when all toasts are closed - to be implemented by subclasses.
   */
  protected abstract onAllToastsClosed(): void;
  /**
   * Handle toast close with common cleanup logic.
   */
  protected handleToastClose(id: string): void {
    const item = this.queue.get(id);
    if (!item) return;

    this.queue.delete(id);
    this.onToastRemoved(id, item);
    item.resolve();
  }
  /**
   * Get toast items filtered by container.
   */
  protected getToastsByContainer(container: HTMLElement): ToastItem<TConfig>[] {
    return Array.from(this.queue.values()).filter((item) => this.getContainer(item.config.container) === container);
  }
  /**
   * Get the appropriate container for toast rendering.
   * Checks for custom container, top layer container, or falls back to default.
   */
  protected getContainer(customContainer?: HTMLElement): HTMLElement {
    if (customContainer) {
      return customContainer;
    }

    const topLayerContainer = this.findTopLayerContainer();
    if (topLayerContainer) {
      return topLayerContainer as HTMLElement;
    }

    return this.container;
  }

  /**
   * Shows an info toast with preset styling.
   */
  public info = this.createVariantMethod('info', 'info');
  /**
   * Shows a success toast with preset styling.
   */
  public success = this.createVariantMethod('success', 'success');
  /**
   * Shows a warning toast with preset styling.
   */
  public warning = this.createVariantMethod('warning', 'warning');
  /**
   * Shows an error toast with preset styling.
   */
  public error = this.createVariantMethod('error', 'error');
  /**
   * Shows a loading toast with preset styling.
   */
  public loading = this.createVariantMethod('info', 'loading');
  /**
   * Open a toast with the given configuration.
   */
  public open(config: TContent | TConfig): ToastInstance {
    const id = `toast-${Date.now()}-${++this.idCounter}`;
    const normalizedConfig = this.normalizeConfig(config);

    const promise = new Promise<void>((resolve) => {
      this.queue.set(id, { id, config: normalizedConfig, resolve });
      this.onToastAdded(id, normalizedConfig);
    });

    const destroyFn = () => {
      this.handleToastClose(id);
    };

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return Object.assign(destroyFn, {
      then: promise.then.bind(promise),
      catch: promise.catch.bind(promise),
    });
  }
  /**
   * Close all active toasts.
   */
  public closeAll(): void {
    this.queue.forEach((item) => item.resolve());
    this.queue.clear();

    this.onAllToastsClosed();
  }
}
