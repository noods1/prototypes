import { BODYEL } from '@src/utils/constants';
import type { Components } from '../components';

export interface BaseModalConfig<TContent>
  extends Partial<Omit<Components.KsModal, 'cbAfterDidLoad' | 'open' | 'close' | 'content'>> {
  btm?: string;
  btmConfig?: string | Record<string, unknown>;
  content?: TContent;
}

export interface ModalItem<TConfig> {
  id: string;
  config: TConfig;
  resolve: () => void;
}

export interface ModalInstance {
  (): void;
  then: <T = void>(
    onfulfilled?: (value: undefined) => T | PromiseLike<T>,
    onrejected?: (reason: unknown) => T | PromiseLike<T>,
  ) => Promise<T>;
  catch: <T = void>(onrejected?: (reason: unknown) => T | PromiseLike<T>) => Promise<T>;
}

export abstract class BaseModal<
  TContent = string,
  TConfig extends BaseModalConfig<TContent> = BaseModalConfig<TContent>,
> {
  private idCounter = 0;

  protected container = BODYEL;
  protected queue = new Map<string, ModalItem<TConfig>>();

  /**
   * Normalize input configuration - to be overridden by subclasses for different content types.
   */
  protected abstract normalizeConfig(config: TContent | TConfig): TConfig;
  /**
   * Called when a modal is added - to be implemented by subclasses.
   */
  protected abstract onModalAdded(id: string, config: TConfig): void;
  /**
   * Called when a modal is removed - to be implemented by subclasses.
   */
  protected abstract onModalRemoved(id: string, item: ModalItem<TConfig>): void;
  /**
   * Called when all modals are closed - to be implemented by subclasses.
   */
  protected abstract onAllModalsClosed(): void;
  /**
   * Handle modal close with common cleanup logic.
   */
  protected handleModalClose(id: string): void {
    const item = this.queue.get(id);
    if (!item) return;

    this.queue.delete(id);
    this.onModalRemoved(id, item);
    item.resolve();
  }

  /**
   * Open a modal with the given configuration.
   */
  public open(config: TContent | TConfig): ModalInstance {
    const id = `modal-${Date.now()}-${++this.idCounter}`;
    const normalizedConfig = this.normalizeConfig(config);

    const promise = new Promise<void>((resolve) => {
      this.queue.set(id, { id, config: normalizedConfig, resolve });
      this.onModalAdded(id, normalizedConfig);
    });

    const destroyFn = () => {
      this.handleModalClose(id);
    };

    // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
    return Object.assign(destroyFn, {
      then: promise.then.bind(promise),
      catch: promise.catch.bind(promise),
    });
  }
  /**
   * @alias open
   */
  public default = this.open;
  /**
   * Close all active modals.
   */
  public closeAll(): void {
    this.queue.forEach((item) => item.resolve());
    this.queue.clear();

    this.onAllModalsClosed();
  }
}
