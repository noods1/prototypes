import { pluginManager } from '@src/plugins';
import { pluginTracking } from '@src/plugins/plugin-tracking';
import { pluginLogger } from '@src/plugins/plugin-logger';
import loadIcons from './load-icons';
import '@oddbird/popover-polyfill';

export default function () {
  loadIcons();

  pluginManager.register(pluginTracking());
  pluginManager.register(pluginLogger());
}
