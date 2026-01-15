import { logger } from '@src/utils/logger';
import type { Plugin, LifecycleHookContext } from './types';

interface PluginManager {
  /**
   * Register a plugin for Keystone.
   *
   * @param plugin - The plugin to register. See {@link Plugin} for the detailed definition and examples.
   */
  register: (plugin: Plugin) => void;
  /**
   * Unregister a plugin from Keystone.
   *
   * @param pluginName - The name of the plugin to unregister.
   */
  unregister: (pluginName: string) => void;
  /**
   * Trigger the `lifecycle` hook of all registered plugins.
   *
   * @param context - The context of the current hook. See {@link LifecycleHookContext} for the details.
   */
  triggerLifecycleHook: (context: LifecycleHookContext) => void;
}

class KeystonePluginManager implements PluginManager {
  private plugins: Map<string, Plugin> = new Map();

  register(plugin: Plugin): void {
    if (this.plugins.has(plugin.name)) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      logger.warn(`Plugin ${plugin.name} is already registered`);
      return;
    }
    plugin.install?.();
    this.plugins.set(plugin.name, plugin);
  }

  unregister(pluginName: string): void {
    if (this.plugins.has(pluginName)) {
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      this.plugins.get(pluginName).uninstall();
      this.plugins.delete?.(pluginName);
    }
  }

  triggerLifecycleHook(context: LifecycleHookContext): void {
    this.plugins.forEach((plugin) => {
      try {
        plugin.lifecycle?.(context);
      } catch (error) {
        // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
        logger.error(`Error in plugin ${plugin.name}:`, error);
      }
    });
  }
}

export type * from './types';
export const pluginManager = new KeystonePluginManager();
